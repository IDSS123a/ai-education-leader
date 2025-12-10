import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Calendar, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "mulalic71@gmail.com",
    action: "mailto:mulalic71@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn Profile",
    value: "Connect on LinkedIn",
    action: "https://www.linkedin.com/in/davormulalic",
  },
];

const interestOptions = [
  "Business Consulting",
  "AI Strategy & Digital Transformation",
  "Speaking Engagement",
  "Executive Advisory",
  "Educational Leadership",
  "Collaboration",
  "Other",
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({
      name: "",
      email: "",
      organization: "",
      interest: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              Contact
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Let's Work Together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Interested in business consulting, AI strategy, speaking engagements, or executive advisory?
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 space-y-6"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                Get in Touch
              </h3>
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <a
                    key={index}
                    href={method.action}
                    target={method.action.startsWith("http") ? "_blank" : undefined}
                    rel={method.action.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/20 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{method.label}</p>
                      <p className="text-sm text-muted-foreground">{method.value}</p>
                    </div>
                  </a>
                );
              })}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="bg-card p-6 lg:p-8 rounded-2xl border border-border">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Send a Message
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="School or company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Area of Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    >
                      <option value="">Select an option</option>
                      {interestOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
