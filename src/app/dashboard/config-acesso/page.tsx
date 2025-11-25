import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import { AccessSettingsCard } from '@/components/config-acesso/AccessSettingsCard';
import { AccessSettingsPanel } from '@/components/config-acesso/AccessSettingsPanel';

const breadcrumbItems = [
  { label: 'Home', href: '/dashboard' },
  { label: 'Configurações de acesso' },
];

const currentEmail = 'fulanodetal@gmail.com'; // TODO: obter do backend

export default function ConfiguracoesDeAcessoPage() {
  return (

      <AccessSettingsPanel
        breadcrumbText="Você está em: Home > Configurações de acesso"
        heading="Configurações de acesso"
      >
        <AccessSettingsCard
          title="Alterar senha"
          description="Altere a senha quando quiser"
          buttonLabel="Alterar senha"
          href="/dashboard/config-acesso/alterar-senha"
        />
        <AccessSettingsCard
          title="Alterar email"
          description={`Email atual: ${currentEmail}`}
          buttonLabel="Alterar email"
          href="/dashboard/config-acesso/alterar-email"
        />
      </AccessSettingsPanel>
  );
}

