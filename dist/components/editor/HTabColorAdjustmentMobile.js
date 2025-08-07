import { jsx as _jsx } from "react/jsx-runtime";
import HSliderColorMobile from "./HSliderColorMobile";
import HSliderLightMobile from "./HSliderLightMobile";
import HSliderDetailsMobile from "./HSliderDetailsMobile";
export default function HTabColorAdjustmentMobile(props) {
    switch (props.activeSubPanel) {
        case 'color':
            return (_jsx(HSliderColorMobile, { tempScore: props.tempScore, tintScore: props.tintScore, onTempChange: props.onTempChange, onTintChange: props.onTintChange, vibranceScore: props.vibranceScore, onVibranceChange: props.onVibranceChange, saturationScore: props.saturationScore, onSaturationChange: props.onSaturationChange }));
        case 'light':
            return (_jsx(HSliderLightMobile, { contrastScore: props.contrastScore, exposureScore: props.exposureScore, highlightsScore: props.highlightsScore, shadowScore: props.shadowScore, whiteScore: props.whiteScore, blackScore: props.blackScore, onExposureChange: props.onExposureChange, onContrastChange: props.onContrastChange, onHighlightsChange: props.onHighlightsChange, onShadowsChange: props.onShadowsChange, onWhitesChange: props.onWhitesChange, onBlacksChange: props.onBlacksChange }));
        case 'details':
            return (_jsx(HSliderDetailsMobile, { clarityScore: props.clarityScore, sharpnessScore: props.sharpnessScore, onClarityChange: props.onClarityChange, onSharpnessChange: props.onSharpnessChange }));
        default:
            return null;
    }
}
