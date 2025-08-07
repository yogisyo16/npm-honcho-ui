import React from "react";
type Preset = {
    id: string;
    name: string;
};
interface Props {
    presets: Preset[];
    expandedPanels: string[];
    selectedPreset: string | null;
    presetMenuAnchorEl: null | HTMLElement;
    activePresetMenuId: string | null;
    onChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    onOpenPresetModal: () => void;
    onOpenWatermarkView: () => void;
    onSelectPreset: (id: string) => void;
    onPresetMenuClick: (event: React.MouseEvent<HTMLElement>, presetId: string) => void;
    onPresetMenuClose: () => void;
    onRemovePreset: () => void;
    onRenamePreset: () => void;
    onDeletePreset: () => void;
}
export default function HAccordionPreset(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
