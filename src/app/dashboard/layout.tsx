'use client';

import Header from '@/components/dashboard/Header';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const headerSize = pathname === '/dashboard' ? 'lg' : 'md';

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-white p-4 md:p-6 md:gap-6 lg:p-10 lg:gap-10">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-col h-full gap-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger size="icon-lg" className="md:hidden" />
              <div className="flex-1">
                <Header size={headerSize} />
              </div>
            </div>
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
