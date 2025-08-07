import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, Typography, IconButton, CardMedia } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HBulkAccordionColorAdjustmentColors(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    return (_jsx(_Fragment, { children: _jsxs(Stack, { children: [_jsx(Stack, { direction: "row", justifyContent: "space-between", sx: { pb: "8px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium }, children: "Temperature" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "2px" }, children: [_jsx(IconButton, { onClick: props.onTempDecreaseMax, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onTempDecrease, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "20px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onTempIncrease, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onTempIncreaseMax, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { ml: "2px" } }) })] }), _jsx(Stack, { direction: "row", justifyContent: "space-between", sx: { pb: "8px", pt: "16px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium }, children: "Tint" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "2px" }, children: [_jsx(IconButton, { onClick: props.onTintDecreaseMax, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onTintDecrease, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onTintIncrease, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onTintIncreaseMax, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { ml: "2px" } }) })] }), _jsx(Stack, { direction: "row", justifyContent: "space-between", sx: { pb: "8px", pt: "16px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium }, children: "Vibrance" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "2px" }, children: [_jsx(IconButton, { onClick: props.onVibranceDecreaseMax, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onVibranceDecrease, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onVibranceIncrease, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onVibranceIncreaseMax, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { ml: "2px" } }) })] }), _jsx(Stack, { direction: "row", justifyContent: "space-between", sx: { pb: "8px", pt: "16px" }, children: _jsx(Typography, { sx: { ...typography.bodyMedium }, children: "Saturation" }) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", sx: { p: "0px", m: "0px", pt: "2px", pb: "2px" }, children: [_jsx(IconButton, { onClick: props.onSaturationDecreaseMax, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button.svg", sx: { mr: "2px" } }) }), _jsx(IconButton, { onClick: props.onSaturationDecrease, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button.svg", sx: { mr: "3px" } }) }), _jsx(IconButton, { onClick: props.onSaturationIncrease, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-increment-button-right.svg", sx: { ml: "3px" } }) }), _jsx(IconButton, { onClick: props.onSaturationIncreaseMax, sx: {
                                width: "38.5px",
                                height: "26px",
                                py: "2px",
                                mr: "12px",
                                border: "1px solid white",
                                borderRadius: "100px",
                            }, children: _jsx(CardMedia, { component: "img", image: "/v1/svg/bulk-editor-max-button-right.svg", sx: { ml: "2px" } }) })] })] }) }));
}
