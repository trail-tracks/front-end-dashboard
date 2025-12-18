'use client';
import LogoUploadPage from '@/components/auth/register/Logo';
import RepresentativePhotoPage from '@/components/auth/register/RepPhoto';
import StepAddress from '@/components/auth/register/StepAddress';
import StepConfirm from '@/components/auth/register/StepConfirm';
import StepInstitution from '@/components/auth/register/StepInstitution';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

export default function Register() {
  const [step, setStep] = useState(0);

  const handleNextStep = async () => {
    setStep((step) => step + 1);
  };

  const handlePrevStep = () => {
    setStep((step) => step - 1);
  };

  return (
    <div className="flex flex-row w-full">
      {step < 4 && (
        <>
          <div className="bg-[url('/floresta.jpeg')] bg-cover bg-center h-screen lg:w-7/12" />
          <div className="flex flex-col bg-white text-primary-dark justify-center items-center w-full lg:w-5/12  py-15 px-5">
            <div className="w-8/12">
              {step > 0 && step < 2 && (
                <div className="flex w-10 h-10 mb-4 hover:bg-primary-medium/20 rounded-full p-2 transition-colors items-center justify-center">
                  <FaChevronLeft
                    onClick={handlePrevStep}
                    className="cursor-pointer"
                  />
                </div>
              )}
              {step === 0 && <StepInstitution onNext={handleNextStep} />}
              {step === 1 && <StepAddress onNext={handleNextStep} />}
              {step === 2 && <LogoUploadPage onNext={handleNextStep} />}
              {step === 3 && (
                <RepresentativePhotoPage onNext={handleNextStep} />
              )}
              {step === 0 && (
                <Link
                  href="/"
                  className="flex text-font-normal text-sm text-primary-dark mt-2
                   text-center hover:underline justify-center"
                >
                  Voltar para Login
                </Link>
              )}
            </div>
          </div>
        </>
      )}
      {step === 4 && (
        <div className="bg-[url('/floresta.jpeg')] bg-cover bg-center w-screen h-screen flex items-center justify-center">
          <div className="flex items-center justify-center bg-white h-full md:h-2/3 p-10 md:max-w-2xl w-full md:rounded-4xl">
            <StepConfirm />
          </div>
        </div>
      )}
    </div>
  );
}
