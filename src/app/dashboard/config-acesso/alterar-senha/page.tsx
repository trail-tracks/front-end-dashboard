import { AccessFormWrapper } from '@/components/config-acesso/AccessFormWrapper';
import { ChangePasswordForm } from '@/components/config-acesso/ChangePasswordForm';

const breadcrumbItems = [
  { label: 'Home', href: '/dashboard' },
  { label: 'Configurações de acesso', href: '/dashboard/config-acesso' },
  { label: 'Alterar senha' },
];

export default function AlterarSenhaPage() {
  return (
    <AccessFormWrapper
      breadcrumbText="Você está em: Home > Configurações de acesso > Alterar senha"
      title="Alterar senha"
      breadcrumbItems={breadcrumbItems}
    >
      <ChangePasswordForm />
    </AccessFormWrapper>
  );
}
