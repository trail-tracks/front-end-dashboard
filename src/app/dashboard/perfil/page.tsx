"use client";

import { EntityProfileFormData } from "@/app/entities/entity";
import { AppBreadcrumb } from "@/components/common/AppBreadcrumb";
import Button from "@/components/common/Button";
import InputCustom from "@/components/common/InputCustom";
import { getProfileData } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

export default function EntityProfile() {
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileData,
    retry: 1,
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EntityProfileFormData>({
    defaultValues: {
      name: "",
      nameComplement: "",
      zipCode: "",
      address: "",
      number: "",
      city: "",
      state: "",
      countryCode: "55",
      areaCode: "",
      phone: "",
    },
  });

  const { coverFullUrl, galleryFullUrl } = useMemo(() => {
    if (!data?.entity) return { coverFullUrl: "", galleryFullUrl: "" };

    const base = "https://pub-2653dd2ff24e48eebd1c76e727cb07b0.r2.dev/";

    const coverFullUrl = data.entity.coverUrl
      ? base + data.entity.coverUrl
      : "";

    const galleryFullUrl = data.entity.gallery?.length
      ? base + data.entity.gallery[0].url
      : "";

    return { coverFullUrl, galleryFullUrl };
  }, [data]);

  useEffect(() => {
    if (!data?.entity) return;

    const e = data.entity;

    const fullPhone = e.phone ?? "";

    const countryCode = "+" + fullPhone.slice(0, 2) || "+55";
    const areaCode = fullPhone.slice(2, 4) || "";
    const phone = fullPhone.slice(4) || "";

    reset({
      name: e.name || "",
      nameComplement: e.nameComplement || "",
      zipCode: e.zipCode || "",
      address: e.address || "",
      number: e.number || "",
      city: e.city || "",
      state: e.state || "",
      countryCode,
      areaCode,
      phone,
    });
  }, [data, reset]);

  const onSubmit = (values: any) => {
    console.log("FORM SUBMITTED:", values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 border rounded-3xl border-primary-medium/25 p-6 w-full min-h-full">
        <div className="pb-4">
          <AppBreadcrumb
            items={[
              { label: "Home", href: "/dashboard" },
              { label: "Informações Gerais" },
            ]}
          />
        </div>

        <h1 className="text-2xl font-bold text-primary-dark">
          Informações Gerais
        </h1>

        <div className="flex flex-wrap gap-6 p-0">
          <div className="flex-1 min-w-[250px]">
            <InputCustom
              label="Nome da Instituição*"
              placeholder="Digite o nome da instituição"
              boldLabel
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">Campo obrigatório</p>
            )}
          </div>

          <div className="flex-1 min-w-[150px]">
            <InputCustom
              label="Complemento"
              placeholder="Bloco, Setor, etc."
              boldLabel
              {...register("nameComplement")}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 p-0">
          <div className="flex-1 w-20">
            <InputCustom
              label="CEP"
              placeholder="00000-000"
              boldLabel
              {...register("zipCode")}
            />
          </div>

          <div className="flex-4 min-w-[150px]">
            <InputCustom
              label="Endereço"
              placeholder="Rua, número, bairro"
              boldLabel
              {...register("address")}
            />
          </div>

          <div className="flex-1 w-16">
            <InputCustom
              label="Nº"
              placeholder="Número"
              boldLabel
              {...register("number")}
            />
          </div>

          <div className="flex-2">
            <InputCustom
              label="Cidade"
              placeholder="São Paulo"
              boldLabel
              {...register("city")}
            />
          </div>

          <div className="flex-none w-16">
            <InputCustom
              label="Estado"
              placeholder="SP"
              boldLabel
              {...register("state")}
            />
          </div>
        </div>

        <div className="flex flex-wrap flex-col">
          <span className="font-bold pb-0 pt-0">Número de Telefone*</span>

          <div className="flex flex-wrap flex-row gap-4 w-76">
            <div className="flex-2">
              <InputCustom
                placeholder="+55"
                boldLabel
                {...register("countryCode")}
              />
            </div>

            <div className="flex-1">
              <InputCustom
                placeholder="12"
                boldLabel
                {...register("areaCode")}
              />
            </div>

            <div className="flex-2">
              <InputCustom placeholder="999999999" {...register("phone")} />
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          text={"Salvar"}
          className="py-3 mt-8"
          type="submit"
        />
      </div>

      <div className="flex flex-col border rounded-3xl gap-6 border-primary-medium/25 p-6 w-full min-h-full">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center flex-row">
            <h1 className="text-2xl font-bold text-primary-dark">
              Alterar Logo da Entidade
            </h1>
          </div>

          <p className="text-md text-primary-dark">
            Formatos aceitos: PNG, JPG, SVG.
          </p>
        </div>

        <div className="rounded-xl w-37 h-37 border-[#113D31] border overflow-hidden">
          {coverFullUrl ? (
            <img
              src={coverFullUrl}
              className="w-full h-full object-cover"
              alt="Logo da entidade"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary-dark">
              Nenhuma imagem encontrada
            </div>
          )}
        </div>

        {/* *** GALLERY (first image) *** */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center flex-row">
            <h1 className="text-2xl font-bold text-primary-dark">
              Alterar Imagem Representativa da Entidade
            </h1>
          </div>

          <p className="text-md text-primary-dark">
            Formatos aceitos: PNG, JPG, SVG.
          </p>
        </div>

        <div className="rounded-xl w-37 h-37 border-[#113D31] border overflow-hidden">
          {galleryFullUrl ? (
            <img
              src={galleryFullUrl}
              className="w-full h-full object-cover"
              alt="Imagem representativa"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary-dark">
              Nenhuma imagem encontrada
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
