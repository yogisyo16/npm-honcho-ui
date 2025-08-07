import React from "react";
import { Stack, Typography, IconButton, CardMedia } from "@mui/material";
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

export default function HBulkAccordionColorAdjustmentColors(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    
    return(
        <>
            <Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ pb: "8px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Temperature</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton
                        onClick={props.onTempDecreaseMax}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                            <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ mr: "2px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onTempDecrease}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "20px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onTempIncrease}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button-right.svg" sx={{ml: "3px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onTempIncreaseMax}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button-right.svg" sx={{ ml: "2px" }}/>
                    </IconButton>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ pb: "8px", pt: "16px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Tint</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton 
                        onClick={props.onTintDecreaseMax}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ mr: "2px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onTintDecrease}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onTintIncrease}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button-right.svg" sx={{ml: "3px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onTintIncreaseMax}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button-right.svg" sx={{ ml: "2px" }}/>
                    </IconButton>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ pb: "8px", pt: "16px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Vibrance</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton 
                        onClick={props.onVibranceDecreaseMax}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ mr: "2px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onVibranceDecrease}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onVibranceIncrease}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button-right.svg" sx={{ml: "3px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onVibranceIncreaseMax}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button-right.svg" sx={{ ml: "2px" }}/>
                    </IconButton>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ pb: "8px", pt: "16px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Saturation</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton 
                        onClick={props.onSaturationDecreaseMax}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ mr: "2px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onSaturationDecrease}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onSaturationIncrease}
                        sx={{
                            width: "38.5px",
                            height: "26px",
                            py: "2px",
                            mr: "12px",
                            border: "1px solid white",
                            borderRadius: "100px",
                        }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button-right.svg" sx={{ml: "3px" }}/>
                    </IconButton>
                    <IconButton 
                        onClick={props.onSaturationIncreaseMax}
                        sx={{
                            width: "38.5px",
                            height: "26px",
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