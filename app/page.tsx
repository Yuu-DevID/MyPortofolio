'use client'
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, ExternalLink, Menu, X, ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';

type TypeWriterProps = {
    words: string[]; // Menentukan tipe props `words` sebagai array string
  };

const TypeWriter: React.FC<TypeWriterProps> = ({ words }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
  
    useEffect(() => {
      const typingSpeed = isDeleting ? 100 : 200; // Kecepatan mengetik dan menghapus
      const word = words[currentWordIndex];
  
      const timer = setTimeout(() => {
        if (!isDeleting) {
          setCurrentText(word.substring(0, currentText.length + 1));
        } else {
          setCurrentText(word.substring(0, currentText.length - 1));
        }
  
        // Logika untuk mengganti kata
        if (!isDeleting && currentText === word) {
          // Tunggu sebentar sebelum mulai menghapus
          setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }, typingSpeed);
  
      return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex, words]);
  
    return (
      <span className="typing-text">
        {currentText}
        <span className="typing-cursor">|</span>
      </span>
    );
  };
  

const StarBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-900 to-black" />
      {[...Array(100)].map((_, i) => {
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const animationDelay = `${Math.random() * 3}s`;
        return (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top,
              left,
              animationDelay,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        );
      })}
    </div>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const typingWords = [
    "Student",
    "Programmer",
    "Frontend Developer",
    "Backend Developer",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const bounds = element.getBoundingClientRect();
          return bounds.top <= 100 && bounds.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const projects = [
    {
      title: "Rest API",
      url: "https://api.yuudev.my.id/",
      description: "An API designed to help you streamline tasks.",
      tech: ["ExpressJS", "TailwindCSS"]
    },
    {
      title: "Anki Japan",
      url: "https://anki.yuudev.my.id/",
      description: "A website that helps you learn Japanese in a fun way",
      tech: ["Next.js", "TailwindCSS"]
    },
    {
      title: "Portfolio Website",
      url: "#",
      description: "Custom portfolio website with smooth animations",
      tech: ["Next.js", "TailwindCSS"]
    }
  ];

  return (
    <>
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        ::-webkit-scrollbar-thumb {
          background: #4f46e5;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #6366f1;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 3s infinite;
        }
          .scroll-to-top {
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: all 0.3s ease-in-out;
        }
        
        .scroll-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      `}</style>

      <div className="h-full mb-20 bg-black text-gray-100 relative">
        <StarBackground />
        {/* Floating Action Button */}
        <button
          onClick={scrollToTop}
          className={`scroll-to-top fixed bottom-8 right-8 z-50 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-110 ${
            showScrollTop ? 'visible' : ''
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>

        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in-up">
              <h2 className="text-indigo-400 text-lg mb-4">Hello Everyone, I am</h2>
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-gradient">
                Yusuf Saputra
              </h1>
              <p className="text-xl text-gray-400 mb-8">
              <TypeWriter words={typingWords} />
              </p>
              <div className="flex justify-center space-x-6">
                {[
                  { icon: Github, href: "https://github.com/Yuu-DevID" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/yusuf-saputra-a34464312/" },
                  { icon: Instagram, href: "https://instagram.com/dev.kyuu" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              About Me
            </h2>
            <div className="bg-gray-800/30 rounded-lg p-8 backdrop-blur-sm border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1">
              <p className="text-gray-300 leading-relaxed">
              I am a passionate Frontend and Backend Developer with a strong focus on crafting intuitive and engaging user experiences. Leveraging my expertise in modern web technologies, design principles, and seamless integration, I bridge the gap between aesthetic appeal and functional implementation. My approach ensures that every project not only looks exceptional but performs flawlessly, creating a balance that delights users and meets business goals.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-gray-800/30 rounded-lg p-6 backdrop-blur-sm border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.url}
                    className="inline-flex items-center text-indigo-400 mt-4 hover:text-indigo-300 transition-colors"
                  >
                    View Project <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                'JavaScript (ES6+)',
                'React & Next.js',
                'Tailwind CSS',
                'NodeJS',
                'Responsive Design',
                'Cyber Security'
              ].map((skill, index) => (
                <div
                  key={index}
                  className="group bg-gray-800/30 rounded-lg p-4 text-center backdrop-blur-sm border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="text-gray-300 group-hover:text-indigo-400 transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Get In Touch
            </h2>
            <p className="text-gray-400 mb-8">
              I'm happy if you want to know me better, just contact me.
            </p>
            <a
              href="mailto:yusufsaputra4231@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Send Message
            </a>
          </div>
        </section>
        <section className="py-20 relative z-10">

        </section>
      </div>
    </>
  );
}