import { useRef } from "react";
import { Link } from "react-router-dom";
import { LineWaves } from "@/components";
import { DollarSign, Landmark, CreditCard } from "lucide-react";

export function Landing() {
  const moreRef = useRef(null);
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
      </div>

      <div className='relative z-50 flex flex-col items-center justify-center min-h-screen p-4 text-white font-extrabold w-full'>
        <h1 className='text-4xl md:text-6xl lg:text-8xl text-black/80 [-webkit-text-stroke:2px_white] md:[-webkit-text-stroke:3px_white] text-center'>
          Where you can track your own Expenses
        </h1>

        <div className='flex flex-col sm:flex-row gap-3 mt-8 items-center justify-center'>
          <Link
            to='/'
            className='border bg-white text-black font-extrabold px-6 py-3 rounded-3xl hover:bg-white/50 transition'
          >
            Get started
          </Link>
          <button
            onClick={() =>
              moreRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className='border cursor-pointer bg-transparent backdrop-blur-lg text-white font-extrabold px-6 py-3 rounded-3xl border-white/20 hover:bg-black transition'
          >
            Learn more
          </button>
        </div>
      </div>
