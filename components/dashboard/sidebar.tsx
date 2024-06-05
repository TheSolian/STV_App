'use client'

import { cn } from '@/lib/utils'
import { DumbbellIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Separator } from '../ui/separator'

type Props = {}

export const Sidebar: React.FC<Props> = ({}) => {
  const pathname = usePathname()

  return (
    <div className="h-full space-y-4 border-b bg-white p-4 md:border-b-0 md:border-r">
      <Link href="/dashboard" className="text-xl">
        Dashboard
      </Link>
      <Separator />
      <div className="space-y-2">
        <Link
          href="/dashboard/users"
          className={cn('flex items-center gap-2 hover:text-primary', {
            'text-primary': pathname.startsWith('/dashboard/users'),
          })}
        >
          <UsersIcon className="size-4" />
          Benutzer
        </Link>
        <Link
          href="/dashboard/exercises"
          className={cn('flex items-center gap-2 hover:text-primary', {
            'text-primary': pathname.startsWith('/dashboard/exercises'),
          })}
        >
          <DumbbellIcon className="size-4" />
          Übungen
        </Link>
      </div>
    </div>
  )
}
