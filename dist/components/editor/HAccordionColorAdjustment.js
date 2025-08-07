import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Accordion, AccordionDetails, AccordionSummary, CardMedia, Stack, Typography } from "@mui/material";
import HAccordionColor from "./HAccordionColor";
import HAccordionLight from "./HAccordionLight";
import HAccordionDetails from "./HAccordionDetails";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HAccordionColorAdjustment(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
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
    return (_jsx(_Fragment, { children: _jsxs(Stack, { direction: "column", sx: { accordionStyle }, children: [_jsxs(Accordion, { sx: accordionStyle, expanded: isPanelExpanded('whiteBalance'), onChange: props.onPanelChange('whiteBalance'), disableGutters: true, children: [_jsx(AccordionSummary, { sx: { pr: 0 }, children: _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [_jsx(Typography, { sx: { ...typography.titleMedium }, children: "Color" }), _jsx(CardMedia, { component: "img", image: isPanelExpanded('whiteBalance') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg", sx: { width: "11.67px", height: "5.83px" } })] }) }), _jsx(AccordionDetails, { sx: { pr: "4px" }, children: _jsx(HAccordionColor, { TempScore: props.tempScore, TintScore: props.tintScore, VibranceScore: props.vibranceScore, SaturationScore: props.saturationScore, onTempChange: props.setTempScore, onTintChange: props.setTintScore, onVibranceChange: props.setVibranceScore, onSaturationChange: props.setSaturationScore }) })] }), _jsxs(Accordion, { sx: accordionStyle, expanded: isPanelExpanded('light'), onChange: props.onPanelChange('light'), disableGutters: true, children: [_jsx(AccordionSummary, { sx: { pr: 0 }, children: _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [_jsx(Typography, { sx: { ...typography.titleMedium }, children: "Light" }), _jsx(CardMedia, { component: "img", image: isPanelExpanded('light') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg", sx: { width: "11.67px", height: "5.83px" } })] }) }), _jsx(AccordionDetails, { sx: { pr: "4px" }, children: _jsx(HAccordionLight, { ExposureScore: props.exposureScore, ContrastScore: props.contrastScore, HighlightsScore: props.HighlightsScore, ShadowsScore: props.shadowsScore, WhitesScore: props.whitesScore, BlacksScore: props.blacksScore, onExposureChange: props.setExposureScore, onContrastChange: props.setContrastScore, onHighlightsChange: props.setHighlightsScore, onShadowsChange: props.setShadowsScore, onWhitesChange: props.setWhitesScore, onBlacksChange: props.setBlacksScore }) })] }), _jsxs(Accordion, { sx: accordionStyle, expanded: isPanelExpanded('details'), onChange: props.onPanelChange('details'), disableGutters: true, children: [_jsx(AccordionSummary, { sx: { pr: 0 }, children: _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [_jsx(Typography, { sx: { ...typography.titleMedium }, children: "Details" }), _jsx(CardMedia, { component: "img", image: isPanelExpanded('details') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg", sx: { width: "11.67px", height: "5.83px" } })] }) }), _jsx(AccordionDetails, { sx: { pr: "4px" }, children: _jsx(HAccordionDetails
                            // ContrastScore = {props.contrastScore}
                            , { 
                                // ContrastScore = {props.contrastScore}
                                ClarityScore: props.clarityScore, SharpnessScore: props.sharpnessScore, 
                                // onContrastChange={props.setContrastScore}
                                onClarityChange: props.setClarityScore, onSharpnessChange: props.setSharpnessScore }) })] })] }) }));
}
