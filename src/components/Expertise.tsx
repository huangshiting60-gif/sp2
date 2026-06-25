import { useState } from "react";
import { Cpu, Award, BookOpen, Layers } from "lucide-react";
import { professorProfile } from "../data";

export default function Expertise() {
  const p = professorProfile;
  const [activeTab, setActiveTab] = useState<string>("All");

  // Group unique categories
  const categories = ["All", "理論與核心", "實務與開發", "管理與整合"];

  // Filter skills based on selection
  const filteredExpertise = activeTab === "All"
    ? p.expertise
    : p.expertise.filter(e => e.category === activeTab);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "理論與核心": return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case "實務與開發": return <Cpu className="w-4 h-4 text-blue-500" />;
      case "管理與整合": return <Layers className="w-4 h-4 text-indigo-500" />;
      default: return <Award className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <section id="expertise" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-12 space-y-3">
          <div className="text-sm font-bold text-emerald-500 uppercase tracking-widest font-mono">
            AREAS OF EXPERTISE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-tech-blue-900">
            學術與實務專長
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto md:mx-0 mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2.5 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === cat
                  ? "bg-tech-blue-900 text-white shadow-lg shadow-tech-blue-900/10 scale-105"
                  : "bg-white text-tech-blue-600 border border-tech-blue-100 hover:border-tech-blue-300 hover:bg-tech-blue-50"
              }`}
            >
              {cat === "All" ? "全部分類" : cat}
            </button>
          ))}
        </div>

        {/* Expertise Tags Container */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-tech-blue-100 shadow-sm">
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {filteredExpertise.map((exp, idx) => {
              const themeColor = 
                exp.category === "理論與核心" ? "hover:bg-emerald-500 hover:text-white hover:border-emerald-500 text-emerald-700 bg-emerald-50/50 border-emerald-100" :
                exp.category === "實務與開發" ? "hover:bg-blue-500 hover:text-white hover:border-blue-500 text-blue-700 bg-blue-50/50 border-blue-100" :
                "hover:bg-indigo-500 hover:text-white hover:border-indigo-500 text-indigo-700 bg-indigo-50/50 border-indigo-100";

              return (
                <div
                  key={idx}
                  className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl border text-sm sm:text-base font-semibold cursor-default transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg ${themeColor}`}
                >
                  {getCategoryIcon(exp.category)}
                  <span>{exp.name}</span>
                  <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/80 border border-black/5 text-slate-500 font-mono font-normal">
                    {exp.category}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Empty state if filtered results are empty (though shouldn't happen) */}
          {filteredExpertise.length === 0 && (
            <div className="text-center py-12 text-tech-blue-400">
              沒有找到符合該分類的專長。
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
