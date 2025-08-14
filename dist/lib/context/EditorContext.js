'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { useEditorHeadless } from '../hooks/useEditorHeadless';
import { EditorProcessingService } from '../context/EditorProcessingService';
const EditorContext = createContext(null);
export const EditorProvider = ({ children }) => {
    // Single editor instance for the entire app
    const { editor, isReady, error, processImage } = useEditorHeadless();
    // Single processing service instance
    const [processingService] = useState(() => new EditorProcessingService());
    const [queueStatus, setQueueStatus] = useState(processingService.getQueueStatus());
    // Connect the editor to the processing service when ready
    useEffect(() => {
        if (isReady && processImage) {
            console.debug('Connecting editor to processing service - editor ready:', isReady);
            processingService.setProcessor(processImage);
        }
        else {
            console.debug('Editor not ready yet - isReady:', isReady, 'processImage:', !!processImage);
        }
    }, [isReady, processImage, processingService]);
    // Update queue status periodically - now event-driven instead of polling
    useEffect(() => {
        const updateStatus = () => {
            setQueueStatus(processingService.getQueueStatus());
        };
        // Add listener for immediate updates
        processingService.addStatusChangeListener(updateStatus);
        // Optional: Keep a fallback interval for safety (much less frequent)
        const interval = setInterval(updateStatus, 5000); // 5 seconds instead of 1
        return () => {
            processingService.removeStatusChangeListener(updateStatus);
            clearInterval(interval);
        };
    }, [processingService]);
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            processingService.cleanup(); // Use new cleanup method
        };
    }, [processingService]);
    const contextValue = {
        isReady,
        error,
        processingService,
        queueStatus,
    };
    return (_jsx(EditorContext.Provider, { value: contextValue, children: children }));
};
// Custom hook to use the editor context
export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditorContext must be used within an EditorProvider');
    }
    return context;
};
