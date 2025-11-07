interface ButtonProps {
  className?: string;
  text?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'text' | 'icon';
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  disabled?: boolean;
}

function Button({
  className,
  text,
  onClick,
  variant = 'primary',
  type = 'button',
  icon,
  disabled = false,
}: ButtonProps) {
  const variants = {
    primary:
      'bg-primary-light text-primary-dark hover:bg-[#BC9F43] hover:text-white rounded-2xl p-2 m-2 w-[255px] ',
    secondary:
      'bg-primary-dark text-white hover:bg-secondary-dark rounded-2xl p-2 m-2 w-[255px] ',
    text: 'text-primary-dark underline w-fit',
    icon: 'flex justify-between items-center bg-primary-light text-primary-dark hover:bg-[#BC9F43] hover:text-white rounded-2xl p-2 m-2 w-[255px]',
  };

  return (
    <button
      className={`cursor-pointer ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
      {icon && <span className="mr-2">{icon}</span>}
    </button>
  );
}

export default Button;
