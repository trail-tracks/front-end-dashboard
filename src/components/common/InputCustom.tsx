import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const variants = {
  primary: 'border-primary-dark',
  secondary: 'border-primary-light text-secondary-cream ',
};

const InputCustom = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, icon, variant = 'primary', ...props }, ref) => (
    <div className="w-full m-2">
      <span>{label}</span>
      <div className="relative mt-1">
        <input
          ref={ref}
          {...props}
          className={`border-2 rounded-md p-2 w-full pr-10 ${variants[variant]}`}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  ),
);

InputCustom.displayName = 'InputCustom';

export default InputCustom;
