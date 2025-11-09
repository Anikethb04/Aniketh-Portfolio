import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, isVisible }: { target: number, isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span>{count}</span>;
}

interface TimelineItem {
  title: string;
  institution: string;
  period: string;
  details: string;
  percentage?: string;
}

const educationData: TimelineItem[] = [
  {
    title: "Bachelor of Technology in Computer Science",
    institution: "Sree Dattha Institute of Engineering and Science",
    period: "2023 - 2027",
    details: "Specialized in Software Engineering and Web Development",
    percentage: "CGPA: 8.03/10"
  },
  {
    title: "Higher Secondary Education (12th)",
    institution: "Sri Chaitanya junior College",
    period: "2021 - 2023",
    details: "Science Stream - Physics, Chemistry, Mathematics",
    percentage: "Percentage: 83.9%"
  },
  {
    title: "Secondary Education (10th)",
    institution: "Shivappa High School",
    period: "2015 - 2021",
    details: "Completed secondary education with distinction",
    percentage: "Percentage: 100%"
  }
];

const workExperienceData: TimelineItem[] = [
  // {
  //   title: "Java Developer Intern",
  //   institution: "Tech Solutions Pvt Ltd",
  //   period: "June 2024 - August 2024",
  //   details: "Developed backend APIs using Spring Boot and implemented RESTful services. Worked on database optimization and integrated third-party payment gateways."
  // },
  {
    title: "Frontend Developer Intern",
    institution: "Digital Innovations Inc",
    period: "January 2024 - April 2024",
    details: "Built responsive web applications using React and TypeScript. Implemented modern UI/UX designs and optimized application performance."
  }
];

function TimelineSection({ title, items, accentColor }: { title: string, items: TimelineItem[], accentColor: string }) {
  return (
    <div className="mb-16">
      <h3 className={`text-3xl font-bold mb-12 text-center bg-gradient-to-r ${accentColor} bg-clip-text text-transparent`}>
        {title}
      </h3>
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>
        
        {/* Timeline Items */}
        <div className="space-y-12">
          {items.map((item, index) => (
            <div 
              key={index}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col md:gap-0 gap-4`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50 transform -translate-x-1/2 z-10"></div>
              
              {/* Content Card */}
              <div className={`w-full md:w-[calc(50%-3rem)] ${
                index % 2 === 0 ? 'md:pr-12 pl-16 md:pl-0 md:text-right' : 'md:pl-12 pl-16 md:pr-0'
              }`}>
                <div className="glass p-6 rounded-xl hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    accentColor.includes('primary') ? 'bg-primary/20 text-primary' :
                    accentColor.includes('secondary') ? 'bg-secondary/20 text-secondary' :
                    'bg-accent/20 text-accent'
                  }`}>
                    {item.period}
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                  <p className="text-secondary font-semibold mb-3">{item.institution}</p>
                  <p className="text-muted-foreground text-sm mb-2">{item.details}</p>
                  {item.percentage && (
                    <p className="text-primary font-semibold text-sm">{item.percentage}</p>
                  )}
                </div>
              </div>
              
              {/* Empty space for alternating layout on desktop */}
              <div className="hidden md:block w-[calc(50%-3rem)]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDownloadResume = () => {
    // Replace this URL with your actual Google Drive file URL
    const resumeUrl = "https://drive.google.com/file/d/1Ntg6Buidd7cYis8nmCv8dcGlUgcshzFb/view?usp=sharing";
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.target = '_blank';
    link.download = 'Aniketh_Resume.pdf'; // The name you want the downloaded file to have
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      ref={sectionRef}
      id="resume" 
      className="section bg-gradient-to-b from-card to-background" 
      data-testid="resume-section"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 text-primary neon-text" data-testid="resume-title">
              Resume & Timeline
            </h2>
            <p className="text-xl text-muted-foreground mb-8">My educational and professional journey</p>
            <button 
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
              onClick={handleDownloadResume}
              data-testid="button-download-pdf"
            >
              <i className="fas fa-download mr-2"></i>Download Full Resume
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="glass p-8 rounded-lg text-center card-3d" data-testid="stat-experience">
              <div className="text-4xl font-orbitron font-bold text-primary mb-2">
                <AnimatedCounter target={0} isVisible={isVisible} />
              </div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="glass p-8 rounded-lg text-center card-3d" data-testid="stat-projects">
              <div className="text-4xl font-orbitron font-bold text-secondary mb-2">
                <AnimatedCounter target={4} isVisible={isVisible} />
              </div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="glass p-8 rounded-lg text-center card-3d" data-testid="stat-certifications">
              <div className="text-4xl font-orbitron font-bold text-accent mb-2">
                <AnimatedCounter target={3} isVisible={isVisible} />
              </div>
              <div className="text-muted-foreground">Certifications</div>
            </div>
          </div>

          {/* Education Timeline */}
          <TimelineSection 
            title="Education" 
            items={educationData}
            accentColor="from-primary to-secondary"
          />

          {/* Work Experience Timeline */}
          <TimelineSection 
            title="Work Experience" 
            items={workExperienceData}
            accentColor="from-secondary to-accent"
          />

          {/* Certifications Section */}
          <div className="mt-16 glass p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-center mb-8 text-accent">Certifications & Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-primary/10 transition-all">
                <i className="fas fa-certificate text-primary text-xl"></i>
                <span className="text-foreground">Data Structures & Algorithms</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/10 transition-all">
                <i className="fas fa-certificate text-secondary text-xl"></i>
                <span className="text-foreground">Front End Web Development</span>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-accent/10 transition-all">
                <i className="fas fa-certificate text-accent text-xl"></i>
                <span className="text-foreground">Database Management Systems</span>
              </div>
              {/* <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-primary/10 transition-all">
                <i className="fas fa-certificate text-primary text-xl"></i>
                <span className="text-foreground">Full Stack Web Development</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
