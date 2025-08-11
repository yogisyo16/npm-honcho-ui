import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
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
 * Compare two AdjustmentState objects for equality
 * Uses JSON.stringify for deep comparison of all adjustment values
 */
const compareAdjustmentStates = (a: AdjustmentState, b: AdjustmentState): boolean => {
    try {
        return JSON.stringify(a) === JSON.stringify(b);
    } catch (error) {
        // Fallback to manual comparison if JSON.stringify fails
        console.warn('Failed to compare adjustment states with JSON.stringify, falling back to manual comparison:', error);
        return (
            a.tempScore === b.tempScore &&
            a.tintScore === b.tintScore &&
            a.vibranceScore === b.vibranceScore &&
            a.saturationScore === b.saturationScore &&
            a.exposureScore === b.exposureScore &&
            a.highlightsScore === b.highlightsScore &&
            a.shadowsScore === b.shadowsScore &&
            a.whitesScore === b.whitesScore &&
            a.blacksScore === b.blacksScore &&
            a.contrastScore === b.contrastScore &&
            a.clarityScore === b.clarityScore &&
            a.sharpnessScore === b.sharpnessScore
        );
    }
};

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
export function useAdjustmentHistory(
    initialState: AdjustmentState,
    options: HistoryOptions = {}
): UseAdjustmentHistoryReturn {
    // Internal stabilization - prevent re-renders from options object recreation
    const internalOptions = useMemo(() => ({
        maxSize: options.maxSize ?? 'unlimited' as const,
        enableBatching: options.enableBatching ?? false,
        devWarnings: options.devWarnings ?? false
    }), [
        options.maxSize, 
        options.enableBatching, 
        options.devWarnings
    ]);

    // Core state management
    const [history, setHistory] = useState<AdjustmentState[]>([initialState]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Batch mode state - ref to avoid triggering effects
    const batchModeRef = useRef(internalOptions.enableBatching);
    const batchStartIndexRef = useRef<number | null>(null);
    
    // Configuration refs - prevent re-renders when config changes
    const maxSizeRef = useRef(internalOptions.maxSize);
    const devWarningsRef = useRef(internalOptions.devWarnings);

    // Performance monitoring
    const performanceRef = useRef({
        lastHistorySize: 1,
        lastUpdateTime: Date.now(),
        largeHistoryWarningShown: false
    });

    // Get current state from history
    const currentState = history[currentIndex];

    // Memory usage estimation (approximate bytes)
    const getMemoryUsage = useCallback(() => {
        try {
            const historyString = JSON.stringify(history);
            return historyString.length * 2; // Rough estimate: 2 bytes per character
        } catch (error) {
            console.warn('Failed to estimate memory usage:', error);
            return history.length * 1000; // Fallback estimate
        }
    }, [history]);

    // Development warnings for performance
    const checkPerformance = useCallback(() => {
        if (!devWarningsRef.current) return;

        const now = Date.now();
        const perfData = performanceRef.current;
        
        // Warn about large history sizes
        if (history.length > 1000 && !perfData.largeHistoryWarningShown) {
            console.warn(`useAdjustmentHistory: Large history size detected (${history.length} entries). Consider setting a maxSize limit.`);
            perfData.largeHistoryWarningShown = true;
        }

        // Update performance tracking
        perfData.lastHistorySize = history.length;
        perfData.lastUpdateTime = now;
    }, [history.length]);

    // Trim history to specified size, keeping most recent entries
    const trimHistoryToSize = useCallback((size: number) => {
        if (size <= 0) return;
        
        setHistory(prevHistory => {
            if (prevHistory.length <= size) return prevHistory;
            
            const startIndex = Math.max(0, prevHistory.length - size);
            const trimmedHistory = prevHistory.slice(startIndex);
            
            // Adjust current index to maintain relative position
            setCurrentIndex(prevIndex => {
                const adjustedIndex = prevIndex - startIndex;
                return Math.max(0, Math.min(adjustedIndex, trimmedHistory.length - 1));
            });
            
            return trimmedHistory;
        });
    }, []);

    // Apply max size limit when history grows
    const enforceMaxSize = useCallback(() => {
        if (maxSizeRef.current === 'unlimited') return;
        
        const maxSize = maxSizeRef.current;
        if (history.length > maxSize) {
            trimHistoryToSize(maxSize);
        }
    }, [history.length, trimHistoryToSize]);

    // Push new state to history
    const pushState = useCallback((newState: AdjustmentState) => {
        // Skip if state hasn't changed
        if (compareAdjustmentStates(newState, currentState)) {
            return;
        }

        setHistory(prevHistory => {
            let newHistory: AdjustmentState[];
            
            if (batchModeRef.current && batchStartIndexRef.current !== null) {
                // In batch mode: replace everything from batch start to current
                const beforeBatch = prevHistory.slice(0, batchStartIndexRef.current);
                newHistory = [...beforeBatch, newState];
                setCurrentIndex(beforeBatch.length);
            } else {
                // Normal mode: truncate forward history and add new state
                const truncatedHistory = prevHistory.slice(0, currentIndex + 1);
                newHistory = [...truncatedHistory, newState];
                setCurrentIndex(truncatedHistory.length);
            }

            return newHistory;
        });
    }, [currentState, currentIndex]);

    // Undo to previous state
    const undo = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            
            // Exit batch mode when undoing
            if (batchModeRef.current) {
                batchModeRef.current = false;
                batchStartIndexRef.current = null;
            }
        }
    }, [currentIndex]);

    // Redo to next state
    const redo = useCallback(() => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }, [currentIndex, history.length]);

    // Reset history with new initial state
    const reset = useCallback((newInitialState: AdjustmentState) => {
        setHistory([newInitialState]);
        setCurrentIndex(0);
        batchModeRef.current = internalOptions.enableBatching;
        batchStartIndexRef.current = null;
    }, [internalOptions.enableBatching]);

    // Jump to specific index in history
    const jumpToIndex = useCallback((index: number) => {
        if (index >= 0 && index < history.length) {
            setCurrentIndex(index);
            
            // Exit batch mode when jumping
            if (batchModeRef.current) {
                batchModeRef.current = false;
                batchStartIndexRef.current = null;
            }
        }
    }, [history.length]);

    // Clear all history and start fresh
    const clearHistory = useCallback(() => {
        const currentStateValue = history[currentIndex];
        setHistory([currentStateValue]);
        setCurrentIndex(0);
        batchModeRef.current = internalOptions.enableBatching;
        batchStartIndexRef.current = null;
    }, [history, currentIndex, internalOptions.enableBatching]);

    // Get copy of entire history
    const getHistory = useCallback(() => {
        return [...history];
    }, [history]);

    // Manually trim history
    const trimHistory = useCallback((keepLast: number) => {
        trimHistoryToSize(keepLast);
    }, [trimHistoryToSize]);

    // Configuration setters
    const setMaxSize = useCallback((size: number | 'unlimited') => {
        maxSizeRef.current = size;
        if (size !== 'unlimited') {
            enforceMaxSize();
        }
    }, [enforceMaxSize]);

    const setBatchMode = useCallback((enabled: boolean) => {
        const wasInBatch = batchModeRef.current;
        batchModeRef.current = enabled;
        
        if (enabled && !wasInBatch) {
            // Starting batch mode - mark current position as batch start
            batchStartIndexRef.current = currentIndex;
        } else if (!enabled && wasInBatch) {
            // Ending batch mode - clear batch start
            batchStartIndexRef.current = null;
        }
    }, [currentIndex]);

    // History info object
    const historyInfo: HistoryInfo = useMemo(() => ({
        canUndo: currentIndex > 0,
        canRedo: currentIndex < history.length - 1,
        currentIndex,
        totalStates: history.length,
        historySize: getMemoryUsage(),
        isBatchMode: batchModeRef.current
    }), [currentIndex, history.length, getMemoryUsage]);

    // Actions object - stabilized with useMemo
    const actions: HistoryActions = useMemo(() => ({
        pushState,
        undo,
        redo,
        reset,
        jumpToIndex,
        clearHistory,
        getHistory,
        trimHistory
    }), [pushState, undo, redo, reset, jumpToIndex, clearHistory, getHistory, trimHistory]);

    // Config object - stabilized with useMemo
    const config: HistoryConfig = useMemo(() => ({
        setMaxSize,
        setBatchMode,
        getMemoryUsage
    }), [setMaxSize, setBatchMode, getMemoryUsage]);

    // Apply max size enforcement when history changes
    useEffect(() => {
        enforceMaxSize();
        checkPerformance();
    }, [enforceMaxSize, checkPerformance]);

    return {
        currentState,
        historyInfo,
        actions,
        config
    };
}
