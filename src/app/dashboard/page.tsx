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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { 
  Mic, 
  Camera, 
  Send, 
  PlusCircle, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Droplets, 
  BadgeCheck, 
  Edit2, 
  Trash2, 
  Info, 
  GripVertical, 
  BarChart3,
  Activity,
  Utensils,
  Weight,
  MoreVertical
} from "lucide-react";

// Define meal type
interface Meal {
  id: number;
  time: string;
  name: string;
  calories: number;
  details: string;
}

// Define pending meal type
interface PendingMeal {
  name: string;
  details: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

// Define weekly data point
interface WeekDataPoint {
  day: string;
  calories: number;
}

export default function Dashboard() {
  // State for expanded status bar
  const [statusExpanded, setStatusExpanded] = React.useState(false);
  
  // Input text state
  const [inputText, setInputText] = React.useState("");
  
  // Water intake state
  const [waterIntake, setWaterIntake] = React.useState(3);
  const waterGoal = 8;
  
  // State for meal confirmation dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [pendingMeal, setPendingMeal] = React.useState<PendingMeal | null>(null);

  // Loading states for skeleton
  const [loading, setLoading] = React.useState(false);

  // Dummy data for demonstration
  const dailyCalories = {
    consumed: 1450,
    goal: 2000,
    percentage: 72.5,
  };
  
  const recentMeals: Meal[] = [
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
  
  const weeklyData: WeekDataPoint[] = [
    { day: "Mon", calories: 1820 },
    { day: "Tue", calories: 1950 },
    { day: "Wed", calories: 2100 },
    { day: "Thu", calories: 1780 },
    { day: "Fri", calories: 1700 },
    { day: "Sat", calories: 2250 },
    { day: "Sun", calories: 1450 },
  ];
  
  // Weight data
  const weightData = {
    current: 165.4,
    previous: 167.2,
    change: -1.8,
    goal: 160
  };
  
  // Handle sending messages
  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Show loading state
    setLoading(true);
    
    // Simulate API response time
    setTimeout(() => {
      setLoading(false);
      // Mock meal confirmation - in real app this would come from AI response
      setPendingMeal({
        name: "Lunch",
        details: inputText,
        calories: 550,
        protein: 32,
        carbs: 45,
        fat: 18
      });
      setConfirmDialogOpen(true);
      setInputText("");
    }, 1500);
  };
  
  // Handle meal confirmation
  const handleConfirmMeal = () => {
    // In real app, this would save to database
    setConfirmDialogOpen(false);
    setPendingMeal(null);
  };
  
  // Handle water increment/decrement
  const handleWaterChange = (amount: number) => {
    setWaterIntake(Math.max(0, waterIntake + amount));
  };
  
  // Function to get the height for weekly bars
  const getBarHeight = (calories: number) => {
    const maxCalories = Math.max(...weeklyData.map(d => d.calories));
    return (calories / maxCalories) * 100;
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Top Status Bar */}
        <Card 
          className="mb-4 cursor-pointer transition-all duration-200 overflow-hidden"
          style={{ maxHeight: statusExpanded ? '600px' : '110px' }}
          onClick={() => setStatusExpanded(!statusExpanded)}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Today's Progress</h2>
                <p className="text-muted-foreground">
                  {dailyCalories.consumed} / {dailyCalories.goal} calories
                </p>
              </div>
              <Button variant="ghost" size="icon">
                {statusExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>
            <div className="mt-3">
              <Progress value={dailyCalories.percentage} className="h-2" />
            </div>
            
            {/* Expanded Status Content */}
            {statusExpanded && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <Utensils className="h-4 w-4 mr-1 text-emerald-500" />
                    Nutrition Summary
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Protein</span>
                        <span className="text-muted-foreground">{macros.protein}g</span>
                      </div>
                      <Progress value={75} className="h-1.5 mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Carbs</span>
                        <span className="text-muted-foreground">{macros.carbs}g</span>
                      </div>
                      <Progress value={60} className="h-1.5 mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Fat</span>
                        <span className="text-muted-foreground">{macros.fat}g</span>
                      </div>
                      <Progress value={40} className="h-1.5 mt-1" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <Droplets className="h-4 w-4 mr-1 text-blue-500" />
                    Water Intake
                  </h3>
                  <div className="flex items-center gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWaterChange(-1);
                      }}
                    >-</Button>
                    <div className="flex-1">
                      <Progress value={(waterIntake / waterGoal) * 100} className="h-2 bg-blue-100" />
                      <p className="text-center text-sm mt-1 text-muted-foreground">
                        {waterIntake} / {waterGoal} glasses
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWaterChange(1);
                      }}
                    >+</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <Weight className="h-4 w-4 mr-1 text-purple-500" />
                    Weight Progress
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="text-2xl font-semibold">{weightData.current}</div>
                    <div className={`text-sm ${weightData.change < 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {weightData.change < 0 ? '↓' : '↑'} {Math.abs(weightData.change)} lbs
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Goal: {weightData.goal} lbs
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Chat Area */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <Card className="flex-1 flex flex-col h-[60vh]">
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
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-700 dark:hover:text-emerald-300"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 hover:text-emerald-700 dark:hover:text-emerald-300"
                  >
                    <Camera className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="Type what you ate..."
                      className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-700 bg-background"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                      size="icon" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
            
            {/* Weekly Overview */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-emerald-500" />
                  Weekly Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end h-24 gap-1">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className={`w-full bg-emerald-200 dark:bg-emerald-800 rounded-t-sm ${day.day === 'Sun' ? 'bg-emerald-500 dark:bg-emerald-600' : ''}`} 
                        style={{ 
                          height: `${getBarHeight(day.calories)}%`,
                          minHeight: '4px'
                        }}
                      ></div>
                      <div className="text-xs mt-1">{day.day}</div>
                      <div className="text-xs text-muted-foreground">{day.calories}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side Panel */}
          <div className="space-y-4">
            {/* Today's Stats */}
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle>Today's Meals</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" /> Change Date
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Meal
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMeals.map((meal) => (
                    <div key={meal.id} className="flex justify-between items-start border-b pb-3 last:border-b-0 last:pb-0">
                      <div>
                        <p className="font-medium">{meal.name} <span className="text-xs text-muted-foreground">({meal.time})</span></p>
                        <p className="text-sm text-muted-foreground">{meal.details}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium text-sm">{meal.calories} cal</span>
                        <div className="flex space-x-1 mt-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Meal
                </Button>
              </CardFooter>
            </Card>

            {/* Nutrition Breakdown */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Utensils className="h-4 w-4 mr-2 text-emerald-500" />
                  Nutrition Breakdown
                </CardTitle>
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
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Water</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 w-7 p-0"
                        onClick={() => handleWaterChange(-1)}
                      >-</Button>
                      <span className="text-sm whitespace-nowrap">{waterIntake}/{waterGoal}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 w-7 p-0"
                        onClick={() => handleWaterChange(1)}
                      >+</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weight Tracking */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Weight className="h-4 w-4 mr-2 text-purple-500" />
                  Weight Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-2xl font-semibold">{weightData.current} lbs</div>
                    <div className={`text-sm ${weightData.change < 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                      {weightData.change < 0 ? '↓' : '↑'} {Math.abs(weightData.change)} lbs this week
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress to goal</span>
                      <span className="text-muted-foreground">
                        {(((weightData.previous - weightData.current) / (weightData.previous - weightData.goal)) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Progress 
                      value={(((weightData.previous - weightData.current) / (weightData.previous - weightData.goal)) * 100)} 
                      className="h-2" 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="text-xs w-full">
                  View Detailed History
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Meal Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-emerald-500" />
              Confirm Meal Entry
            </DialogTitle>
            <DialogDescription>
              Please verify the nutritional information below
            </DialogDescription>
          </DialogHeader>
          
          {pendingMeal && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Meal Type:</span>
                <span>{pendingMeal.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Description:</span>
                <span className="text-sm text-muted-foreground">{pendingMeal.details}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Calories:</span>
                <span>{pendingMeal.calories} cal</span>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Protein</div>
                    <div>{pendingMeal.protein}g</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Carbs</div>
                    <div>{pendingMeal.carbs}g</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Fat</div>
                    <div>{pendingMeal.fat}g</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex sm:justify-between">
            <Button variant="ghost" onClick={() => setConfirmDialogOpen(false)}>
              Adjust
            </Button>
            <Button onClick={handleConfirmMeal}>
              Confirm & Log Meal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
