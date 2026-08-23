import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { SpinnerBasic } from "../common";
import { isValidEmail } from "@/utils";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { handleLogin } = useAuth();
  const { isLoading } = useAuthStore();
  const navigate = useNavigate();
  const handleLoginForm = async () => {
    setError("");
    if (!isValidEmail(email)) return setError("Enter a valid email");
    try {
      await handleLogin({ email, password });
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
      <div className='p-5 md:p-8 bg-transparent backdrop-blur-md rounded-3xl border border-slate-700 shadow-xs'>
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
          <h1 className='text-slate-300 text-3xl md:text-4xl font-semibold mb-2'>
            Welcome back!
          </h1>
          <p className='text-slate-400 text-sm md:text-base'>
            Enter your email and password to sign in.
          </p>
        </div>

        <div className='space-y-5 mt-6'>
          {" "}
          <div>
            <label
              htmlFor='email'
              className='text-slate-50 mb-2 font-medium text-sm md:text-base inline-block'
            >
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder='arthur.morgan@example.com'
              required
              className='px-3 py-3 text-sm md:text-base text-slate-100 rounded-md bg-transparent backdrop-blur-lg w-full outline-1 outline-slate-700 transition-all'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='text-slate-50 mb-2 font-medium text-sm inline-block'
            >
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder='••••••••'
              required
              className='px-3 py-3 text-sm text-slate-100 rounded-md bg-transparent backdrop-blur-lg w-full outline-1 outline-slate-700 transition-all'
            />
          </div>
          <button
            onClick={handleLoginForm}
            className='py-3 mt-4 w-full text-center text-slate-900 bg-slate-200 rounded-2xl border border-blue-200 hover:bg-gray-500 hover:-translate-y-1 transition-all font-semibold cursor-pointer'
          >
            {!isLoading ? (
              <div>Sign in</div>
            ) : (
              <div className='text-center'>
                <SpinnerBasic />
              </div>
            )}
          </button>
          <div className='w-full text-red-400 text-center '>{error}</div>
          <div className='flex items-center gap-4 my-4'>
            <hr className='w-full border-slate-300 dark:border-neutral-700' />
            <p className='text-xs text-slate-700 dark:text-slate-300'>or</p>
            <hr className='w-full border-slate-300 dark:border-neutral-700' />
          </div>
          <button className='text-white text-sm w-full'>
            Don't have an account?{"  "}
            <Link to='/register' className='text-slate-400 cursor-pointer ml-1'>
              Sign up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
