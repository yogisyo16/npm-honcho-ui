import { useState, useEffect, useMemo } from 'react';
import { useEditorHighPriority, useEditorLowPriority } from '../hooks/useEditor';
export function useImageProcessor({ photoId, photoSrc, enableEditor = true, adjustments, frame, priority = 'low', }) {
    const { processImage, isEditorReady } = priority === 'high'
        ? useEditorHighPriority()
        : useEditorLowPriority();
    // State for processed image and processing status
    const [processedImageSrc, setProcessedImageSrc] = useState(photoSrc);
    const [isProcessingComplete, setIsProcessingComplete] = useState(false);
    // Memoize adjustments to prevent unnecessary effect triggers
    const adjustmentsString = useMemo(() => adjustments ? JSON.stringify(adjustments) : '', [adjustments]);
    const frameMemoized = useMemo(() => frame ? frame : null, [frame]);
    // Process image when adjustments change
    useEffect(() => {
        if (!enableEditor || !isEditorReady || !adjustments) {
            console.debug("Skipping editor processing:", {
                enableEditor,
                isEditorReady,
                hasAdjustments: !!adjustments,
                hasFrame: frameMemoized
            });
            setProcessedImageSrc(photoSrc);
            setIsProcessingComplete(true);
            return;
        }
        // Reset processing state when starting new processing
        setIsProcessingComplete(false);
        let cancelled = false;
        const processImageWithEditor = async () => {
            try {
                const result = await processImage({
                    id: photoId,
                    path: photoSrc,
                    frame: frameMemoized,
                    adjustments: adjustments
                });
                if (!cancelled) {
                    setProcessedImageSrc(result.path);
                    setIsProcessingComplete(true);
                }
            }
            catch (error) {
                if (!cancelled) {
                    console.error({ error, photoKey: photoId, isEditorReady }, 'Failed to process image with editor');
                }
            }
        };
        processImageWithEditor();
        return () => {
            cancelled = true;
        };
    }, [photoSrc, adjustmentsString, frameMemoized, enableEditor, isEditorReady, processImage, photoId]);
    return {
        processedImageSrc,
        isProcessingComplete
    };
}
