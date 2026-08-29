import { MoltenMetal } from "@/components";
import { ProfileForm } from "@/components";
import { useAuth } from "@/hooks/useAuth";

export function Profile() {
  const { user } = useAuth();
  return (
    <div className='relative min-h-screen p-10 bg-black'>
      <div className='absolute inset-0 z-0'>
        <MoltenMetal
          color1='#0B0D17'
          color2='#151A2E'
          color3='#FFFFFF'
          speed={0.8}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode='molten'
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseStrength={0.3}
          opacity={1}
        />
      </div>
      <div className='absolute inset-0 bg-slate-900/40'></div>

      <ProfileForm user={user} />
    </div>
  );
}
