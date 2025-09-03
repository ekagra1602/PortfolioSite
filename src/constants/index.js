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
  Airbnb,
  liveit,
  bridge,
  office,
  hack,
  ramen,
  airbnbLogoPhoto,
  olympic,
  neuravault,
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
    id: "blog",
    title: "Blog",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full-Stack Developer",
    icon: web,
  },
  {
    title: "Backend & API Developer",
    icon: backend,
  },
  {
    title: "Machine Learning Developer",
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
    title: "Software Engineering Intern",
    company_name: "Airbnb",
    icon: Airbnb,
    iconBg: "#383E56",
    date: "May 2025 - August 2025",
    points: [
      "Observability team within Infrastructure, focusing on large-scale systems",
    ],
  },
  {
    title: "Software Engineering Intern",
    company_name: "Edupoint Educational Systems LLC",
    icon: EduPoint,
    iconBg: "#383E56",
    date: "January 2025 - April 2025",
    points: [
      "Attendance Tracking and Authorization group, supporting product development",
    ],
  },
  {
    title: "Machine Learning Research Assistant",
    company_name: "Carnegie Mellon University",
    icon: carnegie,
    iconBg: "#E6DEDD",
    date: "June 2024 - August 2024",
    points: [
      "Research on deep learning models and open-source repositories",
    ],
  },
  {
    title: "Software Engineer Co-op",
    company_name: "Arizona State University",
    icon: Fulton,
    iconBg: "#383E56",
    date: "March 2023 - June 2024",
    points: [
      "CI/CD, monitoring, and systems automation in infrastructure",]
  },
  {
    title: "Software Engineering Intern",
    company_name: "Carrier Air Conditioning India",
    icon: carrier,
    iconBg: "#E6DEDD",
    date: "May 2022 - August 2022",
    points: [
      "Backend and database-focused work in product development.",
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
        name: "TensorFlow",
        color: "green-text-gradient",
      },
      {
        name: "Flask",
        color: "pink-text-gradient",
      },
      {
        name: "Python",
        color: "orange-text-gradient",
      },
    ],
    image: FocusAi,
    source_code_link: "https://github.com/ekagra1602/FocusTime-AI",
  },
  {
    name: "Live-it",
    description:
    "Won at the UC Berkeley AI Hackathon 2025. Integrated Google Veo 3 API to generate cinematic videos from prompts, then trained it on VGGT neural network and Gaussian Splatting for AI-based camera inference and 3D scene construction, enabling real-time prompt-to-3D walkthroughs.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "VGGT",
        color: "green-text-gradient",
      },
      {
        name: "Gemini API",
        color: "pink-text-gradient",
      },
      {
        name: "Gaussian Splatting",
        color: "orange-text-gradient",
      },
    ],
    image: liveit,
    source_code_link: "https://github.com/ekagra1602/live-it",
  },
  {
    name: "NeuraVault MCP",
    description:
      "A FastAPI-based Model Context Protocol (MCP) memory layer that unifies memory ingestion and retrieval \
      across OpenAI and Anthropic Claude models enabling seamless multi-model integration for LLM-powered\
      agents.",
    tags: [
      {
        name: "Pydantic",
        color: "blue-text-gradient",
      },
      {
        name: "OpenAPI",
        color: "green-text-gradient",
      },
      {
        name: "LangChain",
        color: "pink-text-gradient",
      },
      {
        name: "FastAPI",
        color: "orange-text-gradient",
      },
    ],
    image: neuravault,
    source_code_link: "https://neuravault-mcp.onrender.com/",
  },
];

const blogPosts = [
  {
    id: 1,
    title: "My Internship Experience at Airbnb – Astra & Beyond",
    excerpt: "Reflections on a summer of technical challenges, learning, and memorable experiences in San Francisco.",
    date: "August 25, 2025",
    readTime: "6 min read",
    category: "Distributed Systems & Observability",
    tags: ["Internship Experience", "Distributed Systems", "Airbnb HQ", "San Francisco"],
    featured: true,
    content: `August 25, 2025 | Ekagra (Gray) Gupta | San Francisco, CA

This summer I interned on Airbnb’s Infrastructure Observability team, contributing to Astra, an open-source \
log search and analytics engine. It was a summer that blended meaningful technical work with memorable \
experiences inside and outside of San Francisco.

⸻

Setting the Stage

I joined the team with a clear goal: learn how large systems actually evolve under real constraints like cost, \
reliability, and developer velocity. Early on I focused on understanding Astra’s ingestion path and index \
lifecycle, reading design docs, tracing code paths, and working on small open issues to build context. \
That ramp-up shaped how I framed my project work and taught me to value practical trade-offs over “perfect” abstractions.

⸻

The Project

My project focused on improving Astra’s Write-Ahead Log (WAL), a core piece of its ingestion pipeline. \
Astra is an open-source search and analytics engine, and in practice it is heavily used for traces \
that power observability across the platform.

At the time, Astra relied on Kafka for WAL storage. While Kafka works well, it has clear limits around retention, \
scaling, and cost. Broker disks fill up quickly, partitions must be preallocated, and network overhead becomes\
 expensive at scale.

I worked on designing a new approach where WAL batches are stored in S3, with Kafka carrying only small pointer messages.\
 This shift let Kafka continue to serve its role for ordering and offset tracking, while S3 took on the heavy lifting \
 of storage. To make it work in practice, I also had to build request buffering to handle ingestion bursts, \
 add and tune numerous configuration options, and ensure the system remained fault tolerant in edge cases.

It was a very challenging project, especially as an intern. I wrote over 5,000 lines of code and changed more than 20 \
files, and I am proud that I was able to bring it together and make it work end to end. The result was a system that \
traded a small increase in latency for much greater elasticity and significantly lower storage and network costs. \
It also unlocked onger retention windows for traces, which are difficult to achieve with Kafka alone.

⸻

Hackathon and a First Visit

Midway through the internship I competed at the UC Berkeley AI Hackathon, where my team’s project in the AI and \
3D space took home a win. Right after the event, I made a quick stop at Airbnb’s San Francisco office.

It was just a day, but it gave me a chance to meet some of the teammates face to face and get a first look at the space.\
 That early exposure to the office and culture added a personal layer to the technical work I was doing day to day.

(Photos: firstVisit)

⸻

Cross-Company CTF

Another highlight of the summer was competing in a cross-company Capture the Flag (CTF) hosted by Airbnb.\
The event brought together engineers from across the industry, with teams and individuals representing companies\
 like Anthropic, DoorDash, Adobe, ByteDance, and many others.

It was an intense, high-level competition where seasoned engineers tackled problems spanning security,\
 reverse engineering, and distributed systems. I was proud to finish in the top 10 by individual score, \
 which made the experience especially rewarding. Beyond the ranking, it was a chance to learn alongside some of the \
 best and see how different companies approach problem solving under pressure.

⸻

A Longer Stay in San Francisco

Later in the summer I returned to the San Francisco headquarters for a three-day visit, and this time I really \
got to take it in. Walking through the office felt different from the quick stop earlier in the summer, \
I could slow down, explore, and experience the culture more fully.
	
  •	The design of the office stood out right away. Every space felt intentional, from collaborative areas to \
  themed meeting rooms, and it carried Airbnb’s brand of making people feel at home.
	•	Seeing the Olympic torches on display was a memorable moment, a reminder of Airbnb’s role as a global sponsor.
	•	I checked out the themed spaces, including the ramen room, which instantly became a favorite.
	•	The food and snacks lived up to the hype, making the office feel both welcoming and energizing.
	•	I also had the chance to meet some of my co-interns in person for the first time.

Outside of work, I played tourist, walking across the Golden Gate Bridge and checking out San Francisco’s \
best-known spots. Experiencing the city made the trip even more memorable, blending both the professional \
and personal sides of the summer.

(Photos: longerStay)

⸻

Reflections

Looking back, a few themes stand out:
	•	Learning at scale: Infrastructure projects require thinking through trade-offs differently when systems operate at \
  Airbnb scale.
	•	Impact through engineering: Backend changes like moving WAL to S3 can translate into meaningful gains in cost,\
   flexibility, and reliability.
	•	Culture and connection: From the community at the Berkeley hackathon to the people-first culture at Airbnb, the \
  human side was as memorable as the technical one.

⸻

Closing

This summer gave me both technical growth and personal memories I will carry forward. From working on Astra to \
competing at Berkeley to visiting Airbnb’s San Francisco office twice, it was an experience that combined building, \
learning, and exploring in equal measure.`,
    images: [
      { src: hack, alt: "UC Berkeley AI Hackathon", caption: "UC Berkeley" },
      { src: airbnbLogoPhoto, alt: "Airbnb logo in office", caption: "Airbnb HQ logo" },
      { src: office, alt: "Airbnb HQ interior", caption: "Inside Airbnb HQ" },
      { src: ramen, alt: "Ramen themed room", caption: "Ramen room at HQ" },
      { src: bridge, alt: "Golden Gate Bridge", caption: "Golden Gate before sunset" },
    ],
    imageSets: {
      firstVisit: [
        { src: hack, alt: "UC Berkeley AI Hackathon", caption: "UC Berkeley" },
        { src: office, alt: "Airbnb HQ interior", caption: "Office interior" },
        { src: airbnbLogoPhoto, alt: "Airbnb logo in office", caption: "Logo at HQ" },
      ],
      longerStay: [
        { src: bridge, alt: "Golden Gate Bridge", caption: "Golden Gate before sunset" },
        { src: ramen, alt: "Ramen themed room", caption: "Ramen room at office" },
        { src: olympic, alt: "Olympic torch on display", caption: "Olympic torch at HQ" },
      ],
    },
  },
];

export { services, technologies, experiences, projects, blogPosts };
