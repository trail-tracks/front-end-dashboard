'use client';

import StepAddress from '@/components/auth/register/StepAddress';
import StepInstitution from '@/components/auth/register/StepInstitution';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Register() {
  const [step, setStep] = useState(1);
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
    <div className="flex bg-[url('/floresta.svg')] bg-cover bg-center justify-center items-center min-h-screen w-full">
      <div className="flex flex-col backdrop-blur-2xl items-center w-lg h-screen md:h-full py-15 px-5 md:rounded-4xl border-1 border-white/20">
        <div className="w-8/12">
          {step === 1 && <StepInstitution onNext={handleNextStep} />}
          {step === 2 && <StepAddress onNext={handleNextStep} />}
        </div>
      </div>
    </div>
  );
}

export default Register;
