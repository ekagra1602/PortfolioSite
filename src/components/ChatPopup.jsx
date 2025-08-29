import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { close } from '../assets';

// Comprehensive knowledge base from resume
const knowledgeBase = [
  // Education
  {
    content: "Ekagra (Gray) Gupta is pursuing a Bachelor of Science in Computer Science with a Minor in Data Science at Arizona State University, expected to graduate in December 2026. He maintains a perfect 4.0/4.0 GPA and has taken courses in Data Structures & Algorithms, Operating Systems, Software Engineering, Distributed Systems, and Machine Learning.",
    keywords: ["ekagra", "gray", "gupta", "education", "cs", "computer science", "data science", "asu", "arizona state university", "gpa", "4.0", "graduation", "december 2026", "courses", "algorithms", "operating systems", "distributed systems", "who", "about", "name", "background", "student"]
  },
  
  // Work Experience - Airbnb (Current)
  {
    content: "Currently working as a Software Engineer Intern at Airbnb in San Francisco (May 2025 - Present). He works on the open-source project Astra, optimizing data pipeline efficiency by removing Apache Kafka for data retention and directly ingesting the Write-Ahead Log into AWS S3, resulting in ~$1.1 million in infrastructure savings over the next 5 years. He also built and deployed a Kubernetes cluster for Astra to test and manage ingestion of logs and traces from multiple ML models, ensuring scalability and reliability across petabytes of data and millions of users.",
    keywords: ["airbnb", "current", "latest", "recent", "last", "most recent", "where", "work", "working", "software engineer intern", "san francisco", "astra", "open-source", "kafka", "aws s3", "write-ahead log", "wal", "kubernetes", "ml models", "petabytes", "infrastructure savings", "1.1 million", "data pipeline", "internship", "infrastructure", "observability"]
  },
  
  // Work Experience - Edupoint
  {
    content: "Worked as a Software Engineer Intern at Edupoint Educational Systems in Phoenix, AZ (January 2025 – April 2025). He built a Python-based, multi-Large Language Model (LLM) powered assistant for a Learning Management System with vector-based retrieval of academic records and user queries, reducing support resolution time by 42% for 5M+ students.",
    keywords: ["edupoint", "phoenix", "software engineer intern", "python", "llm", "large language model", "learning management system", "vector retrieval", "academic records", "42% improvement", "5 million students", "educational systems"]
  },
  
  // Work Experience - Carnegie Mellon
  {
    content: "Served as a Machine Learning Research Assistant at Carnegie Mellon University in Pittsburgh, PA (June 2024 – August 2024). He optimized and fine-tuned open-source large language models using Ollama, Hugging Face Transformers, and PyTorch, achieving a 37% improvement in structured data extraction from enterprise documents and technical reports.",
    keywords: ["carnegie mellon university", "cmu", "pittsburgh", "machine learning", "research assistant", "ollama", "hugging face", "transformers", "pytorch", "37% improvement", "structured data extraction", "enterprise documents", "research"]
  },
  
  // Work Experience - ASU Co-op
  {
    content: "Worked as a Software Engineer Co-op at Arizona State University in Tempe, AZ (March 2023 – June 2024). He developed automation scripts in Python optimizing CI/CD pipelines and reducing deployment time, resulting in a 15% increase in system efficiency and reduced manual intervention.",
    keywords: ["arizona state university", "asu", "tempe", "software engineer co-op", "automation scripts", "python", "ci/cd", "pipelines", "deployment", "15% increase", "system efficiency", "automation"]
  },
  
  // Work Experience - Carrier
  {
    content: "Worked as a Software Developer Intern at Carrier remotely (May 2022 – August 2022). He designed and implemented Go, C++ and SQL based in-memory Database Engine to accurately track sales, returns, and inventory, enhancing stock management practices and reducing record discrepancies by 18%.",
    keywords: ["carrier", "remote", "software developer intern", "go", "c++", "sql", "in-memory database", "database engine", "sales", "returns", "inventory", "stock management", "18% reduction", "discrepancies"]
  },
  
  // Technical Skills - Programming Languages
  {
    content: "Ekagra's programming languages include Python, C++, C, Java, Go, C#, JavaScript, and TypeScript. He's proficient across multiple paradigms from systems programming to web development.",
    keywords: ["programming languages", "python", "c++", "c", "java", "go", "c#", "javascript", "typescript", "skills", "technologies", "languages"]
  },
  
  // Technical Skills - Frameworks & Libraries
  {
    content: "His frameworks and libraries expertise includes PyTorch, NumPy, TensorFlow, LangChain, Node.js, React, Angular, and .Net, spanning machine learning, web development, and enterprise technologies.",
    keywords: ["frameworks", "libraries", "pytorch", "numpy", "tensorflow", "langchain", "nodejs", "react", "angular", "dotnet", ".net", "machine learning", "web development", "skills", "technologies"]
  },
  
  // Technical Skills - Tools & Databases
  {
    content: "He's experienced with tools, databases, and software including Docker, Kafka, Kubernetes, MongoDB, SQL, Linux, Git, AWS, and GCP for cloud computing, containerization, and distributed systems.",
    keywords: ["tools", "databases", "docker", "kafka", "kubernetes", "mongodb", "sql", "linux", "git", "aws", "gcp", "cloud", "containerization", "distributed systems", "skills", "technologies"]
  },
  
  // Projects - Live-it
  {
    content: "Live-it won the UC Berkeley AI Hackathon and uses Python, VGGT, Gemini API, Gaussian Splatting, React, and Node.js. It integrates Google Veo 3 API to generate cinematic videos from prompts, then trains on VGGT neural network and Gaussian Splatting for AI-based camera inference and 3D scene construction, enabling real-time prompt-to-3D walkthroughs.",
    keywords: ["live-it", "uc berkeley ai hackathon", "winner", "python", "vggt", "gemini api", "gaussian splatting", "react", "nodejs", "google veo 3", "cinematic videos", "3d scene construction", "prompt-to-3d", "neural network", "projects", "hackathon"]
  },
  
  // Projects - Memory Transfer MCP
  {
    content: "Memory Transfer MCP is built with Python, FastAPI, and LangChain. It implements a FastAPI-based Model Context Protocol (MCP) memory layer that unifies memory ingestion and retrieval across OpenAI and Anthropic Claude models, enabling seamless multi-model integration for LLM-powered agents.",
    keywords: ["memory transfer mcp", "python", "fastapi", "langchain", "model context protocol", "mcp", "memory layer", "openai", "anthropic", "claude", "multi-model", "llm agents", "projects"]
  },
  
  // Projects - FocusTime AI
  {
    content: "FocusTime AI uses MediaPipe ML, TensorFlow, Flask, React, and Python. It's an AI-powered web app built with React, Flask, and PostgreSQL that integrates MediaPipe Holistic to extract 543 key points and uses TensorFlow for real-time gesture analysis, detecting and addressing procrastination during study sessions.",
    keywords: ["focustime ai", "mediapipe", "tensorflow", "flask", "react", "python", "postgresql", "ai-powered", "mediapipe holistic", "543 key points", "gesture analysis", "procrastination", "study sessions", "projects"]
  },
  
  // Projects - Operating System Kernel
  {
    content: "Built an Operating System Kernel using C++, C, Linux, Ubuntu, Python, and ASM (x86_64). The kernel features virtual memory management, ELF execution, and multicore support on x86_64, implementing paging, Round-Robin scheduler, and syscalls for user-space programs.",
    keywords: ["operating system", "kernel", "os", "c++", "c", "linux", "ubuntu", "python", "assembly", "x86_64", "virtual memory", "elf execution", "multicore", "paging", "round-robin scheduler", "syscalls", "user-space", "projects"]
  },
  
  // Certificates and Experience
  {
    content: "Ekagra has completed the Machine Learning Specialization from Stanford Online, served as a Section Leader (Teaching Assistant) for Code in Place at Stanford, is the Technical Lead for Google Developer Student Club at ASU, achieved USACO Gold in the United States Computing Olympiad, and leads the Claude Club for Anthropic at ASU.",
    keywords: ["certificates", "machine learning specialization", "stanford", "section leader", "teaching assistant", "code in place", "technical lead", "google developer student club", "usaco gold", "computing olympiad", "claude club", "anthropic", "achievements", "leadership", "teaching"]
  },
  
  // Contact & Location
  {
    content: "Ekagra is based in San Francisco, CA. You can reach him through his website EkagraGupta.com, email ekagragupta1609@gmail.com, or connect on LinkedIn, LeetCode, and GitHub.",
    keywords: ["contact", "san francisco", "california", "website", "ekagragupta.com", "email", "linkedin", "leetcode", "github", "location", "reach", "connect"]
  },
  
  // Personal Interests
  {
    content: "Outside of technology, Ekagra enjoys soccer, playing guitar, hiking, rock climbing, and scuba diving. He's passionate about both outdoor adventures and creative pursuits, balancing his technical career with diverse hobbies.",
    keywords: ["interests", "hobbies", "soccer", "guitar", "hiking", "rock climbing", "scuba diving", "personal", "outside", "fun", "activities", "sports", "music", "outdoor", "adventures", "climbing", "scuba"]
  }
];

const generateResponse = async (query) => {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(' ').filter(word => word.length > 2);
  
  // Try AI API for enhanced responses
  try {
    // Provide ALL context every time - let the AI figure out what's relevant
    const contextText = knowledgeBase.map(c => c.content).join('\n\n');
    
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
    
    if (API_KEY && API_KEY.startsWith('gsk_')) {
      try {
        const systemPrompt = `You are Ekagra Gupta's helpful AI assistant. Answer questions about him using the following information: ${contextText}. 

IMPORTANT: For work, education, or resume-related questions, ONLY use the information provided. DO NOT invent or assume any companies, job titles, dates, or experiences not mentioned. Never mention "context" or "provided information" - speak as if you naturally know about Ekagra.

Be conversational, friendly, and concise (1-2 sentences max).`;

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
                content: systemPrompt
              },
              {
                role: 'user', 
                content: query
              }
            ],
            model: 'llama3-8b-8192', // Fast and free Llama 3 model
            max_tokens: 120,
            temperature: 0, // Deterministic for factual accuracy
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
  
  // Simple fallback for basic cases
  const getSmartResponse = () => {
    // Basic greetings
    if (/^(hi|hey|hello|sup|yo)!?$/i.test(queryLower.trim())) {
      return "Hey there! I'm Ekagra's AI assistant. I can tell you about his work at Airbnb, his award-winning projects, technical skills, or personal interests. What would you like to know?";
    }
    
    // Contact questions
    if (queryLower.includes('contact') || queryLower.includes('reach')) {
      return "You can reach out to Ekagra through the contact section below! He's always excited to discuss tech, opportunities, or even outdoor adventures.";
    }
    
    // Default fallback
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

  // Track if initial message has been processed
  const [initialMessageProcessed, setInitialMessageProcessed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Blur any active input on the main page
      const mainPageInput = document.querySelector('input[placeholder*="Ask anything about me"]');
      if (mainPageInput) {
        mainPageInput.blur();
        mainPageInput.value = '';
      }
      
      // Force focus multiple times to ensure it sticks
      const forceFocus = () => {
        if (inputRef.current) {
          inputRef.current.focus();
          // Set cursor to end of input
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      };
      
      // Only process initial message once when popup first opens
      if (initialMessage && !initialMessageProcessed) {
        setMessages([]);
        setInputMessage(initialMessage);
        setInitialMessageProcessed(true);
        // Auto-send the initial message after a short delay
        setTimeout(() => {
          handleSendMessage(initialMessage);
          // Focus the input after sending the message with multiple attempts
          setTimeout(forceFocus, 100);
          setTimeout(forceFocus, 300);
          setTimeout(forceFocus, 600);
        }, 500);
      } else if (!initialMessage) {
        setMessages([]);
        // Focus the popup input after animation completes with multiple attempts
        setTimeout(forceFocus, 450);
        setTimeout(forceFocus, 600);
        setTimeout(forceFocus, 800);
      }
    } else {
      // Reset when closing
      setInputMessage('');
      setInitialMessageProcessed(false);
    }
  }, [isOpen, initialMessage, initialMessageProcessed]);

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

    // Refocus input immediately after clearing
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);

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
      // Refocus input after loading is complete
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 10);
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
            <div 
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col relative"
              onClick={(e) => {
                // Don't focus if clicking on close button or resize handle
                if (e.target.closest('button') || e.target.closest('.resize-handle')) return;
                
                // Focus input when clicking anywhere in the popup
                if (inputRef.current) {
                  inputRef.current.focus();
                  const length = inputRef.current.value.length;
                  inputRef.current.setSelectionRange(length, length);
                }
              }}
            >
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
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.focus();
                        const length = inputRef.current.value.length;
                        inputRef.current.setSelectionRange(length, length);
                      }
                    }}
                    onFocus={() => {
                      if (inputRef.current) {
                        const length = inputRef.current.value.length;
                        inputRef.current.setSelectionRange(length, length);
                      }
                    }}
                    onBlur={(e) => {
                      // Don't allow blur unless clicking outside the popup
                      if (!e.relatedTarget || !popupRef.current?.contains(e.relatedTarget)) {
                        return;
                      }
                      // Refocus after a brief delay if still in popup
                      setTimeout(() => {
                        if (inputRef.current && popupRef.current?.contains(document.activeElement)) {
                          inputRef.current.focus();
                        }
                      }, 10);
                    }}
                    placeholder="Ask anything about me..."
                    className="w-full p-4 pr-14 bg-white/5 backdrop-blur-sm text-white rounded-xl border border-white/20 focus:border-[#915EFF]/50 focus:outline-none focus:ring-2 focus:ring-[#915EFF]/20 transition-all duration-200 placeholder-white/50"
                    disabled={isLoading}
                    autoComplete="off"
                    autoFocus
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
