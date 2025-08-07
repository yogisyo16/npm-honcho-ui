interface Props {
    activeRatio: string;
    activeSquareRatio: string;
    activeWideRatio: string;
    angelChange: number;
    widthPX: number;
    heightPX: number;
    onRatioSelect: (ratio: string) => void;
    onAngleChange: (angle: number) => void;
    onWidthChange: (value: number) => void;
    onHeightChange: (value: number) => void;
}
export default function HAccordionAspectRatio(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
