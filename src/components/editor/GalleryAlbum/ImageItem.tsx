import { useMemo } from "react";
import { Box, CardMedia, useTheme } from "@mui/material";
import type { AdjustmentValues } from "../../../lib/editor/honcho-editor";
import { neutral } from "../../../color";
import { PhotoData } from "../../../hooks/editor/useHonchoEditorBulk";

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

interface Props {
	margin?: any;
	index: number;
	data: PhotoData;
	// onClick: renderImageClickHandler | null
	direction: "row" | "column";

	onToggleSelect: () => void;
}

const GalleryImageItem = (props: Props) => {
	const { margin, data } = props;
	const theme = useTheme();
	const imageData = data;

	const commonStyle = useMemo(() => {
		return {
			backgroundColor: neutral.white,
			overflow: "hidden",
			position: "relative",
			width: "100%",
			aspectRatio: `${imageData.width}/${imageData.height}`,
		};
	}, [props.direction, imageData]);

	const imageSx = useMemo(() => {
		const baseStyles = imageData.isSelected ? {
			...imgStyle,
			...selectedImgStyle,
			aspectRatio: `${imageData.width}/${imageData.height}`,
		} : {
			...imgStyle,
		};
		
		return {
			...baseStyles,
			opacity: 1, // Previously depended on isProcessingComplete
			transition: 'opacity 0.3s ease-in-out',
		};
	}, [props.data.isSelected, imageData.width, imageData.height]);

	const boxNotSelected = useMemo(
		() => ({
			margin,
			// height: photo.height,
			...commonStyle,
			transition: ".3s",
			// "&:hover": { padding: "12px", backgroundColor: "primary.light1" },
			"&:-webkit-transition": { transition: ".3s" },
			"&:hover > .checkbox": { display: "block" },
			cursor: "pointer",
			backgroundColor: "transparent",
		}),
		[margin, commonStyle]
	);

	const boxSelected = useMemo(
		() => ({
			margin,
			// height: photo.height,
			...commonStyle,
			cursor: "pointer",
			transition: ".3s",
			"&:-webkit-transition": { transition: ".3s" },
			padding: { xs: "13px 12px", sm: "21.31px 25.56px 21.32px 27.68px" },
		}),
		[
			margin,
			commonStyle,
			theme.palette.light,
		]
	);

	const boxOuterSx = useMemo(() => {
		if (props.data.isSelected) {
			return { ...boxSelected };
		} else {
			return { ...boxNotSelected };
		}
	}, [imageData.height, imageData.width, commonStyle, boxSelected, boxNotSelected, margin]);

	return (
		<Box id={"Box_image"} key={imageData.key} sx={boxOuterSx} className={"image"}>
			<CardMedia
				id="card_media"
				component="img"
				className="image"
				loading="lazy"
				alt={imageData.alt ?? "Image"}
				sx={imageSx}
				src={imageData.src}
				width="100%"
				onClick={props.onToggleSelect}
			/>
		</Box>
	);
};

export default GalleryImageItem;
