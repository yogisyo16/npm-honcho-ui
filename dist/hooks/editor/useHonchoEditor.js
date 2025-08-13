'use client';
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { HonchoEditor } from '../../lib/editor/honcho-editor';
import { mapAdjustmentStateToAdjustmentEditor, mapColorAdjustmentToAdjustmentState } from '../../utils/adjustment';
import { useAdjustmentHistory } from '../useAdjustmentHistory';
import { useGallerySwipe } from '../useGallerySwipe';
const initialAdjustments = {
    tempScore: 0, tintScore: 0, vibranceScore: 0, exposureScore: 0, highlightsScore: 0, shadowsScore: 0,
    whitesScore: 0, blacksScore: 0, saturationScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
};
// const clamp = (value: number) => Math.max(-100, Math.min(100, value));
export function useHonchoEditor(controller, initImageId, firebaseUid) {
    const { onSwipeNext, onSwipePrev, isNextAvailable, isPrevAvailable, isLoading: isGalleryLoading, error: galleryError, currentImageData: galleryImageData } = useGallerySwipe(firebaseUid, initImageId, controller);
    // The useAdjustmentHistory hook now manages all undo/redo and adjustment state logic.
    const { currentState: currentAdjustmentsState, actions: historyActions, historyInfo, config: historyConfig, } = useAdjustmentHistory(initialAdjustments);
    const [eventId, setEventId] = useState(null);
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
    const [copiedAdjustments, setCopiedAdjustments] = useState(null);
    const [copyColorChecks, setCopyColorChecks] = useState({ temperature: true, tint: true, vibrance: true, saturation: true });
    const [copyLightChecks, setCopyLightChecks] = useState({ exposure: true, contrast: true, highlights: true, shadows: true, whites: true, blacks: true });
    const [copyDetailsChecks, setCopyDetailsChecks] = useState({ clarity: true, sharpness: true });
    const [copyDialogExpanded, setCopyDialogExpanded] = useState({ color: true, light: true, details: true });
    // MARK: - UI & App State (Moved from page.tsx)
    // General UI State
    const [isOnline, setIsOnline] = useState(true);
    const [isConnectionSlow, setIsConnectionSlow] = useState(false);
    const [showCopyAlert, setShowCopyAlert] = useState(false);
    const [isCopyDialogOpen, setCopyDialogOpen] = useState(false);
    const [activePanel, setActivePanel] = useState('colorAdjustment');
    const [activeSubPanel, setActiveSubPanel] = useState('');
    const [headerMenuAnchorEl, setHeaderMenuAnchorEl] = useState(null);
    const [anchorMenuZoom, setAnchorMenuZoom] = useState(null);
    // Panel Expansion State
    const [colorAdjustmentExpandedPanels, setColorAdjustmentExpandedPanels] = useState(['whiteBalance', 'light', 'details']);
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
    // const [selectedBulkPreset, setSelectedBulkPreset] = useState<string>('preset1');
    const [presetMenuAnchorEl, setPresetMenuAnchorEl] = useState(null);
    const [activePresetMenuId, setActivePresetMenuId] = useState(null);
    const [isRenameModalOpen, setRenameModalOpen] = useState(false);
    const [presetToRename, setPresetToRename] = useState(null);
    const [newPresetName, setNewPresetName] = useState("");
    // Aspect Ratio State
    // Note: not used yet
    // const [currentAspectRatio, setCurrentAspectRatio] = useState('potrait');
    // const [currentSquareRatio, setCurrentSquareRatio] = useState('original');
    // const [currentWideRatio, setCurrentWideRatio] = useState('1:1');
    // const [angelScore, setAngleScore] = useState(0);
    // const [widthSizePX, setWidthSizePX] = useState(0);
    // const [heightSizePX, setHeightSizePX] = useState(0);
    // Bulk Editing State
    // const [isBulkEditing, setIsBulkEditing] = useState(false);
    // const [selectedImages, setSelectedImages] = useState('Select');
    // const [imageList, setImageList] = useState<ImageItem[]>([]);
    // const [selectedImageIds, setSelectedImageIds] = useState<Set<string>>(new Set());
    // MARK: Framse- (Later use)
    // State for Copying specific adjustments
    const [colorAdjustments, setColorAdjustments] = useState(true);
    const [lightAdjustments, setLightAdjustments] = useState(true);
    const [detailsAdjustments, setDetailsAdjustments] = useState(true);
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
    // Effect for keyboard shortcuts
    // MARK: - Core Editor Logic
    // MARK: Batch Edit logic
    // const handleToggleImageSelection = useCallback((imageId: string) => {
    //     const newSelectedIds = new Set(selectedImageIds);
    //     const isCurrentlySelected = newSelectedIds.has(imageId);
    //     if (isCurrentlySelected) {
    //         if (newSelectedIds.size > 1) {
    //             newSelectedIds.delete(imageId);
    //         }
    //     } else {
    //         newSelectedIds.add(imageId);
    //         // Apply the current UI's adjustments to the newly selected image.
    //         setAdjustmentsMap(prevMap => {
    //             const newMap = new Map(prevMap);
    //             const currentUiState = {
    //                 tempScore, tintScore, vibranceScore, saturationScore,
    //                 exposureScore, highlightsScore, shadowsScore, whitesScore,
    //                 blacksScore, contrastScore, clarityScore, sharpnessScore
    //             };
    //             newMap.set(imageId, currentUiState);
    //             return newMap;
    //         });
    //     }
    //     setSelectedImageIds(newSelectedIds);
    // }, [selectedImageIds, tempScore, tintScore, vibranceScore, saturationScore, exposureScore, highlightsScore, shadowsScore, whitesScore, blacksScore, contrastScore, clarityScore, sharpnessScore]);
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
    const extractPathFromGallery = useCallback((data) => {
        const imagePath = data?.raw_edited?.path
            ? data.raw_edited.path
            : data?.download?.path;
        console.log("[DEBUG FOR EXTRACT] Extracted imagePath to load:", imagePath);
        return imagePath;
    }, []);
    const loadImageEditorFromUrl = useCallback(async (url) => {
        try {
            if (!editorRef.current)
                return;
            setEditorStatus("Downloading image...");
            const response = await fetch(url);
            if (!response.ok)
                throw new Error(`Failed to fetch image from URL: ${url}`);
            const blob = await response.blob();
            const filename = url.substring(url.lastIndexOf('/') + 1) || 'image.jpg';
            const file = new File([blob], filename, { type: blob.type });
            console.log("[DEBUG FOR LOAD] File to load:", file);
            await editorRef.current.loadImageFromFile(file);
            setIsImageLoaded(true);
        }
        catch (error) {
            console.error(error);
            setEditorStatus("Error: Could not load image from URL.");
            setIsImageLoaded(false);
        }
    }, [editorRef.current]);
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
        if (!galleryImageData)
            return;
        controller.handleBack(firebaseUid, galleryImageData.id);
    }, [controller, firebaseUid, galleryImageData]);
    // MARK: - UI Handlers (Moved from page.tsx)
    // MARK: - UI Handlers
    // Panel Handlers
    const handleColorAccordionChange = (panel) => (_, isExpanded) => {
        setColorAdjustmentExpandedPanels(prev => isExpanded ? [...new Set([...prev, panel])] : prev.filter(p => p !== panel));
    };
    const handlePresetAccordionChange = (panel) => (_, isExpanded) => {
        setPresetExpandedPanels(prev => isExpanded ? [...new Set([...prev, panel])] : prev.filter(p => p !== panel));
    };
    const handleShowOriginal = useCallback(() => {
        if (!editorRef.current || !isImageLoaded || !canvasRef.current)
            return;
        console.log("Showing original image...");
        editorRef.current.setAdjustments(mapAdjustmentStateToAdjustmentEditor(initialAdjustments));
        editorRef.current.processImage();
        editorRef.current.renderToCanvas(canvasRef.current);
    }, [isImageLoaded, editorRef, canvasRef]);
    const handleShowEdited = useCallback(() => {
        if (!editorRef.current || !isImageLoaded || !canvasRef.current)
            return;
        editorRef.current.setAdjustments(mapAdjustmentStateToAdjustmentEditor(currentAdjustmentsState));
        editorRef.current.processImage();
        editorRef.current.renderToCanvas(canvasRef.current);
    }, [isImageLoaded, editorRef, canvasRef, currentAdjustmentsState]);
    // MARK: - Preset Handlers
    // Also it calls for the backend endpoint
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
        const currentAdjustments = { ...currentAdjustmentsState };
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
    }, [controller, presetName, currentAdjustmentsState, firebaseUid]);
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
            setNewPresetName(preset.name);
            setRenameModalOpen(true);
        }
        handlePresetMenuClose();
    }, [activePresetMenuId, presets]);
    const handleCloseRenameModal = () => {
        setRenameModalOpen(false);
        setPresetToRename(null);
        setNewPresetName("");
    };
    // MARK: DEBUG (NEW LOGIC)
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
    const zoomLevelText = useMemo(() => {
        return `${Math.round(zoomLevel * 100)}%`;
    }, [zoomLevel]);
    const updateAdjustments = useCallback((newValues) => {
        const newState = { ...currentAdjustmentsState, ...newValues };
        historyActions.pushState(newState);
    }, [currentAdjustmentsState, historyActions]);
    const setTempScore = (value) => updateAdjustments({ tempScore: value });
    const setTintScore = (value) => updateAdjustments({ tintScore: value });
    const setVibranceScore = (value) => updateAdjustments({ vibranceScore: value });
    const setSaturationScore = (value) => updateAdjustments({ saturationScore: value });
    const setExposureScore = (value) => updateAdjustments({ exposureScore: value });
    const setHighlightsScore = (value) => updateAdjustments({ highlightsScore: value });
    const setShadowsScore = (value) => updateAdjustments({ shadowsScore: value });
    const setWhitesScore = (value) => updateAdjustments({ whitesScore: value });
    const setBlacksScore = (value) => updateAdjustments({ blacksScore: value });
    const setContrastScore = (value) => updateAdjustments({ contrastScore: value });
    const setClarityScore = (value) => updateAdjustments({ clarityScore: value });
    const setSharpnessScore = (value) => updateAdjustments({ sharpnessScore: value });
    // MARK: Copied ClipBoard
    const handleHeaderMenuClick = (event) => setHeaderMenuAnchorEl(event.currentTarget);
    const handleHeaderMenuClose = () => setHeaderMenuAnchorEl(null);
    const handleAlertClose = () => {
        setIsConnectionSlow(false);
    };
    const handleOpenCopyDialog = () => {
        const newColorChecks = {
            temperature: currentAdjustmentsState.tempScore !== 0,
            tint: currentAdjustmentsState.tintScore !== 0,
            vibrance: currentAdjustmentsState.vibranceScore !== 0,
            saturation: currentAdjustmentsState.saturationScore !== 0,
        };
        const newLightChecks = {
            exposure: currentAdjustmentsState.exposureScore !== 0,
            contrast: currentAdjustmentsState.contrastScore !== 0,
            highlights: currentAdjustmentsState.highlightsScore !== 0,
            shadows: currentAdjustmentsState.shadowsScore !== 0,
            whites: currentAdjustmentsState.whitesScore !== 0,
            blacks: currentAdjustmentsState.blacksScore !== 0,
        };
        const newDetailsChecks = {
            clarity: currentAdjustmentsState.clarityScore !== 0,
            sharpness: currentAdjustmentsState.sharpnessScore !== 0,
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
            adjustmentsToCopy.tempScore = currentAdjustmentsState.tempScore;
        if (copyColorChecks.tint)
            adjustmentsToCopy.tintScore = currentAdjustmentsState.tintScore;
        if (copyColorChecks.vibrance)
            adjustmentsToCopy.vibranceScore = currentAdjustmentsState.vibranceScore;
        if (copyColorChecks.saturation)
            adjustmentsToCopy.saturationScore = currentAdjustmentsState.saturationScore;
        // Light Adjustments
        if (copyLightChecks.exposure)
            adjustmentsToCopy.exposureScore = currentAdjustmentsState.exposureScore;
        if (copyLightChecks.contrast)
            adjustmentsToCopy.contrastScore = currentAdjustmentsState.contrastScore;
        if (copyLightChecks.highlights)
            adjustmentsToCopy.highlightsScore = currentAdjustmentsState.highlightsScore;
        if (copyLightChecks.shadows)
            adjustmentsToCopy.shadowsScore = currentAdjustmentsState.shadowsScore;
        if (copyLightChecks.whites)
            adjustmentsToCopy.whitesScore = currentAdjustmentsState.whitesScore;
        if (copyLightChecks.blacks)
            adjustmentsToCopy.blacksScore = currentAdjustmentsState.blacksScore;
        // Details Adjustments
        if (copyDetailsChecks.clarity)
            adjustmentsToCopy.clarityScore = currentAdjustmentsState.clarityScore;
        if (copyDetailsChecks.sharpness)
            adjustmentsToCopy.sharpnessScore = currentAdjustmentsState.sharpnessScore;
        // Combine with existing copied adjustments to not lose unchecked values from a previous copy
        setCopiedAdjustments(prev => ({ ...initialAdjustments, ...prev, ...adjustmentsToCopy }));
        console.log("Copied selected adjustments:", adjustmentsToCopy);
    }, [copyColorChecks, copyLightChecks, copyDetailsChecks, currentAdjustmentsState]);
    const handlePasteEdit = useCallback(() => {
        if (!copiedAdjustments)
            return;
        updateAdjustments(copiedAdjustments);
        handleHeaderMenuClose();
    }, [copiedAdjustments, updateAdjustments]);
    const handleCloseCopyDialog = () => setCopyDialogOpen(false);
    const handleConfirmCopy = () => { handleCopyEdit(); handleCloseCopyDialog(); setShowCopyAlert(true); };
    // MARK: useEffect HERE!
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (contentRef.current) {
                const height = contentRef.current.scrollHeight;
                setContentHeight(height);
            }
        }, 50);
        return () => clearTimeout(timeoutId);
    }, [activePanel, activeSubPanel]);
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
        if (canvasRef.current) {
            canvasRef.current.style.transition = 'transform 0.1s ease-out';
            canvasRef.current.style.transform = `scale(${zoomLevel})`;
        }
    }, [zoomLevel]);
    useEffect(() => {
        // will trigger when currentImageId change
        if (!galleryImageData)
            return;
        console.log("++ USE EFFECT FOR NEXT AND PREV");
        const init = async () => {
            console.log("1. INIT EDITOR");
            if (editorRef.current?.getInitialized() === false) {
                await editorRef.current?.initialize();
            }
            const adjustmentData = galleryImageData.editor_config?.color_adjustment;
            console.log("2. ADJUSTMENT DATA: ", { ...adjustmentData }, { ...galleryImageData });
            // set event
            setEventId(galleryImageData.event_id);
            console.log("3. EVENTID: ", eventId);
            const pathGallery = extractPathFromGallery(galleryImageData);
            // load image to editor
            console.log("4. PATH GALLERY: ", pathGallery);
            await loadImageEditorFromUrl(pathGallery);
            console.log("5. LOAD IMAGE TO EDITOR");
            // adjustment setup
            if (adjustmentData) {
                console.log("7. ADJUSTMENT DATA FOUND");
                const adjustmentState = mapColorAdjustmentToAdjustmentState(adjustmentData);
                // set adjustment to editor to make adjustmentState change
                console.log("8. SYNC HISTORY");
                historyActions.syncHistory([adjustmentState]);
            }
            else {
                historyActions.syncHistory([initialAdjustments]);
                console.log("no adjustment found, use default");
            }
        };
        init();
    }, [galleryImageData, editorRef.current]);
    useEffect(() => {
        // Render photo if adjustmentState change;
        if (!editorRef.current || !isImageLoaded)
            return;
        console.log("Rendering adjustments to editor...", currentAdjustmentsState);
        if ((editorRef.current?.getInitialized() === true) && canvasRef.current) {
            editorRef.current.setAdjustments(mapAdjustmentStateToAdjustmentEditor(currentAdjustmentsState));
            editorRef.current.processImage();
            editorRef.current.renderToCanvas(canvasRef.current);
        }
    }, [editorRef.current, currentAdjustmentsState, isImageLoaded, canvasRef.current]);
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
        if (!navigatorWithConnection.connection)
            return;
        const navigatorConnection = navigatorWithConnection.connection;
        const updateConnectionStatus = () => {
            const slowConnectionTypes = ['slow-2g', '2g', '3g'];
            const isSlow = navigatorConnection.saveData || slowConnectionTypes.includes(navigatorConnection.effectiveType);
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
    return {
        // Refs
        canvasRef,
        canvasContainerRef,
        fileInputRef,
        handleShowOriginal,
        handleShowEdited,
        // Status & State
        editorStatus,
        isEditorReady,
        isImageLoaded: isImageLoaded && !isGalleryLoading, // Combine loading states
        onSwipeNext,
        onSwipePrev,
        isNextAvailable,
        isPrevAvailable,
        isGalleryLoading,
        galleryError,
        galleryImageData,
        historyActions,
        handleBackCallback,
        currentAdjustmentsState,
        setTempScore,
        setTintScore,
        setVibranceScore,
        setSaturationScore,
        setExposureScore,
        setHighlightsScore,
        setShadowsScore,
        setWhitesScore,
        setBlacksScore,
        setContrastScore,
        setClarityScore,
        setSharpnessScore,
        // History functions and state
        handleUndo: historyActions.undo,
        handleRedo: historyActions.redo,
        handleRevert: () => historyActions.reset(initialAdjustments),
        canUndo: historyInfo.canUndo,
        canRedo: historyInfo.canRedo,
        // Refs for mobile panel
        panelRef,
        contentRef,
        // State for mobile panel
        panelHeight,
        // Handlers for mobile panel
        handleDragStart,
        handleContentHeightChange,
        // Status & State
        isPasteAvailable: copiedAdjustments !== null,
        isOnline,
        isConnectionSlow,
        showCopyAlert,
        isCopyDialogOpen,
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
        presetMenuAnchorEl,
        activePresetMenuId,
        colorAdjustments,
        lightAdjustments,
        detailsAdjustments,
        handleWheelZoom,
        handleZoomAction,
        zoomLevelText,
        presets,
        // Functions
        handleScriptReady,
        handleAlertClose,
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
        // Bulk Adjustment Handlers
        // Note: These handlers are for image list
        // Note: These handlers are for bulk adjustments
        // Adjustment Colors
        // handleBulkTempDecreaseMax,
        // handleBulkTempDecrease,
        // handleBulkTempIncrease,
        // handleBulkTempIncreaseMax,
        // handleBulkTintDecreaseMax,
        // handleBulkTintDecrease,
        // handleBulkTintIncrease,
        // handleBulkTintIncreaseMax,
        // handleBulkVibranceDecreaseMax,
        // handleBulkVibranceDecrease,
        // handleBulkVibranceIncrease,
        // handleBulkVibranceIncreaseMax,
        // handleBulkSaturationDecreaseMax,
        // handleBulkSaturationDecrease,
        // handleBulkSaturationIncrease,
        // handleBulkSaturationIncreaseMax,
        // // Adjustment Light
        // handleBulkExposureDecreaseMax,
        // handleBulkExposureDecrease,
        // handleBulkExposureIncrease,
        // handleBulkExposureIncreaseMax,
        // handleBulkContrastDecreaseMax,
        // handleBulkContrastDecrease,
        // handleBulkContrastIncrease,
        // handleBulkContrastIncreaseMax,
        // handleBulkHighlightsDecreaseMax,
        // handleBulkHighlightsDecrease,
        // handleBulkHighlightsIncrease,
        // handleBulkHighlightsIncreaseMax,
        // handleBulkShadowsDecreaseMax,
        // handleBulkShadowsDecrease,
        // handleBulkShadowsIncrease,
        // handleBulkShadowsIncreaseMax,
        // handleBulkWhitesDecreaseMax,
        // handleBulkWhitesDecrease,
        // handleBulkWhitesIncrease,
        // handleBulkWhitesIncreaseMax,
        // handleBulkBlacksDecreaseMax,
        // handleBulkBlacksDecrease,
        // handleBulkBlacksIncrease,
        // handleBulkBlacksIncreaseMax,
        // // Adjustment Details
        // handleBulkClarityDecreaseMax,
        // handleBulkClarityDecrease,
        // handleBulkClarityIncrease,
        // handleBulkClarityIncreaseMax,
        // handleBulkSharpnessDecreaseMax,
        // handleBulkSharpnessDecrease,
        // handleBulkSharpnessIncrease,
        // handleBulkSharpnessIncreaseMax,
    };
}
