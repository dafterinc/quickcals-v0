"use client";

import React from "react";
import { MainLayout } from "@/components/layouts/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { 
  User, 
  Weight, 
  Activity, 
  Calendar, 
  Edit2,
  Check,
  Target,
  Heart,
  LineChart,
  Settings,
  InfoIcon,
  Flame,
  RefreshCw,
  Save
} from "lucide-react";

// Define activity level type
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";

// Define user type
interface UserProfile {
  name: string;
  email: string;
  joinedDate: string;
  height: number;
  weight: number;
  age: number;
  gender: string;
  activityLevel: ActivityLevel;
  weightGoal: number;
  weightUnit: string;
  heightUnit: string;
  calorieGoal: number;
}

export default function ProfilePage() {
  // Demo user data - in a real app, this would come from a database
  const [user, setUser] = React.useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    joinedDate: "March 2023",
    height: 180, // cm
    weight: 76, // kg
    age: 32,
    gender: "male",
    activityLevel: "moderate",
    weightGoal: 72, // kg
    weightUnit: "kg",
    heightUnit: "cm",
    calorieGoal: 2000,
  });
  
  const [editing, setEditing] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState<UserProfile>(user);

  // Calculate BMR using the Mifflin-St Jeor Equation
  const calculateBMR = () => {
    if (user.gender === "male") {
      return Math.round(10 * user.weight + 6.25 * user.height - 5 * user.age + 5);
    } else {
      return Math.round(10 * user.weight + 6.25 * user.height - 5 * user.age - 161);
    }
  };
  
  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const activityMultipliers = {
      sedentary: 1.2, // Little to no exercise
      light: 1.375, // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725, // Hard exercise 6-7 days/week
      veryActive: 1.9, // Very hard exercise & physical job
    };
    return Math.round(bmr * activityMultipliers[user.activityLevel]);
  };

  // Weight progress percentage
  const calculateWeightProgress = () => {
    // This is a simplified calculation - in a real app you might compare starting weight to goal
    const startWeight = 80; // Example starting weight
    const progressPercentage = 
      ((startWeight - user.weight) / (startWeight - user.weightGoal)) * 100;
    return Math.min(100, Math.max(0, progressPercentage));
  };
  
  const handleSaveProfile = () => {
    setUser(editedUser);
    setEditing(false);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - User Profile */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald-500" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-center mb-6">
                  <Avatar className="h-24 w-24 border-2 border-emerald-500">
                    <span className="text-2xl">{user.name.substring(0, 2)}</span>
                  </Avatar>
                </div>
                
                {editing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={editedUser.name} 
                        onChange={e => setEditedUser({...editedUser, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={editedUser.email} 
                        onChange={e => setEditedUser({...editedUser, email: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input 
                          id="age" 
                          type="number" 
                          value={editedUser.age} 
                          onChange={e => setEditedUser({...editedUser, age: Number(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select 
                          value={editedUser.gender}
                          onValueChange={(value) => setEditedUser({...editedUser, gender: value})}
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setEditedUser(user);
                          setEditing(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span>{user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since</span>
                      <span>{user.joinedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age</span>
                      <span>{user.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gender</span>
                      <span className="capitalize">{user.gender}</span>
                    </div>
                    <div className="pt-4">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setEditing(true)}
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Activity Level Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  Activity Level
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {editing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="activityLevel">Activity Level</Label>
                      <Select 
                        value={editedUser.activityLevel}
                        onValueChange={(value: ActivityLevel) => setEditedUser({...editedUser, activityLevel: value})}
                      >
                        <SelectTrigger id="activityLevel">
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary (Office job, little exercise)</SelectItem>
                          <SelectItem value="light">Lightly Active (1-3 days/week)</SelectItem>
                          <SelectItem value="moderate">Moderately Active (3-5 days/week)</SelectItem>
                          <SelectItem value="active">Very Active (6-7 days/week)</SelectItem>
                          <SelectItem value="veryActive">Extremely Active (Physical job, intense training)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-2 px-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-md border border-emerald-100 dark:border-emerald-900">
                      <div className="font-medium capitalize">{user.activityLevel}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.activityLevel === 'sedentary' && 'Office job, little exercise'}
                        {user.activityLevel === 'light' && 'Light exercise 1-3 days/week'}
                        {user.activityLevel === 'moderate' && 'Moderate exercise 3-5 days/week'}
                        {user.activityLevel === 'active' && 'Hard exercise 6-7 days/week'}
                        {user.activityLevel === 'veryActive' && 'Very hard exercise & physical job'}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your activity level affects your calorie needs and metabolism calculations.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Middle Column - Body Measurements */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-emerald-500" />
                  Body Measurements
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {editing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="height">Height</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="height" 
                            type="number" 
                            value={editedUser.height} 
                            onChange={e => setEditedUser({...editedUser, height: Number(e.target.value)})}
                            className="flex-1"
                          />
                          <Select 
                            value={editedUser.heightUnit}
                            onValueChange={(value) => setEditedUser({...editedUser, heightUnit: value})}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cm">cm</SelectItem>
                              <SelectItem value="in">in</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Current Weight</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="weight" 
                            type="number" 
                            value={editedUser.weight} 
                            onChange={e => setEditedUser({...editedUser, weight: Number(e.target.value)})}
                            className="flex-1"
                          />
                          <Select 
                            value={editedUser.weightUnit}
                            onValueChange={(value) => setEditedUser({...editedUser, weightUnit: value})}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="lbs">lbs</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weightGoal">Weight Goal</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="weightGoal" 
                          type="number" 
                          value={editedUser.weightGoal} 
                          onChange={e => setEditedUser({...editedUser, weightGoal: Number(e.target.value)})}
                          className="flex-1"
                        />
                        <Select disabled value={editedUser.weightUnit}>
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={editedUser.weightUnit}>{editedUser.weightUnit}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground">Height</div>
                          <div className="text-xl font-semibold">{user.height} {user.heightUnit}</div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <div className="text-sm text-muted-foreground">Current Weight</div>
                          <div className="text-xl font-semibold">{user.weight} {user.weightUnit}</div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Target className="h-4 w-4 text-emerald-500" />
                            Weight Goal
                          </span>
                          <span className="font-medium">{user.weightGoal} {user.weightUnit}</span>
                        </div>
                        <Progress value={calculateWeightProgress()} className="h-2" />
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>Current: {user.weight} {user.weightUnit}</span>
                          <span>Goal: {user.weightGoal} {user.weightUnit}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              {!editing && (
                <CardFooter>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setEditing(true)}
                  >
                    Update Measurements
                  </Button>
                </CardFooter>
              )}
            </Card>
            
            {/* Calorie Targets */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  Calorie Targets
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                {editing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="calorieGoal">Daily Calorie Goal</Label>
                      <Input 
                        id="calorieGoal" 
                        type="number" 
                        value={editedUser.calorieGoal} 
                        onChange={e => setEditedUser({...editedUser, calorieGoal: Number(e.target.value)})}
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => {
                          setEditedUser({...editedUser, calorieGoal: calculateTDEE() - 500});
                        }}
                      >
                        Weight Loss
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => {
                          setEditedUser({...editedUser, calorieGoal: calculateTDEE()});
                        }}
                      >
                        Maintenance
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => {
                          setEditedUser({...editedUser, calorieGoal: calculateTDEE() + 500});
                        }}
                      >
                        Weight Gain
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Daily Calorie Goal</span>
                      <span className="text-xl font-semibold">{user.calorieGoal}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="p-2 rounded-md bg-muted">
                        <div className="font-medium">{calculateTDEE() - 500}</div>
                        <div className="text-xs text-muted-foreground">Weight Loss</div>
                      </div>
                      <div className="p-2 rounded-md bg-muted">
                        <div className="font-medium">{calculateTDEE()}</div>
                        <div className="text-xs text-muted-foreground">Maintenance</div>
                      </div>
                      <div className="p-2 rounded-md bg-muted">
                        <div className="font-medium">{calculateTDEE() + 500}</div>
                        <div className="text-xs text-muted-foreground">Weight Gain</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - BMR & Calculations */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  Metabolic Information
                </CardTitle>
                <CardDescription>
                  Your BMR and energy expenditure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium flex items-center gap-1">
                        <InfoIcon className="h-4 w-4" />
                        Basal Metabolic Rate (BMR)
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold">{calculateBMR()}</span>
                        <span className="text-muted-foreground">cal/day</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      This is the number of calories your body needs to maintain basic functions at rest.
                    </p>
                    <div className="p-3 bg-muted/50 rounded-md text-sm mt-4">
                      <div className="mb-1 font-medium">BMR Calculation Formula:</div>
                      <div className="text-muted-foreground">
                        {user.gender === "male" 
                          ? "10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5"
                          : "10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161"}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium flex items-center gap-1">
                        <Activity className="h-4 w-4" />
                        Total Daily Energy (TDEE)
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold">{calculateTDEE()}</span>
                        <span className="text-muted-foreground">cal/day</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This is your estimated daily calorie need based on your BMR and activity level.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Body Mass Index (BMI)</span>
                      <span className="font-semibold">
                        {(user.weight / Math.pow(user.height / 100, 2)).toFixed(1)}
                      </span>
                    </div>
                    <div className="h-2 bg-muted mt-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 via-emerald-400 to-orange-400"
                        style={{ 
                          width: "100%", 
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          
            {/* Settings & Preferences Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email Notifications</span>
                    <div className="flex items-center h-5 w-11 rounded-full bg-muted p-1 cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-emerald-500 ml-auto"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weekly Progress Report</span>
                    <div className="flex items-center h-5 w-11 rounded-full bg-muted p-1 cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-emerald-500 ml-auto"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reminder Notifications</span>
                    <div className="flex items-center h-5 w-11 rounded-full bg-emerald-500 p-1 cursor-pointer">
                      <div className="h-3 w-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Advanced Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
