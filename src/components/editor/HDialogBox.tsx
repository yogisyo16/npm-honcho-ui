import {
    Button,
    Dialog,
    DialogActions,
    DialogContent, IconButton,
    Stack,
    Typography,
} from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
import React, {ReactElement} from "react";
import {CloseOutlined} from "@mui/icons-material";

interface Props {
    open: boolean;
    title: React.ReactNode
    description?: React.ReactNode | ReactElement;
    onClose?: () => void;
    action?: React.ReactNode
    //Preset only
    actionAdjust?: React.ReactNode
}

export function HBaseDialog(props: Props) {
    const colors = useColors();
    const typography = useHonchoTypography();

    return (
        <Dialog
            disableScrollLock
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="responsive-dialog-title"
            PaperProps={{
                sx: {
                    borderRadius: "28px",
                    width: { xs: "328px", sm: "456px", md: "456px" },
                    // maxWidth: { xs: 328, sm: "456px", md: "456px" },
                    //maxHeight: 306,
                    // margin: { xs: 0, sm: "auto" },
                },
            }}>
            <DialogContent
                sx={{ pb: "16px", mb: "0px" }}
            >
                <Stack direction="column">
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography></Typography>
                        <Typography
                            color={colors.onSurface}
                            sx={{ ...typography.titleMedium }}>
                            {props.title}
                        </Typography>
                        <CloseButton onClick={props.onClose}/>
                    </Stack>
                    <Typography
                        variant="bodyMedium"
                        color={colors.onSurface}>
                        {props.description}
                    </Typography>
                </Stack>
            </DialogContent>
            {props.action && (
                <DialogContent
                    sx={{ pt: "0px", mt: "0px" }}
                >
                    <Stack alignItems="center" width="100%">
                        {props.action}
                    </Stack>
                </DialogContent>
            )}
        </Dialog>
    );
}

export function HDialogForPreset(props: Props) {
    const colors = useColors();
    const typography = useHonchoTypography();

    return (
        <Dialog
            disableScrollLock
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="responsive-dialog-title"
            PaperProps={{
                sx: {
                    borderRadius: "28px",
                    maxWidth: { xs: 328, sm: "456px", md: "456px" },
                    //maxHeight: 306,
                    margin: { xs: 0, sm: "auto" },
                },
            }}>
            <DialogContent
                sx={{ padding: { xs: "24px 24px 0 24px", sm: "24 24px 0 24px" } }}>
                <Stack spacing={0} direction="column">
                    <Stack direction={"row"} alignItems="center" justifyContent="space-between">
                        <Typography
                            color={colors.onSurface}
                            sx={{ ...typography.labelLarge }}>
                            {props.title}
                        </Typography>
                        {/* <CloseButton onClick={props.onClose}/> */}
                    </Stack>
                    <Stack direction="column" sx={{ pt: "12px" }}>
                        <Stack sx={{ pt: "20px", pb: "20px" }}>
                            {props.action}
                        </Stack>
                        <Stack>
                            <Typography
                                variant="bodyMedium"
                                color={colors.onSurface}>
                                {props.description}
                            </Typography>
                            {props.actionAdjust}
                        </Stack>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

interface ButtonProps {
    text: string
    onClick: () => void;
}

export function PositiveButton(props: ButtonProps) {
    const colors = useColors();

    return (
        <Button
            variant="text"
            sx={{
                ":hover": {
                    backgroundColor: "transparent",
                },
            }}
            onClick={props.onClick}>
            <Typography
                variant="buttonMedium"
                color={colors.onSurface}>
                {props.text}
            </Typography>
        </Button>
    )
}

export function NegativeButton(props: ButtonProps) {
    const colors = useColors();

    return (
        <Button
            variant="text"
            sx={{
                borderRadius: 100,
                color: colors.error,
                ":hover": {
                    backgroundColor: "transparent",
                },
            }}
            disabled={false}
            onClick={props.onClick}>
            {props.text}
        </Button>
    )
}

interface CloseButtonProps {
    onClick?: () => void;
}

function CloseButton(props: CloseButtonProps) {
    return (
        <IconButton onClick={props.onClick}>
            <CloseOutlined htmlColor="black" />
        </IconButton>
    )
}