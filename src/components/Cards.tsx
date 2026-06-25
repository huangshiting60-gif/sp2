import { BookOpen, Award, Layers, Sparkles, Smartphone, Play, Laptop } from "lucide-react";
import { professorProfile } from "../data";

export default function Cards() {
  const p = professorProfile;

  // Render appropriate icons for projects
  const getHighlightIcon = (type: string) => {
    switch (type) {
      case "教育部教學實踐研究計畫":
        return <Smartphone className="w-6 h-6 text-blue-500 animate-bounce" />;
      case "產學合作專案":
        return <Laptop className="w-6 h-6 text-indigo-500" />;
      case "學術期刊發表":
        return <BookOpen className="w-6 h-6 text-emerald-500" />;
      default:
        return <Award className="w-6 h-6 text-blue-500" />;
    }
  };

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "教育部教學實踐研究計畫":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "產學合作專案":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "學術期刊發表":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const getBorderGradient = (type: string) => {
    switch (type) {
      case "教育部教學實踐研究計畫":
        return "from-blue-500 to-sky-400";
      case "產學合作專案":
        return "from-indigo-600 to-purple-500";
      case "學術期刊發表":
        return "from-emerald-500 to-teal-400";
      default:
        return "from-tech-blue-700 to-tech-blue-500";
    }
  };

  return (
    <section id="highlights" className="py-20 bg-white relative">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16 space-y-3">
          <div className="text-sm font-bold text-indigo-600 uppercase tracking-widest font-mono">
            ACADEMIC HIGHLIGHTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-tech-blue-900">
            學術亮點與研究專案
          </h2>
          <p className="text-base text-tech-blue-400 max-w-2xl mt-2 leading-relaxed font-light">
            郭教授致力於結合理論與實務，將創新的教育科技（如 AR、VR 與微學習平台）引進高等教育與企業培訓中。
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto md:mx-0 mt-4" />
        </div>

        {/* Card Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {p.highlights.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl border border-tech-blue-100 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
            >
              {/* Header colored bar based on project type */}
              <div className={`h-2.5 w-full bg-gradient-to-r ${getBorderGradient(item.type)}`} />

              {/* Card Body */}
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  {/* Icon & Badge Container */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      {getHighlightIcon(item.type)}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getBadgeStyle(item.type)}`}>
                      {item.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-tech-blue-900 leading-snug group-hover:text-tech-blue-950 transition-colors mb-4 line-clamp-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-tech-blue-400 font-light leading-relaxed mb-6 line-clamp-6">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Element */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-tech-blue-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    郭盈芝主持/發表
                  </span>
                  <span className="text-indigo-600 group-hover:underline flex items-center gap-1 cursor-pointer">
                    詳細成果
                    <Play className="w-2.5 h-2.5 fill-indigo-600" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
