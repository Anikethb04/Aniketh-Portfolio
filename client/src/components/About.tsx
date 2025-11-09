import { useState, useEffect, useRef } from "react";

interface TimelineItem {
  id: string;
  title: string;
  period: string;
  description: string;
  details: string[];
  color: string;
  icon: string;
  side: 'left' | 'right';
}

export default function About() {
  const [isConsoleMode, setIsConsoleMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [typingText, setTypingText] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const fullText = "Passionate developer crafting digital experiences...";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let i = 0;
      const typing = setInterval(() => {
        if (i <= fullText.length) {
          setTypingText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(typing);
        }
      }, 100);
      return () => clearInterval(typing);
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section bg-gradient-to-b from-background to-card relative overflow-hidden"
      data-testid="about-section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2
              className="text-5xl md:text-7xl font-orbitron font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent neon-text"
              data-testid="about-title"
            >
              About Me
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono">
              {typingText}
              <span className="animate-pulse">|</span>
            </p>

            {/* Mode Toggle */}
            <div className="flex justify-center mb-12">
              <div className="glass p-2 rounded-xl border border-primary/20 flex gap-4">
                <button
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    !isConsoleMode
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                      : 'text-primary hover:bg-primary/10'
                  }`}
                  onClick={() => setIsConsoleMode(false)}
                  data-testid="button-timeline-mode"
                >
                  <i className="fas fa-timeline"></i> Timeline
                </button>
                <button
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isConsoleMode
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                      : 'text-primary hover:bg-primary/10'
                  }`}
                  onClick={() => setIsConsoleMode(true)}
                  data-testid="button-console-mode"
                >
                  <i className="fas fa-terminal"></i> Console
                </button>
              </div>
            </div>
          </div>

          {/* Timeline View */}
          {!isConsoleMode && (
            <div
              className={`timeline-container transition-all duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              data-testid="timeline-view"
            >
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent shadow-lg shadow-primary/50"></div>

                {/* Intro card */}
                <div className="mb-16 flex justify-center">
                  <div className="glass p-8 rounded-2xl card-3d max-w-2xl border border-primary/20">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white">
                        BA
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">Belpu Aniketh</h3>
                        <p className="text-muted-foreground">Java Full-Stack Developer</p>
                        <p className="text-sm text-accent">Hyderabad, India</p>
                      </div>
                    </div>
                    <p className="text-foreground leading-relaxed">
                      I’m Belpu Aniketh, a dedicated Full Stack Web Developer with strong expertise in JavaScript, Node.js, Express.js, and MongoDB. I focus on building scalable, efficient, and user-centered web applications that deliver seamless digital experiences.
                      With a solid foundation in both frontend and backend development, I’m highly motivated to contribute to dynamic development teams, embrace new technologies, and continuously grow as a software professional.
                    </p>
                  </div>
                </div>

                {/* Timeline items */}
                <div className="space-y-20">
                  {[
                    {
                      id: 'education',
                      title: 'Computer Science And Engineering',
                      period: '2023 - 2027',
                      description: 'Pursuing BTech in Computer Science with focus on AI and Web Development. GPA: 8.03/10.0',
                      details: ['Algorithms & Data Structures', 'Machine Learning & AI', 'Database Systems', 'Software Engineering'],
                      color: 'primary',
                      icon: 'fas fa-graduation-cap',
                      side: 'left'
                    },
                    {
                      id: 'internship',
                      title: 'Frontend Developer Intern at IBM SkillsBuild',
                      period: 'Aug 2025 - Oct 2025',
                      description: 'Completed FrontEnd Development at IBM-Skills Build.',
                      details: ['Learnt JS', 'Collaborated with developers', 'Implemented RESTful APIs'],
                      color: 'secondary',
                      icon: 'fas fa-briefcase',
                      side: 'right'
                    }
                  ].map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between transition-all duration-1000 ${
                        isVisible
                          ? 'opacity-100 translate-x-0'
                          : `opacity-0 ${item.side === 'left' ? '-translate-x-10' : 'translate-x-10'}`
                      }`}
                      data-testid={`timeline-item-${item.id}`}
                    >
                      {item.side === 'left' ? (
                        <>
                          <div className="w-5/12 glass p-8 rounded-2xl card-3d border border-primary/20 group hover:border-primary/40 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`w-12 h-12 rounded-xl bg-${item.color}/20 flex items-center justify-center group-hover:bg-${item.color}/30 transition-colors`}>
                                <i className={`${item.icon} text-${item.color} text-xl`}></i>
                              </div>
                              <div>
                                <h3 className={`text-xl font-bold text-${item.color} group-hover:text-${item.color}/80 transition-colors`}>{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.period}</p>
                              </div>
                            </div>
                            <p className="text-foreground mb-4 leading-relaxed">{item.description}</p>
                            <div className="space-y-2">
                              {item.details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className={`w-2 h-2 rounded-full bg-${item.color}`}></div>
                                  {detail}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="w-2/12 flex justify-center">
                            <div className={`w-6 h-6 bg-${item.color} rounded-full border-4 border-background shadow-lg shadow-${item.color}/50 animate-pulse`}></div>
                          </div>
                          <div className="w-5/12"></div>
                        </>
                      ) : (
                        <>
                          <div className="w-5/12"></div>
                          <div className="w-2/12 flex justify-center">
                            <div className={`w-6 h-6 bg-${item.color} rounded-full border-4 border-background shadow-lg shadow-${item.color}/50 animate-pulse`}></div>
                          </div>
                          <div className="w-5/12 glass p-8 rounded-2xl card-3d border border-primary/20 group hover:border-primary/40 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                              <div className={`w-12 h-12 rounded-xl bg-${item.color}/20 flex items-center justify-center group-hover:bg-${item.color}/30 transition-colors`}>
                                <i className={`${item.icon} text-${item.color} text-xl`}></i>
                              </div>
                              <div>
                                <h3 className={`text-xl font-bold text-${item.color} group-hover:text-${item.color}/80 transition-colors`}>{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.period}</p>
                              </div>
                            </div>
                            <p className="text-foreground mb-4 leading-relaxed">{item.description}</p>
                            <div className="space-y-2">
                              {item.details.map((detail, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className={`w-2 h-2 rounded-full bg-${item.color}`}></div>
                                  {detail}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Console View */}
          {isConsoleMode && (
            <div
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              data-testid="console-view"
            >
              <div className="glass p-8 rounded-2xl font-mono text-sm border border-primary/20 shadow-2xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary/20">
                  <div className="flex items-center gap-4">
                    <div className="flex space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-muted-foreground font-semibold">Terminal — belpu@portfolio</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Active Session</div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">belpu@portfolio:~$</span>
                    <span className="text-secondary">cat about.json</span>
                  </div>

                  <div className="bg-muted/10 p-4 rounded-lg border border-accent/20">
                    <div className="text-accent mb-2">{"{"}</div>
                    <div className="text-foreground pl-4">"name": "Belpu Aniketh",</div>
                    <div className="text-foreground pl-4">"role": "Java Full-Stack Developer",</div>
                    <div className="text-foreground pl-4">"location": "Hyderabad, India",</div>
                    <div className="text-foreground pl-4">"education": "Computer Science - BTech (GPA: 8.03)",</div>
                    <div className="text-foreground pl-4">"passion": "Building innovative digital experiences",</div>
                    <div className="text-foreground pl-4">"motto": "Code with purpose, design with empathy",</div>
                    <div className="text-foreground pl-4">"availability": "Open for opportunities"</div>
                    <div className="text-accent">{"}"}</div>
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <span className="text-accent font-bold">belpu@portfolio:~$</span>
                    <span className="text-secondary">ls -la skills/</span>
                  </div>

                  <div className="bg-muted/10 p-4 rounded-lg border border-primary/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="text-primary">drwxr-xr-x java/</div>
                      <div className="text-secondary">drwxr-xr-x backend/</div>
                      <div className="text-accent">drwxr-xr-x databases/</div>
                      <div className="text-primary">drwxr-xr-x devops/</div>
                      <div className="text-secondary">-rw-r--r-- frontend</div>
                      <div className="text-primary">-rw-r--r-- node.js</div>
                      <div className="text-secondary">-rw-r--r-- react.jsx</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <span className="text-accent font-bold">belpu@portfolio:~$</span>
                    <span className="text-secondary">git log --oneline</span>
                  </div>

                  <div className="bg-muted/10 p-4 rounded-lg border border-secondary/20">
                    <div className="space-y-1 text-sm">
                      <div><span className="text-accent">a7f2c3d</span> <span className="text-foreground">feat: Enhanced portfolio with modern animations</span></div>
                      <div><span className="text-accent">b8e4d5f</span> <span className="text-foreground">fix: Improved mobile responsiveness</span></div>
                      <div><span className="text-accent">c9f6e7a</span> <span className="text-foreground">feat: Added AI-powered project recommendations</span></div>
                      <div><span className="text-accent">d1a8b9c</span> <span className="text-foreground">docs: Updated README with deployment instructions</span></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <span className="text-accent font-bold">belpu@portfolio:~$</span>
                    <span className="text-secondary">echo $PHILOSOPHY</span>
                  </div>

                  <div className="bg-muted/10 p-4 rounded-lg border border-accent/20">
                    <div className="text-foreground italic">
                      "Great software is built not just with code, but with curiosity, creativity, and a genuine desire to solve meaningful problems. Every line of code is an opportunity to make someone's life better."
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6">
                    <span className="text-accent font-bold">belpu@portfolio:~$</span>
                    <span className="text-primary animate-pulse">|</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
