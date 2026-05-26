import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PortfolioView from './components/PortfolioView';
import AdminPanel from './components/AdminPanel';
import { Profile, Skill, Project, Service, ContactMessage } from './types';
import { 
  DEFAULT_PROFILE, 
  DEFAULT_SKILLS, 
  DEFAULT_PROJECTS, 
  DEFAULT_SERVICES, 
  DEFAULT_MESSAGES 
} from './data';

// Local storage key constants
const KEY_PROFILE = 'wp_portfolio_profile';
const KEY_SKILLS = 'wp_portfolio_skills';
const KEY_PROJECTS = 'wp_portfolio_projects';
const KEY_SERVICES = 'wp_portfolio_services';
const KEY_MESSAGES = 'wp_portfolio_messages';

export default function App() {
  // Core Portfolio State hookup
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);
  const [messages, setMessages] = useState<ContactMessage[]>(DEFAULT_MESSAGES);

  // Administrative interface router toggler
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [activeScrollSection, setActiveScrollSection] = useState<string>('hero');

  // Load from local persistency on initialization mount
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem(KEY_PROFILE);
      if (storedProfile) setProfile(JSON.parse(storedProfile));

      const storedSkills = localStorage.getItem(KEY_SKILLS);
      if (storedSkills) setSkills(JSON.parse(storedSkills));

      const storedProjects = localStorage.getItem(KEY_PROJECTS);
      if (storedProjects) setProjects(JSON.parse(storedProjects));

      const storedServices = localStorage.getItem(KEY_SERVICES);
      if (storedServices) setServices(JSON.parse(storedServices));

      const storedMessages = localStorage.getItem(KEY_MESSAGES);
      if (storedMessages) setMessages(JSON.parse(storedMessages));
    } catch (e) {
      console.error('State retrieval error: Web sandbox local storage values are degraded.', e);
    }
  }, []);

  // Sync back state modifications dynamically
  const updateProfile = (newProfile: Profile) => {
    setProfile(newProfile);
    localStorage.setItem(KEY_PROFILE, JSON.stringify(newProfile));
  };

  const updateSkills = (newSkills: Skill[]) => {
    setSkills(newSkills);
    localStorage.setItem(KEY_SKILLS, JSON.stringify(newSkills));
  };

  const updateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem(KEY_PROJECTS, JSON.stringify(newProjects));
  };

  const updateServices = (newServices: Service[]) => {
    setServices(newServices);
    localStorage.setItem(KEY_SERVICES, JSON.stringify(newServices));
  };

  const updateMessages = (newMessages: ContactMessage[]) => {
    setMessages(newMessages);
    localStorage.setItem(KEY_MESSAGES, JSON.stringify(newMessages));
  };

  const resetAllPresets = () => {
    localStorage.removeItem(KEY_PROFILE);
    localStorage.removeItem(KEY_SKILLS);
    localStorage.removeItem(KEY_PROJECTS);
    localStorage.removeItem(KEY_SERVICES);
    localStorage.removeItem(KEY_MESSAGES);
    setProfile(DEFAULT_PROFILE);
    setSkills(DEFAULT_SKILLS);
    setProjects(DEFAULT_PROJECTS);
    setServices(DEFAULT_SERVICES);
    setMessages(DEFAULT_MESSAGES);
  };

  // Live client form message dispatch receiver
  const handleSendMessage = (messageData: Omit<ContactMessage, 'id' | 'timestamp' | 'isRead'>) => {
    const formattedTimestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      timestamp: formattedTimestamp,
      isRead: false,
      ...messageData
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem(KEY_MESSAGES, JSON.stringify(updated));
  };

  // Scroll observer to update active nav items
  useEffect(() => {
    if (isAdminMode) return;

    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 220; // offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveScrollSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminMode]);

  return (
    <div className="bg-[#07070a] select-none text-slate-100 min-h-screen relative font-sans selection:bg-indigo-600/30 selection:text-white leading-normal">
      {/* Universal Sticky Header Navigation */}
      <Navbar 
        profile={profile}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
        activeSection={activeScrollSection}
        setActiveSection={setActiveScrollSection}
      />

      {/* Main routing rendering views */}
      {isAdminMode ? (
        <AdminPanel 
          profile={profile}
          skills={skills}
          projects={projects}
          services={services}
          messages={messages}
          onUpdateProfile={updateProfile}
          onUpdateSkills={updateSkills}
          onUpdateProjects={updateProjects}
          onUpdateServices={updateServices}
          onUpdateMessages={updateMessages}
          onResetAll={resetAllPresets}
        />
      ) : (
        <PortfolioView 
          profile={profile}
          skills={skills}
          projects={projects}
          services={services}
          onSendMessage={handleSendMessage}
          scrollToSection={activeScrollSection}
        />
      )}
    </div>
  );
}
