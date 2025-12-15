import Image from 'next/image';

function Header({
  name = 'Parque Estadual da Serra do Mar',
  subtitle = 'Núcleo Caraguatatuba',
  logo = '',
  size = 'md',
}: {
  name?: string;
  subtitle?: string;
  logo?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses: Record<string, string> = {
    sm: 'md:h-20',
    md: 'md:h-25 p-10',
    lg: 'md:h-1/4 p-10',
  };

  const justifyClass = size === 'md' ? 'justify-between' : 'justify-center';

  return (
    <header
      className={`flex w-full h-auto md:flex-row flex-col rounded-3xl items-center
        bg-gradient-to-t from-[#D9D9D959] to-[#FAFAFAE0] text-primary-dark p-4  ${sizeClasses[size]} ${justifyClass}`}
    >
      <div className="mr-4 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{name}</h1>
        <h2 className="text-xl md:text-2xl">{subtitle}</h2>
      </div>

      <div className="flex bg-white rounded-2xl justify-center items-center">
        <Image
          src={logo || '/logo.svg'}
          alt=""
          className={
            size === 'md'
              ? 'm-0 md:m-0 h-20 object-cover w-20 rounded-full'
              : 'm-4 md:m-6 h-20 object-cover w-20 rounded-full'
          }
          height={400}
          width={400}
          quality={95}
        />
      </div>
    </header>
  );
}

export default Header;
