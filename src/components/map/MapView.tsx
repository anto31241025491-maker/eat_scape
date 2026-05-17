import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Search, 
  Navigation, 
  Star, 
  X,
  Layers,
  Compass,
  Locate
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Restaurant } from '@/src/types';
import { MOCK_RESTAURANTS } from '@/src/components/home/Home';

interface MapViewProps {
  onBack: () => void;
  onSelectRestaurant: (r: Restaurant) => void;
}

export function MapView({ onBack, onSelectRestaurant }: MapViewProps) {
  const [selectedRest, setSelectedRest] = useState<Restaurant | null>(null);
  const [isGpsActive, setIsGpsActive] = useState(false);

  // Mock markers around a center point
  const markers = [
    { id: 1, x: 45, y: 35, restaurant: MOCK_RESTAURANTS[0] },
    { id: 2, x: 65, y: 55, restaurant: MOCK_RESTAURANTS[1] },
    { id: 3, x: 25, y: 65, name: 'Bún bò Gốc Huế', rating: 4.8, type: 'special' },
    { id: 4, x: 75, y: 25, name: 'Cà phê Hẻm', rating: 4.6, type: 'hidden' },
    { id: 5, x: 35, y: 80, name: 'Bánh xèo Cô Ba', rating: 4.7, type: 'local' },
  ];

  useEffect(() => {
    // Simulate finding GPS
    const timer = setTimeout(() => setIsGpsActive(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[100] bg-zinc-950 text-white overflow-hidden flex flex-col font-sans"
    >
      {/* Map Background (Styled Mock) */}
      <div className="absolute inset-0 overflow-hidden bg-[#1E1E1E]">
        {/* Simple Grid/Line Mockup of Sài Gòn Streets */}
        <svg className="w-full h-full opacity-20" viewBox="0 0 400 800">
           <path d="M0 200 L400 250" stroke="white" strokeWidth="2" fill="none" />
           <path d="M100 0 L150 800" stroke="white" strokeWidth="2" fill="none" />
           <path d="M0 450 L400 400" stroke="white" strokeWidth="2" fill="none" />
           <path d="M300 0 L250 800" stroke="white" strokeWidth="2" fill="none" />
           <circle cx="200" cy="400" r="150" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 4" />
        </svg>

        {/* Floating User Location (Pulse) */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
           <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 w-12 h-12 -ml-6 -mt-6 bg-primary rounded-full blur-xl"
              />
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border-4 border-primary shadow-2xl relative z-10">
                 <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              </div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                 <span className="text-[10px] font-black whitespace-nowrap">Bạn đang ở đây 📍</span>
              </div>
           </div>
        </div>

        {/* GPS Scan Effect */}
        <AnimatePresence>
          {!isGpsActive && (
            <motion.div 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/5 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="flex flex-col items-center gap-4">
                 <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Đang định vị GPS...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Markers */}
        {isGpsActive && markers.map((m) => (
          <motion.button
            key={m.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: m.id * 0.1 }}
            onClick={() => {
              if (m.restaurant) setSelectedRest(m.restaurant);
              else setSelectedRest({
                id: m.id,
                name: m.name || '',
                rating: m.rating || 4.5,
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=300',
                reviews: 42,
                distance: '150m',
                time: '2 phút',
                tags: ['Đang hot', 'Chuẩn vị'],
                price: '~40k',
                crowd: 'Đang vắng',
                isVerified: true
              });
            }}
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            className="absolute z-30 group"
          >
            <div className={cn(
              "p-2 rounded-2xl shadow-2xl border transition-all active:scale-90",
              selectedRest?.id === m.id ? "bg-primary border-primary scale-125" : "bg-white/90 backdrop-blur-md border-white/50"
            )}>
              {m.type === 'hidden' ? (
                <div className="text-secondary text-lg">💎</div>
              ) : m.type === 'special' ? (
                <div className="text-amber-500 text-lg">🏅</div>
              ) : (
                <MapPin size={24} className={cn(selectedRest?.id === m.id ? "text-white" : "text-primary")} />
              )}
            </div>
            {/* Tooltip on hover/active */}
            <div className={cn(
               "absolute translate-y-[-120%] left-1/2 -translate-x-1/2 pointer-events-none transition-all",
               selectedRest?.id === m.id ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}>
               <div className="bg-white px-4 py-2 rounded-2xl shadow-2xl border border-zinc-100 min-w-[120px]">
                  <p className="text-[10px] font-black text-text-primary whitespace-nowrap">{m.restaurant?.name || m.name}</p>
                  <div className="flex items-center gap-1">
                     <Star size={10} className="text-secondary fill-secondary" />
                     <span className="text-[9px] font-bold text-text-secondary">{m.restaurant?.rating || m.rating}</span>
                  </div>
               </div>
               <div className="w-3 h-3 bg-white rotate-45 mx-auto -mt-1.5 border-r border-b border-zinc-100" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Overlays */}
      {/* Header */}
      <div className="relative z-[60] px-6 pt-16 flex items-center justify-between pointer-events-none">
        <button 
          onClick={onBack}
          className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-transform pointer-events-auto shadow-2xl"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex-1 max-w-[200px] mx-4 pointer-events-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className="relative h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center px-4 gap-3">
              <Search size={18} className="text-white/40" />
              <input 
                type="text" 
                placeholder="Tìm quanh đây..." 
                className="bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/30 w-full"
              />
            </div>
          </div>
        </div>

        <button className="w-12 h-12 bg-white text-zinc-900 rounded-2xl flex items-center justify-center shadow-2xl pointer-events-auto active:scale-95 transition-transform">
           <Navigation size={24} />
        </button>
      </div>

      {/* Floating Controls */}
      <div className="absolute right-6 top-[50%] flex flex-col gap-3 z-50">
        <button className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white shadow-xl active:scale-95 transition-transform">
           <Layers size={20} />
        </button>
        <button className="w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white shadow-xl active:scale-95 transition-transform">
           <Compass size={20} />
        </button>
        <button className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 active:scale-95 transition-transform">
           <Locate size={20} />
        </button>
      </div>

      {/* Bottom Info Card */}
      <AnimatePresence>
        {selectedRest && (
          <motion.div 
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="absolute bottom-10 left-6 right-6 z-[70]"
          >
            <div className="bg-white rounded-[32px] p-2 shadow-2xl border border-zinc-100 relative group overflow-hidden">
               <button 
                onClick={() => setSelectedRest(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 z-10 hover:bg-zinc-200 transition-colors"
               >
                 <X size={16} />
               </button>

               <div className="flex gap-4">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden border border-zinc-100 flex-shrink-0">
                    <img src={selectedRest.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                  </div>
                  <div className="flex-1 py-2 pr-10 flex flex-col justify-between">
                     <div>
                        <h4 className="text-zinc-900 font-bold text-base leading-tight mb-1">{selectedRest.name}</h4>
                        <div className="flex items-center gap-1.5 mb-2">
                           <div className="flex items-center gap-0.5 text-secondary">
                              <Star size={12} fill="currentColor" />
                              <span className="text-[10px] font-black">{selectedRest.rating}</span>
                           </div>
                           <span className="text-[10px] text-zinc-300 font-medium">•</span>
                           <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{selectedRest.price}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                           {selectedRest.tags.slice(0, 2).map(t => (
                             <span key={t} className="text-[8px] font-black bg-zinc-50 text-zinc-500 px-2.5 py-1 rounded-lg uppercase border border-zinc-100">{t}</span>
                           ))}
                        </div>
                     </div>
                     
                     <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                           <div className="flex items-center gap-1 text-primary">
                              <MapPin size={12} />
                              <span className="text-[10px] font-bold">{selectedRest.distance}</span>
                           </div>
                           <div className="bg-success/5 text-success text-[10px] font-black px-2 py-0.5 rounded-lg border border-success/10 uppercase tracking-tighter">
                              {selectedRest.crowd}
                           </div>
                        </div>
                        <button 
                          onClick={() => onSelectRestaurant(selectedRest)}
                          className="bg-primary text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                        >
                           Chi tiết
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Sài Gòn Vibes */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-40">
         <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/40">Radar: Quận Phú Nhuận • Đang mở cửa</p>
      </div>
    </motion.div>
  );
}
