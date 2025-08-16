'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { AdjustmentValues, HonchoEditor } from '../editor/honcho-editor';
import { loadImageAsBlob, loadImageAsFile } from '../../utils/imageLoader';

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

interface UseEditorHeadlessOptions {
    scriptUrl?: string;
    wasmUrl?: string;
}

export function useEditorHeadless(options: UseEditorHeadlessOptions = {}) {
    const { 
        scriptUrl = '/honcho-photo-editor.js', 
        wasmUrl = '/honcho-photo-editor.wasm' 
    } = options;
    const editorRef = useRef<HonchoEditor | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    // Load script dynamically without component
    useEffect(() => {
        const loadScripts = async () => {
            // Check if HonchoEditor is already available
            if (window.HonchoEditor) {
                console.debug('HonchoEditor already available globally');
                setIsScriptLoaded(true);
                return;
            }

            // Load WASM module first
            const loadWasmModule = () => {
                return new Promise<void>((resolve, reject) => {
                    // Check if WASM module is already loaded
                    if (document.querySelector(`script[src="${scriptUrl}"]`)) {
                        console.debug('WASM module script already exists');
                        resolve();
                        return;
                    }

                    console.debug(`Loading WASM module from: ${scriptUrl}`);
                    const wasmScript = document.createElement('script');
                    wasmScript.src = scriptUrl;
                    wasmScript.async = true;
                    
                    wasmScript.onload = () => {
                        console.debug('WASM module script loaded');
                        resolve();
                    };
                    
                    wasmScript.onerror = () => {
                        console.error(`Failed to load WASM module from: ${scriptUrl}`);
                        reject(new Error('Failed to load WASM module'));
                    };

                    document.head.appendChild(wasmScript);
                });
            };

            // Load wrapper script that creates HonchoEditor constructor
            const loadWrapperScript = () => {
                return new Promise<void>((resolve, reject) => {
                    const wrapperUrl = '/honcho-editor.js';
                    
                    // Check if wrapper script is already loaded
                    if (document.querySelector(`script[src="${wrapperUrl}"]`)) {
                        console.debug('Wrapper script already exists');
                        resolve();
                        return;
                    }

                    console.debug(`Loading HonchoEditor wrapper from: ${wrapperUrl}`);
                    const wrapperScript = document.createElement('script');
                    wrapperScript.src = wrapperUrl;
                    wrapperScript.async = true;
                    
                    wrapperScript.onload = () => {
                        console.debug('Wrapper script loaded');
                        resolve();
                    };
                    
                    wrapperScript.onerror = () => {
                        console.error(`Failed to load wrapper script from: ${wrapperUrl}`);
                        reject(new Error('Failed to load wrapper script'));
                    };

                    document.head.appendChild(wrapperScript);
                });
            };

            try {
                // Load WASM module first
                await loadWasmModule();
                
                // Then load the wrapper that creates the constructor
                await loadWrapperScript();
                
                // Wait for HonchoEditor constructor to be available
                const waitForConstructor = () => {
                    return new Promise<void>((resolve, reject) => {
                        const checkInterval = setInterval(() => {
                            if (window.HonchoEditor && typeof window.HonchoEditor === 'function') {
                                console.debug('HonchoEditor constructor now available');
                                clearInterval(checkInterval);
                                resolve();
                            }
                        }, 100);
                        
                        // Timeout after 10 seconds
                        setTimeout(() => {
                            clearInterval(checkInterval);
                            if (!window.HonchoEditor) {
                                console.error('Timeout waiting for HonchoEditor constructor');
                                reject(new Error('Timeout waiting for HonchoEditor constructor'));
                            }
                        }, 10000);
                    });
                };

                await waitForConstructor();
                setIsScriptLoaded(true);

            } catch (error) {
                console.error('Failed to load HonchoEditor scripts:', error);
                setError(error instanceof Error ? error : new Error(String(error)));
            }
        };

        loadScripts();

        // Cleanup scripts on unmount (but be careful not to remove if other components need it)
        return () => {
            // Don't remove the scripts on unmount as other components might need them
            // The scripts should stay loaded for the lifetime of the app
        };
    }, [scriptUrl]);

    // Initialize editor when script is loaded
    useEffect(() => {
        if (!isScriptLoaded) return;

        const initialize = async () => {
            try {
                console.debug('Script loaded, initializing editor...');
                
                // Double-check that HonchoEditor is available
                if (!window.HonchoEditor) {
                    throw new Error('window.HonchoEditor is not available');
                }

                if (typeof window.HonchoEditor !== 'function') {
                    throw new Error(`window.HonchoEditor is not a constructor (type: ${typeof window.HonchoEditor})`);
                }
                
                if (!editorRef.current) {
                    console.debug('Creating new HonchoEditor instance...');
                    editorRef.current = new window.HonchoEditor();
                    console.debug('HonchoEditor instance created successfully');
                }

                console.debug('Initializing HonchoEditor...');
                await editorRef.current!!.initialize(false);
                console.debug('HonchoEditor initialized successfully');
                setIsReady(true);
            } catch (e) {
                console.error("Failed to initialize editor:", e);
                setError(e instanceof Error ? e : new Error(String(e)));
            }
        };

        initialize();

        return () => {
            if (editorRef.current) {
                console.debug('Cleaning up HonchoEditor...');
                editorRef.current?.cleanup();
            }
        };
    }, [isScriptLoaded]);

    // Process single image task
    const processImage = useCallback(async (task: EditorTask): Promise<EditorResponse> => {
        if (!editorRef.current || !isReady) {
            throw new Error('Editor not ready');
        }

        try {
            console.debug(`Processing image: ${task.id}`);
            
            // Load original image as File using the new utility
            const imageFile = await loadImageAsFile(task.path);
            
            // Load frame if provided
            let frameFile: File | null = null;
            if (task.frame) {
                frameFile = await loadImageAsFile(task.frame);
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
    }, [isReady]);

    // Helper function to load image from URL with CORS handling
    const loadImageFromUrl = useCallback(async (url: string): Promise<{ width: number; height: number }> => {
        if (!editorRef.current || !isReady) {
            throw new Error('Editor not ready');
        }

        try {
            console.debug(`Loading image from URL: ${url}`);
            
            // First try direct load with CORS
            try {
                const size = await editorRef.current.loadImageFromUrl(url);
                console.debug('Image loaded successfully via direct URL');
                return size;
            } catch (directError) {
                console.warn('Direct URL load failed, trying blob approach:', directError);
                
                // Fallback: Load as File using the new utility
                const imageFile = await loadImageAsFile(url);
                
                // Load via file method
                const size = await editorRef.current.loadImageFromFile(imageFile);
                console.debug('Image loaded successfully via file fallback');
                return size;
            }
        } catch (error) {
            console.error(`Failed to load image from URL ${url}:`, error);
            throw new Error(`Failed to load image: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }, [isReady]);

    return {
        editor: editorRef.current,
        isReady,
        error,
        processImage,
        loadImageFromUrl
    };
}