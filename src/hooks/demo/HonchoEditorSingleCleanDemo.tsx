import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    Alert,
    CircularProgress,
    Paper,
    Divider,
    TextField,
    Stack,
    Slider,
    Grid,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    NavigateBefore,
    NavigateNext,
    Undo,
    Redo,
    RestartAlt,
    ZoomIn,
    ZoomOut,
    FitScreen,
    Home,
    Palette
} from '@mui/icons-material';
import { useHonchoEditorSingle } from '../editor/useHonchoEditorSingle';
import { useEditorHeadless } from '../../lib/hooks/useEditorHeadless';
import { Controller, AdjustmentState, Preset } from '../editor/type';
import { Gallery, CreateEditorTaskRequest } from '../editor/type';
import { ImageSize } from '../../lib/editor/honcho-editor';

// Mock data and controller (same as before)
// Mock data for demonstration
const createMockGallery = (id: string, adjustments?: Partial<AdjustmentState>): Gallery => ({
    id,
    uid: 'demo-user',
    event_id: 'demo-event',
    download: {
        key: `${id}-download`,
        path: `https://picsum.photos/800/600?random=${id}`,
        size: 1024000,
        width: 800,
        height: 600,
    },
    download_edited: {
        key: `${id}-download-edited`,
        path: `https://picsum.photos/800/600?random=${id}`,
        size: 1024000,
        width: 800,
        height: 600,
    },
    thumbnail: {
        key: `${id}-thumb`,
        path: `https://picsum.photos/300/200?random=${id}`,
        size: 50000,
        width: 300,
        height: 200,
    },
    thumbnail_edited: {
        key: `${id}-thumb-edited`,
        path: `https://picsum.photos/300/200?random=${id}`,
        size: 50000,
        width: 300,
        height: 200,
    },
    is_original: true,
    available: true,
    show_gallery: true,
    editor_config: {
        color_adjustment: {
            temperature: adjustments?.tempScore || 0,
            tint: adjustments?.tintScore || 0,
            vibrance: adjustments?.vibranceScore || 0,
            saturation: adjustments?.saturationScore || 0,
            exposure: adjustments?.exposureScore || 0,
            highlights: adjustments?.highlightsScore || 0,
            shadows: adjustments?.shadowsScore || 0,
            whites: adjustments?.whitesScore || 0,
            blacks: adjustments?.blacksScore || 0,
            contrast: adjustments?.contrastScore || 0,
            clarity: adjustments?.clarityScore || 0,
            sharpness: adjustments?.sharpnessScore || 0,
        },
        transformation_adjustment: [],
        watermarks: [],
    },
    log: {
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
});

const createMockController = (): Controller => {
    console.log('🏭 createMockController() called - Creating new mock controller instance');
    
    const mockImages = [
        createMockGallery('1', { tempScore: 5, exposureScore: 2 }),
        createMockGallery('2', { contrastScore: -3, clarityScore: 8 }),
        createMockGallery('3', { vibranceScore: 10, saturationScore: 5 }),
        createMockGallery('4', { tempScore: -8, tintScore: 4 }),
        createMockGallery('5', { exposureScore: -5, shadowsScore: 15 }),
    ];

    return {
        onGetImage: async (uid: string, imageId: string) => {
            console.log(`[Controller] 📷 onGetImage called: uid=${uid}, imageId=${imageId}`);
            await new Promise(resolve => setTimeout(resolve, 300));
            const image = mockImages.find(img => img.id === imageId);
            if (!image) throw new Error(`Image ${imageId} not found`);
            console.log(`[Controller] 📷 onGetImage returning image:`, image.id);
            return image;
        },
        getImageList: async (uid: string, eventId: string, page: number) => {
            console.log(`[Controller] 📋 getImageList called: uid=${uid}, eventId=${eventId}, page=${page}`);
            await new Promise(resolve => setTimeout(resolve, 500));
            const pageSize = 4;
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const pageImages = mockImages.slice(startIndex, endIndex);
            console.log(`[Controller] 📋 getImageList returning ${pageImages.length} images for page ${page}`);
            return {
                gallery: pageImages,
                limit: pageSize,
                current_page: page,
                prev_page: page > 1 ? page - 1 : 0,
                next_page: endIndex < mockImages.length ? page + 1 : 0,
                sum_of_image: pageImages.length,
            };
        },
        syncConfig: async (uid: string) => { 
            console.log(`[Controller] 🔄 syncConfig called: uid=${uid}`);
            await new Promise(resolve => setTimeout(resolve, 200)); 
        },
        handleBack: (uid: string, imageId: string) => { 
            console.log(`[Controller] ⬅️ handleBack called: uid=${uid}, imageId=${imageId}`);
            console.log(`Back to gallery from image: ${imageId}`); 
        },
        getPresets: async (uid: string) => {
            console.log(`[Controller] 🎨 getPresets called: uid=${uid}`);
            await new Promise(resolve => setTimeout(resolve, 300));
            const presets = [
                { id: '1', name: 'Warm Sunset', is_default: false, temperature: 15, tint: 5, saturation: 8, vibrance: 12, exposure: 2, contrast: 5, highlights: -10, shadows: 8, whites: 3, blacks: -5, clarity: 4, sharpness: 6 },
                { id: '2', name: 'Cool Morning', is_default: false, temperature: -12, tint: -3, saturation: -2, vibrance: 5, exposure: 1, contrast: 3, highlights: -5, shadows: 12, whites: 8, blacks: -8, clarity: 6, sharpness: 4 },
                { id: '3', name: 'High Contrast', is_default: false, temperature: 0, tint: 0, saturation: 5, vibrance: 8, exposure: 0, contrast: 20, highlights: -15, shadows: 15, whites: 10, blacks: -10, clarity: 15, sharpness: 8 },
            ];
            console.log(`🎨 getPresets returning ${presets.length} presets`);
            return presets;
        },
        createPreset: async (uid: string, name: string, settings: AdjustmentState) => {
            console.log(`[Controller] ➕ createPreset called: uid=${uid}, name=${name}`, settings);
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log(`Creating preset: ${name}`, settings);
        },
        deletePreset: async (uid: string, presetId: string) => {
            console.log(`[Controller] 🗑️ deletePreset called: uid=${uid}, presetId=${presetId}`);
            await new Promise(resolve => setTimeout(resolve, 300));
            console.log(`Deleting preset: ${presetId}`);
        },
        updatePreset: async (uid: string, data: Preset) => {
            console.log(`[Controller] 🔄 updatePreset called: uid=${uid}`, data);
            await new Promise(resolve => setTimeout(resolve, 300));
            console.log(`Updating preset:`, data);
        },
        createEditorConfig: async (uid: string, payload: CreateEditorTaskRequest) => {
            console.log(`[Controller] ⚙️ createEditorConfig called: uid=${uid}`, payload);
            await new Promise(resolve => setTimeout(resolve, 200));
            console.log('Creating editor config:', payload);
        },
        getEditorHistory: async (uid: string, imageId: string) => {
            console.log(`[Controller] 📚 getEditorHistory called: uid=${uid}, imageId=${imageId}`);
            await new Promise(resolve => setTimeout(resolve, 200));
            return { current_task_id: "", history: [] };
        },
        getGalleryUpdateTimestamp: async (uid: string, eventId: string) => {
            console.log(`[Controller] ⏰ getGalleryUpdateTimestamp called: uid=${uid}, eventId=${eventId}`);
            await new Promise(resolve => setTimeout(resolve, 100));
            return { gallery: [] };
        },
        setHistoryIndex: async (uid: string, imageId: string, taskId: string) => {
            console.log(`[Controller] 📍 setHistoryIndex called: uid=${uid}, imageId=${imageId}, taskId=${taskId}`);
            await new Promise(resolve => setTimeout(resolve, 100));
            console.log(`Setting history index for image ${imageId} to task ${taskId}`);
        },
    };
};

// Dumb Adjustment Slider Component
const AdjustmentSlider: React.FC<{
    label: string;
    value: number;
    field: keyof AdjustmentState;
    onValueChange: (field: keyof AdjustmentState, value: number) => void;
    onDragStart: () => void;
    onDragEnd: () => void;
    isBatchMode: boolean;
    min?: number;
    max?: number;
    step?: number;
}> = ({ 
    label, 
    value, 
    field, 
    onValueChange, 
    onDragStart,
    onDragEnd,
    isBatchMode,
    min = -100, 
    max = 100, 
    step = 1 
}) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
                {label}: {value}
                {isBatchMode && (
                    <Box 
                        component="span" 
                        sx={{ 
                            ml: 1, 
                            px: 1, 
                            py: 0.25, 
                            backgroundColor: 'warning.main', 
                            color: 'warning.contrastText', 
                            borderRadius: 1, 
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                        }}
                    >
                        LIVE EDIT
                    </Box>
                )}
            </Typography>
            <Slider
                value={value}
                onChange={(_, newValue) => {
                    const numValue = newValue as number;
                    onValueChange(field, numValue);
                }}
                onMouseDown={() => {
                    if (!isBatchMode) {
                        onDragStart();
                    }
                }}
                onMouseUp={() => {
                    onDragEnd();
                }}
                onTouchStart={() => {
                    if (!isBatchMode) {
                        onDragStart();
                    }
                }}
                onTouchEnd={() => {
                    onDragEnd();
                }}
                min={min}
                max={max}
                step={step}
                valueLabelDisplay="auto"
                size="small"
            />
        </Box>
    );
};

// Dumb Preset Card Component
const PresetCard: React.FC<{
    preset: Preset;
    onApply: (preset: Preset) => void;
    onDelete: (presetId: string) => void;
    isActive: boolean;
}> = ({ preset, onApply, onDelete, isActive }) => (
    <Card
        sx={{
            border: isActive ? 2 : 1,
            borderColor: isActive ? 'primary.main' : 'divider',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
                boxShadow: 2,
                transform: 'translateY(-1px)',
            }
        }}
        onClick={() => onApply(preset)}
    >
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="subtitle2" gutterBottom>
                {preset.name}
                {isActive && ' ✓'}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                Temp: {preset.temperature > 0 ? '+' : ''}{preset.temperature},
                Exp: {preset.exposure > 0 ? '+' : ''}{preset.exposure},
                Con: {preset.contrast > 0 ? '+' : ''}{preset.contrast}
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                        e.stopPropagation();
                        onApply(preset);
                    }}
                >
                    Apply
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(preset.id);
                    }}
                >
                    Delete
                </Button>
            </Box>
        </CardContent>
    </Card>
);

export const HonchoEditorSingleCleanDemo: React.FC = () => {
    // Initialize mock controller
    const [controller] = useState(() => createMockController());
    
    // UI state (only UI-specific state here)
    const [showAdjustments, setShowAdjustments] = useState(true);
    const [newPresetName, setNewPresetName] = useState('');
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    
    // Business logic hook - handles adjustments, presets, navigation
    const { state, actions } = useHonchoEditorSingle({
        controller,
        initImageId: '1',
        firebaseUid: 'demo-user'
    });
    
    // Editor hook - handles editor operations separately
    const editorHeadless = useEditorHeadless({
        scriptUrl: '/honcho-photo-editor.js',
        wasmUrl: '/honcho-photo-editor.wasm'
    });
    
    // Refs for canvas rendering
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // Load image when gallery data changes
    useEffect(() => {
        if (state.currentImageData && editorHeadless.isReady && editorHeadless.loadImageFromUrl) {
            console.log('Loading image to editor:', state.currentImageData.id);
            
            setIsImageLoaded(false);
            
            const imageUrl = state.currentImageData.raw_edited?.path || state.currentImageData.download.path;
            
            editorHeadless.loadImageFromUrl(imageUrl)
                .then((size: ImageSize) => {
                    console.log('Image loaded successfully:', size);
                    setIsImageLoaded(true);
                })
                .catch((error: Error) => {
                    console.error('Error loading image:', error);
                    setIsImageLoaded(false);
                });
        }
    }, [state.currentImageData, editorHeadless.isReady, editorHeadless.loadImageFromUrl]);
    
    // Apply adjustments to editor when they change
    useEffect(() => {
        if (editorHeadless.editor && isImageLoaded && canvasRef.current) {
            console.log('Applying adjustments to editor:', state.currentAdjustments);
            
            // Get converted adjustments from business logic hook
            const editorAdjustments = actions.getEditorAdjustments();

            try {
                editorHeadless.editor.setAdjustments(editorAdjustments);
                editorHeadless.editor.processImage();
                editorHeadless.editor.renderToCanvas(canvasRef.current);
                console.log('Rendered to canvas successfully');
            } catch (error) {
                console.error('Error rendering to canvas:', error);
            }
        }
    }, [state.currentAdjustments, editorHeadless.editor, isImageLoaded, actions]);
    
    // Helper functions that only handle UI logic
    const handleCreatePreset = async () => {
        if (!newPresetName.trim()) return;
        
        try {
            const preset = await actions.createPreset(newPresetName);
            if (preset) {
                setNewPresetName('');
                console.log('Preset created successfully:', preset);
            } else {
                console.error('Failed to create preset');
            }
        } catch (error) {
            console.error('Error creating preset:', error);
        }
    };

    const navigationNext = useCallback(() => {
        // Must be set to avoid adjust without image
        setIsImageLoaded(false);
        actions.navigateNext();
    }, [actions]);

    const navigationPrev = useCallback(() => {
        // Must be set to avoid adjust without image
        setIsImageLoaded(false);
        actions.navigatePrev();
    }, [actions]);
    
    const getAdjustmentSummary = (adjustments: AdjustmentState) => {
        const summary = [];
        if (adjustments.tempScore !== 0) summary.push(`Temp: ${adjustments.tempScore > 0 ? '+' : ''}${adjustments.tempScore}`);
        if (adjustments.exposureScore !== 0) summary.push(`Exp: ${adjustments.exposureScore > 0 ? '+' : ''}${adjustments.exposureScore}`);
        if (adjustments.contrastScore !== 0) summary.push(`Con: ${adjustments.contrastScore > 0 ? '+' : ''}${adjustments.contrastScore}`);
        if (adjustments.clarityScore !== 0) summary.push(`Cla: ${adjustments.clarityScore > 0 ? '+' : ''}${adjustments.clarityScore}`);
        return summary.join(', ') || 'No adjustments';
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h3" gutterBottom align="center">
                Clean Honcho Editor Single Image Demo
            </Typography>

            <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
                This is a "dumb" view-only component that consumes state from useHonchoEditorSingle
            </Typography>

            {(state.galleryError || state.presetsError) && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {state.galleryError || state.presetsError}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Main Image Area */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2, mb: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h6">
                                Image {state.currentImageData?.id}
                                {state.activePreset && ` - ${state.activePreset.name}`}
                            </Typography>
                            
                            <Stack direction="row" spacing={1}>
                                <Tooltip title="Previous Image">
                                    <span>
                                        <IconButton
                                            onClick={navigationPrev}
                                            disabled={!state.isPrevAvailable || state.isGalleryLoading}
                                        >
                                            <NavigateBefore />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                
                                <Tooltip title="Next Image">
                                    <span>
                                        <IconButton
                                            onClick={navigationNext}
                                            disabled={!state.isNextAvailable || state.isGalleryLoading}
                                        >
                                            <NavigateNext />
                                        </IconButton>
                                    </span>
                                </Tooltip>

                                <Tooltip title="Back to Gallery">
                                    <IconButton onClick={() => console.log('Back to gallery')}>
                                        <Home />
                                    </IconButton>
                                </Tooltip>

                                <Divider orientation="vertical" flexItem />

                                <Tooltip title="Zoom In">
                                    <IconButton onClick={() => console.log('Zoom in')}>
                                        <ZoomIn />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Zoom Out">
                                    <IconButton onClick={() => console.log('Zoom out')}>
                                        <ZoomOut />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Fit to Screen">
                                    <IconButton onClick={() => console.log('Fit to screen')}>
                                        <FitScreen />
                                    </IconButton>
                                </Tooltip>

                                <Typography variant="body2" sx={{ alignSelf: 'center', minWidth: '60px' }}>
                                    100%
                                </Typography>
                            </Stack>
                        </Stack>

                        {/* Canvas Container */}
                        <Box 
                            sx={{ 
                                position: 'relative',
                                width: '100%',
                                height: '500px',
                                bgcolor: '#f5f5f5',
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {/* Status indicator */}
                            {editorHeadless.isReady && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        zIndex: 3,
                                        px: 1,
                                        py: 0.5,
                                        backgroundColor: 'success.main',
                                        color: 'success.contrastText',
                                        borderRadius: 1,
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    EDITOR ACTIVE
                                </Box>
                            )}

                            {state.currentImageData ? (
                                <CardMedia
                                    component="img"
                                    image={state.currentImageData.download.path}
                                    alt={`Image ${state.currentImageData.id}`}
                                    sx={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        transition: 'transform 0.1s ease-out',
                                        opacity: editorHeadless.isReady ? 0.3 : 1,
                                        zIndex: 1
                                    }}
                                />
                            ) : state.isGalleryLoading ? (
                                <CircularProgress />
                            ) : (
                                <Typography color="text.secondary">No image loaded</Typography>
                            )}
                            
                            {/* Editor Canvas */}
                            <canvas
                                ref={canvasRef}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    pointerEvents: 'none',
                                    zIndex: state.currentImageData && editorHeadless.isReady ? 2 : 0,
                                    opacity: state.currentImageData && editorHeadless.isReady ? 1 : 0,
                                }}
                            />
                        </Box>

                        {/* History Controls */}
                        <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
                            <Tooltip title="Undo">
                                <span>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={actions.undo}
                                        disabled={!state.canUndo}
                                        startIcon={<Undo />}
                                    >
                                        Undo
                                    </Button>
                                </span>
                            </Tooltip>
                            
                            <Tooltip title="Redo">
                                <span>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={actions.redo}
                                        disabled={!state.canRedo}
                                        startIcon={<Redo />}
                                    >
                                        Redo
                                    </Button>
                                </span>
                            </Tooltip>

                            <Tooltip title="Reset All">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={actions.reset}
                                    color="warning"
                                    startIcon={<RestartAlt />}
                                >
                                    Reset
                                </Button>
                            </Tooltip>
                        </Stack>

                        {/* Current Adjustments Summary */}
                        <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                                Current Adjustments: {getAdjustmentSummary(state.currentAdjustments)}
                                {state.isBatchMode && (
                                    <Box 
                                        component="span" 
                                        sx={{ 
                                            ml: 1, 
                                            px: 1, 
                                            py: 0.25, 
                                            backgroundColor: 'warning.main', 
                                            color: 'warning.contrastText', 
                                            borderRadius: 1, 
                                            fontSize: '0.625rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        BATCH MODE
                                    </Box>
                                )}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Controls Panel */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, mb: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h6">Controls</Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => setShowAdjustments(!showAdjustments)}
                                startIcon={<Palette />}
                            >
                                {showAdjustments ? 'Hide' : 'Show'} Adjustments
                            </Button>
                        </Stack>

                        {showAdjustments && (
                            <>
                                {/* Color Adjustments */}
                                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                                    Color
                                </Typography>
                                <AdjustmentSlider
                                    label="Temperature"
                                    value={state.currentAdjustments.tempScore}
                                    field="tempScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Tint"
                                    value={state.currentAdjustments.tintScore}
                                    field="tintScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Vibrance"
                                    value={state.currentAdjustments.vibranceScore}
                                    field="vibranceScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Saturation"
                                    value={state.currentAdjustments.saturationScore}
                                    field="saturationScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />

                                <Divider sx={{ my: 2 }} />

                                {/* Light Adjustments */}
                                <Typography variant="subtitle2" gutterBottom>
                                    Light
                                </Typography>
                                <AdjustmentSlider
                                    label="Exposure"
                                    value={state.currentAdjustments.exposureScore}
                                    field="exposureScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Contrast"
                                    value={state.currentAdjustments.contrastScore}
                                    field="contrastScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Highlights"
                                    value={state.currentAdjustments.highlightsScore}
                                    field="highlightsScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Shadows"
                                    value={state.currentAdjustments.shadowsScore}
                                    field="shadowsScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Whites"
                                    value={state.currentAdjustments.whitesScore}
                                    field="whitesScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Blacks"
                                    value={state.currentAdjustments.blacksScore}
                                    field="blacksScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />

                                <Divider sx={{ my: 2 }} />

                                {/* Detail Adjustments */}
                                <Typography variant="subtitle2" gutterBottom>
                                    Details
                                </Typography>
                                <AdjustmentSlider
                                    label="Clarity"
                                    value={state.currentAdjustments.clarityScore}
                                    field="clarityScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Sharpness"
                                    value={state.currentAdjustments.sharpnessScore}
                                    field="sharpnessScore"
                                    onValueChange={actions.updateAdjustment}
                                    onDragStart={actions.startBatchMode}
                                    onDragEnd={actions.endBatchMode}
                                    isBatchMode={state.isBatchMode}
                                />
                            </>
                        )}
                    </Paper>

                    {/* Presets Panel */}
                    <Paper sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h6">
                                Presets ({state.presets.length})
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={actions.loadPresets}
                                disabled={state.presetsLoading}
                            >
                                Refresh
                            </Button>
                        </Stack>

                        {state.presetsError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {state.presetsError}
                            </Alert>
                        )}

                        {state.presetsLoading && (
                            <Box display="flex" justifyContent="center" py={2}>
                                <CircularProgress size={20} />
                            </Box>
                        )}

                        {/* Quick Preset Actions */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Quick Actions
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                <Button
                                    size="small"
                                    variant={!state.activePreset ? "contained" : "outlined"}
                                    onClick={actions.reset}
                                >
                                    Reset All
                                </Button>
                                {state.activePreset && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="info"
                                        disabled
                                    >
                                        Active: {state.activePreset.name}
                                    </Button>
                                )}
                            </Stack>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Stack spacing={1} sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {state.presets.length === 0 && !state.presetsLoading ? (
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                                    No presets available. Create your first preset below!
                                </Typography>
                            ) : (
                                state.presets.map((preset) => (
                                    <PresetCard
                                        key={preset.id}
                                        preset={preset}
                                        onApply={actions.applyPreset}
                                        onDelete={actions.deletePreset}
                                        isActive={state.activePreset?.id === preset.id}
                                    />
                                ))
                            )}
                        </Stack>

                        {/* Create New Preset */}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" gutterBottom>
                            Create New Preset
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                            Save current adjustments as a new preset
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                placeholder="Enter preset name..."
                                value={newPresetName}
                                onChange={(e) => setNewPresetName(e.target.value)}
                                size="small"
                                fullWidth
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleCreatePreset();
                                    }
                                }}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleCreatePreset}
                                disabled={!newPresetName.trim() || state.presetsLoading}
                            >
                                Create
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            {/* Debug Information */}
            <Box mt={4}>
                <Divider />
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                    Clean Architecture Demo: This component is "dumb" and only renders UI. 
                    All logic is handled by useHonchoEditorSingle hook.
                </Typography>
                
                <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="caption" display="block">
                        <strong>Debug Info:</strong><br />
                        Current Image: {state.currentImageData?.id} | 
                        Gallery Loading: {state.isGalleryLoading ? 'Yes' : 'No'} | 
                        Image Loaded: {isImageLoaded ? 'Yes' : 'No'} | 
                        Next Available: {state.isNextAvailable ? 'Yes' : 'No'} | 
                        Prev Available: {state.isPrevAvailable ? 'Yes' : 'No'} | 
                        Active Preset: {state.activePreset?.name || 'None'} | 
                        Can Undo: {state.canUndo ? 'Yes' : 'No'} | 
                        Can Redo: {state.canRedo ? 'Yes' : 'No'} |
                        Batch Mode: {state.isBatchMode ? 'Yes' : 'No'} |
                        Editor Ready: {editorHeadless.isReady ? 'Yes' : 'No'}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default HonchoEditorSingleCleanDemo;
