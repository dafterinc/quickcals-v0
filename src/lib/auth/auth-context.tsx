'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import supabase from '../supabase/supabase-client';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profileData?: any) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for user session on initial load
    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (error: any) {
        console.error('Error checking auth:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change event:", event);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Sending login request to API");
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'login', email, password }),
      });

      // Log the response status
      console.log("Login API response status:", response.status);
      
      const data = await response.json();
      console.log("Login API response:", data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign in');
      }

      // Navigate to dashboard after successful login
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Sign in error:', error.message);
      setError(error.message);
      throw error; // Re-throw to let the form component handle the error
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, profileData?: any) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Starting signup process with email:", email);
      console.log("Profile data:", profileData);
      
      // First, try to directly use Supabase client for signup
      try {
        console.log("Directly using Supabase auth.signUp");
        const { data: directSignupData, error: directSignupError } = await supabase.auth.signUp({
          email, 
          password
        });
        
        if (directSignupError) {
          console.error("Direct Supabase signup error:", directSignupError);
          throw directSignupError;
        }
        
        console.log("Direct Supabase signup result:", directSignupData);
        
        // If we have a user, create the profile
        if (directSignupData.user) {
          console.log("User created, now creating profile");
          // Create profile directly
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: directSignupData.user.id,
              email: directSignupData.user.email,
              // Add other profile fields as needed
            });
            
          if (profileError) {
            console.error("Error creating profile:", profileError);
          } else {
            console.log("Profile created:", profileData);
          }
          
          // Set the user
          setUser(directSignupData.user);
          
          // Navigate to dashboard
          router.push('/dashboard');
          return;
        }
      } catch (directError: any) {
        console.error("Error in direct signup:", directError);
        // Fall back to API route if direct method fails
      }
      
      // Fall back to API route
      console.log("Fallback: Sending signup request to API");
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'register', email, password, profileData }),
      });

      // Log the response status
      console.log("Signup API response status:", response.status);
      
      const data = await response.json();
      console.log("Signup API response:", data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      router.push('/dashboard');
    } catch (error: any) {
      console.error('Sign up error details:', error);
      setError(error.message || 'Failed to create account');
      throw error; // Re-throw to let the form component handle the error
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'logout' }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to sign out');
      }

      setUser(null);
      router.push('/login');
    } catch (error: any) {
      console.error('Sign out error:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 