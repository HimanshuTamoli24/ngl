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
      pos: "top-40 left-10 sm:left-10"
    },
    {
      text: "Which city would you bunk college to visit?",
      rotate: "6deg",
      pos: "top-40 right-10  sm:right-10"
    },
    {
      text: "What’s the craziest excuse you gave to skip class?",
      rotate: "-8deg",
      pos: "bottom-20 left-12 sm:left-12"
    },
    {
      text: "Who’s the friend you’d never trust with secrets?",
      rotate: "8deg", 
      pos: "bottom-20 right-12 sm:right-12 "
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
    <div className="relative w-full min-h-screen">
      <div
        style={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
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

      <main className="snap-y snap-mandatory">
          <motion.section
            className="h-screen  snap-start flex flex-col items-center  text-center px-4"
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
                className=' w-[12rem] sm:w-[18rem]' />

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
            {data?.user ? <ProfileUrl classname='w-full' /> :
              <div className="flex  sm:w-3xl gap-2 justify-center items-center mt-5">
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
            <div className="flex items-start justify-center sm:gap-2 text-gray-600 mt-3.5">
              <MessageCircleWarning className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-snug max-w-xs sm:max-w-sm text-center sm:text-left">
                Share this link with friends so they can send you messages anonymously.
              </p>
            </div>


          </motion.section>

          <motion.section
            className="h-screen  snap-start flex flex-col  pb-2.5 items-center text-center px-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.2,
              ease: "easeInOut"
            }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-sm md:text-xl lg:text-2xl font-bold text-black drop-shadow-[0_0_15px_yellow] mb-6"
              animate={{ textShadow: ["0 0 10px yellow", "0 0 20px yellow", "0 0 10px yellow"] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            >
              See what people are saying — messages scroll below in real time.
            </motion.h1>
            <div className="w-full max-w -4xl">
              <ThreeDMarqueeDemo />
            </div>
          </motion.section>


          <motion.section
            className="h-screen snap-start flex flex-col sm:justify-evenly items-center text-center px-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            {/* Heading glow pulse */}
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-black drop-shadow-[0_0_15px_yellow] mb-6"
              animate={{ textShadow: ["0 0 10px yellow", "0 0 20px yellow", "0 0 10px yellow"] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            >
              All the Numbers We Couldn’t Hide (Like Your Lies)
            </motion.h1>

            <div className='flex items-center justify-center'>
              {/* Image at the top, animated */}
              <motion.div
                className="mb-8 mr-4"
                animate={{ y: [1, -1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  width={200}
                  height={200}
                  src="https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e5361939b55b0fd0757e47d_peep-standing-11.png"
                  alt="Monthly Stats Illustration"
                  className="w-48 h-64 md:w-64 md:h-72 border-b-4 "
                />
              </motion.div>

              {/* Stats counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl justify-items-center">
                <div className="flex flex-col justify-center items-center">
                  <CountUp
                    from={0}
                    onStart={() => { }}
                    onEnd={() => { }}
                    to={users}
                    separator=","
                    duration={1.2}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-black"
                  />
                  <span className="mt-2 text-sm md:text-base text-gray-900 font-mono capitalize">
                    Total Users
                  </span>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <CountUp
                    onStart={() => { }}
                    onEnd={() => { }}
                    from={0}
                    to={messages}
                    separator=","
                    duration={1.2}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-black"
                  />
                  <span className="mt-2 text-sm md:text-base text-gray-900 font-mono capitalize">
                    Anonymous Messages
                  </span>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <CountUp
                    from={0}
                    onStart={() => { }}
                    onEnd={() => { }}
                    to={proposals}
                    separator=","
                    duration={1.2}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-black"
                  />
                  <span className="mt-2 text-sm md:text-base text-gray-900 font-mono capitalize">
                    Proposals Sent
                  </span>
                </div>
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
    </div>
  )
}