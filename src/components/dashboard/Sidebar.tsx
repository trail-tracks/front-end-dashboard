'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { authLogout } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CiLogout } from 'react-icons/ci';
import { IoTrailSignOutline } from 'react-icons/io5';
import { MdManageAccounts } from 'react-icons/md';
import { TbHome, TbSettings2 } from 'react-icons/tb';
import { toast } from 'sonner';

const menuItems = [
  {
    title: 'Início',
    icon: TbHome,
    url: '/dashboard',
  },
  {
    title: 'Gerenciar Trilhas',
    icon: IoTrailSignOutline,
    url: '/dashboard/gerenciar-trilhas',
  },
  {
    title: 'Perfil da Instituição',
    icon: MdManageAccounts,
    url: '/dashboard/perfil',
  },
];

const settingsItems = [
  {
    title: 'Configurações de acesso',
    icon: TbSettings2,
    url: '/dashboard/config-acesso',
  },
];

export function AppSidebar() {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: authLogout,
    onSuccess: () => {
      localStorage.clear();
      toast.success('Sessão encerrada!');
      router.push('/');
    },
    onError: (error: Error) => {
      toast.error('Erro ao encerrar sessão: ' + error.message);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Sidebar
      className="border-primary-medium/25 h-full w-[300px] lg:w-[340px]"
      variant="floating"
    >
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo do Sistema parecido com uma bussola"
            width={48}
            height={48}
          />
          <h1 className="font-bold text-lg text-primary-dark">
            Trilhas Interativas
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={'lg'}
                    className="hover:bg-primary-medium/25"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="text-primary-dark w-7 h-7 min-w-7 min-h-7" />
                      <span className="font-semibold ">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4 max-w-4/5 mx-auto" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary-medium/25"
                    size={'lg'}
                  >
                    <Link href={item.url} className="flex items-center gap-3 ">
                      <item.icon className="text-primary-dark  w-7 h-7 min-w-7 min-h-7" />
                      <span className="font-semibold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="hover:bg-red-50 cursor-pointer"
                  size={'lg'}
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  <CiLogout className="text-red-500 w-7 h-7 min-w-7 min-h-7" />
                  <span className="font-semibold text-red-500">
                    {logoutMutation.isPending
                      ? 'Encerrando...'
                      : 'Encerrar Sessão'}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
