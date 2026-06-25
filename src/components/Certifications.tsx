import { ShieldCheck, Award } from "lucide-react";
import { professorProfile } from "../data";

export default function Certifications() {
  const p = professorProfile;

  return (
    <section id="certifications" className="py-20 bg-slate-50 relative border-t border-tech-blue-100">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-blue-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16 space-y-3">
          <div className="text-sm font-bold text-blue-500 uppercase tracking-widest font-mono">
            CERTIFICATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-tech-blue-900">
            專業證照與國際認證
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto md:mx-0 mt-4" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {p.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="group bg-white p-6 rounded-2xl border border-tech-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 flex items-start gap-4"
            >
              <div className="p-3 bg-blue-50 text-blue-500 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-tech-blue-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {cert.name}
                </h4>
                <p className="text-xs text-tech-blue-400 font-mono font-medium">
                  核發單位: {cert.authority}
                </p>
              </div>
            </div>
          ))}

          {/* Call to Action card */}
          <div className="bg-gradient-to-br from-tech-blue-900 to-tech-blue-950 text-white p-6 rounded-2xl border border-white/5 shadow-md flex items-center justify-between group overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors" />
            <div className="space-y-1 relative z-10">
              <h4 className="font-bold text-white text-lg">持續深耕專業</h4>
              <p className="text-xs text-tech-blue-200">
                透過產學與證照輔導，理論結合實務。
              </p>
            </div>
            <div className="p-3 bg-white/10 text-blue-300 rounded-xl group-hover:scale-110 transition-transform relative z-10">
              <Award className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
