import React from "react";
import HSliderColorMobile from "./HSliderColorMobile";
import HSliderLightMobile from "./HSliderLightMobile";
import HSliderDetailsMobile from "./HSliderDetailsMobile";

interface Props {
    activeSubPanel: string;
    tempScore: number;
    tintScore: number;
    vibranceScore: number;
    saturationScore: number;
    exposureScore: number;
    highlightsScore: number;
    shadowScore: number;
    whiteScore: number;
    blackScore: number;
    contrastScore: number;
    clarityScore: number;
    sharpnessScore: number;
    onTempChange: (value: number) => void;
    onTintChange: (value: number) => void;
    onVibranceChange: (value: number) => void;
    onSaturationChange: (value: number) => void;
    onExposureChange: (value: number) => void;
    onHighlightsChange: (value: number) => void;
    onShadowsChange: (value: number) => void;
    onWhitesChange: (value: number) => void;
    onBlacksChange: (value: number) => void;
    onContrastChange: (value: number) => void;
    onClarityChange: (value: number) => void;
    onSharpnessChange: (value: number) => void;
}

export default function HTabColorAdjustmentMobile(props: Props) {
    switch (props.activeSubPanel) {
        case 'color':
            return (
                <HSliderColorMobile
                    tempScore={props.tempScore}
                    tintScore={props.tintScore}
                    onTempChange={props.onTempChange}
                    onTintChange={props.onTintChange}
                    vibranceScore={props.vibranceScore}
                    onVibranceChange={props.onVibranceChange}
                    saturationScore={props.saturationScore}
                    onSaturationChange={props.onSaturationChange}
                />
            );
        case 'light':
            return (
                <HSliderLightMobile
                    contrastScore={props.contrastScore}
                    exposureScore={props.exposureScore}
                    highlightsScore={props.highlightsScore}
                    shadowScore={props.shadowScore}
                    whiteScore={props.whiteScore}
                    blackScore={props.blackScore}
                    onExposureChange={props.onExposureChange}
                    onContrastChange={props.onContrastChange}
                    onHighlightsChange={props.onHighlightsChange}
                    onShadowsChange={props.onShadowsChange}
                    onWhitesChange={props.onWhitesChange}
                    onBlacksChange={props.onBlacksChange}
                />
            );
        case 'details':
            return (
                <HSliderDetailsMobile
                    clarityScore={props.clarityScore}
                    sharpnessScore={props.sharpnessScore}
                    onClarityChange={props.onClarityChange}
                    onSharpnessChange={props.onSharpnessChange}
                />
            );
        default:
            return null;
    }
}