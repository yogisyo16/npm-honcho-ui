/**
 *     temperature?: number;   // -100 to 100
    tint?: number;          // -100 to 100
    saturation?: number;    // -100 to 100
    vibrance?: number;      // -100 to 100
    exposure?: number;      // -100 to 100
    contrast?: number;      // -100 to 100
    highlights?: number;    // -100 to 100
    shadows?: number;       // -100 to 100
    whites?: number;        // -100 to 100
    blacks?: number;        // -100 to 100
    clarity?: number;       // -100 to 100
    sharpness?: number;     // -100 to 100 Editor - TypeScript Definitions
 * 
 * Type definitions for the Honcho Photo Editor JavaScript library.
 */

export interface AdjustmentValues {
    temperature?: number;    // -100 to 100
    tint?: number;          // -100 to 100
    saturation?: number;     // -1 to 1
    vibrance?: number;      // -1 to 1
    exposure?: number;       // -3 to 3
    contrast?: number;       // -1 to 1
    highlights?: number;     // -1 to 1
    shadows?: number;        // -1 to 1
    whites?: number;        // -1 to 1
    blacks?: number;        // -1 to 1
    clarity?: number;       // -1 to 1
    sharpness?: number;     // -1 to 1
}

export interface ImageSize {
    width: number;
    height: number;
}

export interface AdjustmentRange {
    min: number;
    max: number;
    default: number;
    step: number;
}

export interface AdjustmentRanges {
    temperature: AdjustmentRange;
    tint: AdjustmentRange;
    saturation: AdjustmentRange;
    vibrance: AdjustmentRange;
    exposure: AdjustmentRange;
    contrast: AdjustmentRange;
    highlights: AdjustmentRange;
    shadows: AdjustmentRange;
    whites: AdjustmentRange;
    blacks: AdjustmentRange;
    clarity: AdjustmentRange;
    sharpness: AdjustmentRange;
}

export declare const ADJUSTMENT_RANGES: AdjustmentRanges;

export declare class HonchoEditor {
    constructor();
    
    // Initialization - must be called before any other methods
    initialize(verbose?: boolean): Promise<boolean>;
    
    // Image Loading
    loadImageFromFile(file: File): Promise<ImageSize>;
    loadImageFromUrl(url: string): Promise<ImageSize>;
    loadImageFromImageElement(img: HTMLImageElement): ImageSize;
    loadImageFromImageData(imageData: ImageData): ImageSize;
    
    // Adjustments (all auto-trigger re-render)
    setTemperature(value: number): void;
    setTint(value: number): void;
    setSaturation(value: number): void;
    setVibrance(value: number): void;
    setExposure(value: number): void;
    setContrast(value: number): void;
    setHighlights(value: number): void;
    setShadows(value: number): void;
    setWhites(value: number): void;
    setBlacks(value: number): void;
    setClarity(value: number): void;
    setSharpness(value: number): void;
    
    // Batch adjustments
    setAdjustments(adjustments: AdjustmentValues): void;
    
        // Reset all adjustments to default values
    resetAdjustments(): void;
    
    // Manual processing trigger - call this after setting adjustments
    processImage(): void;
    
    // Frame functionality
    setFrame(frameData: Uint8Array, frameWidth: number, frameHeight: number, frameChannels: number): boolean;
    setFrameFromImageData(frameImageData: ImageData): boolean;
    setFrameFromCanvas(frameCanvas: HTMLCanvasElement): boolean;
    clearFrame(): void;
    hasFrame(): boolean;
    
    // Convenience methods
    processImageOneShot(
        imageSource: File | ImageData | HTMLImageElement,
        adjustments?: Partial<AdjustmentValues>,
        frameSource?: File | ImageData | HTMLImageElement | null
    ): Promise<ImageData>;
    
    // Rendering
    renderToCanvas(canvas: HTMLCanvasElement): void;  // GPU path <1ms
    getProcessedImageData(): ImageData;               // CPU path 50-100ms
    
    // Utilities
    getImageSize(): ImageSize;
    getInitialized(): boolean;
    getRawModule(): any;
    
    // Cleanup
    cleanup(): void;
}

export declare namespace HonchoEditorUtils {
    function imageDataToBlob(imageData: ImageData, format?: string, quality?: number): Promise<Blob>;
    function downloadBlob(blob: Blob, filename: string): void;
    function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T;
    function isValidImageFile(file: File): boolean;
    function formatFileSize(bytes: number): string;
}

export default HonchoEditor;
