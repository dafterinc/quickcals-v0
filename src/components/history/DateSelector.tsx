"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface DateSelectorProps {
  dateRange: Date[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  title?: string;
}

export function DateSelector({ 
  dateRange, 
  selectedDate, 
  onDateSelect, 
  title = "Select Date" 
}: DateSelectorProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto py-4 gap-3 scrollbar-hide">
          {dateRange.map((date, index) => (
            <HoverCard key={index} openDelay={300}>
              <HoverCardTrigger asChild>
                <Button 
                  variant={date.toDateString() === selectedDate.toDateString() ? "default" : "outline"} 
                  className={`min-w-[80px] h-[90px] flex-shrink-0 flex flex-col items-center justify-center p-0
                             ${date.toDateString() === selectedDate.toDateString() ? 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700' : ''}
                  `}
                  onClick={() => onDateSelect(date)}
                >
                  <span className="text-xs font-normal mb-1">
                    {format(date, 'EEE')}
                  </span>
                  <span className="text-xl font-bold my-1">
                    {date.getDate()}
                  </span>
                  <span className="text-xs font-normal mt-1">
                    {format(date, 'MMM')}
                  </span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-fit px-3 py-2 text-sm">
                {format(date, 'EEEE, MMMM d, yyyy')}
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 