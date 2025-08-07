"use strict";
/**
 * Honcho Photo Editor - JavaScript Wrapper
 *
 * This wrapper provides a clean interface to the C++ image processing engine.
 *
 * ARCHITECTURE: Dual-Path Processing
 * ================================
 *
 * FRONTEND (Real-time Preview):
 * - Uses GPU-to-GPU rendering via renderToCanvas()
 * - Zero memory copies for 60fps performance
 * - Optimized for interactive UI sliders
 *
 * BACKEND (Server Processing):
 * - Uses CPU memory path via getProcessedImageData()
 * - Full quality data export for server workflows
 * - Headless processing without WebGL context
 * - Batch processing and API endpoints
 *
 * Both paths use the same C++ processing core with identical results.
 * JavaScript handles all UI and canvas rendering.
 * C++ handles all image processing algorithms.
 */
// Adjustment ranges for UI components
const ADJUSTMENT_RANGES = {
    temperature: { min: -100, max: 100, default: 0, step: 1 },
    tint: { min: -100, max: 100, default: 0, step: 1 },
    saturation: { min: -100, max: 100, default: 0, step: 1 },
    vibrance: { min: -100, max: 100, default: 0, step: 1 },
    exposure: { min: -100, max: 100, default: 0, step: 1 },
    contrast: { min: -100, max: 100, default: 0, step: 1 },
    highlights: { min: -100, max: 100, default: 0, step: 1 },
    shadows: { min: -100, max: 100, default: 0, step: 1 },
    whites: { min: -100, max: 100, default: 0, step: 1 },
    blacks: { min: -100, max: 100, default: 0, step: 1 },
    clarity: { min: -100, max: 100, default: 0, step: 1 },
    sharpness: { min: -100, max: 100, default: 0, step: 1 }
};
class HonchoEditor {
    constructor() {
        this.wasmModule = null;
        this.isInitialized = false;
        this.currentImageData = null;
        this.canvas = null;
        this.currentWidth = 0;
        this.currentHeight = 0;
    }
    /**
     * Initialize the WASM module
     * @param {boolean} verbose - Enable verbose logging (default: false)
     */
    async initialize(verbose = false) {
        try {
            console.log('Initializing Honcho Photo Editor...');
            // Create a hidden canvas for WebGL context that C++ can find
            this.canvas = document.createElement('canvas');
            this.canvas.width = 1;
            this.canvas.height = 1;
            this.canvas.style.display = 'none';
            this.canvas.id = 'canvas'; // Use standard ID that C++ looks for
            document.body.appendChild(this.canvas);
            // Load the WASM module - Module is a factory function
            if (typeof Module !== 'undefined') {
                // Configure the module with the canvas
                this.wasmModule = await Module({
                    canvas: this.canvas,
                    noExitRuntime: true,
                    noInitialRun: true
                });
            }
            else {
                throw new Error('WASM module not found - make sure to load honcho-editor.js first');
            }
            // Create the processor instance with verbose flag (this will initialize OpenGL)
            console.log('Creating processor...');
            // Check if the function exists first
            if (this.wasmModule && typeof this.wasmModule._createProcessor === 'function') {
                this.wasmModule._createProcessor(verbose);
                console.log('Successfully created processor with verbose =', verbose);
            }
            else {
                console.error('_createProcessor function not found!');
                if (this.wasmModule) {
                    console.log('Available functions:', Object.keys(this.wasmModule));
                }
                throw new Error('_createProcessor function not available');
            }
            this.isInitialized = true;
            console.log('Honcho Photo Editor initialized successfully');
            return true;
        }
        catch (error) {
            console.error('Failed to initialize Honcho Photo Editor:', error);
            throw error;
        }
    }
    /**
     * Clean up resources before loading a new image
     */
    cleanupForNewImage() {
        if (!this.isInitialized || !this.wasmModule) {
            return;
        }
        try {
            // Reset any internal state
            this.currentImageData = null;
            this.currentWidth = 0;
            this.currentHeight = 0;
            // Call C++ cleanup if available
            if (typeof this.wasmModule._resetProcessor === 'function') {
                this.wasmModule._resetProcessor();
            }
            console.log('Cleaned up for new image');
        }
        catch (error) {
            console.warn('Warning during cleanup:', error);
        }
    }
    /**
     * Load image from File object (drag & drop, file input)
     */
    async loadImageFromFile(file) {
        if (!this.isInitialized || !this.wasmModule) {
            throw new Error('Editor not initialized');
        }
        // Clean up before loading new image
        this.cleanupForNewImage();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    try {
                        const size = this.loadImageFromImageElement(img);
                        resolve(size);
                    }
                    catch (error) {
                        reject(error);
                    }
                };
                img.onerror = () => {
                    reject(new Error('Failed to load image'));
                };
                img.src = e.target.result;
            };
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            reader.readAsDataURL(file);
        });
    }
    /**
     * Load image from URL
     */
    async loadImageFromUrl(url) {
        if (!this.isInitialized || !this.wasmModule) {
            throw new Error('Editor not initialized');
        }
        // Clean up before loading new image
        this.cleanupForNewImage();
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                try {
                    const size = this.loadImageFromImageElement(img);
                    resolve(size);
                }
                catch (error) {
                    reject(error);
                }
            };
            img.onerror = () => {
                reject(new Error('Failed to load image from URL'));
            };
            img.crossOrigin = 'anonymous'; // Enable CORS
            img.src = url;
        });
    }
    /**
     * Load image from HTML Image element
     */
    loadImageFromImageElement(img) {
        if (!this.isInitialized || !this.wasmModule) {
            throw new Error('Editor not initialized');
        }
        // Clean up before loading new image
        this.cleanupForNewImage();
        // Create canvas to extract image data
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Failed to get 2D context');
        }
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        return this.loadImageFromImageData(imageData);
    }
    /**
     * Load image from ImageData
     */
    loadImageFromImageData(imageData) {
        if (!this.isInitialized || !this.wasmModule) {
            throw new Error('Editor not initialized');
        }
        // Clean up before loading new image (only if we have existing image data)
        if (this.currentImageData) {
            this.cleanupForNewImage();
        }
        try {
            // Validate input
            if (!imageData || !imageData.data || imageData.width <= 0 || imageData.height <= 0) {
                throw new Error('Invalid image data provided');
            }
            this.currentImageData = imageData;
            this.currentWidth = imageData.width;
            this.currentHeight = imageData.height;
            // Allocate memory in WASM
            const dataSize = imageData.data.length;
            const expectedSize = imageData.width * imageData.height * 4; // RGBA
            if (dataSize !== expectedSize) {
                throw new Error(`Image data size mismatch: expected ${expectedSize}, got ${dataSize}`);
            }
            console.log(`Allocating ${dataSize} bytes for ${imageData.width}x${imageData.height} image`);
            const dataPtr = this.wasmModule._malloc(dataSize);
            if (!dataPtr) {
                throw new Error('Failed to allocate memory in WASM');
            }
            // Copy image data to WASM memory
            this.wasmModule.HEAPU8.set(imageData.data, dataPtr);
            // Set image data in C++
            const result = this.wasmModule._setImageData(dataPtr, imageData.width, imageData.height, 4);
            // Free allocated memory
            this.wasmModule._free(dataPtr);
            if (!result) {
                throw new Error('C++ setImageData failed');
            }
            console.log(`Image loaded successfully: ${imageData.width}x${imageData.height}`);
            return {
                width: imageData.width,
                height: imageData.height
            };
        }
        catch (error) {
            console.error('Failed to load image data:', error);
            throw error;
        }
    }
    // Adjustment methods (all auto-trigger re-render)
    setExposure(value) {
        this.validateAdjustment('exposure', value);
        this.wasmModule?._setExposure(value);
    }
    setContrast(value) {
        this.validateAdjustment('contrast', value);
        this.wasmModule?._setContrast(value);
    }
    setHighlights(value) {
        this.validateAdjustment('highlights', value);
        this.wasmModule?._setHighlights(value);
    }
    setShadows(value) {
        this.validateAdjustment('shadows', value);
        this.wasmModule?._setShadows(value);
    }
    setSaturation(value) {
        this.validateAdjustment('saturation', value);
        this.wasmModule?._setSaturation(value);
    }
    setVibrance(value) {
        this.validateAdjustment('vibrance', value);
        this.wasmModule?._setVibrance(value);
    }
    setTemperature(value) {
        this.validateAdjustment('temperature', value);
        this.wasmModule?._setTemperature(value);
    }
    setTint(value) {
        this.validateAdjustment('tint', value);
        this.wasmModule?._setTint(value);
    }
    setBlacks(value) {
        this.validateAdjustment('blacks', value);
        if (this.wasmModule && typeof this.wasmModule._setBlacks === 'function') {
            this.wasmModule._setBlacks(value);
        }
        else {
            console.warn('setBlacks not available in current WASM build');
        }
    }
    setWhites(value) {
        this.validateAdjustment('whites', value);
        if (this.wasmModule && typeof this.wasmModule._setWhites === 'function') {
            this.wasmModule._setWhites(value);
        }
        else {
            console.warn('setWhites not available in current WASM build');
        }
    }
    setClarity(value) {
        this.validateAdjustment('clarity', value);
        if (this.wasmModule && typeof this.wasmModule._setClarity === 'function') {
            this.wasmModule._setClarity(value);
        }
        else {
            console.warn('setClarity not available in current WASM build');
        }
    }
    setSharpness(value) {
        this.validateAdjustment('sharpness', value);
        if (this.wasmModule && typeof this.wasmModule._setSharpness === 'function') {
            this.wasmModule._setSharpness(value);
        }
        else {
            console.warn('setSharpness not available in current WASM build');
        }
    }
    /**
     * Set multiple adjustments at once
     */
    setAdjustments(adjustments) {
        Object.entries(adjustments).forEach(([key, value]) => {
            if (value !== undefined) {
                const methodName = `set${key.charAt(0).toUpperCase() + key.slice(1)}`;
                if (typeof this[methodName] === 'function') {
                    this[methodName](value);
                }
            }
        });
    }
    /**
     * Reset all adjustments to default values
     */
    resetAdjustments() {
        this.wasmModule?._resetAdjustments();
    }
    // ==========================================
    // FRAME FUNCTIONALITY - NEW FEATURE
    // ==========================================
    /**
     * Set a frame overlay from raw image data
     * @param {Uint8Array} data - Raw RGBA image data
     * @param {number} width - Frame width
     * @param {number} height - Frame height
     * @param {number} channels - Number of channels (usually 4 for RGBA)
     * @returns {boolean} - true if frame was set successfully
     */
    setFrame(data, width, height, channels = 4) {
        if (!this.isInitialized || !this.wasmModule) {
            throw new Error('Editor not initialized');
        }
        if (!this.currentImageData) {
            throw new Error('No image loaded. Load an image first before setting frame.');
        }
        try {
            // Allocate memory in WASM for frame data
            const frameSize = width * height * channels;
            const framePtr = this.wasmModule._malloc(frameSize);
            if (!framePtr) {
                throw new Error('Failed to allocate memory for frame data');
            }
            // Copy frame data to WASM memory
            this.wasmModule.HEAPU8.set(data, framePtr);
            // Call native setFrame function
            const success = this.wasmModule._setFrame(framePtr, width, height, channels);
            // Free allocated memory
            this.wasmModule._free(framePtr);
            if (success) {
                console.log(`✅ Frame set: ${width}x${height}`);
                return true;
            }
            else {
                console.error('❌ Failed to set frame');
                return false;
            }
        }
        catch (error) {
            console.error('Error setting frame:', error);
            return false;
        }
    }
    /**
     * Set a frame overlay from an ImageData object
     * The frame will be scaled to match the image size and composited on top
     * @param {ImageData} frameImageData - Frame image data (preferably with alpha channel)
     * @returns {boolean} - true if frame was set successfully
     */
    setFrameFromImageData(frameImageData) {
        if (!this.isInitialized || !this.wasmModule) {
            throw new Error('Editor not initialized');
        }
        if (!this.currentImageData) {
            throw new Error('No image loaded. Load an image first before setting frame.');
        }
        try {
            const { width, height, data } = frameImageData;
            // Allocate memory in WASM for frame data
            const frameSize = width * height * 4; // RGBA
            const framePtr = this.wasmModule._malloc(frameSize);
            if (!framePtr) {
                throw new Error('Failed to allocate memory for frame data');
            }
            // Copy frame data to WASM memory
            this.wasmModule.HEAPU8.set(data, framePtr);
            // Call native setFrame function
            const success = this.wasmModule._setFrame(framePtr, width, height, 4);
            // Free allocated memory
            this.wasmModule._free(framePtr);
            if (success) {
                console.log(`✅ Frame set: ${width}x${height}`);
                return true;
            }
            else {
                console.error('❌ Failed to set frame');
                return false;
            }
        }
        catch (error) {
            console.error('Error setting frame:', error);
            return false;
        }
    }
    /**
     * Set a frame overlay from an HTML Image element
     * @param {HTMLImageElement} frameImage - Frame image element
     * @returns {boolean} - true if frame was set successfully
     */
    setFrameFromImage(frameImage) {
        if (!frameImage.complete) {
            throw new Error('Frame image not loaded. Wait for image.onload before calling this method.');
        }
        // Create a canvas to extract ImageData
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = frameImage.width || frameImage.naturalWidth;
        tempCanvas.height = frameImage.height || frameImage.naturalHeight;
        // Draw frame image to canvas
        tempCtx.drawImage(frameImage, 0, 0);
        // Extract ImageData
        const frameImageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        return this.setFrameFromImageData(frameImageData);
    }
    /**
     * Set a frame overlay from a Canvas element
     * @param {HTMLCanvasElement} frameCanvas - Frame canvas element
     * @returns {boolean} - true if frame was set successfully
     */
    setFrameFromCanvas(frameCanvas) {
        const ctx = frameCanvas.getContext('2d');
        const frameImageData = ctx.getImageData(0, 0, frameCanvas.width, frameCanvas.height);
        return this.setFrameFromImageData(frameImageData);
    }
    /**
     * Clear the current frame overlay
     */
    clearFrame() {
        if (!this.isInitialized || !this.wasmModule) {
            throw new Error('Editor not initialized');
        }
        if (this.wasmModule._clearFrame) {
            this.wasmModule._clearFrame();
            console.log('🧹 Frame cleared');
        }
    }
    /**
     * Check if a frame is currently set
     * @returns {boolean} - true if a frame is set
     */
    hasFrame() {
        if (!this.isInitialized || !this.wasmModule) {
            return false;
        }
        return this.wasmModule._hasFrame ? this.wasmModule._hasFrame() : false;
    }
    // ==========================================
    // CONVENIENCE METHODS
    // ==========================================
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
    async processImageOneShot(imageSource, adjustments = {}, frameSource = null) {
        if (!this.isInitialized || !this.wasmModule) {
            throw new Error('Editor not initialized');
        }
        try {
            // Step 1: Load the image
            console.log('📁 Loading image for one-shot processing...');
            let imageSize;
            if (imageSource instanceof File) {
                imageSize = await this.loadImageFromFile(imageSource);
            }
            else if (imageSource instanceof ImageData) {
                imageSize = this.loadImageFromImageData(imageSource);
            }
            else if (imageSource instanceof HTMLImageElement) {
                imageSize = this.loadImageFromImageElement(imageSource);
            }
            else {
                throw new Error('Unsupported image source type. Use File, ImageData, or HTMLImageElement.');
            }
            console.log(`✅ Image loaded: ${imageSize.width}×${imageSize.height}`);
            // Step 2: Apply frame if provided
            if (frameSource) {
                console.log('🖼️ Applying frame...');
                if (frameSource instanceof File) {
                    await this.setFrameFromFile(frameSource);
                }
                else if (frameSource instanceof ImageData) {
                    this.setFrameFromImageData(frameSource);
                }
                else if (frameSource instanceof HTMLImageElement) {
                    this.setFrameFromImage(frameSource);
                }
                else {
                    throw new Error('Unsupported frame source type. Use File, ImageData, or HTMLImageElement.');
                }
                console.log('✅ Frame applied successfully');
            }
            // Step 3: Apply all adjustments
            console.log('🎛️ Applying adjustments:', adjustments);
            const validAdjustments = [
                'temperature', 'tint', 'exposure', 'contrast', 'highlights',
                'shadows', 'saturation', 'vibrance', 'whites', 'blacks',
                'clarity', 'sharpness'
            ];
            validAdjustments.forEach(name => {
                if (adjustments[name] !== undefined) {
                    const methodName = `set${name.charAt(0).toUpperCase() + name.slice(1)}`;
                    if (typeof this[methodName] === 'function') {
                        this[methodName](adjustments[name]);
                    }
                }
            });
            // Step 4: Process the image
            console.log('⚙️ Processing image...');
            this.processImage();
            // Step 5: Get the processed result
            console.log('📤 Exporting processed image data...');
            const result = this.getProcessedImageData();
            console.log('✅ One-shot processing complete');
            return result;
        }
        catch (error) {
            console.error('❌ One-shot processing failed:', error);
            throw error;
        }
    }
    /**
     * Helper method to load frame from File (for processImageOneShot)
     */
    async setFrameFromFile(frameFile) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                try {
                    this.setFrameFromImage(img);
                    resolve();
                }
                catch (error) {
                    reject(error);
                }
            };
            img.onerror = () => reject(new Error('Failed to load frame image'));
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            };
            reader.onerror = () => reject(new Error('Failed to read frame file'));
            reader.readAsDataURL(frameFile);
        });
    }
    /**
     * Manual processing trigger - call this after setting adjustments
     */
    processImage() {
        if (this.wasmModule && typeof this.wasmModule._processImage === 'function') {
            this.wasmModule._processImage();
        }
        else {
            console.warn('processImage not available in current WASM build');
        }
    }
    /**
     * GPU Path: Render to canvas for real-time preview (<1ms)
     */
    renderToCanvas(canvas) {
        if (!this.isInitialized || !this.wasmModule) {
            throw new Error('Editor not initialized');
        }
        if (!this.currentImageData) {
            throw new Error('No image loaded');
        }
        try {
            // Resize canvas to match image if needed
            if (canvas.width !== this.currentWidth || canvas.height !== this.currentHeight) {
                canvas.width = this.currentWidth;
                canvas.height = this.currentHeight;
            }
            // Update the C++ canvas size to match our target canvas
            if (this.canvas) {
                this.canvas.width = this.currentWidth;
                this.canvas.height = this.currentHeight;
            }
            // Trigger GPU rendering in C++
            this.wasmModule._renderToDisplay();
            // Copy from C++ canvas to target canvas
            const ctx = canvas.getContext('2d');
            if (ctx && this.canvas) {
                ctx.drawImage(this.canvas, 0, 0);
            }
        }
        catch (error) {
            console.error('Failed to render to canvas:', error);
            throw error;
        }
    }
    /**
     * CPU Path: Get processed image data for export (50-100ms)
     */
    getProcessedImageData() {
        if (!this.isInitialized || !this.wasmModule) {
            throw new Error('Editor not initialized');
        }
        if (!this.currentImageData) {
            throw new Error('No image loaded');
        }
        try {
            // Get processed image data from C++
            const dataPtr = this.wasmModule._getProcessedImageData();
            if (dataPtr === 0) {
                throw new Error('Failed to get processed image data');
            }
            // Copy data from WASM memory
            const dataSize = this.currentWidth * this.currentHeight * 4;
            const processedData = new Uint8ClampedArray(dataSize);
            processedData.set(this.wasmModule.HEAPU8.subarray(dataPtr, dataPtr + dataSize));
            // Create ImageData object
            const imageData = new ImageData(processedData, this.currentWidth, this.currentHeight);
            return imageData;
        }
        catch (error) {
            console.error('Failed to get processed image data:', error);
            throw error;
        }
    }
    /**
     * Get current image dimensions
     */
    getImageSize() {
        return {
            width: this.currentWidth,
            height: this.currentHeight
        };
    }
    /**
     * Get current image width
     */
    getWidth() {
        return this.currentWidth || 0;
    }
    /**
     * Get current image height
     */
    getHeight() {
        return this.currentHeight || 0;
    }
    /**
     * Check if editor is initialized
     */
    getInitialized() {
        return this.isInitialized;
    }
    /**
     * Get raw WASM module (advanced usage)
     */
    getRawModule() {
        return this.wasmModule;
    }
    /**
     * Validate adjustment value against range
     */
    validateAdjustment(name, value) {
        const range = ADJUSTMENT_RANGES[name];
        if (!range) {
            throw new Error(`Unknown adjustment: ${name}`);
        }
        if (value < range.min || value > range.max) {
            throw new Error(`${name} value ${value} out of range [${range.min}, ${range.max}]`);
        }
    }
    /**
     * Cleanup resources
     */
    cleanup() {
        if (this.wasmModule) {
            this.wasmModule._destroyProcessor();
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        this.isInitialized = false;
        this.wasmModule = null;
        this.currentImageData = null;
        this.canvas = null;
    }
}
// Export for convenience
// export default HonchoEditor; // Disabled for browser compatibility
// Helper functions for common operations
const HonchoEditorUtils = {
    /**
     * Convert ImageData to Blob for download
     */
    async imageDataToBlob(imageData, format = 'jpeg', quality = 0.9) {
        const canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Failed to get 2D context');
        }
        ctx.putImageData(imageData, 0, 0);
        const mimeType = `image/${format}`;
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                }
                else {
                    reject(new Error('Failed to create blob'));
                }
            }, mimeType, quality);
        });
    },
    /**
     * Download blob as file
     */
    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    },
    /**
     * Create debounced function for performance optimization
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    /**
     * Validate image file type
     */
    isValidImageFile(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'];
        return validTypes.includes(file.type);
    },
    /**
     * Get file size in human readable format
     */
    formatFileSize(bytes) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};
// Export for both Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HonchoEditor, HonchoEditorUtils, ADJUSTMENT_RANGES };
}
else {
    window.HonchoEditor = HonchoEditor;
    window.HonchoEditorUtils = HonchoEditorUtils;
    window.ADJUSTMENT_RANGES = ADJUSTMENT_RANGES;
}
