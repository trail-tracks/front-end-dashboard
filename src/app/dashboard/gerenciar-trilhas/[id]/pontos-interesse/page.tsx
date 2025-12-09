"use client";
export const runtime = "edge";
import { AppBreadcrumb } from "@/components/common/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { use as usePromise } from "react";
import { TfiPlus } from "react-icons/tfi";

function PointsOfInterest({ params }: { params: Promise<{ id: string }> }) {
  const { id } = usePromise(params);
  const router = useRouter();

  const onClick = () => {
    router.push(`/dashboard/gerenciar-trilhas/${id}`);
  };

  const addPointOfInterest = () => {
    router.push(
      `/dashboard/gerenciar-trilhas/${id}/pontos-interesse/add-pontos`,
    );
  };

  return (
    <div className="flex flex-col gap-6 border rounded-3xl border-primary-medium/25 p-8 w-full min-h-full text-primary-dark">
      <AppBreadcrumb
        items={[
          { label: "Home", href: "/dashboard" },
          { label: "Gerenciar Trilhas", href: "/dashboard/gerenciar-trilhas" },
          {
            label: "Detalhes da Trilha",
            href: `/dashboard/gerenciar-trilhas/${id}`,
          },
          { label: "Trilha Pontos de Interesse a Trilha" },
        ]}
      />
      <h1 className="text-2xl font-bold text-primary-dark">
        Pontos de Interesse a Trilha
      </h1>

      <div className="h-50 w-50 border-dashed border-2 border-black rounded-lg bg-[#D9D9D9] ">
        <button
          className="flex flex-col justify-center items-center h-full w-full text-primary-dark"
          onClick={addPointOfInterest}
        >
          <TfiPlus className="mt-2 text-4xl" />
        </button>
      </div>

      <div className="flex w-full mt-auto">
        <Button className="w-60 h-12" onClick={onClick}>
          Concluir
        </Button>
      </div>
    </div>
  );
}

export default PointsOfInterest;
