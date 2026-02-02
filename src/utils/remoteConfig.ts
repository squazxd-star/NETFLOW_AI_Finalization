export interface AutomationSelectors {
    dashboard: {
        newProjectTriggers: string[];
    };
    workspace: {
        imageTabTriggers: string[];
    };
    upload: {
        uploadButtonTriggers: string[];
        cropSaveTriggers: string[];
    };
    generation: {
        generateButtonSvgPath?: string; // Optional: identify by path content
        addToPromptTriggers: string[];
        videoTabTriggers: string[];
    };
    download: {
        downloadButtonTriggers: string[];
        successTriggers: string[];
    };
}

export const DEFAULT_CONFIG: AutomationSelectors = {
    dashboard: {
        newProjectTriggers: [
            'โปรเจ็กต์ใหม่',
            '+ โปรเจ็กต์ใหม่',
            'New project',
            '+ New project',
            'Start new',
            'Create new',
            'สร้างโปรเจ็กต์',
            'สร้างใหม่',
            'เริ่มโปรเจ็กต์',
            'ใหม่',
            'เริ่มเลย',
            'เริ่มต้น',
            'Get started'
        ]
    },
    workspace: {
        imageTabTriggers: ['รูปภาพ', 'Image', 'Images', 'ภาพ', 'ImageFX', 'เครื่องมือสร้างรูป', 'สร้างรูป', 'รูป']
    },
    upload: {
        uploadButtonTriggers: ['อัพโหลด', 'Upload', 'เพิ่มรูป', 'Add image', '+', 'เพิ่มสื่อ', 'Add media', 'นำเข้า', 'Import', 'แทรก', 'Insert', 'เลือกไฟล์'],
        cropSaveTriggers: ['บันทึก', 'Save', 'Done', 'ครอบตัด', 'Crop', 'ครอบตัดและบันทึก', 'Crop and save', 'ตกลง', 'OK', 'ใช้', 'Apply']
    },
    generation: {
        addToPromptTriggers: ['เพิ่มไปยังพรอมต์', 'Add to prompt', 'Add To Prompt', 'เพิ่มไปยัง', 'Add to', 'เสร็จสิ้น'],
        videoTabTriggers: ['ส่วนผสมในวิดีโอ', 'Ingredients to Video', 'Ingredients to video', 'ผสมวิดีโอ']
    },
    download: {
        downloadButtonTriggers: ['ดาวน์โหลด', 'Download', 'บันทึกวิดีโอ', 'Save video', 'Export', 'ส่งออก'],
        successTriggers: ['เสร็จสิ้น', 'Complete', 'Success', '100%']
    }
};

export class RemoteConfigService {
    private static instance: RemoteConfigService;
    private config: AutomationSelectors = DEFAULT_CONFIG;
    private remoteUrl: string | null = null;
    private isInitialized = false;

    private constructor() { }

    public static getInstance(): RemoteConfigService {
        if (!RemoteConfigService.instance) {
            RemoteConfigService.instance = new RemoteConfigService();
        }
        return RemoteConfigService.instance;
    }

    public async init(url?: string): Promise<void> {
        if (this.isInitialized && !url) return;

        // Remote config is optional - local defaults work fine
        // Only attempt fetch if a valid URL is provided
        this.remoteUrl = url || null;

        // Skip remote fetch if no URL configured - use local defaults silently
        if (!this.remoteUrl) {
            console.log("ℹ️ Remote config: Using local selectors (no remote URL configured)");
            this.isInitialized = true;
            return;
        }

        try {
            console.log(`🌐 Fetching remote config from ${this.remoteUrl}...`);

            // 3-second timeout for config fetch to avoid delaying startup
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 3000);

            const response = await fetch(this.remoteUrl, {
                signal: controller.signal,
                cache: "no-store"
            });

            clearTimeout(id);

            if (response.ok) {
                const data = await response.json();
                if (this.validateConfig(data)) {
                    this.config = { ...DEFAULT_CONFIG, ...data };
                    console.log("✅ Remote config loaded successfully (Version: " + (data.version || 'unknown') + ")");
                } else {
                    // Validation failed - use local defaults silently
                    console.log("ℹ️ Remote config: Validation failed, using local selectors");
                }
            } else {
                // Remote not available - this is OK, use local defaults
                console.log("ℹ️ Remote config: Not available (status " + response.status + "), using local selectors");
            }
        } catch (e: any) {
            // Network errors are expected in some environments - not an error condition
            if (e.name === 'AbortError') {
                console.log("ℹ️ Remote config: Timeout, using local selectors");
            } else {
                console.log("ℹ️ Remote config: Fetch failed, using local selectors");
            }
        } finally {
            this.isInitialized = true;
        }
    }

    private validateConfig(data: any): boolean {
        // Basic schema check
        return data && data.dashboard && Array.isArray(data.dashboard.newProjectTriggers);
    }

    public getSelectors(): AutomationSelectors {
        return this.config;
    }
}
