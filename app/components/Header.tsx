// Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Twitter,
  Facebook,
  Instagram,
  MessageCircle,
  ChevronDown,
  User,
  FileText,
  Calendar,
  Phone,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll for sticky header effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      const progress =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links data
  const navLinks = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Manifesto", href: "/manifesto" },
    { title: "News", href: "/news" },
    { title: "Events", href: "/events" },
    { title: "Membership", href: "/membership" },
    { title: "Contact", href: "/contact" },
  ];

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollPosition > 50
          ? "bg-black/90 backdrop-blur-md shadow-lg py-2"
          : "bg-black py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Brand */}
        <motion.div
          className="flex items-center"
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              {/* Stylized hand holding ear logo */}
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
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                DCP
              </h1>
              <p className="text-xs md:text-sm text-[#39ff14] font-medium">
                Skiza Wakenya
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link, index) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    asChild
                  >
                    <Link href={link.href}>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                      >
                        {link.title}
                      </motion.span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Social Icons - Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            className="text-white hover:text-[#39ff14] transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            className="text-white hover:text-[#39ff14] transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            className="text-white hover:text-[#39ff14] transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 top-16 bg-black/95 lg:hidden z-40 overflow-y-auto"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="container mx-auto px-4 py-8">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center py-3 px-4 text-white hover:text-[#39ff14] hover:bg-white/5 rounded-lg transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title === "Home" && (
                        <MessageCircle className="mr-3 w-5 h-5" />
                      )}
                      {link.title === "About Us" && (
                        <User className="mr-3 w-5 h-5" />
                      )}
                      {link.title === "Manifesto" && (
                        <FileText className="mr-3 w-5 h-5" />
                      )}
                      {link.title === "News" && (
                        <MessageCircle className="mr-3 w-5 h-5" />
                      )}
                      {link.title === "Events" && (
                        <Calendar className="mr-3 w-5 h-5" />
                      )}
                      {link.title === "Membership" && (
                        <User className="mr-3 w-5 h-5" />
                      )}
                      {link.title === "Contact" && (
                        <Phone className="mr-3 w-5 h-5" />
                      )}
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Social Links */}
              <div className="mt-8 flex justify-center space-x-6">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-white hover:text-[#39ff14]"
                >
                  <Twitter className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-white hover:text-[#39ff14]"
                >
                  <Facebook className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-white hover:text-[#39ff14]"
                >
                  <Instagram className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="h-0.5 bg-[#39ff14] fixed top-0 left-0 right-0 z-50"
        style={{
          scaleX: scrollProgress,
          transformOrigin: "0%",
        }}
      />
    </motion.header>
  );
};

export default Header;
