import { LoginForm, Ferrofluid } from "@/components";

export function Login() {
  return (
    <main className='relative md:h-full min-h-screen bg-black px-4 md:px-8 items-center justify-center flex flex-col'>
      <div className='absolute inset-0 z-0'>
        <Ferrofluid
          colors={["#ffffff", "#ffffff", "#ffffff"]}
          speed={0.5}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection='down'
          opacity={1}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.35}
        />
      </div>
      <div className='absolute inset-0 bg-slate-900/40'></div>
      <LoginForm />
    </main>
  );
}
