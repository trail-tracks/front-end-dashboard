import { ReactNode } from 'react';

interface AccessFormWrapperProps {
  breadcrumbText: string;
  title: string;
  children: ReactNode;
}

export function AccessFormWrapper({
  breadcrumbText,
  title,
  children,
}: AccessFormWrapperProps) {
  return (
    <section className="rounded-3xl border border-primary-medium/20 bg-white px-6 py-8 shadow-sm sm:px-10">
      <p className="text-sm font-medium text-primary-dark/60">{breadcrumbText}</p>
      <h1 className="mt-4 text-2xl font-semibold text-primary-dark">{title}</h1>
      <div className="mt-6">{children}</div>
    </section>
  );
}


