import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NetflowPanel from "@/components/NetflowPanel";
import LoginPage from "@/components/LoginPage";
import { isLicenseValid, getCurrentLicense, deactivateLicense, getRemainingTime, getTierInfo, LicenseInfo } from "@/services/licenseService";

const Index = () => {
  const [licensed, setLicensed] = useState<boolean | null>(null); // null = loading
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null>(null);
  const [remainingLabel, setRemainingLabel] = useState("");

  // Check license on mount
  useEffect(() => {
    (async () => {
      const valid = await isLicenseValid();
      if (valid) {
        const info = await getCurrentLicense();
        setLicenseInfo(info);
      }
      setLicensed(valid);
    })();
  }, []);

  // Update remaining time label
  useEffect(() => {
    if (!licenseInfo) return;
    const update = async () => {
      const rem = await getRemainingTime();
      if (!rem) {
        setRemainingLabel("ไม่มีหมดอายุ");
      } else if (rem.expired) {
        setLicensed(false);
        setRemainingLabel("หมดอายุแล้ว");
      } else {
        setRemainingLabel(`เหลือ ${rem.days} วัน ${rem.hours} ชม.`);
      }
    };
    update();
    const interval = setInterval(update, 60000); // update every minute
    return () => clearInterval(interval);
  }, [licenseInfo]);

  const handleLoginSuccess = useCallback((info: LicenseInfo) => {
    setLicenseInfo(info);
    setLicensed(true);
  }, []);

  const handleLogout = useCallback(async () => {
    await deactivateLicense();
    setLicensed(false);
    setLicenseInfo(null);
  }, []);

  // Still checking license...
  if (licensed === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xs text-white/30"
        >
          กำลังตรวจสอบ License...
        </motion.div>
      </div>
    );
  }

  // Not licensed → show login
  if (!licensed) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Licensed → show app
  const tierInfo = licenseInfo ? getTierInfo(licenseInfo.tier) : null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-red/10 rounded-full blur-3xl" />
      </div>

      {/* Main Panel */}
      <div className="relative z-10 w-full max-w-[417px]">
        {/* License Badge Bar */}
        {licenseInfo && tierInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-2 px-3 py-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide"
                style={{ background: tierInfo.bgColor, color: tierInfo.color }}
              >
                {tierInfo.emoji} {tierInfo.label}
              </span>
              <span className="text-[10px] text-white/30">{remainingLabel}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-[10px] text-white/25 hover:text-red-400 transition-colors"
            >
              ออกจากระบบ
            </button>
          </motion.div>
        )}

        <NetflowPanel />
      </div>
    </div>
  );
};

export default Index;
