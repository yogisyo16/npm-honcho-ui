import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, Typography, IconButton, CardMedia } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HBulkAccordionColorAdjustmentDetails(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    return (_jsx(_Fragment, { children: _jsxs(Stack, { children: [_jsx(Stack, { direction: "row", justifyContent: "space-between", sx: { pb: "8px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium }, children: "Clarity" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "2px" }, children: [_jsx(IconButton, { onClick: props.onClarityDecreaseMax, sx: {
                                width: "38.5px",
                                height: "24px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onClarityDecrease, sx: {
                                width: "38.5px",
                                height: "24px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onClarityIncrease, sx: {
                                width: "38.5px",
                                height: "24px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onClarityIncreaseMax, sx: {
                                width: "38.5px",
                                height: "24px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { ml: "2px" } }) })] }), _jsx(Stack, { direction: "row", justifyContent: "space-between", sx: { pb: "8px", pt: "16px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium }, children: "Sharpness" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "2px" }, children: [_jsx(IconButton, { onClick: props.onSharpnessDecreaseMax, sx: {
                                width: "38.5px",
                                height: "24px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onSharpnessDecrease, sx: {
                                width: "38.5px",
                                height: "24px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onSharpnessIncrease, sx: {
                                width: "38.5px",
                                height: "24px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onSharpnessIncreaseMax, sx: {
                                width: "38.5px",
                                height: "24px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { ml: "2px" } }) })] })] }) }));
}
