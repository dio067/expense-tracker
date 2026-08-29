import { useRef } from "react";
import { Link } from "react-router-dom";
import { LineWaves } from "@/components";
import { DollarSign, Landmark, CreditCard } from "lucide-react";

export function Landing() {
  const moreRef = useRef<HTMLDivElement>(null);
  return (
    <main className='relative min-h-screen bg-black px-4 md:px-8 flex flex-col items-center'>
      <div className='fixed inset-0'>
        <LineWaves
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1}
          rotation={-45}
          edgeFadeWidth={0}
          colorCycleSpeed={1}
          brightness={0.2}
          color1='#ffffff'
          color2='#ffffff'
          color3='#ffffff'
          enableMouseInteraction
          mouseInfluence={2}
        />{" "}
        <div className='absolute inset-0 bg-black/60'></div>
      </div>

      <div className='relative z-50 flex flex-col items-center justify-center min-h-screen p-4 text-white font-extrabold w-full'>
        <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center leading-tight tracking-tight'>
          Track your expenses. <br className='hidden md:block' /> Know where
          your money goes.
        </h1>

        <div className='flex flex-col sm:flex-row gap-3 mt-8 items-center justify-center'>
          <Link
            to='/register'
            className='bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition shadow-lg shadow-black/30'
          >
            Get started
          </Link>
          <button
            onClick={() =>
              moreRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className='border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition cursor-pointer'
          >
            Learn more
          </button>
        </div>
      </div>

      <section
        ref={moreRef}
        className='relative z-50 min-h-screen flex flex-col items-center justify-center mt-16 md:mt-20 w-full'
      >
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 w-full max-w-2xl px-4'>
          <div className='flex justify-center items-center bg-neutral-900 border border-neutral-800 rounded-lg p-6 md:p-10'>
            <DollarSign size={48} className='text-white' />
          </div>
          <div className='flex justify-center items-center bg-neutral-900 border border-neutral-800 rounded-lg p-6 md:p-10'>
            <Landmark size={48} className='text-white' />
          </div>
          <div className='flex justify-center items-center bg-neutral-900 border border-neutral-800 rounded-lg p-6 md:p-10'>
            <CreditCard size={48} className='text-white' />
          </div>
        </div>
        <p className='text-neutral-300 font-normal text-base md:text-lg max-w-lg text-center leading-relaxed mb-4'>
          {" "}
          You already know where your money goes. You just don't want to keep a
          spreadsheet to prove it. You don't want to sit down on a Sunday night,
          squinting at a bank statement, trying to remember if that $34 charge
          was the one you meant to make or the one that sneaked in. You don't
          want to guess. You don't want to feel like you're always one surprise
          charge away from "okay, what actually happened to my paycheck this
          month?" This is the simple, honest way to see it all in one place — no
          categories to argue with, no weekly ritual to keep up, no guilt trip
          attached. Just open it, look, and know. That's it. That's the whole
          point.{" "}
        </p>
      </section>
    </main>
  );
}
