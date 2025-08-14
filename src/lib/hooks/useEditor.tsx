'use client';

import { useCallback } from 'react';
import { useEditorContext } from '../context/EditorContext';
import type { EditorTask, EditorResponse } from '../context/EditorProcessingService';

interface UseEditorOptions {
    priority?: number; // Priority for processing queue (higher = first)
}

interface UseEditorResult {
    processImage: (task: Omit<EditorTask, 'priority'>) => Promise<EditorResponse>;
    isEditorReady: boolean;
    editorError: Error | null;
    queueStatus: {
        queueLength: number;
        isProcessing: boolean;
        hasProcessor: boolean;
    };
}

/**
 * Lightweight hook for components to request image processing
 * Uses the global editor instance via context
 */
export const useEditor = (options: UseEditorOptions = {}): UseEditorResult => {
    const { isReady, error, processingService, queueStatus } = useEditorContext();
    const { priority = 0 } = options;

    const processImage = useCallback(async (task: Omit<EditorTask, 'priority'>): Promise<EditorResponse> => {
        if (!isReady) {
            throw new Error('Editor not ready');
        }

        const taskWithPriority: EditorTask = {
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
export const useEditorHighPriority = (): UseEditorResult => {
    return useEditor({ priority: 10 });
};

// Convenience hook for low-priority processing (e.g., off-screen images)
export const useEditorLowPriority = (): UseEditorResult => {
    return useEditor({ priority: 1 });
};