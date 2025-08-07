import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, Slider, Typography, TextField } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HSliderColorMobile(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const blueScale = '#292bc0'; // Blue color on left
    const yellowScale = '#dfdc28'; // Yellow color on right
    const greenScale = '#00ff04';
    const purpleScale = '#b700ff';
    // The gradient for the *entire* background of the slider bar
    const tempGradient = `linear-gradient(to right, ${blueScale} 35%, ${yellowScale} 75%)`;
    const tintGradient = `linear-gradient(to right, ${greenScale} 20%, ${purpleScale} 75%)`;
    const saturationColors = ['yellow', 'lime', 'deepskyblue', 'magenta', 'red'];
    const greyScaleStart = '#000000'; // Black at -100
    const greyScaleEnd = '#ffffff'; // White at 0 (or a very light grey)
    const colorStops = saturationColors.map((color, index) => {
        const position = 50 + (index / (saturationColors.length - 1)) * 50;
        return `${color} ${position}%`;
    }).join(', ');
    // The gradient for the *entire* background of the slider bar
    const fullTrackGradient = `linear-gradient(to right, ${greyScaleStart} 0%, ${greyScaleEnd} 50%, ${colorStops})`;
    const focusedInputStyle = {
        backgroundColor: "#1C1B1FB2",
        borderRadius: '5px 5px 0px 0px',
        borderBottom: 'none',
        pl: '2px',
    };
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
    return (_jsx(_Fragment, { children: _jsxs(Stack, { spacing: 0, direction: "column", sx: { width: '100%', paddingX: 1, m: "0px" }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { pt: '10px', pb: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }, children: [_jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Temperature" }), _jsx(TextField, { hiddenLabel: true, id: "temperature-input", value: formatValue(props.tempScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onTempChange), sx: {
                                width: "40px",
                                alignItems: "center",
                                textAlign: "right",
                                pr: "4px",
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
                            } })] }), _jsx(Slider, { sx: {
                        width: "100%",
                        color: colors.surface,
                        '& .MuiSlider-rail': {
                            background: tempGradient,
                            opacity: 1,
                        },
                        '& .MuiSlider-track': {
                            background: 'transparent',
                            border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                            boxShadow: 'none',
                        }
                    }, size: "small", value: props.tempScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onTempChange(newValue) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { pt: '10px', pb: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }, children: [_jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Tint" }), _jsx(TextField, { hiddenLabel: true, id: "filled-hidden-label-small", value: formatValue(props.tintScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onTintChange), sx: {
                                width: "40px",
                                alignItems: "center",
                                textAlign: "right",
                                pr: "4px",
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
                            } })] }), _jsx(Slider, { sx: {
                        width: "100%",
                        color: colors.surface,
                        '& .MuiSlider-rail': {
                            background: tintGradient,
                            opacity: 1,
                        },
                        '& .MuiSlider-track': {
                            background: 'transparent',
                            border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                            boxShadow: 'none',
                        }
                    }, size: "small", value: props.tintScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onTintChange(newValue) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { pt: '10px', pb: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }, children: [_jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Vibrance" }), _jsx(TextField, { hiddenLabel: true, id: "filled-hidden-label-small", value: formatValue(props.vibranceScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onVibranceChange), sx: {
                                width: "40px",
                                alignItems: "center",
                                textAlign: "right",
                                pr: "4px",
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
                            } })] }), _jsx(Slider, { sx: {
                        width: "100%",
                        color: colors.surface,
                        '& .MuiSlider-rail': {
                            background: fullTrackGradient,
                            opacity: 1,
                        },
                        '& .MuiSlider-track': {
                            background: 'transparent',
                            border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                            boxShadow: 'none',
                        }
                    }, size: "small", value: props.vibranceScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onVibranceChange(newValue) }), _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", sx: { pt: '10px', pb: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }, children: [_jsx(Typography, { sx: { ...typography.bodyMedium, color: colors.surface }, children: "Saturation" }), _jsx(TextField, { hiddenLabel: true, id: "filled-hidden-label-small", value: formatValue(props.saturationScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onSaturationChange), sx: {
                                width: "40px",
                                alignItems: "center",
                                textAlign: "right",
                                pr: "4px",
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
                            } })] }), _jsx(Slider, { sx: {
                        width: "100%",
                        color: colors.surface,
                        '& .MuiSlider-rail': {
                            background: fullTrackGradient,
                            opacity: 1,
                        },
                        '& .MuiSlider-track': {
                            background: 'transparent',
                            border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                            boxShadow: 'none',
                        }
                    }, size: "small", value: props.saturationScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onSaturationChange(newValue) })] }) }));
}
