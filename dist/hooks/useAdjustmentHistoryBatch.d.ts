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
export declare function useAdjustmentHistoryBatch(imageIds: string[], options?: BatchHistoryOptions): UseAdjustmentHistoryBatchReturn;
export {};
