'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { UserProfile } from '@/lib/database/schema';
import { toast } from 'sonner';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data
  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/user/profile');
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch profile');
      }
      
      const data = await response.json();
      setProfile(data.data);
      return data.data;
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Update profile data
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) {
      toast.error('You must be logged in to update your profile');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update profile');
      }
      
      const data = await response.json();
      setProfile(data.data);
      toast.success('Profile updated successfully');
      return data.data;
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      setError(error.message);
      toast.error(error.message || 'Failed to update profile');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile on user change
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Check if profile has all required fields for BMR calculation
  const isProfileComplete = profile && 
    !!profile.age && 
    !!profile.gender && 
    !!profile.height && 
    !!profile.weight && 
    !!profile.activity_level;

  // Helper to determine what profile fields are missing
  const getMissingProfileFields = () => {
    if (!profile) return ['all profile information'];
    
    const missingFields = [];
    if (!profile.age) missingFields.push('age');
    if (!profile.gender) missingFields.push('gender');
    if (!profile.height) missingFields.push('height');
    if (!profile.weight) missingFields.push('weight');
    if (!profile.activity_level) missingFields.push('activity level');
    
    return missingFields;
  };

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    isProfileComplete,
    getMissingProfileFields
  };
} 