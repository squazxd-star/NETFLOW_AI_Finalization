import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Activity, Check, CheckCircle2, Clock, Image as ImageIcon, Layers3, LoaderCircle, MonitorPlay, Package, Smartphone, Sparkles, Video, XCircle } from 'lucide-react';

// ตัวเลขวิ่งจาก 0 ไปถึงเป้าหมาย (Rolling Counter)
const NumberTicker = ({ value }: { value: string | number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const rawValue = value.toString();
  const end = parseInt(rawValue, 10);
  const isNumeric = !isNaN(end);

  useEffect(() => {
    let start = 0;
    if (!isNumeric) return;

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
  }, [end, isNumeric]);

  return <span>{isNumeric ? displayValue : rawValue}</span>;
};

interface AutomationSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    products: number;
    plannedClips: number;
    images: number;
    videos: number;
    tiktokQueued: number;
    tiktokPosts: number;
    tiktokFailed: number;
    youtubeQueued: number;
    youtubeUploads: number;
    youtubeFailed: number;
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

  const socialPending = stats.tiktokQueued + stats.youtubeQueued;
  const plannedClipsLabel = stats.plannedClips < 0 ? '∞' : stats.plannedClips.toString();
  const plannedClipsValue = stats.plannedClips > 0 ? stats.plannedClips : Math.max(stats.videos, 1);
  const clipProgressPercent = stats.plannedClips > 0
    ? Math.min(100, Math.round((stats.videos / Math.max(stats.plannedClips, 1)) * 100))
    : (stats.videos > 0 ? 100 : 0);
  const headerTitle = socialPending > 0
    ? 'เรนเดอร์เสร็จแล้ว'
    : stats.failed > 0
      ? 'เสร็จพร้อมจุดที่ต้องเช็ก'
      : 'เสร็จสมบูรณ์!';
  const headerSubtitle = socialPending > 0
    ? 'กำลังส่งต่อไป TikTok / YouTube แบบอัตโนมัติ'
    : stats.failed > 0
      ? 'ตรวจสอบรายการที่ล้มเหลวจากสรุปด้านล่าง'
      : 'ทุกขั้นตอนหลักทำงานครบเรียบร้อยแล้ว';

  const statCards = [
    { label: 'ชุดสินค้า', value: stats.products, helper: 'อินพุตที่ใช้สร้างงาน', color: 'text-emerald-300', bg: 'bg-emerald-400/8', border: 'border-emerald-400/20', icon: Package },
    { label: 'เป้าหมายคลิป', value: plannedClipsLabel, helper: 'จำนวนรอบที่ตั้งไว้', color: 'text-cyan-300', bg: 'bg-cyan-400/8', border: 'border-cyan-400/20', icon: Layers3 },
    { label: 'ภาพที่สร้าง', value: stats.images, helper: 'อัปเดตตามคลิปที่จบจริง', color: 'text-fuchsia-300', bg: 'bg-fuchsia-400/8', border: 'border-fuchsia-400/20', icon: ImageIcon },
    { label: 'คลิปวิดีโอ', value: stats.videos, helper: 'เรนเดอร์สำเร็จแล้ว', color: 'text-violet-300', bg: 'bg-violet-400/8', border: 'border-violet-400/20', icon: Video },
    { label: 'TikTok สำเร็จ', value: stats.tiktokPosts, helper: `รอส่งต่อ ${stats.tiktokQueued} | เฟล ${stats.tiktokFailed}`, color: 'text-sky-300', bg: 'bg-sky-400/8', border: 'border-sky-400/20', icon: Smartphone },
    { label: 'YouTube สำเร็จ', value: stats.youtubeUploads, helper: `รอส่งต่อ ${stats.youtubeQueued} | เฟล ${stats.youtubeFailed}`, color: 'text-rose-300', bg: 'bg-rose-400/8', border: 'border-rose-400/20', icon: MonitorPlay },
    { label: 'สำเร็จรวม', value: stats.success, helper: 'นับจากงานเรนเดอร์ที่จบจริง', color: 'text-green-300', bg: 'bg-green-400/8', border: 'border-green-400/20', icon: CheckCircle2 },
    { label: 'ปัญหารวม', value: stats.failed, helper: 'รวม TikTok / YouTube / ระบบ', color: 'text-red-300', bg: 'bg-red-400/8', border: 'border-red-400/20', icon: XCircle },
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
        
        <motion.div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          variants={containerVars}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-3xl p-6 md:p-8 border border-white/10 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_35%),linear-gradient(180deg,rgba(10,14,24,0.98),rgba(7,10,18,0.96))] backdrop-blur-2xl shadow-2xl overflow-hidden"
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
               {socialPending > 0 ? (
                 <LoaderCircle className="w-10 h-10 text-cyan-300 drop-shadow-[0_0_15px_rgba(103,232,249,0.8)] animate-spin" strokeWidth={2.5} />
               ) : (
                 <Check className="w-10 h-10 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]" strokeWidth={3} />
               )}
            </motion.div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{headerTitle}</h2>
            <p className="text-neutral-400 mt-2 font-medium text-sm">{headerSubtitle}</p>
            <div className="text-xs text-neutral-500 mt-1 flex items-center justify-center gap-2">
               <Clock className="w-3 h-3" />
               {new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
            <motion.div
              variants={itemVars}
              className="rounded-[28px] border border-emerald-400/20 bg-emerald-400/8 p-5 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_35%)] pointer-events-none" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-emerald-200/70">
                    <Sparkles className="w-3.5 h-3.5" />
                    Render Summary
                  </div>
                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-5xl font-black text-white leading-none">
                      <NumberTicker value={stats.videos} />
                    </span>
                    <div className="pb-1">
                      <div className="text-sm font-semibold text-emerald-200">คลิปจบแล้ว</div>
                      <div className="text-xs text-emerald-100/60">{stats.images} ภาพอ้างอิงผลลัพธ์</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-right">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">เป้าหมาย</div>
                  <div className="text-xl font-bold text-cyan-200">
                    {stats.videos}/<NumberTicker value={plannedClipsLabel} />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-[11px] text-white/55">
                  <span>ความคืบหน้า Automation</span>
                  <span>{clipProgressPercent}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${clipProgressPercent}%` }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400 shadow-[0_0_18px_rgba(45,212,191,0.45)]"
                  />
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                  <Activity className="w-3.5 h-3.5 text-emerald-300" />
                  {stats.products} ชุดสินค้า | {plannedClipsValue} รอบที่ระบบตั้งไว้
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVars}
              className="rounded-[28px] border border-cyan-400/20 bg-cyan-400/8 p-5 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_35%)] pointer-events-none" />
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-cyan-100/70">
                    <MonitorPlay className="w-3.5 h-3.5" />
                    Social Distribution
                  </div>
                  <div className="mt-3 flex items-end gap-3">
                    <span className="text-5xl font-black text-white leading-none">
                      <NumberTicker value={socialPending} />
                    </span>
                    <div className="pb-1">
                      <div className="text-sm font-semibold text-cyan-100">งานค้างส่งต่อ</div>
                      <div className="text-xs text-cyan-100/60">อัปเดตสดเมื่อ TikTok/YouTube จบงาน</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-right">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">สำเร็จรวม</div>
                  <div className="text-xl font-bold text-green-200">
                    <NumberTicker value={stats.tiktokPosts + stats.youtubeUploads} />
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Smartphone className="w-4 h-4 text-sky-300" />
                    TikTok
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">{stats.tiktokPosts} สำเร็จ</div>
                    <div className="text-[11px] text-white/45">รอ {stats.tiktokQueued} | เฟล {stats.tiktokFailed}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <MonitorPlay className="w-4 h-4 text-rose-300" />
                    YouTube
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">{stats.youtubeUploads} สำเร็จ</div>
                    <div className="text-[11px] text-white/45">รอ {stats.youtubeQueued} | เฟล {stats.youtubeFailed}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
            {statCards.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVars}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                className={`p-4 rounded-[22px] border ${stat.border} ${stat.bg} flex flex-col items-start justify-between transition-colors duration-300 relative group overflow-hidden min-h-[122px]`}
              >
                <stat.icon className={`absolute -right-2 -bottom-2 w-16 h-16 opacity-5 ${stat.color} group-hover:opacity-10 transition-opacity duration-300 transform -rotate-12`} />
                
                <div className="flex items-center justify-between w-full z-10">
                  <div className={`inline-flex p-2 rounded-2xl border border-white/8 bg-black/20 ${stat.color}`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-3xl font-black ${stat.color} mb-1 drop-shadow-md`}>
                    <NumberTicker value={stat.value} />
                  </span>
                </div>
                <div className="z-10 mt-4">
                  <div className="text-sm font-semibold text-white">{stat.label}</div>
                  <div className="text-[11px] text-neutral-400 mt-1">{stat.helper}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Duration Footer */}
          <motion.div variants={itemVars} className="grid grid-cols-3 gap-3 text-neutral-400 mb-8 relative z-10">
             <div className="flex items-center justify-center space-x-2 bg-black/40 py-3.5 rounded-2xl border border-white/5">
               <Clock className="w-4 h-4 text-green-400" />
               <span className="text-xs font-medium tracking-wide text-center">เวลา <span className="text-green-400 font-bold ml-1">{duration}</span></span>
             </div>
             <div className="flex items-center justify-center space-x-2 bg-black/40 py-3.5 rounded-2xl border border-white/5">
               <CheckCircle2 className="w-4 h-4 text-emerald-300" />
               <span className="text-xs font-medium tracking-wide text-center">สำเร็จ <span className="text-emerald-300 font-bold ml-1">{stats.success}</span></span>
             </div>
             <div className="flex items-center justify-center space-x-2 bg-black/40 py-3.5 rounded-2xl border border-white/5">
               {socialPending > 0 ? (
                 <LoaderCircle className="w-4 h-4 text-cyan-300 animate-spin" />
               ) : (
                 <XCircle className="w-4 h-4 text-red-300" />
               )}
               <span className="text-xs font-medium tracking-wide text-center">
                 {socialPending > 0 ? 'กำลังส่งต่อ' : 'ปัญหา'}
                 <span className={`${socialPending > 0 ? 'text-cyan-300' : 'text-red-300'} font-bold ml-1`}>
                   {socialPending > 0 ? socialPending : stats.failed}
                 </span>
               </span>
             </div>
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
