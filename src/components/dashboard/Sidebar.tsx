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
import Link from 'next/link';
import Image from 'next/image';
import { CiLogout } from 'react-icons/ci';
import { IoTrailSignOutline } from 'react-icons/io5';
import { MdManageAccounts } from 'react-icons/md';
import { TbHome, TbSettings2 } from 'react-icons/tb';

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
  {
    title: 'Encerrar Sessão',
    icon: CiLogout,
    url: '/logout',
    className: 'text-red-500  w-7 h-7 min-w-7 min-h-7',
  },
];

export function AppSidebar() {
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
                      <item.icon
                        className={
                          item.className ||
                          'text-primary-dark  w-7 h-7 min-w-7 min-h-7'
                        }
                      />
                      <span className="font-semibold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
