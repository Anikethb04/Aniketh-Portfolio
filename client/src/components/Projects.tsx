import { useEffect, useState, useRef } from "react";
import { projects } from "../lib/projectsData";

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
