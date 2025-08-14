"use client";

import React from "react";
import { Box } from "@mui/material";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GalleryImageItem from "./ImageItem";
import { GallerySetup } from "../../../hooks/editor/type";
import { AdjustmentValues } from "../../../lib/editor/honcho-editor"; // Adjust path if needed

// NEW: Define a more specific type for the photo object
// This ensures each photo can carry its own adjustment and frame data.
interface PhotoData extends GallerySetup {
	adjustments?: Partial<AdjustmentValues>;
	frame?: string;
}

// UPDATED: The main props interface for the gallery
interface ImageGalleryProps {
	imageCollection: PhotoData[]; // Use the more specific type
	isSelectedMode: boolean;
	isHiddenGallery: boolean;
	enableEditor: boolean; // Add prop to control editor state
	onPreview: (photo: PhotoData) => () => void;
	onSelectedMode: () => void;
	onToggleSelect: (photo: PhotoData) => () => void;
}

const AlbumImageGallery: React.FC<ImageGalleryProps> = (props) => {
	const {
		imageCollection,
		isSelectedMode,
		isHiddenGallery,
		enableEditor, // Destructure the new prop
		onPreview,
		onSelectedMode,
		onToggleSelect,
	} = props;

	return (
		<section>
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
									// UPDATED: Pass the new, correctly-typed object.
									photo={imageItemPhotoProps}
									direction="column"
									isFullScreenMode={false}
									isSelected={photo.isSelected}
									isSelectedMode={isSelectedMode}
									isHiddenGallery={isHiddenGallery}
									onPreview={onPreview(photo)}
									onSelectedMode={onSelectedMode}
									onToggleSelect={onToggleSelect(photo)}
									enableEditor={enableEditor}
									adjustments={photo.adjustments}
									frame={photo.frame}
								/>
							</Box>
						);
					})}
				</Masonry>
			</ResponsiveMasonry>
		</section>
	);
};

export default AlbumImageGallery;