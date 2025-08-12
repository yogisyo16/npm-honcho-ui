import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAdjustmentHistory } from './useAdjustmentHistory';
const initialAdjustments = {
    tempScore: 0, tintScore: 0, vibranceScore: 0, saturationScore: 0,
    exposureScore: 0, highlightsScore: 0, shadowsScore: 0, whitesScore: 0,
    blacksScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
};
/**
 * Demo component showing syncHistory functionality
 */
export function SyncHistoryDemo() {
    const { currentState, historyInfo, actions, config } = useAdjustmentHistory(initialAdjustments);
    // Sample history data for demo
    const [savedHistoryData] = useState([
        { ...initialAdjustments }, // Original
        { ...initialAdjustments, tempScore: 25, tintScore: 10 }, // Warm
        { ...initialAdjustments, tempScore: 50, tintScore: 20, exposureScore: 15 }, // Warmer + Bright
        { ...initialAdjustments, tempScore: 75, tintScore: 30, exposureScore: 30, contrastScore: 20 }, // Dramatic warm
        { ...initialAdjustments, tempScore: 100, tintScore: 40, exposureScore: 50, contrastScore: 40, clarityScore: 25 }, // Final look
    ]);
    const [presetCollections] = useState({
        vintage: [
            { ...initialAdjustments },
            { ...initialAdjustments, tempScore: 30, exposureScore: -10 },
            { ...initialAdjustments, tempScore: 30, exposureScore: -10, contrastScore: -15 },
            { ...initialAdjustments, tempScore: 30, exposureScore: -10, contrastScore: -15, saturationScore: -20 },
            { ...initialAdjustments, tempScore: 30, exposureScore: -10, contrastScore: -15, saturationScore: -20, clarityScore: -10 },
        ],
        dramatic: [
            { ...initialAdjustments },
            { ...initialAdjustments, contrastScore: 30 },
            { ...initialAdjustments, contrastScore: 30, clarityScore: 40 },
            { ...initialAdjustments, contrastScore: 30, clarityScore: 40, shadowsScore: -20 },
            { ...initialAdjustments, contrastScore: 30, clarityScore: 40, shadowsScore: -20, highlightsScore: -10 },
        ],
        cool: [
            { ...initialAdjustments },
            { ...initialAdjustments, tempScore: -25 },
            { ...initialAdjustments, tempScore: -25, tintScore: 15 },
            { ...initialAdjustments, tempScore: -25, tintScore: 15, vibranceScore: 20 },
            { ...initialAdjustments, tempScore: -25, tintScore: 15, vibranceScore: 20, saturationScore: 10 },
        ]
    });
    // Load saved editing session
    const handleLoadSavedSession = () => {
        actions.syncHistory(savedHistoryData);
        console.log('Loaded saved editing session with', savedHistoryData.length, 'states');
    };
    // Load saved session to specific point
    const handleLoadToSpecificPoint = (index) => {
        actions.syncHistory(savedHistoryData, index);
        console.log('Loaded saved session to step', index + 1);
    };
    // Load preset collection
    const handleLoadPresetCollection = (collectionName) => {
        const collection = presetCollections[collectionName];
        if (collection) {
            actions.syncHistory(collection, 0); // Start at original
            console.log('Loaded', collectionName, 'preset collection');
        }
    };
    // Simulate loading from API/localStorage
    const handleLoadFromStorage = () => {
        // Simulate API call or localStorage read
        const mockStoredData = [
            { ...initialAdjustments, tempScore: 15, exposureScore: 10 },
            { ...initialAdjustments, tempScore: 15, exposureScore: 10, contrastScore: 20 },
            { ...initialAdjustments, tempScore: 15, exposureScore: 10, contrastScore: 20, clarityScore: 15 },
        ];
        actions.syncHistory(mockStoredData, 2); // Load to last state
        console.log('Loaded from storage:', mockStoredData.length, 'states');
    };
    // Export current history
    const handleExportHistory = () => {
        const currentHistory = actions.getHistory();
        console.log('Current history to export:', currentHistory);
        // In real app, you might:
        // localStorage.setItem('adjustmentHistory', JSON.stringify(currentHistory));
        // or send to API
        alert(`Exported ${currentHistory.length} states to console (check browser dev tools)`);
    };
    // Merge with additional states
    const handleMergeStates = () => {
        const currentHistory = actions.getHistory();
        const additionalStates = [
            { ...currentState, sharpnessScore: 25 },
            { ...currentState, sharpnessScore: 25, clarityScore: currentState.clarityScore + 15 },
        ];
        const mergedHistory = [...currentHistory, ...additionalStates];
        actions.syncHistory(mergedHistory);
        console.log('Merged additional states, total:', mergedHistory.length);
    };
    return (_jsxs("div", { style: { padding: '20px', fontFamily: 'monospace' }, children: [_jsx("h2", { children: "syncHistory Demo" }), _jsxs("div", { style: { marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }, children: [_jsx("h3", { children: "Current State" }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '12px' }, children: [_jsxs("div", { children: ["Temp: ", currentState.tempScore] }), _jsxs("div", { children: ["Tint: ", currentState.tintScore] }), _jsxs("div", { children: ["Exposure: ", currentState.exposureScore] }), _jsxs("div", { children: ["Contrast: ", currentState.contrastScore] }), _jsxs("div", { children: ["Clarity: ", currentState.clarityScore] }), _jsxs("div", { children: ["Vibrance: ", currentState.vibranceScore] }), _jsxs("div", { children: ["Saturation: ", currentState.saturationScore] }), _jsxs("div", { children: ["Sharpness: ", currentState.sharpnessScore] })] }), _jsxs("div", { style: { marginTop: '10px', fontSize: '14px' }, children: [_jsx("strong", { children: "History:" }), " ", historyInfo.currentIndex + 1, " / ", historyInfo.totalStates, " |", _jsx("strong", { children: " Can Undo:" }), " ", historyInfo.canUndo ? 'Yes' : 'No', " |", _jsx("strong", { children: " Can Redo:" }), " ", historyInfo.canRedo ? 'Yes' : 'No'] })] }), _jsxs("div", { style: { marginBottom: '20px' }, children: [_jsx("h3", { children: "Load Saved Editing Session" }), _jsxs("div", { style: { display: 'flex', gap: '10px', marginBottom: '10px' }, children: [_jsx("button", { onClick: handleLoadSavedSession, style: { padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }, children: "Load Complete Session (5 steps)" }), _jsx("button", { onClick: handleLoadFromStorage, style: { padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none' }, children: "Load from Storage" })] }), _jsxs("div", { style: { display: 'flex', gap: '5px' }, children: [_jsx("span", { style: { fontSize: '12px', marginRight: '10px' }, children: "Load to specific step:" }), savedHistoryData.map((_, index) => (_jsxs("button", { onClick: () => handleLoadToSpecificPoint(index), style: {
                                    padding: '5px 10px',
                                    backgroundColor: '#FF9800',
                                    color: 'white',
                                    border: 'none',
                                    fontSize: '12px'
                                }, children: ["Step ", index + 1] }, index)))] })] }), _jsxs("div", { style: { marginBottom: '20px' }, children: [_jsx("h3", { children: "Load Preset Collections" }), _jsx("div", { style: { display: 'flex', gap: '10px' }, children: Object.keys(presetCollections).map(collectionName => (_jsxs("button", { onClick: () => handleLoadPresetCollection(collectionName), style: {
                                padding: '10px',
                                backgroundColor: '#9C27B0',
                                color: 'white',
                                border: 'none',
                                textTransform: 'capitalize'
                            }, children: [collectionName, " Collection"] }, collectionName))) }), _jsx("div", { style: { fontSize: '12px', color: '#666', marginTop: '5px' }, children: "Each collection contains 5 progressive adjustment steps" })] }), _jsxs("div", { style: { marginBottom: '20px' }, children: [_jsx("h3", { children: "History Management" }), _jsxs("div", { style: { display: 'flex', gap: '10px' }, children: [_jsx("button", { onClick: handleExportHistory, style: { padding: '10px', backgroundColor: '#795548', color: 'white', border: 'none' }, children: "Export Current History" }), _jsx("button", { onClick: handleMergeStates, style: { padding: '10px', backgroundColor: '#607D8B', color: 'white', border: 'none' }, children: "Merge Additional States" }), _jsx("button", { onClick: actions.clearHistory, style: { padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none' }, children: "Clear History" })] })] }), _jsxs("div", { style: { marginBottom: '20px' }, children: [_jsx("h3", { children: "Navigation" }), _jsxs("div", { style: { display: 'flex', gap: '10px' }, children: [_jsx("button", { onClick: actions.undo, disabled: !historyInfo.canUndo, style: {
                                    padding: '10px',
                                    backgroundColor: historyInfo.canUndo ? '#FF5722' : '#ccc',
                                    color: 'white',
                                    border: 'none'
                                }, children: "\u2190 Undo" }), _jsx("button", { onClick: actions.redo, disabled: !historyInfo.canRedo, style: {
                                    padding: '10px',
                                    backgroundColor: historyInfo.canRedo ? '#3F51B5' : '#ccc',
                                    color: 'white',
                                    border: 'none'
                                }, children: "Redo \u2192" })] })] }), _jsxs("div", { style: { fontSize: '12px', color: '#666', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px' }, children: [_jsx("h4", { children: "syncHistory Usage:" }), _jsxs("ul", { style: { margin: 0, paddingLeft: '20px' }, children: [_jsxs("li", { children: [_jsx("code", { children: "actions.syncHistory(states)" }), " - Replace entire history with new states, current = last"] }), _jsxs("li", { children: [_jsx("code", { children: "actions.syncHistory(states, index)" }), " - Replace history and set current to specific index"] }), _jsx("li", { children: "Automatically validates all states are valid AdjustmentState objects" }), _jsx("li", { children: "Respects maxSize limits and trims if needed" }), _jsx("li", { children: "Exits batch mode if currently active" }), _jsx("li", { children: "Perfect for loading saved sessions, preset collections, or API data" })] })] })] }));
}
/**
 * Real-world integration example
 */
export function RealWorldSyncExample() {
    const history = useAdjustmentHistory(initialAdjustments);
    // Example: Load editing session from API
    const loadEditingSession = async (sessionId) => {
        try {
            // const response = await fetch(`/api/sessions/${sessionId}`);
            // const sessionData = await response.json();
            // Mock API response
            const sessionData = [
                { ...initialAdjustments },
                { ...initialAdjustments, tempScore: 20, exposureScore: 15 },
                { ...initialAdjustments, tempScore: 20, exposureScore: 15, contrastScore: 25 },
            ];
            history.actions.syncHistory(sessionData);
            console.log('Loaded editing session:', sessionId);
        }
        catch (error) {
            console.error('Failed to load session:', error);
        }
    };
    // Example: Save current session to API
    const saveEditingSession = async () => {
        const currentHistory = history.actions.getHistory();
        try {
            // const response = await fetch('/api/sessions', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ history: currentHistory })
            // });
            console.log('Saved session with', currentHistory.length, 'states');
            return 'session-123'; // Mock session ID
        }
        catch (error) {
            console.error('Failed to save session:', error);
        }
    };
    // Example: Auto-save to localStorage
    const autoSaveToLocalStorage = () => {
        const currentHistory = history.actions.getHistory();
        localStorage.setItem('adjustmentHistory', JSON.stringify(currentHistory));
        localStorage.setItem('currentIndex', history.historyInfo.currentIndex.toString());
    };
    // Example: Load from localStorage on component mount
    const loadFromLocalStorage = () => {
        try {
            const savedHistory = localStorage.getItem('adjustmentHistory');
            const savedIndex = localStorage.getItem('currentIndex');
            if (savedHistory) {
                const parsedHistory = JSON.parse(savedHistory);
                const targetIndex = savedIndex ? parseInt(savedIndex, 10) : undefined;
                history.actions.syncHistory(parsedHistory, targetIndex);
                console.log('Restored from localStorage');
            }
        }
        catch (error) {
            console.error('Failed to load from localStorage:', error);
        }
    };
    return (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h2", { children: "Real-World syncHistory Integration" }), _jsxs("div", { style: { display: 'flex', gap: '10px', marginBottom: '20px' }, children: [_jsx("button", { onClick: () => loadEditingSession('session-123'), children: "Load Session from API" }), _jsx("button", { onClick: saveEditingSession, children: "Save Session to API" }), _jsx("button", { onClick: autoSaveToLocalStorage, children: "Save to LocalStorage" }), _jsx("button", { onClick: loadFromLocalStorage, children: "Load from LocalStorage" })] }), _jsxs("div", { style: { fontSize: '12px', color: '#666' }, children: [_jsx("p", { children: "This example shows how to integrate syncHistory with:" }), _jsxs("ul", { children: [_jsx("li", { children: "API endpoints for session management" }), _jsx("li", { children: "LocalStorage for offline persistence" }), _jsx("li", { children: "Auto-save functionality" }), _jsx("li", { children: "Session restoration on app load" })] })] })] }));
}
