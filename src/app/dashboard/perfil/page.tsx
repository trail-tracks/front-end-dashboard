'use client';
import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import Button from '@/components/common/Button';
import FormError from '@/components/common/FormError';
import InputCustom from '@/components/common/InputCustom';
import { getImageUrl } from '@/lib/utils';
import {
  EditProfileFormInput,
  EditProfileFormOutput,
  editProfileSchema,
} from '@/schema/editProfile';
import { editProfile, getAuth } from '@/services/auth';
import { postAttachments } from '@/services/postAttachments';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function EntityProfile() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditProfileFormInput>({
    resolver: zodResolver(editProfileSchema),
  });

  const uploadImageMutation = useMutation({
    mutationFn: async ({
      file,
      type,
    }: {
      file: File;
      type: 'cover' | 'poster';
    }) => {
      return postAttachments({
        file,
        type,
      });
    },
    onSuccess: (_, variables) => {
      const message =
        variables.type === 'cover'
          ? 'Logo atualizada com sucesso!'
          : 'Imagem representativa atualizada com sucesso!';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: Error, variables) => {
      const message =
        variables.type === 'cover'
          ? 'Erro ao atualizar logo: '
          : 'Erro ao atualizar imagem representativa: ';
      toast.error(message + error.message);
    },
  });

  const handleImageUpload =
    (type: 'cover' | 'poster') =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        await uploadImageMutation.mutateAsync({ file, type });
      }
    };

  const { data: authData, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: getAuth,
  });

  useEffect(() => {
    if (!authData) return;

    setValue('name', authData.name || '');
    setValue('nameComplement', authData.nameComplement || '');
    setValue('zipCode', authData.zipCode?.replace(/\D/g, '') || '');
    setValue('address', authData.address || '');
    setValue('number', authData.number || 0);
    setValue('city', authData.city || '');
    setValue('state', authData.state || '');
    setValue('addressComplement', authData.addressComplement || '');

    if (authData.phone) {
      const match = authData.phone.match(/^\+?(\d{2})\s?(\d{2})\s?(\d{9})$/);

      if (match) {
        setValue('ddi', `+${match[1]}`);
        setValue('ddd', match[2]);
        setValue('phoneNumber', match[3]);
      }
    }
  }, [authData, setValue]);

  const editProfileMutation = useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      toast.success('Perfil atualizado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || 'Erro ao atualizar perfil');
    },
  });

  const onSubmit: SubmitHandler<EditProfileFormInput> = (data) => {
    const parsedData: EditProfileFormOutput = editProfileSchema.parse(data);

    editProfileMutation.mutate(parsedData);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 border rounded-3xl border-primary-medium/25 p-6 w-full min-h-full">
          <div className="pb-4">
            <AppBreadcrumb
              items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Informações Gerais' },
              ]}
            />
          </div>
          <div className="flex justify-between items-center flex-row">
            <h1 className="text-2xl font-bold text-primary-dark">
              Informações Gerais
            </h1>
          </div>

          <div className="flex flex-wrap gap-6 p-0">
            <div className="flex-1 min-w-[250px]">
              <InputCustom
                label="Nome da Instituição*"
                placeholder="Digite o nome da instituição"
                boldLabel
                {...register('name')}
              />
              {errors.name && <FormError message={errors.name.message} />}
            </div>

            <div className="flex-1 min-w-[150px]">
              <InputCustom
                label="Complemento"
                placeholder="Bloco, Setor, etc."
                boldLabel
                {...register('nameComplement')}
              />
              {errors.nameComplement && (
                <FormError message={errors.nameComplement.message} />
              )}
            </div>
          </div>
          <div className="flex flex-row gap-4 p-0">
            <div className="flex-1 w-20">
              <InputCustom
                label="CEP"
                placeholder="00000000"
                boldLabel
                {...register('zipCode')}
                maxLength={8}
              />
            </div>
            <div className="flex-4 min-w-[150px]">
              <InputCustom
                label="Endereço"
                placeholder="Rua, número, bairro"
                boldLabel
                {...register('address')}
              />
            </div>
            <div className="flex-1 w-16">
              <InputCustom
                label="Nº"
                placeholder="Número"
                boldLabel
                type="number"
                {...register('number', { valueAsNumber: true })}
              />
            </div>
            <div className="flex-2">
              <InputCustom
                label="Cidade"
                placeholder="São Paulo"
                boldLabel
                {...register('city')}
              />
            </div>
            <div className="flex-none w-16">
              <InputCustom
                label="Estado"
                placeholder="SP"
                boldLabel
                {...register('state')}
                className="text-center uppercase"
                maxLength={2}
              />
            </div>
          </div>
          {errors.zipCode && <FormError message={errors.zipCode.message} />}
          {errors.address && <FormError message={errors.address.message} />}
          {errors.number && <FormError message={errors.number.message} />}
          {errors.city && <FormError message={errors.city.message} />}
          {errors.state && <FormError message={errors.state.message} />}

          <div className="flex flex-col gap-2">
            <InputCustom
              label="Complemento do Endereço"
              placeholder="Apartamento, bloco, etc."
              boldLabel
              {...register('addressComplement')}
            />
            {errors.addressComplement && (
              <FormError message={errors.addressComplement.message} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold pb-0 pt-0">Número de Telefone*</span>
            <div className="flex flex-row gap-4 items-center">
              <div className="flex h-11 mt-1 w-24">
                <select
                  className="border-2 rounded-md p-2 w-full border-primary-dark outline-none focus:ring-2 focus:ring-primary-dark/70 text-center"
                  {...register('ddi')}
                >
                  <option value="">DDI</option>
                  <option value="+55">+55</option>
                </select>
              </div>
              <div className="flex w-20">
                <InputCustom
                  placeholder="11"
                  maxLength={2}
                  {...register('ddd')}
                  className="text-center"
                />
              </div>
              <div className="flex md:w-40">
                <InputCustom
                  placeholder="999999999"
                  maxLength={9}
                  {...register('phoneNumber')}
                  className="text-center"
                />
              </div>
            </div>
            {errors.ddi && <FormError message={errors.ddi.message} />}
            {errors.ddd && <FormError message={errors.ddd.message} />}
            {errors.phoneNumber && (
              <FormError message={errors.phoneNumber.message} />
            )}
          </div>
          <Button
            variant="secondary"
            text={editProfileMutation.isPending ? 'Salvando...' : 'Salvar'}
            className="py-3 mt-8"
            type="submit"
            disabled={editProfileMutation.isPending}
          />
        </div>
      </form>

      <div className="flex flex-col border rounded-3xl gap-6 border-primary-medium/25 p-6 w-full min-h-full">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center flex-row">
            <h1 className="text-2xl font-bold text-primary-dark">
              Alterar Logo da Entidade
            </h1>
          </div>
          <div>
            <p className="text-md text-primary-dark">
              Formatos aceitos: PNG, JPG, SVG.
            </p>
          </div>
        </div>

        <div className="rounded-xl w-37 h-37 border-[#113D31] border relative">
          <label
            htmlFor="logo-upload"
            className="cursor-pointer block w-full h-full"
          >
            <Image
              src={getImageUrl(authData.coverUrl)}
              alt="Logo"
              width={150}
              height={150}
              className="object-cover rounded-xl w-full h-full"
            />
          </label>

          <input
            id="logo-upload"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/svg+xml"
            className="hidden"
            onChange={handleImageUpload('cover')}
            disabled={uploadImageMutation.isPending}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center flex-row">
            <h1 className="text-2xl font-bold text-primary-dark">
              Alterar Imagem Representativa da Entidade
            </h1>
          </div>
          <div>
            <p className="text-md text-primary-dark">
              Formatos aceitos: PNG, JPG, SVG.
            </p>
          </div>
        </div>

        <div className="rounded-xl w-37 h-37 border-[#113D31] border relative">
          <label
            htmlFor="poster-upload"
            className="cursor-pointer block w-full h-full"
          >
            <Image
              src={getImageUrl(authData.poster)}
              alt="Imagem Representativa"
              width={150}
              height={150}
              className="object-cover rounded-xl w-full h-full"
            />
          </label>

          <input
            id="poster-upload"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/svg+xml"
            className="hidden"
            onChange={handleImageUpload('poster')}
            disabled={uploadImageMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}
