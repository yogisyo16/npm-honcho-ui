import React from "react";
type CheckState = {
    [key: string]: boolean;
};
interface Props {
    colorChecks: CheckState;
    lightChecks: CheckState;
    detailsChecks: CheckState;
    expanded: {
        color: boolean;
        light: boolean;
        details: boolean;
    };
    onCopyEdit: () => void;
    onParentChange: (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>) => void;
    onChildChange: (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>) => void;
    onToggleExpand: (section: 'color' | 'light' | 'details') => void;
    setColorChecks: React.Dispatch<React.SetStateAction<any>>;
    setLightChecks: React.Dispatch<React.SetStateAction<any>>;
    setDetailsChecks: React.Dispatch<React.SetStateAction<any>>;
}
export declare function HDialogCopy(props: Props): import("react/jsx-runtime").JSX.Element;
interface PropsPreset {
    colorChecks: CheckState;
    lightChecks: CheckState;
    detailsChecks: CheckState;
    expanded: {
        color: boolean;
        light: boolean;
        details: boolean;
    };
    onParentChange: (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>) => void;
    onChildChange: (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>) => void;
    onToggleExpand: (section: 'color' | 'light' | 'details') => void;
    setColorChecks: React.Dispatch<React.SetStateAction<any>>;
    setLightChecks: React.Dispatch<React.SetStateAction<any>>;
    setDetailsChecks: React.Dispatch<React.SetStateAction<any>>;
}
export declare function HDialogPreset(props: PropsPreset): import("react/jsx-runtime").JSX.Element;
export {};
