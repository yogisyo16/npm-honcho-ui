import React from "react";
interface Props {
    modalName: string;
    modalOpen: boolean;
    modalTitle: string;
    modalInformation: string;
    children: React.ReactNode;
    action?: React.ReactNode;
    modalClose: () => void;
    onConfirm: () => void;
}
export default function HModalMobile(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
