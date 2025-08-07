import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, MenuItem, FormControl, Select, Stack, Accordion, AccordionSummary, AccordionDetails, CardMedia, Typography, IconButton, Button } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from "../../themes/colors";
// Static `presets` array has been removed.
export default function HBulkPreset(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const isMenuOpen = Boolean(props.presetMenuAnchorEl);
    const isPanelExpanded = (panelName) => props.expandedPanels.includes(panelName);
    const accordionStyle = {
        backgroundColor: colors.onBackground,
        color: colors.surface,
        '& .MuiAccordionSummary-root': { backgroundColor: colors.onBackground, color: colors.surface },
        '& .MuiAccordionDetails-root': { backgroundColor: colors.onBackground, color: colors.surface },
        '& .MuiTypography-root': { color: colors.surface },
        '& .MuiSvgIcon-root': { color: colors.surface }
    };
    const CustomSelectIcon = (iconProps) => {
        const isExpanded = iconProps.className?.includes('MuiSelect-iconOpen');
        return (_jsx(CardMedia, { component: "img", image: isExpanded ? "/v1/svg/expand-editor.svg" : "/v1/svg/expanded-editor.svg", sx: { width: "11.67px", height: "5.83px", right: '14px', position: 'absolute', pointerEvents: 'none' } }));
    };
    return (_jsx(_Fragment, { children: _jsx(Stack, { children: _jsxs(Accordion, { sx: accordionStyle, expanded: isPanelExpanded('preset'), onChange: props.onPanelChange('preset'), disableGutters: true, children: [_jsx(AccordionSummary, { sx: { pr: 0 }, children: _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [_jsx(Typography, { sx: { ...typography.titleMedium, color: colors.surface }, children: "Preset" }), _jsx(CardMedia, { component: "img", image: isPanelExpanded('preset') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg", sx: { width: "11.67px", height: "5.83px" } })] }) }), _jsx(AccordionDetails, { sx: { pr: "4px" }, children: _jsx(FormControl, { fullWidth: true, children: _jsxs(Select, { fullWidth: true, value: props.selectedPreset, onChange: props.onSelectPreset, IconComponent: CustomSelectIcon, renderValue: (selectedId) => {
                                    // Uses props.presets to find the name
                                    const selectedPresetObject = props.presets.find(p => p.id === selectedId);
                                    if (!selectedPresetObject) {
                                        return _jsx(Typography, { sx: { ...typography.bodyMedium }, children: "Select" });
                                    }
                                    return _jsx(Typography, { sx: { ...typography.bodyMedium }, children: selectedPresetObject.name });
                                }, MenuProps: {
                                    slotProps: { paper: { sx: { backgroundColor: colors.onBackground, color: colors.surface, border: `1px solid ${colors.onSurfaceVariant1}`, mt: '20px', width: '178px', boxShadow: 'none' } } }
                                }, sx: { border: `1px solid ${colors.outlineVariant}`, height: '44px', width: '215px', boxShadow: 'none' }, children: [props.presets.map((preset) => (_jsx(MenuItem, { value: preset.id, sx: { borderRadius: '4px', py: '4px', my: '0px', px: '0px', mx: '0px' }, children: _jsxs(Stack, { direction: "row", justifyContent: "space-around", alignItems: "center", sx: { width: '100%', py: '0px', px: '0px', mx: '0px', my: '4px' }, children: [_jsx(CardMedia, { component: "img", image: "v1/svg/check-ratio-editor.svg", sx: { width: "20px", height: "20px", mr: '-16px', px: '0px', visibility: props.selectedPreset === preset.id ? 'visible' : 'hidden' } }), _jsx(Typography, { sx: { width: '24px', textWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', color: colors.surface, pr: "82px", pl: "0px", ml: "0px", justifyContent: 'flex-start', ...typography.bodyMedium }, children: preset.name }), _jsx(IconButton, { "aria-label": `Options for ${preset.name}`, onClick: (event) => props.onPresetMenuClick(event, preset.id), sx: { padding: "0px", margin: "0px", mr: "0px" }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/dots-editor.svg", alt: "Options", sx: { width: '20px', height: '20px' } }) })] }) }, preset.id))), _jsx(Box, { sx: { px: '16px', my: '8px' }, children: _jsx(Button, { fullWidth: true, variant: "outlined", sx: { ...typography.labelMedium, height: '40px', color: colors.onBackground, backgroundColor: colors.surface, borderRadius: '100px', borderColor: colors.surface, textTransform: 'none', '&:hover': { backgroundColor: '#e0e0e0', borderColor: colors.surface } }, onClick: props.onOpenPresetModal, children: "Create Preset" }) })] }) }) })] }) }) }));
}
