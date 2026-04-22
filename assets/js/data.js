// ============================================================
//  data.js  —  localStorage data layer
// ============================================================

const DEFAULT_DATA = {
  projects: [
    {
      id: 'p1',
      title: 'Guess the Number',
      description: 'An interactive game where you enter a range and guess the correct number. Tests logic and intuition!',
      liveLink: 'https://syedfaizaan2004.github.io/Guessing-a-number-Game/',
      githubLink: 'https://github.com/Syedfaizaan2004/Guessing-a-number-Game',
      image: 'images/work_1.png',
      techStack: ['JavaScript', 'HTML', 'CSS']
    },
    {
      id: 'p2',
      title: 'Simon Says Game',
      description: 'A memory-based colour pattern game inspired by the classic Simon Says — remember and repeat the flash sequence.',
      liveLink: 'https://syedfaizaan2004.github.io/simon-says-game/',
      githubLink: 'https://github.com/Syedfaizaan2004/simon-says-game',
      image: 'images/work_2.jpeg.png',
      techStack: ['JavaScript', 'HTML', 'CSS']
    },
    {
      id: 'p3',
      title: 'Spotify Clone',
      description: 'A pixel-perfect clone of the Spotify music app — my first major UI project built with pure HTML & CSS.',
      liveLink: '#',
      githubLink: '#',
      image: 'images/work_3.jpeg',
      techStack: ['HTML', 'CSS']
    }
  ],
  skills: [
    { id: 's1',  name: 'HTML5',          icon: 'fa-brands fa-html5',      color: '#e34f26', category: 'Frontend'  },
    { id: 's2',  name: 'CSS3',           icon: 'fa-brands fa-css3-alt',   color: '#264de4', category: 'Frontend'  },
    { id: 's3',  name: 'JavaScript',     icon: 'fa-brands fa-js',         color: '#f7df1e', category: 'Frontend'  },
    { id: 's4',  name: 'Java',           icon: 'fa-brands fa-java',       color: '#007396', category: 'Backend'   },
    { id: 's5',  name: 'Python',         icon: 'fa-brands fa-python',     color: '#3776ab', category: 'AI / ML'   },
    { id: 's6',  name: 'Git',            icon: 'fa-brands fa-git-alt',    color: '#f05032', category: 'Tools'     },
    { id: 's7',  name: 'GitHub',         icon: 'fa-brands fa-github',     color: '#c9d1d9', category: 'Tools'     },
    { id: 's8',  name: 'Bootstrap',      icon: 'fa-brands fa-bootstrap',  color: '#7952b3', category: 'Frontend'  },
    { id: 's9',  name: 'React',          icon: 'fa-brands fa-react',      color: '#61dafb', category: 'Frontend'  },
    { id: 's10', name: 'Node.js',        icon: 'fa-brands fa-node-js',    color: '#339933', category: 'Backend'   },
    { id: 's11', name: 'Linux',          icon: 'fa-brands fa-linux',      color: '#fcc624', category: 'Tools'     },
    { id: 's12', name: 'Machine Learning', icon: 'fa-solid fa-brain',     color: '#ff6b6b', category: 'AI / ML'   }
  ],
  about: {
    text: "I'm <strong>Syed Faizaan Ahmad</strong>, a passionate ECE undergraduate at MSIT Janakpuri (2023–2027) with a deep love for web development, algorithms, and emerging technology. I completed my 12th from School of Excellence in 2022 and I constantly push my limits by building new projects and exploring Machine Learning and AI. Driven by curiosity — from crafting pixel-perfect UIs to studying space exploration — my goal is to create technology that makes a real-world impact.",
    resumeLink: 'images/Syed faizaan CV.pdf',
    counters: { projects: 10, skills: 12, experience: 2 },
    tabs: {
      skills:     '<ul>\n  <li><span>UI / UX</span>Designing beautiful website interfaces</li>\n  <li><span>Frontend Dev</span>HTML5, CSS3, JavaScript, React</li>\n  <li><span>Backend / DSA</span>Java, Data Structures &amp; Algorithms</li>\n  <li><span>Tools</span>Git, GitHub, VS Code, Linux</li>\n</ul>',
      experience: '<ul>\n  <li><span>March 2024</span>Built interactive browser games (Guess the Number, Simon Says)</li>\n  <li><span>September 2024</span>Created and deployed my personal portfolio</li>\n  <li><span>September 2024</span>Joined MSC Web Development Club</li>\n</ul>',
      education:  '<ul>\n  <li><span>2023 – 2027</span>B-Tech ECE · MSIT Janakpuri, New Delhi</li>\n  <li><span>2022</span>XII<sup>th</sup> · School of Excellence</li>\n  <li><span>2020</span>X<sup>th</sup> · SBV School</li>\n</ul>',
      softSkills: '<ul>\n  <li><span>Communication</span>Public Speaking &amp; Team Management</li>\n  <li><span>Leadership</span>Leadership Quality &amp; Problem Solving</li>\n  <li><span>Interests</span>Space Research · Traveling · Reading Books</li>\n  <li><span>Languages</span>English &amp; Urdu / Hindi</li>\n</ul>'
    }
  }
};

function initData() {
  if (!localStorage.getItem('portfolio_data')) {
    localStorage.setItem('portfolio_data', JSON.stringify(DEFAULT_DATA));
  }
}

function getData() {
  initData();
  try { return JSON.parse(localStorage.getItem('portfolio_data')); }
  catch (e) { return DEFAULT_DATA; }
}

function saveData(data) {
  localStorage.setItem('portfolio_data', JSON.stringify(data));
}

function resetData() {
  localStorage.setItem('portfolio_data', JSON.stringify(DEFAULT_DATA));
}
