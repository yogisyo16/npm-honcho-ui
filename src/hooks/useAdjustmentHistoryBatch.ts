import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { AdjustmentState } from './editor/useHonchoEditor';

/**
 * Batch adjustment state - maps image IDs to their adjustment states
 */
export interface BatchAdjustmentState {
  [imageId: string]: AdjustmentState;
}

/**
 * Configuration options for the batch adjustment history hook
 */
interface BatchHistoryOptions {
  /** Maximum number of history entries to keep. Use 'unlimited' for no limit */
  maxSize?: number | 'unlimited';
  /** Enable development warnings for performance issues */
  devWarnings?: boolean;
  /** Default adjustment state for new images */
  defaultAdjustmentState?: Partial<AdjustmentState>;
}

/**
 * Information about the current batch history state
 */
export interface BatchHistoryInfo {
  /** Whether undo operation is available for selected images */
  canUndo: boolean;
  /** Whether redo operation is available for selected images */
  canRedo: boolean;
  /** Current position in history (0-based index) */
  currentIndex: number;
  /** Total number of states in history */
  totalStates: number;
  /** Number of currently selected images */
  selectedCount: number;
  /** Total number of images being managed */
  totalImages: number;
  /** Current size of history in memory */
  historySize: number;
}

/**
 * Actions available for batch history management
 */
export interface BatchHistoryActions {
  /** Apply adjustment deltas to selected images */
  adjustSelected: (delta: Partial<AdjustmentState>) => void;
  /** Set specific adjustment states for specified images */
  setAdjustments: (adjustments: Partial<BatchAdjustmentState>) => void;
  /** Undo last changes to selected images */
  undo: () => void;
  /** Redo next changes to selected images */
  redo: () => void;
  /** Reset selected images to default state */
  reset: (imageIds?: string[]) => void;
  /** Set which images are selected */
  setSelection: (imageIds: string[]) => void;
  /** Add or remove image from selection */
  toggleSelection: (imageId: string) => void;
  /** Select all images */
  selectAll: () => void;
  /** Clear selection */
  clearSelection: () => void;
  /** Jump to specific index in history */
  jumpToIndex: (index: number) => void;
  /** Clear all history and start fresh */
  clearHistory: () => void;
  /** Get copy of current batch state */
  getCurrentBatch: () => BatchAdjustmentState;
  /** Sync entire batch state */
  syncBatch: (newBatch: BatchAdjustmentState, targetIndex?: number) => void;
}

/**
 * Configuration actions for runtime adjustment
 */
export interface BatchHistoryConfig {
  /** Set maximum history size */
  setMaxSize: (size: number | 'unlimited') => void;
  /** Get current memory usage estimate */
  getMemoryUsage: () => number;
  /** Add new images to the batch */
  addImages: (imageIds: string[], selectNew?: boolean) => void;
  /** Remove images from the batch */
  removeImages: (imageIds: string[]) => void;
}

/**
 * Return type for the useAdjustmentHistoryBatch hook
 */
export interface UseAdjustmentHistoryBatchReturn {
  /** Current batch adjustment state */
  currentBatch: BatchAdjustmentState;
  /** Currently selected image IDs */
  selectedIds: string[];
  /** All image IDs being managed */
  allImageIds: string[];
  /** Information about history state */
  historyInfo: BatchHistoryInfo;
  /** Available history actions */
  actions: BatchHistoryActions;
  /** Configuration options */
  config: BatchHistoryConfig;
}

/**
 * Create default adjustment state
 */
const createDefaultAdjustmentState = (overrides?: Partial<AdjustmentState>): AdjustmentState => ({
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
const compareBatchStates = (a: BatchAdjustmentState, b: BatchAdjustmentState): boolean => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  
  if (aKeys.length !== bKeys.length) return false;
  
  for (const key of aKeys) {
    if (!b[key]) return false;
    try {
      if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) return false;
    } catch (error) {
      // Fallback comparison
      const stateA = a[key];
      const stateB = b[key];
      if (
        stateA.tempScore !== stateB.tempScore ||
        stateA.tintScore !== stateB.tintScore ||
        stateA.vibranceScore !== stateB.vibranceScore ||
        stateA.saturationScore !== stateB.saturationScore ||
        stateA.exposureScore !== stateB.exposureScore ||
        stateA.highlightsScore !== stateB.highlightsScore ||
        stateA.shadowsScore !== stateB.shadowsScore ||
        stateA.whitesScore !== stateB.whitesScore ||
        stateA.blacksScore !== stateB.blacksScore ||
        stateA.contrastScore !== stateB.contrastScore ||
        stateA.clarityScore !== stateB.clarityScore ||
        stateA.sharpnessScore !== stateB.sharpnessScore
      ) {
        return false;
      }
    }
  }
  
  return true;
};

/**
 * Advanced hook for managing batch AdjustmentState history with selective undo/redo functionality.
 * 
 * Features:
 * - Manages multiple images with individual adjustment states
 * - Selective operations that only affect selected images
 * - Proper history tracking for batch operations
 * - Memory usage monitoring and optimization
 * - Flexible selection management
 * 
 * @param imageIds - Array of image IDs to manage
 * @param options - Configuration options for history behavior
 * @returns Object with current batch, selection, history info, actions, and config
 */
export function useAdjustmentHistoryBatch(
  imageIds: string[],
  options: BatchHistoryOptions = {}
): UseAdjustmentHistoryBatchReturn {
  // Stabilize imageIds to prevent unnecessary re-renders
  const stableImageIds = useMemo(() => {
    // Return same reference if content is identical
    return imageIds;
  }, [imageIds.join(',')]); // Only re-memoize if actual content changes

  // Internal stabilization
  const internalOptions = useMemo(() => ({
    maxSize: options.maxSize ?? 'unlimited' as const,
    devWarnings: options.devWarnings ?? false,
    defaultAdjustmentState: options.defaultAdjustmentState ?? {}
  }), [
    options.maxSize, 
    options.devWarnings,
    options.defaultAdjustmentState
  ]);

  // Initialize batch state with all images
  const createInitialBatch = useCallback((ids: string[]): BatchAdjustmentState => {
    const batch: BatchAdjustmentState = {};
    for (const id of ids) {
      batch[id] = createDefaultAdjustmentState(internalOptions.defaultAdjustmentState);
    }
    return batch;
  }, [internalOptions.defaultAdjustmentState]);

  // Core state management - use stable imageIds for initialization
  const [allImageIds, setAllImageIds] = useState<string[]>(stableImageIds);
  const [selectedIds, setSelectedIds] = useState<string[]>(stableImageIds); // Default select all
  const [history, setHistory] = useState<BatchAdjustmentState[]>(() => [createInitialBatch(stableImageIds)]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBatch, setCurrentBatch] = useState<BatchAdjustmentState>(() => createInitialBatch(stableImageIds));
  
  // Configuration refs
  const maxSizeRef = useRef(internalOptions.maxSize);
  const devWarningsRef = useRef(internalOptions.devWarnings);

  // Sync currentBatch with history
  useEffect(() => {
    setCurrentBatch(history[currentIndex]);
  }, [history, currentIndex]);

  // Update when stableImageIds actually changes (content-wise)
  useEffect(() => {
    // Only update if the actual content is different, not just reference
    const currentIdString = allImageIds.join(',');
    const newIdString = stableImageIds.join(',');
    
    if (currentIdString !== newIdString) {
      const newBatch = createInitialBatch(stableImageIds);
      setAllImageIds([...stableImageIds]); // Create new array to avoid reference issues
      setSelectedIds([...stableImageIds]); // Default select all new images
      setHistory([newBatch]);
      setCurrentIndex(0);
      setCurrentBatch(newBatch);
      
      if (internalOptions.devWarnings) {
        console.log('useAdjustmentHistoryBatch: ImageIds updated', {
          from: allImageIds,
          to: stableImageIds
        });
      }
    }
  }, [stableImageIds, allImageIds, createInitialBatch, internalOptions.devWarnings]);

  // Memory usage calculation
  const getMemoryUsage = useCallback(() => {
    try {
      const historyString = JSON.stringify(history);
      return historyString.length * 2; // Rough estimate: 2 bytes per character
    } catch (error) {
      console.warn('Failed to estimate memory usage:', error);
      return history.length * allImageIds.length * 1000; // Fallback estimate
    }
  }, [history, allImageIds.length]);

  // Trim history to specified size
  const trimHistoryToSize = useCallback((size: number) => {
    if (size <= 0) return;
    
    setHistory(prevHistory => {
      if (prevHistory.length <= size) return prevHistory;
      
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
    if (maxSizeRef.current === 'unlimited') return;
    
    const maxSize = maxSizeRef.current;
    if (history.length > maxSize) {
      trimHistoryToSize(maxSize);
    }
  }, [history.length, trimHistoryToSize]);

  // Push new batch state to history
  const pushBatchState = useCallback((newBatch: BatchAdjustmentState) => {
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
  const adjustSelected = useCallback((delta: Partial<AdjustmentState>) => {
    if (selectedIds.length === 0) return;

    const newBatch: BatchAdjustmentState = { ...currentBatch };
    
    for (const imageId of selectedIds) {
      if (newBatch[imageId]) {
        newBatch[imageId] = {
          ...newBatch[imageId],
          ...Object.fromEntries(
            Object.entries(delta).map(([key, value]) => [
              key,
              (newBatch[imageId][key as keyof AdjustmentState] as number) + (value as number)
            ])
          )
        };
      }
    }

    pushBatchState(newBatch);
  }, [selectedIds, currentBatch, pushBatchState]);

  // Set specific adjustment states for specified images
  const setAdjustments = useCallback((adjustments: Partial<BatchAdjustmentState>) => {
    const newBatch: BatchAdjustmentState = { ...currentBatch };
    
    for (const [imageId, adjustment] of Object.entries(adjustments)) {
      if (newBatch[imageId]) {
        newBatch[imageId] = { ...newBatch[imageId], ...adjustment };
      }
    }

    pushBatchState(newBatch);
  }, [currentBatch, pushBatchState]);

  // Undo last changes to selected images
  const undo = useCallback(() => {
    if (currentIndex > 0 && selectedIds.length > 0) {
      const previousBatch = history[currentIndex - 1];
      const newBatch: BatchAdjustmentState = { ...currentBatch };
      
      // Only restore selected images from previous state
      for (const imageId of selectedIds) {
        if (previousBatch[imageId] && newBatch[imageId]) {
          newBatch[imageId] = { ...previousBatch[imageId] };
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
    }
  }, [currentIndex, selectedIds, history, currentBatch]);

  // Redo next changes to selected images
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1 && selectedIds.length > 0) {
      const nextBatch = history[currentIndex + 1];
      const newBatch: BatchAdjustmentState = { ...currentBatch };
      
      // Only restore selected images from next state
      for (const imageId of selectedIds) {
        if (nextBatch[imageId] && newBatch[imageId]) {
          newBatch[imageId] = { ...nextBatch[imageId] };
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
    }
  }, [currentIndex, selectedIds, history, currentBatch]);

  // Reset selected images to default state
  const reset = useCallback((imageIds?: string[]) => {
    const idsToReset = imageIds || selectedIds;
    if (idsToReset.length === 0) return;

    const newBatch: BatchAdjustmentState = { ...currentBatch };
    const defaultState = createDefaultAdjustmentState(internalOptions.defaultAdjustmentState);
    
    for (const imageId of idsToReset) {
      if (newBatch[imageId]) {
        newBatch[imageId] = { ...defaultState };
      }
    }

    pushBatchState(newBatch);
  }, [selectedIds, currentBatch, pushBatchState, internalOptions.defaultAdjustmentState]);

  // Selection management
  const setSelection = useCallback((imageIds: string[]) => {
    // Validate that all imageIds exist
    const validIds = imageIds.filter(id => allImageIds.includes(id));
    setSelectedIds(validIds);
    
    if (devWarningsRef.current && validIds.length !== imageIds.length) {
      console.warn('Some image IDs in setSelection do not exist:', 
        imageIds.filter(id => !allImageIds.includes(id)));
    }
  }, [allImageIds]);

  const toggleSelection = useCallback((imageId: string) => {
    if (!allImageIds.includes(imageId)) {
      if (devWarningsRef.current) {
        console.warn('toggleSelection: Image ID does not exist:', imageId);
      }
      return;
    }
    
    setSelectedIds(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  }, [allImageIds]);

  const selectAll = useCallback(() => {
    setSelectedIds([...allImageIds]);
  }, [allImageIds]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  // Other history actions
  const jumpToIndex = useCallback((index: number) => {
    if (index >= 0 && index < history.length) {
      setCurrentIndex(index);
      setCurrentBatch(history[index]);
    }
  }, [history]);

  const clearHistory = useCallback(() => {
    const freshBatch = createInitialBatch(allImageIds);
    setHistory([freshBatch]);
    setCurrentIndex(0);
    setCurrentBatch(freshBatch);
  }, [allImageIds, createInitialBatch]);

  const getCurrentBatch = useCallback(() => {
    return { ...currentBatch };
  }, [currentBatch]);

  const syncBatch = useCallback((newBatch: BatchAdjustmentState, targetIndex?: number) => {
    // Validate input
    if (!newBatch || typeof newBatch !== 'object') {
      console.warn('syncBatch: newBatch must be a valid BatchAdjustmentState object');
      return;
    }

    // Validate all items are AdjustmentState objects
    const isValidBatch = Object.values(newBatch).every(state => 
      state && typeof state === 'object' &&
      typeof state.tempScore === 'number' &&
      typeof state.tintScore === 'number' &&
      typeof state.vibranceScore === 'number' &&
      typeof state.saturationScore === 'number' &&
      typeof state.exposureScore === 'number' &&
      typeof state.highlightsScore === 'number' &&
      typeof state.shadowsScore === 'number' &&
      typeof state.whitesScore === 'number' &&
      typeof state.blacksScore === 'number' &&
      typeof state.contrastScore === 'number' &&
      typeof state.clarityScore === 'number' &&
      typeof state.sharpnessScore === 'number'
    );

    if (!isValidBatch) {
      console.warn('syncBatch: All values in newBatch must be valid AdjustmentState objects');
      return;
    }

    // Update current state
    setCurrentBatch({ ...newBatch });
    
    // Replace history with single entry
    setHistory([{ ...newBatch }]);
    setCurrentIndex(0);
    
    if (devWarningsRef.current) {
      console.log('syncBatch: Synchronized batch state with', Object.keys(newBatch).length, 'images');
    }
  }, []);

  // Configuration actions
  const setMaxSize = useCallback((size: number | 'unlimited') => {
    maxSizeRef.current = size;
    if (size !== 'unlimited') {
      enforceMaxSize();
    }
  }, [enforceMaxSize]);

  const addImages = useCallback((imageIds: string[], selectNew: boolean = true) => {
    const newIds = imageIds.filter(id => !allImageIds.includes(id));
    if (newIds.length === 0) return;

    const updatedAllIds = [...allImageIds, ...newIds];
    const newBatch = { ...currentBatch };
    
    // Add default states for new images
    for (const id of newIds) {
      newBatch[id] = createDefaultAdjustmentState(internalOptions.defaultAdjustmentState);
    }

    setAllImageIds(updatedAllIds);
    setCurrentBatch(newBatch);
    
    // Update history
    setHistory(prevHistory => {
      const newHistory = [...prevHistory];
      newHistory[currentIndex] = newBatch;
      return newHistory;
    });
    
    // Optionally select new images
    if (selectNew) {
      setSelectedIds(prev => [...prev, ...newIds]);
    }
  }, [allImageIds, currentBatch, currentIndex, internalOptions.defaultAdjustmentState]);

  const removeImages = useCallback((imageIds: string[]) => {
    const updatedAllIds = allImageIds.filter(id => !imageIds.includes(id));
    const updatedSelectedIds = selectedIds.filter(id => !imageIds.includes(id));
    const newBatch = { ...currentBatch };
    
    // Remove images from batch
    for (const id of imageIds) {
      delete newBatch[id];
    }

    setAllImageIds(updatedAllIds);
    setSelectedIds(updatedSelectedIds);
    setCurrentBatch(newBatch);
    
    // Update history
    setHistory(prevHistory => {
      const newHistory = prevHistory.map(batch => {
        const cleanedBatch = { ...batch };
        for (const id of imageIds) {
          delete cleanedBatch[id];
        }
        return cleanedBatch;
      });
      return newHistory;
    });
  }, [allImageIds, selectedIds, currentBatch]);

  // History info object
  const historyInfo: BatchHistoryInfo = useMemo(() => ({
    canUndo: currentIndex > 0 && selectedIds.length > 0,
    canRedo: currentIndex < history.length - 1 && selectedIds.length > 0,
    currentIndex,
    totalStates: history.length,
    selectedCount: selectedIds.length,
    totalImages: allImageIds.length,
    historySize: getMemoryUsage()
  }), [currentIndex, history.length, selectedIds.length, allImageIds.length, getMemoryUsage]);

  // Actions object - stabilized with useMemo
  const actions: BatchHistoryActions = useMemo(() => ({
    adjustSelected,
    setAdjustments,
    undo,
    redo,
    reset,
    setSelection,
    toggleSelection,
    selectAll,
    clearSelection,
    jumpToIndex,
    clearHistory,
    getCurrentBatch,
    syncBatch
  }), [
    adjustSelected, setAdjustments, undo, redo, reset,
    setSelection, toggleSelection, selectAll, clearSelection,
    jumpToIndex, clearHistory, getCurrentBatch, syncBatch
  ]);

  // Config object - stabilized with useMemo
  const config: BatchHistoryConfig = useMemo(() => ({
    setMaxSize,
    getMemoryUsage,
    addImages,
    removeImages
  }), [setMaxSize, getMemoryUsage, addImages, removeImages]);

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
