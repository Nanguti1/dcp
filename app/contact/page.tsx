"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ChevronDown,
  MessageSquare,
  Building2,
  Newspaper,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ContactPage = () => {
  const ref = useRef(null);
  const threeJsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");

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

  // Office locations
  const offices = [
    {
      city: "Nairobi",
      address: "KICC Building, 3rd Floor",
      phone: "+254 20 123 4567",
      email: "nairobi@dcp.co.ke",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
    },
    {
      city: "Mombasa",
      address: "Nyali Business Center",
      phone: "+254 41 123 4567",
      email: "mombasa@dcp.co.ke",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
    },
    {
      city: "Kisumu",
      address: "West End Mall, 2nd Floor",
      phone: "+254 57 123 4567",
      email: "kisumu@dcp.co.ke",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
    },
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How can I become a member of DCP?",
      answer:
        "You can become a member by visiting our Membership page and choosing the tier that best suits your needs. The process is simple and can be completed online.",
    },
    {
      question: "What are the benefits of joining DCP?",
      answer:
        "Members enjoy various benefits including participation in policy discussions, access to exclusive events, leadership opportunities, and community engagement activities.",
    },
    {
      question: "How can I volunteer with DCP?",
      answer:
        "We welcome volunteers! You can sign up through our website or contact your nearest office. We have various roles available in events, community outreach, and administration.",
    },
    {
      question: "How can I stay updated with DCP news?",
      answer:
        "You can subscribe to our newsletter, follow our social media channels, or regularly check our website for updates on events, policies, and party activities.",
    },
    {
      question: "How can I report an issue or make a complaint?",
      answer:
        "You can use our contact form, email us directly, or visit any of our offices. We take all feedback seriously and will respond promptly.",
    },
  ];

  // Social media links
  const socialLinks = [
    { icon: <Facebook className="w-6 h-6" />, url: "#", label: "Facebook" },
    { icon: <Twitter className="w-6 h-6" />, url: "#", label: "Twitter" },
    { icon: <Instagram className="w-6 h-6" />, url: "#", label: "Instagram" },
    { icon: <Linkedin className="w-6 h-6" />, url: "#", label: "LinkedIn" },
    { icon: <Youtube className="w-6 h-6" />, url: "#", label: "YouTube" },
  ];

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted:", formData);
  };

  // Handle newsletter signup
  const handleNewsletterSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add newsletter signup logic here
    console.log("Newsletter signup:", newsletterEmail);
  };

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
                Get in Touch
              </Badge>
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contact{" "}
              <span className="text-[#39ff14] relative">
                Us
                <span className="absolute bottom-1 left-0 w-full h-1 bg-[#39ff14]/30"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Have questions or want to get involved? We're here to help. Reach
              out to us through any of our channels.
            </p>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <Card className="bg-black/50 border border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-medium flex items-center gap-2">
                      <MessageSquare className="w-6 h-6 text-[#39ff14]" />
                      Send us a Message
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-300"
                          >
                            Name
                          </label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="bg-black/50 border-white/10 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-300"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="bg-black/50 border-white/10 text-white"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium text-gray-300"
                        >
                          Subject
                        </label>
                        <Input
                          id="subject"
                          type="text"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          className="bg-black/50 border-white/10 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium text-gray-300"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Your message..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="bg-black/50 border-white/10 text-white min-h-[150px]"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#39ff14] hover:bg-[#39ff14]/80 text-black font-medium"
                      >
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Office Locations */}
              <motion.div variants={itemVariants}>
                <Card className="bg-black/50 border border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-medium flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-[#39ff14]" />
                      Our Offices
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Visit us at any of our offices across Kenya.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {offices.map((office) => (
                        <div
                          key={office.city}
                          className="p-4 rounded-lg bg-black/30 border border-white/5 hover:border-[#39ff14]/30 transition-all"
                        >
                          <h3 className="text-xl font-medium mb-2">
                            {office.city}
                          </h3>
                          <div className="space-y-2 text-gray-400">
                            <p className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#39ff14]" />
                              {office.address}
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#39ff14]" />
                              {office.phone}
                            </p>
                            <p className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-[#39ff14]" />
                              {office.email}
                            </p>
                            <p className="text-sm">{office.hours}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* FAQ Section */}
            <motion.div variants={itemVariants} className="mt-20">
              <Card className="bg-black/50 border border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-medium flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-[#39ff14]" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Find answers to common questions about DCP.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-white/10"
                      >
                        <AccordionTrigger className="text-white hover:text-[#39ff14]">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-400">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div variants={itemVariants} className="mt-20">
              <Card className="bg-black/50 border border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-medium flex items-center gap-2">
                    <Newspaper className="w-6 h-6 text-[#39ff14]" />
                    Stay Updated
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Subscribe to our newsletter for the latest updates and news.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleNewsletterSignup}
                    className="flex flex-col md:flex-row gap-4"
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 bg-black/50 border-white/10 text-white"
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-[#39ff14] hover:bg-[#39ff14]/80 text-black font-medium"
                    >
                      Subscribe
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Media Links */}
            <motion.div variants={itemVariants} className="mt-20 text-center">
              <h3 className="text-xl font-medium mb-6">Follow Us</h3>
              <div className="flex justify-center gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white hover:text-[#39ff14] hover:border-[#39ff14]/30 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                    <span className="sr-only">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
