"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";
import {
  Users,
  Star,
  Check,
  ArrowRight,
  ChevronRight,
  Shield,
  Heart,
  Scale,
  BookOpen,
  Calendar,
  Award,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MembershipPage = () => {
  const ref = useRef(null);
  const threeJsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const [activeTab, setActiveTab] = useState("benefits");

  // ThreeJS setup for the hero background
  useEffect(() => {
    if (!threeJsContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (threeJsContainerRef.current.firstChild) {
      threeJsContainerRef.current.removeChild(
        threeJsContainerRef.current.firstChild
      );
    }
    threeJsContainerRef.current.appendChild(renderer.domElement);

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

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x39ff14,
      transparent: true,
      opacity: 0.7,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += mouseY * 0.0005;
      particlesMesh.rotation.y += mouseX * 0.0005;
      renderer.render(scene, camera);
    };

    animate();

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
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Membership benefits
  const benefits = [
    {
      title: "Shape Party Policies",
      description:
        "Participate in policy discussions and help shape the party's direction.",
      icon: <Scale className="w-6 h-6 text-[#39ff14]" />,
    },
    {
      title: "Exclusive Events",
      description:
        "Get priority access to party events, forums, and workshops.",
      icon: <Calendar className="w-6 h-6 text-[#39ff14]" />,
    },
    {
      title: "Leadership Opportunities",
      description: "Take on leadership roles within the party structure.",
      icon: <Award className="w-6 h-6 text-[#39ff14]" />,
    },
    {
      title: "Community Engagement",
      description:
        "Connect with like-minded citizens and build lasting relationships.",
      icon: <Users className="w-6 h-6 text-[#39ff14]" />,
    },
  ];

  // Membership tiers
  const tiers = [
    {
      name: "Basic Member",
      price: "Free",
      description:
        "Essential membership for citizens who want to support the party.",
      features: [
        "Access to party events",
        "Newsletter subscription",
        "Basic voting rights",
        "Community forum access",
      ],
      icon: <Users className="w-8 h-8 text-[#39ff14]" />,
    },
    {
      name: "Active Member",
      price: "KSH 1,000/year",
      description:
        "For citizens who want to actively participate in party activities.",
      features: [
        "All Basic Member benefits",
        "Priority event registration",
        "Policy discussion participation",
        "Leadership training access",
        "Exclusive member events",
      ],
      icon: <Star className="w-8 h-8 text-[#39ff14]" />,
      popular: true,
    },
    {
      name: "Leadership Member",
      price: "KSH 5,000/year",
      description:
        "For citizens who want to take on leadership roles in the party.",
      features: [
        "All Active Member benefits",
        "Leadership position eligibility",
        "Executive meeting access",
        "Strategic planning participation",
        "Mentorship opportunities",
        "VIP event access",
      ],
      icon: <Shield className="w-8 h-8 text-[#39ff14]" />,
    },
  ];

  // Success stories
  const successStories = [
    {
      name: "Sarah Johnson",
      role: "Active Member",
      story:
        "Joining DCP has given me a platform to make real change in my community. The leadership training has been invaluable.",
      image: "/images/members/sarah.jpg",
    },
    {
      name: "Michael Ochieng",
      role: "Leadership Member",
      story:
        "The opportunities for growth and impact within DCP are unmatched. I've found my voice in politics.",
      image: "/images/members/michael.jpg",
    },
    {
      name: "Grace Wanjiku",
      role: "Active Member",
      story:
        "Being part of DCP has connected me with amazing people who share my vision for a better Kenya.",
      image: "/images/members/grace.jpg",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Three.js Background Container */}
      <div
        ref={threeJsContainerRef}
        className="fixed top-0 left-0 w-full h-full z-0 opacity-70"
      />

      {/* Hero Section */}
      <motion.section
        className="relative min-h-[60vh] flex items-center pt-24 pb-12 overflow-hidden"
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="bg-black/70 text-[#39ff14] border border-[#39ff14]/50 px-4 py-1.5 text-sm font-medium rounded-full backdrop-blur-sm mb-6">
                Join Our Movement
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Become a{" "}
              <span className="text-[#39ff14] relative">
                Member
                <span className="absolute bottom-1 left-0 w-full h-1 bg-[#39ff14]/30"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join the Democracy for Citizens Party and be part of a movement
              that puts citizens' voices at the center of governance.
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-[#39ff14] hover:bg-[#39ff14]/80 text-black font-medium px-6 py-6 rounded-full shadow-lg shadow-[#39ff14]/20 flex items-center h-12 cursor-pointer">
                  Join Now
                  <ArrowRight className="ml-2 w-5 h-5" />
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
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto"
          >
            {/* Tabs Navigation */}
            <Tabs
              defaultValue="benefits"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-black/50 p-1 rounded-xl mb-12">
                <TabsTrigger
                  value="benefits"
                  className="data-[state=active]:bg-[#39ff14] data-[state=active]:text-black rounded-lg"
                >
                  Benefits
                </TabsTrigger>
                <TabsTrigger
                  value="tiers"
                  className="data-[state=active]:bg-[#39ff14] data-[state=active]:text-black rounded-lg"
                >
                  Membership Tiers
                </TabsTrigger>
                <TabsTrigger
                  value="stories"
                  className="data-[state=active]:bg-[#39ff14] data-[state=active]:text-black rounded-lg"
                >
                  Success Stories
                </TabsTrigger>
              </TabsList>

              {/* Benefits Tab */}
              <TabsContent value="benefits">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {benefits.map((benefit) => (
                    <motion.div
                      key={benefit.title}
                      variants={itemVariants}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <Card className="bg-black/50 border border-white/10 hover:border-[#39ff14]/30 transition-all h-full backdrop-blur-sm">
                        <CardHeader>
                          <div className="w-12 h-12 rounded-full bg-[#39ff14]/10 flex items-center justify-center mb-4">
                            {benefit.icon}
                          </div>
                          <CardTitle className="text-xl font-medium">
                            {benefit.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-400">
                            {benefit.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Membership Tiers Tab */}
              <TabsContent value="tiers">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {tiers.map((tier) => (
                    <motion.div
                      key={tier.name}
                      variants={itemVariants}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <Card className="bg-black/50 border border-white/10 hover:border-[#39ff14]/30 transition-all h-full backdrop-blur-sm relative">
                        {tier.popular && (
                          <Badge className="absolute -top-3 right-4 bg-[#39ff14] text-black">
                            Most Popular
                          </Badge>
                        )}
                        <CardHeader>
                          <div className="w-16 h-16 rounded-full bg-[#39ff14]/10 flex items-center justify-center mb-4">
                            {tier.icon}
                          </div>
                          <CardTitle className="text-2xl font-medium">
                            {tier.name}
                          </CardTitle>
                          <div className="text-3xl font-bold text-[#39ff14] mt-2">
                            {tier.price}
                          </div>
                          <CardDescription className="text-gray-400 mt-2">
                            {tier.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {tier.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-gray-300"
                              >
                                <Check className="w-5 h-5 text-[#39ff14] mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full bg-[#39ff14] hover:bg-[#39ff14]/80 text-black font-medium">
                            Choose Plan
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Success Stories Tab */}
              <TabsContent value="stories">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {successStories.map((story) => (
                    <motion.div
                      key={story.name}
                      variants={itemVariants}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <Card className="bg-black/50 border border-white/10 hover:border-[#39ff14]/30 transition-all h-full backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-[#39ff14]/10 flex items-center justify-center">
                              <Users className="w-8 h-8 text-[#39ff14]" />
                            </div>
                            <div>
                              <CardTitle className="text-xl font-medium">
                                {story.name}
                              </CardTitle>
                              <CardDescription className="text-[#39ff14]">
                                {story.role}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-start gap-2">
                            <MessageSquare className="w-5 h-5 text-[#39ff14] mt-1 flex-shrink-0" />
                            <p className="text-gray-300 italic">
                              "{story.story}"
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Call to Action */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="bg-gradient-to-br from-black/60 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Background glow effect */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#39ff14]/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#e30613]/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Make a{" "}
                    <span className="text-[#39ff14]">Difference</span>?
                  </h2>
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                    Join thousands of Kenyans who are actively shaping the
                    future of our nation through the Democracy for Citizens
                    Party.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-[#39ff14] hover:bg-[#39ff14]/80 text-black font-medium px-8 py-6 rounded-full shadow-lg shadow-[#39ff14]/20 flex items-center h-14 text-base cursor-pointer">
                      Become a Member Today
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MembershipPage;
