'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { HonchoEditor } from '../../lib/editor/honcho-editor';
const initialAdjustments = {
    tempScore: 0, tintScore: 0, vibranceScore: 0, exposureScore: 0, highlightsScore: 0, shadowsScore: 0,
    whitesScore: 0, blacksScore: 0, saturationScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
};
const clamp = (value) => Math.max(-100, Math.min(100, value));
export function useHonchoEditor(controller, initImageId, firebaseUid) {
    const [currentImageId, setCurrentImageId] = useState(initImageId);
    // MARK: - Core Editor State & Refs
    const editorRef = useRef(null);
    const canvasRef = useRef(null);
    const canvasContainerRef = useRef(null);
    const fileInputRef = useRef(null);
    const [editorStatus, setEditorStatus] = useState("Initializing...");
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    // MARK: - Adjustment & History State
    // const [adjustments, setAdjustments] = useState<AdjustmentState>(initialAdjustments);
    const [history, setHistory] = useState([initialAdjustments]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [isViewingOriginal, setIsViewingOriginal] = useState(false);
    const [copiedAdjustments, setCopiedAdjustments] = useState(null);
    const [copyColorChecks, setCopyColorChecks] = useState({ temperature: true, tint: true, vibrance: true, saturation: true });
    const [copyLightChecks, setCopyLightChecks] = useState({ exposure: true, contrast: true, highlights: true, shadows: true, whites: true, blacks: true });
    const [copyDetailsChecks, setCopyDetailsChecks] = useState({ clarity: true, sharpness: true });
    const [copyDialogExpanded, setCopyDialogExpanded] = useState({ color: true, light: true, details: true });
    const [adjustmentsMap, setAdjustmentsMap] = useState(new Map());
    // Individual Adjustment State
    const [tempScore, setTempScore] = useState(0);
    const [tintScore, setTintScore] = useState(0);
    const [vibranceScore, setVibranceScore] = useState(0);
    const [saturationScore, setSaturationScore] = useState(0);
    const [exposureScore, setExposureScore] = useState(0);
    const [highlightsScore, setHighlightsScore] = useState(0);
    const [shadowsScore, setShadowsScore] = useState(0);
    const [whitesScore, setWhitesScore] = useState(0);
    const [blacksScore, setBlacksScore] = useState(0);
    const [contrastScore, setContrastScore] = useState(0);
    const [clarityScore, setClarityScore] = useState(0);
    const [sharpnessScore, setSharpnessScore] = useState(0);
    // MARK: - UI & App State (Moved from page.tsx)
    // General UI State
    const [isOnline, setIsOnline] = useState(true);
    const [isConnectionSlow, setIsConnectionSlow] = useState(false);
    const [showCopyAlert, setShowCopyAlert] = useState(false);
    const [isCopyDialogOpen, setCopyDialogOpen] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [activePanel, setActivePanel] = useState('colorAdjustment');
    const [activeSubPanel, setActiveSubPanel] = useState('');
    const [headerMenuAnchorEl, setHeaderMenuAnchorEl] = useState(null);
    const [anchorMenuZoom, setAnchorMenuZoom] = useState(null);
    // Panel Expansion State
    const [colorAdjustmentExpandedPanels, setColorAdjustmentExpandedPanels] = useState(['whiteBalance']);
    const [presetExpandedPanels, setPresetExpandedPanels] = useState(['preset']);
    // Watermark State
    const [isCreatingWatermark, setIsCreatingWatermark] = useState(false);
    // Preset State
    const [isPresetModalOpen, setPresetModalOpen] = useState(false);
    const [isPresetModalOpenMobile, setPresetModalOpenMobile] = useState(false);
    const [presets, setPresets] = useState([]);
    const [presetName, setPresetName] = useState("Type Here");
    const [isPresetCreated, setIsPresetCreated] = useState(false);
    const [selectedMobilePreset, setSelectedMobilePreset] = useState('preset1');
    const [selectedDesktopPreset, setSelectedDesktopPreset] = useState('preset1');
    const [selectedBulkPreset, setSelectedBulkPreset] = useState('preset1');
    const [presetMenuAnchorEl, setPresetMenuAnchorEl] = useState(null);
    const [activePresetMenuId, setActivePresetMenuId] = useState(null);
    const [isRenameModalOpen, setRenameModalOpen] = useState(false);
    const [presetToRename, setPresetToRename] = useState(null);
    const [newPresetName, setNewPresetName] = useState("");
    // Aspect Ratio State
    // Note: not used yet
    const [currentAspectRatio, setCurrentAspectRatio] = useState('potrait');
    const [currentSquareRatio, setCurrentSquareRatio] = useState('original');
    const [currentWideRatio, setCurrentWideRatio] = useState('1:1');
    const [angelScore, setAngleScore] = useState(0);
    const [widthSizePX, setWidthSizePX] = useState(0);
    const [heightSizePX, setHeightSizePX] = useState(0);
    // Bulk Editing State
    const [isBulkEditing, setIsBulkEditing] = useState(false);
    const [selectedImages, setSelectedImages] = useState('Select');
    const [imageList, setImageList] = useState([]);
    const [selectedImageIds, setSelectedImageIds] = useState(new Set());
    // MARK: Framse- (Later use)
    const [isFrameApplied, setIsFrameApplied] = useState(false);
    // State for Copying specific adjustments
    const [colorAdjustments, setColorAdjustments] = useState(true);
    const [lightAdjustments, setLightAdjustments] = useState(true);
    const [detailsAdjustments, setDetailsAdjustments] = useState(true);
    // for connection native
    const [displayedToken, setDisplayedToken] = useState(null);
    // MARK: dragable
    const PEEK_HEIGHT = 20;
    const COLLAPSED_HEIGHT = 165;
    const PANEL_CHROME_HEIGHT = 10;
    // Mobile Draggable Panel State
    const [panelHeight, setPanelHeight] = useState(COLLAPSED_HEIGHT);
    const [contentHeight, setContentHeight] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef(0);
    const initialHeight = useRef(0);
    const panelRef = useRef(null);
    const contentRef = useRef(null);
    // Mobile Panel Drag Handlers
    const handleContentHeightChange = useCallback((height) => {
        if (height > 0 && height !== contentHeight)
            setContentHeight(height);
    }, [contentHeight]);
    const handleDragStart = useCallback((e) => {
        setIsDragging(true);
        const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        dragStartPos.current = startY;
        initialHeight.current = panelHeight;
        if (panelRef.current)
            panelRef.current.style.transition = 'none';
    }, [panelHeight]);
    const handleDragMove = useCallback((e) => {
        if (!isDragging)
            return;
        const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const deltaY = dragStartPos.current - currentY;
        const newHeight = initialHeight.current + deltaY;
        const dynamicPanelFullHeight = contentHeight + PANEL_CHROME_HEIGHT;
        const clampedHeight = Math.max(PEEK_HEIGHT, Math.min(newHeight, dynamicPanelFullHeight));
        setPanelHeight(clampedHeight);
    }, [isDragging, contentHeight]);
    const handleDragEnd = useCallback(() => {
        if (!isDragging)
            return;
        setIsDragging(false);
        dragStartPos.current = 0;
        if (panelRef.current)
            panelRef.current.style.transition = 'height 0.3s ease-in-out';
        const dynamicPanelFullHeight = contentHeight + PANEL_CHROME_HEIGHT;
        const snapPointLow = (PEEK_HEIGHT + COLLAPSED_HEIGHT) / 2;
        const snapPointHigh = (COLLAPSED_HEIGHT + dynamicPanelFullHeight) / 2;
        if (panelHeight < snapPointLow) {
            setPanelHeight(PEEK_HEIGHT);
        }
        else if (panelHeight >= snapPointLow && panelHeight < snapPointHigh) {
            setPanelHeight(COLLAPSED_HEIGHT);
        }
        else {
            setPanelHeight(dynamicPanelFullHeight);
        }
    }, [isDragging, panelHeight, contentHeight]);
    // Keyboard Shortcut Handler
    const handleKeyDown = useCallback((event) => {
        const target = event.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')
            return;
        if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
            event.preventDefault();
            handleOpenCopyDialog(); // Assumes handleOpenCopyDialog is defined in the hook
        }
    }, [ /* handleOpenCopyDialog dependency */]);
    useEffect(() => {
        if (editorRef.current?.getInitialized() === false) {
            editorRef.current?.initialize();
        }
    }, [editorRef]);
    // Effect for measuring mobile panel content
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (contentRef.current) {
                const height = contentRef.current.scrollHeight;
                setContentHeight(height);
            }
        }, 50);
        return () => clearTimeout(timeoutId);
    }, [activeSubPanel, isBulkEditing]);
    // Effect for keyboard shortcuts
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    // Effect for drag listeners
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchmove', handleDragMove);
            window.addEventListener('touchend', handleDragEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, handleDragMove, handleDragEnd]);
    useEffect(() => {
        // Cast navigator to our custom type to access the connection property safely
        const navigatorWithConnection = navigator;
        if (!navigatorWithConnection.connection) {
            return;
        }
        const navigatorConnection = navigatorWithConnection.connection;
        const updateConnectionStatus = () => {
            const slowConnectionTypes = ['slow-2g', '2g', '3g'];
            const isSlow = navigatorConnection.saveData ||
                slowConnectionTypes.includes(navigatorConnection.effectiveType);
            setIsConnectionSlow(isSlow);
        };
        // Check status immediately
        updateConnectionStatus();
        // Add event listener for changes
        navigatorConnection.addEventListener('change', updateConnectionStatus);
        // Cleanup on unmount
        return () => {
            navigatorConnection.removeEventListener('change', updateConnectionStatus);
        };
    }, []);
    // MARK: - Core Editor Logic
    const updateCanvas = useCallback(() => {
        if (editorRef.current?.getInitialized() && canvasRef.current) {
            editorRef.current.processImage();
            editorRef.current.renderToCanvas(canvasRef.current);
        }
    }, []);
    const loadImage = useCallback(async (file) => {
        if (!editorRef.current) {
            setEditorStatus("Editor not ready.");
            return;
        }
        setEditorStatus("Loading image...");
        try {
            await editorRef.current.loadImageFromFile(file);
            setIsImageLoaded(true);
            updateCanvas();
        }
        catch (e) {
            console.error("Error loading image:", e);
            setEditorStatus("Error: Could not load the image.");
            setIsImageLoaded(false);
        }
    }, []);
    const applyUiStateToSelectedImages = useCallback((uiState) => {
        setAdjustmentsMap(prevMap => {
            const newMap = new Map(prevMap);
            selectedImageIds.forEach(id => {
                newMap.set(id, uiState);
            });
            return newMap;
        });
    }, [selectedImageIds]);
    const loadImageFromUrl = useCallback(async (url) => {
        try {
            setEditorStatus("Downloading image...");
            const response = await fetch(url);
            if (!response.ok)
                throw new Error(`Failed to fetch image from URL: ${url}`);
            const blob = await response.blob();
            const filename = url.substring(url.lastIndexOf('/') + 1) || 'image.jpg';
            const file = new File([blob], filename, { type: blob.type });
            await loadImage(file); // Pass the final File object to the core loader
        }
        catch (error) {
            console.error(error);
            setEditorStatus("Error: Could not load image from URL.");
        }
    }, [loadImage]);
    const loadImageFromId = useCallback(async (firebaseUid, imageId) => {
        if (!controller)
            return;
        setEditorStatus("Fetching image...");
        try {
            const gallery = await controller.onGetImage(firebaseUid, imageId);
            const imagePath = gallery?.raw_edited?.path
                ? gallery.raw_edited.path
                : gallery?.download?.path;
            if (imagePath) {
                await loadImageFromUrl(imagePath);
            }
            else {
                throw new Error("Controller did not return a valid image object with path.");
            }
        }
        catch (error) {
            console.error("Failed to fetch or load image via controller:", error);
            setEditorStatus("Error: Could not fetch the image.");
        }
    }, [controller, loadImageFromUrl]);
    const handlePrev = useCallback(async (firebaseUid) => {
        // Find the current image index
        const currentIndex = imageList.findIndex(img => img.id === currentImageId);
        // If not the first image, go to previous
        if (currentIndex > 0) {
            const prevImageId = imageList[currentIndex - 1]?.id;
            if (prevImageId) {
                setCurrentImageId(prevImageId);
            }
        }
    }, [imageList, currentImageId]);
    const handleNext = useCallback(async (firebaseUid) => {
        // Find the current image index
        const currentIndex = imageList.findIndex(img => img.id === currentImageId);
        // If not the last image, go to next
        if (currentIndex < imageList.length - 1 && currentIndex !== -1) {
            const nextImageId = imageList[currentIndex + 1]?.id;
            if (nextImageId) {
                setCurrentImageId(nextImageId);
            }
        }
    }, [imageList, currentImageId]);
    useEffect(() => {
        if (currentImageId && firebaseUid) {
            loadImageFromId(firebaseUid, currentImageId);
        }
    }, [currentImageId, firebaseUid, loadImageFromId]);
    const handleFileChange = (event) => {
        const files = event.target?.files;
        if (!files || files.length === 0)
            return;
        applyAdjustmentState(initialAdjustments);
        setHistory([initialAdjustments]);
        setHistoryIndex(0);
        if (files.length === 1) {
            setIsBulkEditing(false);
            setImageList([]);
            setSelectedImageIds(new Set());
            setAdjustmentsMap(new Map());
            loadImage(files[0]);
        }
        else {
            setIsBulkEditing(true);
            const newImageList = Array.from(files).map((file, index) => ({
                id: `${file.name}-${Date.now()}-${index}`,
                name: file.name,
                file: file,
                url: URL.createObjectURL(file),
            }));
            const newAdjustmentsMap = new Map();
            newImageList.forEach(image => {
                newAdjustmentsMap.set(image.id, { ...initialAdjustments });
            });
            setAdjustmentsMap(newAdjustmentsMap);
            setImageList(newImageList);
            setIsImageLoaded(true);
            setSelectedImageIds(new Set(newImageList.map(img => img.id)));
        }
    };
    const applyAdjustmentState = useCallback((state) => {
        // Always update the UI controls
        setTempScore(state.tempScore);
        setTintScore(state.tintScore);
        setVibranceScore(state.vibranceScore);
        setExposureScore(state.exposureScore);
        setHighlightsScore(state.highlightsScore);
        setShadowsScore(state.shadowsScore);
        setWhitesScore(state.whitesScore);
        setBlacksScore(state.blacksScore);
        setSaturationScore(state.saturationScore);
        setContrastScore(state.contrastScore);
        setClarityScore(state.clarityScore);
        setSharpnessScore(state.sharpnessScore);
        // If in bulk mode, apply this state to all selected images
        if (isBulkEditing) {
            applyUiStateToSelectedImages(state);
        }
    }, [isBulkEditing, applyUiStateToSelectedImages]);
    const handleRevert = useCallback(() => {
        // This will reset the UI controls and, if in bulk mode, the selected images
        applyAdjustmentState(initialAdjustments);
        // For single image mode, also reset the underlying canvas engine
        if (!isBulkEditing && editorRef.current) {
            editorRef.current.resetAdjustments();
        }
    }, [applyAdjustmentState, isBulkEditing]);
    const handleUndo = useCallback(() => {
        if (historyIndex > 0) {
            const prevIndex = historyIndex - 1;
            applyAdjustmentState(history[prevIndex]);
            setHistoryIndex(prevIndex);
        }
    }, [history, historyIndex, applyAdjustmentState]);
    const handleRedo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const nextIndex = historyIndex + 1;
            applyAdjustmentState(history[nextIndex]);
            setHistoryIndex(nextIndex);
        }
    }, [history, historyIndex, applyAdjustmentState]);
    const handleToggleImageSelection = useCallback((imageId) => {
        const newSelectedIds = new Set(selectedImageIds);
        const isCurrentlySelected = newSelectedIds.has(imageId);
        if (isCurrentlySelected) {
            if (newSelectedIds.size > 1) {
                newSelectedIds.delete(imageId);
            }
        }
        else {
            newSelectedIds.add(imageId);
            // Apply the current UI's adjustments to the newly selected image.
            setAdjustmentsMap(prevMap => {
                const newMap = new Map(prevMap);
                const currentUiState = {
                    tempScore, tintScore, vibranceScore, saturationScore,
                    exposureScore, highlightsScore, shadowsScore, whitesScore,
                    blacksScore, contrastScore, clarityScore, sharpnessScore
                };
                newMap.set(imageId, currentUiState);
                return newMap;
            });
        }
        setSelectedImageIds(newSelectedIds);
    }, [selectedImageIds, tempScore, tintScore, vibranceScore, saturationScore, exposureScore, highlightsScore, shadowsScore, whitesScore, blacksScore, contrastScore, clarityScore, sharpnessScore]);
    const createAbsoluteSetter = (key, setter) => (value) => {
        setter(value); // Update UI slider
        if (isBulkEditing) {
            setAdjustmentsMap(prevMap => {
                const newMap = new Map(prevMap);
                selectedImageIds.forEach(id => {
                    const currentState = newMap.get(id) || initialAdjustments;
                    newMap.set(id, { ...currentState, [key]: value });
                });
                return newMap;
            });
        }
    };
    const createRelativeAdjuster = (key, uiSetter, amount) => () => {
        uiSetter(prev => clamp(prev + amount));
        if (isBulkEditing) {
            setAdjustmentsMap(prevMap => {
                const newMap = new Map(prevMap);
                selectedImageIds.forEach(id => {
                    const currentState = newMap.get(id) || initialAdjustments;
                    const currentValue = currentState[key];
                    const newValue = clamp(currentValue + amount);
                    newMap.set(id, { ...currentState, [key]: newValue });
                });
                console.log("this is UI Setter: ", uiSetter);
                return newMap;
            });
        }
    };
    const setTempScoreAbs = createAbsoluteSetter('tempScore', setTempScore);
    const setTintScoreAbs = createAbsoluteSetter('tintScore', setTintScore);
    const setVibranceScoreAbs = createAbsoluteSetter('vibranceScore', setVibranceScore);
    const setSaturationScoreAbs = createAbsoluteSetter('saturationScore', setSaturationScore);
    const setExposureScoreAbs = createAbsoluteSetter('exposureScore', setExposureScore);
    const setHighlightsScoreAbs = createAbsoluteSetter('highlightsScore', setHighlightsScore);
    const setShadowsScoreAbs = createAbsoluteSetter('shadowsScore', setShadowsScore);
    const setWhitesScoreAbs = createAbsoluteSetter('whitesScore', setWhitesScore);
    const setBlacksScoreAbs = createAbsoluteSetter('blacksScore', setBlacksScore);
    const setContrastScoreAbs = createAbsoluteSetter('contrastScore', setContrastScore);
    const setClarityScoreAbs = createAbsoluteSetter('clarityScore', setClarityScore);
    const setSharpnessScoreAbs = createAbsoluteSetter('sharpnessScore', setSharpnessScore);
    // MARK: - Bulk Editor Handlers
    const handleBulkTempDecreaseMax = createRelativeAdjuster('tempScore', setTempScore, -20);
    const handleBulkTempDecrease = createRelativeAdjuster('tempScore', setTempScore, -5);
    const handleBulkTempIncrease = createRelativeAdjuster('tempScore', setTempScore, 5);
    const handleBulkTempIncreaseMax = createRelativeAdjuster('tempScore', setTempScore, 20);
    const handleBulkTintDecreaseMax = createRelativeAdjuster('tintScore', setTintScore, -20);
    const handleBulkTintDecrease = createRelativeAdjuster('tintScore', setTintScore, -5);
    const handleBulkTintIncrease = createRelativeAdjuster('tintScore', setTintScore, 5);
    const handleBulkTintIncreaseMax = createRelativeAdjuster('tintScore', setTintScore, 20);
    const handleBulkVibranceDecreaseMax = createRelativeAdjuster('vibranceScore', setVibranceScore, -20);
    const handleBulkVibranceDecrease = createRelativeAdjuster('vibranceScore', setVibranceScore, -5);
    const handleBulkVibranceIncrease = createRelativeAdjuster('vibranceScore', setVibranceScore, 5);
    const handleBulkVibranceIncreaseMax = createRelativeAdjuster('vibranceScore', setVibranceScore, 20);
    const handleBulkSaturationDecreaseMax = createRelativeAdjuster('saturationScore', setSaturationScore, -20);
    const handleBulkSaturationDecrease = createRelativeAdjuster('saturationScore', setSaturationScore, -5);
    const handleBulkSaturationIncrease = createRelativeAdjuster('saturationScore', setSaturationScore, 5);
    const handleBulkSaturationIncreaseMax = createRelativeAdjuster('saturationScore', setSaturationScore, 20);
    const handleBulkExposureDecreaseMax = createRelativeAdjuster('exposureScore', setExposureScore, -20);
    const handleBulkExposureDecrease = createRelativeAdjuster('exposureScore', setExposureScore, -5);
    const handleBulkExposureIncrease = createRelativeAdjuster('exposureScore', setExposureScore, 5);
    const handleBulkExposureIncreaseMax = createRelativeAdjuster('exposureScore', setExposureScore, 20);
    const handleBulkContrastDecreaseMax = createRelativeAdjuster('contrastScore', setContrastScore, -20);
    const handleBulkContrastDecrease = createRelativeAdjuster('contrastScore', setContrastScore, -5);
    const handleBulkContrastIncrease = createRelativeAdjuster('contrastScore', setContrastScore, 5);
    const handleBulkContrastIncreaseMax = createRelativeAdjuster('contrastScore', setContrastScore, 20);
    const handleBulkHighlightsDecreaseMax = createRelativeAdjuster('highlightsScore', setHighlightsScore, -20);
    const handleBulkHighlightsDecrease = createRelativeAdjuster('highlightsScore', setHighlightsScore, -5);
    const handleBulkHighlightsIncrease = createRelativeAdjuster('highlightsScore', setHighlightsScore, 5);
    const handleBulkHighlightsIncreaseMax = createRelativeAdjuster('highlightsScore', setHighlightsScore, 20);
    const handleBulkShadowsDecreaseMax = createRelativeAdjuster('shadowsScore', setShadowsScore, -20);
    const handleBulkShadowsDecrease = createRelativeAdjuster('shadowsScore', setShadowsScore, -5);
    const handleBulkShadowsIncrease = createRelativeAdjuster('shadowsScore', setShadowsScore, 5);
    const handleBulkShadowsIncreaseMax = createRelativeAdjuster('shadowsScore', setShadowsScore, 20);
    const handleBulkWhitesDecreaseMax = createRelativeAdjuster('whitesScore', setWhitesScore, -20);
    const handleBulkWhitesDecrease = createRelativeAdjuster('whitesScore', setWhitesScore, -5);
    const handleBulkWhitesIncrease = createRelativeAdjuster('whitesScore', setWhitesScore, 5);
    const handleBulkWhitesIncreaseMax = createRelativeAdjuster('whitesScore', setWhitesScore, 20);
    const handleBulkBlacksDecreaseMax = createRelativeAdjuster('blacksScore', setBlacksScore, -20);
    const handleBulkBlacksDecrease = createRelativeAdjuster('blacksScore', setBlacksScore, -5);
    const handleBulkBlacksIncrease = createRelativeAdjuster('blacksScore', setBlacksScore, 5);
    const handleBulkBlacksIncreaseMax = createRelativeAdjuster('blacksScore', setBlacksScore, 20);
    const handleBulkClarityDecreaseMax = createRelativeAdjuster('clarityScore', setClarityScore, -20);
    const handleBulkClarityDecrease = createRelativeAdjuster('clarityScore', setClarityScore, -5);
    const handleBulkClarityIncrease = createRelativeAdjuster('clarityScore', setClarityScore, 5);
    const handleBulkClarityIncreaseMax = createRelativeAdjuster('clarityScore', setClarityScore, 20);
    const handleBulkSharpnessDecreaseMax = createRelativeAdjuster('sharpnessScore', setSharpnessScore, -20);
    const handleBulkSharpnessDecrease = createRelativeAdjuster('sharpnessScore', setSharpnessScore, -5);
    const handleBulkSharpnessIncrease = createRelativeAdjuster('sharpnessScore', setSharpnessScore, 5);
    const handleBulkSharpnessIncreaseMax = createRelativeAdjuster('sharpnessScore', setSharpnessScore, 20);
    const handleScriptReady = useCallback(async () => {
        console.log("[Editor] Script tag is ready."); // Log entry
        if (typeof window.Module === 'function' && !editorRef.current) {
            console.log("[Editor] window.Module found. Initializing editor..."); // Log entry
            try {
                setEditorStatus("Loading WASM module...");
                const editor = new HonchoEditor();
                await editor.initialize(true);
                editorRef.current = editor;
                setIsEditorReady(true);
                setEditorStatus("Ready! Select an image to start.");
                console.log("[Editor] Initialization successful."); // Log entry
            }
            catch (error) {
                console.error("[Editor] CRITICAL: Editor initialization failed:", error); // Critical error log
                setEditorStatus(`Error: Could not load editor. See device logs.`);
            }
        }
        else {
            console.warn("[Editor] handleScriptReady called but conditions not met.", {
                isModuleFunction: typeof window.Module === 'function',
                isEditorAlreadyInitialized: !!editorRef.current
            });
        }
    }, []);
    const handleBackCallback = useCallback(() => {
        controller.handleBack(firebaseUid);
    }, [controller]);
    // MARK: - UI Handlers (Moved from page.tsx)
    // Header and Dialog Handlers
    const handleHeaderMenuClick = (event) => setHeaderMenuAnchorEl(event.currentTarget);
    const handleHeaderMenuClose = () => setHeaderMenuAnchorEl(null);
    const handleAlertClose = () => {
        setIsConnectionSlow(false);
    };
    const handleOpenCopyDialog = () => {
        const newColorChecks = {
            temperature: tempScore !== 0,
            tint: tintScore !== 0,
            vibrance: vibranceScore !== 0,
            saturation: saturationScore !== 0,
        };
        const newLightChecks = {
            exposure: exposureScore !== 0,
            contrast: contrastScore !== 0,
            highlights: highlightsScore !== 0,
            shadows: shadowsScore !== 0,
            whites: whitesScore !== 0,
            blacks: blacksScore !== 0,
        };
        const newDetailsChecks = {
            clarity: clarityScore !== 0,
            sharpness: sharpnessScore !== 0,
        };
        setCopyColorChecks(newColorChecks);
        setCopyLightChecks(newLightChecks);
        setCopyDetailsChecks(newDetailsChecks);
        setCopyDialogExpanded({
            color: Object.values(newColorChecks).some(isChecked => isChecked),
            light: Object.values(newLightChecks).some(isChecked => isChecked),
            details: Object.values(newDetailsChecks).some(isChecked => isChecked),
        });
        setCopyDialogOpen(true);
        handleHeaderMenuClose();
    };
    const handleCloseCopyDialog = () => setCopyDialogOpen(false);
    const handleCopyParentChange = (event, setter) => {
        const isChecked = event.target.checked;
        setter((prev) => {
            const newState = {};
            Object.keys(prev).forEach(key => { newState[key] = isChecked; });
            return newState;
        });
    };
    const handleCopyChildChange = (event, setter) => {
        setter((prev) => ({
            ...prev,
            [event.target.name]: event.target.checked,
        }));
    };
    const handleToggleCopyDialogExpand = (section) => {
        setCopyDialogExpanded(prev => ({ ...prev, [section]: !prev[section] }));
    };
    const handleCopyEdit = useCallback(() => {
        const adjustmentsToCopy = {};
        // Color Adjustments
        if (copyColorChecks.temperature)
            adjustmentsToCopy.tempScore = tempScore;
        if (copyColorChecks.tint)
            adjustmentsToCopy.tintScore = tintScore;
        if (copyColorChecks.vibrance)
            adjustmentsToCopy.vibranceScore = vibranceScore;
        if (copyColorChecks.saturation)
            adjustmentsToCopy.saturationScore = saturationScore;
        // Light Adjustments
        if (copyLightChecks.exposure)
            adjustmentsToCopy.exposureScore = exposureScore;
        if (copyLightChecks.contrast)
            adjustmentsToCopy.contrastScore = contrastScore;
        if (copyLightChecks.highlights)
            adjustmentsToCopy.highlightsScore = highlightsScore;
        if (copyLightChecks.shadows)
            adjustmentsToCopy.shadowsScore = shadowsScore;
        if (copyLightChecks.whites)
            adjustmentsToCopy.whitesScore = whitesScore;
        if (copyLightChecks.blacks)
            adjustmentsToCopy.blacksScore = blacksScore;
        // Details Adjustments
        if (copyDetailsChecks.clarity)
            adjustmentsToCopy.clarityScore = clarityScore;
        if (copyDetailsChecks.sharpness)
            adjustmentsToCopy.sharpnessScore = sharpnessScore;
        // Combine with existing copied adjustments to not lose unchecked values from a previous copy
        setCopiedAdjustments(prev => ({ ...initialAdjustments, ...prev, ...adjustmentsToCopy }));
        console.log("Copied selected adjustments:", adjustmentsToCopy);
    }, [
        copyColorChecks, copyLightChecks, copyDetailsChecks,
        tempScore, tintScore, vibranceScore, saturationScore, exposureScore, contrastScore,
        highlightsScore, shadowsScore, whitesScore, blacksScore, clarityScore, sharpnessScore
    ]);
    const handleConfirmCopy = () => { handleCopyEdit(); handleCloseCopyDialog(); setShowCopyAlert(true); };
    const handlePasteEdit = useCallback(() => {
        if (copiedAdjustments) {
            applyAdjustmentState(copiedAdjustments);
        }
    }, [copiedAdjustments, applyAdjustmentState]);
    // Panel Handlers
    const handleColorAccordionChange = (panel) => (_, isExpanded) => {
        setColorAdjustmentExpandedPanels(prev => isExpanded ? [...new Set([...prev, panel])] : prev.filter(p => p !== panel));
    };
    const handlePresetAccordionChange = (panel) => (_, isExpanded) => {
        setPresetExpandedPanels(prev => isExpanded ? [...new Set([...prev, panel])] : prev.filter(p => p !== panel));
    };
    // MARK: - Preset Handlers
    // Also it calls for the backend endpoint
    const fetchPresets = useCallback(async () => {
        if (!controller)
            return;
        try {
            const fetchedPresets = await controller.getPresets(firebaseUid);
            setPresets(fetchedPresets);
        }
        catch (error) {
            console.error("Failed to fetch presets:", error);
        }
    }, [controller]);
    const handleSelectMobilePreset = (presetId) => setSelectedMobilePreset(presetId);
    const handleSelectDesktopPreset = (presetId) => setSelectedDesktopPreset(presetId);
    const handlePresetMenuClick = (event, presetId) => {
        event.stopPropagation();
        setPresetMenuAnchorEl(event.currentTarget);
        setActivePresetMenuId(presetId);
    };
    const handlePresetMenuClose = () => { setPresetMenuAnchorEl(null); setActivePresetMenuId(null); };
    const handleRemovePreset = () => { console.log(`Remove: ${activePresetMenuId}`); handlePresetMenuClose(); };
    const handleDeletePreset = useCallback(async () => {
        if (!controller || !activePresetMenuId)
            return;
        try {
            await controller.deletePreset(firebaseUid, activePresetMenuId);
            // On success, remove the preset from local state
            setPresets(prevPresets => prevPresets.filter(p => p.id !== activePresetMenuId));
        }
        catch (error) {
            console.error("Failed to delete preset:", error);
        }
        handlePresetMenuClose(); // Close the options menu
    }, [controller, activePresetMenuId]);
    // Preset Modal Handlers
    const handleOpenPresetModal = () => { setIsPresetCreated(false); setPresetModalOpen(true); };
    const handleClosePresetModal = () => setPresetModalOpen(false);
    const handleCreatePreset = useCallback(async () => {
        if (!controller)
            return;
        const currentAdjustments = { tempScore, tintScore, vibranceScore, exposureScore, highlightsScore, shadowsScore, whitesScore, blacksScore, saturationScore, contrastScore, clarityScore, sharpnessScore };
        try {
            const newPreset = await controller.createPreset(firebaseUid, presetName, currentAdjustments);
            if (newPreset) {
                // Add the new preset returned from the API to our local state
                setPresets(prevPresets => [...prevPresets, newPreset]);
            }
        }
        catch (error) {
            console.error("Failed to create preset:", error);
        }
        console.log("Creating preset:", presetName);
        const newPreset = { id: `preset${presets.length + 1}`, name: presetName };
        setPresets(prevPresets => [...prevPresets, newPreset]);
        setIsPresetCreated(true);
        handleClosePresetModal();
        setTimeout(() => setIsPresetCreated(false), 1000);
    }, [controller, presetName, tempScore, tintScore, exposureScore, highlightsScore, shadowsScore, whitesScore, blacksScore, saturationScore, contrastScore, clarityScore, sharpnessScore]);
    const handleOpenPresetModalMobile = () => { setIsPresetCreated(false); setPresetModalOpenMobile(true); };
    const handleClosePresetModalMobile = () => setPresetModalOpenMobile(false);
    const handleCreatePresetMobile = () => {
        console.log("Creating mobile preset:", presetName);
        const newPreset = { id: `preset${presets.length + 1}`, name: presetName };
        setPresets(prevPresets => [...prevPresets, newPreset]);
        setIsPresetCreated(true);
        handleClosePresetModalMobile();
        setTimeout(() => setIsPresetCreated(false), 1000);
    };
    const handleNameChange = (event) => setPresetName(event.target.value);
    // Watermark Handlers
    const handleOpenWatermarkView = () => setIsCreatingWatermark(true);
    const handleSaveWatermark = () => setIsCreatingWatermark(false);
    const handleCancelWatermark = () => setIsCreatingWatermark(false);
    const handleOpenRenameModal = useCallback(() => {
        if (!activePresetMenuId)
            return;
        const preset = presets.find(p => p.id === activePresetMenuId);
        if (preset) {
            setPresetToRename(preset);
            setNewPresetName(preset.name); // Pre-fill the input with the current name
            setRenameModalOpen(true);
        }
        handlePresetMenuClose(); // Close the small options menu
    }, [activePresetMenuId, presets]);
    const handleCloseRenameModal = () => {
        setRenameModalOpen(false);
        setPresetToRename(null);
        setNewPresetName("");
    };
    // Bulk Editing Handlers
    const toggleBulkEditing = () => {
        setIsBulkEditing(prev => {
            const isNowBulk = !prev;
            setSelectedImages(isNowBulk ? 'Selected' : 'Select');
            return isNowBulk;
        });
    };
    const handleSelectBulkPreset = (event) => setSelectedBulkPreset(event.target.value);
    // MARK : Image original and canvas
    const handleShowOriginal = useCallback(() => {
        if (!editorRef.current || !isImageLoaded)
            return;
        console.log("Showing original image...");
        // 1. Set the flag to true to pause history recording
        setIsViewingOriginal(true);
        // 2. Apply the initial state to the view
        applyAdjustmentState(initialAdjustments);
    }, [isImageLoaded, applyAdjustmentState]);
    const handleShowEdited = useCallback(() => {
        if (!editorRef.current || !isImageLoaded)
            return;
        console.log("Restoring edited image...");
        const latestState = history[historyIndex];
        if (latestState) {
            // 3. Re-apply the latest state from history
            applyAdjustmentState(latestState);
        }
        // 4. Set the flag back to false AFTER the state has been restored.
        // A small timeout ensures this runs after the re-render.
        setTimeout(() => setIsViewingOriginal(false), 0);
    }, [isImageLoaded, history, historyIndex, applyAdjustmentState]);
    // MARK: - Zoom Handlers
    const handleZoomAction = useCallback((action) => {
        let newZoom = zoomLevel;
        const zoomStep = 1.25;
        switch (action) {
            case 'in':
                newZoom *= zoomStep;
                break;
            case 'out':
                newZoom /= zoomStep;
                break;
            case 'fit':
                newZoom = 1;
                break;
            case '50%':
                newZoom = 0.5;
                break;
            case '100%':
                newZoom = 1;
                break;
            case '200%':
                newZoom = 2;
                break;
        }
        setZoomLevel(Math.max(0.1, Math.min(newZoom, 8)));
    }, [zoomLevel]);
    const handleWheelZoom = useCallback((event) => {
        if (!isImageLoaded)
            return;
        event.preventDefault(); // Prevent page from scrolling
        const zoomFactor = 1.1;
        let newZoom = zoomLevel;
        if (event.deltaY < 0) {
            newZoom *= zoomFactor; // Scroll up to zoom in
        }
        else {
            newZoom /= zoomFactor; // Scroll down to zoom out
        }
        setZoomLevel(Math.max(0.1, Math.min(newZoom, 8)));
    }, [zoomLevel, isImageLoaded]);
    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.style.transition = 'transform 0.1s ease-out';
            canvasRef.current.style.transform = `scale(${zoomLevel})`;
        }
    }, [zoomLevel]);
    // MARK: - Effects
    // Preset Image List
    useEffect(() => {
        fetchPresets();
    }, [controller, fetchPresets]);
    // Image Load
    useEffect(() => {
        if (isImageLoaded && editorRef.current && canvasRef.current) {
            const { width, height } = editorRef.current.getImageSize();
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            updateCanvas();
            setEditorStatus("Image loaded successfully!");
        }
    }, [isImageLoaded, updateCanvas]);
    // Adjustment USE EFFECTS
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setExposure(exposureScore);
        updateCanvas();
    } }, [exposureScore, isImageLoaded, updateCanvas]);
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setVibrance(vibranceScore);
        updateCanvas();
    } }, [vibranceScore, isImageLoaded, updateCanvas]);
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setContrast(contrastScore);
        updateCanvas();
    } }, [contrastScore, isImageLoaded, updateCanvas]);
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setHighlights(highlightsScore);
        updateCanvas();
    } }, [highlightsScore, isImageLoaded, updateCanvas]);
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setShadows(shadowsScore);
        updateCanvas();
    } }, [shadowsScore, isImageLoaded, updateCanvas]);
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setSaturation(saturationScore);
        updateCanvas();
    } }, [saturationScore, isImageLoaded, updateCanvas]);
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setTemperature(tempScore);
        updateCanvas();
    } }, [tempScore, isImageLoaded, updateCanvas]);
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setTint(tintScore);
        updateCanvas();
    } }, [tintScore, isImageLoaded, updateCanvas]);
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setBlacks(blacksScore);
        updateCanvas();
    } }, [blacksScore, isImageLoaded, updateCanvas]);
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setWhites(whitesScore);
        updateCanvas();
    } }, [whitesScore, isImageLoaded, updateCanvas]);
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setClarity(clarityScore);
        updateCanvas();
    } }, [clarityScore, isImageLoaded, updateCanvas]);
    useEffect(() => { if (isImageLoaded) {
        editorRef.current?.setSharpness(sharpnessScore);
        updateCanvas();
    } }, [sharpnessScore, isImageLoaded, updateCanvas]);
    useEffect(() => {
        // 5. Add a check to ignore state changes while viewing the original
        if (!isImageLoaded || isViewingOriginal)
            return;
        const newState = { tempScore, tintScore, vibranceScore, exposureScore, highlightsScore, shadowsScore, whitesScore, blacksScore, saturationScore, contrastScore, clarityScore, sharpnessScore };
        if (JSON.stringify(history[historyIndex]) === JSON.stringify(newState))
            return;
        const newHistory = history.slice(0, historyIndex + 1);
        setHistory([...newHistory, newState]);
        setHistoryIndex(newHistory.length);
    }, [
        tempScore, tintScore, vibranceScore, exposureScore, highlightsScore, shadowsScore,
        whitesScore, blacksScore, saturationScore, contrastScore, clarityScore, sharpnessScore,
        isImageLoaded, history, historyIndex,
        isViewingOriginal
    ]);
    useEffect(() => {
        if (showCopyAlert) {
            const timer = setTimeout(() => setShowCopyAlert(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showCopyAlert]);
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    useEffect(() => {
        // The function returned by useEffect is the cleanup function.
        // It will run only when the component that uses this hook unmounts.
        return () => {
            if (editorRef.current) {
                console.log("Cleaning up Honcho Editor instance...");
                editorRef.current.cleanup(); // This calls the C++ cleanup function
            }
        };
    }, []);
    return {
        // Refs
        canvasRef,
        canvasContainerRef,
        fileInputRef,
        displayedToken,
        handleBackCallback,
        handlePrev,
        handleNext,
        // Refs for mobile panel
        panelRef,
        contentRef,
        // State for mobile panel
        panelHeight,
        // Handlers for mobile panel
        handleDragStart,
        handleContentHeightChange,
        // Status & State
        editorStatus,
        isEditorReady,
        isImageLoaded,
        isPasteAvailable: copiedAdjustments !== null,
        isOnline,
        isConnectionSlow,
        showCopyAlert,
        isCopyDialogOpen,
        isPublished,
        activePanel,
        activeSubPanel,
        headerMenuAnchorEl,
        anchorMenuZoom,
        colorAdjustmentExpandedPanels,
        presetExpandedPanels,
        isCreatingWatermark,
        isPresetModalOpen,
        isPresetModalOpenMobile,
        presetName,
        isPresetCreated,
        selectedMobilePreset,
        selectedDesktopPreset,
        selectedBulkPreset,
        presetMenuAnchorEl,
        activePresetMenuId,
        currentAspectRatio,
        currentSquareRatio,
        currentWideRatio,
        angelScore,
        widthSizePX,
        heightSizePX,
        isBulkEditing,
        selectedImages,
        colorAdjustments,
        lightAdjustments,
        detailsAdjustments,
        handleShowOriginal,
        handleShowEdited,
        handleWheelZoom,
        handleZoomAction,
        zoomLevelText: `${Math.round(zoomLevel * 100)}%`,
        presets,
        // Functions
        handleScriptReady,
        handleFileChange,
        handleAlertClose,
        loadImageFromId,
        loadImageFromUrl,
        handleRevert,
        handleUndo,
        handleRedo,
        handleOpenCopyDialog,
        handleCloseCopyDialog,
        copyColorChecks,
        setCopyColorChecks,
        copyLightChecks,
        setCopyLightChecks,
        copyDetailsChecks,
        setCopyDetailsChecks,
        copyDialogExpanded,
        handleCopyParentChange,
        handleCopyChildChange,
        handleToggleCopyDialogExpand,
        handleConfirmCopy,
        handleCopyEdit,
        handlePasteEdit,
        // adjustClarityBulk,
        // adjustSharpnessBulk,
        // Setters & Handlers
        setActivePanel,
        setActiveSubPanel,
        setHeaderMenuAnchorEl,
        setAnchorMenuZoom,
        handleHeaderMenuClick,
        handleHeaderMenuClose,
        setColorAdjustments,
        setLightAdjustments,
        setDetailsAdjustments,
        handleColorAccordionChange,
        handlePresetAccordionChange,
        handleSelectMobilePreset,
        handleSelectDesktopPreset,
        handlePresetMenuClick,
        handlePresetMenuClose,
        handleCreatePreset,
        handleRemovePreset,
        handleDeletePreset,
        handleOpenPresetModal,
        handleClosePresetModal,
        handleOpenPresetModalMobile,
        handleClosePresetModalMobile,
        handleCreatePresetMobile,
        setPresetName,
        handleNameChange,
        isRenameModalOpen,
        presetToRename,
        newPresetName,
        setNewPresetName,
        handleOpenRenameModal,
        handleCloseRenameModal,
        handleOpenWatermarkView,
        handleSaveWatermark,
        handleCancelWatermark,
        toggleBulkEditing,
        handleSelectBulkPreset,
        // Adjustment State & Setters
        tempScore, setTempScore: setTempScoreAbs,
        tintScore, setTintScore: setTintScoreAbs,
        vibranceScore, setVibranceScore: setVibranceScoreAbs,
        saturationScore, setSaturationScore: setSaturationScoreAbs,
        exposureScore, setExposureScore: setExposureScoreAbs,
        highlightsScore, setHighlightsScore: setHighlightsScoreAbs,
        shadowsScore, setShadowsScore: setShadowsScoreAbs,
        whitesScore, setWhitesScore: setWhitesScoreAbs,
        blacksScore, setBlacksScore: setBlacksScoreAbs,
        contrastScore, setContrastScore: setContrastScoreAbs,
        clarityScore, setClarityScore: setClarityScoreAbs,
        sharpnessScore, setSharpnessScore: setSharpnessScoreAbs,
        // Bulk Adjustment Handlers
        // Note: These handlers are for image list
        imageList,
        adjustmentsMap,
        selectedImageIds,
        handleToggleImageSelection,
        // Note: These handlers are for bulk adjustments
        // Adjustment Colors
        handleBulkTempDecreaseMax,
        handleBulkTempDecrease,
        handleBulkTempIncrease,
        handleBulkTempIncreaseMax,
        handleBulkTintDecreaseMax,
        handleBulkTintDecrease,
        handleBulkTintIncrease,
        handleBulkTintIncreaseMax,
        handleBulkVibranceDecreaseMax,
        handleBulkVibranceDecrease,
        handleBulkVibranceIncrease,
        handleBulkVibranceIncreaseMax,
        handleBulkSaturationDecreaseMax,
        handleBulkSaturationDecrease,
        handleBulkSaturationIncrease,
        handleBulkSaturationIncreaseMax,
        // Adjustment Light
        handleBulkExposureDecreaseMax,
        handleBulkExposureDecrease,
        handleBulkExposureIncrease,
        handleBulkExposureIncreaseMax,
        handleBulkContrastDecreaseMax,
        handleBulkContrastDecrease,
        handleBulkContrastIncrease,
        handleBulkContrastIncreaseMax,
        handleBulkHighlightsDecreaseMax,
        handleBulkHighlightsDecrease,
        handleBulkHighlightsIncrease,
        handleBulkHighlightsIncreaseMax,
        handleBulkShadowsDecreaseMax,
        handleBulkShadowsDecrease,
        handleBulkShadowsIncrease,
        handleBulkShadowsIncreaseMax,
        handleBulkWhitesDecreaseMax,
        handleBulkWhitesDecrease,
        handleBulkWhitesIncrease,
        handleBulkWhitesIncreaseMax,
        handleBulkBlacksDecreaseMax,
        handleBulkBlacksDecrease,
        handleBulkBlacksIncrease,
        handleBulkBlacksIncreaseMax,
        // Adjustment Details
        handleBulkClarityDecreaseMax,
        handleBulkClarityDecrease,
        handleBulkClarityIncrease,
        handleBulkClarityIncreaseMax,
        handleBulkSharpnessDecreaseMax,
        handleBulkSharpnessDecrease,
        handleBulkSharpnessIncrease,
        handleBulkSharpnessIncreaseMax,
    };
}
