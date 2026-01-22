
export default function DedosCompiler({ code, outputState, setOutputState, projectTitle }) {
  const { stage: activeStage, output } = outputState;

  const handleStageClick = (stage) => {
    let newOutput = '';

    switch (stage) {
      case 'lexical':
        // Lexical analysis: split letters for function, string intact
        const tokens = [];
        let buffer = '';
        let inString = false;

        for (let char of code) {
          if (char === '"' || char === "'") {
            if (inString) {
              buffer += char;
              tokens.push(buffer); // push full string as one token
              buffer = '';
              inString = false;
            } else {
              if (buffer) tokens.push(...buffer.split('')); // push previous letters
              buffer = char;
              inString = true;
            }
          } else if (inString) {
            buffer += char;
          } else if (/[a-zA-Z]/.test(char)) {
            buffer += char; // build letters
          } else if (/\s/.test(char)) {
            if (buffer) {
              tokens.push(...buffer.split('')); // each letter as token
              buffer = '';
            }
          } else {
            if (buffer) {
              tokens.push(...buffer.split('')); // flush letters
              buffer = '';
            }
            if (char.trim()) tokens.push(char); // punctuation
          }
        }
        if (buffer) {
          if (inString) tokens.push(buffer);
          else tokens.push(...buffer.split(''));
        }

        newOutput = 'Lexical Analysis: tokenizing source code...\nTokens: ' + tokens.join(', ');
        break;

      case 'syntax':
        newOutput = 'Syntax Analysis: building parse tree...\nParse Tree: [Program → plantStatement → delim "(" → "Hello World" → delim ")"]';
        break;

      case 'semantic':
        newOutput = 'Semantic Check: type & scope verification...\nAll types valid.';
        break;

      case 'evaluation':
        const simulatedOutput = code.match(/plant\((.*)\)/)?.[1] || '';
        newOutput = 'Evaluation: executing program...\nOutput:\n' + simulatedOutput;
        break;

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
      <div style={{ marginTop: '50px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
          padding: '12px',
          borderRadius: '8px',
          marginTop: '50px',
          whiteSpace: 'pre-wrap',
        }}
      >
        {output}
      </pre>
    </div>
  );
}
