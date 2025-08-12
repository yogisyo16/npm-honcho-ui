import { useState, useEffect, useCallback, useRef } from "react";
import { Controller } from "./editor/useHonchoEditor";
import { Gallery, ResponseGalleryPaging } from "./editor/type";

/**
 * Return type for the useGallerySwipe hook
 * Provides image navigation functionality with pagination support
 */
interface UseGallerySwipeReturn {
    /** Current image data object containing all image information */
    currentImageData: Gallery | null;
    /** Whether next image navigation is available (considers pagination) */
    isNextAvailable: boolean;
    /** Whether previous image navigation is available */
    isPrevAvailable: boolean;
    /** Function to navigate to the next image (async due to potential API calls) */
    onSwipeNext: () => Promise<void>;
    /** Function to navigate to the previous image (async due to potential API calls) */
    onSwipePrev: () => Promise<void>;
    /** Loading state during image transitions and API calls */
    isLoading: boolean;
    /** Error message if any operation fails */
    error: string | null;
}

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
export function useGallerySwipe(
    firebaseUid: string | null, 
    initImageId: string | null, 
    controller: Controller | null
): UseGallerySwipeReturn {
    // Core state for current image and navigation
    const [currentImageId, setCurrentImageId] = useState<string | null>(initImageId);
    const [currentImageData, setCurrentImageData] = useState<Gallery | null>(null);
    const [currentEventId, setCurrentEventId] = useState<string | null>(null);
    
    // Pagination and image list state
    const [currentImageList, setCurrentImageList] = useState<Gallery[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    
    // UI state management
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    
    // Refs to track parameter changes and avoid unnecessary re-initialization
    // This prevents the hook from re-initializing when the same values are passed
    const prevFirebaseUid = useRef<string | null>(null);
    const prevInitImageId = useRef<string | null>(null);

    /**
     * Get the index of the current image in the loaded image list
     * Returns -1 if the current image is not found in the list
     */
    const getCurrentImageIndex = useCallback(() => {
        if (!currentImageId || currentImageList.length === 0) return -1;
        return currentImageList.findIndex(img => img.id === currentImageId);
    }, [currentImageId, currentImageList]);

    /**
     * Fetch image pages sequentially until the target image is found
     * This is necessary because we don't know which page contains the initial image
     * 
     * @param imageId - The target image ID to find
     * @param eventId - The event ID to search within
     * @returns Array of all gallery images up to and including the page containing the target image
     */
    const getImageListUntilFound = useCallback(async (imageId: string, eventId: string): Promise<Gallery[]> => {
        let page = 1;
        let allImages: Gallery[] = [];
        let isFound = false;

        // Search through pages until we find the target image or reach safety limit
        while (!isFound && page <= 100) { // Safety limit to prevent infinite loop
            try {
                const response: ResponseGalleryPaging = await controller!.getImageList(firebaseUid!, eventId, page);
                
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
                } else {
                    // Empty response, stop searching
                    break;
                }
            } catch (err) {
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
    const loadNextPage = useCallback(async (): Promise<Gallery[]> => {
        // Check prerequisites before attempting to load next page
        if (!hasNextPage || !currentEventId || !controller || !firebaseUid) {
            return [];
        }

        try {
            const nextPageNum = currentPage + 1;
            const response: ResponseGalleryPaging = await controller.getImageList(firebaseUid, currentEventId, nextPageNum);
            
            if (response.gallery && response.gallery.length > 0) {
                // Update pagination state with new page information
                setCurrentPage(nextPageNum);
                setHasNextPage(response.next_page !== 0 && response.next_page > response.current_page);
                return response.gallery;
            }
        } catch (err) {
            console.error('Error loading next page:', err);
        }

        return [];
    }, [hasNextPage, currentEventId, controller, firebaseUid, currentPage]);

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
        const needsReinit = 
            prevFirebaseUid.current !== firebaseUid || 
            prevInitImageId.current !== initImageId || 
            !isInitialized;

        if (!needsReinit) return;

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
            setCurrentImageList(allImages);

            // Step 4: Update tracking refs to prevent unnecessary re-initialization
            prevFirebaseUid.current = firebaseUid;
            prevInitImageId.current = initImageId;
            setIsInitialized(true);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(errorMessage);
            console.error('Error initializing gallery:', err);
        } finally {
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
        if (!currentImageId || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const currentIndex = getCurrentImageIndex();
            
            if (currentIndex === -1) {
                throw new Error('Current image not found in list');
            }

            // Scenario 1: At the last image of current list
            if (currentIndex === currentImageList.length - 1) {
                console.log("[SCENARIO 1] if last image: " + currentImageList.length);
                // Try to load next page for more images
                const newImages = await loadNextPage();
                if (newImages.length > 0) {
                    // Extend current list with new images
                    const updatedList = [...currentImageList, ...newImages];
                    setCurrentImageList(updatedList);
                    
                    // Navigate to first image of the new page
                    const nextImage = newImages[0];
                    setCurrentImageId(nextImage.id);
                    
                    // Fetch complete data for the new current image
                    const nextImageData = await controller!.onGetImage(firebaseUid!, nextImage.id);
                    if (nextImageData) {
                        setCurrentImageData(nextImageData);
                    }
                } else {
                    // No more pages available - end of gallery reached
                    setError('No more images available');
                }
            } else {
                // Scenario 2: Navigate to next image in current list
                const nextImage = currentImageList[currentIndex + 1];
                console.log("[SCENARIO 2] Navigating to next image:", nextImage.id);
                setCurrentImageId(nextImage.id);
                
                // Fetch complete data for the next image
                const nextImageData = await controller!.onGetImage(firebaseUid!, nextImage.id);
                if (nextImageData) {
                    setCurrentImageData(nextImageData);
                }
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error moving to next image';
            setError(errorMessage);
            console.error('Error in onSwipeNext:', err);
        } finally {
            setIsLoading(false);
        }
    }, [currentImageId, isLoading, getCurrentImageIndex, currentImageList, loadNextPage, controller, firebaseUid]);

    /**
     * Navigate to the previous image in the gallery
     * Only works within the currently loaded image list
     * (Previous pages are not loaded on-demand for backward navigation)
     * 
     * @returns Promise that resolves when navigation is complete
     */
    const onSwipePrev = useCallback(async () => {
        // Prevent action if no current image or already loading
        if (!currentImageId || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const currentIndex = getCurrentImageIndex();
            
            if (currentIndex === -1) {
                throw new Error('Current image not found in list');
            }

            if (currentIndex > 0) {
                // Navigate to previous image in the current list
                const prevImage = currentImageList[currentIndex - 1];
                setCurrentImageId(prevImage.id);
                
                // Fetch complete data for the previous image
                const prevImageData = await controller!.onGetImage(firebaseUid!, prevImage.id);
                if (prevImageData) {
                    setCurrentImageData(prevImageData);
                }
            } else {
                // Already at the first image of loaded list
                setError('Already at the first image');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error moving to previous image';
            setError(errorMessage);
            console.error('Error in onSwipePrev:', err);
        } finally {
            setIsLoading(false);
        }
    }, [currentImageId, isLoading, getCurrentImageIndex, currentImageList, controller, firebaseUid]);

    /**
     * Calculate if next image navigation is available
     * Returns true if:
     * 1. There's a next image in the current loaded list, OR
     * 2. We're at the end of current list but more pages are available
     * 
     * @returns Boolean indicating if next navigation is possible
     */
    const isNextAvailable = useCallback(() => {
        if (isLoading) return false;
        
        const currentIndex = getCurrentImageIndex();
        if (currentIndex === -1) return false;
        
        // If we're not at the last image, next is definitely available
        if (currentIndex < currentImageList.length - 1) return true;
        
        // If we're at the last image but there are more pages, next is still available
        return hasNextPage;
    }, [isLoading, getCurrentImageIndex, currentImageList.length, hasNextPage]);

    /**
     * Calculate if previous image navigation is available
     * Returns true if there's a previous image in the currently loaded list
     * 
     * @returns Boolean indicating if previous navigation is possible
     */
    const isPrevAvailable = useCallback(() => {
        if (isLoading) return false;
        
        const currentIndex = getCurrentImageIndex();
        return currentIndex > 0;
    }, [isLoading, getCurrentImageIndex]);

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
