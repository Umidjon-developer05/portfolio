"use client";
import { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import GlobalsApi from "../_utils/GlobalsApi";

interface Portfolio {
  id: number;
  title: string;
  description: string;
  images: { url: string };
  portfoliocom: { lanuges: string }[];
}

interface ApiResponse {
  portfolios: Portfolio[];
}

const ProjectsPage = () => {
  const [projects, setPortfolio] = useState<Portfolio[]>([]);
  async function GetALLN() {
    try {
      const resp = await GlobalsApi.getAllPortfolio();
      console.log("API Response:", resp);

      const data = resp as ApiResponse;

      setPortfolio(data.portfolios || []);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      setPortfolio([]); // Fallback in case of an error
    }
  }

  useEffect(() => {
    GetALLN();
  }, []);
  console.log(projects);

  return (
    <div className="py-12">
      <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-down">
        My Work
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-up">
        Featured Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="glass-card overflow-hidden rounded-lg hover-lift animate-fade-up"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={project.images?.url}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white">
                {project.title}
              </h3>
              <p className="text-white/70 mb-4 text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.portfoliocom.map((tag) => (
                  <span
                    key={tag.lanuges}
                    className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/70"
                  >
                    {tag.lanuges}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a className="text-white/70 hover:text-white transition-colors flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  <span className="text-sm">Source</span>
                </a>
                <a className="text-primary hover:text-primary/90 transition-colors flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-sm">Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
