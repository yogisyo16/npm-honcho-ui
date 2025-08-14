interface Log {
	created_at: string;
	updated_at: string;
}

export interface Content {
  key: string;
  path: string;
  size: number;
  width: number;
  height: number;
}

export interface ColorAdjustment {
	temperature: number;
	tint: number;
	saturation: number;
	vibrance: number;
	exposure: number;
	contrast: number;
	highlights: number;
	shadows: number;
	whites: number;
	blacks: number;
	clarity: number;
	sharpness: number;
}

export interface TransformationAdjustment {
	angle_score?: number;
	direction?: "cw" | "ccw";
	scale_score?: number;
	keep_dimension?: boolean;
	flip_mode?: "horizontal" | "vertical" | "mix";
	aspect_ratio?: string;
	width?: number;
	height?: number;
}

export interface Watermark {
	path: string;
	max_pct: [number, number];
	anchor: [string, number | null, number[] | null];
	rotate_deg: [number, "cw" | "ccw"];
}

export interface EditorConfig {
	color_adjustment: ColorAdjustment;
	transformation_adjustment: TransformationAdjustment[];
	watermarks: Watermark[];
}

export interface Content {
    key: string;
    path: string;
    size: number;
    width: number;
    height: number;
}

export interface GallerySetup {
  src: string;
  original: string;
  srcSet?: string | string[] | undefined;
  sizes?: string | string[] | undefined;
  width: number;
  height: number;
  alt: string | undefined;
  key: string | undefined;
  frame?: string | undefined;
  isSelected?: boolean | undefined;
}

export interface Gallery {
	id: string;
	uid: string;
	event_id: string;
	download: Content;
	download_edited: Content
	raw?: Content;
	raw_edited?: Content;
	raw_preview?: Content;
	raw_thumbnail?: Content;
	original?: Content;
	original_edited?: Content
	large?: Content;
	large_edited?: Content
	medium?: Content
	medium_edited?: Content
	small?: Content
	small_edited?: Content
	mini?: Content
	mini_edited?: Content
	create_from?: string[];
	thumbnail: Content;
	thumbnail_edited: Content
	is_original: boolean;
	available: boolean;
	show_gallery: boolean;
	editor_config?: EditorConfig;
	log: Log;
}

export interface ResponseGalleryPaging {
	gallery: Gallery[];
	limit: number;
	current_page: number;
	prev_page: number;
	next_page: number;
	sum_of_image?: number;
}