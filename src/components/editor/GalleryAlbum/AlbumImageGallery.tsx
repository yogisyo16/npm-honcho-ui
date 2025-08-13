// "use client";

// import React from "react";
// import { Box } from "@mui/material";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
// import ImageItem from "../GalleryAlbum/ImageItem";
// import { GallerySetup } from "../../../hooks/editor/type";

// interface ImageGalleryProps {
// 	imageCollection: GallerySetup[];
// 	isSelectedMode: boolean;
// 	isHiddenGallery: boolean;
// 	onPreview: (photo: unknown) => () => void;
// 	onSelectedMode: () => void;
// 	onToggleSelect: (photo: unknown) => () => void;
// }

// const AlbumImageGallery: React.FC<ImageGalleryProps> = (props) => {
// 	const {
// 		imageCollection,
// 		isSelectedMode,
// 		isHiddenGallery,
// 		onPreview,
// 		onSelectedMode,
// 		onToggleSelect,
// 	} = props;

// 	return (
// 		<section>
// 			<ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 4 }}>
// 				<Masonry>
// 					{imageCollection.map((photo, index) => (
// 						<Box key={photo.key} sx={{ m: 0.5 }}>
// 							<ImageItem
// 								margin="0px"
// 								index={index}
// 								photo={photo}
// 								direction="column"
// 								isFullScreenMode={false}
// 								isSelected={photo.isSelected}
// 								isSelectedMode={isSelectedMode}
// 								isHiddenGallery={isHiddenGallery}
// 								onPreview={onPreview(photo)}
// 								onSelectedMode={onSelectedMode}
// 								onToggleSelect={onToggleSelect(photo)}
// 								frame={photo.frame}
// 							/>
// 						</Box>
// 					))}
// 				</Masonry>
// 			</ResponsiveMasonry>
// 		</section>
// 	);
// };

// export default AlbumImageGallery;
