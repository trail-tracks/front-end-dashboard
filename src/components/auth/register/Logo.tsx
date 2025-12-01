"use client";

import { useEffect, useRef, useState } from "react";

import Button from "@/components/common/Button";
import { postAttachments } from "@/services/postAttachments";
import { useMutation } from "@tanstack/react-query";
import { CiCamera } from "react-icons/ci";
import { toast } from "sonner";

function LogoUploadPage({ onNext }: { onNext: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      };
    }
  }, [file]);

  const { mutateAsync } = useMutation({
    mutationFn: postAttachments,
    onError: (error) => {
      toast.error(error.message || "Erro ao fazer login");
    },
    onSuccess: () => {
      toast("Imagem enviada com sucesso");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = async () => {
    if (file) {
      await mutateAsync({ file, type: "cover" });
    }
    onNext();
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="relative w-48 h-48 mb-6 cursor-pointer rounded-lg flex items-center justify-center"
        onClick={handleAttachClick}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Uploaded Logo"
            className="w-full h-full rounded-lg overflow-hidden"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-lg" />
        )}

        <div className="absolute -bottom-4 right-3 w-12 h-12 bg-primary-dark rounded-full flex justify-center items-center shadow-md">
          <CiCamera size={25} stroke="white" strokeWidth={1} />
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/svg+xml"
      />

      <h1 className="font-bold text-2xl text-gray-900 mb-2">
        Adicione aqui o logotipo da sua instituição.
      </h1>
      <p className="text-sm text-gray-600 mb-2">
        Ele será exibido em destaque na página da trilha, ajudando os visitantes
        a reconhecerem sua marca.
      </p>
      <p className="text-xs text-gray-500 mb-8">
        Formatos aceitos: PNG, JPG, SVG.
      </p>

      <div className="flex flex-col items-center w-3xs gap-3">
        <Button
          variant="secondary"
          text="Anexar arquivo"
          className="py-3 w-full"
          onClick={handleAttachClick}
          type="button"
        />
        <Button
          variant="primary"
          text="Continuar"
          className="py-3 w-full"
          onClick={handleContinue}
          type="button"
        />
        <Button variant="text" text="Anexar depois" onClick={handleContinue} />
      </div>
    </div>
  );
}

export default LogoUploadPage;
