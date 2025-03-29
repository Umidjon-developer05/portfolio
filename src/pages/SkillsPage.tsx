import React from "react";
import { Code, Palette, Database, Globe, Cpu, Users } from "lucide-react";

const SkillsPage = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      skills: [
        { name: "HTML5/CSS3", level: 95 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "React.js", level: 88 },
        { name: "TypeScript", level: 85 },
        { name: "Next.js", level: 80 },
        { name: "TailwindCSS", level: 92 },
      ],
    },
    {
      title: "UI/UX Design",
      icon: Palette,
      skills: [
        { name: "Figma", level: 90 },
        { name: "Adobe XD", level: 85 },
        { name: "Photoshop", level: 75 },
        { name: "Wireframing", level: 88 },
        { name: "Prototyping", level: 85 },
        { name: "Design Systems", level: 82 },
      ],
    },
    {
      title: "Backend Development",
      icon: Database,
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 82 },
        { name: "MongoDB", level: 78 },
        { name: "PostgreSQL", level: 75 },
        { name: "RESTful APIs", level: 85 },
        { name: "GraphQL", level: 70 },
      ],
    },
    {
      title: "Other Technical Skills",
      icon: Cpu,
      skills: [
        { name: "Git/GitHub", level: 88 },
        { name: "CI/CD", level: 78 },
        { name: "Testing", level: 75 },
        { name: "Performance Optimization", level: 80 },
        { name: "Responsive Design", level: 95 },
        { name: "Accessibility", level: 85 },
      ],
    },
    {
      title: "Languages",
      icon: Globe,
      skills: [
        { name: "English", level: 95 },
        { name: "Russian", level: 85 },
        { name: "Uzbek", level: 100 },
      ],
    },
    {
      title: "Soft Skills",
      icon: Users,
      skills: [
        { name: "Communication", level: 90 },
        { name: "Teamwork", level: 88 },
        { name: "Problem Solving", level: 92 },
        { name: "Time Management", level: 85 },
        { name: "Adaptability", level: 90 },
        { name: "Leadership", level: 80 },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-down">
        My Expertise
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 animate-fade-up">
        Skills & Proficiency
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <div
            key={category.title}
            className="glass-card p-6 animate-fade-up hover-lift"
            style={{ animationDelay: `${0.1 + index * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/20">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-white">{category.title}</h2>
            </div>

            <div className="space-y-5">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm text-white/70">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary/80 to-primary h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        animation: "progressAnimation 1.5s ease-out forwards",
                        opacity: 0,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-16 glass-card p-8 animate-fade-up"
        style={{ animationDelay: "0.7s" }}
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          My Development Approach
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">
              User-Centered
            </h3>
            <p className="text-sm text-white/70">
              I put users at the heart of every development decision to create
              intuitive, accessible experiences.
            </p>
          </div>

          <div className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">
              Performance First
            </h3>
            <p className="text-sm text-white/70">
              I optimize for speed and efficiency, ensuring applications load
              quickly and run smoothly.
            </p>
          </div>

          <div className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">
              Clean Code
            </h3>
            <p className="text-sm text-white/70">
              I write maintainable, well-documented code that follows best
              practices and design patterns.
            </p>
          </div>

          <div className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">
              Responsive Design
            </h3>
            <p className="text-sm text-white/70">
              I create layouts that work flawlessly across all devices and
              screen sizes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
