import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface JawharLoadingScreenProps {
  onComplete: () => void;
}

export function JawharLoadingScreen({ onComplete }: JawharLoadingScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [minimumDurationComplete, setMinimumDurationComplete] = useState(false);
  const [appReady, setAppReady] = useState(false);

  // Handle App Readiness
  useEffect(() => {
    if (document.readyState === 'complete') {
      setAppReady(true);
    } else {
      const handleLoad = () => setAppReady(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Handle Minimum Duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumDurationComplete(true);
    }, prefersReducedMotion ? 500 : 7000); // 7 seconds minimum duration

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Combine conditions
  useEffect(() => {
    if (minimumDurationComplete && appReady) {
      onComplete();
    }
  }, [minimumDurationComplete, appReady, onComplete]);

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

  // Letter by letter animation for JAWHAR
  const jawharLetters = "JAWHAR".split("");
  
  return (
    <motion.div
      // Background dissolves last
      exit={{ opacity: 0, transition: { delay: 0.6, duration: 0.8, ease: "easeOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#C8DDD1] overflow-hidden"
    >
      {/* 0.0 - 0.8: Soft Ivory Glow fades in */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-[#F8F5ED] blur-[100px]" />
      </motion.div>

      {/* Subtle Gold Grain (opacity animation) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23B89A57' opacity='0.2'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <div className="relative flex flex-col items-center z-10 w-full max-w-sm px-6">
        
        {/* 0.8 - 1.8: Reveal Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.4 } }}
          transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.1, 0.25, 1] }} // smooth cinematic ease-out
          className="mb-6"
        >
          <img src="/favicon.png" alt="Jawhar Crest" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
        </motion.div>

        {/* Brand Name */}
        <div className="flex flex-col items-center mb-6">
          {/* 1.8 - 2.8: Reveal JAWHAR */}
          <div className="flex overflow-hidden">
            {jawharLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                transition={{ 
                  delay: 1.8 + (i * 0.1), // Staggered letter reveal
                  duration: 0.8, 
                  ease: "easeOut" 
                }}
                className="text-[#1A342B] font-display text-4xl sm:text-5xl font-normal tracking-[0.1em]"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          {/* 2.8 - 3.6: Reveal GROUP */}
          <motion.h2
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
            className="text-[#1A342B] font-display text-3xl sm:text-4xl font-normal tracking-wide mt-2"
          >
            GROUP
          </motion.h2>
        </div>

        {/* 3.6 - 4.3: Divider and PERFECT WEDDING */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ delay: 3.6, duration: 0.7, ease: "easeInOut" }} // Animate from center outward
          className="h-[1px] w-full max-w-[240px] bg-[#B89A57] mb-6 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ delay: 3.8, duration: 0.5 }}
          className="text-[#B89A57] font-display text-sm sm:text-base tracking-[0.4em] uppercase mb-5"
        >
          Perfect Wedding
        </motion.p>

        {/* 4.3 - 5.2: CREATING MEMORABLE CELEBRATIONS */}
        <motion.p
          initial={{ opacity: 0, y: 15 }} // Fade upward 15px
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ delay: 4.3, duration: 0.9, ease: "easeOut" }}
          className="text-[#1A342B]/80 text-[0.65rem] sm:text-[0.7rem] tracking-[0.3em] uppercase mb-10 text-center max-w-[320px]"
        >
          Creating Memorable Celebrations
        </motion.p>

        {/* 5.2 - 6.2: Loading Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ delay: 5.2, duration: 1.0 }}
          className="w-[180px] h-[1px] bg-[#B89A57]/20 relative overflow-hidden mb-4"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              delay: 5.2, 
              duration: 2.0, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-[#F8F5ED] to-transparent shadow-[0_0_8px_#F8F5ED]" // glowing point effect
          />
        </motion.div>

        {/* 6.2 - 7.0: LOADING... */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ delay: 6.2, duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <div className="w-3 h-3 rounded-full border-[1.5px] border-[#B89A57]/30 border-t-[#B89A57] animate-spin" />
          <span className="text-[#B89A57] text-[0.55rem] tracking-[0.25em] uppercase">
            Loading...
          </span>
        </motion.div>

      </div>
    </motion.div>
  );
}

