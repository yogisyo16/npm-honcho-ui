import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Accordion, AccordionDetails, AccordionSummary, CardMedia, Stack, Typography } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from "../../themes/colors";
import HBulkAccordionColorAdjustmentColors from "./HBulkAccordionColorAdjustmentColors";
import HBulkAccordionColorAdjustmentLight from "./HBulkAccordionColorAdjustmentLight";
import HBulkAccordionColorAdjustmentDetails from "./HBulkAccordionColorAdjustmentDetails";
export default function HBulkAccordionColorAdjustment(props) {
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
    return (_jsx(_Fragment, { children: _jsxs(Stack, { direction: "column", sx: { accordionStyle }, children: [_jsxs(Accordion, { sx: accordionStyle, expanded: isPanelExpanded('whiteBalance'), onChange: props.onPanelChange('whiteBalance'), disableGutters: true, children: [_jsx(AccordionSummary, { sx: { pr: 0 }, children: _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [_jsx(Typography, { sx: { ...typography.titleMedium }, children: "Color" }), _jsx(CardMedia, { component: "img", image: isPanelExpanded('whiteBalance') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg", sx: { width: "11.67px", height: "5.83px" } })] }) }), _jsx(AccordionDetails, { sx: { pr: "4px" }, children: _jsx(HBulkAccordionColorAdjustmentColors, { onTempDecreaseMax: props.onTempDecreaseMax, onTempDecrease: props.onTempDecrease, onTempIncrease: props.onTempIncrease, onTempIncreaseMax: props.onTempIncreaseMax, onTintDecreaseMax: props.onTintDecreaseMax, onTintDecrease: props.onTintDecrease, onTintIncrease: props.onTintIncrease, onTintIncreaseMax: props.onTintIncreaseMax, onVibranceDecreaseMax: props.onVibranceDecreaseMax, onVibranceDecrease: props.onVibranceDecrease, onVibranceIncrease: props.onVibranceIncrease, onVibranceIncreaseMax: props.onVibranceIncreaseMax, onSaturationDecreaseMax: props.onSaturationDecreaseMax, onSaturationDecrease: props.onSaturationDecrease, onSaturationIncrease: props.onSaturationIncrease, onSaturationIncreaseMax: props.onSaturationIncreaseMax }) })] }), _jsxs(Accordion, { sx: accordionStyle, expanded: isPanelExpanded('light'), onChange: props.onPanelChange('light'), disableGutters: true, children: [_jsx(AccordionSummary, { sx: { pr: 0 }, children: _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [_jsx(Typography, { sx: { ...typography.titleMedium }, children: "Light" }), _jsx(CardMedia, { component: "img", image: isPanelExpanded('light') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg", sx: { width: "11.67px", height: "5.83px" } })] }) }), _jsx(AccordionDetails, { sx: { pr: "4px" }, children: _jsx(HBulkAccordionColorAdjustmentLight, { onExposureDecreaseMax: props.onExposureDecreaseMax, onExposureDecrease: props.onExposureDecrease, onExposureIncrease: props.onExposureIncrease, onExposureIncreaseMax: props.onExposureIncreaseMax, onContrastDecreaseMax: props.onContrastDecreaseMax, onContrastDecrease: props.onContrastDecrease, onContrastIncrease: props.onContrastIncrease, onContrastIncreaseMax: props.onContrastIncreaseMax, onHighlightsDecreaseMax: props.onHighlightsDecreaseMax, onHighlightsDecrease: props.onHighlightsDecrease, onHighlightsIncrease: props.onHighlightsIncrease, onHighlightsIncreaseMax: props.onHighlightsIncreaseMax, onShadowsDecreaseMax: props.onShadowsDecreaseMax, onShadowsDecrease: props.onShadowsDecrease, onShadowsIncrease: props.onShadowsIncrease, onShadowsIncreaseMax: props.onShadowsIncreaseMax, onWhitesDecreaseMax: props.onWhitesDecreaseMax, onWhitesDecrease: props.onWhitesDecrease, onWhitesIncrease: props.onWhitesIncrease, onWhitesIncreaseMax: props.onWhitesIncreaseMax, onBlacksDecreaseMax: props.onBlacksDecreaseMax, onBlacksDecrease: props.onBlacksDecrease, onBlacksIncrease: props.onBlacksIncrease, onBlacksIncreaseMax: props.onBlacksIncreaseMax }) })] }), _jsxs(Accordion, { sx: accordionStyle, expanded: isPanelExpanded('details'), onChange: props.onPanelChange('details'), disableGutters: true, children: [_jsx(AccordionSummary, { sx: { pr: 0 }, children: _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { width: '100%' }, children: [_jsx(Typography, { sx: { ...typography.titleMedium }, children: "Details" }), _jsx(CardMedia, { component: "img", image: isPanelExpanded('details') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg", sx: { width: "11.67px", height: "5.83px" } })] }) }), _jsx(AccordionDetails, { sx: { pr: "4px" }, children: _jsx(HBulkAccordionColorAdjustmentDetails, { onClarityDecreaseMax: props.onClarityDecreaseMax, onClarityDecrease: props.onClarityDecrease, onClarityIncrease: props.onClarityIncrease, onClarityIncreaseMax: props.onClarityIncreaseMax, onSharpnessDecreaseMax: props.onSharpnessDecreaseMax, onSharpnessDecrease: props.onSharpnessDecrease, onSharpnessIncrease: props.onSharpnessIncrease, onSharpnessIncreaseMax: props.onSharpnessIncreaseMax }) })] })] }) }));
}
