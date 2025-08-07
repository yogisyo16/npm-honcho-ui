import React from "react";
type Preset = {
    id: string;
    name: string;
};
interface Props {
    presets: Preset[];
    selectedPreset: string | null;
    presetOptionModal: (event: React.MouseEvent<HTMLElement>, presetId: string) => void;
    onOpenPresetModal: () => void;
    onSelectPreset: (id: string) => void;
}
export default function HTabPresetMobile(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
