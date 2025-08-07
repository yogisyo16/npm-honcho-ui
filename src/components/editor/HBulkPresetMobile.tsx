import React from "react";
import {Typography, Stack, IconButton, CardMedia, Button, MenuItem, Box, FormControl, Select, SelectChangeEvent} from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

type Preset = {
    id: string;
    name: string;
};

interface Props {
    presets: Preset[]; // Prop to receive presets from the hook
    selectedPresetBulk: string;
    onOpenPresetModalBulk: () => void;
    onSelectPresetBulk: (event: SelectChangeEvent<string>) => void;
    onPresetMenuClickBulk: (event: React.MouseEvent<HTMLElement>, presetId: string) => void;
}

// Static `presets` array has been removed.

export default function HBulkPresetMobile (props: Props){
    const typography = useHonchoTypography();
    const colors = useColors();

    const CustomSelectIcon = (iconProps: { className?: string }) => {
            const isExpanded = iconProps.className?.includes('MuiSelect-iconOpen');
            return (
                <CardMedia
                    component="img"
                    image={isExpanded ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg"}
                    sx={{ width: "11.67px", height: "5.83px", right: '14px', position: 'absolute', pointerEvents: 'none' }}
                />
            );
        };

    return(
        <>
            <Stack direction="column" sx={{ px: "0px", mx: "16px", mt: "6px", mb: "0px" }}>
                <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>Preset</Typography>
                <FormControl fullWidth>
                    <Select
                        fullWidth
                        value={props.selectedPresetBulk}
                        onChange={props.onSelectPresetBulk}
                        IconComponent={CustomSelectIcon}
                        renderValue={(selectedId) => {
                            // Uses props.presets to find the name
                            const selectedPresetBulkObject = props.presets.find(p => p.id === selectedId);
                            if (!selectedPresetBulkObject) {
                                return <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>Select</Typography>;
                            }
                            return <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>{selectedPresetBulkObject.name}</Typography>;
                        }}
                        MenuProps={{
                            anchorOrigin: { vertical: 'top', horizontal: 'left' },
                            transformOrigin: { vertical: 'bottom', horizontal: 'left' },
                            sx: { marginTop: '-10px' },
                            slotProps: { paper: { sx: { backgroundColor: colors.onBackground, color: colors.surface, border: `1px solid ${colors.onSurfaceVariant1}`, borderRadius: '4px', width: '328px' } } }
                        }}
                        sx={{ border: `1px solid ${colors.outlineVariant}`, height: '44px', width: '328px', mt: '6px' }}
                    >
                        {/* Maps over props.presets */}
                        {props.presets.map((preset) => (
                            <MenuItem
                                key={preset.id}
                                value={preset.id}
                                sx={{ padding: '8px 10px', minHeight: 'auto', mb: '4px' }}
                            >
                                <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        image="v1/svg/check-ratio-editor.svg"
                                        sx={{ width: "20px", height: "20px", mr: '12px', px: '0px', visibility: props.selectedPresetBulk === preset.id ? 'visible' : 'hidden' }}
                                    />
                                    <Typography sx={{ width: '24px', textWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', color: colors.surface, pr: "82px", pl: "0px", mr: "165px", justifyContent: 'flex-start', ...typography.bodyMedium }}>
                                        {preset.name}
                                    </Typography>
                                    <IconButton
                                        aria-label={`Options for ${preset.name}`}
                                        onClick={(event) => props.onPresetMenuClickBulk(event, preset.id)}
                                        sx={{ padding: "0px", margin: "0px", mr: "0px" }}
                                    >
                                        <CardMedia component="img" image="/v1/svg/dots-editor.svg" alt="Options" sx={{ width: '20px', height: '20px' }}/>
                                    </IconButton>
                                </Stack>
                            </MenuItem>
                        ))}
                        <Box sx={{ px: '16px', my: '8px'}}>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ ...typography.labelMedium, height: '40px', pt: '5px', color: colors.onBackground, backgroundColor: colors.surface, borderRadius: '100px', borderColor: colors.surface, textTransform: 'none', '&:hover': { backgroundColor: '#e0e0e0', borderColor: colors.surface } }}
                                onClick={props.onOpenPresetModalBulk}
                            >
                                Create Preset
                            </Button>
                        </Box>
                    </Select>
                </FormControl>
            </Stack>
        </>
    )
}