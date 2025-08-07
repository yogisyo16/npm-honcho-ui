import React from "react";
import { Stack, Slider, Typography, TextField  } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

interface Props {
    ExposureScore: number;
    ContrastScore: number;
    HighlightsScore: number;
    ShadowsScore: number;
    WhitesScore: number;
    BlacksScore: number;
    // Add onChange handlers for each score
    onContrastChange: (value: number) => void;
    onExposureChange: (value: number) => void;
    onHighlightsChange: (value: number) => void;
    onShadowsChange: (value: number) => void;
    onWhitesChange: (value: number) => void;
    onBlacksChange: (value: number) => void;
}

export default function HAccordionLight(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();

    const formatValue = (value: number) => {
        if (value > 0) return `+${value}`;
        return value.toString();
    };

    const focusedInputStyle = {
        backgroundColor: "#1C1B1FB2",
        borderRadius: '5px 5px 0px 0px',
        borderBottom: 'none',
        pl: '2px',
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
            <Stack>
                <Stack direction="column" gap="4px" sx={{pt: '6px', pb: '2px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle,}}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography
                            component="label"
                            htmlFor="exposure-input"
                            onDoubleClick={() => props.onExposureChange(0)}
                            sx={{...typography.bodyMedium, userSelect: 'none' }}>Exposure</Typography>
                        <TextField
                            hiddenLabel
                            id="exposure-input"
                            value={formatValue(props.ExposureScore)}
                            variant="filled"
                            onChange={(e) => handleInputChange(e, -100, 100, props.onExposureChange)}
                            sx={{
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
                                '& .Mui-focused' : {
                                    '& .MuiFilledInput-input': {
                                        backgroundColor: "#1C1B1FB2",
                                        textAlign: 'right',
                                        borderRadius: '5px 5px 0px 0px',
                                        borderBottom: 'none',
                                        // pr: '8px',
                                        pl: '2px',
                                    }
                                }
                            }}/>
                    </Stack>
                    <Slider
                        sx={{
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
                        }}
                        size="small"
                        value={props.ExposureScore}
                        step={1}
                        min={-100}
                        max={100}
                        onChange={(_event, newValue) => props.onExposureChange(newValue as number)}
                        onDoubleClick={() => props.onExposureChange(0)}
                    />
                </Stack>
                <Stack direction="column" gap="3px" sx={{pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle,}}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography 
                            component="label"
                            htmlFor="contrast-input"
                            onDoubleClick={() => props.onContrastChange(0)}
                            sx={{...typography.bodyMedium, userSelect: 'none' }}>Contrast</Typography>
                        <TextField
                            hiddenLabel
                            id="contrast-input"
                            value={formatValue(props.ContrastScore)}
                            variant="filled"
                            onChange={(e) => handleInputChange(e, -100, 100, props.onContrastChange)}
                            sx={{
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
                                '& .Mui-focused' : {
                                    '& .MuiFilledInput-input': {
                                        backgroundColor: "#1C1B1FB2",
                                        textAlign: 'right',
                                        borderRadius: '5px 5px 0px 0px',
                                        borderBottom: 'none',
                                        // pr: '8px',
                                        pl: '2px',
                                    }
                                }
                            }}/>
                    </Stack>
                    <Slider
                        sx={{
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
                        }}
                        size="small"
                        value={props.ContrastScore}
                        step={1}
                        min={-100}
                        max={100}
                        onChange={(_event, newValue) => props.onContrastChange(newValue as number)}
                        onDoubleClick={() => props.onContrastChange(0)}
                    />
                </Stack>
                <Stack direction="column" gap="3px" sx={{pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle,}}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography 
                            component="label"
                            htmlFor="highlights-input"
                            onDoubleClick={() => props.onHighlightsChange(0)}
                            sx={{...typography.bodyMedium, userSelect: 'none' }}>Highlights</Typography>
                        <TextField
                            hiddenLabel
                            id="highlights-input"
                            value={formatValue(props.HighlightsScore)}
                            variant="filled"
                            onChange={(e) => handleInputChange(e, -100, 100, props.onHighlightsChange)}
                            sx={{
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
                                '& .Mui-focused' : {
                                    '& .MuiFilledInput-input': {
                                        backgroundColor: "#1C1B1FB2",
                                        textAlign: 'right',
                                        borderRadius: '5px 5px 0px 0px',
                                        borderBottom: 'none',
                                        // pr: '8px',
                                        pl: '2px',
                                    }
                                }
                            }}/>
                    </Stack>
                    <Slider
                        sx={{
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
                        }}
                        size="small"
                        value={props.HighlightsScore}
                        step={1}
                        min={-100}
                        max={100}
                        onChange={(_event, newValue) => props.onHighlightsChange(newValue as number)}
                        onDoubleClick={() => props.onHighlightsChange(0)}
                    />
                </Stack>
                <Stack direction="column" gap="3px" sx={{pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle,}}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography 
                            component="label"
                            htmlFor="shadows-input"
                            onDoubleClick={() => props.onShadowsChange(0)}
                            sx={{...typography.bodyMedium, userSelect: 'none' }}>Shadows</Typography>
                        <TextField
                            hiddenLabel
                            id="shadows-input"
                            value={formatValue(props.ShadowsScore)}
                            variant="filled"
                            onChange={(e) => handleInputChange(e, -100, 100, props.onShadowsChange)}
                            sx={{
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
                                '& .Mui-focused' : {
                                    '& .MuiFilledInput-input': {
                                        backgroundColor: "#1C1B1FB2",
                                        textAlign: 'right',
                                        borderRadius: '5px 5px 0px 0px',
                                        borderBottom: 'none',
                                        // pr: '8px',
                                        pl: '2px',
                                    }
                                }
                            }}/>
                    </Stack>
                    <Slider
                        sx={{
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
                        }}
                        size="small"
                        value={props.ShadowsScore}
                        step={1}
                        min={-100}
                        max={100}
                        onChange={(_event, newValue) => props.onShadowsChange(newValue as number)}
                        onDoubleClick={() => props.onShadowsChange(0)}
                    />
                </Stack>
                <Stack direction="column" gap="3px" sx={{pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle,}}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography 
                            component="label"
                            htmlFor="whites-input"
                            onDoubleClick={() => props.onWhitesChange(0)}
                            sx={{...typography.bodyMedium, userSelect: 'none' }}>Whites</Typography>
                        <TextField
                            hiddenLabel
                            id="whites-input"
                            value={formatValue(props.WhitesScore)}
                            variant="filled"
                            onChange={(e) => handleInputChange(e, -100, 100, props.onWhitesChange)}
                            sx={{
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
                                '& .Mui-focused' : {
                                    '& .MuiFilledInput-input': {
                                        backgroundColor: "#1C1B1FB2",
                                        textAlign: 'right',
                                        borderRadius: '5px 5px 0px 0px',
                                        borderBottom: 'none',
                                        // pr: '8px',
                                        pl: '2px',
                                    }
                                }
                            }}/>
                    </Stack>
                    <Slider
                        sx={{
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
                        }}
                        size="small"
                        value={props.WhitesScore}
                        step={1}
                        min={-100}
                        max={100}
                        onChange={(_event, newValue) => props.onWhitesChange(newValue as number)}
                        onDoubleClick={() => props.onWhitesChange(0)}
                    />
                </Stack>
                <Stack direction="column" gap="3px" sx={{pt: '10px', pb: '0px', px: '0px', mx: '0px', '&:focus-within .MuiFilledInput-input': focusedInputStyle,}}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography 
                            component="label"
                            htmlFor="blacks-input"
                            onDoubleClick={() => props.onBlacksChange(0)}
                            sx={{...typography.bodyMedium, userSelect: 'none' }}>Blacks</Typography>
                        <TextField
                            hiddenLabel
                            id="blacks-input"
                            value={formatValue(props.BlacksScore)}
                            variant="filled"
                            onChange={(e) => handleInputChange(e, -100, 100, props.onBlacksChange)}
                            sx={{
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
                                '& .Mui-focused' : {
                                    '& .MuiFilledInput-input': {
                                        backgroundColor: "#1C1B1FB2",
                                        textAlign: 'right',
                                        borderRadius: '5px 5px 0px 0px',
                                        borderBottom: 'none',
                                        // pr: '8px',
                                        pl: '2px',
                                    }
                                }
                            }}/>
                    </Stack>
                    <Slider
                        sx={{
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
                        }}
                        size="small"
                        value={props.BlacksScore}
                        step={1}
                        min={-100}
                        max={100}
                        onChange={(_event, newValue) => props.onBlacksChange(newValue as number)}
                        onDoubleClick={() => props.onBlacksChange(0)}
                    />
                </Stack>
            </Stack>
        </>
    )
}