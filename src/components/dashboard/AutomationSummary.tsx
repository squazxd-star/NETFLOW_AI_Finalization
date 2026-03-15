import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, Clock, Package, Image as ImageIcon, Video, Smartphone, XCircle, CheckCircle2 } from 'lucide-react';

// ตัวเลขวิ่งจาก 0 ไปถึงเป้าหมาย (Rolling Counter)
const NumberTicker = ({ value }: { value: string | number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString());
    if (isNaN(end)) return;

    const duration = 1.5; // วิ่ง 1.5 วินาที
    const fps = 60;
    const steps = duration * fps;
    const increment = end / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      start += increment;
      currentStep++;
      if (currentStep >= steps || start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.ceil(start));
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
};

interface AutomationSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    products: number;
    images: number;
    videos: number;
    tiktokPosts: number;
    success: number;
    failed: number;
  };
  duration: string; // e.g. "11 นาที 46 วินาที"
}

export const AutomationSummary: React.FC<AutomationSummaryProps> = ({ isOpen, onClose, stats, duration }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger Confetti when modal is fully visible
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const end = Date.now() + 1.5 * 1000;
        const colors = ['#22c55e', '#a855f7', '#3b82f6', '#ec4899']; // Netflow Brand Colors

        (function frame() {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      }, 500); // Wait for entrance animation
    }
  }, [isOpen]);

  // Spotlight Effect State
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  if (!isOpen) return null;

  // Animation Variants สำหรับการเรียงลำดับโผล่
  const overlayVars = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(16px)", transition: { duration: 0.4 } },
    exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3 } }
  };

  const containerVars = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 25,
        staggerChildren: 0.1, 
        delayChildren: 0.2 
      }
    },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
    }
  };

  const statCards = [
    { label: 'ชุดสินค้า', value: stats.products, color: 'text-green-400', bg: 'bg-green-400/5', border: 'border-green-400/20', icon: Package },
    { label: 'ภาพที่สร้าง', value: stats.images, color: 'text-pink-400', bg: 'bg-pink-400/5', border: 'border-pink-400/20', icon: ImageIcon },
    { label: 'คลิปวิดีโอ', value: stats.videos, color: 'text-purple-400', bg: 'bg-purple-400/5', border: 'border-purple-400/20', icon: Video },
    { label: 'โพสต์ TikTok', value: stats.tiktokPosts, color: 'text-blue-400', bg: 'bg-blue-400/5', border: 'border-blue-400/20', icon: Smartphone },
    { label: 'สำเร็จ', value: stats.success, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/30', icon: CheckCircle2 },
    { label: 'เฟล', value: stats.failed, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: XCircle },
  ];

  return (
    <AnimatePresence>
      <motion.div 
        variants={overlayVars}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xl"
      >
        {/* Background Glow Mesh */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          variants={containerVars}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-lg p-8 border border-white/10 rounded-[32px] bg-neutral-900/60 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Spotlight Effect */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-50"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34,197,94,0.08), transparent 40%)`
            }}
          />

          {/* Shimmer Border Effect */}
          <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-transparent via-green-500/20 to-transparent animate-shimmer-sweep pointer-events-none" />

          {/* Header Section */}
          <motion.div variants={itemVars} className="text-center mb-8 relative z-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3, stiffness: 200, damping: 15 }}
              className="inline-flex p-4 rounded-2xl bg-green-500/20 mb-4 shadow-[0_0_30px_rgba(34,197,94,0.3)] border border-green-500/30"
            >
               <Check className="w-10 h-10 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]" strokeWidth={3} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white tracking-tight">เสร็จเรียบร้อย!</h2>
            <p className="text-neutral-400 mt-2 font-medium text-sm">ทำคลิปต่อไปได้เลยครับ</p>
            <div className="text-xs text-neutral-500 mt-1 flex items-center justify-center gap-2">
               <Clock className="w-3 h-3" />
               {new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
            {statCards.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVars}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }}
                className={`p-5 rounded-2xl border ${stat.border} ${stat.bg} flex flex-col items-center justify-center transition-colors duration-300 relative group overflow-hidden`}
              >
                {/* Icon for each stat card (subtle background) */}
                <stat.icon className={`absolute -right-2 -bottom-2 w-16 h-16 opacity-5 ${stat.color} group-hover:opacity-10 transition-opacity duration-300 transform -rotate-12`} />
                
                <div className="flex flex-col items-center gap-1 z-10">
                  <span className={`text-3xl font-black ${stat.color} mb-1 drop-shadow-md`}>
                    <NumberTicker value={stat.value} />
                  </span>
                  <div className="flex items-center gap-1.5">
                    <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                    <span className="text-xs font-medium text-neutral-400">{stat.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Duration Footer */}
          <motion.div variants={itemVars} className="flex items-center justify-center space-x-3 text-neutral-400 mb-8 bg-black/40 py-3.5 rounded-xl border border-white/5 relative z-10">
             <Clock className="w-4 h-4 text-green-400" />
             <span className="text-sm font-medium tracking-wide">ระยะเวลาทำงาน: <span className="text-green-400 font-bold ml-1">{duration}</span></span>
          </motion.div>

          {/* Ultra Button */}
          <motion.button
            variants={itemVars}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(74,222,128,0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-green-400 to-green-500 hover:from-green-300 hover:to-green-400 text-black font-bold text-lg shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all relative z-10 group overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              ปิด
            </span>
            {/* Button Shine Effect */}
            <div className="absolute inset-0 group-hover:animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
