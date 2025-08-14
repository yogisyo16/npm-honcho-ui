import React from "react";
import { AdjustmentValues } from "../../../lib/editor/honcho-editor";
import type { PhotoData as BulkPhotoData } from "../../../hooks/editor/useHonchoEditorBulk";
interface ExtendedPhotoData extends BulkPhotoData {
    adjustments?: Partial<AdjustmentValues>;
    frame?: string;
}
interface ImageGalleryProps {
    imageCollection: ExtendedPhotoData[];
    isSelectedMode: boolean;
    isHiddenGallery: boolean;
    enableEditor: boolean;
    onPreview: (photo: ExtendedPhotoData) => () => void;
    onSelectedMode: () => void;
    onToggleSelect: (photo: ExtendedPhotoData) => () => void;
}
declare const AlbumImageGallery: React.FC<ImageGalleryProps>;
export default AlbumImageGallery;
