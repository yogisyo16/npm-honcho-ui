# Honcho Editor Hook Demos

This directory contains demo components for testing and demonstrating the Honcho Editor hooks.

## HonchoEditorSingleDemo

A comprehensive demo of the `useHonchoEditor` hook that shows:

### Features Demonstrated
- **Single Image Editing**: Uses slide instances with delta adjustments
- **Image Navigation**: Navigate between images using useGallerySwipe
- **Adjustment History**: Undo/redo functionality with useAdjustmentHistory
- **Preset Management**: Apply and create presets using usePreset
- **Real-time Adjustments**: Color, light, and detail controls with sliders
- **Zoom Controls**: Zoom in/out, fit to screen functionality
- **Loading States**: Shows loading indicators during operations
- **Error Handling**: Displays errors if operations fail

### How to Use

1. **Import the demo**:
   ```tsx
   import { HonchoEditorSingleDemo } from '@yogiswara/honcho-editor-ui/hooks/demo';
   ```

2. **Use in your Next.js page**:
   ```tsx
   export default function DemoPage() {
     return <HonchoEditorSingleDemo />;
   }
   ```

### Mock Controller

The demo includes a fully functional mock controller that:
- Simulates realistic API delays (200-500ms)
- Returns individual image data for gallery navigation
- Provides preset management with 5 predefined presets
- Includes mock editor history functionality

### Testing Scenarios

1. **Image Navigation**: Use prev/next buttons to navigate between images
2. **Adjustments**: Use sliders to adjust color, light, and detail settings
3. **History**: Test undo/redo functionality
4. **Presets**: Apply existing presets or create new ones
5. **Zoom**: Test zoom controls and mouse wheel zooming

### Visual Features

- Canvas-based image editor integration
- Real-time adjustment previews
- Preset cards with apply/delete functionality
- Responsive grid layout for mobile and desktop
- Loading states with progress indicators
- Clean Material-UI interface

### Code Structure

- **Mock Data**: Creates realistic Gallery objects with varying adjustments
- **Mock Controller**: Implements the full Controller interface
- **Demo UI**: Comprehensive interface showing all hook integrations
- **Hook Integration**: Demonstrates useHonchoEditor with useAdjustmentHistory, useGallerySwipe, and usePreset
- **Responsive Design**: Works well on all screen sizes

## HonchoEditorBulkDemo

A comprehensive demo of the `useHonchoEditorBulk` hook that shows:

### Features Demonstrated
- **Image Loading**: Paginated loading with mock images from Lorem Picsum
- **Bulk Selection**: Click images to select/deselect them for bulk operations
- **Bulk Adjustments**: Temperature, Tint, Exposure, Contrast, and Clarity controls
- **Real-time UI Updates**: See adjustments applied immediately with visual chips
- **Loading States**: Shows loading indicators during operations
- **Error Handling**: Displays errors if operations fail
- **Pagination**: Load more functionality with simulated API delays

### How to Use

1. **Import the demo**:
   ```tsx
   import { HonchoEditorBulkDemo } from '@yogiswara/honcho-editor-ui/hooks/demo';
   ```

2. **Use in your Next.js page**:
   ```tsx
   export default function DemoPage() {
     return <HonchoEditorBulkDemo />;
   }
   ```

### Mock Controller

The demo includes a fully functional mock controller that:
- Simulates realistic API delays (500-800ms)
- Returns paginated image data
- Provides preset management
- Includes some pre-configured image adjustments

### Testing Scenarios

1. **Basic Selection**: Click images to select them, see the selection count update
2. **Bulk Adjustments**: Select multiple images and use the adjustment controls
3. **Pagination**: Click "Load More" to test pagination functionality
4. **Refresh**: Test the refresh functionality
5. **Error States**: Mock controller can be modified to test error conditions

### Visual Features

- Selected images have blue borders
- Adjustment chips show current values for each image
- Responsive grid layout works on mobile and desktop
- Loading states with progress indicators
- Clean Material-UI interface

### Code Structure

- **Mock Data**: Creates realistic Gallery objects with adjustments
- **Mock Controller**: Implements the full Controller interface
- **Demo UI**: Comprehensive interface showing all hook features
- **Responsive Design**: Works well on all screen sizes

### Development Notes

- Uses Lorem Picsum for placeholder images
- Simulates network delays for realistic testing
- All hook functions are exercised in the demo
- Can be easily modified to test different scenarios
- Perfect for manual testing and integration verification

Both demos serve as testing tools and documentation of how to properly use the respective Honcho Editor hooks.