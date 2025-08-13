'use client';
import { useState, useCallback, useEffect } from 'react';
import { useAdjustmentHistory } from '../useAdjustmentHistory';
const initialAdjustments = {
    tempScore: 0, tintScore: 0, vibranceScore: 0, exposureScore: 0, highlightsScore: 0, shadowsScore: 0,
    whitesScore: 0, blacksScore: 0, saturationScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
};
const clamp = (value) => Math.max(-100, Math.min(100, value));
export function useHonchoEditorBulk(controller, initImageId, firebaseUid) {
    const { currentState, actions: historyActions, historyInfo } = useAdjustmentHistory(initialAdjustments);
    // State for Bulk Editing
    const [isBulkEditing, setIsBulkEditing] = useState(false);
    const [selectedImages, setSelectedImages] = useState('Select');
    const [imageList, setImageList] = useState([]);
    const [selectedImageIds, setSelectedImageIds] = useState(new Set());
    const [adjustmentsMap, setAdjustmentsMap] = useState(new Map());
    const [selectedBulkPreset, setSelectedBulkPreset] = useState('preset1');
    const handleFileChangeBulk = (event) => {
        const files = event.target?.files;
        if (!files || files.length <= 1) {
            // If it's not a bulk operation, we clear the state.
            setIsBulkEditing(false);
            setImageList([]);
            setSelectedImageIds(new Set());
            setAdjustmentsMap(new Map());
            return;
        }
        ;
        setIsBulkEditing(true);
        const newImageList = Array.from(files).map((file, index) => ({
            id: `${file.name}-${Date.now()}-${index}`,
            name: file.name,
            file: file,
            url: URL.createObjectURL(file),
        }));
        const newAdjustmentsMap = new Map();
        newImageList.forEach(image => {
            newAdjustmentsMap.set(image.id, { ...initialAdjustments });
        });
        setAdjustmentsMap(newAdjustmentsMap);
        setImageList(newImageList);
        setSelectedImageIds(new Set(newImageList.map(img => img.id)));
    };
    const handleToggleImageSelection = useCallback((imageId) => {
        const newSelectedIds = new Set(selectedImageIds);
        if (newSelectedIds.has(imageId)) {
            if (newSelectedIds.size > 1) { // Prevent deselecting the last image
                newSelectedIds.delete(imageId);
            }
        }
        else {
            newSelectedIds.add(imageId);
        }
        setSelectedImageIds(newSelectedIds);
    }, [selectedImageIds]);
    const toggleBulkEditing = () => {
        setIsBulkEditing(prev => {
            const isNowBulk = !prev;
            setSelectedImages(isNowBulk ? 'Selected' : 'Select');
            return isNowBulk;
        });
    };
    const handleSelectBulkPreset = (event) => setSelectedBulkPreset(event.target.value);
    // This factory creates functions that adjust a value for all selected images
    const createAbsoluteSetter = (key, setter) => (value) => {
        setter(value); // Update UI slider
        if (isBulkEditing) {
            setAdjustmentsMap(prevMap => {
                const newMap = new Map(prevMap);
                selectedImageIds.forEach(id => {
                    const currentState = newMap.get(id) || initialAdjustments;
                    newMap.set(id, { ...currentState, [key]: value });
                });
                return newMap;
            });
        }
    };
    const updateAdjustments = useCallback((newValues) => {
        const newState = { ...currentState, ...newValues };
        historyActions.pushState(newState);
        console.log('Updated adjustments:', newState);
    }, [currentState, historyActions]);
    const createRelativeAdjuster = (key, amount) => () => {
        const currentValue = currentState[key];
        const newValue = clamp(currentValue + amount);
        updateAdjustments({ [key]: newValue });
    };
    useEffect(() => {
        if (!isBulkEditing)
            return;
        setAdjustmentsMap(prevMap => {
            const newMap = new Map(prevMap);
            selectedImageIds.forEach(id => {
                // Apply the new global state to each selected image
                newMap.set(id, currentState);
            });
            return newMap;
        });
    }, [currentState, selectedImageIds, isBulkEditing]);
    const setTempScore = (value) => updateAdjustments({ tempScore: value });
    const setTintScore = (value) => updateAdjustments({ tintScore: value });
    const setVibranceScore = (value) => updateAdjustments({ vibranceScore: value });
    const setSaturationScore = (value) => updateAdjustments({ saturationScore: value });
    const setExposureScore = (value) => updateAdjustments({ exposureScore: value });
    const setHighlightsScore = (value) => updateAdjustments({ highlightsScore: value });
    const setShadowsScore = (value) => updateAdjustments({ shadowsScore: value });
    const setWhitesScore = (value) => updateAdjustments({ whitesScore: value });
    const setBlacksScore = (value) => updateAdjustments({ blacksScore: value });
    const setContrastScore = (value) => updateAdjustments({ contrastScore: value });
    const setClarityScore = (value) => updateAdjustments({ clarityScore: value });
    const setSharpnessScore = (value) => updateAdjustments({ sharpnessScore: value });
    const handleBulkTempDecreaseMax = createRelativeAdjuster('tempScore', -20);
    const handleBulkTempDecrease = createRelativeAdjuster('tempScore', -5);
    const handleBulkTempIncrease = createRelativeAdjuster('tempScore', 5);
    const handleBulkTempIncreaseMax = createRelativeAdjuster('tempScore', 20);
    const handleBulkTintDecreaseMax = createRelativeAdjuster('tintScore', -20);
    const handleBulkTintDecrease = createRelativeAdjuster('tintScore', -5);
    const handleBulkTintIncrease = createRelativeAdjuster('tintScore', 5);
    const handleBulkTintIncreaseMax = createRelativeAdjuster('tintScore', 20);
    const handleBulkVibranceDecreaseMax = createRelativeAdjuster('vibranceScore', -20);
    const handleBulkVibranceDecrease = createRelativeAdjuster('vibranceScore', -5);
    const handleBulkVibranceIncrease = createRelativeAdjuster('vibranceScore', 5);
    const handleBulkVibranceIncreaseMax = createRelativeAdjuster('vibranceScore', 20);
    const handleBulkSaturationDecreaseMax = createRelativeAdjuster('saturationScore', -20);
    const handleBulkSaturationDecrease = createRelativeAdjuster('saturationScore', -5);
    const handleBulkSaturationIncrease = createRelativeAdjuster('saturationScore', 5);
    const handleBulkSaturationIncreaseMax = createRelativeAdjuster('saturationScore', 20);
    const handleBulkExposureDecreaseMax = createRelativeAdjuster('exposureScore', -20);
    const handleBulkExposureDecrease = createRelativeAdjuster('exposureScore', -5);
    const handleBulkExposureIncrease = createRelativeAdjuster('exposureScore', 5);
    const handleBulkExposureIncreaseMax = createRelativeAdjuster('exposureScore', 20);
    const handleBulkContrastDecreaseMax = createRelativeAdjuster('contrastScore', -20);
    const handleBulkContrastDecrease = createRelativeAdjuster('contrastScore', -5);
    const handleBulkContrastIncrease = createRelativeAdjuster('contrastScore', 5);
    const handleBulkContrastIncreaseMax = createRelativeAdjuster('contrastScore', 20);
    const handleBulkHighlightsDecreaseMax = createRelativeAdjuster('highlightsScore', -20);
    const handleBulkHighlightsDecrease = createRelativeAdjuster('highlightsScore', -5);
    const handleBulkHighlightsIncrease = createRelativeAdjuster('highlightsScore', 5);
    const handleBulkHighlightsIncreaseMax = createRelativeAdjuster('highlightsScore', 20);
    const handleBulkShadowsDecreaseMax = createRelativeAdjuster('shadowsScore', -20);
    const handleBulkShadowsDecrease = createRelativeAdjuster('shadowsScore', -5);
    const handleBulkShadowsIncrease = createRelativeAdjuster('shadowsScore', 5);
    const handleBulkShadowsIncreaseMax = createRelativeAdjuster('shadowsScore', 20);
    const handleBulkWhitesDecreaseMax = createRelativeAdjuster('whitesScore', -20);
    const handleBulkWhitesDecrease = createRelativeAdjuster('whitesScore', -5);
    const handleBulkWhitesIncrease = createRelativeAdjuster('whitesScore', 5);
    const handleBulkWhitesIncreaseMax = createRelativeAdjuster('whitesScore', 20);
    const handleBulkBlacksDecreaseMax = createRelativeAdjuster('blacksScore', -20);
    const handleBulkBlacksDecrease = createRelativeAdjuster('blacksScore', -5);
    const handleBulkBlacksIncrease = createRelativeAdjuster('blacksScore', 5);
    const handleBulkBlacksIncreaseMax = createRelativeAdjuster('blacksScore', 20);
    const handleBulkClarityDecreaseMax = createRelativeAdjuster('clarityScore', -20);
    const handleBulkClarityDecrease = createRelativeAdjuster('clarityScore', -5);
    const handleBulkClarityIncrease = createRelativeAdjuster('clarityScore', 5);
    const handleBulkClarityIncreaseMax = createRelativeAdjuster('clarityScore', 20);
    const handleBulkSharpnessDecreaseMax = createRelativeAdjuster('sharpnessScore', -20);
    const handleBulkSharpnessDecrease = createRelativeAdjuster('sharpnessScore', -5);
    const handleBulkSharpnessIncrease = createRelativeAdjuster('sharpnessScore', 5);
    const handleBulkSharpnessIncreaseMax = createRelativeAdjuster('sharpnessScore', 20);
    return {
        isBulkEditing,
        selectedImages,
        imageList,
        selectedImageIds,
        adjustmentsMap,
        selectedBulkPreset,
        handleFileChangeBulk,
        handleToggleImageSelection,
        toggleBulkEditing,
        handleSelectBulkPreset,
        // Bulk Adjustment Handlers
        setTempScore,
        setTintScore,
        setVibranceScore,
        setSaturationScore,
        setExposureScore,
        setHighlightsScore,
        setShadowsScore,
        setWhitesScore,
        setBlacksScore,
        setContrastScore,
        setClarityScore,
        setSharpnessScore,
        // Adjustment
        handleBulkTempDecreaseMax,
        handleBulkTempDecrease,
        handleBulkTempIncrease,
        handleBulkTempIncreaseMax,
        handleBulkTintDecreaseMax,
        handleBulkTintDecrease,
        handleBulkTintIncrease,
        handleBulkTintIncreaseMax,
        handleBulkVibranceDecreaseMax,
        handleBulkVibranceDecrease,
        handleBulkVibranceIncrease,
        handleBulkVibranceIncreaseMax,
        handleBulkSaturationDecreaseMax,
        handleBulkSaturationDecrease,
        handleBulkSaturationIncrease,
        handleBulkSaturationIncreaseMax,
        // Adjustment Light
        handleBulkExposureDecreaseMax,
        handleBulkExposureDecrease,
        handleBulkExposureIncrease,
        handleBulkExposureIncreaseMax,
        handleBulkContrastDecreaseMax,
        handleBulkContrastDecrease,
        handleBulkContrastIncrease,
        handleBulkContrastIncreaseMax,
        handleBulkHighlightsDecreaseMax,
        handleBulkHighlightsDecrease,
        handleBulkHighlightsIncrease,
        handleBulkHighlightsIncreaseMax,
        handleBulkShadowsDecreaseMax,
        handleBulkShadowsDecrease,
        handleBulkShadowsIncrease,
        handleBulkShadowsIncreaseMax,
        handleBulkWhitesDecreaseMax,
        handleBulkWhitesDecrease,
        handleBulkWhitesIncrease,
        handleBulkWhitesIncreaseMax,
        handleBulkBlacksDecreaseMax,
        handleBulkBlacksDecrease,
        handleBulkBlacksIncrease,
        handleBulkBlacksIncreaseMax,
        // Adjustment Details
        handleBulkClarityDecreaseMax,
        handleBulkClarityDecrease,
        handleBulkClarityIncrease,
        handleBulkClarityIncreaseMax,
        handleBulkSharpnessDecreaseMax,
        handleBulkSharpnessDecrease,
        handleBulkSharpnessIncrease,
        handleBulkSharpnessIncreaseMax,
    };
}
