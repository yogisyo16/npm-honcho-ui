import React from "react";
import { Box, Accordion, AccordionDetails , AccordionSummary, Button, Stack, Typography, CardMedia, IconButton, MenuItem, ListItemText , ListItemIcon, Menu } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

type Preset = {
    id: string;
    name: string;
};

interface Props {
    presets: Preset[]; // --- Updated to accept presets as a prop ---
    expandedPanels: string[];
    selectedPreset: string | null;
    presetMenuAnchorEl: null | HTMLElement;
    activePresetMenuId: string | null;
    onChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
    onOpenPresetModal: () => void;
    onOpenWatermarkView: () => void;
    onSelectPreset: (id: string) => void;
    onPresetMenuClick: (event: React.MouseEvent<HTMLElement>, presetId: string) => void;
    onPresetMenuClose: () => void;
    onRemovePreset: () => void;
    onRenamePreset: () => void;
    onDeletePreset: () => void;
}

// --- The static presets array has been REMOVED from this component ---

export default function HAccordionPreset(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const isMenuOpen = Boolean(props.presetMenuAnchorEl);

    const accordionStyle = {
        backgroundColor: colors.onBackground,
        color: colors.surface,
        '& .MuiAccordionSummary-root': {
            backgroundColor: colors.onBackground,
            color: colors.surface,
        },
        '& .MuiAccordionDetails-root': {
            backgroundColor: colors.onBackground,
            color: colors.surface,
        },
        '& .MuiTypography-root': {
            color: colors.surface,
        },
        '& .MuiSvgIcon-root': {
            color: colors.surface,
        }
    };

    const isPanelExpanded = (panelName: string) => props.expandedPanels.includes(panelName);

    return(
        <>
            <Box>
                <Accordion
                    sx={accordionStyle}
                    expanded={isPanelExpanded('preset')}
                    onChange={props.onChange('preset')}
                    disableGutters
                >
                    <AccordionSummary sx={{ pr: 0 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                            <Typography sx={{ ...typography.titleMedium, color: colors.surface }}>Preset</Typography>
                            <CardMedia
                                component="img"
                                image={isPanelExpanded('preset') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg"}
                                sx={{ width: "11.67px", height: "5.83px" }}
                            />
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pr: "4px" }}>
                        <Stack direction="column" gap="8px" sx={{pt: '0px', pb: '0px', mx: '0px', width: '100%'}}>
                            {props.presets.map((preset) => (
                                <Stack key={preset.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                    {props.selectedPreset != preset.id && (
                                        <Button
                                            sx={{
                                                width: '100px',
                                                textWrap: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: 'block',
                                                textTransform: 'none',
                                                color: colors.surface,
                                                pr: "120px",
                                                pl: "0px",
                                                ml: "0px",
                                                justifyContent: 'flex-start',
                                                ...typography.bodyMedium
                                            }}
                                            onClick={() => props.onSelectPreset(preset.id)}
                                        >
                                            {preset.name}
                                        </Button>
                                    )}
                                    {props.selectedPreset === preset.id && (
                                        <Button
                                            sx={{
                                                width: '84px',
                                                textWrap: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: 'block',
                                                color: colors.surface,
                                                pr: "82px",
                                                pl: "0px",
                                                ml: "0px",
                                                justifyContent: 'flex-start',
                                                ...typography.bodyMedium
                                            }}
                                            onClick={() => props.onSelectPreset(preset.id)}
                                        >
                                            {preset.name}
                                        </Button>
                                    )}
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        {props.selectedPreset === preset.id && (
                                            <CardMedia
                                                component="img"
                                                image="v1/svg/check-ratio-editor.svg"
                                                sx={{ width: "20px", height: "20px" }}
                                            />
                                        )}
                                        <IconButton aria-label={preset.name} onClick={(event) => props.onPresetMenuClick(event, preset.id)} sx={{ padding: "0px", margin: "0px" }}>
                                            <CardMedia
                                                component="img"
                                                image="/v1/svg/dots-editor.svg"
                                                alt="Options"
                                                sx={{ padding: "0px", margin: "0px" }}
                                            />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            ))}
                        <Button
                            variant="text"
                            sx={{ color: colors.surface, border: "1px solid",
                                borderColor: colors.surface,
                                borderRadius: "40px",
                                textTransform: 'none',
                            }}
                            onClick={props.onOpenPresetModal}
                        >
                            Create Preset
                        </Button>
                    </Stack>
                </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={accordionStyle}
                    expanded={isPanelExpanded('watermark')}
                    onChange={props.onChange('watermark')}
                    disableGutters
                >
                    <AccordionSummary sx={{ pr: 0 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                            <Typography sx={{ ...typography.titleMedium, color: colors.surface }}>Watermark</Typography>
                            <CardMedia
                                component="img"
                                image={isPanelExpanded('watermark') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg"}
                                sx={{ width: "11.67px", height: "5.83px" }}
                            />
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack direction="column">
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ width: '100%' }}
                            >
                                <Typography color="initial">Jonathan</Typography>
                                <IconButton
                                    aria-label="options"
                                    // onClick={handleMenuClick}
                                >
                                    <CardMedia
                                        component="img"
                                        image="/v1/svg/dots-editor.svg"
                                        alt="Options"
                                    />
                                </IconButton>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ width: '100%' }}
                            >
                                <Typography color="initial">Jonathan</Typography>
                                <IconButton
                                    aria-label="options"
                                    // onClick={handleMenuClick}
                                >
                                    <CardMedia
                                        component="img"
                                        image="/v1/svg/dots-editor.svg"
                                        alt="Options"
                                    />
                                </IconButton>
                            </Stack>
                            <Button
                                variant="text"
                                sx={{ color: colors.surface, border: "1px solid" ,borderColor: colors.surface, borderRadius: "40px", textTransform: 'none', }}
                                onClick={props.onOpenWatermarkView}
                            >
                                Create Watermark
                            </Button>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    )
}