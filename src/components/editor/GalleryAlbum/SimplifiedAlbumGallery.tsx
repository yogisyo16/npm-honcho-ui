import React from 'react';
import { Box } from '@mui/material';
import SimplifiedImageItem from './SimplifiedImageItem'; // Import the child component
import type { Gallery } from "../../../hooks/editor/type"; // Assuming types.ts is in @/types

// Define and export the PhotoData type here, so it can be used by other files.
export interface PhotoData {
    key: string;
    src: string;
    width: number;
    height: number;
    alt: string;
    isSelected: boolean;
    originalData: Gallery;
}

interface SimplifiedAlbumGalleryProps {
    imageCollection: PhotoData[];
    onToggleSelect: (photo: PhotoData) => void;
    onPreview: (photo: PhotoData) => void;
}

export default function SimplifiedAlbumGallery({ imageCollection, onToggleSelect, onPreview }: SimplifiedAlbumGalleryProps) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px',
                width: '100%',
                height: '100%',
                overflowY: 'auto',
                p: 1
            }}
        >
            {imageCollection.map(photo => (
                <SimplifiedImageItem
                    key={photo.key}
                    photo={photo}
                    onToggleSelect={onToggleSelect}
                    onPreview={onPreview}
                />
            ))}
        </Box>
    );
}