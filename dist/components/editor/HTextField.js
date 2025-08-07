import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { TextField, Stack, Button } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export function HTextField(props) {
    const colors = useColors();
    const typography = useHonchoTypography();
    return (_jsx(_Fragment, { children: _jsx(TextField, { autoFocus: true, margin: "dense", id: "name", label: "Preset Name", type: "text", fullWidth: true, variant: "standard", defaultValue: props.valueName, onChange: props.setName, sx: {
                backgroundColor: "#F6F6F6",
                p: "7px",
                borderRadius: "6px",
                '& .MuiInputLabel-root': {
                    color: colors.onSurfaceVariant, // A slightly dimmer color for the placeholder
                    pt: '10px',
                    pl: '10px',
                },
                '& .MuiInput-input': {
                    color: colors.onSurface,
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: colors.onSurfaceVariant, // Or a different color if you prefer
                },
            } }) }));
}
export function HTextFieldRename(props) {
    const colors = useColors();
    const typography = useHonchoTypography();
    return (_jsx(_Fragment, { children: _jsxs(Stack, { direction: "column", spacing: 2, children: [_jsx(TextField, { autoFocus: true, type: "text", fullWidth: true, variant: "standard", defaultValue: props.valueName, onChange: props.setName, sx: {
                        backgroundColor: "#F6F6F6",
                        p: "7px",
                        borderRadius: "6px",
                        '& .MuiInputLabel-root': {
                            pt: '10px',
                            pl: '10px',
                        },
                    } }), _jsxs(Stack, { direction: "row", justifyContent: "end", alignItems: "center", children: [_jsx(Button, { color: "primary", onClick: props.onCancel, sx: {
                                backgroundColor: colors.surface,
                                color: colors.onSurface,
                                '&:hover': {
                                    backgroundColor: colors.onSurfaceVariant1,
                                },
                                ...typography.titleMedium,
                            }, children: "Cancel" }), _jsx(Button, { color: "primary", onClick: props.onSaveRenamePreset, sx: {
                                backgroundColor: colors.surface,
                                color: colors.onSurface,
                                '&:hover': {
                                    backgroundColor: colors.onSurfaceVariant1,
                                },
                                ...typography.titleMedium,
                            }, children: "Save" })] })] }) }));
}
