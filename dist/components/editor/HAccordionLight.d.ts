interface Props {
    ExposureScore: number;
    ContrastScore: number;
    HighlightsScore: number;
    ShadowsScore: number;
    WhitesScore: number;
    BlacksScore: number;
    onContrastChange: (value: number) => void;
    onExposureChange: (value: number) => void;
    onHighlightsChange: (value: number) => void;
    onShadowsChange: (value: number) => void;
    onWhitesChange: (value: number) => void;
    onBlacksChange: (value: number) => void;
}
export default function HAccordionLight(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
