import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Dialog, DialogContent, IconButton, Stack, Typography, } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
import { CloseOutlined } from "@mui/icons-material";
export function HBaseDialog(props) {
    const colors = useColors();
    const typography = useHonchoTypography();
    return (_jsxs(Dialog, { disableScrollLock: true, open: props.open, onClose: props.onClose, "aria-labelledby": "responsive-dialog-title", PaperProps: {
            sx: {
                borderRadius: "28px",
                width: { xs: "328px", sm: "456px", md: "456px" },
                // maxWidth: { xs: 328, sm: "456px", md: "456px" },
                //maxHeight: 306,
                // margin: { xs: 0, sm: "auto" },
            },
        }, children: [_jsx(DialogContent, { sx: { pb: "16px", mb: "0px" }, children: _jsxs(Stack, { direction: "column", children: [_jsxs(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", children: [_jsx(Typography, {}), _jsx(Typography, { color: colors.onSurface, sx: { ...typography.titleMedium }, children: props.title }), _jsx(CloseButton, { onClick: props.onClose })] }), _jsx(Typography, { variant: "bodyMedium", color: colors.onSurface, children: props.description })] }) }), props.action && (_jsx(DialogContent, { sx: { pt: "0px", mt: "0px" }, children: _jsx(Stack, { alignItems: "center", width: "100%", children: props.action }) }))] }));
}
export function HDialogForPreset(props) {
    const colors = useColors();
    const typography = useHonchoTypography();
    return (_jsx(Dialog, { disableScrollLock: true, open: props.open, onClose: props.onClose, "aria-labelledby": "responsive-dialog-title", PaperProps: {
            sx: {
                borderRadius: "28px",
                maxWidth: { xs: 328, sm: "456px", md: "456px" },
                //maxHeight: 306,
                margin: { xs: 0, sm: "auto" },
            },
        }, children: _jsx(DialogContent, { sx: { padding: { xs: "24px 24px 0 24px", sm: "24 24px 0 24px" } }, children: _jsxs(Stack, { spacing: 0, direction: "column", children: [_jsx(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", children: _jsx(Typography, { color: colors.onSurface, sx: { ...typography.labelLarge }, children: props.title }) }), _jsxs(Stack, { direction: "column", sx: { pt: "12px" }, children: [_jsx(Stack, { sx: { pt: "20px", pb: "20px" }, children: props.action }), _jsxs(Stack, { children: [_jsx(Typography, { variant: "bodyMedium", color: colors.onSurface, children: props.description }), props.actionAdjust] })] })] }) }) }));
}
export function PositiveButton(props) {
    const colors = useColors();
    return (_jsx(Button, { variant: "text", sx: {
            ":hover": {
                backgroundColor: "transparent",
            },
        }, onClick: props.onClick, children: _jsx(Typography, { variant: "buttonMedium", color: colors.onSurface, children: props.text }) }));
}
export function NegativeButton(props) {
    const colors = useColors();
    return (_jsx(Button, { variant: "text", sx: {
            borderRadius: 100,
            color: colors.error,
            ":hover": {
                backgroundColor: "transparent",
            },
        }, disabled: false, onClick: props.onClick, children: props.text }));
}
function CloseButton(props) {
    return (_jsx(IconButton, { onClick: props.onClick, children: _jsx(CloseOutlined, { htmlColor: "black" }) }));
}
