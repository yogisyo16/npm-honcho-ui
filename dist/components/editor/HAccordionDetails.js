import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, Slider, Typography, TextField } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HAccordionDetails(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const formatValue = (value) => {
        if (value > 0)
            return `+${value}`;
        return value.toString();
    };
    const focusedInputStyle = {
        backgroundColor: "#1C1B1FB2",
        borderRadius: '5px 5px 0px 0px',
        borderBottom: 'none',
        pl: '2px',
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
    return (_jsx(_Fragment, { children: _jsxs(Stack, { children: [_jsxs(Stack, { direction: "column", gap: "4px", sx: { pt: '6px', pb: '2px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle, }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "clarity-input", onDoubleClick: () => props.onClarityChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Clarity" }), _jsx(TextField, { hiddenLabel: true, id: "clarity-input", value: formatValue(props.ClarityScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onClarityChange), sx: {
                                        width: "40px",
                                        height: "10px",
                                        alignItems: "center",
                                        textAlign: "right",
                                        display: "flex",
                                        '& .MuiFilledInput-root': {
                                            // backgroundColor: 'transparent',
                                            // border: '',
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
                                            textAlign: 'right',
                                            padding: 0,
                                            pr: '4px',
                                            color: colors.surface,
                                            fontSize: "14px",
                                        },
                                        '& .Mui-focused': {
                                            '& .MuiFilledInput-input': {
                                                backgroundColor: "#1C1B1FB2",
                                                textAlign: 'right',
                                                borderRadius: '5px 5px 0px 0px',
                                                borderBottom: 'none',
                                                // pr: '8px',
                                                pl: '2px',
                                            }
                                        }
                                    } })] }), _jsx(Slider, { sx: {
                                width: "200px",
                                color: colors.onSurfaceVariant,
                                '& .MuiSlider-rail': {
                                    background: colors.onSurfaceVariant,
                                    opacity: 1,
                                },
                                '& .MuiSlider-thumb': {
                                    background: colors.surface,
                                    opacity: 1,
                                    boxShadow: 'none',
                                },
                            }, size: "small", value: props.ClarityScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onClarityChange(newValue), onDoubleClick: () => props.onClarityChange(0) })] }), _jsxs(Stack, { direction: "column", gap: "3px", sx: { pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle, }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "sharpness-input", onDoubleClick: () => props.onSharpnessChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Sharpness" }), _jsx(TextField, { hiddenLabel: true, id: "sharpness-input", value: formatValue(props.SharpnessScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onSharpnessChange), sx: {
                                        width: "40px",
                                        height: "10px",
                                        alignItems: "center",
                                        textAlign: "right",
                                        display: "flex",
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'transparent',
                                            borderRadius: "0px",
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
                                            textAlign: 'right',
                                            padding: 0,
                                            pr: '4px',
                                            color: colors.surface,
                                            fontSize: "14px",
                                        },
                                        '& .Mui-focused': {
                                            '& .MuiFilledInput-input': {
                                                backgroundColor: "#1C1B1FB2",
                                                textAlign: 'right',
                                                borderRadius: '5px 5px 0px 0px',
                                                borderBottom: 'none',
                                                // pr: '8px',
                                                pl: '2px',
                                            }
                                        }
                                    } })] }), _jsx(Slider, { sx: {
                                width: "200px",
                                color: colors.onSurfaceVariant,
                                '& .MuiSlider-rail': {
                                    background: colors.onSurfaceVariant,
                                    opacity: 1,
                                },
                                '& .MuiSlider-thumb': {
                                    background: colors.surface,
                                    opacity: 1,
                                    boxShadow: 'none',
                                },
                            }, size: "small", value: props.SharpnessScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onSharpnessChange(newValue), onDoubleClick: () => props.onSharpnessChange(0) })] })] }) }));
}
