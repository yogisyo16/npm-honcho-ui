interface Props {
    exposureScore: number;
    contrastScore: number;
    highlightsScore: number;
    shadowScore: number;
    whiteScore: number;
    blackScore: number;
    onExposureChange: (value: number) => void;
    onContrastChange: (value: number) => void;
    onHighlightsChange: (value: number) => void;
    onShadowsChange: (value: number) => void;
    onWhitesChange: (value: number) => void;
    onBlacksChange: (value: number) => void;
}
export default function HSliderLightMobile(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
