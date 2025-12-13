type FormErrorProps = {
  message?: string;
  className?: string;
};

export default function FormError({ message, className = '' }: FormErrorProps) {
  if (!message) return null;
  return (
    <span
      role="alert"
      aria-live="polite"
      className={`text-red-500 m-0 p-0 text-xs font-semibold ${className}`}
    >
      {message}
    </span>
  );
}
