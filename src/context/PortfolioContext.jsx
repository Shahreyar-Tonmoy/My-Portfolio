import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Default initial assets & data
import icon1 from '../assets/Icons/1.png';
import icon2 from '../assets/Icons/2.png';
import icon3 from '../assets/Icons/3.png';
import icon4 from '../assets/Icons/4.png';
import icon5 from '../assets/Icons/5.png';
import icon6 from '../assets/Icons/6.png';
import icon7 from '../assets/Icons/7.png';
import icon8 from '../assets/Icons/8.png';
import icon9 from '../assets/Icons/9.png';
import icon10 from '../assets/Icons/10.png';
import icon11 from '../assets/Icons/11.png';
import icon12 from '../assets/Icons/12.png';
import icon13 from '../assets/Icons/13.png';
import icon14 from '../assets/Icons/14.png';

// eslint-disable-next-line react-refresh/only-export-components
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'my-portfolio-backend-lovat.vercel.app';

// Helper to resolve static server uploads, CDN URLs, and local assets safely
// eslint-disable-next-line react-refresh/only-export-components
export const resolveAssetUrl = (url, fallback = '') => {
  if (!url) return fallback;
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }
  // Only server uploads stored in Express /uploads directory should be prefixed with API_BASE_URL
  if (url.startsWith('/uploads') || url.startsWith('uploads')) {
    return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  }
  // Frontend bundled assets (Vite dev /src/assets or production /assets) should remain on the frontend
  return url;
};

const initialProfile = {
  name: 'Shahreyar Tonmoy',
  title: 'Front-End & Full-Stack Developer',
  tagline: 'Crafting High-Performance Web & Digital Experiences',
  typewriterRoles: [
    'Front-End Developer',
    'React.js Specialist',
    'Full-Stack Developer',
    'MERN Stack Engineer',
  ],
  bio: "Hi! I'm Shahreyar Tonmoy. I transform ideas into high-performance, attractive web applications with cutting-edge front-end engineering, interactive WebGL graphics, and responsive UI design.",
  email: 'Shahreyartonmoy001@gmail.com',
  location: 'Joypurhat, Bangladesh',
  experienceYears: '01+',
  projectsCount: '12+',
  dedicationPct: '100%',
  socialLinks: {
    github: 'https://github.com/Shahreyar-Tonmoy',
    linkedin: 'https://www.linkedin.com/in/shahreyar-tonmoy',
    facebook: 'https://www.facebook.com/profile.php?id=100019141502263',
    instagram: 'https://www.instagram.com/shahreyar.tonmoy/',
    twitter: 'https://twitter.com/ShahreyarT38896',
  },
  focusAreas: [
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'JavaScript (ES6+)',
    'Tailwind CSS',
    'REST APIs',
    'Firebase',
  ],
  aboutBadge: 'About Me',
  aboutHeading: 'Engineering with Purpose & Precision',
  aboutSubheading:
    'Bridging front-end artistry with robust full-stack architecture to build seamless digital applications.',
  aboutRoleBadge: 'Front-End & Full-Stack',
  aboutStory: '',
  philosophyPillars: [
    {
      title: 'Component Architecture',
      description:
        'Composable, reusable React components with optimized render cycles and clean state flow.',
      icon: 'layers',
    },
    {
      title: 'Scalable REST APIs',
      description:
        'Structured Node.js & Express routing, JWT security, and MongoDB schema design.',
      icon: 'server',
    },
    {
      title: 'Performance & A11y',
      description:
        'Fluid responsive designs, high Core Web Vitals, and accessible semantic markup.',
      icon: 'zap',
    },
  ],
};

const initialProjects = [
  {
    _id: '1',
    id: 1,
    title: 'BuildSync Hub',
    category: 'fullstack',
    type: 'Building Management System',
    description:
      'A comprehensive Building & Apartment Management web application featuring role-based dashboards (Admin, Member, User), apartment agreements, secure payments via Stripe, and announcement noticeboards.',
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'Firebase Auth',
      'Stripe Payments',
    ],
    liveUrl: 'https://comfy-eclair-fabcdd.netlify.app/',
    githubUrl: 'https://github.com/Shahreyar-Tonmoy/Building--Menagement-Client',
    images: [],
    sliderIndex: 1,
    featured: true,
  },
  {
    _id: '2',
    id: 2,
    title: 'Group Study Hub',
    category: 'fullstack',
    type: 'Collaborative Learning Platform',
    description:
      'An interactive online group study platform empowering students to create, submit, and grade shared assignments with peers, featuring real-time status tracking, filtering, and responsive mobile-first UI.',
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'Firebase',
      'JWT Auth',
    ],
    liveUrl: 'https://bucolic-blini-9bf008.netlify.app/',
    githubUrl: 'https://github.com/Shahreyar-Tonmoy/Group-Study-Client',
    images: [],
    sliderIndex: 2,
    featured: true,
  },
  {
    _id: '3',
    id: 3,
    title: 'Fashion Store',
    category: 'frontend',
    type: 'E-Commerce Brand Shop',
    description:
      'A sleek modern apparel brand shop and e-commerce showcase application with dynamic product filtering, cart management, dark/light aesthetics, and intuitive product customization workflows.',
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'Firebase',
      'DaisyUI',
    ],
    liveUrl: 'https://bucolic-genie-cb2e42.netlify.app/',
    githubUrl: 'https://github.com/Shahreyar-Tonmoy/Brand-Shop-Client',
    images: [],
    sliderIndex: 3,
    featured: true,
  },
];

const fallbackIcons = [
  icon1, icon2, icon3, icon4, icon5, icon6, icon7,
  icon8, icon9, icon10, icon11, icon12, icon13, icon14,
];

const initialSkills = [
  { _id: '1', name: 'React.js', category: 'frontend', level: 'Advanced', pct: '90%', icon: icon2, desc: 'Component architecture, hooks, state management, and virtual DOM optimization.', color: 'from-cyan-500 to-blue-500' },
  { _id: '2', name: 'JavaScript (ES6+)', category: 'frontend', level: 'Advanced', pct: '88%', icon: icon1, desc: 'Modern asynchronous workflows, closures, DOM manipulation, promises, and modular patterns.', color: 'from-yellow-400 to-amber-500' },
  { _id: '3', name: 'Node.js', category: 'backend', level: 'Intermediate', pct: '75%', icon: icon7, desc: 'Server-side runtime, event loop, asynchronous IO, and backend script execution.', color: 'from-green-500 to-emerald-600' },
  { _id: '4', name: 'Express.js', category: 'backend', level: 'Intermediate', pct: '78%', icon: icon8, desc: 'RESTful API creation, custom middleware, routing architecture, and JSON handling.', color: 'from-slate-300 to-slate-500' },
  { _id: '5', name: 'MongoDB & Mongoose', category: 'backend', level: 'Intermediate', pct: '76%', icon: icon9, desc: 'NoSQL document database design, CRUD operations, indexing, and schemas.', color: 'from-emerald-500 to-green-600' },
  { _id: '6', name: 'Tailwind CSS', category: 'frontend', level: 'Advanced', pct: '95%', icon: icon4, desc: 'Utility-first responsive layouts, customized design systems, and glassmorphism styling.', color: 'from-sky-400 to-cyan-500' },
  { _id: '7', name: 'Firebase', category: 'backend', level: 'Proficient', pct: '82%', icon: icon10, desc: 'Authentication, Firestore real-time database, web hosting, and security rule setup.', color: 'from-amber-400 to-orange-500' },
  { _id: '8', name: 'Git & GitHub', category: 'tools', level: 'Advanced', pct: '88%', icon: icon11, desc: 'Version control, branching workflows, pull requests, and repository management.', color: 'from-rose-500 to-orange-500' },
  { _id: '9', name: 'HTML5 & Semantic Web', category: 'frontend', level: 'Expert', pct: '95%', icon: icon5, desc: 'Accessible markup, SEO best practices, structured semantic elements, and modern DOM APIs.', color: 'from-orange-500 to-red-500' },
  { _id: '10', name: 'CSS3 & Animations', category: 'frontend', level: 'Advanced', pct: '92%', icon: icon6, desc: 'Keyframe animations, flexbox, grid, transforms, transitions, and responsive media queries.', color: 'from-blue-500 to-indigo-500' },
  { _id: '11', name: 'Vite & Tooling', category: 'tools', level: 'Advanced', pct: '90%', icon: icon12, desc: 'Next-generation frontend bundler, HMR optimization, build config, and ESLint setup.', color: 'from-purple-500 to-indigo-500' },
  { _id: '12', name: 'UI Frameworks & DaisyUI', category: 'tools', level: 'Advanced', pct: '92%', icon: icon13, desc: 'Rapid component assembly, accessible themes, modal dialogs, and responsive drawers.', color: 'from-pink-500 to-rose-500' },
  { _id: '13', name: 'REST APIs & Stripe', category: 'backend', level: 'Proficient', pct: '80%', icon: icon14, desc: 'Payment gateway integration, secure webhooks, third-party API consuming, and Axios.', color: 'from-indigo-500 to-blue-600' },
];

const initialEducation = [
  {
    _id: '1',
    period: '2023 - Present',
    level: 'Higher Secondary Certificate (HSC)',
    institution: 'Karatoa Multimedia School & College',
    location: 'Bogura, Bangladesh',
    department: 'Science Division',
    status: 'Currently Enrolled',
    grade: 'Pursuing',
    description:
      'Deepening analytical problem solving, higher mathematics, physics, and computing concepts while actively practicing front-end software engineering.',
    highlight: 'Ongoing Academic Excellence',
    order: 1,
  },
  {
    _id: '2',
    period: '2018 - 2023',
    level: 'Secondary School Certificate (SSC)',
    institution: 'Ramdeo Bazla Govt. High School',
    location: 'Joypurhat, Bangladesh',
    department: 'Science Division',
    status: 'Completed',
    grade: 'GPA 5.00 / 5.00 (Golden)',
    description:
      'Graduated with top academic standing across all sciences, fostering mathematical precision and early passion for algorithms and web technologies.',
    highlight: 'Perfect GPA 5.00',
    order: 2,
  },
];

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(initialProfile);
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);
  const [education, setEducation] = useState(initialEducation);
  const [serverStatus, setServerStatus] = useState('checking');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch live portfolio data from backend with fallback
  const fetchPortfolioData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Health check
      const healthRes = await axios.get(`${API_BASE_URL}/api/health`, { timeout: 3000 });
      if (healthRes.data?.status === 'online') {
        setServerStatus('online');

        // 2. Fetch parallel endpoints
        const [profileRes, projectsRes, skillsRes, educationRes] = await Promise.allSettled([
          axios.get(`${API_BASE_URL}/api/profile`),
          axios.get(`${API_BASE_URL}/api/projects`),
          axios.get(`${API_BASE_URL}/api/skills`),
          axios.get(`${API_BASE_URL}/api/education`),
        ]);

        if (profileRes.status === 'fulfilled' && profileRes.value.data?.data) {
          setProfile(profileRes.value.data.data);
        }

        if (projectsRes.status === 'fulfilled' && projectsRes.value.data?.data?.length > 0) {
          setProjects(projectsRes.value.data.data);
        }

        if (skillsRes.status === 'fulfilled' && skillsRes.value.data?.data?.length > 0) {
          // Merge API skill records with fallback icons if icon URL is not set
          const mergedSkills = skillsRes.value.data.data.map((s, idx) => ({
            ...s,
            icon: s.icon || fallbackIcons[idx % fallbackIcons.length],
          }));
          setSkills(mergedSkills);
        }

        if (educationRes.status === 'fulfilled' && educationRes.value.data?.data?.length > 0) {
          setEducation(educationRes.value.data.data);
        }
      } else {
        setServerStatus('offline');
      }
    } catch {
      setServerStatus('offline');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  // Dispatch a message to backend inbox
  const submitMessage = async (nameOrObj, emailParam, messageParam) => {
    const payload =
      typeof nameOrObj === 'object' && nameOrObj !== null
        ? nameOrObj
        : { name: nameOrObj, email: emailParam, message: messageParam };

    try {
      const res = await axios.post(`${API_BASE_URL}/api/messages`, payload);
      return res.data;
    } catch (error) {
      console.warn('Backend message save skipped (offline):', error.message);
      return { success: false, message: error.message };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        setProfile,
        projects,
        setProjects,
        skills,
        setSkills,
        education,
        setEducation,
        serverStatus,
        isLoading,
        refreshData: fetchPortfolioData,
        submitMessage,
        fallbackIcons,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
