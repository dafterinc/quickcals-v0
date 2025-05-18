import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { ExampleShowcase } from "@/components/ui/example-showcase";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-mono">
      <header className="w-full flex justify-end">
        <DarkModeToggle />
      </header>
      
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">QuickCals</h1>
          <p className="text-muted-foreground mb-8">A modern nutrition tracking app</p>
        </div>
        
        <ExampleShowcase />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-xs text-muted-foreground">
        <span>© 2023 QuickCals</span>
      </footer>
    </div>
  );
}
