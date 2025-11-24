'use client';

type PointsIntroProps = {
  breadcrumb: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function PointsIntro({
  breadcrumb,
  title,
  description,
  children,
}: PointsIntroProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-primary-dark/70">{breadcrumb}</p>
      <h1 className="text-2xl font-bold text-primary-dark">{title}</h1>
      {description && (
        <p className="text-base text-primary-dark/70">{description}</p>
      )}
      {children}
    </div>
  );
}


