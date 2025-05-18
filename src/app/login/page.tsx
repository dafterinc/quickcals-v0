"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("login")

  // Handle hash changes for direct access to sign-up tab
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#sign-up") {
        setActiveTab("sign-up")
      } else {
        setActiveTab("login")
      }
    }

    // Check hash on initial load
    handleHashChange()

    // Add event listener for hash changes
    window.addEventListener("hashchange", handleHashChange)

    // Clean up
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Use replaceState instead of directly modifying location.hash to prevent page refresh
    window.history.replaceState(null, '', value === "sign-up" ? "#sign-up" : "#login")
  }

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10">
      <Link 
        href="/"
        className="mb-8 text-3xl font-bold tracking-tight text-primary hover:text-primary/90"
      >
        Quick Cals
      </Link>
      <div className="w-full max-w-sm">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
