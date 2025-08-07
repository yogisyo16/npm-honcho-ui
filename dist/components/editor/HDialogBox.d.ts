import React, { ReactElement } from "react";
interface Props {
    open: boolean;
    title: React.ReactNode;
    description?: React.ReactNode | ReactElement;
    onClose?: () => void;
    action?: React.ReactNode;
    actionAdjust?: React.ReactNode;
}
export declare function HBaseDialog(props: Props): import("react/jsx-runtime").JSX.Element;
export declare function HDialogForPreset(props: Props): import("react/jsx-runtime").JSX.Element;
interface ButtonProps {
    text: string;
    onClick: () => void;
}
export declare function PositiveButton(props: ButtonProps): import("react/jsx-runtime").JSX.Element;
export declare function NegativeButton(props: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
