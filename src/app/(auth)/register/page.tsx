'use client';

import StepAddress from '@/components/auth/register/StepAddress';
import StepInstitution from '@/components/auth/register/StepInstitution';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Register() {
  const [step, setStep] = useState(2);
  const route = useRouter();

  const handleNextStep = () => {
    if (step < 2) {
      setStep(step + 1);
      return;
    } else {
      route.push('/login');
      return;
    }
  };

  return (
    <div className="flex flex-row w-full">
      <div className="bg-[url('/floresta.svg')] bg-cover bg-center h-screen lg:w-7/12" />

      <div className="flex flex-col bg-white text-primary-dark justify-center items-center w-full lg:w-5/12  py-15 px-5">
        <div className="w-8/12">
          {step === 1 && <StepInstitution onNext={handleNextStep} />}
          {step === 2 && <StepAddress onNext={handleNextStep} />}
        </div>
      </div>
    </div>
  );
}

export default Register;
