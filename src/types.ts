export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
  yearsOfExperience: number;
  completedProjects: number;
  happyClients: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Core WordPress' | 'Languages' | 'Tools & Workflows' | 'Gutenberg & React';
  proficiency: number; // 0 to 100
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  completionDate: string;
}

export interface Service {
  id: string;
  title: string;
  iconName: string; // lucide icon name
  description: string;
  priceEstimate?: string;
  deliveryTime?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}
