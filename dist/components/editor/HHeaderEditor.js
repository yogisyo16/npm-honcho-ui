import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, IconButton, CardMedia, MenuItem, ListItemText, ListItemIcon, Menu, Button, Typography } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
import useIsMobile from "../../utils/isMobile";
export default function HHeaderEditor(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const open = Boolean(props.anchorEl);
    const isMobile = useIsMobile();
    return (_jsx(_Fragment, { children: _jsxs(Stack, { direction: "row", justifyContent: "space-between", width: "100%", sx: { pr: !isMobile ? "24px" : "6px" }, children: [_jsx(Stack, { direction: "row", justifyContent: "flex-start", sx: { pl: !isMobile ? "0px" : "14px" }, children: _jsx(IconButton, { "aria-label": "back", onClick: props.onBack, sx: {
                            '&:active': {
                                transform: 'scale(0.92)',
                            },
                            transition: 'transform 0.1s ease-in-out',
                        }, children: _jsx(CardMedia, { title: "back", src: "svg/Back.svg", component: "img" }) }) }), _jsxs(Stack, { direction: "row", justifyContent: "flex-end", alignItems: "center", sx: { pt: "20px", pb: "12px" }, spacing: 0.1, children: [_jsx(Button, { variant: "text", onClick: props.onSelectButton, sx: { color: colors.outlineVariant }, children: props.valueSelect }), _jsx(IconButton, { "aria-label": "undo", onClick: props.onUndo, sx: { color: colors.outlineVariant }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/undo-editor.svg" }) }), _jsx(IconButton, { "aria-label": "redo", onClick: props.onRedo, sx: { color: colors.outlineVariant }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/redo-editor.svg" }) }), _jsx(IconButton, { "aria-label": "option", onClick: props.onMenuClick, "aria-controls": open ? 'options-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/dots-editor.svg" }) }), _jsxs(Menu, { id: "options-menu", anchorEl: props.anchorEl, open: open, onClose: props.onMenuClose, transformOrigin: { horizontal: 'right', vertical: 'top' }, anchorOrigin: { horizontal: 'right', vertical: 'bottom' }, slotProps: {
                                paper: {
                                    sx: {
                                        backgroundColor: colors.onBackground,
                                        color: colors.surface,
                                        border: `1px solid ${colors.outlineVariant}`,
                                    },
                                },
                            }, children: [_jsxs(MenuItem, { onClick: props.onRevert, children: [_jsx(ListItemIcon, { sx: { minWidth: 0, mr: "0px", px: "0px" }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/revert-editor.svg", sx: { width: "20px", height: "20px" } }) }), _jsx(ListItemText, { children: _jsx(Typography, { sx: { fontSize: "14px", color: colors.surface }, children: "Revert to original" }) })] }), _jsxs(MenuItem, { onClick: props.onCopyEdit, children: [_jsx(ListItemIcon, { sx: { minWidth: 0, mr: "0px", px: "0px" }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/copy-editor.svg", sx: { width: "20px", height: "20px" } }) }), _jsx(ListItemText, { children: _jsx(Typography, { sx: { fontSize: "14px", color: colors.surface }, children: "Copy edits" }) }), !isMobile &&
                                            _jsx(ListItemIcon, { sx: { marginLeft: 'auto' }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/shortcut-copy-editor.svg", sx: { width: "25px", height: "20px" } }) })] }), _jsxs(MenuItem, { onClick: props.onPasteEdit, disabled: !props.isPasteEnabled, children: [_jsx(ListItemIcon, { sx: { minWidth: 0, mr: "0px", px: "0px" }, children: _jsx(CardMedia, { component: "img", image: !props.isPasteEnabled ? "/v1/svg/paste-editor.svg" : "/v1/svg/paste-white.svg", sx: { width: "20px", height: "20px" } }) }), _jsx(ListItemText, { children: _jsx(Typography, { sx: { fontSize: "14px", color: !props.isPasteEnabled ? colors.onSurfaceVariant1 : colors.surface }, children: "Paste edits" }) }), !isMobile &&
                                            _jsx(ListItemIcon, { sx: { marginLeft: '30px' }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/shortcut-paste-editor.svg", sx: { width: "25px", height: "20px" } }) })] })] })] })] }) }));
}
