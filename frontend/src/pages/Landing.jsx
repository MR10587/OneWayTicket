import React from 'react';
import { ArrowRight, Zap, Globe, Award, Eye, Link, BarChart3 } from 'lucide-react';

const Landing = ({ onStart }) => {
  const features = [
    { icon: <Zap size={20} />, title: "AI Marşrut Planlayıcı", desc: "Cari trafiki, tarixi tendensiyaları və xüsusi tədbirləri nəzərə alan dinamik yol tapma." },
    { icon: <Globe size={20} />, title: "Real Zamanlı İzləmə", desc: "Şəhərdəki hər bir avtobus və metro xətti üçün canlı yeniləmələr. Nəqliyyatınızın nə vaxt gələcəyini dəqiq bilin." },
    { icon: <Award size={20} />, title: "Mükafat Ekosistemi", desc: "Pik olmayan vaxtları və ya ekoloji təmiz marşrutları seçdiyiniz üçün CityPoints qazanın. Onları qəlyanaltı və ya alış-veriş üçün istifadə edin." },
    { icon: <Eye size={20} />, title: "Sıxlıq Şəffaflığı", desc: "Stansiyalar və vaqonlar üçün canlı 'sıxlıq' ballarına baxın. Rahatlıq üçün məlumatlı seçimlər edin." },
    { icon: <Link size={20} />, title: "Sorunsuz İnteqrasiya", desc: "Metro, Avtobus və Piyada gedişlərini bir vahid interfeysdə birləşdirən multi-modal səfərləri planlayın." },
    { icon: <BarChart3 size={20} />, title: "Proqnozlaşdırıcı Analitika", desc: "Həftənizi qabaqcadan planlayın. AI-miz bayram cədvəlləri və hava şəraiti əsasında gələcək sıxlığı proqnozlaşdırır." },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="max-w-7xl w-full px-6 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold text-gray-600">
            <Zap size={14} className="text-yellow-500" />
            AI-Dəstəkli Nəqliyyat Optimizasiyası
          </div>
          <h1 className="text-6xl font-bold leading-tight">
            Daha Ağıllı Səyahət Et.<br />Sıxlıqdan Qaç.
          </h1>
          <p className="text-xl text-gray-500 max-w-lg">
            CityFlow sizi ən az sıxlıq olan yollara yönəltmək üçün real zamanlı AI istifadə edir. Vaxtınıza qənaət edin, stressi azaldın və pik olmayan saatlarda səyahət etdiyiniz üçün mükafatlar qazanın.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={onStart}
              className="bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all"
            >
              Marşrutumu planla <ArrowRight size={20} />
            </button>
            <button className="border border-gray-300 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
              Necə işləyir
            </button>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-500">
              <span className="text-black font-bold">12,000+</span> Bakılı hər gün daha ağıllı səyahət edir
            </span>
          </div>
        </div>
        <div className="flex-1 w-full aspect-square bg-gray-200 rounded-3xl overflow-hidden relative shadow-2xl">
           <div className="absolute top-6 left-6 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Canlı Yeniləmələr</span>
              </div>
              <p className="text-xs font-medium">Koroğlu stansiyası yaxınlığında yeni sıxlıq aşkar edildi. AI marşrutu yeniləndi.</p>
           </div>
           <div className="absolute bottom-6 right-6 bg-black text-white p-4 rounded-2xl shadow-xl border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Award size={16} className="text-yellow-400" />
                <span className="text-xs font-bold">Xal Qazanıldı!</span>
              </div>
              <p className="text-[10px] text-gray-400">Pik olmayan saatda səyahət üçün +50 CityPoints.</p>
           </div>
           <img
             src="/interactive-map.png"
             alt="İnteraktiv xəritə"
             className="w-full h-full object-cover"
           />
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl w-full px-6 py-24 bg-white border-y border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Daha yaxşı gediş-gəliş üçün lazım olan hər şey</h2>
          <p className="text-gray-500">Sizə Bakının təklif edə biləcəyi ən səmərəli səyahət təcrübəsini təqdim etmək üçün şəhər miqyaslı məlumatları qabaqcıl neyron şəbəkələrlə birləşdiririk.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-2xl border border-gray-100 hover:border-black transition-all group">
              <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl w-full px-6 py-24">
        <div className="bg-black rounded-3xl p-16 text-white flex flex-col items-center text-center space-y-8">
           <h2 className="text-5xl font-bold max-w-2xl leading-tight">Şəhərin nəfəs almasına kömək etdiyiniz üçün mükafatlandırılın.</h2>
           <p className="text-gray-400 max-w-xl text-lg">
             AI tərəfindən təklif olunan pik olmayan səyahət vaxtlarını seçməklə, siz birbaşa hər kəs üçün pik saat sıxlığını azaldırsınız. Təşəkkür olaraq, CityFlow hər "Yaşıl Səfər" üçün sizi xallarla mükafatlandırır.
           </p>
           <div className="flex gap-4">
             <button className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all">Mükafatları Kəşf Et</button>
             <button className="border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all">Tərəfdaş kimi Qoşul</button>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-white/10 w-full mt-12">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">12k</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-2">Günlük İstifadəçi</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">4.9</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-2">Tətbiq Reytinqi</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">5M</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-2">Qənaət Edilən CO2 (kg)</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">30+</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-2">Yerli Tərəfdaşlar</span>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
