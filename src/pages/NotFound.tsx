import React from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="glass-card p-8 md:p-12 max-w-lg w-full text-center animate-fade-in">
        <div className="relative mb-6 mx-auto">
          <div className="text-8xl font-bold text-white/10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              Page Not Found
            </span>
          </div>
        </div>

        <p className="text-white/70 mb-8">
          The page you are looking for at{" "}
          <span className="text-primary font-medium">{location.pathname}</span>{" "}
          doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
