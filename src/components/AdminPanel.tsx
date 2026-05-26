import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  Puzzle, 
  Wrench, 
  Mail, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  RotateCcw, 
  Sliders, 
  Eye, 
  Terminal, 
  PlusCircle, 
  AlertCircle,
  FileText,
  BookmarkCheck,
  CheckCircle2,
  ListRestart,
  Layout,
  Cpu,
  ShieldAlert
} from 'lucide-react';
import { Profile, Skill, Project, Service, ContactMessage } from '../types';

interface AdminPanelProps {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  services: Service[];
  messages: ContactMessage[];
  onUpdateProfile: (profile: Profile) => void;
  onUpdateSkills: (skills: Skill[]) => void;
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateServices: (services: Service[]) => void;
  onUpdateMessages: (messages: ContactMessage[]) => void;
  onResetAll: () => void;
}

export default function AdminPanel({
  profile,
  skills,
  projects,
  services,
  messages,
  onUpdateProfile,
  onUpdateSkills,
  onUpdateProjects,
  onUpdateServices,
  onUpdateMessages,
  onResetAll,
}: AdminPanelProps) {
  // Active Tab
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'services' | 'skills' | 'messages' | 'system'>('profile');

  // Success Notification banner helper
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const triggerBanner = (message: string) => {
    setSaveStatus(message);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // --- Profile state and editor ---
  const [profileForm, setProfileForm] = useState<Profile>({ ...profile });
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const numVal = type === 'number' ? parseFloat(value) || 0 : value;
    setProfileForm(prev => ({ ...prev, [name]: numVal }));
  };
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    triggerBanner('Administrator settings: Profile variables updated successfully');
  };

  // --- Services states and logic ---
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<Service, 'id'>>({
    title: '',
    description: '',
    iconName: 'Puzzle',
    priceEstimate: '',
    deliveryTime: ''
  });
  const handleAddOrEditService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.description) return;

    if (editingServiceId) {
      // Edit mode
      const updated = services.map(s => s.id === editingServiceId ? { ...s, ...serviceForm } : s);
      onUpdateServices(updated);
      setEditingServiceId(null);
      triggerBanner('Services registry: Service package details updated');
    } else {
      // Add mode
      const newService: Service = {
        id: `sv-${Date.now()}`,
        ...serviceForm
      };
      onUpdateServices([...services, newService]);
      triggerBanner('Services registry: New service offering deployed');
    }
    // reset form
    setServiceForm({ title: '', description: '', iconName: 'Puzzle', priceEstimate: '', deliveryTime: '' });
  };
  const handleEditServiceClick = (service: Service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      title: service.title,
      description: service.description,
      iconName: service.iconName,
      priceEstimate: service.priceEstimate || '',
      deliveryTime: service.deliveryTime || ''
    });
  };
  const handleDeleteService = (id: string) => {
    if (confirm('Verify: Deprecate and remove this custom service?')) {
      onUpdateServices(services.filter(s => s.id !== id));
      triggerBanner('Services registry: Service deleted from registry');
    }
  };

  // --- Skills states and logic ---
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    name: '',
    category: 'Core WordPress',
    proficiency: 85
  });
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;
    const skillItem: Skill = {
      id: `sk-${Date.now()}`,
      name: newSkill.name.trim(),
      category: newSkill.category,
      proficiency: newSkill.proficiency
    };
    onUpdateSkills([...skills, skillItem]);
    setNewSkill({ name: '', category: 'Core WordPress', proficiency: 85 });
    triggerBanner(`WP Skills queue: Loaded skill asset "${skillItem.name}"`);
  };
  const handleSkillLevelChange = (id: string, value: number) => {
    const updated = skills.map(sk => sk.id === id ? { ...sk, proficiency: value } : sk);
    onUpdateSkills(updated);
  };
  const handleDeleteSkill = (id: string) => {
    onUpdateSkills(skills.filter(sk => sk.id !== id));
    triggerBanner('WP Skills queue: Deprecatory level action complete');
  };

  // --- Projects states and logic ---
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Omit<Project, 'id'>>({
    title: '',
    subtitle: '',
    description: '',
    techStack: [],
    imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=650&auto=format&fit=crop',
    liveUrl: '',
    githubUrl: '',
    isFeatured: false,
    completionDate: '2026-05'
  });
  const [techInput, setTechInput] = useState('');

  const handleAddTechBadge = () => {
    if (!techInput.trim()) return;
    if (!projectForm.techStack.includes(techInput.trim())) {
      setProjectForm(prev => ({ ...prev, techStack: [...prev.techStack, techInput.trim()] }));
    }
    setTechInput('');
  };

  const handleRemoveTechBadge = (tech: string) => {
    setProjectForm(prev => ({ ...prev, techStack: prev.techStack.filter(t => t !== tech) }));
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      alert('Verification Failed: Title & Descriptions are required');
      return;
    }

    if (editingProjectId) {
      const updated = projects.map(p => p.id === editingProjectId ? { ...p, ...projectForm } : p);
      onUpdateProjects(updated);
      setEditingProjectId(null);
      triggerBanner('Portfolio assets: Project changes compiled and active');
    } else {
      const added: Project = {
        id: `pr-${Date.now()}`,
        ...projectForm
      };
      onUpdateProjects([...projects, added]);
      triggerBanner('Portfolio assets: New dynamic case study linked');
    }

    // reset project form
    setProjectForm({
      title: '',
      subtitle: '',
      description: '',
      techStack: [],
      imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=650&auto=format&fit=crop',
      liveUrl: '',
      githubUrl: '',
      isFeatured: false,
      completionDate: '2026-05'
    });
  };

  const handleEditProjectClick = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      subtitle: proj.subtitle,
      description: proj.description,
      techStack: proj.techStack,
      imageUrl: proj.imageUrl,
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      isFeatured: proj.isFeatured,
      completionDate: proj.completionDate
    });
    // Move layout window focus down or state handle
    triggerBanner(`Mock Edit target set: ${proj.title}`);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Acknowledge: Irreversible destruction of selected case content. Delete?')) {
      onUpdateProjects(projects.filter(p => p.id !== id));
      triggerBanner('Portfolio assets: Project deleted from showcase database');
    }
  };

  // --- Client messages inbox logic ---
  const handleToggleMessageState = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, isRead: !m.isRead } : m);
    onUpdateMessages(updated);
    triggerBanner('Inquiry pipeline: Message read state toggled');
  };
  const handleDeleteMessage = (id: string) => {
    onUpdateMessages(messages.filter(m => m.id !== id));
    triggerBanner('Inquiry pipeline: Message purged safely');
  };

  // Admin reply simulation
  const [replyMessageId, setReplyMessageId] = useState<string | null>(null);
  const [mockResponseText, setMockResponseText] = useState('');
  const handleSimulateReply = (e: React.FormEvent, msgObj: ContactMessage) => {
    e.preventDefault();
    if (!mockResponseText.trim()) return;
    alert(`⚡ SMTP OUTGOING SIMULATION:\n\nTo: ${msgObj.email}\nSubject: Re: ${msgObj.subject}\n\n"${mockResponseText}"\n\nResult: Dispatched message natively! This action simulates a live API mail wrapper response.`);
    
    // Mark message as read
    const updated = messages.map(m => m.id === msgObj.id ? { ...m, isRead: true } : m);
    onUpdateMessages(updated);
    
    setReplyMessageId(null);
    setMockResponseText('');
    triggerBanner('SMTP Engine: Virtual reply successfully documented');
  };


  return (
    <div className="bg-[#0b0b10] text-[#ebebf0] min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Announcement */}
        {saveStatus && (
          <div className="fixed top-20 right-6 z-50 bg-indigo-600/90 border border-indigo-500 backdrop-blur-md px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300">
            <CheckCircle2 size={18} className="text-emerald-400 stroke-[3]" />
            <span className="font-mono text-xs text-white uppercase tracking-wider">{saveStatus}</span>
          </div>
        )}

        {/* Header workspace */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="font-mono text-[10px] tracking-widest text-indigo-400 uppercase">Interactive Workspace Core v2.4</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight mt-1 flex items-center gap-2">
              <Sliders className="text-indigo-500" size={26} />
              Portfolio Admin Control Panel
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-mono text-zinc-500">Live Client Side Serialization</span>
            <button
              onClick={() => {
                if(confirm("Restore defaults? All custom additions, edits, and contact submissions will revert to original presets.")) {
                  onResetAll();
                  // Reload fields
                  setTimeout(() => window.location.reload(), 200);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-mono text-indigo-400 cursor-pointer"
              title="Reset sandbox to original presets"
            >
              <RotateCcw size={12} />
              <span>Full Factory Reset</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Sidebar + Pane */}
        <div className="grid lg:grid-cols-12 gap-8 mt-8 items-start">
          
          {/* Quick Admin Sidebar Menu */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1">
              <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 mb-2">Workspace Modules</p>
              
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === 'profile' ? 'bg-indigo-600/15 border-l-4 border-indigo-500 text-indigo-300 font-bold' : 'hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <User size={14} />
                  <span>Profile variables</span>
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500">Edit</span>
              </button>

              <button 
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === 'projects' ? 'bg-indigo-600/15 border-l-4 border-indigo-500 text-indigo-300 font-bold' : 'hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Briefcase size={14} />
                  <span>Project Portfolio</span>
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 text-indigo-500/80">{projects.length}</span>
              </button>

              <button 
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === 'services' ? 'bg-indigo-600/15 border-l-4 border-indigo-500 text-indigo-300 font-bold' : 'hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Puzzle size={14} />
                  <span>Services Catalog</span>
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500">{services.length}</span>
              </button>

              <button 
                onClick={() => setActiveTab('skills')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === 'skills' ? 'bg-indigo-600/15 border-l-4 border-indigo-500 text-indigo-300 font-bold' : 'hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Wrench size={14} />
                  <span>Skill sets</span>
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500">{skills.length}</span>
              </button>

              {/* Message queue inbox with dynamic unread indicator */}
              <button 
                onClick={() => setActiveTab('messages')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === 'messages' ? 'bg-indigo-600/15 border-l-4 border-indigo-500 text-indigo-300 font-bold' : 'hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>Client Inbox</span>
                </span>
                {messages.filter(m => !m.isRead).length > 0 ? (
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-indigo-600 font-bold text-white leading-none">
                    {messages.filter(m => !m.isRead).length} NEW
                  </span>
                ) : (
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500">{messages.length}</span>
                )}
              </button>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-2 font-sans text-xs text-zinc-400 leading-relaxed">
              <span className="font-mono text-[9px] text-zinc-500 block uppercase tracking-wider font-semibold">Live Preview Sync</span>
              <span>Simply toggle back to the <strong>Public View</strong> in the navbar after saving your updates. The public components immediately rerender with your custom data parameters.</span>
            </div>
          </div>

          {/* Active Workspace Pane */}
          <div className="lg:col-span-9 bg-zinc-950 border border-zinc-900 rounded-xl p-6 md:p-8 min-h-[500px]">
            
            {/* SUB-SECTION: PROFILE VARIABLE MANAGER */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <User className="text-indigo-400" size={18} />
                    Customize Profile core details
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">Configure your bio headlines, digital coordinates, key numbers, and resume highlights.</p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Primary Name</label>
                      <input
                        type="text"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Professional Title</label>
                      <input
                        type="text"
                        name="title"
                        value={profileForm.title}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Hero Tagline</label>
                    <input
                      type="text"
                      name="tagline"
                      value={profileForm.tagline}
                      onChange={handleProfileChange}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Biography (Full text Markdown compatible)</label>
                    <textarea
                      name="bio"
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                      rows={4}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 text-xs focus:border-indigo-500 outline-none resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Experience Years</label>
                      <input
                        type="number"
                        name="yearsOfExperience"
                        value={profileForm.yearsOfExperience}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Completed count</label>
                      <input
                        type="number"
                        name="completedProjects"
                        value={profileForm.completedProjects}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Satisfaction (%)</label>
                      <input
                        type="number"
                        name="happyClients"
                        value={profileForm.happyClients}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Avatar Picture URL</label>
                      <input
                        type="text"
                        name="avatarUrl"
                        value={profileForm.avatarUrl}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Base Station Location</label>
                      <input
                        type="text"
                        name="location"
                        value={profileForm.location}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Email address</label>
                      <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">GitHub Profile URL</label>
                      <input
                        type="text"
                        name="github"
                        value={profileForm.github}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">LinkedIn Profile URL</label>
                      <input
                        type="text"
                        name="linkedin"
                        value={profileForm.linkedin}
                        onChange={handleProfileChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:translate-y-0.5 rounded-lg text-xs font-mono font-bold text-white cursor-pointer shadow-lg shadow-indigo-600/30 transition-all"
                    >
                      <Check size={14} className="stroke-[3]" />
                      <span>SAVE PROFILE VARIABLES</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SUB-SECTION: WORK PROJECTS PORTFOLIO */}
            {activeTab === 'projects' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Briefcase className="text-indigo-400" size={18} />
                    Manage Showcase Portfolio Case Studies
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">Append new projects, revise tech tags, toggle spotlights/featured tags, or delete outdated showcases.</p>
                </div>

                {/* Case build / edit form */}
                <form onSubmit={handleSaveProject} className="p-5 border border-zinc-800/80 rounded-xl bg-zinc-900/30 space-y-4">
                  <h3 className="font-mono text-[11px] text-indigo-400 uppercase font-semibold">
                    {editingProjectId ? `Re-engineering Case Instance [ID ${editingProjectId}]` : 'Architect New Portfolio Project Case'}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Project Title *</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={e => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none text-slate-100"
                        placeholder="e.g. headless blog"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Technical Subtitle *</label>
                      <input
                        type="text"
                        value={projectForm.subtitle}
                        onChange={e => setProjectForm(prev => ({ ...prev, subtitle: e.target.value }))}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none text-[#93c5fd]"
                        placeholder="e.g. WPGraphQL and standard PHP"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">In-depth Project Deliverables Analysis *</label>
                    <textarea
                      value={projectForm.description}
                      onChange={e => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 text-xs focus:border-indigo-500 outline-none resize-none"
                      placeholder="Discuss challenges, WP core filter APIs, optimization methodologies..."
                      required
                    ></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Technology Stack Tags (Single badged tokens)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={techInput}
                        onChange={e => setTechInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTechBadge(); } }}
                        className="bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs focus:border-indigo-500 outline-none text-slate-100"
                        placeholder="e.g. WPGraphQL, PHP OOP"
                      />
                      <button
                        type="button"
                        onClick={handleAddTechBadge}
                        className="px-3.5 py-1.5 bg-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs font-mono border border-zinc-700 cursor-pointer"
                      >
                        Add Tag
                      </button>
                    </div>
                    
                    {/* Render active tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {projectForm.techStack.length === 0 && (
                        <span className="text-[10px] font-mono text-zinc-500">None declared yet. Add tech stack names above</span>
                      )}
                      {projectForm.techStack.map(tech => (
                        <span 
                          key={tech} 
                          onClick={() => handleRemoveTechBadge(tech)}
                          className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-indigo-300 border border-indigo-900/60 flex items-center gap-1 cursor-pointer hover:bg-red-950 hover:text-red-300 transition-colors"
                          title="Click to destroy tag"
                        >
                          {tech} <span>×</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Cover Image Address URL</label>
                      <input
                        type="text"
                        value={projectForm.imageUrl}
                        onChange={e => setProjectForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none text-slate-100"
                        required
                      />
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Featured Spotlight Status</label>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          id="chk-featured"
                          checked={projectForm.isFeatured}
                          onChange={e => setProjectForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
                          className="w-4 h-4 accent-indigo-600 rounded bg-zinc-900"
                        />
                        <label htmlFor="chk-featured" className="text-zinc-300 cursor-pointer">Place project on featured highlight carousel</label>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Live Demo Link</label>
                      <input
                        type="text"
                        value={projectForm.liveUrl}
                        onChange={e => setProjectForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none text-slate-100"
                        placeholder="https://demoproject.com"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">GitHub Repository Link</label>
                      <input
                        type="text"
                        value={projectForm.githubUrl}
                        onChange={e => setProjectForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none text-slate-100"
                        placeholder="https://github.com/wp-developer..."
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Completion Calendar Month</label>
                      <input
                        type="month"
                        value={projectForm.completionDate}
                        onChange={e => setProjectForm(prev => ({ ...prev, completionDate: e.target.value }))}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 px-4.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-mono cursor-pointer transition-colors font-bold"
                    >
                      <PlusCircle size={14} />
                      <span>{editingProjectId ? 'COMPILE CHANGES' : 'DEPLOY CASE OBJECT'}</span>
                    </button>
                    
                    {editingProjectId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProjectId(null);
                          setProjectForm({
                            title: '', subtitle: '', description: '', techStack: [],
                            imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=650&auto=format&fit=crop',
                            liveUrl: '', githubUrl: '', isFeatured: false, completionDate: '2026-05'
                          });
                        }}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-mono text-zinc-400 cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>

                {/* List Current Projects */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-500">Active Cases database ({projects.length})</h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {projects.map(p => (
                      <div key={p.id} className="p-4 rounded-lg bg-zinc-900 border border-zinc-800/80 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-sans font-bold text-sm text-slate-200">{p.title}</h4>
                            <div className="flex gap-1.5">
                              <button 
                                onClick={() => handleEditProjectClick(p)}
                                className="p-1 hover:bg-zinc-800 rounded-md text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                                title="Edit variables"
                              >
                                <Edit size={13} />
                              </button>
                              <button 
                                onClick={() => handleDeleteProject(p.id)}
                                className="p-1 hover:bg-zinc-800 rounded-md text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                title="Purge variables"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                          <p className="font-mono text-[10px] text-zinc-500 mt-1">{p.subtitle}</p>
                          <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">{p.description}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-600">
                          <span>{p.completionDate}</span>
                          {p.isFeatured && <span className="text-indigo-400 font-semibold text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 border border-indigo-900">FEATURED SPOTLIGHT</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* SUB-SECTION: SERVICES CATALOG DESIGNER */}
            {activeTab === 'services' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Puzzle className="text-indigo-400" size={18} />
                    Configure Consultant Packages / Services
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">Design customized delivery, pricing estimates, support parameters, and services listings for clients.</p>
                </div>

                <form onSubmit={handleAddOrEditService} className="p-5 border border-zinc-800/80 rounded-xl bg-zinc-900/30 space-y-4">
                  <h3 className="font-mono text-[11px] text-indigo-400 uppercase font-semibold">
                    {editingServiceId ? 'Re-aligning consultant service package properties' : 'Launch new high-value consultant offering'}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Package Offering Title *</label>
                      <input
                        type="text"
                        value={serviceForm.title}
                        onChange={e => setServiceForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none text-slate-100"
                        placeholder="e.g. WooCommerce API automation"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Lucide Vector Icon Name</label>
                      <select
                        value={serviceForm.iconName}
                        onChange={e => setServiceForm(prev => ({ ...prev, iconName: e.target.value }))}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 text-xs focus:border-indigo-500 outline-none text-slate-200"
                      >
                        <option value="Puzzle">Puzzle (Plugins, Integrations)</option>
                        <option value="Layout">Layout (FSE Themes, Frontends)</option>
                        <option value="Cpu">Cpu (Headless Architectures, APIs)</option>
                        <option value="ShieldAlert">ShieldAlert (Security auditing)</option>
                        <option value="Code">Code (Generic Core Coding)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Comprehensive Features checklist (Plain text format) *</label>
                    <textarea
                      value={serviceForm.description}
                      onChange={e => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 text-xs focus:border-indigo-500 outline-none resize-none"
                      placeholder="e.g. Building custom modules with zero framework bloat..."
                      required
                    ></textarea>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Value Estimate Threshold (Price)</label>
                      <input
                        type="text"
                        value={serviceForm.priceEstimate}
                        onChange={e => setServiceForm(prev => ({ ...prev, priceEstimate: e.target.value }))}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none text-slate-100"
                        placeholder="e.g. Starts at $2,000"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Estimated Cycle Delivery Time</label>
                      <input
                        type="text"
                        value={serviceForm.deliveryTime}
                        onChange={e => setServiceForm(prev => ({ ...prev, deliveryTime: e.target.value }))}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none text-slate-100"
                        placeholder="e.g. 7-14 Business Days"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-mono cursor-pointer transition-all font-bold"
                    >
                      <PlusCircle size={14} />
                      <span>{editingServiceId ? 'SAVE PACKAGES' : 'REGISTER SERVICE'}</span>
                    </button>
                    {editingServiceId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingServiceId(null);
                          setServiceForm({ title: '', description: '', iconName: 'Puzzle', priceEstimate: '', deliveryTime: '' });
                        }}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-mono text-zinc-400 cursor-pointer"
                      >
                        Cancel edit
                      </button>
                    )}
                  </div>
                </form>

                {/* List services */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-500">Registered WP services ({services.length})</h3>
                  <div className="space-y-2.5">
                    {services.map(s => (
                      <div key={s.id} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="p-2.5 bg-zinc-950 border border-zinc-800/80 rounded-lg text-indigo-400 mt-1">
                            {s.iconName === 'Puzzle' && <Puzzle size={16} />}
                            {s.iconName === 'Layout' && <Layout size={16} />}
                            {s.iconName === 'Cpu' && <Cpu size={16} />}
                            {s.iconName === 'ShieldAlert' && <ShieldAlert size={16} />}
                            {s.iconName !== 'Puzzle' && s.iconName !== 'Layout' && s.iconName !== 'Cpu' && s.iconName !== 'ShieldAlert' && <FileText size={16} />}
                          </div>
                          <div>
                            <h4 className="font-sans font-bold text-sm text-slate-200">{s.title}</h4>
                            <p className="text-xs text-zinc-400 mt-1">{s.description}</p>
                            <div className="flex gap-4 mt-2 text-[10px] font-mono text-zinc-500">
                              <span>Pricing: <strong className="text-indigo-400">{s.priceEstimate || 'Contact'}</strong></span>
                              <span>Cycle: <strong className="text-slate-300">{s.deliveryTime || 'TBD'}</strong></span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-1.5">
                          <button 
                            onClick={() => handleEditServiceClick(s)}
                            className="p-1.5 hover:bg-zinc-800 rounded-md text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteService(s.id)}
                            className="p-1.5 hover:bg-zinc-800 rounded-md text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* SUB-SECTION: INTERACTIVE SKILL MAPS */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Wrench className="text-indigo-400" size={18} />
                    Configure Skills matrix proficiency values
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">Directly adjust the gauge levels with range controls, append custom category tags, or filter obsolete language standards.</p>
                </div>

                {/* Adding dynamic skill */}
                <form onSubmit={handleAddSkill} className="p-4 rounded-xl border border-zinc-805 bg-zinc-900/25 grid sm:grid-cols-4 gap-4 items-end">
                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Skill Asset Name</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:border-indigo-500 outline-none"
                      value={newSkill.name}
                      onChange={e => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. PHPUnit standards"
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Class Category</label>
                    <select
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 outline-none"
                      value={newSkill.category}
                      onChange={e => setNewSkill(prev => ({ ...prev, category: e.target.value as any }))}
                    >
                      <option value="Core WordPress">Core WordPress</option>
                      <option value="Gutenberg & React">Gutenberg & React</option>
                      <option value="Languages">Languages</option>
                      <option value="Tools & Workflows">Tools & Workflows</option>
                    </select>
                  </div>
                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Proficiency ({newSkill.proficiency}%)</label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      step={5}
                      value={newSkill.proficiency}
                      onChange={e => setNewSkill(prev => ({ ...prev, proficiency: parseInt(e.target.value) }))}
                      className="w-full accent-indigo-500 mt-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus size={12} />
                    <span>Deploy</span>
                  </button>
                </form>

                {/* Range Sliders List */}
                <div className="space-y-6 pt-2">
                  {['Core WordPress', 'Gutenberg & React', 'Languages', 'Tools & Workflows'].map(cat => {
                    const group = skills.filter(sk => sk.category === cat);
                    return (
                      <div key={cat} className="space-y-3.5">
                        <h4 className="font-mono text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1.5 pb-1 border-b border-zinc-900">
                          <span>{cat} Registry</span>
                          <span className="text-[9px] text-zinc-600 font-normal">({group.length} Active)</span>
                        </h4>

                        <div className="grid md:grid-cols-2 gap-4">
                          {group.map(sk => (
                            <div key={sk.id} className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 flex flex-col gap-2">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-sans font-medium text-slate-300">{sk.name}</span>
                                <div className="flex items-center gap-2 select-none">
                                  <span className="font-mono text-[10px] text-zinc-500">{sk.proficiency}%</span>
                                  <button
                                    onClick={() => handleDeleteSkill(sk.id)}
                                    className="p-1 hover:bg-zinc-800 rounded text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              </div>
                              <input
                                type="range"
                                min={10}
                                max={100}
                                step={5}
                                value={sk.proficiency}
                                onChange={e => handleSkillLevelChange(sk.id, parseInt(e.target.value))}
                                className="w-full accent-indigo-500 opacity-80 hover:opacity-100 transition-opacity"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUB-SECTION: WORKSPACE CLIENT INQUIRIES */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Mail className="text-indigo-400" size={18} />
                    Inbound Client Inquiries pipeline
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">Verify submitted customer briefs, reply simulating standard SMTP templates, or organize lead records.</p>
                </div>

                {messages.length === 0 ? (
                  <div className="text-center py-16 border border-zinc-800 rounded-xl bg-zinc-900/10 space-y-3">
                    <Mail className="mx-auto text-zinc-600" size={32} />
                    <h3 className="font-sans font-bold text-base text-zinc-400">Inquiry queue clear</h3>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">No potential leads logged in local persistence right now. Switch to portfolio view and send a message on the contact form first!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map(msg => (
                      <div 
                        key={msg.id} 
                        className={`p-5 rounded-xl border transition-all ${
                          msg.isRead 
                            ? 'bg-zinc-950/60 border-zinc-900 text-zinc-400' 
                            : 'bg-zinc-900/40 border-indigo-500/20 text-slate-200 shadow-md shadow-indigo-600/[0.02]'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2.5 pb-3 border-b border-zinc-900/60">
                          <div>
                            <div className="flex items-center gap-2">
                              {!msg.isRead && (
                                <span className="w-2 h-2 rounded-full bg-indigo-500" title="Unread Inquiry"></span>
                              )}
                              <h4 className="font-sans font-bold text-[#fafafa] text-sm">{msg.name}</h4>
                              <span className="font-mono text-[9px] text-zinc-600">({msg.email})</span>
                            </div>
                            <p className="font-sans text-xs font-semibold text-slate-300 mt-1">{msg.subject || 'Standard Consultation Inquiry'}</p>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <span className="font-mono text-[10px] text-zinc-500">{msg.timestamp}</span>
                            
                            <button
                              onClick={() => handleToggleMessageState(msg.id)}
                              className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-[10px] font-mono text-zinc-400 hover:text-slate-200 transition-colors cursor-pointer"
                              title={msg.isRead ? "Mark as unread" : "Mark as read"}
                            >
                              {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                            </button>

                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="p-1 hover:bg-zinc-800 rounded text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                              title="Organize lead record out of system"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Brief text contents */}
                        <div className="pt-3">
                          <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                        </div>

                        {/* Simulated Response Console */}
                        {replyMessageId === msg.id ? (
                          <form onSubmit={(e) => handleSimulateReply(e, msg)} className="mt-4 p-4 rounded-lg bg-[#0c0c14] border border-indigo-500/10 space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-mono text-indigo-400">
                              <span>Simulated System Gateway (Active SMTP: Send template reply)</span>
                              <button 
                                type="button" 
                                onClick={() => setReplyMessageId(null)}
                                className="text-zinc-500 hover:text-zinc-300"
                              >
                                Cancel
                              </button>
                            </div>
                            <textarea
                              value={mockResponseText}
                              onChange={e => setMockResponseText(e.target.value)}
                              rows={4}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-lg p-3 text-xs text-slate-100 outline-none resize-none font-mono"
                              placeholder={`Dear ${msg.name},\n\nMany thanks for reaching out. I had a chance to view your briefing and...`}
                              required
                            ></textarea>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-bold rounded-lg cursor-pointer transition-colors"
                            >
                              ⚡ Dispatch Simulated Email
                            </button>
                          </form>
                        ) : (
                          <div className="mt-4 pt-3 border-t border-zinc-900/40 flex justify-end">
                            <button
                              onClick={() => {
                                setReplyMessageId(msg.id);
                                setMockResponseText(`Hello ${msg.name},\n\nThank you for getting in touch regarding "${msg.subject}". I have analyzed your core project summary.\n\nI would love to set up a quick 15-minute briefing session this Thursday to exchange tech specifications. Let me know what timezone works best.\n\nBest regards,\nAlex Mercer\nSenior WordPress Developer`);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/25 text-indigo-300 rounded text-10px font-mono cursor-pointer transition-colors"
                            >
                              <BookmarkCheck size={11} />
                              <span>Compose Reply</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
