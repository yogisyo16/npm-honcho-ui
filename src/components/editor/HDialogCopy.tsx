import React from "react";
import {
    Button,
    Stack,
    Typography,
    Checkbox,
    Collapse,
    FormControlLabel,
    IconButton
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';

type CheckState = { [key: string]: boolean };

interface Props {
    // State for each category's checkboxes
    colorChecks: CheckState;
    lightChecks: CheckState;
    detailsChecks: CheckState;
    // State for accordion expansion
    expanded: { color: boolean; light: boolean; details: boolean; };
    // Handlers
    onCopyEdit: () => void;
    onParentChange: (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>) => void;
    onChildChange: (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>) => void;
    onToggleExpand: (section: 'color' | 'light' | 'details') => void;
    // Setters passed directly for children to update state in the hook
    setColorChecks: React.Dispatch<React.SetStateAction<any>>;
    setLightChecks: React.Dispatch<React.SetStateAction<any>>;
    setDetailsChecks: React.Dispatch<React.SetStateAction<any>>;
}

export function HDialogCopy(props: Props) {
    const colors = useColors();
    const typography = useHonchoTypography();
    // --- Derived state is now calculated from props ---
    const colorValues = Object.values(props.colorChecks);
    const colorCheckedCount = colorValues.filter(Boolean).length;
    const isColorParentChecked = colorCheckedCount === colorValues.length;
    const isColorParentIndeterminate = colorCheckedCount > 0 && !isColorParentChecked;

    const lightValues = Object.values(props.lightChecks);
    const lightCheckedCount = lightValues.filter(Boolean).length;
    const isLightParentChecked = lightCheckedCount === lightValues.length;
    const isLightParentIndeterminate = lightCheckedCount > 0 && !isLightParentChecked;
    
    const detailsValues = Object.values(props.detailsChecks);
    const detailsCheckedCount = detailsValues.filter(Boolean).length;
    const isDetailsParentChecked = detailsCheckedCount === detailsValues.length;
    const isDetailsParentIndeterminate = detailsCheckedCount > 0 && !isDetailsParentChecked;

    const checkboxStyle = {
        // pt: "5px",
        color: colors.onSurface,
        '&.Mui-checked, &.Mui-indeterminate': { color: colors.onSurface },
    };

    return (
        <Stack direction="column" spacing={1} sx={{ padding: 0, margin: 0, width: '100%' }}>
            <Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <FormControlLabel
                        label={
                            <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px" }}>
                                Color
                            </Typography>
                        }
                        control={ 
                            <Checkbox 
                                color="default" 
                                icon={<RoundedSquareIcon color={colors.onSurface} />}
                                checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>}
                                indeterminateIcon={<RoundedSquareIndeterminateIcon color={colors.onSurface} />}
                                checked={isColorParentChecked} 
                                indeterminate={isColorParentIndeterminate} 
                                onChange={(e) => props.onParentChange(e, props.setColorChecks)} 
                                sx={checkboxStyle} /> }
                    />
                    <Stack direction="row" alignItems="center">
                        <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface }}>{`${colorCheckedCount}/${colorValues.length}`}</Typography>
                        <IconButton onClick={() => props.onToggleExpand('color')} size="small" sx={{ pt: "3px" }}>
                            <ExpandMoreIcon sx={{ colors: colors.background, transition: 'transform 0.3s', transform: props.expanded.color ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </IconButton>
                    </Stack>
                </Stack>
                <Collapse in={props.expanded.color} timeout="auto" unmountOnExit>
                    <Stack direction="column" sx={{ ml: 2, pl: 1.5 }}>
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px"  }}>Temperature</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} name="temperature" checked={props.colorChecks.temperature} onChange={(e) => props.onChildChange(e, props.setColorChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px"  }}>Tint</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} name="tint" checked={props.colorChecks.tint} onChange={(e) => props.onChildChange(e, props.setColorChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px"  }}>Vibrance</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} name="vibrance" checked={props.colorChecks.vibrance} onChange={(e) => props.onChildChange(e, props.setColorChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px"  }}>Saturation</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} name="saturation" checked={props.colorChecks.saturation} onChange={(e) => props.onChildChange(e, props.setColorChecks)} sx={checkboxStyle} />} />
                    </Stack>
                </Collapse>
            </Stack>
            <Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                     <FormControlLabel 
                            label={
                                <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px"  }}>
                                    Light
                                </Typography>
                            }
                            control={ 
                            <Checkbox 
                                color="default" 
                                icon={<RoundedSquareIcon color={colors.onSurface} />}
                                checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} 
                                indeterminateIcon={<RoundedSquareIndeterminateIcon color={colors.onSurface} />}
                                checked={isLightParentChecked} 
                                indeterminate={isLightParentIndeterminate} 
                                onChange={(e) => props.onParentChange(e, props.setLightChecks)} 
                                sx={checkboxStyle} /> } />
                     <Stack direction="row" alignItems="center">
                        <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface }}>{`${lightCheckedCount}/${lightValues.length}`}</Typography>
                        <IconButton onClick={() => props.onToggleExpand('light')} size="small" sx={{ pt: "3px" }}>
                             <ExpandMoreIcon sx={{ transition: 'transform 0.3s', transform: props.expanded.light ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </IconButton>
                    </Stack>
                </Stack>
                 <Collapse in={props.expanded.light} timeout="auto" unmountOnExit>
                    <Stack direction="column" sx={{ ml: 2, pl: 1.5 }}>
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px" }}>Exposure</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="exposure" checked={props.lightChecks.exposure} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px" }}>Contrast</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="contrast" checked={props.lightChecks.contrast} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px" }}>Highlights</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="highlights" checked={props.lightChecks.highlights} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px" }}>Shadows</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="shadows" checked={props.lightChecks.shadows} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px" }}>Whites</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="whites" checked={props.lightChecks.whites} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px" }}>Blacks</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="blacks" checked={props.lightChecks.blacks} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                    </Stack>
                </Collapse>
            </Stack>
            <Stack>
                 <Stack direction="row" alignItems="center" justifyContent="space-between">
                     <FormControlLabel 
                        label={
                            <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px" }}>
                                Details
                            </Typography>
                        }
                        control={ 
                            <Checkbox 
                                color="default" 
                                icon={<RoundedSquareIcon color={colors.onSurface} />}
                                checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} 
                                indeterminateIcon={<RoundedSquareIndeterminateIcon color={colors.onSurface} />}
                                checked={isDetailsParentChecked} 
                                indeterminate={isDetailsParentIndeterminate} 
                                onChange={(e) => props.onParentChange(e, props.setDetailsChecks)} 
                                sx={checkboxStyle} /> }/>
                     <Stack direction="row" alignItems="center">
                        <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface }}>{`${detailsCheckedCount}/${detailsValues.length}`}</Typography>
                        <IconButton onClick={() => props.onToggleExpand('details')} size="small" sx={{ pt: "3px" }}>
                           <ExpandMoreIcon sx={{ transition: 'transform 0.3s', transform: props.expanded.details ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </IconButton>
                    </Stack>
                </Stack>
                <Collapse in={props.expanded.details} timeout="auto" unmountOnExit>
                    <Stack direction="column" sx={{ ml: 2, pl: 1.5 }}>
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px" }}>Clarity</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="clarity" checked={props.detailsChecks.clarity} onChange={(e) => props.onChildChange(e, props.setDetailsChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label={ <Typography sx={{ ...typography.bodyMedium, color: colors.onSurface, pt: "2px" }}>Sharpness</Typography> } control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="sharpness" checked={props.detailsChecks.sharpness} onChange={(e) => props.onChildChange(e, props.setDetailsChecks)} sx={checkboxStyle} />} />
                    </Stack>
                </Collapse>
            </Stack>
            <Button onClick={props.onCopyEdit} sx={{...typography.labelMedium, mt: '20px', height: '40px', color: colors.surface, backgroundColor: colors.onSurface, borderRadius: '100px', textTransform: 'none'}}>
                Copy
            </Button>
        </Stack>
    );
}

interface IconProps {
  color: string;
}

// A component for the UNCHECKED box
const RoundedSquareIcon = ({ color }: IconProps) => (
    <div
        style={{
            width: 18,
            height: 18,
            border: `2px solid ${color}`, // Example color for the border
            borderRadius: '5px',
            backgroundColor: 'transparent',
        }}
    />
);

// A component for the CHECKED box
const RoundedSquareCheckedIcon = ({ color }: IconProps) => (
    <div
        style={{
            width: 18,
            height: 18,
            border: `2px solid ${color}`, // Example color for the border
            backgroundColor: `${color}`,
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        {/* You can put a checkmark SVG or character here if you want */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
            <path d="M20 6L9 17L4 12" />
        </svg>
    </div>
);

const RoundedSquareIndeterminateIcon = ({ color }: IconProps) => (
    <div
        style={{
            // These styles MUST match your checked icon's container
            width: 18,
            height: 18,
            border: `2px solid ${color}`,
            backgroundColor: `${color}`,
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        {/* A simple horizontal line for the indeterminate state */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
            <path d="M5 12L19 12" />
        </svg>
    </div>
);

interface PropsPreset {
    // State for each category's checkboxes
    colorChecks: CheckState;
    lightChecks: CheckState;
    detailsChecks: CheckState;
    // State for accordion expansion
    expanded: { color: boolean; light: boolean; details: boolean; };
    // Handlers
    onParentChange: (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>) => void;
    onChildChange: (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>) => void;
    onToggleExpand: (section: 'color' | 'light' | 'details') => void;
    // Setters passed directly for children to update state in the hook
    setColorChecks: React.Dispatch<React.SetStateAction<any>>;
    setLightChecks: React.Dispatch<React.SetStateAction<any>>;
    setDetailsChecks: React.Dispatch<React.SetStateAction<any>>;
}

export function HDialogPreset(props: PropsPreset) {
    const colors = useColors();
    const typography = useHonchoTypography();
    // --- Derived state is now calculated from props ---
    const colorValues = Object.values(props.colorChecks);
    const colorCheckedCount = colorValues.filter(Boolean).length;
    const isColorParentChecked = colorCheckedCount === colorValues.length;
    const isColorParentIndeterminate = colorCheckedCount > 0 && !isColorParentChecked;

    const lightValues = Object.values(props.lightChecks);
    const lightCheckedCount = lightValues.filter(Boolean).length;
    const isLightParentChecked = lightCheckedCount === lightValues.length;
    const isLightParentIndeterminate = lightCheckedCount > 0 && !isLightParentChecked;
    
    const detailsValues = Object.values(props.detailsChecks);
    const detailsCheckedCount = detailsValues.filter(Boolean).length;
    const isDetailsParentChecked = detailsCheckedCount === detailsValues.length;
    const isDetailsParentIndeterminate = detailsCheckedCount > 0 && !isDetailsParentChecked;

    const checkboxStyle = {
        color: colors.onSurface,
        '&.Mui-checked, &.Mui-indeterminate': { color: colors.onSurface },
    };

    return (
        <Stack direction="column" spacing={1} sx={{ padding: 0, margin: 0, width: '100%' }}>
            <Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <FormControlLabel
                        label="Color"
                        control={ 
                            <Checkbox 
                                color="default" 
                                icon={<RoundedSquareIcon color={colors.onSurface} />}
                                checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>}
                                indeterminateIcon={<RoundedSquareIndeterminateIcon color={colors.onSurface} />}
                                checked={isColorParentChecked} 
                                indeterminate={isColorParentIndeterminate} 
                                onChange={(e) => props.onParentChange(e, props.setColorChecks)} 
                                sx={checkboxStyle} /> }
                    />
                    <Stack direction="row" alignItems="center">
                        <Typography sx={{ ...typography.labelMedium, color: colors.onSurface }}>{`${colorCheckedCount}/${colorValues.length}`}</Typography>
                        <IconButton onClick={() => props.onToggleExpand('color')} size="small">
                            <ExpandMoreIcon sx={{ colors: colors.background, transition: 'transform 0.3s', transform: props.expanded.color ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </IconButton>
                    </Stack>
                </Stack>
                <Collapse in={props.expanded.color} timeout="auto" unmountOnExit>
                    <Stack direction="column" sx={{ ml: 2, pl: 1.5 }}>
                        <FormControlLabel label="Temperature" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} name="temperature" checked={props.colorChecks.temperature} onChange={(e) => props.onChildChange(e, props.setColorChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label="Tint" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} name="tint" checked={props.colorChecks.tint} onChange={(e) => props.onChildChange(e, props.setColorChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label="Vibrance" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} name="vibrance" checked={props.colorChecks.vibrance} onChange={(e) => props.onChildChange(e, props.setColorChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label="Saturation" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} name="saturation" checked={props.colorChecks.saturation} onChange={(e) => props.onChildChange(e, props.setColorChecks)} sx={checkboxStyle} />} />
                    </Stack>
                </Collapse>
            </Stack>
            <Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                     <FormControlLabel 
                            label="Light" 
                            control={ 
                            <Checkbox 
                                color="default" 
                                icon={<RoundedSquareIcon color={colors.onSurface} />}
                                checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} 
                                indeterminateIcon={<RoundedSquareIndeterminateIcon color={colors.onSurface} />}
                                checked={isLightParentChecked} 
                                indeterminate={isLightParentIndeterminate} 
                                onChange={(e) => props.onParentChange(e, props.setLightChecks)} 
                                sx={checkboxStyle} /> } />
                     <Stack direction="row" alignItems="center">
                        <Typography sx={{ ...typography.labelMedium, color: colors.onSurface }}>{`${lightCheckedCount}/${lightValues.length}`}</Typography>
                        <IconButton onClick={() => props.onToggleExpand('light')} size="small">
                             <ExpandMoreIcon sx={{ transition: 'transform 0.3s', transform: props.expanded.light ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </IconButton>
                    </Stack>
                </Stack>
                 <Collapse in={props.expanded.light} timeout="auto" unmountOnExit>
                    <Stack direction="column" sx={{ ml: 2, pl: 1.5 }}>
                        <FormControlLabel label="Exposure" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="exposure" checked={props.lightChecks.exposure} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label="Contrast" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="contrast" checked={props.lightChecks.contrast} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label="Highlights" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="highlights" checked={props.lightChecks.highlights} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label="Shadows" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="shadows" checked={props.lightChecks.shadows} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label="Whites" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="whites" checked={props.lightChecks.whites} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label="Blacks" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="blacks" checked={props.lightChecks.blacks} onChange={(e) => props.onChildChange(e, props.setLightChecks)} sx={checkboxStyle} />} />
                    </Stack>
                </Collapse>
            </Stack>
            <Stack>
                 <Stack direction="row" alignItems="center" justifyContent="space-between">
                     <FormControlLabel 
                        label="Details" 
                        control={ 
                            <Checkbox 
                                color="default" 
                                icon={<RoundedSquareIcon color={colors.onSurface} />}
                                checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} 
                                indeterminateIcon={<RoundedSquareIndeterminateIcon color={colors.onSurface} />}
                                checked={isDetailsParentChecked} 
                                indeterminate={isDetailsParentIndeterminate} 
                                onChange={(e) => props.onParentChange(e, props.setDetailsChecks)} 
                                sx={checkboxStyle} /> }/>
                     <Stack direction="row" alignItems="center">
                        <Typography sx={{ ...typography.labelMedium, color: colors.onSurface }}>{`${detailsCheckedCount}/${detailsValues.length}`}</Typography>
                        <IconButton onClick={() => props.onToggleExpand('details')} size="small">
                           <ExpandMoreIcon sx={{ transition: 'transform 0.3s', transform: props.expanded.details ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                        </IconButton>
                    </Stack>
                </Stack>
                <Collapse in={props.expanded.details} timeout="auto" unmountOnExit>
                    <Stack direction="column" sx={{ ml: 2, pl: 1.5 }}>
                        <FormControlLabel label="Clarity" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="clarity" checked={props.detailsChecks.clarity} onChange={(e) => props.onChildChange(e, props.setDetailsChecks)} sx={checkboxStyle} />} />
                        <FormControlLabel label="Sharpness" control={<Checkbox icon={<RoundedSquareIcon color={colors.onSurface} />} checkedIcon={<RoundedSquareCheckedIcon color={colors.onSurface}/>} color="default" name="sharpness" checked={props.detailsChecks.sharpness} onChange={(e) => props.onChildChange(e, props.setDetailsChecks)} sx={checkboxStyle} />} />
                    </Stack>
                </Collapse>
            </Stack>
        </Stack>
    );
}