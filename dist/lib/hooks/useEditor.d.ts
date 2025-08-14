import type { EditorTask, EditorResponse } from '../context/EditorProcessingService';
interface UseEditorOptions {
    priority?: number;
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
export declare const useEditor: (options?: UseEditorOptions) => UseEditorResult;
export declare const useEditorHighPriority: () => UseEditorResult;
export declare const useEditorLowPriority: () => UseEditorResult;
export {};
