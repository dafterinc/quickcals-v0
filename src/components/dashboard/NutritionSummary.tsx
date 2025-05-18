'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useBMR } from '@/lib/hooks/useBMR';
import { useMeals } from '@/lib/hooks/useMeals';
import { format } from 'date-fns';

export function NutritionSummary() {
  const { bmrData, loading: bmrLoading, calculateBMR } = useBMR();
  const { meals, loading: mealsLoading, fetchMeals, getTotalCalories } = useMeals();
  
  const today = format(new Date(), 'yyyy-MM-dd');
  
  useEffect(() => {
    calculateBMR();
    fetchMeals(today, today);
  }, []);
  
  const totalCalories = getTotalCalories(today);
  const calorieTarget = bmrData?.calorieTarget || 0;
  const caloriePercentage = calorieTarget ? Math.min(Math.round((totalCalories / calorieTarget) * 100), 100) : 0;
  
  // Calculate consumed macros based on today's meals
  const consumedMacros = meals.reduce(
    (acc, meal) => {
      return {
        protein: acc.protein + (meal.protein || 0),
        carbs: acc.carbs + (meal.carbs || 0),
        fat: acc.fat + (meal.fat || 0),
      };
    },
    { protein: 0, carbs: 0, fat: 0 }
  );
  
  // Get target macros from BMR calculation
  const targetMacros = bmrData?.macroTargets || { protein: 0, carbs: 0, fat: 0 };
  
  // Calculate percentages for macros
  const proteinPercentage = targetMacros.protein ? Math.min(Math.round((consumedMacros.protein / targetMacros.protein) * 100), 100) : 0;
  const carbsPercentage = targetMacros.carbs ? Math.min(Math.round((consumedMacros.carbs / targetMacros.carbs) * 100), 100) : 0;
  const fatPercentage = targetMacros.fat ? Math.min(Math.round((consumedMacros.fat / targetMacros.fat) * 100), 100) : 0;
  
  if (bmrLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Nutrition</CardTitle>
          <CardDescription>Loading your nutrition data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  if (!bmrData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Nutrition</CardTitle>
          <CardDescription>Complete your profile to see nutrition targets</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Nutrition</CardTitle>
        <CardDescription>
          {bmrData.goal ? `Goal: ${bmrData.goal.replace('_', ' ')}` : 'Your calorie and macro targets'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Calories</span>
            <span className="text-sm text-muted-foreground">
              {totalCalories} / {calorieTarget} kcal
            </span>
          </div>
          <Progress value={caloriePercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {calorieTarget - totalCalories > 0 
              ? `${calorieTarget - totalCalories} kcal remaining` 
              : `${totalCalories - calorieTarget} kcal over target`}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Protein</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(consumedMacros.protein)} / {targetMacros.protein} g
            </span>
          </div>
          <Progress value={proteinPercentage} className="h-2 bg-blue-100" />
          <p className="text-xs text-muted-foreground">
            {targetMacros.protein - consumedMacros.protein > 0 
              ? `${Math.round(targetMacros.protein - consumedMacros.protein)} g remaining` 
              : `${Math.round(consumedMacros.protein - targetMacros.protein)} g over target`}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Carbs</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(consumedMacros.carbs)} / {targetMacros.carbs} g
            </span>
          </div>
          <Progress value={carbsPercentage} className="h-2 bg-amber-100" />
          <p className="text-xs text-muted-foreground">
            {targetMacros.carbs - consumedMacros.carbs > 0 
              ? `${Math.round(targetMacros.carbs - consumedMacros.carbs)} g remaining` 
              : `${Math.round(consumedMacros.carbs - targetMacros.carbs)} g over target`}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Fat</span>
            <span className="text-sm text-muted-foreground">
              {Math.round(consumedMacros.fat)} / {targetMacros.fat} g
            </span>
          </div>
          <Progress value={fatPercentage} className="h-2 bg-rose-100" />
          <p className="text-xs text-muted-foreground">
            {targetMacros.fat - consumedMacros.fat > 0 
              ? `${Math.round(targetMacros.fat - consumedMacros.fat)} g remaining` 
              : `${Math.round(consumedMacros.fat - targetMacros.fat)} g over target`}
          </p>
        </div>
        
        <div className="pt-4 text-xs text-muted-foreground">
          <p>BMR: {bmrData.bmr} kcal/day</p>
          <p>Daily Target: {calorieTarget} kcal/day</p>
        </div>
      </CardContent>
    </Card>
  );
} 