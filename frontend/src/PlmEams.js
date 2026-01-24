// PlmEams.js
import React, { useState, useEffect } from 'react';

import eams1 from './assets/eams-1.png';
import eams2 from './assets/eams-2.png';
import eams3 from './assets/eams-3.png';

export default function PlmEams() {
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    document.body.style.overflow = modalImage ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalImage]);

  const techStack = [
  '/assets/python.png', // replace with actual paths to your tech icons
  '/assets/nlp.png',
  '/assets/pandas.png'
];

  const details = [
    'Allows students to submit required scholarship documents anytime, anywhere.',
    'OSDS Admin can manage documents, update students on progress, and monitor available slots.',
    'Committee members can provide e-signatures and remarks for qualified students.',
    'OPA can view scholars per scholarship provider and generate filtered reports.',
    'Includes email notification system for verifying users and updating scholarship application status.'
  ];

  const images = [
    { src: eams1, caption: 'Dashboard Overview' },
    { src: eams2, caption: 'Asset Management Module' },
    { src: eams3, caption: 'Reports & Analytics' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* Image Grid */}
        <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '30px',
        }}
        >
        {images.map((img, i) => (
          <div
            key={i}
            style={imageBoxStyle}
            onClick={() => setModalImage(img.src)}
          >
            <img src={img.src} alt={img.caption} style={imgStyle} />
            <small style={captionStyle}>{img.caption}</small>
          </div>
        ))}
      </div>

      {/* Details */}
      <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
        {details.map((point, i) => (
          <li key={i} style={{ marginBottom: '6px' }}>
            {point}
          </li>
        ))}
      </ul>

  <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
    {techStack?.map((icon, index) => (
      <img
        key={index}
        src={icon}
        alt="Tech Icon"
        style={{
          width: '36px',
          height: '36px',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
    ))}
  </div>


{modalImage && (
  <div
    onClick={() => setModalImage(null)}
    style={{
      position: 'fixed',
      inset: 0,                     // ✅ mobile-safe fullscreen
      backgroundColor: 'rgba(0,0,0,0.25)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      cursor: 'pointer',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        width: 'min(90vw, 900px)',   // ✅ responsive width
        height: 'min(90vh, 600px)',  // ✅ responsive height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
          src={modalImage}
          alt="Enlarged"
          style={{
            maxWidth: '100%',       // increased from 70% → 90%
            maxHeight: '100vh',     // slightly smaller than full viewport height
            objectFit: 'contain',
            borderRadius: '8px',
            boxShadow: '0 0 30px rgba(0,0,0,0.6)', // optional: stronger shadow for emphasis
          }}
        />

    </div>
  </div>
)}

    </div>
  );
}

/* Shared styles (same as TextSummProject) */

const imageBoxStyle = {
  backgroundColor: '#1e1e1e',
  border: '1px dashed #555',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#888',
  fontSize: '14px',
  overflow: 'hidden',
  padding: 'clamp(12px, 4vw, 40px)', // ✅ responsive padding
  cursor: 'pointer',
  aspectRatio: '16 / 9',            // ✅ responsive height
};


const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};


const captionStyle = {
  color: '#aaa',
  fontSize: '12px',
  marginTop: '4px',
  textAlign: 'center',
};
