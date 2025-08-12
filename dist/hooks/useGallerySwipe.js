import { useState, useEffect, useCallback, useRef } from "react";
/**
 * Custom hook for handling image gallery navigation with automatic pagination
 *
 * This hook manages image swipe/navigation functionality across a paginated gallery.
 * It handles the complexity of finding images across multiple pages and loading
 * additional pages as needed during navigation.
 *
 * @param firebaseUid - User's Firebase UID (can be null during initialization)
 * @param initImageId - Initial image ID to start with (can be null during initialization)
 * @param controller - Controller instance for API calls (can be null during initialization)
 * @returns Object containing current image data and navigation functions
 */
export function useGallerySwipe(firebaseUid, initImageId, controller) {
    // Core state for current image and navigation
    const [currentImageId, setCurrentImageId] = useState(initImageId);
    const [currentImageData, setCurrentImageData] = useState(null);
    const [currentEventId, setCurrentEventId] = useState(null);
    // Pagination and image list state
    const [currentImageList, setCurrentImageList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    // UI state management
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    // Refs to track parameter changes and avoid unnecessary re-initialization
    // This prevents the hook from re-initializing when the same values are passed
    const prevFirebaseUid = useRef(null);
    const prevInitImageId = useRef(null);
    // Refs to track current state values for use in callbacks
    // This prevents stale closure issues with useCallback
    const currentImageIdRef = useRef(currentImageId);
    const currentImageListRef = useRef(currentImageList);
    const currentEventIdRef = useRef(currentEventId);
    const currentPageRef = useRef(currentPage);
    const hasNextPageRef = useRef(hasNextPage);
    // Update refs whenever state changes
    useEffect(() => {
        currentImageIdRef.current = currentImageId;
    }, [currentImageId]);
    useEffect(() => {
        currentImageListRef.current = currentImageList;
    }, [currentImageList]);
    useEffect(() => {
        currentEventIdRef.current = currentEventId;
    }, [currentEventId]);
    useEffect(() => {
        currentPageRef.current = currentPage;
    }, [currentPage]);
    useEffect(() => {
        hasNextPageRef.current = hasNextPage;
    }, [hasNextPage]);
    /**
     * Fetch image pages sequentially until the target image is found
     * This is necessary because we don't know which page contains the initial image
     *
     * @param imageId - The target image ID to find
     * @param eventId - The event ID to search within
     * @returns Array of all gallery images up to and including the page containing the target image
     */
    const getImageListUntilFound = useCallback(async (imageId, eventId) => {
        let page = 1;
        let allImages = [];
        let isFound = false;
        // Search through pages until we find the target image or reach safety limit
        while (!isFound && page <= 100) { // Safety limit to prevent infinite loop
            try {
                const response = await controller.getImageList(firebaseUid, eventId, page);
                if (response.gallery && response.gallery.length > 0) {
                    // Accumulate all images from previous pages
                    allImages = [...allImages, ...response.gallery];
                    // Check if target image is found in current page
                    isFound = response.gallery.some(img => img.id === imageId);
                    if (isFound) {
                        // Update pagination state when target is found
                        setCurrentPage(page);
                        setHasNextPage(response.next_page !== 0 && response.next_page > response.current_page);
                        break;
                    }
                    // If no next page exists, stop searching
                    if (response.next_page === 0 || response.next_page <= response.current_page) {
                        break;
                    }
                    page++;
                }
                else {
                    // Empty response, stop searching
                    break;
                }
            }
            catch (err) {
                console.error(`Error fetching page ${page}:`, err);
                break;
            }
        }
        return allImages;
    }, [controller, firebaseUid]);
    /**
     * Load the next page of images when user reaches the end of current list
     * This enables seamless navigation across page boundaries
     *
     * @returns Array of new images from the next page, or empty array if no more pages
     */
    const loadNextPage = useCallback(async () => {
        // Check prerequisites before attempting to load next page
        if (!hasNextPageRef.current || !currentEventIdRef.current || !controller || !firebaseUid) {
            return [];
        }
        try {
            const nextPageNum = currentPageRef.current + 1;
            const response = await controller.getImageList(firebaseUid, currentEventIdRef.current, nextPageNum);
            if (response.gallery && response.gallery.length > 0) {
                // Update pagination state with new page information
                setCurrentPage(nextPageNum);
                setHasNextPage(response.next_page !== 0 && response.next_page > response.current_page);
                return response.gallery;
            }
        }
        catch (err) {
            console.error('Error loading next page:', err);
        }
        return [];
    }, [controller, firebaseUid]);
    /**
     * Initialize or re-initialize the gallery when parameters change
     * This function:
     * 1. Fetches initial image data
     * 2. Discovers the event ID from the image
     * 3. Loads all image pages until the initial image is found
     * 4. Sets up pagination state
     *
     * Only re-initializes when parameters actually change to avoid unnecessary API calls
     */
    const initializeGallery = useCallback(async () => {
        // Early return if required parameters are missing
        if (!firebaseUid || !initImageId || !controller) {
            setCurrentImageData(null);
            setCurrentImageList([]);
            setIsInitialized(false);
            return;
        }
        // Check if re-initialization is needed by comparing with previous values
        const needsReinit = prevFirebaseUid.current !== firebaseUid ||
            prevInitImageId.current !== initImageId ||
            !isInitialized;
        if (!needsReinit)
            return;
        setIsLoading(true);
        setError(null);
        try {
            // Step 1: Get initial image data to discover event ID
            const gallery = await controller.onGetImage(firebaseUid, initImageId);
            if (!gallery) {
                throw new Error('Failed to fetch initial image data');
            }
            // Step 2: Set up initial state with discovered data
            setCurrentImageData(gallery);
            setCurrentImageId(initImageId);
            setCurrentEventId(gallery.event_id);
            // Step 3: Get complete image list by searching through pages
            // This ensures we have navigation context for the current image
            const allImages = await getImageListUntilFound(initImageId, gallery.event_id);
            console.log("Print all images Id: ", allImages.map(image => image.id).join(', '));
            setCurrentImageList(allImages);
            // Step 4: Update tracking refs to prevent unnecessary re-initialization
            prevFirebaseUid.current = firebaseUid;
            prevInitImageId.current = initImageId;
            setIsInitialized(true);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);
            console.error('Error initializing gallery:', err);
        }
        finally {
            setIsLoading(false);
        }
    }, [firebaseUid, initImageId, controller, getImageListUntilFound, isInitialized]);
    /**
     * Navigate to the next image in the gallery
     * Handles two scenarios:
     * 1. Next image exists in current loaded list - navigate directly
     * 2. At end of current list - load next page and navigate to first image of new page
     *
     * @returns Promise that resolves when navigation is complete
     */
    const onSwipeNext = useCallback(async () => {
        // Prevent action if no current image or already loading
        if (!currentImageIdRef.current || isLoading)
            return;
        setIsLoading(true);
        setError(null);
        try {
            // Debug logging using ref values
            console.log("=== SWIPE NEXT DEBUG ===");
            console.log("currentImageId (ref):", currentImageIdRef.current);
            console.log("currentImageList length (ref):", currentImageListRef.current.length);
            console.log("currentImageList IDs (ref):", currentImageListRef.current.map(img => img.id).join(", "));
            // Calculate current index using ref values
            const currentIndex = currentImageListRef.current.findIndex(img => img.id === currentImageIdRef.current);
            console.log("Current index: ", currentIndex);
            if (currentIndex === -1) {
                throw new Error('Current image not found in list');
            }
            // Scenario 1: At the last image of current list
            if (currentIndex === currentImageListRef.current.length - 1) {
                console.log("[SCENARIO 1] if last image: " + currentImageListRef.current.length);
                // Try to load next page for more images
                const newImages = await loadNextPage();
                if (newImages.length > 0) {
                    // Extend current list with new images
                    const updatedList = [...currentImageListRef.current, ...newImages];
                    setCurrentImageList(updatedList);
                    // Navigate to first image of the new page
                    const nextImage = newImages[0];
                    console.log("Setting currentImageId to:", nextImage.id);
                    setCurrentImageId(nextImage.id);
                    // Fetch complete data for the new current image
                    const nextImageData = await controller.onGetImage(firebaseUid, nextImage.id);
                    if (nextImageData) {
                        setCurrentImageData(nextImageData);
                    }
                }
                else {
                    // No more pages available - end of gallery reached
                    setError('No more images available');
                }
            }
            else {
                // Scenario 2: Navigate to next image in current list
                const nextImage = currentImageListRef.current[currentIndex + 1];
                console.log("[SCENARIO 2] Navigating to next image:", nextImage.id);
                console.log("Setting currentImageId from", currentImageIdRef.current, "to", nextImage.id);
                setCurrentImageId(nextImage.id);
                // Fetch complete data for the next image
                const nextImageData = await controller.onGetImage(firebaseUid, nextImage.id);
                if (nextImageData) {
                    setCurrentImageData(nextImageData);
                }
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error moving to next image';
            setError(errorMessage);
            console.error('Error in onSwipeNext:', err);
        }
        finally {
            setIsLoading(false);
        }
    }, [isLoading, loadNextPage, controller, firebaseUid]);
    /**
     * Navigate to the previous image in the gallery
     * Only works within the currently loaded image list
     * (Previous pages are not loaded on-demand for backward navigation)
     *
     * @returns Promise that resolves when navigation is complete
     */
    const onSwipePrev = useCallback(async () => {
        // Prevent action if no current image or already loading
        if (!currentImageIdRef.current || isLoading)
            return;
        setIsLoading(true);
        setError(null);
        try {
            // Calculate current index using ref values
            const currentIndex = currentImageListRef.current.findIndex(img => img.id === currentImageIdRef.current);
            if (currentIndex === -1) {
                throw new Error('Current image not found in list');
            }
            if (currentIndex > 0) {
                // Navigate to previous image in the current list
                const prevImage = currentImageListRef.current[currentIndex - 1];
                setCurrentImageId(prevImage.id);
                // Fetch complete data for the previous image
                const prevImageData = await controller.onGetImage(firebaseUid, prevImage.id);
                if (prevImageData) {
                    setCurrentImageData(prevImageData);
                }
            }
            else {
                // Already at the first image of loaded list
                setError('Already at the first image');
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error moving to previous image';
            setError(errorMessage);
            console.error('Error in onSwipePrev:', err);
        }
        finally {
            setIsLoading(false);
        }
    }, [isLoading, controller, firebaseUid]);
    /**
     * Calculate if next image navigation is available
     * Returns true if:
     * 1. There's a next image in the current loaded list, OR
     * 2. We're at the end of current list but more pages are available
     *
     * @returns Boolean indicating if next navigation is possible
     */
    const isNextAvailable = useCallback(() => {
        if (isLoading || !currentImageIdRef.current)
            return false;
        // Calculate current index using ref values
        const currentIndex = currentImageListRef.current.findIndex(img => img.id === currentImageIdRef.current);
        if (currentIndex === -1)
            return false;
        // If we're not at the last image, next is definitely available
        if (currentIndex < currentImageListRef.current.length - 1)
            return true;
        // If we're at the last image but there are more pages, next is still available
        return hasNextPageRef.current;
    }, [isLoading]);
    /**
     * Calculate if previous image navigation is available
     * Returns true if there's a previous image in the currently loaded list
     *
     * @returns Boolean indicating if previous navigation is possible
     */
    const isPrevAvailable = useCallback(() => {
        if (isLoading || !currentImageIdRef.current)
            return false;
        // Calculate current index using ref values
        const currentIndex = currentImageListRef.current.findIndex(img => img.id === currentImageIdRef.current);
        return currentIndex > 0;
    }, [isLoading]);
    // Initialize when dependencies change
    useEffect(() => {
        initializeGallery();
    }, [initializeGallery]);
    // Update currentImageId when initImageId changes (but only if different)
    // This allows the hook to respond to external changes to the initial image ID
    useEffect(() => {
        if (initImageId && initImageId !== currentImageId) {
            setCurrentImageId(initImageId);
        }
    }, [initImageId, currentImageId]);
    // Return all the functionality and state that components need
    return {
        currentImageData,
        isNextAvailable: isNextAvailable(),
        isPrevAvailable: isPrevAvailable(),
        onSwipeNext,
        onSwipePrev,
        isLoading,
        error
    };
}
