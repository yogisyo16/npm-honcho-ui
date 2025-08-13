'use client';

import { useState, useCallback, useEffect } from 'react';
import { SelectChangeEvent } from "@mui/material";
import { AdjustmentState, ImageItem, Controller, Preset } from './useHonchoEditor';
import { useAdjustmentHistory } from '../useAdjustmentHistory';
import { Gallery, ResponseGalleryPaging } from '../../hooks/editor/type'
import { BatchHistoryActions, useAdjustmentHistoryBatch } from '../useAdjustmentHistoryBatch';

export interface ControllerBulk {
    // Image Handling
    onGetImage(firebaseUid: string, imageID: string): Promise<Gallery>;
    getImageList(firebaseUid: string, eventID: string, page: number): Promise<ResponseGalleryPaging>;

    // syncConfig
    syncConfig(firebaseUid: string): Promise<void>;
    handleBack(firebaseUid: string, eventID: string):void;

    // Preset
    getPresets(firebaseUid: string): Promise<Preset[]>;
    createPreset(firebaseUid: string, name: string, settings: AdjustmentState): Promise<Preset>;
    deletePreset(firebaseUid: string, presetId: string): Promise<void>;
}

const initialAdjustments: AdjustmentState = {
    tempScore: 0, tintScore: 0, vibranceScore: 0, exposureScore: 0, highlightsScore: 0, shadowsScore: 0,
    whitesScore: 0, blacksScore: 0, saturationScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
};

const clamp = (value: number) => Math.max(-100, Math.min(100, value));

export function useHonchoEditorBulk(controllerBulk: Controller, eventID: string, firebaseUid: string) {
     const {
        currentState,
        actions: historyActions,
        historyInfo
    } = useAdjustmentHistory(initialAdjustments);

    const {
        currentBatch,
        selectedIds,
        allImageIds,
        actions: batchActions,
    } = useAdjustmentHistoryBatch({
        maxSize: historyInfo.historySize,
        defaultAdjustmentState: currentState,
    });

    // State for Bulk Editing
    const [isBulkEditing, setIsBulkEditing] = useState(false);
    const [selectedImages, setSelectedImages] = useState('Select');
    const [imageList, setImageList] = useState<ImageItem[]>([]);
    const [selectedImageIds, setSelectedImageIds] = useState<Set<string>>(new Set());
    const [adjustmentsMap, setAdjustmentsMap] = useState<Map<string, AdjustmentState>>(new Map());
    const [selectedBulkPreset, setSelectedBulkPreset] = useState<string>('preset1');

    const handleBackCallbackBulk = useCallback(() => {
        if (!eventID) return;
        controllerBulk.handleBack(firebaseUid, eventID);
    }, [controllerBulk, firebaseUid, eventID]);

    const handleFileChangeBulk = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target?.files;
        if (!files || files.length <= 1) {
            // If it's not a bulk operation, we clear the state.
            setIsBulkEditing(false);
            setImageList([]);
            setSelectedImageIds(new Set());
            setAdjustmentsMap(new Map());
            return;
        };

        setIsBulkEditing(true);

        const newImageList = Array.from(files).map((file, index) => ({
            id: `${file.name}-${Date.now()}-${index}`,
            name: file.name,
            file: file,
            url: URL.createObjectURL(file),
        }));
        
        const newAdjustmentsMap = new Map<string, AdjustmentState>();

        newImageList.forEach(image => {
            newAdjustmentsMap.set(image.id, { ...initialAdjustments });
        });

        setAdjustmentsMap(newAdjustmentsMap);
        setImageList(newImageList);
        setSelectedImageIds(new Set(newImageList.map(img => img.id)));
    };
    
    const handleToggleImageSelection = useCallback((imageId: string) => {
        const newSelectedIds = new Set(selectedImageIds);
        if (newSelectedIds.has(imageId)) {
            if (newSelectedIds.size > 1) { // Prevent deselecting the last image
                newSelectedIds.delete(imageId);
            }
        } else {
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

    const handleSelectBulkPreset = (event: SelectChangeEvent<string>) => setSelectedBulkPreset(event.target.value as string);

    // This factory creates functions that adjust a value for all selected images
    const createAbsoluteSetter = (key: keyof AdjustmentState, setter: React.Dispatch<React.SetStateAction<number>>) => (value: number) => {
        setter(value); // Update UI slider
        
        if(isBulkEditing) {
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

    const updateAdjustments = useCallback((newValues: Partial<AdjustmentState>) => {
        const newState = { ...currentState, ...newValues };
        historyActions.pushState(newState);
        console.log('Updated adjustments:', newState);
    }, [currentState, historyActions]);

    
    const createRelativeAdjuster = (key: keyof AdjustmentState, amount: number) => () => {
        const currentValue = currentState[key];
        const newValue = clamp(currentValue + amount);
        updateAdjustments({ [key]: newValue });
    };

    useEffect(() => {
        if (!isBulkEditing) return;

        setAdjustmentsMap(prevMap => {
            const newMap = new Map(prevMap);
            selectedImageIds.forEach(id => {
                // Apply the new global state to each selected image
                newMap.set(id, currentState);
            });
            return newMap;
        });

    }, [currentState, selectedImageIds, isBulkEditing]);

    const setTempScore = (value: number) => updateAdjustments({ tempScore: value });
    const setTintScore = (value: number) => updateAdjustments({ tintScore: value });
    const setVibranceScore = (value: number) => updateAdjustments({ vibranceScore: value });
    const setSaturationScore = (value: number) => updateAdjustments({ saturationScore: value });
    const setExposureScore = (value: number) => updateAdjustments({ exposureScore: value });
    const setHighlightsScore = (value: number) => updateAdjustments({ highlightsScore: value });
    const setShadowsScore = (value: number) => updateAdjustments({ shadowsScore: value });
    const setWhitesScore = (value: number) => updateAdjustments({ whitesScore: value });
    const setBlacksScore = (value: number) => updateAdjustments({ blacksScore: value });
    const setContrastScore = (value: number) => updateAdjustments({ contrastScore: value });
    const setClarityScore = (value: number) => updateAdjustments({ clarityScore: value });
    const setSharpnessScore = (value: number) => updateAdjustments({ sharpnessScore: value });

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
        handleBackCallbackBulk,
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