import React from "react";
import { TextField, Stack, Button, Typography } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

interface Props {
    valueName: string;
    setName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export function HTextField(props: Props) {
    const colors = useColors();
    const typography = useHonchoTypography();
    
    return (
        <>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Preset Name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={props.valueName}
                onChange={props.setName}
                sx={{ 
                    backgroundColor: "#F6F6F6", 
                    p: "7px",
                    borderRadius: "6px",
                    '& .MuiInputLabel-root': {
                        color: colors.onSurfaceVariant, // A slightly dimmer color for the placeholder
                        pt: '10px',
                        pl: '10px',
                    },
                    '& .MuiInput-input': {
                        color: colors.onSurface,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: colors.onSurfaceVariant, // Or a different color if you prefer
                    },
                }}
            />
        </>
    );
}

interface PropsRename {
    valueName: string;
    setName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSaveRenamePreset: () => void;
    onCancel: () => void;
}

export function HTextFieldRename(props: PropsRename) {
    const colors = useColors();
    const typography = useHonchoTypography();
    
    return (
        <>
            <Stack direction="column" spacing={2}>
                <TextField
                    autoFocus
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={props.valueName}
                    onChange={props.setName}
                    sx={{ 
                        backgroundColor: "#F6F6F6", 
                        p: "7px",
                        borderRadius: "6px",
                        '& .MuiInputLabel-root': {
                            pt: '10px',
                            pl: '10px',
                        },
                    }}
                />
                <Stack direction="row" justifyContent="end" alignItems="center">
                    <Button
                        color="primary"
                        onClick={props.onCancel}
                        sx={{
                            backgroundColor: colors.surface,
                            color: colors.onSurface,
                            '&:hover': {
                                backgroundColor: colors.onSurfaceVariant1,
                            },
                            ...typography.titleMedium,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={props.onSaveRenamePreset}
                        sx={{
                            backgroundColor: colors.surface,
                            color: colors.onSurface,
                            '&:hover': {
                                backgroundColor: colors.onSurfaceVariant1,
                            },
                            ...typography.titleMedium,
                        }}
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        </>
    );
}