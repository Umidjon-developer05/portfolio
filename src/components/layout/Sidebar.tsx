import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Briefcase,
  FileText,
  Code,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigation = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: User },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Resume", path: "/resume", icon: FileText },
    { name: "Skills", path: "/skills", icon: Code },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-200 right-5 z-50 p-2 rounded-lg bg-secondary text-foreground lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar backdrop for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-sidebar z-40 transition-transform duration-300 ease-in-out",

          !isOpen && "transform -translate-x-full md:translate-x-0",

          "flex flex-col justify-between border-r border-sidebar-border"
        )}
      >
        <div className="p-6 flex-shrink-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">
              <img
                src="/logo.svg"
                alt="Umidjon Logo"
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight font-heading">
              Umidjon
            </h1>
          </div>

          <nav className="space-y-1 mt-8">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "sidebar-link",
                    isActive && "active bg-primary/10 text-primary font-medium"
                  )
                }
                onClick={() => isMobile && setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {location.pathname === item.path && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r-md" />
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 flex-shrink-0">
          <div className="glass-card p-4 text-center">
            <p className="text-sm text-white/70">© 2025 Umidjon</p>
            <p className="text-xs text-white/50 mt-1">Portfolio</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
