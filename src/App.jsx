import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import './App.css';


const TiltCard = ({ children, className, variants }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const titleWordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15, stiffness: 200 } }
};

const projectVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const formStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function App() {
  const formRef = useRef();
  const [status, setStatus] = useState('');
  const [activeTab, setActiveTab] = useState('experience');
  const [activeFaq, setActiveFaq] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
        console.log(result.text);
        setStatus('Message sent successfully!');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
    }, (error) => {
        console.log(error.text);
        setStatus('Failed to send message. Please ensure your VITE_ keys are set correctly.');
    });
  };

  const heroWords = ["Crafting", "Digital", "Experiences"];

  return (
    <div className="app-container">
      <motion.div 
        className="floating-status solid-card"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <span className="status-dot"></span>
        Available for Freelance
      </motion.div>

      <nav className="navbar container">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="logo"
        >
          Ovais.
        </motion.div>
        <motion.ul 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="nav-links"
        >
          <li><motion.a href="#about" whileHover={{ color: '#8b5cf6' }}>About</motion.a></li>
          <li><motion.a href="#projects" whileHover={{ color: '#8b5cf6' }}>Projects</motion.a></li>
          <li><motion.a href="#contact" whileHover={{ color: '#8b5cf6' }}>Contact</motion.a></li>
          <li style={{display: 'flex', alignItems: 'center'}}>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
        </motion.ul>
      </nav>

      <main>
        <motion.section 
          id="hero" 
          className="hero container"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="hero-content">
            <motion.h1 className="hero-title" variants={staggerContainer}>
                <motion.span 
                  variants={titleWordVariants}
                  className="accent-gradient"
                >
                  Software Developer
                </motion.span>
            </motion.h1>
            <motion.p className="hero-subtitle" variants={fadeInUp}>
              Hi, I'm Ovais. A computer science student and developer focused on building clean, practical web applications.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeInUp}>
              <motion.a 
                href="#projects" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a 
                href="#contact" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        <motion.div 
          className="marquee-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="marquee-content">
            {/* First Set */}
            <span className="marquee-item">React</span>
            <span className="marquee-item">•</span>
            <span className="marquee-item">Node.js</span>
            <span className="marquee-item">•</span>
            <span className="marquee-item">Express</span>
            <span className="marquee-item">•</span>
            <span className="marquee-item">MongoDB</span>
            <span className="marquee-item">•</span>
            <span className="marquee-item">Next.js 15</span>
            <span className="marquee-item">•</span>
            <span className="marquee-item">Tailwind CSS</span>
            <span className="marquee-item">•</span>
            <span className="marquee-item">Stripe</span>
            <span className="marquee-item">•</span>
            <span className="marquee-item">Postgres</span>
            <span className="marquee-item">•</span>
            {/* Duplicate Set for Infinite Scroll Effect */}
            <span className="marquee-item" aria-hidden="true">React</span>
            <span className="marquee-item" aria-hidden="true">•</span>
            <span className="marquee-item" aria-hidden="true">Node.js</span>
            <span className="marquee-item" aria-hidden="true">•</span>
            <span className="marquee-item" aria-hidden="true">Express</span>
            <span className="marquee-item" aria-hidden="true">•</span>
            <span className="marquee-item" aria-hidden="true">MongoDB</span>
            <span className="marquee-item" aria-hidden="true">•</span>
            <span className="marquee-item" aria-hidden="true">Next.js 15</span>
            <span className="marquee-item" aria-hidden="true">•</span>
            <span className="marquee-item" aria-hidden="true">Tailwind CSS</span>
            <span className="marquee-item" aria-hidden="true">•</span>
            <span className="marquee-item" aria-hidden="true">Stripe</span>
            <span className="marquee-item" aria-hidden="true">•</span>
            <span className="marquee-item" aria-hidden="true">Postgres</span>
            <span className="marquee-item" aria-hidden="true">•</span>
          </div>
        </motion.div>

        <motion.section 
          id="about" 
          className="section container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-title">About Me</h2>
          <motion.div 
            className="about-content solid-card"
            whileHover={{ y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <p className="text-secondary text-center">
              I'm a BSCS student at Bahria University who loves building things for the web. 
              I work primarily with React and Node.js to create platforms that solve real problems. 
              Whether it's building a straightforward frontend or setting up a reliable backend database, I enjoy the entire development process.
            </p>
          </motion.div>
        </motion.section>

        <motion.section 
          id="resume" 
          className="section container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="section-title">Resume</h2>
          <motion.div 
            className="resume-container solid-card"
            whileHover={{ y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="resume-tabs">
              <button 
                className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                Experience
              </button>
              <button 
                className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                Education
              </button>
            </div>
            <div className="resume-content">
              <AnimatePresence mode="wait">
                {activeTab === 'experience' && (
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="resume-item"
                  >
                    <div className="resume-header">
                      <h3>Freelance Full-Stack Developer</h3>
                      <span className="text-secondary" style={{fontWeight: 500, display: 'inline-block', marginTop: '0.4rem'}}>2023 - Present</span>
                    </div>
                    <p className="text-secondary text-left">
                      Built full-stack web applications using React, Next.js, and Node.js. 
                      Worked directly with clients to deliver MVPs including e-commerce platforms and productivity tools. 
                      Prioritized responsive layouts and maintainable database schemas.
                    </p>
                  </motion.div>
                )}
                {activeTab === 'education' && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="resume-item"
                  >
                    <div className="resume-header">
                      <h3>Bachelor of Science in Computer Science (BSCS)</h3>
                      <span className="text-secondary" style={{fontWeight: 500, display: 'inline-block', marginTop: '0.4rem'}}>Expected 2026</span>
                    </div>
                    <p className="text-primary text-left" style={{fontWeight: '600', marginBottom: '1rem'}}>Bahria University</p>
                    <p className="text-secondary text-left">
                      Core coursework in Data Structures, Web Development, and Software Engineering.
                      Actively participating in coding projects to apply these theoretical concepts practically.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.section>

        <motion.section 
          id="skills" 
          className="section container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="section-title">My Tech Stack</motion.h2>
          <div className="skills-bento-grid">
            <motion.div 
              variants={projectVariants} 
              className="bento-card solid-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="bento-icon">💻</div>
              <h3>Frontend</h3>
              <p className="text-secondary text-sm">Building accessible and responsive user interfaces.</p>
              <div className="bento-tags">
                <span>React</span>
                <span>Next.js 15</span>
                <span>Tailwind CSS</span>
                <span>Framer Motion</span>
              </div>
            </motion.div>
            
            <motion.div 
              variants={projectVariants} 
              className="bento-card solid-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="bento-icon">⚙️</div>
              <h3>Backend</h3>
              <p className="text-secondary text-sm">Developing scalable logic and APIs.</p>
              <div className="bento-tags">
                <span>Node.js</span>
                <span>Express</span>
                <span>Supabase</span>
              </div>
            </motion.div>
            
            <motion.div 
              variants={projectVariants} 
              className="bento-card solid-card span-2"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="bento-icon">🗄️</div>
              <h3>Databases & Tools</h3>
              <p className="text-secondary text-sm">Handling data management and deployment workflows.</p>
              <div className="bento-tags">
                <span>MongoDB</span>
                <span>PostgreSQL</span>
                <span>Stripe</span>
                <span>Git</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="services" 
          className="section container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="section-title">My Services</motion.h2>
          <div className="services-grid">
            <motion.div 
              variants={projectVariants} 
              className="service-card solid-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="service-icon">💻</div>
              <h3>Full-Stack Development</h3>
              <p className="text-secondary text-left">
                Building web applications from the ground up using React and Node.js ecosystems.
              </p>
            </motion.div>
            <motion.div 
              variants={projectVariants} 
              className="service-card solid-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="service-icon">🎨</div>
              <h3>Frontend Development</h3>
              <p className="text-secondary text-left">
                Creating responsive, accessible, and fast user interfaces with modern CSS frameworks.
              </p>
            </motion.div>
            <motion.div 
              variants={projectVariants} 
              className="service-card solid-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="service-icon">⚙️</div>
              <h3>Backend & APIs</h3>
              <p className="text-secondary text-left">
                Setting up databases, REST APIs, and simple payment integrations using Stripe.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="projects" 
          className="section container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="section-title">Selected Projects</motion.h2>
          
          <div className="projects-grid">
            {/* AgileFlow Project Card */}
            <TiltCard variants={projectVariants} className="project-card">
              <div className="project-image-placeholder">
                <img src="/agileflow.png" alt="AgileFlow Project Preview" className="project-image" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block';}} />
                <span className="accent-gradient fallback-text" style={{fontSize: '2rem', fontWeight: 'bold', display: 'none'}}>AgileFlow</span>
              </div>
              <div className="project-info">
                <h3>AgileFlow</h3>
                <p className="text-secondary text-left">
                  A Kanban board application with task editing, team invites, and Stripe payments. 
                  Built with React, Express, and MongoDB.
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
            </TiltCard>
            
            {/* Fresh Bakes Project Card */}
            <TiltCard variants={projectVariants} className="project-card">
              <div className="project-image-placeholder">
                <img src="/freshbakes.png" alt="FreshBakes Project Preview" className="project-image" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block';}} />
                <span className="accent-gradient fallback-text" style={{fontSize: '2rem', fontWeight: 'bold', filter: 'hue-rotate(45deg)', display: 'none'}}>FreshBakes</span>
              </div>
              <div className="project-info">
                <h3>Fresh Bakes E-Commerce</h3>
                <p className="text-secondary text-left">
                  A full-stack e-commerce platform mapping products securely with managed checkout capabilities.
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
            </TiltCard>

            {/* Res AI Project Card */}
            <TiltCard variants={projectVariants} className="project-card">
              <div className="project-image-placeholder">
                <img src="/res-ai.png" alt="Res AI Project Preview" className="project-image" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block';}} />
                <span className="accent-gradient fallback-text" style={{fontSize: '2rem', fontWeight: 'bold', filter: 'hue-rotate(120deg)', display: 'none'}}>Res AI</span>
              </div>
              <div className="project-info">
                <h3>Res AI</h3>
                <p className="text-secondary text-left">
                  A modern frontend interface designed for an AI service highlighting standard CSS layouts and standard component structures.
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
            </TiltCard>
            
          </div>
        </motion.section>

        <motion.section 
          id="values" 
          className="section container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="section-title">Why Work With Me</motion.h2>
          <div className="values-grid">
            <motion.div 
              variants={projectVariants} 
              className="value-card solid-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3>Availability</h3>
              <p className="text-secondary text-left">
                I am currently taking on freelance projects and open to joining development teams.
              </p>
            </motion.div>
            <motion.div 
              variants={projectVariants} 
              className="value-card solid-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3>Punctuality</h3>
              <p className="text-secondary text-left">
                I focus on realistic scheduling and tracking my time effectively to ensure deadlines are met.
              </p>
            </motion.div>
            <motion.div 
              variants={projectVariants} 
              className="value-card solid-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3>Communication</h3>
              <p className="text-secondary text-left">
                I won't overload you with tech jargon. I'll simply keep you informed of the project's practical progress.
              </p>
            </motion.div>
            <motion.div 
              variants={projectVariants} 
              className="value-card solid-card"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3>Code Quality</h3>
              <p className="text-secondary text-left">
                I prioritize writing clean, readable, and well-structured code over fast hacks, making it easier to maintain.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="contact" 
          className="section container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="contact-card">
            <h2 className="section-title" style={{marginBottom: '1rem'}}>Let's Work Together</h2>
            <p className="text-secondary text-center" style={{marginBottom: '2.5rem', marginInline: 'auto'}}>
              I'm currently available for freelance work and open to new full-stack opportunities.
            </p>
            
            <motion.form 
              ref={formRef} 
              className="contact-form" 
              onSubmit={sendEmail}
              variants={formStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div className="form-group" variants={fadeInUp}>
                <input type="text" name="user_name" placeholder="Your Name" required className="form-input" />
              </motion.div>
              <motion.div className="form-group" variants={fadeInUp}>
                <input type="email" name="user_email" placeholder="Your Email" required className="form-input" />
              </motion.div>
              <motion.div className="form-group" variants={fadeInUp}>
                <textarea name="message" placeholder="Your Message" required className="form-input" rows="5"></textarea>
              </motion.div>
              <motion.button 
                type="submit" 
                className="btn btn-primary" 
                style={{width: '100%', marginTop: '1rem'}}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
              {status && <p className="text-secondary" style={{marginTop: '1rem', fontSize: '0.9rem'}}>{status}</p>}
            </motion.form>

          </div>
        </motion.section>
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
