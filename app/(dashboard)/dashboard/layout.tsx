'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Users,
  Settings,
  Folder,
  Activity,
  Menu,
  FileVideo,
  HomeIcon,
  LogOutIcon,
  BriefcaseBusinessIcon,
  LucideIcon
} from 'lucide-react'
import { signOut } from '@/app/(login)/actions'
import { mutate } from 'swr'
import { useRouter } from 'next/navigation'

type NavItemLink = {
  href: string
  icon: LucideIcon
  label: string
}

type NavItemAction = {
  action: () => void
  icon: LucideIcon
  label: string
}

type NavItem = NavItemLink | NavItemAction

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const navItems: NavItem[] = [
    { href: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { href: '/dashboard/account', icon: Settings, label: 'Account' },
    { href: '/dashboard/subscription', icon: BriefcaseBusinessIcon, label: 'Subscription' },
    { action: handleSignOut, icon: LogOutIcon, label: 'Sign out' }
  ]
  async function handleSignOut() {
    await signOut()
    mutate('/api/user', null, { revalidate: false })
    router.refresh()
    router.push('/')
  }

  return (
    <div className="flex flex-col min-h-[calc(100dvh-68px)] max-w-7xl mx-auto w-full">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between bg-bg-100 border-b border-gray-200 p-4">
        <div className="flex items-center">
          <span className="font-medium">Settings</span>
        </div>
        <Button className="-mr-3" variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden h-full">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-bg-100 lg:bg-gray-50 border-r border-bg-200 lg:block ${
            isSidebarOpen ? 'block' : 'hidden'
          } lg:relative absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="h-full overflow-y-auto p-4">
            {navItems.map((item) =>
              'href' in item ? (
                /* --- Liens classiques --- */
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    className={`shadow-none text-text-100 my-1 w-full justify-start ${
                      pathname === item.href ? 'bg-gray-100 text-gray-900' : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ) : (
                /* --- Action “Sign out” --- */
                <Button
                  key={item.label}
                  variant="ghost"
                  className="shadow-none text-text-100 my-1 w-full justify-start"
                  onClick={() => {
                    item.action()
                    setIsSidebarOpen(false)
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              )
            )}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-0 lg:p-4">{children}</main>
      </div>
    </div>
  )
}
