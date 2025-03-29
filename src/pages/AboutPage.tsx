import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-down">
        About Me
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-up">
        My Journey & Experience
      </h1>

      <div
        className="prose prose-invert max-w-none animate-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="glass-card p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-white">Who I Am</h2>
          <p className="text-white/80 mb-6">
            I'm a passionate web developer and designer with a strong focus on
            creating elegant, functional, and user-centered digital experiences.
            With a background in both design and development, I bring a unique
            perspective to every project I work on.
          </p>
          <p className="text-white/80">
            My approach to design and development is minimalist yet powerful,
            following the principles that good design is as little design as
            possible. I believe in creating products that are intuitive to use
            and beautiful to look at.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div
            className="glass-card p-8 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Education</h3>
            <ul className="space-y-4">
              <li>
                <span className="text-primary">2018-2022</span>
                <h4 className="text-lg font-medium mt-1">
                  Bachelor of Computer Science
                </h4>
                <p className="text-white/60">University of Technology</p>
              </li>
              <li>
                <span className="text-primary">2016-2018</span>
                <h4 className="text-lg font-medium mt-1">
                  Associate Degree in Web Development
                </h4>
                <p className="text-white/60">Community College</p>
              </li>
            </ul>
          </div>

          <div
            className="glass-card p-8 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              Experience
            </h3>
            <ul className="space-y-4">
              <li>
                <span className="text-primary">2022-Present</span>
                <h4 className="text-lg font-medium mt-1">
                  Senior Frontend Developer
                </h4>
                <p className="text-white/60">TechCorp Inc.</p>
              </li>
              <li>
                <span className="text-primary">2020-2022</span>
                <h4 className="text-lg font-medium mt-1">
                  UI/UX Designer & Developer
                </h4>
                <p className="text-white/60">Design Studio</p>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="glass-card p-8 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <h3 className="text-xl font-semibold mb-4 text-white">
            My Philosophy
          </h3>
          <blockquote className="border-l-4 border-primary pl-4 italic text-white/70">
            "Design is not just what it looks like and feels like. Design is how
            it works."
            <footer className="text-white/50 mt-2 not-italic">
              — Steve Jobs
            </footer>
          </blockquote>
          <p className="mt-4 text-white/80">
            I strive to create work that is not only visually appealing but also
            functional and user-friendly. My goal is to deliver solutions that
            solve real problems and provide value to users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
