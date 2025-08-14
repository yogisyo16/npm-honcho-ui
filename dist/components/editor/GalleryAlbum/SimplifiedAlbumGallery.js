import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from '@mui/material';
import SimplifiedImageItem from './SimplifiedImageItem'; // Import the child component
export default function SimplifiedAlbumGallery({ imageCollection, onToggleSelect, onPreview }) {
    return (_jsx(Box, { sx: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            p: 1
        }, children: imageCollection.map(photo => (_jsx(SimplifiedImageItem, { photo: photo, onToggleSelect: onToggleSelect, onPreview: onPreview }, photo.key))) }));
}
