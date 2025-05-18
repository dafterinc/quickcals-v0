import React from 'react';

export function TestTailwind() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-card rounded-xl shadow-md flex items-center space-x-4 font-mono">
      <div className="shrink-0">
        <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">T</span>
        </div>
      </div>
      <div>
        <div className="text-xl font-medium text-card-foreground">Space Mono</div>
        <p className="text-muted-foreground">Green & Beige Theme</p>
      </div>
    </div>
  );
} 