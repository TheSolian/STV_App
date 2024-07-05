'use client'

import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from './ui/sonner'
import { TooltipProvider } from './ui/tooltip'

type Props = {
  children: React.ReactNode
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
