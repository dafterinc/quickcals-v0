'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { WeightLog } from '@/lib/database/schema';
import { toast } from 'sonner';

export function useWeightLogs() {
  const { user } = useAuth();
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all weight logs
  const fetchWeightLogs = async () => {
    if (!user) {
      return [];
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/user/weight');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weight logs');
      }
      
      setWeightLogs(data.data);
      return data.data;
    } catch (error: any) {
      console.error('Error fetching weight logs:', error.message);
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Add a new weight log
  const addWeightLog = async (weight: number, notes: string = '', updateProfile: boolean = true) => {
    if (!user) {
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
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add weight log');
      }
      
      setWeightLogs(prevLogs => [data.data, ...prevLogs]);
      toast.success('Weight logged successfully');
      return data.data;
    } catch (error: any) {
      console.error('Error adding weight log:', error.message);
      setError(error.message);
      toast.error(error.message || 'Failed to log weight');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a weight log
  const deleteWeightLog = async (id: string) => {
    if (!user) {
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

  // Get weight change over time
  const getWeightChange = (days: number = 30) => {
    if (weightLogs.length < 2) {
      return 0;
    }
    
    // Sort logs by date (newest first)
    const sortedLogs = [...weightLogs].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    // Get current weight (most recent log)
    const currentWeight = sortedLogs[0].weight;
    
    // Get comparison date (N days ago)
    const comparisonDate = new Date();
    comparisonDate.setDate(comparisonDate.getDate() - days);
    
    // Find the closest log to the comparison date
    let closestLog = sortedLogs[sortedLogs.length - 1];
    let minDiff = Math.abs(new Date(closestLog.created_at).getTime() - comparisonDate.getTime());
    
    for (const log of sortedLogs) {
      const diff = Math.abs(new Date(log.created_at).getTime() - comparisonDate.getTime());
      if (diff < minDiff) {
        minDiff = diff;
        closestLog = log;
      }
    }
    
    // Calculate the difference
    return currentWeight - closestLog.weight;
  };

  return {
    weightLogs,
    loading,
    error,
    fetchWeightLogs,
    addWeightLog,
    deleteWeightLog,
    getWeightChange
  };
} 