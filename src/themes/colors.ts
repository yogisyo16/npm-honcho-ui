
interface Colors {
    onSurface: string;
    surface: string;
    onSurfaceVariant: string;
    onSurfaceVariant1: string;
    outlineVariant: string;
    error: string;
    onBackground: string;
    background: string;
}

export default function  useColors(): Colors {
    return {
        onSurface: "#1C1B1F",
        surface: "#FFFFFF",
        onSurfaceVariant: "#949494",
        onSurfaceVariant1: "#656369",
        outlineVariant: "#EDEDED",
        error: "#DC362E",
        onBackground: "#000000",
        background: "#FFFFFF"
    }
}