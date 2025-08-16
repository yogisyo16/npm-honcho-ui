'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { SelectChangeEvent } from "@mui/material";
import { AdjustmentState, Controller, Preset } from './useHonchoEditor';
import { ColorAdjustment, Gallery, ResponseGalleryPaging } from '../../hooks/editor/type'
import { useAdjustmentHistoryBatch, ImageAdjustmentConfig  } from '../useAdjustmentHistoryBatch';
import { AdjustmentValues } from "../../lib/editor/honcho-editor";
import { usePaging } from "../usePaging";

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
    const { currentBatch, selectedIds, actions: batchActions, historyInfo } = useAdjustmentHistoryBatch();
    const { images, info, actions } = usePaging(controller, firebaseUid, eventID, {
        autoLoad: true,
        autoReset: false  // Prevent auto-reset to avoid loops
    });

    // Track which images have been synced to prevent loops
    const lastSyncedImageIds = useRef<Set<string>>(new Set());

    // State for Bulk Editing  
    const [selectedBulkPreset, setSelectedBulkPreset] = useState<string>('preset1');

    // Use loading states from usePaging instead of local state
    const isLoading = info.isLoading;
    const error = info.error;
    const hasMore = info.hasMore;

    const imageData = useMemo(() => {
        console.debug("imageData recalculating with:", {
            imagesLength: images.length,
            selectedIds,
            currentBatch_allImages: currentBatch.allImages,
            currentBatch_allImages_keys: Object.keys(currentBatch.allImages)
        });
        
        const res = images.map(item => {
            const basePhoto = mapGalleryToPhotoData(item, selectedIds);
            const batchAdjustment = currentBatch.allImages[item.id];
            
            console.debug(`Processing image ${item.id}:`, {
                basePhoto,
                batchAdjustment,
                hasBatchAdjustment: !!batchAdjustment
            });
            
            // Merge batch adjustments over backend adjustments
            return batchAdjustment ? { ...basePhoto, ...batchAdjustment } : basePhoto;
        });
        console.debug("imageData result:", res);
        return res;
    }, [images, selectedIds, currentBatch.allImages]);

    // Store the latest batchActions.syncAdjustment in a ref to avoid dependency issues
    const syncAdjustmentRef = useRef(batchActions.syncAdjustment);
    syncAdjustmentRef.current = batchActions.syncAdjustment;

    // Safe sync: Only sync new images to prevent infinite loops
    useEffect(() => {
        if (images.length === 0) return;
        
        // Check if we have new images that haven't been synced
        const currentImageIds = new Set(images.map(img => img.id));
        const hasNewImages = images.some(img => !lastSyncedImageIds.current.has(img.id));
        
        if (hasNewImages) {
            console.log('[useHonchoEditorBulk] Syncing new images to batch:', images.length);
            syncAdjustmentRef.current(images.map(mapToImageAdjustmentConfig));
            lastSyncedImageIds.current = currentImageIds;
        }
    }, [images]); // Only depend on images, not batchActions

    const handleBackCallbackBulk = useCallback(() => {
        const lastSelectedId = selectedIds.length > 0 ? selectedIds[selectedIds.length - 1] : "";
        controller.handleBack(firebaseUid, lastSelectedId);
    }, [controller, firebaseUid, selectedIds]);
    
    const handleSelectBulkPreset = (event: SelectChangeEvent<string>) => setSelectedBulkPreset(event.target.value as string);
    // This factory creates functions that adjust a value for all selected images
    
    const createRelativeAdjuster = useCallback((key: keyof AdjustmentState, amount: number) => () => {
        console.debug("createRelativeAdjuster called:", { key, amount, selectedIds });
        console.debug("currentBatch.allImages before:", currentBatch.allImages);
        batchActions.adjustSelected({ [key]: amount });
        
        // Debug after a short delay to see if the state changed
        setTimeout(() => {
            console.debug("currentBatch.allImages after:", currentBatch.allImages);
        }, 100);
    }, [batchActions, selectedIds, currentBatch.allImages]);

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

    // const loadImages = useCallback(async (pageNum: number) => {
    //     // Use the correct loading state
    //     if (pageNum === 1) {
    //         setIsLoading(true);
    //     } else {
    //         setIsFetchingMore(true);
    //     }
    //     setError(null);

    //     try {
    //         const response = await controller.getImageList(firebaseUid, eventID, pageNum);

    //         // Sync adjustments for the new images with the batch history
    //         batchActions.syncAdjustment(response.gallery.map(mapToImageAdjustmentConfig));

    //         // Append new images for page > 1, otherwise replace
    //         setImageCollection(prev => pageNum === 1 ? response.gallery : [...prev, ...response.gallery]);
            
    //         setPage(response.current_page);
    //         setHasMore(response.next_page > 0 && response.gallery.length > 0);

    //     } catch (err: any) {
    //         console.error("Failed to fetch image list:", err);
    //         setError(err.message || "Could not load images.");
    //     } finally {
    //         if (pageNum === 1) {
    //             setIsLoading(false);
    //         } else {
    //             setIsFetchingMore(false);
    //         }
    //     }
    // }, [controller, firebaseUid, eventID, batchActions]);

    // const loadMoreImages = useCallback(() => {
    //     if (!isFetchingMore && hasMore) {
    //         loadImages(page + 1);
    //     }
    // }, [isFetchingMore, hasMore, page, loadImages]);

    // Note: Image loading is now handled by usePaging hook
    // The sync logic above handles syncing loaded images to batch state

    // useEffect(() => {
    //     if (eventID && firebaseUid) {
    //         setImageCollection([]); // reset when event changes
    //         setPage(1);
    //         loadImages(1);
    //     }
    // }, [eventID, firebaseUid, loadImages]);

    return {
        imageData,
        isLoading,
        error,
        selectedIds,
        hasMore,
        // loadMoreImages,
        // Gallery Handlers
        handleBackCallbackBulk,

        selectedBulkPreset,
        handleToggleImageSelection: batchActions.toggleSelection,
        handleLoadMore: actions.loadMore,
        handleRefresh: actions.refresh,

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
        
        // History actions
        handleUndo: batchActions.undo,
        handleRedo: batchActions.redo,
        handleReset: batchActions.reset,
        historyInfo,
    };
}