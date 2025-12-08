"use client";

import { AppBreadcrumb } from "@/components/common/AppBreadcrumb";
import TrailCard from "@/components/dashboard/TrailCard";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/utils";
import { getTrails } from "@/services/trails";
import { Trail } from "@/types/trail";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function GerenciarTrilhas() {
  const router = useRouter();
  const { data: trails } = useQuery({
    queryKey: ["trails"],
    queryFn: getTrails,
  });

  return (
    <div className="flex flex-col gap-4 border rounded-3xl border-primary-medium/25 py-6 w-full min-h-full">
      <div className="px-5 sm:px-20">
        <AppBreadcrumb
          items={[
            { label: "Home", href: "/dashboard" },
            { label: "Gerenciar Trilhas" },
          ]}
        />
      </div>

      <div className="flex justify-between items-center flex-row px-5 sm:px-20">
        <h1 className="text-2xl font-bold text-primary-dark">
          Gerenciamento de Trilhas
        </h1>
        <Button
          size="xl"
          variant="default"
          className="w-1/5"
          onClick={() => router.push("/dashboard/gerenciar-trilhas/add-trilha")}
        >
          Criar Trilha
        </Button>
      </div>

      {!trails || trails.length === 0 ? (
        <div className="flex px-5 sm:px-20 font-bold text-primary-dark">
          <div
            className="flex justify-center items-center w-full min-h-40
           bg-gray-100/70 border text-2xl rounded-2xl shadow-sm"
          >
            Não há trilhas disponíveis.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
          {trails.map((trail: Trail, index: number) => (
            <TrailCard
              key={index}
              id={trail.id}
              imageUrl={
                getImageUrl(trail.imageUrl) ||
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
              }
              name={trail.name}
              duration={`${trail.duration} Min`}
              distance={`${trail.distance} Km`}
              difficulty={trail.difficulty.toUpperCase()}
              interaction={trail.interaction}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GerenciarTrilhas;
