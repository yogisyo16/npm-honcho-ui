import React from "react";
import { Modal, Box, Typography, Button, Stack, IconButton, CardMedia } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

interface Props {
    modalName: string;
    modalOpen: boolean;
    modalTitle: string;
    modalInformation: string;
    children: React.ReactNode;
    action?: React.ReactNode;
    modalClose: () => void;
    onConfirm: () => void;
}

export default function HModalMobile(props: Props) {
    const colors = useColors();

    return (
        <>
            <Modal
                open={props.modalOpen}
                onClose={props.modalClose}
            >
                <Stack direction="column" spacing={2} height="100%" sx={{ p: "10px", backgroundColor: colors.surface }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <IconButton aria-label="close" onClick={props.modalClose}>
                                <CardMedia component="img" image="/v1/svg/exit-button-modal-mobile.svg" />
                            </IconButton>
                            <Typography variant="h6" color="initial">{props.modalTitle}</Typography>
                        </Stack>
                        <Button onClick={props.onConfirm}>
                            Save
                        </Button>
                    </Stack>
                    <Typography variant="inherit" color="initial">{props.modalInformation}</Typography>
                    <Box sx={{ mt: 2 }}>
                        {props.children}
                    </Box>
                    <Stack sx={{ px: "2px" }}>
                        {props.action}
                    </Stack>
                </Stack>
            </Modal>
        </>
    )
}