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
    <div className="pb-24">
      <motion.div variants={textVariant(0.3)} className="mt-4">
        <p className="text-xs sm:text-sm font-inter tracking-[0.25em] uppercase text-white/40">
          About
        </p>
        <h2 className="text-white font-display font-bold md:text-5xl sm:text-4xl text-3xl mt-2">
          What I do.
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.5, 1)}
        className="mt-6 text-white/50 text-base md:text-lg max-w-2xl leading-relaxed font-inter"
      >
        I build backend systems, ML pipelines, and infrastructure at scale.
        Currently at Snowflake working on LLM inference - previously at Airbnb,
        Qualcomm, and Edupoint. I like solving hard problems where systems
        engineering meets machine learning.
        <br /><br />
        Outside of work, I do ML research, build side projects, compete at
        hackathons, and tinker with things that probably shouldn't work
        but somehow do.
      </motion.p>

      {/* Stats row */}
      <motion.div
        variants={fadeIn("up", "", 0.8, 0.8)}
        className="mt-12 flex gap-12 md:gap-16"
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
  );
};

export default SectionWrapper(About, "about");
