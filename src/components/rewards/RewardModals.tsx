import { motion, AnimatePresence } from 'motion/react';
import { Trophy, X, Gift, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

export function DailyRewardModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-[600] flex items-center justify-center p-8 bg-black/70 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[48px] p-8 pb-10 text-center shadow-3xl relative overflow-hidden w-full max-w-sm"
      >
        <div className="absolute top-0 left-0 w-full h-24 bg-primary/10 rounded-b-[40%] -z-10" />
        
        <div className="relative mb-6 pt-4">
          <motion.div 
            animate={{ y: [-10, 0, -10], rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-primary/10"
          >
             <Gift size={64} className="text-primary" />
          </motion.div>
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-primary/20 rounded-full blur-2xl -z-10" />
        </div>

        <h3 className="text-3xl font-black mb-2 text-text-primary">Bồ đã quay trở lại! 🧧</h3>
        <p className="text-sm font-medium text-text-secondary leading-relaxed mb-8">
           Tặng bồ <span className="text-primary font-black">+50 coins</span> cho <br/>lần đăng nhập hôm nay. Ăn ngon nha!
        </p>

        <button 
          onClick={onClose}
          className="w-full h-16 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 active:scale-95 transition-transform text-lg"
        >
          Nhận ngay! ✨
        </button>
      </motion.div>
    </motion.div>
  );
}

export function RewardBannerPopup({ onClose, onGoToHub }: { onClose: () => void, onGoToHub: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-[300] flex items-center justify-center p-8 bg-black/50 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-[40px] p-8 pb-10 text-center shadow-2xl relative overflow-hidden w-full max-w-sm"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary" />
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400"><X size={20} /></button>
        
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <Trophy size={48} className="text-primary animate-bounce" />
          <Sparkles size={24} className="text-secondary absolute -top-2 -right-2 animate-pulse" />
        </div>

        <h3 className="text-2xl font-black mb-3 text-text-primary">Tích điểm cùng EatScape!</h3>
        
        <div className="space-y-4 mb-8">
           <div className="flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-black">50</div>
              <p className="text-left text-[11px] font-bold text-text-secondary leading-tight">Food Coins → Voucher giảm 5-10% tại quán bất kỳ</p>
           </div>
           <div className="flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
              <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary font-black">150</div>
              <p className="text-left text-[11px] font-bold text-text-secondary leading-tight">Food Coins → Vòng quay may mắn. Cơ hội free bữa ăn!</p>
           </div>
        </div>

        <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden mb-3">
          <motion.div initial={{ width: "0%" }} animate={{ width: "50%" }} transition={{ delay: 0.5, duration: 1 }} className="bg-primary h-full shadow-[0_0_10px_rgba(232,68,42,0.5)]" />
        </div>
        <p className="text-xs text-text-secondary font-bold mb-8">Bạn đang có: 75 🪙 — <span className="text-primary">Còn 75 coins nữa để quay!</span></p>

        <div className="space-y-3">
          <button onClick={onGoToHub} className="w-full h-14 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20">Kiếm thêm coins ngay →</button>
          <button onClick={onClose} className="w-full h-12 text-text-secondary text-xs font-bold">Để sau</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LuckyWheelScreen({ onBack }: { onBack: () => void }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [tab, setTab] = useState<'WHEEL' | 'VOUCHERS'>('WHEEL');

  const spin = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setResult('Miễn phí 1 bữa ăn 200k! 🍜');
    }, 4000);
  };

  const VOUCHERS = [
    { title: 'Voucher 10%', label: 'Quán bất kỳ', cost: 50, icon: '🔥' },
    { title: 'Voucher 15%', label: 'Quán đối tác', cost: 75, icon: '🌟' },
    { title: 'Free Drink', label: 'Tất cả các quán', cost: 30, icon: '🥤' }
  ];

  return (
    <motion.div initial={{ y: 844 }} animate={{ y: 0 }} exit={{ y: 844 }} className="absolute inset-0 bg-background z-[400] flex flex-col no-scrollbar overflow-y-auto pb-12 pt-20">
      <div className="px-8 flex items-center justify-between mb-8 sticky top-0 bg-background/80 backdrop-blur-xl z-50 pb-4">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white border border-zinc-100 flex items-center justify-center"><X size={20} /></button>
        <h2 className="text-xl font-black">Phần thưởng của bồ</h2>
        <div className="w-10" />
      </div>

      <div className="px-8 mb-8">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-700 p-6 rounded-[32px] text-white flex justify-between items-center shadow-xl">
           <div>
              <p className="text-[10px] font-black uppercase opacity-50 mb-1 tracking-widest text-white">Số dư Food Coins</p>
              <h3 className="text-3xl font-black font-display">275 🪙</h3>
           </div>
           <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black border border-white/30 uppercase tracking-widest">Pro Seeker</div>
        </div>
      </div>

      <div className="px-8 flex items-center gap-6 mb-8 border-b border-zinc-100 mx-8">
         <button onClick={() => setTab('WHEEL')} className={cn("pb-3 text-sm font-black transition-all", tab === 'WHEEL' ? "text-primary border-b-4 border-primary" : "text-zinc-300")}>Vòng quay</button>
         <button onClick={() => setTab('VOUCHERS')} className={cn("pb-3 text-sm font-black transition-all", tab === 'VOUCHERS' ? "text-primary border-b-4 border-primary" : "text-zinc-300")}>Đổi Voucher</button>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'WHEEL' ? (
          <motion.div 
            key="wheel"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="px-8 flex flex-col items-center justify-center space-y-12"
          >
            <div className="relative">
               <motion.div 
                 animate={spinning ? { rotate: 360 * 5 } : { rotate: 0 }}
                 transition={spinning ? { duration: 4, ease: "circOut" } : {}}
                 className="w-72 h-72 rounded-full border-[12px] border-zinc-900 bg-white relative shadow-2xl flex items-center justify-center overflow-hidden"
               >
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i} 
                      className={cn("absolute w-full h-full border-r border-zinc-100")} 
                      style={{ transform: `rotate(${i * 45}deg)` }} 
                    />
                  ))}
                  <div className="z-10 bg-white shadow-xl rounded-full w-14 h-14 flex items-center justify-center font-black border-4 border-zinc-900">E</div>
               </motion.div>
               <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-10 bg-primary rounded-b-full shadow-lg z-20 border-x-2 border-b-2 border-white/20" />
            </div>

            <div className="w-full space-y-4">
              <button 
                onClick={spin}
                disabled={spinning}
                className={cn(
                  "w-full h-16 rounded-[24px] text-lg font-black shadow-2xl transition-all active:scale-95",
                  spinning ? "bg-zinc-100 text-zinc-400" : "bg-gradient-to-r from-primary to-[#FF7F27] text-white shadow-primary/30"
                )}
              >
                {spinning ? 'Đang xoay lẹ lẹ...' : 'QUAY NGAY (150 🪙)'}
              </button>
              <p className="text-[10px] text-center font-black text-text-secondary uppercase tracking-widest opacity-50">Cơ hội nhận bữa ăn 0đ mỗi ngày!</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="vouchers"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="px-8 space-y-4"
          >
             {VOUCHERS.map(v => (
               <div key={v.title} className="bg-white p-5 rounded-[28px] border border-zinc-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">{v.icon}</div>
                     <div>
                        <h4 className="font-black text-sm">{v.title}</h4>
                        <p className="text-[10px] font-bold text-text-secondary">{v.label}</p>
                     </div>
                  </div>
                  <button className="bg-primary px-4 h-10 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">{v.cost} 🪙</button>
               </div>
             ))}
             <div className="bg-accent/30 p-6 rounded-[32px] border border-primary/5 mt-8">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Bồ có biết?</p>
                <p className="text-xs font-bold text-primary italic leading-relaxed">Đổi voucher tại các quán đối tác của EatScape sẽ giúp bồ tiết kiệm tới 30% hóa đơn đó! ✨</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[500] flex items-center justify-center p-8 bg-black/70 backdrop-blur-xl">
           <motion.div 
             initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
             className="bg-white rounded-[48px] p-10 text-center shadow-2xl space-y-6 max-w-sm relative overflow-hidden"
           >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary" />
              <div className="relative">
                 <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <Sparkles size={48} className="text-secondary" />
                 </div>
                 <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-lg">WOW!</motion.div>
              </div>
              <div>
                 <h4 className="text-2xl font-black mb-2">Chúc mừng bồ! 🎉</h4>
                 <p className="text-base font-bold text-primary italic">"{result}"</p>
              </div>
              <button 
                onClick={() => setResult(null)} 
                className="w-full h-16 bg-zinc-900 text-white font-black rounded-2xl shadow-xl active:scale-95 transition-transform"
              >
                Nhận ngay lẹ lẹ!
              </button>
           </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
