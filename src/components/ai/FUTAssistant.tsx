import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mic, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Logo } from '@/src/components/ui/Logo';

export function FUTChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Chào Mỹ Diệu! Hôm nay bồ thèm món gì nè? FÚT sẽ giới thiệu quán chuẩn vị quê bồ nhất nha! 🍜✨' }
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'Đợi FÚT xíu nhé... Đang tìm quán bún bò chuẩn vị Huế cho bồ đây. Có quán Bún Bò Cô Gái Huế ngay Quận 10 đang vắng khách nè! 📍' }]);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ y: 844 }} animate={{ y: 0 }} exit={{ y: 844 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute inset-0 bg-background z-[500] flex flex-col pt-20"
    >
      <div className="px-8 flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
           <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center relative shadow-xl border border-primary/10 overflow-hidden">
             <Logo size={50} />
             <div className="absolute top-0 right-0 w-5 h-5 bg-secondary rounded-bl-xl flex items-center justify-center text-[8px] text-white font-black">AI</div>
           </div>
           <div>
              <h3 className="font-black text-lg">FÚT Assistant</h3>
              <p className="text-[10px] font-bold text-success uppercase tracking-widest flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" /> Đang trực tuyến
              </p>
           </div>
        </div>
        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center active:scale-90 transition-transform">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-4 space-y-6 no-scrollbar">
        {messages.map((m, i) => (
          <motion.div 
            initial={{ opacity: 0, x: m.role === 'ai' ? -20 : 20 }} 
            animate={{ opacity: 1, x: 0 }}
            key={i} 
            className={cn("flex", m.role === 'ai' ? "justify-start" : "justify-end")}
          >
            <div className={cn(
              "max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm relative",
              m.role === 'ai' ? "bg-white border border-zinc-100 text-text-primary rounded-tl-none" : "bg-primary text-white rounded-tr-none"
            )}>
              {m.text}
              {m.role === 'ai' && <Sparkles size={12} className="absolute -bottom-2 -right-2 text-secondary animate-pulse" />}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-8 pb-12 pt-4 glass border-t border-zinc-100">
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
           {['Tìm quán bún bò chuẩn Huế', 'Ăn đêm Quận 3', 'Quán sinh viên < 50k'].map(t => (
             <button key={t} onClick={() => setInput(t)} className="px-4 py-2 bg-white rounded-full border border-zinc-200 text-[10px] font-bold whitespace-nowrap active:bg-zinc-50 transition-colors">
               {t}
             </button>
           ))}
        </div>
        <div className="relative group">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && send()}
            type="text" 
            placeholder="Hỏi FÚT ngay..." 
            className="w-full h-14 bg-zinc-50 border border-zinc-200 rounded-2xl px-12 pr-14 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
          />
          <Mic className="absolute left-4 top-4 text-text-secondary cursor-pointer hover:text-primary transition-colors" size={20} />
          <button onClick={send} className="absolute right-2 top-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform">
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
