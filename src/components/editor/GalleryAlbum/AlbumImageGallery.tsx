"use client";

import React from "react";
import { Box, Stack } from "@mui/material";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GalleryImageItem from "./ImageItem";
import type { PhotoData } from "../../../hooks/editor/useHonchoEditorBulk";

// UPDATED: The main props interface for the gallery
interface ImageGalleryProps {
	imageCollection: PhotoData[]; // Use the more specific type
	onToggleSelect: (photo: PhotoData) => void;
}

export const AlbumImageGallery: React.FC<ImageGalleryProps> = (props) => {
	const { imageCollection, onToggleSelect } = props;

	return (
		<Stack sx={{ width: '100%', maxHeight: '100%', overflowY: 'auto'}}>
			<ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 4 }}>
				<Masonry>
					{imageCollection.map((photo, index) => {
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

						return (
							<Box key={photo.key} sx={{ m: 0.5 }}>
								<GalleryImageItem
									margin="0px"
									index={index}
									direction="column"
									onToggleSelect={() => { onToggleSelect(photo) }}
                                    data={photo}
								/>
							</Box>
						);
					})}
				</Masonry>
			</ResponsiveMasonry>
		</Stack>
	);
};