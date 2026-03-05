/**
 * Character Consistency Service
 * Builds super-detailed character description from UI settings
 * to maintain visual consistency across multiple video scenes
 */

// Types matching UI options
export interface CharacterSettings {
    gender: 'male' | 'female';
    ageRange: 'teen' | 'young-adult' | 'adult' | 'middle-age' | 'senior';
    personality: 'cheerful' | 'calm' | 'professional' | 'playful' | 'mysterious';
    clothingStyles: ('casual' | 'formal' | 'fashion' | 'sporty')[];
    background: 'studio' | 'outdoor' | 'home' | 'office' | 'abstract';
    expression: 'neutral' | 'happy' | 'excited';
    movement: 'static' | 'minimal';
    cameraAngles: ('front' | 'side' | 'close-up' | 'full-body' | 'dynamic')[];
}

export interface ProductSettings {
    productName: string;
    productDescription?: string;
}

/**
 * Build detailed character description for VideoFX prompts
 * This description is added to every scene to maintain consistency
 */
// Detect if product is fitness/supplement related
const isFitnessProduct = (productName: string, productDesc?: string): boolean => {
    const t = `${productName} ${productDesc || ''}`.toLowerCase();
    const keywords = [
        'whey', 'protein', 'supplement', 'bcaa', 'creatine', 'pre-workout', 'preworkout',
        'mass gainer', 'amino', 'casein', 'isolate', 'concentrate', 'fitness', 'gym',
        'workout', 'exercise', 'muscle', 'bulking', 'cutting', 'bodybuilding',
        'เวย์', 'โปรตีน', 'อาหารเสริม', 'ฟิตเนส', 'ออกกำลังกาย', 'กล้ามเนื้อ', 'ยิม',
        'เพิ่มกล้าม', 'ลดไขมัน', 'สร้างกล้าม'
    ];
    return keywords.some(k => t.includes(k));
};

export const buildCharacterDescription = (settings: CharacterSettings, product: ProductSettings): string => {
    // Gender + Age mapping
    const genderText = settings.gender === 'male' ? 'Thai man' : 'Thai woman';
    const ageMapping: Record<string, string> = {
        'teen': '16-20 years old',
        'young-adult': '25-30 years old',
        'adult': '35-40 years old',
        'middle-age': '50-55 years old',
        'senior': '65-70 years old'
    };
    const ageText = ageMapping[settings.ageRange] || '25-30 years old';

    // Detect fitness/supplement product → force athletic body
    const isFitness = isFitnessProduct(product.productName, product.productDescription);

    // Physical appearance — athletic override for fitness/supplement products
    const physicalAppearance = isFitness
        ? (settings.gender === 'female'
            ? `
- Hair: shoulder-length straight black hair with side-swept bangs
- Face: oval face shape, light honey-brown skin, natural makeup with red lipstick
- Build: athletic toned fit body, visible muscle definition, slim waist, height approximately 168cm
- Eyes: warm brown eyes, defined eyebrows
- Physique: fit and healthy looking, toned arms and shoulders, flat stomach, athletic posture`
            : `
- Hair: short black hair, neatly styled
- Face: angular face shape, light brown skin, clean-shaven
- Build: muscular athletic build, broad shoulders, visible muscle definition, height approximately 178cm
- Eyes: dark brown eyes, straight eyebrows
- Physique: well-built gym body, toned arms and chest, six-pack visible through shirt, confident athletic posture`)
        : (settings.gender === 'female'
            ? `
- Hair: shoulder-length straight black hair with side-swept bangs
- Face: oval face shape, light honey-brown skin, natural makeup with red lipstick
- Build: slim body, height approximately 165cm
- Eyes: warm brown eyes, defined eyebrows`
            : `
- Hair: short black hair, neatly styled
- Face: angular face shape, light brown skin, clean-shaven
- Build: average build, height approximately 175cm
- Eyes: dark brown eyes, straight eyebrows`);

    // Personality to behavior mapping
    const personalityMapping: Record<string, string> = {
        'cheerful': 'energetic and enthusiastic presenter style, bright smile, expressive gestures',
        'calm': 'calm and composed demeanor, gentle smile, controlled movements',
        'professional': 'professional and trustworthy, confident posture, articulate gestures',
        'playful': 'playful and fun personality, animated expressions, dynamic movements',
        'mysterious': 'cool and mysterious vibe, subtle smile, minimalist gestures'
    };
    const personalityText = personalityMapping[settings.personality] || personalityMapping['cheerful'];

    // Clothing description — fitness products auto-override to sporty athletic wear
    const clothingMapping: Record<string, string> = {
        'casual': settings.gender === 'female'
            ? 'white V-neck t-shirt, light blue jeans'
            : 'navy blue polo shirt, khaki pants',
        'formal': settings.gender === 'female'
            ? 'cream silk blouse, black pencil skirt'
            : 'white dress shirt, dark blue suit jacket',
        'fashion': settings.gender === 'female'
            ? 'trendy cropped top, high-waisted pants, statement jewelry'
            : 'designer t-shirt, fitted blazer, stylish accessories',
        'sporty': settings.gender === 'female'
            ? 'athletic tank top, yoga pants'
            : 'sports jersey, athletic shorts'
    };
    const mainStyle = isFitness ? 'sporty' : (settings.clothingStyles[0] || 'casual');
    const clothingText = isFitness
        ? (settings.gender === 'female'
            ? 'fitted athletic sports bra and leggings, showing toned figure, gym-ready outfit'
            : 'fitted gym tank top showing muscular arms, athletic shorts, gym-ready outfit')
        : (clothingMapping[mainStyle] || clothingMapping['casual']);

    // Background description — fitness products auto-override to gym environment
    const backgroundMapping: Record<string, string> = {
        'studio': 'clean white/grey studio backdrop with soft diffused lighting',
        'outdoor': 'bright outdoor setting with natural sunlight and green nature',
        'home': 'cozy modern living room with warm ambient lighting',
        'office': 'professional office environment with neutral colors',
        'abstract': 'abstract gradient background with soft colors'
    };
    const backgroundText = isFitness
        ? 'modern gym interior with weight racks and exercise equipment, fit people working out in background, bright motivational lighting, athletic atmosphere'
        : (backgroundMapping[settings.background] || backgroundMapping['studio']);

    // Expression description
    const expressionMapping: Record<string, string> = {
        'neutral': 'natural pleasant expression',
        'happy': 'bright genuine smile showing teeth',
        'excited': 'enthusiastic excited expression with wide eyes'
    };
    const expressionText = expressionMapping[settings.expression] || 'natural pleasant expression';

    // Build full description
    const description = `
[CHARACTER IDENTITY - MUST REMAIN EXACTLY THE SAME IN ALL SCENES:]
${genderText}, ${ageText}
${physicalAppearance}

[OUTFIT - SAME THROUGHOUT:]
- ${clothingText}
- Accessories: gold necklace, small stud earrings

[PERSONALITY & EXPRESSION:]
- ${personalityText}
- Expression: ${expressionText}

[ENVIRONMENT - SAME LOCATION:]
- ${backgroundText}

[PRODUCT - ALWAYS VISIBLE:]
- Product: ${product.productName || 'the advertised product'}
- Holding/displaying the product consistently

[CONSISTENCY RULES:]
- Same fictional character, same hair, same clothes in every scene
- Same lighting and color grading throughout
- Continuous story flow as if one uninterrupted video
`.trim();

    return description;
};

/**
 * Build scene-specific prompt with character description prefix
 * This ensures every scene has the same character description
 */
export const buildScenePrompt = (
    sceneNumber: number,
    sceneScript: string,
    characterSettings: CharacterSettings,
    productSettings: ProductSettings
): string => {
    const characterDesc = buildCharacterDescription(characterSettings, productSettings);

    // Scene-specific action based on scene number
    const sceneAction = sceneNumber === 1
        ? 'HOOK scene: Character speaks directly to camera, grabs attention'
        : sceneNumber === 2
            ? 'DEMO scene: Character demonstrates product, shows usage'
            : 'CTA scene: Character makes final pitch, encourages action';

    const prompt = `${characterDesc}

[SCENE ${sceneNumber} ACTION:]
${sceneAction}

[SCRIPT/VOICEOVER:]
"${sceneScript}"

[CAMERA:]
Medium shot, slight movement, professional video ad style
`;

    return prompt;
};

/**
 * Extract character settings from form values
 */
export const extractCharacterSettings = (formValues: any): CharacterSettings => {
    return {
        gender: formValues.gender || 'female',
        ageRange: formValues.ageRange || 'young-adult',
        personality: formValues.personality || 'cheerful',
        clothingStyles: formValues.clothingStyles || ['casual'],
        background: formValues.background || 'studio',
        expression: formValues.expression || 'happy',
        movement: formValues.movement || 'minimal',
        cameraAngles: formValues.cameraAngles || ['front']
    };
};
