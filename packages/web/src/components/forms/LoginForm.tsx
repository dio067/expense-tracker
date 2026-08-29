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
      <div className='p-5 md:p-8 bg-neutral-900 rounded-2xl border border-neutral-800 shadow-xl'>
        {" "}
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
          <h1 className='text-white text-2xl md:text-3xl font-semibold mb-2'>
            Welcome back
          </h1>
          <p className='text-neutral-400 text-sm md:text-base'>
            Enter your email and password to sign in.
          </p>
        </div>
        <div className='space-y-5 mt-6'>
          {" "}
          <div>
            <label
              htmlFor='email'
              className='text-neutral-50 mb-2 font-medium text-sm md:text-base inline-block'
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
              className='px-3 py-2.5 text-sm md:text-base text-white rounded-lg bg-neutral-800 border border-neutral-700 w-full focus:outline-none focus:ring-2 focus:ring-white/30 transition'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='text-neutral-50 mb-2 font-medium text-sm inline-block'
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
              className='px-3 py-2.5 text-sm md:text-base text-white rounded-lg bg-neutral-800 border border-neutral-700 w-full focus:outline-none focus:ring-2 focus:ring-white/30 transition'
            />
          </div>
          <button
            onClick={handleLoginForm}
            className='py-3 mt-2 w-full text-center text-black bg-white rounded-lg hover:bg-gray-200 transition-all font-semibold cursor-pointer'
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
            <hr className='w-full border-neutral-800' />
            <p className='text-xs text-neutral-500'>or</p>
            <hr className='w-full border-neutral-800' />
          </div>
          <button className='text-white text-sm w-full'>
            Don't have an account?{"  "}
            <Link
              to='/register'
              className='text-white font-medium cursor-pointer ml-1 hover:underline'
            >
              Sign up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
