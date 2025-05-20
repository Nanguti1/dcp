// Homepage.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import * as THREE from "three";
import {
  ChevronRight,
  Heart,
  Scale,
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  ArrowRight,
  Clock,
  MapPin,
  Check,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Homepage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const threeJsContainerRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // ThreeJS setup for the hero background
  useEffect(() => {
    if (!threeJsContainerRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clear container and append new renderer
    if (threeJsContainerRef.current.firstChild) {
      threeJsContainerRef.current.removeChild(
        threeJsContainerRef.current.firstChild
      );
    }
    threeJsContainerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    // Green particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x39ff14, // Neon green
      transparent: true,
      opacity: 0.7,
    });

    // Create points mesh
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Animation function
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.001;

      // Subtle mouse follow effect
      particlesMesh.rotation.x += mouseY * 0.0005;
      particlesMesh.rotation.y += mouseX * 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (threeJsContainerRef.current) {
        if (threeJsContainerRef.current.firstChild) {
          threeJsContainerRef.current.removeChild(
            threeJsContainerRef.current.firstChild
          );
        }
      }
      // Dispose of Three.js resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Party values data
  const partyValues = [
    {
      title: "Economic Justice",
      description:
        "Promoting fair economic policies that benefit all citizens and reduce inequality.",
      icon: <Scale className="w-6 h-6 text-[#39ff14]" />,
      delay: 0.1,
    },
    {
      title: "Healthcare Reform",
      description:
        "Advocating for accessible and affordable healthcare services for every Kenyan.",
      icon: <Heart className="w-6 h-6 text-[#e30613]" />,
      delay: 0.2,
    },
    {
      title: "Inclusivity",
      description:
        "Ensuring representation and participation for all citizens regardless of background.",
      icon: <Users className="w-6 h-6 text-[#39ff14]" />,
      delay: 0.3,
    },
    {
      title: "Education",
      description:
        "Supporting quality education and learning opportunities for Kenya's future generations.",
      icon: <BookOpen className="w-6 h-6 text-[#e30613]" />,
      delay: 0.4,
    },
  ];

  // Upcoming events data
  const upcomingEvents = [
    {
      title: "Party Launch Rally",
      location: "Nairobi City Stadium",
      date: "June 5, 2025",
      time: "10:00 AM - 2:00 PM",
      description:
        "Join us for the official launch of the Democracy for Citizens Party.",
    },
    {
      title: "Economic Policy Forum",
      location: "KICC Conference Center",
      date: "June 12, 2025",
      time: "9:00 AM - 4:00 PM",
      description:
        "Discussion on economic policies and their impact on Kenyan citizens.",
    },
    {
      title: "Youth Outreach Program",
      location: "University of Nairobi",
      date: "June 18, 2025",
      time: "2:00 PM - 5:00 PM",
      description:
        "Engaging young Kenyans in the political process and gathering their insights.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: custom * 0.1,
      },
    }),
  };

  return (
    <div className="relative">
      {/* Three.js Background Container */}
      <div
        ref={threeJsContainerRef}
        className="fixed top-0 left-0 w-full h-full z-0 opacity-70"
      />

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="flex flex-col space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Party Slogan Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge className="bg-black/70 text-[#39ff14] border border-[#39ff14]/50 px-4 py-1.5 text-sm font-medium rounded-full backdrop-blur-sm">
                  Skiza Wakenya
                </Badge>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Democracy for{" "}
                <span className="text-[#39ff14] relative">
                  Citizens Party
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-[#39ff14]/30"></span>
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                className="text-lg md:text-xl text-gray-300 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Building a political platform that prioritizes inclusivity,
                economic justice, and responsive governance for all Kenyans.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-[#39ff14] hover:bg-[#39ff14]/80 text-black font-medium px-6 py-6 rounded-full shadow-lg shadow-[#39ff14]/20 flex items-center h-12 cursor-pointer">
                    Join Us
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-6 py-6 rounded-full backdrop-blur-sm h-12 cursor-pointer"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hero Image/Graphic */}
            <motion.div
              className="relative flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 backdrop-blur-xl rounded-full flex items-center justify-center">
                {/* Animated ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#39ff14]/30 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full border border-[#39ff14]/20"></div>
                <div className="absolute inset-4 rounded-full border border-[#39ff14]/10"></div>

                {/* Logo */}
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 rounded-full bg-[#39ff14]/10 animate-pulse"></div>
                  <div className="relative flex items-center justify-center h-full">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-24 h-24 text-[#39ff14]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="M12 11.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      <path d="M12 2C9.8 2 8 3.8 8 6v3c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V6c0-2.2-1.8-4-4-4z" />
                      <path d="M17 10v1a5 5 0 01-10 0v-1" />
                      <path d="M21 16c-.5-4-3.3-8-9-8-5.7 0-8.5 4-9 8" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-60"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white rounded-full"></div>
            </div>
            <p className="mt-2 text-white/70 text-sm">Scroll Down</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Party Values Section */}
      <section className="py-24 bg-gradient-to-b from-black via-black/95 to-black relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              variants={itemVariants}
            >
              Our Core <span className="text-[#39ff14]">Values</span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-400 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              The Democracy for Citizens Party stands on principles that put
              people first, ensuring that our policies reflect the real needs of
              Kenyans.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partyValues.map((value, index) => (
              <motion.div
                key={value.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="bg-black/50 border border-white/10 backdrop-blur-sm hover:border-[#39ff14]/30 transition-all shadow-lg overflow-hidden h-full">
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      {value.icon}
                    </div>
                    <CardTitle className="text-white text-xl font-medium">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="text-[#39ff14] p-0 hover:bg-transparent hover:text-[#39ff14]/80 flex items-center gap-2 text-sm cursor-pointer"
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-24 bg-black relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              variants={itemVariants}
            >
              Upcoming <span className="text-[#39ff14]">Events</span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-400 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Join us at our events across Kenya and be part of the change you
              want to see.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="bg-black/50 border border-white/10 backdrop-blur-sm hover:border-[#39ff14]/30 transition-all shadow-lg overflow-hidden h-full">
                  <CardHeader className="pb-2">
                    <Badge className="bg-[#39ff14]/20 text-[#39ff14] self-start mb-2">
                      Upcoming
                    </Badge>
                    <CardTitle className="text-white text-xl font-medium">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 mt-1 flex-shrink-0 text-[#39ff14]" />
                      <p>{event.date}</p>
                    </div>
                    <div className="flex items-start gap-2 text-gray-400">
                      <Clock className="w-4 h-4 mt-1 flex-shrink-0 text-[#39ff14]" />
                      <p>{event.time}</p>
                    </div>
                    <div className="flex items-start gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#39ff14]" />
                      <p>{event.location}</p>
                    </div>
                    <CardDescription className="text-gray-400 text-base pt-2">
                      {event.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#39ff14]/20 hover:bg-[#39ff14]/30 text-[#39ff14] border border-[#39ff14]/20 cursor-pointer">
                      RSVP to Event
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-6 py-6 rounded-full backdrop-blur-sm h-12 cursor-pointer"
              >
                View All Events
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Membership Call-to-Action */}
      <section className="py-24 bg-gradient-to-b from-black to-black/95 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              className="bg-gradient-to-br from-black/60 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
              variants={itemVariants}
            >
              {/* Background glow effect */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#39ff14]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#e30613]/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 text-center md:text-left md:flex items-center justify-between gap-8">
                <div className="mb-8 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Become a <span className="text-[#39ff14]">Member</span>{" "}
                    Today
                  </h2>
                  <p className="text-gray-300 text-lg max-w-xl">
                    Join the Democracy for Citizens Party and be part of a
                    movement that puts citizens' voices at the center of
                    governance.
                  </p>

                  <div className="mt-6 flex flex-col md:flex-row gap-3 text-left">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 text-[#39ff14]">
                        <Check className="w-4 h-4" />
                      </div>
                      <p className="text-gray-300 text-sm">
                        Shape party policies
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 text-[#39ff14]">
                        <Check className="w-4 h-4" />
                      </div>
                      <p className="text-gray-300 text-sm">
                        Participate in events
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 text-[#39ff14]">
                        <Check className="w-4 h-4" />
                      </div>
                      <p className="text-gray-300 text-sm">
                        Connect with like-minded citizens
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-[#39ff14] hover:bg-[#39ff14]/80 text-black font-medium px-8 py-6 rounded-full shadow-lg shadow-[#39ff14]/20 flex items-center h-14 text-base cursor-pointer">
                      Register Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
