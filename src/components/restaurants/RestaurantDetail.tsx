import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, Share2, Star, Trophy, Shield, 
  MapPin, Clock, Phone, Compass, Globe, 
  Bookmark, ChevronRight, CheckCircle2,
  Camera, ThumbsUp
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Restaurant } from '@/src/types';

export function RestaurantDetail({ restaurant, onBack, onReview, onViewAllReviews }: { restaurant: Restaurant, onBack: () => void, onReview: () => void, onViewAllReviews: () => void }) {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  if (!restaurant) return null;

  const filters = [
    { name: 'Tất cả', icon: null, image: null },
    { name: 'Mới nhất', icon: Clock, image: '/src/assets/images/regenerated_image_1778995364358.webp' },
    { name: '5 sao', icon: Star, image: '/src/assets/images/regenerated_image_1778995366377.jpg' },
    { name: 'Có ảnh', icon: Camera, image: null },
    { name: 'Đồng hương', icon: ThumbsUp, image: '/src/assets/images/regenerated_image_1778995367719.jpg' },
  ];

  const menuImages = [
    "/src/assets/images/regenerated_image_1778997887778.png",
    "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=800",
    "https://images.unsplash.com/photo-1583394838336-acd977730f9a?q=80&w=800"
  ];
  const mostOrdered = [
    { name: "Bánh xèo tôm thịt", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=300" },
    { name: "Nem lụi", image: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?q=80&w=300" },
    { name: "Trà tắc", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=300" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-background flex flex-col no-scrollbar overflow-y-auto z-[200]">
      {/* Khối hình ảnh chính (Hero section) */}
      <div className="relative h-[30vh]">
        <img src={restaurant.image} className="w-full h-full object-cover" alt={restaurant.name} />
        <button onClick={onBack} className="absolute top-12 left-6 w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/30 active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <div className="absolute top-12 right-6 flex gap-2">
          <button className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/30 active:scale-90 transition-transform">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-t-[40px] -mt-10 relative z-20 p-8 space-y-8">
        {/* 1. Restaurant Header Block */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-black tracking-tight leading-tight text-text-primary px-1">
              Bánh Xèo Quê Hương
            </h1>
            <div className="bg-orange-50 text-orange-500 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100 mt-1">
              Toptip
            </div>
          </div>

          <div className="flex items-center gap-2 px-1">
            <Star size={16} className="fill-secondary text-secondary" />
            <span className="text-sm font-bold text-text-primary">4.8</span>
            <span className="text-[12px] font-medium text-text-secondary opacity-60">(512 đánh giá)</span>
          </div>

          <div className="flex gap-3 px-1">
            <div className="flex items-center gap-1.5 text-success">
              <Trophy size={14} />
              <span className="text-[11px] font-black uppercase tracking-tight">Local đề xuất</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#8B4513]">
              <Shield size={14} />
              <span className="text-[11px] font-black uppercase tracking-tight">Độ tin cậy 95%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-text-secondary px-1">
            <MapPin size={14} />
            <span className="text-[12px] font-bold">0.5 km</span>
            <span className="opacity-40">·</span>
            <span className="text-[12px] font-medium truncate">123 Nguyễn Huệ, Q.1, TP.HCM</span>
          </div>

          <div className="flex items-center gap-x-3 gap-y-2 flex-wrap text-text-secondary px-1">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span className="text-[12px] font-medium">09:00 - 22:00</span>
            </div>
            <span className="opacity-40 text-xs">·</span>
            <span className="text-[12px] font-bold text-text-primary">$$</span>
            <span className="opacity-40 text-xs">·</span>
            <span className="text-[12px] font-bold text-text-primary">Đông</span>
            <span className="opacity-40 text-xs">·</span>
            <span className="text-[12px] font-black text-success">Hôm nay mở cửa</span>
          </div>
        </div>

        {/* 2. Action Toolbar */}
        <div className="grid grid-cols-4 pt-4 border-t border-zinc-50">
          <SimplifiedAction icon={Phone} label="Gọi điện" />
          <SimplifiedAction icon={Compass} label="Chỉ đường" />
          <SimplifiedAction icon={Globe} label="Website" />
          <SimplifiedAction icon={Bookmark} label="Lưu" />
        </div>

        {/* 3. Menu Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-black tracking-tight">Menu tại quán</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-8 px-8 pb-2">
            {menuImages.map((img, i) => (
              <div key={i} className="min-w-[220px] aspect-[3/2] rounded-[24px] overflow-hidden border border-zinc-100 shadow-custom relative group active:scale-[0.98] transition-transform">
                 <img src={img} className="w-full h-full object-cover" alt={`Menu page ${i + 1}`} />
                 <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[8px] font-black uppercase tracking-widest border border-white/30">
                    Trang {i + 1}
                 </div>
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>
            ))}
          </div>
        </section>

        {/* 4. Most Ordered Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-black tracking-tight px-1">Món được gọi nhiều nhất</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-8 px-8 pb-4">
            {mostOrdered.map((dish, i) => (
              <div key={i} className="min-w-[120px] active:scale-95 transition-transform group">
                <div className="aspect-square rounded-[12px] overflow-hidden border border-zinc-100 shadow-sm mb-2">
                  <img src={dish.image} className="w-full h-full object-cover" alt={dish.name} />
                </div>
                <p className="text-[12px] font-bold text-text-primary px-1 line-clamp-2">{dish.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Xếp hạng & Đánh giá tổng quan (Legacy, kept but simplified) */}
        <section id="reviews-section" className="space-y-6 pt-4 border-t border-zinc-50">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-lg font-black tracking-tight">Đánh giá chung</h3>
              <button onClick={onViewAllReviews} className="text-[10px] font-black text-primary uppercase tracking-widest">
                Xem chi tiết →
              </button>
           </div>
           
           <div className="bg-white p-7 rounded-[40px] border border-zinc-100 shadow-custom space-y-6">
              <div className="flex items-center gap-6">
                 <div className="text-center">
                    <p className="text-4xl font-black text-text-primary">4.8</p>
                    <p className="text-[10px] font-black text-secondary uppercase tracking-widest">/ 5</p>
                 </div>
                 <div className="flex-1 space-y-2.5">
                    {[
                      { label: 'Hương vị', score: 4.9, color: 'bg-secondary' },
                      { label: 'Giá cả', score: 4.6, color: 'bg-primary' },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                         <span className="text-[9px] font-black text-text-secondary w-16 uppercase tracking-[0.05em] opacity-50">{item.label}</span>
                         <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${(item.score / 5) * 100}%` }} className={cn("h-full rounded-full", item.color)} />
                         </div>
                         <span className="text-[9px] font-black text-text-primary">{item.score}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Review Filters */}
              <div className="space-y-4 pt-2">
                 <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-40 px-1">Lọc theo sở thích</p>
                 <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-7 px-7">
                    {filters.map((filter) => {
                      const Icon = filter.icon;
                      const isActive = activeFilter === filter.name;
                      return (
                        <button
                          key={filter.name}
                          onClick={() => setActiveFilter(filter.name)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all whitespace-nowrap active:scale-95",
                            isActive 
                              ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                              : "bg-zinc-50 text-text-primary border-zinc-100 hover:bg-zinc-100"
                          )}
                        >
                          {filter.image ? (
                            <div className="w-6 h-6 rounded-lg overflow-hidden border border-white/20">
                              <img src={filter.image} alt={filter.name} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            Icon && <Icon size={12} className={cn(isActive ? "text-white" : "text-primary")} />
                          )}
                          <span className="text-[11px] font-extrabold uppercase tracking-tight">{filter.name}</span>
                        </button>
                      );
                    })}
                 </div>
              </div>

              {/* Sample Review Display (changes visually based on filter) */}
              <div className="space-y-4 pt-2">
                 <div className="p-5 bg-zinc-50 rounded-3xl border border-zinc-100 space-y-3">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200 overflow-hidden">
                             <img 
                               src={activeFilter === 'Đồng hương' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=MinhTri" : "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
                               alt="avatar" 
                             />
                          </div>
                          <div>
                             <p className="text-[11px] font-black leading-none">
                               {activeFilter === 'Đồng hương' ? 'Minh Trí' : 'Văn An'}
                             </p>
                             <p className="text-[9px] font-bold text-text-secondary opacity-50 uppercase tracking-widest mt-0.5">
                               {activeFilter === 'Đồng hương' ? '5 ngày trước' : '2 giờ trước'}
                             </p>
                          </div>
                       </div>
                       <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map(i => (
                            <Star 
                              key={i} 
                              size={8} 
                              className={cn(
                                "fill-current", 
                                i <= (activeFilter === 'Đồng hương' ? 4 : 5) ? "text-secondary" : "text-zinc-200"
                              )} 
                            />
                          ))}
                       </div>
                    </div>
                    <p className="text-[12px] font-medium text-text-secondary leading-relaxed line-clamp-2">
                       {activeFilter === '5 sao' ? 'Rất tuyệt vời, đồ ăn nóng hổi và cực kỳ đậm đà. Sẽ quay lại!' : 
                        activeFilter === 'Đồng hương' ? 'Quán khá ổn, giá sinh viên, bún bò vừa miệng. Không gian hơi chật nhưng bù lại phục vụ nhanh và thân thiện.' :
                        'Quán này bánh xèo siêu ngon, vỏ giòn tan mà tôm thịt bên trong tươi rói luôn á mọi người...'}
                    </p>
                 </div>
              </div>

              <button 
                onClick={onReview}
                className="w-full h-14 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <Star size={18} className="fill-white" /> Viết review ngay
              </button>
           </div>
        </section>
      </div>
    </motion.div>
  );
}

function SimplifiedAction({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <button className="flex flex-col items-center justify-center gap-2 py-2 active:opacity-60 transition-opacity">
      <div className="text-text-primary">
        <Icon size={24} />
      </div>
      <span className="text-[11px] font-black text-text-secondary uppercase tracking-tight">{label}</span>
    </button>
  );
}

