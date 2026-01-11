
import { Project, Experience, Skill, Referee } from './types';

export const COLORS = {
  waxRed: '#E94B3C',
  oceanBlue: '#2E86DE',
  leafGreen: '#27AE60',
  goldenYellow: '#F2C94C',
  charcoalInk: '#1E1E1E',
  paperWhite: '#FAFAF7',
};

export const CONTACT = {
  email: 'kidulajesse@gmail.com',
  phone: '+254 758 301 141',
  linkedin: 'https://linkedin.com/in/jesse-kidula-493ab6306',
  github: 'https://github.com/kidulajumba254',
  gitlab: 'https://gitlab.com/kidulajesse',
  hackerrank: 'https://www.hackerrank.com/profile/kidulajesse'
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Agritech Ecommerce',
    description: 'A modern marketplace platform for agricultural products and equipment, currently under development. Aims to connect farmers directly with suppliers using real-time data.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    color: COLORS.leafGreen,
    link: 'https://github.com/kidulajumba254/farmfreshlimited--Agritech-startup',
    type: 'Live',
    icon: 'Database'
  },
  {
    id: '2',
    title: 'KaziConnect Job Board',
    description: 'A comprehensive job board platform designed to bridge the gap between employers and job seekers in Kenya. Features real-time applications and CV matching.',
    tags: ['PHP', 'Laravel', 'MySQL'],
    color: COLORS.oceanBlue,
    link: 'https://github.com/kidulajumba254/kaziconnect-job-board',
    type: 'Case Study',
    icon: 'Users'
  },
  {
    id: '3',
    title: 'VerifiedOne Identity & Trust',
    description: 'A high-performance Identity Verification (IDV) and Trust Auditing platform built for the Kenyan and broader African market. Provides instant, defensible trust reports for high-trust sectors.',
    tags: ['React', 'PostgreSQL', 'IDV', 'Verification'],
    color: COLORS.waxRed,
    link: 'https://github.com/kidulajumba254/VerifiedOne',
    type: 'Live',
    icon: 'Shield'
  },
  {
    id: '4',
    title: 'PetStore Management',
    description: 'Full-stack management system for inventory, sales, and customer tracking in a retail environment. Focuses on operational efficiency and reporting.',
    tags: ['Java', 'SQL', 'CSS'],
    color: COLORS.goldenYellow,
    link: 'https://github.com/kidulajumba254/petstore-management-system',
    type: 'Case Study',
    icon: 'Server'
  }
];

export const RECOGNIZED_STACK = [
  { name: 'Hugging Face', type: 'AI', logo: '/huggingface.webp' },
  { name: "Africa's Talking", type: 'API', logo: "/africa's talking.jfif" },
  { name: 'VS Code', type: 'Tool', logo: '/VSCode.png' },
  { name: 'M-Pesa Daraja', type: 'Payments', logo: '/mpesa daraja.png' },
  { name: 'JavaScript', type: 'Frontend', logo: '/JSL.png' },
  { name: 'Python', type: 'Data Science', logo: '/py.png' },
  { name: 'React', type: 'Modern Web', logo: '/react.png' },
  { name: 'Angular + Spring Boot', type: 'Fullstack', status: 'Newly Learnt', logos: ['/angular.png', '/SPRINGBOOT.png'] }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp_compulynx',
    role: 'Software Developer Intern',
    company: 'CompuLynx Limited',
    period: 'Jan 2026 — Present',
    description: [
      'Developing and maintaining enterprise-grade web applications using Angular for the frontend and Spring Boot for the backend.',
      'Implementing scalable RESTful APIs and optimizing database queries for high-performance financial systems.',
      'Collaborating with senior developers to architect modular solutions and ensure code quality through rigorous testing.'
    ],
    color: COLORS.goldenYellow,
    logo: '/CompuLynx.png'
  },
  {
    id: 'exp0',
    role: 'AI Developer',
    company: 'CloudFactory Kenya',
    period: 'Jan 2025 — Jan 2026',
    description: [
      'Spearheading AI development initiatives focusing on high-precision data annotation workflows.',
      'Developing automated scripts for pre-labeling complex datasets, significantly improving efficiency.',
      'Collaborating with global teams to ensure AI model accuracy through rigorous annotation evaluation.'
    ],
    color: COLORS.oceanBlue,
    logo: '/cf.png'
  },
  {
    id: 'exp1',
    role: 'AI Evaluator',
    company: 'RWS Holdings',
    period: 'Nov 2024 — Jan 2025',
    description: [
      'Evaluated machine learning algorithms resulting in a 30% faster response time for personalized recommendations.',
      'Delivered actionable feedback on AI outputs using NLP contributing to a 40% reduction in output errors.'
    ],
    color: COLORS.waxRed,
    logo: '/rws.png'
  },
  {
    id: 'exp2',
    role: 'Data Enumerator',
    company: 'Ministry of Labour and Social Protection',
    period: 'Oct 2024 — Nov 2024',
    description: [
      'Spearheaded structured interviews and surveys to gather demographic and social data from over 100 households.',
      'Achieved 100% coverage of targeted areas by mapping household information into the Ministry database.'
    ],
    color: COLORS.leafGreen,
    logo: '/Ministry of labour.jpg'
  },
  {
    id: 'exp3',
    role: 'Data Science Intern (Remote)',
    company: 'British Airways',
    period: 'Sep 2024 — Oct 2024',
    description: [
      'Scraped and analyzed customer review data, resulting in a 12% increase in customer satisfaction scores.',
      'Built a predictive model with scikit-learn improving marketing campaign strategies by 25%.'
    ],
    color: COLORS.oceanBlue,
    logo: '/British_Airways-Logo.wine.png'
  },
  {
    id: 'exp4',
    role: 'Data Analytics Intern (Remote)',
    company: 'Quantum',
    period: 'Sep 2024 — Oct 2024',
    description: [
      'Analyzed transaction datasets with Python and Pandas, increasing satisfaction scores by 12%.',
      'Automated benchmark stores for uplifting and data visualization, improving performance by 10%.'
    ],
    color: COLORS.goldenYellow,
    logo: '/quantum-logo.png'
  }
];

export const SKILLS: Skill[] = [
  {
    category: 'Programming',
    items: ['Python', 'JavaScript', 'Java', 'PHP', 'SQL'],
    color: COLORS.waxRed
  },
  {
    category: 'Web & Backend',
    items: ['React', 'Vue', 'Node.js', 'Laravel', 'PostgreSQL', 'MySQL'],
    color: COLORS.oceanBlue
  },
  {
    category: 'Data Science',
    items: ['Pandas', 'Scikit-learn', 'NLP', 'Power BI', 'Tableau', 'Jupyter'],
    color: COLORS.leafGreen
  }
];

export const EDUCATION = {
  degree: 'B.BIT, KCA University',
  gpa: '3.0',
  period: '2020 — 2024'
};

export const CERTIFICATIONS = [
  'Programming in Python (Udemy)',
  'AI Starter Kit (ALX)',
  'IT for Business Success (HP)',
  'React Frontend (HackerRank)'
];


export const REFEREES: Referee[] = [
  {
    name: 'Lawrence G. Nyaga',
    role: 'Head of ICT',
    organization: 'Ministry of Labour and Social Protection',
    email: 'lawnyagagmail.com',
    phone: '0723451812'
  },
  {
    name: 'Nelson Murimi',
    role: 'Senior ICT Officer',
    organization: 'Ministry of Labour and Social Protection',
    email: 'kiriminelson83gmail.com',
    phone: '0706555117'
  }
];

export const TESTIMONIALS = [
  {
    quote: "Jesse's growth mindset and technical agility make him a standout developer. His ability to bridge AI and real-world engineering is exceptional.",
    author: "Solomon Wafula",
    role: "Senior Talent Acquisition, CloudFactory Kenya",
    color: COLORS.goldenYellow
  },
  {
    quote: "Jesse has an incredible eye for detail and a knack for solving complex data problems with elegant code.",
    author: "Lawrence G. Nyaga",
    role: "Former ICT Director, Social Protection",
    color: COLORS.oceanBlue
  },
  {
    quote: "A versatile developer who understands the human element of technology. Highly recommended for any AI-driven project.",
    author: "Nelson Murimi",
    role: "Senior ICT Officer, Social Protection",
    color: COLORS.waxRed
  }
];
