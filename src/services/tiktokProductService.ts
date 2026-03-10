/**
 * TikTok Product Service — STUB
 * ระบบถูกลบ รอใส่ของเพื่อนแทน (UI ยังคงอยู่)
 */

export interface TikTokProduct {
  id: string;
  name: string;
  imageUrl: string;
  price?: string;
  category?: string;
  syncedAt: number;
}

export const getSyncedProducts = async (): Promise<TikTokProduct[]> => [];
export const syncProduct = async (_product: TikTokProduct): Promise<void> => {};
export const deleteProduct = async (_productId: string): Promise<void> => {};
export const getProductById = async (_productId: string): Promise<TikTokProduct | null> => null;
export const setActiveProduct = async (_productId: string | null): Promise<void> => {};
export const getActiveProduct = async (): Promise<TikTokProduct | null> => null;
export const triggerProductSync = async (): Promise<{ success: boolean; product?: TikTokProduct; products?: TikTokProduct[]; count?: number; error?: string }> => {
  return { success: false, error: 'TikTok system not installed — รอติดตั้งระบบใหม่' };
};
export const openTikTokStudio = (): void => {
  window.open('https://www.tiktok.com/tiktokstudio/upload?from=creator_center', '_blank');
};
export const openSellerCenter = (): void => {
  window.open('https://seller-th.tiktok.com/product/manage', '_blank');
};
