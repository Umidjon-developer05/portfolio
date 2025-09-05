import { Download, Briefcase, GraduationCap, Award } from "lucide-react";

const ResumePage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
        <div>
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-down">
            My Resume
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-up">
            Experience & Education
          </h1>
        </div>
        <a
          href="/resume.pdf"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all group self-start animate-fade-up"
          target="_blank"
          >
          <Download className="h-4 w-4" />
          <span>Download CV</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-primary/20">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white">Experience</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.65rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            <div className="relative pl-6 md:pl-0 md:ml-[8.65rem] before:absolute before:left-0 md:before:left-[7.65rem] before:top-5 before:h-3 before:w-3 before:rounded-full before:border-4 before:border-primary before:bg-background">
              <div className="absolute left-0 top-1 hidden text-right text-sm text-white/70 md:block md:left-[-8rem] md:w-[7rem]">
                2022 — Present
              </div>
              <div className="glass-card p-5 hover:bg-white/[0.075] transition-colors">
                <h3 className="text-lg font-semibold text-white">
                  Senior Frontend Developer
                </h3>
                <p className="text-sm text-white/70 mb-1">TechCorp Inc.</p>
                <span className="inline-block md:hidden text-xs text-white/50 mb-2">
                  2022 — Present
                </span>
                <p className="text-sm text-white/70">
                  Led the frontend development team in building modern,
                  responsive web applications. Implemented best practices for
                  performance optimization and accessibility.
                </p>
              </div>
            </div>

            <div className="relative pl-6 md:pl-0 md:ml-[8.65rem] before:absolute before:left-0 md:before:left-[7.65rem] before:top-5 before:h-3 before:w-3 before:rounded-full before:border-4 before:border-primary before:bg-background">
              <div className="absolute left-0 top-1 hidden text-right text-sm text-white/70 md:block md:left-[-8rem] md:w-[7rem]">
                2020 — 2022
              </div>
              <div className="glass-card p-5 hover:bg-white/[0.075] transition-colors">
                <h3 className="text-lg font-semibold text-white">
                  UI/UX Designer & Developer
                </h3>
                <p className="text-sm text-white/70 mb-1">Design Studio</p>
                <span className="inline-block md:hidden text-xs text-white/50 mb-2">
                  2020 — 2022
                </span>
                <p className="text-sm text-white/70">
                  Designed and developed user interfaces for various clients.
                  Created design systems and implemented them using modern
                  frontend technologies.
                </p>
              </div>
            </div>

            <div className="relative pl-6 md:pl-0 md:ml-[8.65rem] before:absolute before:left-0 md:before:left-[7.65rem] before:top-5 before:h-3 before:w-3 before:rounded-full before:border-4 before:border-primary before:bg-background">
              <div className="absolute left-0 top-1 hidden text-right text-sm text-white/70 md:block md:left-[-8rem] md:w-[7rem]">
                2018 — 2020
              </div>
              <div className="glass-card p-5 hover:bg-white/[0.075] transition-colors">
                <h3 className="text-lg font-semibold text-white">
                  Junior Web Developer
                </h3>
                <p className="text-sm text-white/70 mb-1">Web Solutions Ltd.</p>
                <span className="inline-block md:hidden text-xs text-white/50 mb-2">
                  2018 — 2020
                </span>
                <p className="text-sm text-white/70">
                  Built responsive websites using HTML, CSS, and JavaScript.
                  Collaborated with designers to implement pixel-perfect
                  designs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-primary/20">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white">Education</h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.65rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            <div className="relative pl-6 md:pl-0 md:ml-[8.65rem] before:absolute before:left-0 md:before:left-[7.65rem] before:top-5 before:h-3 before:w-3 before:rounded-full before:border-4 before:border-primary before:bg-background">
              <div className="absolute left-0 top-1 hidden text-right text-sm text-white/70 md:block md:left-[-8rem] md:w-[7rem]">
                2018 — 2022
              </div>
              <div className="glass-card p-5 hover:bg-white/[0.075] transition-colors">
                <h3 className="text-lg font-semibold text-white">
                  Bachelor of Computer Science
                </h3>
                <p className="text-sm text-white/70 mb-1">
                  University of Technology
                </p>
                <span className="inline-block md:hidden text-xs text-white/50 mb-2">
                  2018 — 2022
                </span>
                <p className="text-sm text-white/70">
                  Specialized in web development and user interface design.
                  Graduated with honors.
                </p>
              </div>
            </div>

            <div className="relative pl-6 md:pl-0 md:ml-[8.65rem] before:absolute before:left-0 md:before:left-[7.65rem] before:top-5 before:h-3 before:w-3 before:rounded-full before:border-4 before:border-primary before:bg-background">
              <div className="absolute left-0 top-1 hidden text-right text-sm text-white/70 md:block md:left-[-8rem] md:w-[7rem]">
                2016 — 2018
              </div>
              <div className="glass-card p-5 hover:bg-white/[0.075] transition-colors">
                <h3 className="text-lg font-semibold text-white">
                  Associate Degree in Web Development
                </h3>
                <p className="text-sm text-white/70 mb-1">Community College</p>
                <span className="inline-block md:hidden text-xs text-white/50 mb-2">
                  2016 — 2018
                </span>
                <p className="text-sm text-white/70">
                  Focused on frontend technologies and design principles.
                  Completed several real-world projects.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="md:col-span-2 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-primary/20">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-5 hover:bg-white/[0.075] transition-colors">
              <h3 className="text-lg font-semibold text-white">
                Advanced React Development
              </h3>
              <p className="text-sm text-white/70 mb-1">Meta</p>
              <span className="text-xs text-white/50">2022</span>
            </div>

            <div className="glass-card p-5 hover:bg-white/[0.075] transition-colors">
              <h3 className="text-lg font-semibold text-white">
                UI/UX Design Specialization
              </h3>
              <p className="text-sm text-white/70 mb-1">Google</p>
              <span className="text-xs text-white/50">2021</span>
            </div>

            <div className="glass-card p-5 hover:bg-white/[0.075] transition-colors">
              <h3 className="text-lg font-semibold text-white">
                Web Accessibility
              </h3>
              <p className="text-sm text-white/70 mb-1">W3C</p>
              <span className="text-xs text-white/50">2020</span>
            </div>

            <div className="glass-card p-5 hover:bg-white/[0.075] transition-colors">
              <h3 className="text-lg font-semibold text-white">
                JavaScript Algorithms & Data Structures
              </h3>
              <p className="text-sm text-white/70 mb-1">freeCodeCamp</p>
              <span className="text-xs text-white/50">2019</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
