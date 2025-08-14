import type { AdjustmentValues } from "../../../lib/editor/honcho-editor";
import { GallerySetup } from "../../../hooks/editor/type";
interface PhotoProps<T> {
    src: string;
    alt?: string;
    width: number;
    height: number;
    key: string;
    photo?: T;
}
interface Props {
    margin?: any;
    index: number;
    photo: PhotoProps<GallerySetup>;
    direction: "row" | "column";
    isSelectedMode: boolean;
    isFullScreenMode: boolean;
    isSelected?: boolean;
    isHiddenGallery: boolean;
    onToggleSelect: () => void;
    onPreview: () => void;
    onSelectedMode: () => void;
    enableEditor?: boolean;
    adjustments?: Partial<AdjustmentValues>;
    frame?: string | null;
}
declare const GalleryImageItem: (props: Props) => import("react/jsx-runtime").JSX.Element;
export default GalleryImageItem;
