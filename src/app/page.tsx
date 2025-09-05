'use client';


import Particles from '@/components/ui/Particles';
import ProfileUrl from '@/components/customui/ProfileUrl';
import { ThreeDMarqueeDemo } from '@/components/customui/Bg';
import CountUp from '@/components/ui/CountUp';
import { useRef } from 'react';


export default function Home() {
  //add stats api call in future
  const containerRef = useRef(null);
  const statsApiCall = (v1: number, v2: number) => {
    const min = v1;
    const max = v2;
    const num = Math.ceil(Math.random() * (max - min) + min)
    console.log("num", num);
    return Number(num);
  }

  return (<div className={`relative w-full h-screen`}>
    {/* Particles background */}
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        inset: 0,
        backgroundColor: 'white',
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




    {/* <main className="relative flex-grow flex flex-col min-h-screen items-center justi y-center px-4 md:px-24 py-12 font-retro bg-transparent">
      <section className="text-center mb-8 md:mb-12 max-w-5xl ">
         <div
          className="text-3xl md:text-4xl lg:text-6xl font-bold "
          style={{ textShadow: '2px 4px 8px yellow', color: '#111' }}
        >
          Send your thoughts… 
        </div>
        <div
      
          className="text-3xl md:text-4xl lg:text-6xl font-bold "
          style={{ textShadow: '2px 4px 8px yellow', color: '#111' }}
        >
        without your mommy finding out.
        </div>

        <Text
          as="p"
          className=" md:mt-4 text-base md:text-lg  mt-6 "
          style={{ textShadow: '1px 2px 4px #b59f00', color: '#111' }}
        >
          Spill the tea, not your identity.
        </Text>
        <ProfileUrl classname='w-full sm:w-sm ' />
      </section>
      <section className='min-h-screen w-full'>
        <ThreeDMarqueeDemo/>
      </section>
    </main> */}
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
      <section className="h-screen snap-start flex flex-col justify-center items-center ">
        <div
          className="text-3xl md:text-4xl lg:text-6xl font-bold "
          style={{ textShadow: '2px 4px 8px yellow', color: '#111' }}
        >
          Send your love...
        </div>
        <div

          className="text-3xl md:text-4xl lg:text-6xl font-bold  text-center"
          style={{ textShadow: '2px 4px 8px yellow', color: '#111' }}
        >
          without your mommy finding out.
        </div>

        <div
      
          className=" md:mt-4 text-base md:text-lg  mt-6 "
          style={{ textShadow: '1px 2px 4px #b59f00', color: '#111' }}
        >
          Spill the tea, not your identity.
        </div>
        <ProfileUrl classname='w-full sm:w-sm ' />
      </section>

      <section className="h-screen snap-start flex flex-col justify-center items-center ">
        {/* <ThreeDMarqueeDemo /> */}
      </section>

      <section className="h-screen snap-start flex flex-col justify-center items-center ">
        <ThreeDMarqueeDemo />
      </section>
      
      <section className="h-screen relative snap-start flex flex-col justify-evenly items-center">

        <div className=' grid gap-y-4.5 sm:grid-cols-3 justify-evenly w-full '>
          <div className='flex flex-col justify-center items-center '>
            <CountUp
              from={0}
              to={statsApiCall(66, 77)}
              separator=","
              duration={1}
              className="text-5xl md:text-6xl  lg:text-8xl font-head text-black"
              onStart={() => console.log("")}
              onEnd={() => console.log("")}

            />
            <span className="mt-1 text-sm text-gray-900 font-mono capitalize">Total users</span>
          </div>
          <div className='flex flex-col justify-center items-center '>
            <CountUp
              from={0}
              to={statsApiCall(99, 111)}
              separator=","
              duration={1}
              className="text-5xl md:text-6xl  lg:text-8xl font-head text-black"
              onStart={() => console.log("")}
              onEnd={() => console.log("")}

            />
            <span className="mt-1 text-sm text-gray-900 font-mono capitalize">Anon messages</span>
          </div>
          <div className='flex flex-col justify-center items-center '>
            <CountUp
              from={0}
              to={statsApiCall(34, 45 )}
              separator=","
              duration={1}
              className="text-5xl md:text-6xl  lg:text-8xl font-head text-black"
              onStart={() => console.log("")}
              onEnd={() => console.log("")}

            />
              <span className="mt-1 text-sm text-gray-900 font-mono capitalize">secretly proposal sent </span>
          </div>
        </div>
          <h1 className='text-9xl  absolute bottom-0 items-end text-end'>
            ASKLY.TECH
          </h1>

      </section>

    </main>
  </div>


  )
}