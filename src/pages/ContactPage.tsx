import React, { useState } from "react";
import { Send, Mail, MapPin, Phone, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const chat_id = "5590642934";
    const telegram_bot_id = "6711637176:AAGEnBLz6vvP-OxcPFDr8icjzIekCxDF3oc";
    const message = `Ismi : ${formState?.name};\n Email: ${formState?.email};\n So'zi: ${formState?.subject};\n Xabar: ${formState?.message}`;
    if (
      !formState?.email ||
      !formState?.email ||
      !formState?.subject ||
      !formState?.message
    ) {
      toast("To'liq to'ldiring iltimos ☺️");
    } else {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
        },
        body: JSON.stringify({
          chat_id: chat_id,
          text: message,
        }),
      };
      try {
        const response = await fetch(
          `https://api.telegram.org/bot${telegram_bot_id}/sendMessage`,
          settings
        );

        if (response.ok) {
          toast("Habaringizdan mamnunmiz ☺️");
        } else {
          console.error("Failed to send message");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    }
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after some time
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-12">
      <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-down">
        Get In Touch
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-up">
        Contact Me
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div
          className="lg:col-span-2 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="glass-card p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h2>
                <p className="text-white/70">
                  Thanks for reaching out. I'll get back to you as soon as
                  possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white/70 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder:text-white/40 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white/70 mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder:text-white/40 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-white/70 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder:text-white/40 transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white/70 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder:text-white/40 transition-colors resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all flex items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass-card p-8 mb-6">
            <h2 className="text-xl font-bold text-white mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/20 mt-0.5">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <a
                    href="mailto:hello@example.com"
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    umidjongafforov175gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/20 mt-0.5">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Location</h3>
                  <p className="text-white/70">Bukhara, Uzbekistan</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/20 mt-0.5">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone</h3>
                  <a
                    href="tel:+998900000000"
                    className="text-white/70 hover:text-primary transition-colors"
                  >
                    +998 93 655 89 59
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-white mb-6">Let's Connect</h2>
            <p className="text-white/70 mb-6">
              I'm currently available for freelance work. Let's talk about your
              project and how I can help bring your ideas to life.
            </p>
            <a
              href="mailto:umidjongafforov175@gmail.com"
              className="inline-block w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium text-center transition-all"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
