import type { AdjustmentValues } from '../editor/honcho-editor';
interface UseImageProcessorProps {
    photoId: string;
    photoSrc: string;
    enableEditor?: boolean;
    adjustments?: Partial<AdjustmentValues>;
    frame?: string | null;
    priority?: 'high' | 'low';
}
interface UseImageProcessorReturn {
    processedImageSrc: string;
    isProcessingComplete: boolean;
}
export declare function useImageProcessor({ photoId, photoSrc, enableEditor, adjustments, frame, priority, }: UseImageProcessorProps): UseImageProcessorReturn;
export {};
