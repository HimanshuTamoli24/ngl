'use client';


import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card } from '@/components/retroui/Card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from '@/components/ui/carousel';
import Particles from '@/components/Particles';
import { usePathname } from 'next/navigation';
import { Text } from '@/components/retroui/Text';
import { Button } from '@/components/retroui/Button';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { toast } from 'sonner';
import { Input } from '@/components/retroui/Input';
import ProfileUrl from '@/components/customui/ProfileUrl';


export default function Home() {




  return (<div className={`relative w-full min-h-screen`}>
    {/* Particles background */}
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        inset: 0,
        backgroundColor: 'white', // white background
        zIndex: -1,
      }}
    >
      <Particles
        particleColors={['#ff0000', '#ffff00', '#000000']}
        particleCount={400}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>




    <main className="relative flex-grow flex flex-col min-h-screen items-center justify-center px-4 md:px-24 py-12 font-retro bg-transparent">
      <section className="text-center mb-8 md:mb-12 max-w-5xl">

        <Text
          as="h1"
          className="text-3xl md:text-4xl lg:text-6xl font-bold "
          style={{ textShadow: '2px 4px 8px yellow', color: '#111' }}
        >
          Send your thoughts… without your mommy finding out.
        </Text>

        <Text
          as="h2"
          className="mt-2 text-2xl md:text-3xl font-semibold "
          style={{ textShadow: '2px 4px 8px #b59f00', color: '#111' }}
        >
          oops, your mom 😬
        </Text>

        <Text
          as="p"
          className=" md:mt-4 text-base md:text-lg  mt-6 "
          style={{ textShadow: '1px 2px 4px #b59f00', color: '#111' }}
        >
          Spill the tea, not your identity.
        </Text>
        <ProfileUrl classname='w-xl ' />
      </section>
    </main>

  </div>


  )
}