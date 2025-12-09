"use client";
export const runtime = "edge";
import { AppBreadcrumb } from "@/components/common/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { usePhoto } from "@/hooks/use-photo";
import { getImageUrl } from "@/lib/utils";
import { getQRCode } from "@/services/qrcode";
import { getTrailById } from "@/services/trails";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use } from "react";
import { GoShield } from "react-icons/go";
import { HiQrcode } from "react-icons/hi";
import { HiMiniTrash } from "react-icons/hi2";
import { IoMdInformationCircle } from "react-icons/io";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { PiMapPinAreaFill } from "react-icons/pi";
import { RiVipDiamondLine } from "react-icons/ri";
import { TfiPlus } from "react-icons/tfi";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function TrailDetails({ params }: PageProps) {
  const { id } = use(params);
  const { photos, handleFileChange, removePhoto, canAddMore } = usePhoto();
  const router = useRouter();

  const {
    data: trail,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["trail", id],
    queryFn: () => getTrailById(id),
  });

  const {
    data: pdfBlob,
    isLoading: isLoadingQR,
  } = useQuery({
    queryKey: ["qrcode", id],
    queryFn: () => getQRCode(id),
  });

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (isError || !trail) {
    return <div>Trilha não encontrada</div>;
  }

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <AppBreadcrumb
        items={[
          { label: "Home", href: "/dashboard" },
          {
            label: "Gerenciar Trilhas",
            href: "/dashboard/gerenciar-trilhas",
          },
          { label: trail.name },
        ]}
      />
      <div className="flex justify-between items-center flex-row">
        <h1 className="text-2xl font-bold text-primary-dark">{trail.name}</h1>
        <div className="flex w-1/2 justify-end items-center gap-4">
          <Button
            size="xl"
            className="w-1/2 lg:w-1/3 rounded-2xl"
            asChild
            disabled={isLoadingQR || !pdfBlob}
          >
            <a
              href={pdfBlob ? URL.createObjectURL(pdfBlob) : "#"}
              download={`qrcode-${trail.name}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {isLoadingQR ? "Carregando..." : "Gerar QR Code"}
              <HiQrcode className="mr-2" />
            </a>
          </Button>
          <Button
            size="xl"
            variant="primary"
            className="w-1/2 lg:w-1/3 rounded-2xl"
            onClick={() =>
              router.push(`/dashboard/gerenciar-trilhas/${id}/editar-trilha`)
            }
          >
            Editar Informações
          </Button>
        </div>
      </div>

      <div>
        <Image
          src={
            getImageUrl(trail.coverUrl) ||
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop"
          }
          alt={trail.name}
          className="object-fill rounded-lg h-85 w-full"
          width={1280}
          height={720}
          quality={95}
        />
        <div className="flex flex-col justify-center mt-4">
          <div className="my-2">
            <p className="flex items-center gap-2">
              <MdAccessTimeFilled color="red" />
              {trail.duration} Min
            </p>
            <p className="flex items-center gap-2">
              <PiMapPinAreaFill color="red" />
              {trail.distance} Km
            </p>
            <p className="flex items-center gap-2">
              <RiVipDiamondLine color="red" />
              {trail.difficulty.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-lg mb-2">Mais Informações</h2>
          <p>{trail.description || trail.shortDescription}</p>
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-lg mb-2">Imagens da Trilha</h2>
          <p className="text-md text-primary-dark mb-4">
            Essas imagens irão aparecer quando o usuário for visualizar o ponto
            de interesse
          </p>
          <div className="grid grid-cols-3 gap-4 w-1/2">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="border border-gray-400 rounded-lg h-32 relative"
              >
                <Image
                  src={URL.createObjectURL(photo)}
                  alt={`Preview ${index + 1}`}
                  className="object-cover rounded-lg h-full w-full"
                  width={400}
                  height={200}
                  quality={95}
                />
                <Button
                  className="rounded-full absolute bottom-2 right-2 p-2 h-8 w-8 text-primary-dark bg-white hover:bg-gray-200"
                  onClick={() => removePhoto(index)}
                >
                  <HiMiniTrash size={20} />
                </Button>
              </div>
            ))}
            {canAddMore && (
              <div
                className=" rounded-lg p-4 cursor-pointer bg-[#E8E8E8]
               hover:border-gray-600 transition-colors flex items-center justify-center h-32"
              >
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                >
                  <span className="text-4xl text-gray-600">
                    <TfiPlus />
                  </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          Formatos aceitos: PNG, JPG, SVG.
        </div>
        <div className="flex flex-col w-50">
          <Button
            size="lg"
            className="flex mt-4"
            onClick={() =>
              router.push(`/dashboard/gerenciar-trilhas/${id}/sobre-trilha`)
            }
          >
            <IoMdInformationCircle className="m-2" />
            Sobre a Trilha
          </Button>
          <Button
            size="lg"
            variant="primary"
            className="flex mt-4"
            onClick={() =>
              router.push(`/dashboard/gerenciar-trilhas/${id}/pontos-interesse`)
            }
          >
            <IoAnalyticsOutline className="m-2" size={20} />
            Pontos de Interesse
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="flex flex-row items-center justify-center font-bold text-lg mb-2 gap-2">
          <GoShield color="red" /> Dica de Segurança
        </h2>
        <p>{trail.safetyTips || "Nenhuma dica de segurança disponível."}</p>
      </div>
    </div>
  );
}

export default TrailDetails;
