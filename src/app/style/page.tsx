import { ThemeShowcase } from "@/components/ui/theme-showcase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickCalsComponents } from "@/components/ui/quickcals-components";

export default function StylesheetPage() {
  return (
    <div className="py-10 px-4 sm:px-6 overflow-hidden">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">QuickCals Stylesheet</h1>
        <p className="text-muted-foreground mt-1">
          Design system and component library
        </p>
      </div>
      
      <Tabs defaultValue="components" className="w-full">
        <div className="flex justify-center w-full">
          <TabsList className="grid w-full max-w-6xl grid-cols-3 overflow-hidden">
            <TabsTrigger value="components">UI Components</TabsTrigger>
            <TabsTrigger value="quickcals">QuickCals Components</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="components" className="mt-6">
          <ThemeShowcase />
        </TabsContent>
        
        <TabsContent value="quickcals" className="mt-6">
          <QuickCalsComponents />
        </TabsContent>
        
        <TabsContent value="guidelines" className="mt-6">
          <div className="max-w-4xl prose prose-gray dark:prose-invert">
            <h2 className="text-2xl font-bold">Design Guidelines</h2>
            
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Color Usage</h3>
              <p className="leading-7 mt-2">
                QuickCals uses a soft green color palette that conveys health, nutrition, and wellness while maintaining excellent accessibility and readability across both light and dark modes.
              </p>
              
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>
                  <strong>Primary</strong> - Used for main actions, key UI elements, and primary buttons.
                </li>
                <li>
                  <strong>Secondary</strong> - Used for secondary actions and supporting UI elements.
                </li>
                <li>
                  <strong>Accent</strong> - Used sparingly to highlight important information or interactive elements.
                </li>
                <li>
                  <strong>Destructive</strong> - Used only for delete actions or critical warnings.
                </li>
              </ul>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Typography</h3>
              <p className="leading-7 mt-2">
                QuickCals uses a combination of Geist Sans for general UI, Geist Mono for code and numeric data, and Space Mono for accent text elements.
              </p>
              
              <h4 className="text-lg font-medium mt-6">Heading Hierarchy</h4>
              <div className="space-y-4 mt-3">
                <div>
                  <h1 className="text-4xl font-bold">H1 - Page Titles (4xl)</h1>
                </div>
                <div>
                  <h2 className="text-3xl font-bold">H2 - Section Titles (3xl)</h2>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">H3 - Major Subsections (2xl)</h3>
                </div>
                <div>
                  <h4 className="text-xl font-medium">H4 - Minor Subsections (xl)</h4>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Component Guidelines</h3>
              
              <h4 className="text-lg font-medium mt-6">Card Layout</h4>
              <p className="leading-7 mt-2">
                All cards in QuickCals should follow a consistent structure:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2">
                <li>
                  <strong>Card Header</strong> - Always includes a clear title, with an optional description
                </li>
                <li>
                  <strong>Card Content</strong> - Main information organized with proper spacing and hierarchy
                </li>
                <li>
                  <strong>Card Footer</strong> - Optional area for actions related to the card's content
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}