interface Props {
    TempScore: number;
    TintScore: number;
    SaturationScore: number;
    VibranceScore: number;
    onTempChange: (value: number) => void;
    onTintChange: (value: number) => void;
    onSaturationChange: (value: number) => void;
    onVibranceChange: (value: number) => void;
}
export default function HAccordionColor(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
