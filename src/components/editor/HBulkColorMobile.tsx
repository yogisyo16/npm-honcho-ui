import React from "react";
import { Box, Stack, Slider, Typography, TextField, CardMedia, IconButton } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

interface Props {
    onTempDecreaseMax: () => void;
    onTempDecrease: () => void;
    onTempIncrease: () => void;
    onTempIncreaseMax: () => void;
    onTintDecreaseMax: () => void;
    onTintDecrease: () => void;
    onTintIncrease: () => void;
    onTintIncreaseMax: () => void;
    onVibranceDecreaseMax: () => void;
    onVibranceDecrease: () => void;
    onVibranceIncrease: () => void;
    onVibranceIncreaseMax: () => void;
    onSaturationDecreaseMax: () => void;
    onSaturationDecrease: () => void;
    onSaturationIncrease: () => void;
    onSaturationIncreaseMax: () => void;
}

export default function HBulkColorMobile(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();

    return(
        <>
            <Stack spacing={0} direction="column" sx={{ width: '100%', pl: "10px", m: "0px" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: "6px" }}>
                    <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>Temperature</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "16px" }}>
                    <IconButton onClick={props.onTempDecreaseMax}
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
                    <IconButton onClick={props.onTempDecrease}
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
                    <IconButton onClick={props.onTempIncrease}
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
                    <IconButton onClick={props.onTempIncreaseMax}
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
                    <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>Tint</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "16px" }}>
                    <IconButton onClick={props.onTintDecreaseMax}
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
                    <IconButton onClick={props.onTintDecrease}
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
                    <IconButton onClick={props.onTintIncrease}
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
                    <IconButton onClick={props.onTintIncreaseMax}
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
                    <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>Vibrance</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "16px" }}>
                    <IconButton onClick={props.onVibranceDecreaseMax}
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
                    <IconButton onClick={props.onVibranceDecrease}
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
                    <IconButton onClick={props.onVibranceIncrease}
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
                    <IconButton onClick={props.onVibranceIncreaseMax}
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
                    <Typography sx={{ ...typography.bodyMedium, color: colors.surface }}>Saturation</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "16px" }}>
                    <IconButton onClick={props.onSaturationDecreaseMax}
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
                    <IconButton onClick={props.onSaturationDecrease}
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
                    <IconButton onClick={props.onSaturationIncrease}
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
                    <IconButton onClick={props.onSaturationIncreaseMax}
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