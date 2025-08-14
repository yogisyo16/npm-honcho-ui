import type { AdjustmentValues } from '../editor/honcho-editor';
export interface EditorTask {
    id: string;
    path: string;
    frame: string | null;
    adjustments?: Partial<AdjustmentValues>;
    priority?: number;
}
export interface EditorResponse {
    id: string;
    path: string;
}
export declare class EditorProcessingService {
    private processingQueue;
    private isProcessing;
    private processImage?;
    private pendingProcessingTimeout?;
    private statusChangeListeners;
    constructor();
    setProcessor(processImage: (task: EditorTask) => Promise<EditorResponse>): void;
    addStatusChangeListener(listener: () => void): void;
    removeStatusChangeListener(listener: () => void): void;
    private notifyStatusChange;
    requestProcessing(task: EditorTask): Promise<EditorResponse>;
    private scheduleProcessing;
    private processQueue;
    getQueueStatus(): {
        queueLength: number;
        isProcessing: boolean;
        hasProcessor: boolean;
    };
    clearQueue(): void;
    cleanup(): void;
}
