import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft, MapPin, SlidersHorizontal, History, X, ChevronDown, ArrowUpDown, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SearchDiscoveryProps {
  onBack: () => void;
  onSelectResult: () => void;
}

const QUICK_CHIPS = [
  { id: 'near', label: 'Gần bạn', hasDropdown: true },
  { id: 'dist', label: 'Quận', hasDropdown: true },
  { id: 'price', label: 'Giá', hasDropdown: false },
  { id: 'space', label: 'Không gian', hasDropdown: false },
];

const DISTRICTS = [
  'Gần bạn', 'Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 7', 'Quận 10', 'Bình Thạnh', 'Phú Nhuận', 'Tân Bình', 'Gò Vấp', 'Thủ Đức'
];

export function SearchDiscovery({ onBack, onSelectResult }: SearchDiscoveryProps) {
  const [selectedDistrict, setSelectedDistrict] = useState('Gần bạn');
  const [showDistrictPicker, setShowDistrictPicker] = useState(false);
  const [toggles, setToggles] = useState({
    isOpen: true,
    hasParking: false,
    hasDelivery: true,
    hasPromo: true
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute inset-0 bg-background z-[100] flex flex-col pt-12 overflow-hidden"
    >
      {/* Search Header */}
      <div className="px-6 space-y-6 mb-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 text-zinc-400 active:scale-90 transition-transform"><ChevronLeft size={24} /></button>
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-4 text-primary" size={20} />
            <input 
              autoFocus
              type="text" 
              placeholder="Tìm quán ngon, món xịn..."
              className="w-full h-14 bg-white border border-zinc-100 rounded-2xl pl-12 pr-12 text-sm font-black italic shadow-inner outline-none ring-4 ring-primary/5 border-primary/20"
            />
            <X className="absolute right-4 text-zinc-300" size={18} />
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
          {QUICK_CHIPS.map((chip, i) => (
            <button 
              key={i}
              onClick={() => chip.id === 'dist' && setShowDistrictPicker(true)}
              className={cn(
                "px-4 py-2.5 bg-white border border-zinc-100 rounded-xl flex items-center gap-2 whitespace-nowrap shadow-sm active:scale-95 transition-all",
                chip.id === 'dist' && selectedDistrict !== 'Gần bạn' && "border-primary text-primary bg-primary/5"
              )}
            >
              <span className="text-[11px] font-black">{chip.id === 'dist' ? selectedDistrict : chip.label}</span>
              {chip.hasDropdown && <ChevronDown size={14} className="opacity-40" />}
            </button>
          ))}
          <button className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/10">
            <ArrowUpDown size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-8 pb-32">
        {/* List Selection Group */}
        <div className="space-y-1">
          <FilterRow label="Sắp xếp" value="Đề xuất" icon={ChevronRight} />
          <FilterRow 
            label="Vị trí" 
            value={selectedDistrict === 'Gần bạn' ? "Gần bạn" : selectedDistrict} 
            icon={ChevronRight} 
            onClick={() => setShowDistrictPicker(true)}
          />
          <div className="py-4 border-b border-zinc-50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-text-primary uppercase tracking-widest">Khoảng giá</span>
              <span className="text-[11px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">20k - 100k</span>
            </div>
            <div className="px-2">
               <div className="h-1.5 bg-zinc-100 rounded-full relative">
                  <div className="absolute left-[20%] right-[40%] h-full bg-primary rounded-full">
                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow-lg" />
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow-lg" />
                  </div>
               </div>
            </div>
          </div>
          <FilterRow label="Không gian" value="Tất cả" icon={ChevronRight} />
          <FilterRow label="Độ đông quán" value="Đang vắng" icon={ChevronRight} />
          <FilterRow label="Đánh giá cao" value="4⭐ trở lên" icon={ChevronRight} />
        </div>

        {/* Toggle Switches Group */}
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary px-2 mb-4">Tùy chọn nhanh</p>
          <div className="bg-zinc-50 rounded-[32px] p-2 space-y-1">
            <ToggleRow 
              label="Mở cửa hiện tại" 
              active={toggles.isOpen} 
              onToggle={() => toggle('isOpen')} 
            />
            <ToggleRow 
              label="Chỗ giữ xe (Máy/Ô tô)" 
              active={toggles.hasParking} 
              onToggle={() => toggle('hasParking')} 
            />
            <ToggleRow 
              label="Có giao hàng" 
              active={toggles.hasDelivery} 
              onToggle={() => toggle('hasDelivery')} 
            />
            <ToggleRow 
              label="🎁 Khuyến mãi hấp dẫn" 
              active={toggles.hasPromo} 
              onToggle={() => toggle('hasPromo')} 
              isHot
            />
          </div>
        </div>

        {/* Recent Search (Optional but kept for flavor) */}
        <div className="space-y-4 pt-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary px-2">Tìm kiếm gần đây</h3>
          <div className="flex flex-wrap gap-2">
             {['Bún bò', 'Ốc Q4', 'Cơm tấm đêm'].map(h => (
               <div key={h} className="flex items-center gap-2 bg-white border border-zinc-100 px-4 py-2 rounded-xl text-[11px] font-bold text-text-secondary">
                  <History size={12} />
                  <span>{h}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent pt-10">
        <button 
          onClick={onSelectResult}
          className="w-full h-16 bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] text-white font-black rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <span className="text-lg">Xem kết quả (28)</span>
          <ArrowUpDown size={20} className="rotate-90 opacity-50" />
        </button>
      </div>

      {/* District Picker Bottom Sheet */}
      <AnimatePresence>
        {showDistrictPicker && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDistrictPicker(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] z-[120] p-8 max-h-[70vh] flex flex-col"
            >
              <div className="w-12 h-1.5 bg-zinc-200 rounded-full mx-auto mb-8" />
              <div className="flex justify-between items-center mb-6 px-2">
                <h3 className="text-xl font-black italic">Chọn khu vực</h3>
                <button onClick={() => setShowDistrictPicker(false)} className="p-2 bg-zinc-100 rounded-full text-zinc-400"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-2 gap-3 pb-10">
                {DISTRICTS.map(d => (
                  <button 
                    key={d}
                    onClick={() => {
                      setSelectedDistrict(d);
                      setShowDistrictPicker(false);
                    }}
                    className={cn(
                      "p-4 rounded-2xl border text-sm font-black transition-all text-center",
                      selectedDistrict === d ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-zinc-50 border-zinc-100 text-text-secondary"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FilterRow({ label, value, icon: Icon, onClick }: { label: string, value: string, icon: any, onClick?: () => void }) {
  return (
    <button onClick={onClick} className="w-full py-5 border-b border-zinc-50 flex items-center justify-between group active:opacity-60 transition-all text-left">
      <span className="text-[11px] font-black text-text-secondary uppercase tracking-[0.1em]">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-black text-text-primary">{value}</span>
        <Icon size={18} className="text-zinc-300 group-hover:text-primary transition-colors" />
      </div>
    </button>
  );
}

function ToggleRow({ label, active, onToggle, isHot }: { label: string, active: boolean, onToggle: () => void, isHot?: boolean }) {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-2xl transition-all",
      active ? "bg-white shadow-sm" : "bg-transparent"
    )}>
      <span className={cn(
        "text-[12px] font-black transition-colors",
        active ? "text-text-primary" : "text-text-secondary opacity-60",
        isHot && "text-primary"
      )}>
        {label}
      </span>
      <button 
        onClick={onToggle}
        className={cn(
          "w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner",
          active ? "bg-success" : "bg-zinc-200"
        )}
      >
        <motion.div 
          animate={{ x: active ? 26 : 4 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
        />
      </button>
    </div>
  );
}

