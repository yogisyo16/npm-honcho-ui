import React from "react";
interface Props {
    valueName: string;
    setName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare function HTextField(props: Props): import("react/jsx-runtime").JSX.Element;
interface PropsRename {
    valueName: string;
    setName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSaveRenamePreset: () => void;
    onCancel: () => void;
}
export declare function HTextFieldRename(props: PropsRename): import("react/jsx-runtime").JSX.Element;
export {};
