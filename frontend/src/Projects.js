import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './Projects.css';
import DedosCompiler from './Dedoscompiler';
import DedosIcon from './assets/dedos.jpg';
import TextSumm from './assets/python.jpg';

import TextSummProject from './TextSummProject';


export default function Projects() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [activeProject, setActiveProject] = useState(null);
  const [cardRect, setCardRect] = useState(null);
  const [closing, setClosing] = useState(false);

  const overlayRef = useRef(null);
  const modalContentRef = useRef(null);

  // Output state for compilers
  const [outputState, setOutputState] = useState({
    "DEDOS Compiler": { stage: '', output: '' },
  });

  const handleSetOutputState = (projectTitle, stage, output) => {
    setOutputState(prev => ({
      ...prev,
      [projectTitle]: { stage, output }
    }));
  };

  // --------------------------
  // Project Data
  // --------------------------
  const projects = [
    {
      title: "DEDOS Compiler",
      desc: "Programmer and creator of DEDOS Compiler, a Counter-Strike-themed compiler built in Python",
      details: ["As a programmer, I built DEDOS Compiler using python programming language, a Counter-Strike themed custom compiler with unique commands",
        "This is a sample statement from DEDOS Compiler project.",
        "The plant statement is the same as the print statement in python programming language. This outputs text to the console.",
      ],
      image: DedosIcon,
      bgColor: "#ebebeb",
      diagonalText: "Thesis",
      diagonalText2: "Peer-Reviewed Article",
      sampleCode: `plant("Hello World")`,
      codeLink: "https://github.com/Keimana/Dedos-Compiler", 
    },
    {
      title: "Adaptive Approach Applied in Text Summarization",
      desc: "Co‑author and developer of the adaptive dynamic text summarization algorithm presented in the peer-reviewed article.",
      details: null,
      image: TextSumm,
      bgColor: "#facb3f",
      codeLink: "https://tpmap.org/submission/index.php/tpm/article/view/1934/1530?fbclid=...",
    },


    {
      
      title: "PLM-EAMS",
      desc: "Enterprise asset management system.",
      details: "Manages assets, tracking, and reporting.",
      image: "/sample-eams.png",
      bgColor: "#ebebeb",
      codeLink: "https://github.com/ronanbaje/plm-eams",
    },
    {
      title: "Go Trike",
      desc: "Transportation booking platform.",
      details: "Optimized for local tricycle services.",
      image: "/sample-gotrike.png",
      bgColor: "#ebebeb", 
      codeLink: "https://github.com/ronanbaje/go-trike",
    },
  ];

  // --------------------------
  // Overlay timing
  // --------------------------
  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // --------------------------
  // Cursor tracking
  // --------------------------
  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --------------------------
  // Disable scroll when modal is open
  // --------------------------
  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [activeProject]);

  // --------------------------
  // Animate modal open
  // --------------------------
  useEffect(() => {
    if (!cardRect || !overlayRef.current) return;
    const overlay = overlayRef.current;
    requestAnimationFrame(() => {
      overlay.style.top = '50%';
      overlay.style.left = '50%';
      overlay.style.width = '75vw';
      overlay.style.height = '75vh';
      overlay.style.borderRadius = '0px';
      overlay.style.transform = 'translate(-50%, -50%)';
    });
  }, [cardRect]);

  // --------------------------
  // Modal handlers
  // --------------------------
  const handleOverlayClick = (e) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const handleCardClick = (project, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCardRect(rect);
    setActiveProject(project);
  };

  const handleClose = () => {
    if (!overlayRef.current || !cardRect) {
      setActiveProject(null);
      return;
    }

    setClosing(true);
    const overlay = overlayRef.current;

    overlay.style.top = `${cardRect.top}px`;
    overlay.style.left = `${cardRect.left}px`;
    overlay.style.width = `${cardRect.width}px`;
    overlay.style.height = `${cardRect.height}px`;
    overlay.style.borderRadius = '20px';
    overlay.style.transform = 'translate(0, 0)';

    setTimeout(() => {
      setClosing(false);
      setActiveProject(null);
      setCardRect(null);
    }, 500);
  };

  return (
    <div className="App">
      {showOverlay && (
        <div
          className="overlay"
          style={{
            '--cursor-x': `${cursorPos.x}px`,
            '--cursor-y': `${cursorPos.y}px`,
          }}
        />
      )}

      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Ronan Baje</h1>
        <ul className="nav-links">
          <li><Link to="/" className="home-btn">Home</Link></li>
        </ul>
      </nav>

      {/* Projects Section */}
      <section className="projects-section">
        <h2>Projects</h2>
        <div className="project-cards">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card shine"
              onClick={(e) => handleCardClick(project, e)}
              style={{ backgroundColor: project.bgColor }}
            >
              {project.title !== "Go Trike" && <div className="diagonal-text">Thesis</div>}
              {project.title === "Adaptive Approach Applied in Text Summarization" && <div className="diagonal-text-2">Peer-Reviewed Article</div>}
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </div>
          ))}
        </div>
      </section>

  {closing && <div> </div>}


{/* Modal */}
{activeProject && cardRect && (
  <>
    <div
      className="modal-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(7px)',
        zIndex: 998,
        transition: 'all 0.3s ease',
      }}
    />

    <div
      className="fullscreen-container"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 999 }}
      onClick={handleOverlayClick}
    >
      <div
        className="fullscreen-overlay"
        ref={overlayRef}
        style={{
          position: 'absolute',
          top: `${cardRect.top}px`,
          left: `${cardRect.left}px`,
          width: `${cardRect.width}px`,
          height: `${cardRect.height}px`,
          borderRadius: '20px',
          backgroundColor: '#ffffff',
          overflow: 'auto',
          transition: 'all 0.5s ease',
        }}
      >
        <div className="fullscreen-content" ref={modalContentRef} style={{ padding: '20px', position: 'relative' }}>

          {/* Header with icon + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            {activeProject.image && (
              <img
                src={activeProject.image}
                alt={activeProject.title}
                style={{ width: '60px', height: '60px', borderRadius: '12px' }}
              />
            )}
            <div>
              <h1 style={{ margin: 0 }}>{activeProject.title}</h1>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>{activeProject.desc}</p>
            </div>
          </div>

          {/* Details */}
          {Array.isArray(activeProject.details) ? (
            <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
              {activeProject.details.map((point, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>{point}</li>
              ))}
            </ul>
          ) : (
            <p>{activeProject.details}</p>
          )}

        {activeProject.title === "DEDOS Compiler" ? (
          <DedosCompiler
            projectTitle={activeProject.title}
            code={activeProject.sampleCode}
            outputState={outputState[activeProject.title]}
            setOutputState={handleSetOutputState}
            details={activeProject.details} // pass details if needed
          />
        ) : activeProject.title === "Adaptive Approach Applied in Text Summarization" ? (
          <TextSummProject />
        ) : (
          Array.isArray(activeProject.details) && (
            <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
              {activeProject.details.map((point, i) => (
                <li key={i} style={{ marginBottom: '6px' }}>{point}</li>
              ))}
            </ul>
          )
)}
          {/* See Full Code Button */}
          {activeProject.codeLink && activeProject.title !== "Adaptive Approach Applied in Text Summarization" && (
            <a
              href={activeProject.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                padding: '10px 16px',
                backgroundColor: '#facb3f',
                color: '#000',
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Link here
            </a>
          )}

        </div>
      </div>
    </div>
  </>
)}


      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Ronan Baje.</p>
      </footer>
    </div>
  );
}
