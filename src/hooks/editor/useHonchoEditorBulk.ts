'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { SelectChangeEvent } from "@mui/material";
import { AdjustmentState, Controller, Preset } from './useHonchoEditor';
import { ColorAdjustment, Gallery, ResponseGalleryPaging } from '../../hooks/editor/type'
import { useAdjustmentHistoryBatch, ImageAdjustmentConfig  } from '../useAdjustmentHistoryBatch';
import { AdjustmentValues } from "../../lib/editor/honcho-editor";

export interface PhotoData {
    key: string;
    src: string;
    original: string;
    width: number;
    height: number;
    alt: string;
    isSelected: boolean;
    adjustments?: Partial<AdjustmentValues>;
}

// Helper function to map the API response to the format our UI component needs
const mapGalleryToPhotoData = (gallery: Gallery, selectedIds: string[]): PhotoData => {
    return {
        key: gallery.id,
        src: gallery.raw_thumbnail?.path ? gallery.raw_thumbnail.path : gallery.thumbnail?.path,
        original: gallery.download?.path || gallery.thumbnail?.path,
        width: gallery.thumbnail?.width,
        height: gallery.thumbnail?.height,
        alt: gallery.id || 'gallery image',
        isSelected: selectedIds.includes(gallery.id),
        adjustments: gallery.editor_config?.color_adjustment,
    };
};

const mapToImageAdjustmentConfig = (gallery: Gallery): ImageAdjustmentConfig => {
    return {
        imageId: gallery.id,
        adjustment: mapColorAdjustmentToAdjustmentState(gallery.editor_config?.color_adjustment),
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

function mapColorAdjustmentToAdjustmentState(adj: ColorAdjustment | undefined): AdjustmentState | undefined {
    if (!adj) return undefined;

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

export function useHonchoEditorBulk(controller: Controller, eventID: string, firebaseUid: string) {
    const { currentBatch, selectedIds, actions: batchActions } = useAdjustmentHistoryBatch();

    // State for Bulk Editing
    const [imageCollection, setImageCollection] = useState<Gallery[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [selectedBulkPreset, setSelectedBulkPreset] = useState<string>('preset1');

    const imageData = useMemo(() => {
        return imageCollection.map(item => {
            console.log("item FROM USEHONCHOBULK: ", item);
            return mapGalleryToPhotoData(item, selectedIds);
        }).map(item => {
            const adjustment = currentBatch.allImages[item.key];
            console.log("adjustment FROM USEHONCHOBULK: ", adjustment);
            return adjustment ? { ...item, ...adjustment } : item;
        });
    }, [imageCollection, selectedIds, currentBatch.allImages]);

    const handleBackCallbackBulk = useCallback(() => {
        const lastSelectedId = selectedIds.length > 0 ? selectedIds[selectedIds.length - 1] : "";
        controller.handleBack(firebaseUid, lastSelectedId);
    }, [controller, firebaseUid, selectedIds]);
    
    const handleSelectBulkPreset = (event: SelectChangeEvent<string>) => setSelectedBulkPreset(event.target.value as string);
    // This factory creates functions that adjust a value for all selected images
    
    const createRelativeAdjuster = useCallback((key: keyof AdjustmentState, amount: number) => () => {
        console.debug("createRelativeAdjuster", key, amount);
        batchActions.adjustSelected({ [key]: amount });
    }, [batchActions]);

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

    const loadImages = useCallback(async (pageNum: number) => {
        setIsLoading(true);
        try {
            const res: ResponseGalleryPaging = await controller.getImageList(firebaseUid, eventID, pageNum);
            const newImages = res.gallery || [];

            setImageCollection(prev => [...prev, ...newImages]);
            setPage(pageNum);
            setHasMore(newImages.length > 0);
        } catch (err) {
            console.error("Failed to load images:", err);
        } finally {
            setIsLoading(false);
        }
    }, [controller, firebaseUid, eventID]);
    
    const loadMoreImages = useCallback(() => {
        if (!isLoading && hasMore) {
            loadImages(page + 1);
        }
    }, [isLoading, hasMore, page, loadImages]);

    // Extract selected image IDs for other operations (like applying bulk adjustments)

    useEffect(() => {
        if (eventID && firebaseUid) {
            setIsLoading(true);
            setError(null);
            controller.getImageList(firebaseUid, eventID, 1)
                .then(response => {
                    // TODO need do pagination for this one
                    batchActions.syncAdjustment(response.gallery.map(mapToImageAdjustmentConfig));
                    setImageCollection(response.gallery);
                })
                .catch(err => {
                    console.error("Failed to fetch image list:", err);
                    setError("Could not load images.");
                })
                .finally(() => {
                    setIsLoading(false);
                });
            console.log("Image data FROM USEHONCHOBULK: ", imageData);
        }
    }, [eventID, firebaseUid, controller]);

    useEffect(() => {
        setImageCollection([]);
        console.log("Image collection FROM USEHONCHOBULK: : ", imageCollection);
    }, [loadImages]);

    return {
        imageData,
        isLoading,
        error,
        selectedIds,
        hasMore,
        loadMoreImages,
        // Gallery Handlers
        handleBackCallbackBulk,

        selectedBulkPreset,
        handleToggleImageSelection: batchActions.toggleSelection,

        handleSelectBulkPreset,
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