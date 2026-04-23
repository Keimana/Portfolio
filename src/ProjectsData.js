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
import GotrikeIcon from './assets/gotrikeIcon.png';

// Text Summ images
import research1 from './assets/research-1.png';
import research2 from './assets/research-2.png';

// PLM-EAMS images
import eams1 from './assets/eams-1.png';
import eams2 from './assets/eams-2.png';

// Go Trike Video
import gotrikeVideo from './assets/go-trike.mp4'; 


/* =======================
   COMPONENTS
======================= */



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

export function DedosCompiler({
  code = 'plant("Hello World")',
  outputState,
  setOutputState,
  projectTitle,
}) {
  const { stage: activeStage, output } = outputState;
  const techStack = [PythonIcon, VscodeIcon];
  const dedosBullets = [
    'Python: core programming language used',
    'VS Code: development environment',
    'Implemented a functional Python-based compiler for "plant()" commands',
    'Built lexical, syntax, semantic, and code generation stages with real-time output',
    'Documented and submitted the project thesis, including physical binding at the university',
    'The DeDos Compiler is on github for more!',
  ];
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
          'Tokenizing source code: \nTokens: ' +
          tokens.join(', ');
        break;
      }

      case 'syntax':
        newOutput =
          'Building parse tree: \nParse Tree: [Program → plantStatement → "(" → "Hello World" → ")"]';
        break;

      case 'semantic':
        newOutput =
          'Type & scope verification: \nAll types valid.';
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
    <div style={containerStyle}>
      <textarea
        value={code}
        readOnly
        rows={5}
        style={codeEditorStyle}
      />

      <div style={buttonRowStyle}>
        {['lexical', 'syntax', 'semantic', 'evaluation'].map((s) => (
          <button
            key={s}
            onClick={() => handleStageClick(s)}
            style={{
              ...stageButtonStyle,
              backgroundColor: activeStage === s ? '#facb3f' : '#eee',
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <pre style={outputStyle}>{output}</pre>

      {/* Tech section */}
      <div style={techSectionStyle}>
        <ul style={bulletListStyle}>
          {dedosBullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div style={techIconsWrapperStyle}>
          {techStack.map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt="Tech Icon"
              style={techIconStyle}
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
  const projectBullets = [
    'Collected and preprocessed text datasets for summarization experiments',
    'Implemented an adaptive dynamic algorithm combining steps from multiple summarization methods',
    'Applied NLP techniques for text analysis, including tokenization, feature extraction, and scoring',
    'Evaluated model performance using metrics like ROUGE and BLEU, ensuring accuracy and efficiency',
    'Optimized memory usage and computation through dynamic programming techniques',
    'Documented methodology and results for peer-reviewed publication',
  ];

  return (
    <div style={containerStyle}>
      {/* Image Grid */}
      <div style={imageGridStyle}>
        {images.map((img, i) => (
          <div key={i} style={imageBoxWrapperStyle}>
            <img src={img} alt="" style={imageStyle} />
          </div>
        ))}
      </div>

      {/* Tech section */}
      <div style={techSectionStyle}>
        {/* Bullets */}
        <ul style={bulletListStyle}>
          {projectBullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>

        {/* Tech icons */}
        <div style={techIconsWrapperStyle}>
          {techStack.map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt="Tech Icon"
              style={techIconStyle}
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
  const projectBullets = [
    'Designed intuitive user login and authentication interfaces for students and staff',
    'Created a clean, user-friendly dashboard to visualize applications, scholarships, and user activity',
    'Developed responsive layouts to ensure seamless experience on desktop and mobile devices',
    'Streamlined workflow screens to simplify scholarship application and approval processes',
    'Designed notification interfaces, including visual cues and email alerts for status updates',
    'Crafted report generation views with clear data visualization for the Office of Student Development and Services',
    'Focused on usability improvements to minimize errors and enhance efficiency for end users',
    'Ensured accessible and visually consistent UI components across the software platform',
  ];

  useEffect(() => {
    document.body.style.overflow = modalImage ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalImage]);




  return (
    <div style={containerStyle}>
      {/* Image Grid */}
      <div style={imageGridStyle}>
        {images.map((img, i) => (
          <div
            key={i}
            style={imageBoxWrapperStyle}
            onClick={() => setModalImage(img)}
          >
            <img src={img} alt="" style={imageStyle} />
          </div>
        ))}
      </div>

      {/* Tech section */}
      <div style={techSectionStyle}>
        <ul style={bulletListStyle}>
          {projectBullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>

        <div style={techIconsWrapperStyle}>
          {techStack.map((icon, i) => (
            <img
              key={i}
              src={icon}
              alt="Tech Icon"
              style={techIconStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}






export function GoTrikeProject() {
  const techStack = [FlutterIcon, FirebaseIcon, FigmaIcon];

  const projectBullets = [
    'Developed a mobile application for booking tricycle rides efficiently',
    'Implemented real-time location tracking for drivers and passengers using Firebase',
    'Designed intuitive booking and payment flows with Flutter',
    'Created responsive UI/UX using Figma prototypes and Flutter layouts',
    'Integrated secure payment and transaction management features',
    'Enabled ride history, driver ratings, and notifications for better user experience',
    'Tested application across multiple devices to ensure reliability and performance',
  ];



  return (
    <div style={containerStyle}>
      <div style={layoutStyle} className="layout">
        {/* Video */}
        <div style={videoWrapperStyle}>
<video
  src={gotrikeVideo}
  autoPlay
  loop
  muted
  playsInline
  style={{
    width: '100%',
    height: '100%',
    borderRadius: '12px',
  }}
/>
        </div>

        {/* Bullets & Tech */}
        <div style={bulletsWrapperStyle}>
          {/* Bullets */}
          <ul style={bulletListStyle}>
            {projectBullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>

          {/* Tech Icons */}
          <div style={techIconsWrapperStyle}>
            {techStack.map((icon, i) => (
              <img
                key={i}
                src={icon}
                alt="Tech Icon"
                style={techIconStyle}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



/* ===== Modal Styles ===== */

  const containerStyle = {
    marginTop: '0px',
    fontFamily: 'monospace',
  };

  const codeEditorStyle = {
    width: '90%',
    padding: '20px',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    borderRadius: '8px',
    resize: 'none',
  };

  const buttonRowStyle = {
    marginTop: '40px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  };

  const stageButtonStyle = {
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const outputStyle = {
    background: '#1e1e1e',
    color: '#00ff00',
    padding: '14px',
    borderRadius: '8px',
    marginTop: '40px',
    whiteSpace: 'pre-wrap',
  };

  const imageGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
    gap: '8px',
  };

  const imageBoxWrapperStyle = {
    ...imageBoxStyle,
    minHeight: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    marginBottom: '4px',
  };

  const techSectionStyle = {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const bulletListStyle = {
    paddingLeft: '20px',
    color: '#000000',
    fontSize: '0.95rem',
    lineHeight: 2.0,
    margin: 0,
  };

  const techIconsWrapperStyle = {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  };

  const techIconStyle = {
    width: '36px',
    height: '36px',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  };

const layoutStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  marginTop: '10px',
};

const videoWrapperStyle = {
  width: '100%',
  maxWidth: '300px',   
  aspectRatio: '9 / 16', 
  flexShrink: 0,    
};
  const bulletsWrapperStyle = {
    flex: '1 1 100px',
    minWidth: '100px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };



  /* Shared Styles */


/* =======================
   PROJECT DATA
======================= */

export const projects = [
  {
    title: 'DEDOS Compiler',
    desc: 'Interactive Python compiler inspired by Counter-Strike, implementing full compilation stages with dynamic output and stage controls',
    image: DedosIcon,
    bgColor: '#EFECE3',
    component: DedosCompiler,
    techStack: [PythonIcon, VscodeIcon],
    info: 'A DeDos compiler inspired by Counter-Strike commands built in python programming language.', 
  },
  {
    title: 'Adaptive Approach Applied in Text Summarization',
    desc: 'Peer‑reviewed research applying an adaptive dynamic approach that synthesizes algorithmic steps from multiple methods to enhance text summarization efficiency and text processing performance',

    image: PythonIcon,
    bgColor: '#ffd60a',
    component: TextSummProject,
    techStack: [PythonIcon, NLPIcon, PandasIcon],
    info: 'Research project on adaptive summarization using NLP techniques. Includes datasets, analysis, and results.', 
  },
  {
    title: 'Web-based Educational Assistance Management System with E-mail Notification for the Office of Student Development and Services (OSDS)',
    desc: 'PLM Educational Assistance Management System (Software Engineering1 | Software Engineering 2)',
    image: PlmPreview,
    bgColor: '#EFECE3',
    component: PlmEams,
    techStack: [FigmaIcon],
    info: 'Enterprise management system for PLM students and staff. Built with modern design and workflow tools.',
  },
  {
    title: 'Go Trike',
    desc: 'Go Trike Transportation booking System Flutter Developer Commisioned Project',
    image: GotrikeIcon,
    bgColor: '#EFECE3',
    component: GoTrikeProject,
    techStack: [FlutterIcon, FirebaseIcon, FigmaIcon],
    info: 'A mobile application designed to efficiently book and manage tricycle rides, including secure payment processing, real-time driver tracking, and ride history, specifically serving the community of Telebastagan, Pampanga.',
  },
];
