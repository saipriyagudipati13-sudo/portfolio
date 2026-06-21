import { useState, useEffect } from 'react'
import {
  Code,
  Mail,
  Github,
  Linkedin,
  Download,
  GraduationCap,
  Award,
  ChevronUp,
  Terminal,
  Database,
  Wrench,
  BookOpen,
  CheckCircle,
  ExternalLink
} from 'lucide-react'

// --- TYPING ANIMATION COMPONENT ---
const TypingEffect = ({ words, speed = 100, delay = 2000 }) => {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullWord = words[currentWordIdx];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
      }, speed / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
      }, speed);
    }

    // Word completed typing
    if (!isDeleting && currentText === fullWord) {
      timer = setTimeout(() => setIsDeleting(true), delay);
    }
    // Word completed deleting
    else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, words, speed, delay]);

  return <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-accent-cyan typewriter-cursor">{currentText}</span>;
};

// --- MAIN APP COMPONENT ---
function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reveal on Scroll Effect Hook
  useEffect(() => {
    const handleScroll = () => {
      // Scroll to top button visibility
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Active section highlight
      const sections = ['hero', 'about', 'education', 'skills', 'projects', 'certifications', 'achievements', 'profiles', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }

      // Reveal animations
      const reveals = document.querySelectorAll('.reveal-on-scroll');
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.remove('reveal-hidden');
          reveal.classList.add('reveal-active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mock resume download
  const handleDownloadResume = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
      <head>
        <title>Resume - Gudipati Sai Priya</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 40px; max-width: 800px; margin: auto; }
          h1 { color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 5px; }
          .subtitle { font-size: 1.2em; font-weight: bold; color: #555; margin-bottom: 20px; }
          .contact-info { display: flex; justify-content: space-between; margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 15px; font-size: 0.95em; }
          h2 { color: #1e3a8a; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .section-content { margin-left: 10px; }
          .project-title { font-weight: bold; font-size: 1.1em; color: #111; }
          .project-tech { font-style: italic; color: #666; font-size: 0.9em; margin-bottom: 5px; }
          ul { margin-top: 5px; padding-left: 20px; }
          .timeline-item { margin-bottom: 15px; }
          .timeline-header { display: flex; justify-content: space-between; font-weight: bold; }
          .cgpa { font-weight: bold; color: #0f766e; }
          @media print {
            body { padding: 20px; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <button onclick="window.print()" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; margin-bottom: 20px;">Print / Save as PDF</button>
        <h1>GUDIPATI SAI PRIYA</h1>
        <div class="subtitle">Software Developer | AIML Student</div>
        <div class="contact-info">
          <span>Email: saipriyagudipatil3@gmail.com</span>
          <span>GitHub: github.com/saipriyagudipati13-sudo</span>
          <span>LinkedIn: linkedin.com/in/gudipatisaipriya13</span>
        </div>
        
        <h2>PROFESSIONAL SUMMARY</h2>
        <div class="section-content">
          I am a Computer Science and Engineering (AI & ML) student with strong foundations in C++, Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, and Software Development. I enjoy building intelligent applications, solving real-world problems, and continuously learning modern technologies.
        </div>

        <h2>EDUCATION</h2>
        <div class="section-content">
          <div class="timeline-item">
            <div class="timeline-header">
              <span>Bachelor of Technology (B.Tech) - CSE (Artificial Intelligence & Machine Learning)</span>
              <span>2023 - 2027 (Expected)</span>
            </div>
            <div>Malla Reddy Engineering College, Hyderabad</div>
            <div>CGPA: <span class="cgpa">9.03</span></div>
          </div>
        </div>

        <h2>TECHNICAL SKILLS</h2>
        <div class="section-content">
          <strong>Programming Languages:</strong> C++, C, Python, SQL<br>
          <strong>Core Computer Science:</strong> Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks<br>
          <strong>Web Technologies:</strong> HTML, CSS, JavaScript (Basic)<br>
          <strong>Databases:</strong> MySQL, MongoDB<br>
          <strong>Tools:</strong> Git, GitHub, VS Code
        </div>

        <h2>PROJECTS</h2>
        <div class="section-content">
          <div class="timeline-item">
            <div class="project-title">AI Resume Analyzer (2026)</div>
            <div class="project-tech">Tech Stack: Python, NLP, Scikit-learn, NumPy, Pandas, Flask/FastAPI, HTML, CSS, JavaScript</div>
            <ul>
              <li>Developed an AI-based resume analysis system that extracts resume information, identifies skills, and generates resume scores.</li>
              <li>Implemented ATS optimization scoring and personalized skill improvement suggestions using Natural Language Processing.</li>
            </ul>
          </div>

          <div class="timeline-item">
            <div class="project-title">Currency Exchange Rate Prediction (2026)</div>
            <div class="project-tech">Tech Stack: Python, JavaScript, Flask/FastAPI, React.js, HTML, CSS</div>
            <ul>
              <li>Created an ML-based prediction system using Scikit-learn to analyze historical exchange rates.</li>
              <li>Built interactive dashboards displaying trend forecasts and visualizations of currency movements.</li>
            </ul>
          </div>

          <div class="timeline-item">
            <div class="project-title">Heart Health Analysis Prediction (2025)</div>
            <div class="project-tech">Tech Stack: Python, NumPy, Pandas, Scikit-learn</div>
            <ul>
              <li>Created risk-assessment systems leveraging classification algorithms to assess cardiovascular disease risk.</li>
              <li>Applied data preprocessing, feature engineering, and model evaluation to achieve high accuracy.</li>
            </ul>
          </div>
        </div>

        <h2>CERTIFICATIONS</h2>
        <div class="section-content">
          <ul>
            <li>Crash Course on Python — Google</li>
            <li>HTML and CSS Crash Course — Scrimba</li>
            <li>Microsoft Azure AI Fundamentals</li>
            <li>IBM Machine Learning with Python</li>
            <li>C++ Essentials</li>
          </ul>
        </div>

        <h2>ACHIEVEMENTS & ACTIVITIES</h2>
        <div class="section-content">
          <ul>
            <li>Maintained a high cumulative CGPA of 9.03/10.00.</li>
            <li>Participated in Vishesh 2K25 Technical Fest, showcasing teamwork and analytical capabilities.</li>
            <li>Attended Global AI Bootcamp, gaining exposure to Generative AI, ML, and industry methodologies.</li>
          </ul>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      if (name && email && message) {
        setFormStatus({
          type: 'success',
          message: `Thank you, ${name}! Your message has been sent successfully.`
        });
        e.target.reset();
      } else {
        setFormStatus({
          type: 'error',
          message: 'Please fill in all fields before sending.'
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* --- HEADER / NAVIGATION --- */}
      <header className="fixed top-0 inset-x-0 z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              SP
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-md tracking-wider text-slate-100 group-hover:text-indigo-400 transition-colors">SAI PRIYA</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">AIML Developer</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'about', label: 'About' },
              { id: 'education', label: 'Education' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'profiles', label: 'Profiles' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm font-medium tracking-wide transition-all relative py-2 ${
                  activeSection === item.id ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleDownloadResume}
              className="flex items-center px-5 py-2.5 rounded-xl bg-slate-900/60 hover:bg-indigo-600 border border-slate-700/80 hover:border-indigo-500/50 text-slate-200 hover:text-white font-medium text-sm transition-all duration-300 shadow-md hover:shadow-indigo-500/10 hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5 mr-2" />
              Resume
            </button>
          </div>

          {/* Hamburger Button (Mobile) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 inset-x-0 glass-nav border-t border-white/5 py-4 px-6 flex flex-col gap-4 shadow-xl">
            {[
              { id: 'about', label: 'About' },
              { id: 'education', label: 'Education' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'profiles', label: 'Profiles' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-semibold py-2 transition-colors ${
                  activeSection === item.id ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownloadResume();
              }}
              className="flex items-center justify-center py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </button>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Micro badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-indigo-300 font-mono text-xs uppercase tracking-widest mb-6 border-white/5 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              Open for Internships & Placement Opportunities
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-4">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 drop-shadow-sm">
                GUDIPATI SAI PRIYA
              </span>
            </h1>

            {/* Animated Typing Text */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-300 tracking-wide mb-6">
              <TypingEffect words={['Software Developer', 'AIML Student', 'Backend Developer', 'Problem Solver']} speed={120} delay={1800} />
            </h2>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              Passionate Computer Science student focused on backend development, problem-solving, machine learning, and building scalable software solutions.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 text-center flex-1 sm:flex-initial"
              >
                Contact Me
              </a>
              <button
                onClick={handleDownloadResume}
                className="px-6 py-4 rounded-xl glass-card hover:bg-white/5 text-slate-200 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center border-white/10 hover:border-white/20 flex-1 sm:flex-initial"
              >
                <Download className="w-5 h-5 mr-2" /> Download CV
              </button>
            </div>

            {/* Social Row */}
            <div className="flex items-center gap-5 mt-10">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-mono">Connect:</span>
              <a
                href="https://github.com/saipriyagudipati13-sudo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:scale-110 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/gudipatisaipriya13"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:scale-110 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:saipriyagudipatil3@gmail.com"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:scale-110 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Graphic Profile Column */}
          <div className="lg:col-span-5 flex items-center justify-center z-10">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group">
              
              {/* Decorative glowing backdrops */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-600/30 rounded-full blur-3xl group-hover:scale-105 transition-transform duration-700"></div>
              
              {/* Floating particles/icons */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-xl glass-card flex items-center justify-center text-indigo-400 shadow-xl border-white/10" style={{ animation: 'bounce 3s infinite' }}>
                <span className="font-mono font-bold text-sm">C++</span>
              </div>
              <div className="absolute bottom-6 -left-6 w-14 h-14 rounded-xl glass-card flex items-center justify-center text-purple-400 shadow-xl border-white/10 animate-float-slow">
                <span className="font-mono font-bold text-sm">AI</span>
              </div>
              <div className="absolute bottom-1/2 -right-8 w-12 h-12 rounded-xl glass-card flex items-center justify-center text-accent-cyan shadow-xl border-white/10 animate-float-medium">
                <span className="font-mono font-bold text-sm">ML</span>
              </div>

              {/* Outer Orbit Ring */}
              <div className="absolute inset-2 rounded-full border border-indigo-500/20 border-dashed animate-spin-slow"></div>

              {/* Middle Glow Ring */}
              <div className="absolute inset-6 rounded-full border border-purple-500/35 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500/10 to-transparent"></div>
              </div>

              {/* Core Profile Container */}
              <div className="absolute inset-10 rounded-full bg-slate-900 border-2 border-indigo-500/40 overflow-hidden flex items-center justify-center shadow-2xl shadow-indigo-500/10 group-hover:border-indigo-400 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-purple-900/40 mix-blend-overlay z-10"></div>
                
                {/* Futuristic Code/Abstract Pattern */}
                <div className="w-full h-full p-8 flex flex-col justify-center items-center font-mono text-[10px] text-indigo-300/40 select-none overflow-hidden leading-tight">
                  <div className="text-emerald-400/50 mb-2 font-bold text-xs">&lt;Sai Priya&gt;</div>
                  <div>const developer = &#123;</div>
                  <div className="pl-4">name: 'Sai Priya',</div>
                  <div className="pl-4">role: 'AIML Student',</div>
                  <div className="pl-4">skills: ['C++', 'Python', 'ML'],</div>
                  <div className="pl-4">focus: 'Backend & AI',</div>
                  <div className="pl-4">cgpa: 9.03</div>
                  <div>&#125;;</div>
                  <div className="text-indigo-400/50 mt-4 text-xs font-bold animate-pulse-slow">READY_TO_BUILD</div>
                </div>
              </div>

              {/* Orbiting dot indicator */}
              <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 border border-white animate-pulse"></div>

            </div>
          </div>

        </div>
      </section>

      {/* --- ABOUT ME SECTION --- */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto w-full reveal-on-scroll reveal-hidden">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-mono font-bold mb-2">Background</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">About Me</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Detail block */}
          <div className="lg:col-span-8 glass-card p-8 sm:p-10 rounded-3xl flex flex-col justify-center border-white/5">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 rounded bg-indigo-500"></span>
              Who I Am
            </h4>
            <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed">
              <p>
                I am a Computer Science and Engineering (Artificial Intelligence & Machine Learning) student with a strong interest in software engineering and machine learning.
              </p>
              <p>
                My technical foundation includes C++, Data Structures and Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, and Computer Networks.
              </p>
              <p>
                I enjoy solving challenging problems, developing efficient software solutions, and exploring modern technologies. My goal is to become a skilled software engineer capable of designing scalable and high-performance applications.
              </p>
            </div>
          </div>

          {/* Fast Stats Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6 justify-between">
            
            {/* CGPA Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl text-center border-indigo-500/15 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300 flex-1 flex flex-col justify-center">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
              <span className="text-sm font-mono tracking-widest text-slate-400 uppercase">Academic Standings</span>
              <div className="text-5xl font-extrabold text-indigo-400 my-3 group-hover:scale-105 transition-transform">9.03</div>
              <span className="text-xs text-slate-500 uppercase tracking-widest">Cumulative B.Tech CGPA</span>
            </div>

            {/* Specialties Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border-purple-500/15 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300 flex-1 flex flex-col justify-center">
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
              <h5 className="text-sm font-mono tracking-widest text-slate-400 uppercase mb-4 text-center">Focus Areas</h5>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Backend Systems', 'Machine Learning', 'Data Structures', 'Intelligent Apps'].map((spec, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/5 text-slate-300 text-xs font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- EDUCATION & TIMELINE SECTION --- */}
      <section id="education" className="py-24 px-6 bg-slate-950/30 reveal-on-scroll reveal-hidden">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-purple-400 font-mono font-bold mb-2">My Journey</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Education & Timeline</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* B.Tech Header Card */}
          <div className="max-w-3xl mx-auto glass-card p-6 sm:p-8 rounded-2xl border-purple-500/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Bachelor of Technology (B.Tech)</h4>
                <p className="text-sm text-purple-400 font-medium">Computer Science and Engineering (AI & ML)</p>
                <p className="text-xs text-slate-400 mt-1">Malla Reddy Engineering College, Hyderabad</p>
              </div>
            </div>
            <div className="sm:text-right shrink-0 bg-purple-500/10 px-4 py-2 rounded-xl border border-purple-500/20">
              <span className="text-xs text-slate-300 block font-mono">Expected Graduation</span>
              <span className="text-sm font-bold text-white">2027</span>
            </div>
          </div>

          {/* Vertical Timeline */}
          <div className="max-w-3xl mx-auto relative">
            
            {/* Timeline center line */}
            <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-indigo-500/60 via-purple-500/40 to-pink-500/20 -translate-x-1/2"></div>

            {/* Timeline Items */}
            {[
              {
                year: '2023',
                title: 'Started B.Tech CSE (AI & ML)',
                desc: 'Embarking on the undergraduate journey at Malla Reddy Engineering College. Discovered a deep interest in software systems and predictive modeling.'
              },
              {
                year: '2024',
                title: 'Strengthened Core CS Concepts',
                desc: 'Dived deep into Data Structures, Algorithms, Object-Oriented Programming (OOP) in C++, Database Management Systems, and OS fundamentals.'
              },
              {
                year: '2025',
                title: 'Built Heart Health Prediction System',
                desc: 'Applied machine learning models to assess cardiovascular risk. Cleaned raw clinical data and optimized classification algorithms using Scikit-learn.',
                projectLink: '#projects'
              },
              {
                year: '2026',
                title: 'Developed AI Resume Analyzer & Currency Predictor',
                desc: 'Crafted NLP pipelines for parsing resumes and constructed deep/predictive regression networks for trend forecasting of currency valuations.',
                projectLink: '#projects'
              },
              {
                year: '2027',
                title: 'Expected Graduation',
                desc: 'Ready to enter the industry as a skilled software engineer focused on building robust backends and intelligent algorithms.',
                isFuture: true
              }
            ].map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-12 sm:mb-8 w-full">
                  
                  {/* Connector Dot */}
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-400 shadow-md shadow-indigo-500/50 -translate-x-1/2 z-20">
                    {item.isFuture && <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mx-auto mt-0.5 animate-ping"></div>}
                  </div>

                  {/* Content panel */}
                  <div className={`w-full sm:w-[45%] pl-10 sm:pl-0 ${isEven ? 'sm:text-right' : 'sm:order-2'}`}>
                    <div className="glass-card p-6 rounded-2xl border-white/5 hover:border-indigo-500/20 hover:shadow-indigo-500/5 transition-all duration-300 inline-block text-left w-full relative">
                      
                      {/* Year Bubble */}
                      <div className={`absolute top-4 ${isEven ? 'sm:-right-16' : 'sm:-left-16'} right-auto left-4 sm:left-auto bg-slate-900 border border-slate-700/50 px-3 py-1 rounded-full text-xs font-bold text-indigo-400 font-mono shadow-md`}>
                        {item.year}
                      </div>

                      <h5 className="font-bold text-white text-md mt-6 sm:mt-0">{item.title}</h5>
                      <p className="text-slate-400 text-sm leading-relaxed mt-2">{item.desc}</p>
                      
                      {item.projectLink && (
                        <a
                          href={item.projectLink}
                          className="inline-flex items-center gap-1 text-xs text-indigo-400 font-medium hover:text-indigo-300 mt-3 transition-colors"
                        >
                          View Project details <ExternalLink className="w-3.5 h-3.5 ml-1 inline" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Invisible filler column for desktop layout */}
                  <div className="hidden sm:block w-[45%]"></div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-24 px-6 max-w-7xl mx-auto w-full reveal-on-scroll reveal-hidden">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-accent-cyan font-mono font-bold mb-2">Capabilities</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Technical Skills</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-accent-cyan to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Skills Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Programming Languages',
              icon: <Code className="w-6 h-6 text-indigo-400" />,
              skills: ['C++', 'C', 'Python', 'SQL'],
              colors: 'from-indigo-500/10 to-purple-500/5 hover:border-indigo-500/30'
            },
            {
              title: 'Core Computer Science',
              icon: <Terminal className="w-6 h-6 text-purple-400" />,
              skills: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'DBMS', 'Operating Systems', 'Computer Networks'],
              colors: 'from-purple-500/10 to-pink-500/5 hover:border-purple-500/30'
            },
            {
              title: 'Web Technologies',
              icon: <BookOpen className="w-6 h-6 text-pink-400" />,
              skills: ['HTML', 'CSS', 'JavaScript (Basic)'],
              colors: 'from-pink-500/10 to-accent-cyan/5 hover:border-pink-500/30'
            },
            {
              title: 'Databases',
              icon: <Database className="w-6 h-6 text-cyan-400" />,
              skills: ['MySQL', 'MongoDB'],
              colors: 'from-accent-cyan/10 to-indigo-500/5 hover:border-accent-cyan/30'
            },
            {
              title: 'Tools & Environments',
              icon: <Wrench className="w-6 h-6 text-yellow-400" />,
              skills: ['Git', 'GitHub', 'VS Code'],
              colors: 'from-yellow-500/10 to-indigo-500/5 hover:border-yellow-500/30'
            },
            {
              title: 'Soft Skills',
              icon: <Award className="w-6 h-6 text-emerald-400" />,
              skills: ['Problem Solving', 'Communication', 'Team Collaboration', 'Analytical Thinking'],
              colors: 'from-emerald-500/10 to-indigo-500/5 hover:border-emerald-500/30'
            }
          ].map((group, idx) => (
            <div 
              key={idx} 
              className={`glass-card p-6 sm:p-8 rounded-3xl border-white/5 bg-gradient-to-br ${group.colors} transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl shadow-indigo-500/5 group`}
            >
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 group-hover:scale-105 transition-transform">
                  {group.icon}
                </div>
                <h4 className="font-bold text-white text-lg tracking-wide">{group.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3.5 py-2 rounded-xl bg-slate-950/60 border border-white/5 text-slate-300 text-xs sm:text-sm font-medium hover:bg-slate-900 hover:text-white hover:border-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 px-6 bg-slate-950/30 reveal-on-scroll reveal-hidden">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-mono font-bold mb-2">Showcase</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Featured Projects</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Resume Analyzer',
                desc: 'Developed an AI-based resume analysis system that extracts resume information, identifies skills, generates resume scores, and provides personalized improvement suggestions using NLP techniques.',
                tech: ['Python', 'NLP', 'Scikit-learn', 'NumPy', 'Pandas', 'Flask/FastAPI', 'HTML', 'CSS', 'JavaScript'],
                features: ['Resume Parsing', 'Skill Extraction', 'Resume Scoring', 'Personalized Suggestions', 'ATS Optimization'],
                impact: 'Helps users improve resume quality and increase employability through AI-powered analysis.',
                demoTitle: 'AI Resume Dashboard',
                svg: (
                  <svg className="w-full h-full text-indigo-500/20" viewBox="0 0 200 120" fill="none">
                    <rect x="10" y="10" width="180" height="100" rx="10" fill="#0f172a" stroke="#312e81" strokeWidth="2" />
                    <line x1="25" y1="30" x2="100" y2="30" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="165" cy="30" r="12" fill="#312e81" />
                    <path d="M161 30l3 3 5-5" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="25" y="48" width="150" height="8" rx="4" fill="#1e293b" />
                    <rect x="25" y="62" width="120" height="8" rx="4" fill="#1e293b" />
                    <rect x="25" y="76" width="140" height="8" rx="4" fill="#1e293b" />
                    <rect x="25" y="90" width="90" height="8" rx="4" fill="#4f46e5" />
                    <circle cx="140" cy="90" r="10" fill="#06b6d4" opacity="0.3" />
                    <circle cx="150" cy="90" r="10" fill="#a855f7" opacity="0.3" />
                  </svg>
                )
              },
              {
                title: 'Currency Exchange Rate Prediction',
                desc: 'Developed a Machine Learning-based Currency Exchange Rate Prediction System using Python and Scikit-learn to analyze historical exchange rate data, perform trend analysis, and forecast future currency values through predictive modeling.',
                tech: ['Python', 'JavaScript', 'Flask/FastAPI', 'React.js', 'HTML', 'CSS'],
                features: ['Historical Exchange Rate Analysis', 'Trend Identification', 'Predictive Forecasting', 'Interactive Dashboard', 'Data Visualization'],
                impact: 'Provides insights into future currency movements through machine learning-based forecasting.',
                demoTitle: 'Exchange Predictor Graph',
                svg: (
                  <svg className="w-full h-full text-purple-500/20" viewBox="0 0 200 120" fill="none">
                    <rect x="10" y="10" width="180" height="100" rx="10" fill="#0f172a" stroke="#4c1d95" strokeWidth="2" />
                    <path d="M25 90h150M25 25v65" stroke="#1e293b" strokeWidth="2" />
                    <path d="M25 80c10-5 20-25 30-20s20 30 30 10 20-40 30-35 20-10 30-20" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
                    <path d="M145 15c5 5 15-5 25-10" stroke="#06b6d4" strokeWidth="3" strokeDasharray="3,3" />
                    <circle cx="145" cy="15" r="4" fill="#06b6d4" />
                    <rect x="35" y="30" width="45" height="18" rx="4" fill="#1e293b" />
                    <text x="40" y="42" fill="#06b6d4" fontSize="8" fontWeight="bold" fontFamily="monospace">USD/INR</text>
                  </svg>
                )
              },
              {
                title: 'Heart Health Analysis Prediction',
                desc: 'Developed a Heart Health Analysis Prediction System using machine learning algorithms to assess cardiovascular disease risk from patient health data. Applied data preprocessing, feature engineering, and model evaluation techniques to improve prediction accuracy.',
                tech: ['Python', 'NumPy', 'Pandas', 'Scikit-learn'],
                features: ['Health Risk Assessment', 'Data Preprocessing', 'Feature Engineering', 'Predictive Modeling', 'Model Evaluation'],
                impact: 'Supports early identification of cardiovascular disease risks using machine learning techniques.',
                demoTitle: 'Heart Classification Dashboard',
                svg: (
                  <svg className="w-full h-full text-pink-500/20" viewBox="0 0 200 120" fill="none">
                    <rect x="10" y="10" width="180" height="100" rx="10" fill="#0f172a" stroke="#831843" strokeWidth="2" />
                    <path d="M20 60h30l8-25 10 60 8-45 10 20 6-10h108" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="150" cy="35" r="15" fill="#e11d48" opacity="0.15" />
                    <path d="M150 28c3-3 8 0 8 4s-8 8-8 8-8-4-8-8 5-7 8-4z" fill="#f43f5e" />
                    <rect x="120" y="80" width="55" height="16" rx="4" fill="#1e293b" />
                    <text x="125" y="91" fill="#10b981" fontSize="7" fontWeight="bold" fontFamily="monospace">RISK: LOW (94%)</text>
                  </svg>
                )
              }
            ].map((project, idx) => (
              <div 
                key={idx} 
                className="glass-card rounded-3xl border-white/5 overflow-hidden flex flex-col justify-between group hover:border-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500"
              >
                
                {/* SVG Graphic Mockup */}
                <div className="relative aspect-[16/10] bg-slate-950 flex items-center justify-center p-6 border-b border-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10"></div>
                  <div className="w-full h-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                    {project.svg}
                  </div>
                  
                  {/* Title Tag */}
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-lg bg-slate-900/90 border border-white/10 text-xs font-mono font-bold text-slate-300">
                    {project.demoTitle}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h4>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {project.desc}
                    </p>

                    {/* Features checklist */}
                    <div className="mb-6">
                      <h5 className="text-xs uppercase tracking-widest text-indigo-300 font-bold font-mono mb-2">Key Features</h5>
                      <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
                        {project.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact */}
                    <div className="mb-6 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4">
                      <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold font-mono block mb-1">Impact</span>
                      <p className="text-slate-300 text-xs leading-relaxed">{project.impact}</p>
                    </div>
                  </div>

                  {/* Tech and Actions */}
                  <div>
                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <a
                        href="https://github.com/saipriyagudipati13-sudo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white text-xs font-semibold text-center transition-all duration-300 hover:bg-slate-800"
                      >
                        GitHub Repository
                      </a>
                      <button
                        onClick={() => alert(`Live Demo for ${project.title} is coming soon! Check the GitHub repo for source details.`)}
                        className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold text-center transition-all duration-300 shadow-md hover:shadow-indigo-500/10"
                      >
                        Live Demo Placeholder
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- CERTIFICATIONS SECTION --- */}
      <section id="certifications" className="py-24 px-6 max-w-7xl mx-auto w-full reveal-on-scroll reveal-hidden">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-purple-400 font-mono font-bold mb-2">Credentials</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Certifications</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Crash Course on Python',
              issuer: 'Google',
              logo: '🐍',
              highlight: 'border-emerald-500/20 bg-emerald-500/5'
            },
            {
              title: 'HTML and CSS Crash Course',
              issuer: 'Scrimba',
              logo: '🎨',
              highlight: 'border-orange-500/20 bg-orange-500/5'
            },
            {
              title: 'Microsoft Azure AI Fundamentals',
              issuer: 'Microsoft',
              logo: '☁️',
              highlight: 'border-blue-500/20 bg-blue-500/5'
            },
            {
              title: 'IBM Machine Learning with Python',
              issuer: 'IBM',
              logo: '🧠',
              highlight: 'border-indigo-500/20 bg-indigo-500/5'
            },
            {
              title: 'C++ Essentials',
              issuer: 'Programming Hub / Academic Certification',
              logo: '⚙️',
              highlight: 'border-purple-500/20 bg-purple-500/5'
            }
          ].map((cert, idx) => (
            <div 
              key={idx} 
              className={`glass-card p-6 rounded-2xl border-white/5 flex items-center gap-4 hover:border-white/15 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${cert.highlight}`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-xl shrink-0">
                {cert.logo}
              </div>
              <div>
                <h4 className="font-bold text-white text-md leading-snug">{cert.title}</h4>
                <span className="text-xs text-slate-400 block mt-1 font-medium">{cert.issuer}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ACHIEVEMENTS & ACTIVITIES SECTION --- */}
      <section id="achievements" className="py-24 px-6 bg-slate-950/30 reveal-on-scroll reveal-hidden">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-pink-400 font-mono font-bold mb-2">Milestones</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Achievements & Activities</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Achievements Grid List */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                metric: '9.03 CGPA',
                title: 'B.Tech Academic Performance',
                desc: 'Successfully maintained a cumulative Grade Point Average of 9.03/10.00 in B.Tech Computer Science and Engineering (AI & ML).'
              },
              {
                metric: 'VISHESH 2K25',
                title: 'Technical Fest Participant',
                desc: 'Participated in Vishesh 2K25 Technical Fest, demonstrating critical problem-solving, analytical skills, and teamwork.'
              },
              {
                metric: 'GLOBAL BOOTCAMP',
                title: 'AI & Generative AI Workshop',
                desc: 'Attended the Global AI Bootcamp, gaining direct exposure to ML models, Generative AI applications, and engineering best practices.'
              },
              {
                metric: 'PROJECT-BASED',
                title: 'Active Software & ML Builder',
                desc: 'Successfully constructed and finalized multiple Software Development and Machine Learning projects outside academic requirements.'
              },
              {
                metric: 'BACKEND',
                title: 'Problem-Solving & Data Focus',
                desc: 'Continuously refining algorithmic structure, data storage frameworks, and robust backends through active daily coding challenges.'
              }
            ].map((ach, idx) => (
              <div 
                key={idx} 
                className="glass-card p-6 sm:p-8 rounded-3xl border-l-4 border-l-pink-500 border-white/5 hover:border-white/10 hover:shadow-xl transition-all duration-300"
              >
                <span className="text-xs font-bold font-mono tracking-widest text-pink-400 uppercase bg-pink-500/10 px-3 py-1 rounded-md">
                  {ach.metric}
                </span>
                <h4 className="font-bold text-white text-md mt-4">{ach.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mt-2">{ach.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- CODING PROFILES SECTION --- */}
      <section id="profiles" className="py-24 px-6 max-w-7xl mx-auto w-full reveal-on-scroll reveal-hidden">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-mono font-bold mb-2">Algorithms</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Coding Profiles</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'LeetCode',
              metric: 'Algorithms Practice',
              color: 'hover:border-yellow-500/40 text-yellow-500',
              icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a1.38 1.38 0 0 0 0 1.948l1.137 1.137a1.378 1.378 0 0 0 1.951 0L15.114 4.02l1.137 1.137a1.378 1.378 0 0 0 1.951 0l2.302-2.302a1.378 1.378 0 0 0 0-1.951L19.366.414A1.374 1.374 0 0 0 18.405 0h-4.922zm-7.66 12.556a1.378 1.378 0 0 0-1.951 0l-3.46 3.459a1.378 1.378 0 0 0 0 1.951l3.46 3.459a1.378 1.378 0 0 0 1.951 0l3.459-3.459a1.378 1.378 0 0 0 0-1.951l-3.459-3.459zm5.32 5.321a1.378 1.378 0 0 0-1.951 0l-1.137 1.137a1.378 1.378 0 0 0 0 1.951l3.459 3.459a1.378 1.378 0 0 0 1.951 0l1.137-1.137a1.378 1.378 0 0 0 0-1.951l-3.459-3.459z" />
                </svg>
              )
            },
            {
              name: 'HackerRank',
              metric: 'Skill Certifications',
              color: 'hover:border-emerald-500/40 text-emerald-500',
              icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.04 8.78c-.28-.56-.84-.9-1.46-.9h-3.95V3.88c0-.62-.34-1.18-.9-1.46a1.642 1.642 0 0 0-1.63.1L2.83 9.48c-.5.34-.8.9-.8 1.49 0 .6.3 1.15.8 1.49l11.27 6.96c.25.15.53.23.82.23.28 0 .56-.08.81-.23.56-.28.9-.84.9-1.46v-3.95h3.95c.62 0 1.18-.34 1.46-.9.28-.56.28-1.22 0-1.78z" />
                </svg>
              )
            },
            {
              name: 'CodeChef',
              metric: 'Competitive Contests',
              color: 'hover:border-amber-700/40 text-amber-750',
              icon: (
                <span className="text-3xl font-extrabold font-mono text-amber-600">👨‍🍳</span>
              )
            },
            {
              name: 'GeeksforGeeks',
              metric: 'CS Article Reference',
              color: 'hover:border-emerald-600/40 text-emerald-600',
              icon: (
                <span className="text-3xl font-extrabold font-mono text-emerald-600">Gfg</span>
              )
            }
          ].map((prof, idx) => (
            <a 
              key={idx}
              href="https://github.com/saipriyagudipati13-sudo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`glass-card p-6 rounded-2xl border-white/5 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1.5 ${prof.color}`}
            >
              <div className="w-16 h-16 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {prof.icon}
              </div>
              <h4 className="font-bold text-white text-lg tracking-wide">{prof.name}</h4>
              <span className="text-xs text-slate-400 block mt-1">{prof.metric}</span>
              <span className="text-[10px] text-indigo-400 font-mono mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                View Placeholder Profile &gt;
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* --- CURRENTLY LEARNING SECTION --- */}
      <section id="learning" className="py-24 px-6 bg-slate-950/30 reveal-on-scroll reveal-hidden">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-widest text-accent-cyan font-mono font-bold mb-2">Expansion</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Currently Learning</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-accent-cyan to-indigo-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Learning Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { title: 'React.js', desc: 'Modern Frontend framework', badge: 'Next-gen UI' },
              { title: 'Backend Dev', desc: 'Flask, FastAPI, & REST architectures', badge: 'Server-side' },
              { title: 'MongoDB', desc: 'Document databases', badge: 'NoSQL DB' },
              { title: 'REST APIs', desc: 'Client-server communications', badge: 'Networking' },
              { title: 'System Design', desc: 'Scalable structural fundamentals', badge: 'Architecture' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="glass-card p-6 rounded-2xl border-white/5 text-center group hover:border-accent-cyan/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Ring highlight animation */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-accent-cyan/10 rounded-bl-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse"></div>
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded">
                  {item.badge}
                </span>
                <h4 className="font-bold text-white text-md mt-4 group-hover:text-accent-cyan transition-colors">{item.title}</h4>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto w-full reveal-on-scroll reveal-hidden">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-mono font-bold mb-2">Reach Out</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Contact Me</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="glass-card p-8 rounded-3xl border-white/5">
              <h4 className="text-2xl font-bold text-white mb-6">Let's connect!</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                I am actively seeking internship opportunities, placements, and collaboration on machine learning and software development projects. Feel free to shoot a message or reach out via my socials.
              </p>
              
              <div className="flex flex-col gap-6">
                {/* Email detail */}
                <a href="mailto:saipriyagudipatil3@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Email Address</span>
                    <span className="text-slate-200 text-sm font-bold group-hover:text-indigo-400 transition-colors">saipriyagudipatil3@gmail.com</span>
                  </div>
                </a>

                {/* GitHub detail */}
                <a href="https://github.com/saipriyagudipati13-sudo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">GitHub Profile</span>
                    <span className="text-slate-200 text-sm font-bold group-hover:text-purple-400 transition-colors">github.com/saipriyagudipati13-sudo</span>
                  </div>
                </a>

                {/* LinkedIn detail */}
                <a href="https://www.linkedin.com/in/gudipatisaipriya13" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan group-hover:bg-accent-cyan group-hover:text-white transition-all duration-300">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">LinkedIn Network</span>
                    <span className="text-slate-200 text-sm font-bold group-hover:text-accent-cyan transition-colors">linkedin.com/in/gudipatisaipriya13</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-3xl border-white/5">
              <h4 className="text-xl font-bold text-white mb-6">Send Message</h4>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
                    />
                  </div>

                  {/* Email input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      className="px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
                    />
                  </div>

                </div>

                {/* Message textarea */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    placeholder="Hi Sai Priya, I'd like to talk about..."
                    className="px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 text-sm transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Status Message */}
                {formStatus.message && (
                  <div className={`p-4 rounded-xl border text-xs sm:text-sm font-medium ${
                    formStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                  }`}>
                    {formStatus.message}
                  </div>
                )}

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-indigo-500/25 hover:-translate-y-0.5 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </div>
                  ) : 'Send Message'}
                </button>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 bg-[#03060c] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left detail */}
          <div className="text-center md:text-left">
            <span className="font-bold text-sm text-slate-300 block">Designed & Developed by Gudipati Sai Priya</span>
            <span className="text-xs text-slate-500 mt-1 block">© 2026 Gudipati Sai Priya. All Rights Reserved.</span>
          </div>

          {/* Stack Detail */}
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span>Built with:</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 font-mono text-[10px] text-indigo-400">React</span>
            <span>+</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-white/5 font-mono text-[10px] text-cyan-400">Tailwind CSS</span>
          </div>

          {/* Right social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/saipriyagudipati13-sudo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/gudipatisaipriya13"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

        </div>
      </footer>

      {/* --- BACK TO TOP BUTTON --- */}
      {showScrollTop && (
        <a
          href="#hero"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-lg shadow-indigo-500/35 hover:-translate-y-1 transition-all duration-300 animate-bounce"
          style={{ animationDuration: '4s' }}
        >
          <ChevronUp className="w-6 h-6" />
        </a>
      )}

    </div>
  );
}

export default App
