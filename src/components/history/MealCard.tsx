"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MealEntry {
  id: string;
  name: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: Date;
  image?: string;
}

interface MealCardProps {
  meal: MealEntry;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function MealCard({ meal, onView, onEdit, onDelete }: MealCardProps) {
  const mealTypeColors = {
    breakfast: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    lunch: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    dinner: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    snack: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={meal.image} alt={meal.name} />
          <AvatarFallback className="bg-muted">{meal.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{meal.name}</h3>
            <Badge variant="outline" className={cn("text-xs", mealTypeColors[meal.mealType])}>
              {meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {meal.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 grid grid-cols-3 gap-2 text-sm">
        <div className="flex flex-col items-center p-2 bg-muted/30 rounded">
          <span className="font-semibold">{meal.calories}</span>
          <span className="text-xs text-muted-foreground">Calories</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-muted/30 rounded">
          <span className="font-semibold">{meal.protein}g</span>
          <span className="text-xs text-muted-foreground">Protein</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-muted/30 rounded">
          <span className="font-semibold">{meal.carbs}g</span>
          <span className="text-xs text-muted-foreground">Carbs</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        {onView && (
          <Button variant="ghost" size="icon" onClick={() => onView(meal.id)}>
            <Eye className="h-4 w-4" />
          </Button>
        )}
        {onEdit && (
          <Button variant="ghost" size="icon" onClick={() => onEdit(meal.id)}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
        {onDelete && (
          <Button variant="ghost" size="icon" onClick={() => onDelete(meal.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 