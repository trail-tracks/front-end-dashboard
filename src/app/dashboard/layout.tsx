import { AppSidebar } from '@/components/dashboard/Sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from 'sonner';
import HeaderClient from './HeaderClient';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-white p-4 md:p-6 md:gap-6 lg:p-10 lg:gap-10">
        <Toaster position="top-right" richColors />
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-col h-full gap-6">
            <SidebarTrigger size="icon-2xl" className="md:hidden p-5" />
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <HeaderClient />
              </div>
            </div>
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
