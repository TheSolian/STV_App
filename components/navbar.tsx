'use client'

import { MenuIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import LogoutButton from './auth/logout-button'
import { Button, buttonVariants } from './ui/button'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

type Props = {}

export const Navbar: React.FC<Props> = ({}) => {
  const session = useSession()

  const isAdmin = session && session.data?.user.role.value === 'admin'
  const isTrainer = session && session.data?.user.role.value === 'trainer'

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <nav className="flex h-[var(--navbar-height)] items-center gap-4 border-b bg-white px-4">
      <div className="flex shrink-0 items-center gap-2">
        <Image src="/logo.webp" width="40" height="40" alt="Logo" />
        <h1 className="text-2xl">STV Jonen</h1>
      </div>

      <div className="hidden w-full items-center justify-between md:flex">
        <div>
          <Link
            href="/my-exercises"
            className={buttonVariants({ variant: 'link' })}
          >
            Meine Elemente
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <div>
            {isAdmin || isTrainer ? (
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: 'link' })}
              >
                Dashboard
              </Link>
            ) : null}
            {isAdmin ? (
              <Link
                href="/admin"
                className={buttonVariants({ variant: 'link' })}
              >
                Admin
              </Link>
            ) : null}
          </div>
          <LogoutButton>
            <Button>Logout</Button>
          </LogoutButton>
        </div>
      </div>
      <div className="flex w-full justify-end md:hidden">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>STV Jonen</SheetTitle>
            </SheetHeader>
            <Separator className="my-4" />
            <div className="flex h-full flex-col">
              <div>
                <Link
                  onClick={() => setIsMobileNavOpen(false)}
                  href="/my-exercises"
                  className={buttonVariants({ variant: 'link' })}
                >
                  Meine Elemente
                </Link>
              </div>
              <div className="flex flex-col items-start">
                {isAdmin || isTrainer ? <Separator className="my-4" /> : null}
                {isAdmin || isTrainer ? (
                  <Link
                    onClick={() => setIsMobileNavOpen(false)}
                    href="/dashboard"
                    className={buttonVariants({ variant: 'link' })}
                  >
                    Dashboard
                  </Link>
                ) : null}
                {isAdmin ? (
                  <Link
                    onClick={() => setIsMobileNavOpen(false)}
                    href="/admin"
                    className={buttonVariants({ variant: 'link' })}
                  >
                    Admin
                  </Link>
                ) : null}
              </div>
              <div>
                <Separator className="my-4" />
                <LogoutButton>
                  <Button>Logout</Button>
                </LogoutButton>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
