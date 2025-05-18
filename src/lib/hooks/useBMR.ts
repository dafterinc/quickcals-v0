'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { useProfile } from './useProfile';
import { toast } from 'sonner';

type MacroTargets = {
  protein: number;
  fat: number;
  carbs: number;
};

type BMRData = {
  bmr: number;
  calorieTarget: number;
  macroTargets: MacroTargets;
  goal: string;
};

export function useBMR() {
  const { user } = useAuth();
  const { profile, isProfileComplete, getMissingProfileFields } = useProfile();
  const [bmrData, setBmrData] = useState<BMRData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate BMR and get nutrition targets
  const calculateBMR = useCallback(async () => {
    if (!user) {
      toast.error('You must be logged in to calculate BMR');
      return null;
    }

    if (!isProfileComplete) {
      const missing = getMissingProfileFields();
      const errorMsg = `Missing profile data required for BMR calculation: ${missing.join(', ')}`;
      setError(errorMsg);
      toast.error(errorMsg);
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/user/bmr');
      
      if (!response.ok) {
        const data = await response.json();
        if (data.error === 'Insufficient profile data for BMR calculation') {
          const missingFields = Object.entries(data.missingFields || {})
            .filter(([_, isMissing]) => isMissing)
            .map(([field]) => field)
            .join(', ');
          
          throw new Error(`Missing profile data required for BMR calculation: ${missingFields}`);
        }
        
        throw new Error(data.error || 'Failed to calculate BMR');
      }
      
      const data = await response.json();
      setBmrData(data.data);
      return data.data;
    } catch (error: any) {
      console.error('Error calculating BMR:', error.message);
      setError(error.message);
      toast.error(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, isProfileComplete, getMissingProfileFields]);

  // Auto-calculate BMR when profile changes and is complete
  useEffect(() => {
    if (isProfileComplete && !bmrData && !loading) {
      calculateBMR();
    }
  }, [isProfileComplete, bmrData, loading, calculateBMR]);

  // Helper to get a calorie target description
  const getCalorieTargetDescription = () => {
    if (!bmrData) return '';
    
    const { goal, calorieTarget, bmr } = bmrData;
    
    switch(goal) {
      case 'lose_weight':
        return `${calorieTarget} calories/day (${Math.round((bmr - calorieTarget) / 7700 * 7)} kg/week loss)`;
      case 'lose_weight_fast':
        return `${calorieTarget} calories/day (${Math.round((bmr - calorieTarget) / 7700 * 7)} kg/week loss)`;
      case 'build_muscle':
        return `${calorieTarget} calories/day (${Math.round((calorieTarget - bmr) / 7700 * 7)} kg/week gain)`;
      case 'lean_bulk':
        return `${calorieTarget} calories/day (${Math.round((calorieTarget - bmr) / 7700 * 7)} kg/week gain)`;
      case 'maintain_weight':
      case 'body_recomposition':
      default:
        return `${calorieTarget} calories/day (maintenance)`;
    }
  };

  return {
    bmrData,
    loading,
    error,
    calculateBMR,
    getCalorieTargetDescription
  };
} 