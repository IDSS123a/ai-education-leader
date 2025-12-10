import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Davor's strategic vision and expertise in digital transformation delivered exceptional results. His leadership contributed to significant operating income growth and operational excellence across our organization.",
    author: "Board Member",
    organization: "Global Manufacturing Group",
    source: "LinkedIn Recommendation",
  },
  {
    text: "A visionary executive who combines deep business acumen with cutting-edge AI knowledge. His ability to drive growth while building strong teams is remarkable.",
    author: "Managing Partner",
    organization: "Investment Firm",
    source: "Professional Reference",
  },
  {
    text: "Under Davor's leadership, we achieved 673% net profit growth. His strategic planning and operational expertise transformed our business performance.",
    author: "CEO",
    organization: "International Trade Company",
    source: "LinkedIn Recommendation",
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground"
            >
              What People Say
            </motion.h2>
          </div>

          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="relative bg-background p-8 lg:p-12 rounded-2xl shadow-lg"
          >
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/10" />
            
            <div className="relative">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-xl lg:text-2xl text-foreground leading-relaxed mb-8 italic"
              >
                "{testimonials[currentIndex].text}"
              </motion.p>

              <motion.div
                key={`author-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-muted-foreground">
                    {testimonials[currentIndex].organization}
                  </p>
                  <p className="text-sm text-primary mt-1">
                    {testimonials[currentIndex].source}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
