import { CSSProperties, useMemo } from "react";
import { Box, CardMedia, useTheme } from "@mui/material";
import { TickCircle } from "iconsax-react";

import CustomTickIcon from "../svg/Tick";
import type { AdjustmentValues } from "../../../lib/editor/honcho-editor";

import { GallerySetup } from "../../../hooks/editor/type";
import { neutral } from "../../../color";

const initialAdjustments: AdjustmentValues = {
    temperature: 0, tint: 0, saturation: 0, vibrance: 0, exposure: 0, contrast: 0, 
    highlights: 0, shadows: 0, whites: 0, blacks: 0, clarity: 0, sharpness: 0,
};

const imgStyle = {
	transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
	width: "100%",
	// objectFit: "contain",
	//height: "100%",
};
const selectedImgStyle = {
	borderRadius: "8px",
	transform: "translateZ(0px) scale3d(1, 1, 1)",
	// transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};

interface PhotoProps<T> {
	src: string;
	alt?: string;
	width: number;
	height: number;
	key: string;
	// other properties
	//photo?: T;
}

interface Props {
	margin?: any;
	index: number;
	photo: PhotoProps<GallerySetup>;
	data: GallerySetup;
	// onClick: renderImageClickHandler | null
	direction: "row" | "column";

	isSelectedMode: boolean;
	isFullScreenMode: boolean; // this preview Mode we plan to use this component on there
	isSelected?: boolean;
	isHiddenGallery: boolean;
	onToggleSelect: () => void;
	onPreview: () => void;
	onSelectedMode: () => void;

	// NEW: Editor interceptor props
	enableEditor?: boolean;
	adjustments?: Partial<AdjustmentValues>;
	frame?: string | null;
}

const GalleryImageItem = (props: Props) => {
	const { photo, margin, adjustments, isSelected = false, data } = props;
	const theme = useTheme();
	const imageData = data;

	console.debug("Image src", imageData.src);
	
	const hasAdjustments = useMemo(() => {
        if (!adjustments) return false;
        return Object.keys(initialAdjustments).some(
            key => adjustments[key as keyof AdjustmentValues] !== initialAdjustments[key as keyof AdjustmentValues]
        );
    }, [adjustments]);

	const styleHiddenGallery: CSSProperties = useMemo(() => {
		if (props.isHiddenGallery) {
			return { filter: "blur(20px)", pointerEvents: "none" };
		} else {
			return {};
		}
	}, [props.isHiddenGallery]);

	const commonStyle = useMemo(() => {
		return {
			backgroundColor: neutral.white,
			overflow: "hidden",
			position: "relative",
			width: "100%",
			aspectRatio: `${photo.width}/${photo.height}`,
		};
	}, [props.direction, props.photo]);

	const handleImageClick = () => {
		console.debug(
			{
				isFullMode: props.isFullScreenMode,
				isShowGallery: props.isHiddenGallery,
			},
			"handleImageClick"
		);
		if (!props.isFullScreenMode && !props.isHiddenGallery) {
			if (props.isSelectedMode) {
				console.debug("handleImageClick with toggle select");
				props.onToggleSelect();
			} else {
				console.debug("handleImageClick with preview");
				props.onPreview();
			}
		}
	};

	const handleImageSelectedIconClick = () => {
		console.debug("handleImageSelectedIconClick");
		if (!props.isFullScreenMode) {
			if (!props.isSelectedMode) {
				props.onSelectedMode();
			}
			props.onToggleSelect();
		}
	};

	const imageSx = useMemo(() => {
		const baseStyles = isSelected ? {
			...imgStyle,
			...selectedImgStyle,
			...styleHiddenGallery,
			aspectRatio: `${photo.width}/${photo.height}`,
		} : {
			...imgStyle,
			...styleHiddenGallery,
		};
		
		return {
			...baseStyles,
			opacity: 1, // Previously depended on isProcessingComplete
			transition: 'opacity 0.3s ease-in-out',
		};
	}, [isSelected, styleHiddenGallery, photo.width, photo.height]);

	const boxNotSelected = useMemo(
		() => ({
			margin,
			// height: photo.height,
			...commonStyle,
			transition: ".3s",
			// "&:hover": { padding: "12px", backgroundColor: "primary.light1" },
			"&:-webkit-transition": { transition: ".3s" },
			"&:hover > .checkbox": { display: props.isHiddenGallery ? "" : "block" },
			cursor:
				props.isFullScreenMode || props.isHiddenGallery ? "inherit" : "pointer",
			backgroundColor: props.isFullScreenMode
				? "rgba(0,0,0,0.1)"
				: "transparent",
		}),
		[margin, commonStyle, props.isHiddenGallery, props.isFullScreenMode]
	);

	const boxSelected = useMemo(
		() => ({
			margin,
			// height: photo.height,
			...commonStyle,
			cursor:
				props.isFullScreenMode || props.isHiddenGallery ? "inherit" : "pointer",
			transition: ".3s",
			"&:-webkit-transition": { transition: ".3s" },
			padding: { xs: "13px 12px", sm: "21.31px 25.56px 21.32px 27.68px" },
		}),
		[
			margin,
			commonStyle,
			theme.palette.light,
			props.isFullScreenMode,
			props.isHiddenGallery,
		]
	);

	const boxOuterSx = useMemo(() => {
		if (props.isFullScreenMode) {
			return {
				margin,
				...commonStyle,
			};
		} else {
			if (props.isSelected) {
				return { ...boxSelected };
			} else {
				return { ...boxNotSelected };
			}
		}
	}, [
		props.isFullScreenMode,
		photo.height,
		photo.width,
		commonStyle,
		boxSelected,
		boxNotSelected,
		margin,
		props.isSelected,
	]);

	return (
		<Box id={"Box_image"} key={photo.key} sx={boxOuterSx} className={"image"}>
			{!props.isHiddenGallery &&
				(hasAdjustments && isSelected ? (
					<Box
						color={"primary.dark1"}
						onClick={handleImageSelectedIconClick}
						sx={{
							position: "absolute",
							// width: "19px",
							// height: "19px",
							// zIndex: "2",
							// left: "5px",
							// top: "5px",
							borderRadius: { xs: "50%", sm: 0 },
						}}
						className={"checkbox"}
					>
						<CustomTickIcon />
					</Box>
				) : (
					<Box
						// color={"neutral.light2"}
						onClick={handleImageSelectedIconClick}
						sx={{
							position: "absolute",
							width: "19px",
							height: "19px",
							zIndex: "1",
							left: "5px",
							top: "5px",
							display: "none",
							visibility: {
								xs: props.isSelectedMode ? "visible" : "hidden",
								sm: "visible",
							},
						}}
						className={"checkbox"}
					>
						<TickCircle
							style={{ width: "24px", height: "24px" }}
							color="white"
						/>
					</Box>
				))}

			<CardMedia
				id="card_media"
				component="img"
				className="image"
				loading="lazy"
				alt={imageData.alt ?? "Image"}
				sx={imageSx}
				src={imageData.src}
				width="100%"
				onClick={handleImageClick}
			/>
		</Box>
	);
};

export default GalleryImageItem;
