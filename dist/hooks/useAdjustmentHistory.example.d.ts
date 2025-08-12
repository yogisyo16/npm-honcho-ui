import { type HistoryInfo } from './useAdjustmentHistory';
import { AdjustmentState } from './editor/useHonchoEditor';
export declare function useEditorWithHistory(): {
    adjustments: AdjustmentState;
    canUndo: boolean;
    canRedo: boolean;
    undo: () => void;
    redo: () => void;
    updateTemperature: (newTemp: number) => void;
    applyPresetWithSmoothUI: (presetState: AdjustmentState) => void;
    updateMultipleAdjustments: (updates: Partial<AdjustmentState>) => void;
    resetAdjustments: () => void;
    jumpToIndex: (index: number) => void;
    getHistory: () => AdjustmentState[];
    clearHistory: () => void;
    setBatchMode: (enabled: boolean) => void;
    setMaxSize: (size: number | "unlimited") => void;
    getMemoryUsage: () => number;
    historyInfo: HistoryInfo;
};
/**
 * Example integration with your existing useHonchoEditor pattern
 */
export declare function integrateWithHonchoEditor(): {
    currentAdjustments: AdjustmentState;
    canUndo: boolean;
    canRedo: boolean;
    handleSliderChange: (key: keyof AdjustmentState, value: number) => void;
    handlePresetWithAnimation: (presetState: AdjustmentState) => Promise<void>;
    handleUndo: () => void;
    handleRedo: () => void;
    handleRevert: () => void;
};
