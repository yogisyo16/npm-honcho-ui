import React from "react";
import { Stack, Typography, IconButton, CardMedia } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

interface Props {
    onExposureDecreaseMax: () => void;
    onExposureDecrease: () => void;
    onExposureIncrease: () => void;
    onExposureIncreaseMax: () => void;
    onContrastDecreaseMax: () => void;
    onContrastDecrease: () => void;
    onContrastIncrease: () => void;
    onContrastIncreaseMax: () => void;
    onHighlightsDecreaseMax: () => void;
    onHighlightsDecrease: () => void;
    onHighlightsIncrease: () => void;
    onHighlightsIncreaseMax: () => void;
    onShadowsDecreaseMax: () => void;
    onShadowsDecrease: () => void;
    onShadowsIncrease: () => void;
    onShadowsIncreaseMax: () => void;
    onWhitesDecreaseMax: () => void;
    onWhitesDecrease: () => void;
    onWhitesIncrease: () => void;
    onWhitesIncreaseMax: () => void;
    onBlacksDecreaseMax: () => void;
    onBlacksDecrease: () => void;
    onBlacksIncrease: () => void;
    onBlacksIncreaseMax: () => void;
}

export default function HBulkAccordionColorAdjustmentLight(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    
    return(
        <>
            <Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ pb: "8px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Exposure</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton onClick={props.onExposureDecreaseMax}
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
                    <IconButton onClick={props.onExposureDecrease}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }} />
                    </IconButton>
                    <IconButton onClick={props.onExposureIncrease}
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
                    <IconButton onClick={props.onExposureIncreaseMax}
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
                <Stack direction="row" justifyContent="space-between" sx={{ pb: "8px", pt: "16px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Contrast</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton onClick={props.onContrastDecreaseMax}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ mr: "2px" }} />
                    </IconButton>
                    <IconButton onClick={props.onContrastDecrease}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }} />
                    </IconButton>
                    <IconButton onClick={props.onContrastIncrease}
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
                    <IconButton onClick={props.onContrastIncreaseMax}
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
                <Stack direction="row" justifyContent="space-between" sx={{ pb: "8px", pt: "16px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Highlights</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton onClick={props.onHighlightsDecreaseMax}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ mr: "2px" }} />
                    </IconButton>
                    <IconButton onClick={props.onHighlightsDecrease}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }} />
                    </IconButton>
                    <IconButton onClick={props.onHighlightsIncrease}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button-right.svg" sx={{ ml: "3px" }} />
                    </IconButton>
                    <IconButton onClick={props.onHighlightsIncreaseMax}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button-right.svg" sx={{ ml: "2px" }} />
                    </IconButton>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ py: "8px", pt: "16px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Shadows</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton onClick={props.onShadowsDecreaseMax}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ mr: "2px" }} />
                    </IconButton>
                    <IconButton onClick={props.onShadowsDecrease}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }} />
                    </IconButton>
                    <IconButton onClick={props.onShadowsIncrease}
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
                    <IconButton onClick={props.onShadowsIncreaseMax}
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
                <Stack direction="row" justifyContent="space-between" sx={{ py: "8px", pt: "16px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Whites</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton onClick={props.onWhitesDecreaseMax}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ mr: "2px" }} />
                    </IconButton>
                    <IconButton onClick={props.onWhitesDecrease}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }} />
                    </IconButton>
                    <IconButton onClick={props.onWhitesIncrease}
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
                    <IconButton onClick={props.onWhitesIncreaseMax}
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
                <Stack direction="row" justifyContent="space-between" sx={{ py: "8px", pt: "16px" }}>
                    <Typography sx={{...typography.bodyMedium}}>Blacks</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ p: "0px", m: "0px", pt: "2px", pb: "2px" }}>
                    <IconButton onClick={props.onBlacksDecreaseMax}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-max-button.svg" sx={{ mr: "2px" }} />
                    </IconButton>
                    <IconButton onClick={props.onBlacksDecrease}
                    sx={{
                        width: "38.5px",
                        height: "24px",
                        py: "2px",
                        mr: "12px",
                        border: "1px solid white",
                        borderRadius: "100px",
                    }}>
                        <CardMedia component="img" image="/v1/svg/bulk-editor-increment-button.svg" sx={{ mr: "3px" }} />
                    </IconButton>
                    <IconButton onClick={props.onBlacksIncrease}
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
                    <IconButton onClick={props.onBlacksIncreaseMax}
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