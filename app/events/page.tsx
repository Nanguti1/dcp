"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  ExternalLink,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const EventsPage = () => {
  const ref = useRef(null);
  const threeJsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  // ThreeJS setup for the hero background
  useEffect(() => {
    if (!threeJsContainerRef.current) return;

    // Initialize Three.js scene
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

    // Animation
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

  // Event categories with icons
  const categories = [
    { id: "all", label: "All Events", icon: <Star className="w-4 h-4" /> },
    { id: "rallies", label: "Rallies", icon: <Users className="w-4 h-4" /> },
    {
      id: "meetings",
      label: "Meetings",
      icon: <Calendar className="w-4 h-4" />,
    },
    { id: "forums", label: "Forums", icon: <Filter className="w-4 h-4" /> },
    { id: "workshops", label: "Workshops", icon: <Plus className="w-4 h-4" /> },
  ];

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Party Launch Rally",
      category: "rallies",
      date: "June 5, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Nairobi City Stadium",
      description:
        "Join us for the official launch of the Democracy for Citizens Party. Experience the energy of change and be part of history.",
      image: "/images/events/party-launch.jpg",
      capacity: 5000,
      registered: 3200,
      status: "upcoming",
      featured: true,
    },
    {
      id: 2,
      title: "Economic Policy Forum",
      category: "forums",
      date: "June 12, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "KICC Conference Center",
      description:
        "Discussion on economic policies and their impact on Kenyan citizens. Join experts and policymakers for this important dialogue.",
      image: "/images/events/economic-forum.jpg",
      capacity: 500,
      registered: 280,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Youth Outreach Program",
      category: "workshops",
      date: "June 18, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "University of Nairobi",
      description:
        "Engaging young Kenyans in the political process and gathering their insights for a better future.",
      image: "/images/events/youth-outreach.jpg",
      capacity: 300,
      registered: 150,
      status: "upcoming",
    },
    {
      id: 4,
      title: "Regional Meeting - Coast",
      category: "meetings",
      date: "May 15, 2025",
      time: "11:00 AM - 1:00 PM",
      location: "Mombasa Beach Hotel",
      description:
        "Regional meeting with coastal leaders to discuss development priorities and party strategy.",
      image: "/images/events/coast-meeting.jpg",
      capacity: 200,
      registered: 180,
      status: "past",
    },
    {
      id: 5,
      title: "Women's Empowerment Forum",
      category: "forums",
      date: "May 8, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Safari Park Hotel",
      description:
        "Empowering women in leadership and discussing gender equality in politics.",
      image: "/images/events/women-forum.jpg",
      capacity: 400,
      registered: 350,
      status: "past",
    },
  ];

  // Filter events based on search query, selected category, and active tab
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesStatus = event.status === activeTab;
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
                Join Our Events
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our{" "}
              <span className="text-[#39ff14] relative">
                Events
                <span className="absolute bottom-1 left-0 w-full h-1 bg-[#39ff14]/30"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join us at our events across Kenya and be part of the change you
              want to see. Experience the energy of democracy in action.
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
                  View Upcoming Events
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
                  Add to Calendar
                  <Calendar className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Events Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto"
          >
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchQuery(e.target.value)
                    }
                    className="pl-10 bg-black/50 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-[200px] bg-black/50 border-white/10 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/10">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="text-white hover:bg-[#39ff14]/10 focus:bg-[#39ff14]/10"
                    >
                      <div className="flex items-center gap-2">
                        {category.icon}
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Events Tabs */}
            <Tabs
              defaultValue="upcoming"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-black/50 p-1 rounded-xl mb-8">
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-[#39ff14] data-[state=active]:text-black rounded-lg"
                >
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="data-[state=active]:bg-[#39ff14] data-[state=active]:text-black rounded-lg"
                >
                  Past Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      variants={itemVariants}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <Card className="bg-black/50 border border-white/10 hover:border-[#39ff14]/30 transition-all h-full backdrop-blur-sm">
                        {event.featured && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-[#39ff14] text-black">
                              Featured
                            </Badge>
                          </div>
                        )}
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <CardTitle className="text-xl font-medium line-clamp-2">
                            {event.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-start gap-2 text-gray-400">
                              <Clock className="w-4 h-4 mt-1 flex-shrink-0 text-[#39ff14]" />
                              <p>{event.time}</p>
                            </div>
                            <div className="flex items-start gap-2 text-gray-400">
                              <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#39ff14]" />
                              <p>{event.location}</p>
                            </div>
                            <div className="flex items-start gap-2 text-gray-400">
                              <Users className="w-4 h-4 mt-1 flex-shrink-0 text-[#39ff14]" />
                              <p>
                                {event.registered} / {event.capacity} registered
                              </p>
                            </div>
                            <CardDescription className="text-gray-400 line-clamp-3 pt-2">
                              {event.description}
                            </CardDescription>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <Badge className="bg-[#39ff14]/20 text-[#39ff14]">
                            {event.category}
                          </Badge>
                          <Button
                            variant="ghost"
                            className="text-[#39ff14] p-0 hover:bg-transparent hover:text-[#39ff14]/80 flex items-center gap-2 text-sm cursor-pointer"
                          >
                            Register Now
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      variants={itemVariants}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <Card className="bg-black/50 border border-white/10 hover:border-[#39ff14]/30 transition-all h-full backdrop-blur-sm">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <CardTitle className="text-xl font-medium line-clamp-2">
                            {event.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-start gap-2 text-gray-400">
                              <Clock className="w-4 h-4 mt-1 flex-shrink-0 text-[#39ff14]" />
                              <p>{event.time}</p>
                            </div>
                            <div className="flex items-start gap-2 text-gray-400">
                              <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#39ff14]" />
                              <p>{event.location}</p>
                            </div>
                            <div className="flex items-start gap-2 text-gray-400">
                              <Users className="w-4 h-4 mt-1 flex-shrink-0 text-[#39ff14]" />
                              <p>
                                {event.registered} / {event.capacity} attended
                              </p>
                            </div>
                            <CardDescription className="text-gray-400 line-clamp-3 pt-2">
                              {event.description}
                            </CardDescription>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <Badge className="bg-[#39ff14]/20 text-[#39ff14]">
                            {event.category}
                          </Badge>
                          <Button
                            variant="ghost"
                            className="text-[#39ff14] p-0 hover:bg-transparent hover:text-[#39ff14]/80 flex items-center gap-2 text-sm cursor-pointer"
                          >
                            View Photos
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Calendar Integration Button */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-6 py-6 rounded-full backdrop-blur-sm h-12 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
