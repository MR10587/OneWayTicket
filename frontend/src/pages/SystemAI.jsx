import React from 'react';
import { Shield, Cpu, Database, Activity, Server, Zap, Globe, Lock } from 'lucide-react';

const SystemAI = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-20">
        <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-4">
           Texniki Spesifikasiyalar
        </div>
        <h1 className="text-5xl font-bold mb-6">CityFlow-un Arxasındakı İntellekt</h1>
        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
          CityFlow milyonlarla gediş yolunu sinxronlaşdırmaq üçün ən müasir AI texnologiyalarından istifadə edir. Sistemimiz sıxlığı 60 dəqiqə əvvəldən proqnozlaşdıraraq daha ağıllı və mükafatlandırıcı nəqliyyat şəbəkəsi yaradır.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
           {[
             { label: "Proqnoz/Saniyə", value: "45k+", icon: <Zap size={20} /> },
             { label: "Məlumat Mənbələri", value: "12", icon: <Database size={20} /> },
             { label: "Gecikmə", value: "<120ms", icon: <Activity size={20} /> },
             { label: "Orta Dəqiqlik", value: "94.8%", icon: <Shield size={20} /> },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center">
                <div className="text-gray-400 mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
             </div>
           ))}
        </div>
      </div>

      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-12">Sistem Ekosistemi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { 
               title: "Məlumat Bazası", 
               icon: <Database size={24} />, 
               items: ["GTFS Real-vaxt", "IoT Sensorlar", "Donanma Telemetriyası", "Hava Proqnozu API", "Tarixi Girişlər"] 
             },
             { 
               title: "Mühərrik Nüvəsi", 
               icon: <Cpu size={24} />, 
               items: ["Marşrutlaşdırma", "Sıxlıq Modeli", "İstifadəçi Profilləri", "Coğrafi İndeksləmə"] 
             },
             { 
               title: "Çatdırılma Qatı", 
               icon: <Server size={24} />, 
               items: ["API Şlüzü", "Mükafat Reyestri", "Push Xidməti", "iOS/Android", "Veb Tətbiq"] 
             },
           ].map((box, i) => (
             <div key={i} className="bg-white p-10 rounded-3xl border border-gray-100 border-t-4 border-t-black">
                <div className="mb-6">{box.icon}</div>
                <h3 className="text-xl font-bold mb-6">{box.title}</h3>
                <div className="flex flex-wrap gap-2">
                   {box.items.map((item, j) => (
                     <span key={j} className="bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500">{item}</span>
                   ))}
                </div>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-black text-white rounded-3xl p-16 flex flex-col md:flex-row items-center gap-16">
         <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-bold leading-tight">24/7 Monitorinq və İdarəetmə</h2>
            <p className="text-gray-400 text-lg">
              Əməliyyat komandamız xüsusi monitorinq şlüzü vasitəsilə sistemin vəziyyətinə nəzarət edir. Məlumat məxfiliyini və alqoritmik ədaləti prioritetləşdirərək CityFlow-un hər bir vətəndaşa bərabər xidmət göstərməsini təmin edirik.
            </p>
            <ul className="space-y-4">
               {[
                 "ML modelləri üçün real-vaxt rejimində kənarlaşmaların aşkarlanması",
                 "Anonimləşdirilmiş məlumatların işlənməsi (GDPR uyğun)",
                 "AI dəqiqliyi düşdükdə avtomatik ehtiyat sistemə keçid",
                 "Sıxlığın azaldılması barədə ictimai hesabatlar"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {item}
                 </li>
               ))}
            </ul>
         </div>
         <div className="flex-1 w-full aspect-video bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center italic text-gray-500">
            Sistemin Vəziyyəti Paneli (Vizuallaşdırma)
         </div>
      </section>
    </div>
  );
};

export default SystemAI;
