"use client";

import React from "react";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { toast } from "sonner";

export function ExampleShowcase() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">QuickCals Component Showcase</h2>
      
      <Tabs defaultValue="meal-entry" className="w-full mb-8">
        <div className="flex justify-center w-full">
          <TabsList className="grid w-full max-w-4xl grid-cols-3 overflow-hidden">
            <TabsTrigger value="meal-entry">Meal Entry</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="meal-entry" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Log Your Meal</CardTitle>
              <CardDescription>Enter details about what you ate or drank</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="meal-description">Meal Description</Label>
                <Textarea id="meal-description" placeholder="Describe what you ate..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meal-time">When did you eat?</Label>
                <Input id="meal-time" type="time" />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => toast.success("Meal logged successfully!")}
                className="w-full"
              >
                Log Meal
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Meal History</CardTitle>
              <CardDescription>Your recent meal entries</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your meal history will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Your personal information and BMR</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="weight">Current Weight (kg)</Label>
                <Input id="weight" type="number" placeholder="Enter your weight" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" placeholder="Enter your height" />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => toast.success("Profile updated!")}
                className="w-full"
              >
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 