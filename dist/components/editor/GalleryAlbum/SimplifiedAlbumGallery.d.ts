import type { Gallery } from "../../../hooks/editor/type";
export interface PhotoData {
    key: string;
    src: string;
    width: number;
    height: number;
    alt: string;
    isSelected: boolean;
    originalData: Gallery;
}
interface SimplifiedAlbumGalleryProps {
    imageCollection: PhotoData[];
    onToggleSelect: (photo: PhotoData) => void;
    onPreview: (photo: PhotoData) => void;
}
export default function SimplifiedAlbumGallery({ imageCollection, onToggleSelect, onPreview }: SimplifiedAlbumGalleryProps): import("react/jsx-runtime").JSX.Element;
export {};
