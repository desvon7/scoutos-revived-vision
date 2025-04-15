import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import "@/styles/globals.css"

// Create a client
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Component {...pageProps} />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}
