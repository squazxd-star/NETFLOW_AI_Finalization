import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, Shield, Sparkles, ArrowRight, CheckCircle2, AlertCircle, Crown, Zap, Gift, Lock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import logoIcon from "/icons/icon128.png";
import {
    activateLicense,
    getCurrentLicense,
    isLicenseValid,
    getRemainingTime,
    LicenseInfo,
    LicenseTier,
} from "@/services/licenseService";

interface LoginPageProps {
    onLoginSuccess: (info: LicenseInfo) => void;
}

// ═══════════════════════════════════════════════════════════════════
// Floating Orb — animated background particle
// ═══════════════════════════════════════════════════════════════════
const FloatingOrb = ({ delay, size, x, y, color }: { delay: number; size: number; x: string; y: string; color: string }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ width: size, height: size, left: x, top: y, background: color, filter: `blur(${size * 0.6}px)` }}
        animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
        }}
        transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
);

// ═══════════════════════════════════════════════════════════════════
// Grid Lines — subtle cyber background
// ═══════════════════════════════════════════════════════════════════
const CyberGrid = ({ color }: { color: string }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
            }}
        />
    </div>
);

// ═══════════════════════════════════════════════════════════════════
// Scanning Line — moves top to bottom
// ═══════════════════════════════════════════════════════════════════
const ScanLine = ({ color }: { color: string }) => (
    <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.4 }}
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
);

// ═══════════════════════════════════════════════════════════════════
// Tier Badge Preview
// ═══════════════════════════════════════════════════════════════════
const TIER_DISPLAY: Record<LicenseTier, { icon: typeof Crown; label: string; labelTh: string; desc: string; color: string; gradient: string }> = {
    admin: { icon: Crown, label: "Admin", labelTh: "แอดมิน", desc: "ใช้งานได้ตลอดชีพ ไม่มีหมดอายุ", color: "#fbbf24", gradient: "from-yellow-500/20 via-amber-500/10 to-yellow-600/20" },
    pro:   { icon: Zap,   label: "Pro",   labelTh: "โปร",    desc: "ใช้งานได้ 30 วัน",            color: "#3b82f6", gradient: "from-blue-500/20 via-cyan-500/10 to-blue-600/20" },
    trial: { icon: Gift,  label: "Trial", labelTh: "ทดลอง",  desc: "ทดลองใช้ฟรี 7 วัน",           color: "#a855f7", gradient: "from-purple-500/20 via-pink-500/10 to-purple-600/20" },
};

// ═══════════════════════════════════════════════════════════════════
// Main Login Page Component
// ═══════════════════════════════════════════════════════════════════
const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
    const { config: themeConfig } = useTheme();
    const [licenseKey, setLicenseKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<LicenseInfo | null>(null);
    const [shake, setShake] = useState(false);
    const [showTiers, setShowTiers] = useState(false);

    // Check existing license on mount
    useEffect(() => {
        (async () => {
            const valid = await isLicenseValid();
            if (valid) {
                const info = await getCurrentLicense();
                if (info) {
                    onLoginSuccess(info);
                }
            }
        })();
    }, [onLoginSuccess]);

    const handleActivate = useCallback(async () => {
        if (!licenseKey.trim()) {
            setError("กรุณาใส่ License Key");
            setShake(true);
            setTimeout(() => setShake(false), 600);
            return;
        }

        setIsLoading(true);
        setError(null);

        // Simulate network delay for premium feel
        await new Promise(r => setTimeout(r, 1500));

        const result = await activateLicense(licenseKey);

        if (!result.success) {
            setError(result.error);
            setShake(true);
            setTimeout(() => setShake(false), 600);
        } else {
            setSuccess(result.info);
            // Delay before entering app
            setTimeout(() => {
                onLoginSuccess(result.info);
            }, 2500);
        }

        setIsLoading(false);
    }, [licenseKey, onLoginSuccess]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleActivate();
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" style={{ background: "hsl(0 0% 5%)" }}>
            {/* ── Animated Background ── */}
            <CyberGrid color={themeConfig.hex} />
            <ScanLine color={themeConfig.hex} />

            {/* Floating Orbs */}
            <FloatingOrb delay={0} size={200} x="10%" y="20%" color={`${themeConfig.hex}15`} />
            <FloatingOrb delay={2} size={150} x="70%" y="60%" color={`${themeConfig.hex}20`} />
            <FloatingOrb delay={4} size={100} x="80%" y="15%" color={`${themeConfig.hex}10`} />
            <FloatingOrb delay={1} size={120} x="20%" y="75%" color={`${themeConfig.hex}18`} />
            <FloatingOrb delay={3} size={80}  x="50%" y="10%" color={`${themeConfig.hex}12`} />

            {/* Corner gradient accents */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: `${themeConfig.hex}08` }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: `${themeConfig.hex}0c` }} />

            {/* ── Main Card ── */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-[400px] mx-4"
            >
                {/* Electric Border Wrap */}
                <div
                    className={`electric-border-wrap ${isLoading ? "is-active" : ""}`}
                    style={{
                        background: isLoading
                            ? `conic-gradient(from var(--border-angle), ${themeConfig.hex} 0%, ${themeConfig.gradientVia} 15%, transparent 40%, transparent 100%)`
                            : undefined,
                    }}
                >
                    <div className="relative rounded-[14px] overflow-hidden" style={{ background: "hsl(0 0% 7%)" }}>
                        {/* Inner glow overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: `radial-gradient(ellipse at top, ${themeConfig.hex}08 0%, transparent 60%)`,
                            }}
                        />

                        {/* Scanline texture */}
                        <div className="absolute inset-0 nf-scanlines pointer-events-none opacity-30" />

                        <div className="relative px-8 py-10">
                            <AnimatePresence mode="wait">
                                {success ? (
                                    /* ══════ SUCCESS STATE ══════ */
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        className="flex flex-col items-center text-center space-y-6"
                                    >
                                        {/* Success Icon */}
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                                            className="relative"
                                        >
                                            <div
                                                className="w-20 h-20 rounded-full flex items-center justify-center"
                                                style={{
                                                    background: `linear-gradient(135deg, ${themeConfig.hex}30, ${themeConfig.hex}10)`,
                                                    boxShadow: `0 0 40px ${themeConfig.hex}30, 0 0 80px ${themeConfig.hex}15`,
                                                }}
                                            >
                                                <CheckCircle2 className="w-10 h-10" style={{ color: themeConfig.hex }} />
                                            </div>
                                            {/* Pulse rings */}
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{ border: `2px solid ${themeConfig.hex}` }}
                                                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{ border: `2px solid ${themeConfig.hex}` }}
                                                animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <h2 className="text-xl font-bold text-white mb-1">ยินดีต้อนรับ!</h2>
                                            <p className="text-sm text-white/60">
                                                {success.label} •{" "}
                                                <span
                                                    className="font-semibold"
                                                    style={{ color: TIER_DISPLAY[success.tier].color }}
                                                >
                                                    {TIER_DISPLAY[success.tier].label}
                                                </span>
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                            className="flex items-center gap-2 text-xs text-white/40"
                                        >
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            >
                                                <Sparkles className="w-3 h-3" style={{ color: themeConfig.hex }} />
                                            </motion.div>
                                            กำลังเข้าสู่ระบบ...
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    /* ══════ LOGIN FORM STATE ══════ */
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-7"
                                    >
                                        {/* Logo + Title */}
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1, duration: 0.6 }}
                                            className="flex flex-col items-center text-center space-y-4"
                                        >
                                            {/* Logo */}
                                            <motion.div
                                                className="relative"
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                <div
                                                    className="w-16 h-16 rounded-2xl overflow-hidden relative"
                                                    style={{
                                                        boxShadow: `0 0 30px ${themeConfig.hex}25, 0 0 60px ${themeConfig.hex}10`,
                                                    }}
                                                >
                                                    <img src={logoIcon} alt="Netflow AI" className="w-16 h-16 object-cover" style={{ filter: "brightness(0.7) saturate(0)" }} />
                                                    <div className="absolute inset-0" style={{ background: themeConfig.hex, mixBlendMode: "color", opacity: 0.9 }} />
                                                    <div className="absolute inset-0" style={{ background: themeConfig.hex, mixBlendMode: "soft-light", opacity: 0.5 }} />
                                                </div>
                                            </motion.div>

                                            {/* Title */}
                                            <div>
                                                <h1
                                                    className="text-2xl font-black tracking-[0.2em] uppercase"
                                                    style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
                                                >
                                                    <span
                                                        className="bg-clip-text text-transparent"
                                                        style={{
                                                            backgroundImage: `linear-gradient(135deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientVia}, ${themeConfig.gradientTo})`,
                                                            filter: `drop-shadow(0 0 20px ${themeConfig.hex}80)`,
                                                        }}
                                                    >
                                                        NETFLOW
                                                    </span>{" "}
                                                    <span className="text-white/80 font-light text-lg tracking-[0.3em]">AI</span>
                                                </h1>
                                                <motion.p
                                                    className="text-xs text-white/40 mt-2 tracking-wider"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    ใส่ License Key เพื่อเข้าใช้งาน
                                                </motion.p>
                                            </div>
                                        </motion.div>

                                        {/* License Key Input */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                        >
                                            <motion.div
                                                animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <label className="flex items-center gap-2 text-[11px] text-white/50 mb-2 font-medium">
                                                    <KeyRound className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                                                    LICENSE KEY
                                                </label>
                                                <div className="relative group">
                                                    <input
                                                        type="text"
                                                        value={licenseKey}
                                                        onChange={(e) => {
                                                            setLicenseKey(e.target.value.toUpperCase());
                                                            setError(null);
                                                        }}
                                                        onKeyDown={handleKeyDown}
                                                        placeholder="NETFLOW-XXXX-XXXX-XXXX"
                                                        disabled={isLoading}
                                                        className="w-full px-4 py-3.5 rounded-xl text-sm font-mono tracking-wider text-white placeholder:text-white/20 transition-all duration-300 outline-none disabled:opacity-50"
                                                        style={{
                                                            background: "hsl(0 0% 10%)",
                                                            border: `1px solid ${error ? "#ef4444" : "hsl(0 0% 18%)"}`,
                                                            boxShadow: error
                                                                ? "0 0 15px rgba(239,68,68,0.15)"
                                                                : undefined,
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = `${themeConfig.hex}80`;
                                                            e.target.style.boxShadow = `0 0 20px ${themeConfig.hex}15, inset 0 0 10px ${themeConfig.hex}05`;
                                                        }}
                                                        onBlur={(e) => {
                                                            if (!error) {
                                                                e.target.style.borderColor = "hsl(0 0% 18%)";
                                                                e.target.style.boxShadow = "none";
                                                            }
                                                        }}
                                                    />
                                                    <Lock
                                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/15 group-focus-within:text-white/30 transition-colors"
                                                    />
                                                </div>
                                            </motion.div>

                                            {/* Error Message */}
                                            <AnimatePresence>
                                                {error && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -5, height: 0 }}
                                                        animate={{ opacity: 1, y: 0, height: "auto" }}
                                                        exit={{ opacity: 0, y: -5, height: 0 }}
                                                        className="flex items-center gap-2 mt-2.5 text-xs text-red-400"
                                                    >
                                                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                                        <span>{error}</span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        {/* Activate Button */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5, duration: 0.5 }}
                                        >
                                            <button
                                                onClick={handleActivate}
                                                disabled={isLoading}
                                                className="ai-btn-shimmer w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 disabled:opacity-60 transition-all duration-300"
                                                style={{
                                                    background: isLoading
                                                        ? undefined
                                                        : `linear-gradient(135deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientVia}, ${themeConfig.gradientTo})`,
                                                }}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        >
                                                            <Sparkles className="w-4 h-4" />
                                                        </motion.div>
                                                        กำลังตรวจสอบ...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Shield className="w-4 h-4" />
                                                        เปิดใช้งาน License
                                                        <ArrowRight className="w-4 h-4" />
                                                    </>
                                                )}
                                            </button>
                                        </motion.div>

                                        {/* Tier Info Toggle */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.7 }}
                                            className="space-y-3"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setShowTiers(!showTiers)}
                                                className="w-full text-center text-[11px] text-white/30 hover:text-white/60 transition-colors"
                                            >
                                                {showTiers ? "ซ่อนรายละเอียด" : "ดูรายละเอียด License ทั้งหมด →"}
                                            </button>

                                            <AnimatePresence>
                                                {showTiers && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="space-y-2 overflow-hidden"
                                                    >
                                                        {(Object.keys(TIER_DISPLAY) as LicenseTier[]).map((tier, i) => {
                                                            const t = TIER_DISPLAY[tier];
                                                            const Icon = t.icon;
                                                            return (
                                                                <motion.div
                                                                    key={tier}
                                                                    initial={{ opacity: 0, x: -20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: i * 0.1 }}
                                                                    className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${t.gradient} border border-white/[0.06]`}
                                                                >
                                                                    <div
                                                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                                        style={{ background: `${t.color}20` }}
                                                                    >
                                                                        <Icon className="w-4 h-4" style={{ color: t.color }} />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-xs font-bold text-white/90">
                                                                            {t.label}{" "}
                                                                            <span className="text-white/40 font-normal">
                                                                                ({t.labelTh})
                                                                            </span>
                                                                        </p>
                                                                        <p className="text-[10px] text-white/40">{t.desc}</p>
                                                                    </div>
                                                                </motion.div>
                                                            );
                                                        })}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        {/* Footer */}
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.9 }}
                                            className="text-center text-[10px] text-white/20"
                                        >
                                            NETFLOW AI © 2024 — All rights reserved
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
