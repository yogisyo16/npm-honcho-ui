import React from "react";
import { SelectChangeEvent } from "@mui/material";
type Preset = {
    id: string;
    name: string;
};
interface Props {
    presets: Preset[];
    selectedPreset: string;
    expandedPanels: string[];
    presetMenuAnchorEl: null | HTMLElement;
    activePresetMenuId: string | null;
    isMenuOpen: boolean;
    onPanelChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    onSelectPreset: (event: SelectChangeEvent<string>) => void;
    onPresetMenuClick: (event: React.MouseEvent<HTMLElement>, presetId: string) => void;
    onPresetMenuClose: () => void;
    onRemovePreset: () => void;
    onRenamePreset: () => void;
    onDeletePreset: () => void;
    onOpenPresetModal: () => void;
}
export default function HBulkPreset(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
