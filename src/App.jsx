import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);
    
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    }
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

const FadeIn = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useElementOnScreen({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  return (
    <div 
      ref={ref} 
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

function App() {
  return (
    <div className="app-container">
      <nav className="navbar container">
        <div className="logo">Ovais.</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main>
        <FadeIn delay={0}>
          <section id="hero" className="hero container">
            <div className="hero-content">
              <h1 className="hero-title">
                Crafting <span className="accent-gradient">Digital Experiences</span>
              </h1>
              <p className="hero-subtitle">
                Hi, I'm Ovais. A passionate Full-Stack Developer building modern, high-performance web applications.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">View Projects</a>
                <a href="#contact" className="btn btn-secondary">Get in Touch</a>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={100}>
          <section id="about" className="section container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <p className="text-secondary text-center">
                I am a web developer with expertise in React, Node.js, Express, and modern CSS frameworks. 
                I love turning complex problems into simple, beautiful, and intuitive designs. 
                Whether it's building a fast frontend or a scalable backend architecture, I'm always up for the challenge.
              </p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={100}>
          <section id="projects" className="section container">
            <h2 className="section-title">Selected Projects</h2>
            
            <div className="projects-grid">
              {/* AgileFlow Project Card */}
              <div className="project-card">
                <div className="project-image-placeholder">
                  <span className="accent-gradient" style={{fontSize: '2rem', fontWeight: 'bold'}}>AgileFlow</span>
                </div>
                <div className="project-info">
                  <h3>AgileFlow</h3>
                  <p className="text-secondary text-left">
                    Real-time Kanban board with task editing, team invites, and Stripe payments. 
                    Built with React, Express, Socket.io, and MongoDB to deliver a seamless collaborative experience.
                  </p>
                  <div className="project-tags">
                    <span className="tag">React</span>
                    <span className="tag">Express</span>
                    <span className="tag">Socket.io</span>
                    <span className="tag">MongoDB</span>
                    <span className="tag">Stripe</span>
                  </div>
                  <div className="project-links">
                    <a href="https://agileflow-weld.vercel.app" target="_blank" rel="noopener noreferrer" className="link-hover">Live Demo ↗</a>
                    <a href="https://github.com/ovaisbinamer/agileflow" target="_blank" rel="noopener noreferrer" className="link-hover">GitHub ↗</a>
                  </div>
                </div>
              </div>
              
              {/* Fresh Bakes Project Card */}
              <div className="project-card">
                <div className="project-image-placeholder">
                  <span className="accent-gradient" style={{fontSize: '2rem', fontWeight: 'bold', filter: 'hue-rotate(45deg)'}}>FreshBakes</span>
                </div>
                <div className="project-info">
                  <h3>Fresh Bakes E-Commerce</h3>
                  <p className="text-secondary text-left">
                    A premium Full-Stack Bakery E-commerce platform featuring a complete shopping experience with secure payments and data management.
                  </p>
                  <div className="project-tags">
                    <span className="tag" style={{borderColor: 'rgba(250, 204, 21, 0.2)', color: '#facc15', background: 'rgba(250, 204, 21, 0.1)'}}>Next.js 15</span>
                    <span className="tag" style={{borderColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)'}}>TypeScript</span>
                    <span className="tag" style={{borderColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)'}}>Supabase</span>
                    <span className="tag" style={{borderColor: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)'}}>Stripe</span>
                  </div>
                  <div className="project-links">
                    <a href="https://freshbakes-ecommerce.vercel.app" target="_blank" rel="noopener noreferrer" className="link-hover">Live Demo ↗</a>
                    <a href="https://github.com/ovaisbinamer/freshbakes-ecommerce" target="_blank" rel="noopener noreferrer" className="link-hover">GitHub ↗</a>
                  </div>
                </div>
              </div>

              {/* Res AI Project Card */}
              <div className="project-card">
                <div className="project-image-placeholder">
                  <span className="accent-gradient" style={{fontSize: '2rem', fontWeight: 'bold', filter: 'hue-rotate(120deg)'}}>Res AI</span>
                </div>
                <div className="project-info">
                  <h3>Res AI</h3>
                  <p className="text-secondary text-left">
                    A modern, interactive frontend interface design for an AI service featuring sleek animations and a captivating user experience.
                  </p>
                  <div className="project-tags">
                    <span className="tag" style={{borderColor: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24', background: 'rgba(251, 191, 36, 0.1)'}}>JavaScript</span>
                    <span className="tag" style={{borderColor: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', background: 'rgba(236, 72, 153, 0.1)'}}>React</span>
                    <span className="tag" style={{borderColor: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)'}}>Tailwind</span>
                  </div>
                  <div className="project-links">
                    <a href="https://res-ai-dusky.vercel.app" target="_blank" rel="noopener noreferrer" className="link-hover">Live Demo ↗</a>
                    <a href="https://github.com/ovaisbinamer/res-ai-website" target="_blank" rel="noopener noreferrer" className="link-hover">GitHub ↗</a>
                  </div>
                </div>
              </div>
              
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={100}>
          <section id="contact" className="section container">
            <div className="contact-card">
              <h2 className="section-title" style={{marginBottom: '1rem'}}>Let's Work Together</h2>
              <p className="text-secondary text-center" style={{marginBottom: '2.5rem', marginInline: 'auto'}}>
                I'm currently available for freelance work and open to new full-stack opportunities.
              </p>
              <a href="mailto:hello@example.com" className="btn btn-primary">Say Hello</a>
            </div>
          </section>
        </FadeIn>
      </main>
      
      <footer className="footer container">
        <div className="footer-links" style={{margin: '0 auto'}}>
          <a href="https://github.com/ovaisbinamer" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/ovaisbinamer" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
