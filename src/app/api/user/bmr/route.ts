import { NextResponse } from 'next/server';
import { getUserProfile, getCurrentUser, calculateBMR } from '@/lib/database/utils';

export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const profile = await getUserProfile(user.id);
    const bmr = calculateBMR(profile);
    
    if (bmr === null) {
      return NextResponse.json(
        { 
          error: 'Insufficient profile data for BMR calculation', 
          missingFields: {
            age: !profile.age,
            gender: !profile.gender,
            height: !profile.height,
            weight: !profile.weight
          }
        },
        { status: 400 }
      );
    }
    
    // Calculate calorie targets based on goal
    let calorieTarget = bmr;
    
    // Check goals based on the actual values in the UserProfile type
    if (profile.goal === 'lose_weight' || profile.goal === 'lose_weight_fast') {
      // Adjust deficit based on how aggressive the weight loss goal is
      const deficitMultiplier = profile.goal === 'lose_weight_fast' ? 0.75 : 0.85;
      calorieTarget = Math.round(bmr * deficitMultiplier);
    } else if (profile.goal === 'build_muscle' || profile.goal === 'lean_bulk') {
      // Adjust surplus based on how aggressive the muscle gain goal is
      const surplusMultiplier = profile.goal === 'build_muscle' ? 1.15 : 1.1;
      calorieTarget = Math.round(bmr * surplusMultiplier);
    }
    // For 'maintain_weight' or 'body_recomposition', keep BMR as is
    
    // Calculate protein based on weight and goal
    let proteinMultiplier = 1.6; // Default
    if (profile.goal === 'build_muscle') {
      proteinMultiplier = 2.0;
    } else if (profile.goal === 'lean_bulk') {
      proteinMultiplier = 1.8;
    } else if (profile.goal === 'lose_weight_fast') {
      proteinMultiplier = 1.8; // Higher protein helps preserve muscle during aggressive cutting
    }

    return NextResponse.json({ 
      success: true, 
      data: { 
        bmr,
        calorieTarget,
        macroTargets: {
          protein: Math.round(profile.weight ? profile.weight * proteinMultiplier : 0), // g/day
          fat: Math.round(calorieTarget * 0.25 / 9), // 25% of calories from fat, 9 calories per gram
          carbs: Math.round((calorieTarget - (profile.weight ? profile.weight * proteinMultiplier * 4 : 0) - (calorieTarget * 0.25)) / 4) // remaining calories from carbs, 4 calories per gram
        },
        goal: profile.goal || 'maintain_weight'
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to calculate BMR' },
      { status: 500 }
    );
  }
}
