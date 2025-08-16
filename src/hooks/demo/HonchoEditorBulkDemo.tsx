import React, { useState, useMemo } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Checkbox,
    Chip,
    Alert,
    CircularProgress,
    ButtonGroup,
    Paper,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack
} from '@mui/material';
import { useHonchoEditorBulk } from '../editor/useHonchoEditorBulk';
import { Controller, AdjustmentState, Preset } from '../editor/useHonchoEditor';
import { Gallery, ResponseGalleryPaging, CreateEditorTaskRequest, GetHistoryResponse, GetGalleryUpdateTimestampResponse } from '../editor/type';

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
        createMockGallery('2'),
        createMockGallery('3', { contrastScore: -3, clarityScore: 8 }),
        createMockGallery('4'),
        createMockGallery('5', { vibranceScore: 10 }),
        createMockGallery('6'),
        createMockGallery('7', { tempScore: -8, tintScore: 4 }),
        createMockGallery('8'),
        createMockGallery('9'),
        createMockGallery('10'),
    ];

    return {
        onGetImage: async (uid: string, imageId: string) => {
            await new Promise(resolve => setTimeout(resolve, 500));
            const image = mockImages.find(img => img.id === imageId);
            if (!image) throw new Error(`Image ${imageId} not found`);
            return image;
        },

        getImageList: async (uid: string, eventId: string, page: number) => {
            await new Promise(resolve => setTimeout(resolve, 800));

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
            console.log(`Back to: ${imageId}`);
        },

        getPresets: async (uid: string) => {
            return [
                { id: '1', name: 'Warm Sunset', is_default: false, temperature: 15, tint: 5, saturation: 8, vibrance: 12, exposure: 2, contrast: 5, highlights: -10, shadows: 8, whites: 3, blacks: -5, clarity: 4, sharpness: 6 },
                { id: '2', name: 'Cool Morning', is_default: false, temperature: -12, tint: -3, saturation: -2, vibrance: 5, exposure: 1, contrast: 3, highlights: -5, shadows: 12, whites: 8, blacks: -8, clarity: 6, sharpness: 4 },
                { id: '3', name: 'High Contrast', is_default: false, temperature: 0, tint: 0, saturation: 5, vibrance: 8, exposure: 0, contrast: 20, highlights: -15, shadows: 15, whites: 10, blacks: -10, clarity: 15, sharpness: 8 },
            ] as Preset[];
        },

        createPreset: async (uid: string, name: string, settings: AdjustmentState) => {
            console.log(`Creating preset: ${name}`, settings);
        },

        deletePreset: async (uid: string, presetId: string) => {
            console.log(`Deleting preset: ${presetId}`);
        },

        updatePreset: async (uid: string, data: Preset) => {
            console.log(`Updating preset:`, data);
        },

        createEditorConfig: async (uid: string, payload: CreateEditorTaskRequest) => {
            await new Promise(resolve => setTimeout(resolve, 300));
            console.log('Creating editor config:', payload);
        },

        getEditorHistory: async (uid: string, imageId: string): Promise<GetHistoryResponse> => {
            await new Promise(resolve => setTimeout(resolve, 200));
            // Mock history response - return empty history for demo
            return {
                history: []
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

const AdjustmentControls: React.FC<{
    label: string;
    onDecreaseMax: () => void;
    onDecrease: () => void;
    onIncrease: () => void;
    onIncreaseMax: () => void;
    disabled?: boolean;
}> = ({ label, onDecreaseMax, onDecrease, onIncrease, onIncreaseMax, disabled = false }) => (
    <Box mb={2}>
        <Typography variant="body2" gutterBottom>{label}</Typography>
        <ButtonGroup size="small" variant="outlined">
            <Button onClick={onDecreaseMax} disabled={disabled}>--</Button>
            <Button onClick={onDecrease} disabled={disabled}>-</Button>
            <Button onClick={onIncrease} disabled={disabled}>+</Button>
            <Button onClick={onIncreaseMax} disabled={disabled}>++</Button>
        </ButtonGroup>
    </Box>
);

export const HonchoEditorBulkDemo: React.FC = () => {
    const [controller] = useState(() => createMockController());
    const [showAdjustments, setShowAdjustments] = useState(false);

    const {
        imageData,
        isLoading,
        error,
        selectedIds,
        hasMore,
        selectedBulkPreset,
        presets, // Add presets
        activePreset, // Add activePreset
        handleToggleImageSelection,
        handleLoadMore,
        handleRefresh,
        handleSelectBulkPreset,
        handleBackCallbackBulk,
        // Temperature adjustments
        handleBulkTempDecreaseMax,
        handleBulkTempDecrease,
        handleBulkTempIncrease,
        handleBulkTempIncreaseMax,
        // Tint adjustments
        handleBulkTintDecreaseMax,
        handleBulkTintDecrease,
        handleBulkTintIncrease,
        handleBulkTintIncreaseMax,
        // Exposure adjustments
        handleBulkExposureDecreaseMax,
        handleBulkExposureDecrease,
        handleBulkExposureIncrease,
        handleBulkExposureIncreaseMax,
        // Contrast adjustments
        handleBulkContrastDecreaseMax,
        handleBulkContrastDecrease,
        handleBulkContrastIncrease,
        handleBulkContrastIncreaseMax,
        // Clarity adjustments
        handleBulkClarityDecreaseMax,
        handleBulkClarityDecrease,
        handleBulkClarityIncrease,
        handleBulkClarityIncreaseMax,
        // History actions
        handleUndo,
        handleRedo,
        handleReset,
        historyInfo,
    } = useHonchoEditorBulk(controller, 'demo-event', 'demo-user');

    // Debug logging for preset state - less frequent
    React.useEffect(() => {
        const interval = setInterval(() => {
            console.log('[HonchoEditorBulkDemo] Preset state:', {
                presets: presets.map(p => ({ id: p.id, name: p.name })),
                selectedBulkPreset,
                activePreset: activePreset ? { id: activePreset.id, name: activePreset.name } : null,
                selectedCount: selectedIds.length
            });
        }, 5000); // Every 5 seconds instead of on every render

        return () => clearInterval(interval);
    }, [presets, selectedBulkPreset, activePreset, selectedIds.length]);

    const selectedCount = selectedIds.length;
    const totalCount = imageData.length;

    // Debug logging for presets
    console.log('[HonchoEditorBulkDemo] Preset state:', {
        presets: presets.map(p => ({ id: p.id, name: p.name })),
        selectedBulkPreset,
        activePreset: activePreset ? { id: activePreset.id, name: activePreset.name } : null,
        selectedCount
    });

    const getAdjustmentSummary = (image: any) => {
        const adjustments = [];
        if (image.tempScore !== 0) adjustments.push(`Temp: ${image.tempScore > 0 ? '+' : ''}${image.tempScore}`);
        if (image.exposureScore !== 0) adjustments.push(`Exp: ${image.exposureScore > 0 ? '+' : ''}${image.exposureScore}`);
        if (image.contrastScore !== 0) adjustments.push(`Con: ${image.contrastScore > 0 ? '+' : ''}${image.contrastScore}`);
        if (image.clarityScore !== 0) adjustments.push(`Cla: ${image.clarityScore > 0 ? '+' : ''}${image.clarityScore}`);
        if (image.vibranceScore !== 0) adjustments.push(`Vib: ${image.vibranceScore > 0 ? '+' : ''}${image.vibranceScore}`);
        return adjustments;
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h3" gutterBottom align="center">
                Honcho Editor Bulk Demo
            </Typography>

            <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
                This demo shows the useHonchoEditorBulk hook in action with mock data
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Paper sx={{ p: 3, mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    <Button
                        variant="contained"
                        onClick={handleRefresh}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={20} /> : 'Refresh Images'}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => setShowAdjustments(!showAdjustments)}
                    >
                        {showAdjustments ? 'Hide' : 'Show'} Adjustments
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            console.log('Debug Info:', {
                                selectedIds,
                                selectedCount,
                                showAdjustments,
                                presets: presets.map(p => ({ id: p.id, name: p.name })),
                                selectedBulkPreset,
                                activePreset: activePreset ? { id: activePreset.id, name: activePreset.name } : null,
                                imageData: imageData.map(img => ({ key: img.key, isSelected: img.isSelected }))
                            });
                        }}
                    >
                        Debug Selection
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleBackCallbackBulk}
                    >
                        Back
                    </Button>

                    <Chip
                        label={`${selectedCount} of ${totalCount} selected`}
                        color={selectedCount > 0 ? "primary" : "default"}
                    />

                    {hasMore && (
                        <Button
                            variant="outlined"
                            onClick={handleLoadMore}
                            disabled={isLoading}
                        >
                            Load More
                        </Button>
                    )}

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Bulk Preset</InputLabel>
                        <Select
                            value={selectedBulkPreset}
                            onChange={handleSelectBulkPreset}
                            label="Bulk Preset"
                            displayEmpty
                        >
                            <MenuItem value="">
                                <em>No Preset</em>
                            </MenuItem>
                            {presets.map((preset) => (
                                <MenuItem key={preset.id} value={preset.id}>
                                    {preset.name}
                                    {activePreset?.id === preset.id && ' ✓'}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Typography variant="body2" sx={{ ml: 2, opacity: 0.7 }}>
                        Active: {activePreset ? activePreset.name : 'None'} | Presets: {presets.length}
                    </Typography>
                </Stack>
            </Paper>

            {showAdjustments && (
                <Paper sx={{ p: 3, mb: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="h6">
                            Bulk Adjustments ({selectedCount} images selected)
                        </Typography>

                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleUndo}
                                disabled={!historyInfo.canUndo}
                                sx={{ minWidth: 80 }}
                            >
                                Undo
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleRedo}
                                disabled={!historyInfo.canRedo}
                                sx={{ minWidth: 80 }}
                            >
                                Redo
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleReset()}
                                disabled={selectedCount === 0}
                                color="warning"
                                sx={{ minWidth: 80 }}
                            >
                                Reset
                            </Button>
                        </Stack>
                    </Stack>

                    {selectedCount === 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Select one or more images below to enable bulk adjustments
                        </Typography>
                    )}

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        History: {historyInfo.currentIndex + 1}/{historyInfo.totalStates} states |
                        Can Undo: {historyInfo.canUndo ? 'Yes' : 'No'} |
                        Can Redo: {historyInfo.canRedo ? 'Yes' : 'No'}
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <Typography variant="subtitle2" gutterBottom>Color</Typography>
                            <AdjustmentControls
                                label="Temperature"
                                onDecreaseMax={handleBulkTempDecreaseMax}
                                onDecrease={handleBulkTempDecrease}
                                onIncrease={handleBulkTempIncrease}
                                onIncreaseMax={handleBulkTempIncreaseMax}
                                disabled={selectedCount === 0}
                            />
                            <AdjustmentControls
                                label="Tint"
                                onDecreaseMax={handleBulkTintDecreaseMax}
                                onDecrease={handleBulkTintDecrease}
                                onIncrease={handleBulkTintIncrease}
                                onIncreaseMax={handleBulkTintIncreaseMax}
                                disabled={selectedCount === 0}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Typography variant="subtitle2" gutterBottom>Light</Typography>
                            <AdjustmentControls
                                label="Exposure"
                                onDecreaseMax={handleBulkExposureDecreaseMax}
                                onDecrease={handleBulkExposureDecrease}
                                onIncrease={handleBulkExposureIncrease}
                                onIncreaseMax={handleBulkExposureIncreaseMax}
                                disabled={selectedCount === 0}
                            />
                            <AdjustmentControls
                                label="Contrast"
                                onDecreaseMax={handleBulkContrastDecreaseMax}
                                onDecrease={handleBulkContrastDecrease}
                                onIncrease={handleBulkContrastIncrease}
                                onIncreaseMax={handleBulkContrastIncreaseMax}
                                disabled={selectedCount === 0}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Typography variant="subtitle2" gutterBottom>Details</Typography>
                            <AdjustmentControls
                                label="Clarity"
                                onDecreaseMax={handleBulkClarityDecreaseMax}
                                onDecrease={handleBulkClarityDecrease}
                                onIncrease={handleBulkClarityIncrease}
                                onIncreaseMax={handleBulkClarityIncreaseMax}
                                disabled={selectedCount === 0}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            )}

            <Grid container spacing={2}>
                {imageData.map((image) => {
                    const adjustments = getAdjustmentSummary(image);

                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={image.key}>
                            <Card
                                sx={{
                                    border: image.isSelected ? 2 : 1,
                                    borderColor: image.isSelected ? 'primary.main' : 'divider',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 2,
                                    }
                                }}
                                onClick={() => handleToggleImageSelection(image.key)}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={image.src}
                                    alt={image.alt}
                                    sx={{ objectFit: 'cover' }}
                                />

                                <CardContent sx={{ pb: 1 }}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography variant="body2" color="text.secondary">
                                            Image {image.key}
                                        </Typography>
                                        <Checkbox
                                            checked={image.isSelected}
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleImageSelection(image.key);
                                            }}
                                        />
                                    </Box>

                                    {adjustments.length > 0 && (
                                        <Box mt={1}>
                                            <Stack direction="row" spacing={0.5} flexWrap="wrap">
                                                {adjustments.map((adj, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={adj}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ fontSize: '0.7rem', height: 20 }}
                                                    />
                                                ))}
                                            </Stack>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {isLoading && imageData.length === 0 && (
                <Box display="flex" justifyContent="center" py={4}>
                    <CircularProgress />
                </Box>
            )}

            <Box mt={4}>
                <Divider />
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                    Demo Notes: This uses mock data and simulated API calls.
                    Select images and try the bulk adjustment controls above.
                </Typography>
            </Box>
        </Container>
    );
};

export default HonchoEditorBulkDemo;