"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { signIn } from "next-auth/react"

export function SignUpForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Something went wrong")
      }

      toast({
        title: "Success",
        description: "Account created successfully"
      })
      router.push("/sign-in")
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again."
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={loading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="new-password"
              disabled={loading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              autoComplete="new-password"
              disabled={loading}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button disabled={loading}>
            {loading && (
              <span className="mr-2">Loading...</span>
            )}
            Sign Up
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          disabled={loading}
        >
          GitHub
        </Button>
        <Button
          variant="outline"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          disabled={loading}
        >
          Google
        </Button>
      </div>
    </div>
  )
} 