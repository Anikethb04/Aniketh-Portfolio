import { useState, useEffect } from "react";
import { projects } from "../lib/projectsData";

interface ProjectModalProps {
  isOpen: boolean;
  projectId: string | null;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, projectId, onClose }: ProjectModalProps) {
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (projectId) {
      const found = projects.find(p => p.id === projectId);
      if (found) setProject(found);
      else setProject(null);
    } else {
      setProject(null);
    }
  }, [projectId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      data-testid="project-modal-backdrop"
    >
      <div className="glass max-w-4xl w-full max-h-[90vh] rounded-lg overflow-y-auto" data-testid="project-modal">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-primary" data-testid="modal-title">
              {project.title}
            </h3>
            <button 
              onClick={onClose} 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-close-modal"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div data-testid="modal-content">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg mb-6" 
              data-testid="modal-project-image"
            />
            <p className="text-muted-foreground mb-6" data-testid="modal-project-description">
              {project.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-bold text-primary mb-3">Key Features</h4>
                <ul className="space-y-2" data-testid="modal-project-features">
                  {project.features.map((feature: string) => (
                    <li key={feature} className="text-muted-foreground">• {feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-secondary mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2" data-testid="modal-project-tech">
                  {(project.tech || []).map((tech: string, index: number) => {
                    const color = index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent';
                    const bgClass = 'bg-' + color + '/20';
                    const textClass = 'text-' + color;
                    return (
                      <span
                        key={tech}
                        className={`px-2 py-1 ${bgClass} ${textClass} rounded-full text-xs`}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {project.challenges && (
              <div className="mt-6">
                <h4 className="text-lg font-bold text-accent mb-3">Challenges & Solutions</h4>
                <p className="text-muted-foreground" data-testid="modal-project-challenges">
                  {project.challenges}
                </p>
              </div>
            )}
            
            <div className="flex space-x-4 mt-8">
              <a 
                href={project.demoUrl || project.demo || '#'} 
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
                data-testid="modal-project-demo-link"
              >
                <i className="fas fa-external-link-alt mr-2"></i>Live Demo
              </a>
              <a 
                href={project.githubUrl || project.github || '#'} 
                className="px-6 py-3 glass border border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary hover:text-secondary-foreground transition-all"
                data-testid="modal-project-github-link"
              >
                <i className="fab fa-github mr-2"></i>View Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
