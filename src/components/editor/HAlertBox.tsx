import React from "react";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useColors from '../../themes/colors';

export function HAlertInternetBox() {
    const colors = useColors();
    return (
        <Alert icon={<img src="v1/svg/check-ratio-editor.svg"/>} 
            sx={{ position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',

                width: { xs: '90%', sm: 'auto' },
                zIndex: 1300,

                backgroundColor: colors.onBackground,
                color: colors.surface 
            }}
        >
            No Internet Connection
        </Alert>
    );
}

export function HAlertCopyBox() {
    const colors = useColors();
    return (
        <Alert 
            icon={<img src="v1/svg/check-ratio-editor.svg"/>} 
            sx={{ position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',

                width: { xs: '90%', sm: 'auto' },
                zIndex: 1300,

                backgroundColor: colors.onBackground,
                color: colors.surface 
            }}
        >
            Copied!
        </Alert>
    );
}

interface InternetConProps {
    onClose: () => void;
}

export function HAlertInternetConnectionBox(props: InternetConProps) {
    const colors = useColors();
    return (
        <Alert
            icon={<img src="v1/svg/check-ratio-editor.svg"/>} 
            sx={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: 'auto' },
                zIndex: 1300,
                backgroundColor: colors.onBackground,
                color: colors.surface 
            }}
            // Use the 'action' prop for the close button
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={props.onClose}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        >
            Connection Problem
        </Alert>
    );
}

export function HAlertPresetSave() {
    const colors = useColors();
    return (
        <Alert icon={<img src="v1/svg/check-ratio-editor.svg"/>} 
            sx={{ position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',

                width: { xs: '90%', sm: 'auto' },
                zIndex: 1300,

                backgroundColor: colors.onBackground,
                color: colors.surface 
            }}
        >
            Saved
        </Alert>
    );
}