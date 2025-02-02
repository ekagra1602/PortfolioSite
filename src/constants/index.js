import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  docker,
  chessArena,
  resq,
  FocusAi,
  carrier,
  Fulton,
  EduPoint,
  carnegie,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Machine Learning",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Software Developer Intern",
    company_name: "Edupoint Educational Systems LLC",
    icon: EduPoint,
    iconBg: "#383E56",
    date: "Aug 2024 - Present",
    points: [
      "Assisted in developing SSO scripts using ReactJS, Express.js and MongoDB to help automate login processes for Synergy Learning Management System improving accessibility for over 5.5 million students across 22 states.",
      "Implemented a comprehensive student attendance tracking feature in Synergy using C# (.NET) and SQL databases.",
    ],
  },
  {
    title: "Summer Research Assistant",
    company_name: "Carnegie Mellon University",
    icon: carnegie,
    iconBg: "#E6DEDD",
    date: "Jun 2024 - Aug 2024",
    points: [
      "Analyzed collaboration in Machine Learning pipelines by reviewing GitHub repositories and studying model deployment in open-source projects like Ubuntu's face recognition, using Python, Git, and Docker to identify integration challenges between data scientists and software engineer.",
      "Developed tools using Flask, TensorFlow, and REST APIs to automate ML model testing and document expectations,improving cross-team communication and reducing production deployment errors by 25%.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Enterprise Technology,ASU",
    icon: Fulton,
    iconBg: "#383E56",
    date: "Mar 2023 - May 2024",
    points: [
      "Developed automation scripts in Python and conducted regular software updates to ensure smooth functioning of hardware and software systems, resulting in a 20% increase in system efficiency and reduced manual intervention.",
      "Diagnosed and resolved over 200 complex technical issues on classroom computers running Windows and macOS systems, which enhanced faculty productivity and increased user satisfaction ratings by 20% in just one semester.",
    ],
  },
  {
    title: "Software Engineering Intern",
    company_name: "Carrier Air Conditioning India",
    icon: carrier,
    iconBg: "#E6DEDD",
    date: "May 2021 - May 2022",
    points: [
      "Designed and implemented SQL and C++ based data management systems to accurately track sales, returns, and inventory, enhancing stock management practices and reducing record discrepancies by 8%.",
      "Performed detailed code reviews and systematic debugging to optimize software algorithms, enhancing project efficiency and reliability, which contributed to annual operational cost savings of about $110,000.",
    ],
  },
];

const projects = [
  {
    name: "FocusTime AI",
    description:
      "A full-stack, AI-driven web app developed with Python and JavaScript, using React, Flask, and PostgreSQL. The app integrates MediaPipe Holistic for extracting 471 key points(face, hand, body),and leverages TensorFlow for real-time gesture analysis to detect and address procrastination during study sessions.",
    tags: [
      {
        name: "MediaPipe ML",
        color: "blue-text-gradient",
      },
      {
        name: "TensoFlow",
        color: "green-text-gradient",
      },
      {
        name: "Flask",
        color: "pink-text-gradient",
      },
      {
        name: "React",
        color: "orange-text-gradient",
      },
    ],
    image: FocusAi,
    source_code_link: "https://github.com/ekagra1602/FocusTime-AI",
  },
  {
    name: "Chess Arena",
    description:
      "Developed a full-stack web-based chess application leveraging JavaScript for frontend interactivity and C++ for backend game logic and deployed it via Vercel.",
    tags: [
      {
        name: "C++",
        color: "blue-text-gradient",
      },
      {
        name: "JavaScript",
        color: "green-text-gradient",
      },
      {
        name: "CSS",
        color: "pink-text-gradient",
      },
      {
        name: "HTML",
        color: "orange-text-gradient",
      },
    ],
    image: chessArena,
    source_code_link: "https://github.com/ekagra1602/ChessArena",
  },
  {
    name: "ResQ(Smart India Hackathon)",
    description:
      "Developed a disaster management app for efficient collaboration among rescue agencies, utilizing Python and Node.js for backend, Flutter for frontend, and Google Maps API for real-time location tracking.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "NodeJS",
        color: "green-text-gradient",
      },
      {
        name: "Flutter",
        color: "pink-text-gradient",
      },
      {
        name: "Google Maps API",
        color: "orange-text-gradient",
      },
    ],
    image: resq,
    source_code_link: "https://github.com/ekagra1602/ResQ",
  },
];

export { services, technologies, experiences, projects };
