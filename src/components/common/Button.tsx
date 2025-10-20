interface ButtonProps {
  className?: string;
  text?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  type?: 'button' | 'submit' | 'reset';
}

function Button({
  className,
  text,
  onClick,
  variant = 'primary',
  type = 'button',
}: ButtonProps) {
  const variants = {
    primary:
      'bg-primary-light text-primary-dark hover:bg-[#BC9F43] hover:text-white rounded-2xl p-2 m-2 w-[255px] ',
    secondary:
      'bg-primary-dark text-white hover:bg-secondary-dark rounded-2xl p-2 m-2 w-[255px] ',
    text: 'text-primary-dark underline w-fit',
  };

  return (
    <button
      className={`cursor-pointer ${variants[variant]} ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;
