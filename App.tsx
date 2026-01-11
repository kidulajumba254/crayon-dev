import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ExternalLink,
  Code,
  Server,
  Database,
  Users,
  GraduationCap,
  Award,
  Phone,
  Monitor,
  Smartphone,
  Cpu,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Gitlab
} from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import { PROJECTS, EXPERIENCES, SKILLS, EDUCATION, CERTIFICATIONS, CONTACT, COLORS, REFEREES, TESTIMONIALS, RECOGNIZED_STACK } from './constants';
import { Project } from './types';
import CrayonStroke from './components/CrayonStroke';
import CursorTrail from './components/CursorTrail';
import ProjectModal from './components/ProjectModal';

const HackerRankIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
    <path d="M19.5 0h-15C2.015 0 0 2.015 0 4.5v15C0 21.985 2.015 24 4.5 24h15c2.485 0 4.5-2.015 4.5-4.5v-15C24 2.015 21.985 0 19.5 0zm-3 18h-2.25v-4.5h-4.5V18H7.5V6h2.25v4.5h4.5V6h2.25v12z" />
  </svg>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // High-performance cursor logic (Zero Lag)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [scrolled, setScrolled] = useState(false);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Simulate initial workspace drafting
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextTestimonial = () => setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="bg-[#FAFAF7] text-[#1E1E1E] min-h-screen font-sans selection:bg-[#F2C94C] selection:text-white overflow-x-hidden">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <motion.div
        className="fixed pointer-events-none z-[9999] hidden md:flex items-center justify-center pointer-events-none mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      >
        <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </motion.div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-3 md:py-4 bg-[#FAFAF7]/90 backdrop-blur-md shadow-sm border-b border-gray-100' : 'py-6 md:py-10 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer z-50 pointer-events-auto"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/jesse_identity.jpg" alt="Jesse Identity" className="h-10 w-auto object-contain rounded-sm" />
          </motion.div>

          <div className="hidden lg:flex items-center gap-10 font-medium pointer-events-auto">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-[#2E86DE] transition-colors relative group text-xs uppercase tracking-[0.2em] font-black"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2E86DE] transition-all group-hover:w-full opacity-50" />
              </a>
            ))}
          </div>

          <button
            className="lg:hidden p-2 bg-white sketch-border-soft pointer-events-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed inset-0 bg-[#FAFAF7] z-30 pt-40 px-8 lg:hidden flex flex-col items-center"
          >
            <div className="flex flex-col gap-10 text-5xl font-black text-center">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-[#2E86DE] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-40 md:pt-56">

        {/* Hero Section */}
        <section className="min-h-[75vh] flex flex-col justify-center relative mb-48">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-10 right-0 md:right-32 text-7xl opacity-10 pointer-events-none"
          >
            <span className="font-handwriting text-[#2E86DE] selection:bg-transparent">()</span>
          </motion.div>
          <motion.div
            animate={{ x: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-0 left-0 md:left-20 text-7xl opacity-10 pointer-events-none"
          >
            <span className="font-handwriting text-[#E94B3C] selection:bg-transparent">{'=>'}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-9xl font-black leading-tight mb-8"
          >
            I build software <br />
            <span className="relative inline-block">
              like I draw ideas
              <CrayonStroke
                color={COLORS.oceanBlue}
                className="absolute -bottom-2 md:-bottom-4 left-0"
              />
            </span>
            <br />
            — with curiosity.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-3xl text-gray-600 max-w-2xl font-light mb-16"
          >
            Software Developer at CompuLynx Limited. Data Scientist & AI Enthusiast.
            <span className="font-handwriting text-[#E94B3C] ml-2 font-bold text-3xl block md:inline mt-4 md:mt-0">Drawn from Nairobi.</span>
          </motion.p>

          <div className="flex flex-wrap gap-8 items-center">
            {/* Modern GitHub Linking for Works */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-16 py-8 bg-[#1E1E1E] text-[#FAFAF7] font-black text-3xl sketch-border flex items-center gap-6 shadow-2xl hover:bg-black transition-all"
            >
              Explore Works <ArrowRight size={28} />
            </motion.a>

            {/* Recognized Tech Stack "Advertisement" Marquee */}
            <div className="mt-32 w-screen -ml-[50vw] left-1/2 relative bg-gray-50/50 py-16 overflow-hidden border-y border-gray-100">
              <div className="max-w-[1400px] mx-auto px-10 mb-8 border-l-4 border-[#F2C94C]">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Trusted Tech Ecosystem & Stack</span>
              </div>

              <div className="relative flex overflow-x-hidden">
                <motion.div
                  className="flex gap-x-16 whitespace-nowrap py-4"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {[...RECOGNIZED_STACK, ...RECOGNIZED_STACK].map((tech, idx) => (
                    <div key={idx} className="flex items-center gap-10 group cursor-pointer hover:scale-110 transition-transform px-6 border-r border-gray-100 last:border-0 h-40">
                      <div className="flex items-center gap-8 filter grayscale group-hover:grayscale-0 transition-all">
                        {tech.logos ? (
                          <div className="flex items-center gap-6 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            {tech.logos.map((logo: string, lIdx: number) => (
                              <img key={lIdx} src={logo} alt={tech.name} className="w-32 h-32 object-contain" />
                            ))}
                          </div>
                        ) : (
                          <img src={tech.logo} alt={tech.name} className="w-28 h-28 object-contain" />
                        )}
                        <span className="text-4xl font-black tracking-tighter text-gray-900">{tech.name}</span>
                        {tech.status && (
                          <span className="bg-[#27AE60] text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase whitespace-nowrap">
                            {tech.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 px-2 md:px-4">
              <div className="flex items-center gap-6 md:gap-10">
                <a href={CONTACT.hackerrank} className="hover:text-[#27AE60] transition-colors group" aria-label="HackerRank">
                  <HackerRankIcon size={34} />
                </a>
                <a href={CONTACT.github} className="hover:text-[#2E86DE] transition-colors" aria-label="GitHub"><Github size={32} /></a>
                <a href={CONTACT.gitlab} className="hover:text-[#2E86DE] transition-colors" aria-label="GitLab"><Gitlab size={32} /></a>
                <a href={CONTACT.linkedin} className="hover:text-[#2E86DE] transition-colors" aria-label="LinkedIn"><Linkedin size={32} /></a>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[#E94B3C] transition-colors" aria-label="Email"><Mail size={32} /></a>
              </div>

              <div className="hidden xl:flex items-center gap-4 py-3 px-5 sketch-border-soft bg-white/50 backdrop-blur-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27AE60] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#27AE60]"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 whitespace-nowrap">
                  Available for New Collaborations
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider Stroke */}
        <div className="flex justify-center mb-32 opacity-20">
          <CrayonStroke color={COLORS.charcoalInk} width={500} path="M0 5 Q 250 10, 500 5" />
        </div>

        {/* About Section */}
        <section id="about" className="mb-64 scroll-mt-48 relative">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: -20 }}
            viewport={{ once: true }}
            className="absolute -left-32 top-20 hidden xl:flex flex-col items-center gap-4 font-handwriting text-3xl text-[#E94B3C] -rotate-90"
          >
            <span>01. Background</span>
            <CrayonStroke color={COLORS.waxRed} width={120} height={4} />
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, rotate: -3 }}
                whileInView={{ opacity: 1, rotate: -3 }}
                viewport={{ once: true }}
                className="relative p-6 bg-white sketch-border shadow-2xl transform group transition-all duration-500 hover:rotate-0"
              >
                <div className="relative overflow-hidden sketch-border-soft aspect-[4/5]">
                  <img
                    src="/profile_jesse.jpg"
                    alt="Jesse Kidula Smiling Portfolio"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="absolute -bottom-8 -right-8 p-6 bg-[#F2C94C] sketch-border rotate-12 shadow-2xl z-10 transition-transform group-hover:scale-110">
                  <span className="font-handwriting text-3xl">Jesse at work 💻</span>
                  <CrayonStroke color={COLORS.charcoalInk} className="absolute -bottom-1 left-4" width={100} />
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7 space-y-16">
              <div>
                <h2 className="text-6xl font-black mb-10 relative inline-block">
                  Data meets Code
                  <CrayonStroke color={COLORS.leafGreen} width={180} className="absolute -bottom-3 right-0" path="M0 5 Q 90 0, 180 5" />
                </h2>
                <div className="space-y-8 text-2xl leading-relaxed text-gray-700 font-light">
                  <p>
                    I am a Software Developer & Data Scientist with a proven ability to deliver data-driven insights and scalable applications. My specialty lies at the intersection of <span className="underline decoration-[#27AE60] decoration-4 font-bold italic">Software Engineering and AI Integration</span>.
                  </p>
                  <p>
                    Currently serving as a Software Developer at CompuLynx Limited, I focus on building enterprise-grade financial systems and scalable web applications using Angular and Spring Boot.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-3xl font-black flex items-center gap-4">
                    <GraduationCap className="text-[#2E86DE]" size={36} /> Education
                  </h3>
                  <div className="bg-white p-8 sketch-border-soft shadow-md border-l-8 border-[#2E86DE] relative">
                    <p className="font-black text-2xl">{EDUCATION.degree}</p>
                    <p className="text-sm text-gray-400 font-black uppercase tracking-widest mt-2">GPA: {EDUCATION.gpa} • {EDUCATION.period}</p>
                    <CrayonStroke color={COLORS.oceanBlue} className="absolute -bottom-3 -right-6 rotate-12" width={60} />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-black flex items-center gap-4">
                    <Award className="text-[#E94B3C]" size={36} /> Certifications
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-md font-bold relative">
                    {CERTIFICATIONS.map(cert => (
                      <div key={cert} className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-[#E94B3C]" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* iPhone Mockup Credentials Section */}
          <div id="credentials" className="mt-48 pt-32 border-t border-gray-100 relative">
            <div className="absolute -top-12 left-0 font-handwriting text-4xl text-[#2E86DE] opacity-40 -rotate-3">
              Certification Vault
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <h3 className="text-5xl font-black leading-tight">
                  Verified <br /> <span className="text-[#2E86DE]">Academic & Professional</span> <br /> Standing
                </h3>
                <p className="text-2xl text-gray-500 font-light leading-relaxed">
                  Technical recruiters can verify my BBIT degree and professional experience directly. These are the core pillars of my engineering foundation.
                </p>

                <div className="space-y-6">
                  <a href="mailto:kidulajesse@gmail.com" className="group flex items-center gap-6 p-8 bg-white sketch-border-soft hover:shadow-xl transition-all">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#E94B3C]/10 transition-all">
                      <Mail className="text-[#E94B3C]" size={32} />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase text-gray-400">Direct Contact</p>
                      <p className="text-2xl font-black">Request a Private Briefing</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* iPhone Floating Display Component */}
              <div className="relative h-[600px] flex items-center justify-center pt-20">
                {/* CV Phone */}
                <motion.div
                  initial={{ y: 20, rotate: -5 }}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.1, rotate: 0, zIndex: 30, x: 20 }}
                  className="absolute z-20 left-10 md:left-20 cursor-pointer"
                >
                  <div className="w-[280px] h-[580px] bg-black rounded-[45px] p-3 shadow-[20px_40px_60px_rgba(0,0,0,0.3)] relative overflow-hidden border-[6px] border-[#333]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-30" />
                    <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
                      <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-10 text-center">
                        <Monitor className="mb-4 text-gray-300" size={60} />
                        <p className="font-black text-[10px] uppercase tracking-widest text-[#E94B3C] mb-4">Official Document</p>
                        <p className="text-xl font-black leading-tight mb-8">Resume Jesse Kidula</p>
                        <a href="/docs/resume_jesse_kidula.pdf" target="_blank" className="bg-[#1E1E1E] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black/80 transition-all flex items-center gap-2">
                          <ExternalLink size={14} /> View CV
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Degree Phone */}
                <motion.div
                  initial={{ y: -20, rotate: 5 }}
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={{ scale: 1.1, rotate: 0, zIndex: 30, x: -20 }}
                  className="absolute z-10 -right-10 md:right-0 cursor-pointer"
                >
                  <div className="w-[260px] h-[540px] bg-black rounded-[45px] p-3 shadow-[20px_40px_60px_rgba(0,0,0,0.2)] relative overflow-hidden border-[6px] border-[#333]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-30" />
                    <div className="w-full h-full bg-[#FAFAF7] rounded-[32px] overflow-hidden relative border-4 border-gray-100">
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white">
                        <div className="w-16 h-1 bg-[#F2C94C] mb-10" />
                        <GraduationCap className="mb-6 text-[#2E86DE]" size={50} />
                        <p className="text-lg font-black leading-tight mb-8 text-gray-500 italic">BBIT Degree Cert</p>
                        <a href="/docs/BBIT_Degree Cert.pdf" target="_blank" className="bg-[#2E86DE] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#2E86DE]/80 transition-all flex items-center gap-2">
                          <ExternalLink size={14} /> Verify
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-64 scroll-mt-48">
          <div className="mb-20 flex items-center gap-10">
            <h2 className="text-6xl font-black">My Toolbox</h2>
            <CrayonStroke color={COLORS.goldenYellow} width={400} height={20} />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="p-12 bg-white sketch-border relative group overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div
                  className="absolute top-0 right-0 w-40 h-40 -mr-16 -mt-16 opacity-5 rounded-full"
                  style={{ backgroundColor: skill.color }}
                />
                <h3 className="text-4xl font-black mb-10 flex items-center gap-5">
                  {skill.category === 'Programming' && <Code size={40} style={{ color: skill.color }} />}
                  {skill.category === 'Web & Backend' && <Server size={40} style={{ color: skill.color }} />}
                  {skill.category === 'Data Science' && <Database size={40} style={{ color: skill.color }} />}
                  {skill.category}
                </h3>
                <ul className="space-y-5">
                  {skill.items.map(item => (
                    <li key={item} className="flex items-center gap-4 group-hover:translate-x-3 transition-transform duration-300">
                      <span className="w-4 h-4 sketch-border-soft shadow-inner opacity-60" style={{ backgroundColor: skill.color, color: skill.color }} />
                      <span className="text-gray-700 font-bold text-xl">{item}</span>
                    </li>
                  ))}
                </ul>
                <CrayonStroke color={skill.color} className="absolute bottom-6 right-6 opacity-20" width={100} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-64 scroll-mt-48">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="relative">
              <h2 className="text-6xl font-black mb-6">Selected Works</h2>
              <CrayonStroke color={COLORS.waxRed} width={300} height={20} />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="absolute -top-16 -left-16 font-handwriting text-4xl text-[#E94B3C] rotate-[-15deg]"
              >
                Check these out! ✨
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-handwriting text-3xl text-gray-400 max-w-sm text-right leading-tight"
            >
              Systems built with precision, <br /> drawn from curiosity. 📖
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  y: -20,
                  rotate: i % 2 === 0 ? 3 : -3,
                  boxShadow: `25px 25px 0px 0px ${project.color}20`
                }}
                viewport={{ once: true }}
                className="bg-white p-12 sketch-border flex flex-col h-full relative group transition-all duration-500"
              >
                <div className="absolute -top-5 -right-5 px-6 py-3 bg-[#FAFAF7] sketch-border-soft text-sm font-black rotate-12 shadow-xl z-10 group-hover:rotate-6 transition-transform flex items-center gap-2">
                  {project.type}
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black">
                    <Github size={16} />
                  </a>
                </div>

                <div
                  onClick={() => setSelectedProject(project)}
                  className="h-56 mb-12 overflow-hidden sketch-border-soft bg-gray-50 flex items-center justify-center relative shadow-inner cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {(() => {
                    const IconComponent = { Database, Users, Github, Server }[project.icon] || Code;
                    return <IconComponent size={80} style={{ color: project.color }} className="opacity-20 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500" />;
                  })()}
                  <CrayonStroke color={project.color} className="absolute bottom-0 left-0 opacity-30" width="100%" height={24} />
                </div>

                <h3 className="text-4xl font-black mb-6">{project.title}</h3>
                <p className="text-gray-600 mb-12 flex-grow text-xl leading-relaxed font-light">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2 text-xs font-black uppercase rounded bg-gray-100 text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-64 scroll-mt-48">
          <div className="mb-24 flex items-baseline gap-10">
            <h2 className="text-6xl font-black">Professional Path</h2>
            <CrayonStroke color={COLORS.leafGreen} width={500} height={20} />
          </div>

          <div className="relative ml-6 md:ml-16 pl-16 md:pl-24 space-y-32 py-10">
            {/* Sketched Timeline Line */}
            <CrayonStroke
              color={COLORS.charcoalInk}
              isVertical
              className="absolute left-8 md:left-16 top-0 h-full w-3 opacity-10 pointer-events-none"
            />

            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div
                  className="absolute left-[-150px] md:left-[-190px] top-0 w-40 h-40 sketch-border-soft flex items-center justify-center bg-white shadow-2xl z-10 overflow-hidden p-5"
                  style={{ borderColor: exp.color, borderWidth: '4px' }}
                >
                  {exp.logo ? (
                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-12 h-12 opacity-80" style={{ backgroundColor: exp.color, borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
                  )}
                  <CrayonStroke color={exp.color} className="absolute -z-10 rotate-45" width={220} opacity={0.4} />
                </div>

                <div className="max-w-5xl relative group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                    <h3 className="text-4xl font-black group-hover:text-[#2E86DE] transition-colors">{exp.role}</h3>
                    <div className="relative">
                      <span className="px-6 py-3 bg-white sketch-border-soft text-sm font-black tracking-[0.2em] shadow-md z-10 relative">{exp.period}</span>
                      <CrayonStroke color={exp.color} className="absolute -bottom-2 -right-3" width={140} opacity={0.3} />
                    </div>
                  </div>
                  <h4 className="text-3xl text-[#2E86DE] font-black mb-10 flex items-center gap-6">
                    {exp.company}
                    {i === 0 && <span className="font-handwriting text-2xl text-[#E94B3C] animate-bounce px-4 py-1 bg-[#E94B3C]/5 rounded-full">Current Role 🚀</span>}
                  </h4>
                  <ul className="space-y-8">
                    {exp.description.map((point, pi) => (
                      <li key={pi} className="flex gap-6 text-gray-700 text-2xl leading-relaxed font-light">
                        <span className="mt-4 flex-shrink-0 w-4 h-4 rounded-full opacity-50 shadow-inner" style={{ backgroundColor: exp.color }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="mb-64">
          <motion.div
            initial={{ rotate: -1 }}
            whileInView={{ rotate: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            className="relative max-w-5xl mx-auto py-32 px-16 md:px-32 bg-white sketch-border-soft shadow-[40px_40px_0px_0px_rgba(0,0,0,0.03)] group"
          >
            <div className="absolute -top-12 left-20 p-6 bg-[#F2C94C] sketch-border rotate-[-15deg] font-handwriting text-4xl z-10 shadow-2xl transition-all group-hover:rotate-[-5deg] group-hover:scale-110">
              Sticky Notes 📌
              <CrayonStroke color={COLORS.charcoalInk} className="absolute -bottom-2 left-3" width={120} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-handwriting text-gray-800 leading-snug mb-16 italic font-medium">
                  "{TESTIMONIALS[testimonialIdx].quote}"
                </p>
                <div className="flex flex-col items-center">
                  <div className="relative mb-8">
                    <div
                      className="w-24 h-3 rounded-full"
                      style={{ backgroundColor: TESTIMONIALS[testimonialIdx].color }}
                    />
                    <CrayonStroke color={TESTIMONIALS[testimonialIdx].color} width={120} className="absolute top-3" />
                  </div>
                  <h4 className="font-black text-3xl mb-2">{TESTIMONIALS[testimonialIdx].author}</h4>
                  <p className="text-gray-400 text-sm font-black uppercase tracking-[0.4em]">{TESTIMONIALS[testimonialIdx].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-y-0 -left-10 md:-left-20 flex items-center">
              <button
                onClick={prevTestimonial}
                className="p-5 bg-white sketch-border hover:bg-gray-50 transition-all shadow-2xl active:scale-90"
              >
                <ChevronLeft size={40} />
              </button>
            </div>
            <div className="absolute inset-y-0 -right-10 md:-right-20 flex items-center">
              <button
                onClick={nextTestimonial}
                className="p-5 bg-white sketch-border hover:bg-gray-50 transition-all shadow-2xl active:scale-90"
              >
                <ChevronRight size={40} />
              </button>
            </div>
          </motion.div>
        </section>

        {/* Referees Section */}
        <section id="referees" className="mb-64">
          <div className="mb-24 flex items-center gap-10">
            <h2 className="text-6xl font-black flex items-center gap-6 whitespace-nowrap">
              <Users size={50} className="text-[#27AE60]" /> Referees
            </h2>
            <CrayonStroke color={COLORS.leafGreen} width="100%" height={20} />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {REFEREES.map((ref, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-12 sketch-border flex flex-col shadow-xl border-t-[10px] relative overflow-hidden"
                style={{ borderTopColor: idx % 2 === 0 ? COLORS.oceanBlue : COLORS.waxRed }}
              >
                <h3 className="text-3xl font-black mb-2">{ref.name}</h3>
                <p className="text-[#2E86DE] font-bold text-2xl mb-10">{ref.role}</p>
                <div className="space-y-6 text-gray-600 font-medium z-10">
                  <p className="flex items-center gap-4 text-xl"><Users size={24} className="opacity-40" /> {ref.organization}</p>
                  <p className="flex items-center gap-4 text-xl underline decoration-dotted"><Mail size={24} className="opacity-40" /> {ref.email}</p>
                  <p className="flex items-center gap-4 text-xl"><Phone size={24} className="opacity-40" /> {ref.phone}</p>
                </div>
                <CrayonStroke
                  color={idx % 2 === 0 ? COLORS.oceanBlue : COLORS.waxRed}
                  className="absolute bottom-[-15px] right-[-30px] opacity-10 rotate-[-15deg]"
                  width={250}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-48 relative scroll-mt-48">
          <div className="bg-[#1E1E1E] text-[#FAFAF7] p-12 md:p-32 sketch-border relative overflow-hidden shadow-[40px_40px_0px_0px_rgba(30,30,30,0.05)]">
            <div className="absolute top-0 left-0 right-0 h-10 bg-[#FAFAF7]" style={{ clipPath: 'polygon(0% 0%, 3% 100%, 7% 10%, 10% 90%, 14% 20%, 18% 100%, 22% 30%, 25% 90%, 29% 10%, 33% 80%, 37% 20%, 41% 100%, 45% 30%, 49% 90%, 53% 10%, 57% 100%, 61% 20%, 65% 90%, 69% 30%, 73% 100%, 77% 10%, 81% 90%, 85% 20%, 89% 100%, 93% 30%, 97% 90%, 100% 0%)' }} />

            <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center text-left">
              <div className="space-y-16">
                <motion.h2
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-8xl font-black leading-[1.1]"
                >
                  Let's build <br /> something <span className="text-[#F2C94C] relative inline-block">
                    impactful.
                    <CrayonStroke color={COLORS.goldenYellow} className="absolute -bottom-6 left-0" width="100%" height={30} />
                  </span>
                </motion.h2>

                <div className="space-y-12">
                  <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-lg">
                    Ready to collaborate on AI solutions, scalable architectures, or data analysis. Reach out and let's sketch out the roadmap.
                  </p>
                  <div className="space-y-8 font-black text-2xl md:text-3xl">
                    <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-6 hover:text-[#F2C94C] transition-all group">
                      <Mail size={40} className="text-[#F2C94C] group-hover:scale-110 transition-transform" />
                      <span>{CONTACT.email}</span>
                    </a>
                    <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex items-center gap-6 hover:text-[#F2C94C] transition-all group">
                      <Phone size={40} className="text-[#F2C94C] group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 uppercase tracking-widest">+254</span>
                        <span>758 301 141</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-12 w-full">
                <motion.a
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${CONTACT.email}`}
                  aria-label="Send Jesse an Email"
                  className="w-full lg:w-80 p-12 md:p-16 bg-[#F2C94C] text-[#1E1E1E] sketch-border-soft flex flex-col items-center justify-center gap-6 shadow-2xl hover:bg-yellow-400 transition-all rounded-3xl"
                >
                  <span className="text-3xl font-black uppercase tracking-[0.2em] text-center">Say <br /> Hello</span>
                  <Mail size={56} />
                </motion.a>

                <div className="flex gap-6 relative">
                  <a href={CONTACT.hackerrank} className="w-20 h-20 md:w-24 md:h-24 bg-white/5 border border-white/20 flex items-center justify-center rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-2" aria-label="HackerRank">
                    <HackerRankIcon size={40} />
                  </a>
                  <a href={CONTACT.github} className="w-20 h-20 md:w-24 md:h-24 bg-white/5 border border-white/20 flex items-center justify-center rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-2" aria-label="GitHub">
                    <Github size={40} />
                  </a>
                  <a href={CONTACT.linkedin} className="w-20 h-20 md:w-24 md:h-24 bg-white/5 border border-white/20 flex items-center justify-center rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-2" aria-label="LinkedIn">
                    <Linkedin size={40} />
                  </a>
                  <CrayonStroke color={COLORS.goldenYellow} className="absolute -bottom-10 right-0 opacity-10" width={150} />
                </div>
              </div>
            </div>

            <div className="mt-32 pt-16 border-t border-white/5 font-handwriting text-3xl text-gray-500 opacity-30 italic text-center">
              Jesse Kidula • Nairobi • 2026
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="px-6 py-32 md:px-12 border-t border-gray-100 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20">
          <div className="text-left space-y-4">
            <div className="flex items-center gap-2">
              <img src="/jesse_identity.jpg" alt="Jesse Identity" className="h-10 w-auto object-contain rounded-sm" />
            </div>
            <p className="text-gray-400 text-xl italic font-handwriting">Engineering, drawn by curiosity.</p>
          </div>

          <div className="text-center space-y-6">
            <div className="text-gray-400 font-black uppercase tracking-[0.4em] text-sm flex items-center justify-center gap-4">
              Built with React & Wax
              <span className="w-6 h-6 rounded-full bg-[#E94B3C] inline-block animate-pulse shadow-md" />
            </div>
            <p className="text-sm text-gray-300 font-black tracking-widest uppercase">© 2026 JESSE KIDULA. SKETCHED WITH PRIDE.</p>
          </div>

          <div className="flex gap-12">
            {[
              { label: 'GitHub', href: CONTACT.github, icon: Github },
              { label: 'LinkedIn', href: CONTACT.linkedin, icon: Linkedin },
              { label: 'GitLab', href: CONTACT.gitlab, icon: Gitlab }
            ].map(social => (
              <a
                key={social.label}
                href={social.href}
                className="text-xs font-black uppercase tracking-[0.3em] hover:text-[#2E86DE] transition-all hover:-translate-y-2 relative group flex items-center gap-2"
              >
                <social.icon size={16} />
                {social.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2E86DE] transition-all group-hover:w-full opacity-30" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
