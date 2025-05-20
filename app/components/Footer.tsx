// Footer.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Twitter,
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
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
    visible: { opacity: 1, y: 0 },
  };

  const quickLinks = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Manifesto", href: "/manifesto" },
    { title: "News", href: "/news" },
    { title: "Events", href: "/events" },
    { title: "Membership", href: "/membership" },
    { title: "Contact", href: "/contact" },
  ];

  const resourceLinks = [
    { title: "Press Releases", href: "/press" },
    { title: "Gallery", href: "/gallery" },
    { title: "FAQs", href: "/faqs" },
    { title: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <motion.footer
      className="bg-black text-white pt-16 pb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full bg-[#39ff14] opacity-20 animate-pulse"></div>
                <div className="relative flex items-center justify-center h-full">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-[#39ff14]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 11.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    <path d="M12 2C9.8 2 8 3.8 8 6v3c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V6c0-2.2-1.8-4-4-4z" />
                    <path d="M17 10v1a5 5 0 01-10 0v-1" />
                    <path d="M21 16c-.5-4-3.3-8-9-8-5.7 0-8.5 4-9 8" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">DCP</h2>
                <p className="text-sm text-[#39ff14]">Skiza Wakenya</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              Democracy for Citizens Party (DCP) is committed to inclusivity,
              economic justice, healthcare reform, and responsive governance for
              all Kenyans.
            </p>

            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-gray-400 hover:text-[#39ff14] transition-colors cursor-pointer"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-gray-400 hover:text-[#39ff14] transition-colors cursor-pointer"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                className="text-gray-400 hover:text-[#39ff14] transition-colors cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#39ff14]"></div>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#39ff14] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>{link.title}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block">
              Resources
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#39ff14]"></div>
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.title}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#39ff14] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>{link.title}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold relative inline-block">
              Contact Us
              <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#39ff14]"></div>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#39ff14] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  info@democracyforcitizens.org
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#39ff14] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">+254 (0) 700 000 000</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#39ff14] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  DCP Headquarters, Nairobi, Kenya
                </span>
              </li>
            </ul>

            <Button className="bg-[#39ff14] hover:bg-[#39ff14]/80 text-black font-medium rounded-full mt-4 group cursor-pointer">
              Join Newsletter
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <motion.p variants={itemVariants}>
            © {new Date().getFullYear()} Democracy for Citizens Party (DCP). All
            rights reserved.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex space-x-6 mt-4 md:mt-0"
          >
            <Link
              href="/terms"
              className="hover:text-[#39ff14] transition-colors cursor-pointer"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[#39ff14] transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="hover:text-[#39ff14] transition-colors cursor-pointer"
            >
              Cookie Policy
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
