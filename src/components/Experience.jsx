/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ACCENT = "#5CF2A6";

const Logo = ({ experience, size }) => (
  <div
    className='shrink-0 flex items-center justify-center overflow-hidden rounded-xl'
    style={{ width: size, height: size, background: experience.iconBg }}
  >
    <img
      src={experience.icon}
      alt={`${experience.company_name} logo`}
      className={experience.iconFill ? "w-full h-full object-cover" : "w-full h-full object-contain p-[8%]"}
    />
  </div>
);

// Company name that rises in letter by letter whenever the active role changes.
const RevealName = ({ text, reduce }) => (
  <h3
    aria-label={text}
    className='text-white font-bold tracking-[-0.045em] leading-[0.95] text-5xl lg:text-7xl'
  >
    {text.split(" ").map((word, w) => (
      <span key={w} className='inline-block overflow-hidden pb-[0.12em] mr-[0.22em] align-bottom' aria-hidden='true'>
        {word.split("").map((ch, i) => (
          <motion.span
            key={i}
            className='inline-block'
            initial={reduce ? { opacity: 0 } : { y: "110%", rotate: 6 }}
            animate={reduce ? { opacity: 1 } : { y: "0%", rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "-110%", rotate: -6 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: (w * 4 + i) * 0.025 }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    ))}
  </h3>
);

const StickyPanel = ({ active, reduce }) => {
  const experience = experiences[active];
  const num = String(active + 1).padStart(2, "0");

  return (
    <div className='md:sticky md:top-32 flex flex-col gap-8'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={active}
          className='flex flex-col gap-6'
          exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.15 } }}
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, rotate: 8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Logo experience={experience} size={72} />
          </motion.div>

          <motion.span
            className='exp-mono text-[14px]'
            style={{ color: ACCENT }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.35 }}
          >
            {num} — {experience.date}
          </motion.span>

          <RevealName text={experience.company_name} reduce={reduce} />

          <motion.p
            className='text-white/80 text-xl lg:text-2xl'
            initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            {experience.title}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      <div className='flex gap-1.5' aria-hidden='true'>
        {experiences.map((_, i) => (
          <span
            key={i}
            className='h-1 flex-1 rounded-full transition-colors duration-500'
            style={{ background: i <= active ? ACCENT : "#262626" }}
          />
        ))}
      </div>
    </div>
  );
};

const ExperienceCard = ({ experience, index, isActive, cardRef }) => (
  <motion.article
    ref={cardRef}
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    className='md:min-h-[46vh] flex flex-col justify-center'
  >
    <div
      className={`rounded-2xl border p-6 md:p-8 flex flex-col gap-4 transition-all duration-500 ${
        isActive
          ? "bg-[#0b0b0b] border-white/20 md:scale-100"
          : "bg-transparent border-white/[0.06] md:opacity-[0.35] md:scale-[0.97]"
      }`}
    >
      <div className='flex items-center gap-3'>
        <Logo experience={experience} size={32} />
        <span className='exp-mono text-[13px] text-white/70 uppercase tracking-[0.08em]'>
          {experience.company_name}
        </span>
        <span className='exp-mono text-[12px] text-white/40 ml-auto hidden sm:inline'>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h4 className='text-white text-2xl md:text-[32px] font-medium tracking-[-0.02em] leading-tight'>
        {experience.title}
      </h4>

      <ul className='flex flex-col gap-2'>
        {experience.points.map((point, i) => (
          <li key={i} className='text-white/60 text-[16px] md:text-[18px] leading-relaxed'>
            {point}
          </li>
        ))}
      </ul>

      <span className='exp-mono text-[12px] text-white/40 md:hidden'>{experience.date}</span>
    </div>
  </motion.article>
);

const Experience = () => {
  const [active, setActive] = useState(0);
  const cardRefs = useRef([]);
  const reduce = useReducedMotion();

  // The active role is whichever card sits closest to the middle of the viewport.
  useEffect(() => {
    const handleScroll = () => {
      const middle = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - middle);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className='exp-sticky'>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className='mt-14 md:mt-20 grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-10 md:gap-16'>
        <div className='hidden md:block'>
          <StickyPanel active={active} reduce={reduce} />
        </div>

        <div className='flex flex-col gap-5 md:gap-0 md:border-l md:border-white/[0.08] md:pl-10 md:pb-[20vh]'>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
              index={index}
              isActive={index === active}
              cardRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
