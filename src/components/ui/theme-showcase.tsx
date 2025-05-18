import React from 'react';

export function ThemeShowcase() {
  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-xl shadow-md font-mono">
      <h2 className="text-xl font-bold text-card-foreground mb-4">Theme Colors</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold mb-2">Primary Colors</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary"></div>
              <span className="text-xs">Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary-foreground"></div>
              <span className="text-xs">Primary Foreground</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold mb-2">Secondary Colors</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-secondary"></div>
              <span className="text-xs">Secondary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-secondary-foreground"></div>
              <span className="text-xs">Secondary Foreground</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">UI Elements</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded bg-accent"></div>
            <span className="text-xs mt-1">Accent</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded bg-muted"></div>
            <span className="text-xs mt-1">Muted</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded bg-destructive"></div>
            <span className="text-xs mt-1">Destructive</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded mr-2">
          Primary Button
        </button>
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded">
          Secondary
        </button>
      </div>
    </div>
  );
} 