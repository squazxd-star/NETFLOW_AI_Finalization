import { useState } from "react";
import { Zap, Settings, Info } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"create" | "settings" | "about">("create");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-foreground">NETFLOW AI</h1>
          <p className="text-[10px] text-muted-foreground">v2.0 — Clean Build</p>
        </div>
      </header>

      {/* Tab Bar */}
      <nav className="flex border-b border-border">
        {[
          { id: "create" as const, label: "Create", icon: Zap },
          { id: "settings" as const, label: "Settings", icon: Settings },
          { id: "about" as const, label: "About", icon: Info },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === "create" && <CreatePanel />}
        {activeTab === "settings" && <SettingsPanel />}
        {activeTab === "about" && <AboutPanel />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-2 text-center">
        <p className="text-[10px] text-muted-foreground">Netflow AI — Ready for rebuild</p>
      </footer>
    </div>
  );
}

function CreatePanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-sm font-semibold mb-2">Create Video</h2>
        <p className="text-xs text-muted-foreground">
          ระบบพร้อมสำหรับการพัฒนาใหม่ — ไม่มี automation หรือ RPA ตกค้าง
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-card/50 p-6 flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
          <Zap className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          New system shell — ready for features
        </p>
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-sm font-semibold mb-2">Settings</h2>
        <p className="text-xs text-muted-foreground">
          No API keys or external connections configured yet.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 space-y-3">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Privacy</h3>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>✓ No content scripts — ไม่อ่านข้อมูลจากเว็บใดๆ</p>
          <p>✓ No host permissions — ไม่เข้าถึง URL ใดๆ</p>
          <p>✓ No tabs permission — ไม่อ่านประวัติแท็บ</p>
          <p>✓ No clipboard access — ไม่เข้าถึง clipboard</p>
          <p>✓ Storage only — เก็บข้อมูลเฉพาะภายใน extension</p>
        </div>
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="text-sm font-semibold mb-2">Netflow AI v2.0</h2>
        <p className="text-xs text-muted-foreground mb-3">
          Clean rebuild — no legacy automation code.
        </p>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p><strong className="text-foreground">Stack:</strong> React + Vite + TypeScript + TailwindCSS</p>
          <p><strong className="text-foreground">Extension:</strong> Chrome Manifest V3 Side Panel</p>
          <p><strong className="text-foreground">Platform:</strong> macOS / Windows / Linux</p>
        </div>
      </div>
    </div>
  );
}
