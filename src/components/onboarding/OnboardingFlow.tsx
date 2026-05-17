import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home as HomeIcon, Users } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PROVINCES_VN, DISTRICTS_SG, TUTORIAL_SLIDES } from '@/src/constants';
import { Logo } from '@/src/components/ui/Logo';

export function OnboardingRegion({ onNext }: { onNext: () => void }) {
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [duration, setDuration] = useState('');

  return (
    <motion.div 
      initial={{ x: 390 }} animate={{ x: 0 }} exit={{ x: -390 }}
      className="absolute inset-0 bg-background flex flex-col no-scrollbar overflow-y-auto pb-32"
    >
      <div className="h-[45vh] relative overflow-hidden">
        <img src="src/assets/images/regenerated_image_1778990184615.png" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute top-4 left-8 right-8 flex flex-col gap-8">
           <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} className="h-full bg-primary" />
           </div>
           <div className="text-left">
              <h2 className="text-2xl font-black mb-2 text-text-primary">Bạn đến từ vùng miền nào?</h2>
           </div>
        </div>
      </div>

      <div className="px-8 flex-1 pt-8 z-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Quê bồ ở đâu?</label>
            <select 
              value={region} 
              onChange={(e) => setRegion(e.target.value)}
              className="w-full h-14 bg-white border border-zinc-100 rounded-2xl px-4 text-sm font-medium outline-none shadow-sm appearance-none"
            >
              <option value="">Chọn tỉnh thành</option>
              {PROVINCES_VN.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Bồ đang sống ở đâu tại Sài Gòn?</label>
            <select 
              value={district} 
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full h-14 bg-white border border-zinc-100 rounded-2xl px-4 text-sm font-medium outline-none shadow-sm appearance-none"
            >
              <option value="">Chọn Quận/Huyện</option>
              {DISTRICTS_SG.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Bồ sống ở Sài Gòn bao lâu rồi?</label>
            <div className="flex gap-2">
              {['Dưới 1 năm', '1-3 năm', 'Trên 3 năm'].map(opt => (
                <button 
                  key={opt}
                  onClick={() => setDuration(opt)}
                  className={cn(
                    "flex-1 h-12 rounded-xl text-[11px] font-black transition-all border",
                    duration === opt ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-white border-zinc-100 text-text-secondary"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full px-12 z-50">
        <button 
          onClick={onNext}
          disabled={!region || !district || !duration}
          className="w-full h-16 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-transform disabled:opacity-50 disabled:grayscale"
        >
          Tiếp theo →
        </button>
      </div>
    </motion.div>
  );
}

export function OnboardingRole({ onNext }: { onNext: () => void }) {
  const [role, setRole] = useState<'explorer' | 'merchant' | null>(null);

  return (
    <motion.div 
      initial={{ x: 390 }} animate={{ x: 0 }} exit={{ x: -390 }}
      className="absolute inset-0 bg-background flex flex-col p-8 pt-12"
    >
      <div className="h-[45vh] relative overflow-hidden -mx-8 -mt-12 mb-8">
        <img src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=800" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>

      <div className="w-full h-1.5 bg-zinc-100 rounded-full mb-8">
        <motion.div initial={{ width: '50%' }} animate={{ width: '100%' }} className="h-full bg-primary" />
      </div>

      <div className="text-center mb-10">
        <h2 className="text-2xl font-black mb-2">Bạn đến EatScape với vai trò nào?</h2>
        <p className="text-xs font-medium text-text-secondary">Chọn vai trò để chúng mình cá nhân hóa trải nghiệm cho bồ ✨</p>
      </div>

      <div className="space-y-4">
        <button 
          onClick={() => setRole('explorer')}
          className={cn(
            "w-full p-6 rounded-[32px] border-2 text-left transition-all relative overflow-hidden group",
            role === 'explorer' ? "border-primary bg-primary/5 ring-4 ring-primary/10" : "border-zinc-100 bg-white"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary overflow-hidden shadow-inner">
               <Logo size={45} />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-lg">Người Khám Phá 🧭</h3>
              <p className="text-[10px] font-bold text-text-secondary leading-relaxed mt-1">Tìm món ngon, review thật, chia sẻ trải nghiệm tham gia cộng đồng Sài Gòn</p>
            </div>
          </div>
          {role === 'explorer' && <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white"><span className="text-xs">✓</span></div>}
        </button>

        <button 
          onClick={() => setRole('merchant')}
          className={cn(
            "w-full p-6 rounded-[32px] border-2 text-left transition-all relative overflow-hidden group",
            role === 'merchant' ? "border-primary bg-primary/5 ring-4 ring-primary/10" : "border-zinc-100 bg-white"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shadow-inner">
               <HomeIcon size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-lg">Chủ Quán 🏪</h3>
              <p className="text-[10px] font-bold text-text-secondary leading-relaxed mt-1">Đăng menu, quản lý quán, kết nối trực tiếp với cộng đồng sinh viên</p>
            </div>
          </div>
          {role === 'merchant' && <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white"><span className="text-xs">✓</span></div>}
        </button>
      </div>

      <div className="mt-auto pb-12">
        <button 
          onClick={onNext}
          disabled={!role}
          className="w-full h-16 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-transform disabled:opacity-50"
        >
          Bắt đầu →
        </button>
      </div>
    </motion.div>
  );
}

export function OnboardingPrefs({ onNext }: { onNext: () => void }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) setSelectedTags(selectedTags.filter(t => t !== tag));
    else setSelectedTags([...selectedTags, tag]);
  };

  const sections = [
    { title: 'KHÔNG GIAN YÊU THÍCH', tags: ['Vỉa hè local', 'Vintage chill', 'Sang trọng', 'View sống ảo', 'Học bài', 'Ăn đêm', 'Yên tĩnh', 'Nhộn nhịp'] },
    { title: 'KHẨU VỊ VÙNG MIỀN', tags: ['Chuẩn vị Bắc', 'Chuẩn vị Trung', 'Chuẩn vị Nam', 'Đồ chay', 'Healthy', 'Ít cay', 'Hải sản'] },
    { title: 'ƯU TIÊN THÊM', tags: ['Giá sinh viên', 'Có máy lạnh', 'Có giữ xe', 'Pet-friendly', 'Mở khuya', 'Thân thiện môi trường', 'Có WiFi'] }
  ];

  return (
    <motion.div initial={{ x: 390 }} animate={{ x: 0 }} className="absolute inset-0 bg-background p-8 flex flex-col pt-12">
      <div className="w-full bg-zinc-100 h-1.5 rounded-full mb-8 overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-primary" />
      </div>
      <h2 className="text-2xl font-black mb-2">Gu ăn uống của bạn là gì?</h2>
      <p className="text-text-secondary text-xs mb-6 font-medium">Chọn để EatScape gợi ý quán phù hợp nhất cho bồ ✨</p>
      
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-8 pb-6">
        {sections.map(section => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-[10px] font-black text-text-secondary tracking-widest uppercase">{section.title}</h3>
            <div className="flex flex-wrap gap-2">
              {section.tags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-4 py-2.5 rounded-full text-[12px] font-black border transition-all shadow-sm",
                    selectedTags.includes(tag) ? "bg-primary border-primary text-white scale-105" : "bg-white border-zinc-100 text-text-secondary"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pb-12 pt-4">
        <button onClick={onNext} className="w-full h-16 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-transform">Khám phá món ngon 🍜</button>
      </div>
    </motion.div>
  );
}

export function OnboardingTutorial({ onNext }: { onNext: () => void }) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-background flex flex-col pt-12">
       <button onClick={onNext} className="absolute top-14 right-8 text-text-secondary text-xs font-black uppercase tracking-widest z-50">Bỏ qua</button>
       
       <div className="flex-1 relative flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeSlide}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              {TUTORIAL_SLIDES[activeSlide].title || TUTORIAL_SLIDES[activeSlide].content ? (
                <>
                  <div className="h-[45vh] w-full relative overflow-hidden">
                     <img src={TUTORIAL_SLIDES[activeSlide].image} className="w-full h-full object-cover" alt="tutorial" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-10 text-center flex-1 flex flex-col justify-center">
                     <h3 className="text-2xl font-black mb-4 leading-tight">{TUTORIAL_SLIDES[activeSlide].title}</h3>
                     <p className="text-text-secondary text-sm font-medium leading-relaxed">{TUTORIAL_SLIDES[activeSlide].content}</p>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img src={TUTORIAL_SLIDES[activeSlide].image} className="w-full h-full object-cover" alt="tutorial full" referrerPolicy="no-referrer" />
                  <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/60 to-transparent">
                     <p className="text-white/60 text-xs font-black uppercase tracking-[0.3em] text-center">Bắt đầu hành trình của bạn</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mb-10">
            {TUTORIAL_SLIDES.map((_, i) => (
              <div key={i} className={cn("h-1.5 rounded-full transition-all duration-300", i === activeSlide ? "w-8 bg-primary" : "w-1.5 bg-zinc-200")} />
            ))}
          </div>
       </div>

       <div className="px-10 pb-16">
         <button 
           onClick={() => {
             if (activeSlide < TUTORIAL_SLIDES.length - 1) setActiveSlide(activeSlide + 1);
             else onNext();
           }} 
           className="w-full h-16 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-transform"
         >
           {activeSlide === TUTORIAL_SLIDES.length - 1 ? 'Bắt đầu khám phá ngay! 🍜' : 'Tiếp theo →'}
         </button>
       </div>
    </motion.div>
  );
}
