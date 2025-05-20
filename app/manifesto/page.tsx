"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Scale,
  Heart,
  BookOpen,
  Users,
  Building2,
  Shield,
  Leaf,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ManifestoPage = () => {
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

  // Policy pillars data
  const policyPillars = [
    {
      id: "economic",
      title: "Economic Justice",
      icon: <Scale className="w-6 h-6" />,
      description: "Building a fair and inclusive economy for all Kenyans",
      policies: [
        "Implement progressive taxation system",
        "Support small and medium enterprises",
        "Create job opportunities through infrastructure development",
        "Ensure fair wages and workers' rights",
      ],
    },
    {
      id: "healthcare",
      title: "Healthcare Reform",
      icon: <Heart className="w-6 h-6" />,
      description: "Universal access to quality healthcare",
      policies: [
        "Strengthen public healthcare system",
        "Reduce healthcare costs for citizens",
        "Improve healthcare infrastructure",
        "Support medical research and innovation",
      ],
    },
    {
      id: "education",
      title: "Education",
      icon: <BookOpen className="w-6 h-6" />,
      description: "Quality education for all Kenyan children",
      policies: [
        "Increase education funding",
        "Improve teacher training and welfare",
        "Modernize school infrastructure",
        "Promote technical and vocational training",
      ],
    },
    {
      id: "social",
      title: "Social Welfare",
      icon: <Users className="w-6 h-6" />,
      description: "Protecting and supporting vulnerable citizens",
      policies: [
        "Strengthen social safety nets",
        "Support elderly and disabled citizens",
        "Promote gender equality",
        "Protect children's rights",
      ],
    },
    {
      id: "infrastructure",
      title: "Infrastructure",
      icon: <Building2 className="w-6 h-6" />,
      description: "Modern infrastructure for a better Kenya",
      policies: [
        "Develop sustainable transport systems",
        "Improve rural infrastructure",
        "Expand digital connectivity",
        "Invest in renewable energy",
      ],
    },
    {
      id: "security",
      title: "Security & Justice",
      icon: <Shield className="w-6 h-6" />,
      description: "Ensuring safety and justice for all",
      policies: [
        "Reform police and security services",
        "Strengthen judicial system",
        "Combat corruption effectively",
        "Protect human rights",
      ],
    },
    {
      id: "environment",
      title: "Environment",
      icon: <Leaf className="w-6 h-6" />,
      description: "Sustainable development and environmental protection",
      policies: [
        "Combat climate change",
        "Protect natural resources",
        "Promote renewable energy",
        "Implement sustainable waste management",
      ],
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
              Our <span className="text-[#39ff14]">Manifesto</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              A comprehensive vision for a better Kenya, built on the principles
              of justice, equality, and sustainable development.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Policy Pillars Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-6xl mx-auto"
          >
            <Tabs defaultValue="economic" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-black/50 p-1 rounded-xl mb-8">
                {policyPillars.map((pillar) => (
                  <TabsTrigger
                    key={pillar.id}
                    value={pillar.id}
                    className="data-[state=active]:bg-[#39ff14] data-[state=active]:text-black rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {pillar.icon}
                      <span className="hidden md:inline">{pillar.title}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {policyPillars.map((pillar) => (
                <TabsContent key={pillar.id} value={pillar.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-black/50 border border-white/10">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-[#39ff14]/10 flex items-center justify-center">
                            {pillar.icon}
                          </div>
                          <div>
                            <CardTitle className="text-2xl">
                              {pillar.title}
                            </CardTitle>
                            <CardDescription className="text-[#39ff14]">
                              {pillar.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {pillar.policies.map((policy, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="w-6 h-6 rounded-full bg-[#39ff14]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                <ChevronRight className="w-4 h-4 text-[#39ff14]" />
                              </div>
                              <span className="text-gray-300">{policy}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Support Our <span className="text-[#39ff14]">Vision</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Join us in building a better Kenya. Together, we can create
              lasting change and a brighter future for all citizens.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#39ff14] hover:bg-[#39ff14]/80 text-black font-medium px-8 py-6 rounded-full shadow-lg shadow-[#39ff14]/20 flex items-center h-14 text-base cursor-pointer">
                Join Our Movement
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ManifestoPage;
