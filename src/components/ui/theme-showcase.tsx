import React from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Separator } from './separator';
import { Switch } from './switch';
import { Checkbox } from './checkbox';
import { Progress } from './progress';

export function ThemeShowcase() {
  return (
    <div className="w-full space-y-8">
      {/* Color Palette Section */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>The base colors used throughout the QuickCals app</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Primary Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-10 rounded bg-primary"></div>
                  <span className="text-sm">Primary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-10 rounded bg-primary-foreground"></div>
                  <span className="text-sm">Primary Foreground</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-3">Secondary Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="size-10 rounded bg-secondary"></div>
                  <span className="text-sm">Secondary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-10 rounded bg-secondary-foreground"></div>
                  <span className="text-sm">Secondary Foreground</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <h3 className="text-sm font-semibold mb-3">UI Elements</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            <div className="flex flex-col items-center">
              <div className="size-10 rounded bg-accent"></div>
              <span className="text-xs mt-1">Accent</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="size-10 rounded bg-accent-foreground"></div>
              <span className="text-xs mt-1">Accent FG</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="size-10 rounded bg-muted"></div>
              <span className="text-xs mt-1">Muted</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="size-10 rounded bg-muted-foreground"></div>
              <span className="text-xs mt-1">Muted FG</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="size-10 rounded bg-destructive"></div>
              <span className="text-xs mt-1">Destructive</span>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <h3 className="text-sm font-semibold mb-3">Background & Surfaces</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="size-10 rounded bg-background border"></div>
              <span className="text-xs mt-1">Background</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="size-10 rounded bg-card border"></div>
              <span className="text-xs mt-1">Card</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="size-10 rounded bg-popover border"></div>
              <span className="text-xs mt-1">Popover</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* UI Components Section */}
      <Card>
        <CardHeader>
          <CardTitle>UI Components</CardTitle>
          <CardDescription>Core components with the QuickCals theme applied</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Badges</h3>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Form Controls</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch id="airplane-mode" />
                  <label htmlFor="airplane-mode" className="text-sm">Switch</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm">Checkbox</label>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm">Progress</label>
                <Progress value={66} className="w-full" />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Alerts</h3>
            <Alert>
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an information alert — check it out!
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 