'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { HistoryOptions, useAdjustmentHistory } from '../useAdjustmentHistory';
import { useGallerySwipe } from '../useGallerySwipe';
import { usePreset } from '../usePreset';
import { Controller, AdjustmentState, Preset } from './useHonchoEditor';
import { Gallery } from './type';
import { AdjustmentValues } from '../../lib/editor/honcho-editor';

// Default adjustment values
const initialAdjustments: AdjustmentState = {
    tempScore: 0, tintScore: 0, vibranceScore: 0, saturationScore: 0,
    exposureScore: 0, highlightsScore: 0, shadowsScore: 0, whitesScore: 0,
    blacksScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
};

export interface UseHonchoEditorSingleOptions {
    controller: Controller;
    initImageId: string;
    firebaseUid: string;
}

export interface UseHonchoEditorSingleState {
    // Image state
    currentImageData: Gallery | null;
    isGalleryLoading: boolean;
    galleryError: string | null;
    
    // Adjustment state
    currentAdjustments: AdjustmentState;
    isBatchMode: boolean;
    canUndo: boolean;
    canRedo: boolean;
    
    // Navigation state
    isNextAvailable: boolean;
    isPrevAvailable: boolean;
    
    // Preset state
    presets: Preset[];
    activePreset: Preset | null;
    presetsLoading: boolean;
    presetsError: string | null;
}

export interface UseHonchoEditorSingleActions {
    // Navigation
    navigateNext: () => void;
    navigatePrev: () => void;
    
    // Adjustments
    updateAdjustment: (field: keyof AdjustmentState, value: number) => void;
    setBatchMode: (enabled: boolean) => void;
    startBatchMode: () => void;
    endBatchMode: () => void;
    
    // History
    undo: () => void;
    redo: () => void;
    reset: () => void;
    
    // Presets
    loadPresets: () => Promise<void>;
    applyPreset: (preset: Preset) => void;
    createPreset: (name: string) => Promise<Preset | null>;
    deletePreset: (presetId: string) => Promise<void>;
    
    // Adjustment conversion for editor
    getEditorAdjustments: () => AdjustmentValues;
}

export function useHonchoEditorSingle({
    controller,
    initImageId,
    firebaseUid
}: UseHonchoEditorSingleOptions) {
    // Memoize parameters to prevent unnecessary re-renders
    const memoizedController = useMemo(() => controller, [controller]);
    const memoizedInitImageId = useMemo(() => initImageId, [initImageId]);
    const memoizedFirebaseUid = useMemo(() => firebaseUid, [firebaseUid]);

    // Initialize business logic hooks only
    const adjustmentHistory = useAdjustmentHistory(initialAdjustments, memoizedController, memoizedFirebaseUid, memoizedInitImageId);
    const gallerySwipe = useGallerySwipe(memoizedFirebaseUid, memoizedInitImageId, memoizedController);
    const presetHook = usePreset(memoizedController, memoizedFirebaseUid, { autoLoad: true });
    
    // Find active preset based on current adjustments
    const activePreset = presetHook.actions.findByAdjustments(adjustmentHistory.currentState);
    
    // Actions - pure business logic, no editor interaction - wrapped in useCallback to prevent re-renders
    const navigateNext = useCallback(() => {
        if (gallerySwipe.isNextAvailable) {
            gallerySwipe.onSwipeNext();
        }
    }, [gallerySwipe.isNextAvailable, gallerySwipe.onSwipeNext]);
    
    const navigatePrev = useCallback(() => {
        if (gallerySwipe.isPrevAvailable) {
            gallerySwipe.onSwipePrev();
        }
    }, [gallerySwipe.isPrevAvailable, gallerySwipe.onSwipePrev]);
    
    const updateAdjustment = useCallback((field: keyof AdjustmentState, value: number) => {
        const newState = {
            ...adjustmentHistory.currentState,
            [field]: value
        };
        adjustmentHistory.actions.pushState(newState);
    }, [adjustmentHistory.currentState, adjustmentHistory.actions.pushState]);
    
    const setBatchMode = useCallback((enabled: boolean) => {
        adjustmentHistory.config.setBatchMode(enabled);
    }, [adjustmentHistory.config.setBatchMode]);
    
    const startBatchMode = useCallback(() => {
        adjustmentHistory.config.setBatchMode(true);
    }, [adjustmentHistory.config.setBatchMode]);
    
    const endBatchMode = useCallback(() => {
        adjustmentHistory.config.setBatchMode(false);
    }, [adjustmentHistory.config.setBatchMode]);
    
    const undo = useCallback(() => {
        adjustmentHistory.actions.undo();
    }, [adjustmentHistory.actions.undo]);
    
    const redo = useCallback(() => {
        adjustmentHistory.actions.redo();
    }, [adjustmentHistory.actions.redo]);
    
    const reset = useCallback(async () => {
        // Reset means setting all adjustments to 0 and adding it as new history entry
        // This allows users to undo the reset operation
        // Reset acts like normal adjustment - each reset creates a new history entry
        console.log('Resetting adjustments to 0 - adding to history and sending to backend');
        
        // First add reset to history (this creates local history entry)
        adjustmentHistory.actions.pushState(initialAdjustments);
        
        // Then sync to backend
        await adjustmentHistory.config.syncToBackend();
    }, [adjustmentHistory.actions.pushState, adjustmentHistory.config.syncToBackend]);
    
    const loadPresets = useCallback(async () => {
        await presetHook.actions.load();
    }, [presetHook.actions.load]);
    
    const applyPreset = useCallback(async (preset: Preset) => {
        console.log('Applying preset:', preset.name, '- saving to backend history');
        const adjustmentState: AdjustmentState = {
            tempScore: preset.temperature,
            tintScore: preset.tint,
            vibranceScore: preset.vibrance,
            saturationScore: preset.saturation,
            exposureScore: preset.exposure,
            highlightsScore: preset.highlights,
            shadowsScore: preset.shadows,
            whitesScore: preset.whites,
            blacksScore: preset.blacks,
            contrastScore: preset.contrast,
            clarityScore: preset.clarity,
            sharpnessScore: preset.sharpness,
        };
        
        // Apply preset directly and add to history
        adjustmentHistory.actions.pushState(adjustmentState);
        
        // Then sync to backend
        await adjustmentHistory.config.syncToBackend();
    }, [adjustmentHistory.actions.pushState, adjustmentHistory.config.syncToBackend]);
    
    const createPreset = useCallback(async (name: string) => {
        return await presetHook.actions.create(name, adjustmentHistory.currentState);
    }, [presetHook.actions.create, adjustmentHistory.currentState]);
    
    const deletePreset = useCallback(async (presetId: string) => {
        await presetHook.actions.delete(presetId);
    }, [presetHook.actions.delete]);
    
    const getEditorAdjustments = useCallback((): AdjustmentValues => {
        const adjustments = adjustmentHistory.currentState;
        return {
            temperature: adjustments.tempScore,
            tint: adjustments.tintScore,
            vibrance: adjustments.vibranceScore / 100,
            saturation: adjustments.saturationScore / 100,
            exposure: (adjustments.exposureScore / 100) * 3,
            highlights: adjustments.highlightsScore / 100,
            shadows: adjustments.shadowsScore / 100,
            whites: adjustments.whitesScore / 100,
            blacks: adjustments.blacksScore / 100,
            contrast: adjustments.contrastScore / 100,
            clarity: adjustments.clarityScore / 100,
            sharpness: adjustments.sharpnessScore / 100,
        };
    }, [adjustmentHistory.currentState]);
    
    const actions: UseHonchoEditorSingleActions = {
        // Navigation
        navigateNext,
        navigatePrev,
        
        // Adjustments
        updateAdjustment,
        setBatchMode,
        startBatchMode,
        endBatchMode,
        
        // History
        undo,
        redo,
        reset,
        
        // Presets
        loadPresets,
        applyPreset,
        createPreset,
        deletePreset,
        
        // Adjustment conversion for editor
        getEditorAdjustments
    };
    
    // State - pure business state, no editor state
    const state: UseHonchoEditorSingleState = {
        // Image state
        currentImageData: gallerySwipe.currentImageData,
        isGalleryLoading: gallerySwipe.isLoading,
        galleryError: gallerySwipe.error,
        
        // Adjustment state
        currentAdjustments: adjustmentHistory.currentState,
        isBatchMode: adjustmentHistory.historyInfo.isBatchMode,
        canUndo: adjustmentHistory.historyInfo.canUndo,
        canRedo: adjustmentHistory.historyInfo.canRedo,
        
        // Navigation state
        isNextAvailable: gallerySwipe.isNextAvailable,
        isPrevAvailable: gallerySwipe.isPrevAvailable,
        
        // Preset state
        presets: presetHook.presets,
        activePreset: activePreset || null,
        presetsLoading: presetHook.info.isLoading,
        presetsError: presetHook.info.error,
    };
    
    return {
        state,
        actions
    };
}
