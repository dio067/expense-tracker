import { Frown } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-neutral-900/50 px-4'>
      <Frown className='h-24 w-24 text-neutral-500' />
      <h1 className='mt-6 text-2xl md:text-3xl font-semibold text-white'>
        Page not found
      </h1>
      <p className='mt-2 text-neutral-400 text-sm md:text-base'>
        The page you're looking for doesn't exist.
      </p>
      <Link
        to='/'
        className='mt-6 bg-white text-black px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-200 transition'
      >
        Back to home
      </Link>
    </main>
  );
}
