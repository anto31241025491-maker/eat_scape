import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { Logo } from '@/src/components/ui/Logo';

export function SplashScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 bg-primary flex flex-col items-center justify-center text-white"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] overflow-hidden"
      />
      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
        className="z-10 flex flex-col items-center"
      >
        <div className="bg-white p-2 rounded-[40px] shadow-2xl mb-4">
          <Logo size={140} showText={false} />
        </div>
        <h1 className="text-4xl font-black font-display tracking-tight text-white mb-2">EatScape</h1>
        <p className="text-white/80 text-sm font-medium italic">"Vị Việt quanh ta, đi đâu cũng trọn vị nhà."</p>
      </motion.div>
      <div className="absolute bottom-12 w-full flex flex-col items-center gap-4">
        <motion.div 
           initial={{ width: 0 }} animate={{ width: 100 }}
           transition={{ duration: 2, ease: "easeInOut" }}
           className="h-1.5 bg-white/30 rounded-full w-24 relative overflow-hidden"
        >
          <motion.div 
            animate={{ x: [-100, 100] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 bg-white w-1/2"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function LoginScreen({ onLogin, onSignUp }: { onLogin: () => void, onSignUp: () => void }) {
  return (
    <motion.div 
      initial={{ x: 390 }} animate={{ x: 0 }} exit={{ x: -390 }}
      className="absolute inset-0 bg-background flex flex-col pt-4"
    >
      <div className="h-[45vh] relative overflow-hidden">
        <img src="src/assets/images/regenerated_image_1778990184615.png" className="w-full h-full object-cover grayscale-[0.2]" referrerPolicy="no-referrer" />
        <div className="absolute top-4 left-8 right-8">
           <h2 className="text-[23px] w-[297px] pl-[15px] -ml-[5px] mt-[15px] -mb-[3px] pb-[1px] mr-[1px] font-black text-text-primary leading-tight">Chào mừng bồ <br/>đến với <span className="text-primary italic font-serif text-4xl">EatScape!</span> ✨</h2>
        </div>
      </div>
      
      <div className="px-8 flex-1 flex flex-col">
        <div className="space-y-4 pt-4">
          <div className="space-y-3">
             <div className="space-y-1">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-4">Tên đăng nhập / Email</label>
               <input type="text" placeholder="Nhập tên đăng nhập" className="w-full h-14 bg-white border border-zinc-200 rounded-2xl px-6 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm" />
             </div>
             <div className="space-y-1">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-4">Mật khẩu</label>
               <input type="password" placeholder="********" className="w-full h-14 bg-white border border-zinc-200 rounded-2xl px-6 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm" />
             </div>
          </div>
          
          <button onClick={onLogin} className="w-full h-16 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-transform">Đăng nhập</button>
          
          <div className="text-center space-y-6 pt-4">
            <p className="text-sm font-medium text-text-secondary">Chưa có tài khoản? <button onClick={onSignUp} className="text-primary font-bold hover:underline">Đăng ký ngay</button></p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-zinc-100" />
              <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Hoặc qua</span>
              <div className="flex-1 h-px bg-zinc-100" />
            </div>
            <div className="flex justify-center gap-4 pb-12">
              <button className="w-14 h-14 rounded-2xl border border-zinc-100 bg-white flex items-center justify-center shadow-sm">
                <img src="https://www.google.com/favicon.ico" className="w-6 h-6" referrerPolicy="no-referrer" />
              </button>
              <button className="w-14 h-14 rounded-2xl border border-zinc-100 bg-white flex items-center justify-center shadow-sm">
                <img src="https://www.facebook.com/favicon.ico" className="w-6 h-6" referrerPolicy="no-referrer" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SignUpScreen({ onBack, onSignUp }: { onBack: () => void, onSignUp: () => void }) {
  return (
    <motion.div initial={{ x: 390 }} animate={{ x: 0 }} exit={{ x: -390 }} className="absolute inset-0 bg-background flex flex-col p-8 pt-20 no-scrollbar overflow-y-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center">
           <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">Tạo tài khoản</h2>
      </div>

      <div className="space-y-4">
         <input type="text" placeholder="Họ và tên" className="w-full h-14 bg-white border border-zinc-200 rounded-xl px-4 outline-none" />
         <input type="tel" placeholder="Số điện thoại" className="w-full h-14 bg-white border border-zinc-200 rounded-xl px-4 outline-none" />
         <input type="password" placeholder="Mật khẩu" className="w-full h-14 bg-white border border-zinc-200 rounded-xl px-4 outline-none" />
         <input type="password" placeholder="Xác nhận mật khẩu" className="w-full h-14 bg-white border border-zinc-200 rounded-xl px-4 outline-none" />
         <button onClick={onSignUp} className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg mt-4">Tiếp tục</button>
      </div>
    </motion.div>
  );
}
