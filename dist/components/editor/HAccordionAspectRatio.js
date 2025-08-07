import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Slider, Typography, CardMedia, IconButton, TextField } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HAccordionAspectRatio(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const [isCustomExpanded, setIsCustomExpanded] = useState(false);
    const handleCustomAccordionChange = (event, isExpanded) => {
        setIsCustomExpanded(isExpanded);
        if (isExpanded) {
            props.onRatioSelect('original');
        }
    };
    const handleAngleSliderChange = (_event, newValue) => {
        props.onAngleChange(newValue);
    };
    const textFieldSx = {
        width: "80px",
        padding: "4px",
        borderRadius: "4px",
        alignItems: "center",
        border: `1px solid ${colors.outlineVariant}`,
        textAlign: "center",
        '& .MuiFilledInput-root': {
            backgroundColor: 'transparent',
            border: 'none',
            '&:before': {
                borderBottom: 'none',
            },
            '&:after': {
                borderBottom: 'none',
            },
            '&:hover:not(.Mui-disabled):before': {
                borderBottom: 'none',
            },
            '&.Mui-focused:after': {
                borderBottom: 'none',
            },
        },
        '& .MuiFilledInput-input': {
            textAlign: 'center',
            padding: 0,
            color: colors.surface,
        }
    };
    const customAccordionStyle = {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        margin: '0px',
        '&.MuiAccordion-root:before': {
            display: 'none',
        },
        '& .MuiAccordionSummary-root': {
            minHeight: '22px',
            padding: '0px',
            '& .MuiAccordionSummary-content': {
                margin: '0px',
                justifyContent: 'flex-start',
            },
        },
        '& .MuiAccordionDetails-root': {
            padding: '8px 0px 0px 0px',
        },
        '&.MuiAccordion-root.Mui-expanded': {
            margin: '0px',
        },
    };
    return (_jsx(_Fragment, { children: _jsxs(Stack, { direction: "column", spacing: 2, sx: { p: 2, color: colors.surface }, children: [_jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "start", alignItems: "center", children: [_jsx(IconButton, { "aria-label": "potrait", onClick: () => props.onRatioSelect('potrait'), children: _jsx(CardMedia, { component: "img", image: props.activeRatio === 'potrait' ? "/v1/svg/aspect-ratio-potrait-activate-editor.svg" : "/v1/svg/aspect-ratio-potrait-inactive-editor.svg", sx: { width: "14px", height: "20px" } }) }), _jsx(IconButton, { "aria-label": "wide", onClick: () => props.onRatioSelect('wide'), children: _jsx(CardMedia, { component: "img", image: props.activeRatio === 'wide' ? "/v1/svg/aspect-ratio-potrait-activate-editor.svg" : "/v1/svg/aspect-ratio-potrait-inactive-editor.svg", sx: { width: "14px", height: "20px", rotate: "-90deg" } }) })] }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", children: [_jsx(IconButton, { onClick: () => props.onRatioSelect('original'), sx: { justifyContent: 'flex-start', color: props.activeSquareRatio === 'original' ? colors.surface : colors.onSurfaceVariant1, ...typography.bodyMedium }, children: "Original" }), _jsx(CardMedia, { component: "img", image: "v1/svg/check-ratio-editor.svg", sx: { width: "20px", height: "20px" } })] }), _jsx(Button, { onClick: () => props.onRatioSelect('freeform'), sx: { justifyContent: 'flex-start', color: props.activeSquareRatio === 'freeform' ? colors.surface : colors.onSurfaceVariant1, ...typography.bodyMedium }, children: "Freeform" }), _jsxs(Accordion, { expanded: isCustomExpanded, onChange: handleCustomAccordionChange, sx: customAccordionStyle, children: [_jsx(AccordionSummary, { children: _jsx(Typography, { sx: {
                                    ...typography.bodyMedium,
                                    color: props.activeSquareRatio === 'custom' ? colors.surface : colors.onSurfaceVariant1,
                                    width: '100%',
                                    cursor: 'pointer',
                                    paddingLeft: '8px'
                                }, children: "Custom" }) }), _jsx(AccordionDetails, { children: _jsx(Stack, { direction: "row", spacing: 4, justifyContent: "center", alignItems: "center", sx: { paddingLeft: '16px' }, children: _jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "center", alignItems: "center", children: [_jsx(Stack, { direction: "column", spacing: 0.5, children: _jsx(TextField, { hiddenLabel: true, placeholder: "Width", id: "width-px-input", value: props.widthPX === 0 ? '' : props.widthPX, variant: "filled", onChange: (e) => props.onWidthChange(Number(e.target.value)), sx: textFieldSx }) }), _jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: " : " }), _jsx(Stack, { direction: "column", spacing: 0.5, children: _jsx(TextField, { hiddenLabel: true, placeholder: "Height", id: "height-px-input", value: props.heightPX === 0 ? '' : props.heightPX, variant: "filled", onChange: (e) => props.onHeightChange(Number(e.target.value)), sx: textFieldSx }) })] }) }) })] }), _jsx(Button, { onClick: () => props.onRatioSelect('1:1'), sx: { justifyContent: 'flex-start', color: props.activeWideRatio === '1:1' ? colors.surface : colors.onSurfaceVariant1, ...typography.bodyMedium }, children: "1:1" }), _jsx(Button, { onClick: () => props.onRatioSelect(props.activeRatio === 'wide' ? '3:2' : '2:3'), sx: { justifyContent: 'flex-start', color: props.activeWideRatio === (props.activeRatio === 'wide' ? '3:2' : '2:3') ? colors.surface : colors.onSurfaceVariant1, ...typography.bodyMedium }, children: props.activeRatio === 'wide' ? '3:2' : '2:3' }), _jsx(Button, { onClick: () => props.onRatioSelect(props.activeRatio === 'wide' ? '16:9' : '9:16'), sx: { justifyContent: 'flex-start', color: props.activeWideRatio === (props.activeRatio === 'wide' ? '16:9' : '9:16') ? colors.surface : colors.onSurfaceVariant1, ...typography.bodyMedium }, children: props.activeRatio === 'wide' ? '16:9' : '9:16' }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { sx: { ...typography.bodyMedium }, children: "Angel:" }), _jsx(TextField, { hiddenLabel: true, id: "filled-hidden-label-small", value: props.angelChange, variant: "filled", onChange: (e) => props.onAngleChange(Number(e.target.value)), sx: {
                                width: "40px",
                                alignItems: "center",
                                textAlign: "center",
                                '& .MuiFilledInput-root': {
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    '&:before': {
                                        borderBottom: 'none',
                                    },
                                    '&:after': {
                                        borderBottom: 'none',
                                    },
                                    '&:hover:not(.Mui-disabled):before': {
                                        borderBottom: 'none',
                                    },
                                    '&.Mui-focused:after': {
                                        borderBottom: 'none',
                                    },
                                },
                                '& .MuiFilledInput-input': {
                                    textAlign: 'center',
                                    padding: 0,
                                    color: colors.surface,
                                }
                            } })] }), _jsx(Slider, { sx: { width: "200px", color: colors.surface }, size: "small", value: props.angelChange, step: 1, min: -360, max: 360, onChange: handleAngleSliderChange })] }) }));
}
