import { AccessSettingsCard } from '@/components/config-acesso/AccessSettingsCard';
import { AccessSettingsPanel } from '@/components/config-acesso/AccessSettingsPanel';

const currentEmail = 'fulanodetal@gmail.com'; // TODO: obter do backend

export default function ConfiguracoesDeAcessoPage() {
  return (
    <AccessSettingsPanel heading="Configurações de acesso">
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
