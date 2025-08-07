import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Stack, IconButton, CardMedia, MenuItem, ListItemText, Menu } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HFooter(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const isZoomMenuOpen = Boolean(props.anchorElZoom);
    return (_jsx(_Fragment, { children: _jsxs(Stack, { direction: "row", alignItems: "center", spacing: 0.5, children: [_jsx(Button, { id: "zoom-button", onClick: props.onScale, "aria-controls": isZoomMenuOpen ? 'zoom-options-menu' : undefined, "aria-haspopup": "true", "aria-expanded": isZoomMenuOpen ? 'true' : undefined, sx: {
                        color: colors.surface,
                        fontSize: "14px",
                        '&.MuiButton-outlined': {
                            color: colors.surface,
                        },
                    }, endIcon: _jsx(CardMedia, { component: "img", image: isZoomMenuOpen ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg", sx: { width: "11.67px", height: "5.83px" } }), children: props.zoomLevelText }), _jsx(IconButton, { "aria-label": "before-after", onMouseDown: props.onShowOriginal, onMouseUp: props.onShowEdited, onMouseLeave: props.onShowEdited, onTouchStart: props.onShowOriginal, onTouchEnd: props.onShowEdited, sx: { color: colors.outlineVariant }, children: _jsx(CardMedia, { component: "img", title: "before-after", image: "/v1/svg/before-after-editor.svg", sx: { width: "20px", height: "20px" } }) }), _jsxs(Menu, { id: "zoom-options-menu", anchorEl: props.anchorElZoom, open: isZoomMenuOpen, onClose: props.onZoomMenuClose, anchorOrigin: { vertical: 'top', horizontal: 'center' }, transformOrigin: { vertical: 'bottom', horizontal: 'center' }, slotProps: {
                        paper: {
                            sx: {
                                backgroundColor: colors.onBackground,
                                color: colors.surface,
                                border: `1px solid ${colors.outlineVariant}`,
                            },
                        },
                    }, children: [_jsx(MenuItem, { onClick: () => props.onZoomAction('in'), children: _jsx(ListItemText, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Zoom in" }) }), _jsx(MenuItem, { onClick: () => props.onZoomAction('out'), children: _jsx(ListItemText, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Zoom out" }) }), _jsx(MenuItem, { onClick: () => props.onZoomAction('fit'), children: _jsx(ListItemText, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Zoom to fit" }) }), _jsx(MenuItem, { onClick: () => props.onZoomAction('50%'), children: _jsx(ListItemText, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Zoom to 50%" }) }), _jsx(MenuItem, { onClick: () => props.onZoomAction('100%'), children: _jsx(ListItemText, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Zoom to 100%" }) }), _jsx(MenuItem, { onClick: () => props.onZoomAction('200%'), children: _jsx(ListItemText, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Zoom to 200%" }) })] })] }) }));
}
