// Define types for QuickCals database schema

// User profile type with BMR information
export type UserProfile = {
  id: string;
  created_at: string;
  email: string;
  name?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number; // in cm
  weight?: number; // in kg
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal?: 'lose_weight' | 'maintain_weight' | 'lose_weight_fast' | 'build_muscle' | 'lean_bulk' | 'body_recomposition';
};

// Weight log entry
export type WeightLog = {
  id: string;
  user_id: string;
  created_at: string;
  weight: number; // in kg
  notes?: string;
};

// Meal entry
export type Meal = {
  id: string;
  user_id: string;
  created_at: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  calories: number;
  protein?: number; // in grams
  carbs?: number; // in grams
  fat?: number; // in grams
  image_url?: string;
  notes?: string;
};

// Food item from nutrition database
export type FoodItem = {
  id: string;
  name: string;
  calories: number;
  serving_size: number;
  serving_unit: string;
  protein?: number;
  carbs?: number;
  fat?: number;
};

// AI chat message
export type ChatMessage = {
  id: string;
  user_id: string;
  created_at: string;
  content: string;
  role: 'user' | 'assistant';
  conversation_id: string;
};

// Database tables
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'id' | 'created_at'>;
        Update: Partial<Omit<UserProfile, 'id' | 'created_at'>>;
      };
      weight_logs: {
        Row: WeightLog;
        Insert: Omit<WeightLog, 'id' | 'created_at'>;
        Update: Partial<Omit<WeightLog, 'id' | 'created_at'>>;
      };
      meals: {
        Row: Meal;
        Insert: Omit<Meal, 'id' | 'created_at'>;
        Update: Partial<Omit<Meal, 'id' | 'created_at'>>;
      };
      food_items: {
        Row: FoodItem;
        Insert: Omit<FoodItem, 'id'>;
        Update: Partial<Omit<FoodItem, 'id'>>;
      };
      chat_messages: {
        Row: ChatMessage;
        Insert: Omit<ChatMessage, 'id' | 'created_at'>;
        Update: Partial<Omit<ChatMessage, 'id' | 'created_at'>>;
      };
    };
  };
};
