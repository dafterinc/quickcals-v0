import { NextRequest, NextResponse } from 'next/server';
import { getWeightLogs, addWeightLog, deleteWeightLog, getCurrentUser, updateUserProfile } from '@/lib/database/utils';

// Get all weight logs for a user
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const weightLogs = await getWeightLogs(user.id);
    return NextResponse.json({ success: true, data: weightLogs });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to get weight logs' },
      { status: 500 }
    );
  }
}

// Add a new weight log
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const { weight, notes, updateProfile } = await req.json();
    
    if (!weight || typeof weight !== 'number' || weight <= 0) {
      return NextResponse.json(
        { error: 'Invalid weight value' },
        { status: 400 }
      );
    }
    
    const weightLog = await addWeightLog({
      user_id: user.id,
      weight,
      notes: notes || ''
    });
    
    // Update the user's current weight in their profile if requested
    if (updateProfile) {
      await updateUserProfile(user.id, { weight });
    }
    
    return NextResponse.json({ success: true, data: weightLog });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to add weight log' },
      { status: 500 }
    );
  }
}

// Delete a weight log
export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Log ID is required' },
        { status: 400 }
      );
    }
    
    await deleteWeightLog(id, user.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete weight log' },
      { status: 500 }
    );
  }
}
