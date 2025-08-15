import React from "react";
import { Stack, Slider, Typography, TextField } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

interface Props {
    tempScore: number;
    tintScore: number;
    saturationScore: number;
    vibranceScore: number;
    onTempChange: (value: number) => void;
    onTintChange: (value: number) => void;
    onVibranceChange: (value: number) => void;
    onSaturationChange: (value: number) => void;
}

export default function HSliderColorMobile(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    
    const blueScale = '#292bc0'; // Blue color on left
    const yellowScale = '#dfdc28';   // Yellow color on right

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

    const formatValue = (value: number) => {
            if (value > 0) return `+${value}`;
            return value.toString();
        };
            
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, min: number, max: number, onChange: (value: number) => void) => {
        const value = event.target.value;
        if (value === '+' || value === '-') return;
        let numericValue = parseInt(value, 10);
        if (isNaN(numericValue)) numericValue = 0;
        const clampedValue = Math.max(min, Math.min(max, numericValue));
        onChange(clampedValue);
    };

    return(
        <>
            <Stack spacing={0} direction="column" sx={{ width: '100%', paddingX: 1, m: "0px"}}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: '10px', pb: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }}>
                    <Typography sx={{...typography.bodyMedium, color: colors.surface}}>Temperature</Typography>
                    <TextField
                        hiddenLabel
                        id="temperature-input"
                        value={formatValue(props.tempScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onTempChange)}
                        sx={{
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
                        }}/>
                </Stack>
                <Slider
                    sx={{
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
                    }}
                    size="small"
                    value={props.tempScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onTempChange(newValue as number)}
                    onDoubleClick={() => props.onTempChange(0)}
                    
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: '10px', pb: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }}>
                    <Typography sx={{...typography.bodyMedium, color: colors.surface}}>Tint</Typography>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={formatValue(props.tintScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onTintChange)}
                        sx={{
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
                        }}/>
                </Stack>
                <Slider
                    sx={{
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
                    }}
                    size="small"
                    value={props.tintScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onTintChange(newValue as number)}
                    onDoubleClick={() => props.onTintChange(0)}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: '10px', pb: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }}>
                    <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>
                        Vibrance
                    </Typography>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={formatValue(props.vibranceScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onVibranceChange)}
                        sx={{
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
                        }}/>
                </Stack>
                <Slider
                    sx={{
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
                    }}
                    size="small"
                    value={props.vibranceScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onVibranceChange(newValue as number)}
                    onDoubleClick={() => props.onVibranceChange(0)}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: '10px', pb: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle }}>
                    <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>
                        Saturation
                    </Typography>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={formatValue(props.saturationScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onSaturationChange)}
                        sx={{
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
                        }}/>
                </Stack>
                <Slider
                    sx={{
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
                    }}
                    size="small"
                    value={props.saturationScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onSaturationChange(newValue as number)}
                    onDoubleClick={() => props.onSaturationChange(0)}
                />
            </Stack>
        </>
    )
}