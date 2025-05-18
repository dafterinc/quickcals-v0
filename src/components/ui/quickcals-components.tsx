"use client";

import React from "react";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Label } from "./label";
import { Badge } from "./badge";
import { Progress } from "./progress";
import { Switch } from "./switch";
import { Separator } from "./separator";

export function NutritionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Chicken Salad</span>
          <Badge>Lunch</Badge>
        </CardTitle>
        <CardDescription>Today at 1:30 PM</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Calories</span>
            <span className="text-lg font-bold font-mono">450 kcal</span>
          </div>
          <Progress value={45} className="h-2" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-muted-foreground">Protein</div>
            <div className="text-sm font-semibold font-mono">30g</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Carbs</div>
            <div className="text-sm font-semibold font-mono">40g</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Fat</div>
            <div className="text-sm font-semibold font-mono">15g</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">Edit</Button>
        <Button size="sm">View Details</Button>
      </CardFooter>
    </Card>
  );
}

export function WeightTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Tracker</CardTitle>
        <CardDescription>Your progress over time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs text-muted-foreground">Current</span>
            <div className="text-2xl font-bold font-mono">75 kg</div>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">Goal</span>
            <div className="text-lg font-medium font-mono">70 kg</div>
          </div>
        </div>
        
        <Progress value={71} className="h-2" />
        
        <div className="mt-4">
          <Label htmlFor="weight-input" className="text-sm">Log today's weight</Label>
          <div className="flex mt-1 gap-2">
            <Input id="weight-input" type="number" placeholder="Enter weight" className="flex-1" />
            <Button>Log</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BMRCalculator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your BMR</CardTitle>
        <CardDescription>Basal Metabolic Rate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-md text-center">
          <span className="text-3xl font-bold font-mono">1,850</span>
          <span className="text-sm text-muted-foreground ml-1">calories/day</span>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="activity-level" className="text-sm">Include Activity Level</Label>
            <Switch id="activity-level" />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">TDEE (Total Daily Energy Expenditure)</span>
            <span className="font-semibold font-mono">2,220 kcal</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Recalculate BMR</Button>
      </CardFooter>
    </Card>
  );
}

export function QuickCalsComponents() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div>
        <h3 className="text-sm font-semibold mb-3">Nutrition Card</h3>
        <NutritionCard />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-3">Weight Tracker</h3>
        <WeightTracker />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-3">BMR Calculator</h3>
        <BMRCalculator />
      </div>
    </div>
  );
} 