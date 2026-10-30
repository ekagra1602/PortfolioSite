import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Comprehensive knowledge base from resume
const knowledgeBase = [
  // Education
  "Ekagra (who also goes by Gray) graduated from Arizona State University in May 2026 with a Bachelor of Science in Computer Science, a perfect 4.0/4.0 GPA, and Summa Cum Laude. He was also an Exchange Student in Artificial Intelligence and Machine Learning at Stanford University (June 2026). Relevant courses include Data Structures & Algorithms, Software Engineering, Distributed Systems, and Machine Learning.",

  // Work Experience - Airbnb (Current)
  "Ekagra currently works full time as a Software Engineer at Airbnb in San Francisco, CA (July 2026 to present). He is optimizing GenAI tracing infrastructure by contributing upstream improvements to the open-source Jaeger project, including performance and reliability fixes and query-path improvements. He also built and productionized an OpenSearch ISM (Index State Management) metrics exporter for AI observability infrastructure, which collects index-management states across clusters and exports metrics for monitoring and alerting.",

  // Work Experience - Snowflake
  "Previously worked as a Software Engineer Intern - AI/ML at Snowflake in Menlo Park, CA (January 2026 to April 2026). He designed sharded throughput controllers for LLM queries to isolate blast radius during traffic spikes, improving system reliability while reducing memory footprint by around 70%. He also built a tokenizer and an estimation layer for all incoming queries, enabling adaptive pacing and scheduling to improve stability and resource utilization in the inference pipeline for Snowflake's Cortex-Code AI platform.",

  // Work Experience - Qualcomm
  "Worked as a Software Engineer Intern (Capstone) at Qualcomm in San Diego, CA (August 2025 to December 2025). Developed an AI-powered Financial Insights Engine leveraging AI100 for real-time stock analysis, trend forecasting, and smart comparisons; optimized high-throughput inference pipelines for large-scale financial data processing.",

  // Work Experience - Airbnb (Internship)
  "Before joining full time, he worked as a Software Engineer Intern at Airbnb in San Francisco, CA (May 2025 to August 2025). He optimized a cloud-native search and analytics engine by replacing Apache Kafka with direct write-ahead log (WAL) ingestion into AWS S3, resulting in around $1.1 million in infrastructure savings over the next 5 years. He also built and deployed a Kubernetes cluster to test and manage ingestion of logs and traces from multiple ML models, ensuring scalability and reliability across petabytes of data and millions of users.",

  // Work Experience - Edupoint
  "Worked as a Software Engineer Intern at Edupoint Educational Systems in Phoenix, AZ (January 2025 to April 2025). He built a Python-based, multi-LLM agent leveraging retrieval-augmented generation (RAG) with vector embedding based search over academic records and queries, reducing support resolution time by 42% for 5M+ students.",

  // Work Experience - Carnegie Mellon
  "Worked as a Machine Learning Researcher at Carnegie Mellon University in Pittsburgh, PA (June 2024 to August 2024). He optimized and fine-tuned open-source large language models using Ollama, Hugging Face Transformers, and PyTorch, achieving a 35% improvement in data extraction from enterprise documents and technical reports.",

  // Work Experience - Carrier
  "Worked as a Software Engineer Intern at Carrier remotely (May 2022 to August 2022). He designed and implemented Go, C++, and SQL based in-memory Database Engine to accurately track sales, returns, and inventory, enhancing stock management practices and reducing record discrepancies by 18%.",

  // Technical Skills - Programming Languages
  "Ekagra's programming languages include Python, C++, Go, Rust, Java, and TypeScript. He's proficient across multiple paradigms from systems programming to web development.",

  // Technical Skills - Frameworks & Libraries
  "His frameworks and libraries expertise includes PyTorch, TensorFlow, NumPy, LangChain, Node.js, React, and Angular, spanning machine learning and web development.",

  // Technical Skills - Tools & Cloud
  "He's experienced with tools and cloud platforms including Apache Kafka, Spark, Kubernetes, Docker, Spinnaker, MongoDB, SQL, Linux, Git, AWS, and GCP for cloud computing, containerization, and distributed systems.",

  // Publications - Behavior Beyond Text
  "Ekagra is the first author of \"Behavior Beyond Text\", an AI safety paper at the NeurIPS AIW 2026 workshop. It shows that text-based refusals often fail to transfer to tool-calling agents, tested across 5 LLMs with a custom benchmark, and analyzes refusal behavior through mechanistic interpretability.",

  // Projects - SlipStream
  "SlipStream won the Y Combinator Hackathon and is built with Python, FastAPI, Laminar, OpenAI, and MongoDB. It is a shared execution graph that captures web-agent task trajectories and guides future agents toward successful paths, reducing redundant exploration and LLM tool usage.",

  // Projects - Clarifyd
  "Clarifyd won the Treehacks (Stanford) Google Track and is built with Python, FastAPI, Gemini, Convex, and AssemblyAI. It is an AI classroom co-pilot that delivers real-time transcription, auto-generated explainer videos, adaptive quizzes, and live teaching analytics to make lectures interactive and data-driven.",

  // Projects - Live-it
  "Live-it won the UC Berkeley AI Hackathon and uses Python, VGGT, Gemini API, Gaussian Splatting, React, and Node.js. It integrates Google's Veo3 API to generate cinematic videos from prompts, trained on VGGT neural network and Gaussian Splatting for AI-based inference of a 3D scene, enabling real-time prompt-to-3D walkthroughs.",

  // Awards & Leadership
  "Ekagra achieved USACO Gold in the United States Computing Olympiad, completed the Machine Learning Specialization from Stanford, served as a Section Leader (Teaching Assistant) at Stanford, won Stanford TreeHacks and the UC Berkeley AI Hackathon, leads the Anthropic Claude Developer Club at ASU, is the Technical Lead for Google Developer Student Club at ASU, and is a Technical Lead at SoDA.",

  // Contact & Location
  "Ekagra is based in San Francisco, CA. You can reach him through his website EkagraGupta.com, email ekagra1605@gmail.com, message on +1 (602)-515-5268, or connect on LinkedIn (linkedin.com/in/ekagra16), LeetCode, and GitHub (github.com/ekagra1602).",

  // Personal Interests
  "Outside of technology, Ekagra enjoys soccer, playing guitar, hiking, rock climbing, and scuba diving. He's passionate about both outdoor adventures and creative pursuits, balancing his technical career with diverse hobbies."
];

// The model doesn't always follow the prompt, so strip em/en dashes from its replies
const removeDashes = (text) => text
  .replace(/(\d)\s*[–—]\s*(\d|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\b)/g, '$1 to $2')
  .replace(/\s*[—–―]\s*/g, ', ')
  .replace(/,\s*([,.!?;:])/g, '$1')
  .replace(/^,\s*/, '');

const generateResponse = async (query, recentMessages = []) => {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(' ').filter(word => word.length > 2);

  // Try AI API for enhanced responses
  try {
    // Provide ALL context every time - let the AI figure out what's relevant
    const contextText = knowledgeBase.join('\n\n');

    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    if (API_KEY) {
      try {
        const systemPrompt = `You are Ekagra's AI assistant on his portfolio website. 
        You know Ekagra well and talk about him naturally, not like you're reading off a resume.
        Use the following facts about him to answer questions: ${contextText}.
Rules:
- ONLY use the facts above. Do NOT invent companies, titles, dates, or experiences not listed.
- Never say "according to his resume" or "based on the information provided". Just speak naturally.
- Paraphrase and rephrase. Do NOT copy bullet points verbatim. Add personality and warmth.
- NEVER use em dashes or en dashes. Use commas, periods, or the word "to" for ranges instead.
- Keep answers short (2-3 sentences) but conversational, like you're chatting with a visitor.
- If someone asks something you don't have info on, say so casually and suggest they reach out to Ekagra directly.`;

        // Build message history with last 2 exchanges for context
        const historyMessages = recentMessages.slice(-4).map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content,
        }));

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
              ...historyMessages,
              {
                role: 'user',
                content: query
              }
            ],
                           model: 'openai/gpt-oss-120b',
            max_tokens: 300,
            temperature: 0.3,
            stream: false
          })
        });
        
        console.log('📡 Groq Status:', response.status);
        
        if (response.ok) {
          const result = await response.json();
          console.log('📋 Groq Result:', result);
          
          if (result.choices?.[0]?.message?.content) {
            const aiResponse = removeDashes(result.choices[0].message.content.trim());
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

const SUGGESTIONS = [
  { label: 'Airbnb', question: 'What does he do at Airbnb?' },
  { label: 'NeurIPS paper', question: 'Tell me about his NeurIPS paper' },
  { label: 'Hackathon wins', question: 'Which hackathons did he win?' },
  { label: 'Snowflake', question: 'What did he do at Snowflake?' },
  { label: 'Get in touch', question: 'How do I reach him?' },
];

// Reveals a reply word by word with a soft blur-in
const StreamText = ({ text, onTick }) => {
  const words = text.split(' ');
  const [count, setCount] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? words.length : 0
  );

  useEffect(() => {
    if (count >= words.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), 35);
    return () => clearTimeout(id);
  }, [count, words.length]);

  useEffect(() => {
    onTick?.();
  }, [count, onTick]);

  return (
    <>
      {words.slice(0, count).map((word, i) => (
        <span key={i} className="chat-word">{word} </span>
      ))}
      {count < words.length && <span className="chat-cursor" />}
    </>
  );
};

const ChatPopup = ({ isOpen, onClose, initialMessage = '' }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState({ width: 450, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const threadRef = useRef(null);
  const popupRef = useRef(null);
  const inputRef = useRef(null);

  // Track if initial message has been processed
  const [initialMessageProcessed, setInitialMessageProcessed] = useState(false);
  
  // Track screen size for responsive behavior
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile(); // Check initially
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Blur any active input on the main page
      const mainPageInput = document.getElementById('hero-ask');
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

  const scrollToBottom = useCallback(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

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
      const response = await generateResponse(messageText, messages);
      
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
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const asked = new Set(messages.filter((m) => m.type === 'user').map((m) => m.content));
  const chips = SUGGESTIONS.filter((s) => !asked.has(s.question)).slice(0, 4);

  // Desktop grows out of a pill like the island concept; mobile slides up
  const panelMotion = isMobile
    ? { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 24 } }
    : {
        initial: { opacity: 0, width: 340, height: 56 },
        animate: { opacity: 1, width: size.width, height: size.height },
        exit: { opacity: 0, width: 340, height: 56 },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Chat island, docked bottom left */}
          <motion.div
            ref={popupRef}
            role="dialog"
            aria-label="Ask about Ekagra"
            {...panelMotion}
            transition={isResizing ? { duration: 0 } : { type: 'spring', damping: 30, stiffness: 260 }}
            className={`chat-island fixed z-50 flex flex-col overflow-hidden rounded-[26px] border border-white/[0.12] bg-[#0d0d0e] text-[#f4f4f5] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.07)] ${
              isMobile ? 'bottom-4 left-4 right-4' : 'bottom-6 left-6'
            }`}
            style={isMobile ? { height: '75vh' } : undefined}
            onClick={(e) => {
              // Clicking anywhere but a control keeps the input focused
              if (e.target.closest('button') || e.target.closest('.resize-handle')) return;
              if (inputRef.current) {
                inputRef.current.focus();
                const length = inputRef.current.value.length;
                inputRef.current.setSelectionRange(length, length);
              }
            }}
          >
            <motion.div
              className="flex h-full min-h-0 flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-5 pt-4 pb-3">
                <span className="chat-ping" aria-hidden="true" />
                <span className="text-[15px] font-semibold">Ask Ekagra</span>
                <span className="chat-mono hidden xs:inline text-[12px] text-[#a1a1aa]">answers from his resume</span>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close chat"
                  className="ml-auto grid h-9 w-9 place-items-center rounded-[10px] bg-white/5 text-[#d4d4d8] transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              {/* Thread */}
              <div
                ref={threadRef}
                className="min-h-0 flex-1 overflow-y-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-live="polite"
              >
                {messages.length === 0 && !isLoading && (
                  <p className="pt-1 text-[15px] leading-relaxed text-[#a1a1aa]">
                    Ask about his work at Airbnb, his NeurIPS paper, his hackathon wins, or anything else on his resume.
                  </p>
                )}
                {messages.map((message, i) =>
                  message.type === 'user' ? (
                    <p
                      key={message.id}
                      className={`chat-mono text-[12px] tracking-[0.02em] text-[#a1a1aa] ${
                        i > 0 ? 'mt-5 border-t border-white/[0.07] pt-5' : 'pt-1'
                      }`}
                    >
                      <span className="text-[#5CF2A6]">you asked</span> · {message.content}
                    </p>
                  ) : (
                    <p key={message.id} className="mt-3 text-[16px] leading-[1.65] tracking-[-0.005em] text-[#f4f4f5]">
                      <StreamText text={message.content} onTick={scrollToBottom} />
                    </p>
                  )
                )}
                {isLoading && (
                  <p className="chat-mono mt-3 text-[13px] text-[#a1a1aa]">
                    thinking<span className="chat-cursor" />
                  </p>
                )}
              </div>

              {/* Follow-up suggestions */}
              {chips.length > 0 && (
                <div className="border-t border-white/[0.07] px-5 pt-3">
                  <p className="chat-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1aa]">
                    {messages.length ? 'Ask next' : 'Try one of these'}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {chips.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        disabled={isLoading}
                        onClick={() => handleSendMessage(chip.question)}
                        className="h-9 rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-[13px] font-medium text-[#d4d4d8] transition-colors hover:border-[#5CF2A6]/40 hover:bg-[#5CF2A6]/[0.08] hover:text-white disabled:opacity-50"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4">
                <div className="flex h-[54px] items-center gap-2.5 rounded-2xl border border-white/10 bg-[#151517] pl-[18px] pr-2 transition-colors focus-within:border-[#5CF2A6]/50">
                  <label htmlFor="chat-input" className="sr-only">Your question</label>
                  <input
                    id="chat-input"
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
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
                    placeholder="Ask about his work, research, projects…"
                    className="min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-[#8a8a93]"
                    disabled={isLoading}
                    autoComplete="off"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    aria-label="Send"
                    className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-[#5CF2A6] text-[#04140c] transition-[opacity,transform] hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Resize handle, desktop only */}
            {!isMobile && (
              <div
                className="resize-handle absolute right-0 top-0 h-4 w-4 cursor-ne-resize opacity-40 transition-opacity hover:opacity-100"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setIsResizing(true);
                }}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/70">
                  <path d="M8 8H16V16M8 16L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatPopup;
