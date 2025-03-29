import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-ping-slow"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-spin-slow"></div>

      <div className="max-w-3xl mx-auto">
        <div className="animation-container">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-down">
            Welcome to my portfolio
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight font-heading animate-fade-up">
            I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Umidjon
            </span>
            , <br />
            Creative Developer
          </h1>
          <p
            className="text-lg text-white/70 mb-8 max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            I build elegant and functional web experiences with a focus on
            animation, interaction design, and a pixel-perfect approach to
            modern web development.
          </p>

          <div
            className="flex flex-wrap gap-4 mb-12 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/projects"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all flex items-center gap-2 group"
            >
              View my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all border border-white/10"
            >
              Contact me
            </Link>
          </div>

          <div
            className="flex items-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
