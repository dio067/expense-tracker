import { Frown } from "lucide-react";

export function NotFound() {
  return (
    <main className='flex flex-col items-center justify-center relative md:h-full min-h-screen bg-black px-4 md:px-8 '>
      <Frown className='h-40 w-40 text-gray-400' />
      <h1 className='m-4 text-4xl text-gray-400'>Page Not Found</h1>
    </main>
  );
}
