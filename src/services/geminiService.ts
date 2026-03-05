import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateNanoImage } from "./imageGenService";
import { stitchVideos } from "./videoProcessingService";
import { AdvancedVideoRequest, ScriptRequest } from "../types/netflow";
import { getApiKey } from "./storageService";

// Wrapper to get client instance dynamically
const getGenAI = async () => {
    const key = await getApiKey();
    if (!key) throw new Error("API Key not found. Please set it in Settings.");
    return new GoogleGenerativeAI(key);
};

// Interface for the result
export interface ScriptResult {
    script: string;
    audioUrl?: string;
    videoUrl?: string;
    generatedPrompt?: string; // For debugging
    imageUrl?: string; // Fallback image from DALL-E
}

/**
 * Build a comprehensive prompt from all form fields
 */
const buildFullPrompt = (data: ScriptRequest): string => {
    const templateDescriptions: Record<string, string> = {
        "product-review": "รีวิวสินค้าแบบจริงใจ (Honest Review) เน้นผลลัพธ์จริงๆ ไม่ขายฝัน",
        "brainrot-product": "สไตล์ Brainrot: ใช้ศัพท์วัยรุ่น (Gen Z Slang), ตัดไว, กวนประสาท, ตลกหน้าตาย, ไม่เน้นสาระแต่เน้นฮา",
        "unboxing": "แกะกล่องโชว์ของ: ตื่นเต้นกับ Packaging, สัมผัสแรก, ความรู้สึกตอนเห็นของ",
        "comparison": "เปรียบเทียบชัดเจน: เทียบกับของเก่า หรือ แบรนด์อื่น (ไม่ต้องเอ่ยชื่อ) ให้เห็นว่าอันนี้ดีกว่ายังไง",
        "testimonial": "เล่าประสบการณ์ผู้ใช้จริง: เหมือนเพื่อนมาเล่าให้ฟังว่าชีวิตเปลี่ยนไปยังไง",
        "flash-sale": "Flash Sale: เร่งรีบ, ดุดัน, หมดแล้วหมดเลย, ต้องซื้อเดี๋ยวนี้",
        "tutorial": "How-to: สอนใช้แบบ Step-by-step, เข้าใจง่าย, ทำตามได้เลย",
        "lifestyle": "Vlog/Lifestyle: ถ่ายทอดการใช้งานสินค้าในชีวิตประจำวันแบบเนียนๆ",
        "trending": "เกาะกระแส: ใช้เพลงฮิต หรือมุกที่กำลังดังใน TikTok ตอนนี้",
        "mini-drama": "ละครสั้น: มีพล็อตเรื่องหักมุม, ดราม่า, หรือตลกคาเฟ่",
        "before-after": "โชว์ผลลัพธ์ Before/After: ให้เห็นความแตกต่างชัดเจนที่สุด"
    };

    const toneDescriptions: Record<string, string> = {
        "energetic": "High Energy: ตื่นเต้น, เสียงดังฟังชัด, กระตือรือร้นสุดขีด (เหมือนพิธีกรทีวีไดเร็ค)",
        "calm": "ASMR/Calm: เสียงนุ่ม, ทุ้ม, สบายหู, ชวนง่วงแบบผ่อนคลาย",
        "friendly": "Best Friend: เหมือนเพื่อนสนิทคุยกัน, ใช้กู-มึงได้ (ถ้าเหมาะสม), หรือ เธอ-ฉัน",
        "professional": "Expert/Professional: น่าเชื่อถือ, ข้อมูลแน่น, ดูเป็นผู้เชี่ยวชาญ"
    };

    const styleDescriptions: Record<string, string> = {
        "hard": "Hard Sell: ขายตรงๆ ไม่อ้อมค้อม เน้นโปรโมชั่นและความคุ้มค่า",
        "soft": "Soft Sell: ป้ายยาแบบเนียนๆ เล่าเรื่องก่อนแล้วค่อยตบเข้าสินค้าตอนจบ",
        "educational": "Educational: เน้นให้ความรู้ สาระแน่นๆ สินค้าเป็นแค่ตัวประกอบ",
        "storytelling": "Storytelling: เล่าเรื่องราวที่มีจุดเริ่มต้น จุดพีค และจุดจบ (สินค้าคือฮีโร่)"
    };

    let prompt = `
You are an expert TikTok/Reels script writer representing a world-class creative agency.
Your goal is to write a script that feels "Premium", "Authentic", and "High-Class".

## CRITICAL INSTRUCTIONS (MUST FOLLOW)
1. **Language Style**: Use **"Spoken Thai" (ภาษาพูด)**. Avoid formal/academic Thai (ภาษาเขียน).
   - BAD: "มีความสุข", "รับประทาน", "จำหน่าย"
   - GOOD: "ฟิน", "กิน", "ขาย", "จึ้งมาก", "ของมันต้องมี"
   - Use slang naturally (e.g., Fin, Pang, Jeung) to sound viral and relatable.

2. **Visual Description**: When describing scenarios (Proof), focus on **EMOTION & RESULT**.
   - BAD: "In this image..."
   - GOOD: "Look at that face! Pure joy!"

3. **Product Name**: 
   - Use the **EXACT Brand Name** (e.g. "Dior Sauvage", "Whiskas") derived from the input.
   - **MANDATORY**: You MUST mention the Brand Name in the **[HOOK]** and again in the **[CTA]**.
   - Do NOT just say "this perfume" or "this food". Say the NAME.

4. **Structure**: 
   - **HOOk**: Start with a scroll-stopping question or statement + BRAND NAME.
   - **BODY**: Focus on the feeling/benefit.
   - **CLOSING**: Strong Call to Action + BRAND NAME.

## PRODUCT INFORMATION
- Product Name: ${data.productName || "(Extract name from description below)"}
${data.productDescription ? `- Description / Visual Context from AI Brain: ${data.productDescription}` : ""}
${data.mustUseKeywords ? `- Must Include Keywords: ${data.mustUseKeywords}` : ""}
${data.avoidKeywords ? `- Avoid These Words: ${data.avoidKeywords}` : ""}

## SCRIPT SETTINGS
- Template: ${data.template || "product-review"} (${templateDescriptions[data.template || "product-review"] || ""})
- Sales Approach: ${data.style} (${styleDescriptions[data.style] || ""})
- Voice Tone: ${data.tone} (${toneDescriptions[data.tone] || ""})
- Language: ${data.language === "th-central" ? "Thai (Central) - Use modern, natural Thai slang where appropriate" : "English"}

## OUTPUT REQUIREMENTS
Generate a complete TikTok script with:
1. [HOOK]
2. [PROBLEM]
3. [SOLUTION]
4. [PROOF]
5. [CTA]

Output ONLY the script dialogue. No metadata.
`;

    return prompt;
};

/**
 * Uses Vision API to analyze the product image (and optional character) to generate a highly detailed prompt.
 * Supports both OpenAI GPT-4o and Gemini based on selected provider.
 * @param totalDuration - Total video duration in seconds (default 8)
 */
export const generateVisualPrompt = async (apiKey: string, imageBase64: string, productName: string, style: string, characterImage?: string, totalDuration: number = 8): Promise<string> => {
    const aiProvider = localStorage.getItem("netflow_ai_provider") || "openai";
    console.log(`👁️ Analyzing Product (and Character) with ${aiProvider.toUpperCase()} Vision... Duration: ${totalDuration}s`);

    const visionPromptText = `Analyze these images to create a VIDEO GENERATION PROMPT.
                
                GOAL: Create a prompt for a high-end video generator (like Haiper, Runway, or Google Veo) that will animate these specific subjects.

                Input Images:
                - Image 1: Product (${productName})
                ${characterImage ? "- Image 2: Character/Presenter (Reference Face)" : ""}

                INSTRUCTIONS:
                1. **Product**: Describe the product in Image 1 exactly (color, shape, packaging type).
                ${characterImage ? `2. **Character**: Describe the person in Image 2 as an ORIGINAL ANONYMOUS FICTIONAL character. Describe ONLY generic visual traits: approximate hair style, hair color, skin tone, clothing style. Do NOT identify, name, or reference any real person, celebrity, public figure, or idol. Do NOT say "looks like", "resembles", or "similar to" anyone. Frame as: "an original fictional young woman/man with [visual traits]".` : ""}
                3. **Action**: Create a ${totalDuration}-second continuous shot.
                   - Movement: ${style || "Cinematic, smooth camera movement"}.
                   - Lighting: Professional studio or natural cinematic.
                   - Interaction: ${characterImage ? "The fictional character is holding/presenting the product naturally." : "The product is showcased with elegant camera movement."}
                
                4. **Format**: Return ONLY the raw English prompt text. Do not include "Name:" or "Prompt:" labels.
                
                STRICT CONSTRAINTS:
                - NO text overlays.
                - NO cartoon effects (unless style specifies).
                - Keep it photorealistic.
                - NEVER mention any real person's name, celebrity, public figure, idol, or K-pop star.
                - NEVER use phrases like "looks like", "resembles", "inspired by", or "similar to" any real person.
                - The character must ALWAYS be described as an original, anonymous, fictional person.`;

    try {
        let content = "";

        if (aiProvider === "gemini") {
            // ── Gemini Vision Path ──
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const extractBase64 = (b64: string) => {
                const data = b64.includes(',') ? b64.split(',')[1] : b64;
                const mimeType = b64.includes('png') ? 'image/png' : 'image/jpeg';
                return { data, mimeType };
            };

            const parts: any[] = [visionPromptText];
            const productImg = extractBase64(imageBase64);
            parts.push({ inlineData: { data: productImg.data, mimeType: productImg.mimeType } });

            if (characterImage) {
                const charImg = extractBase64(characterImage);
                parts.push({ inlineData: { data: charImg.data, mimeType: charImg.mimeType } });
            }

            const result = await model.generateContent(parts);
            content = result.response.text();
        } else {
            // ── OpenAI Vision Path ──
            const messagesContent: any[] = [
                { type: "text", text: visionPromptText },
                { type: "image_url", image_url: { url: imageBase64 } }
            ];

            if (characterImage) {
                messagesContent.push({
                    type: "image_url",
                    image_url: { url: characterImage }
                });
            }

            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [{ role: "user", content: messagesContent }],
                    max_tokens: 350
                })
            });

            const json = await response.json();
            if (json.error || !json.choices) {
                console.warn("Vision API Error:", json.error);
                return `Cinematic shot of ${productName}, ${style} style, professional lighting, 8k resolution`;
            }
            content = json.choices[0].message.content;
        }

        // Cleanup: First remove Name line, THEN remove Prompt prefix
        content = content.replace(/^Name:.*?\n/i, "").trim();
        content = content.replace(/^Prompt:\s*/i, "");

        return content.trim();

    } catch (e) {
        console.error("Vision Analysis Failed:", e);
        return `Cinematic shot of ${productName}, ${style} style, professional lighting`;
    }
};

/**
 * Helper to generate using OpenAI with full form data (GPT-4o)
 */
const generateWithOpenAI = async (apiKey: string, data: ScriptRequest): Promise<ScriptResult> => {
    console.log("🤖 Generating script with OpenAI (GPT-4o)...");
    const prompt = buildFullPrompt(data);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a professional TikTok script writer." },
                { role: "user", content: prompt }
            ],
            temperature: 0.8
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(`OpenAI Error: ${err.error?.message || response.statusText}`);
    }

    const json = await response.json();
    return {
        script: json.choices[0].message.content || "",
        generatedPrompt: prompt
    };
};

/**
 * Generates a viral TikTok script using the selected AI Provider (OpenAI or Gemini)
 */
export const generateVideoScript = async (
    data: ScriptRequest
): Promise<ScriptResult> => {
    // Check which AI Provider user selected (default: OpenAI)
    const aiProvider = localStorage.getItem("netflow_ai_provider") || "openai";
    console.log(`🤖 Using AI Provider: ${aiProvider.toUpperCase()}`);

    // 1. If OpenAI is selected
    if (aiProvider === "openai") {
        const openaiKey = await getApiKey('openai');
        if (openaiKey) {
            try {
                return await generateWithOpenAI(openaiKey, data);
            } catch (error: any) {
                console.error("❌ OpenAI Generation failed:", error.message);
                throw new Error(`OpenAI Error: ${error.message}`);
            }
        } else {
            // If key not found, fallback to Gemini?? 
            // User wants BEST. If no key, maybe Error is better than mediocre fallback. 
            // But existing behavior was Error.
            throw new Error("OpenAI API Key ไม่พบ! กรุณาใส่ Key ใน Settings");
        }
    }

    // 2. If Gemini is selected
    if (aiProvider === "gemini") {
        const tryGenerate = async (modelName: string): Promise<ScriptResult> => {
            console.log(`🔷 Attempting script generation with Gemini model: ${modelName}`);
            const genAI = await getGenAI();
            const model = genAI.getGenerativeModel({ model: modelName });
            const prompt = buildFullPrompt(data);
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return {
                script: response.text(),
                generatedPrompt: prompt
            };
        };

        try {
            return await tryGenerate("gemini-2.0-flash"); // Use 2.0 Flash (latest fast)
        } catch (error: any) {
            console.warn("Gemini Flash failed, trying Pro...", error.message);
            try {
                return await tryGenerate("gemini-pro");
            } catch (fallbackError: any) {
                console.error("❌ All Gemini models failed:", fallbackError.message);
                throw new Error(`Gemini Error: ${fallbackError.message}`);
            }
        }
    }

    throw new Error("ไม่พบ AI Provider ที่ถูกต้อง");
};

/**
 * Synthesizes text to speech using OpenAI TTS API
 */
const generateOpenAISpeech = async (text: string, apiKey: string): Promise<string | null> => {
    try {
        console.log("🎙️ Generating speech with OpenAI TTS...");
        const response = await fetch("https://api.openai.com/v1/audio/speech", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "tts-1",
                input: text,
                voice: "nova" // "shimmer", "alloy", "echo", "fable", "onyx", "nova"
            })
        });

        if (!response.ok) {
            const err = await response.json();
            console.warn("OpenAI TTS Error:", err);
            return null;
        }

        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.error("OpenAI TTS Failed:", e);
        return null;
    }
};

/**
 * Synthesizes text to speech using Google Cloud TTS API (with OpenAI fallback)
 */
export const generateSpeech = async (text: string): Promise<string | null> => {
    // 1. Try Google Cloud TTS first
    try {
        const googleKey = await getApiKey('gemini');
        if (googleKey) {
            const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${googleKey}`;
            const requestBody = {
                input: { text },
                voice: { languageCode: "th-TH", ssmlGender: "FEMALE" },
                audioConfig: { audioEncoding: "MP3" },
            };

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.audioContent) {
                    console.log("✅ Google TTS Success");
                    return `data:audio/mp3;base64,${data.audioContent}`;
                }
            } else {
                console.warn("Google TTS failed, trying OpenAI fallback...");
            }
        }
    } catch (error) {
        console.warn("Google TTS error, trying OpenAI fallback...");
    }

    // 2. Fallback to OpenAI TTS
    const openaiKey = await getApiKey('openai');
    if (openaiKey) {
        return await generateOpenAISpeech(text, openaiKey);
    }

    return null;
};

/**
 * Placeholder for Veo/Vertex AI Video Generation
 * Note: Vertex AI usually requires Service Account (OAuth), not just API Key.
 * For client-side usage, this part is complex and recommended to move to a proper backend proxy.
 */
export const generateVideo = async (script: string): Promise<string | null> => {
    // TODO: Implement Vertex AI call via Backend Proxy
    console.log("Video generation requires backend implementation via Vertex AI");
    return null;
};

// Orchestrator function to run the full flow
export const runFullWorkflow = async (data: ScriptRequest | AdvancedVideoRequest): Promise<ScriptResult> => {
    console.log("Starting Workflow...", data);

    try {
        let script = "";
        let audioUrl: string | undefined = undefined;
        let videoUrl: string | undefined = undefined;
        let imageUrl: string | undefined = undefined;
        let generatedPrompt: string | undefined = undefined;

        // Cast to AdvancedVideoRequest safely
        let advData = data as any;

        // Calculate total video duration based on clip count (1 clip = 8 seconds)
        const loopCount = typeof advData.loopCount === 'number' ? advData.loopCount : 1;
        const totalDuration = loopCount * 8;
        console.log(`📹 Video Duration: ${loopCount} clip(s) = ${totalDuration} seconds`);

        // 1. Vision Analysis (Brain 🧠)
        if (advData.userImage) {
            const aiProvider = (localStorage.getItem("netflow_ai_provider") || "openai") as 'openai' | 'gemini';
            console.log(`🧠 Starting Smart Vision Analysis (${aiProvider.toUpperCase()})...`);
            const apiKey = await getApiKey(aiProvider);
            if (apiKey) {
                const visionRes = await generateVisualPrompt(apiKey, advData.userImage, advData.productName, advData.style, advData.characterImage, totalDuration);
                if (visionRes) {
                    console.log(`✅ Smart Vision found prompt: ${visionRes.substring(0, 50)}...`);

                    // Since we now return just the prompt string
                    advData.prompt = visionRes;

                    // Inject into Product Description for Script Writer (Context)
                    if (!advData.productDescription) advData.productDescription = "";
                    advData.productDescription += `\n\n[Visual Details]: ${visionRes}`;

                    generatedPrompt = `[Smart Vision]: ${visionRes}`;
                }
            }
        }

        let visualPrompt = advData.prompt || advData.productName;

        // 2. Script & Audio Generation (Brain 🧠)
        // Run if we have a name OR image OR minimal context
        if (advData.productName || advData.userImage || advData.productDescription) {
            console.log("📝 Generating Script for:", advData.productName || "Unknown Product");
            const result = await generateVideoScript(advData);
            script = result.script;
            if (!generatedPrompt) generatedPrompt = result.generatedPrompt;
            else generatedPrompt += `\n\n[Script Prompt]: ${result.generatedPrompt}`;

            console.log("Script generated:", script);
            audioUrl = (await generateSpeech(script)) || undefined;
        }

        // 3. Visual Generation
        // TODO: Implement new video generation pipeline here
        if (visualPrompt) {
            console.log("� Visual prompt ready:", visualPrompt.substring(0, 80) + "...");
        }

        return {
            script,
            audioUrl,
            videoUrl,
            imageUrl,
            generatedPrompt
        };

    } catch (e) {
        console.error("Workflow Failed:", e);
        throw e;
    }
};
