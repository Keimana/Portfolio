// TextSummProject.js
import React from 'react';

export default function TextSummProject() {
  const details = ["published in the peer‑reviewed journal TPM – Testing, Psychometrics, Methodology in Applied Psychology.",
    "Introduces a novel method for text summarization using Adaptive Tabulation (adaptive dynamic programming).",
    "Addresses issues with existing methods: hard‑coded sentence splitting, non‑adaptive behavior, high memory usage.",
    "Combines segmentation, scoring/ranking, and selective caching to improve summary quality and efficiency.",
    "Demonstrates better consistency and semantic retention with lower memory use compared to traditional techniques."
  ];

  return (
    <div style={{ position: 'relative' }}>


      {/* Details */}
      <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
        {details.map((point, i) => (
          <li key={i} style={{ marginBottom: '6px' }}>{point}</li>
        ))}
      </ul>

      {/* Peer-Reviewed Article Box*/}
      <div
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 16px',
          backgroundColor: '#facb3f',
          color: '#000',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'default',
          userSelect: 'none',
        }}
      >
        Peer-Reviewed Article
      </div>
    </div>
  );
}
