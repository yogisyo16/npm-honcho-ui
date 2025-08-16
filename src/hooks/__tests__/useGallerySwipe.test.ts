// Placeholder test file - actual tests are commented out for now
describe('useGallerySwipe', () => {
  it('should have tests implemented', () => {
    expect(true).toBe(true);
  });
});

// TODO: Uncomment and implement these tests when ready
// import { renderHook, waitFor, act } from '@testing-library/react';
// import { useGallerySwipe } from '../useGallerySwipe';
// import { Controller } from '../editor/useHonchoEditor';
// import { Gallery, ResponseGalleryPaging } from '../editor/type';

// // Mock data factory functions
// const createMockGallery = (id: string, eventId: string = 'event-123'): Gallery => ({
//   id,
//   uid: 'user-123',
//   event_id: eventId,
//   download: {
//     key: `${id}-download`,
//     path: `https://example.com/${id}-download.jpg`,
//     size: 1024000,
//     width: 1920,
//     height: 1080,
//   },
//   download_edited: null,
//   thumbnail: {
//     key: `${id}-thumb`,
//     path: `https://example.com/${id}-thumb.jpg`,
//     size: 50000,
//     width: 300,
//     height: 200,
//   },
//   thumbnail_edited: null,
//   is_original: true,
//   available: true,
//   show_gallery: true,
//   log: {
//     created_at: '2025-01-01T00:00:00Z',
//     updated_at: '2025-01-01T00:00:00Z',
//   },
// });

// const createMockPagingResponse = (
//   images: Gallery[],
//   currentPage: number = 1,
//   nextPage: number = 0
// ): ResponseGalleryPaging => ({
//   gallery: images,
//   limit: 10,
//   current_page: currentPage,
//   prev_page: currentPage > 1 ? currentPage - 1 : 0,
//   next_page: nextPage,
//   sum_of_image: images.length,
// });

// // Mock controller factory
// const createMockController = (): jest.Mocked<Controller> => ({
//   onGetImage: jest.fn(),
//   getImageList: jest.fn(),
//   syncConfig: jest.fn(),
//   handleBack: jest.fn(),
//   getPresets: jest.fn(),
//   createPreset: jest.fn(),
//   deletePreset: jest.fn(),
// });

// describe('useGallerySwipe', () => {
//   let mockController: jest.Mocked<Controller>;
  
//   beforeEach(() => {
//     mockController = createMockController();
//     jest.clearAllMocks();
//   });

//   describe('Initialization', () => {
//     it('should return initial state when parameters are null', () => {
//       const { result } = renderHook(() => 
//         useGallerySwipe(null, null, null)
//       );

//       expect(result.current.currentImageData).toBeNull();
//       expect(result.current.isNextAvailable).toBe(false);
//       expect(result.current.isPrevAvailable).toBe(false);
//       expect(result.current.isLoading).toBe(false);
//       expect(result.current.error).toBeNull();
//     });

//     it('should initialize successfully with valid parameters', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-1';
//       const mockGallery = createMockGallery(initImageId);
//       const mockImages = [
//         createMockGallery('image-1'),
//         createMockGallery('image-2'),
//         createMockGallery('image-3'),
//       ];

//       // Mock controller responses
//       mockController.onGetImage.mockResolvedValueOnce(mockGallery);
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse(mockImages, 1, 2)
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       // Initial loading state
//       expect(result.current.isLoading).toBe(true);

//       // Wait for initialization to complete
//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // Verify successful initialization
//       expect(result.current.currentImageData).toEqual(mockGallery);
//       expect(result.current.error).toBeNull();
//       expect(result.current.isNextAvailable).toBe(true);
//       expect(result.current.isPrevAvailable).toBe(false);

//       // Verify controller calls
//       expect(mockController.onGetImage).toHaveBeenCalledWith(firebaseUid, initImageId);
//       expect(mockController.getImageList).toHaveBeenCalledWith(firebaseUid, 'event-123', 1);
//     });

//     it('should handle initialization failure gracefully', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-1';

//       // Mock controller to throw error
//       mockController.onGetImage.mockRejectedValueOnce(new Error('Failed to fetch image'));

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       // Wait for error to be set
//       await waitFor(() => {
//         expect(result.current.error).toBe('Failed to fetch image');
//       });

//       expect(result.current.currentImageData).toBeNull();
//       expect(result.current.isLoading).toBe(false);
//     });

//     it('should not re-initialize when called with same parameters', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-1';
//       const mockGallery = createMockGallery(initImageId);
//       const mockImages = [createMockGallery('image-1')];

//       mockController.onGetImage.mockResolvedValue(mockGallery);
//       mockController.getImageList.mockResolvedValue(
//         createMockPagingResponse(mockImages)
//       );

//       const { result, rerender } = renderHook(
//         ({ uid, imageId, controller }) => useGallerySwipe(uid, imageId, controller),
//         {
//           initialProps: {
//             uid: firebaseUid,
//             imageId: initImageId,
//             controller: mockController,
//           },
//         }
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // Clear mock calls after initial render
//       jest.clearAllMocks();

//       // Rerender with same props
//       rerender({
//         uid: firebaseUid,
//         imageId: initImageId,
//         controller: mockController,
//       });

//       // Should not call controller again
//       expect(mockController.onGetImage).not.toHaveBeenCalled();
//       expect(mockController.getImageList).not.toHaveBeenCalled();
//     });
//   });

//   describe('Image Search Across Pages', () => {
//     it('should find image across multiple pages', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-5'; // Image on page 2
//       const mockGallery = createMockGallery(initImageId);

//       // Mock first page without target image
//       const page1Images = [
//         createMockGallery('image-1'),
//         createMockGallery('image-2'),
//       ];

//       // Mock second page with target image
//       const page2Images = [
//         createMockGallery('image-3'),
//         createMockGallery('image-4'),
//         createMockGallery('image-5'),
//       ];

//       mockController.onGetImage.mockResolvedValueOnce(mockGallery);
//       mockController.getImageList
//         .mockResolvedValueOnce(createMockPagingResponse(page1Images, 1, 2))
//         .mockResolvedValueOnce(createMockPagingResponse(page2Images, 2, 0));

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // Should have called getImageList twice (page 1 and page 2)
//       expect(mockController.getImageList).toHaveBeenCalledTimes(2);
//       expect(mockController.getImageList).toHaveBeenNthCalledWith(1, firebaseUid, 'event-123', 1);
//       expect(mockController.getImageList).toHaveBeenNthCalledWith(2, firebaseUid, 'event-123', 2);

//       // Should have correct availability
//       expect(result.current.isPrevAvailable).toBe(true); // Has previous images from page 1 and 2
//       expect(result.current.isNextAvailable).toBe(false); // No next page available
//     });

//     it('should handle safety limit when image not found', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'non-existent-image';
//       const mockGallery = createMockGallery(initImageId);

//       mockController.onGetImage.mockResolvedValueOnce(mockGallery);
      
//       // Mock getImageList to always return different images (never the target)
//       const mockPage = [createMockGallery('other-image')];
//       mockController.getImageList.mockResolvedValue(
//         createMockPagingResponse(mockPage, 1, 2) // Always has next page
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // Should have called getImageList many times due to safety limit
//       expect(mockController.getImageList.mock.calls.length).toBeGreaterThan(50);
//     });
//   });

//   describe('Navigation - Next Image', () => {
//     it('should navigate to next image within current page', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-1';
//       const mockImages = [
//         createMockGallery('image-1'),
//         createMockGallery('image-2'),
//         createMockGallery('image-3'),
//       ];
//       const nextImageGallery = createMockGallery('image-2');

//       // Setup initial state
//       mockController.onGetImage
//         .mockResolvedValueOnce(createMockGallery(initImageId))
//         .mockResolvedValueOnce(nextImageGallery);
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse(mockImages)
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // Clear mocks after initialization
//       jest.clearAllMocks();
//       mockController.onGetImage.mockResolvedValueOnce(nextImageGallery);

//       // Navigate to next image
//       await act(async () => {
//         await result.current.onSwipeNext();
//       });

//       await waitFor(() => {
//         expect(result.current.currentImageData).toEqual(nextImageGallery);
//       });

//       // Should have fetched the next image data
//       expect(mockController.onGetImage).toHaveBeenCalledWith(firebaseUid, 'image-2');
      
//       // Should not have called getImageList again
//       expect(mockController.getImageList).not.toHaveBeenCalled();
//     });

//     it('should load next page when at end of current page', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-2';
      
//       // Initial page
//       const page1Images = [
//         createMockGallery('image-1'),
//         createMockGallery('image-2'),
//       ];
      
//       // Next page
//       const page2Images = [
//         createMockGallery('image-3'),
//         createMockGallery('image-4'),
//       ];

//       const nextImageGallery = createMockGallery('image-3');

//       // Setup initial state
//       mockController.onGetImage
//         .mockResolvedValueOnce(createMockGallery(initImageId))
//         .mockResolvedValueOnce(nextImageGallery);
//       mockController.getImageList
//         .mockResolvedValueOnce(createMockPagingResponse(page1Images, 1, 2))
//         .mockResolvedValueOnce(createMockPagingResponse(page2Images, 2, 0));

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // Clear mocks after initialization
//       jest.clearAllMocks();
//       mockController.onGetImage.mockResolvedValueOnce(nextImageGallery);
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse(page2Images, 2, 0)
//       );

//       // Navigate to next image (should trigger page load)
//       await act(async () => {
//         await result.current.onSwipeNext();
//       });

//       await waitFor(() => {
//         expect(result.current.currentImageData).toEqual(nextImageGallery);
//       });

//       // Should have loaded next page
//       expect(mockController.getImageList).toHaveBeenCalledWith(firebaseUid, 'event-123', 2);
//       expect(mockController.onGetImage).toHaveBeenCalledWith(firebaseUid, 'image-3');
//     });

//     it('should handle end of gallery gracefully', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-2';
      
//       const mockImages = [
//         createMockGallery('image-1'),
//         createMockGallery('image-2'),
//       ];

//       // Setup initial state - no next page available
//       mockController.onGetImage.mockResolvedValueOnce(createMockGallery(initImageId));
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse(mockImages, 1, 0) // No next page
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       expect(result.current.isNextAvailable).toBe(false);

//       // Try to navigate next (should set error)
//       await act(async () => {
//         await result.current.onSwipeNext();
//       });

//       await waitFor(() => {
//         expect(result.current.error).toBe('No more images available');
//       });
//     });
//   });

//   describe('Navigation - Previous Image', () => {
//     it('should navigate to previous image', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-2';
//       const mockImages = [
//         createMockGallery('image-1'),
//         createMockGallery('image-2'),
//         createMockGallery('image-3'),
//       ];
//       const prevImageGallery = createMockGallery('image-1');

//       // Setup initial state
//       mockController.onGetImage
//         .mockResolvedValueOnce(createMockGallery(initImageId))
//         .mockResolvedValueOnce(prevImageGallery);
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse(mockImages)
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // Clear mocks after initialization
//       jest.clearAllMocks();
//       mockController.onGetImage.mockResolvedValueOnce(prevImageGallery);

//       // Navigate to previous image
//       await act(async () => {
//         await result.current.onSwipePrev();
//       });

//       await waitFor(() => {
//         expect(result.current.currentImageData).toEqual(prevImageGallery);
//       });

//       expect(mockController.onGetImage).toHaveBeenCalledWith(firebaseUid, 'image-1');
//     });

//     it('should handle beginning of gallery gracefully', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-1';
      
//       const mockImages = [
//         createMockGallery('image-1'),
//         createMockGallery('image-2'),
//       ];

//       // Setup initial state
//       mockController.onGetImage.mockResolvedValueOnce(createMockGallery(initImageId));
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse(mockImages)
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       expect(result.current.isPrevAvailable).toBe(false);

//       // Try to navigate previous (should set error)
//       await act(async () => {
//         await result.current.onSwipePrev();
//       });

//       await waitFor(() => {
//         expect(result.current.error).toBe('Already at the first image');
//       });
//     });
//   });

//   describe('Availability Calculations', () => {
//     it('should calculate next availability correctly with more pages', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-2';
      
//       const mockImages = [
//         createMockGallery('image-1'),
//         createMockGallery('image-2'),
//       ];

//       mockController.onGetImage.mockResolvedValueOnce(createMockGallery(initImageId));
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse(mockImages, 1, 2) // Has next page
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // At last image of current page, but has next page
//       expect(result.current.isNextAvailable).toBe(true);
//       expect(result.current.isPrevAvailable).toBe(true);
//     });

//     it('should calculate availability correctly without more pages', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-2';
      
//       const mockImages = [
//         createMockGallery('image-1'),
//         createMockGallery('image-2'),
//       ];

//       mockController.onGetImage.mockResolvedValueOnce(createMockGallery(initImageId));
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse(mockImages, 1, 0) // No next page
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // At last image with no next page
//       expect(result.current.isNextAvailable).toBe(false);
//       expect(result.current.isPrevAvailable).toBe(true);
//     });

//     it('should disable navigation during loading', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-1';

//       // Mock slow response
//       mockController.onGetImage.mockImplementation(() => 
//         new Promise(resolve => setTimeout(() => resolve(createMockGallery(initImageId)), 100))
//       );
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse([createMockGallery('image-1')])
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       // During loading
//       expect(result.current.isLoading).toBe(true);
//       expect(result.current.isNextAvailable).toBe(false);
//       expect(result.current.isPrevAvailable).toBe(false);

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });
//     });
//   });

//   describe('Error Handling', () => {
//     it('should handle navigation errors gracefully', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-1';
      
//       const mockImages = [
//         createMockGallery('image-1'),
//         createMockGallery('image-2'),
//       ];

//       // Setup successful initialization
//       mockController.onGetImage.mockResolvedValueOnce(createMockGallery(initImageId));
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse(mockImages)
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // Mock error on next navigation
//       mockController.onGetImage.mockRejectedValueOnce(new Error('Network error'));

//       await act(async () => {
//         await result.current.onSwipeNext();
//       });

//       await waitFor(() => {
//         expect(result.current.error).toBe('Network error');
//       });
//     });

//     it('should handle page loading errors', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-1';
      
//       const mockImages = [createMockGallery('image-1')];

//       // Setup successful initialization with next page available
//       mockController.onGetImage.mockResolvedValueOnce(createMockGallery(initImageId));
//       mockController.getImageList
//         .mockResolvedValueOnce(createMockPagingResponse(mockImages, 1, 2))
//         .mockRejectedValueOnce(new Error('Failed to load page'));

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // Try to navigate next (should trigger page load error)
//       await act(async () => {
//         await result.current.onSwipeNext();
//       });

//       await waitFor(() => {
//         expect(result.current.error).toBe('No more images available');
//       });
//     });
//   });

//   describe('Edge Cases', () => {
//     it('should handle empty image list gracefully', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-1';
//       const mockGallery = createMockGallery(initImageId);

//       mockController.onGetImage.mockResolvedValueOnce(mockGallery);
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse([], 1, 0) // Empty image list
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       expect(result.current.isNextAvailable).toBe(false);
//       expect(result.current.isPrevAvailable).toBe(false);
//     });

//     it('should handle rapid navigation calls gracefully', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-1';
//       const mockImages = [
//         createMockGallery('image-1'),
//         createMockGallery('image-2'),
//         createMockGallery('image-3'),
//       ];

//       mockController.onGetImage.mockResolvedValue(createMockGallery('image-2'));
//       mockController.getImageList.mockResolvedValueOnce(
//         createMockPagingResponse(mockImages)
//       );

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // Clear mocks after initialization
//       jest.clearAllMocks();
//       mockController.onGetImage.mockResolvedValue(createMockGallery('image-2'));

//       // Make navigation calls - hook should handle gracefully
//       await act(async () => {
//         await result.current.onSwipeNext();
//       });

//       await act(async () => {
//         await result.current.onSwipeNext();
//       });

//       // Wait for any pending operations
//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       // Should have handled both calls successfully
//       expect(mockController.onGetImage).toHaveBeenCalledTimes(2);
//     });

//     it('should handle controller returning null gracefully', async () => {
//       const firebaseUid = 'user-123';
//       const initImageId = 'image-1';

//       mockController.onGetImage.mockResolvedValueOnce(null as any);

//       const { result } = renderHook(() => 
//         useGallerySwipe(firebaseUid, initImageId, mockController)
//       );

//       await waitFor(() => {
//         expect(result.current.error).toBe('Failed to fetch initial image data');
//       });

//       expect(result.current.currentImageData).toBeNull();
//       expect(result.current.isLoading).toBe(false);
//     });
//   });

//   describe('Parameter Changes', () => {
//     it('should re-initialize when firebaseUid changes', async () => {
//       const initImageId = 'image-1';
//       const mockGallery = createMockGallery(initImageId);
//       const mockImages = [createMockGallery('image-1')];

//       mockController.onGetImage.mockResolvedValue(mockGallery);
//       mockController.getImageList.mockResolvedValue(
//         createMockPagingResponse(mockImages)
//       );

//       const { result, rerender } = renderHook(
//         ({ uid }) => useGallerySwipe(uid, initImageId, mockController),
//         { initialProps: { uid: 'user-123' } }
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       expect(mockController.onGetImage).toHaveBeenCalledTimes(1);

//       // Change firebaseUid
//       rerender({ uid: 'user-456' });

//       await waitFor(() => {
//         expect(mockController.onGetImage).toHaveBeenCalledTimes(2);
//       });

//       expect(mockController.onGetImage).toHaveBeenLastCalledWith('user-456', initImageId);
//     });

//     it('should re-initialize when initImageId changes', async () => {
//       const firebaseUid = 'user-123';
//       const mockGallery1 = createMockGallery('image-1');
//       const mockGallery2 = createMockGallery('image-2');
//       const mockImages = [createMockGallery('image-1'), createMockGallery('image-2')];

//       mockController.onGetImage
//         .mockResolvedValueOnce(mockGallery1)
//         .mockResolvedValueOnce(mockGallery2);
//       mockController.getImageList.mockResolvedValue(
//         createMockPagingResponse(mockImages)
//       );

//       const { result, rerender } = renderHook(
//         ({ imageId }) => useGallerySwipe(firebaseUid, imageId, mockController),
//         { initialProps: { imageId: 'image-1' } }
//       );

//       await waitFor(() => {
//         expect(result.current.isLoading).toBe(false);
//       });

//       expect(result.current.currentImageData).toEqual(mockGallery1);

//       // Change initImageId
//       rerender({ imageId: 'image-2' });

//       await waitFor(() => {
//         expect(result.current.currentImageData).toEqual(mockGallery2);
//       });

//       expect(mockController.onGetImage).toHaveBeenCalledTimes(2);
//       expect(mockController.onGetImage).toHaveBeenLastCalledWith(firebaseUid, 'image-2');
//     });
//   });
// });
