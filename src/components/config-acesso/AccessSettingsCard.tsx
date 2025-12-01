import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AccessSettingsCardProps {
  title: string;
  description?: string;
  buttonLabel: string;
  href?: string;
  onClick?: () => void;
}

export function AccessSettingsCard({
  title,
  description,
  buttonLabel,
  href,
  onClick,
}: AccessSettingsCardProps) {
  const buttonClasses =
    'w-full min-w-[180px] bg-[#F1BE2C] text-primary-dark hover:bg-[#E1AE1C] sm:w-auto';

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-primary-medium/15 bg-[#F7F9F8] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col text-primary-dark">
        <span className="text-lg font-semibold">{title}</span>
        {description && (
          <span className="text-sm text-primary-dark/70">{description}</span>
        )}
      </div>

      {href ? (
        <Button asChild className={buttonClasses}>
          <Link href={href} className="w-full text-center">
            {buttonLabel}
          </Link>
        </Button>
      ) : (
        <Button className={buttonClasses} onClick={onClick}>
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
