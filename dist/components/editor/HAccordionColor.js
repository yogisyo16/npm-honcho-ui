import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, Slider, Typography, TextField } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HAccordionColor(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const blueScale = '#292bc0'; // Blue color on left
    const yellowScale = '#dfdc28'; // Yellow color on right
    const greenScale = '#00ff04';
    const purpleScale = '#b700ff';
    // The gradient for the *entire* background of the slider bar
    const tempGradient = `linear-gradient(to right, ${blueScale} 35%, ${yellowScale} 75%)`;
    const tintGradient = `linear-gradient(to right, ${greenScale} 20%, ${purpleScale} 75%)`;
    const spectrumColorsSaturation = ['yellow', 'lime', 'deepskyblue', 'magenta', 'red'];
    const greyScaleStart = '#000000'; // Black at -100
    const greyScaleEnd = '#ffffff'; // White at 0 (or a very light grey)
    const colorStops = spectrumColorsSaturation.map((color, index) => {
        const position = 50 + (index / (spectrumColorsSaturation.length - 1)) * 50;
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
    return (_jsx(_Fragment, { children: _jsxs(Stack, { children: [_jsxs(Stack, { direction: "column", gap: "4px", sx: { pt: '6px', pb: '2px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "temperature-input", onDoubleClick: () => props.onTempChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Temperature" }), _jsx(TextField, { hiddenLabel: true, id: "temperature-input", value: formatValue(props.TempScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onTempChange), className: "control-label", sx: {
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
                                    } })] }), _jsx(Slider, { sx: {
                                width: "200px",
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
                                },
                                '& .MuiSlider-thumb:hover': {
                                    boxShadow: 'none',
                                },
                            }, size: "small", value: props.TempScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onTempChange(newValue), onDoubleClick: () => props.onTempChange(0) })] }), _jsxs(Stack, { direction: "column", gap: "3px", sx: { pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "tint-input", onDoubleClick: () => props.onTintChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Tint" }), _jsx(TextField, { hiddenLabel: true, id: "tint-input", value: formatValue(props.TintScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onTintChange), sx: {
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
                                    } })] }), _jsx(Slider, { sx: {
                                width: "200px",
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
                                },
                                '& .MuiSlider-thumb:hover': {
                                    boxShadow: 'none',
                                },
                            }, size: "small", value: props.TintScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onTintChange(newValue), onDoubleClick: () => props.onTintChange(0) })] }), _jsxs(Stack, { direction: "column", gap: "3px", sx: { pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "vibrance-input", onDoubleClick: () => props.onVibranceChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Vibrance" }), _jsx(TextField, { hiddenLabel: true, id: "vibrance-input", value: formatValue(props.VibranceScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onVibranceChange), sx: {
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
                                    } })] }), _jsx(Slider, { sx: {
                                width: "200px",
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
                                },
                                '& .MuiSlider-thumb:hover': {
                                    boxShadow: 'none',
                                },
                            }, size: "small", value: props.VibranceScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onVibranceChange(newValue), onDoubleClick: () => props.onVibranceChange(0) })] }), _jsxs(Stack, { direction: "column", gap: "3px", sx: { pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }, children: [_jsxs(Stack, { direction: "row", justifyContent: "space-between", children: [_jsx(Typography, { component: "label", htmlFor: "saturation-input", onDoubleClick: () => props.onSaturationChange(0), sx: { ...typography.bodyMedium, userSelect: 'none' }, children: "Saturation" }), _jsx(TextField, { hiddenLabel: true, id: "saturation-input", value: formatValue(props.SaturationScore), variant: "filled", onChange: (e) => handleInputChange(e, -100, 100, props.onSaturationChange), sx: {
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
                                    } })] }), _jsx(Slider, { sx: {
                                width: "200px",
                                color: colors.surface,
                                '& .MuiSlider-rail': {
                                    background: fullTrackGradient,
                                    opacity: 1,
                                },
                                '& .MuiSlider-track': {
                                    background: 'transparent',
                                    border: 'none',
                                },
                                '& .': {
                                    boxShadow: 'none',
                                },
                                '& .MuiSlider-thumb:hover': {
                                    boxShadow: 'none',
                                },
                            }, size: "small", value: props.SaturationScore, step: 1, min: -100, max: 100, onChange: (_event, newValue) => props.onSaturationChange(newValue), onDoubleClick: () => props.onSaturationChange(0) })] })] }) }));
}
