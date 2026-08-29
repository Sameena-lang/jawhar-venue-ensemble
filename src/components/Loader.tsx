import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface JawharLoadingScreenProps {
  onComplete: () => void;
}

export function JawharLoadingScreen({ onComplete }: JawharLoadingScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [sequenceComplete, setSequenceComplete] = useState(false);

  useEffect(() => {
    // The loading sequence takes roughly 3.2s to fully reveal.
    // We let it play before indicating readiness to exit.
    const timer = setTimeout(() => {
      setSequenceComplete(true);
      onComplete();
    }, prefersReducedMotion ? 500 : 3200);

    return () => clearTimeout(timer);
  }, [onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#C8DDD1]"
      >
        <img src="/favicon.png" alt="Jawhar Groups Crest" className="w-24 h-24 mb-4 object-contain" />
        <h1 className="text-[#1A342B] font-display text-2xl">Jawhar Group</h1>
      </motion.div>
    );
  }

  return (
    <motion.div
      // Background dissolves last (delay 0.6s)
      exit={{ opacity: 0, transition: { delay: 0.6, duration: 0.8, ease: "easeOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#C8DDD1] overflow-hidden"
    >
      {/* Soft Ivory Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-[#F8F5ED] opacity-[0.6] blur-[100px]" />
      </div>

      {/* Subtle Corner Leaves (Botanical Shadows) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <svg className="absolute -top-10 -right-10 w-64 h-64 text-[#A8C5B3]" viewBox="0 0 100 100" fill="currentColor">
          <path d="M 10 90 Q 50 10 90 10 Q 90 50 10 90 Z" />
          <path d="M 20 80 Q 70 20 95 30 Q 80 80 20 80 Z" />
        </svg>
        <svg className="absolute -bottom-10 -left-10 w-64 h-64 text-[#A8C5B3]" viewBox="0 0 100 100" fill="currentColor">
          <path d="M 90 10 Q 50 90 10 90 Q 10 50 90 10 Z" />
          <path d="M 80 20 Q 30 80 5 70 Q 20 20 80 20 Z" />
        </svg>
      </div>

      {/* Subtle Ornamentation Container */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 pointer-events-none border border-[#B89A57]/30 flex items-center justify-center">
        {/* Top Center Diamond */}
        <div className="absolute top-0 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#B89A57]" />
        {/* Bottom Center Diamond */}
        <div className="absolute bottom-0 translate-y-1/2 w-2 h-2 rotate-45 bg-[#B89A57]" />
        
        {/* Corner Ornaments */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#B89A57]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#B89A57]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#B89A57]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#B89A57]" />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center z-10 w-full max-w-sm px-6">
        
        {/* Welcome To */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { delay: 0.5, duration: 0.3 } }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-[1px] w-10 bg-[#B89A57]/60 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 border border-[#B89A57]" />
          </div>
          <span className="font-display italic text-[#1A342B]/80 text-sm tracking-widest">
            Welcome to
          </span>
          <div className="h-[1px] w-10 bg-[#B89A57]/60 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45 border border-[#B89A57]" />
          </div>
        </motion.div>

        {/* Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.96, transition: { delay: 0.5, duration: 0.4 } }}
          transition={{ delay: 0.45, duration: 1, ease: "easeOut" }}
          className="mb-4"
        >
          <img src="/favicon.png" alt="Jawhar Crest" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
        </motion.div>

        {/* Brand Name */}
        <div className="flex flex-row items-center gap-3 mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { delay: 0.4, duration: 0.4 } }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            className="text-[#82202B] font-display text-4xl sm:text-5xl font-semibold tracking-wide"
          >
            Jawhar
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { delay: 0.4, duration: 0.4 } }}
            transition={{ delay: 1.25, duration: 0.8, ease: "easeOut" }}
            className="text-[#82202B] font-display text-4xl sm:text-5xl font-semibold tracking-wide"
          >
            Group
          </motion.h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.3 } }}
          transition={{ delay: 1.65, duration: 0.8, ease: "easeInOut" }}
          className="h-[1px] w-full max-w-[240px] bg-[#B89A57] mb-6"
        />

        {/* PERFECT WEDDING */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.3 } }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="text-[#1A342B] font-display text-xs sm:text-sm tracking-[0.4em] uppercase mb-4"
        >
          Perfect Wedding
        </motion.p>

        {/* CREATING MEMORABLE CELEBRATIONS */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.3 } }}
          transition={{ delay: 2.35, duration: 0.8 }}
          className="text-[#1A342B]/80 text-[0.55rem] sm:text-[0.6rem] tracking-[0.3em] uppercase mb-8 text-center max-w-[280px]"
        >
          Creating Memorable Celebrations
        </motion.p>

        {/* Gold Loading Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.1, duration: 0.3 } }}
          transition={{ delay: 2.7, duration: 0.8 }}
          className="w-[120px] h-[1px] bg-[#1A342B]/10 relative overflow-hidden mb-3"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              delay: 3.0, 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 w-1/2 h-full bg-[#B89A57]"
          />
        </motion.div>

        {/* LOADING... text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0, duration: 0.3 } }}
          transition={{ delay: 3.0, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-2.5 h-2.5 rounded-full border border-[#B89A57] border-t-transparent animate-spin" />
          <span className="text-[#1A342B]/70 text-[0.5rem] tracking-[0.2em] uppercase">
            Loading...
          </span>
        </motion.div>

      </div>
    </motion.div>
  );
}
