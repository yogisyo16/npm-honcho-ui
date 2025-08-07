import React from "react";
import { Stack, Slider, Typography, TextField } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

interface Props {
    clarityScore: number;
    sharpnessScore: number;
    onClarityChange: (value: number) => void;
    onSharpnessChange: (value: number) => void;
}

export default function HSliderDetailsMobile(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();

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
    return (
        <>
            <Stack spacing={0} direction="column" sx={{ width: '100%', paddingX: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: '10px', pb: '0px' }}>
                    <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>Clarity</Typography>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={formatValue(props.clarityScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onClarityChange)}
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
                            '& .Mui-focused' : {
                                '& .MuiFilledInput-input': {
                                    backgroundColor: "#1C1B1FB2",
                                    textAlign: 'right',
                                    borderRadius: '5px 5px 0px 0px',
                                    borderBottom: 'none',
                                    pl: '2px',
                                }
                            }
                        }}/>
                </Stack>
                <Slider
                    sx={{
                        width: "100%",
                        color: colors.onSurfaceVariant,
                        '& .MuiSlider-rail': {
                            background: colors.onSurfaceVariant,
                            opacity: 1,
                        },
                        '& .MuiSlider-thumb': {
                            background: colors.surface,
                            opacity: 1,
                        },
                        '& .MuiSlider-thumb:hover': {
                            boxShadow: 'none',   
                        }
                    }}
                    size="small"
                    value={props.clarityScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onClarityChange(newValue as number)}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: '10px', pb: '0px' }}>
                    <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>Sharpness</Typography>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={formatValue(props.sharpnessScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onSharpnessChange)}
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
                            '& .Mui-focused' : {
                                '& .MuiFilledInput-input': {
                                    backgroundColor: "#1C1B1FB2",
                                    textAlign: 'right',
                                    borderRadius: '5px 5px 0px 0px',
                                    borderBottom: 'none',
                                    pl: '2px',
                                }
                            }
                        }}/>
                </Stack>
                <Slider
                    sx={{
                        width: "100%",
                        color: colors.onSurfaceVariant,
                        '& .MuiSlider-rail': {
                            background: colors.onSurfaceVariant,
                            opacity: 1,
                        },
                        '& .MuiSlider-thumb': {
                            background: colors.surface,
                            opacity: 1,
                        },
                        '& .MuiSlider-thumb:hover': {
                            boxShadow: 'none',   
                        }
                    }}
                    size="small"
                    value={props.sharpnessScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onSharpnessChange(newValue as number)}
                />
            </Stack>
        </>
    )
}