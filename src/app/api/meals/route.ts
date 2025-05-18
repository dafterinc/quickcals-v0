import { NextRequest, NextResponse } from 'next/server';
import { getMeals, addMeal, updateMeal, deleteMeal, getCurrentUser } from '@/lib/database/utils';

// Get meals with optional date filtering
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const url = new URL(req.url);
    const dateStart = url.searchParams.get('dateStart') || undefined;
    const dateEnd = url.searchParams.get('dateEnd') || undefined;
    
    const meals = await getMeals(user.id, dateStart, dateEnd);
    return NextResponse.json({ success: true, data: meals });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to get meals' },
      { status: 500 }
    );
  }
}

// Add a new meal
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const mealData = await req.json();
    
    if (!mealData.name || !mealData.meal_type || !mealData.calories) {
      return NextResponse.json(
        { error: 'Missing required meal data' },
        { status: 400 }
      );
    }
    
    const meal = await addMeal({
      user_id: user.id,
      name: mealData.name,
      meal_type: mealData.meal_type,
      calories: mealData.calories,
      protein: mealData.protein,
      carbs: mealData.carbs,
      fat: mealData.fat,
      image_url: mealData.image_url,
      notes: mealData.notes
    });
    
    return NextResponse.json({ success: true, data: meal });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to add meal' },
      { status: 500 }
    );
  }
}

// Update a meal
export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const { id, ...mealData } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Meal ID is required' },
        { status: 400 }
      );
    }
    
    const meal = await updateMeal(id, user.id, mealData);
    return NextResponse.json({ success: true, data: meal });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to update meal' },
      { status: 500 }
    );
  }
}

// Delete a meal
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
        { error: 'Meal ID is required' },
        { status: 400 }
      );
    }
    
    await deleteMeal(id, user.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to delete meal' },
      { status: 500 }
    );
  }
}
