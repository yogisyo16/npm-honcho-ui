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

    // Example: Apply preset with batch mode
    const applyPreset = (presetState: AdjustmentState) => {
        // Enable batch mode to group all preset changes into one undo operation
        config.setBatchMode(true);
        
        // Apply the preset
        actions.pushState(presetState);
        
        // Disable batch mode to commit the changes
        config.setBatchMode(false);
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
        applyPreset,
        updateMultipleAdjustments,
        resetAdjustments,
        
        // Advanced features
        jumpToIndex: actions.jumpToIndex,
        getHistory: actions.getHistory,
        clearHistory: actions.clearHistory,
        
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
    
    // Your existing undo/redo handlers become:
    const handleUndo = history.actions.undo;
    const handleRedo = history.actions.redo;
    const handleRevert = () => history.actions.reset(initialAdjustments);
    
    return {
        currentAdjustments,
        canUndo,
        canRedo,
        handleSliderChange,
        handleUndo,
        handleRedo,
        handleRevert
    };
}
