"use client";

import Link from"next/link";
import { motion } from"framer-motion";
import { Button } from"@/components/ui/button";
// Card components not used in this page
import { ArrowLeft, Workflow } from"lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const, // cubic-bezier equivalent of easeOut
    },
  },
};

export default function MarketingLanding() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-24 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-sm uppercase tracking-[0.4em] text-slate-400 mb-4"
            variants={itemVariants}
          >
            Marketing Hub
          </motion.p>
          <motion.h1
            className="text-4xl font-bold font-heading text-[var(--primary)] md:text-5xl mb-6"
            variants={itemVariants}
          >
            Sell the vision before you build the roadmap
          </motion.h1>
          <motion.p
            className="mx-auto max-w-3xl text-lg text-slate-300 mb-8 leading-relaxed"
            variants={itemVariants}
          >
            This space hosts idea-specific marketing routes—hero pages, waitlist funnels,
            and validation experiments—so you can keep product execution in{""}
            <code className="rounded-lg  px-2 py-1 text-sm text-slate-300 font-mono border">
              src/app
            </code>{""}
            while shipping landing pages side-by-side.
          </motion.p>
          <motion.div
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
            variants={itemVariants}
          >
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl">
              <Link href="/hub">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Portfolio Hub
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="shadow-lg hover:shadow-xl">
              <Link href="/workflows">
                <Workflow className="w-5 h-5 mr-2" />
                View Workflows
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

