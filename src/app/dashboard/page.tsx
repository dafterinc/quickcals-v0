"use client";

import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainLayout } from "@/components/layouts/MainLayout";

import { Mic, Camera, Send, PlusCircle, ArrowDown, ChevronDown } from "lucide-react";

export default function Dashboard() {
  // Dummy data for demonstration
  const dailyCalories = {
    consumed: 1450,
    goal: 2000,
    percentage: 72.5,
  };
  
  const recentMeals = [
    { id: 1, time: "8:30 AM", name: "Breakfast", calories: 450, details: "Oatmeal with banana and honey" },
    { id: 2, time: "12:15 PM", name: "Lunch", calories: 650, details: "Grilled chicken salad with olive oil dressing" },
    { id: 3, time: "3:30 PM", name: "Snack", calories: 150, details: "Greek yogurt with berries" },
    { id: 4, time: "7:00 PM", name: "Dinner", calories: 200, details: "Vegetable soup" },
  ];

  const macros = {
    protein: 75,
    carbs: 120,
    fat: 45
  };

  // Loading states for skeleton
  const [loading, setLoading] = React.useState(false);

  return (
    <MainLayout>
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Top Status Bar */}
        <div className="mb-4 rounded-xl bg-card p-4 shadow-sm border cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Today's Progress</h2>
              <p className="text-muted-foreground">
                {dailyCalories.consumed} / {dailyCalories.goal} calories
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-3">
            <Progress value={dailyCalories.percentage} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            <Card className="flex-1 flex flex-col h-[70vh]">
              <CardHeader>
                <CardTitle>Chat with QuickCals</CardTitle>
                <CardDescription>
                  Log your meals through text, voice, or image
                </CardDescription>
              </CardHeader>
              {/* Chat Messages Area */}
              <ScrollArea className="flex-1 px-6">
                <div className="space-y-4 pb-4">
                  {/* AI Message */}
                  <div className="flex items-start gap-3">
                    <Avatar className="flex-shrink-0 h-9 w-9 bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200">
                      <span>QC</span>
                    </Avatar>
                    <div className="bg-emerald-50 dark:bg-emerald-950/50 dark:border dark:border-emerald-800 rounded-lg p-3 max-w-[80%]">
                      <p className="text-black dark:text-white">
                        Welcome to QuickCals! Tell me what you ate today, or use
                        voice/camera to log your meal quickly.
                      </p>
                    </div>
                  </div>

                  {/* User Message Example */}
                  <div className="flex items-start justify-end gap-3">
                    <div className="bg-white dark:bg-gray-800 border rounded-lg p-3 max-w-[80%]">
                      <p className="text-black dark:text-white">I had a chicken salad for lunch</p>
                    </div>
                    <Avatar className="flex-shrink-0 h-9 w-9 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200">
                      <span>U</span>
                    </Avatar>
                  </div>

                  {/* AI Response with Follow-up */}
                  <div className="flex items-start gap-3">
                    <Avatar className="flex-shrink-0 h-9 w-9 bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200">
                      <span>QC</span>
                    </Avatar>
                    <div className="bg-emerald-50 dark:bg-emerald-950/50 dark:border dark:border-emerald-800 rounded-lg p-3 max-w-[80%]">
                      <p className="mb-2 text-black dark:text-white">
                        Great! Could you tell me more about your chicken salad?
                      </p>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">
                        What type of dressing did you use? Any additional toppings?
                      </p>
                    </div>
                  </div>

                  {/* Loading Skeleton (shown when loading) */}
                  {loading && (
                    <div className="flex items-start gap-3">
                      <Avatar className="flex-shrink-0 h-9 w-9 bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200">
                        <span>QC</span>
                      </Avatar>
                      <div className="space-y-2 max-w-[80%]">
                        <Skeleton className="h-12 w-64" />
                        <Skeleton className="h-8 w-40" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <CardFooter className="border-t p-4">
                <div className="flex w-full gap-2 items-center">
                  <Button variant="outline" size="icon" className="rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-700 dark:hover:text-emerald-300">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-700 dark:hover:text-emerald-300">
                    <Camera className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="Type what you ate..."
                      className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-700 bg-background"
                    />
                    <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Right Side Panel */}
          <div className="space-y-4">
            {/* Today's Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMeals.map((meal) => (
                    <div key={meal.id} className="flex justify-between items-start border-b pb-2 last:border-b-0 last:pb-0">
                      <div>
                        <p className="font-medium">{meal.name} <span className="text-xs text-muted-foreground">({meal.time})</span></p>
                        <p className="text-sm text-muted-foreground">{meal.details}</p>
                      </div>
                      <span className="font-medium text-sm">{meal.calories} cal</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Meal
                </Button>
              </CardFooter>
            </Card>

            {/* Nutrition Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Protein</span>
                      <span className="text-sm text-muted-foreground">{macros.protein}g</span>
                    </div>
                    <Progress value={macros.protein / 2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Carbs</span>
                      <span className="text-sm text-muted-foreground">{macros.carbs}g</span>
                    </div>
                    <Progress value={macros.carbs / 3} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Fat</span>
                      <span className="text-sm text-muted-foreground">{macros.fat}g</span>
                    </div>
                    <Progress value={macros.fat * 2} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weight Tracking Teaser */}
            <Card>
              <CardHeader>
                <CardTitle>Weight Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-4">
                <p className="text-muted-foreground mb-4">Track your weight progress over time</p>
                <Button>Update Weight</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
