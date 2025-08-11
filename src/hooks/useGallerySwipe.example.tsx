import { useGallerySwipe } from './useGallerySwipe';
import { Controller } from './editor/useHonchoEditor';
import { Gallery } from './editor/type';
import { useState, useEffect } from 'react';

/**
 * Example usage of the useGallerySwipe hook
 * This shows various integration patterns and use cases
 */

/**
 * Basic example: Simple image gallery with navigation buttons
 */
export function BasicGalleryExample() {
    const [firebaseUid, setFirebaseUid] = useState<string | null>('user123');
    const [currentImageId, setCurrentImageId] = useState<string | null>('image_001');
    const [controller, setController] = useState<Controller | null>(null);

    // Initialize controller (replace with your actual controller initialization)
    useEffect(() => {
        // Your controller initialization logic here
        const initController = async () => {
            // const controllerInstance = new YourController();
            // setController(controllerInstance);
        };
        initController();
    }, []);

    const {
        currentImageData,
        isNextAvailable,
        isPrevAvailable,
        onSwipeNext,
        onSwipePrev,
        isLoading,
        error
    } = useGallerySwipe(firebaseUid, currentImageId, controller);

    return (
        <div className="gallery-container">
            {error && (
                <div className="error-message" style={{ color: 'red' }}>
                    Error: {error}
                </div>
            )}
            
            {isLoading && (
                <div className="loading-indicator">Loading...</div>
            )}
            
            {currentImageData && (
                <div className="image-display">
                    <img 
                        src={currentImageData.download?.path || currentImageData.raw_edited?.path} 
                        alt={`Image ${currentImageData.id}`}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <p>Image ID: {currentImageData.id}</p>
                    <p>Event ID: {currentImageData.event_id}</p>
                </div>
            )}
            
            <div className="navigation-controls">
                <button 
                    onClick={onSwipePrev} 
                    disabled={!isPrevAvailable || isLoading}
                    className="nav-button prev"
                >
                    ← Previous
                </button>
                
                <button 
                    onClick={onSwipeNext} 
                    disabled={!isNextAvailable || isLoading}
                    className="nav-button next"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}

/**
 * Advanced example: Gallery with keyboard navigation and swipe gestures
 */
export function AdvancedGalleryExample() {
    const [firebaseUid] = useState<string>('user456');
    const [selectedImageId, setSelectedImageId] = useState<string>('initial_image_id');
    const [controller] = useState<Controller | null>(null); // Replace with actual controller

    const gallerySwipe = useGallerySwipe(firebaseUid, selectedImageId, controller);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = async (event: KeyboardEvent) => {
            if (gallerySwipe.isLoading) return;

            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    if (gallerySwipe.isPrevAvailable) {
                        await gallerySwipe.onSwipePrev();
                    }
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    if (gallerySwipe.isNextAvailable) {
                        await gallerySwipe.onSwipeNext();
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gallerySwipe]);

    // Touch/swipe gesture handlers (basic implementation)
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = async () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && gallerySwipe.isNextAvailable) {
            await gallerySwipe.onSwipeNext();
        }
        if (isRightSwipe && gallerySwipe.isPrevAvailable) {
            await gallerySwipe.onSwipePrev();
        }
    };

    return (
        <div className="advanced-gallery">
            <div className="gallery-header">
                <h2>Advanced Gallery Navigation</h2>
                <div className="status-indicators">
                    <span className={`status ${gallerySwipe.isLoading ? 'loading' : 'ready'}`}>
                        {gallerySwipe.isLoading ? 'Loading...' : 'Ready'}
                    </span>
                    <span className="navigation-status">
                        Prev: {gallerySwipe.isPrevAvailable ? '✓' : '✗'} | 
                        Next: {gallerySwipe.isNextAvailable ? '✓' : '✗'}
                    </span>
                </div>
            </div>

            <div 
                className="image-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ 
                    touchAction: 'pan-x',
                    userSelect: 'none',
                    position: 'relative'
                }}
            >
                {gallerySwipe.currentImageData ? (
                    <div className="image-wrapper">
                        <img 
                            src={
                                gallerySwipe.currentImageData.raw_edited?.path || 
                                gallerySwipe.currentImageData.download?.path
                            }
                            alt={`Gallery image ${gallerySwipe.currentImageData.id}`}
                            style={{ 
                                width: '100%', 
                                height: 'auto',
                                display: 'block'
                            }}
                        />
                        <div className="image-info">
                            <p>ID: {gallerySwipe.currentImageData.id}</p>
                            <p>Event: {gallerySwipe.currentImageData.event_id}</p>
                        </div>
                    </div>
                ) : (
                    <div className="no-image">No image loaded</div>
                )}

                {gallerySwipe.error && (
                    <div className="error-overlay">
                        {gallerySwipe.error}
                    </div>
                )}
            </div>

            <div className="instructions">
                <p>Use arrow keys, navigation buttons, or swipe to navigate</p>
            </div>
        </div>
    );
}

/**
 * Integration example: Using with existing useHonchoEditor
 */
export function EditorIntegrationExample() {
    const [firebaseUid] = useState<string>('editor_user');
    const [currentImageId, setCurrentImageId] = useState<string>('editor_image_001');
    const [controller] = useState<Controller | null>(null);

    // Gallery navigation hook
    const {
        currentImageData,
        isNextAvailable,
        isPrevAvailable,
        onSwipeNext,
        onSwipePrev,
        isLoading: galleryLoading,
        error: galleryError
    } = useGallerySwipe(firebaseUid, currentImageId, controller);

    // Update current image ID when gallery navigation changes
    useEffect(() => {
        if (currentImageData?.id && currentImageData.id !== currentImageId) {
            setCurrentImageId(currentImageData.id);
            // Trigger any editor updates here
            // e.g., loadImageFromId(firebaseUid, currentImageData.id);
        }
    }, [currentImageData, currentImageId, firebaseUid]);

    // Example: Integrate with your existing editor handlers
    const handleImageChange = async (direction: 'prev' | 'next') => {
        try {
            if (direction === 'next' && isNextAvailable) {
                await onSwipeNext();
            } else if (direction === 'prev' && isPrevAvailable) {
                await onSwipePrev();
            }
        } catch (error) {
            console.error('Navigation error:', error);
        }
    };

    return (
        <div className="editor-integration">
            <div className="editor-header">
                <button 
                    onClick={() => handleImageChange('prev')}
                    disabled={!isPrevAvailable || galleryLoading}
                    className="nav-btn"
                >
                    ⟨ Prev Image
                </button>
                
                <span className="current-image-info">
                    {currentImageData ? `Image: ${currentImageData.id}` : 'No image'}
                </span>
                
                <button 
                    onClick={() => handleImageChange('next')}
                    disabled={!isNextAvailable || galleryLoading}
                    className="nav-btn"
                >
                    Next Image ⟩
                </button>
            </div>

            {galleryError && (
                <div className="error-banner">
                    Gallery Error: {galleryError}
                </div>
            )}

            <div className="editor-content">
                {/* Your existing editor components here */}
                {currentImageData && (
                    <div className="editor-canvas">
                        {/* Canvas or image editor component */}
                        <p>Editing: {currentImageData.id}</p>
                        <p>Event: {currentImageData.event_id}</p>
                    </div>
                )}
            </div>

            {galleryLoading && (
                <div className="loading-overlay">
                    Loading next image...
                </div>
            )}
        </div>
    );
}

/**
 * Mobile-optimized example with touch gestures
 */
export function MobileGalleryExample() {
    const [firebaseUid] = useState<string>('mobile_user');
    const [imageId] = useState<string>('mobile_image_001');
    const [controller] = useState<Controller | null>(null);

    const gallery = useGallerySwipe(firebaseUid, imageId, controller);

    // Mobile-specific gesture handling
    const [swipeThreshold] = useState(75); // Minimum distance for swipe
    const [touchStartX, setTouchStartX] = useState<number>(0);
    const [touchStartY, setTouchStartY] = useState<number>(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = async (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchStartX - touchEndX;
        const deltaY = Math.abs(touchStartY - touchEndY);
        
        // Only process horizontal swipes (ignore vertical)
        if (deltaY < 100 && Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0 && gallery.isNextAvailable) {
                // Swipe left - next image
                await gallery.onSwipeNext();
            } else if (deltaX < 0 && gallery.isPrevAvailable) {
                // Swipe right - previous image
                await gallery.onSwipePrev();
            }
        }
    };

    return (
        <div className="mobile-gallery" style={{ touchAction: 'pan-y' }}>
            <div className="mobile-header">
                <div className="navigation-dots">
                    <span className={`dot ${gallery.isPrevAvailable ? 'active' : 'inactive'}`}>
                        ●
                    </span>
                    <span className="current-dot">●</span>
                    <span className={`dot ${gallery.isNextAvailable ? 'active' : 'inactive'}`}>
                        ●
                    </span>
                </div>
            </div>

            <div 
                className="swipe-area"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                    width: '100%',
                    height: '70vh',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {gallery.currentImageData && (
                    <img 
                        src={gallery.currentImageData.download?.path}
                        alt="Gallery image"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            userSelect: 'none',
                            pointerEvents: 'none'
                        }}
                    />
                )}

                {gallery.isLoading && (
                    <div className="mobile-loading">
                        <div className="spinner">◐</div>
                        <p>Loading...</p>
                    </div>
                )}

                {gallery.error && (
                    <div className="mobile-error">
                        <p>⚠️ {gallery.error}</p>
                    </div>
                )}
            </div>

            <div className="mobile-footer">
                <p className="swipe-hint">
                    Swipe left/right to navigate • {gallery.currentImageData?.id || 'No image'}
                </p>
            </div>
        </div>
    );
}

/**
 * Error handling and loading states example
 */
export function ErrorHandlingExample() {
    const [firebaseUid] = useState<string | null>('test_user');
    const [imageId] = useState<string | null>('test_image');
    const [controller] = useState<Controller | null>(null);

    const {
        currentImageData,
        isNextAvailable,
        isPrevAvailable,
        onSwipeNext,
        onSwipePrev,
        isLoading,
        error
    } = useGallerySwipe(firebaseUid, imageId, controller);

    const handleRetry = () => {
        // Force re-initialization by changing a key prop or calling a refresh function
        window.location.reload(); // Simple retry approach
    };

    return (
        <div className="error-handling-example">
            <div className="status-panel">
                <h3>Gallery Status</h3>
                <div className="status-grid">
                    <div className="status-item">
                        <label>Loading:</label>
                        <span className={isLoading ? 'status-active' : 'status-inactive'}>
                            {isLoading ? 'Yes' : 'No'}
                        </span>
                    </div>
                    <div className="status-item">
                        <label>Error:</label>
                        <span className={error ? 'status-error' : 'status-ok'}>
                            {error || 'None'}
                        </span>
                    </div>
                    <div className="status-item">
                        <label>Current Image:</label>
                        <span>{currentImageData?.id || 'None'}</span>
                    </div>
                    <div className="status-item">
                        <label>Navigation:</label>
                        <span>
                            Prev: {isPrevAvailable ? '✓' : '✗'} | 
                            Next: {isNextAvailable ? '✓' : '✗'}
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="error-actions">
                        <button onClick={handleRetry} className="retry-button">
                            Retry
                        </button>
                    </div>
                )}
            </div>

            <div className="gallery-content">
                {currentImageData ? (
                    <div className="image-preview">
                        <img 
                            src={currentImageData.download?.path}
                            alt="Current"
                            style={{ maxWidth: '300px', maxHeight: '200px' }}
                        />
                    </div>
                ) : (
                    <div className="no-content">
                        {isLoading ? 'Loading gallery...' : 'No image available'}
                    </div>
                )}
            </div>

            <div className="navigation-test">
                <button 
                    onClick={onSwipePrev}
                    disabled={!isPrevAvailable || isLoading}
                >
                    Test Previous
                </button>
                <button 
                    onClick={onSwipeNext}
                    disabled={!isNextAvailable || isLoading}
                >
                    Test Next
                </button>
            </div>
        </div>
    );
}
