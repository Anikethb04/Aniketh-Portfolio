import { useEffect, useState, useRef } from "react";

const projects = [
  {
    id: 'project1',
    title: 'Voyagr',
    description: 'This is a full-stack clone of a short-term rental listing platform. Users can browse available listings (rooms, houses, villas, etc.).',
    longDescription: 'This web application is built as a full-stack listing marketplace that allows hosts to list accommodations and guests to browse and potentially book them. Visitors land on a listings page that shows a search bar and categories such as “Trending”, “Rooms”, “Icons cities”, “Farms”, “Boats”, etc.. The listings are displayed with the accommodation name, nightly price and tax info.',
    image: 'https://iili.io/KbE7qHN.jpg',
    tech: ['Front-end', 'Back-end & data', 'MongoDB', 'Hosting/Deployment', 'Authentication'],
    features: ['Browse listings', 'Price display with taxes', 'User authentication'],
    demoUrl: '#',
    githubUrl: 'https://github.com/Anikethb04/Voyagr',
    shadowColor: 'primary',
    category: 'Full Stack',
    status: 'Live',
    year: '2025'
  },
  {
    id: 'project2',
    title: 'Movieinfo',
    description: 'MovieInfo is a simple web app that fetches and displays the latest movies and series from TMDB, with a clean navigation bar and a loading screen during data fetch.',
    longDescription: 'MovieInfo is a dynamic single-page app that lets users browse movies, series, and kids content using real-time data from TMDB. It features a clean UI with category tabs, movie cards, and filters for genre and year. The app loads the latest or popular movies on startup and offers a simple, responsive interface focused on easy browsing rather than streaming.',
    image: 'https://pouch.jumpshare.com/preview/pI54b0Uxz3XzZjvdOMBATmQEEm6llXsTnerlKGQM0UVvEbPqOume8OW3LdPnfmTmhBYgXkY-XqdXqS0mf4Evx0AFtBShOikdRJ0JuyX-yJ4',
    tech: ['TMDB API', 'HTML', 'CSS', 'JavaScript'],
    features: ['Latest movies retrieval', 'Responsive UI', 'Powered by TMDB', 'Category navigation', 'Minimalist design'],
    demoUrl: 'https://movieinfo12.netlify.app/',
    githubUrl: 'https://github.com/Anikethb04/Project-IMDB',
    shadowColor: 'primary',
    category: 'Front End',
    status: 'Live',
    year: '2025'
  },
  {
    id: 'project3',
    title: 'Proctor-X',
    description: 'ProctorX PI is a web-based exam proctoring tool that monitors online tests and helps administrators manage secure, fraud-free exam sessions.',
    longDescription: 'ProctorX PI is a secure, browser-based exam platform with webcam checks, full-screen lock, and behavior monitoring, while admins manage exams, candidates, and proctoring rules through a clean, responsive interface.',
    image: 'https://iili.io/KbE7KSp.jpg',
    tech: ['Security', 'Real-time checks', 'Data storage/logging',],
    features: ['Real-time Data', 'Exam scheduling & management', 'Secure exam mode'],
    demoUrl: 'https://proctorx-pi.vercel.app/',
    githubUrl: 'https://github.com/Anikethb04/ProctorX-Examination-Management-System',
    shadowColor: 'accent',
    category: 'Web Development',
    status: 'Live',
    year: '2025'
  },
  // {
  //   id: 'project4',
  //   title: 'Blockchain Voting System',
  //   description: 'Secure, transparent voting system built on blockchain technology.',
  //   longDescription: 'A decentralized voting platform ensuring transparency and security through blockchain technology, featuring smart contracts for vote validation and immutable record-keeping.',
  //   image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  //   tech: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
  //   features: ['Decentralized', 'Smart Contracts', 'Immutable Records', 'Real-time Results'],
  //   demoUrl: '#',
  //   githubUrl: '#',
  //   shadowColor: 'primary',
  //   category: 'Blockchain',
  //   status: 'Prototype',
  //   year: '2024'
  // },
  // {
  //   id: 'project5',
  //   title: 'AR Learning Platform',
  //   description: 'Augmented reality educational platform for immersive learning experiences.',
  //   longDescription: 'An innovative educational platform that uses augmented reality to create immersive learning experiences, making complex concepts more engaging and understandable.',
  //   image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  //   tech: ['Unity', 'ARCore', 'C#', 'React Native', 'Firebase'],
  //   features: ['AR Visualization', '3D Models', 'Progress Tracking', 'Multi-subject'],
  //   demoUrl: '#',
  //   githubUrl: '#',
  //   shadowColor: 'secondary',
  //   category: 'AR/VR',
  //   status: 'In Development',
  //   year: '2024'
  // },
  // {
  //   id: 'project7',
  //   title: 'Portfolio Website',
  //   description: 'Modern, responsive portfolio website with dark/light mode and interactive animations.',
  //   longDescription: 'A cutting-edge portfolio website featuring a futuristic design, smooth animations, interactive elements, theme switching, and optimized performance across all devices.',
  //   image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  //   tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  //   features: ['Dark/Light Mode', 'Responsive Design', 'Interactive Animations', 'Modern UI'],
  //   demoUrl: '#',
  //   githubUrl: '#',
  //   shadowColor: 'primary',
  //   category: 'Frontend',
  //   status: 'Live',
  //   year: '2024'
  // },
  // {
  //   id: 'project6',
  //   title: 'IoT Smart Home Hub',
  //   description: 'Centralized control system for IoT devices with voice and mobile app integration.',
  //   longDescription: 'A comprehensive smart home automation system that integrates various IoT devices with voice control, mobile app interface, and intelligent automation based on user patterns.',
  //   image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  //   tech: ['React Native', 'Node.js', 'MQTT', 'Arduino', 'AWS IoT'],
  //   features: ['Voice Control', 'Mobile App', 'Automation', 'Energy Monitoring'],
  //   demoUrl: '#',
  //   githubUrl: '#',
  //   shadowColor: 'accent',
  //   category: 'IoT',
  //   status: 'Live',
  //   year: '2023'
  // }
];

interface ProjectsProps {
  onProjectClick: (projectId: string) => void;
}

export default function Projects({ onProjectClick }: ProjectsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const categories = ['All', 'Front End', 'Full Stack', 'Web Development'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="section bg-gradient-to-b from-background to-card relative overflow-hidden" 
      data-testid="projects-section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-7xl font-orbitron font-bold mb-8 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent neon-text" data-testid="projects-title">
              Featured Projects
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">Innovative solutions crafted with passion</p>
            
            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                      : 'glass border border-primary/30 text-primary hover:bg-primary/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`project-card glass rounded-2xl overflow-hidden card-3d cursor-pointer group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => onProjectClick(project.id)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                data-testid={`project-card-${project.id}`}
              >
                {/* Project image with overlay */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Status badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Live' ? 'bg-green-500 text-white' :
                    project.status === 'In Development' ? 'bg-yellow-500 text-black' :
                    'bg-blue-500 text-white'
                  }`}>
                    {project.status}
                  </div>
                  
                  {/* Category tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                    {project.category}
                  </div>
                  
                  {/* Hover overlay with quick actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-4">
                      <a 
                        href={project.demoUrl} 
                        className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        data-testid={`project-demo-${project.id}`}
                      >
                        <i className="fas fa-external-link-alt text-lg"></i>
                      </a>
                      <a 
                        href={project.githubUrl} 
                        className="w-12 h-12 bg-secondary/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-secondary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        data-testid={`project-github-${project.id}`}
                      >
                        <i className="fab fa-github text-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Project content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-xl font-bold text-${project.shadowColor} group-hover:text-${project.shadowColor}/80 transition-colors`} data-testid={`project-title-${project.id}`}>
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2" data-testid={`project-description-${project.id}`}>
                    {hoveredProject === project.id ? project.longDescription : project.description}
                  </p>
                  
                  {/* Key features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-accent/20 text-accent rounded text-xs">
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 2 && (
                        <span className="px-2 py-1 bg-muted/20 text-muted-foreground rounded text-xs">
                          +{project.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2" data-testid={`project-tech-${project.id}`}>
                    {project.tech.slice(0, 3).map((tech, index) => (
                      <span 
                        key={tech}
                        className={`px-2 py-1 bg-${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}/10 text-${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'} border border-${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}/30 rounded-full text-xs font-medium`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-muted/10 text-muted-foreground border border-muted/30 rounded-full text-xs">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* View more projects section removed */}
        </div>
      </div>
    </section>
  );
}
