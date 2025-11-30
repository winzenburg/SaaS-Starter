"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Zap, CheckCircle2 } from "lucide-react";

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
  },
};

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  return (
    <div className="marketing-page">
      {/* Hero Section - Marketing Style (SynthFlow Ecosystem inspired) */}
      <section className="marketing-hero">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="marketing-hero"
            variants={itemVariants}
            style={{ marginBottom: '2rem' }}
          >
            SaaS Starter Hub
          </motion.h1>
          <motion.p
            className="marketing-hero"
            variants={itemVariants}
            style={{ marginBottom: '3rem' }}
          >
            A meta-project that spins up new SaaS projects using a{" "}
            <span className="font-medium text-primary">12-agent product creation engine</span>.
            Cultivate your business processes in a living, breathing digital ecosystem.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button asChild size="lg" className="text-base font-semibold">
              <Link href="/hub">Start Growing</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base font-semibold">
              <Link href="/workflows">View Workflows</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Grid - Marketing Style */}
      <section className="marketing-section">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={featureVariants}>
            <Card variant="glass" className="h-full hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-heading font-light text-foreground mb-3">
                  Portfolio Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed text-base">
                  Track and prioritize multiple SaaS projects with portfolio scoring and MRR tracking. 
                  Manage your ecosystem of products.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={featureVariants}>
            <Card variant="glass" className="h-full hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--primary)]/20">
                  <Zap className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <CardTitle className="text-2xl font-heading font-light text-foreground mb-3">
                  12-Agent Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed text-base">
                  Automated product creation workflow from discovery to engineering. 
                  Your team's natural rhythm, systematized.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={featureVariants}>
            <Card variant="glass" className="h-full hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center mb-6 border border-[var(--primary)]/20">
                  <CheckCircle2 className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <CardTitle className="text-2xl font-heading font-light text-foreground mb-3">
                  Validation First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed text-base">
                  Validate demand and desirability before building with structured workflows. 
                  Grow what matters.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
