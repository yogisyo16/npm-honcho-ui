import { AdjustmentState } from './editor/useHonchoEditor';
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
export declare function useAdjustmentHistoryBatch(options?: BatchHistoryOptions): UseAdjustmentHistoryBatchReturn;
export {};
