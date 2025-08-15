import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Modal, Box, Typography, Button, Stack, IconButton, CardMedia } from "@mui/material";
import useColors from '../../themes/colors';
export default function HModalMobile(props) {
    const colors = useColors();
    return (_jsx(_Fragment, { children: _jsx(Modal, { open: props.modalOpen, onClose: props.modalClose, children: _jsxs(Stack, { direction: "column", spacing: 2, height: "100%", sx: { p: "10px", backgroundColor: colors.surface }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", children: [_jsxs(Stack, { direction: "row", justifyContent: "flex-start", alignItems: "center", spacing: 1, children: [_jsx(IconButton, { "aria-label": "close", onClick: props.modalClose, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/exit-button-modal-mobile.svg" }) }), _jsx(Typography, { variant: "h6", color: "initial", children: props.modalTitle })] }), _jsx(Button, { onClick: props.onConfirm, children: "Save" })] }), _jsx(Typography, { variant: "inherit", color: "initial", children: props.modalInformation }), _jsx(Box, { sx: { mt: 2 }, children: props.children }), _jsx(Box, { children: props.action })] }) }) }));
}
