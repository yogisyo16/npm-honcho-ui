import { Gallery } from './editor/type';
import { Controller } from "./editor/useHonchoEditor";
/**
 * Configuration options for the paging hook
 */
export interface PagingOptions {
    /** Enable development warnings for debugging */
    devWarnings?: boolean;
    /** Auto-load first page on hook initialization */
    autoLoad?: boolean;
    /** Reset pagination when dependencies change */
    autoReset?: boolean;
}
/**
 * Information about the current paging state
 */
export interface PagingInfo {
    /** Whether images are currently being loaded */
    isLoading: boolean;
    /** Whether more pages are being loaded */
    isLoadingMore: boolean;
    /** Error message if any operation failed */
    error: string | null;
    /** Current page number */
    currentPage: number;
    /** Whether there are more pages to load */
    hasMore: boolean;
    /** Total number of images loaded */
    totalImages: number;
    /** Whether the hook has been initialized */
    isInitialized: boolean;
}
/**
 * Actions available for paging management
 */
export interface PagingActions {
    /** Load more images (next page) - only one instance can run at a time */
    loadMore: () => Promise<void>;
    /** Refresh/reload from first page */
    refresh: () => Promise<void>;
    /** Reset pagination state */
    reset: () => void;
}
/**
 * Return type for the usePaging hook
 */
export interface UsePagingReturn {
    /** Current list of images */
    images: Gallery[];
    /** Information about paging state */
    info: PagingInfo;
    /** Available paging actions */
    actions: PagingActions;
}
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
export declare function usePaging(controller: Controller | null, firebaseUid: string, eventId: string, options?: PagingOptions): UsePagingReturn;
