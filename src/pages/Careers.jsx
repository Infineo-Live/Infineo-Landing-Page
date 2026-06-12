import { useEffect, useState } from "react";
import initCursorSparkles from "../utils/cursorSparkles";
import Title from "../components/Title";
import Footer from "../components/Footer";
import FloatingChatbot from "../components/FloatingChatbot";
import FloatingWhatsapp from "../components/FloatingWhatsapp";

import "../styles/Careers.css";
import "../App.css";

const TEACHER_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSesbOKwUw1fnQb3G5CLOnBgwTaZ8100cFBiAzGOQNB30O56Kw/viewform?usp=header";
const INTERN_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfoZRb85d_mB5EFSnMNV59FTBGmjQdAKclEj5KqdT1ynS-dQg/viewform?usp=publish-editor";

/*  All Open Roles (unified)  */
const allRoles = [
  {
    title: "Storytelling Teacher",
    icon: "",
    desc: "Lead live online mythology classes that build confidence and values in children.",
    category: "Teaching",
    type: "Freelance · Contract",
    location: "Remote (India)",
    badge: "Per Class",
    featured: true,
    jdUrl: null,
    applyUrl: TEACHER_FORM_URL,
    highlights: [
      "Graduates preferred",
      "Live online classes with a fixed recurring schedule",
      "Work with children through mythology and value-based education",
      "Strong communication and presentation skills required",
    ],
    overview: "We are looking for a Storytelling Teacher who is passionate about education and child development. You will lead live online classes that combine Indian mythology with modern value-based lessons to build character, confidence, and critical thinking in children.",
    responsibilities: [
      "Lead live online 1-on-1 and small group storytelling sessions for children aged 5–12",
      "Deliver curriculum with warmth, energy, and clear educational takeaways",
      "Adapt stories and lessons dynamically based on student response and engagement",
      "Provide regular progress updates and constructive feedback to parents",
    ],
    requirements: [
      "Strong communication, presentation, and storytelling skills (English)",
      "Willingness to connect and engage warmly with young children",
      "Laptop/computer with stable high-speed internet and clean video setup",
      "Prior teaching or child engagement experience is a plus",
    ],
    goodToHave: [
      "Knowledge of or interest in Indian mythology and stories",
      "Degree in Education, Psychology, Literature, or related fields",
    ],
    eligibility: [
      "Open to educators, freshers, homemakers, and professionals with teaching interest",
      "Must be willing to commit to a fixed class schedule",
    ],
    details: {
      Mode: "Remote (India)",
      Type: "Freelance · Contract",
      Schedule: "Fixed recurring classes",
    },
    benefits: [
      "Competitive class-based payouts",
      "Flexible remote work schedule",
      "Full curriculum and slide materials provided",
      "Mentorship and teaching support",
    ],
    note: "This role requires a high level of energy, consistency, and a passion for working with children. A demo storytelling class is part of the selection process.",
  },
  {
    title: "Game Development Intern",
    icon: "",
    desc: "Build interactive mythology-based games that teach children life skills.",
    category: "Internship",
    type: "Internship",
    location: "Remote",
    badge: "3 Months",
    featured: false,
    jdUrl: "https://docs.google.com/document/d/1zfdPQt5itM1OqIDDp_IAkA9NkaZ5Mb4q",
    applyUrl: INTERN_FORM_URL,
    highlights: [
      "Design and develop interactive mythology-based games",
      "Familiarity with game engines (Unity, Godot, or web-based tools like Phaser)",
      "Focus on educational gameplay and life skills integration",
      "Collaborate with curriculum designers and content creators",
    ],
    overview: "We are looking for a Game Development Intern to build interactive, web-based mythology games that teach children essential life skills. You will work on creating fun, educational game mechanics and experiences that align with our curriculum.",
    responsibilities: [
      "Design and develop interactive web-based educational games using HTML5/JS game engines",
      "Collaborate with curriculum writers to turn lesson takeaways into engaging game mechanics",
      "Optimize game performance for seamless loading on desktop and mobile web browsers",
      "Identify and fix bugs through systematic testing and feedback cycles",
    ],
    requirements: [
      "Basic knowledge of JavaScript/TypeScript and game logic concepts",
      "Familiarity with game frameworks (Phaser.js, Unity WebGL, or similar)",
      "Willingness to experiment with game design and mechanics for kids",
      "Good problem-solving skills and attention to detail",
    ],
    goodToHave: [
      "Experience in creating UI/UX for children's games",
      "Interest in Indian mythology and storytelling",
    ],
    eligibility: [
      "Open to students, freshers, and self-taught developers",
      "Must be willing to commit consistently for the full internship duration",
    ],
    details: {
      Mode: "Remote",
      Duration: "3 Months",
      Commitment: "5–6 hours/day, 6 days/week",
    },
    benefits: [
      "Certificate of Internship",
      "Experience Letter",
      "Hands-on experience working on real products",
      "Mentorship and structured feedback",
      "Opportunity for a full-time role based on performance",
    ],
    note: "This role is hands-on and requires building real, playable games. Shortlisted candidates will be given a task-based game assessment.",
  },
  {
    title: "Social Media Intern",
    icon: "",
    desc: "Build INFINEO's voice—one piece of content at a time",
    category: "Internship",
    type: "Internship",
    location: "Remote",
    badge: "3 Months",
    featured: false,
    jdUrl: "https://docs.google.com/document/d/10GeoAE5vmWAV0Lks3bBEMvnY6ooz0snW",
    applyUrl: INTERN_FORM_URL,
    highlights: [
      "Create social media posts and reels using Canva and basic video tools",
      "Write clear, engaging captions tailored to each platform",
      "Maintain a consistent publishing schedule and grow brand presence",
      "Willingness to commit consistently for the full internship duration",
    ],
    overview: "We are looking for a Social Media Intern to help build and manage INFINEO's presence across platforms from the ground up. This role involves creating simple, clean, and consistent content—posts, reels, and visuals—using Canva and basic video tools. The focus is on execution and consistency, not perfection. You will iterate, improve, and grow alongside the brand.",
    responsibilities: [
      "Create social media posts using Canva with a clean, structured visual style",
      "Write clear, engaging captions tailored to each platform",
      "Create short-form video content including Reels and story formats",
      "Post content regularly and maintain a consistent publishing schedule",
      "Experiment with different formats and improve based on performance and feedback",
      "Stay updated on trends relevant to education and mythology-based content",
    ],
    workingOn: [
      "Building INFINEO's social media presence from scratch",
      "Creating content around mythology-based learning for children and parents",
      "Making educational content simple, visual, and engaging",
      "Supporting video-based and carousel storytelling formats",
    ],
    requirements: [
      "Basic knowledge of Canva (mandatory—this is a day-one requirement)",
      "Ability to keep content clean, simple, and visually structured",
      "Willingness to execute consistently—not just ideate",
      "Interest in content creation, reels, or social media management",
      "Ability to take feedback constructively and improve quickly",
    ],
    goodToHave: [
      "Basic video editing skills using Canva, CapCut, or similar tools",
      "Understanding of content trends and short-form video best practices",
      "Interest in storytelling, education, or Indian mythology",
    ],
    eligibility: [
      "Open to students, freshers, and self-taught candidates",
      "No strict academic requirements",
      "Must be willing to commit consistently for the full internship duration",
    ],
    details: {
      Mode: "Remote",
      Duration: "3 Months (Extendable to 6 Months based on performance)",
      Commitment: "5–6 hours/day, 6 days/week",
    },
    benefits: [
      "Certificate of Internship",
      "Experience Letter",
      "Hands-on experience working on real products and workflows",
      "Mentorship and structured feedback throughout the internship",
      "Opportunity for a full-time role based on performance",
    ],
    note: "This role requires consistent output and a willingness to keep improving. It is not suitable for candidates looking for a low-effort or passive internship.",
  },
  {
    title: "Content Creation Intern",
    icon: "",
    desc: "Write, structure, and shape the stories that make INFINEO come alive",
    category: "Internship",
    type: "Internship",
    location: "Remote",
    badge: "3 Months",
    featured: false,
    jdUrl: "https://docs.google.com/document/d/1BV18zOMHWohTKLhcdAeJ9Po1FbBLkiTs",
    applyUrl: INTERN_FORM_URL,
    highlights: [
      "Convert mythology stories into structured lesson slides in Canva",
      "Write engaging captions, descriptions, and text for social media and marketing",
      "Clarity in written communication—simple, direct, and age-appropriate",
      "Willingness to commit consistently for the full internship duration",
    ],
    overview: "We are looking for a Content Creation Intern to help produce the written and structured content that powers INFINEO's learning materials, social media, and marketing. This role involves converting mythology stories into structured lesson formats, writing engaging copy for digital platforms, and ensuring every piece of content is clear, purposeful, and on-brand. If you enjoy writing, structuring ideas, and bringing stories to life—this role is for you.",
    responsibilities: [
      "Convert mythology stories into structured lesson slides with a clear classroom flow",
      "Design content using the story -> activity -> takeaway framework",
      "Create visually clean and engaging presentation content in Canva",
      "Write captions, descriptions, and supporting text for social media and marketing materials",
      "Collaborate with the curriculum and design teams to ensure content is accurate and engaging",
      "Review and improve content based on feedback from the team",
    ],
    workingOn: [
      "Lesson content for INFINEO's mythology-based curriculum modules",
      "Social media copy and caption writing for Instagram, WhatsApp, and other platforms",
      "Supporting materials such as session summaries, parent-facing content, and guides",
      "Real content that gets used in live classes and published online",
    ],
    requirements: [
      "Structured thinking—you can take a concept and break it down clearly",
      "Clarity in written communication—simple, direct, and age-appropriate",
      "Basic design sense and willingness to work in Canva",
      "Interest in storytelling, education, or content creation",
      "Ability to take feedback and improve quickly",
    ],
    goodToHave: [
      "Prior experience writing blogs, scripts, social media content, or lesson plans",
      "Understanding of instructional design basics",
      "Familiarity with AI writing tools (ChatGPT, Notion AI, etc.)",
      "Interest in Indian mythology and children's education",
    ],
    eligibility: [
      "Open to students, freshers, and self-taught candidates",
      "No strict academic requirements",
      "Must be willing to commit consistently for the full internship duration",
    ],
    details: {
      Mode: "Remote",
      Duration: "3 Months (Extendable to 6 Months based on performance)",
      Commitment: "5–6 hours/day, 6 days/week",
    },
    benefits: [
      "Certificate of Internship",
      "Experience Letter",
      "Hands-on experience working on real products and workflows",
      "Mentorship and structured feedback throughout the internship",
      "Opportunity for a full-time role based on performance",
    ],
    note: "This role requires consistent output and a high standard for clarity. Vague, unstructured, or overly generic writing will be sent back. We write for children—every word must earn its place.",
  },
  {
    title: "AI Video Creation Intern",
    icon: "",
    desc: "Build animated story worlds using AI—one scene at a time",
    category: "Internship",
    type: "Internship",
    location: "Remote",
    badge: "3 Months",
    featured: false,
    jdUrl: "https://docs.google.com/document/d/1plaMx0GZoO1rKNhl5qix0tXZFz_by4AV",
    applyUrl: INTERN_FORM_URL,
    highlights: [
      "Create animated story scenes using AI image and video generation tools",
      "Maintain character and visual consistency across scene sequences",
      "Strong attention to detail—small inconsistencies break visual continuity",
      "Willingness to commit consistently for the full internship duration",
    ],
    overview: "We are looking for an AI Video Creation Intern to produce animated story content for INFINEO using AI-powered video and image generation tools. This role involves converting mythology scripts into visual scene sequences, maintaining consistent character design across scenes, and assembling complete, polished video flows. This is a detail-oriented role that rewards patience, experimentation, and systematic thinking.",
    responsibilities: [
      "Create animated story scenes using AI image and video generation tools",
      "Maintain character and visual consistency across all scenes in a sequence",
      "Convert story scripts into structured visual sequences ready for assembly",
      "Assemble complete video flows including scene transitions and pacing",
      "Follow documented workflows to ensure reproducibility across episodes",
      "Test outputs and refine until continuity and quality standards are met",
    ],
    workingOn: [
      "Animated videos for INFINEO's Neo Ki Pathshala series and other content formats",
      "Character-consistent visual sequences built from mythology scripts",
      "AI-assisted production pipelines for scalable video content",
      "Real videos that get published and watched by children and parents",
    ],
    requirements: [
      "Strong attention to detail—small inconsistencies break visual continuity",
      "Willingness to experiment with AI tools and iterate until results are consistent",
      "Ability to follow structured, documented workflows precisely",
      "Patience with repetitive refinement work",
      "Ability to manage files and assets in an organized manner",
    ],
    goodToHave: [
      "Prior experience using AI image/video tools (Midjourney, Runway, Kling, etc.)",
      "Basic video editing skills (CapCut, Adobe Premiere, DaVinci Resolve, etc.)",
      "Understanding of visual storytelling and scene composition",
      "Interest in animation, filmmaking, or AI-assisted creative production",
    ],
    eligibility: [
      "Open to students, freshers, and self-taught candidates",
      "No strict academic requirements",
      "Must be willing to commit consistently for the full internship duration",
    ],
    details: {
      Mode: "Remote",
      Duration: "3 Months (Extendable to 6 Months based on performance)",
      Commitment: "5–6 hours/day, 6 days/week",
    },
    benefits: [
      "Certificate of Internship",
      "Experience Letter",
      "Hands-on experience working on real products and workflows",
      "Mentorship and structured feedback throughout the internship",
      "Opportunity for a full-time role based on performance",
    ],
    note: "This role demands precision and patience. One inconsistent character design or mismatched scene can require reshooting an entire sequence. If you prefer rapid, loose creative work over careful, systematic production, this may not be the right fit.",
  },
  {
    title: "HR Intern",
    icon: "",
    desc: "Help us find the right people and keep things running smoothly",
    category: "Internship",
    type: "Internship",
    location: "Remote",
    badge: "3 Months",
    featured: false,
    jdUrl: "https://docs.google.com/document/d/1mQOut3mCE46y3ZsoVog4dofBinZIG66v/",
    applyUrl: INTERN_FORM_URL,
    highlights: [
      "Sourcing, screening, and coordinating candidates for internship roles",
      "Strong communication skills—clear, professional, and prompt",
      "Track applicants and maintain hiring data using tracking tools",
      "Willingness to commit consistently for the full internship duration",
    ],
    overview: "We are looking for an HR Intern to support hiring, coordination, and people operations at INFINEO. This is an execution-focused role. You will be involved in screening candidates, managing communication, and keeping our hiring processes organized. The goal is simple: help us bring in the right people efficiently and ensure a smooth experience for every applicant.",
    responsibilities: [
      "Assist in sourcing and screening candidates across multiple internship roles",
      "Schedule interviews and coordinate between applicants and the team",
      "Manage candidate communication—DMs, follow-ups, status updates",
      "Track applicants and maintain hiring data using Google Sheets or similar tools",
      "Support onboarding coordination for selected interns",
      "Identify gaps in hiring processes and suggest improvements over time",
    ],
    workingOn: [
      "Hiring interns across design, content, development, and other functions",
      "Managing end-to-end application flow and candidate responses",
      "Ensuring visual coordination and smooth communication with applicants",
      "Building and refining structured, repeatable hiring processes",
    ],
    requirements: [
      "Strong communication skills—clear, professional, and prompt",
      "Ability to stay organized and handle multiple conversations without dropping threads",
      "Willingness to follow up proactively and own the hiring pipeline",
      "Basic understanding of recruitment or people operations",
      "Consistent execution mindset",
    ],
    goodToHave: [
      "Prior experience in hiring, coordination, or administrative roles",
      "Familiarity with Google Sheets or basic applicant tracking tools",
      "Interest in HR, recruitment, or operations as a career path",
    ],
    eligibility: [
      "Open to students, freshers, and self-taught candidates",
      "No strict academic requirements",
      "Must be willing to commit consistently for the full internship duration",
    ],
    details: {
      Mode: "Remote",
      Duration: "3 Months (Extendable to 6 Months based on performance)",
      Commitment: "5–6 hours/day, 6 days/week",
    },
    benefits: [
      "Certificate of Internship",
      "Experience Letter",
      "Hands-on experience working on real products and workflows",
      "Mentorship and structured feedback throughout the internship",
      "Opportunity for a full-time role based on performance",
    ],
    note: "This role requires ownership and responsiveness. It is not suitable for candidates who are slow to communicate, tend to avoid follow-ups, or prefer working without accountability.",
  },
  {
    title: "Sales & Marketing Intern",
    icon: "",
    desc: "Drive outreach, build partnerships, and grow INFINEO's reach",
    category: "Internship",
    type: "Internship",
    location: "Remote",
    badge: "3 Months",
    featured: false,
    jdUrl: "https://docs.google.com/document/d/1uVtW7uKc5StROsFTVTa5UtFmgQ5m8dDf",
    applyUrl: INTERN_FORM_URL,
    highlights: [
      "Conduct outreach through email, LinkedIn, WhatsApp, calls, and other channels",
      "Research and identify schools, teachers, parents, and communities",
      "Willingness to do consistent outreach and follow-ups without dropping the ball",
      "Willingness to commit consistently for the full internship duration",
    ],
    overview: "We are looking for a Sales & Marketing Intern to help expand INFINEO's reach through targeted outreach, strategic partnerships, and growth initiatives. You will identify opportunities, connect with potential partners—schools, communities, and educators—and help build awareness for INFINEO. This role is about execution, consistency, and building genuine relationships.",
    responsibilities: [
      "Research and identify schools, teachers, parents, communities, and influencers aligned with INFINEO's mission",
      "Conduct outreach through email, LinkedIn, WhatsApp, calls, and other channels",
      "Build and maintain prospect lists and CRM records",
      "Follow up consistently with leads and potential partners",
      "Support partnership and growth campaigns from start to finish",
      "Track all outreach activities and maintain organized records",
      "Assist in market research and opportunity identification",
    ],
    workingOn: [
      "Building awareness for INFINEO across digital and offline channels",
      "Connecting with educators, parent communities, and institutional partners",
      "Supporting and executing growth and outreach campaigns",
      "Creating opportunities that help expand INFINEO's student base",
    ],
    requirements: [
      "Comfortable initiating conversations with new people across different channels",
      "Willingness to do consistent outreach and follow-ups without dropping the ball",
      "Ability to stay organized and manage multiple conversations simultaneously",
      "Strong execution mindset—you get things done, not just planned",
      "Interest in sales, marketing, business development, or growth roles",
      "Ability to learn quickly and improve based on feedback",
    ],
    goodToHave: [
      "Prior experience in outreach, sales, marketing, or community building",
      "Familiarity with LinkedIn and professional communication norms",
      "Basic knowledge of Google Sheets or CRM/tracking tools",
      "Interest in education, startups, or business growth",
    ],
    eligibility: [
      "Open to students, freshers, and self-taught candidates",
      "No strict academic requirements—we care about your drive, not your degree",
      "Must be willing to commit consistently for the full internship duration",
    ],
    details: {
      Mode: "Remote",
      Duration: "3 Months (Extendable to 6 Months based on performance)",
      Commitment: "5–6 hours/day, 6 days/week",
    },
    benefits: [
      "Certificate of Internship",
      "Experience Letter",
      "Hands-on experience working on real products and workflows",
      "Mentorship and structured feedback throughout the internship",
      "Opportunity for a full-time role based on performance",
    ],
    note: "This role involves proactive, daily outreach and consistent follow-ups. It is not suitable for candidates who are uncomfortable initiating conversations, handling rejection, or working without close supervision.",
  },
  {
    title: "Web Developer Intern",
    icon: "",
    desc: "Build real digital products that students and parents actually use",
    category: "Internship",
    type: "Internship",
    location: "Remote",
    badge: "3 Months",
    featured: false,
    jdUrl: "https://docs.google.com/document/d/1lWZFwwLaSCPUxliHcydwBRF1UHimbjzz",
    applyUrl: INTERN_FORM_URL,
    highlights: [
      "Basic understanding of HTML, CSS, and JavaScript",
      "Build and improve live website pages, campaign landing pages, and UI components",
      "Convert designs and wireframes into responsive, clean web pages",
      "Willingness to commit consistently for the full internship duration",
    ],
    overview: "We are looking for a Web Developer Intern to help build and improve INFINEO's web platforms and digital experiences. This is a hands-on role—you will work on live websites, landing pages, and interactive features used in actual workflows, not practice projects. The focus is on learning fast, executing well, and building things that work.",
    responsibilities: [
      "Build and improve website pages and UI components",
      "Convert design ideas and wireframes into responsive, clean web pages",
      "Fix bugs and improve usability across desktop and mobile devices",
      "Create structured and maintainable frontend code",
      "Leverage AI tools and modern development workflows to accelerate output",
      "Test and refine features based on user feedback and team review",
    ],
    workingOn: [
      "INFINEO's main website and campaign landing pages",
      "Interactive educational experiences for children",
      "Frontend systems and UI improvements across the platform",
      "Real product features used by students, parents, and instructors",
    ],
    requirements: [
      "Basic understanding of HTML, CSS, and JavaScript",
      "Ability to build clean, responsive layouts that work across devices",
      "Problem-solving mindset—comfortable debugging and figuring things out",
      "Willingness to learn new tools and improve quickly",
      "Ability to execute consistently and iterate based on feedback",
    ],
    goodToHave: [
      "Familiarity with React, Next.js, or other modern frontend frameworks",
      "Basic understanding of APIs or backend concepts",
      "Experience using AI tools (Copilot, Cursor, etc.) during development",
      "Interest in UI/UX or product thinking",
    ],
    eligibility: [
      "Open to students, freshers, and self-taught developers",
      "No strict academic requirements—your portfolio matters more than your degree",
      "Must be willing to commit consistently for the full internship duration",
    ],
    details: {
      Mode: "Remote",
      Duration: "3 Months (Extendable to 6 Months based on performance)",
      Commitment: "5–6 hours/day, 6 days/week",
    },
    benefits: [
      "Certificate of Internship",
      "Experience Letter",
      "Hands-on experience working on real products and workflows",
      "Mentorship and structured feedback throughout the internship",
      "Opportunity for a full-time role based on performance",
    ],
    note: "This role requires consistent execution and real output. It is not suitable for candidates looking only for tutorials, passive learning, or guidance-heavy environments.",
  },
  {
    title: "Curriculum Development Intern",
    icon: "",
    desc: "Design lesson experiences that help children think, feel, and grow",
    category: "Internship",
    type: "Internship",
    location: "Remote",
    badge: "3 Months",
    featured: false,
    jdUrl: "https://docs.google.com/document/d/14vGvbK_FBI2XxIGT9rUUNCpiMCOU0-eL",
    applyUrl: INTERN_FORM_URL,
    highlights: [
      "Basic knowledge of Canva (mandatory for slide creation)",
      "Structure content into a clear learning flow (story -> insight -> activity -> reflection)",
      "Design lesson plans based on Indian mythology stories",
      "Willingness to commit consistently for the full internship duration",
    ],
    overview: "We are looking for a Curriculum Development Intern to help design lesson plans and learning content based on Indian mythology. This role involves structuring stories into meaningful learning experiences—connecting ancient narratives to the real emotions and situations children face today. You will produce clear, structured, and engaging content that is used in INFINEO's live sessions.",
    responsibilities: [
      "Design lesson plans based on Indian mythology stories across INFINEO's modules",
      "Structure content into a clear learning flow: story -> insight -> activity -> reflection",
      "Create well-designed presentations (PPTs) to deliver each lesson",
      "Connect story-based concepts to real-life situations faced by children aged 5–12",
      "Ensure clarity, simplicity, and engagement throughout all content",
      "Revise and improve content iteratively based on instructor and student feedback",
    ],
    workingOn: [
      "Turning mythology stories into practical, session-ready learning modules",
      "Designing content that helps children understand emotions, decisions, and behavior",
      "Creating structured, easy-to-follow presentations for live 1-on-1 sessions",
      "Building curriculum that scales across INFINEO's full 70-session course structure",
    ],
    requirements: [
      "Basic knowledge of Canva (mandatory for slide creation)",
      "Familiarity with PowerPoint or Google Slides",
      "Strong ability to structure and organize information clearly",
      "Interest in storytelling, education, or child development",
      "Ability to think clearly and communicate simply—for a child audience",
    ],
    goodToHave: [
      "Prior experience in content creation, teaching, tutoring, or curriculum design",
      "Exposure to AI tools (ChatGPT, Canva AI, etc.) for content workflows",
      "Interest in Indian mythology and its narrative structures",
    ],
    eligibility: [
      "Open to students, freshers, and self-taught candidates",
      "No strict academic or percentage criteria",
      "Must be willing to commit consistently for the full internship duration",
    ],
    details: {
      Mode: "Remote",
      Duration: "3 Months (Extendable to 6 Months based on performance)",
      Commitment: "5–6 hours/day, 6 days/week",
    },
    benefits: [
      "Certificate of Internship",
      "Experience Letter",
      "Hands-on experience working on real products and workflows",
      "Mentorship and structured feedback throughout the internship",
      "Opportunity for a full-time role based on performance",
    ],
    note: "This role requires original thinking and structured execution. We are building content for real children in live classes—copy-paste work or generic lesson structures will not pass review.",
  },
  {
    title: "Graphic Design Intern",
    icon: "",
    desc: "Turn curriculum into visuals that make children want to learn",
    category: "Internship",
    type: "Internship",
    location: "Remote",
    badge: "3 Months",
    featured: false,
    jdUrl: "https://docs.google.com/document/d/1quZF-Q0QZODZf-Vfuvs4yPHryaWeG70-",
    applyUrl: INTERN_FORM_URL,
    highlights: [
      "Design course presentations (PPTs) using Canva for live classes",
      "Convert raw lesson content into clean, engaging visual slides",
      "Maintain layout, alignment, and visual hierarchy consistency",
      "Willingness to commit consistently for the full internship duration",
    ],
    overview: "We are looking for a Graphic Design Intern to transform INFINEO's curriculum content into visually clear, structured, and engaging presentations using Canva. This role also involves creating simple visual and video-based assets to enhance the learning experience. You will work closely with the content team and iterate quickly based on feedback.",
    responsibilities: [
      "Design course presentations (PPTs) using Canva for live 1-on-1 classes",
      "Convert raw lesson content into clean, engaging visual slides",
      "Maintain consistency in design—fonts, spacing, layouts, and color usage",
      "Use visuals, icons, and layout to simplify complex concepts for children",
      "Assist in creating basic video content using Canva or similar tools",
      "Collaborate with the content team and refine designs based on feedback",
    ],
    workingOn: [
      "Slides and visual assets for mythology-based learning modules",
      "Content that makes abstract concepts accessible and engaging for children",
      "Video-based learning content for session recordings",
      "Clean, structured designs that are part of real, live products",
    ],
    requirements: [
      "Basic knowledge of Canva (mandatory—this is a day-one requirement)",
      "Understanding of layout, alignment, and visual hierarchy",
      "Ability to keep designs clean, simple, and structured",
      "Willingness to learn and improve quickly",
      "Ability to execute and iterate based on feedback without over-designing",
    ],
    goodToHave: [
      "Basic video editing experience using Canva or similar tools",
      "Interest in design for education, storytelling, or children's content",
      "Fluency in English (written and verbal)",
    ],
    eligibility: [
      "Open to students, freshers, and self-taught candidates",
      "No strict academic or percentage criteria",
      "Must be fluent in English",
      "Must be willing to commit consistently for the full internship duration",
    ],
    details: {
      Mode: "Remote",
      Duration: "3 Months (Extendable to 6 Months based on performance)",
      Commitment: "5–6 hours/day, 6 days/week",
    },
    benefits: [
      "Certificate of Internship",
      "Experience Letter",
      "Hands-on experience working on real products and workflows",
      "Mentorship and structured feedback throughout the internship",
      "Opportunity for a full-time role based on performance",
    ],
    note: "This role requires clean execution and attention to detail. Over-designed or cluttered work will be sent back. The best output here is always the clearest and simplest one.",
  },
];

const qualities = [
  {
    icon: "",
    title: "Excellent Communicators",
    desc: "People who can connect, explain, and engage with clarity and warmth.",
  },
  {
    icon: "",
    title: "Passionate Educators",
    desc: "Those who genuinely care about helping children learn, grow, and thrive.",
  },
  {
    icon: "",
    title: "Creative Thinkers",
    desc: "Team members who love storytelling, imaginative content, and bold ideas.",
  },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Teaching", "Internship"];

  const filteredRoles =
    activeFilter === "All"
      ? allRoles
      : allRoles.filter((r) => r.category === activeFilter);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initCursorSparkles({
      minInterval: 55,
      extraChance: 0.14,
      clickBurst: 8,
    });
    return () => cleanup();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`careers-page ${selectedJob ? "drawer-open" : ""}`}>
      <Title />

      {/* ── Hero ── */}
      <section className="careers-hero fade-in">
        {/* Animated mandala / geometric pattern overlay */}
        <div className="hero-pattern" aria-hidden="true">
          <svg
            className="pattern-svg"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Rotating outer rings */}
            <g className="pattern-ring ring-slow">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * 360;
                const rad = (angle * Math.PI) / 180;
                const x = 400 + 340 * Math.cos(rad);
                const y = 400 + 340 * Math.sin(rad);
                return (
                  <circle key={i} cx={x} cy={y} r="3" fill="rgba(240,200,106,0.18)" />
                );
              })}
            </g>
            <g className="pattern-ring ring-medium">
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * 360;
                const rad = (angle * Math.PI) / 180;
                const x = 400 + 240 * Math.cos(rad);
                const y = 400 + 240 * Math.sin(rad);
                return (
                  <g key={i}>
                    <line
                      x1={400} y1={400}
                      x2={x} y2={y}
                      stroke="rgba(240,200,106,0.06)"
                      strokeWidth="1"
                    />
                    <circle cx={x} cy={y} r="4" fill="rgba(240,200,106,0.12)" />
                  </g>
                );
              })}
            </g>
            {/* Inner lotus petals */}
            <g className="pattern-ring ring-reverse">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * 360;
                const rad = (angle * Math.PI) / 180;
                const x = 400 + 130 * Math.cos(rad);
                const y = 400 + 130 * Math.sin(rad);
                return (
                  <ellipse
                    key={i}
                    cx={x} cy={y}
                    rx="18" ry="7"
                    fill="rgba(240,200,106,0.10)"
                    transform={`rotate(${angle + 90}, ${x}, ${y})`}
                  />
                );
              })}
            </g>
            {/* Static concentric circles */}
            <circle cx="400" cy="400" r="60" fill="none" stroke="rgba(240,200,106,0.08)" strokeWidth="1" />
            <circle cx="400" cy="400" r="130" fill="none" stroke="rgba(240,200,106,0.07)" strokeWidth="0.8" />
            <circle cx="400" cy="400" r="240" fill="none" stroke="rgba(240,200,106,0.05)" strokeWidth="0.6" />
            <circle cx="400" cy="400" r="340" fill="none" stroke="rgba(240,200,106,0.04)" strokeWidth="0.5" />
            {/* Center bloom */}
            <circle cx="400" cy="400" r="8" fill="rgba(240,200,106,0.25)" />
            <circle cx="400" cy="400" r="4" fill="rgba(240,200,106,0.5)" />
          </svg>
        </div>

        {/* Decorative particles */}
        <div className="hero-particles" aria-hidden="true">
          <span className="particle particle--1" />
          <span className="particle particle--2" />
          <span className="particle particle--3" />
          <span className="particle particle--4" />
          <span className="particle particle--5" />
          <span className="particle particle--6" />
        </div>

        <span className="hero-eyebrow">We're Hiring</span>
        <h1>Join the Mission to Shape the Next Generation</h1>
        <p>
          Help children discover their voice, build strong values, and develop
          life-long confidence — through the magic of mythology and storytelling.
        </p>
        <div className="hero-cta-row">
          <a
            href={TEACHER_FORM_URL}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apply as a Storytelling Teacher"
          >
            Apply as a Teacher
          </a>
          <a
            href={INTERN_FORM_URL}
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apply for an Internship position"
          >
            Apply as an Intern
          </a>
        </div>

        {/* Role count badges */}
        <div className="hero-stats" aria-label="Open positions summary">
          <div className="hero-stat">
            <span className="hero-stat__number">1</span>
            <span className="hero-stat__label">Teaching Role</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat">
            <span className="hero-stat__number">9</span>
            <span className="hero-stat__label">Internships</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat">
            <span className="hero-stat__number">100%</span>
            <span className="hero-stat__label">Remote</span>
          </div>
        </div>
      </section>

      <main className="careers-content">
        {/* ── Mission ── */}
        <section className="about-infineo magic-card fade-in">
          <h2 className="careers-section-title">Our Mission</h2>
          <p>
            At Infineo, we weave ancient mythology into modern storytelling to
            empower young minds. Through interactive games and immersive
            narratives, we nurture confidence, empathy, and essential life
            skills in the next generation.
          </p>
        </section>

        {/* ── Who We Look For ── */}
        <section className="fade-in">
          <h2 className="careers-section-title">We Are Looking For</h2>
          <div className="values-grid">
            {qualities.map((q, i) => (
              <div
                className="value-card"
                key={i}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {q.icon && <span className="value-icon">{q.icon}</span>}
                <h3>{q.title}</h3>
                <p>{q.desc}</p>
              </div>
            ))}
          </div>
        </section>
      

        {/* ── All Open Roles (combined) ── */}
        <section className="fade-in">
          <h2 className="careers-section-title">Open Positions</h2>

          {/* Filter tabs */}
          <div className="roles-filter" role="group" aria-label="Filter roles by category">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-tab ${activeFilter === f ? "active" : ""}`}
                onClick={() => {
                  setActiveFilter(f);
                  setSelectedJob(null);
                }}
                aria-pressed={activeFilter === f}
              >
                {f}
                <span className="filter-tab__count">
                  {f === "All"
                    ? allRoles.length
                    : allRoles.filter((r) => r.category === f).length}
                </span>
              </button>
            ))}
          </div>

          <div className="jobs-list">
            {filteredRoles.map((job, idx) => {
              const isSelected = selectedJob?.title === job.title;
              return (
                <div
                  key={job.title}
                  className={`job-card ${isSelected ? "selected" : ""} ${job.featured ? "job-card--featured" : ""}`}
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  {job.featured && (
                    <div className="job-card__featured-ribbon" aria-label="Featured role">
                      Featured
                    </div>
                  )}

                  <div className="job-card-inner">
                    <div className="job-details">
                      <div className="job-card__meta-row">
                        <span className="job-category-tag">{job.category}</span>
                        {job.featured && (
                          <span className="job-category-tag job-category-tag--gold">
                            {job.type}
                          </span>
                        )}
                      </div>
                      <h3>{job.title}</h3>
                      <p className="job-desc">{job.desc}</p>
                      <div className="job-meta">
                        <span>{job.location}</span>
                        {!job.featured && <span>{job.type}</span>}
                        <span>{job.badge}</span>
                      </div>
                    </div>

                    <div className="job-actions">
                      <button
                        className="btn-outline"
                        onClick={() => setSelectedJob(job)}
                      >
                        View Job Description
                      </button>
                      <a
                        href={job.applyUrl}
                        className="apply-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Apply now for ${job.title}`}
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="careers-cta fade-in">
          <h3>Ready to Make an Impact?</h3>
          <p>
            Join us in crafting stories, experiences, and technology that
            inspire the next generation. Whether you're a teacher or a
            student — there's a place for you at Infineo.
          </p>
          <div className="cta-btn-row">
            <a
              href={TEACHER_FORM_URL}
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply as a Storytelling Teacher"
            >
              Apply as Teacher
            </a>
            <a
              href={INTERN_FORM_URL}
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply for an Internship position"
            >
              Apply as Intern
            </a>
          </div>
        </section>
      </main>

      {/* ── Drawer Overlay ── */}
      {selectedJob && (
        <div className="careers-drawer-overlay">
          <button
            className="jd-close-btn"
            onClick={() => setSelectedJob(null)}
            aria-label="Close job description"
          >
            ✕
          </button>
          <div className="jd-panel-content">
            <div className="jd-header">
              <span className="job-category-tag">{selectedJob.category}</span>
              <h2>
                {selectedJob.title}
              </h2>
              <div className="jd-meta-info">
                <span>{selectedJob.location}</span>
                <span>{selectedJob.type}</span>
                <span>{selectedJob.badge}</span>
              </div>
            </div>
            
            {/* Role Overview */}
            <div className="jd-section">
              <h3>Role Overview</h3>
              <p className="jd-text">{selectedJob.overview || selectedJob.desc}</p>
            </div>

            {/* Role Highlights */}
            {selectedJob.highlights && selectedJob.highlights.length > 0 && (
              <div className="jd-section">
                <h3>Role Highlights</h3>
                <ul>
                  {selectedJob.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Responsibilities */}
            {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
              <div className="jd-section">
                <h3>Key Responsibilities</h3>
                <ul>
                  {selectedJob.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* What You'll Be Working On */}
            {selectedJob.workingOn && selectedJob.workingOn.length > 0 && (
              <div className="jd-section">
                <h3>What You'll Be Working On</h3>
                <ul>
                  {selectedJob.workingOn.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {selectedJob.requirements && selectedJob.requirements.length > 0 && (
              <div className="jd-section">
                <h3>Requirements</h3>
                <ul>
                  {selectedJob.requirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Good to Have */}
            {selectedJob.goodToHave && selectedJob.goodToHave.length > 0 && (
              <div className="jd-section">
                <h3>Good to Have</h3>
                <ul>
                  {selectedJob.goodToHave.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Eligibility */}
            {selectedJob.eligibility && selectedJob.eligibility.length > 0 && (
              <div className="jd-section">
                <h3>Eligibility</h3>
                <ul>
                  {selectedJob.eligibility.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Internship / Role Details */}
            {selectedJob.details && Object.keys(selectedJob.details).length > 0 && (
              <div className="jd-section">
                <h3>{selectedJob.category === "Internship" ? "Internship Details" : "Role Details"}</h3>
                <div className="jd-details-grid">
                  {Object.entries(selectedJob.details).map(([key, value]) => (
                    <div className="jd-details-item" key={key}>
                      <span className="jd-details-label">{key}</span>
                      <span className="jd-details-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What You Will Get */}
            {selectedJob.benefits && selectedJob.benefits.length > 0 && (
              <div className="jd-section">
                <h3>What You Will Get</h3>
                <ul>
                  {selectedJob.benefits.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Selection Process */}
            <div className="jd-section">
              <h3>Selection Process</h3>
              <p className="jd-text">
                Our selection process is designed to find candidates who align with our values and execution mindset:
              </p>
              <ul>
                <li><strong>Step 1: Application Review</strong> — We review your form answers and portfolio/prior work.</li>
                <li><strong>Step 2: Practical Assessment</strong> — Shortlisted candidates will complete a role-specific task (e.g., sample slide design, code challenge, script drafting, or storytelling video demo).</li>
                <li><strong>Step 3: Discussion Round</strong> — A 1-on-1 conversation to align on schedules, expectations, and team fit.</li>
              </ul>
            </div>

            {/* Warning/Note Card */}
            {selectedJob.note && (
              <div className="jd-note-card">
                <p className="jd-note-text">{selectedJob.note}</p>
              </div>
            )}

            {/* Apply button and task details */}
            <div className="jd-footer-actions">
              <p className="jd-apply-info">
                Ready to Apply? Shortlisted candidates will be given a task-based assessment before final selection.
              </p>
              <a
                href={selectedJob.applyUrl}
                className="apply-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      )}

      <FloatingChatbot />
      <FloatingWhatsapp />
      <Footer />
    </div>
  );
}