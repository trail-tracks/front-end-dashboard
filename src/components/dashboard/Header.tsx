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

  return (
    <header
      className={`flex w-full h-auto md:flex-row flex-col rounded-3xl items-center
        bg-gradient-to-t from-[#D9D9D959] to-[#FAFAFAE0] text-primary-dark p-4  ${sizeClasses[size]} justify-between`}
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
              ? 'p-2 h-20 w-20 object-cover'
              : 'p-2 h-25 w-25 object-cover'
          }
          height={400}
          width={400}
          quality={100}
        />
      </div>
    </header>
  );
}

export default Header;
