import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Star, Heart, MessageCircle, Bookmark, Share2, CheckCircle2, TrendingUp, Filter } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Restaurant } from '@/src/types';

const MOCK_REVIEWS = [
  {
    id: 1,
    user: {
      name: 'Thanh Huyền',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThanhHuyen',
      loyalty: 'Hidden Gem Hunter Lv.8',
      trustScore: 92
    },
    rating: 5,
    details: { taste: 5, price: 4, space: 5, service: 4 },
    comment: 'Bún bò ở đây đúng chuẩn vị Huế luôn! Nước lèo đậm đà, thịt mềm, ăn kèm với rau muống và bắp chuối rất ngon. Quán hơi nhỏ nhưng không khí ấm cúng, cô chủ thân thiện',
    images: [
      'https://images.unsplash.com/photo-1625398407796-82650a8c135f?q=80&w=200',
      'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=200',
      'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=200'
    ],
    tags: ['#bún_bò', '#chuẩn_vị_Huế', '#ngon', '#sinh_viên'],
    expense: '~65k/người',
    groupSize: '2 người',
    companion: 'Bạn bè',
    likes: 128,
    comments: 34,
    time: '2 ngày trước'
  },
  {
    id: 2,
    user: {
      name: 'Minh Trí',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MinhTri',
      loyalty: 'Local Explorer Lv.5',
      trustScore: 74
    },
    rating: 4,
    details: { taste: 4, price: 5, space: 3, service: 4 },
    comment: 'Quán khá ổn, giá sinh viên, bún bò vừa miệng. Không gian hơi chật nhưng bù lại phục vụ nhanh và thân thiện. Sẽ quay lại!',
    images: [
      'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=200'
    ],
    tags: ['#quán_quen', '#giá_rẻ'],
    expense: '~50k/người',
    groupSize: '1 người',
    companion: 'Ăn một mình',
    likes: 47,
    comments: 8,
    time: '5 ngày trước'
  }
];

export function ReviewListScreen({ restaurant, onBack, onOpenProfile }: { restaurant: Restaurant, onBack: () => void, onOpenProfile: () => void }) {
  const [activeFilter, setActiveFilter] = useState('Tất cả ▼');
  const filters = ['Tất cả ▼', 'Theo sao ▼', '🏅 Đồng hương', '📍 Local', '🆕 Lần đầu'];

  const filteredReviews = MOCK_REVIEWS.filter(review => {
    if (activeFilter === 'Tất cả ▼') return true;
    if (activeFilter === '🏅 Đồng hương') return review.user.name === 'Minh Trí';
    return true;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-background flex flex-col no-scrollbar overflow-y-auto">
      <div className="px-8 pt-16 pb-6 bg-white sticky top-0 z-30 flex items-center justify-between border-b border-zinc-50 shadow-sm">
        <button onClick={onBack} className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-text-primary"><ChevronLeft size={24} /></button>
        <div className="text-center">
           <h2 className="text-base font-black tracking-tight">{restaurant.name}</h2>
           <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Đánh giá & Review</p>
        </div>
        <button className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-text-primary"><Share2 size={20} /></button>
      </div>

      <div className="flex gap-2 px-8 py-4 overflow-x-auto no-scrollbar bg-white/50 backdrop-blur-md sticky top-[108px] z-20">
         {filters.map((f) => (
           <button 
             key={f} 
             onClick={() => setActiveFilter(f)}
             className={cn(
               "px-4 h-10 rounded-full text-[11px] font-black whitespace-nowrap transition-all flex items-center gap-1.5",
               activeFilter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white border border-zinc-100 text-text-secondary"
             )}
           >
             {f}
           </button>
         ))}
      </div>

      <div className="px-8 pt-6 pb-20 space-y-8">
        {filteredReviews.map(review => (
          <ReviewCard key={review.id} review={review} onOpenProfile={onOpenProfile} />
        ))}
      </div>
    </motion.div>
  );
}

function ReviewCard({ review, onOpenProfile }: { review: any, onOpenProfile: () => void, key?: any }) {
  return (
    <div className="bg-white rounded-[40px] p-6 border border-zinc-50 shadow-custom group">
      <div className="flex justify-between items-start mb-6">
        <button onClick={onOpenProfile} className="flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-[20px] bg-zinc-100 overflow-hidden border border-zinc-200">
             <img src={review.user.avatar} alt="avatar" />
          </div>
          <div>
            <h4 className="text-sm font-black text-text-primary leading-tight">{review.user.name}</h4>
            <p className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">{review.user.loyalty}</p>
            <p className="text-[8px] font-black text-text-secondary opacity-50 uppercase">⭐ Điểm uy tín: {review.user.trustScore}/100</p>
          </div>
        </button>
        <span className="text-[9px] font-bold text-text-secondary">{review.time}</span>
      </div>

      <div className="bg-success/5 p-3 rounded-2xl border border-success/10 flex items-center gap-2 mb-4">
         <CheckCircle2 size={16} className="text-success" />
         <span className="text-[10px] font-black text-success uppercase tracking-widest italic">✅ Đã check-in tại quán — Review xác thực</span>
      </div>

      <div className="mb-6">
         <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={14} className={cn("fill-current", i <= review.rating ? "text-secondary" : "text-zinc-200")} />
            ))}
         </div>
         
         <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
            <div className="space-y-1">
               <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="opacity-60 uppercase tracking-widest text-text-secondary">Hương vị</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className={cn("w-2 h-1 rounded-full", i <= review.details.taste ? "bg-secondary" : "bg-zinc-200")} />)}
                  </div>
               </div>
               <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="opacity-60 uppercase tracking-widest text-text-secondary">Giá cả</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className={cn("w-2 h-1 rounded-full", i <= review.details.price ? "bg-secondary" : "bg-zinc-200")} />)}
                  </div>
               </div>
            </div>
            <div className="space-y-1">
               <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="opacity-60 uppercase tracking-widest text-text-secondary">Không gian</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className={cn("w-2 h-1 rounded-full", i <= review.details.space ? "bg-secondary" : "bg-zinc-200")} />)}
                  </div>
               </div>
               <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="opacity-60 uppercase tracking-widest text-text-secondary">Phục vụ</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className={cn("w-2 h-1 rounded-full", i <= review.details.service ? "bg-secondary" : "bg-zinc-200")} />)}
                  </div>
               </div>
            </div>
         </div>

         <p className="text-[13px] text-text-primary leading-relaxed font-medium">"{review.comment}"</p>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar mb-4">
         {review.images.map((img: string, i: number) => (
           <div key={i} className="min-w-[120px] h-[120px] rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
              <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
           </div>
         ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
         {review.tags.map((tag: string) => (
           <span key={tag} className="text-[11px] font-black text-primary italic">{tag}</span>
         ))}
      </div>

      <div className="flex items-center gap-3 mb-6 bg-primary/5 px-4 py-2 rounded-xl w-fit">
         <TrendingUp size={12} className="text-primary" />
         <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">
            Chi phí: <span className="text-primary">{review.expense}</span> · {review.groupSize} · {review.companion}
         </span>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
         <div className="flex gap-8">
            <button className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-all">
                <Heart size={20} />
              </div>
              <span className="text-xs font-black">{review.likes}</span>
            </button>
            <button className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400">
                <MessageCircle size={20} />
              </div>
              <span className="text-xs font-black">{review.comments}</span>
            </button>
         </div>
         <button className="w-10 h-10 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400">
            <Bookmark size={20} />
         </button>
      </div>
    </div>
  );
}
