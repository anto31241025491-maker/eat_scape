import { motion } from 'motion/react';
import { ChevronLeft, MapPin, Star, Search } from 'lucide-react';
import { Restaurant } from '@/src/types';
import { cn } from '@/src/lib/utils';

export const SEARCH_RESULTS: Restaurant[] = [
  {
    id: 101,
    name: 'Quán Quê Hương',
    image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?q=80&w=400',
    rating: 4.9,
    reviews: 234,
    distance: '350m',
    time: '5 phút',
    tags: ['📍 350m', '🟢 Đang vắng'],
    price: '~55k',
    crowd: 'Đang vắng',
    isVerified: true
  },
  {
    id: 102,
    name: 'Quán Local',
    image: '/src/assets/images/regenerated_image_1778995364358.webp',
    rating: 4.7,
    reviews: 120,
    distance: '520m',
    time: '8 phút',
    tags: ['📍 520m', '🔴 Đang đông'],
    price: '~45k',
    crowd: 'Đang đông',
    isVerified: true
  },
  {
    id: 103,
    name: 'Quán Ăn Đêm',
    image: '/src/assets/images/regenerated_image_1778995366377.jpg',
    rating: 4.6,
    reviews: 80,
    distance: '680m',
    time: '10 phút',
    tags: ['📍 680m', '🟡 Bình thường'],
    price: '~60k',
    crowd: 'Bình thường',
    isVerified: true
  },
  {
    id: 104,
    name: 'Quán Góc Phố',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400',
    rating: 4.8,
    reviews: 156,
    distance: '910m',
    time: '12 phút',
    tags: ['📍 910m', '🟢 Đang vắng'],
    price: '~75k',
    crowd: 'Đang vắng',
    isVerified: true
  },
  {
    id: 105,
    name: 'Quán Đồng Hương',
    image: '/src/assets/images/regenerated_image_1778995367719.jpg',
    rating: 4.5,
    reviews: 42,
    distance: '1.2km',
    time: '15 phút',
    tags: ['📍 1.2km', '🟢 Đang vắng'],
    price: '~65k',
    crowd: 'Đang vắng',
    isVerified: true
  }
];

export function RestaurantListScreen({ query, onBack, onSelect }: { query: string, onBack: () => void, onSelect: (r: Restaurant) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-background flex flex-col no-scrollbar overflow-y-auto">
      <div className="h-[45vh] relative overflow-hidden flex flex-col justify-center px-8">
        <img src="https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800" className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        
        <div className="relative z-10 space-y-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-text-primary">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-sm font-black text-text-secondary uppercase tracking-widest">Kết quả tìm kiếm cho:</h2>
            <h1 className="text-3xl font-black text-primary italic font-serif">"{query || 'Món ngon'}"</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 space-y-6 mt-8 relative z-20 pb-12">
        <div className="flex justify-between items-center bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-zinc-100 shadow-sm">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Search size={14} />
             </div>
             <div className="text-sm font-bold text-text-primary">{query || 'Tìm quán ngon khác...'}</div>
           </div>
        </div>

        <div className="space-y-4">
          {SEARCH_RESULTS.map(r => (
            <SearchCard key={r.id} restaurant={r} onClick={() => onSelect(r)} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SearchCard({ restaurant, onClick }: { restaurant: Restaurant, onClick: () => void, key?: any }) {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-white rounded-[32px] p-4 flex gap-4 border border-zinc-100 shadow-custom active:scale-95 transition-all group overflow-hidden relative"
    >
      <div className="w-24 h-24 rounded-2xl overflow-hidden relative shadow-inner">
        <img src={restaurant.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="flex-1 text-left space-y-2">
        <div className="flex justify-between items-start">
          <h4 className="font-black text-sm text-text-primary group-hover:text-primary transition-colors">{restaurant.name}</h4>
          <div className="flex items-center gap-1">
             <Star className="text-secondary fill-secondary" size={12} />
             <span className="text-[10px] font-black">{restaurant.rating}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
           {restaurant.tags.map(tag => (
             <span key={tag} className="px-2 py-0.5 bg-zinc-50 border border-zinc-100 rounded-md text-[8px] font-black text-text-secondary uppercase tracking-widest">{tag}</span>
           ))}
        </div>

        <div className="flex items-center gap-4 pt-1">
           <div className="flex items-center gap-1 text-[10px] font-bold text-text-secondary">
             <MapPin size={10} /> {restaurant.distance}
           </div>
           <div className={cn("px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest", 
             restaurant.crowd === 'Đang vắng' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary')}>
             {restaurant.crowd}
           </div>
        </div>
      </div>
    </button>
  );
}
