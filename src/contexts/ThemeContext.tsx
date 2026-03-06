import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeKey = "red" | "blue" | "yellow" | "purple" | "green";

export interface ThemeConfig {
  key: ThemeKey;
  label: string;
  labelTh: string;
  // HSL values (without hsl() wrapper)
  primary: string;
  primaryLight: string;
  primaryDark: string;
  // Hex for inline styles
  hex: string;
  hexRgb: string; // "R, G, B" for rgba()
  // Gradient stops
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  // Electric border conic colors
  conicStops: string;
}

export const THEMES: Record<ThemeKey, ThemeConfig> = {
  red: {
    key: "red",
    label: "Crimson",
    labelTh: "แดง-ดำ",
    primary: "0 72% 51%",
    primaryLight: "0 85% 65%",
    primaryDark: "0 65% 40%",
    hex: "#dc2626",
    hexRgb: "220, 38, 38",
    gradientFrom: "#ff4444",
    gradientVia: "#dc2626",
    gradientTo: "#ff6b6b",
    conicStops: "#ef4444 0%, #ff6b35 8%, #fbbf24 14%, #ff6b35 20%, #ef4444 28%",
  },
  blue: {
    key: "blue",
    label: "Ocean",
    labelTh: "ฟ้า-ดำ",
    primary: "210 90% 55%",
    primaryLight: "210 95% 70%",
    primaryDark: "210 80% 42%",
    hex: "#2b7de9",
    hexRgb: "43, 125, 233",
    gradientFrom: "#3b9fff",
    gradientVia: "#2b7de9",
    gradientTo: "#60b5ff",
    conicStops: "#3b82f6 0%, #06b6d4 8%, #67e8f9 14%, #06b6d4 20%, #3b82f6 28%",
  },
  yellow: {
    key: "yellow",
    label: "Gold",
    labelTh: "เหลือง-ดำ",
    primary: "45 96% 53%",
    primaryLight: "48 100% 67%",
    primaryDark: "40 90% 42%",
    hex: "#eab308",
    hexRgb: "234, 179, 8",
    gradientFrom: "#facc15",
    gradientVia: "#eab308",
    gradientTo: "#fde047",
    conicStops: "#eab308 0%, #f59e0b 8%, #fde047 14%, #f59e0b 20%, #eab308 28%",
  },
  purple: {
    key: "purple",
    label: "Violet",
    labelTh: "ม่วง-ดำ",
    primary: "270 70% 58%",
    primaryLight: "270 80% 72%",
    primaryDark: "270 60% 45%",
    hex: "#8b5cf6",
    hexRgb: "139, 92, 246",
    gradientFrom: "#a78bfa",
    gradientVia: "#8b5cf6",
    gradientTo: "#c4b5fd",
    conicStops: "#8b5cf6 0%, #a855f7 8%, #d8b4fe 14%, #a855f7 20%, #8b5cf6 28%",
  },
  green: {
    key: "green",
    label: "Emerald",
    labelTh: "เขียว-ดำ",
    primary: "142 72% 29%",
    primaryLight: "142 70% 40%",
    primaryDark: "142 65% 20%",
    hex: "#15803d",
    hexRgb: "21, 128, 61",
    gradientFrom: "#22c55e",
    gradientVia: "#15803d",
    gradientTo: "#4ade80",
    conicStops: "#15803d 0%, #166534 8%, #22c55e 14%, #166534 20%, #15803d 28%",
  },
};

const STORAGE_KEY = "netflow_app_theme";

interface ThemeContextValue {
  theme: ThemeKey;
  config: ThemeConfig;
  setTheme: (theme: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "red",
  config: THEMES.red,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

function applyThemeToDOM(config: ThemeConfig) {
  const root = document.documentElement;
  root.style.setProperty("--neon-red", config.primary);
  root.style.setProperty("--neon-red-light", config.primaryLight);
  root.style.setProperty("--neon-red-dark", config.primaryDark);
  root.style.setProperty("--primary", config.primary);
  root.style.setProperty("--accent", config.primary);
  root.style.setProperty("--ring", config.primary);
  // Store hex for JS consumers
  root.style.setProperty("--theme-hex", config.hex);
  root.style.setProperty("--theme-rgb", config.hexRgb);
  root.setAttribute("data-theme", config.key);
}

function loadStoredTheme(): ThemeKey {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored in THEMES) return stored as ThemeKey;
  } catch {}
  return "red";
}

function saveTheme(theme: ThemeKey) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.set({ [STORAGE_KEY]: theme });
    }
  } catch {}
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>(loadStoredTheme);

  const config = THEMES[theme];

  useEffect(() => {
    applyThemeToDOM(config);
  }, [config]);

  const setTheme = (key: ThemeKey) => {
    setThemeState(key);
    saveTheme(key);
  };

  return (
    <ThemeContext.Provider value={{ theme, config, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
