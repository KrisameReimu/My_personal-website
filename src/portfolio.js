/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

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
  username: "Chen Chen",
  title: "Hi all, I'm 陈琛 Echo Chen",
  subTitle: emoji(
    "A creative IMT student 🚀 passionate about photography, writing, and game development. Exploring the intersection of technology and art through multimedia projects."
  ),
  resumeLink: "", // 你可以上传你的简历并添加链接
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/KrisameReimu",
  linkedin: "", // 可以添加你的LinkedIn链接
  gmail: "chen944420634@gmail.com",
  instagram: "", // 可以添加你的Instagram链接
  // 可以添加其他社交媒体链接
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "CREATIVE IMT STUDENT WHO LOVES TO EXPRESS THROUGH DIFFERENT MEDIUMS",
  skills: [
    emoji(
      "⚡ Develop interactive and immersive independent games using Unity"
    ),
    emoji("⚡ Capture moments and stories through photography"),
    emoji(
      "⚡ Express thoughts and emotions through creative writing"
    ),
    emoji(
      "⚡ Create multimedia experiences combining technology and art"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Unity",
      fontAwesomeClassname: "fab fa-unity"
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
      skillName: "3ds Max",
      fontAwesomeClassname: "fas fa-cube"
    },
    {
      skillName: "MATLAB",
      fontAwesomeClassname: "fas fa-calculator"
    },
    {
      skillName: "Java",
      fontAwesomeClassname: "fab fa-java"
    },
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "html-5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "Photography",
      fontAwesomeClassname: "fas fa-camera"
    },
    {
      skillName: "Writing",
      fontAwesomeClassname: "fas fa-pen-fancy"
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
      logo: require("./assets/images/polyuLogo.png"), // 需要添加理工大学的logo
      subHeader: "BSc in Internet and Multimedia Technologies",
      duration: "September 2021 - August 2025 (Expected)",
      desc: "GPA: 3.41/4.3. Focused on multimedia development, programming, and machine intelligence.",
      descBullets: [
        "Key courses: Digital and Computer Systems (A+), Computer Programming (A), Fundamentals of Machine Intelligence (A)",
        "Object-Oriented Design and Programming (A), Database System (A-)"
      ]
    },
    {
      schoolName: "University of Oxford - Lady Margaret Hall",
      logo: require("./assets/images/oxfordLogo.png"), // 需要添加牛津大学的logo
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
      role: "Youth Mentoring Programme Contributor",
      company: "The Institution of Engineering and Technology Hong Kong",
      companylogo: require("./assets/images/ietLogo.png"), // 需要添加IET的logo
      date: "2024",
      desc: "Contributed to the Youth Mentoring Programme 2024, recognized with a Certificate of Gratitude.",
    },
    {
      role: "Internet and Multimedia Product Development",
      company: "Hong Kong Polytechnic University",
      companylogo: require("./assets/images/polyuLogo.png"), // 使用理工大学的logo
      date: "May 2022 – July 2022",
      desc: "Applied Python for scientific computing and developed solutions for mathematical problems.",
      descBullets: [
        "Gained experience with microcontroller and IoT",
        "Created an interactive game with Python Pygame"
      ]
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
  title: "Projects",
  subtitle: "SOME CREATIVE PROJECTS I'VE WORKED ON",
  projects: [
    {
      image: require("./assets/images/gameDev.png"), // 需要添加游戏开发相关图片
      projectName: "Independent Game Development",
      projectDesc: "Creating immersive gaming experiences with Unity and creative storytelling",
      footerLink: [
        {
          name: "View Project",
          url: "" // 可以添加项目链接
        }
      ]
    },
    {
      image: require("./assets/images/photography.png"), // 需要添加摄影相关图片
      projectName: "Photography Portfolio",
      projectDesc: "Capturing moments and stories through the lens",
      footerLink: [
        {
          name: "View Gallery",
          url: "" // 可以添加摄影作品集链接
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
      image: require("./assets/images/oxfordLogo.png"), // 使用牛津大学的logo
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
      image: require("./assets/images/polyuAward.png"), // 需要添加奖项相关图片
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
      image: require("./assets/images/polyuAward.png"), // 使用相同的奖项图片
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

// Podcast Section - 可以改为游戏开发部分

const podcastSection = {
  title: emoji("Game Development 🎮"),
  subtitle: "CREATING INTERACTIVE EXPERIENCES AND VIRTUAL WORLDS",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "" // 可以添加游戏开发相关视频或演示链接
  ],
  display: true // Set false to hide this section, defaults to true
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
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
