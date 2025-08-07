import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography, CardMedia, IconButton } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
// --- The static presets array has been REMOVED from this component ---
export default function HAccordionPreset(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const isMenuOpen = Boolean(props.presetMenuAnchorEl);
    const accordionStyle = {
        backgroundColor: colors.onBackground,
        color: colors.surface,
        '& .MuiAccordionSummary-root': {
            backgroundColor: colors.onBackground,
            color: colors.surface,
        },
        '& .MuiAccordionDetails-root': {
            backgroundColor: colors.onBackground,
            color: colors.surface,
        },
        '& .MuiTypography-root': {
            color: colors.surface,
        },
        '& .MuiSvgIcon-root': {
            color: colors.surface,
        }
    };
    const isPanelExpanded = (panelName) => props.expandedPanels.includes(panelName);
    return (_jsx(_Fragment, { children: _jsxs(Box, { children: [_jsxs(Accordion, { sx: accordionStyle, expanded: isPanelExpanded('preset'), onChange: props.onChange('preset'), disableGutters: true, children: [_jsx(AccordionSummary, { sx: { pr: 0 }, children: _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [_jsx(Typography, { sx: { ...typography.titleMedium, color: colors.surface }, children: "Preset" }), _jsx(CardMedia, { component: "img", image: isPanelExpanded('preset') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg", sx: { width: "11.67px", height: "5.83px" } })] }) }), _jsx(AccordionDetails, { sx: { pr: "4px" }, children: _jsxs(Stack, { direction: "column", gap: "8px", sx: { pt: '0px', pb: '0px', mx: '0px', width: '100%' }, children: [props.presets.map((preset) => (_jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [props.selectedPreset != preset.id && (_jsx(Button, { sx: {
                                                    width: '100px',
                                                    textWrap: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: 'block',
                                                    textTransform: 'none',
                                                    color: colors.surface,
                                                    pr: "120px",
                                                    pl: "0px",
                                                    ml: "0px",
                                                    justifyContent: 'flex-start',
                                                    ...typography.bodyMedium
                                                }, onClick: () => props.onSelectPreset(preset.id), children: preset.name })), props.selectedPreset === preset.id && (_jsx(Button, { sx: {
                                                    width: '84px',
                                                    textWrap: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: 'block',
                                                    color: colors.surface,
                                                    pr: "82px",
                                                    pl: "0px",
                                                    ml: "0px",
                                                    justifyContent: 'flex-start',
                                                    ...typography.bodyMedium
                                                }, onClick: () => props.onSelectPreset(preset.id), children: preset.name })), _jsxs(Stack, { direction: "row", alignItems: "center", spacing: 1, children: [props.selectedPreset === preset.id && (_jsx(CardMedia, { component: "img", image: "v1/svg/check-ratio-editor.svg", sx: { width: "20px", height: "20px" } })), _jsx(IconButton, { "aria-label": preset.name, onClick: (event) => props.onPresetMenuClick(event, preset.id), sx: { padding: "0px", margin: "0px" }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/dots-editor.svg", alt: "Options", sx: { padding: "0px", margin: "0px" } }) })] })] }, preset.id))), _jsx(Button, { variant: "text", sx: { color: colors.surface, border: "1px solid",
                                            borderColor: colors.surface,
                                            borderRadius: "40px",
                                            textTransform: 'none',
                                        }, onClick: props.onOpenPresetModal, children: "Create Preset" })] }) })] }), _jsxs(Accordion, { sx: accordionStyle, expanded: isPanelExpanded('watermark'), onChange: props.onChange('watermark'), disableGutters: true, children: [_jsx(AccordionSummary, { sx: { pr: 0 }, children: _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [_jsx(Typography, { sx: { ...typography.titleMedium, color: colors.surface }, children: "Watermark" }), _jsx(CardMedia, { component: "img", image: isPanelExpanded('watermark') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg", sx: { width: "11.67px", height: "5.83px" } })] }) }), _jsx(AccordionDetails, { children: _jsxs(Stack, { direction: "column", children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [_jsx(Typography, { color: "initial", children: "Jonathan" }), _jsx(IconButton, { "aria-label": "options", children: _jsx(CardMedia, { component: "img", image: "/v1/svg/dots-editor.svg", alt: "Options" }) })] }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [_jsx(Typography, { color: "initial", children: "Jonathan" }), _jsx(IconButton, { "aria-label": "options", children: _jsx(CardMedia, { component: "img", image: "/v1/svg/dots-editor.svg", alt: "Options" }) })] }), _jsx(Button, { variant: "text", sx: { color: colors.surface, border: "1px solid", borderColor: colors.surface, borderRadius: "40px", textTransform: 'none', }, onClick: props.onOpenWatermarkView, children: "Create Watermark" })] }) })] })] }) }));
}
