import Image from "next/image";
import { TestTailwind } from "@/components/ui/test-tailwind";
import { ThemeShowcase } from "@/components/ui/theme-showcase";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";

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
        
        <TestTailwind />
        
        <ThemeShowcase />
        
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-md border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-primary-foreground gap-2 hover:bg-primary/90 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
          <a
            className="rounded-md border border-solid border-primary/20 transition-colors flex items-center justify-center hover:bg-primary/10 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-xs text-muted-foreground">
        <span>© 2023 QuickCals</span>
      </footer>
    </div>
  );
}
