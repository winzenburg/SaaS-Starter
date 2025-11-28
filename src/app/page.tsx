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
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-6 tracking-tight"
              variants={itemVariants}
            >
              SaaS Starter Hub
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl text-gray-300 mb-12 font-light leading-relaxed max-w-3xl mx-auto"
              variants={itemVariants}
            >
              A meta-project that spins up new SaaS projects using a{" "}
              <span className="font-semibold text-white">12-agent product creation engine</span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              variants={itemVariants}
            >
              <Button asChild size="lg" className="text-base font-semibold shadow-lg hover:shadow-xl">
                <Link href="/hub">View Portfolio Dashboard</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="text-base font-semibold shadow-lg hover:shadow-xl">
                <Link href="/workflows">Workflows</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={featureVariants}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 glass-card hover:border-slate-600/40">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm border border-blue-500/20">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Portfolio Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-gray-300">
                    Track and prioritize multiple SaaS projects with portfolio scoring and MRR tracking
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={featureVariants}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 glass-card hover:border-slate-600/40">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm border border-purple-500/20">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">12-Agent Engine</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-gray-300">
                    Automated product creation workflow from discovery to engineering
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={featureVariants}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 glass-card hover:border-slate-600/40">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm border border-green-500/20">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <CardTitle className="text-white">Validation First</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-gray-300">
                    Validate demand and desirability before building with structured workflows
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

