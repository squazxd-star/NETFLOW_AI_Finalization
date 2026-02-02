import { WasmLoader, ImageUpload, Helpers, GeminiApi, VideoPromptTemplateSelector } from './dependencies';

// Controls Module
// Handles main automation logic and UI interactions for the extension
export const Controls = {
    isRunning: false,

    init: async () => {
        console.log("Controls Module Initialized");
        await Controls.setupEventListeners();

        // Initialize selector engine (WASM optional, JS/CSS fallback is default)
        const selectorEngine = await WasmLoader.loadSelectors();
        if (!selectorEngine) {
            console.log("✅ Selectors ready (JS/CSS mode)");
        }
    },

    setupEventListeners: async () => {
        // Listen for internal events or specific DOM elements if needed
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 's') {
                Controls.stopAutomation();
            }
        });
    },

    stopAutomation: () => {
        Controls.isRunning = false;
        Helpers.showToast("Automation Stopped by User", "info");
    },

    /**
     * Main Automation Handler
     * Used by Content Script to trigger the full flow
     */
    handleAutomation: async (data) => {
        if (Controls.isRunning) return;
        Controls.isRunning = true;
        Helpers.showToast("Starting Automation...", "info");

        try {
            console.log("Controls: processing automation data", data);

            // 1. Upload Product Image
            if (data.productImage) {
                Helpers.showToast("Uploading Product Image...", "info");
                await ImageUpload.uploadImageToWeb(data.productImage, 2); // Index 2 for product
            }

            // 2. Upload Character Image (optional)
            if (data.characterImage) {
                Helpers.showToast("Uploading Character Image...", "info");
                await ImageUpload.uploadImageToWeb(data.characterImage, 1); // Index 1 for character
            }

            // 3. Generate Prompt if missing
            let prompt = data.videoPrompt || data.sceneDescription;
            if (!prompt) {
                Helpers.showToast("Generating Prompt...", "info");
                // Analyze image if we have one and no prompt
                if (data.productImage) {
                    prompt = await GeminiApi.analyzeImage(data.productImage);
                } else {
                    prompt = "Cinematic video of product";
                }
            }

            // 4. Fill Prompt
            // Note: fillPromptAndGenerate is implicitly handled by the automation primitives via runTwoStagePipeline
            // but here we expose granular control if this is called independently.
            // For now, we assume the caller uses runTwoStagePipeline for the full heavy lifting,
            // but this method exists for manual triggers or specific button clicks.

            Helpers.showToast("Automation Request Sent", "success");

        } catch (error) {
            console.error("Controls Error:", error);
            Helpers.showToast("Automation Failed: " + error.message, "error");
        } finally {
            Controls.isRunning = false;
        }
    },

    // Handle Generation of Prompt (Text only)
    handleGeneratePrompt: async (productName, style) => {
        Helpers.showToast("Generating Magic Prompt...", "info");
        const prompt = await GeminiApi.generateText(`Create a ${style} video prompt for ${productName}`);

        // Copy to clipboard or return
        Helpers.copyToClipboard(prompt);
        return prompt;
    },

    // Handle Image Upload specific action
    handleUploadProduct: async (imageBase64) => {
        const success = await ImageUpload.uploadImageToWeb(imageBase64, 2);
        if (success) Helpers.showToast("Product Image Uploaded", "success");
        else Helpers.showToast("Upload Failed", "error");
    },

    // Handle Video Download
    handleDownload: async (videoUrl, filename) => {
        try {
            const a = document.createElement('a');
            a.href = videoUrl;
            a.download = filename || `netflow_video_${Date.now()}.mp4`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            Helpers.showToast("Download Started", "success");
        } catch (e) {
            console.error(e);
            Helpers.showToast("Download Failed", "error");
        }
    }
};

export default Controls;
