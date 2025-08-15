import React from "react";
import { Stack, Slider, Typography, TextField} from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

interface Props {
    exposureScore: number;
    contrastScore: number;
    highlightsScore: number;
    shadowScore: number;
    whiteScore: number;
    blackScore: number;
    // Add onChange handlers for each score
    onExposureChange: (value: number) => void;
    onContrastChange: (value: number) => void;
    onHighlightsChange: (value: number) => void;
    onShadowsChange: (value: number) => void;
    onWhitesChange: (value: number) => void;
    onBlacksChange: (value: number) => void;
}

export default function HSliderLightMobile (props: Props){
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
                    <Typography sx={{...typography.bodyMedium, color: colors.surface}}>Exposure</Typography>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={formatValue(props.exposureScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onExposureChange)}
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
                            boxShadow: 'none', 
                            opacity: 1,
                        },
                        '& .MuiSlider-thumb:hover': {
                            boxShadow: 'none',   
                        }
                    }}
                    size="small"
                    value={props.exposureScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onExposureChange(newValue as number)}
                    onDoubleClick={() => props.onExposureChange(0)}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: '10px', pb: '0px' }}>
                    <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>Contrast</Typography>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={formatValue(props.contrastScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onContrastChange)}
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
                            boxShadow: 'none', 
                            opacity: 1,
                        },
                        '& .MuiSlider-thumb:hover': {
                            boxShadow: 'none',   
                        }
                    }}
                    size="small"
                    value={props.contrastScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onContrastChange(newValue as number)}
                    onDoubleClick={() => props.onContrastChange(0)}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: '10px', pb: '0px' }}>
                    <Typography sx={{...typography.bodyMedium, color: colors.surface}}>Highlights</Typography>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={formatValue(props.highlightsScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onHighlightsChange)}
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
                            boxShadow: 'none', 
                            opacity: 1,
                        },
                        '& .MuiSlider-thumb:hover': {
                            boxShadow: 'none',   
                        }
                    }}
                    size="small"
                    value={props.highlightsScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onHighlightsChange(newValue as number)}
                    onDoubleClick={() => props.onHighlightsChange(0)}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: '10px', pb: '0px' }}>
                    <Typography sx={{...typography.bodyMedium, color: colors.surface}}>Shadows</Typography>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={formatValue(props.shadowScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onShadowsChange)}
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
                            boxShadow: 'none', 
                            opacity: 1,
                        },
                        '& .MuiSlider-thumb:hover': {
                            boxShadow: 'none',   
                        }
                    }}
                    size="small"
                    value={props.shadowScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onShadowsChange(newValue as number)}
                    onDoubleClick={() => props.onShadowsChange(0)}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: '10px', pb: '0px' }}>
                    <Typography sx={{...typography.bodyMedium, color: colors.surface}}>Whites</Typography>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={formatValue(props.whiteScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onWhitesChange)}
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
                            boxShadow: 'none', 
                            opacity: 1,
                        },
                        '& .MuiSlider-thumb:hover': {
                            boxShadow: 'none',   
                        }
                    }}
                    size="small"
                    value={props.whiteScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onWhitesChange(newValue as number)}
                    onDoubleClick={() => props.onWhitesChange(0)}
                />
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: '10px', pb: '0px' }}>
                    <Typography sx={{...typography.bodyMedium, color: colors.surface}}>Blacks</Typography>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-small"
                        value={formatValue(props.blackScore)}
                        variant="filled"
                        onChange={(e) => handleInputChange(e, -100, 100, props.onBlacksChange)}
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
                            },
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
                            boxShadow: 'none', 
                            opacity: 1,
                        },
                        '& .MuiSlider-thumb:hover': {
                            boxShadow: 'none',   
                        }
                    }}
                    size="small"
                    value={props.blackScore}
                    step={1}
                    min={-100}
                    max={100}
                    onChange={(_event, newValue) => props.onBlacksChange(newValue as number)}
                    onDoubleClick={() => props.onBlacksChange(0)}
                />
            </Stack>
        </>
    )

}