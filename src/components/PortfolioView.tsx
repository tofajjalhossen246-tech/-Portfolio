import React, { useState, useEffect } from 'react';
import { 
  Puzzle, 
  Layout, 
  Cpu, 
  ShieldAlert, 
  Code, 
  Layers, 
  Zap, 
  Clock, 
  Shield, 
  Database, 
  Sparkles, 
  Send, 
  ArrowRight, 
  Github, 
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  Briefcase,
  Download,
  BookOpen,
  Award,
  Terminal,
  X,
  Eye,
  RefreshCw,
  Facebook,
  Linkedin,
  Twitter
} from 'lucide-react';
import { Profile, Skill, Project, Service, ContactMessage } from '../types';

// Dynamic Service Icon Helper
const ServiceIcon = ({ name, className }: { name: string; className?: string }) => {
  const iconProps = { className: className || "text-indigo-400", size: 22 };
  switch (name) {
    case 'Puzzle':
      return <Puzzle {...iconProps} />;
    case 'Layout':
      return <Layout {...iconProps} />;
    case 'Cpu':
      return <Cpu {...iconProps} />;
    case 'ShieldAlert':
      return <ShieldAlert {...iconProps} />;
    default:
      return <Code {...iconProps} />;
  }
};

interface PortfolioViewProps {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  services: Service[];
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'isRead'>) => void;
  scrollToSection: string;
}

export default function PortfolioView({
  profile,
  skills,
  projects,
  services,
  onSendMessage,
  scrollToSection
}: PortfolioViewProps) {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedTechFilter, setSelectedTechFilter] = useState<string>('All');
  
  // Custom interactive CV simulator
  const [cvDownloadProgress, setCvDownloadProgress] = useState<number>(-1);
  const [cvSuccessMessage, setCvSuccessMessage] = useState<boolean>(false);

  // Project Lightbox modal
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Typewriter simulated specialities
  const specialities = [
    "Headless WordPress Solutions",
    "Gutenberg Block Architect",
    "Enterprise PHP Core Engineer",
    "WooCommerce REST APIs Integration",
    "High-Performance Redis Caches"
  ];
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter implementation loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = specialities[typewriterIndex];
    
    const tick = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 1300);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setTypewriterIndex((prev) => (prev + 1) % specialities.length);
          return;
        }
      }
      
      const speed = isDeleting ? 30 : 60;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typewriterIndex]);

  // Simulated CV Downloader triggering
  const handleDownloadCV = () => {
    if (cvDownloadProgress >= 0) return; // already in action
    setCvDownloadProgress(0);
    setCvSuccessMessage(false);
    
    const interval = setInterval(() => {
      setCvDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCvSuccessMessage(true);
          setTimeout(() => {
            setCvDownloadProgress(-1);
            // open simulated print view or PDF template as proof of action
            window.print();
          }, 1800);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Direct contact message dispatching
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    onSendMessage(formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  // Unique list of technology tags across project objects for visual categories
  const allTechTags = Array.from(
    new Set(projects.flatMap(p => p.techStack))
  );

  const filteredProjects = selectedTechFilter === 'All'
    ? projects
    : projects.filter(p => p.techStack.includes(selectedTechFilter));

  const skillCategories = ['Core WordPress', 'Gutenberg & React', 'Languages', 'Tools & Workflows'] as const;

  // Custom mock chronological database records mimicking classic CV timelines
  const timelineExperience = [
    {
      id: 'tx-1',
      period: '2023 - Present',
      role: 'Lead WordPress & Gutenberg Engineer',
      company: 'OmniPublish Media Group',
      summary: 'Re-architected enterprise multisite network serving 8 million monthly unique visitors. Devised a React-based content block library reducing theme weight. Managed headless APIs routing custom WP queries via optimized Redis pipelines.'
    },
    {
      id: 'tx-2',
      period: '2021 - 2023',
      role: 'Senior Core WooCommerce Plugin Engineer',
      company: 'Apex Digital Storefronts',
      summary: 'Programmed robust OOP PHP extensions integrated directly into checkout Hooks. Designed secure multi-tenant payment gateways complying with strict Web Application Firewall rules.'
    },
    {
      id: 'tx-3',
      period: '2019 - 2021',
      role: 'WordPress Full-Stack Developer',
      company: 'PixelPerfect Solutions',
      summary: 'Pioneered custom integrations using ACF Pro hooks, Beaver Builder extensions, and dynamic SVG templates. Improved average Core Web Vitals score from 41 to 96 across 45+ clients.'
    }
  ];

  const timelineEducation = [
    {
      id: 'te-1',
      period: '2021',
      role: 'Certified VIP Standard Code Reviewer',
      company: 'WordPress VIP Academy',
      summary: 'Verified competency in enterprise-level WordPress caching protocols, DB indexing, query optimizations, security validations (nonces, DB sanitization), and multi-tenancy pipelines.'
    },
    {
      id: 'te-2',
      period: '2014 - 2018',
      role: 'B.Sc. in Computer Science',
      company: 'Technical University California',
      summary: 'Specialized in Object-Oriented Software Design patterns, Relational Databases (MariaDB, PostgreSQL), and Client-Side Scripting Frameworks.'
    }
  ];

  return (
    <div className="bg-[#08080c] text-zinc-300 min-h-screen py-6 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      
      {/* Dynamic Glow Accents */}
      <div className="absolute top-0 right-1/4 w-[35rem] h-[35rem] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-2/3 left-10 w-[25rem] h-[25rem] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Grid Split-Layout Frame inspired by Trueman */}
      <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* ==================== LEFT FLOATING DOSSIER SIDEBAR ==================== */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 bg-[#0e0e14] border border-zinc-900 rounded-2xl overflow-hidden p-6 space-y-6 shadow-xl shadow-black/40">
          
          {/* Avatar and Vital Details */}
          <div className="text-center relative">
            <div className="relative inline-block">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-indigo-600/30 shadow-indigo-600/10 shadow-2xl"
              />
              {/* Dynamic Status Indicator */}
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-[#0e0e14] rounded-full animate-bounce"></span>
            </div>

            <h2 className="font-sans font-extrabold text-slate-100 text-xl tracking-tight mt-4">
              {profile.name}
            </h2>
            <p className="font-mono text-xs text-indigo-400 mt-1 uppercase tracking-widest font-semibold">
              {profile.title}
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] mt-3 uppercase tracking-wider font-bold">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Hire</span>
            </div>
          </div>

          <hr className="border-zinc-800/80" />

          {/* Dossier Attributes Grid */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-0.5">
              <span className="text-zinc-500 font-mono">Residence:</span>
              <span className="text-slate-200 font-sans font-semibold">United States</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-zinc-500 font-mono">Region Base:</span>
              <span className="text-slate-200 font-sans font-semibold">{profile.location.split('(')[0]}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-zinc-500 font-mono">Languages:</span>
              <span className="text-slate-200 font-sans font-semibold">English (Native), German</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-zinc-500 font-mono">WP Core Rank:</span>
              <span className="text-indigo-400 font-mono font-bold tracking-tight">VIP Trusted Partner</span>
            </div>
          </div>

          <hr className="border-zinc-800/80" />

          {/* Core Knowledge circular dials (mock UI meters) */}
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase font-semibold">Specialty Metrics</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full border border-zinc-800 bg-zinc-950 text-[10px] font-mono text-indigo-400">
                  <span>98%</span>
                </div>
                <p className="text-[9px] text-zinc-500 mt-1 uppercase font-semibold">PHP Core</p>
              </div>
              <div>
                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full border border-zinc-800 bg-zinc-950 text-[10px] font-mono text-indigo-400">
                  <span>95%</span>
                </div>
                <p className="text-[9px] text-zinc-500 mt-1 uppercase font-semibold">Gutenberg</p>
              </div>
              <div>
                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full border border-zinc-800 bg-zinc-950 text-[10px] font-mono text-indigo-400">
                  <span>92%</span>
                </div>
                <p className="text-[9px] text-zinc-500 mt-1 uppercase font-semibold">Headless</p>
              </div>
            </div>
          </div>

          <hr className="border-zinc-800/80" />

          {/* Social Channels Link Row */}
          <div className="flex justify-between items-center text-zinc-400">
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">Dossier Channels</span>
            <div className="flex items-center space-x-3.5">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-100 transition-colors">
                <Github size={15} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                <Linkedin size={15} />
              </a>
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[#1da1f2] transition-colors">
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Interactive Resume download sequence with load indicators */}
          <div className="pt-2">
            {cvDownloadProgress >= 0 ? (
              <div className="space-y-1.5 p-3 rounded-xl bg-zinc-950/80 border border-indigo-500/20">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-indigo-400 animate-pulse uppercase tracking-widest font-bold">Bundling WP Dossier CV...</span>
                  <span className="text-white font-bold">{cvDownloadProgress}%</span>
                </div>
                <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-150"
                    style={{ width: `${cvDownloadProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : cvSuccessMessage ? (
              <div className="p-3 text-center text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <span>✓ CV Export Document Dispatched!</span>
              </div>
            ) : (
              <button
                onClick={handleDownloadCV}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-slate-100 hover:text-white text-xs font-mono font-bold rounded-xl border border-zinc-800 cursor-pointer transition-all active:translate-y-0.5"
              >
                <Download size={13} className="text-indigo-500" />
                <span>DOWNLOAD WP DOSSIER CV</span>
              </button>
            )}
          </div>

        </div>

        {/* ==================== RIGHT CONTENT SCROLL CHANNELS ==================== */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Hero Banner Grid Card */}
          <section id="hero" className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-[#101016] to-[#0c0c11] border border-zinc-900 overflow-hidden shadow-xl">
            {/* Background pattern layer */}
            <div className="absolute inset-0 bg-[radial-gradient(#232330_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>
            
            <div className="relative z-10 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[9px] uppercase tracking-wider font-bold">
                <Sparkles size={11} />
                <span>DEVELOPER DOSSIER</span>
              </span>

              <h1 className="font-sans text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
                Architecting High-Speed <br />
                WordPress Solutions
              </h1>

              {/* simulated typing text */}
              <div className="flex items-center gap-2 min-h-12">
                <span className="font-mono text-xs uppercase tracking-widest text-indigo-400 font-semibold">Specialization;</span>
                <span className="font-mono text-xs text-white border-r-2 border-indigo-500 pr-1 py-1 bg-zinc-950 px-3 rounded border border-zinc-900">
                  {currentText}
                </span>
              </div>

              <p className="text-zinc-400 text-sm max-w-xl leading-relaxed">
                {profile.tagline}. Every line of code is structured cleanly to optimize load-speed, secure databases, avoid bulky dashboard bloat, and comply with strict WP VIP standards.
              </p>

              <div className="flex flex-wrap gap-4 pt-1">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:translate-y-0.5 text-white text-xs font-semibold rounded-lg font-mono transition-all cursor-pointer"
                >
                  <span>Explore Cases</span>
                  <ArrowRight size={14} />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 text-xs font-semibold rounded-lg border border-zinc-800 font-mono transition-all cursor-pointer"
                >
                  <span>Initiate Inquiry</span>
                </a>
              </div>
            </div>
          </section>

          {/* Quick stats grid blocks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-[#0e0e14] border border-zinc-900/80 rounded-xl text-center space-y-1">
              <span className="font-mono text-2xl font-bold text-slate-100">{profile.yearsOfExperience}+</span>
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">Years Experience</p>
            </div>
            <div className="p-4 bg-[#0e0e14] border border-zinc-900/80 rounded-xl text-center space-y-1">
              <span className="font-mono text-2xl font-bold text-indigo-400">100/100</span>
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">Google PageSpeed</p>
            </div>
            <div className="p-4 bg-[#0e0e14] border border-zinc-900/80 rounded-xl text-center space-y-1">
              <span className="font-mono text-2xl font-bold text-emerald-400">{profile.completedProjects}+</span>
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">Projects Completed</p>
            </div>
            <div className="p-4 bg-[#0e0e14] border border-zinc-900/80 rounded-xl text-center space-y-1">
              <span className="font-mono text-2xl font-bold text-slate-100">{profile.happyClients}%</span>
              <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">Client Loyalty Rate</p>
            </div>
          </div>

          {/* About Section */}
          <section id="about" className="space-y-6">
            <div className="flex items-center space-x-3">
              <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
              <h2 className="font-sans text-xl font-extrabold text-slate-100 tracking-tight">Biography & Philosophy</h2>
            </div>
            
            <div className="p-6 md:p-8 rounded-2xl bg-[#0e0e14] border border-zinc-900 space-y-5">
              <p className="text-slate-300 text-sm leading-relaxed">
                {profile.bio}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-sans text-xs font-bold text-slate-200">Strict VIP Code compliance</h4>
                    <p className="text-[10px] text-zinc-500">Avoiding arbitrary database update queries and loops.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle size={15} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-sans text-xs font-bold text-slate-200">Fluid Gutenberg block schemas</h4>
                    <p className="text-[10px] text-zinc-500">Building customized layout blocks with modern React.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Services Section */}
          <section id="services" className="space-y-6">
            <div className="flex items-center space-x-3">
              <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
              <h2 className="font-sans text-xl font-extrabold text-slate-100 tracking-tight">Consultant Packages</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {services.map((srv) => (
                <div 
                  key={srv.id}
                  className="p-5 rounded-xl bg-[#0e0e14] border border-zinc-900 hover:border-zinc-800 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center group-hover:border-indigo-500/20 transition-all">
                      <ServiceIcon name={srv.iconName} />
                    </div>
                    <h3 className="font-sans font-bold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 flex justify-between items-center bg-zinc-950/20 p-2 rounded">
                    <span>{srv.priceEstimate || "T&M Rate"}</span>
                    <span className="text-indigo-400 font-semibold">{srv.deliveryTime || "TBD"}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timelines experiences and education (Chronologies inspired by Trueman) */}
          <section id="timelines" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Experience timeline column */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                  <Briefcase size={16} className="text-indigo-400" />
                  <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-200">Work experience</h3>
                </div>

                <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-800">
                  {timelineExperience.map((item) => (
                    <div key={item.id} className="relative pl-7 space-y-1.5 group">
                      {/* node point indicator */}
                      <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-950 border-2 border-zinc-800 group-hover:border-indigo-500 transition-colors"></span>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900">{item.period}</span>
                        <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{item.company}</span>
                      </div>
                      
                      <h4 className="font-sans font-extrabold text-xs text-slate-200 group-hover:text-slate-100 transition-colors">{item.role}</h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{item.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education timeline column */}
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-3">
                  <BookOpen size={16} className="text-indigo-400" />
                  <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-slate-200">Credentials & Ed</h3>
                </div>

                <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-800">
                  {timelineEducation.map((item) => (
                    <div key={item.id} className="relative pl-7 space-y-1.5 group">
                      <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-950 border-2 border-zinc-800 group-hover:border-indigo-500 transition-colors"></span>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900">{item.period}</span>
                        <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{item.company}</span>
                      </div>
                      
                      <h4 className="font-sans font-extrabold text-xs text-slate-200 group-hover:text-slate-100 transition-colors">{item.role}</h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{item.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Hard Skills Matrix */}
          <section id="skills" className="space-y-6">
            <div className="flex items-center space-x-3">
              <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
              <h2 className="font-sans text-xl font-extrabold text-slate-100 tracking-tight">Engine Proficiency</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {skillCategories.map((catKey) => {
                const grouped = skills.filter(sk => sk.category === catKey);
                return (
                  <div key={catKey} className="p-5 rounded-xl bg-[#0e0e14] border border-zinc-900 space-y-4">
                    <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                      <span className="w-1 h-2 bg-indigo-500 rounded-sm"></span>
                      {catKey}
                    </h3>
                    <div className="space-y-3.5">
                      {grouped.map((item) => (
                        <div key={item.id} className="space-y-1">
                          <div className="flex justify-between items-center text-[11px] font-sans">
                            <span className="text-zinc-300 font-medium">{item.name}</span>
                            <span className="font-mono text-zinc-500">{item.proficiency}%</span>
                          </div>
                          <div className="h-1 bg-zinc-950 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-600 rounded-full transition-all duration-[1200ms]"
                              style={{ width: `${item.proficiency}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Project Showcases */}
          <section id="projects" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
                <h2 className="font-sans text-xl font-extrabold text-slate-100 tracking-tight">Selected Work</h2>
              </div>
              
              {/* filter triggers */}
              <div className="flex flex-wrap gap-1.5">
                {['All', ...allTechTags.slice(0, 4)].map((badge) => (
                  <button
                    key={badge}
                    onClick={() => setSelectedTechFilter(badge)}
                    className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                      selectedTechFilter === badge
                        ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                        : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-slate-200 hover:border-zinc-800'
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid display products cases */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredProjects.map((proj) => (
                <div 
                  key={proj.id}
                  className="rounded-xl overflow-hidden bg-[#0e0e14] border border-zinc-900 hover:border-zinc-800 transition-all flex flex-col justify-between group cursor-pointer"
                  onClick={() => setActiveModalProject(proj)}
                  title="Expand technical analysis details"
                >
                  <div className="relative h-44 overflow-hidden bg-zinc-950">
                    <img 
                      src={proj.imageUrl} 
                      alt={proj.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {proj.isFeatured && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-600 text-[9px] font-mono font-bold uppercase text-white shadow shadow-indigo-600/40">
                        <Award size={10} />
                        Featured Build
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 text-[9px] font-mono text-indigo-300 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-908">
                      {proj.completionDate}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-sans font-extrabold text-sm text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-500 uppercase">{proj.subtitle}</p>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* badges and meta tags */}
                  <div className="p-4 pt-0 space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.slice(0, 3).map(tech => (
                        <span key={tech} className="px-1.5 py-0.5 rounded bg-zinc-950 text-[9px] font-mono text-zinc-500 border border-zinc-900">
                          {tech}
                        </span>
                      ))}
                      {proj.techStack.length > 3 && (
                        <span className="text-[9px] font-mono text-zinc-600 p-0.5">+{proj.techStack.length - 3} more</span>
                      )}
                    </div>

                    <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-indigo-400">
                      <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <span>Details Analysis</span>
                        <ArrowRight size={10} />
                      </span>
                      <span className="text-zinc-600 font-sans text-[9px]">Click image to view inline analysis</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Inquiry Section */}
          <section id="contact" className="space-y-6">
            <div className="flex items-center space-x-3">
              <span className="w-1.5 h-4 bg-indigo-500 rounded-full"></span>
              <h2 className="font-sans text-xl font-extrabold text-slate-100 tracking-tight">Direct SMTP Inquiry Core</h2>
            </div>

            <div className="grid md:grid-cols-12 gap-6 items-start bg-[#0e0e14] border border-zinc-900 rounded-2xl p-6 md:p-8">
              
              {/* details column */}
              <div className="md:col-span-5 space-y-5">
                <div>
                  <h3 className="font-sans font-bold text-sm text-slate-200">Let\'s collaborate</h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Have a corporate Gutenberg migrate, High-Scale Redis server optimization, or WPGraphQL plugin requirement to build?
                  </p>
                </div>

                <div className="space-y-3 font-mono text-[11px]">
                  <div className="flex items-center gap-2.5">
                    <Mail size={12} className="text-indigo-400" />
                    <a href={`mailto:${profile.email}`} className="text-zinc-400 hover:text-white">{profile.email}</a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone size={12} className="text-indigo-400" />
                    <span className="text-zinc-400">{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin size={12} className="text-indigo-400" />
                    <span className="text-zinc-400">{profile.location.split('(')[0]}</span>
                  </div>
                </div>

                {/* alert details */}
                <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-900 text-[10px] text-zinc-500 space-y-1">
                  <p className="font-bold text-indigo-400 font-mono">CLIENT PORTAL MECHANISM:</p>
                  <p>Inquiries sent here are instantly serialized to the client messages queue. Enable <strong>Admin Panel</strong> at the top to respond virtual mails!</p>
                </div>
              </div>

              {/* Form submit column */}
              <div className="md:col-span-7">
                {isSubmitted ? (
                  <div className="text-center py-10 space-y-3 bg-zinc-950/50 border border-zinc-900 rounded-xl">
                    <CheckCircle size={30} className="text-emerald-500 mx-auto animate-bounce" />
                    <h4 className="font-sans font-bold text-sm text-slate-200">Message Dispatched successfully!</h4>
                    <p className="text-[11px] text-zinc-500 max-w-sm mx-auto">
                      Inquiry has been serialized to local repository safely. Review incoming feedback under the Admin dashboard modules instantly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-1 bg-zinc-950/40 p-2.5 rounded border border-zinc-900 focus-within:border-indigo-500 transition-colors">
                        <label htmlFor="user-name" className="text-[8px] font-mono uppercase text-zinc-500 block font-bold">Client Name *</label>
                        <input
                          id="user-name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-transparent text-xs text-slate-200 outline-none mt-0.5"
                          placeholder="Sarah Jenkins"
                        />
                      </div>
                      <div className="space-y-1 bg-zinc-950/40 p-2.5 rounded border border-zinc-900 focus-within:border-indigo-500 transition-colors">
                        <label htmlFor="user-email" className="text-[8px] font-mono uppercase text-zinc-500 block font-bold">Target Email *</label>
                        <input
                          id="user-email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-transparent text-xs text-slate-200 outline-none mt-0.5"
                          placeholder="sarah@corp.io"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 bg-zinc-950/40 p-2.5 rounded border border-zinc-900 focus-within:border-indigo-500 transition-colors">
                      <label htmlFor="user-subject" className="text-[8px] font-mono uppercase text-zinc-500 block font-bold">Inquiry Subject</label>
                      <input
                        id="user-subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-xs text-slate-200 outline-none mt-0.5"
                        placeholder="e.g., Headless CMS Consultation"
                      />
                    </div>

                    <div className="space-y-1 bg-zinc-950/40 p-2.5 rounded border border-zinc-900 focus-within:border-indigo-500 transition-colors">
                      <label htmlFor="user-message" className="text-[8px] font-mono uppercase text-zinc-500 block font-bold">Detailed Brief *</label>
                      <textarea
                        id="user-message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-xs text-slate-200 outline-none mt-1 resize-none"
                        placeholder="Describe system parameters, deliverable bounds..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold rounded-xl transition-all cursor-pointer"
                    >
                      <Send size={11} />
                      <span>DISPATCH INQUIRY STREAM</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

        </div>

      </div>

      {/* Professional Footer */}
      <footer className="mt-20 pt-12 pb-6 border-t border-zinc-900 text-center space-y-2">
        <div className="flex justify-center items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          <span className="font-mono text-[10px] text-zinc-500">Alex Mercer Portfolio • Real-Time Persistency Engine</span>
        </div>
        <p className="text-[9px] text-zinc-600 max-w-lg mx-auto font-mono uppercase tracking-widest leading-relaxed">
          Z-Index layouts • Fully Responsive Trueman-theme clone • Built on PHP & React Standard Principles
        </p>
      </footer>

      {/* ==================== PROJECT DETAILS LIGHTBOX MODAL ==================== */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e14] border border-zinc-900 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl shadow-indigo-600/5 my-8">
            
            {/* Modal sticky top */}
            <div className="p-4 sm:p-5 border-b border-zinc-900 flex justify-between items-center bg-[#101016]">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded bg-indigo-600/10 border border-indigo-600/20 text-[9px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                  Technical Case Brief
                </span>
                <h3 className="font-sans font-black text-slate-100 text-base mt-1">{activeModalProject.title}</h3>
              </div>
              <button 
                onClick={() => setActiveModalProject(null)}
                className="w-9 h-9 rounded-full bg-zinc-905 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Close brief dialog"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal main content fields */}
            <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              
              <div className="relative h-64 rounded-xl overflow-hidden bg-zinc-950">
                <img 
                  src={activeModalProject.imageUrl} 
                  alt={activeModalProject.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              <div className="grid md:grid-cols-12 gap-6">
                
                {/* Meta details column */}
                <div className="md:col-span-4 space-y-4 font-mono text-xs">
                  <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl space-y-2">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Details</p>
                    <hr className="border-zinc-900" />
                    <div className="space-y-1.5 text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Completed:</span>
                        <span className="text-slate-300 font-bold">{activeModalProject.completionDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Framework:</span>
                        <span className="text-indigo-400">Headless API</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Security:</span>
                        <span className="text-emerald-400">Escaped PHP</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl space-y-2">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Tech Deck</p>
                    <hr className="border-zinc-900" />
                    <div className="flex flex-wrap gap-1">
                      {activeModalProject.techStack.map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 rounded bg-zinc-900 text-[9px] text-zinc-400 border border-zinc-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* technical narrative analysis column */}
                <div className="md:col-span-8 space-y-4 text-xs font-sans">
                  <h4 className="text-[10px] uppercase font-mono font-extrabold tracking-wider text-indigo-400">Case breakdown</h4>
                  <p className="text-slate-300 leading-relaxed">
                    {activeModalProject.description}
                  </p>

                  <h4 className="text-[10px] uppercase font-mono font-extrabold tracking-wider text-indigo-400 pt-1">Deliverables & Outcomes</h4>
                  <ul className="space-y-2 pl-3 list-disc text-zinc-400">
                    <li>Developed custom OOP PHP modules integrating REST Webhook payloads safely.</li>
                    <li>Introduced Redis relational cache tagging to query arrays with sub-0.1s page responses.</li>
                    <li>Designed an adaptive user-settings database store with custom nonces.</li>
                  </ul>

                  {/* interactive custom hooks preview box inside modal */}
                  <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-900 space-y-1.5 font-mono text-[9px]">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500">SYSTEM EXPORT LOG: custom_hooks.php</span>
                      <span className="text-[#a78bfa]">PHP-8.2</span>
                    </div>
                    <pre className="text-slate-400 overflow-x-auto p-2 bg-[#050508] rounded border border-zinc-900 max-h-24">
{`add_filter('woocommerce_add_to_cart_redirect', function($url) {
    if (defined('WP_SANDBOX_HEADLESS')) {
        return esc_url_raw(site_url('/api/graphql/v1/checkout'));
    }
    return $url;
}, 10, 1);`}
                    </pre>
                  </div>
                </div>

              </div>

              {/* anchor redirection lines */}
              <div className="pt-4 border-t border-zinc-900 flex flex-wrap gap-4 justify-end">
                {activeModalProject.liveUrl && (
                  <a 
                    href={activeModalProject.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-mono font-bold rounded-lg transition-colors"
                  >
                    <ExternalLink size={12} />
                    <span>Launch Live Showcase</span>
                  </a>
                )}
                {activeModalProject.githubUrl && (
                  <a 
                    href={activeModalProject.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[11px] font-mono font-bold rounded-lg border border-zinc-850 transition-colors"
                  >
                    <Github size={12} />
                    <span>Verify Code Repository</span>
                  </a>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
