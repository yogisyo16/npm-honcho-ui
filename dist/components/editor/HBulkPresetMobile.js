import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Typography, Stack, IconButton, CardMedia, Button, MenuItem, Box, FormControl, Select } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
// Static `presets` array has been removed.
export default function HBulkPresetMobile(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const CustomSelectIcon = (iconProps) => {
        const isExpanded = iconProps.className?.includes('MuiSelect-iconOpen');
        return (_jsx(CardMedia, { component: "img", image: isExpanded ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg", sx: { width: "11.67px", height: "5.83px", right: '14px', position: 'absolute', pointerEvents: 'none' } }));
    };
    return (_jsx(_Fragment, { children: _jsxs(Stack, { direction: "column", sx: { px: "0px", mx: "16px", mt: "6px", mb: "0px" }, children: [_jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Preset" }), _jsx(FormControl, { fullWidth: true, children: _jsxs(Select, { fullWidth: true, value: props.selectedPresetBulk, onChange: props.onSelectPresetBulk, IconComponent: CustomSelectIcon, renderValue: (selectedId) => {
                            // Uses props.presets to find the name
                            const selectedPresetBulkObject = props.presets.find(p => p.id === selectedId);
                            if (!selectedPresetBulkObject) {
                                return _jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Select" });
                            }
                            return _jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: selectedPresetBulkObject.name });
                        }, MenuProps: {
                            anchorOrigin: { vertical: 'top', horizontal: 'left' },
                            transformOrigin: { vertical: 'bottom', horizontal: 'left' },
                            sx: { marginTop: '-10px' },
                            slotProps: { paper: { sx: { backgroundColor: colors.onBackground, color: colors.surface, border: `1px solid ${colors.onSurfaceVariant1}`, borderRadius: '4px', width: '328px' } } }
                        }, sx: { border: `1px solid ${colors.outlineVariant}`, height: '44px', width: '328px', mt: '6px' }, children: [props.presets.map((preset) => (_jsx(MenuItem, { value: preset.id, sx: { padding: '8px 10px', minHeight: 'auto', mb: '4px' }, children: _jsxs(Stack, { direction: "row", alignItems: "center", sx: { width: '100%' }, children: [_jsx(CardMedia, { component: "img", image: "v1/svg/check-ratio-editor.svg", sx: { width: "20px", height: "20px", mr: '12px', px: '0px', visibility: props.selectedPresetBulk === preset.id ? 'visible' : 'hidden' } }), _jsx(Typography, { sx: { width: '24px', textWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', color: colors.surface, pr: "82px", pl: "0px", mr: "165px", justifyContent: 'flex-start', ...typography.bodyMedium }, children: preset.name }), _jsx(IconButton, { "aria-label": `Options for ${preset.name}`, onClick: (event) => props.onPresetMenuClickBulk(event, preset.id), sx: { padding: "0px", margin: "0px", mr: "0px" }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/dots-editor.svg", alt: "Options", sx: { width: '20px', height: '20px' } }) })] }) }, preset.id))), _jsx(Box, { sx: { px: '16px', my: '8px' }, children: _jsx(Button, { fullWidth: true, variant: "outlined", sx: { ...typography.labelMedium, height: '40px', pt: '5px', color: colors.onBackground, backgroundColor: colors.surface, borderRadius: '100px', borderColor: colors.surface, textTransform: 'none', '&:hover': { backgroundColor: '#e0e0e0', borderColor: colors.surface } }, onClick: props.onOpenPresetModalBulk, children: "Create Preset" }) })] }) })] }) }));
}
