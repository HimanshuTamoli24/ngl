"use client";
import { motion } from "framer-motion";

export default function SmoothSection({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.9 }}
        >
            {children}
        </motion.div>
    );
}
