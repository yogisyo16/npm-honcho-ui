import React, { useState, useMemo, useRef } from 'react';
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
    ButtonGroup,
    Paper,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Slider,
    Grid,
    IconButton,
    Tooltip,
    Fab,
    TextField
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
import { useHonchoEditor } from '../editor/useHonchoEditor';
import { Controller, AdjustmentState, Preset } from '../editor/useHonchoEditor';
import { Gallery, ResponseGalleryPaging, CreateEditorTaskRequest, GetHistoryResponse, GetGalleryUpdateTimestampResponse } from '../editor/type';
import { useAdjustmentHistory } from '../useAdjustmentHistory';
import { useGallerySwipe } from '../useGallerySwipe';
import { usePreset } from '../usePreset';

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

// Mock Controller implementation
const createMockController = (): Controller => {
    const mockImages = [
        createMockGallery('1', { tempScore: 5, exposureScore: 2 }),
        createMockGallery('2', { contrastScore: -3, clarityScore: 8 }),
        createMockGallery('3', { vibranceScore: 10, saturationScore: 5 }),
        createMockGallery('4', { tempScore: -8, tintScore: 4 }),
        createMockGallery('5', { exposureScore: -5, shadowsScore: 15 }),
        createMockGallery('6', { clarityScore: 12, sharpnessScore: 8 }),
        createMockGallery('7', { highlightsScore: -20, whitesScore: 10 }),
        createMockGallery('8', { blacksScore: -15, contrastScore: 8 }),
    ];

    return {
        onGetImage: async (uid: string, imageId: string) => {
            await new Promise(resolve => setTimeout(resolve, 300));
            const image = mockImages.find(img => img.id === imageId);
            if (!image) throw new Error(`Image ${imageId} not found`);
            return image;
        },

        getImageList: async (uid: string, eventId: string, page: number) => {
            await new Promise(resolve => setTimeout(resolve, 500));

            const pageSize = 4;
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const pageImages = mockImages.slice(startIndex, endIndex);

            return {
                gallery: pageImages,
                limit: pageSize,
                current_page: page,
                prev_page: page > 1 ? page - 1 : 0,
                next_page: endIndex < mockImages.length ? page + 1 : 0,
                sum_of_image: pageImages.length,
            } as ResponseGalleryPaging;
        },

        syncConfig: async (uid: string) => {
            await new Promise(resolve => setTimeout(resolve, 200));
        },

        handleBack: (uid: string, imageId: string) => {
            console.log(`Back to gallery from image: ${imageId}`);
        },

        getPresets: async (uid: string) => {
            await new Promise(resolve => setTimeout(resolve, 300));
            return [
                { id: '1', name: 'Warm Sunset', is_default: false, temperature: 15, tint: 5, saturation: 8, vibrance: 12, exposure: 2, contrast: 5, highlights: -10, shadows: 8, whites: 3, blacks: -5, clarity: 4, sharpness: 6 },
                { id: '2', name: 'Cool Morning', is_default: false, temperature: -12, tint: -3, saturation: -2, vibrance: 5, exposure: 1, contrast: 3, highlights: -5, shadows: 12, whites: 8, blacks: -8, clarity: 6, sharpness: 4 },
                { id: '3', name: 'High Contrast', is_default: false, temperature: 0, tint: 0, saturation: 5, vibrance: 8, exposure: 0, contrast: 20, highlights: -15, shadows: 15, whites: 10, blacks: -10, clarity: 15, sharpness: 8 },
                { id: '4', name: 'Vintage Film', is_default: false, temperature: 8, tint: 2, saturation: -5, vibrance: 3, exposure: -1, contrast: -2, highlights: -8, shadows: 5, whites: 5, blacks: -3, clarity: -2, sharpness: 2 },
                { id: '5', name: 'Portrait', is_default: false, temperature: 3, tint: 1, saturation: 2, vibrance: 4, exposure: 1, contrast: 2, highlights: -5, shadows: 8, whites: 2, blacks: -2, clarity: 3, sharpness: 5 },
            ] as Preset[];
        },

        createPreset: async (uid: string, name: string, settings: AdjustmentState) => {
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log(`Creating preset: ${name}`, settings);
        },

        deletePreset: async (uid: string, presetId: string) => {
            await new Promise(resolve => setTimeout(resolve, 300));
            console.log(`Deleting preset: ${presetId}`);
        },

        updatePreset: async (uid: string, data: Preset) => {
            await new Promise(resolve => setTimeout(resolve, 300));
            console.log(`Updating preset:`, data);
        },

        createEditorConfig: async (uid: string, payload: CreateEditorTaskRequest) => {
            await new Promise(resolve => setTimeout(resolve, 200));
            console.log('Creating editor config:', payload);
        },

        getEditorHistory: async (uid: string, imageId: string): Promise<GetHistoryResponse> => {
            await new Promise(resolve => setTimeout(resolve, 200));
            // Mock history response with some history entries
            return {
                history: [
                    {
                        id: 'history-1',
                        gallery_id: imageId,
                        event_id: 'demo-event',
                        task_id: 'task-1',
                        editor_config: {
                            color_adjustment: {
                                temperature: 0, tint: 0, vibrance: 0, saturation: 0,
                                exposure: 0, highlights: 0, shadows: 0, whites: 0,
                                blacks: 0, contrast: 0, clarity: 0, sharpness: 0,
                            },
                            transformation_adjustment: [],
                            watermarks: [],
                        },
                        log: {
                            created_at: new Date(Date.now() - 10000).toISOString(),
                            updated_at: new Date(Date.now() - 10000).toISOString(),
                        },
                    }
                ]
            };
        },

        getGalleryUpdateTimestamp: async (uid: string, eventId: string): Promise<GetGalleryUpdateTimestampResponse> => {
            await new Promise(resolve => setTimeout(resolve, 100));
            return {
                gallery: []
            };
        },

        setHistoryIndex: async (uid: string, imageId: string, taskId: string) => {
            await new Promise(resolve => setTimeout(resolve, 100));
            console.log(`Setting history index for image ${imageId} to task ${taskId}`);
        },
    };
};

// Adjustment Slider Component with Batch Mode Support
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
                    if (!isBatchMode) {
                        // Start batch mode on first drag
                        onDragStart();
                    }
                    // Update value (will update UI immediately)
                    onValueChange(field, numValue);
                }}
                onChangeCommitted={() => {
                    // Always end batch mode when drag finishes, regardless of current state
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

// Preset Card Component
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
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                Vib: {preset.vibrance > 0 ? '+' : ''}{preset.vibrance},
                Sat: {preset.saturation > 0 ? '+' : ''}{preset.saturation},
                Cla: {preset.clarity > 0 ? '+' : ''}{preset.clarity}
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

export const HonchoEditorSingleDemo: React.FC = () => {
    const [controller] = useState(() => createMockController());
    const [currentImageId, setCurrentImageId] = useState('1');
    const [showAdjustments, setShowAdjustments] = useState(true);
    const [selectedPresetId, setSelectedPresetId] = useState<string>('');
    const [newPresetName, setNewPresetName] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Use the actual useHonchoEditor hook
    const editorState = useHonchoEditor(controller, currentImageId, 'demo-user');

    // Also use individual hooks for demonstration
    const adjustmentHistory = useAdjustmentHistory({
        tempScore: 0, tintScore: 0, vibranceScore: 0, saturationScore: 0,
        exposureScore: 0, highlightsScore: 0, shadowsScore: 0, whitesScore: 0,
        blacksScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
    });

    const gallerySwipe = useGallerySwipe('demo-user', currentImageId, controller);

    const presetHook = usePreset(controller, 'demo-user', { autoLoad: true });

    // Find active preset based on current adjustments
    const activePreset = useMemo(() => {
        return presetHook.actions.findByAdjustments(adjustmentHistory.currentState);
    }, [presetHook.actions, adjustmentHistory.currentState]);

    // Handle preset application
    const handleApplyPreset = (preset: Preset) => {
        console.log('Applying preset:', preset.name);
        const adjustmentState: AdjustmentState = {
            tempScore: preset.temperature,
            tintScore: preset.tint,
            vibranceScore: preset.vibrance,
            saturationScore: preset.saturation,
            exposureScore: preset.exposure,
            highlightsScore: preset.highlights,
            shadowsScore: preset.shadows,
            whitesScore: preset.whites,
            blacksScore: preset.blacks,
            contrastScore: preset.contrast,
            clarityScore: preset.clarity,
            sharpnessScore: preset.sharpness,
        };
        // Push the preset values to adjustment history
        adjustmentHistory.actions.pushState(adjustmentState);
        setSelectedPresetId(preset.id);
    };

    // Batch mode functions for slider interactions
    const handleSliderDragStart = () => {
        console.log('Slider drag started - entering batch mode');
        adjustmentHistory.config.setBatchMode(true);
    };

    const handleSliderDragEnd = () => {
        console.log('Slider drag ended - exiting batch mode');
        adjustmentHistory.config.setBatchMode(false);
    };

    // Universal value change handler that works with batch mode
    const handleValueChange = (field: keyof AdjustmentState, value: number) => {
        const newState = {
            ...adjustmentHistory.currentState,
            [field]: value
        };
        adjustmentHistory.actions.pushState(newState);
    };

    // Handle preset creation
    const handleCreatePreset = async () => {
        if (!newPresetName.trim()) return;
        
        console.log('Creating preset with current adjustments:', adjustmentHistory.currentState);
        
        try {
            const preset = await presetHook.actions.create(newPresetName, adjustmentHistory.currentState);
            if (preset) {
                setNewPresetName('');
                setSelectedPresetId(preset.id);
                console.log('Preset created successfully:', preset);
            } else {
                console.error('Failed to create preset');
            }
        } catch (error) {
            console.error('Error creating preset:', error);
        }
    };

    // Handle image navigation using gallerySwipe
    const handleImageNavigation = (direction: 'next' | 'prev') => {
        if (direction === 'next' && gallerySwipe.isNextAvailable) {
            gallerySwipe.onSwipeNext();
        } else if (direction === 'prev' && gallerySwipe.isPrevAvailable) {
            gallerySwipe.onSwipePrev();
        }
    };

    // Update currentImageId when gallerySwipe changes
    React.useEffect(() => {
        if (gallerySwipe.currentImageData) {
            setCurrentImageId(gallerySwipe.currentImageData.id);
        }
    }, [gallerySwipe.currentImageData]);

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
                Honcho Editor Single Image Demo
            </Typography>

            <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
                This demo shows the useHonchoEditor hook with useAdjustmentHistory, useGallerySwipe, and usePreset hooks
            </Typography>

            {(editorState.galleryError || presetHook.info.error) && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {editorState.galleryError || presetHook.info.error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {/* Main Image Area */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2, mb: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h6">
                                Image {currentImageId}
                                {activePreset && ` - ${activePreset.name}`}
                            </Typography>
                            
                            <Stack direction="row" spacing={1}>
                                <Tooltip title="Previous Image">
                                    <span>
                                        <IconButton
                                            onClick={() => handleImageNavigation('prev')}
                                            disabled={!gallerySwipe.isPrevAvailable || gallerySwipe.isLoading}
                                        >
                                            <NavigateBefore />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                
                                <Tooltip title="Next Image">
                                    <span>
                                        <IconButton
                                            onClick={() => handleImageNavigation('next')}
                                            disabled={!gallerySwipe.isNextAvailable || gallerySwipe.isLoading}
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
                            {gallerySwipe.currentImageData ? (
                                <CardMedia
                                    component="img"
                                    image={gallerySwipe.currentImageData.download.path}
                                    alt={`Image ${currentImageId}`}
                                    sx={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                        transition: 'transform 0.1s ease-out',
                                    }}
                                />
                            ) : gallerySwipe.isLoading ? (
                                <CircularProgress />
                            ) : (
                                <Typography color="text.secondary">No image loaded</Typography>
                            )}
                            
                            {/* Editor Canvas (Hidden for demo but would overlay the image) */}
                            <canvas
                                ref={canvasRef}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    pointerEvents: 'none',
                                    opacity: 0, // Hidden for demo purposes
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
                                        onClick={adjustmentHistory.actions.undo}
                                        disabled={!adjustmentHistory.historyInfo.canUndo}
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
                                        onClick={adjustmentHistory.actions.redo}
                                        disabled={!adjustmentHistory.historyInfo.canRedo}
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
                                    onClick={() => adjustmentHistory.actions.reset({
                                        tempScore: 0, tintScore: 0, vibranceScore: 0, saturationScore: 0,
                                        exposureScore: 0, highlightsScore: 0, shadowsScore: 0, whitesScore: 0,
                                        blacksScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
                                    })}
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
                                Current Adjustments: {getAdjustmentSummary(adjustmentHistory.currentState)}
                                {adjustmentHistory.historyInfo.isBatchMode && (
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
                                    value={adjustmentHistory.currentState.tempScore}
                                    field="tempScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Tint"
                                    value={adjustmentHistory.currentState.tintScore}
                                    field="tintScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Vibrance"
                                    value={adjustmentHistory.currentState.vibranceScore}
                                    field="vibranceScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Saturation"
                                    value={adjustmentHistory.currentState.saturationScore}
                                    field="saturationScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />

                                <Divider sx={{ my: 2 }} />

                                {/* Light Adjustments */}
                                <Typography variant="subtitle2" gutterBottom>
                                    Light
                                </Typography>
                                <AdjustmentSlider
                                    label="Exposure"
                                    value={adjustmentHistory.currentState.exposureScore}
                                    field="exposureScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Contrast"
                                    value={adjustmentHistory.currentState.contrastScore}
                                    field="contrastScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Highlights"
                                    value={adjustmentHistory.currentState.highlightsScore}
                                    field="highlightsScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Shadows"
                                    value={adjustmentHistory.currentState.shadowsScore}
                                    field="shadowsScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Whites"
                                    value={adjustmentHistory.currentState.whitesScore}
                                    field="whitesScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Blacks"
                                    value={adjustmentHistory.currentState.blacksScore}
                                    field="blacksScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />

                                <Divider sx={{ my: 2 }} />

                                {/* Detail Adjustments */}
                                <Typography variant="subtitle2" gutterBottom>
                                    Details
                                </Typography>
                                <AdjustmentSlider
                                    label="Clarity"
                                    value={adjustmentHistory.currentState.clarityScore}
                                    field="clarityScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />
                                <AdjustmentSlider
                                    label="Sharpness"
                                    value={adjustmentHistory.currentState.sharpnessScore}
                                    field="sharpnessScore"
                                    onValueChange={handleValueChange}
                                    onDragStart={handleSliderDragStart}
                                    onDragEnd={handleSliderDragEnd}
                                    isBatchMode={adjustmentHistory.historyInfo.isBatchMode}
                                />
                            </>
                        )}
                    </Paper>

                    {/* Presets Panel */}
                    <Paper sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h6">
                                Presets ({presetHook.presets.length})
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => presetHook.actions.load()}
                                disabled={presetHook.info.isLoading}
                            >
                                Refresh
                            </Button>
                        </Stack>

                        {presetHook.info.error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {presetHook.info.error}
                            </Alert>
                        )}

                        {presetHook.info.isLoading && (
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
                                    variant={!activePreset ? "contained" : "outlined"}
                                    onClick={() => adjustmentHistory.actions.reset({
                                        tempScore: 0, tintScore: 0, vibranceScore: 0, saturationScore: 0,
                                        exposureScore: 0, highlightsScore: 0, shadowsScore: 0, whitesScore: 0,
                                        blacksScore: 0, contrastScore: 0, clarityScore: 0, sharpnessScore: 0,
                                    })}
                                >
                                    Reset All
                                </Button>
                                {activePreset && (
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="info"
                                        disabled
                                    >
                                        Active: {activePreset.name}
                                    </Button>
                                )}
                            </Stack>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Stack spacing={1} sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {presetHook.presets.length === 0 && !presetHook.info.isLoading ? (
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                                    No presets available. Create your first preset below!
                                </Typography>
                            ) : (
                                presetHook.presets.map((preset) => (
                                    <PresetCard
                                        key={preset.id}
                                        preset={preset}
                                        onApply={handleApplyPreset}
                                        onDelete={presetHook.actions.delete}
                                        isActive={activePreset?.id === preset.id}
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
                            <FormControl size="small" fullWidth>
                                <TextField
                                    placeholder="Enter preset name..."
                                    value={newPresetName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPresetName(e.target.value)}
                                    size="small"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleCreatePreset();
                                        }
                                    }}
                                />
                            </FormControl>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleCreatePreset}
                                disabled={!newPresetName.trim() || presetHook.info.isLoading}
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
                    Demo Notes: This uses mock data and simulated API calls. 
                    The demo showcases useHonchoEditor hook integrating useAdjustmentHistory, useGallerySwipe, and usePreset hooks.
                    Try adjusting the sliders, navigating between images, and applying presets.
                </Typography>
                
                <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="caption" display="block">
                        <strong>Debug Info:</strong><br />
                        Current Image: {currentImageId} | 
                        Gallery Loading: {gallerySwipe.isLoading ? 'Yes' : 'No'} | 
                        Image Loaded: {gallerySwipe.currentImageData ? 'Yes' : 'No'} | 
                        Next Available: {gallerySwipe.isNextAvailable ? 'Yes' : 'No'} | 
                        Prev Available: {gallerySwipe.isPrevAvailable ? 'Yes' : 'No'} | 
                        Active Preset: {activePreset?.name || 'None'} | 
                        Can Undo: {adjustmentHistory.historyInfo.canUndo ? 'Yes' : 'No'} | 
                        Can Redo: {adjustmentHistory.historyInfo.canRedo ? 'Yes' : 'No'} |
                        Batch Mode: {adjustmentHistory.historyInfo.isBatchMode ? 'Yes' : 'No'} |
                        History Count: {adjustmentHistory.historyInfo.currentIndex + 1}/{adjustmentHistory.historyInfo.totalStates}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default HonchoEditorSingleDemo;
