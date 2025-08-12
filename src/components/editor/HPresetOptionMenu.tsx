import React from "react";
import { Menu, MenuItem, ListItemText, CardMedia, Stack } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

interface Props {
    anchorEl: null | HTMLElement;
    isOpen: boolean;
    onClose: () => void;
    isPresetSelected?: boolean;
    onRemove: () => void;
    onRename: () => void;
    onDelete: () => void;
}

export default function HPresetOptionsMenu(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();

    return (
        <Menu
            id="preset-options-menu"
            anchorEl={props.anchorEl}
            open={props.isOpen}
            onClose={props.onClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: colors.onBackground,
                        color: colors.surface,
                        border: `1px solid ${colors.onSurfaceVariant1}`,
                        '& .MuiMenuItem-root:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        },
                    },
                },
            }}
        >
            {props.isPresetSelected && (
                <MenuItem onClick={props.onRemove}>
                    <Stack direction="row" spacing="10px">
                        <CardMedia
                            component="img"
                            image="/v1/svg/remove-preset-menu-button.svg"
                            sx={{ width: '20px', height: '20px' }}
                        />
                        <ListItemText sx={{ ...typography.bodyMedium }}>Remove Preset</ListItemText>
                    </Stack>
                </MenuItem>
            )}
            <MenuItem onClick={props.onRename}>
                <Stack direction="row" spacing="10px">
                    <CardMedia
                        component="img"
                        image="/v1/svg/rename-menu-button.svg"
                        sx={{ width: '20px', height: '20px' }}
                    />
                    <ListItemText sx={{ ...typography.bodyMedium }}>Rename</ListItemText>
                </Stack>
            </MenuItem>
            <MenuItem onClick={props.onDelete}>
                <Stack direction="row" spacing="10px">
                    <CardMedia
                        component="img"
                        image="/v1/svg/delete-menu-button.svg"
                        sx={{ width: '20px', height: '20px' }}
                    />
                    <ListItemText sx={{ ...typography.bodyMedium, color: colors.error }}>Delete</ListItemText>
                </Stack>
            </MenuItem>
        </Menu>
    );
}