## Plan: Smart Transport Demand Balancing Platform

### Məqsəd
Sadə route planner yox, public transport yönümlü qərar sistemi qurmaq. MVP-də yalnız metro və avtobus olacaq, metro+bus transferi icazəli olacaq və bonus/wallet məlumatları SQLite-də daimi saxlanacaq. Mövcud JSON data qatını backend üçün əsas mənbə kimi istifadə edib FastAPI ilə planlama API-si, React ilə istifadəçi interfeysi, SQLite ilə user/bonus/journey persistence qurmaq lazımdır.

### Məhsul Təsviri
Sistem istifadəçiyə yalnız yol göstərməməli, həm də davranışı yönləndirməlidir. Təcrübə belə işləməlidir:
- istifadəçi current location və destination daxil edir və ya auto-detect istifadə edir
- istəyə bağlı vaxt seçir, seçməzsə sistem optimal çıxış vaxtı təklif edir
- planner metro, bus və metro+bus kombinasiyalarını müqayisə edir
- hər nəticə vaxt, rahatlıq, sıxlıq və bonus təsiri ilə birlikdə izah olunur
- pik saatda isə off-peak təklifi və bonus popup göstərilir
- profil səhifəsində xal, kuponlar və son qazanclar görünür

### Əsas Prensiplər
- Public transport-first yanaşma saxlanmalıdır
- Taksi və şəxsi maşın MVP-yə daxil edilməməlidir
- Səbəb izahı birinci sinif tələbdir, yəni hər nəticə niyə seçildiyini göstərməlidir
- Data-driven, amma domain-driven quruluş istifadə olunmalıdır; JSON-lar source data kimi qalmalı, biznes məntiqi isə service layer-də olmalıdır
- Hackathon üçün sürətli demo mümkün olmalıdır, amma sonradan genişlənə biləcək arxitektura seçilməlidir

### Steps
1. Mövcud data modelini sabitləşdir və domain sərhədlərini müəyyən et. `data/locations.json`, `data/routes_core.json`, `data/routes_express.json`, `data/routes_suburbs.json`, `data/routes.json`, `data/pricing.json`, `data/traffic.json` fayllarını node, edge, route geometry, traffic, pricing və transfer baxımından təsnif et. Bu mərhələ planner-in hansı inputları qəbul edəcəyini və hansı çıxışları qaytaracağını müəyyən edir.
2. Routing qaydalarını yaz. Hər route üçün direction, stop-lar, travel time, cost, transfer eligibility və traffic impact kimi atributları müəyyən et. Metro və bus route-lar bir graph-a çevrilməli, transfer node-ları ayrıca saxlanmalıdır.
3. SQLite schema və persistence modelini dizayn et. `user_profile`, `journey_history`, `bonus_wallet`, `bonus_transactions`, `coupon_catalog`, `user_coupons`, `saved_preferences`, `route_suggestions` və lazım gələrsə `journey_segments` cədvəllərini müəyyən et. Transferli journey-lər segment səviyyəsində saxlanmalıdır ki, analitika və explanation sonradan mümkün olsun.
4. FastAPI backend skeletonunu qur. Request/response contract-ları əvvəlcə sabitləşsin: start location, destination, optional desired time, current location mode, mode preference və return count. Planner response ən azı 3 seçim və explanation payload qaytarmalıdır.
5. Planner engine dizayn et. Public transport graph üzərində ən yaxşı marşrutları tapmaq üçün routing layer qur, sonra ranking layer ilə nəticələri ən sürətli, ən rahat, və ən balanslı variantlara ayır. Metro+bus transferi bir səfər kimi qiymətləndirilməli və ayrıca izah edilməlidir.
6. Traffic-aware scoring və off-peak logic əlavə et. Rush hour window-larına əsasən vaxt və crowd multiplier tətbiq et, sıxlıq yüksəkdirsə gecikmiş çıxış təklifi generasiya et, və nəticə card-larında bunun səbəbini göstər. Bu logic davranış yönləndirmə qatının əsas hissəsidir.
7. Bonus və gamification qaydalarını müəyyən et. Pik saatda gözləmək, off-peak seçmək, az sıx marşrutu seçmək və public transport istifadəsini artırmaq üçün xal ver. Bonus wallet daimi saxlanmalı, kuponlar istifadəçi profilinə bağlı olmalı və hər award transaction tarixçədə görünməlidir.
8. React frontend user flow-un əsasını qur. Planner form, current location input, destination selector, optional time picker, result comparison cards, explanation panel, bonus popup və wallet/profile section hazırlansın. UI istifadəçini qərara yönəltməli, amma seçim azadlığını da qorumaq lazımdır.
9. Design system və vizual təqdimat qatını müəyyən et. Route comparison, congestion indicator, bonus callout və explanation block-lar eyni vizual dildə işləməlidir. Hackathon təqdimatı üçün şəhər yönümlü, təmiz və inandırıcı UX vacibdir.
10. Demo və seed strategiyasını planlaşdır. Mövcud JSON-lardan initial seed kimi istifadə et, SQLite üçün demo user və demo coupon data hazırla, və ən azı 3 ssenari müəyyən et: rush hour route, off-peak suggestion və metro+bus transfer case.
11. Yoxlama strategiyasını hazırlat. Backend-də planner deterministikliyi, route ranking, off-peak suggestion, bonus award və persistence üçün testlər; frontend-də isə planner submission, results display, bonus popup və wallet panel üçün smoke testlər planlaşdırılmalıdır.
12. İcra ardıcıllığını mərhələlə. Əvvəl backend data ingestion və SQLite schema, sonra planner engine, sonra explanation/bonus logic, ardınca React UI, sonda polish və demo data. Bu ardıcıllıq riskləri azaldır və hər mərhələdə demo göstərməyə imkan verir.

### Təxmini Backend Mərhələləri
- Data ingestion layer: JSON oxuma, normalizasiya və in-memory cache
- Graph layer: route və transfer node-larının qurulması
- Planner service: start/end/input → route options
- Scoring service: traffic, duration, crowd, off-peak logic
- Wallet service: bonus award, redemption, balance
- Profile service: user history, saved preferences
- API layer: FastAPI endpoint-ləri və response schemas

### Təxmini Frontend Mərhələləri
- Landing/planner screen
- Route results comparison screen
- Why-this-route explanation block
- Bonus popup və off-peak confirmation modalı
- Wallet/profile screen
- Empty states və demo states

### Relevant files
- `data/locations.json` — şəhər node-ları və koordinat mənbəyi
- `data/routes_core.json` — əsas şəhər daxili marşrutlar
- `data/routes_express.json` — sürətli xətlər və limitli stop-lar
- `data/routes_suburbs.json` — şəhərətrafı coverage
- `data/routes.json` — geometry və route path layer
- `data/pricing.json` — qiymət, məsafə və cost parametrləri
- `data/traffic.json` — rush hour və congestion qaydaları
- Yeni FastAPI backend package — planner, schema və API endpoint-lər üçün
- Yeni React frontend source tree — planner form, results, wallet və explanation UI üçün
- Yeni SQLite schema/migration layer — user, journey, bonus və coupon persistence üçün
- Yeni seed/data loading module — JSON data-nı domain modelə çevirmək üçün

### Verification
1. Planner nəticələrinin deterministik olub-olmadığını təsdiqləmək üçün eyni inputla eyni ranking qaytarıldığını yoxla.
2. Rush-hour window üçün ən azı bir test case-də off-peak təklifinin işə düşdüyünü doğrula.
3. Metro+bus transfer yolu üçün route explanation, total time və score komponentlərinin birlikdə qaytarıldığını yoxla.
4. Wallet-də bonus xalın əlavə olunması və journey history-də saxlanması üçün persistence yoxlaması et.
5. Frontend-də planner submission, results display, bonus popup və wallet panel üçün end-to-end smoke test hazırla.
6. Seed data ilə demo ssenarilərinin həqiqətən işlədiyini və judge qarşısında sürətli göstərilə bildiyini yoxla.

### Decisions
- MVP scope yalnız metro və avtobusdur; taksi və şəxsi maşın route müqayisəsinə daxil edilməyəcək.
- Metro+bus transferi icazəlidir və planner bunu bir səfər kimi qaytarmalıdır.
- Bonus, wallet, kupon və journey history SQLite-də daimi saxlanmalıdır.
- Explanation layer rule-based olacaq; ayrıca ML modeli bu mərhələdə tələb olunmur.
- Mövcud JSON data source kimi istifadə olunacaq, amma app logic JSON-a bağlı qalmayacaq; backend bu datanı service abstraction vasitəsilə oxumalıdır.
- Hackathon məqsədi üçün real-time traffic API şərt deyil; static traffic simulation kifayətdir.

### Further Considerations
1. Əgər scope genişlənərsə, sonradan real-time traffic və sponsor kampaniyaları əlavə etmək olar.
2. Əgər vaxt qalarsa, admin panel və coupon redemption flow ayrıca mərhələ kimi əlavə edilə bilər.
3. UI-da “AI transparency” hissəsini gücləndirmək üçün nəticə card-larında qısa explanation, crowd indicator və bonus səbəbi hər zaman görünməlidir.