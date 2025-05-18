"use client";

import React, { useState } from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subDays, format, startOfToday, startOfDay, endOfDay, isSameDay } from "date-fns";
import { Search, Plus } from "lucide-react";
import { DateSelector } from "@/components/history/DateSelector";
import { MealCard, MealEntry } from "@/components/history/MealCard";
import { WeightCard, WeightEntry } from "@/components/history/WeightCard";
import { ChartPlaceholder } from "@/components/history/ChartPlaceholder";

// Generate an array of dates for the past 7 days
const generateDatesForLastWeek = () => {
  const today = startOfToday();
  return Array.from({ length: 7 }, (_, i) => subDays(today, 6 - i));
};

// Sample data for meal history
const sampleMealHistory: MealEntry[] = [
  {
    id: "1",
    name: "Oatmeal with Berries",
    mealType: "breakfast",
    calories: 320,
    protein: 12,
    carbs: 45,
    fat: 8,
    date: new Date("2023-07-01T08:30:00"),
    image: "/placeholders/oatmeal.jpg"
  },
  {
    id: "2",
    name: "Chicken Salad",
    mealType: "lunch",
    calories: 450,
    protein: 35,
    carbs: 20,
    fat: 15,
    date: new Date("2023-07-01T13:00:00"),
    image: "/placeholders/salad.jpg"
  },
  {
    id: "3",
    name: "Protein Shake",
    mealType: "snack",
    calories: 180,
    protein: 25,
    carbs: 10,
    fat: 3,
    date: new Date("2023-07-01T16:00:00"),
    image: "/placeholders/protein-shake.jpg"
  },
  {
    id: "4",
    name: "Grilled Salmon with Vegetables",
    mealType: "dinner",
    calories: 520,
    protein: 40,
    carbs: 25,
    fat: 22,
    date: new Date("2023-07-01T19:00:00"),
    image: "/placeholders/salmon.jpg"
  }
];

// Sample data for weight history
const sampleWeightHistory: WeightEntry[] = [
  {
    id: "1",
    weight: 75.2,
    date: new Date("2023-07-01"),
    note: "After morning workout",
    previousWeight: 75.5
  },
  {
    id: "2",
    weight: 75.0,
    date: new Date("2023-06-30"),
    note: "Feeling good today",
    previousWeight: 75.2
  },
  {
    id: "3",
    weight: 75.2,
    date: new Date("2023-06-29"),
    previousWeight: 75.3
  },
  {
    id: "4",
    weight: 75.3,
    date: new Date("2023-06-28"),
    note: "High carb day yesterday",
    previousWeight: 75.0
  }
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("meal-history");
  const [dateRange, setDateRange] = useState(generateDatesForLastWeek());
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [mealTypeFilter, setMealTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter meals based on selected date and filters
  const filteredMeals = sampleMealHistory.filter(meal => {
    const mealDate = new Date(meal.date);
    const isDateMatch = isSameDay(mealDate, selectedDate);
    const isMealTypeMatch = mealTypeFilter === "all" || meal.mealType === mealTypeFilter;
    const isSearchMatch = meal.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return isDateMatch && isMealTypeMatch && isSearchMatch;
  });

  // Filter weights based on selected date
  const filteredWeights = sampleWeightHistory.filter(entry => 
    isSameDay(entry.date, selectedDate)
  );

  // Handlers for UI interactions
  const handleViewMeal = (id: string) => {
    console.log("View meal", id);
  };

  const handleEditMeal = (id: string) => {
    console.log("Edit meal", id);
  };

  const handleDeleteMeal = (id: string) => {
    console.log("Delete meal", id);
  };

  const handleEditWeight = (id: string) => {
    console.log("Edit weight", id);
  };

  const handleDeleteWeight = (id: string) => {
    console.log("Delete weight", id);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 max-w-6xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-muted-foreground">Track and analyze your nutrition and weight history</p>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meal-history">Meal History</TabsTrigger>
            <TabsTrigger value="weight-history">Weight History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Meal History Tab */}
          <TabsContent value="meal-history" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-3">
                <DateSelector 
                  dateRange={dateRange} 
                  selectedDate={selectedDate} 
                  onDateSelect={setSelectedDate}
                />
              </div>
              
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Filters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Select value={mealTypeFilter} onValueChange={setMealTypeFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Meal Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Meals</SelectItem>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                          <SelectItem value="snack">Snack</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="relative flex-grow">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search meals..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      
                      <Button className="flex-shrink-0">
                        <Plus className="mr-2 h-4 w-4" /> Add Meal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {filteredMeals.length > 0 ? (
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMeals.map(meal => (
                    <MealCard
                      key={meal.id}
                      meal={meal}
                      onView={handleViewMeal}
                      onEdit={handleEditMeal}
                      onDelete={handleDeleteMeal}
                    />
                  ))}
                </div>
              ) : (
                <div className="lg:col-span-3 flex flex-col items-center justify-center p-8 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground text-center mb-4">No meals found for this date or filter.</p>
                  <Button>Add a Meal</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Weight History Tab */}
          <TabsContent value="weight-history" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-3">
                <DateSelector 
                  dateRange={dateRange} 
                  selectedDate={selectedDate} 
                  onDateSelect={setSelectedDate}
                  title="Weight History"
                />
              </div>
              
              <div className="lg:col-span-3">
                <ChartPlaceholder 
                  title="Weight Trend" 
                  type="line"
                  note="Your weight trend over time will appear here"
                />
              </div>
              
              <div className="lg:col-span-3 flex justify-between items-center">
                <h3 className="text-lg font-medium">Weight Log</h3>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Weight
                </Button>
              </div>

              {filteredWeights.length > 0 ? (
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredWeights.map(entry => (
                    <WeightCard
                      key={entry.id}
                      entry={entry}
                      onEdit={handleEditWeight}
                      onDelete={handleDeleteWeight}
                    />
                  ))}
                </div>
              ) : (
                <div className="lg:col-span-3 flex flex-col items-center justify-center p-8 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground text-center mb-4">No weight entries found for this date.</p>
                  <Button>Add Weight Entry</Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChartPlaceholder 
                title="Calorie Consumption" 
                type="bar"
                note="Your daily calorie consumption trend will appear here"
              />
              
              <ChartPlaceholder 
                title="Macronutrient Distribution" 
                type="pie"
                note="Your macronutrient distribution will appear here"
              />
              
              <ChartPlaceholder 
                title="Weight vs. Calorie Intake" 
                type="line"
                note="Correlation between weight and calorie intake will appear here"
                className="md:col-span-2"
              />
              
              <ChartPlaceholder 
                title="Meal Type Distribution" 
                type="pie"
                note="Distribution of your meal types will appear here"
              />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Nutritional Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between">
                      <span>Average Daily Calories</span>
                      <span className="font-medium">1,870 kcal</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Average Protein</span>
                      <span className="font-medium">112g (24%)</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Average Carbs</span>
                      <span className="font-medium">205g (44%)</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Average Fat</span>
                      <span className="font-medium">67g (32%)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
