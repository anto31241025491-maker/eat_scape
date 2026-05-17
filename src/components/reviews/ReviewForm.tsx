import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Camera, MapPin, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function ReviewForm({ restaurantName, onClose, onSuccess }: { restaurantName: string, onClose: () => void, onSuccess: () => void }) {
  const [step, setStep] = useState(1);
  const [detailedRatings, setDetailedRatings] = useState({ taste: 0, space: 0, service: 0, price: 0 });
  const [tags, setTags] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [companion, setCompanion] = useState('');

  const TRUST_TAGS = ['Chuẩn vị miền Trung', 'Đồng hương đề xuất', 'Hidden Gem', 'Giá sinh viên', 'Địa điểm local'];

  const toggleTag = (t: string) => {
     if (tags.includes(t)) setTags(tags.filter(i => i !== t));
     else setTags([...tags, t]);
  };

  const RATING_CATEGORIES = [
    { id: 'taste', label: 'Hương vị', icon: '🍜' },
    { id: 'price', label: 'Giá cả', icon: '💰' },
    { id: 'space', label: 'Không gian', icon: '🪑' },
    { id: 'service', label: 'Phục vụ', icon: '🙋' }
  ];

  return (
    <motion.div 
      initial={{ y: 844 }} animate={{ y: 0 }} exit={{ y: 844 }}
      className="absolute inset-0 bg-background z-[600] flex flex-col p-8 pt-20 no-scrollbar overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <button onClick={onClose} className="text-zinc-400 p-2 active:scale-90 transition-transform"><X size={24} /></button>
        <h2 className="text-xl font-black italic">Viết Review Chân Thật</h2>
        <div className="w-10" />
      </div>

      <div className="flex gap-2 mb-8">
        <div className={cn("flex-1 h-2 rounded-full", step >= 1 ? "bg-primary" : "bg-zinc-100")} />
        <div className={cn("flex-1 h-2 rounded-full", step >= 2 ? "bg-primary" : "bg-zinc-100")} />
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 flex flex-col justify-between">
           <div className="text-center space-y-4">
              <h3 className="text-2xl font-black text-text-primary leading-tight">{restaurantName}</h3>
              <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.2em]">Bước 1: Xác nhận bồ đang ở quán</p>
           </div>

           <div className="space-y-6">
              <button 
                onClick={() => setStep(2)}
                className="w-full p-8 bg-white border border-zinc-100 rounded-[40px] shadow-custom flex flex-col items-center justify-center gap-4 group active:scale-95 transition-all text-center"
              >
                 <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                    <MapPin size={40} />
                 </div>
                 <div>
                    <h4 className="font-black text-sm mb-1 text-text-primary">Xác thực bằng GPS</h4>
                    <p className="text-[10px] font-bold text-text-secondary">Tự động verify bồ đang ở quán ăn</p>
                 </div>
                 <div className="bg-success text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-success/20">Khuyên dùng</div>
              </button>

              <div className="flex items-center gap-4">
                 <div className="flex-1 h-px bg-zinc-100" />
                 <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">hoặc</span>
                 <div className="flex-1 h-px bg-zinc-100" />
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full p-6 bg-zinc-50 border border-zinc-100 rounded-[32px] flex items-center gap-6 group active:scale-95 transition-all"
              >
                 <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Camera size={24} />
                 </div>
                 <div className="text-left flex-1">
                    <h4 className="font-black text-sm text-text-primary">Quét mã QR tại bàn</h4>
                    <p className="text-[10px] font-bold text-text-secondary">Quét mã tại quán để mở review form</p>
                 </div>
              </button>
           </div>

           <div className="bg-accent/30 p-6 rounded-[32px] border border-primary/5 flex items-start gap-4 mt-8">
              <Sparkles className="text-primary flex-shrink-0" size={24} />
              <p className="text-[11px] font-bold text-primary italic leading-relaxed text-text-primary">Mỗi lần đến quán thật bồ mới được review 1 lần thôi nha. Review xác thực sẽ nhận ngay +25 coins đó! 🪙✨</p>
           </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 space-y-8 flex flex-col overflow-y-auto no-scrollbar pb-12">
            <div className="space-y-6 bg-zinc-50 p-6 rounded-[32px] border border-zinc-100 shadow-inner">
               <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary text-center mb-2">Đánh giá chi tiết</p>
               {RATING_CATEGORIES.map(cat => (
                 <div key={cat.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className="text-lg">{cat.icon}</span>
                       <span className="text-[11px] font-black uppercase tracking-widest text-text-primary">{cat.label}</span>
                    </div>
                    <div className="flex gap-1.5">
                       {[1, 2, 3, 4, 5].map(i => (
                         <button 
                            key={i} 
                            onClick={() => setDetailedRatings(prev => ({ ...prev, [cat.id]: i }))}
                            className="active:scale-90 transition-transform"
                         >
                            <Star 
                                size={22} 
                                className={cn("fill-current transition-colors", i <= (detailedRatings as any)[cat.id] ? "text-secondary" : "text-zinc-200")} 
                            />
                         </button>
                       ))}
                    </div>
                 </div>
               ))}
            </div>

           <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Trust Tags</p>
              <div className="flex flex-wrap gap-2">
                 {TRUST_TAGS.map(t => (
                   <button 
                    key={t} 
                    onClick={() => toggleTag(t)}
                    className={cn(
                      "px-4 py-2 rounded-full text-[11px] font-black border transition-all shadow-sm",
                      tags.includes(t) ? "bg-primary border-primary text-white" : "bg-white border-zinc-100 text-text-secondary"
                    )}
                   >
                     {t}
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Chi tiêu & Đi cùng</p>
              <div className="flex gap-3">
                 <div className="flex-1 bg-white border border-zinc-100 rounded-2xl p-4">
                    <p className="text-[8px] font-black uppercase opacity-40 mb-1">Mức giá</p>
                    <input 
                      type="text" 
                      placeholder="VD: 55k" 
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full font-black text-sm outline-none bg-transparent"
                    />
                 </div>
                 <div className="flex-[2] bg-white border border-zinc-100 rounded-2xl p-2 flex overflow-x-auto gap-2 items-center no-scrollbar">
                    {['Ăn một mình', 'Bạn bè', 'Người yêu', 'Gia đình'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setCompanion(c)}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-[10px] font-black whitespace-nowrap border transition-all",
                          companion === c ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-zinc-50 text-text-secondary border-zinc-100"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Cảm nhận của bồ (Gen Z style ✨)</p>
              <textarea 
                placeholder="Nước lèo ở đây đậm đà xỉu luôn á mọi người ơi..."
                className="w-full h-32 bg-zinc-50 border border-zinc-100 rounded-[32px] p-6 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-inner resize-none" 
              />
           </div>

           <div className="pb-12 pt-4">
              <button 
                onClick={onSuccess}
                className="w-full h-16 bg-gradient-to-r from-primary to-[#FF7F27] text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-transform"
              >
                Đăng Review → Nhận 25 Food Coins 🪙
              </button>
           </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function SuccessReviewOverlay({ onClose, onShowRewards }: { onClose: () => void, onShowRewards: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[700] bg-black/70 backdrop-blur-3xl flex items-center justify-center p-8">
       <motion.div initial={{ scale: 0.8, y: 100 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[56px] p-10 text-center shadow-2xl relative overflow-hidden w-full max-w-sm">
          <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
          
          <div className="relative mb-8">
             <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto relative z-10">
                <CheckCircle2 size={56} className="text-success" />
             </div>
             <motion.div 
               animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-success/30 z-0" 
             />
             <motion.div 
               animate={{ y: [-20, -100], opacity: [1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl"
             >🪙</motion.div>
          </div>

          <div className="space-y-1 mb-8">
             <h3 className="text-2xl font-black text-text-primary leading-tight">Tuyệt cú mèo! 🎉</h3>
             <p className="text-lg font-black text-primary uppercase tracking-tighter italic">+25 Food Coins!</p>
          </div>

          <div className="bg-zinc-50 rounded-[32px] p-6 border border-zinc-100 mb-8 items-start text-left space-y-4">
             <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-secondary">
                   <span>Kinh nghiệm</span>
                   <span className="text-primary">68/100 XP</span>
                </div>
                <div className="h-3 bg-zinc-200 rounded-full overflow-hidden p-0.5 shadow-inner">
                   <motion.div 
                     initial={{ width: "40%" }} 
                     animate={{ width: "68%" }} 
                     transition={{ duration: 1, ease: "easeOut" }}
                     className="h-full bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-end px-2"
                   >
                     <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                   </motion.div>
                </div>
                <p className="text-[10px] font-bold text-text-secondary text-center">Hidden Gem Hunter Lv.4</p>
             </div>

             <div className="pt-4 border-t border-zinc-200">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl shadow-lg shadow-amber-200/50 flex-shrink-0">🏅</div>
                   <div>
                      <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest leading-none mb-1">Huy hiệu mới!</p>
                      <p className="text-xs font-black text-text-primary">Người Khám Phá Bí Ẩn</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <button 
               onClick={onShowRewards} 
               className="w-full h-16 bg-gradient-to-r from-zinc-900 to-zinc-700 text-white font-black rounded-2xl shadow-xl active:scale-95 transition-transform"
             >
               Xem phần thưởng →
             </button>
             <button 
               onClick={onClose} 
               className="w-full h-14 bg-white border border-zinc-100 text-text-secondary font-black rounded-2xl active:scale-95 transition-transform"
             >
               Về trang chủ
             </button>
          </div>
       </motion.div>
    </motion.div>
  );
}
