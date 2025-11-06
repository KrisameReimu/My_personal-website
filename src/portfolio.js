/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation
import placeholderImages from "./placeholderImages"; // Placeholder images for quick start

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Echo Chen",
  title: "Hi all, I'm Echo (陈琛) Chen",
  subTitle: emoji(
    "A passionate AI & Full-Stack Developer 🚀 | Game Creator 🎮 | Digital Storyteller ✨ | Bridging technology and creativity to build innovative solutions that inspire and engage."
  ),
  resumeLink: "https://drive.google.com/file/d/your-cv-link", // Upload your CV to Google Drive and add link here
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/KrisameReimu",
  linkedin: "https://www.linkedin.com/in/chenchenai/",
  gmail: "chen944420634@gmail.com",
  instagram: "", // Add your Instagram if you have one
  youtube: "", // Add your YouTube channel for video works
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "FULL-STACK DEVELOPER & AI ENTHUSIAST WHO TURNS IDEAS INTO REALITY",
  skills: [
    emoji(
      "⚡ Develop AI-powered educational tools using GPT-4 and Azure OpenAI for personalized learning experiences"
    ),
    emoji("⚡ Create immersive 2D action-adventure games with Unity, featuring intricate level design and narrative-driven gameplay"),
    emoji(
      "⚡ Build responsive full-stack web applications with React.js, Flask, and modern JavaScript frameworks"
    ),
    emoji(
      "⚡ Design and produce multimedia content as a Department Multimedia Producer, bringing creative visions to life"
    ),
    emoji(
      "⚡ Write compelling articles and stories that blend technical insights with creative narratives"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "PyTorch",
      fontAwesomeClassname: "fas fa-brain"
    },
    {
      skillName: "TensorFlow",
      fontAwesomeClassname: "fas fa-project-diagram"
    },
    {
      skillName: "Unity",
      fontAwesomeClassname: "fab fa-unity"
    },
    {
      skillName: "C#",
      fontAwesomeClassname: "fas fa-code"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "React",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "Node.js",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "Java",
      fontAwesomeClassname: "fab fa-java"
    },
    {
      skillName: "SQL",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "Docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "Git",
      fontAwesomeClassname: "fab fa-git-alt"
    },
    {
      skillName: "Adobe PR",
      fontAwesomeClassname: "fas fa-film"
    },
    {
      skillName: "Adobe PS",
      fontAwesomeClassname: "fas fa-image"
    },
    {
      skillName: "Photography",
      fontAwesomeClassname: "fas fa-camera"
    },
    {
      skillName: "3ds Max",
      fontAwesomeClassname: "fas fa-cube"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "The Hong Kong Polytechnic University",
      logo: placeholderImages.polyuLogo,
      subHeader: "BSc in Internet and Multimedia Technologies",
      duration: "September 2021 - August 2025 (Expected)",
      desc: " Focused on multimedia development, programming, and machine intelligence.",
      descBullets: [
        "Key courses: Digital and Computer Systems (A+), Computer Programming (A), Fundamentals of Machine Intelligence (A)",
        "Object-Oriented Design and Programming (A), Database System (A-)"
      ]
    },
    {
      schoolName: "University of Oxford - Lady Margaret Hall",
      logo: placeholderImages.oxfordLogo,
      subHeader: "Short Academic Programme: AI and Machine Learning",
      duration: "August 5 - August 23, 2024",
      desc: "Completed a short academic programme on Artificial Intelligence and Machine Learning: Theory and Practice",
      descBullets: []
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Game Development", //Insert stack or technology you have experience in
      progressPercentage: "85%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Photography & Video Editing",
      progressPercentage: "90%"
    },
    {
      Stack: "Programming",
      progressPercentage: "75%"
    },
    {
      Stack: "Creative Writing",
      progressPercentage: "80%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Department Multimedia Producer",
      company: "The Hong Kong Polytechnic University",
      companylogo: placeholderImages.polyuLogo,
      date: "Jun 2023 – Jun 2025",
      desc: "Creating and producing multimedia content for the department, showcasing technical and creative expertise.",
      descBullets: [
        "Produced high-quality multimedia content for departmental communications",
        "Designed visual assets and managed video production workflows",
        "Collaborated with faculty and students on creative projects"
      ]
    },
    {
      role: "Web Developer Intern",
      company: "BornTea",
      companylogo: placeholderImages.bornteaLogo,
      date: "Jun 2024 – Aug 2024",
      desc: "Developed and maintained eCommerce platform, improving user experience and web performance.",
      descBullets: [
        "Built responsive web interfaces using modern JavaScript frameworks",
        "Integrated digital campaigns with marketing teams",
        "Supported multimedia marketing strategies and content creation"
      ]
    },
    {
      role: "Student Assistant",
      company: "The Hong Kong Polytechnic University",
      companylogo: placeholderImages.polyuLogo,
      date: "Jul 2023 – Jul 2025",
      desc: "Supporting campus initiatives and representing PolyU at various events.",
      descBullets: [
        "Guided 200+ freshmen annually as Student Ambassador",
        "Represented PolyU at 20+ public events and seminars",
        "Conducted campus surveys and assisted with administrative tasks"
      ]
    },
    {
      role: "IET Young Member Programme Contributor",
      company: "The Institution of Engineering and Technology Hong Kong",
      companylogo: placeholderImages.ietLogo,
      date: "2024",
      desc: "Active participant in promoting engineering innovation and mentoring young students.",
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Featured Projects",
  subtitle: "INNOVATIVE SOLUTIONS AT THE INTERSECTION OF AI, GAMES, AND WEB TECHNOLOGIES",
  projects: [
    {
      image: placeholderImages.genaiFeedback,
      projectName: "GenAI Feedback System",
      projectDesc: "AI-powered educational feedback system using GPT-4 for automated, personalized assessment. Published at WAIE2025.",
      footerLink: [
        {
          name: "View Project",
          url: "https://github.com/KrisameReimu"
        }
      ]
    },
    {
      image: placeholderImages.melinaGame,
      projectName: "Melina Dream of Hero",
      projectDesc: "2D action-adventure puzzle game inspired by Hollow Knight, featuring intricate level design, combat mechanics, and narrative-driven gameplay.",
      footerLink: [
        {
          name: "View Details",
          url: "#game-showcase"
        }
      ]
    },
    {
      image: placeholderImages.ecommerceWeb,
      projectName: "BornTea eCommerce Platform",
      projectDesc: "Full-stack eCommerce web application with enhanced user experience and integrated marketing campaigns.",
      footerLink: [
        {
          name: "Case Study",
          url: "#"
        }
      ]
    },
    {
      image: placeholderImages.multimediaPortfolio,
      projectName: "Multimedia Production Works",
      projectDesc: "Collection of multimedia productions including promotional videos, creative content, and visual storytelling projects.",
      footerLink: [
        {
          name: "View Portfolio",
          url: "#video-portfolio"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Awards, Certifications and Recognition for my contributions and skills",

  achievementsCards: [
    {
      title: "Oxford University Short Programme",
      subtitle:
        "Completed the Artificial Intelligence and Machine Learning: Theory and Practice programme at Lady Margaret Hall, University of Oxford.",
      image: placeholderImages.oxfordLogo, // 使用牛津大学的logo
      imageAlt: "Oxford University Logo",
      footerLink: [
        {
          name: "Certification",
          url: "" // 可以添加证书链接
        }
      ]
    },
    {
      title: "Gold Award - Video Production",
      subtitle:
        "Received Gold Award for participation in the Video Production Programme on Whole-person Development Fund - Student-initiated Project at The Hong Kong Polytechnic University.",
      image: placeholderImages.polyuAward, // 需要添加奖项相关图片
      imageAlt: "Gold Award Logo",
      footerLink: [
        {
          name: "View Award",
          url: "" // 可以添加奖项链接
        }
      ]
    },
    {
      title: "Special Award & Silver Award",
      subtitle: "Received Special Award and Silver Award for Video Production Programme at The Hong Kong Polytechnic University.",
      image: placeholderImages.polyuAward, // 使用相同的奖项图片
      imageAlt: "Special Award Logo",
      footerLink: [
        {
          name: "View Awards",
          url: "" // 可以添加奖项链接
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Essays",
  subtitle:
    "Thoughts, reflections, and stories I love to share through my writing.",
  blogs: [
    {
      url: "", // 可以添加散文链接
      title: "思考的边界",
      description:
        "关于人类思考极限的随想..."
    },
    {
      url: "", // 可以添加散文链接
      title: "城市中的孤独",
      description:
        "现代都市生活中的孤独感受..."
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "PHOTOGRAPHY",
  subtitle: emoji(
    "CAPTURING MOMENTS AND TELLING STORIES THROUGH IMAGES 📸"
  ),

  talks: [
    {
      title: "Urban Photography Collection",
      subtitle: "Exploring city life through the lens",
      slides_url: "", // 可以添加摄影作品集链接
      event_url: "" // 可以添加摄影作品集链接
    },
    {
      title: "Nature Photography Series",
      subtitle: "Finding beauty in natural landscapes",
      slides_url: "", // 可以添加摄影作品集链接
      event_url: "" // 可以添加摄影作品集链接
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Game Development Showcase Section

const gameDevSection = {
  title: emoji("Game Development 🎮"),
  subtitle: "CREATING IMMERSIVE WORLDS AND MEMORABLE EXPERIENCES",
  games: [
    {
      title: "Melina Dream of Hero",
      description: "A 2D action-adventure puzzle game inspired by Hollow Knight. Features multi-layered game maps, atmospheric scenes, and intricate puzzle structures that integrate with narrative and combat mechanics.",
      image: placeholderImages.melinaGame,
      demoVideo: "https://www.youtube.com/watch?v=your-demo-video", // Add your demo video
      downloadLink: "", // Add download link if available
      technologies: ["Unity", "C#", "Adobe Photoshop", "Git"],
      status: "In Development", // or "Completed", "Published"
      highlights: [
        "Game Map & Scene Designer - Created immersive game environments",
        "Designed multi-layered maps with hidden secrets and exploration mechanics",
        "Implemented movement mechanics and combat systems using C#",
        "Collaborated in team of 4 using Agile methodologies"
      ]
    },
    {
      title: "Future Game Project", 
      description: "Planning the next adventure - stay tuned for updates!",
      image: placeholderImages.gamePlaceholder,
      demoVideo: "",
      downloadLink: "",
      technologies: ["Unity", "C#", "Blender"],
      status: "Planning",
      highlights: [
        "Concept development phase",
        "Exploring new game mechanics",
        "Story and world building"
      ]
    }
  ],
  display: true
};

// Video Portfolio Section

const videoPortfolioSection = {
  title: emoji("Video Production 🎬"),
  subtitle: "AWARD-WINNING VIDEO CONTENT AND CREATIVE STORYTELLING",
  videos: [
    {
      title: "University Promotional Video",
      description: "Gold Award winning promotional content for PolyU",
      thumbnail: placeholderImages.video1Thumb,
      videoUrl: "", // YouTube or Vimeo embed URL
      category: "Promotional",
      awards: ["Gold Award - PolyU Video Production Programme"]
    },
    {
      title: "Creative Short Film",
      description: "Silver Award winning short film exploring urban life",
      thumbnail: placeholderImages.video2Thumb,
      videoUrl: "",
      category: "Short Film",
      awards: ["Silver Award - PolyU Video Production Programme"]
    },
    {
      title: "Documentary Project",
      description: "Special Award documentary on technology and society",
      thumbnail: placeholderImages.video3Thumb,
      videoUrl: "",
      category: "Documentary",
      awards: ["Special Award - PolyU Video Production Programme"]
    }
  ],
  display: true
};

// Photography Portfolio Section

const photographySection = {
  title: emoji("Photography 📸"),
  subtitle: "CAPTURING MOMENTS AND TELLING VISUAL STORIES",
  categories: [
    {
      name: "Urban Photography",
      description: "Exploring city life and architecture",
      coverImage: placeholderImages.urbanCover,
      photos: [
        // Add photo paths here
      ]
    },
    {
      name: "Portrait Photography",
      description: "Capturing human emotions and expressions",
      coverImage: placeholderImages.portraitCover,
      photos: [
        // Add photo paths here
      ]
    },
    {
      name: "Nature & Landscape",
      description: "Finding beauty in natural environments",
      coverImage: placeholderImages.natureCover,
      photos: [
        // Add photo paths here
      ]
    }
  ],
  display: true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "852 91303739",
  email_address: "chen944420634@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "", // 如果你有Twitter账号，可以添加
  display: false // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  gameDevSection,
  videoPortfolioSection,
  photographySection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
