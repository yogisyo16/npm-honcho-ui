import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { TextField, Button, Stack } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HWatermarkView(props) {
    const colors = useColors();
    const typography = useHonchoTypography();
    return (_jsx(_Fragment, { children: _jsxs(Stack, { direction: "column", alignItems: "center", spacing: 5, sx: { pt: "20px", color: colors.surface }, children: [_jsx(TextField, { id: "watermark-name", label: "watermark name", variant: "standard", sx: {
                        '& .MuiInput-underline:before': {
                            borderBottomColor: colors.surface
                        },
                        '& .MuiInputBase-input': {
                            color: colors.surface
                        }
                    } }), _jsxs(Stack, { direction: "row", spacing: 0.5, children: [_jsx(Button, { variant: "text", sx: { color: colors.surface }, children: "Landscape" }), _jsx(Button, { variant: "text", sx: { color: colors.surface }, children: "Portrait" }), _jsx(Button, { variant: "text", sx: { color: colors.surface }, children: "Square" })] })] }) }));
}
