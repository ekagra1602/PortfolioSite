import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ChatPopup from "./ChatPopup";

const roles = [
  "AI/ML Intern @ Snowflake",
  "Prev SWE Intern @ Airbnb",
  "Stanford × ASU",
  "8x Hackathon Winner - YC, Treehacks, UC Berkeley, etc.",
];

const Hero = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAskAI = (message) => {
    setInitialMessage(message);
    setChatOpen(true);
    const input = document.querySelector('input[placeholder*="Ask anything"]');
    if (input) input.blur();
  };

  return (
    <section className="relative md:h-dvh min-h-[600px] flex items-center justify-center pt-[60px] z-10 overflow-hidden">

      {/* Ambient background orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-purple-600/[0.06] blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-white/[0.03] blur-[80px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="content relative flex flex-col items-center z-10 text-white max-w-3xl text-center px-6">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="h-px w-8 bg-white/30" />
          <span className="text-xs md:text-sm font-inter tracking-[0.25em] uppercase text-white/40">
            Software &amp; AI/ML Engineer
          </span>
          <span className="h-px w-8 bg-white/30" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-5 font-display tracking-tight"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {"Hi, I'm Ekagra"}
        </motion.h1>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent mb-6 origin-center"
        />

        {/* Cycling roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-8 md:h-10 flex items-center justify-center mb-12 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -16, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-base md:text-xl font-inter text-white/50 tracking-wide"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Ask AI Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="w-full max-w-md mb-6"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Ask anything about me to my AI assistant..."
              className="w-full px-5 pr-14 py-3 bg-white/[0.06] border border-white/[0.12] rounded-full text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors text-sm md:text-base backdrop-blur-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleAskAI(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <motion.button
              onClick={() => {
                const input = document.querySelector('input[placeholder*="Ask anything"]');
                if (input.value.trim()) {
                  handleAskAI(input.value);
                  input.value = '';
                }
              }}
              className="absolute right-2 group bg-white/[0.08] text-white rounded-full w-10 h-10 flex items-center justify-center border border-white/[0.12] hover:bg-white/[0.15] transition-colors"
              style={{ top: '50%', y: '-50%' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Contact button */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
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
          className="group relative px-8 py-3 rounded-full border border-white/[0.15] text-white/80 hover:text-white text-sm font-inter tracking-wide transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Get in touch
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.a>
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
