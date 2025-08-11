import React, { useState } from 'react';
import { useAdjustmentHistory } from './useAdjustmentHistory';
import { AdjustmentState } from './editor/useHonchoEditor';

const initialAdjustments: AdjustmentState = {
    tempScore: 0, tintScore: 0, vibranceScore: 0, saturationScore: 0,
    exposureScore: 0, highlightsScore: 0, shadowsScore: 0, whitesScore: 0,
    blacksScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
};

/**
 * Demo component showing batch mode behavior
 */
export function BatchModeDemo() {
    const {
        currentState,
        historyInfo,
        actions,
        config
    } = useAdjustmentHistory(initialAdjustments);

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

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h2>Batch Mode Demo</h2>
            
            <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
                <strong>Current State:</strong>
                <div>Temperature: {currentState.tempScore}</div>
                <div>Tint: {currentState.tintScore}</div>
                <div>UI Updates: {updateCount}</div>
                <div>History Size: {historyInfo.totalStates}</div>
                <div>Can Undo: {historyInfo.canUndo ? 'Yes' : 'No'}</div>
                <div>Batch Mode: {historyInfo.isBatchMode ? 'Active' : 'Inactive'}</div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button 
                    onClick={handleBatchUpdates}
                    style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
                >
                    Batch Mode (4 UI updates, 1 history entry)
                </button>
                
                <button 
                    onClick={handleInstantUpdates}
                    style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none' }}
                >
                    Normal Mode (4 UI updates, 4 history entries)
                </button>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    onClick={actions.undo}
                    disabled={!historyInfo.canUndo}
                    style={{ 
                        padding: '10px', 
                        backgroundColor: historyInfo.canUndo ? '#FF9800' : '#ccc',
                        color: 'white', 
                        border: 'none' 
                    }}
                >
                    Undo
                </button>
                
                <button 
                    onClick={actions.redo}
                    disabled={!historyInfo.canRedo}
                    style={{ 
                        padding: '10px', 
                        backgroundColor: historyInfo.canRedo ? '#9C27B0' : '#ccc',
                        color: 'white', 
                        border: 'none' 
                    }}
                >
                    Redo
                </button>
                
                <button 
                    onClick={() => actions.reset(initialAdjustments)}
                    style={{ padding: '10px', backgroundColor: '#f44336', color: 'white', border: 'none' }}
                >
                    Reset
                </button>
            </div>

            <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
                <h3>How it works:</h3>
                <ul>
                    <li><strong>Batch Mode:</strong> UI updates immediately on each pushState, but only final state is saved to history when batch ends</li>
                    <li><strong>Normal Mode:</strong> Each pushState creates both UI update and history entry</li>
                    <li><strong>Result:</strong> Smooth UI animations with clean undo/redo history</li>
                </ul>
            </div>
        </div>
    );
}

/**
 * Example showing smooth preset application
 */
export function SmoothPresetDemo() {
    const {
        currentState,
        historyInfo,
        actions,
        config
    } = useAdjustmentHistory(initialAdjustments);

    const dramaticPreset: AdjustmentState = {
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
            
            const intermediateState: AdjustmentState = {
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

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h2>Smooth Preset Application</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px', fontSize: '12px' }}>
                <div>Temp: {currentState.tempScore}</div>
                <div>Tint: {currentState.tintScore}</div>
                <div>Vibrance: {currentState.vibranceScore}</div>
                <div>Saturation: {currentState.saturationScore}</div>
                <div>Exposure: {currentState.exposureScore}</div>
                <div>Highlights: {currentState.highlightsScore}</div>
                <div>Shadows: {currentState.shadowsScore}</div>
                <div>Whites: {currentState.whitesScore}</div>
                <div>Blacks: {currentState.blacksScore}</div>
                <div>Contrast: {currentState.contrastScore}</div>
                <div>Clarity: {currentState.clarityScore}</div>
                <div>Sharpness: {currentState.sharpnessScore}</div>
            </div>

            <button 
                onClick={handleSmoothPreset}
                style={{ 
                    padding: '15px 30px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none',
                    fontSize: '16px',
                    marginRight: '10px'
                }}
            >
                Apply Dramatic Preset (Smooth)
            </button>

            <button 
                onClick={actions.undo}
                disabled={!historyInfo.canUndo}
                style={{ 
                    padding: '15px 30px', 
                    backgroundColor: historyInfo.canUndo ? '#FF9800' : '#ccc',
                    color: 'white', 
                    border: 'none',
                    fontSize: '16px'
                }}
            >
                Undo Preset
            </button>

            <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
                <p>This demo shows smooth preset application with 8 intermediate steps, but only 1 undo operation!</p>
            </div>
        </div>
    );
}
