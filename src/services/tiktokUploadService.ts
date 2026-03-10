/**
 * TikTok Upload Service — STUB
 * ระบบถูกลบ รอใส่ของเพื่อนแทน (UI ยังคงอยู่)
 */

import { TikTokProduct } from "./tiktokProductService";

export interface TikTokUploadOptions {
  videoUrl: string;
  product: TikTokProduct;
  caption?: string;
  hashtags?: string[];
  scheduleTime?: string;
  postingMode?: 'immediate' | 'scheduled';
}

export const uploadToTikTok = async (_options: TikTokUploadOptions): Promise<{ success: boolean; error?: string }> => {
  return { success: false, error: 'TikTok system not installed — รอติดตั้งระบบใหม่' };
};

export interface TikTokPostHistoryItem {
  id: string;
  timestamp: number;
  productName: string;
  caption: string;
  hashtags: string[];
  scheduleTime: string;
  status: 'success' | 'failed';
  error?: string;
}

export const addPostHistory = async (_item: Omit<TikTokPostHistoryItem, 'id' | 'timestamp'>): Promise<void> => {};
export const getPostHistory = async (): Promise<TikTokPostHistoryItem[]> => [];
export const isTikTokAutoPostEnabled = async (): Promise<boolean> => false;
export const setTikTokAutoPostEnabled = async (_enabled: boolean): Promise<void> => {};
