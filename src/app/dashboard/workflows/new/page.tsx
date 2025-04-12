import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export const metadata: Metadata = {
  title: "New Workflow",
  description: "Create a new workflow",
}

export default function NewWorkflowPage() {
  async function createWorkflow(formData: FormData) {
    "use server"
    
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workflows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create workflow")
      }

      const data = await response.json()
      redirect(`/dashboard/workflows/${data.id}`)
    } catch (error) {
      console.error("Error creating workflow:", error)
      throw error
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">New Workflow</h2>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Workflow Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createWorkflow} className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter workflow name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter workflow description"
                />
              </div>
              <Button type="submit">Create Workflow</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 