# QuickCals - Nutrition & Fitness Tracker

QuickCals is a web application for tracking calories, meals, and weight to achieve your fitness goals.

## Overview

QuickCals is a comprehensive calorie and nutrition tracking application that helps users monitor their diet, track weight changes, and achieve their fitness goals. The app provides personalized BMR (Basal Metabolic Rate) calculations, meal logging, weight tracking, and AI-powered nutrition assistance.

## Features

- **User Authentication**: Secure login and registration system
- **Profile Management**: Set and update personal details and fitness goals
- **BMR Calculation**: Personalized metabolic rate and calorie target calculation
- **Meal Tracking**: Log meals with detailed nutritional information
- **Weight Logging**: Track weight changes over time with visual progress charts
- **AI Nutrition Assistant**: Chat with an AI assistant for nutrition advice and meal suggestions
- **History Visualization**: View past meal and weight logs with detailed analytics

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **AI/ML**: OpenAI GPT API for nutrition assistance
- **Styling**: Tailwind CSS with Shadcn UI components

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Supabase account (for backend)
- OpenAI API key (for AI assistant features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dafterinc/quickcals-v0
   cd quickcals
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Copy `.env.local.example` to `.env.local` and update the environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Update the `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

    OPENAI_API_KEY=your-openai-api-key

   ```

### Supabase Setup

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Copy your project URL and anon key from Project Settings > API
3. Create the necessary database tables by running the following SQL in the Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  name TEXT,
  age INTEGER,
  gender TEXT,
  height NUMERIC,
  weight NUMERIC,
  activity_level TEXT,
  goal TEXT
);

-- Create weight logs table
CREATE TABLE weight_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  weight NUMERIC NOT NULL,
  notes TEXT
);

-- Create meals table
CREATE TABLE meals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  meal_type TEXT NOT NULL,
  name TEXT NOT NULL,
  calories INTEGER NOT NULL,
  protein NUMERIC,
  carbs NUMERIC,
  fat NUMERIC,
  image_url TEXT,
  notes TEXT
);

-- Create food items table (for nutrition database)
CREATE TABLE food_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  calories INTEGER NOT NULL,
  serving_size NUMERIC NOT NULL,
  serving_unit TEXT NOT NULL,
  protein NUMERIC,
  carbs NUMERIC,
  fat NUMERIC
);

-- Create chat messages table
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  content TEXT NOT NULL,
  role TEXT NOT NULL,
  conversation_id TEXT NOT NULL
);
```

4. Set up Row Level Security (RLS) policies:

```sql
-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Profiles can only be inserted by the profile owner" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for weight logs
CREATE POLICY "Users can view their own weight logs" ON weight_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own weight logs" ON weight_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own weight logs" ON weight_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for meals
CREATE POLICY "Users can view their own meals" ON meals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own meals" ON meals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meals" ON meals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meals" ON meals
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for chat messages
CREATE POLICY "Users can view their own chat messages" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Food items are readable by all authenticated users
CREATE POLICY "Food items are readable by all authenticated users" ON food_items
  FOR SELECT USING (auth.role() = 'authenticated');
```

5. Create a trigger to automatically create user profiles:

```sql
-- Create a trigger to create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

6. (Optional) Set up storage for meal images:
   - Create a new bucket named "meal-images"
   - Set the bucket to private
   - Add policies to allow users to upload and view their own images

### Running the Project

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
quickcals-v0/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── user/           # User-related endpoints
│   │   │   ├── meals/          # Meal tracking endpoints
│   │   │   ├── ai/             # AI assistant endpoints
│   │   ├── history/            # History page
│   │   ├── profile/            # User profile page
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── components/         # React components
│   │   │   ├── ui/             # UI components (shadcn)
│   │   │   ├── layouts/        # Layout components
│   │   │   ├── chat/           # Chat interface components
│   │   │   ├── meals/          # Meal components
│   │   │   ├── weight/         # Weight tracking components
│   │   ├── lib/                # Utility libraries and functions
│   │   │   ├── database/       # Database utilities
│   │   │   ├── supabase/       # Supabase client
│   │   │   ├── auth/           # Authentication utilities
│   │   │   ├── bmr/            # BMR calculation logic
│   │   ├── types/              # TypeScript types
│   ├── public/                 # Static assets
│   ├── .env.local.example      # Example environment variables
│   ├── package.json            # Project dependencies
│   └── README.md               # Project documentation
```


5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_APP_URL`: The URL of your application (defaults to http://localhost:3000 for development)

### Adding New Features

1. Create new components in the appropriate directory under `src/components/`
2. Add new API routes in `src/app/api/` as needed
3. Update types in `src/types/` to reflect any data model changes
4. Update the database schema if necessary

### Database Changes

If you need to modify the database schema:

1. Write a migration script to apply your changes
2. Update the TypeScript types in `src/lib/database/schema.ts`
3. Update any affected utility functions in `src/lib/database/utils.ts`

## License

MIT

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
