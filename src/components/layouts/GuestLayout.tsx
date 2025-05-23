"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { cn } from "@/lib/utils";

export function GuestLayout({
  children,
  fullWidth = false,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex justify-center w-full">
          <div className="container flex h-14 items-center max-w-6xl">
            <div className="mr-4 flex">
              <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="font-bold">QuickCals</span>
              </Link>
              
            </div>
            <div className="flex flex-1 items-center justify-end gap-4">
              <DarkModeToggle />
              <Link href="/login">
                <Button size="sm">Login/Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex justify-center">
        <div className={cn("w-full", !fullWidth && "max-w-6xl")}>
          {children}
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="flex justify-center w-full">
          <div className="container flex justify-center text-sm text-muted-foreground max-w-6xl">
            <span>© 2025 QuickCals</span>
          </div>
        </div>
      </footer>
    </div>
  );
} 