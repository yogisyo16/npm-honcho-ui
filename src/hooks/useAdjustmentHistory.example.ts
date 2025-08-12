import { useAdjustmentHistory, type HistoryInfo } from './useAdjustmentHistory';
import { AdjustmentState } from './editor/useHonchoEditor';

/**
 * Example usage of the simplified useAdjustmentHistory hook
 * This shows how to integrate it with your existing useHonchoEditor
 */

// Example initial adjustment state
const initialAdjustments: AdjustmentState = {
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
};

export function useEditorWithHistory() {
    // Initialize the adjustment history hook
    const {
        currentState: currentAdjustments,
        historyInfo,
        actions,
        config
    } = useAdjustmentHistory(initialAdjustments, {
        maxSize: 100, // Keep last 100 states
        enableBatching: false, // Start with batching disabled
        devWarnings: true // Show performance warnings in development
    });

    // Example: Update a single adjustment value
    const updateTemperature = (newTemp: number) => {
        const newState: AdjustmentState = {
            ...currentAdjustments,
            tempScore: newTemp
        };
        actions.pushState(newState);
    };

    // Example: Apply preset with batch mode for smooth UI updates
    const applyPresetWithSmoothUI = (presetState: AdjustmentState) => {
        // Enable batch mode to group all changes into one undo operation
        config.setBatchMode(true);
        
        // These will update the UI immediately but not create history entries
        actions.pushState({ ...currentAdjustments, tempScore: presetState.tempScore });
        actions.pushState({ ...currentAdjustments, tempScore: presetState.tempScore, tintScore: presetState.tintScore });
        actions.pushState({ ...currentAdjustments, tempScore: presetState.tempScore, tintScore: presetState.tintScore, exposureScore: presetState.exposureScore });
        actions.pushState(presetState); // Final complete state
        
        // Disable batch mode to commit only the final state to history
        config.setBatchMode(false);
        
        // Result: UI updated 4 times (smooth animation), but only 1 undo operation
    };

    // Example: Bulk update multiple adjustments
    const updateMultipleAdjustments = (updates: Partial<AdjustmentState>) => {
        config.setBatchMode(true); // Start batching
        
        const newState: AdjustmentState = {
            ...currentAdjustments,
            ...updates
        };
        
        actions.pushState(newState);
        config.setBatchMode(false); // Commit batch
    };

    // Example: Load saved history from storage or API
    const loadSavedHistory = (savedStates: AdjustmentState[]) => {
        // Load complete history and set to last state
        actions.syncHistory(savedStates);
    };

    // Example: Load history and jump to specific point
    const loadHistoryToSpecificPoint = (savedStates: AdjustmentState[], targetIndex: number) => {
        // Load history and set current position to specific index
        actions.syncHistory(savedStates, targetIndex);
    };

    // Example: Merge current history with new states
    const mergeWithNewStates = (newStates: AdjustmentState[]) => {
        const currentHistory = actions.getHistory();
        const mergedHistory = [...currentHistory, ...newStates];
        actions.syncHistory(mergedHistory);
    };

    // Example: Replace with preset variations
    const loadPresetVariations = () => {
        const variations: AdjustmentState[] = [
            initialAdjustments, // Original
            { ...initialAdjustments, tempScore: 25 }, // Warm
            { ...initialAdjustments, tempScore: -25 }, // Cool
            { ...initialAdjustments, exposureScore: 20 }, // Bright
            { ...initialAdjustments, exposureScore: -20 }, // Dark
        ];
        
        actions.syncHistory(variations, 0); // Load variations, start at original
    };

    // Example: Reset to initial state
    const resetAdjustments = () => {
        actions.reset(initialAdjustments);
    };

    return {
        // Current adjustment values
        adjustments: currentAdjustments,
        
        // History controls
        canUndo: historyInfo.canUndo,
        canRedo: historyInfo.canRedo,
        undo: actions.undo,
        redo: actions.redo,
        
        // Adjustment functions
        updateTemperature,
        applyPresetWithSmoothUI,
        updateMultipleAdjustments,
        loadSavedHistory,
        loadHistoryToSpecificPoint,
        mergeWithNewStates,
        loadPresetVariations,
        resetAdjustments,
        
        // Advanced features
        jumpToIndex: actions.jumpToIndex,
        getHistory: actions.getHistory,
        clearHistory: actions.clearHistory,
        syncHistory: actions.syncHistory,
        
        // Configuration
        setBatchMode: config.setBatchMode,
        setMaxSize: config.setMaxSize,
        getMemoryUsage: config.getMemoryUsage,
        
        // History info
        historyInfo
    };
}

/**
 * Example integration with your existing useHonchoEditor pattern
 */
export function integrateWithHonchoEditor() {
    const history = useAdjustmentHistory(initialAdjustments);
    
    // Replace your current manual history management with this:
    
    // Instead of:
    // const [history, setHistory] = useState<AdjustmentState[]>([initialAdjustments]);
    // const [historyIndex, setHistoryIndex] = useState(0);
    
    // Use:
    const currentAdjustments = history.currentState;
    const canUndo = history.historyInfo.canUndo;
    const canRedo = history.historyInfo.canRedo;
    
    // When any adjustment changes (e.g., slider value):
    const handleSliderChange = (key: keyof AdjustmentState, value: number) => {
        const newState: AdjustmentState = {
            ...currentAdjustments,
            [key]: value
        };
        history.actions.pushState(newState);
    };
    
    // Smooth preset application with multiple UI updates
    const handlePresetWithAnimation = async (presetState: AdjustmentState) => {
        history.config.setBatchMode(true);
        
        // Animate through intermediate states for smooth UI
        const steps = 4;
        for (let i = 1; i <= steps; i++) {
            const progress = i / steps;
            const intermediateState: AdjustmentState = {
                tempScore: Math.round(currentAdjustments.tempScore + (presetState.tempScore - currentAdjustments.tempScore) * progress),
                tintScore: Math.round(currentAdjustments.tintScore + (presetState.tintScore - currentAdjustments.tintScore) * progress),
                vibranceScore: Math.round(currentAdjustments.vibranceScore + (presetState.vibranceScore - currentAdjustments.vibranceScore) * progress),
                saturationScore: Math.round(currentAdjustments.saturationScore + (presetState.saturationScore - currentAdjustments.saturationScore) * progress),
                exposureScore: Math.round(currentAdjustments.exposureScore + (presetState.exposureScore - currentAdjustments.exposureScore) * progress),
                highlightsScore: Math.round(currentAdjustments.highlightsScore + (presetState.highlightsScore - currentAdjustments.highlightsScore) * progress),
                shadowsScore: Math.round(currentAdjustments.shadowsScore + (presetState.shadowsScore - currentAdjustments.shadowsScore) * progress),
                whitesScore: Math.round(currentAdjustments.whitesScore + (presetState.whitesScore - currentAdjustments.whitesScore) * progress),
                blacksScore: Math.round(currentAdjustments.blacksScore + (presetState.blacksScore - currentAdjustments.blacksScore) * progress),
                contrastScore: Math.round(currentAdjustments.contrastScore + (presetState.contrastScore - currentAdjustments.contrastScore) * progress),
                clarityScore: Math.round(currentAdjustments.clarityScore + (presetState.clarityScore - currentAdjustments.clarityScore) * progress),
                sharpnessScore: Math.round(currentAdjustments.sharpnessScore + (presetState.sharpnessScore - currentAdjustments.sharpnessScore) * progress),
            };
            
            history.actions.pushState(intermediateState);
            
            // Small delay for smooth animation
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        history.config.setBatchMode(false); // Commit only final state to history
    };
    
    // Your existing undo/redo handlers become:
    const handleUndo = history.actions.undo;
    const handleRedo = history.actions.redo;
    const handleRevert = () => history.actions.reset(initialAdjustments);
    
    return {
        currentAdjustments,
        canUndo,
        canRedo,
        handleSliderChange,
        handlePresetWithAnimation,
        handleUndo,
        handleRedo,
        handleRevert
    };
}
