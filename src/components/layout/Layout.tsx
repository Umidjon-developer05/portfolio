import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Initial page load animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Page transition animation
    if (prevPath !== location.pathname) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setPrevPath(location.pathname);
        setIsTransitioning(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, prevPath]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main
        className={cn(
          "flex-1 p-4 md:p-8 transition-all duration-500 ease-out relative overflow-x-hidden",
          isMobile ? "ml-0" : "md:ml-64",
          isLoading ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0"
        )}
      >
        <div
          className={cn(
            "transition-all duration-500 ease-out mx-auto",
            "max-w-full md:max-w-3xl lg:max-w-5xl xl:max-w-6xl",
            isTransitioning
              ? "opacity-0 translate-x-8"
              : "opacity-100 translate-x-0"
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
