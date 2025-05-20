"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  Target,
  Award,
  Heart,
  Scale,
  BookOpen,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AboutPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Timeline data
  const timelineData = [
    {
      year: "2023",
      title: "Party Formation",
      description:
        "Democracy for Citizens Party was established with a vision for inclusive governance.",
      icon: <Users className="w-6 h-6 text-[#39ff14]" />,
    },
    {
      year: "2024",
      title: "Policy Development",
      description:
        "Comprehensive policy framework developed focusing on citizen welfare.",
      icon: <Target className="w-6 h-6 text-[#39ff14]" />,
    },
    {
      year: "2025",
      title: "Official Launch",
      description:
        "Party officially launched with nationwide support and membership drive.",
      icon: <Award className="w-6 h-6 text-[#39ff14]" />,
    },
  ];

  // Leadership team data
  const leadershipTeam = [
    {
      name: "John Doe",
      position: "Party Leader",
      image: "/images/leadership/john-doe.jpg",
      description:
        "20+ years of political experience and community leadership.",
    },
    {
      name: "Jane Smith",
      position: "Deputy Leader",
      image: "/images/leadership/jane-smith.jpg",
      description: "Former civil servant with expertise in public policy.",
    },
    {
      name: "Michael Johnson",
      position: "Secretary General",
      image: "/images/leadership/michael-johnson.jpg",
      description: "Legal expert and human rights advocate.",
    },
  ];

  // Core values data
  const coreValues = [
    {
      title: "Inclusivity",
      description:
        "Ensuring representation and participation for all citizens.",
      icon: <Users className="w-6 h-6 text-[#39ff14]" />,
    },
    {
      title: "Economic Justice",
      description: "Promoting fair economic policies that benefit all Kenyans.",
      icon: <Scale className="w-6 h-6 text-[#39ff14]" />,
    },
    {
      title: "Healthcare Reform",
      description: "Advocating for accessible and affordable healthcare.",
      icon: <Heart className="w-6 h-6 text-[#39ff14]" />,
    },
    {
      title: "Education",
      description:
        "Supporting quality education for Kenya's future generations.",
      icon: <BookOpen className="w-6 h-6 text-[#39ff14]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-[#39ff14]">DCP</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Democracy for Citizens Party (DCP) is a progressive political
              movement dedicated to building a more inclusive, just, and
              prosperous Kenya.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#39ff14] hover:bg-[#39ff14]/80 text-black font-medium px-8 py-6 rounded-full shadow-lg shadow-[#39ff14]/20 flex items-center h-14 text-base cursor-pointer">
                Join Our Movement
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Our <span className="text-[#39ff14]">Journey</span>
            </h2>
            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <motion.div
                  key={item.year}
                  variants={itemVariants}
                  className="flex items-start gap-6"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-black/50 border border-[#39ff14]/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[#39ff14] font-bold">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Our <span className="text-[#39ff14]">Core Values</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-black/50 border border-white/10 rounded-xl p-6 hover:border-[#39ff14]/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-[#39ff14]/10 flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Our <span className="text-[#39ff14]">Leadership</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <Card className="bg-black/50 border border-white/10 hover:border-[#39ff14]/30 transition-all">
                    <CardHeader>
                      <div className="w-24 h-24 rounded-full bg-[#39ff14]/10 mx-auto mb-4">
                        {/* Placeholder for member image */}
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                          <Users className="w-12 h-12 text-[#39ff14]" />
                        </div>
                      </div>
                      <CardTitle className="text-center">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="text-center text-[#39ff14]">
                        {member.position}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-center">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Join Us in Building a Better{" "}
              <span className="text-[#39ff14]">Kenya</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Be part of a movement that puts citizens first and works towards a
              more inclusive and prosperous future for all Kenyans.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#39ff14] hover:bg-[#39ff14]/80 text-black font-medium px-8 py-6 rounded-full shadow-lg shadow-[#39ff14]/20 flex items-center h-14 text-base cursor-pointer">
                Become a Member
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
