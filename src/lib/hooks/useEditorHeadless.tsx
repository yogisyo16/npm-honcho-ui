'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { AdjustmentValues, HonchoEditor } from '../editor/honcho-editor';

// Access HonchoEditor from global window object since it's not exported as ES module
declare global {
  interface Window {
    HonchoEditor: new () => any;
    HonchoEditorUtils: {
      imageDataToBlob: (imageData: ImageData, format?: string, quality?: number) => Promise<Blob>;
    };
  }
}

interface EditorTask {
    id: string;
    path: string;
    frame: string | null;
    adjustments?: Partial<AdjustmentValues>
}

interface EditorResponse {
    id: string;
    path: string;
}

export function useEditorHeadless() {
    const editorRef = useRef<HonchoEditor | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    // Load script dynamically without component
    useEffect(() => {
        const loadScript = () => {
            // Check if script is already loaded
            if (document.querySelector('script[src="/honcho-photo-editor.js"]')) {
                setIsScriptLoaded(true);
                return;
            }

            const script = document.createElement('script');
            script.src = '/honcho-photo-editor.js';
            script.async = true;
            
            script.onload = () => {
                console.debug('Honcho photo editor script loaded');
                setIsScriptLoaded(true);
            };
            
            script.onerror = () => {
                console.error('Failed to load honcho photo editor script');
                setError(new Error('Failed to load editor script'));
            };

            document.head.appendChild(script);
        };

        loadScript();

        // Cleanup script on unmount
        return () => {
            const script = document.querySelector('script[src="/honcho-photo-editor.js"]');
            if (script) {
                script.remove();
            }
        };
    }, []);

    // Initialize editor when script is loaded
    useEffect(() => {
        if (!isScriptLoaded) return;

        const initialize = async () => {
            try {
                console.debug('Script loaded, initializing editor...');
                
                if (!editorRef.current) {
                    editorRef.current = new window.HonchoEditor();
                }

                await editorRef.current!!.initialize(false);
                setIsReady(true);
            } catch (e) {
                console.error("Failed to initialize editor:", e);
                setError(e instanceof Error ? e : new Error(String(e)));
            }
        };

        initialize();

        return () => {
            editorRef.current?.cleanup();
        };
    }, [isScriptLoaded]);

    // Helper function to load image as blob with fallback
    const loadImageAsBlob = async (url: string): Promise<Blob> => {
        try {
            // Try direct fetch first (faster, no server load)
            const response = await fetch(url, {
                mode: 'cors',
                credentials: 'omit'
            });
            if (!response.ok) {
                throw new Error(`Direct fetch failed: ${response.statusText}`);
            }
            return response.blob();
        } catch (error) {
            console.warn(`Direct fetch failed for ${url}, trying proxy fallback:`, error);
            
            // Fallback to proxy API if CORS or other fetch issues
            try {
                const proxyUrl = `/api/image?imageUrl=${encodeURIComponent(url)}`;
                const response = await fetch(proxyUrl);
                if (!response.ok) {
                    throw new Error(`Proxy fetch failed: ${response.statusText}`);
                }
                return response.blob();
            } catch (proxyError) {
                console.error(`Both direct and proxy fetch failed for ${url}:`, proxyError);
                throw new Error(`Failed to load image: ${proxyError instanceof Error ? proxyError.message : 'Unknown error'}`);
            }
        }
    };

    // Process single image task
    const processImage = useCallback(async (task: EditorTask): Promise<EditorResponse> => {
        if (!editorRef.current || !isReady) {
            throw new Error('Editor not ready');
        }

        try {
            console.debug(`Processing image: ${task.id}`);
            
            // Load original image as blob first
            const imageBlob = await loadImageAsBlob(task.path);
            
            // Convert blob to File for HonchoEditor
            const imageFile = new File([imageBlob], `image-${task.id}`, { type: imageBlob.type });
            
            // Load frame if provided
            let frameFile: File | null = null;
            if (task.frame) {
                const frameBlob = await loadImageAsBlob(task.frame);
                frameFile = new File([frameBlob], `frame-${task.id}`, { type: frameBlob.type });
            }

            // Process image using HonchoEditor's one-shot method
            const processedImageData = await editorRef.current.processImageOneShot(
                imageFile,
                task.adjustments,
                frameFile
            );

            // Convert ImageData to Blob
            const processedBlob = await window.HonchoEditorUtils.imageDataToBlob(processedImageData);
            
            // Create blob URL for processed result
            const blobUrl = URL.createObjectURL(processedBlob);

            return { id: task.id, path: blobUrl };

        } catch (error) {
            console.error(`Failed to process image ${task.id}:`, error);
            throw new Error(`Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }, [isReady, loadImageAsBlob]);

    return {
        editor: editorRef.current,
        isReady,
        error,
        processImage
    };
}