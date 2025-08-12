import { AdjustmentState } from './editor/useHonchoEditor';
/**
 * Configuration options for the adjustment history hook
 */
interface HistoryOptions {
    /** Maximum number of history entries to keep. Use 'unlimited' for no limit */
    maxSize?: number | 'unlimited';
    /** Whether to enable batch mode for grouping multiple changes */
    enableBatching?: boolean;
    /** Enable development warnings for performance issues */
    devWarnings?: boolean;
}
/**
 * Information about the current history state
 */
export interface HistoryInfo {
    /** Whether undo operation is available */
    canUndo: boolean;
    /** Whether redo operation is available */
    canRedo: boolean;
    /** Current position in history (0-based index) */
    currentIndex: number;
    /** Total number of states in history */
    totalStates: number;
    /** Current size of history in memory */
    historySize: number;
    /** Whether batch mode is currently active */
    isBatchMode: boolean;
}
/**
 * Actions available for history management
 */
export interface HistoryActions {
    /** Add a new adjustment state to history */
    pushState: (state: AdjustmentState) => void;
    /** Undo to previous adjustment state */
    undo: () => void;
    /** Redo to next adjustment state */
    redo: () => void;
    /** Reset history with new initial adjustment state */
    reset: (newInitialState: AdjustmentState) => void;
    /** Jump to specific index in history */
    jumpToIndex: (index: number) => void;
    /** Clear all history and start fresh */
    clearHistory: () => void;
    /** Get a copy of the entire history array */
    getHistory: () => AdjustmentState[];
    /** Trim history to specified size, keeping most recent entries */
    trimHistory: (keepLast: number) => void;
}
/**
 * Configuration actions for runtime adjustment
 */
export interface HistoryConfig {
    /** Set maximum history size */
    setMaxSize: (size: number | 'unlimited') => void;
    /** Enable or disable batch mode */
    setBatchMode: (enabled: boolean) => void;
    /** Get current memory usage estimate */
    getMemoryUsage: () => number;
}
/**
 * Return type for the useAdjustmentHistory hook
 */
export interface UseAdjustmentHistoryReturn {
    /** Current adjustment state value */
    currentState: AdjustmentState;
    /** Information about history state */
    historyInfo: HistoryInfo;
    /** Available history actions */
    actions: HistoryActions;
    /** Configuration options */
    config: HistoryConfig;
}
/**
 * Advanced hook for managing AdjustmentState history with undo/redo functionality.
 *
 * Features:
 * - Unlimited or configurable history size
 * - Batch mode for grouping multiple changes into single undo operations
 * - Memory usage monitoring and optimization
 * - Internal stabilization to prevent re-render issues
 * - Jump to any point in history
 * - Automatic AdjustmentState comparison
 *
 * @param initialState - The initial AdjustmentState value
 * @param options - Configuration options for history behavior
 * @returns Object with current state, history info, actions, and config
 */
export declare function useAdjustmentHistory(initialState: AdjustmentState, options?: HistoryOptions): UseAdjustmentHistoryReturn;
export {};
