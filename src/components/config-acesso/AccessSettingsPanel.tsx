import { ReactNode } from 'react';
import { AppBreadcrumb } from '../common/AppBreadcrumb';

interface AccessSettingsPanelProps {
  heading: string;
  children: ReactNode;
}

export function AccessSettingsPanel({
  heading,
  children,
}: AccessSettingsPanelProps) {
  return (
    <section className="w-full rounded-3xl border border-primary-medium/20 bg-white px-6 py-8 shadow-sm sm:px-10">
      <div className="pb-4">
        <AppBreadcrumb
          items={[
            { label: 'Home', href: '/dashboard' },
            { label: 'Configurações de acesso' },
          ]}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-primary-dark">{heading}</h2>
      </div>

      <div className="mt-6 flex flex-col gap-4">{children}</div>
    </section>
  );
}
