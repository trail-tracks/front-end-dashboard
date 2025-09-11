import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

const InputCustom = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, ...props }, ref) => (
    <div className="w-full m-2">
      <span>{label}</span>
      <div className="relative mt-1">
        <input
          ref={ref}
          {...props}
          className="border-2 border-primary-dark rounded-md p-2 w-full pr-10"
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            {icon}
          </div>
        )}
      </div>
    </div>
  ),
);

InputCustom.displayName = 'InputCustom';

export default InputCustom;
