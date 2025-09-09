interface ButtonProps {
  className?: string;
  text?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

function Button({
  className,
  text,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const variants = {
    primary:
      "bg-primary-light text-primary-dark hover:bg-[#BC9F43] hover:text-white",
    secondary:
      "bg-primary-dark text-white hover:bg-secondary-dark",
  };

  return (
    <button
      className={`rounded-2xl p-2 m-2 w-[255px] ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
