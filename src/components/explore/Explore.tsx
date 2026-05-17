import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Bookmark, Share2, MoreVertical, X, Star, Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function ExploreFeed({ onSwitch }: { onSwitch: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-background flex flex-col no-scrollbar overflow-y-auto pb-32 pt-16">
      <div className="px-8 mb-6 flex justify-between items-end">
        <div className="flex items-center gap-8">
           <button className="pb-3 border-b-4 border-primary text-lg font-black tracking-tight">Cộng đồng</button>
           <button onClick={onSwitch} className="pb-3 text-lg font-black text-zinc-300 tracking-tight">EatMatch</button>
        </div>
        <button className="pb-3">
           <Search size={24} className="text-zinc-400" />
        </button>
      </div>

      <div className="flex gap-5 px-8 overflow-x-auto no-scrollbar mb-10">
        {[
          { name: 'Diệu', img: 'MỹDiệu', active: true },
          { name: 'Nam', img: 'Nam' },
          { name: 'Anh', img: 'Anh' },
          { name: 'Vy', img: 'Vy' },
          { name: 'Hùng', img: 'Hùng' },
        ].map(user => (
          <div key={user.name} className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className={cn("w-[72px] h-[72px] rounded-3xl p-0.5 border-2 transition-all", user.active ? "border-primary rotate-3" : "border-zinc-100 rotate-0")}>
              <div className="w-full h-full rounded-[20px] bg-white overflow-hidden shadow-inner flex items-center justify-center p-1">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.img}`} alt="story" className="w-full h-full object-contain rounded-xl" referrerPolicy="no-referrer" />
              </div>
            </div>
            <span className={cn("text-[10px] font-black tracking-widest uppercase", user.active ? "text-primary" : "text-text-secondary opacity-60")}>Bé {user.name}</span>
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {[
          { 
            user: 'Thanh Huyền', 
            avatar: 'ThanhHuyen', 
            loyalty: '🏅 Hidden Gem Hunter Lv.8', 
            hometown: 'Huế',
            restaurant: 'Quán Quê Hương',
            location: '📍 Quận 3',
            image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800',
            caption: 'Bún bò ở đây đúng chuẩn vị Huế luôn! Nước lèo đậm đà, sợi bún to dai...',
            budget: '~75k/người',
            likes: '1.2k',
            comments: '85'
          },
          { 
            user: 'Minh Trí', 
            avatar: 'MinhTri', 
            loyalty: '🔍 Local Explorer Lv.5', 
            hometown: 'Sài Gòn',
            restaurant: 'Quán Local',
            location: '📍 Quận 10',
            image: '/src/assets/images/regenerated_image_1778995364358.webp',
            caption: 'Quán bún bò này là hidden gem thực sự luôn á, giá sinh viên cực kỳ!',
            budget: '~50k/người',
            likes: '856',
            comments: '42'
          }
        ].map((item, i) => (
          <div key={i} className="relative w-full h-[75vh] flex-shrink-0 group overflow-hidden">
            <img 
              src={item.image} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" 
              referrerPolicy="no-referrer" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Top User Info */}
            <div className="absolute top-6 left-8 right-8 flex items-center justify-between z-10">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden shadow-lg">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.avatar}`} alt="user" />
                  </div>
                  <div>
                     <h4 className="text-sm font-black text-white drop-shadow-md">{item.user}</h4>
                     <p className="text-[9px] font-bold text-white/80 uppercase tracking-widest drop-shadow-md">{item.loyalty}</p>
                  </div>
               </div>
               <button className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/30">Theo dõi</button>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-8 left-8 right-8 z-10 space-y-4">
               <div>
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xl text-[10px] font-black text-text-primary mb-3">
                     {item.restaurant} <span className="opacity-40">{item.location}</span>
                  </div>
                  <h3 className="text-white text-lg font-bold leading-tight italic line-clamp-3 mb-2 drop-shadow-lg">
                    "{item.caption}"
                  </h3>
                  <div className="flex gap-2 mb-4">
                    <span className="bg-success/20 backdrop-blur-md text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-white/20">🟢 Local-approved</span>
                    <span className="bg-amber-100/20 backdrop-blur-md text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-white/20">🏅 Đồng hương</span>
                  </div>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex gap-6">
                     <button className="flex items-center gap-2 group/btn">
                       <Heart size={24} className="text-white/90 drop-shadow-md group-hover/btn:text-primary transition-colors" />
                       <span className="text-xs font-black text-white drop-shadow-md">{item.likes}</span>
                     </button>
                     <button className="flex items-center gap-2">
                       <MessageCircle size={24} className="text-white/90 drop-shadow-md" />
                       <span className="text-xs font-black text-white drop-shadow-md">{item.comments}</span>
                     </button>
                  </div>
                  <div className="flex gap-4">
                     <button className="text-white/90 drop-shadow-md"><Bookmark size={24} /></button>
                     <button className="text-white/90 drop-shadow-md"><Share2 size={24} /></button>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

    </motion.div>
  );
}

export function EatMatchScreen({ onSwitch }: { onSwitch: () => void }) {
  const [currentCard, setCurrentCard] = useState(0);
  const cards = [
    { name: 'Mỹ Diệu', age: 21, loc: 'Quận 10', origin: 'Bình Định', bio: 'Hôm nay thèm lẩu Thái quá, có ai ăn cùng hông? Muốn tìm bạn cùng vibe, budget tầm 150k nha. 🍲✨', img: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800' },
    { name: 'Hoàng Nam', age: 23, loc: 'Quận 3', origin: 'Huế', bio: 'Đi tìm quán bún bò chuẩn Huế nhất Sài Gòn. Cần đồng hương dẫn lối! 🍜', img: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-background flex flex-col pt-16">
      <div className="px-8 mb-6">
        <div className="flex items-center gap-8">
           <button onClick={onSwitch} className="pb-3 text-lg font-black text-zinc-300 tracking-tight">Cộng đồng</button>
           <button className="pb-3 border-b-4 border-primary text-lg font-black tracking-tight">EatMatch</button>
        </div>
      </div>

      <div className="px-8 flex-1 flex flex-col items-center justify-center pb-24">
        <div className="relative w-full aspect-[3/4.5] group">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentCard}
              initial={{ x: 100, opacity: 0, rotate: 5 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -100, opacity: 0, rotate: -5 }}
              className="absolute inset-0 bg-zinc-200 rounded-[48px] shadow-2xl overflow-hidden border-4 border-white"
            >
              <img src={cards[currentCard % cards.length].img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-3xl border-4 border-white/20 overflow-hidden shadow-2xl p-0.5">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${cards[currentCard % cards.length].name}`} alt="avatar" className="w-full h-full bg-white rounded-2xl" />
                    </div>
                    <div>
                       <h4 className="text-white font-black text-2xl">{cards[currentCard % cards.length].name}, {cards[currentCard % cards.length].age}</h4>
                       <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">📍 {cards[currentCard % cards.length].loc} | Gốc {cards[currentCard % cards.length].origin}</p>
                    </div>
                 </div>
                 <p className="text-white/90 text-[13px] leading-relaxed font-bold mb-4 italic">"{cards[currentCard % cards.length].bio}"</p>
                 <div className="flex gap-2">
                    <span className="bg-white/20 backdrop-blur-xl px-3 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/30">Học bài</span>
                    <span className="bg-white/20 backdrop-blur-xl px-3 py-1.5 rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/30">Vỉa hè chill</span>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="py-8 flex items-center gap-8 relative z-10">
           <button 
             onClick={() => setCurrentCard(currentCard + 1)}
             className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-zinc-400 active:scale-90 transition-transform hover:text-primary"
           >
             <X size={32} />
           </button>
           <button 
             onClick={() => setCurrentCard(currentCard + 1)}
             className="w-20 h-20 rounded-full bg-primary shadow-2xl shadow-primary/40 flex items-center justify-center text-white active:scale-90 transition-transform relative group"
           >
             <Heart size={40} className="fill-white group-hover:scale-125 transition-transform" />
             <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full border-2 border-white animate-pulse" />
           </button>
           <button className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center text-secondary active:scale-90 transition-transform">
             <Star size={32} className="fill-secondary" />
           </button>
        </div>
      </div>
    </motion.div>
  );
}
