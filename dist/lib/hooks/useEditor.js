'use client';
import { useCallback } from 'react';
import { useEditorContext } from '../context/EditorContext';
/**
 * Lightweight hook for components to request image processing
 * Uses the global editor instance via context
 */
export const useEditor = (options = {}) => {
    const { isReady, error, processingService, queueStatus } = useEditorContext();
    const { priority = 0 } = options;
    const processImage = useCallback(async (task) => {
        if (!isReady) {
            throw new Error('Editor not ready');
        }
        const taskWithPriority = {
            ...task,
            priority,
        };
        return processingService.requestProcessing(taskWithPriority);
    }, [isReady, processingService, priority]);
    return {
        processImage,
        isEditorReady: isReady,
        editorError: error,
        queueStatus,
    };
};
// Convenience hook for high-priority processing (e.g., visible images)
export const useEditorHighPriority = () => {
    return useEditor({ priority: 10 });
};
// Convenience hook for low-priority processing (e.g., off-screen images)
export const useEditorLowPriority = () => {
    return useEditor({ priority: 1 });
};
