import { UseFormRegister, Control, UseFormSetValue, UseFormGetValues } from "react-hook-form";
import { CreateVideoFormData } from "@/schemas";

// Shared props for all section components
export interface SectionProps {
    register: UseFormRegister<CreateVideoFormData>;
    control: Control<CreateVideoFormData>;
    setValue: UseFormSetValue<CreateVideoFormData>;
    getValues: UseFormGetValues<CreateVideoFormData>;
    watch: <T extends keyof CreateVideoFormData>(name: T) => CreateVideoFormData[T];
}

export interface AiScriptSectionProps extends SectionProps {
    isOpen: boolean;
    onToggle: () => void;
    productImage: string | null;
}

export interface CharacterStyleSectionProps extends SectionProps {
    isOpen: boolean;
    onToggle: () => void;
    characterImages: (string | null)[];
    onCharacterUpload: (index: number) => void;
}

export interface ProductDataSectionProps extends SectionProps {
    isOpen: boolean;
    onToggle: () => void;
    productImage: string | null;
    characterImage: string | null;
    onProductImageUpload: () => void;
    onCharacterImageUpload: () => void;
    onProductImageFile?: (base64: string) => void;
    onCharacterImageFile?: (base64: string) => void;
    onSyncedProductImageSelect?: (imageUrl: string | null) => void;
}

export interface ProductionPreviewSectionProps extends SectionProps {
    isOpen: boolean;
    onToggle: () => void;
    hasVideo: boolean;
    onDownloadVideo: () => void;
    isTikTokReady?: boolean;
    onTikTokNotReady?: () => void;
    productImage?: string | null;
}

export interface GenerationSettingsSectionProps extends SectionProps {
    isOpen: boolean;
    onToggle: () => void;
    productImage: string | null;
}

export interface ResultSectionProps {
    result: {
        success: boolean;
        message: string;
        data?: {
            script?: string;
            videoUrl?: string;
            audioUrl?: string;
            generatedPrompt?: string;
            imageUrl?: string;
        };
    } | null;
    hasVideo: boolean;
    hasImage: boolean;
    onDownloadVideo: () => void;
}

export interface ConsoleLogSectionProps {
    logs: string[];
    tabs?: { tabId: number; title: string; running: boolean }[];
    selectedTab?: number | 'all';
    onTabSelect?: (tabId: number | 'all') => void;
}
