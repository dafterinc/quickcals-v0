'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { WeightLog } from '@/lib/database/schema';
import { toast } from 'sonner';

export function useWeightLog() {
  const { user } = useAuth();
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch weight logs
  const fetchWeightLogs = useCallback(async () => {
    if (!user) {
      setWeightLogs([]);
      return [];
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/user/weight');
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch weight logs');
      }
      
      const data = await response.json();
      setWeightLogs(data.data);
      return data.data;
    } catch (error: any) {
      console.error('Error fetching weight logs:', error.message);
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Add weight log
  const addWeightLog = async (weight: number, notes?: string, updateProfile: boolean = true) => {
    if (!user) {
      toast.error('You must be logged in to add a weight log');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/user/weight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight, notes, updateProfile }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add weight log');
      }
      
      const data = await response.json();
      
      // Add new log to the state
      setWeightLogs(prevLogs => [data.data, ...prevLogs]);
      
      toast.success('Weight log added successfully');
      return data.data;
    } catch (error: any) {
      console.error('Error adding weight log:', error.message);
      setError(error.message);
      toast.error(error.message || 'Failed to add weight log');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete weight log
  const deleteWeightLog = async (id: string) => {
    if (!user) {
      toast.error('You must be logged in to delete a weight log');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/user/weight?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete weight log');
      }
      
      // Remove deleted log from state
      setWeightLogs(prevLogs => prevLogs.filter(log => log.id !== id));
      
      toast.success('Weight log deleted successfully');
      return true;
    } catch (error: any) {
      console.error('Error deleting weight log:', error.message);
      setError(error.message);
      toast.error(error.message || 'Failed to delete weight log');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get weight trend data
  const getWeightTrend = () => {
    if (weightLogs.length < 2) return null;
    
    const sortedLogs = [...weightLogs].sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    
    const firstWeight = sortedLogs[0].weight;
    const lastWeight = sortedLogs[sortedLogs.length - 1].weight;
    const weightChange = lastWeight - firstWeight;
    
    const firstDate = new Date(sortedLogs[0].created_at);
    const lastDate = new Date(sortedLogs[sortedLogs.length - 1].created_at);
    const daysDiff = Math.max(1, Math.round((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    const weeklyRate = (weightChange / daysDiff) * 7;
    
    return {
      totalChange: weightChange,
      weeklyRate,
      daysTracked: daysDiff,
      startWeight: firstWeight,
      currentWeight: lastWeight
    };
  };

  // Get most recent weight
  const getLatestWeight = () => {
    if (weightLogs.length === 0) return null;
    
    const sortedLogs = [...weightLogs].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    return sortedLogs[0].weight;
  };

  // Fetch weight logs on mount
  useEffect(() => {
    fetchWeightLogs();
  }, [fetchWeightLogs]);

  return {
    weightLogs,
    loading,
    error,
    fetchWeightLogs,
    addWeightLog,
    deleteWeightLog,
    getWeightTrend,
    getLatestWeight
  };
} 