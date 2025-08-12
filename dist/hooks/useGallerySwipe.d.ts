import { Controller } from "./editor/useHonchoEditor";
import { Gallery } from "./editor/type";
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
export declare function useGallerySwipe(firebaseUid: string | null, initImageId: string | null, controller: Controller | null): UseGallerySwipeReturn;
export {};
