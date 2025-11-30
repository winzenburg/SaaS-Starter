"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Users, Shield, ArrowRight, Play } from "lucide-react";

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
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

// Hero variants from LANDING document (exact content from ChatGPT-generated LANDING doc)
const HERO_VARIANTS = {
  directValue: {
    headline: "Unlock the Power of Psychedelic Insights with Ketamine-Meditation Journey Music",
    subheadline: "Experience profound transformation and rejuvenation through our immersive soundscapes.",
    cta: "Start Your Journey Today",
  },
  problemSolution: {
    headline: "From Burnout to Breakthrough: Find Your Balance",
    subheadline: "Combat isolation and relentless pressure with a therapeutic ketamine journey.",
    cta: "Discover Relief Now",
  },
  identityConnection: {
    headline: "For the Optimization-Obsessed: A New Frontier Awaits",
    subheadline: "Elevate your personal development with transformative ketamine-assisted meditation.",
    cta: "Join the Biohackers",
  },
  transformation: {
    headline: "Transform Isolation into Insight and Leadership",
    subheadline: "Integrate deep psychedelic experiences to enhance your leadership and creativity.",
    cta: "Transform Your Leadership",
  },
  socialProof: {
    headline: "Join Thousands of Tech Leaders on a Journey to Renewal",
    subheadline: "Trusted by CTOs to rejuvenate and inspire through guided ketamine experiences.",
    cta: "See the Success Stories",
  },
};

// A/B headline variants from LANDING document (available for future A/B testing)
// const HEADLINE_VARIANTS = {
//   a: "Rejuvenate Your Mind: Ketamine-Assisted Meditation for Tech Innovators",
//   b: "From Overwhelmed to Optimized: Discover a New Path with Ketamine Journeys",
//   c: "Unlock Leadership Potential with Psychedelic Insight Integration",
// };

// Value Stack from LANDING document
const VALUE_STACK = [
  "Access to curated meditation soundscapes",
  "Integration guides for psychedelic insights",
  "Personalized journey tracking",
  "Community support for shared experiences",
];

// Transformation Promise from LANDING document
const TRANSFORMATION_PROMISE = [
  "Move from burnout to a state of balance and creativity",
  "Enhance cognitive function and emotional resilience",
  "Translate profound experiences into actionable insights",
];

// Before/After/Transformation from LANDING document
const TRANSFORMATION_NARRATIVE = {
  before: "Overwhelmed by relentless pressure and feeling isolated, many tech leaders struggle to maintain their mental health.",
  moment: "Discovering the power of ketamine-assisted meditation, users experience a profound shift in perspective and emotional resilience.",
  after: "Enjoy a renewed sense of purpose, enhanced creativity, and a more balanced professional and personal life.",
  journey: "Our app guides you through immersive soundscapes and integrative practices, empowering you to harness psychedelic insights for real-world transformation.",
};

export default function KetamineLandingPage() {
  // A/B testing: Variant switching functionality can be added later for A/B testing
  // For now, using the primary variant (directValue)
  const currentHero = HERO_VARIANTS.directValue;
  
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission with validation
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    // TODO: Integrate with waitlist API or form service (Tally/Typeform/Webflow/Carrd)
    // This should trigger the Lindy automation as specified in the LANDING document
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Thank you! Check your email for next steps.");
      setEmail("");
    } catch (error) {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="marketing-page">
      {/* Hero Section - Variant 1: Direct Value (Primary) with A/B testing capability */}
      <section className="marketing-hero" aria-label="Hero section">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-6"
        >
          <motion.h1
            className="marketing-hero text-4xl md:text-6xl font-heading font-light mb-6"
            variants={itemVariants}
            id="hero-headline"
          >
            {currentHero.headline}
          </motion.h1>
          <motion.p
            className="marketing-hero text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            variants={itemVariants}
            id="hero-subheadline"
          >
            {currentHero.subheadline}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              asChild 
              size="lg" 
              className="text-base font-semibold focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Start your journey - join waitlist"
            >
              <Link href="#waitlist">{currentHero.cta}</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="text-base font-semibold focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Learn more about transformation"
            >
              <Link href="#transformation">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Transformation Narrative Section */}
      <section 
        id="transformation" 
        className="marketing-section py-24"
        aria-labelledby="transformation-heading"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto px-6"
        >
          <motion.h2
            id="transformation-heading"
            className="text-3xl md:text-4xl font-heading font-light text-center mb-12"
            variants={itemVariants}
          >
            From Burnout to Breakthrough
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <Card variant="glass" className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-heading font-light mb-3">Before State</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {TRANSFORMATION_NARRATIVE.before}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="glass" className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-heading font-light mb-3">Transformation Moment</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {TRANSFORMATION_NARRATIVE.moment}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="glass" className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl font-heading font-light mb-3">After State</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {TRANSFORMATION_NARRATIVE.after}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Value Stack / Offer Framing */}
      <section className="marketing-section py-24 bg-card/50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto px-6"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-light text-center mb-12"
            variants={itemVariants}
          >
            What's Included
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUE_STACK.map((_value, index) => {
              const icons = [Sparkles, Users, CheckCircle2, Users];
              const Icon = icons[index] || Sparkles;
              const titles = [
                "Curated Meditation Soundscapes",
                "Integration Guides",
                "Personalized Journey Tracking",
                "Community Support",
              ];
              const descriptions = [
                "Access to immersive, scientifically-designed soundscapes that enhance your ketamine-assisted meditation journey.",
                "Comprehensive guides to help you translate profound psychedelic experiences into actionable insights for your life.",
                "Track your progress, insights, and transformation over time with personalized analytics and reflection tools.",
                "Connect with others on similar journeys, share experiences, and find support in our exclusive community.",
              ];
              
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card variant="glass" className="h-full">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 border border-primary/20">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-heading font-light">{titles[index]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground">
                        {descriptions[index]}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Transformation Promise */}
      <section className="marketing-section py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto px-6"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-heading font-light text-center mb-8"
            variants={itemVariants}
          >
            Your Transformation Promise
          </motion.h2>
          
          <motion.div variants={itemVariants} className="space-y-4">
            {TRANSFORMATION_PROMISE.map((promise, index) => (
              <Card key={index} variant="glass" className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-lg font-medium mb-2">{promise}</p>
                      {index === TRANSFORMATION_PROMISE.length - 1 && (
                        <p className="text-muted-foreground">
                          {TRANSFORMATION_NARRATIVE.journey}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Risk Reversal & Social Proof */}
      <section className="marketing-section py-24 bg-card/50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card variant="glass" className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 border border-primary/20">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading font-light mb-3">Risk-Free Guarantee</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>30-day satisfaction guarantee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Cancel anytime, no questions asked</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>First month free for new users</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card variant="glass" className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 border border-primary/20">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading font-light mb-3">Trusted by Leaders</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Featured in top wellness publications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Endorsed by leading tech innovators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Join thousands of tech leaders on a journey to renewal</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Waitlist CTA Section - Integrated with Lindy Automation Spec */}
      <section 
        id="waitlist" 
        className="marketing-section py-24"
        aria-labelledby="waitlist-heading"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <motion.h2
            id="waitlist-heading"
            className="text-3xl md:text-4xl font-heading font-light mb-6"
            variants={itemVariants}
          >
            Start Your Journey Today
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Limited-time offer: First month free for new users. Exclusive access to new content for early adopters.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Card variant="glass" className="border-primary/20">
              <CardContent className="pt-6">
                <form 
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  aria-label="Waitlist signup form"
                  noValidate
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label htmlFor="waitlist-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="waitlist-email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError("");
                        }}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          emailError ? "border-destructive" : "border-border"
                        } bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                        required
                        aria-required="true"
                        aria-invalid={emailError ? "true" : "false"}
                        aria-describedby={emailError ? "email-error" : undefined}
                      />
                      {emailError && (
                        <p 
                          id="email-error" 
                          className="mt-2 text-sm text-destructive" 
                          role="alert"
                          aria-live="polite"
                        >
                          {emailError}
                        </p>
                      )}
                    </div>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="text-base font-semibold focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      disabled={isSubmitting}
                      aria-label="Submit waitlist signup"
                    >
                      {isSubmitting ? "Joining..." : "Join Waitlist"}
                      <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    By joining, you agree to receive updates about the app launch. Unsubscribe anytime.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Founder Intro Audio (if available) - Per ElevenLabs Integration Rule */}
          <motion.div 
            variants={itemVariants}
            className="mt-8"
          >
            <Card variant="glass" className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Play founder introduction audio"
                  >
                    <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                    Listen to Founder Intro
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Hear from our founder about the journey
                  </p>
                </div>
                {/* TODO: Integrate ElevenLabs audio URL from LANDING document */}
                {/* <audio src="/audio/founder-intro-ketamine.mp3" controls aria-label="Founder introduction audio" /> */}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

