import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, Slider, Typography, TextField } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HAccordionLight(props) {
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
    return (_jsx(_Fragment, { children: _jsxs(Stack, { children: [_jsxs(Stack, { direction: "column", gap: "4px", sx: { pt: '6px', pb: '2px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle, }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "exposure-input", onDoubleClick: () => props.onExposureChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Exposure" }), _jsx(TextField, { hiddenLabel: true, id: "exposure-input", value: formatValue(props.ExposureScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onExposureChange), sx: {
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
                                }
                            }, size: "small", value: props.ExposureScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onExposureChange(newValue), onDoubleClick: () => props.onExposureChange(0) })] }), _jsxs(Stack, { direction: "column", gap: "3px", sx: { pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle, }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "contrast-input", onDoubleClick: () => props.onContrastChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Contrast" }), _jsx(TextField, { hiddenLabel: true, id: "contrast-input", value: formatValue(props.ContrastScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onContrastChange), sx: {
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
                                }
                            }, size: "small", value: props.ContrastScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onContrastChange(newValue), onDoubleClick: () => props.onContrastChange(0) })] }), _jsxs(Stack, { direction: "column", gap: "3px", sx: { pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle, }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "highlights-input", onDoubleClick: () => props.onHighlightsChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Highlights" }), _jsx(TextField, { hiddenLabel: true, id: "highlights-input", value: formatValue(props.HighlightsScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onHighlightsChange), sx: {
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
                                }
                            }, size: "small", value: props.HighlightsScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onHighlightsChange(newValue), onDoubleClick: () => props.onHighlightsChange(0) })] }), _jsxs(Stack, { direction: "column", gap: "3px", sx: { pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle, }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "shadows-input", onDoubleClick: () => props.onShadowsChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Shadows" }), _jsx(TextField, { hiddenLabel: true, id: "shadows-input", value: formatValue(props.ShadowsScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onShadowsChange), sx: {
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
                                }
                            }, size: "small", value: props.ShadowsScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onShadowsChange(newValue), onDoubleClick: () => props.onShadowsChange(0) })] }), _jsxs(Stack, { direction: "column", gap: "3px", sx: { pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle, }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "whites-input", onDoubleClick: () => props.onWhitesChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Whites" }), _jsx(TextField, { hiddenLabel: true, id: "whites-input", value: formatValue(props.WhitesScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onWhitesChange), sx: {
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
                                }
                            }, size: "small", value: props.WhitesScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onWhitesChange(newValue), onDoubleClick: () => props.onWhitesChange(0) })] }), _jsxs(Stack, { direction: "column", gap: "3px", sx: { pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle, }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "blacks-input", onDoubleClick: () => props.onBlacksChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Blacks" }), _jsx(TextField, { hiddenLabel: true, id: "blacks-input", value: formatValue(props.BlacksScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onBlacksChange), sx: {
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
                                }
                            }, size: "small", value: props.BlacksScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onBlacksChange(newValue), onDoubleClick: () => props.onBlacksChange(0) })] })] }) }));
}
