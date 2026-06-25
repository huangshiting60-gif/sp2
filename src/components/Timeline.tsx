import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { professorProfile } from "../data";

export default function Timeline() {
  const p = professorProfile;

  // Combine education and experience for a unified chronological display or separate sections.
  // To keep it super structured and extremely stylish, we will present them as two columns:
  // Left: 學術歷程 (Education Ph.D. & Master's), Right: 專業經歷 (Career timeline)
  // Both styled as elegant vertical timelines!

  return (
    <section id="experience" className="py-20 bg-white border-y border-tech-blue-100 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-tech-blue-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16 space-y-3">
          <div className="text-sm font-bold text-blue-500 uppercase tracking-widest font-mono">
            JOURNEY & EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-tech-blue-900">
            學經歷與學術歷程
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto md:mx-0 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Education Timeline */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b border-tech-blue-100">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-tech-blue-950">學歷背景 (Education)</h3>
            </div>

            <div className="relative pl-6 border-l-2 border-blue-100 space-y-10">
              {p.education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node Icon */}
                  <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 ring-4 ring-white group-hover:scale-125 transition-transform duration-200" />

                  {/* Content Card */}
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
                      <Calendar className="w-3 h-3" />
                      {edu.time}
                    </span>
                    <h4 className="text-lg font-bold text-tech-blue-900 group-hover:text-blue-500 transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-tech-blue-400 leading-relaxed font-light">
                      {edu.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Experience Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 pb-2 border-b border-tech-blue-100">
              <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-tech-blue-950">行政與教學經歷 (Experience)</h3>
            </div>

            <div className="relative pl-6 border-l-2 border-indigo-100 space-y-8">
              {p.experience.map((exp, idx) => {
                const isCurrent = exp.time.includes("現任");
                return (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Icon */}
                    <span className={`absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-white transition-transform duration-200 group-hover:scale-125 ${
                      isCurrent ? "bg-indigo-500" : "bg-tech-blue-300"
                    }`} />

                    {/* Content Card */}
                    <div className="bg-tech-blue-50/40 hover:bg-tech-blue-50/70 p-5 rounded-2xl border border-tech-blue-100/50 hover:border-indigo-200 transition-all duration-300 shadow-sm hover:shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          isCurrent 
                            ? "bg-indigo-50 text-indigo-600 border-indigo-100" 
                            : "bg-tech-blue-100/50 text-tech-blue-600 border-tech-blue-200"
                        }`}>
                          <Calendar className="w-3 h-3" />
                          {exp.time}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-tech-blue-900 group-hover:text-indigo-600 transition-colors">
                        {exp.role}
                      </h4>
                      <p className="text-sm text-tech-blue-400 mt-2 leading-relaxed font-light">
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
