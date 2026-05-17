import { motion } from 'motion/react';
import { Settings, MessageCircle, Bookmark, Trophy, ChevronRight, Map, Heart } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function ProfileScreen({ onShowRewards }: { onShowRewards: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-background flex flex-col no-scrollbar overflow-y-auto pb-32">
       <div className="pt-20 px-8 flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
             <div className="w-20 h-20 rounded-[28px] bg-primary/10 border-4 border-white shadow-xl overflow-hidden relative group">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MyDieu" alt="avatar" />
             </div>
             <div>
                <h2 className="text-xl font-black">Mỹ Diệu</h2>
                <div className="flex items-center gap-1.5 text-primary text-[10px] font-black mt-1 bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10 uppercase tracking-wider">
                   <Trophy size={12} className="fill-primary" /> Hidden Gem Hunter Lv.4
                </div>
                <button className="text-[10px] font-bold text-text-secondary underline mt-2 opacity-60">Chỉnh sửa hồ sơ</button>
             </div>
          </div>
          <button className="w-10 h-10 rounded-xl bg-white border border-zinc-100 flex items-center justify-center shadow-sm active:bg-zinc-50">
             <Settings size={20} className="text-zinc-600" />
          </button>
       </div>

       <div className="px-8 grid grid-cols-4 gap-2 mb-8">
          <StatItem label="Quê quán" value="Huế" />
          <StatItem label="Năm sống" value="2 năm" />
          <StatItem label="Reviews" value="28" />
          <StatItem label="Check-in" value="45" />
       </div>

       <div className="px-8 space-y-6">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-700 p-6 rounded-[32px] text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10">
                <p className="text-[11px] font-black text-white/50 mb-2 uppercase tracking-widest">Food Coins balance</p>
                <div className="flex items-end gap-2 mb-6">
                   <span className="text-3xl font-black font-display tracking-tight text-white">🪙 275</span>
                   <span className="text-[11px] font-bold text-white/70 mb-1.5 lowercase">xu ăn uống</span>
                </div>
                <button onClick={onShowRewards} className="bg-white text-zinc-900 text-xs font-black h-11 px-6 rounded-2xl shadow-xl active:scale-95 transition-transform">Đổi thưởng ngay →</button>
             </div>
             <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
             <SparklesBackground />
          </div>

          <div className="space-y-3">
             <div className="flex justify-between items-center px-1">
                <h3 className="text-sm font-black uppercase tracking-widest text-text-secondary">Hành trình ẩm thực</h3>
                <span className="text-[10px] font-bold text-primary">8 Quận tại Sài Gòn</span>
             </div>
             <div className="bg-accent/40 rounded-[32px] p-4 border border-primary/5 relative overflow-hidden">
                <div className="flex gap-2">
                   <div className="flex-1 space-y-1">
                      <p className="text-xs font-bold text-primary italic">"Bạn đã khám phá 8/22 quận Sài Gòn, tập trung nhiều nhất ở Quận 3 và Bình Thạnh 🍜"</p>
                   </div>
                   <div className="w-20 h-20 bg-white/50 rounded-2xl flex items-center justify-center border border-primary/10">
                      <Map size={32} className="text-primary/40" />
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-[32px] overflow-hidden border border-zinc-100 shadow-sm mb-12">
             <ProfileMenuItem icon={MessageCircle} label="Review của tôi" count={28} />
             <ProfileMenuItem icon={Bookmark} label="Quán đã lưu" count={15} />
             <ProfileMenuItem icon={Heart} label="Món quà cho bạn" showBadge />
             <ProfileMenuItem icon={Trophy} label="Huy hiệu đạt được" badgeText="NEW" />
          </div>
       </div>
    </motion.div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center bg-white py-3 rounded-2xl border border-zinc-50 shadow-sm">
      <p className="text-base font-black text-text-primary leading-tight">{value}</p>
      <p className="text-[9px] font-black text-text-secondary uppercase tracking-tight opacity-60 mt-0.5">{label}</p>
    </div>
  );
}

function ProfileMenuItem({ icon: Icon, label, count, showBadge, badgeText }: any) {
  return (
    <button className="w-full p-5 flex items-center justify-between border-b border-zinc-50 last:border-0 active:bg-zinc-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-50 text-zinc-500 flex items-center justify-center">
          <Icon size={20} />
        </div>
        <span className="text-[13px] font-bold text-text-primary">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {count !== undefined && <span className="text-[10px] font-black bg-zinc-100 text-text-secondary px-2.5 py-1 rounded-full">{count}</span>}
        {showBadge && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
        {badgeText && <span className="text-[9px] font-black bg-primary text-white px-2 py-0.5 rounded-md">{badgeText}</span>}
        <ChevronRight className="text-zinc-300" size={16} />
      </div>
    </button>
  );
}

function SparklesBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
       {[...Array(10)].map((_, i) => (
         <div 
           key={i} 
           className="absolute bg-white rounded-full w-1 h-1" 
           style={{ 
             top: `${Math.random() * 100}%`, 
             left: `${Math.random() * 100}%`,
             animation: `pulse ${2 + Math.random() * 2}s infinite`
           }} 
         />
       ))}
    </div>
  );
}
