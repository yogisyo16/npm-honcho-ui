import React, { useState } from 'react';
import { useAdjustmentHistory } from './useAdjustmentHistory';
import { AdjustmentState } from './editor/useHonchoEditor';

const initialAdjustments: AdjustmentState = {
    tempScore: 0, tintScore: 0, vibranceScore: 0, saturationScore: 0,
    exposureScore: 0, highlightsScore: 0, shadowsScore: 0, whitesScore: 0,
    blacksScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
};

/**
 * Demo component showing syncHistory functionality
 */
export function SyncHistoryDemo() {
    const {
        currentState,
        historyInfo,
        actions,
        config
    } = useAdjustmentHistory(initialAdjustments);

    // Sample history data for demo
    const [savedHistoryData] = useState<AdjustmentState[]>([
        { ...initialAdjustments }, // Original
        { ...initialAdjustments, tempScore: 25, tintScore: 10 }, // Warm
        { ...initialAdjustments, tempScore: 50, tintScore: 20, exposureScore: 15 }, // Warmer + Bright
        { ...initialAdjustments, tempScore: 75, tintScore: 30, exposureScore: 30, contrastScore: 20 }, // Dramatic warm
        { ...initialAdjustments, tempScore: 100, tintScore: 40, exposureScore: 50, contrastScore: 40, clarityScore: 25 }, // Final look
    ]);

    const [presetCollections] = useState<{ [key: string]: AdjustmentState[] }>({
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
    const handleLoadToSpecificPoint = (index: number) => {
        actions.syncHistory(savedHistoryData, index);
        console.log('Loaded saved session to step', index + 1);
    };

    // Load preset collection
    const handleLoadPresetCollection = (collectionName: string) => {
        const collection = presetCollections[collectionName];
        if (collection) {
            actions.syncHistory(collection, 0); // Start at original
            console.log('Loaded', collectionName, 'preset collection');
        }
    };

    // Simulate loading from API/localStorage
    const handleLoadFromStorage = () => {
        // Simulate API call or localStorage read
        const mockStoredData: AdjustmentState[] = [
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
        const additionalStates: AdjustmentState[] = [
            { ...currentState, sharpnessScore: 25 },
            { ...currentState, sharpnessScore: 25, clarityScore: currentState.clarityScore + 15 },
        ];
        
        const mergedHistory = [...currentHistory, ...additionalStates];
        actions.syncHistory(mergedHistory);
        console.log('Merged additional states, total:', mergedHistory.length);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h2>syncHistory Demo</h2>
            
            {/* Current State Display */}
            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                <h3>Current State</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '12px' }}>
                    <div>Temp: {currentState.tempScore}</div>
                    <div>Tint: {currentState.tintScore}</div>
                    <div>Exposure: {currentState.exposureScore}</div>
                    <div>Contrast: {currentState.contrastScore}</div>
                    <div>Clarity: {currentState.clarityScore}</div>
                    <div>Vibrance: {currentState.vibranceScore}</div>
                    <div>Saturation: {currentState.saturationScore}</div>
                    <div>Sharpness: {currentState.sharpnessScore}</div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '14px' }}>
                    <strong>History:</strong> {historyInfo.currentIndex + 1} / {historyInfo.totalStates} | 
                    <strong> Can Undo:</strong> {historyInfo.canUndo ? 'Yes' : 'No'} | 
                    <strong> Can Redo:</strong> {historyInfo.canRedo ? 'Yes' : 'No'}
                </div>
            </div>

            {/* Load Saved Session */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Load Saved Editing Session</h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <button 
                        onClick={handleLoadSavedSession}
                        style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
                    >
                        Load Complete Session (5 steps)
                    </button>
                    <button 
                        onClick={handleLoadFromStorage}
                        style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none' }}
                    >
                        Load from Storage
                    </button>
                </div>
                
                <div style={{ display: 'flex', gap: '5px' }}>
                    <span style={{ fontSize: '12px', marginRight: '10px' }}>Load to specific step:</span>
                    {savedHistoryData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleLoadToSpecificPoint(index)}
                            style={{ 
                                padding: '5px 10px', 
                                backgroundColor: '#FF9800', 
                                color: 'white', 
                                border: 'none',
                                fontSize: '12px'
                            }}
                        >
                            Step {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Load Preset Collections */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Load Preset Collections</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {Object.keys(presetCollections).map(collectionName => (
                        <button
                            key={collectionName}
                            onClick={() => handleLoadPresetCollection(collectionName)}
                            style={{ 
                                padding: '10px', 
                                backgroundColor: '#9C27B0', 
                                color: 'white', 
                                border: 'none',
                                textTransform: 'capitalize'
                            }}
                        >
                            {collectionName} Collection
                        </button>
                    ))}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Each collection contains 5 progressive adjustment steps
                </div>
            </div>

            {/* History Management */}
            <div style={{ marginBottom: '20px' }}>
                <h3>History Management</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={handleExportHistory}
                        style={{ padding: '10px', backgroundColor: '#795548', color: 'white', border: 'none' }}
                    >
                        Export Current History
                    </button>
                    <button 
                        onClick={handleMergeStates}
                        style={{ padding: '10px', backgroundColor: '#607D8B', color: 'white', border: 'none' }}
                    >
                        Merge Additional States
                    </button>
                    <button 
                        onClick={actions.clearHistory}
                        style={{ padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none' }}
                    >
                        Clear History
                    </button>
                </div>
            </div>

            {/* Navigation Controls */}
            <div style={{ marginBottom: '20px' }}>
                <h3>Navigation</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={actions.undo}
                        disabled={!historyInfo.canUndo}
                        style={{ 
                            padding: '10px', 
                            backgroundColor: historyInfo.canUndo ? '#FF5722' : '#ccc',
                            color: 'white', 
                            border: 'none' 
                        }}
                    >
                        ← Undo
                    </button>
                    <button 
                        onClick={actions.redo}
                        disabled={!historyInfo.canRedo}
                        style={{ 
                            padding: '10px', 
                            backgroundColor: historyInfo.canRedo ? '#3F51B5' : '#ccc',
                            color: 'white', 
                            border: 'none' 
                        }}
                    >
                        Redo →
                    </button>
                </div>
            </div>

            {/* Usage Information */}
            <div style={{ fontSize: '12px', color: '#666', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
                <h4>syncHistory Usage:</h4>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li><code>actions.syncHistory(states)</code> - Replace entire history with new states, current = last</li>
                    <li><code>actions.syncHistory(states, index)</code> - Replace history and set current to specific index</li>
                    <li>Automatically validates all states are valid AdjustmentState objects</li>
                    <li>Respects maxSize limits and trims if needed</li>
                    <li>Exits batch mode if currently active</li>
                    <li>Perfect for loading saved sessions, preset collections, or API data</li>
                </ul>
            </div>
        </div>
    );
}

/**
 * Real-world integration example
 */
export function RealWorldSyncExample() {
    const history = useAdjustmentHistory(initialAdjustments);

    // Example: Load editing session from API
    const loadEditingSession = async (sessionId: string) => {
        try {
            // const response = await fetch(`/api/sessions/${sessionId}`);
            // const sessionData = await response.json();
            
            // Mock API response
            const sessionData: AdjustmentState[] = [
                { ...initialAdjustments },
                { ...initialAdjustments, tempScore: 20, exposureScore: 15 },
                { ...initialAdjustments, tempScore: 20, exposureScore: 15, contrastScore: 25 },
            ];
            
            history.actions.syncHistory(sessionData);
            console.log('Loaded editing session:', sessionId);
        } catch (error) {
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
        } catch (error) {
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
                const parsedHistory: AdjustmentState[] = JSON.parse(savedHistory);
                const targetIndex = savedIndex ? parseInt(savedIndex, 10) : undefined;
                
                history.actions.syncHistory(parsedHistory, targetIndex);
                console.log('Restored from localStorage');
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Real-World syncHistory Integration</h2>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => loadEditingSession('session-123')}>
                    Load Session from API
                </button>
                <button onClick={saveEditingSession}>
                    Save Session to API
                </button>
                <button onClick={autoSaveToLocalStorage}>
                    Save to LocalStorage
                </button>
                <button onClick={loadFromLocalStorage}>
                    Load from LocalStorage
                </button>
            </div>

            <div style={{ fontSize: '12px', color: '#666' }}>
                <p>This example shows how to integrate syncHistory with:</p>
                <ul>
                    <li>API endpoints for session management</li>
                    <li>LocalStorage for offline persistence</li>
                    <li>Auto-save functionality</li>
                    <li>Session restoration on app load</li>
                </ul>
            </div>
        </div>
    );
}
