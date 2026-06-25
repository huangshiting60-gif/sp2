import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone, 
  Award, 
  Layers, 
  BookOpen, 
  Cpu, 
  Calendar, 
  ExternalLink, 
  Sparkles, 
  Workflow, 
  Monitor, 
  Smartphone, 
  FileText,
  User,
  ChevronRight,
  Eye,
  Target,
  Linkedin
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { professorProfile } from "./data";
import { AcademicHighlight } from "./types";

type TabId = "about" | "expertise" | "highlights" | "experience";

const publicationData = [
  { year: "2018", count: 2, impact: 28 },
  { year: "2019", count: 3, impact: 42 },
  { year: "2020", count: 3, impact: 55 },
  { year: "2021", count: 5, impact: 78 },
  { year: "2022", count: 4, impact: 92 },
  { year: "2023", count: 6, impact: 120 },
  { year: "2024", count: 7, impact: 145 },
  { year: "2025", count: 7, impact: 172 },
  { year: "2026", count: 8, impact: 210 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 110, 
      damping: 15 
    } 
  }
};

export default function App() {
  const p = professorProfile;
  const [currentTab, setCurrentTab] = useState<TabId>("about");
  const [selectedHighlightYear, setSelectedHighlightYear] = useState<string>("All");
  const [selectedHighlightType, setSelectedHighlightType] = useState<string>("All");
  const [selectedResearch, setSelectedResearch] = useState<AcademicHighlight | null>(null);
  const [chartMetric, setChartMetric] = useState<"count" | "impact">("count");

  const highlightYears = ["All", ...Array.from(new Set(p.highlights.map(h => h.year).filter(Boolean).sort().reverse()))];
  const highlightTypes = ["All", ...Array.from(new Set(p.highlights.map(h => h.type).filter(Boolean)))];

  // Scroll to top of page when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentTab]);

  const filteredHighlights = p.highlights.filter(h => {
    const matchYear = selectedHighlightYear === "All" || h.year === selectedHighlightYear;
    const matchType = selectedHighlightType === "All" || h.type === selectedHighlightType;
    return matchYear && matchType;
  });

  const getHighlightBorderColor = (type: string) => {
    switch (type) {
      case "教育部教學實踐研究計畫":
        return "border-l-4 border-slate-900";
      case "產學合作專案":
        return "border-l-4 border-stone-400";
      case "學術期刊發表":
        return "border-l-4 border-stone-600";
      default:
        return "border-l-4 border-stone-300";
    }
  };

  const getHighlightBadgeColor = (type: string) => {
    switch (type) {
      case "教育部教學實踐研究計畫":
        return "bg-stone-100 text-stone-900 border-stone-200";
      case "產學合作專案":
        return "bg-stone-50 text-stone-700 border-stone-200";
      case "學術期刊發表":
        return "bg-stone-100/50 text-stone-800 border-stone-200/80";
      default:
        return "bg-stone-50 text-stone-600 border-stone-200";
    }
  };

  const getHighlightIcon = (type: string) => {
    switch (type) {
      case "教育部教學實踐研究計畫":
        return <Smartphone className="w-3.5 h-3.5 text-stone-800" />;
      case "產學合作專案":
        return <Workflow className="w-3.5 h-3.5 text-stone-600" />;
      case "學術期刊發表":
        return <FileText className="w-3.5 h-3.5 text-stone-700" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-stone-500" />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfbf9] font-sans text-stone-800 flex flex-col relative selection:bg-stone-900/10 selection:text-stone-900">
      
      {/* GLOBAL HEADER & NAVIGATION (Minimalist Editorial Design - Matches Screenshots) */}
      <header className="sticky top-0 z-40 bg-[#fcfbf9]/80 backdrop-blur-md border-b border-stone-200/40 shrink-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setCurrentTab("about")}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-stone-900 transition-transform group-hover:scale-125 duration-300" />
            <span className="font-serif text-lg tracking-[0.2em] font-medium text-stone-900 uppercase">
              {p.englishName}
            </span>
          </div>
          
          {/* Main Navigation Tabs */}
          <nav className="flex items-center gap-6 sm:gap-10">
            {[
              { id: "about", label: "關於" },
              { id: "experience", label: "學術交流" },
              { id: "expertise", label: "專長領域" },
              { id: "highlights", label: "研究計畫" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as TabId)}
                className={`relative text-xs sm:text-sm font-sans tracking-widest font-medium transition-all duration-300 pb-1.5 cursor-pointer ${
                  currentTab === tab.id
                    ? "text-stone-950 font-semibold"
                    : "text-stone-400 hover:text-stone-950"
                }`}
              >
                {tab.label}
                {currentTab === tab.id && (
                  <motion.div
                    layoutId="header-active-line"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-stone-950"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 py-8 md:py-12 flex flex-col gap-10">
        
        <AnimatePresence mode="wait">
          
          {/* TAB 1: 關於 (Image 3) */}
          {currentTab === "about" && (
            <motion.div
              key="about"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-16"
            >
              {/* Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-4">
                
                {/* Left: Elegant Rounded Portrait */}
                <motion.div 
                  variants={itemVariants} 
                  className="lg:col-span-5 flex flex-col items-center lg:items-start gap-5 order-2 lg:order-1"
                >
                  <div className="relative w-full max-w-[340px] aspect-square rounded-[40px] overflow-hidden shadow-sm bg-stone-50 border border-stone-200/60 group">
                    <svg viewBox="0 0 200 200" className="w-full h-full select-none hover:scale-102 transition-transform duration-700" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="bgGlow" cx="50%" cy="50%" r="70%">
                          <stop offset="0%" stopColor="#1e293b" />
                          <stop offset="100%" stopColor="#0f172a" />
                        </radialGradient>
                        <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      
                      <rect width="200" height="200" fill="url(#bgGlow)"/>
                      
                      {/* Glowing target/halo behind cat */}
                      <circle cx="100" cy="100" r="85" fill="url(#haloGlow)" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="#2dd4bf" stroke-width="1" stroke-dasharray="3,6" opacity="0.4"/>
                      <circle cx="100" cy="100" r="55" fill="none" stroke="#3b82f6" stroke-width="1" stroke-dasharray="6,4" opacity="0.5"/>
                      <circle cx="100" cy="100" r="45" fill="none" stroke="#10b981" stroke-width="0.75" stroke-dasharray="2,2" opacity="0.3"/>
                      
                      {/* Radiating target/radar lines */}
                      <line x1="100" y1="15" x2="100" y2="30" stroke="#2dd4bf" stroke-width="1.2" opacity="0.4" stroke-dasharray="2,2"/>
                      <line x1="100" y1="170" x2="100" y2="185" stroke="#2dd4bf" stroke-width="1.2" opacity="0.4" stroke-dasharray="2,2"/>
                      <line x1="15" y1="100" x2="30" y2="100" stroke="#2dd4bf" stroke-width="1.2" opacity="0.4" stroke-dasharray="2,2"/>
                      <line x1="170" y1="100" x2="185" y2="100" stroke="#2dd4bf" stroke-width="1.2" opacity="0.4" stroke-dasharray="2,2"/>
                      
                      {/* Corner ticks */}
                      <line x1="45" y1="45" x2="52" y2="52" stroke="#3b82f6" stroke-width="1.2" opacity="0.4"/>
                      <line x1="155" y1="45" x2="148" y2="52" stroke="#3b82f6" stroke-width="1.2" opacity="0.4"/>
                      <line x1="45" y1="155" x2="52" y2="148" stroke="#3b82f6" stroke-width="1.2" opacity="0.4"/>
                      <line x1="155" y1="155" x2="148" y2="148" stroke="#3b82f6" stroke-width="1.2" opacity="0.4"/>

                      {/* Cat Body */}
                      <path d="M60,190 C60,125 75,120 100,120 C125,120 140,125 140,190" fill="#ffffff" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round"/>
                      {/* Paws Details */}
                      <path d="M82,190 L82,180" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
                      <path d="M118,190 L118,180" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>

                      {/* Cat Ears */}
                      {/* Left Ear */}
                      <path d="M68,100 L42,52 C42,52 52,44 65,65" fill="#f97316" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round"/>
                      <path d="M58,85 L48,58 C48,58 54,53 60,68" fill="#fda4af" />
                      
                      {/* Right Ear */}
                      <path d="M132,100 L158,52 C158,52 148,44 135,65" fill="#f97316" stroke="#0f172a" stroke-width="3.5" stroke-linejoin="round"/>
                      <path d="M142,85 L152,58 C152,58 146,53 140,68" fill="#fda4af" />

                      {/* Cat Head Base (White) */}
                      <ellipse cx="100" cy="115" rx="52" ry="42" fill="#ffffff" stroke="#0f172a" stroke-width="3.5"/>
                      
                      {/* Cat Orange Cap/Head Patch */}
                      <path d="M49,105 C49,75 70,68 100,75 C130,68 151,75 151,105 C140,88 125,92 100,90 C75,92 60,88 49,105 Z" fill="#f97316" stroke="#0f172a" stroke-width="3" stroke-linejoin="round"/>

                      {/* Eyes */}
                      {/* Left Eye */}
                      <circle cx="78" cy="106" r="12" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
                      <circle cx="78" cy="106" r="8" fill="#0f172a"/>
                      <circle cx="75" cy="102" r="3" fill="#ffffff"/>
                      
                      {/* Right Eye */}
                      <circle cx="122" cy="106" r="12" fill="#ffffff" stroke="#0f172a" stroke-width="3"/>
                      <circle cx="122" cy="106" r="8" fill="#0f172a"/>
                      <circle cx="119" cy="102" r="3" fill="#ffffff"/>

                      {/* Nose & Mouth */}
                      {/* Snout Background */}
                      <ellipse cx="100" cy="120" rx="14" ry="8" fill="#ffffff" />
                      {/* Mouth (W line) */}
                      <path d="M88,122 C92,127 97,125 100,122 C103,125 108,127 112,122" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
                      {/* Open Mouth Tongue */}
                      <path d="M94,123 C94,123 100,135 106,123 Z" fill="#e11d48" stroke="#0f172a" stroke-width="2.5" stroke-linejoin="round"/>
                      <path d="M97,124 C97,124 100,130 103,124 Z" fill="#fda4af"/>

                      {/* Whiskers */}
                      {/* Left */}
                      <line x1="42" y1="120" x2="20" y2="116" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
                      <line x1="42" y1="128" x2="20" y2="131" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
                      {/* Right */}
                      <line x1="158" y1="120" x2="180" y2="116" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
                      <line x1="158" y1="128" x2="180" y2="131" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
                    </svg>
                  </div>
                  <div className="w-16 h-[1.5px] bg-stone-300 self-center lg:self-start mt-2" />
                </motion.div>

                {/* Right: Intro text block */}
                <motion.div 
                  variants={itemVariants} 
                  className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left order-1 lg:order-2"
                >
                  <div className="space-y-4">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200/50 text-[11px] font-medium tracking-wide">
                      {p.institution}{p.department}
                    </span>
                    <div className="space-y-2">
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-wide text-stone-900">
                        {p.name}
                      </h1>
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-stone-500 font-sans text-sm tracking-widest font-light">
                        <span className="font-serif italic text-base">{p.title}</span>
                        <span className="text-stone-300">|</span>
                        <span className="text-xs uppercase font-serif tracking-[0.15em]">
                          {p.englishName}, Ph.D.
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light tracking-wide max-w-xl mx-auto lg:mx-0 font-serif">
                    {p.about}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 max-w-xl mx-auto lg:mx-0">
                    {p.expertise.slice(0, 5).map((exp) => (
                      <span
                        key={exp.name}
                        className="px-4 py-1.5 rounded-full border border-stone-200 text-xs text-stone-600 font-sans tracking-wider hover:border-stone-400 transition-colors duration-300 bg-stone-50/30"
                      >
                        {exp.name}
                      </span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-3">
                    <button
                      onClick={() => setCurrentTab("experience")}
                      className="px-8 py-3 bg-stone-950 text-[#fcfbf9] rounded-full text-xs font-bold tracking-widest uppercase hover:bg-stone-800 transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm group"
                    >
                      完整學經歷 
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => setCurrentTab("highlights")}
                      className="px-6 py-3 text-stone-600 hover:text-stone-950 text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      研究計畫
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Research Philosophy Section */}
              <motion.div 
                variants={itemVariants} 
                className="pt-10 border-t border-stone-200/50 flex flex-col items-center text-center max-w-3xl mx-auto space-y-6"
              >
                <span className="text-stone-400 text-xs font-semibold uppercase tracking-[0.25em]">RESEARCH PHILOSOPHY</span>
                <p className="font-serif text-xl sm:text-2xl text-stone-800 leading-relaxed italic font-light tracking-wide">
                  "{p.motto}"
                </p>
                <div className="w-12 h-[1px] bg-stone-300" />
              </motion.div>

              {/* Secondary Details Section (Biographical Statements & Key Roles) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-white border border-stone-200/50 space-y-4">
                  <h3 className="text-stone-900 font-serif text-lg tracking-wide font-medium">學術與研究背景</h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                    郭博士長期深耕於教學設計、數位學習及教育科技整合應用，特別關注虛擬實境（VR）與擴增實境（AR）在高等教育與企業培訓中的創新整合。她結合了多年醒吾科技大學行政管考與產學合作的實戰經驗，致力於將先進的科技融入課程教材開發，引導學生透過動手操作與專案管理，在數位內容設計領域取得卓越成就。
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-white border border-stone-200/50 space-y-4">
                  <h3 className="text-stone-900 font-serif text-lg tracking-wide font-medium">學術整合與服務</h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                    現任淡江大學教育科技學系助理教授。教授「數位內容設計」、「教學設計原理」、「多媒體教材研發」等專業課程，開展融合 AR/VR 之創新教材教學實踐研究。曾任醒吾科技大學副研發長、計畫管考中心主任等行政職務，累計管考教育部、科技部等大型研究及校務發展計畫，建立嚴謹的高效管考標準化機制。
                  </p>
                </motion.div>
              </div>

              {/* Minimal Scroll Indicator */}
              <div className="flex flex-col items-center justify-center pt-8 text-stone-300 gap-2">
                <span className="text-[10px] tracking-[0.3em] uppercase">SCROLL</span>
                <div className="w-[1px] h-12 bg-stone-200" />
              </div>
            </motion.div>
          )}

          {/* TAB 2: 專長領域 (Image 1) */}
          {currentTab === "expertise" && (
            <motion.div
              key="expertise"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-12 py-4"
            >
              {/* Header Description Block */}
              <motion.div variants={itemVariants} className="space-y-5 text-center lg:text-left max-w-4xl">
                <span className="inline-block px-3.5 py-1.5 rounded-full border border-stone-300 text-[10px] font-semibold tracking-widest text-stone-600 uppercase bg-stone-50/50">
                  RESEARCH FOCUS
                </span>
                <div className="space-y-4">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-950 font-normal leading-tight tracking-wide whitespace-pre-line">
                    教學設計{"\n"}與數位創新
                  </h2>
                  <p className="text-stone-500 text-sm sm:text-base leading-relaxed tracking-wider font-light">
                    跨領域的學術研究與實務經驗，涵蓋教育科技的核心面向。
                  </p>
                </div>
              </motion.div>

              {/* Minimal Table Grid Layout (Matches Image 1 layout) */}
              <motion.div 
                variants={itemVariants} 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-stone-200/60 mt-10 bg-white"
              >
                {/* Card 1: Teaching Design */}
                <div className="border-r border-b border-stone-200/60 p-8 sm:p-10 flex flex-col justify-between hover:bg-stone-50/30 transition-all duration-300 group min-h-[300px]">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 bg-[#fcfbf9] group-hover:scale-105 transition-transform duration-300">
                      <Target className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-normal text-stone-900">教學設計</h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-stone-400">INSTRUCTIONAL DESIGN</p>
                    </div>
                  </div>
                  <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed pt-6">
                    系統化教學設計方法論，從需求分析、學習者特性評估到教學策略擬定與評量設計，建構完整的教學系統。
                  </p>
                </div>

                {/* Card 2: E-learning */}
                <div className="border-r border-b border-stone-200/60 p-8 sm:p-10 flex flex-col justify-between hover:bg-stone-50/30 transition-all duration-300 group min-h-[300px]">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 bg-[#fcfbf9] group-hover:scale-105 transition-transform duration-300">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-normal text-stone-900">數位學習</h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-stone-400">E-LEARNING</p>
                    </div>
                  </div>
                  <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed pt-6">
                    數位學習平台規劃、線上課程設計、混合式教學模式開發，結合學習分析技術優化學習體驗與成效。
                  </p>
                </div>

                {/* Card 3: VR/AR */}
                <div className="border-r border-b border-stone-200/60 p-8 sm:p-10 flex flex-col justify-between hover:bg-stone-50/30 transition-all duration-300 group min-h-[300px]">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 bg-[#fcfbf9] group-hover:scale-105 transition-transform duration-300">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-normal text-stone-900">VR/AR 教材開發</h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-stone-400">VR/AR DEVELOPMENT</p>
                    </div>
                  </div>
                  <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed pt-6">
                    虛擬實境與擴增實境沉浸式教材設計與開發，運用 Unity 與各類創作工具打造高度互動的學習內容。
                  </p>
                </div>

                {/* Card 4: Project Management */}
                <div className="border-r border-b border-stone-200/60 p-8 sm:p-10 flex flex-col justify-between hover:bg-stone-50/30 transition-all duration-300 group min-h-[300px]">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 bg-[#fcfbf9] group-hover:scale-105 transition-transform duration-300">
                      <Workflow className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-normal text-stone-900">專案管理</h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-stone-400">PROJECT MANAGEMENT</p>
                    </div>
                  </div>
                  <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed pt-6">
                    統籌與管考大型產學專案與研發計畫，對接企業委託之微型數位學習方案，實踐高效跨部門協作與管考流程。
                  </p>
                </div>

                {/* Card 5: IT Integration */}
                <div className="border-r border-b border-stone-200/60 p-8 sm:p-10 flex flex-col justify-between hover:bg-stone-50/30 transition-all duration-300 group min-h-[300px]">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 bg-[#fcfbf9] group-hover:scale-105 transition-transform duration-300">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-normal text-stone-900">資訊科技整合</h3>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-stone-400">IT INTEGRATION</p>
                    </div>
                  </div>
                  <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed pt-6">
                    前瞻資訊工具與數據分析技術整合，引領高等教育數位化教學變革、設計互動式教具與智能評量機制。
                  </p>
                </div>

                {/* Empty Filler Card for neat grid structure */}
                <div className="border-r border-b border-stone-200/60 p-8 sm:p-10 flex flex-col justify-center items-center bg-[#fcfbf9]/40 min-h-[300px] text-stone-300">
                  <span className="font-serif text-lg tracking-widest italic">YING CHIH KUO</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* TAB 3: 研究計畫 (Line Trends & Filterable Highlights Panel) */}
          {currentTab === "highlights" && (
            <motion.div
              key="highlights"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-10 py-4"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="space-y-2 max-w-3xl">
                <span className="text-stone-400 text-xs font-semibold uppercase tracking-[0.25em]">RESEARCH & PROJECTS</span>
                <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-wide font-normal">
                  教學實踐與產學成果
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm font-light tracking-wide">
                  郭教授近年主持之教育部大專教學實踐計畫、大型產學研發、以及發表於核心期刊之論文。
                </p>
              </motion.div>

              {/* Line Trend Visualization */}
              <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/50 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base font-serif text-stone-900 font-medium">
                      {chartMetric === "count" ? "歷年學術與專案發表趨勢 / Publication Trend" : "累積專案影響力指數 / Cumulative Impact"}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1">
                      {chartMetric === "count" 
                        ? "自 2018 年起迄今之期刊、研討會論文與專案報告統計趨勢（單位：件）" 
                        : "根據專案執行規模、技術轉移率與學術引用權重推估之年度學術能量綜合指標"}
                    </p>
                  </div>
                  {/* Metric Toggle */}
                  <div className="flex bg-stone-100 p-1 rounded-xl shrink-0 self-start sm:self-center border border-stone-200/30">
                    <button
                      onClick={() => setChartMetric("count")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                        chartMetric === "count"
                          ? "bg-stone-900 text-white shadow-sm"
                          : "text-stone-500 hover:text-stone-950"
                      }`}
                    >
                      年度發表數量
                    </button>
                    <button
                      onClick={() => setChartMetric("impact")}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                        chartMetric === "impact"
                          ? "bg-stone-900 text-white shadow-sm"
                          : "text-stone-500 hover:text-stone-950"
                      }`}
                    >
                      累積專案影響力
                    </button>
                  </div>
                </div>

                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={publicationData}
                      margin={{ top: 10, right: 15, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="4 4" stroke="#f5f4f0" vertical={false} />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fill: '#78716c', fontSize: 11, fontFamily: 'monospace' }}
                        axisLine={{ stroke: '#e7e5e4' }}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#78716c', fontSize: 11, fontFamily: 'monospace' }}
                        axisLine={{ stroke: '#e7e5e4' }}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const isCount = chartMetric === "count";
                            return (
                              <div className="bg-stone-900 text-white p-3.5 rounded-xl border border-stone-800 shadow-xl text-xs space-y-1">
                                <p className="font-bold text-stone-300 font-serif">{label} 年度</p>
                                <p className="text-stone-100 flex items-center gap-1.5 font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-stone-100" />
                                  {isCount ? "學術與專案發表：" : "累積影響力點數："}
                                  <span className="font-mono text-sm">{payload[0].value}</span> {isCount ? "件" : ""}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey={chartMetric}
                        stroke="#1c1917"
                        strokeWidth={2.5}
                        dot={{ r: 5, stroke: '#fcfbf9', strokeWidth: 2, fill: '#1c1917' }}
                        activeDot={{ r: 7, stroke: '#fcfbf9', strokeWidth: 2, fill: '#000000' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Highlights Filter Control Panel */}
              <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/50 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-stone-950 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-stone-850" />
                      亮點計畫篩選牆 / Project filter wall
                    </h3>
                    <p className="text-xs text-stone-400">
                      點擊下方發表類別或執行年度，即時檢視對應之代表性計畫與期刊論文成果。
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-stone-100 text-stone-800 px-3.5 py-1.5 rounded-xl font-bold self-start sm:self-center shrink-0 border border-stone-200/30">
                    符合項目：{filteredHighlights.length} 筆
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type filter */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">專案與研究類型 Specialty areas:</span>
                    <div className="flex flex-wrap gap-2">
                      {highlightTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedHighlightType(type)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                            selectedHighlightType === type
                              ? "bg-stone-900 border-stone-900 text-white shadow-sm"
                              : "bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-600"
                          }`}
                        >
                          {type === "All" ? "🔬 全部類型" : type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Year filter */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">發表與執行年度 Execution year:</span>
                    <div className="flex flex-wrap gap-2">
                      {highlightYears.map((year) => (
                        <button
                          key={year}
                          onClick={() => setSelectedHighlightYear(year)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                            selectedHighlightYear === year
                              ? "bg-stone-900 border-stone-900 text-white shadow-sm"
                              : "bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-600"
                          }`}
                        >
                          {year === "All" ? "📅 全部年度" : `${year} 年`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Project highlights grid */}
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredHighlights.length > 0 ? (
                    filteredHighlights.map((item) => (
                      <motion.div
                        layout
                        key={item.title}
                        variants={itemVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className={`bg-white rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-stone-200/60 p-6 sm:p-7 flex flex-col justify-between ${getHighlightBorderColor(item.type)}`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${getHighlightBadgeColor(item.type)}`}>
                              {getHighlightIcon(item.type)}
                              {item.type}
                            </span>
                            {item.year && (
                              <span className="text-[10px] bg-stone-100 text-stone-500 font-mono font-bold px-2.5 py-0.5 rounded-full border border-stone-200/20">
                                {item.year} 年
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm sm:text-base font-serif font-medium text-stone-900 leading-snug hover:text-stone-700 transition-colors">
                            {item.title}
                          </h4>

                          {item.journal && (
                            <div className="flex items-center gap-1 text-[11px] text-stone-400 font-medium font-sans">
                              <span className="font-bold text-stone-500">典藏來源:</span>
                              <span className="italic">{item.journal}</span>
                            </div>
                          )}

                          <p className="text-stone-500 text-xs font-light leading-relaxed line-clamp-3">
                            {item.desc}
                          </p>

                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {item.tags.map(tag => (
                                <span key={tag} className="text-[9px] bg-stone-50 text-stone-500 border border-stone-200/40 rounded-md px-2 py-0.5 font-sans">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                          <span>主持人: 郭盈芝 助理教授</span>
                          <button 
                            onClick={() => setSelectedResearch(item)}
                            className="text-stone-900 hover:text-stone-700 hover:underline cursor-pointer font-bold flex items-center gap-0.5"
                          >
                            詳細成果 <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="col-span-full bg-white p-12 rounded-3xl border border-stone-200/50 text-center space-y-4 shadow-sm"
                    >
                      <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto border border-stone-100">
                        <BookOpen className="w-8 h-8 text-stone-300" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-stone-800 font-serif">未找到符合條件的研究成果</h4>
                        <p className="text-xs text-stone-400">請嘗試調整您的篩選條件，或重設篩選狀態。</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedHighlightYear("All");
                          setSelectedHighlightType("All");
                        }}
                        className="px-5 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-850 transition-colors shadow-sm cursor-pointer"
                      >
                        重設篩選條件
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}

          {/* TAB 4: 學術交流 (Unified Experience Timeline, Certifications, Contact - Matches Image 2) */}
          {currentTab === "experience" && (
            <motion.div
              key="experience"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="space-y-16 py-4"
            >
              {/* Image 2 layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Left Column of timeline (Image 2) */}
                <motion.div variants={itemVariants} className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
                  <div className="flex items-center gap-2.5 text-stone-800">
                    <span className="text-stone-900 text-base">◆</span>
                    <span className="font-serif text-sm tracking-widest font-medium uppercase">學思歷程</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-950 font-normal leading-tight tracking-wide">
                    學思歷程
                  </h2>
                  <div className="w-16 h-[1.5px] bg-stone-300 my-4" />
                  <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed max-w-sm font-serif">
                    深耕教育科技學系。歷任行政主管、副研發長與教學職務，將先進的 VR/AR 沉浸教材設計、計畫管考與產學合作實戰成果，深度實踐於高等教育的課堂創新。
                  </p>
                </motion.div>

                {/* Right Column of timeline (Image 2) */}
                <motion.div variants={itemVariants} className="lg:col-span-8 space-y-12">
                  
                  {/* Timeline with vertical line and dots */}
                  <div className="relative pl-6 space-y-10 before:content-[''] before:absolute before:left-[3.5px] before:top-2 before:bottom-2 before:w-[1px] before:bg-stone-200">
                    
                    {/* Item 1: Current Assistant Professor */}
                    <div className="relative group space-y-1">
                      <div className="absolute -left-[27.5px] top-1.5 w-2 h-2 rounded-full border-2 border-[#fcfbf9] bg-stone-900 transition-all duration-300 group-hover:scale-125" />
                      <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block font-medium">現在</span>
                      <div className="space-y-0.5">
                        <h4 className="font-serif text-lg sm:text-xl font-normal text-stone-900 group-hover:text-stone-700 transition-colors">
                          淡江大學教育科技學系
                        </h4>
                        <p className="text-stone-500 text-xs sm:text-sm font-light tracking-wide">助理教授</p>
                      </div>
                      <p className="text-stone-400 text-xs font-light leading-relaxed pt-2.5 max-w-xl">
                        教授「數位內容設計」、「教學設計原理」、「多媒體教材研發」等專業課程，開展融合 AR/VR 之創新教材教學實踐研究。
                      </p>
                    </div>

                    {/* Item 2: Vice Dean of R&D at Hsing Wu University */}
                    <div className="relative group space-y-1">
                      <div className="absolute -left-[27.5px] top-1.5 w-2 h-2 rounded-full border-2 border-[#fcfbf9] bg-stone-400 transition-all duration-300 group-hover:scale-125" />
                      <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block font-medium">2021 – 2025 (曾任)</span>
                      <div className="space-y-0.5">
                        <h4 className="font-serif text-lg sm:text-xl font-normal text-stone-900 group-hover:text-stone-700 transition-colors">
                          醒吾科技大學
                        </h4>
                        <p className="text-stone-500 text-xs sm:text-sm font-light tracking-wide">
                          副研發長 • 資訊科技應用系助理教授 • 計畫管考中心主任
                        </p>
                      </div>
                      <p className="text-stone-400 text-xs font-light leading-relaxed pt-2.5 max-w-xl">
                        統籌校級產學合作案、推動研發專案與外部學術資源整合，對接企業人才數位轉型與實踐社會責任計畫。同時建立高效大型計畫管考之標準化成果展現平台。
                      </p>
                    </div>

                    {/* Item 3: Ph.D. degree */}
                    <div className="relative group space-y-1">
                      <div className="absolute -left-[27.5px] top-1.5 w-2 h-2 rounded-full border-2 border-[#fcfbf9] bg-stone-300 transition-all duration-300 group-hover:scale-125" />
                      <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block font-medium">2017 (修業)</span>
                      <div className="space-y-0.5">
                        <h4 className="font-serif text-lg sm:text-xl font-normal text-stone-900 group-hover:text-stone-700 transition-colors">
                          淡江大學
                        </h4>
                        <p className="text-stone-500 text-xs sm:text-sm font-light tracking-wide">教育領導與科技管理 博士</p>
                      </div>
                      <p className="text-stone-400 text-xs font-light leading-relaxed pt-2.5 max-w-xl">
                        聚焦於教育科技整合、組織變革與高階數位教材研發管理之跨領域研究。
                      </p>
                    </div>

                    {/* Item 4: Master's degree */}
                    <div className="relative group space-y-1">
                      <div className="absolute -left-[27.5px] top-1.5 w-2 h-2 rounded-full border-2 border-[#fcfbf9] bg-stone-300 transition-all duration-300 group-hover:scale-125" />
                      <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block font-medium">2005 (修業)</span>
                      <div className="space-y-0.5">
                        <h4 className="font-serif text-lg sm:text-xl font-normal text-stone-900 group-hover:text-stone-700 transition-colors">
                          淡江大學
                        </h4>
                        <p className="text-stone-500 text-xs sm:text-sm font-light tracking-wide">教育科技 碩士</p>
                      </div>
                      <p className="text-stone-400 text-xs font-light leading-relaxed pt-2.5 max-w-xl">
                        奠定教學設計理論基礎、數位學習平台開發及多媒體教學資源管理之學術根基。
                      </p>
                    </div>

                  </div>

                  {/* Research Philosophy Quote inside timeline (Image 2 bottom part) */}
                  <div className="pt-8 border-t border-stone-200/50 space-y-5">
                    <div className="flex items-center gap-4 text-stone-300">
                      <div className="h-[1px] flex-1 bg-stone-200" />
                      <span className="font-serif text-xs italic tracking-widest text-stone-400 font-medium">研究理念</span>
                      <div className="h-[1px] flex-1 bg-stone-200" />
                    </div>
                    <p className="font-serif text-base sm:text-lg text-stone-700 leading-relaxed italic text-center max-w-2xl mx-auto font-light">
                      “科技不應只是教學的工具，更應該是重塑學習體驗、激發學習者內在動機的催化劑。”
                    </p>
                  </div>

                </motion.div>
              </div>

              {/* Secondary block: Certifications & Contacts (Unified under Academic Exchange tab) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-stone-200/50">
                {/* Certifications - 7 Columns */}
                <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl text-stone-950 font-normal">專業證照與資格</h3>
                    <p className="text-stone-400 text-xs font-light tracking-wide">跨足微軟文書大師、網路資訊安全、商品數據分析等跨域專業認證</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {p.certifications.map((cert) => (
                      <div 
                        key={cert.name}
                        className="p-4 rounded-2xl bg-white border border-stone-200/50 hover:border-stone-400 hover:shadow-sm transition-all duration-300 flex items-start gap-3.5 group"
                      >
                        <div className="p-2 rounded-xl bg-stone-50 border border-stone-100 text-stone-500 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-300">
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-bold text-stone-800 leading-snug">{cert.name}</h4>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block font-semibold">
                            🏆 {cert.authority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Contacts - 5 Columns */}
                <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl text-stone-950 font-normal">研究室與學術諮詢</h3>
                    <p className="text-stone-400 text-xs font-light tracking-wide">歡迎研究生學術面談與跨校、各級公私立機構產學委任探討</p>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white border border-stone-200/50 flex items-start gap-4 hover:border-stone-400 transition-colors duration-300">
                      <Mail className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">學術與專案郵箱</span>
                        <a href={`mailto:${p.contact.email}`} className="text-stone-900 font-serif text-sm font-medium hover:underline">
                          {p.contact.email}
                        </a>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-stone-200/50 flex items-start gap-4 hover:border-stone-400 transition-colors duration-300">
                      <Phone className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">研究室聯絡電話</span>
                        <span className="text-stone-800 text-sm font-medium">{p.contact.phone}</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-stone-200/50 flex items-start gap-4 hover:border-stone-400 transition-colors duration-300">
                      <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">實體辦公位置</span>
                        <span className="text-stone-800 text-sm font-medium">{p.contact.office}</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-stone-200/50 flex items-start gap-4 hover:border-stone-400 transition-colors duration-300">
                      <ExternalLink className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">教育科技學系官網</span>
                        <a 
                          href={p.contact.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-stone-900 text-sm font-medium hover:underline flex items-center gap-1.5"
                        >
                          淡江大學教育科技學系官方網站 <ExternalLink className="w-3 h-3 text-stone-400" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

        {/* Research Detail Modal */}
        <AnimatePresence>
          {selectedResearch && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedResearch(null)}
                className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ type: "spring", duration: 0.35, bounce: 0.1 }}
                className="bg-[#fcfbf9] rounded-[32px] shadow-2xl border border-stone-200/80 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden relative z-10 font-sans"
              >
                {/* Clean Top border bar */}
                <div className="h-1.5 bg-stone-900 shrink-0" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedResearch(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-stone-200/30"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                  {/* Badge & Year */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${getHighlightBadgeColor(selectedResearch.type)}`}>
                      {getHighlightIcon(selectedResearch.type)}
                      {selectedResearch.type}
                    </span>
                    {selectedResearch.year && (
                      <span className="text-[10px] bg-stone-100 text-stone-600 font-mono font-bold px-3 py-1 rounded-full border border-stone-200/20">
                        {selectedResearch.year} 年度
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-stone-900 tracking-wide leading-snug">
                    {selectedResearch.title}
                  </h3>

                  {/* Institution / Journal */}
                  {selectedResearch.journal && (
                    <div className="p-4 bg-stone-50 border border-stone-200/50 rounded-2xl space-y-1">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">專案委託與發表來源</span>
                      <p className="text-xs sm:text-sm font-medium text-stone-700">{selectedResearch.journal}</p>
                    </div>
                  )}

                  {/* Abstract details */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">研究與專案摘要 Abstract:</span>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light font-serif whitespace-pre-line">
                      {selectedResearch.desc}
                    </p>
                  </div>

                  {/* Core Value points inside modal */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-250/50 space-y-1.5">
                      <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-stone-700" />
                        核心教學價值
                      </span>
                      <p className="text-xs text-stone-500 leading-relaxed font-light">
                        深度整合前瞻教育科技與學習理論，解決傳統高教課堂動機不足與操作不便等關鍵教學痛點。
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-250/50 space-y-1.5">
                      <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-stone-700" />
                        創新實作技術
                      </span>
                      <p className="text-xs text-stone-500 leading-relaxed font-light">
                        聚焦於虛擬實境 (VR)、擴增實境 (AR)、行動學習組件及生成式人工智慧在各級教學場域的永續融入。
                      </p>
                    </div>
                  </div>

                  {/* Keywords */}
                  {selectedResearch.tags && selectedResearch.tags.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">研究關鍵字 Keywords:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedResearch.tags.map(tag => (
                          <span key={tag} className="text-xs bg-stone-50 border border-stone-200/50 text-stone-600 rounded-xl px-3 py-1">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-stone-50 border-t border-stone-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
                  <span className="text-[11px] text-stone-400 font-mono">淡江大學 教育科技學系 郭盈芝教授主持</span>
                  <button
                    onClick={() => setSelectedResearch(null)}
                    className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-850 transition-colors shadow-sm cursor-pointer"
                  >
                    關閉視窗
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ELEGANT EDITORIAL FOOTER CARD (Matches User Image) */}
        <footer className={`w-full bg-white rounded-[32px] border border-stone-200/60 p-8 sm:p-12 md:p-16 shadow-sm mt-16 ${
          currentTab === "about" ? "block" : "hidden md:block"
        }`}>
          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Profile Intro Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="font-serif text-3xl tracking-[0.18em] leading-tight text-stone-900 uppercase">
                YING CHIH<br />KUO
              </div>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed font-light max-w-sm">
                淡江大學教育科技學系助理教授。專注教學設計、數位學習與 VR/AR 教材開發。
              </p>
            </div>

            {/* NAVIGATION Column */}
            <div className="lg:col-span-2 lg:col-start-7 space-y-5">
              <span className="text-[10px] font-medium font-sans text-stone-400 tracking-[0.2em] uppercase block">
                NAVIGATION
              </span>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li>
                  <button 
                    onClick={() => setCurrentTab("about")}
                    className="text-stone-600 hover:text-stone-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    首頁
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTab("about")}
                    className="text-stone-600 hover:text-stone-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    關於
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTab("expertise")}
                    className="text-stone-600 hover:text-stone-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    專長領域
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTab("highlights")}
                    className="text-stone-600 hover:text-stone-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    研究計畫
                  </button>
                </li>
              </ul>
            </div>

            {/* CONNECT Column */}
            <div className="lg:col-span-2 space-y-5">
              <span className="text-[10px] font-medium font-sans text-stone-400 tracking-[0.2em] uppercase block">
                CONNECT
              </span>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li>
                  <button 
                    onClick={() => setCurrentTab("experience")}
                    className="text-stone-600 hover:text-stone-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    學術交流
                  </button>
                </li>
                <li>
                  <a 
                    href="https://www.tku.edu.tw/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-stone-600 hover:text-stone-950 transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    淡江大學 <span className="text-[10px]">↗</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.et.tku.edu.tw/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-stone-600 hover:text-stone-950 transition-colors inline-flex items-center gap-1 font-medium"
                  >
                    教育科技學系 <span className="text-[10px]">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* RESEARCH Column */}
            <div className="lg:col-span-2 space-y-5">
              <span className="text-[10px] font-medium font-sans text-stone-400 tracking-[0.2em] uppercase block">
                RESEARCH
              </span>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li>
                  <button 
                    onClick={() => setCurrentTab("expertise")}
                    className="text-stone-600 hover:text-stone-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    教學設計
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTab("expertise")}
                    className="text-stone-600 hover:text-stone-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    數位學習
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTab("expertise")}
                    className="text-stone-600 hover:text-stone-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    VR/AR 教材開發
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTab("expertise")}
                    className="text-stone-600 hover:text-stone-950 transition-colors cursor-pointer text-left font-medium"
                  >
                    專案管理
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-stone-200/50 my-8 sm:my-10" />

          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-[11px] sm:text-xs text-stone-400 font-light">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1.5">
              <span>© 2025 Ying Chih Kuo. All rights reserved.</span>
              <span className="text-stone-200 hidden sm:inline">｜</span>
              <span>淡江大學教育科技學系</span>
              <span className="text-stone-200 hidden sm:inline">｜</span>
              <span>新北市淡水區</span>
            </div>
            <div className="flex items-center gap-5 justify-end">
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${p.contact.email}`} 
                aria-label="Email"
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
