import React from 'react';
import { Terminal, ShieldAlert, Sliders, Eye, Code, Github, Linkedin, Twitter } from 'lucide-react';
import { Profile } from '../types';

interface NavbarProps {
  profile: Profile;
  isAdminMode: boolean;
  setIsAdminMode: (isAdmin: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({
  profile,
  isAdminMode,
  setIsAdminMode,
  activeSection,
  setActiveSection,
}: NavbarProps) {
  const scrollTo = (id: string) => {
    setIsAdminMode(false);
    setActiveSection(id);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#09090c]/85 backdrop-blur-md border-b border-gray-800/60" id="main_navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 font-mono text-sm">
              &lt;WP/&gt;
            </div>
            <div>
              <span className="font-sans font-bold text-slate-100 tracking-tight block leading-none">
                {profile.name}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 tracking-widest block mt-1 uppercase">
                WP Core Engineer
              </span>
            </div>
          </div>

          {/* Nav Items (Visible when NOT in admin mode, click scrolls to sections) */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAdminMode ? (
              <>
                {['about', 'services', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className={`font-sans text-xs uppercase tracking-widest transition-colors cursor-pointer ${
                      activeSection === item
                        ? 'text-indigo-400 font-semibold'
                        : 'text-zinc-400 hover:text-slate-100'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </>
            ) : (
              <span className="text-emerald-500 font-mono text-xs flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ACTIVE WORKSPACE: PORTFOLIO DESIGNER
              </span>
            )}
          </div>

          {/* Admin Toggle / Right Section */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 text-zinc-500">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-100 transition-colors">
                <Github size={16} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-100 transition-colors">
                <Linkedin size={16} />
              </a>
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-slate-100 transition-colors">
                <Twitter size={16} />
              </a>
            </div>

            <div className="h-6 w-[1px] bg-zinc-800 hidden sm:block"></div>

            {/* Admin Switcher Widget */}
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 cursor-pointer ${
                isAdminMode
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500 shadow-lg shadow-indigo-600/20'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
              }`}
              title={isAdminMode ? "Switch to Portfolio View" : "Open Workspace Settings"}
              id="admin_mode_toggle_btn"
            >
              {isAdminMode ? (
                <>
                  <Eye size={14} />
                  <span>PUBLIC VIEW</span>
                </>
              ) : (
                <>
                  <Sliders size={14} className="text-indigo-400" />
                  <span>ADMIN PANEL</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
