import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, Typography, CardMedia, IconButton } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HBulkLightMobile(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const formatValue = (value) => {
        if (value > 0)
            return `+${value}`;
        return value.toString();
    };
    const handleInputChange = (event, min, max, onChange) => {
        const value = event.target.value;
        if (value === '+' || value === '-')
            return;
        let numericValue = parseInt(value, 10);
        if (isNaN(numericValue))
            numericValue = 0;
        const clampedValue = Math.max(min, Math.min(max, numericValue));
        onChange(clampedValue);
    };
    return (_jsx(_Fragment, { children: _jsxs(Stack, { spacing: 0, direction: "column", sx: { width: '100%', pl: "10px", m: "0px" }, children: [_jsx(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { mb: "6px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Exposure" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "16px" }, children: [_jsx(IconButton, { onClick: props.onExposureDecreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { width: "20px", height: "20px", mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onExposureDecrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { width: "20px", height: "20px", mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onExposureIncrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { width: "20px", height: "20px", ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onExposureIncreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { width: "20px", height: "20px", ml: "2px" } }) })] }), _jsx(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { mb: "6px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Contrast" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "16px" }, children: [_jsx(IconButton, { onClick: props.onContrastDecreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { width: "20px", height: "20px", mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onContrastDecrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { width: "20px", height: "20px", mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onContrastIncrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { width: "20px", height: "20px", ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onContrastIncreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { width: "20px", height: "20px", ml: "2px" } }) })] }), _jsx(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { mb: "6px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Highlights" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "16px" }, children: [_jsx(IconButton, { onClick: props.onHighlightsDecreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { width: "20px", height: "20px", mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onHighlightsDecrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { width: "20px", height: "20px", mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onHighlightsIncrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { width: "20px", height: "20px", ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onHighlightsIncreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { width: "20px", height: "20px", ml: "2px" } }) })] }), _jsx(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { mb: "6px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Shadows" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "16px" }, children: [_jsx(IconButton, { onClick: props.onShadowsDecreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { width: "20px", height: "20px", mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onShadowsDecrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { width: "20px", height: "20px", mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onShadowsIncrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { width: "20px", height: "20px", ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onShadowsIncreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { width: "20px", height: "20px", ml: "2px" } }) })] }), _jsx(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { mb: "6px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Whites" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "16px" }, children: [_jsx(IconButton, { onClick: props.onWhitesDecreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { width: "20px", height: "20px", mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onWhitesDecrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { width: "20px", height: "20px", mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onWhitesIncrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { width: "20px", height: "20px", ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onWhitesIncreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { width: "20px", height: "20px", ml: "2px" } }) })] }), _jsx(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { mb: "6px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Blacks" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "16px" }, children: [_jsx(IconButton, { onClick: props.onBlacksDecreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { width: "20px", height: "20px", mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onBlacksDecrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { width: "20px", height: "20px", mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onBlacksIncrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { width: "20px", height: "20px", ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onBlacksIncreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { width: "20px", height: "20px", ml: "2px" } }) })] })] }) }));
}
