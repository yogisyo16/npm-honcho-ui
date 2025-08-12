import React from "react";
import { Stack, IconButton, CardMedia, MenuItem, ListItemText , ListItemIcon, Menu, Button, Typography } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
import useIsMobile from "../../utils/isMobile";

interface Props {
    anchorEl?: null | HTMLElement;
    valueSelect?: string;
    isPasteEnabled?: boolean;
    onBack?: () => void;
    onUndo?: () => void;
    onRedo?: () => void;
    onRevert?: () => void;
    onCopyEdit?: () => void;
    onPasteEdit?: () => void;
    onMenuClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onMenuClose?: () => void;
    onSelectButton?: () => void;
}

export default function HHeaderEditor(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const open = Boolean(props.anchorEl);
    const isMobile = useIsMobile();

    return (
    <>
        <Stack direction="row" justifyContent="space-between" width="100%" sx={{ pr: !isMobile ? "24px" : "6px" }}> 
            <Stack direction="row" justifyContent="flex-start" sx={{ pl: !isMobile ? "0px" : "14px" }}>
                <IconButton aria-label="back" onClick={props.onBack} 
                sx={{ 
                    '&:active': {
                        transform: 'scale(0.92)',
                    },
                    transition: 'transform 0.1s ease-in-out',
                 }}>
                    <CardMedia title="back" src="svg/Back.svg" component="img" />
                </IconButton>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ pt: "20px", pb: "12px"}} spacing={0.1}>
                <Button variant="text" onClick={props.onSelectButton} sx={{ color: colors.outlineVariant }}>
                    {props.valueSelect}
                </Button>
                <IconButton aria-label="undo" onClick={props.onUndo} sx={{ color: colors.outlineVariant }}>
                    <CardMedia component="img" image="/v1/svg/undo-editor.svg" />
                </IconButton>
                <IconButton aria-label="redo" onClick={props.onRedo} sx={{ color: colors.outlineVariant }}>
                    <CardMedia component="img" image="/v1/svg/redo-editor.svg" />
                </IconButton>
                <IconButton 
                    aria-label="option" 
                    onClick={props.onMenuClick}
                    aria-controls={open ? 'options-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <CardMedia component="img" image="/v1/svg/dots-editor.svg" />
                </IconButton>
                <Menu
                    id="options-menu"
                    anchorEl={props.anchorEl}
                    open={open}
                    onClose={props.onMenuClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
                    <MenuItem onClick={props.onRevert}>
                        <ListItemIcon sx={{ minWidth: 0, mr: "0px", px: "0px" }}>
                            <CardMedia component="img" image="/v1/svg/revert-editor.svg" sx={{ width: "20px", height: "20px" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography sx={{ fontSize: "14px", color: colors.surface }}>Revert to original</Typography>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={props.onCopyEdit}>
                        {/* Should be align left and more closer with ListItemText*/}
                        <ListItemIcon sx={{ minWidth: 0, mr: "0px", px: "0px" }}>
                            <CardMedia component="img" image="/v1/svg/copy-editor.svg" sx={{ width: "20px", height: "20px" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography sx={{ fontSize: "14px", color: colors.surface }}>Copy edits</Typography>
                        </ListItemText>
                        {/* Should be align right */}
                        {!isMobile && 
                            <ListItemIcon sx={{ marginLeft: 'auto' }}>
                                <CardMedia component="img" image="/v1/svg/shortcut-copy-editor.svg" sx={{ width: "25px", height: "20px" }} />
                            </ListItemIcon>
                        }
                    </MenuItem>
                    <MenuItem onClick={props.onPasteEdit} disabled={!props.isPasteEnabled}>
                        <ListItemIcon sx={{ minWidth: 0, mr: "0px", px: "0px" }}>
                            <CardMedia component="img" image={!props.isPasteEnabled ? "/v1/svg/paste-editor.svg" : "/v1/svg/paste-white.svg"} sx={{ width: "20px", height: "20px" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography sx={{ fontSize: "14px", color: !props.isPasteEnabled ? colors.onSurfaceVariant1 : colors.surface }}>Paste edits</Typography>
                        </ListItemText>
                        { !isMobile &&  
                            <ListItemIcon sx={{ marginLeft: '30px' }}>
                                <CardMedia component="img" image="/v1/svg/shortcut-paste-editor.svg" sx={{ width: "25px", height: "20px" }} />
                            </ListItemIcon>
                        }
                        
                    </MenuItem>
                </Menu>
            </Stack>
        </Stack>
    </>
    );
}
