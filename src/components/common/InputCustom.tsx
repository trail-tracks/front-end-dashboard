interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
}

function InputCustom({ name, type, placeholder, icon }: InputProps) {
  return (
    <div className="w-full m-2">
      <span>{name}</span>
      <div className="relative mt-1">
        <input
          type={type}
          placeholder={placeholder}
          className="border-2 border-primary-dark rounded-md p-2 w-full pr-10"
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputCustom;
