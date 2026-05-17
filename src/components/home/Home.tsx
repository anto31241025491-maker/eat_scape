import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Trophy,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Restaurant } from '@/src/types';
import { Logo } from '@/src/components/ui/Logo';

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: 'Quán Local',
    image: '/src/assets/images/regenerated_image_1778995364358.webp',
    rating: 4.9,
    reviews: 234,
    distance: '350m',
    time: '5 phút',
    tags: ['Chuẩn vị miền Trung', 'Giá sinh viên'],
    price: '~45k',
    crowd: 'Đang vắng',
    isVerified: true,
    isHiddenGem: true
  },
  {
    id: 2,
    name: 'Quán Ăn Đêm',
    image: '/src/assets/images/regenerated_image_1778995366377.jpg',
    rating: 4.5,
    reviews: 156,
    distance: '520m',
    time: '8 phút',
    tags: ['Local-approved', 'Mở khuya'],
    price: '~35k',
    crowd: 'Đang đông',
    isVerified: true
  }
];

export function HomeScreen({ onSelectRestaurant, onOpenFUT, onSearch, onOpenMap }: { onSelectRestaurant: (r: Restaurant) => void, onOpenFUT: () => void, onSearch: (q: string) => void, onOpenMap: () => void }) {
  const [localQuery, setLocalQuery] = useState('');

  const handleSearch = () => {
    if (localQuery.trim()) {
      onSearch(localQuery);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="absolute inset-0 bg-background flex flex-col no-scrollbar overflow-y-auto pb-32"
    >
      <header className="px-8 pt-16 flex justify-between items-center z-30 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[18px] bg-white shadow-custom overflow-hidden border border-zinc-100 p-0.5">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MỹDiệu" alt="avatar" className="w-full h-full object-cover rounded-[16px]" />
          </div>
          <div>
            <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest leading-none mb-1">Chào bồ,</p>
            <h2 className="text-sm font-black text-text-primary">Mỹ Diệu! ✨</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-11 h-11 rounded-2xl bg-white border border-black/5 flex items-center justify-center relative shadow-sm">
            <Bell size={18} strokeWidth={2.5} />
            <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      <div className="px-8 space-y-8 pt-4">
        {/* Search Bar FÚT AI */}
        <div className="relative group">
          <div className="absolute inset-x-0 -bottom-1 h-14 bg-primary/10 rounded-[24px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative h-16 bg-white border border-zinc-100 rounded-[24px] flex items-center px-6 gap-4 shadow-custom transition-all group-focus-within:border-primary/50 ring-primary/5 ring-0 group-focus-within:ring-8">
            <span className="text-xl animate-pulse">✨</span>
            <input 
              onFocus={() => {
                onSearch('');
                (document.activeElement as HTMLElement)?.blur();
              }}
              readOnly
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              type="text" 
              placeholder="Bạn Mỹ Diệu hôm nay mún măm gì?" 
              className="flex-1 bg-transparent text-sm font-bold text-text-primary outline-none placeholder:text-zinc-300 cursor-pointer" 
            />
            <button 
              onClick={handleSearch}
              className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-text-secondary cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Flashcard Guide Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-lg font-black tracking-tight">Cẩm nang cho bạn mới 🐥</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-8 px-8 pb-4">
            {[
              { title: "Tìm quán local", desc: "Chuẩn vị do người bản địa giới thiệu.", icon: "🔍" },
              { title: "Lọc đồng hương", desc: "Xem đánh giá từ người cùng quê.", icon: "🏅" },
              { title: "Nhận Coins", desc: "Review nhận thưởng +50 Coins ngay.", icon: "💰" },
              { title: "Eat Match", desc: "Vuốt để tìm món ăn yêu thích.", icon: "🔥" },
              { title: "Menu thực tế", desc: "Xem ảnh menu thật tại quán.", icon: "📸" },
              { title: "Review thật", desc: "Chỉ giữ lại review từ thực khách thật.", icon: "✅" },
              { title: "Đặt món nhanh", desc: "Giao hàng hoặc gọi điện đặt bàn.", icon: "📞" },
              { title: "Lưu quán ngon", desc: "Lưu 'Hidden Gem' vào bộ sưu tập.", icon: "💾" },
              { title: "Cộng đồng", desc: "Theo dõi các Local Explorer uy tín.", icon: "👥" },
              { title: "Dùng Coins", desc: "Đổi voucher giảm giá trực tiếp.", icon: "🎁" },
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileTap={{ scale: 0.95 }}
                className="min-w-[160px] p-5 bg-white rounded-[28px] border border-zinc-100 shadow-custom flex flex-col items-center text-center space-y-3 relative group overflow-hidden"
              >
                <div className="absolute top-2 right-2 w-7 h-7 bg-zinc-50 rounded-full flex items-center justify-center border border-zinc-100">
                   <span className="text-[10px] font-black text-zinc-300">{i + 1}</span>
                </div>
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-text-primary mb-1 leading-tight">{card.title}</h4>
                  <p className="text-[9px] font-medium text-text-secondary leading-tight opacity-70 px-1">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mood/Category Buttons */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-8 px-8 py-2">
          {[
            { label: '🤷 Không biết măm gì', emoji: '🍜' },
            { label: '👤 Ăn một mình', emoji: '🍚' },
            { label: '💕 Hò hẹn chill chill', emoji: '☕' },
            { label: '🌙 Cú đêm đói bụng', emoji: '🥟' },
            { label: '💰 Ví mỏng sinh viên', emoji: '🥪' }
          ].map(mood => (
            <button key={mood.label} className="px-5 h-14 bg-white border border-zinc-100 rounded-[20px] whitespace-nowrap flex items-center gap-2 shadow-sm active:scale-95 transition-all group">
              <span className="text-lg group-hover:scale-125 transition-transform">{mood.emoji}</span>
              <span className="text-[11px] font-black text-text-primary">{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Quick Map Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black tracking-tight">Khu vực của bồ</h3>
            <button 
              onClick={onOpenMap}
              className="flex items-center gap-1 text-primary cursor-pointer active:scale-95 transition-transform"
            >
               <span className="text-xs font-black uppercase tracking-widest">Xem bản đồ</span>
               <ChevronRight size={16} strokeWidth={3} />
            </button>
          </div>
          <button 
            onClick={onOpenMap}
            className="w-full h-52 bg-zinc-50 rounded-[32px] relative overflow-hidden border border-zinc-100 shadow-inner group text-left"
          >
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800" className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-primary/5" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center mb-4 border-4 border-primary/20">
                 <MapPin className="text-primary animate-bounce" size={32} />
              </div>
              <p className="text-[10px] font-black text-text-primary uppercase tracking-widest mb-1">Phú Nhuận, Sài Gòn</p>
              <h4 className="text-xs font-bold text-text-secondary">Đang có 12 quán mới chờ bồ khám phá!</h4>
            </div>
          </button>
        </div>

        {/* Featured Suggestions */}
        <div className="pb-10">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-black tracking-tight">Gợi ý hôm nay ✨</h3>
            <button className="text-text-secondary text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">Xem tất cả</button>
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar -mx-8 px-8 pb-4">
            {MOCK_RESTAURANTS.map(r => (
              <RestaurantCard key={r.id} restaurant={r} onClick={() => onSelectRestaurant(r)} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating AI Bubble */}
      <motion.button 
        onClick={onOpenFUT}
        initial={{ scale: 0, y: 100 }} animate={{ scale: 1, y: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
        className="fixed bottom-32 right-6 w-20 h-20 bg-white rounded-full shadow-[0_20px_50px_rgba(232,68,42,0.3)] flex items-center justify-center border-4 border-primary/10 z-40 group"
      >
        <div className="relative">
           <Logo size={65} />
           <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center border-2 border-white shadow-sm">
             <span className="text-[8px] font-black text-white">AI</span>
           </div>
        </div>
        <motion.div 
           animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}
           className="absolute -top-12 bg-white px-3 py-1.5 rounded-2xl shadow-xl border border-zinc-100 hidden group-hover:block"
        >
           <span className="text-[10px] font-black whitespace-nowrap">Cần măm gì hú tui nha! 🍜</span>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

function RestaurantCard({ restaurant, onClick }: { restaurant: Restaurant, onClick: () => void, key?: any }) {
  return (
    <button 
      onClick={onClick}
      className="min-w-[280px] bg-white rounded-2xl shadow-custom overflow-hidden text-left group active:scale-[0.98] transition-all border border-zinc-50"
    >
      <div className="h-36 relative overflow-hidden">
        <img src={restaurant.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 shadow-sm">
          <Star className="text-secondary fill-secondary" size={12} /> {restaurant.rating}
        </div>
        {restaurant.isHiddenGem && (
          <div className="absolute top-3 left-3 bg-primary px-3 py-1 rounded-lg shadow-lg">
             <span className="text-white text-[9px] font-black uppercase tracking-widest">💎 Hidden Gem</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-sm truncate w-[200px]">{restaurant.name}</h4>
          <span className="text-[9px] font-bold text-text-secondary bg-zinc-50 px-2 py-0.5 rounded border border-zinc-100 uppercase">{restaurant.price}</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-text-secondary font-medium">
          <div className="flex items-center gap-1"><MapPin size={12} className="text-text-secondary" /> {restaurant.distance}</div>
          <div className="flex items-center gap-1"><Clock size={12} className="text-text-secondary" /> {restaurant.time}</div>
          <div className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase", restaurant.crowd === 'Đang vắng' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary')}>
             {restaurant.crowd}
          </div>
        </div>
      </div>
    </button>
  );
}
