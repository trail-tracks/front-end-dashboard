'use client';

import Image from 'next/image';
import { MdAccessTimeFilled } from 'react-icons/md';
import { PiMapPinAreaFill } from 'react-icons/pi';
import { RiVipDiamondLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';

interface TrailCardProps {
  imageUrl: string;
  title?: string;
  estimatedTime?: string;
  distance?: string;
  difficulty?: string;
  interaction?: string;
}

function TrailCard({
  imageUrl,
  title,
  estimatedTime,
  distance,
  difficulty,
  interaction,
}: TrailCardProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col bg-white p-4 m-1 rounded-3xl border-1 border-primary-medium/25 w-full min-w-full sm:w-[calc(50%-0.625rem)] lg:w-full text-primary-dark">
      <div className="w-full mb-2">
        <Image
          src={imageUrl}
          alt=""
          className="object-cover rounded-lg h-10 w-full"
          width={352}
          height={40}
          quality={95}
        />
      </div>
      <div />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-center">
          <h2 className="font-bold">{title}</h2>
          <div className="my-2">
            <p className="flex items-center gap-2">
              <MdAccessTimeFilled color="red" />
              {estimatedTime}
            </p>
            <p className="flex items-center gap-2">
              <PiMapPinAreaFill color="red" />
              {distance}
            </p>
            <p className="flex items-center gap-2">
              <RiVipDiamondLine color="red" />
              {difficulty}
            </p>
          </div>
        </div>

        <div className="flex justify-end mr-2 ">
          <div className="flex flex-col justify-center items-center ring-1 ring-primary-medium/25 rounded-2xl p-4">
            <span className="text-3xl font-bold">{interaction}</span>
            <span className="text-sm font-bold text-black">
              Interações <br /> c/ usuários
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <Button
          text="Ver mais detalhes"
          className="w-full"
          onClick={() => router.push('/dashboard/gerenciar-trilhas/1')}
        />
      </div>
    </div>
  );
}

export default TrailCard;
