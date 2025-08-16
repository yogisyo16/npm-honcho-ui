import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
/**
 * Hook for managing paginated image loading with ControllerBulk.
 *
 * **Key Features:**
 * - **Paginated Loading**: Handles page-by-page image loading
 * - **State Management**: Maintains image list and pagination state
 * - **Load More**: Seamlessly loads and appends next pages
 * - **Mutation**: Update specific images without full reload
 * - **Error Handling**: Provides error states for failed operations
 * - **Auto-loading**: Optional automatic first page loading
 *
 * **Typical Usage:**
 * ```typescript
 * const { images, info, actions } = usePaging(controller, firebaseUid, eventId, {
 *   autoLoad: true,
 *   autoReset: true
 * });
 *
 * // Load more images
 * await actions.loadMore();
 *
 * // Refresh from beginning
 * await actions.refresh();
 *
 * // Update specific image
 * actions.mutateImage(imageId, (img) => ({ ...img, isSelected: true }));
 * ```
 *
 * @param controller - Backend controller for API communication
 * @param firebaseUid - User identifier for backend operations
 * @param eventId - Event identifier for image list
 * @param options - Configuration options
 * @returns Object with images, info, and actions
 */
export function usePaging(controller, firebaseUid, eventId, options = {}) {
    // Memoize options to prevent re-renders when object is recreated with same values
    const memoizedOptions = useMemo(() => ({
        devWarnings: options.devWarnings ?? false,
        autoLoad: options.autoLoad ?? false,
        autoReset: options.autoReset ?? true
    }), [options.devWarnings, options.autoLoad, options.autoReset]);
    // Core state
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);
    // Track if loadMore is currently running to prevent spam
    const isLoadMoreRunningRef = useRef(false);
    // Track dependencies with stable refs
    const controllerRef = useRef(controller);
    const firebaseUidRef = useRef(firebaseUid);
    const eventIdRef = useRef(eventId);
    // Only update refs when values actually change
    if (controllerRef.current !== controller) {
        controllerRef.current = controller;
    }
    if (firebaseUidRef.current !== firebaseUid) {
        firebaseUidRef.current = firebaseUid;
    }
    if (eventIdRef.current !== eventId) {
        eventIdRef.current = eventId;
    }
    // Helper function to log debug messages
    const debugLog = useCallback((message, data) => {
        if (memoizedOptions.devWarnings) {
            console.log(`[usePaging] ${message}`, data || '');
        }
    }, [memoizedOptions.devWarnings]);
    // Helper function to handle errors
    const handleError = useCallback((operation, error) => {
        const errorMessage = `Failed to ${operation}: ${error?.message || error}`;
        setError(errorMessage);
        debugLog(`Error in ${operation}`, error);
    }, [debugLog]);
    // Load images for a specific page
    const loadPage = useCallback(async (pageNum, isLoadMore = false) => {
        if (!controllerRef.current || !firebaseUidRef.current || !eventIdRef.current) {
            debugLog('Load skipped: missing controller, firebaseUid, or eventId');
            return;
        }
        // Set appropriate loading state
        if (isLoadMore) {
            setIsLoadingMore(true);
        }
        else {
            setIsLoading(true);
        }
        setError(null);
        try {
            debugLog(`Loading page ${pageNum}...`, { isLoadMore });
            const response = await controllerRef.current.getImageList(firebaseUidRef.current, eventIdRef.current, pageNum);
            debugLog('Page loaded successfully', {
                page: response.current_page,
                imageCount: response.gallery.length,
                hasNext: response.next_page > 0
            });
            // Update images list
            setImages(prev => {
                if (isLoadMore) {
                    // Append new images for load more
                    return [...prev, ...response.gallery];
                }
                else {
                    // Replace all images for initial load or refresh
                    return response.gallery;
                }
            });
            // Update pagination state
            setCurrentPage(response.current_page);
            setHasMore(response.next_page > 0 && response.gallery.length > 0);
            if (!isInitialized) {
                setIsInitialized(true);
            }
        }
        catch (err) {
            handleError(`load page ${pageNum}`, err);
            // On error, don't change images if it's load more
            if (!isLoadMore) {
                setImages([]);
            }
        }
        finally {
            if (isLoadMore) {
                setIsLoadingMore(false);
            }
            else {
                setIsLoading(false);
            }
        }
    }, [debugLog, handleError, isInitialized]);
    // Load more images (next page) - spam-protected
    const loadMore = useCallback(async () => {
        // Prevent multiple concurrent loadMore calls
        if (isLoadMoreRunningRef.current || isLoadingMore || !hasMore) {
            debugLog('Load more skipped', {
                isLoadMoreRunning: isLoadMoreRunningRef.current,
                isLoadingMore,
                hasMore
            });
            return;
        }
        // Mark as running to prevent spam
        isLoadMoreRunningRef.current = true;
        try {
            debugLog('Loading more images...', { nextPage: currentPage + 1 });
            await loadPage(currentPage + 1, true);
        }
        finally {
            // Always reset the running flag
            isLoadMoreRunningRef.current = false;
        }
    }, [isLoadingMore, hasMore, currentPage, loadPage, debugLog]);
    // Refresh from first page
    const refresh = useCallback(async () => {
        debugLog('Refreshing from first page...');
        setCurrentPage(1);
        setHasMore(true);
        await loadPage(1, false);
    }, [loadPage, debugLog]);
    // Reset pagination state
    const reset = useCallback(() => {
        debugLog('Resetting pagination state');
        setImages([]);
        setCurrentPage(1);
        setHasMore(true);
        setError(null);
        setIsInitialized(false);
        // Reset loadMore running flag when page changes
        isLoadMoreRunningRef.current = false;
    }, [debugLog]);
    // Auto-load first page on initialization
    useEffect(() => {
        if (memoizedOptions.autoLoad && controller && firebaseUid && eventId && !isInitialized) {
            debugLog('Auto-loading first page...');
            loadPage(1, false);
        }
    }, [memoizedOptions.autoLoad, controller, firebaseUid, eventId, isInitialized, loadPage, debugLog]);
    // Reset when dependencies change (if autoReset is enabled)
    useEffect(() => {
        if (memoizedOptions.autoReset && isInitialized) {
            debugLog('Dependencies changed, resetting state');
            reset();
        }
    }, [controller, firebaseUid, eventId, memoizedOptions.autoReset, isInitialized, reset, debugLog]);
    // Paging info object - memoized to prevent re-renders
    const info = useMemo(() => ({
        isLoading,
        isLoadingMore,
        error,
        currentPage,
        hasMore,
        totalImages: images.length,
        isInitialized
    }), [isLoading, isLoadingMore, error, currentPage, hasMore, images.length, isInitialized]);
    // Actions object - memoized to prevent re-renders
    const actions = useMemo(() => ({
        loadMore,
        refresh,
        reset
    }), [loadMore, refresh, reset]);
    // Return object - memoized to prevent re-renders
    return useMemo(() => ({
        images,
        info,
        actions
    }), [images, info, actions]);
}
