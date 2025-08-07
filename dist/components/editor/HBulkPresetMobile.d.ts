import React from "react";
import { SelectChangeEvent } from "@mui/material";
type Preset = {
    id: string;
    name: string;
};
interface Props {
    presets: Preset[];
    selectedPresetBulk: string;
    onOpenPresetModalBulk: () => void;
    onSelectPresetBulk: (event: SelectChangeEvent<string>) => void;
    onPresetMenuClickBulk: (event: React.MouseEvent<HTMLElement>, presetId: string) => void;
}
export default function HBulkPresetMobile(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
