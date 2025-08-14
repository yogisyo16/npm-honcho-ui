import React from 'react';
import { EditorProcessingService } from '../context/EditorProcessingService';
interface EditorContextValue {
    isReady: boolean;
    error: Error | null;
    processingService: EditorProcessingService;
    queueStatus: {
        queueLength: number;
        isProcessing: boolean;
        hasProcessor: boolean;
    };
}
interface EditorProviderProps {
    children: React.ReactNode;
}
export declare const EditorProvider: React.FC<EditorProviderProps>;
export declare const useEditorContext: () => EditorContextValue;
export {};
