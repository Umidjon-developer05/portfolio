"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Globe,
  ShoppingCart,
  Film,
  Copy,
  Smartphone,
  GraduationCap,
  User,
  Settings,
  Music,
  ExternalLink,
  Github,
  Eye,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlobalsApi from "@/_utils/GlobalsApi";
interface ICategory {
  title: string;
  slug: string;
}
interface IProject {
  id: string;
  title: string;
  description: string;
  images: {
    url: string;
  };
  url?: string;
  portfoliocom: {
    id: string;
    lanuges: string;
  }[];
}

// Icon mapping for each category
const categoryIcons = {
  "landing-page-website": Globe,
  ecommerce: ShoppingCart,
  "movies-website": Film,
  "website-clone": Copy,
  mobile: Smartphone,
  "course-platform": GraduationCap,
  portfolio: User,
  "admin-panel": Settings,
  "music-website": Music,
  "travel-website": Plane,
};

export default function ProjectCategories() {
  const [categories, setData] = useState<ICategory[]>([]);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.slug);
  const [activeProjects, setProjectsData] = useState<IProject[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData: ICategory[] = await GlobalsApi.getAllCategories();
        setData(categoriesData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsResponse = await GlobalsApi.getAllPortfolio(
          activeCategory
        );
        const portfolios: IProject[] =
          (projectsResponse as { portfolios?: IProject[] })?.portfolios || [];
        setProjectsData(portfolios);
        console.log("umidjon-1-projects", portfolios);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    if (activeCategory) {
      fetchProjects();
    }
  }, [activeCategory]);
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].slug);
    }
  }, [categories]);

  const activeCategoryData = categories.find(
    (cat) => cat.slug === activeCategory
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm border border-purple-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            My Work
          </motion.span>
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured Projects
          </motion.h1>
        </motion.div>
      </div>

      {/* Categories Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 p-2 bg-muted/30 rounded-xl">
          {categories.map((category) => {
            const IconComponent =
              categoryIcons[category.slug as keyof typeof categoryIcons];
            const isActive = activeCategory === category.slug;

            return (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm",
                  "hover:bg-background hover:shadow-sm",
                  isActive
                    ? "bg-background shadow-md text-primary border border-border scale-105"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{category.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {activeCategoryData && (
            <>
              {(() => {
                const IconComponent =
                  categoryIcons[
                    activeCategoryData.slug as keyof typeof categoryIcons
                  ];
                return <IconComponent className="h-6 w-6 text-primary" />;
              })()}
              <h2 className="text-2xl font-semibold">
                {activeCategoryData.title}
              </h2>
            </>
          )}
        </div>
        <p className="text-muted-foreground">
          {activeProjects.length}{" "}
          {activeProjects.length === 1 ? "project" : "projects"} available
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-10">
        {activeProjects?.map((project) => (
          <Card
            key={project.id}
            className="group w-[350px] hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          >
            {/* Project Image */}
            <div className="relative overflow-hidden">
              <img
                src={project.images?.url}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* {project.featured && (
                <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
                  Featured
                </Badge>
              )} */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl">
                      <DialogHeader>
                        <div className="sm:flex max-xl:flex-wrap max-xl:justify-center ">
                          <div className="w-full sm:w-1/2 max-xl:w-full">
                            <img
                              src={project.images?.url}
                              alt={project.title}
                              className="w-full h-80 object-cover mt-4 rounded-md"
                            />
                          </div>
                          <div className="w-full sm:w-1/2 max-xl:w-full flex flex-col justify-center ml-4 gap-3">
                            <DialogTitle>{project?.title}</DialogTitle>
                            <DialogDescription>
                              {project?.description ||
                                "No description available"}
                            </DialogDescription>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {project?.portfoliocom.map((tech) => (
                                <Badge
                                  key={tech?.id}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tech.lanuges}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Button asChild className="flex-1" size="sm">
                                <Link to={`${project.url}`} target="_blank">
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  View
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="px-3 bg-transparent"
                              >
                                <Link to={`${project.url}`} target="_blank">
                                  <Github className="h-3 w-3" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {project.description.slice(0, 100)}...
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project?.portfoliocom
                  .map((tech) => (
                    <Badge key={tech?.id} variant="outline" className="text-xs">
                      {tech.lanuges}
                    </Badge>
                  ))
                  .slice(0, 4)}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button asChild className="flex-1" size="sm">
                  <Link to={`${project.url}`} target="_blank">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3 bg-transparent"
                >
                  <Link to={`${project.url}`} target="_blank">
                    <Github className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {activeProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="h-12 w-12 mx-auto mb-4 opacity-50 rounded-full bg-muted flex items-center justify-center">
              {activeCategoryData &&
                (() => {
                  const IconComponent =
                    categoryIcons[
                      activeCategoryData.slug as keyof typeof categoryIcons
                    ];
                  return <IconComponent className="h-6 w-6" />;
                })()}
            </div>
            <p className="text-lg font-medium">No projects available</p>
            <p className="text-sm">
              Projects for this category are coming soon
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
