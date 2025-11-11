"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Plus, LogOut, Menu, X, CreditCard } from "lucide-react"
import { useState } from "react"
import { CREATE_PAGE, DASHBOARD_PAGE, LOGIN_PAGE, PLAN_PAGE } from "@/utils/routes"
import { Badge } from "../ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { UserSignOut } from "@/service/user-auth.service"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

export function Sidebar() {
  const router = useRouter()
  const { data, isPending } = authClient.useSession()
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: DASHBOARD_PAGE, label: "Dashboard", icon: LayoutDashboard },
    { href: CREATE_PAGE, label: "Create Paste", icon: Plus },
    { href: PLAN_PAGE, label: "Plan", icon: CreditCard },
  ]

  const isActive = (href: string) => pathname === href

  const signout = async () => {
    setLoading(true);
    const response = await UserSignOut()

    if(response.success){
      toast.success('User signout successful')
      router.push(LOGIN_PAGE)
    }else{
      toast.error(response.message)
    }

    setLoading(false);
  }

  if(isPending || !data){
    return <SidebarSkeleton />
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 hover:bg-card rounded-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-30 h-screen w-64 border-r border-border bg-card flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 pt-16 md:pt-6 flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">Payste</span>
        </div>

        <Separator className="bg-border/50" />

        {/* User info */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground truncate">{data.user.name}</p>
                <Badge>Free Plan</Badge>
              </div>
              
              <p className="text-sm  text-foreground truncate">{data.user.email}</p>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Navigation */}
        <nav className="h-full w-full flex flex-col justify-start items-start gap-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="w-full">
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className="w-full justify-start gap-3 hover:bg-gray-100 hover:text-black"
                  size="sm"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 space-y-2 border-t border-border/50">
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-red-700" size="sm" onClick={signout}>
            {
              loading ?
                <>
                  <LogOut className="h-5 w-5" />
                  Log Out
                </>
              : 'Logout'
            }
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-20 bg-black/20 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}



function SidebarSkeleton() {
  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden p-2 hover:bg-card rounded-lg"
      >
        <Skeleton className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className="fixed md:relative z-30 h-screen w-64 border-r border-border bg-card flex flex-col transition-transform duration-300 translate-x-0 md:translate-x-0"
      >
        {/* Logo */}
        <div className="p-6 pt-16 md:pt-6 flex items-center gap-2">
          <Skeleton className="h-6 w-20" />
        </div>

        <Separator className="bg-border/50" />

        {/* User info */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>

              <Skeleton className="h-4 w-32 mt-1" />
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Navigation */}
        <nav className="h-full w-full flex flex-col justify-start items-start gap-2 p-4">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-10 w-full" />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 space-y-2 border-t border-border/50">
          <Skeleton className="h-10 w-full" />
        </div>
      </aside>

      {/* Mobile overlay */}
      <div className="fixed inset-0 z-20 bg-black/20 md:hidden" />
    </>
  )
}
