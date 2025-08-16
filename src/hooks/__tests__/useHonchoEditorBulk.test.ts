import { renderHook, waitFor, act } from '@testing-library/react';
import { useHonchoEditorBulk } from '../editor/useHonchoEditorBulk';
import { Controller } from '../editor/useHonchoEditor';
import { Gallery, ResponseGalleryPaging } from '../editor/type';

// Mock the dependent hooks
jest.mock('../useAdjustmentHistoryBatch');
jest.mock('../usePaging');

// Mock data factory functions
const createMockGallery = (id: string, eventId: string = 'event-123'): Gallery => ({
  id,
  uid: 'user-123',
  event_id: eventId,
  download: {
    key: `${id}-download`,
    path: `https://example.com/${id}-download.jpg`,
    size: 1024000,
    width: 1920,
    height: 1080,
  },
  download_edited: {
    key: `${id}-download-edited`,
    path: `https://example.com/${id}-download-edited.jpg`,
    size: 1024000,
    width: 1920,
    height: 1080,
  },
  thumbnail: {
    key: `${id}-thumb`,
    path: `https://example.com/${id}-thumb.jpg`,
    size: 50000,
    width: 300,
    height: 200,
  },
  thumbnail_edited: {
    key: `${id}-thumb-edited`,
    path: `https://example.com/${id}-thumb-edited.jpg`,
    size: 50000,
    width: 300,
    height: 200,
  },
  is_original: true,
  available: true,
  show_gallery: true,
  editor_config: {
    color_adjustment: {
      temperature: 0,
      tint: 0,
      vibrance: 0,
      saturation: 0,
      exposure: 0,
      highlights: 0,
      shadows: 0,
      whites: 0,
      blacks: 0,
      contrast: 0,
      clarity: 0,
      sharpness: 0,
    },
    transformation_adjustment: [],
    watermarks: [],
  },
  log: {
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
});

const createMockPagingResponse = (
  images: Gallery[],
  currentPage: number = 1,
  nextPage: number = 0
): ResponseGalleryPaging => ({
  gallery: images,
  limit: 10,
  current_page: currentPage,
  prev_page: currentPage > 1 ? currentPage - 1 : 0,
  next_page: nextPage,
  sum_of_image: images.length,
});

// Mock controller factory
const createMockController = (): jest.Mocked<Controller> => ({
  onGetImage: jest.fn(),
  getImageList: jest.fn(),
  syncConfig: jest.fn(),
  handleBack: jest.fn(),
  getPresets: jest.fn(),
  createPreset: jest.fn(),
  deletePreset: jest.fn(),
  updatePreset: jest.fn(),
});

// Mock the hooks
const mockBatchActions = {
  adjustSelected: jest.fn(),
  undo: jest.fn(),
  redo: jest.fn(),
  reset: jest.fn(),
  setSelection: jest.fn(),
  syncAdjustment: jest.fn(),
  toggleSelection: jest.fn(),
  selectAll: jest.fn(),
  clearSelection: jest.fn(),
  jumpToIndex: jest.fn(),
  clearHistory: jest.fn(),
  getCurrentBatch: jest.fn(),
  syncBatch: jest.fn(),
};

const mockPagingActions = {
  loadMore: jest.fn(),
  refresh: jest.fn(),
  reset: jest.fn(),
};

const mockUseAdjustmentHistoryBatch = {
  currentBatch: {
    currentSelection: {},
    allImages: {},
    initialStates: {},
  },
  selectedIds: [],
  allImageIds: [],
  historyInfo: {
    canUndo: false,
    canRedo: false,
    currentIndex: 0,
    totalStates: 1,
    selectedCount: 0,
    totalImages: 0,
    historySize: 0,
  },
  actions: mockBatchActions,
  config: {
    setMaxSize: jest.fn(),
    getMemoryUsage: jest.fn(),
  },
};

const mockUsePaging = {
  images: [],
  info: {
    isLoading: false,
    isLoadingMore: false,
    error: null,
    currentPage: 1,
    hasMore: false,
    totalImages: 0,
    isInitialized: false,
  },
  actions: mockPagingActions,
};

// Set up mocks
const useAdjustmentHistoryBatchMock = require('../useAdjustmentHistoryBatch').useAdjustmentHistoryBatch as jest.Mock;
const usePagingMock = require('../usePaging').usePaging as jest.Mock;

describe('useHonchoEditorBulk', () => {
  let mockController: jest.Mocked<Controller>;
  
  beforeEach(() => {
    mockController = createMockController();
    jest.clearAllMocks();
    
    // Reset mocks to default values
    useAdjustmentHistoryBatchMock.mockReturnValue(mockUseAdjustmentHistoryBatch);
    usePagingMock.mockReturnValue(mockUsePaging);
  });

  describe('Initialization', () => {
    it('should initialize with empty state', () => {
      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(result.current.imageData).toEqual([]);
      expect(result.current.selectedIds).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.hasMore).toBe(false);
    });

    it('should call usePaging with correct parameters', () => {
      renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(usePagingMock).toHaveBeenCalledWith(mockController, 'user-123', 'event-123');
    });

    it('should call useAdjustmentHistoryBatch', () => {
      renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(useAdjustmentHistoryBatchMock).toHaveBeenCalled();
    });
  });

  describe('Image Data Processing', () => {
    it('should map gallery images to PhotoData format', () => {
      const mockImages = [
        createMockGallery('image-1'),
        createMockGallery('image-2'),
      ];
      
      const selectedIds = ['image-1'];
      
      usePagingMock.mockReturnValue({
        ...mockUsePaging,
        images: mockImages,
      });
      
      useAdjustmentHistoryBatchMock.mockReturnValue({
        ...mockUseAdjustmentHistoryBatch,
        selectedIds,
      });

      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(result.current.imageData).toHaveLength(2);
      expect(result.current.imageData[0]).toMatchObject({
        key: 'image-1',
        isSelected: true,
        alt: 'image-1',
      });
      expect(result.current.imageData[1]).toMatchObject({
        key: 'image-2',
        isSelected: false,
        alt: 'image-2',
      });
    });

    it('should merge batch adjustments with gallery data', () => {
      const mockImages = [createMockGallery('image-1')];
      const mockBatchAdjustments = {
        'image-1': {
          tempScore: 10,
          tintScore: 5,
          exposureScore: -3,
        },
      };
      
      usePagingMock.mockReturnValue({
        ...mockUsePaging,
        images: mockImages,
      });
      
      useAdjustmentHistoryBatchMock.mockReturnValue({
        ...mockUseAdjustmentHistoryBatch,
        currentBatch: {
          ...mockUseAdjustmentHistoryBatch.currentBatch,
          allImages: mockBatchAdjustments,
        },
      });

      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(result.current.imageData[0]).toMatchObject({
        key: 'image-1',
        tempScore: 10,
        tintScore: 5,
        exposureScore: -3,
      });
    });
  });

  describe('Image Synchronization', () => {
    it('should sync new images to batch adjustment', () => {
      const mockImages = [
        createMockGallery('image-1'),
        createMockGallery('image-2'),
      ];
      
      usePagingMock.mockReturnValue({
        ...mockUsePaging,
        images: mockImages,
      });

      renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(mockBatchActions.syncAdjustment).toHaveBeenCalledWith([
        { imageId: 'image-1', adjustment: expect.any(Object) },
        { imageId: 'image-2', adjustment: expect.any(Object) },
      ]);
    });

    it('should not sync same images multiple times', () => {
      const mockImages = [createMockGallery('image-1')];
      
      usePagingMock.mockReturnValue({
        ...mockUsePaging,
        images: mockImages,
      });

      const { rerender } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(mockBatchActions.syncAdjustment).toHaveBeenCalledTimes(1);

      // Clear mock and rerender with same images
      jest.clearAllMocks();
      rerender();

      // Should not sync again
      expect(mockBatchActions.syncAdjustment).not.toHaveBeenCalled();
    });

    it('should sync only new images when list expands', () => {
      const initialImages = [createMockGallery('image-1')];
      const expandedImages = [
        createMockGallery('image-1'),
        createMockGallery('image-2'),
        createMockGallery('image-3'),
      ];
      
      // Start with initial images
      usePagingMock.mockReturnValue({
        ...mockUsePaging,
        images: initialImages,
      });

      const { rerender } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(mockBatchActions.syncAdjustment).toHaveBeenCalledTimes(1);

      // Clear mock and expand image list
      jest.clearAllMocks();
      usePagingMock.mockReturnValue({
        ...mockUsePaging,
        images: expandedImages,
      });
      rerender();

      // Should sync all images (including existing ones for safety)
      expect(mockBatchActions.syncAdjustment).toHaveBeenCalledWith([
        { imageId: 'image-1', adjustment: expect.any(Object) },
        { imageId: 'image-2', adjustment: expect.any(Object) },
        { imageId: 'image-3', adjustment: expect.any(Object) },
      ]);
    });
  });

  describe('Bulk Adjustment Functions', () => {
    it('should provide temperature adjustment functions', () => {
      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      // Test temperature adjustments
      act(() => {
        result.current.handleBulkTempIncrease();
      });
      expect(mockBatchActions.adjustSelected).toHaveBeenCalledWith({ tempScore: 5 });

      act(() => {
        result.current.handleBulkTempDecrease();
      });
      expect(mockBatchActions.adjustSelected).toHaveBeenCalledWith({ tempScore: -5 });

      act(() => {
        result.current.handleBulkTempIncreaseMax();
      });
      expect(mockBatchActions.adjustSelected).toHaveBeenCalledWith({ tempScore: 20 });

      act(() => {
        result.current.handleBulkTempDecreaseMax();
      });
      expect(mockBatchActions.adjustSelected).toHaveBeenCalledWith({ tempScore: -20 });
    });

    it('should provide all adjustment type functions', () => {
      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      // Test one function from each adjustment category
      act(() => {
        result.current.handleBulkExposureIncrease();
      });
      expect(mockBatchActions.adjustSelected).toHaveBeenCalledWith({ exposureScore: 5 });

      act(() => {
        result.current.handleBulkContrastIncrease();
      });
      expect(mockBatchActions.adjustSelected).toHaveBeenCalledWith({ contrastScore: 5 });

      act(() => {
        result.current.handleBulkClarityIncrease();
      });
      expect(mockBatchActions.adjustSelected).toHaveBeenCalledWith({ clarityScore: 5 });
    });
  });

  describe('Selection Management', () => {
    it('should handle image selection toggle', () => {
      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      act(() => {
        result.current.handleToggleImageSelection('image-1');
      });

      expect(mockBatchActions.toggleSelection).toHaveBeenCalledWith('image-1');
    });

    it('should handle bulk preset selection', () => {
      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      const mockEvent = {
        target: { value: 'preset2' }
      } as any;

      act(() => {
        result.current.handleSelectBulkPreset(mockEvent);
      });

      expect(result.current.selectedBulkPreset).toBe('preset2');
    });
  });

  describe('Pagination Integration', () => {
    it('should expose paging loading states', () => {
      usePagingMock.mockReturnValue({
        ...mockUsePaging,
        info: {
          ...mockUsePaging.info,
          isLoading: true,
          hasMore: true,
        },
      });

      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(result.current.isLoading).toBe(true);
      expect(result.current.hasMore).toBe(true);
    });

    it('should expose paging actions', () => {
      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      act(() => {
        result.current.handleLoadMore();
      });
      expect(mockPagingActions.loadMore).toHaveBeenCalled();

      act(() => {
        result.current.handleRefresh();
      });
      expect(mockPagingActions.refresh).toHaveBeenCalled();
    });
  });

  describe('Back Callback', () => {
    it('should call controller handleBack with last selected image', () => {
      const selectedIds = ['image-1', 'image-2', 'image-3'];
      
      useAdjustmentHistoryBatchMock.mockReturnValue({
        ...mockUseAdjustmentHistoryBatch,
        selectedIds,
      });

      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      act(() => {
        result.current.handleBackCallbackBulk();
      });

      expect(mockController.handleBack).toHaveBeenCalledWith('user-123', 'image-3');
    });

    it('should call controller handleBack with empty string when no selection', () => {
      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      act(() => {
        result.current.handleBackCallbackBulk();
      });

      expect(mockController.handleBack).toHaveBeenCalledWith('user-123', '');
    });
  });

  describe('Error Handling', () => {
    it('should expose paging errors', () => {
      usePagingMock.mockReturnValue({
        ...mockUsePaging,
        info: {
          ...mockUsePaging.info,
          error: 'Failed to load images',
        },
      });

      const { result } = renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(result.current.error).toBe('Failed to load images');
    });
  });

  describe('Color Adjustment Mapping', () => {
    it('should map color adjustment from gallery to adjustment state', () => {
      const mockImages = [
        {
          ...createMockGallery('image-1'),
          editor_config: {
            color_adjustment: {
              temperature: 10,
              tint: -5,
              vibrance: 15,
              saturation: 8,
              exposure: -3,
              highlights: -10,
              shadows: 12,
              whites: 5,
              blacks: -8,
              contrast: 7,
              clarity: -2,
              sharpness: 9,
            }
          }
        }
      ];
      
      usePagingMock.mockReturnValue({
        ...mockUsePaging,
        images: mockImages,
      });

      renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(mockBatchActions.syncAdjustment).toHaveBeenCalledWith([
        {
          imageId: 'image-1',
          adjustment: {
            tempScore: 10,
            tintScore: -5,
            vibranceScore: 15,
            saturationScore: 8,
            exposureScore: -3,
            highlightsScore: -10,
            shadowsScore: 12,
            whitesScore: 5,
            blacksScore: -8,
            contrastScore: 7,
            clarityScore: -2,
            sharpnessScore: 9,
          }
        }
      ]);
    });

    it('should handle missing color adjustment gracefully', () => {
      const mockImages = [
        {
          ...createMockGallery('image-1'),
          editor_config: null
        }
      ];
      
      usePagingMock.mockReturnValue({
        ...mockUsePaging,
        images: mockImages,
      });

      renderHook(() => 
        useHonchoEditorBulk(mockController, 'event-123', 'user-123')
      );

      expect(mockBatchActions.syncAdjustment).toHaveBeenCalledWith([
        {
          imageId: 'image-1',
          adjustment: undefined
        }
      ]);
    });
  });
});