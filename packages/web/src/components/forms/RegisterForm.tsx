import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { SpinnerBasic } from "../common";
import { isValidEmail } from "@/utils";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const { handleRegister } = useAuth();
  const { isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleRegisterForm = async () => {
    setError("");
    if (!isValidEmail(email)) return setError("Enter a valid email");
    if (password !== passwordConfirmation)
      return setError("Passwords must match");
    try {
      await handleRegister({ name, email, password });
      navigate("/dashboard");
    } catch (err: unknown) {
      function isResponseLike(
        e: unknown,
      ): e is { response?: { data?: { message?: string } } } {
        return typeof e === "object" && e !== null && "response" in e;
      }

      const message =
        (isResponseLike(err) && err.response?.data?.message) ||
        (err instanceof Error ? err.message : String(err)) ||
        "registration failed";
      setError(message);
    }
  };

  return (
    <div className='relative z-10 py-4 mt-24 w-full max-w-md px-4'>
      <div className='p-5 md:p-6 bg-transparent backdrop-blur-md rounded-3xl border border-slate-700 shadow-xs'>
        <div className='mb-4 flex justify-center'>
          <a href='#'>
            <img
              src='/images/black.logo.png'
              alt='logo'
              className='w-24 h-24 md:w-32 md:h-32'
            />
          </a>
        </div>

        <div className='text-center'>
          <h1 className='text-slate-300 text-xl md:text-2xl font-semibold mb-2'>
            Create your Account!
          </h1>
          <p className='text-slate-400 text-sm md:text-base'>
            Enter your details to sign up.
          </p>
        </div>
