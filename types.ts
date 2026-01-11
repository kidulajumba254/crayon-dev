
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  link: string;
  type: 'Case Study' | 'Live' | 'Experimental';
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  color: string;
  logo?: string;
}

export interface Skill {
  category: string;
  items: string[];
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  color: string;
}

export interface Referee {
  name: string;
  role: string;
  organization: string;
  email: string;
  phone: string;
}
