import React from "react";
import { Gallery, GallerySetup } from "../../../hooks/editor/type";
import { AdjustmentValues } from "../../../lib/editor/honcho-editor";
interface PhotoData extends GallerySetup {
    adjustments?: Partial<AdjustmentValues>;
    frame?: string;
    originalData?: Gallery;
}
interface ImageGalleryProps {
    imageCollection: PhotoData[];
    isSelectedMode: boolean;
    isHiddenGallery: boolean;
    enableEditor: boolean;
    onPreview: (photo: PhotoData) => () => void;
    onSelectedMode: () => void;
    onToggleSelect: (photo: PhotoData) => () => void;
}
declare const AlbumImageGallery: React.FC<ImageGalleryProps>;
export default AlbumImageGallery;
