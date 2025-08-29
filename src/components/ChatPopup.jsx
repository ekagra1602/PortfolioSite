import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { close } from '../assets';

// Comprehensive knowledge base based on resume
const knowledgeBase = [
  {
    content: "Ekagra (Gray) Gupta is a Computer Science student at Arizona State University with a perfect 4.0 GPA, expected to graduate in December 2026. He has a minor in Data Science and has taken courses in Data Structures & Algorithms, Operating Systems, Software Engineering, Distributed Systems, and Machine Learning. He's based in San Francisco, CA.",
    keywords: ["ekagra", "gray", "gupta", "who", "about", "name", "background", "cs", "computer science", "asu", "arizona state university", "student", "education", "degree", "university", "gpa", "4.0", "data science", "minor", "san francisco"]
  },
  {
    content: "Currently working as a Software Engineer Intern at Airbnb in San Francisco (May 2025 - Present). Working on open-source project Astra, optimizing data pipeline efficiency by removing Apache Kafka for data retention and directly ingesting the Write-Ahead Log into AWS S3, resulting in ~$1.1 million in infrastructure savings over the next 5 years. Built and deployed a Kubernetes cluster for Astra to test and manage ingestion of logs and traces from multiple ML models.",
    keywords: ["airbnb", "san francisco", "current", "internship", "infrastructure", "astra", "open source", "kafka", "s3", "kubernetes", "ml models", "petabytes", "millions of users", "cost savings", "1.1 million", "write-ahead log", "wal"]
  },
  {
    content: "Worked as a Software Engineer Intern at Edupoint Educational Systems in Phoenix, AZ (January 2025 – April 2025). Built a Python-based, multi-Large Language Model (LLM) powered assistant for a Learning Management System with vector-based retrieval of academic records and user queries, reducing support resolution time by 42% for 5M+ students.",
    keywords: ["edupoint", "phoenix", "software engineer intern", "python", "llm", "large language model", "learning management system", "vector retrieval", "academic records", "5 million students", "support resolution"]
  },
  {
    content: "Was a Machine Learning Research Assistant at Carnegie Mellon University in Pittsburgh, PA (June 2024 – August 2024). Optimized and fine-tuned open-source large language models using Ollama, Hugging Face Transformers, and PyTorch, achieving a 37% improvement in structured data extraction from enterprise documents and technical reports.",
    keywords: ["carnegie mellon university", "cmu", "pittsburgh", "machine learning", "research assistant", "ollama", "hugging face", "transformers", "pytorch", "llm", "data extraction", "enterprise documents", "fine-tuned"]
  },
  {
    content: "Worked as a Software Engineer Co-op at Arizona State University in Tempe, AZ (March 2023 – June 2024). Developed automation scripts in Python optimizing CI/CD pipelines and reducing deployment time, resulting in a 15% increase in system efficiency and reduced manual intervention.",
    keywords: ["arizona state university", "asu", "tempe", "software engineer co-op", "python", "ci/cd", "automation", "deployment", "system efficiency", "pipelines", "scripts"]
  },
  {
    content: "Was a Software Developer Intern at Carrier (Remote, May 2022 – August 2022). Designed and implemented Go, C++ and SQL based in-memory Database Engine to accurately track sales, returns, and inventory, enhancing stock management practices and reducing record discrepancies by 18%.",
    keywords: ["carrier", "remote", "software developer intern", "go", "cpp", "c++", "sql", "database engine", "in-memory", "sales", "inventory", "stock management", "returns"]
  },
  {
    content: "Programming Languages: Python, C++, C, Java, Go, C#, JavaScript, TypeScript. Frameworks & Libraries: PyTorch, NumPy, TensorFlow, LangChain, Node.js, React, Angular, .Net. Tools & Platforms: Docker, Kafka, Kubernetes, MongoDB, SQL, Linux, Git, AWS, GCP.",
    keywords: ["skills", "programming languages", "python", "cpp", "c++", "java", "go", "csharp", "javascript", "typescript", "pytorch", "numpy", "tensorflow", "langchain", "nodejs", "react", "angular", "dotnet", "docker", "kubernetes", "mongodb", "aws", "gcp", "linux", "git"]
  },
  {
    content: "Live-it won the UC Berkeley AI Hackathon. Built with Python, VGGT, Gemini API, Gaussian Splatting, React, Node.js. Integrated Google Veo 3 API to generate cinematic videos from prompts, then trained it on VGGT neural network and Gaussian Splatting for AI-based camera inference and 3D scene construction, enabling real-time prompt-to-3D walkthroughs.",
    keywords: ["live-it", "uc berkeley ai hackathon", "winner", "python", "vggt", "gemini api", "gaussian splatting", "react", "nodejs", "google veo 3", "3d", "video generation", "cinematic", "neural network", "real-time"]
  },
  {
    content: "Memory Transfer MCP is built with Python, FastAPI, LangChain. Implemented a FastAPI-based Model Context Protocol (MCP) memory layer that unifies memory ingestion and retrieval across OpenAI and Anthropic Claude models enabling seamless multi-model integration for LLM-powered agents.",
    keywords: ["memory transfer mcp", "python", "fastapi", "langchain", "model context protocol", "mcp", "openai", "anthropic", "claude", "llm agents", "multi-model", "memory ingestion"]
  },
  {
    content: "FocusTime AI is built with MediaPipe ML, TensorFlow, Flask, React, Python. An AI-powered web app built with React, Flask, and PostgreSQL. Integrated MediaPipe Holistic to extract 543 key points and used TensorFlow for real-time gesture analysis, detecting and addressing procrastination during study sessions.",
    keywords: ["focustime ai", "mediapipe", "tensorflow", "flask", "react", "python", "postgresql", "543 key points", "gesture analysis", "procrastination", "study sessions", "ai-powered", "web app"]
  },
  {
    content: "Operating System Kernel project built with C++, C, Linux, Ubuntu, Python, ASM (x86_64). Built an OS kernel with virtual memory management, ELF execution, and multicore support on x86_64, implementing paging, Round-Robin scheduler, and syscalls for user-space programs.",
    keywords: ["operating system", "kernel", "cpp", "c", "linux", "ubuntu", "python", "assembly", "asm", "x86_64", "virtual memory", "elf", "multicore", "paging", "scheduler", "syscalls", "user-space"]
  },
  {
    content: "Certifications and leadership include: Machine Learning Specialization from Stanford Online, Section Leader (Teaching Assistant) at Code in Place Stanford, Technical Lead at Google Developer Student Club ASU, USACO Gold from United States Computing Olympiad, and Claude Club Lead at Anthropic ASU.",
    keywords: ["certificates", "achievements", "leadership", "stanford", "machine learning specialization", "code in place", "teaching assistant", "google developer student club", "technical lead", "usaco gold", "computing olympiad", "anthropic", "claude club lead", "competitive programming"]
  },
  {
    content: "Outside of technology, Ekagra enjoys soccer, playing guitar, hiking, rock climbing, and scuba diving. He's passionate about both outdoor adventures and creative pursuits, balancing his technical career with diverse hobbies. Contact: ekagragupta1609@gmail.com, LinkedIn, GitHub, Leetcode profiles available.",
    keywords: ["interests", "hobbies", "soccer", "guitar", "hiking", "rock climbing", "scuba diving", "personal", "outside", "fun", "activities", "sports", "music", "contact", "email", "linkedin", "github", "leetcode", "outdoor", "adventures"]
  }
];

const generateResponse = async (query) => {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(' ').filter(word => word.length > 2);
  
  // Enhanced context matching with scoring
  const relevantContext = knowledgeBase.map(item => {
    let score = 0;
    
    // Exact phrase matching
    if (item.content.toLowerCase().includes(queryLower)) score += 15;
    
    // Keyword matching with weighted scoring
    item.keywords.forEach(keyword => {
      if (queryLower.includes(keyword)) score += 10;
      queryWords.forEach(word => {
        if (keyword.includes(word) || word.includes(keyword)) score += 5;
      });
    });
    
    return { ...item, score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);

  // Try AI API for enhanced responses
  try {
    const contextText = relevantContext.length > 0 
      ? relevantContext.slice(0, 2).map(c => c.content).join('\n\n')
      : 'General information about Ekagra Gupta, a Computer Science student at ASU with experience at various tech companies.';
    
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    
    if (API_KEY && API_KEY.startsWith('gsk_')) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: [
              {
                role: 'system', 
                content: `You are Ekagra Gupta's helpful AI assistant. Answer questions about him based on this context: ${contextText}. Be conversational, friendly, and concise (1-2 sentences max).`
              },
              {
                role: 'user', 
                content: query
              }
            ],
            model: 'llama3-8b-8192', // Fast and free Llama 3 model
            max_tokens: 100,
            temperature: 0.7,
            stream: false
          })
        });
        
        console.log('📡 Groq Status:', response.status);
        
        if (response.ok) {
          const result = await response.json();
          console.log('📋 Groq Result:', result);
          
          if (result.choices?.[0]?.message?.content) {
            const aiResponse = result.choices[0].message.content.trim();
            console.log('✅ Using Groq AI response:', aiResponse);
            return aiResponse;
          }
        } else {
          const errorData = await response.json();
          console.log('❌ Groq API Error:', errorData);
        }
      } catch (error) {
        console.log('❌ Groq API Error:', error.message);
      }
    } else {
      console.log('⚠️ Groq API key not configured');
    }
  } catch (setupError) {
    console.log('❌ Error in API setup:', setupError);
  }

  console.log('🔄 Using smart fallback responses');
  
  // Smart pattern matching for different question types
  const getSmartResponse = () => {
    // Greeting responses
    if (/^(hi|hey|hello|sup|yo)!?$/i.test(queryLower.trim())) {
      return "Hey there! I'm Ekagra's AI assistant. I can tell you about his work at Airbnb, his award-winning projects, technical skills, or personal interests. What would you like to know?";
    }
    
    // Question word analysis
    const isWhatQuestion = /what|which/.test(queryLower);
    const isHowQuestion = /how/.test(queryLower);
    const isWhyQuestion = /why/.test(queryLower);
    const isWhereQuestion = /where/.test(queryLower);
    const isWhenQuestion = /when/.test(queryLower);
    
    if (relevantContext.length > 0) {
      const topContext = relevantContext[0];
      
      // Experience questions
      if (queryLower.includes('experience') || queryLower.includes('work') || queryLower.includes('job')) {
        if (isWhatQuestion) return `${topContext.content} His experience spans from infrastructure at scale (Airbnb) to cutting-edge ML research (Carnegie Mellon).`;
        if (isWhereQuestion) return `${topContext.content} He's worked at some amazing places!`;
        return `${topContext.content} He's built a really diverse background across industry and research.`;
      }
      
      // Project questions
      if (queryLower.includes('project') || queryLower.includes('built') || queryLower.includes('app')) {
        if (isHowQuestion) return `${topContext.content} Each project demonstrates his ability to tackle complex problems with innovative solutions.`;
        if (isWhatQuestion) return `${topContext.content} These showcase his range from AI/ML to full-stack development.`;
        return `${topContext.content} Pretty impressive stuff!`;
      }
      
      // Skills questions
      if (queryLower.includes('skill') || queryLower.includes('technology') || queryLower.includes('language')) {
        if (isWhatQuestion) return `${topContext.content} He's particularly strong in systems programming and ML engineering.`;
        return `${topContext.content} His tech stack is pretty comprehensive!`;
      }
      
      // Interests/hobbies questions
      if (queryLower.includes('interest') || queryLower.includes('hobby') || queryLower.includes('fun') || 
          queryLower.includes('outside') || queryLower.includes('personal') || queryLower.includes('sport')) {
        return `${topContext.content} He's got a great balance between his tech career and staying active outdoors!`;
      }
      
      // Achievement questions
      if (queryLower.includes('achievement') || queryLower.includes('award') || queryLower.includes('win')) {
        if (isHowQuestion) return `${topContext.content} These achievements show his ability to perform under pressure and solve complex challenges.`;
        return `${topContext.content} Some serious competitive programming and hackathon skills!`;
      }
      
      // Company-specific questions
      if (queryLower.includes('airbnb')) {
        return `${topContext.content} Working on observability at Airbnb's scale is no joke - pretty amazing experience for an intern!`;
      }
      
      return topContext.content;
    }
    
    // Handle questions with no direct context match
    if (queryLower.includes('tell me about')) {
      return "I'd love to! Ekagra is a CS student at ASU with internships at Airbnb and research at Carnegie Mellon. He's won hackathons, built AI projects, and enjoys soccer, guitar, and rock climbing. What specific area interests you?";
    }
    
    if (queryLower.includes('contact') || queryLower.includes('reach')) {
      return "You can reach out to Ekagra through the contact section below! He's always excited to discuss tech, opportunities, or even outdoor adventures. What would you like to know about him first?";
    }
    
    if (queryLower.includes('recommend') || queryLower.includes('advice')) {
      return "Ekagra would probably say: focus on building things that matter, get your hands dirty with real systems, and don't forget to have fun along the way! Want to know more about his specific experiences?";
    }
    
    // Default with personality
    return "That's a great question! I can tell you about Ekagra's work at companies like Airbnb, his award-winning projects like Live-it, his technical skills, or even his hobbies like soccer and rock climbing. What sounds interesting to you?";
  };
  
  return getSmartResponse();
};

const ChatPopup = ({ isOpen, onClose, initialMessage = '' }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState({ width: 450, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef(null);
  const popupRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Blur any active input on the main page
      const mainPageInput = document.querySelector('input[placeholder*="Ask anything about me"]');
      if (mainPageInput) {
        mainPageInput.blur();
        mainPageInput.value = '';
      }
      
      // Focus the popup input after a short delay to ensure it's rendered
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
      
      if (initialMessage) {
        setMessages([]);
        setInputMessage(initialMessage);
        // Auto-send the initial message after a short delay
        setTimeout(() => {
          handleSendMessage(initialMessage);
        }, 500);
      } else {
        setMessages([]);
      }
    } else {
      // Reset initial message when closing
      setInputMessage('');
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
                    ref={inputRef}
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
