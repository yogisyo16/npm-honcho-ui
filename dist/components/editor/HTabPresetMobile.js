import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, IconButton, CardMedia, Button } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
// Static `presets` array has been removed.
export default function HTabPresetMobile(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    return (_jsx(_Fragment, { children: _jsxs(Stack, { direction: "column", spacing: 0, sx: { px: "0px", mx: "0px" }, children: [props.presets.map((preset) => (_jsxs(Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", children: [_jsx(Button, { sx: { ...typography.bodyMedium, color: colors.surface, justifyContent: 'flex-start', flexGrow: 1, textTransform: 'none' }, onClick: () => props.onSelectPreset(preset.id), children: preset.name }), _jsxs(Stack, { direction: "row", alignItems: "center", spacing: 1, children: [props.selectedPreset === preset.id && (_jsx(CardMedia, { component: "img", image: "v1/svg/check-ratio-editor.svg", sx: { width: "20px", height: "20px", px: "2px" } })), _jsx(IconButton, { "aria-label": preset.name, sx: { px: "8px" }, onClick: (event) => props.presetOptionModal(event, preset.id), children: _jsx(CardMedia, { component: "img", image: "/v1/svg/dots-editor.svg", alt: "Options" }) })] })] }, preset.id))), _jsx(Button, { variant: "text", sx: { color: colors.surface, border: "1px solid", borderColor: colors.surface, borderRadius: "40px", mt: "12px", textTransform: 'none' }, onClick: props.onOpenPresetModal, children: "Create Preset" })] }) }));
}
