"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart } from "lucide-react";

interface ChartPlaceholderProps {
  title: string;
  type?: "bar" | "line" | "pie";
  className?: string;
  note?: string;
}

export function ChartPlaceholder({ 
  title, 
  type = "bar", 
  className = "",
  note
}: ChartPlaceholderProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/40 rounded-md flex flex-col items-center justify-center p-8 aspect-video">
          {type === "pie" ? (
            <PieChart className="h-16 w-16 text-muted-foreground" />
          ) : (
            <BarChart className="h-16 w-16 text-muted-foreground" />
          )}
          <p className="text-muted-foreground mt-2 text-center px-4">
            {note || "Chart visualization will appear here"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 