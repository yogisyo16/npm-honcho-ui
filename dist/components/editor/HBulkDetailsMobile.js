import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, Typography, CardMedia, IconButton } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HBulkDetailsMobile(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    return (_jsx(_Fragment, { children: _jsxs(Stack, { spacing: 0, direction: "column", sx: { width: '100%', pl: "10px", m: "0px" }, children: [_jsx(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { mb: "6px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Clarity" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "16px" }, children: [_jsx(IconButton, { onClick: props.onClarityDecreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { width: "20px", height: "20px", mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onClarityDecrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { width: "20px", height: "20px", mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onClarityIncrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { width: "20px", height: "20px", ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onClarityIncreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { width: "20px", height: "20px", ml: "2px" } }) })] }), _jsx(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { mb: "6px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Sharpness" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "2px" }, children: [_jsx(IconButton, { onClick: props.onSharpnessDecreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { width: "20px", height: "20px", mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onSharpnessDecrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { width: "20px", height: "20px", mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onSharpnessIncrease, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { width: "20px", height: "20px", ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onSharpnessIncreaseMax, sx: {
                                width: "76px",
                                height: "28px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { width: "20px", height: "20px", ml: "2px" } }) })] })] }) }));
}
