"use client";

import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function AnimatedSection({ children, className = "", delay = 0.2 }: Props) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.section>
    );
}
