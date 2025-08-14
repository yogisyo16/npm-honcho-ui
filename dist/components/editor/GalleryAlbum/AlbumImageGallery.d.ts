import React from "react";
import type { PhotoData } from "../../../hooks/editor/useHonchoEditorBulk";
interface ImageGalleryProps {
    imageCollection: PhotoData[];
    onToggleSelect: (photo: PhotoData) => void;
}
export declare const AlbumImageGallery: React.FC<ImageGalleryProps>;
export {};
