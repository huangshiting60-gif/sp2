import { GraduationCap, Mail, MapPin, Phone, Globe, BookOpen, ArrowDown } from "lucide-react";
import { professorProfile } from "../data";

export default function Header() {
  const p = professorProfile;

  return (
    <header className="relative bg-gradient-to-br from-tech-blue-950 via-tech-blue-900 to-tech-blue-850 text-white overflow-hidden pb-16 md:pb-24">
      {/* Background visual graphics */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-500 blur-[100px]" />
        <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] border border-white/20 rounded-full animate-pulse" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between border-b border-white/10 gap-4">
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-xl font-bold tracking-widest text-white flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-400 rounded-full animate-ping" />
            {p.name} <span className="font-light text-xs text-tech-blue-300 tracking-normal ml-1">郭盈芝 助理教授</span>
          </span>
          <span className="text-xs font-mono text-tech-blue-300 tracking-wider mt-0.5">{p.englishName}</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-tech-blue-100">
          <a href="#about" className="hover:text-blue-400 transition-colors duration-200">關於教授</a>
          <a href="#experience" className="hover:text-blue-400 transition-colors duration-200">教學經歷</a>
          <a href="#expertise" className="hover:text-blue-400 transition-colors duration-200">專長領域</a>
          <a href="#highlights" className="hover:text-blue-400 transition-colors duration-200">學術計畫</a>
          <a href="#certifications" className="hover:text-blue-400 transition-colors duration-200">專業證照</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="about" className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full text-blue-300 text-xs font-semibold uppercase tracking-wider w-fit">
            <GraduationCap className="w-3.5 h-3.5" />
            {p.institution} {p.department}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            探索科技與<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-white">
              教學設計的全新疆界
            </span>
          </h1>
          <p className="text-lg text-tech-blue-100/90 font-medium italic border-l-4 border-blue-400 pl-4 py-1 leading-relaxed">
            "{p.motto}"
          </p>
          <p className="text-base text-tech-blue-200 leading-relaxed max-w-2xl font-light">
            {p.about}
          </p>

          {/* Quick Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-tech-blue-100 font-mono">
            <div className="flex items-center gap-2.5 hover:text-blue-300 transition-colors">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <a href={`mailto:${p.contact.email}`}>{p.contact.email}</a>
            </div>
            <div className="flex items-center gap-2.5 hover:text-blue-300 transition-colors">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{p.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 sm:col-span-2 hover:text-blue-300 transition-colors">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{p.contact.office}</span>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap gap-4">
            <a 
              href="#highlights" 
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              探索研究與計畫
            </a>
            <a 
              href="#experience" 
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium rounded-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              教學經歷
              <ArrowDown className="w-4 h-4 text-tech-blue-300 animate-bounce" />
            </a>
          </div>
        </div>

        {/* Hero Right: Modern Academic Avatar Representation */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative group w-full max-w-[380px]">
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
            
            {/* Card Frame */}
            <div className="relative glass-panel-dark rounded-3xl p-8 border border-white/10 flex flex-col justify-between h-fit text-center space-y-6 shadow-2xl">
              {/* Tech pattern overlay */}
              <div className="absolute top-4 right-4 text-tech-blue-300/30 text-xs font-mono select-none">
                TKU // ET // Ph.D.
              </div>

              {/* Professor Profile Headshot Alternative */}
              <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-tech-blue-900 flex items-center justify-center p-1 border-2 border-white/20 shadow-inner relative overflow-hidden">
                <div className="w-full h-full rounded-full bg-tech-blue-900/90 flex flex-col items-center justify-center text-white">
                  <span className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-tr from-blue-300 to-white">
                    郭
                  </span>
                  <span className="text-xs font-mono text-tech-blue-300 uppercase tracking-widest mt-0.5">
                    Y. C. KUO
                  </span>
                </div>
                {/* Floating graphic overlay */}
                <div className="absolute bottom-1 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-tech-blue-900 animate-pulse" title="現在線上" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-wider">{p.name}</h3>
                <p className="text-sm font-mono text-tech-blue-300">{p.englishName}</p>
                <div className="h-px bg-white/10 my-3" />
                <p className="text-sm font-medium text-blue-300">{p.institution} {p.department}</p>
                <p className="text-xs text-tech-blue-200">專任助理教授</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xl font-bold text-white font-mono">20+</div>
                  <div className="text-xs text-tech-blue-300 mt-1">學術與專案年資</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-xl font-bold text-white font-mono">100%</div>
                  <div className="text-xs text-tech-blue-300 mt-1">數位教材自主率</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
