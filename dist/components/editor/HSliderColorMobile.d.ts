interface Props {
    tempScore: number;
    tintScore: number;
    saturationScore: number;
    vibranceScore: number;
    onTempChange: (value: number) => void;
    onTintChange: (value: number) => void;
    onVibranceChange: (value: number) => void;
    onSaturationChange: (value: number) => void;
}
export default function HSliderColorMobile(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
