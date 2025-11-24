import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import { AccessFormWrapper } from '@/components/config-acesso/AccessFormWrapper';
import { ChangeEmailForm } from '@/components/config-acesso/ChangeEmailForm';

const breadcrumbItems = [
  { label: 'Home', href: '/dashboard' },
  { label: 'Configurações de acesso', href: '/dashboard/configuracoes' },
  { label: 'Alterar email' },
];

export default function AlterarEmailPage() {
  return (
    
      <AccessFormWrapper
        breadcrumbText="Você está em: Home > Configurações de acesso > Alterar email"
        title="Alterar email"
      >
        <ChangeEmailForm />
      </AccessFormWrapper>

  );
}


