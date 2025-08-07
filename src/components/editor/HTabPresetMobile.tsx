import React from "react";
import {Typography, Stack, IconButton, CardMedia, Button} from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

type Preset = {
    id: string;
    name: string;
};

interface Props {
    presets: Preset[]; // Prop to receive presets from the hook
    selectedPreset: string | null;
    presetOptionModal: (event: React.MouseEvent<HTMLElement>, presetId: string) => void;
    onOpenPresetModal: () => void;
    onSelectPreset: (id: string) => void;
}

// Static `presets` array has been removed.

export default function HTabPresetMobile (props: Props){
    const typography = useHonchoTypography();
    const colors = useColors();

    return(
        <>
            <Stack direction="column" spacing={0} sx={{ px: "0px", mx: "0px" }}>
                {/* Maps over props.presets */}
                {props.presets.map((preset) => (
                    <Stack key={preset.id} direction="row" alignItems="center" justifyContent="space-between">
                        <Button
                            sx={{ ...typography.bodyMedium, color: colors.surface, justifyContent: 'flex-start', flexGrow: 1, textTransform: 'none' }}
                            onClick={() => props.onSelectPreset(preset.id)}
                        >
                            {preset.name}
                        </Button>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            {props.selectedPreset === preset.id && (
                                <CardMedia
                                    component="img"
                                    image="v1/svg/check-ratio-editor.svg"
                                    sx={{ width: "20px", height: "20px", px: "2px" }}
                                />
                            )}
                            <IconButton aria-label={preset.name} sx={{ px: "8px" }} onClick={(event) => props.presetOptionModal(event, preset.id)}>
                                <CardMedia
                                    component="img"
                                    image="/v1/svg/dots-editor.svg"
                                    alt="Options"
                                />
                            </IconButton>
                        </Stack>
                    </Stack>
                ))}
                <Button
                    variant="text"
                    sx={{ color: colors.surface, border: "1px solid" ,borderColor: colors.surface, borderRadius: "40px", mt: "12px", textTransform: 'none' }}
                    onClick={props.onOpenPresetModal}
                >
                    Create Preset
                </Button>
            </Stack>
        </>
    )
}