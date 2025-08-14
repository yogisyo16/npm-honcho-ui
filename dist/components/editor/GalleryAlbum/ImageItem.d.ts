import { PhotoData } from "../../../hooks/editor/useHonchoEditorBulk";
interface Props {
    margin?: any;
    index: number;
    data: PhotoData;
    direction: "row" | "column";
    onToggleSelect: () => void;
}
declare const GalleryImageItem: (props: Props) => import("react/jsx-runtime").JSX.Element;
export default GalleryImageItem;
