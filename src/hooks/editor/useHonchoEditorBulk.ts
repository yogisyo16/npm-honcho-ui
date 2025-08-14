'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { SelectChangeEvent } from "@mui/material";
import { AdjustmentState, ImageItem, Controller, Preset } from './useHonchoEditor';
import { useAdjustmentHistory } from '../useAdjustmentHistory';
import { Gallery, ResponseGalleryPaging, Content } from '../../hooks/editor/type'
import { useAdjustmentHistoryBatch, ImageAdjustmentConfig  } from '../useAdjustmentHistoryBatch';

export interface PhotoData {
    key: string;
    src: string;
    original: string;
    width: number;
    height: number;
    alt: string;
    isSelected: boolean;
    originalData: Gallery; 
}

// Helper function to map the API response to the format our UI component needs
const mapGalleryToPhotoData = (gallery: Gallery): PhotoData => {
    // Use thumbnail as the primary source, with fallbacks for safety
    const bestImage = gallery.thumbnail || gallery.download || { path: '', width: 1, height: 1, key: gallery.id, size: 0 };
    
    return {
        key: gallery.id,
        src: bestImage.path,
        original: gallery.download?.path || bestImage.path,
        width: bestImage.width || 1,
        height: bestImage.height || 1,
        alt: gallery.id || 'gallery image',
        isSelected: false, // Default to not selected
        originalData: gallery,
    };
};

export interface ControllerBulk {
    // Image Handling
    onGetImage(firebaseUid: string, imageID: string): Promise<Gallery>;
    getImageList(firebaseUid: string, eventID: string, page: number): Promise<ResponseGalleryPaging>;

    // syncConfig
    syncConfig(firebaseUid: string): Promise<void>;
    handleBack(firebaseUid: string, lastImageID: string):void;

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

function mapColorAdjustmentToAdjustmentState(adj: any): AdjustmentState {
    return {
        tempScore: adj.temperature || 0,
        tintScore: adj.tint || 0,
        vibranceScore: adj.vibrance || 0,
        saturationScore: adj.saturation || 0,
        exposureScore: adj.exposure || 0,
        highlightsScore: adj.highlights || 0,
        shadowsScore: adj.shadows || 0,
        whitesScore: adj.whites || 0,
        blacksScore: adj.blacks || 0,
        contrastScore: adj.contrast || 0,
        clarityScore: adj.clarity || 0,
        sharpnessScore: adj.sharpness || 0,
    };
}

export function useHonchoEditorBulk(controllerBulk: Controller, eventID: string, firebaseUid: string) {
    const {
        currentState,
        actions: historyActions,
    } = useAdjustmentHistory(initialAdjustments);

    const {
        currentBatch,
        selectedIds,
        allImageIds,
        actions: batchActions,
        historyInfo
    } = useAdjustmentHistoryBatch({});

    // State for Bulk Editing
    const [imageCollection, setImageCollection] = useState<PhotoData[]>([]);
    const [isSelectedMode, setIsSelectedMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isBulkEditing, setIsBulkEditing] = useState(false);
    const [selectedImages, setSelectedImages] = useState('Select');
    const [imageList, setImageList] = useState<ImageItem[]>([]);
    const [adjustmentsMap, setAdjustmentsMap] = useState<Map<string, AdjustmentState>>(new Map());
    const [selectedBulkPreset, setSelectedBulkPreset] = useState<string>('preset1');
    const [isEditorReady, setIsEditorReady] = useState(false);

    const selectedImageIds = useMemo(() => 
        imageCollection.filter(p => p.isSelected).map(p => p.key),
        [imageCollection]
    );

    const handleBackCallbackBulk = useCallback(() => {
        const lastSelectedId = selectedImageIds.length > 0 ? selectedImageIds[selectedImageIds.length - 1] : eventID;
        controllerBulk.handleBack(firebaseUid, lastSelectedId);
    }, [controllerBulk, firebaseUid, selectedImageIds, eventID]);
    
    const handleSelectedMode = useCallback(() => setIsSelectedMode(true), []);

    const handleToggleSelect = useCallback((photoToToggle: PhotoData) => () => {
        setImageCollection(current =>
            current.map(p =>
                p.key === photoToToggle.key ? { ...p, isSelected: !p.isSelected } : p
            )
        );
        if (!isSelectedMode) setIsSelectedMode(true);
    }, [isSelectedMode]);

    const handlePreview = useCallback((photo: PhotoData) => () => {
        console.log("Previewing image:", photo.key);
    }, []);
    
    // const handleToggleImageSelection = useCallback((imageId: string) => {
    //     const newSelectedIds = new Set(selectedImageIds);
    //     if (newSelectedIds.has(imageId)) {
    //         if (newSelectedIds.size > 1) { // Prevent deselecting the last image
    //             newSelectedIds.delete(imageId);
    //         }
    //     } else {
    //         newSelectedIds.add(imageId);
    //     }
    //     setSelectedImageIds(newSelectedIds);
    // }, [selectedImageIds]);

    const toggleBulkEditing = () => {
        setIsBulkEditing(prev => {
            const isNowBulk = !prev;
            setSelectedImages(isNowBulk ? 'Selected' : 'Select');
            return isNowBulk;
        });
    };

    const handleSelectBulkPreset = (event: SelectChangeEvent<string>) => setSelectedBulkPreset(event.target.value as string);
    // This factory creates functions that adjust a value for all selected images

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

    // Extract selected image IDs for other operations (like applying bulk adjustments)

    useEffect(() => {
        if (eventID && firebaseUid) {
            setIsLoading(true);
            setError(null);
            controllerBulk.getImageList(firebaseUid, eventID, 1)
                .then(response => {
                    const mappedData = response.gallery.map(mapGalleryToPhotoData);
                    setImageCollection(mappedData);
                })
                .catch(err => {
                    console.error("Failed to fetch image list:", err);
                    setError("Could not load images.");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [eventID, firebaseUid, controllerBulk]);

    return {
        imageCollection,
        isSelectedMode,
        isLoading,
        error,
        selectedImageIds,

        // Gallery Handlers
        handleSelectedMode,
        handleToggleSelect,
        handlePreview,
        handleBackCallbackBulk,
        isBulkEditing,
        selectedImages,
        imageList,
        currentBatch,
        selectedIds,
        allImageIds,
        adjustmentsMap,
        selectedBulkPreset,
        handleToggleImageSelection: batchActions.toggleSelection,
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