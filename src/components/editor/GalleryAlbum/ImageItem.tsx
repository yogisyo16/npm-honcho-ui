// import { CSSProperties, useMemo } from "react";
// import { Box, CardMedia, useTheme } from "@mui/material";
// import { TickCircle } from "iconsax-react";

// import CustomTickIcon from "@/assets/svg/Tick";
// import { useImageProcessor } from "@/lib/hooks/useImageProcessor";
// import type { AdjustmentValues } from "@/lib/honcho-editor";

// import { GallerySetup } from "../../../hooks/editor/type";
// import { neutral } from "@/color";
// import { log } from "@/utils/logger";

// const imgStyle = {
// 	transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
// 	width: "100%",
// 	// objectFit: "contain",
// 	//height: "100%",
// };
// const selectedImgStyle = {
// 	borderRadius: "8px",
// 	transform: "translateZ(0px) scale3d(1, 1, 1)",
// 	// transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
// };

// interface PhotoProps<T> {
// 	src: string;
// 	alt: string;
// 	width: number;
// 	height: number;
// 	key: string;
// 	// other properties
// 	photo?: T;
// }

// interface Props {
// 	margin?: any;
// 	index: number;
// 	photo: PhotoProps<GallerySetup>;
// 	// onClick: renderImageClickHandler | null
// 	direction: "row" | "column";

// 	isSelectedMode: boolean;
// 	isFullScreenMode: boolean; // this preview Mode we plan to use this component on there
// 	isSelected: boolean;
// 	isHiddenGallery: boolean;
// 	onToggleSelect: () => void;
// 	onPreview: () => void;
// 	onSelectedMode: () => void;

// 	// NEW: Editor interceptor props
// 	enableEditor?: boolean;
// 	adjustments?: Partial<AdjustmentValues>;
// 	frame?: string | null;
// }

// const ImageItem = (props: Props) => {
// 	const { photo, margin, enableEditor = true, adjustments, frame } = props;
// 	const theme = useTheme();
	
// 	// Memoize adjustments to prevent infinite re-renders
// 	const memoizedAdjustments = useMemo(() => ({
// 		...adjustments,
// 		exposure: 50,
// 	}), [adjustments]);
	
// 	// Use the image processor hook
// 	const { processedImageSrc, isProcessingComplete } = useImageProcessor({
// 		photoId: photo.key,
// 		photoSrc: photo.src,
// 		enableEditor,
// 		adjustments: memoizedAdjustments,
// 		frame
// 	});

// 	const styleHiddenGallery: CSSProperties = useMemo(() => {
// 		if (props.isHiddenGallery) {
// 			return { filter: "blur(20px)", pointerEvents: "none" };
// 		} else {
// 			return {};
// 		}
// 	}, [props.isHiddenGallery]);

// 	const commonStyle = useMemo(() => {
// 		return {
// 			backgroundColor: neutral.white,
// 			overflow: "hidden",
// 			position: "relative",
// 			width: "100%",
// 			aspectRatio: `${photo.width}/${photo.height}`,
// 		};
// 	}, [props.direction, props.photo]);

// 	const handleImageClick = () => {
// 		log.debug(
// 			{
// 				isFullMode: props.isFullScreenMode,
// 				isShowGallery: props.isHiddenGallery,
// 			},
// 			"handleImageClick"
// 		);
// 		if (!props.isFullScreenMode && !props.isHiddenGallery) {
// 			if (props.isSelectedMode) {
// 				log.debug("handleImageClick with toggle select");
// 				props.onToggleSelect();
// 			} else {
// 				log.debug("handleImageClick with preview");
// 				props.onPreview();
// 			}
// 		}
// 	};

// 	const handleImageSelectedIconClick = () => {
// 		log.debug("handleImageSelectedIconClick");
// 		if (!props.isFullScreenMode) {
// 			if (!props.isSelectedMode) {
// 				props.onSelectedMode();
// 			}
// 			props.onToggleSelect();
// 		}
// 	};

// 	const imageSx = useMemo(() => {
// 		const baseStyles = props.isSelected ? {
// 			...imgStyle,
// 			...selectedImgStyle,
// 			...styleHiddenGallery,
// 			aspectRatio: `${photo.width}/${photo.height}`,
// 		} : {
// 			...imgStyle,
// 			...styleHiddenGallery,
// 		};
		
// 		return {
// 			...baseStyles,
// 			opacity: isProcessingComplete ? 1 : 0,
// 			transition: 'opacity 0.3s ease-in-out',
// 		};
// 	}, [props.isSelected, styleHiddenGallery, photo.width, photo.height, isProcessingComplete]);

// 	const boxNotSelected = useMemo(
// 		() => ({
// 			margin,
// 			// height: photo.height,
// 			width: "100%",
// 			...commonStyle,
// 			transition: ".3s",
// 			// "&:hover": { padding: "12px", backgroundColor: "primary.light1" },
// 			"&:-webkit-transition": { transition: ".3s" },
// 			"&:hover > .checkbox": { display: props.isHiddenGallery ? "" : "block" },
// 			cursor:
// 				props.isFullScreenMode || props.isHiddenGallery ? "inherit" : "pointer",
// 			backgroundColor: props.isFullScreenMode
// 				? "rgba(0,0,0,0.1)"
// 				: "transparent",
// 		}),
// 		[margin, commonStyle, props.isHiddenGallery, props.isFullScreenMode]
// 	);

// 	const boxSelected = useMemo(
// 		() => ({
// 			margin,
// 			// height: photo.height,
// 			width: "100%",
// 			...commonStyle,
// 			cursor:
// 				props.isFullScreenMode || props.isHiddenGallery ? "inherit" : "pointer",
// 			transition: ".3s",
// 			"&:-webkit-transition": { transition: ".3s" },
// 			padding: { xs: "13px 12px", sm: "21.31px 25.56px 21.32px 27.68px" },
// 			backgroundColor: theme.palette.light["Surface-Variant-2"],
// 		}),
// 		[
// 			margin,
// 			commonStyle,
// 			theme.palette.light,
// 			props.isFullScreenMode,
// 			props.isHiddenGallery,
// 		]
// 	);

// 	const boxOuterSx = useMemo(() => {
// 		if (props.isFullScreenMode) {
// 			return {
// 				margin,
// 				width: "100%",
// 				...commonStyle,
// 			};
// 		} else {
// 			if (props.isSelected) {
// 				return { ...boxSelected };
// 			} else {
// 				return { ...boxNotSelected };
// 			}
// 		}
// 	}, [
// 		props.isFullScreenMode,
// 		photo.height,
// 		photo.width,
// 		commonStyle,
// 		boxSelected,
// 		boxNotSelected,
// 		margin,
// 		props.isSelected,
// 	]);

// 	return (
// 		<Box id={"Box_image"} key={photo.key} sx={boxOuterSx} className={"image"}>
// 			{!props.isHiddenGallery &&
// 				(props.isSelected ? (
// 					<Box
// 						color={"primary.dark1"}
// 						onClick={handleImageSelectedIconClick}
// 						sx={{
// 							position: "absolute",
// 							width: "19px",
// 							height: "19px",
// 							zIndex: "2",
// 							left: "5px",
// 							top: "5px",
// 							borderRadius: { xs: "50%", sm: 0 },
// 						}}
// 						className={"checkbox"}
// 					>
// 						<CustomTickIcon />
// 					</Box>
// 				) : (
// 					<Box
// 						color={"neutral.light2"}
// 						onClick={handleImageSelectedIconClick}
// 						sx={{
// 							position: "absolute",
// 							width: "19px",
// 							height: "19px",
// 							zIndex: "1",
// 							left: "5px",
// 							top: "5px",
// 							display: "none",
// 							visibility: {
// 								xs: props.isSelectedMode ? "visible" : "hidden",
// 								sm: "visible",
// 							},
// 						}}
// 						className={"checkbox"}
// 					>
// 						<TickCircle
// 							style={{ width: "24px", height: "24px" }}
// 							color="white"
// 						/>
// 					</Box>
// 				))}

// 			<CardMedia
// 				id="card_media"
// 				component="img"
// 				className="image"
// 				loading="lazy"
// 				alt={photo.alt}
// 				sx={imageSx}
// 				src={processedImageSrc}
// 				width="100%"
// 				onClick={handleImageClick}
// 			/>
// 		</Box>
// 	);
// };

// export default ImageItem;
