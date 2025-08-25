import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { blogPosts } from "../constants";

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const openBlogPost = (post) => {
    setSelectedPost(post);
  };

  const closeBlogPost = () => {
    setSelectedPost(null);
  };

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  // Close modal when navigating away
  useEffect(() => {
    const handleBeforeUnload = () => {
      setSelectedPost(null);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Handle URL parameters and hash for direct blog access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('blog');
    const hash = window.location.hash;
    
    // Check for hash-based blog URLs (e.g., #blog1, #blog2)
    const hashMatch = hash.match(/^#blog(\d+)$/);
    const hashBlogId = hashMatch ? parseInt(hashMatch[1]) : null;
    
    // Priority: hash > query parameter
    const targetBlogId = hashBlogId || blogId;
    
    if (targetBlogId) {
      const post = blogPosts.find(post => post.id === parseInt(targetBlogId));
      if (post) {
        setSelectedPost(post);
      }
    }
  }, []);

  // Update URL when modal opens/closes
  useEffect(() => {
    if (selectedPost) {
      // Use hash-based URL for better sharing
      const newUrl = `${window.location.pathname}#blog${selectedPost.id}`;
      window.history.pushState({ blog: selectedPost.id }, '', newUrl);
    } else {
      const newUrl = window.location.pathname;
      window.history.pushState({}, '', newUrl);
    }
  }, [selectedPost]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.blog) {
        const post = blogPosts.find(post => post.id === event.state.blog);
        if (post) {
          setSelectedPost(post);
        }
      } else {
        setSelectedPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Close modal when clicking on logo or navigating to homepage
  useEffect(() => {
    const handleClick = (event) => {
      // Check if the clicked element is the logo or contains the logo
      const isLogoClick = event.target.closest('a[href="/"]') || 
                         event.target.closest('a[href="#"]') ||
                         event.target.closest('[onclick*="scrollTo"]');
      
      if (isLogoClick && selectedPost) {
        setSelectedPost(null);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [selectedPost]);

  return (
    <section id="blog" className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className={styles.sectionHeadText}>Blog</h2>
        <p className={styles.sectionSubText}>Thoughts, insights, and discoveries</p>
      </motion.div>



      {/* Featured Posts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-16"
      >
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></span>
          Featured Posts
        </h3>
        <div className="grid lg:grid-cols-2 gap-8">
          {featuredPosts.length > 0 ? (
            featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openBlogPost(post)}
              >
                <div className="bg-tertiary rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-blue-500/50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{post.readTime}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {post.title}
                  </h4>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                                  <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{post.date}</span>
                  <div className="flex items-center gap-4">
                    {/* Share link */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const shareUrl = `${window.location.origin}${window.location.pathname}#blog${post.id}`;
                        navigator.clipboard.writeText(shareUrl);
                        // You could add a toast notification here
                      }}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      title="Copy share link"
                    >
                      <svg className="w-4 h-4 text-gray-400 hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </button>
                    {/* Read More */}
                    <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      <span className="text-sm font-medium">Read More</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-400 text-lg">No featured blog posts available.</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] overflow-hidden"
          onClick={closeBlogPost}
        >
          {/* Close button - top right */}
          <button
            onClick={closeBlogPost}
            className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-sm transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-white group-hover:text-gray-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main content container */}
          <div className="h-full w-full overflow-y-auto">
            <div className="min-h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
              {/* Hero section */}
              <div className="relative pt-20 pb-16 px-6 lg:px-12">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto">
                  {/* Meta info */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-2 bg-blue-600/20 text-blue-400 text-sm font-medium rounded-full border border-blue-500/30 backdrop-blur-sm">
                      {selectedPost.category}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {selectedPost.readTime}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {selectedPost.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                    {selectedPost.title}
                  </h1>

                  {/* Excerpt */}
                  <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                    {selectedPost.excerpt}
                  </p>
                </div>
              </div>

              {/* Article content */}
              <div className="px-6 lg:px-12 pb-20">
                <div className="max-w-4xl mx-auto">
                  {/* Key Points Section */}
                  <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 mb-12 border border-gray-600/30 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></span>
                      Key Points
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedPost.tags.map((tag, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300 group"
                        >
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                          <span className="text-gray-200 font-medium group-hover:text-white transition-colors duration-300">
                            {tag}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Article body */}
                  <div className="prose prose-invert max-w-none">
                    <div className="space-y-6 text-gray-300 leading-relaxed">
                      <p className="text-lg">
                        This is a detailed exploration of <span className="text-blue-400 font-semibold">{selectedPost.title.toLowerCase()}</span>. The content would include comprehensive information, code examples, and insights based on real-world experience.
                      </p>
                      
                      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-600/30">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          Technical Deep Dive
                        </h3>
                        <p className="text-gray-300">
                          Throughout this article, we'll dive deep into the technical aspects, practical applications, and best practices that make this topic relevant for developers and technology enthusiasts.
                        </p>
                      </div>

                      <p className="text-lg">
                        Stay tuned for more detailed content and practical examples that you can implement in your own projects. We'll cover everything from basic concepts to advanced implementations.
                      </p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-16 pt-8 border-t border-gray-700/50">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                                             {/* Social sharing */}
                       <div className="flex items-center gap-4">
                         <span className="text-gray-400 text-sm font-medium">Share this article:</span>
                         <div className="flex gap-3">
                           {[
                             { 
                               icon: "twitter", 
                               color: "text-blue-400 hover:text-blue-300", 
                               bg: "hover:bg-blue-500/20",
                               url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedPost.title)}&url=${encodeURIComponent(window.location.href)}`
                             },
                             { 
                               icon: "linkedin", 
                               color: "text-blue-600 hover:text-blue-500", 
                               bg: "hover:bg-blue-600/20",
                               url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
                             },
                             { 
                               icon: "copy", 
                               color: "text-gray-400 hover:text-gray-300", 
                               bg: "hover:bg-gray-500/20",
                               action: () => {
                                 navigator.clipboard.writeText(window.location.href);
                                 // You could add a toast notification here
                               }
                             }
                           ].map((social, index) => (
                             <motion.button
                               key={social.icon}
                               whileHover={{ scale: 1.1 }}
                               whileTap={{ scale: 0.95 }}
                               className={`p-3 rounded-xl border border-gray-600/30 ${social.bg} ${social.color} transition-all duration-300`}
                               onClick={() => {
                                 if (social.action) {
                                   social.action();
                                 } else if (social.url) {
                                   window.open(social.url, '_blank', 'noopener,noreferrer');
                                 }
                               }}
                             >
                               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                 {social.icon === "twitter" && (
                                   <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                 )}
                                 {social.icon === "linkedin" && (
                                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.542C23.227 24 24 23.227 24 22.271V1.729C24 .774 23.227 0 22.225 0h.003z"/>
                                 )}
                                 {social.icon === "copy" && (
                                   <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                 )}
                               </svg>
                             </motion.button>
                           ))}
                         </div>
                       </div>

                      {/* View Project button */}
                      <motion.a
                        href={selectedPost.source_code_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-600/25 flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Project
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

    </section>
  );
};

export default Blog;
