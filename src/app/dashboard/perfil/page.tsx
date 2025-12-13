'use client';
import { AppBreadcrumb } from '@/components/common/AppBreadcrumb';
import Button from '@/components/common/Button';
import InputCustom from '@/components/common/InputCustom';

export default function EntityProfile() {
  return (
    <div className="flex flex-col gap-5">
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
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <InputCustom
              label="Complemento"
              placeholder="Bloco, Setor, etc."
              boldLabel
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 p-0">
          <div className="flex-1 w-20">
            <InputCustom label="CEP" placeholder="00000-000" boldLabel />
          </div>
          <div className="flex-4 min-w-[150px]">
            <InputCustom
              label="Endereço"
              placeholder="Rua, número, bairro"
              boldLabel
            />
          </div>
          <div className="flex-1 w-16">
            <InputCustom label="Nº" placeholder="Número" boldLabel />
          </div>
          <div className="flex-2">
            <InputCustom label="Cidade" placeholder="São Paulo" boldLabel />
          </div>
          <div className="flex-none w-16">
            <InputCustom label="Estado" placeholder="SP" boldLabel />
          </div>
        </div>
        <div className="flex flex-wrap flex-col">
          <span className={'font-bold pb-0 pt-0'}>Número de Telefone*</span>
          <div className="flex flex-wrap flex-row gap-4 w-76">
            <div className="flex-2">
              <InputCustom placeholder="+00" boldLabel />
            </div>
            <div className="flex-1">
              <InputCustom placeholder="00" boldLabel />
            </div>
            <div className="flex-2">
              <InputCustom placeholder="000000000" />
            </div>
          </div>
        </div>
        <Button
          variant="secondary"
          text={'Salvar'}
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
          <div>
            <p className="text-md text-primary-dark">
              Formatos aceitos: PNG, JPG, SVG.
            </p>
          </div>
        </div>

        <div className="rounded-xl w-37 h-37 border-[#113D31] border" />
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

        <div className="rounded-xl w-37 h-37 border-[#113D31] border" />
      </div>
    </div>
  );
}
