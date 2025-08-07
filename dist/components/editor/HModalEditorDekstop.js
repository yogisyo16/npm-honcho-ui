import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
// Create modal for any usage coverage
export default function HModalEditorDekstop(props) {
    const colors = useColors();
    const typography = useHonchoTypography();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 6,
        spacing: 6,
    };
    return (_jsx(_Fragment, { children: _jsx(Modal, { open: props.modalOpen, onClose: props.modalClose, children: _jsxs(Box, { sx: style, children: [_jsx(Typography, { variant: "h6", color: "initial", children: props.modalTitle }), _jsx(Box, { sx: { mt: 2 }, children: props.children }), _jsx(Typography, { color: "initial", children: props.modalInformation }), _jsx(Stack, { children: props.action }), _jsxs(Stack, { direction: "row", spacing: 2, sx: { mt: 3, justifyContent: 'flex-end' }, children: [_jsx(Button, { sx: { ...typography.labelMedium, color: colors.onSurface, backgroundColor: colors.surface, }, onClick: props.modalClose, children: "Cancel" }), _jsx(Button, { sx: { ...typography.labelMedium, color: colors.onSurface, backgroundColor: colors.surface, }, onClick: props.onConfirm, children: "Save" })] })] }) }) }));
}
