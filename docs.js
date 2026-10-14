const docs = [
  {
    id: "personal-info-001",
    type: "personal_information",
    title: "Personal Information and Professional Summary",
    content:
      "Cihan Erenler is a Software Engineer and full-stack developer specialised in frontend and backend development for complex scalable web apps. He is a highly motivated software developer with experience in front-end and back-end development. He has worked as a trainee at two reputable companies, gaining valuable industry experience and honing his skills in programming languages and frameworks such as Javascript, TypeScript, React.js, and Node.js. He is a team player with strong communication and problem-solving skills, always eager to learn new technologies and make a meaningful contribution to the team. His portfolio website is available at https://hanci.netlify.app/ and his personal website is www.cihanerenler.com.",
    metadata: {
      name: "Cihan Erenler",
      title: "Software Engineer",
      portfolioUrl: "https://hanci.netlify.app/",
      website: "www.cihanerenler.com",
    },
  },
  {
    id: "contact-info-001",
    type: "contact_information",
    title: "Contact Information",
    content:
      "Contact Cihan Erenler via email at cihanerenler@outlook.com or phone at +358 40 753 7438. You can also find him on LinkedIn at https://linkedin.com/in/cihanerenler and on GitHub at https://github.com/CihanErenler. His website is www.cihanerenler.com.",
    metadata: {
      email: "cihanerenler@outlook.com",
      phone: "+358 40 753 7438",
      linkedin: "https://linkedin.com/in/cihanerenler",
      github: "https://github.com/CihanErenler",
      website: "www.cihanerenler.com",
    },
  },
  {
    id: "work-exp-001",
    type: "work_experience",
    title: "Software Engineer at SSH Secure Collaboration",
    content:
      "Cihan Erenler currently works as a Software Engineer at SSH Secure Collaboration since March 2024. In this role, he is responsible for developing Web Client with React.js, developing and maintaining iOS application, and testing and debugging applications.",
    metadata: {
      position: "Software Engineer",
      company: "SSH Secure Collaboration",
      date: "March 2024 - Current",
      isCurrent: true,
    },
  },
  {
    id: "work-exp-002",
    type: "work_experience",
    title: "Software Developer Trainee at Nokia",
    content:
      "Cihan Erenler worked as a Software Developer Trainee at Nokia from May 2022 to November 2023. During this time, he was responsible for developing UI components with React.js, developing backend server with Node.js and Express, and testing backend & front-end applications.",
    metadata: {
      position: "Software Developer Trainee",
      company: "Nokia",
      date: "May 2022 - Nov 2023",
      isCurrent: false,
    },
  },
  {
    id: "work-exp-003",
    type: "work_experience",
    title: "Front-End Developer Trainee at F-Secure",
    content:
      "Cihan Erenler worked as a Front-End Developer Trainee at F-Secure from May 2021 to December 2021. His responsibilities included improving and debugging design system components, developing components with Vue.js and SCSS, and testing UI components.",
    metadata: {
      position: "Front-End Developer Trainee",
      company: "F-Secure",
      date: "May 2021 - Dec 2021",
      isCurrent: false,
    },
  },
  {
    id: "education-001",
    type: "education",
    title: "Computer Applications at Hame University",
    content:
      "Cihan Erenler studied Computer Applications at Hame University of Applied Sciences (HAMK) in Finland. He started in 2020 and graduated in 2024.",
    metadata: {
      degree: "Computer Applications",
      university: "Hame University of Applied Sciences - Finland",
      date: "2020 - 2024",
      isCurrent: false,
    },
  },
  {
    id: "education-002",
    type: "education",
    title: "Bachelor of Art Teaching at Cukurova University",
    content:
      "Cihan Erenler completed a Bachelor of Art Teaching degree at Cukurova University in Turkey from 2013 to 2016.",
    metadata: {
      degree: "Bachelor of Art Teaching",
      university: "Cukurova University - Turkey",
      date: "2013 - 2016",
      isCurrent: false,
    },
  },
  {
    id: "skills-frontend-001",
    type: "technical_skills",
    title: "Frontend Development Skills",
    content:
      "Cihan Erenler has expertise in frontend development technologies including React, TypeScript, Javascript, HTML, CSS, SCSS, and Tailwind CSS. He is skilled in building responsive and interactive user interfaces using modern frontend frameworks and libraries.",
    metadata: {
      category: "frontend",
      skills: [
        "React",
        "TypeScript",
        "Javascript",
        "HTML, CSS, SCSS",
        "Tailwind CSS",
      ],
    },
  },
  {
    id: "skills-backend-001",
    type: "technical_skills",
    title: "Backend Development Skills",
    content:
      "Cihan Erenler has experience in backend development using Node.js and Express.js. He is familiar with various databases including PostgreSQL, MySQL, MariaDB, and MongoDB. He can build RESTful APIs and server-side applications.",
    metadata: {
      category: "backend",
      skills: [
        "Node.js",
        "Express.js",
        "PostgresSQL / MySQL / MariaDB",
        "MongoDB",
      ],
    },
  },
  {
    id: "skills-testing-001",
    type: "technical_skills",
    title: "Testing and Quality Assurance Skills",
    content:
      "Cihan Erenler is experienced in testing applications using Jest, React Testing Library, and Cypress. He can write unit tests, integration tests, and end-to-end tests to ensure application quality and reliability.",
    metadata: {
      category: "testing",
      skills: ["Jest", "React Testing Library", "Cypress"],
    },
  },
  {
    id: "skills-design-001",
    type: "technical_skills",
    title: "Design and UI/UX Skills",
    content:
      "Cihan Erenler has experience with design tools and UI/UX design. He is proficient in using Figma for design work and has skills in UI Design, creating user-friendly interfaces and design systems.",
    metadata: {
      category: "design",
      skills: ["Figma", "UI Design"],
    },
  },
  {
    id: "skills-additional-001",
    type: "technical_skills",
    title: "Additional Technologies and Tools",
    content:
      "Cihan Erenler is also familiar with additional technologies including React Native for mobile development, Vue.js, Sass, Bootstrap, Java, and various database systems. He has a broad technical skill set covering multiple programming languages and frameworks.",
    metadata: {
      category: "additional",
      skills: [
        "React Native",
        "Vue.js",
        "Sass",
        "Bootstrap",
        "Java",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
      ],
    },
  },
  {
    id: "soft-skills-001",
    type: "soft_skills",
    title: "Soft Skills and Personal Attributes",
    content:
      "Cihan Erenler possesses strong problem-solving skills, strong attention to detail, adaptability to new technologies, excellent communication abilities, technical and creative abilities, and the ability to work under pressure. These soft skills complement his technical expertise and make him an effective team member.",
    metadata: {
      skills: [
        "Strong problem-solving skills",
        "Strong attention to detail",
        "Adaptability to new technologies",
        "Excellent communication",
        "Technical and creative abilities",
        "Ability to work under pressure",
      ],
    },
  },
  {
    id: "languages-001",
    type: "language_skills",
    title: "Language Proficiency",
    content:
      "Cihan Erenler is multilingual. He is a native Turkish speaker, has C1 level proficiency in English, and A2 level proficiency in Finnish. This language diversity allows him to work effectively in international environments.",
    metadata: {
      english: "C1",
      finnish: "A2",
      turkish: "Native",
    },
  },
  {
    id: "project-001",
    type: "project",
    title: "AI Portfolio Chatbot",
    content:
      "The AI Portfolio Chatbot is an AI-powered chat widget embedded into the portfolio that lets visitors ask questions about Cihan Erenler, his skills, and his projects. It is the chat bubble in the bottom right corner of the portfolio website. Answers are generated from his own portfolio content using retrieval-augmented generation (RAG) and streamed back as they are written. The widget follows the site's light and dark theme. The project was created to provide a more interactive way to explore the portfolio and to showcase the ability to build and deploy real-world AI applications. The main challenges were setting up a production-like environment on a Hetzner server, configuring PostgreSQL with the pgvector extension for vector search, wiring up a secure SSH-based workflow from the local machine, and exposing the chatbot as an embeddable iframe without overcomplicating the architecture. Once it was live, a public AI endpoint also meant dealing with bot traffic and slow first responses, so it needed protection from abuse and runaway costs and had to feel fast. The solution is a Node.js + Express backend that stores portfolio content as vector embeddings in PostgreSQL using pgvector. For each question it embeds the query, retrieves the most relevant passages, and streams an answer from OpenAI that is grounded in that context. The chat UI is a small Vite-powered frontend that runs inside an iframe; a single script tag embeds it on any page, and it syncs its open state and the light/dark theme with the host page through postMessage. Rate limiting, input limits, a daily request cap and a spending limit on the API key keep it safe to leave running. The result is a fast, always-on AI assistant that demonstrates both full-stack skills and experience with AI tooling. Technologies used: Node.js, Express, PostgreSQL, pgvector, OpenAI, Vite. GitHub: https://github.com/CihanErenler/portfolio-ai-chatbot-app",
    metadata: {
      id: 0,
      title: "AI Portfolio Chatbot",
      technologies: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "pgvector",
        "OpenAI",
        "Vite",
      ],
      github: "https://github.com/CihanErenler/portfolio-ai-chatbot-app",
    },
  },
  {
    id: "project-002",
    type: "project",
    title: "Portfolio Website",
    content:
      "The Portfolio Website is Cihan Erenler's personal website that provides visitors with information about him and showcases various projects he has worked on. The project was created to establish a centralized platform to present his professional portfolio, skills, and completed projects. One of the major challenges faced during development was designing an engaging and informative layout that effectively represents skills and projects. To address this, TypeScript, React, and Tailwind CSS were utilized to implement a responsive and visually appealing design. The completed project is available on GitHub and live on Netlify. Technologies used: TypeScript, React, Tailwind CSS, React Router. GitHub: https://github.com/CihanErenler/portfolio-app-v2, Preview: https://hanci.netlify.app/",
    metadata: {
      id: 1,
      title: "Portfolio Website",
      technologies: ["TypeScript", "React", "Tailwind CSS", "React Router"],
      github: "https://github.com/CihanErenler/portfolio-app-v2",
      preview: "https://hanci.netlify.app/",
    },
  },
  {
    id: "project-003",
    type: "project",
    title: "Car Dealer Website",
    content:
      "The Car Dealer Website is an online platform where users can browse available cars and view details of each car. Users can filter available cars based on various criteria such as brand, model, and price. Users can also preview individual cars and add them to the shopping cart. Customers can fill in a contact form to submit a complaint, which is delivered to the dealer's email. The project originated from the need to create a user-friendly and functional car dealer website that allows users to easily browse and purchase cars online. The primary challenges included implementing effective car filtering and integrating with a backend server to store car data. To overcome these challenges, React, Tailwind CSS, Node.js, and Express were utilized. A proxy server was created to handle the API requests, and Resend is used to deliver complaints submitted through the contact form straight to the dealer's email. Technologies used: React, Tailwind CSS, React Router, Axios, Node.js, Express, Resend. GitHub: https://github.com/CihanErenler/Garage35, Preview: https://garage35.fi/",
    metadata: {
      id: 2,
      title: "Car Dealer Website",
      technologies: [
        "React",
        "Tailwind CSS",
        "React Router",
        "Axios",
        "Node.js",
        "Express",
        "Resend",
      ],
      github: "https://github.com/CihanErenler/Garage35",
      preview: "https://garage35.fi/",
    },
  },
  {
    id: "project-004",
    type: "project",
    title: "Markdown Note Taking Application",
    content:
      "NoteDock is a dynamic markdown note-taking application that seamlessly combines the simplicity of markdown with the power of a feature-rich note management system. The idea behind this project was to create a versatile note-taking application that merges the simplicity of markdown with advanced note management capabilities. One of the challenges faced was finding the right balance between a user-friendly interface and feature-rich functionalities. To address this, React, Styled-components, and React Router were employed. The completed project is available on GitHub and live on Netlify. Technologies used: React, Styled-components, React Router. GitHub: https://github.com/CihanErenler/markdown-note-taking-offline, Preview: https://notedockio.netlify.app",
    metadata: {
      id: 3,
      title: "Markdown Note Taking Application",
      technologies: ["React", "Styled-components", "React Router"],
      github: "https://github.com/CihanErenler/markdown-note-taking-offline",
      preview: "https://notedockio.netlify.app",
    },
  },
  {
    id: "portfolio-website-001",
    type: "portfolio_website",
    title: "Portfolio Website Technical Details",
    content:
      "The portfolio website (GitHub repository portfolio-app-v2) is a personal portfolio website built with React, TypeScript, and Tailwind CSS. The frontend uses React, TypeScript, Tailwind CSS, React Router, and Framer Motion for animations. Build tools include Vite, TypeScript, and ESLint. Styling is handled with Tailwind CSS, PostCSS, and Autoprefixer. Key dependencies include framer-motion, localforage, match-sorter, react, react-dom, react-hot-toast, react-icons, react-router-dom, and sort-by. Features include responsive design, dark mode support, project showcase with filtering, resume/CV display, contact form, single project detail pages, and smooth animations with Framer Motion. The website has navigation to home, projects, resume, and contact pages.",
    metadata: {
      name: "portfilio-website-v2",
      techStack: {
        frontend: [
          "React",
          "TypeScript",
          "Tailwind CSS",
          "React Router",
          "Framer Motion",
        ],
        buildTools: ["Vite", "TypeScript", "ESLint"],
        styling: ["Tailwind CSS", "PostCSS", "Autoprefixer"],
      },
    },
  },
  {
    id: "professional-focus-001",
    type: "professional_focus",
    title: "Professional Focus and Specializations",
    content:
      "Cihan Erenler's primary focus is on front-end and back-end development for complex scalable web applications. His specializations include React.js development, TypeScript, Node.js and Express.js, full-stack web applications, UI/UX design and implementation, and testing with Jest, React Testing Library, and Cypress. He is currently working as Software Engineer at SSH Secure Collaboration in Finland and graduated in Computer Applications from Hame University of Applied Sciences in 2024.",
    metadata: {
      primary:
        "Front-end and back-end development for complex scalable web applications",
      specializations: [
        "React.js development",
        "TypeScript",
        "Node.js and Express.js",
        "Full-stack web applications",
        "UI/UX design and implementation",
        "Testing (Jest, React Testing Library, Cypress)",
      ],
      location: "Finland",
      currentStatus:
        "Currently working as Software Engineer at SSH Secure Collaboration",
    },
  },
];

export default docs;
