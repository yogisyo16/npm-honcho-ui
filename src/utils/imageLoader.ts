/**
 * Image loading utilities with CORS handling and fallback mechanisms
 */

/**
 * Load image as blob with CORS handling and proxy fallback
 */
export async function loadImageAsBlob(url: string): Promise<Blob> {
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
}

/**
 * Load image from URL and convert to File object with CORS handling and fallback mechanisms
 */
export async function loadImageAsFile(url: string): Promise<File> {
    try {
        console.debug(`Loading image from URL: ${url}`);
        
        // Load image as blob with CORS handling
        const imageBlob = await loadImageAsBlob(url);
        
        // Convert blob to File for HonchoEditor
        const imageFile = new File([imageBlob], 'image', { type: imageBlob.type });
        console.debug('Image loaded and converted to File successfully');
        
        return imageFile;
    } catch (error) {
        console.error(`Failed to load image from URL ${url}:`, error);
        throw new Error(`Failed to load image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
