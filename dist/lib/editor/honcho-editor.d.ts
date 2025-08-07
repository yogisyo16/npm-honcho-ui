export class HonchoEditor {
    wasmModule: any;
    isInitialized: boolean;
    currentImageData: any;
    canvas: HTMLCanvasElement | null;
    currentWidth: number;
    currentHeight: number;
    /**
     * Initialize the WASM module
     * @param {boolean} verbose - Enable verbose logging (default: false)
     */
    initialize(verbose?: boolean): Promise<boolean>;
    /**
     * Clean up resources before loading a new image
     */
    cleanupForNewImage(): void;
    /**
     * Load image from File object (drag & drop, file input)
     */
    loadImageFromFile(file: any): Promise<any>;
    /**
     * Load image from URL
     */
    loadImageFromUrl(url: any): Promise<any>;
    /**
     * Load image from HTML Image element
     */
    loadImageFromImageElement(img: any): {
        width: any;
        height: any;
    };
    /**
     * Load image from ImageData
     */
    loadImageFromImageData(imageData: any): {
        width: any;
        height: any;
    };
    setExposure(value: any): void;
    setContrast(value: any): void;
    setHighlights(value: any): void;
    setShadows(value: any): void;
    setSaturation(value: any): void;
    setVibrance(value: any): void;
    setTemperature(value: any): void;
    setTint(value: any): void;
    setBlacks(value: any): void;
    setWhites(value: any): void;
    setClarity(value: any): void;
    setSharpness(value: any): void;
    /**
     * Set multiple adjustments at once
     */
    setAdjustments(adjustments: any): void;
    /**
     * Reset all adjustments to default values
     */
    resetAdjustments(): void;
    /**
     * Set a frame overlay from raw image data
     * @param {Uint8Array} data - Raw RGBA image data
     * @param {number} width - Frame width
     * @param {number} height - Frame height
     * @param {number} channels - Number of channels (usually 4 for RGBA)
     * @returns {boolean} - true if frame was set successfully
     */
    setFrame(data: Uint8Array, width: number, height: number, channels?: number): boolean;
    /**
     * Set a frame overlay from an ImageData object
     * The frame will be scaled to match the image size and composited on top
     * @param {ImageData} frameImageData - Frame image data (preferably with alpha channel)
     * @returns {boolean} - true if frame was set successfully
     */
    setFrameFromImageData(frameImageData: ImageData): boolean;
    /**
     * Set a frame overlay from an HTML Image element
     * @param {HTMLImageElement} frameImage - Frame image element
     * @returns {boolean} - true if frame was set successfully
     */
    setFrameFromImage(frameImage: HTMLImageElement): boolean;
    /**
     * Set a frame overlay from a Canvas element
     * @param {HTMLCanvasElement} frameCanvas - Frame canvas element
     * @returns {boolean} - true if frame was set successfully
     */
    setFrameFromCanvas(frameCanvas: HTMLCanvasElement): boolean;
    /**
     * Clear the current frame overlay
     */
    clearFrame(): void;
    /**
     * Check if a frame is currently set
     * @returns {boolean} - true if a frame is set
     */
    hasFrame(): boolean;
    /**
     * One-shot processing: load image, apply adjustments, get result
     * Most efficient for single image processing or batch operations
     *
     * @param {File|ImageData|HTMLImageElement} imageSource - Image source (File, ImageData, or Image element)
     * @param {Object} adjustments - Object containing adjustment values (-100 to 100)
     * @param {File|ImageData|HTMLImageElement|null} frameSource - Optional frame source
     * @returns {ImageData} - Processed image data
     *
     * @example
     * // Basic usage
     * const result = await editor.processImageOneShot(imageFile, {
     *     exposure: 20,
     *     contrast: 15,
     *     saturation: 10
     * });
     *
     * // With frame
     * const result = await editor.processImageOneShot(imageFile, {
     *     exposure: 20,
     *     contrast: 15
     * }, frameFile);
     *
     * // All adjustments
     * const result = await editor.processImageOneShot(imageFile, {
     *     temperature: 10,
     *     tint: -5,
     *     exposure: 20,
     *     contrast: 15,
     *     highlights: -20,
     *     shadows: 30,
     *     saturation: 25,
     *     vibrance: 20,
     *     whites: 10,
     *     blacks: -10,
     *     clarity: 15,
     *     sharpness: 20
     * });
     */
    processImageOneShot(imageSource: File | ImageData | HTMLImageElement, adjustments?: Object, frameSource?: File | ImageData | HTMLImageElement | null): ImageData;
    /**
     * Helper method to load frame from File (for processImageOneShot)
     */
    setFrameFromFile(frameFile: any): Promise<any>;
    /**
     * Manual processing trigger - call this after setting adjustments
     */
    processImage(): void;
    /**
     * GPU Path: Render to canvas for real-time preview (<1ms)
     */
    renderToCanvas(canvas: any): void;
    /**
     * CPU Path: Get processed image data for export (50-100ms)
     */
    getProcessedImageData(): ImageData;
    /**
     * Get current image dimensions
     */
    getImageSize(): {
        width: number;
        height: number;
    };
    /**
     * Get current image width
     */
    getWidth(): number;
    /**
     * Get current image height
     */
    getHeight(): number;
    /**
     * Check if editor is initialized
     */
    getInitialized(): boolean;
    /**
     * Get raw WASM module (advanced usage)
     */
    getRawModule(): any;
    /**
     * Validate adjustment value against range
     */
    validateAdjustment(name: any, value: any): void;
    /**
     * Cleanup resources
     */
    cleanup(): void;
}
export namespace HonchoEditorUtils {
    /**
     * Convert ImageData to Blob for download
     */
    function imageDataToBlob(imageData: any, format?: string, quality?: number): Promise<any>;
    /**
     * Download blob as file
     */
    function downloadBlob(blob: any, filename: any): void;
    /**
     * Create debounced function for performance optimization
     */
    function debounce(func: any, wait: any): (...args: any[]) => void;
    /**
     * Validate image file type
     */
    function isValidImageFile(file: any): boolean;
    /**
     * Get file size in human readable format
     */
    function formatFileSize(bytes: any): string;
}
export namespace ADJUSTMENT_RANGES {
    namespace temperature {
        export let min: number;
        export let max: number;
        let _default: number;
        export { _default as default };
        export let step: number;
    }
    namespace tint {
        let min_1: number;
        export { min_1 as min };
        let max_1: number;
        export { max_1 as max };
        let _default_1: number;
        export { _default_1 as default };
        let step_1: number;
        export { step_1 as step };
    }
    namespace saturation {
        let min_2: number;
        export { min_2 as min };
        let max_2: number;
        export { max_2 as max };
        let _default_2: number;
        export { _default_2 as default };
        let step_2: number;
        export { step_2 as step };
    }
    namespace vibrance {
        let min_3: number;
        export { min_3 as min };
        let max_3: number;
        export { max_3 as max };
        let _default_3: number;
        export { _default_3 as default };
        let step_3: number;
        export { step_3 as step };
    }
    namespace exposure {
        let min_4: number;
        export { min_4 as min };
        let max_4: number;
        export { max_4 as max };
        let _default_4: number;
        export { _default_4 as default };
        let step_4: number;
        export { step_4 as step };
    }
    namespace contrast {
        let min_5: number;
        export { min_5 as min };
        let max_5: number;
        export { max_5 as max };
        let _default_5: number;
        export { _default_5 as default };
        let step_5: number;
        export { step_5 as step };
    }
    namespace highlights {
        let min_6: number;
        export { min_6 as min };
        let max_6: number;
        export { max_6 as max };
        let _default_6: number;
        export { _default_6 as default };
        let step_6: number;
        export { step_6 as step };
    }
    namespace shadows {
        let min_7: number;
        export { min_7 as min };
        let max_7: number;
        export { max_7 as max };
        let _default_7: number;
        export { _default_7 as default };
        let step_7: number;
        export { step_7 as step };
    }
    namespace whites {
        let min_8: number;
        export { min_8 as min };
        let max_8: number;
        export { max_8 as max };
        let _default_8: number;
        export { _default_8 as default };
        let step_8: number;
        export { step_8 as step };
    }
    namespace blacks {
        let min_9: number;
        export { min_9 as min };
        let max_9: number;
        export { max_9 as max };
        let _default_9: number;
        export { _default_9 as default };
        let step_9: number;
        export { step_9 as step };
    }
    namespace clarity {
        let min_10: number;
        export { min_10 as min };
        let max_10: number;
        export { max_10 as max };
        let _default_10: number;
        export { _default_10 as default };
        let step_10: number;
        export { step_10 as step };
    }
    namespace sharpness {
        let min_11: number;
        export { min_11 as min };
        let max_11: number;
        export { max_11 as max };
        let _default_11: number;
        export { _default_11 as default };
        let step_11: number;
        export { step_11 as step };
    }
}
