"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled } from "react-icons/md";
import { PiMapPinAreaFill } from "react-icons/pi";
import { RiVipDiamondLine } from "react-icons/ri";
import Button from "../common/Button";

interface TrailCardProps {
  id: string;
  imageUrl: string;
  name?: string;
  duration?: string;
  distance?: string;
  difficulty?: string;
  interaction?: string;
}

function TrailCard({
  id,
  imageUrl,
  name,
  duration,
  distance,
  difficulty,
}: TrailCardProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col bg-white p-4 m-1 rounded-3xl border-1 border-primary-medium/25 w-4/5 text-primary-dark">
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full mb-2">
          <Image
            src={imageUrl}
            alt=""
            className="object-cover rounded-lg h-full w-full"
            width={352}
            height={40}
            quality={95}
          />
        </div>

        <div className="flex flex-col justify-center items-start">
          <h2 className="font-bold">{name}</h2>
          <div className="my-2">
            <p className="flex items-center gap-2">
              <MdAccessTimeFilled color="red" />
              {duration}
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
      </div>
      <div className="flex w-full justify-center items-center">
        <Button
          text="Ver mais detalhes"
          className="w-full"
          onClick={() => router.push(`/dashboard/gerenciar-trilhas/${id}`)}
        />
      </div>
    </div>
  );
}

export default TrailCard;
