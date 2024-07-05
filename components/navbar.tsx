import { auth } from '@/auth'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import LogoutButton from './auth/logout-button'
import { Button, buttonVariants } from './ui/button'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

type Props = {}

export const Navbar: React.FC<Props> = async ({}) => {
  const session = await auth()

  const isAdmin = session && session.user.role.value === 'admin'
  const isTrainer = session && session.user.role.value === 'trainer'

  return (
    <nav className="flex h-[var(--navbar-height)] items-center gap-4 border-b bg-white px-4">
      <h1 className="shrink-0 text-2xl">STV Jonen</h1>

      <div className="hidden w-full items-center justify-between md:flex">
        <div>
          <Link
            href="/my-exercises"
            className={buttonVariants({ variant: 'link' })}
          >
            Meine Übungen
          </Link>
        </div>
        <div className="flex items-center">
          {isAdmin || isTrainer ? (
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: 'link' })}
            >
              Dashboard
            </Link>
          ) : null}
          {isAdmin ? (
            <Link href="/admin" className={buttonVariants({ variant: 'link' })}>
              Admin
            </Link>
          ) : null}
          <LogoutButton>
            <Button>Logout</Button>
          </LogoutButton>
        </div>
      </div>
      <div className="flex w-full justify-end md:hidden">
        <Sheet>
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
                  href="/my-exercises"
                  className={buttonVariants({ variant: 'link' })}
                >
                  Meine Übungen
                </Link>
              </div>
              <div className="flex flex-col items-start">
                {isAdmin || isTrainer ? <Separator className="my-4" /> : null}
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
