"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Edit, Minus, Trash2 } from "lucide-react";
import { format } from "date-fns";

export interface WeightEntry {
  id: string;
  weight: number;
  date: Date;
  note?: string;
  previousWeight?: number;
}

interface WeightCardProps {
  entry: WeightEntry;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function WeightCard({ entry, onEdit, onDelete }: WeightCardProps) {
  const diff = entry.previousWeight 
    ? +(entry.weight - entry.previousWeight).toFixed(1)
    : 0;

  // Determine the change indicator (up, down, or no change)
  const getChangeIndicator = () => {
    if (!entry.previousWeight || diff === 0) {
      return (
        <div className="flex items-center text-muted-foreground">
          <Minus className="h-3 w-3 mr-1" /> 
          <span>No change</span>
        </div>
      );
    } else if (diff > 0) {
      return (
        <div className="flex items-center text-red-500">
          <ArrowUp className="h-3 w-3 mr-1" /> 
          <span>+{diff} kg</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-green-500">
          <ArrowDown className="h-3 w-3 mr-1" /> 
          <span>{diff} kg</span>
        </div>
      );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div>
          <p className="text-sm font-medium">
            {format(entry.date, 'PPP')}
          </p>
          <p className="text-sm text-muted-foreground">
            {format(entry.date, 'EEEE')}
          </p>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="ghost" size="icon" onClick={() => onEdit(entry.id)}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="icon" onClick={() => onDelete(entry.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold">{entry.weight} kg</h3>
            {getChangeIndicator()}
          </div>
          {entry.note && (
            <div className="bg-muted p-3 rounded-md text-sm max-w-[60%]">
              {entry.note}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 