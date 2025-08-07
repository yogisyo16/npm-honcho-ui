import React from "react";
interface Props {
    activePanel: string;
    isPanelOpen: boolean;
    anchorElZoom: null | HTMLElement;
    children: React.ReactNode;
    footer: React.ReactNode;
    setActivePanel: (accordion: string) => void;
    onScale: (event: React.MouseEvent<HTMLElement>) => void;
    onBeforeAfter: () => void;
    onZoomMenuClose: () => void;
    onZoomAction: (zoomLevel: string) => void;
}
export default function HImageEditorDesktop(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
