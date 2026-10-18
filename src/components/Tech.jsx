import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { skillGroups } from "../constants";

const ACCENT = "#5CF2A6";
const CYCLE_MS = 2600;

// Interleave the groups so words of different sizes mix into one flowing paragraph.
const interleave = (groups) => {
  const words = [];
  const longest = Math.max(...groups.map((g) => g.items.length));
  const order = [groups[1], groups[0], groups[2]].filter(Boolean);
  for (let i = 0; i < longest; i++) {
    order.forEach((group) => {
      if (group.items[i]) words.push({ name: group.items[i], group });
    });
  }
  return words;
};

const Tech = () => {
  const [active, setActive] = useState(skillGroups[0].id);
  const timer = useRef(null);
  const reduce = useReducedMotion();
  const words = useMemo(() => interleave(skillGroups), []);

  // Cycle through the groups until the visitor picks one.
  useEffect(() => {
    if (reduce) return undefined;
    timer.current = setInterval(() => {
      setActive((cur) => {
        const i = skillGroups.findIndex((g) => g.id === cur);
        return skillGroups[(i + 1) % skillGroups.length].id;
      });
    }, CYCLE_MS);
    return () => clearInterval(timer.current);
  }, [reduce]);

  const pick = (id) => {
    clearInterval(timer.current);
    setActive(id);
  };

  return (
    <section className='skills-wall max-w-7xl mx-auto px-6 sm:px-16 py-16 md:py-24'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-10'>
        <h2 className='text-white text-4xl md:text-5xl font-bold tracking-[-0.03em]'>Skills</h2>
        <div className='flex flex-wrap gap-1 -ml-3 md:ml-0' role='group' aria-label='Highlight a skill group'>
          {skillGroups.map((group) => {
            const on = group.id === active;
            return (
              <button
                key={group.id}
                type='button'
                aria-pressed={on}
                onMouseEnter={() => pick(group.id)}
                onFocus={() => pick(group.id)}
                onClick={() => pick(group.id)}
                className={`exp-mono inline-flex items-center gap-2 min-h-[44px] px-3 text-[13px] transition-colors ${
                  on ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                <span
                  className='w-2 h-2 rounded-full transition-colors'
                  style={{ background: on ? ACCENT : "#333333" }}
                  aria-hidden='true'
                />
                {group.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className='m-0'>
        {words.map(({ name, group }) => {
          const on = group.id === active;
          return (
            <span
              key={name}
              className={`inline-block mr-[0.32em] mb-[0.05em] leading-[1.05] tracking-[-0.04em] transition-[color,font-weight] duration-500 ${group.size}`}
              style={{ color: on ? "#ffffff" : "#5e5e5e", fontWeight: on ? 800 : 300 }}
            >
              {name}
            </span>
          );
        })}
      </p>
    </section>
  );
};

export default Tech;
