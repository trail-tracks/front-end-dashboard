import { useEffect } from "react";
import { PiCheckCircleThin } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { SignupStore, useSignupStore } from "@/store/signupStore";

export default function StepConfirm() {
  const reset = useSignupStore((state: SignupStore) => state.reset);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
      reset();
    }, 5000);
    return () => clearTimeout(timer);
  }, [router, reset]);

  return (
    <div className="flex flex-col justify-center  items-center text-center">
      <PiCheckCircleThin
        size={250}
        className="text-primary-dark mx-auto mb-4"
      />
      <div className="text-primary-dark text-2xl font-bold">
        <h2 className="mb-2">Perfil criado!</h2>
        <p className="animate-pulse">Redirecionando...</p>
      </div>
    </div>
  );
}
