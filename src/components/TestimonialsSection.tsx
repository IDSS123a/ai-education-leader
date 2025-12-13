import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    text: "Davor has proven to be a major asset to my holding company. He has a proven ability to resourcefully manage and prioritize multiple projects simultaneously, with his high level of integrity, connectedness, persistence and going beyond the call of duty. Due to his commitment, a 1 billion $ worth project was extended to the next period of ten years.",
    author: "Daniel Kanu",
    organization: "DIK International Limited, Nigeria",
    source: "Managing Director",
  },
  {
    text: "Davor is an enthusiastic supporter of the team mission and takes great pride in problem solving. He is assertive and very conscientious. He also has a very positive attitude and welcomes challenges. I strongly recommend him as he would be a valuable asset to any organization.",
    author: "James A. Gomez",
    organization: "USAID Business Finance",
    source: "Chief Operating Officer",
  },
  {
    text: "Davor significantly contributed to the development of our regional office operations as well as the overall business development. He proved to be an extremely useful team member, a loyal and capable manager even when difficult decisions had to be made.",
    author: "Nusret Čaušević",
    organization: "LOK Microcredit Foundation, Sarajevo",
    source: "General Director",
  },
  {
    text: "Davor's strongest assets to an organization are his willingness to work hard at varying tasks even ones not part of his job description, ability to work with diverse ethnic groups, interest in computer graphic design and sense of humor.",
    author: "Laura Brodrick",
    organization: "Danish Refugee Council",
    source: "RADS Project Manager",
  },
  {
    text: "Davor proved himself as a person capable of handling the most complex tasks of management, negotiation and contracting of business activities. He is a trustworthy person with a pronounced team approach to work, able to start business on his own initiative.",
    author: "Stipe Hrkać",
    organization: "Hospitalija Trgovina, Croatia",
    source: "Director",
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
