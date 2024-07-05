import { Providers } from '@/components/providers'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'STV App',
  description: 'Tool von STV Jonen',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={cn('', inter.className)}>{children}</body>
      </Providers>
    </html>
  )
}
