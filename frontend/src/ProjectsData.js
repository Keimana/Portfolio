import DedosIcon from './assets/dedos.jpg';
import PythonIcon from './assets/PythonIcon.png';
import PlmEams from './assets/plm-1.png';
import FlutterIcon from './assets/FlutterIcon.png';
import FirebaseIcon from './assets/FirebaseIcon.png';
import FigmaIcon from './assets/FigmaIcon.png';
import NLPIcon from './assets/nlp.png';
import VscodeIcon from './assets/VscodeIcon.png';
import PandasIcon from './assets/PandasIcon.png';
export const projects = [
  {
    title: 'DEDOS Compiler',
    desc: 'Programmer and creator of DEDOS Compiler, a Counter-Strike-themed compiler built in Python',
    details: [
      'As a programmer, I built DEDOS Compiler using Python programming language, a Counter-Strike themed custom compiler with unique commands',
      'This is a sample statement from DEDOS Compiler project.',
      'The plant statement is the same as the print statement in Python programming language. This outputs text to the console.',
    ],
    image: DedosIcon,
    bgColor: '#ebebeb',
    sampleCode: `plant("Hello World")`,
    codeLink: 'https://github.com/Keimana/Dedos-Compiler',
    techStack: [PythonIcon, VscodeIcon],
  },
  {
    title: 'Adaptive Approach Applied in Text Summarization',
    desc: 'Co-author and developer of the adaptive dynamic text summarization algorithm presented in the peer-reviewed article.',
    details: [
      'Developed a novel text summarization algorithm using Adaptive Tabulation (adaptive dynamic programming).',
      'Addresses issues with sentence splitting, non-adaptive behavior, and high memory usage.',
      'Improves summary quality, semantic retention, and memory efficiency.',
    ],
    image: PythonIcon,
    bgColor: '#facb3f',
    codeLink: 'https://tpmap.org/submission/index.php/tpm/article/view/1934/1530?fbclid=...',
    techStack: [PythonIcon, NLPIcon, PandasIcon],
  },
  {
    title: 'Educational Assistance Management System',
    desc: 'UI/UX Designer and Frontend Developer for PLM Educational Assistance Management System.',
    details: [
      'Allows students to submit scholarship documents anytime, anywhere.',
      'OSDS Admin can manage documents, update students on progress, and monitor available slots.',
      'Committee members provide e-signatures and remarks for qualified students.',
      'OPA can view scholars per scholarship provider and generate filtered reports.',
      'Includes email notification system for verifying users and updating scholarship application status.',
    ],
    image: PlmEams,
    bgColor: '#ebebeb',
    codeLink: 'https://github.com/ronanbaje/plm-eams',
    techStack: [FigmaIcon],
  },
  {
    title: 'Go Trike',
    desc: 'Transportation booking platform.',
    details: [
      'Optimized for local tricycle services.',
      'Allows users to book rides and track drivers.',
      'Provides real-time notifications and payment integration.',
    ],
    image: '/sample-gotrike.png',
    bgColor: '#ebebeb',
    codeLink: 'https://github.com/ronanbaje/go-trike',
    techStack: [FlutterIcon, FirebaseIcon, FigmaIcon],
  },
];
