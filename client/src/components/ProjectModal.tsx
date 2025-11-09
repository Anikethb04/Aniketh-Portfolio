import { useState, useEffect } from "react";

const projectData = {
  project1: {
    title: 'Voyagr',
    description: 'This is a full-stack clone of a short-term rental listing platform. Users can browse available listings (rooms, houses, villas, etc.).',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    features: [
      'Real-time inventory management',
      'Secure payment processing with Stripe',
      'Comprehensive admin dashboard',
      'Mobile-first responsive design',
      'Advanced search and filtering',
      'Order tracking system'
    ],
    tech: ['Front-end', 'Back-end & data', 'MongoDB', 'Hosting/Deployment', 'Authentication'],
    challenges: 'One of the main challenges was implementing real-time inventory updates across multiple user sessions. I solved this using WebSocket connections and optimistic UI updates, ensuring users always see the most current stock levels while maintaining excellent performance.',
    github: '#',
    demo: '#'
  },
  project2: {
    title: 'Movieinfo',
    description: 'MovieInfo is a simple web app that fetches and displays the latest movies and series from TMDB, with a clean navigation bar and a loading screen during data fetch.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    features: [
      'AI-powered task prioritization',
      'Smart scheduling recommendations',
      'Natural language task creation',
      'Progress tracking and analytics',
      'Team collaboration features',
      'Cross-platform synchronization'
    ],
    tech: ['TMDB API', 'HTML', 'CSS', 'JavaScript'],
    challenges: 'Integrating AI capabilities while maintaining fast response times was challenging. I implemented a hybrid approach using cached predictions for common scenarios and real-time AI analysis for complex tasks, reducing average response time by 60%.',
    github: '#',
    demo: '#'
  },
  project3: {
    title: 'Proctor-X',
    description: 'ProctorX PI is a web-based exam proctoring tool that monitors online tests and helps administrators manage secure, fraud-free exam sessions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
    features: [
      'Multi-platform social media integration',
      'Real-time data visualization',
      'Custom report generation',
      'Automated insights and recommendations',
      'Team collaboration tools',
      'White-label customization'
    ],
    tech: ['Security', 'Real-time checks', 'Data storage/logging',],
    challenges: 'Handling large datasets while maintaining smooth interactions was crucial. I implemented virtual scrolling and data pagination, along with WebWorkers for heavy computations, resulting in seamless performance even with millions of data points.',
    github: '#',
    demo: '#'
  }
};

interface ProjectModalProps {
  isOpen: boolean;
  projectId: string | null;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, projectId, onClose }: ProjectModalProps) {
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (projectId && projectData[projectId as keyof typeof projectData]) {
      setProject(projectData[projectId as keyof typeof projectData]);
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
                  {project.tech.map((tech: string, index: number) => (
                    <span 
                      key={tech}
                      className={`px-2 py-1 bg-${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}/20 text-${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'} rounded-full text-xs`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-lg font-bold text-accent mb-3">Challenges & Solutions</h4>
              <p className="text-muted-foreground" data-testid="modal-project-challenges">
                {project.challenges}
              </p>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <a 
                href={project.demo} 
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
                data-testid="modal-project-demo-link"
              >
                <i className="fas fa-external-link-alt mr-2"></i>Live Demo
              </a>
              <a 
                href={project.github} 
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
