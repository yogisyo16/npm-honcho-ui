import React from "react";
import { Stack, Slider, Typography, TextField, CardMedia, IconButton } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

interface Props {
    onClarityDecreaseMax: () => void;
    onClarityDecrease: () => void;
    onClarityIncrease: () => void;
    onClarityIncreaseMax: () => void;
    onSharpnessDecreaseMax: () => void;
    onSharpnessDecrease: () => void;
    onSharpnessIncrease: () => void;
    onSharpnessIncreaseMax: () => void;
}

export default function HBulkDetailsMobile(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();

    return (
        <>
            <Stack spacing={0} direction="column" sx={{ width: '100%', pl: "10px", m: "0px" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: "6px" }}>
                    <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>Clarity</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "16px" }}>
                    <IconButton onClick={props.onClarityDecreaseMax}
                    sx={{
                        width: "76px",
                        height: "28px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ width: "20px", height: "20px", mr: "2px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onClarityDecrease}
                    sx={{
                        width: "76px",
                        height: "28px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ width: "20px", height: "20px", mr: "3px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onClarityIncrease}
                    sx={{
                        width: "76px",
                        height: "28px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button-right.svg" sx={{ width: "20px", height: "20px", ml: "3px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onClarityIncreaseMax}
                    sx={{
                        width: "76px",
                        height: "28px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button-right.svg" sx={{ width: "20px", height: "20px", ml: "2px" }}/>
                    </IconButton>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: "6px" }}>
                    <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>Sharpness</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton onClick={props.onSharpnessDecreaseMax}
                    sx={{
                        width: "76px",
                        height: "28px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ width: "20px", height: "20px", mr: "2px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onSharpnessDecrease}
                    sx={{
                        width: "76px",
                        height: "28px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ width: "20px", height: "20px", mr: "3px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onSharpnessIncrease}
                    sx={{
                        width: "76px",
                        height: "28px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button-right.svg" sx={{ width: "20px", height: "20px", ml: "3px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onSharpnessIncreaseMax}
                    sx={{
                        width: "76px",
                        height: "28px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button-right.svg" sx={{ width: "20px", height: "20px", ml: "2px" }}/>
                    </IconButton>
                </Stack>
            </Stack>
        </>
    )
}