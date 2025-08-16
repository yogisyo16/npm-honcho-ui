import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { AdjustmentState } from './editor/useHonchoEditor';

export interface HistoryAdjustmentBatch {
  imageId: string;
  currentHistoryEntryId: string;
  history: HistoryAdjustmentEntry[];
}

export interface HistoryAdjustmentEntry {
  id: string;
  adjustment: AdjustmentState;
}

/**
 * Configuration for image with adjustment state
 */
export interface ImageAdjustmentConfig {
  imageId: string;
  /** Adjustment state for this image. If not provided, uses default (all zeros) */
  adjustment?: AdjustmentState;
}

/**
 * Batch adjustment state - maps image IDs to their adjustment states
 */
export interface BatchAdjustmentState {
  /** Currently selected images that are being actively adjusted */
  currentSelection: {
    [imageId: string]: AdjustmentState;
  };
  /** All images that have been selected/adjusted before (persistent state) */
  allImages: {
    [imageId: string]: AdjustmentState;
  };
  /** Track initial/baseline state for each image */
  initialStates: {
    [imageId: string]: AdjustmentState;
  };
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
  /** Undo last changes to selected images */
  undo: () => void;
  /** Redo next changes to selected images */
  redo: () => void;
  /** Reset selected images to default state */
  reset: (imageIds?: string[]) => void;
  /** Set selection with optional initial adjustments per image */
  setSelection: (configs: ImageAdjustmentConfig[]) => void;
  /** Sync/replace adjustment for images (clears their history) */
  syncAdjustment: (configs: ImageAdjustmentConfig[]) => void;
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
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch (error) {
    console.warn('Failed to compare batch states with JSON.stringify:', error);
    return false;
  }
};

/**
 * Create empty batch state
 */
const createEmptyBatchState = (): BatchAdjustmentState => ({
  currentSelection: {},
  allImages: {},
  initialStates: {}
});

/**
 * Generate unique ID for history entries
 */
const generateEntryId = (): string => {
  return `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

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
export function useAdjustmentHistoryBatch(
  options: BatchHistoryOptions = {}
): UseAdjustmentHistoryBatchReturn {
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

  // Core state management - using per-image history instead of batch history
  const [allImageIds, setAllImageIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [imageHistories, setImageHistories] = useState<HistoryAdjustmentBatch[]>([]);
  const [currentBatch, setCurrentBatch] = useState<BatchAdjustmentState>(createEmptyBatchState());
  
  // Configuration refs
  const maxSizeRef = useRef(internalOptions.maxSize);
  const devWarningsRef = useRef(internalOptions.devWarnings);

  // Helper function to rebuild currentBatch from imageHistories
  const rebuildCurrentBatch = useCallback(() => {
    const newBatch = createEmptyBatchState();
    
    imageHistories.forEach(imageHistory => {
      // Find current adjustment using currentHistoryEntryId
      const currentEntry = imageHistory.history.find(entry => entry.id === imageHistory.currentHistoryEntryId);
      if (currentEntry) {
        newBatch.allImages[imageHistory.imageId] = currentEntry.adjustment;
        if (selectedIds.includes(imageHistory.imageId)) {
          newBatch.currentSelection[imageHistory.imageId] = currentEntry.adjustment;
        }
      }
    });
    
    return newBatch;
  }, [imageHistories, selectedIds]);

  // Sync currentBatch with imageHistories
  useEffect(() => {
    setCurrentBatch(rebuildCurrentBatch());
  }, [rebuildCurrentBatch]);

  // Memory usage calculation
  const getMemoryUsage = useCallback(() => {
    try {
      const historiesString = JSON.stringify(imageHistories);
      return historiesString.length * 2; // Rough estimate: 2 bytes per character
    } catch (error) {
      console.warn('Failed to estimate memory usage:', error);
      return imageHistories.length * 100 * 1000; // Fallback estimate
    }
  }, [imageHistories]);

  // Trim individual image histories to specified size
  const trimImageHistoriesToSize = useCallback((size: number) => {
    if (size <= 0) return;
    
    setImageHistories(prevHistories => 
      prevHistories.map(imageHistory => ({
        ...imageHistory,
        history: imageHistory.history.length <= size 
          ? imageHistory.history 
          : imageHistory.history.slice(-size) // Keep last 'size' entries
      }))
    );
  }, []);

  // Apply max size limit
  const enforceMaxSize = useCallback(() => {
    if (maxSizeRef.current === 'unlimited') return;
    
    const maxSize = maxSizeRef.current;
    if (typeof maxSize === 'number' && imageHistories.length > 0) {
      const totalHistorySize = imageHistories.reduce((sum, h) => sum + h.history.length, 0);
      if (totalHistorySize > maxSize * imageHistories.length) {
        trimImageHistoriesToSize(maxSize);
      }
    }
  }, [imageHistories, trimImageHistoriesToSize]);

  // Apply adjustment deltas to selected images - with entry-based history
  const adjustSelected = useCallback((delta: Partial<AdjustmentState>) => {
    if (selectedIds.length === 0) {
      if (devWarningsRef.current) {
        console.warn('[useAdjustmentHistoryBatch] adjustSelected called with no selection');
      }
      return;
    }

    setImageHistories(prevHistories => {
      return prevHistories.map(imageHistory => {
        if (!selectedIds.includes(imageHistory.imageId)) {
          return imageHistory; // No change for unselected images
        }

        // Get current adjustment from current entry
        const currentEntry = imageHistory.history.find(entry => entry.id === imageHistory.currentHistoryEntryId);
        const currentAdjustment = currentEntry?.adjustment || createDefaultAdjustmentState(internalOptions.defaultAdjustmentState);
        
        // Apply deltas with clamping
        const newAdjustment = { ...currentAdjustment };
        (Object.keys(delta) as (keyof AdjustmentState)[]).forEach(key => {
          const deltaValue = delta[key];
          if (typeof deltaValue === 'number') {
            const currentValue = newAdjustment[key] as number;
            newAdjustment[key] = Math.max(-100, Math.min(100, currentValue + deltaValue)) as any;
          }
        });

        // Create new entry
        const newEntryId = generateEntryId();
        const newEntry: HistoryAdjustmentEntry = {
          id: newEntryId,
          adjustment: newAdjustment
        };

        // Add to this image's history
        const newHistory = [...imageHistory.history, newEntry];
        
        // Trim if needed
        const maxSize = maxSizeRef.current;
        const trimmedHistory = typeof maxSize === 'number' && newHistory.length > maxSize
          ? newHistory.slice(-maxSize)
          : newHistory;

        return {
          ...imageHistory,
          history: trimmedHistory,
          currentHistoryEntryId: newEntryId // Update current pointer
        };
      });
    });
  }, [selectedIds, internalOptions.defaultAdjustmentState]);

  // Set specific adjustment states for specified images (removed since not needed)

  // Undo last changes to selected images - entry-based history version
  const undo = useCallback(() => {
    if (selectedIds.length === 0) {
      if (devWarningsRef.current) {
        console.warn('[useAdjustmentHistoryBatch] Cannot undo - no images selected');
      }
      return;
    }

    let anyChanges = false;

    setImageHistories(prevHistories => {
      return prevHistories.map(imageHistory => {
        if (!selectedIds.includes(imageHistory.imageId)) {
          return imageHistory; // No change for unselected images
        }

        // Find current entry index
        const currentEntryIndex = imageHistory.history.findIndex(entry => entry.id === imageHistory.currentHistoryEntryId);
        
        if (currentEntryIndex <= 0) {
          return imageHistory; // Cannot undo if at first entry or entry not found
        }

        // Move to previous entry
        const previousEntry = imageHistory.history[currentEntryIndex - 1];
        anyChanges = true;

        return {
          ...imageHistory,
          currentHistoryEntryId: previousEntry.id
        };
      });
    });

    if (!anyChanges && devWarningsRef.current) {
      console.warn('[useAdjustmentHistoryBatch] Undo skipped - no changes to undo for selected images');
    }
  }, [selectedIds]);

  // Redo next changes to selected images - entry-based history version
  const redo = useCallback(() => {
    if (selectedIds.length === 0) {
      if (devWarningsRef.current) {
        console.warn('[useAdjustmentHistoryBatch] Cannot redo - no images selected');
      }
      return;
    }

    let anyChanges = false;

    setImageHistories(prevHistories => {
      return prevHistories.map(imageHistory => {
        if (!selectedIds.includes(imageHistory.imageId)) {
          return imageHistory; // No change for unselected images
        }

        // Find current entry index
        const currentEntryIndex = imageHistory.history.findIndex(entry => entry.id === imageHistory.currentHistoryEntryId);
        
        if (currentEntryIndex >= imageHistory.history.length - 1 || currentEntryIndex === -1) {
          return imageHistory; // Cannot redo if at last entry or entry not found
        }

        // Move to next entry
        const nextEntry = imageHistory.history[currentEntryIndex + 1];
        anyChanges = true;

        return {
          ...imageHistory,
          currentHistoryEntryId: nextEntry.id
        };
      });
    });

    if (!anyChanges && devWarningsRef.current) {
      console.warn('[useAdjustmentHistoryBatch] Redo skipped - no changes to redo for selected images');
    }
  }, [selectedIds]);

  // Check if any selected image can be undone
  const canUndoSelected = useCallback(() => {
    return selectedIds.some(imageId => {
      const imageHistory = imageHistories.find(h => h.imageId === imageId);
      if (!imageHistory) return false;
      
      const currentEntryIndex = imageHistory.history.findIndex(entry => entry.id === imageHistory.currentHistoryEntryId);
      return currentEntryIndex > 0;
    });
  }, [selectedIds, imageHistories]);

  // Check if any selected image can be redone
  const canRedoSelected = useCallback(() => {
    return selectedIds.some(imageId => {
      const imageHistory = imageHistories.find(h => h.imageId === imageId);
      if (!imageHistory) return false;
      
      const currentEntryIndex = imageHistory.history.findIndex(entry => entry.id === imageHistory.currentHistoryEntryId);
      return currentEntryIndex >= 0 && currentEntryIndex < imageHistory.history.length - 1;
    });
  }, [selectedIds, imageHistories]);

  // Reset selected images to default state - entry-based history version
  const reset = useCallback((imageIds?: string[]) => {
    const idsToReset = imageIds || selectedIds;
    if (idsToReset.length === 0) return;

    const defaultState = createDefaultAdjustmentState(internalOptions.defaultAdjustmentState);

    setImageHistories(prevHistories => {
      return prevHistories.map(imageHistory => {
        if (!idsToReset.includes(imageHistory.imageId)) {
          return imageHistory; // No change for images not being reset
        }

        // Create new entry with default state
        const newEntryId = generateEntryId();
        const newEntry: HistoryAdjustmentEntry = {
          id: newEntryId,
          adjustment: defaultState
        };

        // Add to this image's history
        const newHistory = [...imageHistory.history, newEntry];
        
        // Trim if needed
        const maxSize = maxSizeRef.current;
        const trimmedHistory = typeof maxSize === 'number' && newHistory.length > maxSize
          ? newHistory.slice(-maxSize)
          : newHistory;

        return {
          ...imageHistory,
          history: trimmedHistory,
          currentHistoryEntryId: newEntryId
        };
      });
    });
  }, [selectedIds, internalOptions.defaultAdjustmentState]);

  // Selection management with initial adjustments - single state update
  const setSelection = useCallback((configs: ImageAdjustmentConfig[]) => {
    const imageIds = configs.map(config => config.imageId);
    
    // Update selectedIds state
    setSelectedIds(imageIds);
    
    // Build new batch state with initial adjustments
    const newBatch: BatchAdjustmentState = {
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
      } else {
        // New image - determine initial state
        let initialState: AdjustmentState;
        
        if (adjustment) {
          // Use provided adjustment as initial state
          initialState = {
            ...createDefaultAdjustmentState(internalOptions.defaultAdjustmentState),
            ...adjustment
          };
        } else {
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

  // Sync adjustments for specific images - entry-based history version
  const syncAdjustment = useCallback((configs: ImageAdjustmentConfig[]) => {
    if (configs.length === 0) return;
    
    setImageHistories(prevHistories => {
      const updatedHistories = [...prevHistories];
      
      for (const config of configs) {
        const { imageId, adjustment } = config;
        
        const existingIndex = updatedHistories.findIndex(h => h.imageId === imageId);
        
        if (adjustment) {
          const fullAdjustment = {
            ...createDefaultAdjustmentState(internalOptions.defaultAdjustmentState),
            ...adjustment
          };
          
          const entryId = generateEntryId();
          const entry: HistoryAdjustmentEntry = {
            id: entryId,
            adjustment: fullAdjustment
          };
          
          if (existingIndex >= 0) {
            // Update existing image history, replace with new adjustment as initial state
            updatedHistories[existingIndex] = {
              imageId,
              currentHistoryEntryId: entryId,
              history: [entry] // Reset history with synced state
            };
          } else {
            // Add new image history
            updatedHistories.push({
              imageId,
              currentHistoryEntryId: entryId,
              history: [entry]
            });
          }
        } else if (existingIndex < 0) {
          // Add new image with default state
          const defaultState = createDefaultAdjustmentState(internalOptions.defaultAdjustmentState);
          const entryId = generateEntryId();
          const entry: HistoryAdjustmentEntry = {
            id: entryId,
            adjustment: defaultState
          };
          
          updatedHistories.push({
            imageId,
            currentHistoryEntryId: entryId,
            history: [entry]
          });
        }
      }
      
      return updatedHistories;
    });
    
    // Update allImageIds to include any new images
    const newImageIds = configs.map(c => c.imageId);
    setAllImageIds(prev => {
      const combined = Array.from(new Set([...prev, ...newImageIds]));
      return combined;
    });
    
    if (internalOptions.devWarnings) {
      const syncedImageIds = configs.map(c => c.imageId);
      console.log('[useAdjustmentHistoryBatch] Synced adjustments with entry-based history', {
        syncedImages: syncedImageIds,
        historyReset: true
      });
    }
  }, [internalOptions.defaultAdjustmentState, internalOptions.devWarnings]);

  const toggleSelection = useCallback((imageId: string) => {
    setSelectedIds(prev => {
      const isCurrentlySelected = prev.includes(imageId);
      const newSelectedIds = isCurrentlySelected 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId];
      
      // Update currentSelection in batch state
      const newBatch: BatchAdjustmentState = {
        currentSelection: { ...currentBatch.currentSelection },
        allImages: { ...currentBatch.allImages },
        initialStates: { ...currentBatch.initialStates }
      };
      
      if (isCurrentlySelected) {
        // Remove from currentSelection
        delete newBatch.currentSelection[imageId];
      } else {
        // Add to currentSelection - use existing state from allImages or create default
        if (currentBatch.allImages[imageId]) {
          newBatch.currentSelection[imageId] = { ...currentBatch.allImages[imageId] };
        } else {
          // New image - create default state
          const defaultState = createDefaultAdjustmentState(internalOptions.defaultAdjustmentState);
          newBatch.currentSelection[imageId] = { ...defaultState };
          newBatch.allImages[imageId] = { ...defaultState };
          newBatch.initialStates[imageId] = { ...defaultState };
        }
      }
      
      setCurrentBatch(newBatch);
      return newSelectedIds;
    });
  }, [currentBatch, internalOptions.defaultAdjustmentState]);

  const selectAll = useCallback(() => {
    setSelectedIds([...allImageIds]);
    
    // Update currentSelection to include all images
    const newBatch: BatchAdjustmentState = {
      currentSelection: {},
      allImages: { ...currentBatch.allImages },
      initialStates: { ...currentBatch.initialStates }
    };
    
    for (const imageId of allImageIds) {
      if (currentBatch.allImages[imageId]) {
        newBatch.currentSelection[imageId] = { ...currentBatch.allImages[imageId] };
      } else {
        // New image - create default state
        const defaultState = createDefaultAdjustmentState(internalOptions.defaultAdjustmentState);
        newBatch.currentSelection[imageId] = { ...defaultState };
        newBatch.allImages[imageId] = { ...defaultState };
        newBatch.initialStates[imageId] = { ...defaultState };
      }
    }
    
    setCurrentBatch(newBatch);
  }, [allImageIds, currentBatch, internalOptions.defaultAdjustmentState]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
    // Clear currentSelection but keep allImages and initialStates
    const newBatch: BatchAdjustmentState = {
      currentSelection: {},
      allImages: { ...currentBatch.allImages },
      initialStates: { ...currentBatch.initialStates }
    };
    setCurrentBatch(newBatch);
  }, [currentBatch]);

  // Jump to specific index - not applicable in per-image history
  const jumpToIndex = useCallback((index: number) => {
    if (devWarningsRef.current) {
      console.warn('[useAdjustmentHistoryBatch] jumpToIndex not supported in per-image history mode');
    }
  }, []);

  // Clear all history and start fresh
  const clearHistory = useCallback(() => {
    setImageHistories([]);
    setCurrentBatch(createEmptyBatchState());
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

  // Sync entire batch state - adapted for entry-based history
  const syncBatch = useCallback((newBatch: BatchAdjustmentState, targetIndex?: number) => {
    // Validate input
    if (!newBatch || typeof newBatch !== 'object' || !newBatch.currentSelection || !newBatch.allImages || !newBatch.initialStates) {
      console.warn('syncBatch: newBatch must be a valid BatchAdjustmentState object with currentSelection, allImages, and initialStates');
      return;
    }

    // Convert batch state to entry-based histories
    const newImageHistories: HistoryAdjustmentBatch[] = [];
    
    Object.entries(newBatch.allImages).forEach(([imageId, adjustment]) => {
      const entryId = generateEntryId();
      const entry: HistoryAdjustmentEntry = {
        id: entryId,
        adjustment
      };
      
      newImageHistories.push({
        imageId,
        currentHistoryEntryId: entryId,
        history: [entry] // Start with current state as single history entry
      });
    });
    
    // Update state
    setImageHistories(newImageHistories);
    setCurrentBatch({ 
      currentSelection: { ...newBatch.currentSelection },
      allImages: { ...newBatch.allImages },
      initialStates: { ...newBatch.initialStates }
    });
    
    // Update tracking
    const allImageIds = Object.keys(newBatch.allImages);
    const selectedImageIds = Object.keys(newBatch.currentSelection);
    setAllImageIds(allImageIds);
    setSelectedIds(selectedImageIds);
    
    if (devWarningsRef.current) {
      console.log('[useAdjustmentHistoryBatch] Synchronized batch state to entry-based history', {
        totalImages: allImageIds.length,
        selectedImages: selectedImageIds.length
      });
    }
  }, []);

  // Configuration actions
  const setMaxSize = useCallback((size: number | 'unlimited') => {
    maxSizeRef.current = size;
    if (size !== 'unlimited') {
      enforceMaxSize();
    }
  }, [enforceMaxSize]);

  // History info object - updated for per-image history
  const historyInfo: BatchHistoryInfo = useMemo(() => ({
    canUndo: canUndoSelected(),
    canRedo: canRedoSelected(),
    currentIndex: 0, // Not applicable in per-image history
    totalStates: imageHistories.reduce((sum, h) => sum + h.history.length, 0),
    selectedCount: selectedIds.length,
    totalImages: allImageIds.length,
    historySize: getMemoryUsage()
  }), [canUndoSelected, canRedoSelected, imageHistories, selectedIds.length, allImageIds.length, getMemoryUsage]);

  // Actions object - stabilized with useMemo
  const actions: BatchHistoryActions = useMemo(() => ({
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
  const config: BatchHistoryConfig = useMemo(() => ({
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
