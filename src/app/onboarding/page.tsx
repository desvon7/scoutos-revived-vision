import { Metadata } from "next"
import { OnboardingForm } from "@/components/auth/onboarding-form"

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Complete your profile setup",
}

export default function OnboardingPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to ScoutOS
          </h1>
          <p className="text-sm text-muted-foreground">
            Let's get your account set up
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  )
} 