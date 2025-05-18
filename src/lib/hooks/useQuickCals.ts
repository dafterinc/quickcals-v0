'use client';

import { useAuth } from '../auth/auth-context';
import { useProfile } from './useProfile';
import { useBMR } from './useBMR';
import { useWeightLog } from './useWeightLog';
import { useMeals } from './useMeals';

/**
 * A combined hook that provides all QuickCals functionality in one place.
 * This makes it easier to use in components without importing multiple hooks.
 */
export function useQuickCals() {
  const auth = useAuth();
  const profile = useProfile();
  const bmr = useBMR();
  const weightLog = useWeightLog();
  const meals = useMeals();
  
  // Get the user's basic data including login status
  const getUserBasics = () => ({
    isLoggedIn: !!auth.user,
    email: auth.user?.email,
    userId: auth.user?.id,
    loading: auth.loading || profile.loading
  });
  
  // Get a summary of the user's current health status
  const getHealthSummary = () => {
    const currentWeight = weightLog.getLatestWeight();
    const dailyNutrition = meals.getDailyNutrition(meals.getTodaysMeals());
    const calorieTarget = bmr.bmrData?.calorieTarget || 0;
    const remainingCalories = calorieTarget - dailyNutrition.calories;
    
    return {
      currentWeight,
      dailyNutrition,
      calorieTarget,
      remainingCalories,
      macroTargets: bmr.bmrData?.macroTargets,
      weightTrend: weightLog.getWeightTrend()
    };
  };
  
  // Get the overall status of the user's profile setup
  const getSetupStatus = () => {
    if (!auth.user) return { complete: false, percentage: 0 };
    
    const setupSteps = [
      !!profile.profile?.name,
      !!profile.profile?.age,
      !!profile.profile?.gender,
      !!profile.profile?.height,
      !!profile.profile?.weight,
      !!profile.profile?.activity_level,
      !!profile.profile?.goal,
      weightLog.weightLogs.length > 0,
    ];
    
    const completedSteps = setupSteps.filter(Boolean).length;
    const percentage = Math.round((completedSteps / setupSteps.length) * 100);
    
    return {
      complete: percentage === 100,
      percentage,
      missingFields: profile.getMissingProfileFields()
    };
  };
  
  return {
    // Authentication
    user: auth.user,
    signIn: auth.signIn,
    signUp: auth.signUp,
    signOut: auth.signOut,
    authLoading: auth.loading,
    authError: auth.error,
    
    // Profile
    profile: profile.profile,
    updateProfile: profile.updateProfile,
    profileLoading: profile.loading,
    profileError: profile.error,
    isProfileComplete: profile.isProfileComplete,
    
    // BMR
    bmrData: bmr.bmrData,
    calculateBMR: bmr.calculateBMR,
    bmrLoading: bmr.loading,
    bmrError: bmr.error,
    getCalorieTargetDescription: bmr.getCalorieTargetDescription,
    
    // Weight logs
    weightLogs: weightLog.weightLogs,
    addWeightLog: weightLog.addWeightLog,
    deleteWeightLog: weightLog.deleteWeightLog,
    weightLoading: weightLog.loading,
    weightError: weightLog.error,
    
    // Meals
    meals: meals.meals,
    addMeal: meals.addMeal,
    updateMeal: meals.updateMeal,
    deleteMeal: meals.deleteMeal,
    fetchMeals: meals.fetchMeals,
    mealsLoading: meals.loading,
    mealsError: meals.error,
    
    // Combined functionalities
    getUserBasics,
    getHealthSummary,
    getSetupStatus
  };
} 