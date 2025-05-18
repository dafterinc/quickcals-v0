'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { Meal } from '@/lib/database/schema';
import { toast } from 'sonner';

type NewMeal = Omit<Meal, 'id' | 'user_id' | 'created_at'>;
type UpdateMeal = Partial<Omit<Meal, 'id' | 'user_id' | 'created_at'>>;

export function useMeals() {
  const { user } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch meals, optionally for a date range
  const fetchMeals = useCallback(async (dateStart?: string, dateEnd?: string) => {
    if (!user) {
      setMeals([]);
      return [];
    }

    try {
      setLoading(true);
      setError(null);
      
      let url = '/api/meals';
      const params = new URLSearchParams();
      
      if (dateStart) params.append('dateStart', dateStart);
      if (dateEnd) params.append('dateEnd', dateEnd);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch meals');
      }
      
      const data = await response.json();
      setMeals(data.data);
      return data.data;
    } catch (error: any) {
      console.error('Error fetching meals:', error.message);
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Add a new meal
  const addMeal = async (mealData: NewMeal) => {
    if (!user) {
      toast.error('You must be logged in to add a meal');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealData),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add meal');
      }
      
      const data = await response.json();
      
      // Add new meal to state
      setMeals(prevMeals => [data.data, ...prevMeals]);
      
      toast.success('Meal added successfully');
      return data.data;
    } catch (error: any) {
      console.error('Error adding meal:', error.message);
      setError(error.message);
      toast.error(error.message || 'Failed to add meal');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a meal
  const updateMeal = async (id: string, mealData: UpdateMeal) => {
    if (!user) {
      toast.error('You must be logged in to update a meal');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/meals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealData),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update meal');
      }
      
      const data = await response.json();
      
      // Update meal in state
      setMeals(prevMeals => 
        prevMeals.map(meal => meal.id === id ? data.data : meal)
      );
      
      toast.success('Meal updated successfully');
      return data.data;
    } catch (error: any) {
      console.error('Error updating meal:', error.message);
      setError(error.message);
      toast.error(error.message || 'Failed to update meal');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a meal
  const deleteMeal = async (id: string) => {
    if (!user) {
      toast.error('You must be logged in to delete a meal');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/meals/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete meal');
      }
      
      // Remove meal from state
      setMeals(prevMeals => prevMeals.filter(meal => meal.id !== id));
      
      toast.success('Meal deleted successfully');
      return true;
    } catch (error: any) {
      console.error('Error deleting meal:', error.message);
      setError(error.message);
      toast.error(error.message || 'Failed to delete meal');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get today's meals
  const getTodaysMeals = () => {
    const today = new Date().toISOString().split('T')[0];
    
    return meals.filter(meal => {
      const mealDate = new Date(meal.created_at).toISOString().split('T')[0];
      return mealDate === today;
    });
  };

  // Calculate daily nutrition totals
  const getDailyNutrition = (mealsToCalculate = meals) => {
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
    
    mealsToCalculate.forEach(meal => {
      totals.calories += meal.calories || 0;
      totals.protein += meal.protein || 0;
      totals.carbs += meal.carbs || 0;
      totals.fat += meal.fat || 0;
    });
    
    return totals;
  };

  // Fetch meals on mount
  useEffect(() => {
    // Get today's meals by default
    const today = new Date().toISOString().split('T')[0];
    fetchMeals(today);
  }, [fetchMeals]);

  return {
    meals,
    loading,
    error,
    fetchMeals,
    addMeal,
    updateMeal,
    deleteMeal,
    getTodaysMeals,
    getDailyNutrition
  };
} 