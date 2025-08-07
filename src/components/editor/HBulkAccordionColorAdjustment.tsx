import React from "react";
import { Accordion, AccordionDetails , AccordionSummary, CardMedia, Stack, Typography } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from "../../themes/colors";
import HBulkAccordionColorAdjustmentColors from "./HBulkAccordionColorAdjustmentColors";
import HBulkAccordionColorAdjustmentLight from "./HBulkAccordionColorAdjustmentLight";
import HBulkAccordionColorAdjustmentDetails from "./HBulkAccordionColorAdjustmentDetails";

interface Props {
    // Getters get values
    // Adjustments Colors
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

    // Adjustments Light
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

    // Adjustments Details
    onClarityDecreaseMax: () => void;
    onClarityDecrease: () => void;
    onClarityIncrease: () => void;
    onClarityIncreaseMax: () => void;
    onSharpnessDecreaseMax: () => void;
    onSharpnessDecrease: () => void;
    onSharpnessIncrease: () => void;
    onSharpnessIncreaseMax: () => void;

    expandedPanels: string[];
    onPanelChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export default function HBulkAccordionColorAdjustment(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();

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

    return (
        <>
            <Stack direction="column" sx={{ accordionStyle }}>
                <Accordion
                    sx={accordionStyle}
                    expanded={isPanelExpanded('whiteBalance')}
                    onChange={props.onPanelChange('whiteBalance')}
                    disableGutters
                >
                    <AccordionSummary sx={{ pr: 0 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%'}}>
                            <Typography sx={{ ...typography.titleMedium }}>Color</Typography>
                            <CardMedia
                                component="img"
                                image={isPanelExpanded('whiteBalance') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg"}
                                sx={{ width: "11.67px", height: "5.83px" }}
                            />
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pr: "4px" }}>
                        <HBulkAccordionColorAdjustmentColors
                            onTempDecreaseMax={props.onTempDecreaseMax}
                            onTempDecrease={props.onTempDecrease}
                            onTempIncrease={props.onTempIncrease}
                            onTempIncreaseMax={props.onTempIncreaseMax}
                            onTintDecreaseMax={props.onTintDecreaseMax}
                            onTintDecrease={props.onTintDecrease}
                            onTintIncrease={props.onTintIncrease}
                            onTintIncreaseMax={props.onTintIncreaseMax}
                            onVibranceDecreaseMax={props.onVibranceDecreaseMax}
                            onVibranceDecrease={props.onVibranceDecrease}
                            onVibranceIncrease={props.onVibranceIncrease}
                            onVibranceIncreaseMax={props.onVibranceIncreaseMax}
                            onSaturationDecreaseMax={props.onSaturationDecreaseMax}
                            onSaturationDecrease={props.onSaturationDecrease}
                            onSaturationIncrease={props.onSaturationIncrease}
                            onSaturationIncreaseMax={props.onSaturationIncreaseMax}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={accordionStyle}
                    expanded={isPanelExpanded('light')}
                    onChange={props.onPanelChange('light')}
                    disableGutters
                >
                    <AccordionSummary sx={{ pr: 0 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                            <Typography sx={{ ...typography.titleMedium }}>Light</Typography>
                            <CardMedia
                                component="img"
                                image={isPanelExpanded('light') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg"}
                                sx={{ width: "11.67px", height: "5.83px" }}
                            />
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pr: "4px" }}>
                        <HBulkAccordionColorAdjustmentLight
                            onExposureDecreaseMax= {props.onExposureDecreaseMax}
                            onExposureDecrease= {props.onExposureDecrease}
                            onExposureIncrease= {props.onExposureIncrease}
                            onExposureIncreaseMax= {props.onExposureIncreaseMax}
                            onContrastDecreaseMax= {props.onContrastDecreaseMax}
                            onContrastDecrease= {props.onContrastDecrease}
                            onContrastIncrease= {props.onContrastIncrease}
                            onContrastIncreaseMax= {props.onContrastIncreaseMax}
                            onHighlightsDecreaseMax= {props.onHighlightsDecreaseMax}
                            onHighlightsDecrease= {props.onHighlightsDecrease}
                            onHighlightsIncrease= {props.onHighlightsIncrease}
                            onHighlightsIncreaseMax= {props.onHighlightsIncreaseMax}
                            onShadowsDecreaseMax= {props.onShadowsDecreaseMax}
                            onShadowsDecrease= {props.onShadowsDecrease}
                            onShadowsIncrease= {props.onShadowsIncrease}
                            onShadowsIncreaseMax= {props.onShadowsIncreaseMax}
                            onWhitesDecreaseMax= {props.onWhitesDecreaseMax}
                            onWhitesDecrease= {props.onWhitesDecrease}
                            onWhitesIncrease= {props.onWhitesIncrease}
                            onWhitesIncreaseMax= {props.onWhitesIncreaseMax}
                            onBlacksDecreaseMax= {props.onBlacksDecreaseMax}
                            onBlacksDecrease= {props.onBlacksDecrease}
                            onBlacksIncrease= {props.onBlacksIncrease}
                            onBlacksIncreaseMax= {props.onBlacksIncreaseMax}
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={accordionStyle}
                    expanded={isPanelExpanded('details')}
                    onChange={props.onPanelChange('details')}
                    disableGutters
                >
                    <AccordionSummary sx={{ pr: 0 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                            <Typography sx={{ ...typography.titleMedium }}>Details</Typography>
                            <CardMedia
                                component="img"
                                image={isPanelExpanded('details') ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg"}
                                sx={{ width: "11.67px", height: "5.83px" }}
                            />
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pr: "4px" }}>
                        <HBulkAccordionColorAdjustmentDetails
                            onClarityDecreaseMax={props.onClarityDecreaseMax}
                            onClarityDecrease={props.onClarityDecrease}
                            onClarityIncrease={props.onClarityIncrease}
                            onClarityIncreaseMax={props.onClarityIncreaseMax}
                            onSharpnessDecreaseMax={props.onSharpnessDecreaseMax}
                            onSharpnessDecrease={props.onSharpnessDecrease}
                            onSharpnessIncrease={props.onSharpnessIncrease}
                            onSharpnessIncreaseMax={props.onSharpnessIncreaseMax}
                        />
                    </AccordionDetails>
                </Accordion>
            </Stack>
        </>
    )
}
