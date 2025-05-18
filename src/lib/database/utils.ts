import supabase from '../supabase/supabase-client';
import { Database, UserProfile, WeightLog, Meal, ChatMessage } from './schema';

// User Profile Functions
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data as UserProfile;
}

export async function updateUserProfile(userId: string, profile: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data as UserProfile;
}

export async function createUserProfile(profile: Omit<UserProfile, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single();
  
  if (error) throw error;
  return data as UserProfile;
}

// Weight Log Functions
export async function getWeightLogs(userId: string) {
  const { data, error } = await supabase
    .from('weight_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as WeightLog[];
}

export async function addWeightLog(weightLog: Omit<WeightLog, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('weight_logs')
    .insert(weightLog)
    .select()
    .single();
  
  if (error) throw error;
  return data as WeightLog;
}

export async function deleteWeightLog(id: string, userId: string) {
  const { error } = await supabase
    .from('weight_logs')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  
  if (error) throw error;
  return true;
}

// Meal Functions
export async function getMeals(userId: string, dateStart?: string, dateEnd?: string) {
  let query = supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (dateStart) {
    query = query.gte('created_at', dateStart);
  }
  
  if (dateEnd) {
    query = query.lte('created_at', dateEnd);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as Meal[];
}

export async function addMeal(meal: Omit<Meal, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('meals')
    .insert(meal)
    .select()
    .single();
  
  if (error) throw error;
  return data as Meal;
}

export async function updateMeal(id: string, userId: string, meal: Partial<Meal>) {
  const { data, error } = await supabase
    .from('meals')
    .update(meal)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data as Meal;
}

export async function deleteMeal(id: string, userId: string) {
  const { error } = await supabase
    .from('meals')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  
  if (error) throw error;
  return true;
}

// Chat Messages Functions
export async function getChatMessages(userId: string, conversationId: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('user_id', userId)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data as ChatMessage[];
}

export async function addChatMessage(message: Omit<ChatMessage, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert(message)
    .select()
    .single();
  
  if (error) throw error;
  return data as ChatMessage;
}

// Auth Helper Functions
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}

// Calculate BMR based on user profile
export function calculateBMR(profile: UserProfile): number | null {
  if (!profile.age || !profile.gender || !profile.height || !profile.weight) {
    return null;
  }
  
  // Mifflin-St Jeor Equation
  let bmr = 0;
  
  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else if (profile.gender === 'female') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  } else {
    // For non-binary, use average of both formulas
    const maleBmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    const femaleBmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    bmr = (maleBmr + femaleBmr) / 2;
  }
  
  // Adjust for activity level
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  
  if (profile.activity_level) {
    bmr *= activityMultipliers[profile.activity_level];
  }
  
  return Math.round(bmr);
} 