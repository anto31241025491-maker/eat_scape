import { motion, AnimatePresence } from 'motion/react';
import { Home, Compass, Plus, Users, User, MessageCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Screen } from '@/src/types';

export function BottomNav({ currentScreen, onNavigate, onShowFAB }: { currentScreen: Screen, onNavigate: (s: Screen) => void, onShowFAB: () => void }) {
  return (
    <nav className="absolute bottom-0 w-full glass border-t border-black/5 pb-10 pt-3 px-8 flex justify-between items-center z-50 backdrop-blur-xl">
      <NavIcon icon={Home} label="Home" active={currentScreen === 'HOME'} onClick={() => onNavigate('HOME')} />
      <NavIcon icon={Compass} label="Explore" active={currentScreen === 'EXPLORE_FEED' || currentScreen === 'EXPLORE_MATCH'} onClick={() => onNavigate('EXPLORE_FEED')} />
      
      <div className="relative -top-8">
        <motion.button 
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 text-white border-4 border-white transform transition-all"
          onClick={onShowFAB}
        >
          <Plus size={32} strokeWidth={3} />
        </motion.button>
      </div>

      <NavIcon icon={Users} label="Match" active={currentScreen === 'EXPLORE_MATCH'} onClick={() => onNavigate('EXPLORE_MATCH')} />
      <NavIcon icon={User} label="Me" active={currentScreen === 'PROFILE'} onClick={() => onNavigate('PROFILE')} />
    </nav>
  );
}

function NavIcon({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn("flex flex-col items-center gap-1.5 transition-all relative px-2", active ? "text-primary scale-110" : "text-text-secondary opacity-60 hover:opacity-100")}>
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-black uppercase tracking-tight">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-pill" 
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(232,68,42,1)]" 
        />
      )}
    </button>
  );
}

export function FABBottomSheet({ onClose, onNavigate }: { onClose: () => void, onNavigate: (s: Screen) => void }) {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md z-[100]" 
      />
      <motion.div 
        initial={{ y: 500 }} animate={{ y: 0 }} exit={{ y: 500 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="absolute bottom-0 w-full bg-white rounded-t-[48px] p-10 pb-16 z-[101] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-zinc-100"
      >
        <div className="w-12 h-1.5 bg-zinc-100 rounded-full mx-auto mb-10" />
        <h3 className="text-xl font-black text-center mb-8 tracking-tight">Hôm nay bạn muốn làm gì?</h3>
        <div className="grid grid-cols-1 gap-5">
          <FABOption 
            icon={MessageCircle} 
            label="Đánh giá món ngon lên Social Feed" 
            sublabel="Chia sẻ trải nghiệm ăn uống thật"
            color="primary" 
            onClick={onClose}
          />
          <FABOption 
            icon={Users} 
            label="Tìm bạn ăn cùng — EatMatch" 
            sublabel="Ghép cặp nhanh, không lo ăn một mình"
            color="secondary" 
            onClick={() => { onClose(); onNavigate('EXPLORE_MATCH'); }} 
          />
        </div>
      </motion.div>
    </>
  );
}

function FABOption({ icon: Icon, label, sublabel, color, onClick }: any) {
  return (
    <button onClick={onClick} className="w-full p-6 bg-zinc-50/50 border border-zinc-100 rounded-[32px] flex items-center gap-5 text-left active:scale-[0.98] transition-all group overflow-hidden relative">
       <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110", 
         color === 'primary' ? 'bg-primary text-white shadow-primary/20' : 'bg-secondary text-white shadow-secondary/20')}>
         <Icon size={28} />
       </div>
       <div className="flex-1 min-w-0">
          <span className="text-sm font-black text-text-primary block leading-tight mb-1">{label}</span>
          <span className="text-[10px] font-bold text-text-secondary opacity-60 block truncate">{sublabel}</span>
       </div>
       <ChevronRight className="text-zinc-300 transition-transform group-hover:translate-x-1" size={20} />
    </button>
  );
}
