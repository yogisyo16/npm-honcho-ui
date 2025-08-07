'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo, Suspense } from "react";
import { Box, Stack, CircularProgress, Typography, Checkbox, Paper } from "@mui/material";
import useColors from '../../themes/colors';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'; // Magic Wand Icon
import Script from "next/script";
import useIsMobile from "../../utils/isMobile";
// Components
import HHeaderEditor from "./HHeaderEditor";
import HAccordionColorAdjustment from "./HAccordionColorAdjustment";
import HAccordionPreset from "./HAccordionPreset";
import { HBaseDialog } from "./HDialogBox";
import { HDialogCopy, HDialogPreset } from "./HDialogCopy";
import HImageEditorMobile from "./HImageEditorMobile";
import HImageEditorDesktop from "./HImageEditorDekstop";
import HImageEditorBulkDekstop from "./HImageEditorBulkDekstop";
import HImageEditorBulkMobile from "./HImageEditorBulkMobile";
import HBulkAccordionColorAdjustment from "./HBulkAccordionColorAdjustment";
import HBulkPreset from "./HBulkPreset";
import HModalEditorDekstop from "./HModalEditorDekstop";
import HFooter from "./HFooter";
import { HTextField } from "./HTextField";
import HWatermarkView from "./HWatermarkView";
import HModalMobile from "./HModalMobile";
import HPresetOptionsMenu from "./HPresetOptionMenu";
import { HAlertInternetBox, HAlertCopyBox, HAlertInternetConnectionBox } from "./HAlertBox";
// Hooks
import { useHonchoEditor } from "../../hooks/editor/useHonchoEditor";
const initialAdjustments = {
    tempScore: 0, tintScore: 0, vibranceScore: 0, exposureScore: 0, highlightsScore: 0, shadowsScore: 0,
    whitesScore: 0, blacksScore: 0, saturationScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
};
// Helper to check if an image has any edits
const hasAdjustments = (state) => {
    if (!state)
        return false;
    return Object.values(state).some(value => value !== 0);
};
function HImageEditorClient() {
    const localController = useMemo(() => ({
        /**
         * The handleBack logic is now defined directly inside the page component.
         */
        handleBack: function () {
            if (window.webkit?.messageHandlers?.nativeHandler) {
                window.webkit.messageHandlers.nativeHandler.postMessage("back");
                console.log("Sent 'back' message to iOS native handler.");
            }
            else if (window.Android?.goBack) {
                console.log("Android environment detected. Calling goBack().");
                window.Android.goBack();
            }
            else {
                console.log("Standard web browser detected. Navigating back in history.");
                window.history.back();
            }
        },
        // --- Provide placeholder implementations for other required methods ---
        // These are necessary to satisfy the Controller interface contract.
        onGetImage: async (imageID) => {
            console.log("onGetImage called with:", imageID);
            // Return a placeholder or the actual web implementation
            const imageUrl = `https://d2cxumz3vt1s04.cloudfront.net/staging/gallery-photo/67ee6b55b8e4273707f68978/preview/${imageID}.jpeg`;
            return imageUrl;
        },
        getImageList: async () => { return []; },
        syncConfig: async () => { },
        getPresets: async () => { return []; },
        createPreset: async () => { return null; },
        deletePreset: async () => { },
        renamePreset: async () => { },
    }), []);
    const editor = useHonchoEditor(localController);
    const isMobile = useIsMobile();
    const colors = useColors();
    const [displayedToken, setDisplayedToken] = useState(null);
    const [displayedImageId, setDisplayedImageId] = useState(null);
    // Dummy/placeholder handlers that remain in the component
    const handleScale = (event) => editor.setAnchorMenuZoom(event.currentTarget);
    const handleBeforeAfter = () => console.log("Before/After toggled!");
    // const handleZoomMenuClose = () => editor.setAnchorMenuZoom(null);
    // const handleZoomAction = (level: string) => { console.log(`Zoom: ${level}`); handleZoomMenuClose(); };
    const renderActivePanelBulk = () => {
        // MARK: Dekstop Bulk Editor panels
        switch (editor.activePanel) {
            case 'colorAdjustment':
                return (_jsx(HBulkAccordionColorAdjustment
                // Adjustments Colors
                , { 
                    // Adjustments Colors
                    onTempDecreaseMax: editor.handleBulkTempDecreaseMax, onTempDecrease: editor.handleBulkTempDecrease, onTempIncrease: editor.handleBulkTempIncrease, onTempIncreaseMax: editor.handleBulkTempIncreaseMax, onTintDecreaseMax: editor.handleBulkTintDecreaseMax, onTintDecrease: editor.handleBulkTintDecrease, onTintIncrease: editor.handleBulkTintIncrease, onTintIncreaseMax: editor.handleBulkTintIncreaseMax, onVibranceDecreaseMax: editor.handleBulkVibranceDecreaseMax, onVibranceDecrease: editor.handleBulkVibranceDecrease, onVibranceIncrease: editor.handleBulkVibranceIncrease, onVibranceIncreaseMax: editor.handleBulkVibranceIncreaseMax, onSaturationDecreaseMax: editor.handleBulkSaturationDecreaseMax, onSaturationDecrease: editor.handleBulkSaturationDecrease, onSaturationIncrease: editor.handleBulkSaturationIncrease, onSaturationIncreaseMax: editor.handleBulkSaturationIncreaseMax, 
                    // Adjustments Light
                    onExposureDecreaseMax: editor.handleBulkExposureDecreaseMax, onExposureDecrease: editor.handleBulkExposureDecrease, onExposureIncrease: editor.handleBulkExposureIncrease, onExposureIncreaseMax: editor.handleBulkExposureIncreaseMax, onContrastDecreaseMax: editor.handleBulkContrastDecreaseMax, onContrastDecrease: editor.handleBulkContrastDecrease, onContrastIncrease: editor.handleBulkContrastIncrease, onContrastIncreaseMax: editor.handleBulkContrastIncreaseMax, onHighlightsDecreaseMax: editor.handleBulkHighlightsDecreaseMax, onHighlightsDecrease: editor.handleBulkHighlightsDecrease, onHighlightsIncrease: editor.handleBulkHighlightsIncrease, onHighlightsIncreaseMax: editor.handleBulkHighlightsIncreaseMax, onShadowsDecreaseMax: editor.handleBulkShadowsDecreaseMax, onShadowsDecrease: editor.handleBulkShadowsDecrease, onShadowsIncrease: editor.handleBulkShadowsIncrease, onShadowsIncreaseMax: editor.handleBulkShadowsIncreaseMax, onWhitesDecreaseMax: editor.handleBulkWhitesDecreaseMax, onWhitesDecrease: editor.handleBulkWhitesDecrease, onWhitesIncrease: editor.handleBulkWhitesIncrease, onWhitesIncreaseMax: editor.handleBulkWhitesIncreaseMax, onBlacksDecreaseMax: editor.handleBulkBlacksDecreaseMax, onBlacksDecrease: editor.handleBulkBlacksDecrease, onBlacksIncrease: editor.handleBulkBlacksIncrease, onBlacksIncreaseMax: editor.handleBulkBlacksIncreaseMax, 
                    // Adjustments Details
                    onClarityDecreaseMax: editor.handleBulkClarityDecreaseMax, onClarityDecrease: editor.handleBulkClarityDecrease, onClarityIncrease: editor.handleBulkClarityIncrease, onClarityIncreaseMax: editor.handleBulkClarityIncreaseMax, onSharpnessDecreaseMax: editor.handleBulkSharpnessDecreaseMax, onSharpnessDecrease: editor.handleBulkSharpnessDecrease, onSharpnessIncrease: editor.handleBulkSharpnessIncrease, onSharpnessIncreaseMax: editor.handleBulkSharpnessIncreaseMax, 
                    // Panels Management
                    expandedPanels: editor.colorAdjustmentExpandedPanels, onPanelChange: editor.handleColorAccordionChange }));
            case 'preset':
                return (_jsx(HBulkPreset, { presets: editor.presets, selectedPreset: editor.selectedBulkPreset, onSelectPreset: editor.handleSelectBulkPreset, expandedPanels: editor.presetExpandedPanels, onPanelChange: editor.handlePresetAccordionChange, presetMenuAnchorEl: editor.presetMenuAnchorEl, activePresetMenuId: editor.activePresetMenuId, isMenuOpen: Boolean(editor.presetMenuAnchorEl), onPresetMenuClick: editor.handlePresetMenuClick, onPresetMenuClose: editor.handlePresetMenuClose, onRemovePreset: editor.handleRemovePreset, onRenamePreset: editor.handleOpenRenameModal, onDeletePreset: editor.handleDeletePreset, onOpenPresetModal: editor.handleOpenPresetModal }));
            default: return null;
        }
    };
    const renderActivePanel = () => {
        // MARK: Dekstop Editor panels
        switch (editor.activePanel) {
            case 'colorAdjustment':
                return (_jsx(HAccordionColorAdjustment, { tempScore: editor.tempScore, setTempScore: editor.setTempScore, tintScore: editor.tintScore, setTintScore: editor.setTintScore, vibranceScore: editor.vibranceScore, setVibranceScore: editor.setVibranceScore, saturationScore: editor.saturationScore, setSaturationScore: editor.setSaturationScore, exposureScore: editor.exposureScore, setExposureScore: editor.setExposureScore, HighlightsScore: editor.highlightsScore, setHighlightsScore: editor.setHighlightsScore, shadowsScore: editor.shadowsScore, setShadowsScore: editor.setShadowsScore, whitesScore: editor.whitesScore, setWhitesScore: editor.setWhitesScore, blacksScore: editor.blacksScore, setBlacksScore: editor.setBlacksScore, contrastScore: editor.contrastScore, setContrastScore: editor.setContrastScore, clarityScore: editor.clarityScore, setClarityScore: editor.setClarityScore, sharpnessScore: editor.sharpnessScore, setSharpnessScore: editor.setSharpnessScore, expandedPanels: editor.colorAdjustmentExpandedPanels, onPanelChange: editor.handleColorAccordionChange }));
            case 'preset':
                return (_jsx(HAccordionPreset, { presets: editor.presets, expandedPanels: editor.presetExpandedPanels, onChange: editor.handlePresetAccordionChange, onOpenPresetModal: editor.handleOpenPresetModal, onOpenWatermarkView: editor.handleOpenWatermarkView, selectedPreset: editor.selectedDesktopPreset, onSelectPreset: editor.handleSelectDesktopPreset, presetMenuAnchorEl: editor.presetMenuAnchorEl, onPresetMenuClick: editor.handlePresetMenuClick, onPresetMenuClose: editor.handlePresetMenuClose, activePresetMenuId: editor.activePresetMenuId, onRemovePreset: editor.handleRemovePreset, onRenamePreset: editor.handleOpenRenameModal, onDeletePreset: editor.handleDeletePreset }));
            default: return null;
        }
    };
    if (editor.isCreatingWatermark) {
        return (_jsx(HWatermarkView, { onSaveWatermark: editor.handleSaveWatermark, onCancelWatermark: editor.handleCancelWatermark }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Script, { src: "/honcho-photo-editor.js", strategy: "lazyOnload", onReady: () => {
                    editor.handleScriptReady();
                } }), _jsxs(Stack, { direction: "column", justifyContent: "center", sx: { width: '100%', height: isMobile ? '100%' : '100vh', background: 'black', pl: isMobile ? 0 : "24px", pr: isMobile ? 0 : "0px" }, children: [editor.isConnectionSlow && _jsx(HAlertInternetConnectionBox, { onClose: editor.handleAlertClose }), !editor.isOnline && _jsx(HAlertInternetBox, {}), editor.isPresetCreated && !isMobile && _jsx(HAlertInternetBox, {}), editor.showCopyAlert && _jsx(HAlertCopyBox, {}), displayedToken && (_jsx(Box, { sx: { p: 1, mx: 2, backgroundColor: 'grey.900', borderRadius: 1, mt: 1 }, children: _jsxs(Typography, { variant: "caption", sx: { color: 'lime', fontFamily: 'monospace', wordBreak: 'break-all' }, children: [_jsx("strong", { children: "Token Received:" }), " ", displayedToken] }) })), displayedImageId && (_jsx(Box, { sx: { p: 1, mx: 2, backgroundColor: 'grey.900', borderRadius: 1, mt: 1 }, children: _jsxs(Typography, { variant: "caption", sx: { color: 'white', fontFamily: 'monospace', wordBreak: 'break-all' }, children: [_jsx("strong", { children: "Image ID:" }), " ", displayedImageId] }) })), _jsx(HHeaderEditor, { onBack: editor.handleBack, onUndo: editor.handleUndo, onRedo: editor.handleRedo, onRevert: editor.handleRevert, onCopyEdit: editor.handleOpenCopyDialog, onPasteEdit: editor.handlePasteEdit, isPasteEnabled: editor.isPasteAvailable, anchorEl: editor.headerMenuAnchorEl, onMenuClick: editor.handleHeaderMenuClick, onMenuClose: editor.handleHeaderMenuClose, onSelectButton: editor.toggleBulkEditing, valueSelect: editor.selectedImages }), _jsxs(Stack, { direction: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "stretch", sx: { width: '100%', flexGrow: 1, overflow: 'hidden' }, children: [_jsxs(Box, { sx: {
                                    flexGrow: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center', // This will now work correctly on mobile
                                    position: 'relative',
                                    p: isMobile ? 2 : 4,
                                    minHeight: 720
                                }, children: [_jsx("input", { type: "file", ref: editor.fileInputRef, onChange: editor.handleFileChange, multiple: true, accept: "image/*", style: { display: 'none' } }), !editor.isImageLoaded ? (_jsxs(Box, { onClick: () => editor.fileInputRef.current?.click(), sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed grey', borderRadius: 2, p: 4, cursor: editor.isEditorReady ? 'pointer' : 'default', textAlign: 'center', color: 'grey.500', width: '100%', height: '300px' }, children: [!editor.isEditorReady && _jsx(CircularProgress, { color: "inherit", sx: { mb: 2 } }), _jsx(Typography, { variant: "h6", children: editor.editorStatus })] })) : (editor.isBulkEditing ? (
                                    // Responsive Image Grid for Bulk Edit
                                    _jsx(Box, { sx: {
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                            gap: 2,
                                            width: '100%',
                                            height: '100%',
                                            p: 1
                                        }, children: editor.imageList.map(image => {
                                            const imageAdjustments = editor.adjustmentsMap.get(image.id) || initialAdjustments;
                                            const isEdited = hasAdjustments(imageAdjustments);
                                            return (_jsxs(Paper, { elevation: 3, sx: {
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    aspectRatio: '1 / 1',
                                                    '& img': {
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        display: 'block',
                                                        transition: 'opacity 0.2s ease-in-out',
                                                        opacity: editor.selectedImageIds.has(image.id) ? 1 : 0.4,
                                                    }
                                                }, children: [_jsx("img", { src: image.url, alt: image.name }), _jsx(Checkbox, { checked: editor.selectedImageIds.has(image.id), onChange: () => editor.handleToggleImageSelection(image.id), sx: {
                                                            position: 'absolute', top: 4, left: 4, color: 'common.white',
                                                            '&.Mui-checked': { color: '#1976d2' },
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
                                                        } }), isEdited && (_jsx(AutoFixHighIcon, { fontSize: "small", sx: {
                                                            position: 'absolute',
                                                            bottom: 8,
                                                            right: 8,
                                                            color: 'white',
                                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                            borderRadius: '50%',
                                                            padding: '2px'
                                                        } }))] }, image.id));
                                        }) })) : (
                                    // Canvas for Single Edit
                                    _jsx("canvas", { ref: editor.canvasRef, style: { display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' } })))] }), !isMobile && !editor.isBulkEditing && (_jsx(HImageEditorDesktop, { activePanel: editor.activePanel, setActivePanel: editor.setActivePanel, onScale: handleScale, onBeforeAfter: handleBeforeAfter, isPanelOpen: !isMobile, anchorElZoom: editor.anchorMenuZoom, onZoomMenuClose: () => editor.setAnchorMenuZoom(null), onZoomAction: editor.handleZoomAction, footer: _jsx(HFooter, { anchorElZoom: editor.anchorMenuZoom, onScale: (event) => editor.setAnchorMenuZoom(event.currentTarget), onShowOriginal: editor.handleShowOriginal, onShowEdited: editor.handleShowEdited, onZoomMenuClose: () => editor.setAnchorMenuZoom(null), onZoomAction: editor.handleZoomAction, zoomLevelText: editor.zoomLevelText }), children: renderActivePanel() })), !isMobile && editor.isBulkEditing && (_jsx(HImageEditorBulkDekstop, { activePanel: editor.activePanel, setActivePanel: editor.setActivePanel, onScale: handleScale, onBeforeAfter: handleBeforeAfter, isPanelOpen: !isMobile, anchorElZoom: editor.anchorMenuZoom, onZoomMenuClose: () => editor.setAnchorMenuZoom(null), onZoomAction: editor.handleZoomAction, footer: _jsx(HFooter, { anchorElZoom: editor.anchorMenuZoom, onScale: (event) => editor.setAnchorMenuZoom(event.currentTarget), onShowOriginal: editor.handleShowOriginal, onShowEdited: editor.handleShowEdited, onZoomMenuClose: () => editor.setAnchorMenuZoom(null), onZoomAction: editor.handleZoomAction, zoomLevelText: editor.zoomLevelText }), children: renderActivePanelBulk() })), isMobile && !editor.isBulkEditing && (_jsx(HImageEditorMobile, { presets: editor.presets, contentRef: editor.contentRef, panelRef: editor.panelRef, panelHeight: editor.panelHeight, handleDragStart: editor.handleDragStart, onContentHeightChange: editor.handleContentHeightChange, activePanel: editor.activePanel, setActivePanel: (panel) => { editor.setActivePanel(panel); editor.setActiveSubPanel(''); }, activeSubPanel: editor.activeSubPanel, setActiveSubPanel: editor.setActiveSubPanel, 
                                // Color Adjustments
                                tempScore: editor.tempScore, onTempChange: editor.setTempScore, tintScore: editor.tintScore, onTintChange: editor.setTintScore, vibranceScore: editor.vibranceScore, onVibranceChange: editor.setVibranceScore, saturationScore: editor.saturationScore, onSaturationChange: editor.setSaturationScore, 
                                // Adjustments Light
                                exposureScore: editor.exposureScore, onExposureChange: editor.setExposureScore, contrastScore: editor.contrastScore, onContrastChange: editor.setContrastScore, highlightsScore: editor.highlightsScore, onHighlightsChange: editor.setHighlightsScore, shadowScore: editor.shadowsScore, onShadowsChange: editor.setShadowsScore, whiteScore: editor.whitesScore, onWhitesChange: editor.setWhitesScore, blackScore: editor.blacksScore, onBlacksChange: editor.setBlacksScore, 
                                // Adjustments Details
                                clarityScore: editor.clarityScore, onClarityChange: editor.setClarityScore, sharpnessScore: editor.sharpnessScore, onSharpnessChange: editor.setSharpnessScore, 
                                // Modal Management
                                onOpenPresetModal: editor.handleOpenPresetModalMobile, presetOptionModal: editor.handlePresetMenuClick, selectedPreset: editor.selectedMobilePreset, onSelectPreset: editor.handleSelectMobilePreset })), isMobile && editor.isBulkEditing && (_jsx(HImageEditorBulkMobile, { presets: editor.presets, contentRef: editor.contentRef, panelRef: editor.panelRef, panelHeight: editor.panelHeight, handleDragStart: editor.handleDragStart, onContentHeightChange: editor.handleContentHeightChange, activePanel: editor.activePanel, setActivePanel: (panel) => { editor.setActivePanel(panel); editor.setActiveSubPanel(''); }, activeSubPanel: editor.activeSubPanel, setActiveSubPanel: editor.setActiveSubPanel, 
                                // Color Adjustments
                                onTempDecreaseMax: editor.handleBulkTempDecreaseMax, onTempDecrease: editor.handleBulkTempDecrease, onTempIncrease: editor.handleBulkTempIncrease, onTempIncreaseMax: editor.handleBulkTempIncreaseMax, onTintDecreaseMax: editor.handleBulkTintDecreaseMax, onTintDecrease: editor.handleBulkTintDecrease, onTintIncrease: editor.handleBulkTintIncrease, onTintIncreaseMax: editor.handleBulkTintIncreaseMax, onVibranceDecreaseMax: editor.handleBulkVibranceDecreaseMax, onVibranceDecrease: editor.handleBulkVibranceDecrease, onVibranceIncrease: editor.handleBulkVibranceIncrease, onVibranceIncreaseMax: editor.handleBulkVibranceIncreaseMax, onSaturationDecreaseMax: editor.handleBulkSaturationDecreaseMax, onSaturationDecrease: editor.handleBulkSaturationDecrease, onSaturationIncrease: editor.handleBulkSaturationIncrease, onSaturationIncreaseMax: editor.handleBulkSaturationIncreaseMax, 
                                // Adjustments Light
                                onExposureDecreaseMax: editor.handleBulkExposureDecreaseMax, onExposureDecrease: editor.handleBulkExposureDecrease, onExposureIncrease: editor.handleBulkExposureIncrease, onExposureIncreaseMax: editor.handleBulkExposureIncreaseMax, onContrastDecreaseMax: editor.handleBulkContrastDecreaseMax, onContrastDecrease: editor.handleBulkContrastDecrease, onContrastIncrease: editor.handleBulkContrastIncrease, onContrastIncreaseMax: editor.handleBulkContrastIncreaseMax, onHighlightsDecreaseMax: editor.handleBulkHighlightsDecreaseMax, onHighlightsDecrease: editor.handleBulkHighlightsDecrease, onHighlightsIncrease: editor.handleBulkHighlightsIncrease, onHighlightsIncreaseMax: editor.handleBulkHighlightsIncreaseMax, onShadowsDecreaseMax: editor.handleBulkShadowsDecreaseMax, onShadowsDecrease: editor.handleBulkShadowsDecrease, onShadowsIncrease: editor.handleBulkShadowsIncrease, onShadowsIncreaseMax: editor.handleBulkShadowsIncreaseMax, onWhitesDecreaseMax: editor.handleBulkWhitesDecreaseMax, onWhitesDecrease: editor.handleBulkWhitesDecrease, onWhitesIncrease: editor.handleBulkWhitesIncrease, onWhitesIncreaseMax: editor.handleBulkWhitesIncreaseMax, onBlacksDecreaseMax: editor.handleBulkBlacksDecreaseMax, onBlacksDecrease: editor.handleBulkBlacksDecrease, onBlacksIncrease: editor.handleBulkBlacksIncrease, onBlacksIncreaseMax: editor.handleBulkBlacksIncreaseMax, 
                                // Adjustments Details
                                onClarityDecreaseMax: editor.handleBulkClarityDecreaseMax, onClarityDecrease: editor.handleBulkClarityDecrease, onClarityIncrease: editor.handleBulkClarityIncrease, onClarityIncreaseMax: editor.handleBulkClarityIncreaseMax, onSharpnessDecreaseMax: editor.handleBulkSharpnessDecreaseMax, onSharpnessDecrease: editor.handleBulkSharpnessDecrease, onSharpnessIncrease: editor.handleBulkSharpnessIncrease, onSharpnessIncreaseMax: editor.handleBulkSharpnessIncreaseMax, selectedPresetBulk: editor.selectedBulkPreset, onOpenPresetModalBulk: editor.handleOpenPresetModalMobile, onSelectPresetBulk: editor.handleSelectBulkPreset, onPresetMenuClickBulk: editor.handlePresetMenuClick })), _jsx(HPresetOptionsMenu, { anchorEl: editor.presetMenuAnchorEl, isOpen: Boolean(editor.presetMenuAnchorEl), onClose: editor.handlePresetMenuClose, onRemove: editor.handleRemovePreset, onRename: editor.handleOpenRenameModal, onDelete: editor.handleDeletePreset, isPresetSelected: (editor.isBulkEditing ? editor.selectedBulkPreset : editor.selectedDesktopPreset) === editor.activePresetMenuId }), _jsx(HModalEditorDekstop, { modalName: "preset", modalOpen: editor.isPresetModalOpen, modalTitle: "Create Preset", modalInformation: "Choose settings to include in preset", action: _jsx(HDialogPreset, { colorChecks: editor.copyColorChecks, lightChecks: editor.copyLightChecks, detailsChecks: editor.copyDetailsChecks, setColorChecks: editor.setCopyColorChecks, setLightChecks: editor.setCopyLightChecks, setDetailsChecks: editor.setCopyDetailsChecks, expanded: editor.copyDialogExpanded, onParentChange: editor.handleCopyParentChange, onChildChange: editor.handleCopyChildChange, onToggleExpand: editor.handleToggleCopyDialogExpand }), modalClose: editor.handleClosePresetModal, onConfirm: editor.handleCreatePreset, children: _jsx(HTextField, { valueName: editor.presetName, setName: editor.handleNameChange }) }), _jsx(HModalMobile, { modalName: "preset", modalOpen: editor.isPresetModalOpenMobile, modalTitle: "Create Preset", modalInformation: "Create a preset with the current Light, Colour and Details settings", modalClose: editor.handleClosePresetModalMobile, onConfirm: editor.handleCreatePresetMobile, children: _jsx(HTextField, { valueName: editor.presetName, setName: editor.handleNameChange }) })] })] }), editor.isCopyDialogOpen && (_jsx(HBaseDialog, { open: editor.isCopyDialogOpen, title: "Copy Edits", onClose: editor.handleCloseCopyDialog, action: _jsx(HDialogCopy, { onCopyEdit: editor.handleConfirmCopy, colorChecks: editor.copyColorChecks, lightChecks: editor.copyLightChecks, detailsChecks: editor.copyDetailsChecks, setColorChecks: editor.setCopyColorChecks, setLightChecks: editor.setCopyLightChecks, setDetailsChecks: editor.setCopyDetailsChecks, expanded: editor.copyDialogExpanded, onParentChange: editor.handleCopyParentChange, onChildChange: editor.handleCopyChildChange, onToggleExpand: editor.handleToggleCopyDialogExpand }) }))] }));
}
export default function HImageEditorPage() {
    const colors = useColors();
    const fallbackUI = (_jsx(Stack, { sx: { width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'black' }, children: _jsx(CircularProgress, { sx: { color: colors.onSurfaceVariant } }) }));
    return (_jsx(Suspense, { fallback: fallbackUI, children: _jsx(HImageEditorClient, {}) }));
}
