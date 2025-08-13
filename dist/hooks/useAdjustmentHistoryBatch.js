import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
/**
 * Create default adjustment state
 */
const createDefaultAdjustmentState = (overrides) => ({
    tempScore: 0,
    tintScore: 0,
    vibranceScore: 0,
    saturationScore: 0,
    exposureScore: 0,
    highlightsScore: 0,
    shadowsScore: 0,
    whitesScore: 0,
    blacksScore: 0,
    contrastScore: 0,
    clarityScore: 0,
    sharpnessScore: 0,
    ...overrides
});
/**
 * Compare two BatchAdjustmentState objects for equality
 */
const compareBatchStates = (a, b) => {
    try {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    catch (error) {
        console.warn('Failed to compare batch states with JSON.stringify:', error);
        return false;
    }
};
/**
 * Create empty batch state
 */
const createEmptyBatchState = () => ({
    currentSelection: {},
    allImages: {},
    initialStates: {}
});
/**
 * Advanced hook for managing batch AdjustmentState history with selective undo/redo functionality.
 *
 * **Pure State Management Design:**
 * - Starts empty, no image loading functionality
 * - Focus on state management and history tracking only
 * - Selection-based operations with persistent state
 * - Manual selection via `actions.setSelection()`
 *
 * **Key Features:**
 * - **Current Selection**: Images actively being adjusted
 * - **All Images**: Persistent state for every image touched
 * - **Selective Operations**: Undo/redo only affects selected images
 * - **Automatic State Persistence**: Images remain in allImages even when deselected
 *
 * **Typical Usage Flow:**
 * ```typescript
 * const { actions, currentBatch, selectedIds } = useAdjustmentHistoryBatch();
 *
 * // Select images (new images get default state automatically)
 * actions.setSelection(['img1', 'img2', 'img3']);
 *
 * // Apply adjustments to selected images
 * actions.adjustSelected({ exposureScore: 10 });
 *
 * // Change selection (img1, img2 state persists in allImages)
 * actions.setSelection(['img3']);
 *
 * // Adjust only img3
 * actions.adjustSelected({ contrastScore: 5 });
 *
 * // Undo affects only currently selected (img3)
 * actions.undo();
 * ```
 *
 * **State Structure:**
 * - `currentBatch.currentSelection`: Currently selected images and their states
 * - `currentBatch.allImages`: All images that have been selected/adjusted (persistent)
 * - `selectedIds`: Array of currently selected image IDs
 *
 * @param options - Configuration options for history behavior
 * @returns Object with current batch, selection, history info, actions, and config
 */
export function useAdjustmentHistoryBatch(options = {}) {
    // Internal stabilization
    const internalOptions = useMemo(() => ({
        maxSize: options.maxSize ?? 'unlimited',
        devWarnings: options.devWarnings ?? false,
        defaultAdjustmentState: options.defaultAdjustmentState ?? {}
    }), [
        options.maxSize,
        options.devWarnings,
        options.defaultAdjustmentState
    ]);
    // Core state management - start empty for plain mode
    const [allImageIds, setAllImageIds] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [history, setHistory] = useState([createEmptyBatchState()]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentBatch, setCurrentBatch] = useState(createEmptyBatchState());
    // Configuration refs
    const maxSizeRef = useRef(internalOptions.maxSize);
    const devWarningsRef = useRef(internalOptions.devWarnings);
    // Sync currentBatch with history
    useEffect(() => {
        setCurrentBatch(history[currentIndex]);
    }, [history, currentIndex]);
    // Memory usage calculation
    const getMemoryUsage = useCallback(() => {
        try {
            const historyString = JSON.stringify(history);
            return historyString.length * 2; // Rough estimate: 2 bytes per character
        }
        catch (error) {
            console.warn('Failed to estimate memory usage:', error);
            return history.length * allImageIds.length * 1000; // Fallback estimate
        }
    }, [history, allImageIds.length]);
    // Trim history to specified size
    const trimHistoryToSize = useCallback((size) => {
        if (size <= 0)
            return;
        setHistory(prevHistory => {
            if (prevHistory.length <= size)
                return prevHistory;
            const startIndex = Math.max(0, prevHistory.length - size);
            const trimmedHistory = prevHistory.slice(startIndex);
            // Adjust current index
            setCurrentIndex(prevIndex => {
                const adjustedIndex = prevIndex - startIndex;
                return Math.max(0, Math.min(adjustedIndex, trimmedHistory.length - 1));
            });
            return trimmedHistory;
        });
    }, []);
    // Apply max size limit
    const enforceMaxSize = useCallback(() => {
        if (maxSizeRef.current === 'unlimited')
            return;
        const maxSize = maxSizeRef.current;
        if (history.length > maxSize) {
            trimHistoryToSize(maxSize);
        }
    }, [history.length, trimHistoryToSize]);
    // Push new batch state to history
    const pushBatchState = useCallback((newBatch) => {
        // Skip if batch hasn't changed
        if (compareBatchStates(newBatch, currentBatch)) {
            return;
        }
        // Update currentBatch immediately for smooth UI
        setCurrentBatch(newBatch);
        // Update history
        setHistory(prevHistory => {
            const truncatedHistory = prevHistory.slice(0, currentIndex + 1);
            const newHistory = [...truncatedHistory, newBatch];
            setCurrentIndex(newHistory.length - 1);
            return newHistory;
        });
    }, [currentBatch, currentIndex]);
    // Apply adjustment deltas to selected images
    const adjustSelected = useCallback((delta) => {
        if (selectedIds.length === 0)
            return;
        const newBatch = {
            currentSelection: { ...currentBatch.currentSelection },
            allImages: { ...currentBatch.allImages },
            initialStates: { ...currentBatch.initialStates }
        };
        // Apply adjustments to selected images in both currentSelection and allImages
        for (const imageId of selectedIds) {
            if (newBatch.currentSelection[imageId]) {
                // Update current selection
                newBatch.currentSelection[imageId] = {
                    ...newBatch.currentSelection[imageId],
                    ...Object.fromEntries(Object.entries(delta).map(([key, value]) => [
                        key,
                        newBatch.currentSelection[imageId][key] + value
                    ]))
                };
                // Also update in allImages to persist the changes
                newBatch.allImages[imageId] = { ...newBatch.currentSelection[imageId] };
            }
        }
        pushBatchState(newBatch);
    }, [selectedIds, currentBatch, pushBatchState]);
    // Set specific adjustment states for specified images (removed since not needed)
    // Undo last changes to selected images
    const undo = useCallback(() => {
        if (currentIndex > 0 && selectedIds.length > 0) {
            const previousBatch = history[currentIndex - 1];
            const newBatch = {
                currentSelection: { ...currentBatch.currentSelection },
                allImages: { ...currentBatch.allImages },
                initialStates: { ...currentBatch.initialStates }
            };
            // Only restore adjustments for currently selected images
            for (const imageId of selectedIds) {
                if (previousBatch.allImages[imageId] && newBatch.currentSelection[imageId]) {
                    // Restore from previous allImages state (not currentSelection)
                    newBatch.currentSelection[imageId] = { ...previousBatch.allImages[imageId] };
                    newBatch.allImages[imageId] = { ...previousBatch.allImages[imageId] };
                }
            }
            // Update current batch and move index back
            setCurrentBatch(newBatch);
            setCurrentIndex(currentIndex - 1);
            // Update the current history entry with the new mixed state
            setHistory(prevHistory => {
                const newHistory = [...prevHistory];
                newHistory[currentIndex] = newBatch;
                return newHistory;
            });
            if (internalOptions.devWarnings) {
                console.log('useAdjustmentHistoryBatch: Undo completed for selected images only', {
                    selectedImages: selectedIds,
                    currentIndex: currentIndex - 1
                });
            }
        }
    }, [currentIndex, selectedIds, history, currentBatch, internalOptions.devWarnings]);
    // Redo next changes to selected images
    const redo = useCallback(() => {
        if (currentIndex < history.length - 1 && selectedIds.length > 0) {
            const nextBatch = history[currentIndex + 1];
            const newBatch = {
                currentSelection: { ...currentBatch.currentSelection },
                allImages: { ...currentBatch.allImages },
                initialStates: { ...currentBatch.initialStates }
            };
            // Only restore adjustments for currently selected images
            for (const imageId of selectedIds) {
                if (nextBatch.allImages[imageId] && newBatch.currentSelection[imageId]) {
                    // Restore from next allImages state (not currentSelection)
                    newBatch.currentSelection[imageId] = { ...nextBatch.allImages[imageId] };
                    newBatch.allImages[imageId] = { ...nextBatch.allImages[imageId] };
                }
            }
            // Update current batch and move index forward
            setCurrentBatch(newBatch);
            setCurrentIndex(currentIndex + 1);
            // Update the current history entry with the new mixed state
            setHistory(prevHistory => {
                const newHistory = [...prevHistory];
                newHistory[currentIndex + 1] = newBatch;
                return newHistory;
            });
            if (internalOptions.devWarnings) {
                console.log('useAdjustmentHistoryBatch: Redo completed for selected images only', {
                    selectedImages: selectedIds,
                    currentIndex: currentIndex + 1
                });
            }
        }
    }, [currentIndex, selectedIds, history, currentBatch, internalOptions.devWarnings]);
    // Reset selected images to default state
    const reset = useCallback((imageIds) => {
        const idsToReset = imageIds || selectedIds;
        if (idsToReset.length === 0)
            return;
        const newBatch = {
            currentSelection: { ...currentBatch.currentSelection },
            allImages: { ...currentBatch.allImages },
            initialStates: { ...currentBatch.initialStates }
        };
        const defaultState = createDefaultAdjustmentState(internalOptions.defaultAdjustmentState);
        for (const imageId of idsToReset) {
            if (newBatch.currentSelection[imageId]) {
                newBatch.currentSelection[imageId] = { ...defaultState };
                newBatch.allImages[imageId] = { ...defaultState };
            }
        }
        pushBatchState(newBatch);
    }, [selectedIds, currentBatch, pushBatchState, internalOptions.defaultAdjustmentState]);
    // Selection management with initial adjustments - single state update
    const setSelection = useCallback((configs) => {
        const imageIds = configs.map(config => config.imageId);
        // Update selectedIds state
        setSelectedIds(imageIds);
        // Build new batch state with initial adjustments
        const newBatch = {
            currentSelection: {},
            allImages: { ...currentBatch.allImages },
            initialStates: { ...currentBatch.initialStates }
        };
        // Process each image config
        for (const config of configs) {
            const { imageId, adjustment } = config;
            // If image exists in allImages, use its state
            if (currentBatch.allImages[imageId]) {
                newBatch.currentSelection[imageId] = { ...currentBatch.allImages[imageId] };
            }
            else {
                // New image - determine initial state
                let initialState;
                if (adjustment) {
                    // Use provided adjustment as initial state
                    initialState = {
                        ...createDefaultAdjustmentState(internalOptions.defaultAdjustmentState),
                        ...adjustment
                    };
                }
                else {
                    // Use default state
                    initialState = createDefaultAdjustmentState(internalOptions.defaultAdjustmentState);
                }
                // Set initial state for new image
                newBatch.currentSelection[imageId] = { ...initialState };
                newBatch.allImages[imageId] = { ...initialState };
                newBatch.initialStates[imageId] = { ...initialState };
            }
        }
        // Update allImageIds to include any new images
        const newAllImageIds = Array.from(new Set([...allImageIds, ...imageIds]));
        setAllImageIds(newAllImageIds);
        // Single state update to prevent multiple re-renders
        setCurrentBatch(newBatch);
        if (internalOptions.devWarnings) {
            console.log('useAdjustmentHistoryBatch: Selection updated with initial adjustments', {
                selected: imageIds,
                totalImages: newAllImageIds.length,
                newImages: imageIds.filter(id => !allImageIds.includes(id)),
                withInitialAdjustments: configs.filter(c => c.adjustment).length
            });
        }
    }, [allImageIds, currentBatch, internalOptions.defaultAdjustmentState, internalOptions.devWarnings]);
    // Sync adjustments for specific images (clears their history) - single state update
    const syncAdjustment = useCallback((configs) => {
        if (configs.length === 0)
            return;
        // Build new batch state
        const newBatch = {
            currentSelection: { ...currentBatch.currentSelection },
            allImages: { ...currentBatch.allImages },
            initialStates: { ...currentBatch.initialStates }
        };
        // Process each sync config
        for (const config of configs) {
            const { imageId, adjustment } = config;
            if (adjustment) {
                const fullAdjustment = {
                    ...createDefaultAdjustmentState(internalOptions.defaultAdjustmentState),
                    ...adjustment
                };
                // Update all states for this image
                newBatch.allImages[imageId] = { ...fullAdjustment };
                newBatch.initialStates[imageId] = { ...fullAdjustment };
                // If image is currently selected, update current selection too
                if (newBatch.currentSelection[imageId]) {
                    newBatch.currentSelection[imageId] = { ...fullAdjustment };
                }
            }
        }
        // Clear history and start fresh with synced state
        const freshHistory = [newBatch];
        setHistory(freshHistory);
        setCurrentIndex(0);
        setCurrentBatch(newBatch);
        if (internalOptions.devWarnings) {
            const syncedImageIds = configs.map(c => c.imageId);
            console.log('useAdjustmentHistoryBatch: Synced adjustments (history cleared)', {
                syncedImages: syncedImageIds,
                historyCleared: true
            });
        }
    }, [currentBatch, internalOptions.defaultAdjustmentState, internalOptions.devWarnings]);
    const toggleSelection = useCallback((imageId) => {
        setSelectedIds(prev => prev.includes(imageId)
            ? prev.filter(id => id !== imageId)
            : [...prev, imageId]);
    }, []);
    const selectAll = useCallback(() => {
        setSelectedIds([...allImageIds]);
    }, [allImageIds]);
    const clearSelection = useCallback(() => {
        setSelectedIds([]);
        // Clear currentSelection but keep allImages and initialStates
        const newBatch = {
            currentSelection: {},
            allImages: { ...currentBatch.allImages },
            initialStates: { ...currentBatch.initialStates }
        };
        setCurrentBatch(newBatch);
    }, [currentBatch]);
    // Other history actions
    const jumpToIndex = useCallback((index) => {
        if (index >= 0 && index < history.length) {
            setCurrentIndex(index);
            setCurrentBatch(history[index]);
        }
    }, [history]);
    const clearHistory = useCallback(() => {
        const freshBatch = createEmptyBatchState();
        setHistory([freshBatch]);
        setCurrentIndex(0);
        setCurrentBatch(freshBatch);
        setAllImageIds([]);
        setSelectedIds([]);
    }, []);
    const getCurrentBatch = useCallback(() => {
        return {
            currentSelection: { ...currentBatch.currentSelection },
            allImages: { ...currentBatch.allImages },
            initialStates: { ...currentBatch.initialStates }
        };
    }, [currentBatch]);
    const syncBatch = useCallback((newBatch, targetIndex) => {
        // Validate input
        if (!newBatch || typeof newBatch !== 'object' || !newBatch.currentSelection || !newBatch.allImages || !newBatch.initialStates) {
            console.warn('syncBatch: newBatch must be a valid BatchAdjustmentState object with currentSelection, allImages, and initialStates');
            return;
        }
        // Update current state
        setCurrentBatch({
            currentSelection: { ...newBatch.currentSelection },
            allImages: { ...newBatch.allImages },
            initialStates: { ...newBatch.initialStates }
        });
        // Replace history with single entry
        setHistory([{
                currentSelection: { ...newBatch.currentSelection },
                allImages: { ...newBatch.allImages },
                initialStates: { ...newBatch.initialStates }
            }]);
        setCurrentIndex(0);
        // Update image tracking
        const allImageIds = Object.keys(newBatch.allImages);
        const selectedImageIds = Object.keys(newBatch.currentSelection);
        setAllImageIds(allImageIds);
        setSelectedIds(selectedImageIds);
        if (devWarningsRef.current) {
            console.log('syncBatch: Synchronized batch state', {
                totalImages: allImageIds.length,
                selectedImages: selectedImageIds.length
            });
        }
    }, []);
    // Configuration actions
    const setMaxSize = useCallback((size) => {
        maxSizeRef.current = size;
        if (size !== 'unlimited') {
            enforceMaxSize();
        }
    }, [enforceMaxSize]);
    // History info object
    const historyInfo = useMemo(() => ({
        canUndo: currentIndex > 0 && selectedIds.length > 0,
        canRedo: currentIndex < history.length - 1 && selectedIds.length > 0,
        currentIndex,
        totalStates: history.length,
        selectedCount: selectedIds.length,
        totalImages: allImageIds.length,
        historySize: getMemoryUsage()
    }), [currentIndex, history.length, selectedIds.length, allImageIds.length, getMemoryUsage]);
    // Actions object - stabilized with useMemo
    const actions = useMemo(() => ({
        adjustSelected,
        undo,
        redo,
        reset,
        setSelection,
        syncAdjustment,
        toggleSelection,
        selectAll,
        clearSelection,
        jumpToIndex,
        clearHistory,
        getCurrentBatch,
        syncBatch
    }), [
        adjustSelected, undo, redo, reset,
        setSelection, syncAdjustment, toggleSelection, selectAll, clearSelection,
        jumpToIndex, clearHistory, getCurrentBatch, syncBatch
    ]);
    // Config object - stabilized with useMemo
    const config = useMemo(() => ({
        setMaxSize,
        getMemoryUsage
    }), [setMaxSize, getMemoryUsage]);
    // Apply max size enforcement when history changes
    useEffect(() => {
        enforceMaxSize();
    }, [enforceMaxSize]);
    return {
        currentBatch,
        selectedIds,
        allImageIds,
        historyInfo,
        actions,
        config
    };
}
