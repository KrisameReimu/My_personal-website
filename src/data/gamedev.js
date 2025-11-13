/**
 * 游戏开发项目数据配置
 * 使用Milestone结构记录开发进度，保持Melina项目的叙事性展示
 *
 * 设计特色：
 * - 时间线展示开发历程
 * - 里程碑系统追踪进度
 * - 技术栈与特性亮点
 * - 双语标题与描述
 */

import {getImageUrl} from "../config/assets";
import {ContentCategories} from "../types/content.types";

export const gameDevConfig = {
  sectionTitle: {
    zh: "游戏开发",
    en: "Game Development"
  },
  subtitle: {
    zh: "创造沉浸式世界与难忘体验",
    en: "Creating Immersive Worlds and Memorable Experiences"
  },
  timelineTheme: {
    primaryColor: "#d4af37",
    accentColor: "#764ba2"
  }
};

export const projects = [
  {
    id: "melina-dream-of-hero",
    title: {
      zh: "Melina Dream of Hero",
      en: "Melina Dream of Hero"
    },
    description: {
      zh: "一款受《空洞骑士》启发的2D动作冒险解谜游戏。玩家将扮演勇敢的主角Melina，在神秘的梦境世界中冒险，解开层层谜题，探索隐藏的秘密。游戏融合了精心设计的关卡、大气的场景和紧张的战斗机制。",
      en: "A 2D action-adventure puzzle game inspired by Hollow Knight. Players take on the role of the brave protagonist Melina, venturing through a mysterious dream world, solving intricate puzzles, and uncovering hidden secrets. The game combines meticulously designed levels, atmospheric scenes, and intense combat mechanics."
    },
    coverImage: getImageUrl("projects/melina/cover.jpg", {width: 1920}),
    screenshots: [
      getImageUrl("projects/melina/screenshot1.jpg", {width: 1920}),
      getImageUrl("projects/melina/screenshot2.jpg", {width: 1920}),
      getImageUrl("projects/melina/screenshot3.jpg", {width: 1920}),
      getImageUrl("projects/melina/screenshot4.jpg", {width: 1920})
    ],
    demoVideo: "", // YouTube链接
    downloadLink: "", // 发布后添加下载链接
    technologies: [
      "Unity 2021.3",
      "C#",
      "Adobe Photoshop",
      "Git",
      "Aseprite",
      "FMOD Audio"
    ],
    status: ContentCategories.GAME.STATUS.IN_DEVELOPMENT,
    startDate: "2023-09-01",
    releaseDate: null, // 计划2025年发布
    highlights: [
      {
        zh: "多层次地图设计 - 创造充满探索性的游戏环境",
        en: "Multi-layered Map Design - Creating exploratory game environments"
      },
      {
        zh: "隐藏秘密与谜题 - 奖励好奇心的玩家",
        en: "Hidden Secrets and Puzzles - Rewarding curious players"
      },
      {
        zh: "流畅的移动与战斗系统 - 使用C#实现响应式操控",
        en: "Fluid Movement and Combat Systems - Responsive controls implemented in C#"
      },
      {
        zh: "团队协作开发 - 4人团队使用敏捷方法",
        en: "Team Collaboration - 4-member team using Agile methodologies"
      },
      {
        zh: "大气音效与配乐 - 营造沉浸式梦境体验",
        en: "Atmospheric Sound and Music - Creating immersive dreamscape experience"
      }
    ],
    milestones: [
      {
        title: "项目启动与概念设计",
        description:
          "完成游戏核心概念设计、世界观构建、主角设定。确定美术风格为像素艺术风格，参考《空洞骑士》的氛围营造。",
        completedDate: "2023-10-15",
        status: "completed"
      },
      {
        title: "基础移动系统实现",
        description:
          "使用C#实现角色的基础移动（行走、跳跃、冲刺）、物理碰撞检测、动画状态机。",
        completedDate: "2023-11-30",
        status: "completed"
      },
      {
        title: "第一张地图完成",
        description:
          "设计并实现游戏的第一张主要地图，包含多个平台、可交互对象、隐藏区域。使用Tilemap系统构建关卡。",
        completedDate: "2024-01-20",
        status: "completed"
      },
      {
        title: "战斗系统开发",
        description:
          "实现角色攻击动作、伤害判定、敌人AI行为、战斗反馈（击中特效、声音）。",
        completedDate: "2024-03-15",
        status: "completed"
      },
      {
        title: "解谜机制设计",
        description:
          "设计并实现各类解谜元素：机关、开关、移动平台、钥匙系统。将谜题融入关卡设计与叙事。",
        completedDate: "2024-05-10",
        status: "completed"
      },
      {
        title: "UI系统与存档功能",
        description:
          "开发游戏UI界面（主菜单、暂停菜单、HUD）、存档读档系统、设置选项。",
        completedDate: "2024-07-01",
        status: "completed"
      },
      {
        title: "音效与配乐集成",
        description:
          "使用FMOD集成音效系统，为游戏添加背景音乐、环境音效、战斗音效，增强沉浸感。",
        completedDate: "2024-08-20",
        status: "completed"
      },
      {
        title: "Boss战设计与实现",
        description:
          "设计并实现游戏的Boss战斗，包含多阶段攻击模式、特殊技能、挑战性战斗机制。",
        completedDate: null,
        status: "in-progress"
      },
      {
        title: "后期关卡与完整剧情",
        description: "完成游戏后期的关卡设计，串联完整的故事线，添加结局场景。",
        completedDate: null,
        status: "planned"
      },
      {
        title: "优化与打磨",
        description:
          "性能优化、Bug修复、平衡性调整、用户体验改进。准备发布版本。",
        completedDate: null,
        status: "planned"
      },
      {
        title: "游戏发布",
        description:
          "在Steam/Itch.io平台发布游戏，准备宣传材料、游戏预告片、社交媒体推广。",
        completedDate: null,
        status: "planned"
      }
    ],
    teamSize: 4,
    role: {
      zh: "游戏地图与场景设计师",
      en: "Game Map & Scene Designer"
    },
    achievements: [
      {
        zh: "设计了超过10张大型游戏地图",
        en: "Designed over 10 large game maps"
      },
      {
        zh: "实现了复杂的多层次关卡结构",
        en: "Implemented complex multi-layered level structures"
      },
      {
        zh: "创造了独特的视觉风格与氛围",
        en: "Created unique visual style and atmosphere"
      }
    ]
  },
  {
    id: "future-game-project",
    title: {
      zh: "未来游戏项目",
      en: "Future Game Project"
    },
    description: {
      zh: "正在策划的下一个游戏项目，敬请期待！探索新的游戏机制和叙事方式。",
      en: "Next game project in planning phase - stay tuned! Exploring new game mechanics and narrative approaches."
    },
    coverImage: getImageUrl("projects/future-game/cover.jpg", {width: 1920}),
    screenshots: [],
    demoVideo: "",
    downloadLink: "",
    technologies: ["Unity", "C#", "Blender"],
    status: ContentCategories.GAME.STATUS.PLANNING,
    startDate: "2025-01-01",
    releaseDate: null,
    highlights: [
      {
        zh: "概念开发阶段",
        en: "Concept development phase"
      },
      {
        zh: "探索新的游戏机制",
        en: "Exploring new game mechanics"
      },
      {
        zh: "故事与世界观构建",
        en: "Story and world building"
      }
    ],
    milestones: [
      {
        title: "概念研究",
        description: "研究市场趋势、玩家喜好、可行的游戏类型。",
        completedDate: null,
        status: "in-progress"
      },
      {
        title: "游戏设计文档",
        description:
          "编写完整的游戏设计文档，明确核心玩法、美术风格、技术需求。",
        completedDate: null,
        status: "planned"
      }
    ],
    teamSize: null,
    role: null,
    achievements: []
  }
];

// 获取进行中的项目
export const activeProjects = projects.filter(
  p => p.status === ContentCategories.GAME.STATUS.IN_DEVELOPMENT
);

// 获取已完成的项目
export const completedProjects = projects.filter(
  p =>
    p.status === ContentCategories.GAME.STATUS.COMPLETED ||
    p.status === ContentCategories.GAME.STATUS.PUBLISHED
);

// 计算项目进度百分比
export const calculateProgress = project => {
  const total = project.milestones.length;
  const completed = project.milestones.filter(
    m => m.status === "completed"
  ).length;
  return Math.round((completed / total) * 100);
};

// 技术栈统计
export const getAllTechnologies = () => {
  const techSet = new Set();
  projects.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet);
};

const gamedevData = {
  gameDevConfig,
  projects,
  calculateProgress,
  getAllTechnologies
};

export default gamedevData;
