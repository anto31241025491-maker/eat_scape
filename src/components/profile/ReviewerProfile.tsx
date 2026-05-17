import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, MapPin, CheckCircle2, Bookmark, MessageCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function ReviewerProfilePopup({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-[800] bg-black/60 backdrop-blur-md flex items-end"
    >
      <motion.div 
        initial={{ y: 844 }} animate={{ y: 0 }} exit={{ y: 844 }}
        className="bg-white w-full rounded-t-[48px] p-8 pb-12 shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-8 w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 active:scale-90 transition-transform"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center mb-8">
           <div className="w-[100px] h-[100px] rounded-[40px] border-4 border-primary/10 p-1 mb-4 shadow-xl rotate-3">
              <div className="w-full h-full rounded-[32px] overflow-hidden bg-white">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=ThanhHuyen" alt="avatar" className="w-full h-full object-cover" />
              </div>
           </div>
           <h3 className="text-xl font-black text-text-primary mb-1">Thanh Huyền</h3>
           <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">🏅 Hidden Gem Hunter Lv.8</p>
           <p className="text-[11px] font-bold text-text-secondary flex items-center gap-2">
             <span>Người Huế</span> 
             <span className="w-1 h-1 rounded-full bg-zinc-200" /> 
             <span>Sài Gòn 2 năm</span> 
             <span className="w-1 h-1 rounded-full bg-zinc-200" /> 
             <span>Bình Thạnh</span>
           </p>
        </div>

        <div className="bg-zinc-50 rounded-[32px] p-6 border border-zinc-100 flex items-center justify-between mb-8 shadow-inner">
           <div className="text-center flex-1">
              <p className="text-lg font-black text-text-primary">42</p>
              <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest opacity-50">Reviews</p>
           </div>
           <div className="w-px h-8 bg-zinc-200" />
           <div className="text-center flex-1">
              <p className="text-lg font-black text-text-primary">1.2k</p>
              <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest opacity-50">Likes</p>
           </div>
           <div className="w-px h-8 bg-zinc-200" />
           <div className="text-center flex-1">
              <p className="text-lg font-black text-text-primary">380</p>
              <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest opacity-50">Followers</p>
           </div>
           <div className="w-px h-8 bg-zinc-200" />
           <div className="text-center flex-1">
              <p className="text-lg font-black text-text-primary">28</p>
              <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest opacity-50">Check-in</p>
           </div>
        </div>

        <div className="space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <Star size={16} fill="currentColor" />
                 </div>
                 <span className="text-xs font-black text-text-primary">Điểm uy tín: 92/100</span>
              </div>
              <div className="flex -space-x-2">
                 {['🏅', '🌟', '🍜', '🔥'].map((b, i) => (
                   <div key={i} className="w-8 h-8 rounded-full bg-white border-2 border-zinc-50 flex items-center justify-center text-sm shadow-sm">{b}</div>
                 ))}
              </div>
           </div>

           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                 <CheckCircle2 size={20} />
              </div>
              <div className="flex-1">
                 <p className="text-xs font-bold text-text-primary leading-tight mb-1">✅ 38 Review hữu ích</p>
                 <p className="text-[10px] font-medium text-text-secondary leading-normal opacity-70">Thanh Huyền thường xuyên chia sẻ các quán ăn chuẩn vị miền Trung và được cộng đồng tin tưởng</p>
              </div>
        </div>

           <div className="grid grid-cols-2 gap-4 mt-4">
              <button className="h-14 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all">Theo dõi +</button>
              <button className="h-14 bg-white border border-zinc-100 text-text-primary font-black rounded-2xl shadow-sm active:scale-95 transition-all text-xs">Xem review →</button>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
