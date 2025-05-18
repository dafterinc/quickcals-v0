import Link from "next/link";
import { GuestLayout } from "@/components/layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <GuestLayout>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            Track Calories with <span className="text-primary">Perfect Accuracy</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            QuickCals makes calorie counting extremely easy through voice, text, or image inputs. 
            Get precise nutritional information with minimal effort.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="font-semibold px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg" className="font-semibold px-8">
                Learn More
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            No credit card required • 14-day free trial
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose QuickCals?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlike other calorie tracking apps, QuickCals focuses on making the process both effortless and accurate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-background border">
              <CardHeader>
                <CardTitle>Multiple Input Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Log meals through voice, text, or by scanning nutrition labels with our OCR technology.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="bg-background border">
              <CardHeader>
                <CardTitle>AI-Powered Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI asks intelligent follow-up questions to capture every detail about your meals.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="bg-background border">
              <CardHeader>
                <CardTitle>Recipe Parsing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simply paste a recipe link and our AI will extract all ingredients and calculate nutrition.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 4 */}
            <Card className="bg-background border">
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your progress with detailed reports on calorie consumption and macronutrient breakdowns.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 5 */}
            <Card className="bg-background border">
              <CardHeader>
                <CardTitle>Chat-Like Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our intuitive, conversational interface makes logging meals feel natural and effortless.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 6 */}
            <Card className="bg-background border">
              <CardHeader>
                <CardTitle>No Guesswork</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Unlike other apps, we never guess calories - we collect precise data for accurate tracking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How QuickCals Works</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Log your meals in seconds with our conversational interface
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Log Your Meal</h3>
              <p className="text-muted-foreground">
                Use voice, text, or image to tell us what you ate
              </p>
            </div>
            
            <div>
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Answer Quick Questions</h3>
              <p className="text-muted-foreground">
                Our AI asks about cooking methods, portions, and ingredients
              </p>
            </div>
            
            <div>
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Confirm & Track</h3>
              <p className="text-muted-foreground">
                Review the nutritional breakdown and confirm to log your meal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with a 14-day free trial. No credit card required.
            </p>
          </div>
          
          <Tabs defaultValue="monthly" className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="monthly" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Plan */}
              <Card className="border">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>Perfect for casual tracking</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$7.99</span>
                    <span className="text-muted-foreground"> / month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Voice, text, and image logging</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Recipe link parsing</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Basic analytics and reports</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>50 AI conversations per month</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full">Start Free Trial</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Premium Plan */}
              <Card className="border border-primary bg-primary/5">
                <CardHeader>
                  <div className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full w-fit mb-2">
                    MOST POPULAR
                  </div>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>For serious nutrition tracking</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$12.99</span>
                    <span className="text-muted-foreground"> / month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Everything in Basic</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Unlimited AI conversations</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Advanced analytics and exports</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Weight tracking with trend analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full">Start Free Trial</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="annual" className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Annual Plan */}
              <Card className="border">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>Perfect for casual tracking</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$76.70</span>
                    <span className="text-muted-foreground"> / year</span>
                    <div className="text-sm text-primary mt-1">Save $19.18 compared to monthly</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Voice, text, and image logging</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Recipe link parsing</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Basic analytics and reports</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>50 AI conversations per month</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full">Start Free Trial</Button>
                  </Link>
                </CardFooter>
              </Card>
              
              {/* Premium Annual Plan */}
              <Card className="border border-primary bg-primary/5">
                <CardHeader>
                  <div className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full w-fit mb-2">
                    BEST VALUE
                  </div>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>For serious nutrition tracking</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$124.70</span>
                    <span className="text-muted-foreground"> / year</span>
                    <div className="text-sm text-primary mt-1">Save $31.18 compared to monthly</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Everything in Basic</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Unlimited AI conversations</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Advanced analytics and exports</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Weight tracking with trend analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button className="w-full">Start Free Trial</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Track with Perfect Accuracy?</h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your 14-day free trial today and experience the easiest, most accurate way to track your nutrition.
          </p>
          <div className="mt-10">
            <Link href="/signup">
              <Button size="lg" className="font-semibold px-8">
                Get Started Now
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            No credit card required • Cancel anytime
          </div>
        </div>
      </section>
    </GuestLayout>
  );
}
