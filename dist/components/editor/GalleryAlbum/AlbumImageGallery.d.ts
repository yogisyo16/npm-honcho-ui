import React from "react";
import { AdjustmentValues } from "../../../lib/editor/honcho-editor";
import type { PhotoData as BulkPhotoData } from "../../../hooks/editor/useHonchoEditorBulk";
export interface ExtendedPhotoData extends BulkPhotoData {
    adjustments?: Partial<AdjustmentValues>;
    frame?: string;
}
interface ImageGalleryProps {
    imageCollection: ExtendedPhotoData[];
    isSelectedMode: boolean;
    isHiddenGallery: boolean;
    enableEditor: boolean;
    onSelectedMode: () => void;
    onToggleSelect: (photo: ExtendedPhotoData) => void;
}
export declare const AlbumImageGallery: React.FC<ImageGalleryProps>;
export {};
