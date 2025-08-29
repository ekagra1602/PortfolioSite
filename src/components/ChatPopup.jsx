import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { close } from '../assets';

// Simplified knowledge base for quick responses
const knowledgeBase = [
  {
    content: "Ekagra Gupta is a Computer Science student at ASU with experience at Airbnb, Carnegie Mellon University, and multiple internships in software engineering and machine learning.",
    keywords: ["who", "about", "name", "background", "student"]
  },
  {
    content: "At Airbnb (May 2025 - Aug 2025), I worked on the Infrastructure Observability team, specifically on Astra - an open-source log search engine. I improved the Write-Ahead Log by moving from Kafka to S3 storage.",
    keywords: ["airbnb", "internship", "infrastructure", "observability", "astra", "kafka", "s3"]
  },
  {
    content: "My notable projects include: FocusTime AI (ML app for study focus using MediaPipe & TensorFlow), Live-it (UC Berkeley Hackathon winner using Google Veo 3 API), and ResQ (disaster management app).",
    keywords: ["projects", "focustime", "live-it", "resq", "hackathon", "mediapipe", "tensorflow"]
  },
  {
    content: "I have experience with: JavaScript, TypeScript, React, Node.js, Python, TensorFlow, Flask, MongoDB, Docker, AWS, and many other technologies in full-stack and ML development.",
    keywords: ["skills", "technologies", "javascript", "python", "react", "nodejs", "tensorflow", "aws"]
  },
  {
    content: "I won the UC Berkeley AI Hackathon 2025 with Live-it and finished top 10 in Airbnb's cross-company CTF competition among engineers from companies like Anthropic, DoorDash, and Adobe.",
    keywords: ["achievements", "hackathon", "berkeley", "winner", "ctf", "competition"]
  }
];

const generateResponse = async (query) => {
  const queryLower = query.toLowerCase();
  
  // Get relevant context
  const relevantContext = knowledgeBase.filter(item => 
    item.keywords.some(keyword => queryLower.includes(keyword))
  );
  
  // Try Hugging Face API (free) first
  try {
    const contextText = relevantContext.map(c => c.content).join('\n\n');
    const prompt = `You are Ekagra Gupta's AI assistant. Answer the question based on this information about him:

${contextText}

Question: ${query}

Answer (keep it conversational and under 100 words):`;

    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
          do_sample: true
        }
      })
    });
    
    const result = await response.json();
    if (result && result[0] && result[0].generated_text) {
      const generated = result[0].generated_text.replace(prompt, '').trim();
      if (generated.length > 10) {
        return generated;
      }
    }
  } catch (error) {
    console.log('Hugging Face API unavailable, using enhanced fallback');
  }
  
  // Enhanced fallback responses
  if (relevantContext.length > 0) {
    const contextContent = relevantContext[0].content;
    
    // Add some intelligence to the basic responses
    if (queryLower.includes('experience') || queryLower.includes('work') || queryLower.includes('job')) {
      return `${contextContent} He has a strong background in both infrastructure and machine learning, having worked at top-tier companies and research institutions.`;
    }
    
    if (queryLower.includes('project') || queryLower.includes('built') || queryLower.includes('app')) {
      return `${contextContent} These projects showcase his expertise in full-stack development, AI/ML, and solving real-world problems.`;
    }
    
    if (queryLower.includes('skill') || queryLower.includes('technology') || queryLower.includes('tech')) {
      return `${contextContent} He's particularly strong in backend systems, machine learning, and has experience with both cloud infrastructure and modern web technologies.`;
    }
    
    return contextContent;
  }
  
  // Smart greeting responses
  if (queryLower.includes('hello') || queryLower.includes('hi')) {
    return "Hi! I'm Ekagra's AI assistant. I can tell you about his impressive experience at companies like Airbnb, his award-winning projects, technical skills, and achievements. What interests you most?";
  }
  
  if (queryLower.includes('contact') || queryLower.includes('reach')) {
    return "You can reach Ekagra through the contact section below. He's always open to discussing opportunities in software engineering, machine learning, or infrastructure. What would you like to know about his background first?";
  }
  
  // More intelligent default response
  return "I'd be happy to tell you about Ekagra! You could ask about his internship at Airbnb where he worked on infrastructure observability, his award-winning AI projects like Live-it (UC Berkeley Hackathon winner), his technical expertise, or his research experience at Carnegie Mellon. What interests you?";
};

const ChatPopup = ({ isOpen, onClose, initialMessage = '' }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState({ width: 450, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const welcomeMessage = {
        id: 1,
        type: 'assistant',
        content: "Hi! I'm Ekagra's AI assistant. I can answer questions about his experience, projects, and skills. What would you like to know?",
        timestamp: new Date()
      };
      
      if (initialMessage) {
        setMessages([welcomeMessage]);
        setInputMessage(initialMessage);
        // Auto-send the initial message after a short delay
        setTimeout(() => {
          handleSendMessage(initialMessage);
        }, 500);
      } else {
        setMessages([welcomeMessage]);
      }
    }
  }, [isOpen, initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Resize functionality
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !popupRef.current) return;
      
      const rect = popupRef.current.getBoundingClientRect();
      const newWidth = Math.max(350, Math.min(800, e.clientX - rect.left + 20));
      const newHeight = Math.max(400, Math.min(800, rect.bottom - e.clientY + 20));
      
      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ne-resize';
    } else {
      document.body.style.cursor = 'default';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [isResizing]);

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Generate smart response
      const response = await generateResponse(messageText);
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: "I'm having trouble processing that right now. Feel free to ask about Ekagra's experience, projects, or skills!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Chat Popup */}
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3 
            }}
            className="fixed bottom-6 left-6 z-50 flex flex-col"
            style={{ 
              width: `${size.width}px`, 
              height: `${size.height}px` 
            }}
          >
            {/* Glass morphism container */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col relative">
              {/* Header */}
              <motion.div 
                className="flex items-center justify-between p-5 border-b border-white/10 bg-gradient-to-r from-black/20 to-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div>
                    <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                    <p className="text-white/60 text-xs">Ask about Ekagra</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-all duration-200 p-1 rounded-lg hover:bg-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </motion.div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <motion.div
                        className={`max-w-[85%] p-4 rounded-2xl text-sm backdrop-blur-sm ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-slate-600 via-gray-700 to-slate-800 text-white shadow-lg shadow-black/30 border border-white/10'
                            : 'bg-white/10 text-white border border-white/20'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <p className="leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-60 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-2xl border border-white/20">
                      <div className="flex space-x-2 items-center">
                        <motion.div 
                          className="w-2 h-2 bg-gradient-to-r from-[#915EFF] to-[#7c3aed] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-gradient-to-r from-[#915EFF] to-[#7c3aed] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-gradient-to-r from-[#915EFF] to-[#7c3aed] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                        <span className="text-xs text-white/60 ml-2">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <motion.div 
                className="p-5 border-t border-white/10 bg-gradient-to-r from-transparent to-black/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative">
                  <input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything about me..."
                    className="w-full p-4 pr-14 bg-white/5 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-[#915EFF]/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF]/20 transition-all duration-200 placeholder-white/50"
                    disabled={isLoading}
                  />
                  <motion.button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className="absolute right-2 group p-2.5 bg-gradient-to-r from-slate-700 via-gray-800 to-slate-900 text-white rounded-xl border border-white/20 shadow-xl shadow-black/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    style={{
                      top: '50%',
                      y: '-50%'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.6)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {/* Animated background glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100"
                      animate={{ 
                        background: [
                          "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), rgba(99, 102, 241, 0.2))",
                          "linear-gradient(45deg, rgba(147, 51, 234, 0.2), rgba(99, 102, 241, 0.2), rgba(59, 130, 246, 0.2))",
                          "linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-xl scale-0 group-active:scale-100"
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Icon with rotation */}
                    <motion.svg 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      className="relative z-10"
                      whileHover={{ rotate: 20 }}
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
              
              {/* Resize Handle */}
              <motion.div
                className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize opacity-60 hover:opacity-100 transition-opacity"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setIsResizing(true);
                }}
                whileHover={{ scale: 1.1 }}
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="text-white/60"
                >
                  <path 
                    d="M8 8H16V16M8 16L16 8" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatPopup;
