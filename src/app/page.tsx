'use client';


import Particles from '@/components/ui/Particles';
import ProfileUrl from '@/components/customui/ProfileUrl';
import { ThreeDMarqueeDemo } from '@/components/customui/Bg';
import CountUp from '@/components/ui/CountUp';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import { MessageCircleWarning } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/retroui/Input';
import { Button } from '@/components/retroui/Button';
import Link from 'next/link';
import Footer from '@/components/customui/Footer';
import SmoothSection from '@/components/customui/Scrolll';
export default function Home() {

  //add stats api call in future
  const { data } = useSession()

  const bubbles = [
    {
      text: "Whom did you first cheat in li (be honest)?",
      rotate: "-6deg",
      pos: "top-40 left-10"
    },
    {
      text: "Which city would you bunk college to visit?",
      rotate: "6deg",
      pos: "top-40 right-10"
    },
    {
      text: "What’s the craziest excuse you gave to skip class?",
      rotate: "-8deg",
      pos: "bottom-20 left-12"
    },
    {
      text: "Who’s the friend you’d never trust with secrets?",
      rotate: "8deg",
      pos: "bottom-20 right-12"
    },
  ];

  const [users, setUsers] = useState(0);
  const [messages, setMessages] = useState(0);
  const [proposals, setProposals] = useState(0);

  const statsApiCall = (v1: number, v2: number) => {
    const min = v1;
    const max = v2;
    const num = Math.ceil(Math.random() * (max - min) + min)
    return Number(num);
  }

  useEffect(() => {
    setUsers(statsApiCall(66, 77));
    setMessages(statsApiCall(99, 111));
    setProposals(statsApiCall(34, 45));
  }, []);
  return (
    <SmoothSection>
      <div className={`relative w-full min-h-screen  border`}>

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

        <main className=" border  h-screen  snap-y snap-mandatory hide-scrollbar">
          <motion.section
            className="h-screen border snap-start flex flex-col items-center justify-center text-center px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.2,
              ease: "easeInOut"
            }}
          >
            <div className=''>
              <Image
                width={250}
                height={250}
                src="/biggroup.jpeg"
                alt="Picture of the author"
                className=' w-xs sm:w-[18rem]' />

            </div>

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
            {data?.user ? <ProfileUrl classname='w-xl' /> :
              <div className="flex w-xl sm:w-3xl gap-2 justify-center items-center mt-5">
                <div className="w-full">
                  <Input

                    type="text"
                    value={"http://localhost:3000/get.your.url"}
                    readOnly
                    className="flex-1 border w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                  />
                </div>
                <Link href={"/signup"}>    <Button variant={'outline'} >Login</Button></Link>
              </div>

            }
            <div className="flex items-center gap-2 text-gray-600 mt-3.5 ">
              <MessageCircleWarning className="w-5 h-5 text-xs" />
              <p className="text-xs ">
                Share this link with cheeks so they can send you messages anonymously.
              </p>
            </div>

          </motion.section>

          <motion.section
            className="h-screen border snap-start flex flex-col justify-end pb-2.5 items-center text-center px-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.2,
              ease: "easeInOut"
            }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-sm sm:text-base text-gray-500 mt-2 mb-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              See what people are saying — messages scroll below in real time.
            </motion.p>
            <div className="w-full max-w -4xl">
              <ThreeDMarqueeDemo />
            </div>
          </motion.section>


          <motion.section
            className="h-screen snap-start flex flex-col justify-center items-center text-center px-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.2,
              ease: "easeInOut"
            }}
            viewport={{ once: true }}
          >
            <h1 style={{ textShadow: '2px 4px 8px yellow', color: '#111' }} className='text-4xl my-4 '>ALL MONTHLY STATS</h1>
            <div className=' grid gap-y-4.5 sm:grid-cols-3 justify-evenly w-full '>
              <div className='flex flex-col justify-center items-center '>
                <CountUp
                  from={0}
                  to={users}
                  separator=","
                  duration={1}
                  className="text-5xl md:text-6xl  lg:text-8xl font-head text-black"
                  onStart={() =>("")}
                  onEnd={() => ("")}

                />
                <span className="mt-1 text-sm text-gray-900 font-mono capitalize">Total users</span>
              </div>
              <div className='flex flex-col justify-center items-center '>
                <CountUp
                  from={0}
                  to={messages}
                  separator=","
                  duration={1}
                  className="text-5xl md:text-6xl  lg:text-8xl font-head text-black"
                  onStart={() => ("")}
                  onEnd={() => ("")}

                />
                <span className="mt-1 text-sm text-gray-900 font-mono capitalize">Anon messages</span>
              </div>
              <div className='flex flex-col justify-center items-center '>
                <CountUp
                  from={0}
                  to={proposals}
                  separator=","
                  duration={1}
                  className="text-5xl md:text-6xl  lg:text-8xl font-head text-black"
                  onStart={() => ("")}
                  onEnd={() => ("")}

                />
                <span className="mt-1 text-sm text-gray-900 font-mono capitalize">secretly proposal sent </span>
              </div>
            </div>


          </motion.section>

          <section className="relative h-screen snap-start w-full flex flex-col justify-center items-center overflow-hidden">
            {/* Floating bubbles */}
            {bubbles.map((b, i) => (
              <motion.div
                key={i}
                className={`absolute   bg-white px-4 py-2 rounded-2xl shadow-md max-w-xs text-black font-semibold ${b.pos}`}
                style={{ transform: `rotate(${b.rotate})` }}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                  rotate: [parseInt(b.rotate), parseInt(b.rotate) + 2, parseInt(b.rotate)],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                {b.text}
              </motion.div>
            ))}

            {/* Center content */}
            <motion.div
              className="flex flex-col items-center gap-4 text-center mt-10" // ⬅ added margin-top
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="p-[3px] rounded-2xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  // src="https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e532a4c258ffe237b8ef2c1_peep-2.svg"
                  src="https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e53539b550b7634d6f2aade_peep-25.png"
                  alt="profile"
                  width={200}
                  height={200}
                  className="rounded-2xl"
                />
              </motion.div>

              <motion.div
                className="text-black font-extrabold text-4xl md:text-6xl leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <div>get to know</div>
                <div>your friends...</div>
              </motion.div>
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    </SmoothSection>


  )
}