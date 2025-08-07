import React from "react";
interface Props {
    anchorElZoom: null | HTMLElement;
    onScale: (event: React.MouseEvent<HTMLElement>) => void;
    onZoomMenuClose: () => void;
    zoomLevelText: string;
    onZoomAction: (zoomLevel: string) => void;
    onShowOriginal: () => void;
    onShowEdited: () => void;
}
export default function HFooter(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
