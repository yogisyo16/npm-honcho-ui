import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
/**
 * Compare two AdjustmentState objects for equality
 * Uses JSON.stringify for deep comparison of all adjustment values
 */
const compareAdjustmentStates = (a, b) => {
    try {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    catch (error) {
        // Fallback to manual comparison if JSON.stringify fails
        console.warn('Failed to compare adjustment states with JSON.stringify, falling back to manual comparison:', error);
        return (a.tempScore === b.tempScore &&
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
            a.sharpnessScore === b.sharpnessScore);
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
export function useAdjustmentHistory(initialState, options = {}) {
    // Internal stabilization - prevent re-renders from options object recreation
    const internalOptions = useMemo(() => ({
        maxSize: options.maxSize ?? 'unlimited',
        enableBatching: options.enableBatching ?? false,
        devWarnings: options.devWarnings ?? false
    }), [
        options.maxSize,
        options.enableBatching,
        options.devWarnings
    ]);
    // Core state management
    const [history, setHistory] = useState([initialState]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentState, setCurrentState] = useState(initialState);
    // Batch mode state - ref to avoid triggering effects
    const batchModeRef = useRef(internalOptions.enableBatching);
    const batchStartIndexRef = useRef(null);
    const batchStartStateRef = useRef(null);
    // Configuration refs - prevent re-renders when config changes
    const maxSizeRef = useRef(internalOptions.maxSize);
    const devWarningsRef = useRef(internalOptions.devWarnings);
    // Performance monitoring
    const performanceRef = useRef({
        lastHistorySize: 1,
        lastUpdateTime: Date.now(),
        largeHistoryWarningShown: false
    });
    // Sync currentState with history when not in batch mode
    useEffect(() => {
        if (!batchModeRef.current) {
            setCurrentState(history[currentIndex]);
        }
    }, [history, currentIndex]);
    const getMemoryUsage = useCallback(() => {
        try {
            const historyString = JSON.stringify(history);
            return historyString.length * 2; // Rough estimate: 2 bytes per character
        }
        catch (error) {
            console.warn('Failed to estimate memory usage:', error);
            return history.length * 1000; // Fallback estimate
        }
    }, [history]);
    // Development warnings for performance
    const checkPerformance = useCallback(() => {
        if (!devWarningsRef.current)
            return;
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
    const trimHistoryToSize = useCallback((size) => {
        if (size <= 0)
            return;
        setHistory(prevHistory => {
            if (prevHistory.length <= size)
                return prevHistory;
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
        if (maxSizeRef.current === 'unlimited')
            return;
        const maxSize = maxSizeRef.current;
        if (history.length > maxSize) {
            trimHistoryToSize(maxSize);
        }
    }, [history.length, trimHistoryToSize]);
    // Push new state to history
    const pushState = useCallback((newState) => {
        // Skip if state hasn't changed
        if (compareAdjustmentStates(newState, currentState)) {
            return;
        }
        // Always update currentState immediately for smooth UI
        setCurrentState(newState);
        if (batchModeRef.current) {
            // In batch mode: Don't update history yet, just update UI state
            // History will be updated when batch mode ends
            return;
        }
        // Normal mode: Update history immediately
        setHistory(prevHistory => {
            const truncatedHistory = prevHistory.slice(0, currentIndex + 1);
            const newHistory = [...truncatedHistory, newState];
            setCurrentIndex(newHistory.length - 1);
            return newHistory;
        });
    }, [currentState, currentIndex]);
    // Undo to previous state
    const undo = useCallback(() => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            setCurrentState(history[newIndex]);
            // Exit batch mode when undoing
            if (batchModeRef.current) {
                batchModeRef.current = false;
                batchStartIndexRef.current = null;
                batchStartStateRef.current = null;
            }
        }
    }, [currentIndex, history]);
    // Redo to next state
    const redo = useCallback(() => {
        if (currentIndex < history.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            setCurrentState(history[newIndex]);
        }
    }, [currentIndex, history]);
    // Reset history with new initial state
    const reset = useCallback((newInitialState) => {
        setHistory([newInitialState]);
        setCurrentIndex(0);
        setCurrentState(newInitialState);
        batchModeRef.current = internalOptions.enableBatching;
        batchStartIndexRef.current = null;
        batchStartStateRef.current = null;
    }, [internalOptions.enableBatching]);
    // Jump to specific index in history
    const jumpToIndex = useCallback((index) => {
        if (index >= 0 && index < history.length) {
            setCurrentIndex(index);
            setCurrentState(history[index]);
            // Exit batch mode when jumping
            if (batchModeRef.current) {
                batchModeRef.current = false;
                batchStartIndexRef.current = null;
                batchStartStateRef.current = null;
            }
        }
    }, [history]);
    // Clear all history and start fresh
    const clearHistory = useCallback(() => {
        setHistory([currentState]);
        setCurrentIndex(0);
        batchModeRef.current = internalOptions.enableBatching;
        batchStartIndexRef.current = null;
        batchStartStateRef.current = null;
    }, [currentState, internalOptions.enableBatching]);
    // Get copy of entire history
    const getHistory = useCallback(() => {
        return [...history];
    }, [history]);
    // Manually trim history
    const trimHistory = useCallback((keepLast) => {
        trimHistoryToSize(keepLast);
    }, [trimHistoryToSize]);
    // Configuration setters
    const setMaxSize = useCallback((size) => {
        maxSizeRef.current = size;
        if (size !== 'unlimited') {
            enforceMaxSize();
        }
    }, [enforceMaxSize]);
    const setBatchMode = useCallback((enabled) => {
        const wasInBatch = batchModeRef.current;
        if (enabled && !wasInBatch) {
            // Starting batch mode - save current state as batch start
            batchModeRef.current = true;
            batchStartIndexRef.current = currentIndex;
            batchStartStateRef.current = currentState;
        }
        else if (!enabled && wasInBatch) {
            // Ending batch mode - commit final state to history
            batchModeRef.current = false;
            // Only add to history if state actually changed from batch start
            if (batchStartStateRef.current &&
                !compareAdjustmentStates(currentState, batchStartStateRef.current)) {
                setHistory(prevHistory => {
                    const truncatedHistory = prevHistory.slice(0, batchStartIndexRef.current + 1);
                    const newHistory = [...truncatedHistory, currentState];
                    setCurrentIndex(newHistory.length - 1);
                    return newHistory;
                });
            }
            batchStartIndexRef.current = null;
            batchStartStateRef.current = null;
        }
    }, [currentIndex, currentState]);
    // History info object
    const historyInfo = useMemo(() => ({
        canUndo: currentIndex > 0,
        canRedo: currentIndex < history.length - 1,
        currentIndex,
        totalStates: history.length,
        historySize: getMemoryUsage(),
        isBatchMode: batchModeRef.current
    }), [currentIndex, history.length, getMemoryUsage]);
    // Actions object - stabilized with useMemo
    const actions = useMemo(() => ({
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
    const config = useMemo(() => ({
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
