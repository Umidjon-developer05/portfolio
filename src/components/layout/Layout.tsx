import React from "react";
import Sidebar from "./Sidebar";
import { Scene3D } from "../Scene3D";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Background animations (always behind) */}
      <div className="absolute inset-0 opacity-40 z-0">
        <Scene3D />
      </div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8b5cf610_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf610_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Blurred glowing circles */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse-glow z-0" />
      <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl animate-pulse-glow z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow z-0" />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full z-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main content always above */}
      <div className="relative z-10">
        <Sidebar />
        <main className="pt-20 ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
