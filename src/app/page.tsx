import { ExampleShowcase } from "@/components/ui/example-showcase";
import { GuestLayout } from "@/components/layouts/GuestLayout";

export default function Home() {
  return (
    <GuestLayout>
      <div className="py-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">QuickCals</h1>
          <p className="text-muted-foreground mb-8">A modern nutrition tracking app</p>
        </div>
        
        <ExampleShowcase />
      </div>
    </GuestLayout>
  );
}
