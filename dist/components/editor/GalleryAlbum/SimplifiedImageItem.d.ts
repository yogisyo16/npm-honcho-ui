import type { PhotoData } from './SimplifiedAlbumGallery';
interface SimplifiedImageItemProps {
    photo: PhotoData;
    onToggleSelect: (photo: PhotoData) => void;
    onPreview: (photo: PhotoData) => void;
}
export default function SimplifiedImageItem({ photo, onToggleSelect, onPreview }: SimplifiedImageItemProps): import("react/jsx-runtime").JSX.Element;
export {};
