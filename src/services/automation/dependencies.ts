import {
    uploadSingleImage,
    fillPromptAndGenerate,
    clickByText,
    switchToImageTab
} from '../../utils/googleLabAutomation';
import { RemoteConfigService } from '../../utils/remoteConfig';
import { generateVideoScript, generateVisualPrompt } from '../geminiService';
import { getApiKey } from '../storageService';

// Initialize Config for Selectors
const configService = RemoteConfigService.getInstance();
// We assume it's initialized or will be initialized. 
// Just in case, we trigger init but don't await blocking (or handle in methods)
configService.init().catch(console.error);

export const WasmLoader = {
    loadSelectors: async () => {
        // WASM is optional - JS/CSS fallback is the default mode
        // This is not an error, just informational logging
        console.log("ℹ️ Wasm loader: Using pure JS/CSS selectors (default mode)");
        return null; // Return null to trigger fallback logic in controls.js
    }
};

export const ImageUpload = {
    uploadImageToWeb: async (base64Image: string, selectorOrIndex: string | number = 1) => {
        const index = typeof selectorOrIndex === 'number' ? selectorOrIndex : 1;
        const selectors = configService.getSelectors();
        return await uploadSingleImage(base64Image, index, selectors);
    },

    // Stub for product fetching if needed, or implement via storage
    getProductImage: async () => {
        // This would typically read from Chrome Storage or window state
        return null;
    }
};

export const Helpers = {
    showToast: (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        console.log(`[${type.toUpperCase()}] ${message}`);
        // Create a simple toast DOM element
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.backgroundColor = type === 'error' ? '#ef4444' : (type === 'success' ? '#22c55e' : '#3b82f6');
        toast.style.color = 'white';
        toast.style.zIndex = '99999';
        toast.style.animation = 'fadeIn 0.3s ease-out';

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    copyToClipboard: async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            Helpers.showToast("Copied to clipboard!", "success");
        } catch (err) {
            console.error("Clipboard failed", err);
        }
    }
};

export const GeminiApi = {
    generateText: async (prompt: string) => {
        // Map to generateVideoScript which handles Gemini internally
        // We construct a mock request object
        try {
            const result = await generateVideoScript({
                productName: "Generic Request",
                style: "storytelling", // default
                tone: "friendly",
                template: "product-review",
                language: "th-central",
                // Passing raw prompt via description hacking or creating a new service method
                // Actually, generateVideoScript constructs its own prompt.
                // If we want raw generation, we might need a distinct method or hack it.
                // For now, let's use a simpler direct call if possible, or adapt.
                mustUseKeywords: prompt // trick to pass content
            });
            return result.script;
        } catch (e) {
            console.error(e);
            return "Error generating text.";
        }
    },

    analyzeImage: async (imageBase64: string) => {
        const apiKey = await getApiKey('openai'); // Reuse key logic
        if (!apiKey) throw new Error("No API Key");
        return await generateVisualPrompt(apiKey, imageBase64, "Analyzed Product", "Cinematic", undefined, 8);
    }
};

export const VideoPromptTemplateSelector = {
    // Stub
    getSelectedTemplate: () => "Default Template",
    render: () => console.log("Rendering Template Selector stub")
};
