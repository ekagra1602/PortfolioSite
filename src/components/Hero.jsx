import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ChatPopup from "./ChatPopup";

const roles = [
  "AI Observability @ Airbnb",
  "AI/ML Researcher | NeurIPS, COLM",
  "AI/ML Intern @ Snowflake",
  "Stanford × ASU",
  "8x Hackathon Winner - YC, Treehacks, UC Berkeley, etc.",
];

const COMMAND = "whoami";
const NAME = "Hi, I'm Ekagra";
const ACCENT = "#5CF2A6";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Drives the terminal sequence: type the command, print the name, then loop through roles.
const useTerminalTyping = () => {
  const [cmd, setCmd] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [cursor, setCursor] = useState("cmd");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCmd(COMMAND);
      setName(NAME);
      setRole(roles[0]);
      setCursor("role");
      return;
    }

    let alive = true;
    const type = async (setter, text, speed) => {
      for (let i = 1; i <= text.length && alive; i++) {
        setter(text.slice(0, i));
        await sleep(speed + Math.random() * 25);
      }
    };
    const erase = async (setter, text, speed) => {
      for (let i = text.length - 1; i >= 0 && alive; i--) {
        setter(text.slice(0, i));
        await sleep(speed);
      }
    };

    (async () => {
      await sleep(300);
      await type(setCmd, COMMAND, 50);
      await sleep(250);
      if (!alive) return;
      setCursor("name");
      await type(setName, NAME, 38);
      await sleep(350);
      if (!alive) return;
      setCursor("role");
      for (let i = 0; alive; i++) {
        const current = roles[i % roles.length];
        await type(setRole, current, 20);
        await sleep(1600);
        await erase(setRole, current, 10);
        await sleep(150);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { cmd, name, role, cursor };
};

const Hero = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const { cmd, name, role, cursor } = useTerminalTyping();

  const handleAskAI = (message) => {
    setInitialMessage(message);
    setChatOpen(true);
    const input = document.getElementById('hero-ask');
    if (input) input.blur();
  };

  return (
    <section className="relative md:h-dvh min-h-[600px] flex items-center pt-[60px] z-10 overflow-hidden">

      <div className="hero-term relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-16 text-white">
        <div className="flex flex-col gap-5 md:gap-7 max-w-4xl">

          {/* Prompt line */}
          <div className="flex items-baseline gap-3 text-sm md:text-[17px]">
            <span style={{ color: ACCENT }}>ekagra@portfolio</span>
            <span className="text-white/40">~ %</span>
            <span className="text-white/90">
              {cmd}
              {cursor === "cmd" && <span className="caret" aria-hidden="true" />}
            </span>
          </div>

          {/* Name */}
          <h1
            className="text-[34px] sm:text-6xl md:text-[84px] leading-[1.05] font-extrabold tracking-[-0.03em] min-h-[1.05em]"
            aria-label={NAME}
          >
            {name}
            {cursor === "name" && <span className="caret" style={{ color: ACCENT }} aria-hidden="true" />}
          </h1>

          {/* Cycling roles */}
          <div className="flex gap-3 text-base md:text-xl min-h-[1.75em]" aria-live="off">
            <span style={{ color: ACCENT }}>&gt;</span>
            <span className="text-white/80">
              {role}
              {cursor === "role" && <span className="caret" style={{ color: ACCENT, width: "0.5em" }} aria-hidden="true" />}
            </span>
          </div>

          {/* Ask AI Section */}
          <div className="flex flex-col gap-4 mt-4 md:mt-5 w-full max-w-xl">
            <div className="flex items-center gap-3 rounded-[10px] border border-white/[0.14] bg-white/[0.03] pl-4 pr-1.5 py-1.5 focus-within:border-white/30 transition-colors backdrop-blur-sm">
              <span className="text-sm md:text-[15px] whitespace-nowrap" style={{ color: ACCENT }}>ask&nbsp;›</span>
              <input
                id="hero-ask"
                type="text"
                aria-label="Ask my AI assistant anything about me"
                placeholder="anything about me..."
                className="flex-1 min-w-0 bg-transparent py-2.5 text-sm md:text-[15px] text-white placeholder-white/40 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleAskAI(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <motion.button
                aria-label="Send question"
                onClick={() => {
                  const input = document.getElementById('hero-ask');
                  if (input.value.trim()) {
                    handleAskAI(input.value);
                    input.value = '';
                  }
                }}
                className="w-11 h-11 shrink-0 rounded-lg border border-white/[0.14] bg-white/[0.06] hover:bg-white/[0.12] text-white flex items-center justify-center transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </motion.button>
            </div>

            {/* Contact link */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("contact");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  window.location.hash = "#contact";
                }
              }}
              className="group self-start inline-flex items-center gap-2 min-h-[44px] text-sm md:text-[15px] text-white/80 hover:text-white transition-colors"
            >
              ./get-in-touch
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Chat Popup */}
      <ChatPopup
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        initialMessage={initialMessage}
      />
    </section>
  );
};

export default Hero;
