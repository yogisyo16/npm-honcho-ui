import React from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
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

// Create modal for any usage coverage
export default function HModalEditorDekstop(props: Props) {
    const colors = useColors();
    const typography = useHonchoTypography();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 6,
        spacing: 6,
    };
    return (
        <>
            <Modal
            open={props.modalOpen}
            onClose={props.modalClose}
            >
                <Box sx={style}>
                    <Typography variant="h6" color="initial">
                        {props.modalTitle}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        {props.children}
                    </Box>
                    <Typography color="initial">
                        {props.modalInformation}
                    </Typography>
                    <Stack>
                        {props.action}
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
                        <Button sx={{ ...typography.labelMedium, color: colors.onSurface, backgroundColor: colors.surface, }} onClick={props.modalClose}>
                            Cancel
                        </Button>
                        <Button sx={{ ...typography.labelMedium, color: colors.onSurface, backgroundColor: colors.surface, }} onClick={props.onConfirm}>
                            Save
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}