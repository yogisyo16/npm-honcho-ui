import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useAdjustmentHistory } from './useAdjustmentHistory';
const initialAdjustments = {
    tempScore: 0, tintScore: 0, vibranceScore: 0, saturationScore: 0,
    exposureScore: 0, highlightsScore: 0, shadowsScore: 0, whitesScore: 0,
    blacksScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
};
/**
 * Demo component showing batch mode behavior
 */
export function BatchModeDemo() {
    const { currentState, historyInfo, actions, config } = useAdjustmentHistory(initialAdjustments);
    const [updateCount, setUpdateCount] = useState(0);
    // Track UI updates
    React.useEffect(() => {
        setUpdateCount(prev => prev + 1);
    }, [currentState]);
    const handleBatchUpdates = async () => {
        setUpdateCount(0); // Reset counter
        console.log('Starting batch mode...');
        config.setBatchMode(true);
        // These will update currentState 4 times (UI updates)
        console.log('Push state 1...');
        actions.pushState({ ...currentState, tempScore: 25 });
        console.log('Push state 2...');
        actions.pushState({ ...currentState, tempScore: 50 });
        console.log('Push state 3...');
        actions.pushState({ ...currentState, tempScore: 75 });
        console.log('Push state 4...');
        actions.pushState({ ...currentState, tempScore: 100 });
        console.log('Ending batch mode...');
        config.setBatchMode(false); // Only now will 1 history entry be created
        console.log('Batch complete!');
    };
    const handleInstantUpdates = () => {
        setUpdateCount(0); // Reset counter
        // These will create 4 history entries (normal mode)
        actions.pushState({ ...currentState, tintScore: 25 });
        actions.pushState({ ...currentState, tintScore: 50 });
        actions.pushState({ ...currentState, tintScore: 75 });
        actions.pushState({ ...currentState, tintScore: 100 });
    };
    return (_jsxs("div", { style: { padding: '20px', fontFamily: 'monospace' }, children: [_jsx("h2", { children: "Batch Mode Demo" }), _jsxs("div", { style: { marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5' }, children: [_jsx("strong", { children: "Current State:" }), _jsxs("div", { children: ["Temperature: ", currentState.tempScore] }), _jsxs("div", { children: ["Tint: ", currentState.tintScore] }), _jsxs("div", { children: ["UI Updates: ", updateCount] }), _jsxs("div", { children: ["History Size: ", historyInfo.totalStates] }), _jsxs("div", { children: ["Can Undo: ", historyInfo.canUndo ? 'Yes' : 'No'] }), _jsxs("div", { children: ["Batch Mode: ", historyInfo.isBatchMode ? 'Active' : 'Inactive'] })] }), _jsxs("div", { style: { display: 'flex', gap: '10px', marginBottom: '20px' }, children: [_jsx("button", { onClick: handleBatchUpdates, style: { padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }, children: "Batch Mode (4 UI updates, 1 history entry)" }), _jsx("button", { onClick: handleInstantUpdates, style: { padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none' }, children: "Normal Mode (4 UI updates, 4 history entries)" })] }), _jsxs("div", { style: { display: 'flex', gap: '10px' }, children: [_jsx("button", { onClick: actions.undo, disabled: !historyInfo.canUndo, style: {
                            padding: '10px',
                            backgroundColor: historyInfo.canUndo ? '#FF9800' : '#ccc',
                            color: 'white',
                            border: 'none'
                        }, children: "Undo" }), _jsx("button", { onClick: actions.redo, disabled: !historyInfo.canRedo, style: {
                            padding: '10px',
                            backgroundColor: historyInfo.canRedo ? '#9C27B0' : '#ccc',
                            color: 'white',
                            border: 'none'
                        }, children: "Redo" }), _jsx("button", { onClick: () => actions.reset(initialAdjustments), style: { padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none' }, children: "Reset" })] }), _jsxs("div", { style: { marginTop: '20px', fontSize: '12px', color: '#666' }, children: [_jsx("h3", { children: "How it works:" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "Batch Mode:" }), " UI updates immediately on each pushState, but only final state is saved to history when batch ends"] }), _jsxs("li", { children: [_jsx("strong", { children: "Normal Mode:" }), " Each pushState creates both UI update and history entry"] }), _jsxs("li", { children: [_jsx("strong", { children: "Result:" }), " Smooth UI animations with clean undo/redo history"] })] })] })] }));
}
/**
 * Example showing smooth preset application
 */
export function SmoothPresetDemo() {
    const { currentState, historyInfo, actions, config } = useAdjustmentHistory(initialAdjustments);
    const dramaticPreset = {
        tempScore: 50, tintScore: -20, vibranceScore: 80, saturationScore: 60,
        exposureScore: 30, highlightsScore: -40, shadowsScore: 40, whitesScore: 20,
        blacksScore: -30, contrastScore: 70, clarityScore: 50, sharpnessScore: 40,
    };
    const handleSmoothPreset = async () => {
        config.setBatchMode(true);
        // Create smooth transition with multiple steps
        const steps = 8;
        for (let i = 1; i <= steps; i++) {
            const progress = i / steps;
            const intermediateState = {
                tempScore: Math.round(currentState.tempScore + (dramaticPreset.tempScore - currentState.tempScore) * progress),
                tintScore: Math.round(currentState.tintScore + (dramaticPreset.tintScore - currentState.tintScore) * progress),
                vibranceScore: Math.round(currentState.vibranceScore + (dramaticPreset.vibranceScore - currentState.vibranceScore) * progress),
                saturationScore: Math.round(currentState.saturationScore + (dramaticPreset.saturationScore - currentState.saturationScore) * progress),
                exposureScore: Math.round(currentState.exposureScore + (dramaticPreset.exposureScore - currentState.exposureScore) * progress),
                highlightsScore: Math.round(currentState.highlightsScore + (dramaticPreset.highlightsScore - currentState.highlightsScore) * progress),
                shadowsScore: Math.round(currentState.shadowsScore + (dramaticPreset.shadowsScore - currentState.shadowsScore) * progress),
                whitesScore: Math.round(currentState.whitesScore + (dramaticPreset.whitesScore - currentState.whitesScore) * progress),
                blacksScore: Math.round(currentState.blacksScore + (dramaticPreset.blacksScore - currentState.blacksScore) * progress),
                contrastScore: Math.round(currentState.contrastScore + (dramaticPreset.contrastScore - currentState.contrastScore) * progress),
                clarityScore: Math.round(currentState.clarityScore + (dramaticPreset.clarityScore - currentState.clarityScore) * progress),
                sharpnessScore: Math.round(currentState.sharpnessScore + (dramaticPreset.sharpnessScore - currentState.sharpnessScore) * progress),
            };
            actions.pushState(intermediateState);
            // Small delay for smooth animation
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        config.setBatchMode(false); // Commit final state
    };
    return (_jsxs("div", { style: { padding: '20px', fontFamily: 'monospace' }, children: [_jsx("h2", { children: "Smooth Preset Application" }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px', fontSize: '12px' }, children: [_jsxs("div", { children: ["Temp: ", currentState.tempScore] }), _jsxs("div", { children: ["Tint: ", currentState.tintScore] }), _jsxs("div", { children: ["Vibrance: ", currentState.vibranceScore] }), _jsxs("div", { children: ["Saturation: ", currentState.saturationScore] }), _jsxs("div", { children: ["Exposure: ", currentState.exposureScore] }), _jsxs("div", { children: ["Highlights: ", currentState.highlightsScore] }), _jsxs("div", { children: ["Shadows: ", currentState.shadowsScore] }), _jsxs("div", { children: ["Whites: ", currentState.whitesScore] }), _jsxs("div", { children: ["Blacks: ", currentState.blacksScore] }), _jsxs("div", { children: ["Contrast: ", currentState.contrastScore] }), _jsxs("div", { children: ["Clarity: ", currentState.clarityScore] }), _jsxs("div", { children: ["Sharpness: ", currentState.sharpnessScore] })] }), _jsx("button", { onClick: handleSmoothPreset, style: {
                    padding: '15px 30px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    fontSize: '16px',
                    marginRight: '10px'
                }, children: "Apply Dramatic Preset (Smooth)" }), _jsx("button", { onClick: actions.undo, disabled: !historyInfo.canUndo, style: {
                    padding: '15px 30px',
                    backgroundColor: historyInfo.canUndo ? '#FF9800' : '#ccc',
                    color: 'white',
                    border: 'none',
                    fontSize: '16px'
                }, children: "Undo Preset" }), _jsx("div", { style: { marginTop: '20px', fontSize: '12px', color: '#666' }, children: _jsx("p", { children: "This demo shows smooth preset application with 8 intermediate steps, but only 1 undo operation!" }) })] }));
}
