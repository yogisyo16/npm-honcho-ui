import React from "react";
import HBulkColorMobile from "./HBulkColorMobile";
import HBulkLightMobile from "./HBulkLightMobile";
import HBulkDetailsMobile from "./HBulkDetailsMobile";

interface Props {
    activeSubPanel: string;

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
}

export default function HBulkColorAdjustmentMobile(props: Props) {
    switch (props.activeSubPanel) {
        case 'color':
            return (
                <HBulkColorMobile
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
            );
        case 'light':
            return (
                <HBulkLightMobile
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
            );
        case 'details':
            return (
                <HBulkDetailsMobile
                    onClarityDecreaseMax={props.onClarityDecreaseMax}
                    onClarityDecrease={props.onClarityDecrease}
                    onClarityIncrease={props.onClarityIncrease}
                    onClarityIncreaseMax={props.onClarityIncreaseMax}
                    onSharpnessDecreaseMax={props.onSharpnessDecreaseMax}
                    onSharpnessDecrease={props.onSharpnessDecrease}
                    onSharpnessIncrease={props.onSharpnessIncrease}
                    onSharpnessIncreaseMax={props.onSharpnessIncreaseMax}
                />
            );
        default:
            return null;
    }
}