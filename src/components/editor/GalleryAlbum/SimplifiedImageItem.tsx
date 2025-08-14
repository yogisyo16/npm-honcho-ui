import React, { useState } from 'react';
import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import type { PhotoData } from './SimplifiedAlbumGallery'; // We'll import the type from the parent

interface SimplifiedImageItemProps {
    photo: PhotoData;
    onToggleSelect: (photo: PhotoData) => void;
    onPreview: (photo: PhotoData) => void;
}

export default function SimplifiedImageItem({ photo, onToggleSelect, onPreview }: SimplifiedImageItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box
            onClick={() => onPreview(photo)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '8px',
                '& img': {
                    display: 'block',
                    width: '100%',
                    transition: 'transform 0.2s ease-in-out',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                },
            }}
        >
            {/* Image */}
            <img src={photo.src} alt={photo.alt} style={{ aspectRatio: `${photo.width} / ${photo.height}` }} />

            {/* Selection Checkbox Overlay */}
            <Box
                onClick={(e) => {
                    e.stopPropagation(); // Prevent onPreview from firing when clicking checkbox
                    onToggleSelect(photo);
                }}
                sx={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    color: 'white',
                    opacity: photo.isSelected || isHovered ? 1 : 0,
                    transition: 'opacity 0.2s ease-in-out',
                }}
            >
                {photo.isSelected ? (
                    <CheckCircleIcon sx={{ fontSize: '28px', background: 'rgba(0,0,0,0.3)', borderRadius: '50%' }} />
                ) : (
                    <RadioButtonUncheckedIcon sx={{ fontSize: '28px', background: 'rgba(0,0,0,0.3)', borderRadius: '50%' }} />
                )}
            </Box>
        </Box>
    );
}