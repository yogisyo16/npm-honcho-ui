import React from "react";
interface Props {
    children: React.ReactNode;
    activePanel: string;
    activeSubPanel: string;
    setActivePanel: (tab: string) => void;
    setActiveSubPanel: (subTab: string) => void;
    panelRef: React.RefObject<HTMLDivElement>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    panelHeight: number;
    handleDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
}
export default function HImageEditorMobileLayout(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
