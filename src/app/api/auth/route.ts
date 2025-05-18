import { NextRequest, NextResponse } from 'next/server';
import { signInWithEmail, signUpWithEmail, signOut, createUserProfile } from '@/lib/database/utils';

export async function POST(req: NextRequest) {
  try {
    const { action, email, password, profileData } = await req.json();

    switch (action) {
      case 'login':
        const loginData = await signInWithEmail(email, password);
        return NextResponse.json({ success: true, data: loginData });

      case 'register':
        const signUpData = await signUpWithEmail(email, password);
        
        // Create user profile if registration was successful
        if (signUpData.user) {
          await createUserProfile({
            email: signUpData.user.email || '',
            ...profileData
          });
        }

        return NextResponse.json({ success: true, data: signUpData });

      case 'logout':
        await signOut();
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Authentication error' },
      { status: 500 }
    );
  }
}

// Get the current session status
export async function GET() {
  try {
    // The getCurrentUser function will be called from the client
    // since we're using client-side auth with Supabase
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Session error' },
      { status: 500 }
    );
  }
} 