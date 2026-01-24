// TextSummProject.js
import React, { useState, useEffect } from 'react';
import research1 from './assets/research-1.png';
import research2 from './assets/research-2.png';

export default function TextSummProject() {
  const [modalImage, setModalImage] = useState(null);

    // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = modalImage ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [modalImage]);

  const details = [
    "Published in the peer-reviewed journal TPM – Testing, Psychometrics, Methodology in Applied Psychology.",
    "Introduces a novel method for text summarization using Adaptive Tabulation (adaptive dynamic programming).",
    "Addresses issues with existing methods: hard-coded sentence splitting, non-adaptive behavior, high memory usage.",
    "Combines segmentation, scoring/ranking, and selective caching to improve summary quality and efficiency.",
    "Demonstrates better consistency and semantic retention with lower memory use compared to traditional techniques."
  ];

  const images = [
    { src: research1, caption: "Figure 1" },
    { src: research2, caption: "Figure 2" }
  ];

  return (
    <div style={{ position: 'relative' }}>
      {/* Image Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
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
          <li key={i} style={{ marginBottom: '6px' }}>{point}</li>
        ))}
      </ul>

      {/* Peer-Reviewed Article Box */}
      <div
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 16px',
          backgroundColor: '#facb3f',
          color: '#000',
          borderRadius: '5px',
          fontWeight: 'bold',
          userSelect: 'none',
        }}
      >
        Peer-Reviewed Article
      </div>

{modalImage && (
  <div
    onClick={() => setModalImage(null)}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '75vw',
      height: '75vh',
      backgroundColor: 'rgba(0,0,0,0.2)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      cursor: 'pointer',
      overflow: 'hidden',
    }}
  >
      <div>
        <img
          src={modalImage}
          alt="Enlarged"
          style={{

            
            maxWidth: '100%',
            maxHeight: '60vh', 
            objectFit: 'contain',
            borderRadius: '8px',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            overflow: 'hidden',
          }}
        />

      </div>
    </div>
  )}

    </div>
  );
}

// Image box container
const imageBoxStyle = {
  height: '160px',
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
  padding: '40px',
  cursor: 'pointer',
};

// Grid image style
const imgStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};

// Caption style
const captionStyle = {
  color: '#aaa',
  fontSize: '12px',
  marginTop: '4px',
  textAlign: 'center',
};
