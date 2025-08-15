import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, MenuItem, ListItemText, CardMedia, Stack } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HPresetOptionsMenu(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    return (_jsxs(Menu, { id: "preset-options-menu", anchorEl: props.anchorEl, open: props.isOpen, onClose: props.onClose, transformOrigin: { horizontal: 'right', vertical: 'top' }, anchorOrigin: { horizontal: 'right', vertical: 'bottom' }, slotProps: {
            paper: {
                sx: {
                    backgroundColor: colors.onBackground,
                    color: colors.surface,
                    border: `1px solid ${colors.onSurfaceVariant1}`,
                    '& .MuiMenuItem-root:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                },
            },
        }, children: [_jsx(MenuItem, { onClick: props.onRename, children: _jsxs(Stack, { direction: "row", spacing: "10px", children: [_jsx(CardMedia, { component: "img", image: "/v1/svg/rename-menu-button.svg", sx: { width: '20px', height: '20px' } }), _jsx(ListItemText, { sx: { ...typography.bodyMedium }, children: "Rename" })] }) }), _jsx(MenuItem, { onClick: props.onDelete, children: _jsxs(Stack, { direction: "row", spacing: "10px", children: [_jsx(CardMedia, { component: "img", image: "/v1/svg/delete-menu-button.svg", sx: { width: '20px', height: '20px' } }), _jsx(ListItemText, { sx: { ...typography.bodyMedium, color: colors.error }, children: "Delete" })] }) })] }));
}
