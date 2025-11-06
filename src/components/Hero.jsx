import myimg from "../assets/myimg.jpeg";
import { motion } from "framer-motion";
import { useState } from "react";
import ChatPopup from "./ChatPopup";

const Hero = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const handleAskAI = (message) => {
    setInitialMessage(message);
    setChatOpen(true);
    
    // Blur the input field to remove cursor
    const input = document.querySelector('input[placeholder*="Ask anything"]');
    if (input) {
      input.blur();
    }
  };

  return (
    <section className="relative md:h-dvh min-h-[600px] flex flex-col md:flex-row items-center justify-between pt-[60px] z-10 mx-[10%]">
      <div className="content flex flex-col items-center md:items-start z-10 text-white md:w-[65%]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="title text-5xl md:text-7xl font-extrabold mb-[33px] font-roboto bg-text-gradient bg-clip-text"
        >
          {"Hi, I'm Ekagra Gupta"}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-2xl md:text-2xl font-roboto mb-[36px]"
        >
        Incoming AI/ML intern @ Snowflake · Curr @ Qualcomm <br />
        CS @ ASU · Backend Systems & ML · <br />
        Ex-Airbnb Intern · Ex-CMU ML Researcher 
        </motion.p>
        
        {/* Ask AI Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-md mb-6"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Ask anything about me to my AI assistant..."
              className="w-full px-5 pr-14 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:border-[#576cbc] transition-colors text-sm md:text-base"
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
              className="absolute right-2 group bg-gradient-to-r from-slate-700 via-gray-800 to-slate-900 text-white rounded-full w-10 h-10 flex items-center justify-center border border-white/20 shadow-lg shadow-black/30 overflow-hidden"
              style={{
                top: '50%',
                y: '-50%'
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Animated background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-gray-600/30 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-full scale-0 group-active:scale-100"
                transition={{ duration: 0.2 }}
              />
              
              <motion.svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none"
                className="relative z-10"
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <path 
                  d="M2 21L23 12L2 3V10L17 12L2 14V21Z" 
                  fill="currentColor"
                />
              </motion.svg>
            </motion.button>
          </div>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
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
          className="relative group overflow-hidden bg-gradient-to-r from-slate-800 via-gray-900 to-black text-white no-underline rounded-full font-semibold px-8 py-4 border border-white/20 backdrop-blur-sm shadow-2xl shadow-black/50 transition-all duration-300"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
          }}
          whileTap={{ scale: 0.98 }}
          aria-label="Scroll to contact section"
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-gray-600/20 opacity-0 group-hover:opacity-100"
            initial={false}
            animate={{ 
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), rgba(75, 85, 99, 0.2))",
                "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(75, 85, 99, 0.2), rgba(59, 130, 246, 0.2))",
                "linear-gradient(45deg, rgba(75, 85, 99, 0.2), rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Glass shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          
          <span className="relative z-10 flex items-center gap-2">
            Contact Me
            <motion.svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200"
            >
              <path 
                d="M7 17L17 7M17 7H7M17 7V17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </motion.svg>
          </span>
        </motion.a>   
      </div>      
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        src={myimg}
        alt="Ekagra's image"
        className="md:min-w-1/2 h-[150px] md:min-h-[350px] rounded-full z-10 mb-4 ml-2"
      />
      
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
