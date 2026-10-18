/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ACCENT = "#5CF2A6";
// How much page scroll each role holds the screen for while the section is pinned.
const SCROLL_PER_ROLE_VH = 60;

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
            exit={reduce ? { opacity: 0, transition: { duration: 0.12 } } : { y: "-110%", rotate: -6, transition: { duration: 0.16 } }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1], delay: (w * 4 + i) * 0.02 }}
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
    <div className='flex flex-col gap-8'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={active}
          className='flex flex-col gap-6'
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, rotate: 8, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <Logo experience={experience} size={72} />
          </motion.div>

          <motion.span
            className='exp-mono text-[14px]'
            style={{ color: ACCENT }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12, transition: { duration: 0.12 } }}
            transition={{ duration: 0.3 }}
          >
            {num} — {experience.date}
          </motion.span>

          <RevealName text={experience.company_name} reduce={reduce} />

          <motion.p
            className='text-white/80 text-xl lg:text-2xl'
            initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.12 } }}
            transition={{ duration: 0.4, delay: 0.15 }}
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

const CardBody = ({ experience, index, showDate }) => (
  <div className='rounded-2xl border border-white/20 bg-[#0b0b0b] p-6 md:p-8 flex flex-col gap-4'>
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

    {showDate && <span className='exp-mono text-[12px] text-white/40'>{experience.date}</span>}
  </div>
);

// Desktop: the section pins in place and each role holds the screen for a fixed stretch of scroll.
const PinnedTimeline = () => {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(experiences.length - 1, Math.max(0, Math.floor(p * experiences.length)));
    setActive((cur) => (cur === next ? cur : next));
  });

  const next = experiences[active + 1];

  return (
    <div
      ref={trackRef}
      className='relative hidden md:block'
      style={{ height: `calc(${experiences.length * SCROLL_PER_ROLE_VH}vh + 100vh)` }}
    >
      <div className='sticky top-0 h-screen flex items-center'>
        <div className='w-full grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-16'>
          <StickyPanel active={active} reduce={reduce} />

          <div className='flex flex-col justify-center gap-6 border-l border-white/[0.08] pl-10'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={active}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0, transition: { duration: 0.12 } } : { opacity: 0, y: -40, scale: 0.98, transition: { duration: 0.16 } }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <CardBody experience={experiences[active]} index={active} />
              </motion.div>
            </AnimatePresence>

            <span className='exp-mono text-[12px] text-white/40 h-4'>
              {next ? `next ↓ ${next.company_name}` : "end of timeline"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Phones: a plain stacked list, no pinning.
const StackedList = () => (
  <div className='flex flex-col gap-5 md:hidden'>
    {experiences.map((experience, index) => (
      <motion.article
        key={`experience-${index}`}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <CardBody experience={experience} index={index} showDate />
      </motion.article>
    ))}
  </div>
);

const Experience = () => (
  <div className='exp-sticky'>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>What I have done so far</p>
      <h2 className={styles.sectionHeadText}>Work Experience.</h2>
    </motion.div>

    <div className='mt-14 md:mt-0'>
      <PinnedTimeline />
      <StackedList />
    </div>
  </div>
);

export default SectionWrapper(Experience, "work");
