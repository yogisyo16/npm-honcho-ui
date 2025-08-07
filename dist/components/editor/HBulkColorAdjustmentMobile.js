import { jsx as _jsx } from "react/jsx-runtime";
import HBulkColorMobile from "./HBulkColorMobile";
import HBulkLightMobile from "./HBulkLightMobile";
import HBulkDetailsMobile from "./HBulkDetailsMobile";
export default function HBulkColorAdjustmentMobile(props) {
    switch (props.activeSubPanel) {
        case 'color':
            return (_jsx(HBulkColorMobile, { onTempDecreaseMax: props.onTempDecreaseMax, onTempDecrease: props.onTempDecrease, onTempIncrease: props.onTempIncrease, onTempIncreaseMax: props.onTempIncreaseMax, onTintDecreaseMax: props.onTintDecreaseMax, onTintDecrease: props.onTintDecrease, onTintIncrease: props.onTintIncrease, onTintIncreaseMax: props.onTintIncreaseMax, onVibranceDecreaseMax: props.onVibranceDecreaseMax, onVibranceDecrease: props.onVibranceDecrease, onVibranceIncrease: props.onVibranceIncrease, onVibranceIncreaseMax: props.onVibranceIncreaseMax, onSaturationDecreaseMax: props.onSaturationDecreaseMax, onSaturationDecrease: props.onSaturationDecrease, onSaturationIncrease: props.onSaturationIncrease, onSaturationIncreaseMax: props.onSaturationIncreaseMax }));
        case 'light':
            return (_jsx(HBulkLightMobile, { onExposureDecreaseMax: props.onExposureDecreaseMax, onExposureDecrease: props.onExposureDecrease, onExposureIncrease: props.onExposureIncrease, onExposureIncreaseMax: props.onExposureIncreaseMax, onContrastDecreaseMax: props.onContrastDecreaseMax, onContrastDecrease: props.onContrastDecrease, onContrastIncrease: props.onContrastIncrease, onContrastIncreaseMax: props.onContrastIncreaseMax, onHighlightsDecreaseMax: props.onHighlightsDecreaseMax, onHighlightsDecrease: props.onHighlightsDecrease, onHighlightsIncrease: props.onHighlightsIncrease, onHighlightsIncreaseMax: props.onHighlightsIncreaseMax, onShadowsDecreaseMax: props.onShadowsDecreaseMax, onShadowsDecrease: props.onShadowsDecrease, onShadowsIncrease: props.onShadowsIncrease, onShadowsIncreaseMax: props.onShadowsIncreaseMax, onWhitesDecreaseMax: props.onWhitesDecreaseMax, onWhitesDecrease: props.onWhitesDecrease, onWhitesIncrease: props.onWhitesIncrease, onWhitesIncreaseMax: props.onWhitesIncreaseMax, onBlacksDecreaseMax: props.onBlacksDecreaseMax, onBlacksDecrease: props.onBlacksDecrease, onBlacksIncrease: props.onBlacksIncrease, onBlacksIncreaseMax: props.onBlacksIncreaseMax }));
        case 'details':
            return (_jsx(HBulkDetailsMobile, { onClarityDecreaseMax: props.onClarityDecreaseMax, onClarityDecrease: props.onClarityDecrease, onClarityIncrease: props.onClarityIncrease, onClarityIncreaseMax: props.onClarityIncreaseMax, onSharpnessDecreaseMax: props.onSharpnessDecreaseMax, onSharpnessDecrease: props.onSharpnessDecrease, onSharpnessIncrease: props.onSharpnessIncrease, onSharpnessIncreaseMax: props.onSharpnessIncreaseMax }));
        default:
            return null;
    }
}
