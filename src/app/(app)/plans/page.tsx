"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { useState } from "react";
import { ArrowRight, Heart } from "lucide-react";

export default function Page() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const plans = [
        {
            name: "Monthly",
            price: "₹69",
            subtitle: "per month",
            features: [
                "Share music with friends",
                "Send images & audio",
                "Unlock premium chat vibes",
            ],
        },
        {
            name: "Lifetime",
            price: "₹699",
            subtitle: "one-time",
            features: [
                "All Monthly features",
                "Forever access",
                "No renewals, ever",
            ],
        },
    ];

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12">
            <motion.h1
                className="text-5xl md:text-6xl font-extrabold text-center text-black mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Upgrade to Premium
            </motion.h1>
            <p className="text-black text-lg text-center max-w-xl mb-10">
                Special discount going on—check it out fast! ⚡
            </p>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                    >
                        <Card className="flex flex-col p-8 rounded-2xl shadow-lg hover:shadow-sm transition-shadow bg-white border border-gray-200">
                            <Text as="h3" className="text-2xl font-bold text-black mb-2">
                                {plan.name}
                            </Text>
                            <div className="text-4xl font-extrabold text-black">
                                {plan.price}
                            </div>
                            <div className="text-gray-500 mb-6">{plan.subtitle}</div>

                            <ul className="flex flex-col gap-3 mb-6 text-gray-800">
                                {plan.features.map((f, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <ArrowRight />{f}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                className="w-full py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
                            >
                                Get {plan.name}
                            </Button>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Content className="max-w-md w-full p-6 bg-white rounded-xl shadow-xl border-2 border-black">
                    <Dialog.Header>
                        <Text as="h4" className="text-xl font-bold text-black">
                            Subscribe My Heart 
                        </Text>
                        <Heart className=" fill-pink-600 " />
                    </Dialog.Header>

                    <p className="mt-3 text-black font-semibold text-center leading-relaxed">
                        Do you think I’d charge you?
                    </p>

                    <p className="mt-4 text-black text-center">
                        Drop me a mail at{" "}
                        <a
                            href="mailto:himanshutamoli2005@gmail.com?subject=Free%20Access%20Request&body=I%20love%20you%20sweetie,%20send%20me%20free%20access%20please!%20😘"
                            className="text-red-600 font-semibold italic underline"
                        >
                            himanshutamoli2005@gmail.com
                        </a>{" "}
                        and I might just gift you free access cutie... 😉
                    </p>

                    <div className="mt-6 flex justify-end gap-3">


                        <a
                            href="mailto:himanshutamoli2005@gmail.com?subject=Free%20Access%20Request&body=I%20love%20you%20sweetie,%20send%20me%20free%20access%20please!%20😘"
                            className="inline-block w-auto"
                        >
                            <Button className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700">
                                Mail Me
                            </Button>
                        </a>
                    </div>
                </Dialog.Content>
            </Dialog>


        </section>
    );
}
