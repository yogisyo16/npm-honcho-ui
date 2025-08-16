# Honcho Editor Hook Demos

This directory contains demo components for testing and demonstrating the Honcho Editor hooks.

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

This demo serves as both a testing tool and documentation of how to properly use the `useHonchoEditorBulk` hook.