import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const contactMutation = useMutation({
    mutationFn: (data: ContactForm) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      setForm({ name: '', email: '', message: '' });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(form);
  };

  const handleInputChange = (field: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="section bg-gradient-to-b from-background to-card relative overflow-hidden min-h-screen py-20" 
      data-testid="contact-section"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl md:text-7xl font-orbitron font-bold mb-8 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent neon-text" data-testid="contact-title">
              Contact
            </h2>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="glass p-8 rounded-2xl border border-primary/20" data-testid="contact-form-container">
              <h3 className="text-2xl font-bold text-foreground mb-6">Contact Form</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={handleInputChange('name')}
                    className="w-full px-4 py-3 bg-muted/50 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleInputChange('email')}
                    className="w-full px-4 py-3 bg-muted/50 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={handleInputChange('message')}
                    rows={6}
                    className="w-full px-4 py-3 bg-muted/50 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="glass p-6 rounded-2xl border border-accent/20">
                <h3 className="text-xl font-bold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm">📧</span>
                    </div>
                    <span className="text-muted-foreground">anikethb04@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-secondary text-sm">🌐</span>
                    </div>
                    <span className="text-muted-foreground">Available worldwide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent text-sm">⚡</span>
                    </div>
                    <span className="text-muted-foreground">Response within 24 hours</span>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-primary/20">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  Availability Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className="text-sm font-semibold text-green-500">Available for Projects</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Load:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted/20 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-yellow-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">75%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}