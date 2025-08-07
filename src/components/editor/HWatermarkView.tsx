import React from "react";
import { TextField, CardMedia, IconButton, Button, Typography, Stack } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

interface Props {
    onSaveWatermark: () => void;
    onCancelWatermark: () => void;
}

export default function HWatermarkView(props: Props) {
    const colors = useColors();
    const typography = useHonchoTypography();

    return (
        <>
            <Stack direction="column" alignItems="center" spacing={5} sx={{ pt: "20px", color: colors.surface }}>
                <TextField
                    id="watermark-name"
                    label="watermark name"
                    variant="standard"
                    sx={{
                        '& .MuiInput-underline:before': {
                            borderBottomColor: colors.surface
                        },
                        '& .MuiInputBase-input': {
                            color: colors.surface
                        }
                    }}
                />
                <Stack direction="row" spacing={0.5}>
                    <Button variant="text" sx={{ color: colors.surface }}>
                        Landscape
                    </Button>
                    <Button variant="text" sx={{ color: colors.surface }}>
                        Portrait
                    </Button>
                    <Button variant="text" sx={{ color: colors.surface }}>
                        Square
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}