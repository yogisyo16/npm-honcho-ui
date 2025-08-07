import React from "react";
import { Stack, Typography, IconButton, CardMedia } from "@mui/material";
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

export default function HBulkAccordionColorAdjustmentDetails(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    
    return(
        <>
            <Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ pb: "8px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Clarity</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton onClick={props.onClarityDecreaseMax}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ mr: "2px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onClarityDecrease}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onClarityIncrease}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button-right.svg" sx={{ml: "3px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onClarityIncreaseMax}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button-right.svg" sx={{ml: "2px" }}/>
                    </IconButton>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ pb: "8px", pt: "16px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Sharpness</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton onClick={props.onSharpnessDecreaseMax}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ mr: "2px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onSharpnessDecrease}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onSharpnessIncrease}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button-right.svg" sx={{ ml: "3px" }}/>
                    </IconButton>
                    <IconButton onClick={props.onSharpnessIncreaseMax}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button-right.svg" sx={{ ml: "2px" }}/>
                    </IconButton>
                </Stack>
            </Stack>
        </>
    )
}