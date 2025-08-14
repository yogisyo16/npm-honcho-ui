import { AdjustmentValues, HonchoEditor } from '../editor/honcho-editor';
interface EditorTask {
    id: string;
    path: string;
    frame: string | null;
    adjustments?: Partial<AdjustmentValues>;
}
interface EditorResponse {
    id: string;
    path: string;
}
export declare function useEditorHeadless(): {
    editor: HonchoEditor | null;
    isReady: boolean;
    error: Error | null;
    processImage: (task: EditorTask) => Promise<EditorResponse>;
};
export {};
