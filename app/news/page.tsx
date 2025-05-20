"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  Calendar,
  Tag,
  ChevronRight,
  ExternalLink,
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

const NewsPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  // News categories
  const categories = [
    { id: "all", label: "All News" },
    { id: "politics", label: "Politics" },
    { id: "policy", label: "Policy" },
    { id: "events", label: "Events" },
    { id: "press", label: "Press Releases" },
  ];

  // Sample news data
  const newsItems = [
    {
      id: 1,
      title: "DCP Launches New Economic Policy Framework",
      category: "policy",
      date: "March 15, 2025",
      description:
        "The Democracy for Citizens Party unveils its comprehensive economic policy framework aimed at promoting inclusive growth and development.",
      image: "/images/news/economic-policy.jpg",
      tags: ["Economy", "Policy", "Development"],
    },
    {
      id: 2,
      title: "Party Leader Addresses Youth Forum",
      category: "events",
      date: "March 12, 2025",
      description:
        "Party leadership engages with young Kenyans to discuss the future of politics and governance in the country.",
      image: "/images/news/youth-forum.jpg",
      tags: ["Youth", "Leadership", "Engagement"],
    },
    {
      id: 3,
      title: "DCP Condemns Recent Political Violence",
      category: "press",
      date: "March 10, 2025",
      description:
        "Official statement from the party leadership condemning recent incidents of political violence across the country.",
      image: "/images/news/political-violence.jpg",
      tags: ["Peace", "Security", "Statement"],
    },
    {
      id: 4,
      title: "Healthcare Reform Bill Proposed",
      category: "policy",
      date: "March 8, 2025",
      description:
        "Party proposes comprehensive healthcare reform bill to improve access to quality healthcare for all Kenyans.",
      image: "/images/news/healthcare.jpg",
      tags: ["Healthcare", "Policy", "Reform"],
    },
    {
      id: 5,
      title: "Regional Party Meeting in Mombasa",
      category: "events",
      date: "March 5, 2025",
      description:
        "Party leadership meets with coastal region members to discuss regional development and party strategy.",
      image: "/images/news/regional-meeting.jpg",
      tags: ["Regional", "Meeting", "Strategy"],
    },
    {
      id: 6,
      title: "New Party Headquarters Inauguration",
      category: "events",
      date: "March 1, 2025",
      description:
        "DCP inaugurates new state-of-the-art party headquarters in Nairobi, marking a new chapter in party development.",
      image: "/images/news/hq-inauguration.jpg",
      tags: ["Infrastructure", "Development", "Milestone"],
    },
  ];

  // Filter news items based on search query and selected category
  const filteredNews = newsItems.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              Latest <span className="text-[#39ff14]">News</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Stay informed about our latest developments, policy announcements,
              and party activities.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* News Grid Section */}
      <section className="py-20">
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
                    placeholder="Search news..."
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
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <Card className="bg-black/50 border border-white/10 hover:border-[#39ff14]/30 transition-all h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                      <CardTitle className="text-xl font-medium line-clamp-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 line-clamp-3">
                        {item.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[#39ff14]/10 text-[#39ff14]"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="text-[#39ff14] p-0 hover:bg-transparent hover:text-[#39ff14]/80 flex items-center gap-2 text-sm cursor-pointer"
                      >
                        Read More
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
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
                  Load More News
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

export default NewsPage;
