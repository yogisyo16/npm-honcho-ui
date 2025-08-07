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
export interface Gallery {
    id: string;
    uid: string;
    event_id: string;
    download: Content;
    download_edited: Content;
    raw?: Content;
    raw_edited?: Content;
    original?: Content;
    original_edited?: Content;
    large?: Content;
    large_edited?: Content;
    medium?: Content;
    medium_edited?: Content;
    small?: Content;
    small_edited?: Content;
    mini?: Content;
    mini_edited?: Content;
    create_from?: string[];
    thumbnail: Content;
    thumbnail_edited: Content;
    is_original: boolean;
    available: boolean;
    show_gallery: boolean;
    log: Log;
}
export {};
