import { jsx as _jsx } from "react/jsx-runtime";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useColors from '../../themes/colors';
export function HAlertInternetBox() {
    const colors = useColors();
    return (_jsx(Alert, { icon: _jsx("img", { src: "v1/svg/check-ratio-editor.svg" }), sx: { position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 'auto' },
            zIndex: 1300,
            backgroundColor: colors.onBackground,
            color: colors.surface
        }, children: "No Internet Connection" }));
}
export function HAlertCopyBox() {
    const colors = useColors();
    return (_jsx(Alert, { icon: _jsx("img", { src: "v1/svg/check-ratio-editor.svg" }), sx: { position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 'auto' },
            zIndex: 1300,
            backgroundColor: colors.onBackground,
            color: colors.surface
        }, children: "Copied!" }));
}
export function HAlertInternetConnectionBox(props) {
    const colors = useColors();
    return (_jsx(Alert, { icon: _jsx("img", { src: "v1/svg/check-ratio-editor.svg" }), sx: {
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 'auto' },
            zIndex: 1300,
            backgroundColor: colors.onBackground,
            color: colors.surface
        }, 
        // Use the 'action' prop for the close button
        action: _jsx(IconButton, { "aria-label": "close", color: "inherit", size: "small", onClick: props.onClose, children: _jsx(CloseIcon, { fontSize: "inherit" }) }), children: "Connection Problem" }));
}
export function HAlertPresetSave() {
    const colors = useColors();
    return (_jsx(Alert, { icon: _jsx("img", { src: "v1/svg/check-ratio-editor.svg" }), sx: { position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 'auto' },
            zIndex: 1300,
            backgroundColor: colors.onBackground,
            color: colors.surface
        }, children: "Saved" }));
}
