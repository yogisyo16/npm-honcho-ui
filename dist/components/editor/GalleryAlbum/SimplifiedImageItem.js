import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
export default function SimplifiedImageItem({ photo, onToggleSelect, onPreview }) {
    const [isHovered, setIsHovered] = useState(false);
    return (_jsxs(Box, { onClick: () => onPreview(photo), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), sx: {
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
        }, children: [_jsx("img", { src: photo.src, alt: photo.alt, style: { aspectRatio: `${photo.width} / ${photo.height}` } }), _jsx(Box, { onClick: (e) => {
                    e.stopPropagation(); // Prevent onPreview from firing when clicking checkbox
                    onToggleSelect(photo);
                }, sx: {
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    color: 'white',
                    opacity: photo.isSelected || isHovered ? 1 : 0,
                    transition: 'opacity 0.2s ease-in-out',
                }, children: photo.isSelected ? (_jsx(CheckCircleIcon, { sx: { fontSize: '28px', background: 'rgba(0,0,0,0.3)', borderRadius: '50%' } })) : (_jsx(RadioButtonUncheckedIcon, { sx: { fontSize: '28px', background: 'rgba(0,0,0,0.3)', borderRadius: '50%' } })) })] }));
}
