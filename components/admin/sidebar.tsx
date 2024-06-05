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
    <div className="bg-white h-full p-4 space-y-4 border-b md:border-r md:border-b-0">
      <Link href="/admin" className="text-xl">
        Admin Dashboard
      </Link>
      <Separator />
      <div className="space-y-2">
        <Link
          href="/admin/users"
          className={cn('flex gap-2 items-center hover:text-primary', {
            'text-primary': pathname.startsWith('/admin/users'),
          })}
        >
          <UsersIcon className="size-4" />
          Benutzer
        </Link>
        <Link
          href="/admin/exercises"
          className={cn('flex gap-2 items-center hover:text-primary', {
            'text-primary': pathname.startsWith('/admin/exercises'),
          })}
        >
          <DumbbellIcon className="size-4" />
          Übungen
        </Link>
      </div>
    </div>
  )
}
