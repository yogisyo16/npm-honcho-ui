interface Props {
    activeSubPanel: string;
    tempScore: number;
    tintScore: number;
    vibranceScore: number;
    saturationScore: number;
    exposureScore: number;
    highlightsScore: number;
    shadowScore: number;
    whiteScore: number;
    blackScore: number;
    contrastScore: number;
    clarityScore: number;
    sharpnessScore: number;
    onTempChange: (value: number) => void;
    onTintChange: (value: number) => void;
    onVibranceChange: (value: number) => void;
    onSaturationChange: (value: number) => void;
    onExposureChange: (value: number) => void;
    onHighlightsChange: (value: number) => void;
    onShadowsChange: (value: number) => void;
    onWhitesChange: (value: number) => void;
    onBlacksChange: (value: number) => void;
    onContrastChange: (value: number) => void;
    onClarityChange: (value: number) => void;
    onSharpnessChange: (value: number) => void;
}
export default function HTabColorAdjustmentMobile(props: Props): import("react/jsx-runtime").JSX.Element | null;
export {};
