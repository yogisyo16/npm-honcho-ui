# Honcho Editor Bulk Test App

This is a complete React test application for manually testing the `useHonchoEditorBulk` hook.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd test-app
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at http://localhost:3001

## 📋 What You'll See

The test app includes a complete demo of the `useHonchoEditorBulk` hook with:

- **Image Grid**: 4 mock images from Lorem Picsum initially
- **Selection Interface**: Click images to select/deselect (blue borders)
- **Bulk Controls**: Temperature, Tint, Exposure, Contrast, Clarity adjustments
- **Real-time Feedback**: Adjustment chips appear on modified images
- **Pagination**: "Load More" button to test pagination functionality
- **Responsive Design**: Works on mobile and desktop

## 🧪 Manual Testing Checklist

### Basic Functionality
- [ ] Images load without errors
- [ ] Click images to select/deselect them
- [ ] Selected images show blue borders
- [ ] Selection counter updates correctly
- [ ] "Show Adjustments" button reveals controls

### Bulk Adjustments
- [ ] Select multiple images (2-3 recommended)
- [ ] Test Temperature controls: `--` `-` `+` `++`
- [ ] Test other adjustment types
- [ ] Verify adjustment chips appear on images
- [ ] Check values update in real-time

### Pagination
- [ ] Click "Load More" to fetch page 2 (4 more images)
- [ ] Click "Load More" again for page 3 (2 more images)
- [ ] Verify button disappears when no more pages
- [ ] Check loading indicators work properly

### Error Handling
- [ ] No console errors during normal operation
- [ ] All API calls complete successfully
- [ ] Loading states behave correctly

### Mobile Testing
- [ ] Open browser dev tools
- [ ] Switch to mobile viewport (375px)
- [ ] Test touch interactions
- [ ] Verify responsive layout

## 🔧 Customization

### Test with Real Data

Replace the mock controller in `src/App.tsx`:

```tsx
import { useHonchoEditorBulk } from '@yogiswara/honcho-editor-ui';
import { YourController } from './your-controller';

function CustomTestComponent() {
  const controller = new YourController();
  
  const bulkEditor = useHonchoEditorBulk(
    controller,
    'your-event-id',
    'your-firebase-uid'
  );

  return (
    <div>
      <h2>Custom Test</h2>
      <p>Loading: {bulkEditor.isLoading}</p>
      <p>Images: {bulkEditor.imageData.length}</p>
      <p>Selected: {bulkEditor.selectedIds.length}</p>
      {/* Add your custom UI here */}
    </div>
  );
}
```

### Modify Mock Data

Edit the mock controller in the demo component to:
- Change image count or pagination
- Add different preset adjustments
- Simulate error conditions
- Test with different data structures

## 📊 Expected Behavior

### Mock Data Characteristics
- **Page Size**: 4 images per page
- **Total Images**: 10 images across 3 pages
- **API Delays**: 500-800ms (realistic)
- **Pre-adjustments**: Some images have existing adjustments
- **Error Rate**: 0% (all requests succeed)

### Performance Expectations
- **Initial Load**: < 1 second
- **Image Selection**: Immediate response
- **Bulk Adjustments**: Immediate UI updates
- **Page Navigation**: < 1 second with loading indicator

## 🐛 Troubleshooting

### Images Don't Load
- Check internet connection (uses Lorem Picsum)
- Verify no CORS issues in browser console
- Clear browser cache and reload

### TypeScript Errors
- Ensure all dependencies are installed: `npm install`
- Check that parent project builds successfully: `cd .. && npm run build`
- Restart the dev server: `npm run dev`

### Performance Issues
- Open browser dev tools
- Check Network tab for slow requests
- Monitor Console for errors or warnings

## 🏗️ Project Structure

```
test-app/
├── src/
│   ├── App.tsx          # Main test app component
│   ├── main.tsx         # React entry point
│   └── vite-env.d.ts    # Vite type definitions
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration with path aliases
├── tsconfig.json        # TypeScript configuration
└── index.html           # HTML template
```

## 📖 Additional Resources

- **Hook Documentation**: See `../CLAUDE.md` for hook details
- **Testing Guide**: See `../MANUAL_TESTING_GUIDE.md` for comprehensive testing
- **Unit Tests**: See `../src/hooks/__tests__/useHonchoEditorBulk.test.ts`

Happy testing! 🎯