import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import bookAiTeacher from "@/assets/book-ai-teacher.jpg";
import bookPromptEngineering from "@/assets/book-prompt-engineering.jpg";
import bookAiBusiness from "@/assets/book-ai-business.jpg";

const books = [
  {
    title: "The AI Teacher's Companion",
    subtitle: "Integrating Artificial Intelligence in Your Classroom",
    image: bookAiTeacher,
    description:
      "Practical guide for educators to effectively integrate AI tools into daily teaching practice",
    topics: ["AI tools for teachers", "Lesson planning with AI", "Ethical considerations", "Practical examples"],
    status: "Published",
  },
  {
    title: "Mastering Prompt Engineering",
    subtitle: "A Practical Manual for Advanced Non-Coders",
    image: bookPromptEngineering,
    description:
      "Comprehensive guide to prompt engineering for educators and professionals without coding background",
    topics: ["Advanced prompting techniques", "Educational applications", "Workflow automation", "Best practices"],
    status: "Published",
  },
  {
    title: "AI for Business and Personal Excellence",
    subtitle: "Strategies for Growth and Productivity",
    image: bookAiBusiness,
    description:
      "Applying AI strategies for business growth and personal productivity enhancement",
    topics: ["Business automation", "Personal productivity", "AI strategy", "Implementation frameworks"],
    status: "Coming Soon",
  },
];

export function BooksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="books" className="py-20 lg:py-32 bg-card">
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
              Published Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Books on AI in Education
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Sharing knowledge and practical insights to help educators embrace AI technology
            </motion.p>
          </div>

          {/* Books Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.15 }}
                className="group bg-background rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                {/* Book Cover */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        book.status === "Published"
                          ? "bg-accent text-accent-foreground"
                          : "bg-accent-amber text-accent-amber-foreground"
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-primary mb-3">{book.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {book.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {book.topics.slice(0, 3).map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {book.status === "Published" && (
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4" />
                      Learn More
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
