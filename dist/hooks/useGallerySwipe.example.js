import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useGallerySwipe } from './useGallerySwipe';
import { useState, useEffect } from 'react';
/**
 * Example usage of the useGallerySwipe hook
 * This shows various integration patterns and use cases
 */
/**
 * Basic example: Simple image gallery with navigation buttons
 */
export function BasicGalleryExample() {
    const [firebaseUid, setFirebaseUid] = useState('user123');
    const [currentImageId, setCurrentImageId] = useState('image_001');
    const [controller, setController] = useState(null);
    // Initialize controller (replace with your actual controller initialization)
    useEffect(() => {
        // Your controller initialization logic here
        const initController = async () => {
            // const controllerInstance = new YourController();
            // setController(controllerInstance);
        };
        initController();
    }, []);
    const { currentImageData, isNextAvailable, isPrevAvailable, onSwipeNext, onSwipePrev, isLoading, error } = useGallerySwipe(firebaseUid, currentImageId, controller);
    return (_jsxs("div", { className: "gallery-container", children: [error && (_jsxs("div", { className: "error-message", style: { color: 'red' }, children: ["Error: ", error] })), isLoading && (_jsx("div", { className: "loading-indicator", children: "Loading..." })), currentImageData && (_jsxs("div", { className: "image-display", children: [_jsx("img", { src: currentImageData.download?.path || currentImageData.raw_edited?.path, alt: `Image ${currentImageData.id}`, style: { maxWidth: '100%', height: 'auto' } }), _jsxs("p", { children: ["Image ID: ", currentImageData.id] }), _jsxs("p", { children: ["Event ID: ", currentImageData.event_id] })] })), _jsxs("div", { className: "navigation-controls", children: [_jsx("button", { onClick: onSwipePrev, disabled: !isPrevAvailable || isLoading, className: "nav-button prev", children: "\u2190 Previous" }), _jsx("button", { onClick: onSwipeNext, disabled: !isNextAvailable || isLoading, className: "nav-button next", children: "Next \u2192" })] })] }));
}
/**
 * Advanced example: Gallery with keyboard navigation and swipe gestures
 */
export function AdvancedGalleryExample() {
    const [firebaseUid] = useState('user456');
    const [selectedImageId, setSelectedImageId] = useState('initial_image_id');
    const [controller] = useState(null); // Replace with actual controller
    const gallerySwipe = useGallerySwipe(firebaseUid, selectedImageId, controller);
    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = async (event) => {
            if (gallerySwipe.isLoading)
                return;
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
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    const handleTouchEnd = async () => {
        if (!touchStart || !touchEnd)
            return;
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
    return (_jsxs("div", { className: "advanced-gallery", children: [_jsxs("div", { className: "gallery-header", children: [_jsx("h2", { children: "Advanced Gallery Navigation" }), _jsxs("div", { className: "status-indicators", children: [_jsx("span", { className: `status ${gallerySwipe.isLoading ? 'loading' : 'ready'}`, children: gallerySwipe.isLoading ? 'Loading...' : 'Ready' }), _jsxs("span", { className: "navigation-status", children: ["Prev: ", gallerySwipe.isPrevAvailable ? '✓' : '✗', " | Next: ", gallerySwipe.isNextAvailable ? '✓' : '✗'] })] })] }), _jsxs("div", { className: "image-container", onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, style: {
                    touchAction: 'pan-x',
                    userSelect: 'none',
                    position: 'relative'
                }, children: [gallerySwipe.currentImageData ? (_jsxs("div", { className: "image-wrapper", children: [_jsx("img", { src: gallerySwipe.currentImageData.raw_edited?.path ||
                                    gallerySwipe.currentImageData.download?.path, alt: `Gallery image ${gallerySwipe.currentImageData.id}`, style: {
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block'
                                } }), _jsxs("div", { className: "image-info", children: [_jsxs("p", { children: ["ID: ", gallerySwipe.currentImageData.id] }), _jsxs("p", { children: ["Event: ", gallerySwipe.currentImageData.event_id] })] })] })) : (_jsx("div", { className: "no-image", children: "No image loaded" })), gallerySwipe.error && (_jsx("div", { className: "error-overlay", children: gallerySwipe.error }))] }), _jsx("div", { className: "instructions", children: _jsx("p", { children: "Use arrow keys, navigation buttons, or swipe to navigate" }) })] }));
}
/**
 * Integration example: Using with existing useHonchoEditor
 */
export function EditorIntegrationExample() {
    const [firebaseUid] = useState('editor_user');
    const [currentImageId, setCurrentImageId] = useState('editor_image_001');
    const [controller] = useState(null);
    // Gallery navigation hook
    const { currentImageData, isNextAvailable, isPrevAvailable, onSwipeNext, onSwipePrev, isLoading: galleryLoading, error: galleryError } = useGallerySwipe(firebaseUid, currentImageId, controller);
    // Update current image ID when gallery navigation changes
    useEffect(() => {
        if (currentImageData?.id && currentImageData.id !== currentImageId) {
            setCurrentImageId(currentImageData.id);
            // Trigger any editor updates here
            // e.g., loadImageFromId(firebaseUid, currentImageData.id);
        }
    }, [currentImageData, currentImageId, firebaseUid]);
    // Example: Integrate with your existing editor handlers
    const handleImageChange = async (direction) => {
        try {
            if (direction === 'next' && isNextAvailable) {
                await onSwipeNext();
            }
            else if (direction === 'prev' && isPrevAvailable) {
                await onSwipePrev();
            }
        }
        catch (error) {
            console.error('Navigation error:', error);
        }
    };
    return (_jsxs("div", { className: "editor-integration", children: [_jsxs("div", { className: "editor-header", children: [_jsx("button", { onClick: () => handleImageChange('prev'), disabled: !isPrevAvailable || galleryLoading, className: "nav-btn", children: "\u27E8 Prev Image" }), _jsx("span", { className: "current-image-info", children: currentImageData ? `Image: ${currentImageData.id}` : 'No image' }), _jsx("button", { onClick: () => handleImageChange('next'), disabled: !isNextAvailable || galleryLoading, className: "nav-btn", children: "Next Image \u27E9" })] }), galleryError && (_jsxs("div", { className: "error-banner", children: ["Gallery Error: ", galleryError] })), _jsx("div", { className: "editor-content", children: currentImageData && (_jsxs("div", { className: "editor-canvas", children: [_jsxs("p", { children: ["Editing: ", currentImageData.id] }), _jsxs("p", { children: ["Event: ", currentImageData.event_id] })] })) }), galleryLoading && (_jsx("div", { className: "loading-overlay", children: "Loading next image..." }))] }));
}
/**
 * Mobile-optimized example with touch gestures
 */
export function MobileGalleryExample() {
    const [firebaseUid] = useState('mobile_user');
    const [imageId] = useState('mobile_image_001');
    const [controller] = useState(null);
    const gallery = useGallerySwipe(firebaseUid, imageId, controller);
    // Mobile-specific gesture handling
    const [swipeThreshold] = useState(75); // Minimum distance for swipe
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);
    };
    const handleTouchEnd = async (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchStartX - touchEndX;
        const deltaY = Math.abs(touchStartY - touchEndY);
        // Only process horizontal swipes (ignore vertical)
        if (deltaY < 100 && Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0 && gallery.isNextAvailable) {
                // Swipe left - next image
                await gallery.onSwipeNext();
            }
            else if (deltaX < 0 && gallery.isPrevAvailable) {
                // Swipe right - previous image
                await gallery.onSwipePrev();
            }
        }
    };
    return (_jsxs("div", { className: "mobile-gallery", style: { touchAction: 'pan-y' }, children: [_jsx("div", { className: "mobile-header", children: _jsxs("div", { className: "navigation-dots", children: [_jsx("span", { className: `dot ${gallery.isPrevAvailable ? 'active' : 'inactive'}`, children: "\u25CF" }), _jsx("span", { className: "current-dot", children: "\u25CF" }), _jsx("span", { className: `dot ${gallery.isNextAvailable ? 'active' : 'inactive'}`, children: "\u25CF" })] }) }), _jsxs("div", { className: "swipe-area", onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd, style: {
                    width: '100%',
                    height: '70vh',
                    position: 'relative',
                    overflow: 'hidden'
                }, children: [gallery.currentImageData && (_jsx("img", { src: gallery.currentImageData.download?.path, alt: "Gallery image", style: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            userSelect: 'none',
                            pointerEvents: 'none'
                        } })), gallery.isLoading && (_jsxs("div", { className: "mobile-loading", children: [_jsx("div", { className: "spinner", children: "\u25D0" }), _jsx("p", { children: "Loading..." })] })), gallery.error && (_jsx("div", { className: "mobile-error", children: _jsxs("p", { children: ["\u26A0\uFE0F ", gallery.error] }) }))] }), _jsx("div", { className: "mobile-footer", children: _jsxs("p", { className: "swipe-hint", children: ["Swipe left/right to navigate \u2022 ", gallery.currentImageData?.id || 'No image'] }) })] }));
}
/**
 * Error handling and loading states example
 */
export function ErrorHandlingExample() {
    const [firebaseUid] = useState('test_user');
    const [imageId] = useState('test_image');
    const [controller] = useState(null);
    const { currentImageData, isNextAvailable, isPrevAvailable, onSwipeNext, onSwipePrev, isLoading, error } = useGallerySwipe(firebaseUid, imageId, controller);
    const handleRetry = () => {
        // Force re-initialization by changing a key prop or calling a refresh function
        window.location.reload(); // Simple retry approach
    };
    return (_jsxs("div", { className: "error-handling-example", children: [_jsxs("div", { className: "status-panel", children: [_jsx("h3", { children: "Gallery Status" }), _jsxs("div", { className: "status-grid", children: [_jsxs("div", { className: "status-item", children: [_jsx("label", { children: "Loading:" }), _jsx("span", { className: isLoading ? 'status-active' : 'status-inactive', children: isLoading ? 'Yes' : 'No' })] }), _jsxs("div", { className: "status-item", children: [_jsx("label", { children: "Error:" }), _jsx("span", { className: error ? 'status-error' : 'status-ok', children: error || 'None' })] }), _jsxs("div", { className: "status-item", children: [_jsx("label", { children: "Current Image:" }), _jsx("span", { children: currentImageData?.id || 'None' })] }), _jsxs("div", { className: "status-item", children: [_jsx("label", { children: "Navigation:" }), _jsxs("span", { children: ["Prev: ", isPrevAvailable ? '✓' : '✗', " | Next: ", isNextAvailable ? '✓' : '✗'] })] })] }), error && (_jsx("div", { className: "error-actions", children: _jsx("button", { onClick: handleRetry, className: "retry-button", children: "Retry" }) }))] }), _jsx("div", { className: "gallery-content", children: currentImageData ? (_jsx("div", { className: "image-preview", children: _jsx("img", { src: currentImageData.download?.path, alt: "Current", style: { maxWidth: '300px', maxHeight: '200px' } }) })) : (_jsx("div", { className: "no-content", children: isLoading ? 'Loading gallery...' : 'No image available' })) }), _jsxs("div", { className: "navigation-test", children: [_jsx("button", { onClick: onSwipePrev, disabled: !isPrevAvailable || isLoading, children: "Test Previous" }), _jsx("button", { onClick: onSwipeNext, disabled: !isNextAvailable || isLoading, children: "Test Next" })] })] }));
}
