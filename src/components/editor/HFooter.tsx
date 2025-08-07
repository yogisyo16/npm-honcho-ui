import { Button, Stack, IconButton, CardMedia, MenuItem, ListItemText , ListItemIcon, Typography, Menu } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
import React, { useState } from "react";

interface Props {
    anchorElZoom: null | HTMLElement;
    onScale: (event: React.MouseEvent<HTMLElement>) => void;
    onZoomMenuClose: () => void;
    zoomLevelText: string;
    onZoomAction: (zoomLevel: string) => void;
    onShowOriginal: () => void;
    onShowEdited: () => void;
}

export default function HFooter(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const isZoomMenuOpen = Boolean(props.anchorElZoom);

    return (
        <>
            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Button 
                    id="zoom-button"
                    onClick={props.onScale}
                    aria-controls={isZoomMenuOpen ? 'zoom-options-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isZoomMenuOpen ? 'true' : undefined}
                    sx={{
                        color: colors.surface,
                        fontSize: "14px",
                        '&.MuiButton-outlined': {
                            color: colors.surface,
                        },
                    }}
                    endIcon={<CardMedia component="img" image={isZoomMenuOpen ? "/v1/svg/expanded-editor.svg" : "/v1/svg/expand-editor.svg"} sx={{ width: "11.67px", height: "5.83px" }} />}
                >
                    {props.zoomLevelText}
                </Button>
                <IconButton
                    aria-label="before-after"
                    onMouseDown={props.onShowOriginal} // Mouse button down
                    onMouseUp={props.onShowEdited}     // Mouse button release
                    onMouseLeave={props.onShowEdited}  // In case mouse leaves while pressed
                    onTouchStart={props.onShowOriginal} // Finger touch down
                    onTouchEnd={props.onShowEdited}     // Finger touch release
                    sx={{ color: colors.outlineVariant }}
                >
                    <CardMedia component="img" title="before-after" image="/v1/svg/before-after-editor.svg" sx={{ width: "20px", height: "20px" }} />
                </IconButton>
                <Menu
                    id="zoom-options-menu"
                    anchorEl={props.anchorElZoom}
                    open={isZoomMenuOpen}
                    onClose={props.onZoomMenuClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    slotProps={{
                        paper: {
                            sx: {
                                backgroundColor: colors.onBackground,
                                color: colors.surface,
                                border: `1px solid ${colors.outlineVariant}`,
                            },
                        },
                    }}
                >
                    <MenuItem onClick={() => props.onZoomAction('in')}>
                        <ListItemText sx={{ ...typography.bodyMedium, color: colors.surface }}>Zoom in</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => props.onZoomAction('out')}>
                        <ListItemText sx={{ ...typography.bodyMedium, color: colors.surface }}>Zoom out</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => props.onZoomAction('fit')}>
                        <ListItemText sx={{ ...typography.bodyMedium, color: colors.surface }}>Zoom to fit</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => props.onZoomAction('50%')}>
                        <ListItemText sx={{ ...typography.bodyMedium, color: colors.surface }}>Zoom to 50%</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => props.onZoomAction('100%')}>
                        <ListItemText sx={{ ...typography.bodyMedium, color: colors.surface }}>Zoom to 100%</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => props.onZoomAction('200%')}>
                        <ListItemText sx={{ ...typography.bodyMedium, color: colors.surface }}>Zoom to 200%</ListItemText>
                    </MenuItem>
                </Menu>
            </Stack>
        </>
    )
}