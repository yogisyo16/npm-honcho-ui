export function mapAdjustmentStateToAdjustmentEditor(state) {
    return {
        temperature: state.tempScore,
        tint: state.tintScore,
        saturation: state.saturationScore,
        vibrance: state.vibranceScore,
        exposure: state.exposureScore,
        contrast: state.contrastScore,
        highlights: state.highlightsScore,
        shadows: state.shadowsScore,
        whites: state.whitesScore,
        blacks: state.blacksScore,
        clarity: state.clarityScore,
        sharpness: state.sharpnessScore,
    };
}
export function mapColorAdjustmentToAdjustmentState(colors) {
    return {
        tempScore: colors.temperature,
        tintScore: colors.tint,
        vibranceScore: colors.vibrance,
        saturationScore: colors.saturation,
        exposureScore: colors.exposure,
        highlightsScore: colors.highlights,
        shadowsScore: colors.shadows,
        whitesScore: colors.whites,
        blacksScore: colors.blacks,
        contrastScore: colors.contrast,
        clarityScore: colors.clarity,
        sharpnessScore: colors.sharpness
    };
}
