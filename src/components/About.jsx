/* eslint-disable react/no-unknown-property */

import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const highlights = [
  { label: "Internships", value: "6" },
  { label: "Hackathon Wins", value: "8" },
  { label: "Cups of Coffee", value: "∞", sub: "(send help)" },
];

const About = () => {
  return (
    <div className="pb-24 mt-4 grid md:grid-cols-[200px_minmax(0,680px)] gap-x-10 gap-y-4">
      <motion.p
        variants={textVariant(0.3)}
        className="font-mono text-[13px] tracking-[0.1em] uppercase text-white/50 md:pt-3"
      >
        About
      </motion.p>

      <div>
      <motion.h2
        variants={textVariant(0.3)}
        className="font-serif text-white font-normal text-[30px] md:text-[36px] leading-tight"
      >
        A bit about me.
      </motion.h2>

      <motion.div
        variants={fadeIn("", "", 0.5, 1)}
        className="mt-8 flex flex-col gap-6 font-serif font-light text-[20px] md:text-[24px] leading-[1.6] text-white/75"
      >
        <p className="font-serif">
          I&apos;m a software engineer at Airbnb on the observability team, working
          on tracing and metrics infrastructure that helps engineers see how
          their systems behave in production. Before this I spent a spring on
          Snowflake&apos;s inference team, after a handful of internships along the way.
        </p>
        <p className="font-serif">
          I like problems where systems engineering meets machine learning.
          Outside of work I do a bit of research, build side projects, show up
          to more hackathons than I probably should, and tinker with things that
          shouldn&apos;t work but somehow do.
        </p>
        <p className="font-serif">
          If any of that overlaps with what you&apos;re working on, I&apos;d love to{" "}
          <a
            href="#contact"
            className="font-serif text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors"
          >
            hear from you
          </a>
          .
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={fadeIn("up", "", 0.8, 0.8)}
        className="mt-12 pt-8 border-t border-white/[0.08] flex gap-12 md:gap-16"
      >
        {highlights.map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="text-3xl md:text-4xl font-display font-bold text-white">
              {item.value}
            </span>
            <span className="text-xs md:text-sm text-white/30 font-inter tracking-wide mt-1 uppercase">
              {item.label}
            </span>
            {item.sub && (
              <span className="text-xs text-white/20 font-inter mt-0.5 italic">
                {item.sub}
              </span>
            )}
          </div>
        ))}
      </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
