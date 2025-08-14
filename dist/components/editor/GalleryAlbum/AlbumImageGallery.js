"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Stack } from "@mui/material";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GalleryImageItem from "./ImageItem";
export const AlbumImageGallery = (props) => {
    const { imageCollection, isSelectedMode, isHiddenGallery, enableEditor, // Destructure the new prop
    onPreview, onSelectedMode, onToggleSelect, } = props;
    console.log("imageCollection: ", imageCollection);
    return (_jsx(Stack, { sx: { width: '100%', maxHeight: '100%', overflowY: 'auto' }, children: _jsx(ResponsiveMasonry, { columnsCountBreakPoints: { 750: 2, 900: 4 }, children: _jsx(Masonry, { children: imageCollection.map((photo, index) => {
                    // This guard clause is still important for runtime safety.
                    if (!photo.key || !photo.src) {
                        console.warn("Skipping item without a key or src:", photo);
                        return null;
                    }
                    // NEW: Create a new object that matches the 'PhotoProps' interface.
                    // This explicitly tells TypeScript that all required fields are present.
                    const imageItemPhotoProps = {
                        key: photo.key,
                        src: photo.src,
                        width: photo.width,
                        height: photo.height,
                        alt: photo.alt,
                        // We pass the original photo object in the generic 'photo' property
                        // in case ImageItem needs it for other operations.
                        photo: photo,
                    };
                    return (_jsx(Box, { sx: { m: 0.5 }, children: _jsx(GalleryImageItem, { margin: "0px", index: index, 
                            // UPDATED: Pass the new, correctly-typed object.
                            photo: imageItemPhotoProps, direction: "column", isFullScreenMode: false, isSelected: photo.isSelected, isSelectedMode: isSelectedMode, isHiddenGallery: isHiddenGallery, onPreview: () => { onPreview(photo); }, onSelectedMode: onSelectedMode, onToggleSelect: () => { onToggleSelect(photo); }, enableEditor: enableEditor, adjustments: photo.adjustments, frame: photo.frame, data: photo }) }, photo.key));
                }) }) }) }));
};
