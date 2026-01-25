import React, { useState, useEffect } from 'react';

/* =======================
   ASSETS
======================= */

// Project icons
import DedosIcon from './assets/dedos.jpg';
import PythonIcon from './assets/PythonIcon.png';
import FlutterIcon from './assets/FlutterIcon.png';
import FirebaseIcon from './assets/FirebaseIcon.png';
import FigmaIcon from './assets/FigmaIcon.png';
import NLPIcon from './assets/nlp.png';
import VscodeIcon from './assets/VscodeIcon.png';
import PandasIcon from './assets/PandasIcon.png';
import PlmPreview from './assets/plm-1.png';

// Text Summ images
import research1 from './assets/research-1.png';
import research2 from './assets/research-2.png';

// PLM-EAMS images
import eams1 from './assets/eams-1.png';
import eams2 from './assets/eams-2.png';


/* =======================
   COMPONENTS
======================= */

    export function DedosCompiler({ 
      code = 'plant("Hello World")',
      outputState, 
      setOutputState, 
      projectTitle }) {
      const { stage: activeStage, output } = outputState;

      const techStack = [PythonIcon, VscodeIcon];

      const handleStageClick = (stage) => {
        let newOutput = '';

        switch (stage) {
          case 'lexical': {
            const tokens = [];
            let buffer = '';
            let inString = false;

            for (let char of code) {
              if (char === '"' || char === "'") {
                if (inString) {
                  buffer += char;
                  tokens.push(buffer);
                  buffer = '';
                  inString = false;
                } else {
                  if (buffer) tokens.push(...buffer.split(''));
                  buffer = char;
                  inString = true;
                }
              } else if (inString) {
                buffer += char;
              } else if (/[a-zA-Z]/.test(char)) {
                buffer += char;
              } else if (/\s/.test(char)) {
                if (buffer) {
                  tokens.push(...buffer.split(''));
                  buffer = '';
                }
              } else {
                if (buffer) {
                  tokens.push(...buffer.split(''));
                  buffer = '';
                }
                if (char.trim()) tokens.push(char);
              }
            }

            if (buffer) {
              inString ? tokens.push(buffer) : tokens.push(...buffer.split(''));
            }

            newOutput =
              'Lexical Analysis: tokenizing source code...\nTokens: ' +
              tokens.join(', ');
            break;
          }

          case 'syntax':
            newOutput =
              'Syntax Analysis: building parse tree...\nParse Tree: [Program → plantStatement → "(" → "Hello World" → ")"]';
            break;

          case 'semantic':
            newOutput =
              'Semantic Check: type & scope verification...\nAll types valid.';
            break;

          case 'evaluation': {
            const simulatedOutput = code.match(/plant\((.*)\)/)?.[1] || '';
            newOutput = 'Evaluation:\nOutput: ' + simulatedOutput;
            break;
          }

          default:
            newOutput = '';
        }

        setOutputState(projectTitle, stage, newOutput);
      };

      return (
<div style={{ marginTop: '50px', fontFamily: 'monospace' }}>
  <textarea
    value={code}
    readOnly
    rows={5}
    style={{
      width: '90%',
      padding: '20px',
      fontFamily: 'monospace',
      fontSize: '0.9rem',
      borderRadius: '8px',
      resize: 'none',
    }}
  />

  <div
    style={{
      marginTop: '40px',
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
    }}
  >
    {['lexical', 'syntax', 'semantic', 'evaluation'].map((s) => (
      <button
        key={s}
        onClick={() => handleStageClick(s)}
        style={{
          backgroundColor: activeStage === s ? '#facb3f' : '#eee',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {s.charAt(0).toUpperCase() + s.slice(1)}
      </button>
    ))}
  </div>

  <pre
    style={{
      background: '#1e1e1e',
      color: '#00ff00',
      padding: '14px',
      borderRadius: '8px',
      marginTop: '40px',
      whiteSpace: 'pre-wrap',
    }}
  >
    {output}
  </pre>

  {/* Tech section: bullets above icons */}
  <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {/* Bulleted tech description */}
    <ul style={{ paddingLeft: '20px', color: '#555', fontSize: '0.85rem', lineHeight: 1.4, margin: 0 }}>
      <li>Python: core language used</li>
      <li>NLP: natural language processing techniques</li>
      <li>Pandas: data handling and analysis</li>
      <li>VS Code: development environment</li>
    </ul>

    {/* Tech icons */}
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {techStack.map((icon, i) => (
        <img
          key={i}
          src={icon}
          alt="Tech Icon"
          style={{
            width: '36px',
            height: '36px',
            transition: 'transform 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      ))}
    </div>
  </div>
</div>
      );
    }



export function TextSummProject() {
  const images = [research1, research2];
  const techStack = [PythonIcon, NLPIcon, PandasIcon, VscodeIcon];

  // Example bullets for project
  const projectBullets = [
    'Dataset preprocessing and cleaning',
    'Adaptive summarization algorithm',
    'NLP techniques for text analysis',
    'Evaluation with metrics and results',
  ];

  return (
    <div style={{ padding: '10px' }}>
      {/* Image Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '12px',
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            style={{
              ...imageBoxStyle,
              minHeight: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={img}
              alt=""
              style={{
                width: '80%',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '6px',
              }}
            />
            {/* Optional per-image description */}
            <p style={{ fontSize: '0.8rem', color: '#888', textAlign: 'center', margin: 0 }}>
              Image {i + 1} description
            </p>
          </div>
        ))}
      </div>

      {/* Tech section: bullets above icons */}
      <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Bulleted project description */}
        <ul style={{ paddingLeft: '20px', color: '#555', fontSize: '0.85rem', lineHeight: 1.4, margin: 0 }}>
          {projectBullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>

        {/* Tech icons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {techStack.map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt="Tech Icon"
              style={{
                width: '36px',
                height: '36px',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


export default function PlmEams() {
  const [modalImage, setModalImage] = useState(null);
  const images = [eams1, eams2];
  const techStack = [FigmaIcon];

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalImage ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalImage]);

  // Bulleted description for the project
  const projectBullets = [
    'User login interface',
    'Dashboard overview',
    'Responsive design',
    'Workflow management',
    'Notifications system',
    'Reports and analytics',
  ];

  return (
    <div style={{ padding: '10px' }}>
      {/* Image Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '12px',
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            style={{
              ...imageBoxStyle,
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setModalImage(img)}
          >
            <img
              src={img}
              alt=""
              style={{
                width: '80%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        ))}
      </div>

      {/* Tech section: bullets above icons, like DedosCompiler */}
      <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Bulleted project description */}
        <ul style={{ paddingLeft: '20px', color: '#555', fontSize: '0.85rem', lineHeight: 1.4, margin: 0 }}>
          {projectBullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>

        {/* Tech icons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {techStack.map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt="Tech Icon"
              style={{
                width: '36px',
                height: '36px',
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer',
            padding: '10px',
            boxSizing: 'border-box',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '90vw',
              maxWidth: '800px',
              maxHeight: '90vh',
              backgroundColor: '#1e1e1e',
              borderRadius: '8px',
              border: '1px solid #555',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)',
              padding: '10px',
            }}
          >
            <img
              src={modalImage}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
/* Shared Styles */
const imageBoxStyle = {
  backgroundColor: '#1e1e1e',
  border: '0px dashed #555',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  cursor: 'pointer',
  minHeight: '120px',
};

const imgStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
};






/* =======================
   PROJECT DATA
======================= */

export const projects = [
  {
    title: 'DEDOS Compiler',
    desc: 'Counter-Strike themed Python compiler',
    image: DedosIcon,
    bgColor: '#ebebeb',
    component: DedosCompiler,
    techStack: [PythonIcon, VscodeIcon],
    info: 'A Python-based compiler inspired by Counter-Strike commands. Try out lexical, syntax, semantic, and evaluation stages!', // <— new info field
  },
  {
    title: 'Adaptive Approach Applied in Text Summarization',
    desc: 'Peer-reviewed research project',
    image: PythonIcon,
    bgColor: '#facb3f',
    component: TextSummProject,
    techStack: [PythonIcon, NLPIcon, PandasIcon],
    info: 'Research project on adaptive summarization using NLP techniques. Includes datasets, analysis, and results.', 
  },
  {
    title: 'Educational Assistance Management System',
    desc: 'PLM Enterprise System',
    image: PlmPreview,
    bgColor: '#ebebeb',
    component: PlmEams,
    techStack: [FigmaIcon],
    info: 'Enterprise management system for PLM students and staff. Built with modern design and workflow tools.',
  },
  {
    title: 'Go Trike',
    desc: 'Transportation booking platform',
    image: '/sample-gotrike.png',
    bgColor: '#ebebeb',
    techStack: [FlutterIcon, FirebaseIcon, FigmaIcon],
    info: 'A mobile app to book tricycle rides, track locations, and manage payments efficiently.',
  },
];
