import React from "react";
interface Props {
    anchorEl?: null | HTMLElement;
    valueSelect?: string;
    isPasteEnabled?: boolean;
    onBack?: () => void;
    onUndo?: () => void;
    onRedo?: () => void;
    onRevert?: () => void;
    onCopyEdit?: () => void;
    onPasteEdit?: () => void;
    onMenuClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onMenuClose?: () => void;
    onSelectButton?: () => void;
}
export default function HHeaderEditor(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
