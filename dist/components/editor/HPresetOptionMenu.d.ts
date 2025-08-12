interface Props {
    anchorEl: null | HTMLElement;
    isOpen: boolean;
    onClose: () => void;
    isPresetSelected?: boolean;
    onRemove: () => void;
    onRename: () => void;
    onDelete: () => void;
}
export default function HPresetOptionsMenu(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
