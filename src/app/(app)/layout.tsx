
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  ListCollapse,
  LineChart,
  LogOut,
  Settings,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ username: string, uuid: string } | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const isActive = (path: string) => pathname === path;
  
  const getAvatarFallback = (username: string | undefined) => {
    if (!username) return 'AD';
    return username.substring(0, 2).toUpperCase();
  };


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/dashboard')}
                icon={<LayoutDashboard />}
                tooltip="Dashboard"
              >
                <Link href="/dashboard">Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/events')}
                icon={<ListCollapse />}
                tooltip="Events"
              >
                <Link href="/events">Event Logging</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/reports')}
                icon={<LineChart />}
                tooltip="Reports"
              >
                <Link href="/reports">Automated Reports</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://placehold.co/40x40.png" alt={user?.username || 'admin'} data-ai-hint="person avatar" />
              <AvatarFallback>{getAvatarFallback(user?.username)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                {user?.username || 'Admin User'}
              </span>
              <span className="text-xs text-muted-foreground">
                {user ? `${user.username}` : 'admin@mgiftcard.com'}
              </span>
            </div>
          </div>
          <SidebarMenuButton asChild icon={<LogOut />} tooltip="Log Out">
            <Link href="/">Log Out</Link>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
           <SidebarTrigger />
           <div className="flex-1">
             <span className="text-sm text-muted-foreground">{user?.uuid}</span>
           </div>
           <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt={user?.username || 'admin'} data-ai-hint="person avatar" />
                <AvatarFallback>{getAvatarFallback(user?.username)}</AvatarFallback>
              </Avatar>
           </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
