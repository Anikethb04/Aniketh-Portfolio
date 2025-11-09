import { useEffect, useRef, useState } from "react";

const skills = {
  programming: [
    { name: "Java", level: 95, color: "primary", icon: "fab fa-java" },
    { name: "Javascript", level: 90, color: "secondary", icon: "fab fa-js-square"},
    // { name: "TypeScript", level: 88, color: "accent", icon: "fas fa-code", experience: "2+ years" },
    // { name: "Java", level: 80, color: "primary", icon: "fab fa-java", experience: "2+ years" },
    // { name: "C++", level: 75, color: "secondary", icon: "fas fa-microchip", experience: "1+ year" },
    // { name: "Go", level: 70, color: "accent", icon: "fas fa-bolt", experience: "1+ year" }
  ],
  frontend: [
    { name: "React.js", level: 95, icon: "fab fa-react", color: "primary" },
    { name: "HTML", level: 95, icon: "fab fa-vuejs", color: "secondary" },
    { name: "CSS", level: 90, icon: "fas fa-layer-group", color: "accent" },
    // { name: "Tailwind CSS", level: 95, icon: "fas fa-palette", color: "primary" },
    // { name: "Three.js", level: 75, icon: "fas fa-cube", color: "secondary" },
    // { name: "D3.js", level: 80, icon: "fas fa-chart-area", color: "accent" }
  ],
  backend: [
    { name: "Node.js", level: 80, icon: "fab fa-node-js", color: "primary" },
    { name: "Express.js", level: 88, icon: "fas fa-server", color: "secondary" },
    // { name: "Django", level: 82, icon: "fas fa-cogs", color: "accent" },
    { name: "SQL", level: 85, icon: "fas fa-database", color: "primary" },
    { name: "MongoDB", level: 88, icon: "fas fa-leaf", color: "secondary" },
    // { name: "Redis", level: 75, icon: "fas fa-memory", color: "accent" }
  ],
  tools: [
    { name: "Git & GitHub", icon: "fab fa-github", proficiency: "Expert" },
    { name: "Docker", icon: "fab fa-docker", proficiency: "Advanced" },
    // { name: "AWS", icon: "fab fa-aws", proficiency: "Intermediate" },
    { name: "Kubernetes", icon: "fas fa-dharmachakra", proficiency: "Intermediate" },
    { name: "Jenkins", icon: "fas fa-tools", proficiency: "Intermediate" },
    // { name: "Figma", icon: "fab fa-figma", proficiency: "Advanced" }
  ],
  soft: [
    { name: "Problem Solving", icon: "fas fa-puzzle-piece", level: "Expert" },
    { name: "Team Leadership", icon: "fas fa-users", level: "Advanced" },
    { name: "Communication", icon: "fas fa-comments", level: "Expert" },
    { name: "Agile/Scrum", icon: "fas fa-sync", level: "Advanced" },
    { name: "Project Management", icon: "fas fa-tasks", level: "Advanced" },
    // { name: "Mentoring", icon: "fas fa-chalkboard-teacher", level: "Intermediate" }
  ]
};

function ProgressCircle({ skill, isVisible, delay = 0 }: { skill: any, isVisible: boolean, delay?: number }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  useEffect(() => {
    if (isVisible && circleRef.current && !animationStarted) {
      setTimeout(() => {
        if (circleRef.current) {
          circleRef.current.style.strokeDashoffset = strokeDashoffset.toString();
          setAnimationStarted(true);
        }
      }, delay);
    }
  }, [isVisible, strokeDashoffset, delay, animationStarted]);

  return (
    <div className="skill-item mb-6 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg bg-${skill.color}/20 flex items-center justify-center group-hover:bg-${skill.color}/30 transition-colors`}>
            <i className={`${skill.icon} text-${skill.color} text-sm`}></i>
          </div>
          <div>
            <span className="text-foreground font-semibold text-sm block">{skill.name}</span>
            {skill.experience && (
              <span className="text-muted-foreground text-xs">{skill.experience}</span>
            )}
          </div>
        </div>
        <span className={`text-${skill.color} font-bold text-lg`}>{skill.level}%</span>
      </div>
      
      <div className="progress-circle-container relative w-20 h-20 mx-auto group-hover:scale-110 transition-transform duration-300">
        <svg className="progress-circle w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            stroke="var(--border)" 
            strokeWidth="8" 
            fill="none"
            className="opacity-20"
          />
          {/* Progress circle */}
          <circle 
            ref={circleRef}
            cx="50" 
            cy="50" 
            r="40" 
            stroke={`var(--${skill.color})`} 
            strokeWidth="8" 
            fill="none" 
            strokeLinecap="round"
            className="progress-bar drop-shadow-lg"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
              transition: 'stroke-dashoffset 2.5s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: `drop-shadow(0 0 8px var(--${skill.color}))`
            }}
          />
        </svg>
        {/* Center percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-${skill.color} font-bold text-sm`}>{skill.level}%</span>
        </div>
      </div>
    </div>
  );
}

function SkillCard({ skill, color, delay = 0 }: { skill: any, color: string, delay?: number }) {
  return (
    <div 
      className={`glass p-4 rounded-xl border border-${color}/20 hover:border-${color}/40 transition-all duration-300 group cursor-pointer hover:scale-105`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg bg-${color}/20 flex items-center justify-center group-hover:bg-${color}/30 transition-colors`}>
          <i className={`${skill.icon} text-${color} text-lg`}></i>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground text-sm">{skill.name}</h4>
          {skill.level && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-muted/20 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full bg-${color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className={`text-${color} text-xs font-medium`}>{skill.level}%</span>
            </div>
          )}
          {skill.proficiency && (
            <span className={`text-${color} text-xs font-medium`}>{skill.proficiency}</span>
          )}
          {skill.level && (
            <span className={`text-${color} text-xs font-medium`}>{skill.level}</span>
          )}
        </div>
      </div>
    </div>
  );
}


export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('programming');

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

  const tabs = [
    { id: 'programming', label: 'Programming', icon: 'fas fa-code' },
    { id: 'frontend', label: 'Frontend', icon: 'fas fa-paint-brush' },
    { id: 'backend', label: 'Backend', icon: 'fas fa-server' },
    { id: 'tools', label: 'Tools', icon: 'fas fa-tools' },
    { id: 'soft', label: 'Soft Skills', icon: 'fas fa-users' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="section bg-gradient-to-b from-card to-background relative overflow-hidden" 
      data-testid="skills-section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-accent/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-7xl font-orbitron font-bold mb-8 bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent neon-text" data-testid="skills-title">
              Skills & Expertise
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">Mastering technologies to build the future</p>
            
            {/* Tab navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/50'
                      : 'glass border border-secondary/30 text-secondary hover:bg-secondary/10'
                  }`}
                >
                  <i className={tab.icon}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skills content based on active tab */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Programming Skills */}
            {activeTab === 'programming' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="skills-programming">
                {skills.programming.map((skill, index) => (
                  <div key={skill.name} className="glass p-6 rounded-xl card-3d">
                    <ProgressCircle 
                      skill={skill} 
                      isVisible={isVisible} 
                      delay={index * 200}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Frontend Skills */}
            {activeTab === 'frontend' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="skills-frontend">
                {skills.frontend.map((skill, index) => (
                  <SkillCard 
                    key={skill.name} 
                    skill={skill} 
                    color={skill.color}
                    delay={index * 100}
                  />
                ))}
              </div>
            )}
            
            {/* Backend Skills */}
            {activeTab === 'backend' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="skills-backend">
                {skills.backend.map((skill, index) => (
                  <SkillCard 
                    key={skill.name} 
                    skill={skill} 
                    color={skill.color}
                    delay={index * 100}
                  />
                ))}
              </div>
            )}
            
            {/* Tools */}
            {activeTab === 'tools' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="skills-tools">
                {skills.tools.map((skill, index) => (
                  <SkillCard 
                    key={skill.name} 
                    skill={skill} 
                    color={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}
                    delay={index * 100}
                  />
                ))}
              </div>
            )}
            
            {/* Soft Skills */}
            {activeTab === 'soft' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="skills-soft">
                {skills.soft.map((skill, index) => (
                  <SkillCard 
                    key={skill.name} 
                    skill={skill} 
                    color={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}
                    delay={index * 100}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Skills summary */}
          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground text-sm">Technologies</div>
            </div>
            <div className="text-center glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-secondary mb-2">none</div>
              <div className="text-muted-foreground text-sm">Years Experience</div>
            </div>
            <div className="text-center glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-accent mb-2">3</div>
              <div className="text-muted-foreground text-sm">Projects Completed</div>
            </div>
            {/* <div className="text-center glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground text-sm">Client Satisfaction</div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
