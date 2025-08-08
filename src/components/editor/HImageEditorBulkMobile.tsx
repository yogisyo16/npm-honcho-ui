import React from "react";
import { BottomNavigation, BottomNavigationAction, Box, CardMedia, Paper, Stack, SelectChangeEvent } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
import HBulkColorAdjustmentMobile from "./HBulkColorAdjustmentMobile";
import HBulkPresetMobile from "./HBulkPresetMobile";

type Preset = {
    id: string;
    name: string;
};

interface Props {
    // EachPanel
    presets: Preset[];
    activePanel: string;
    activeSubPanel: string;
    setActivePanel: (tab: string) => void;
    setActiveSubPanel: (subTab: string) => void;

    // Draging effect mobile
    panelRef: React.RefObject<HTMLDivElement>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    panelHeight: number;
    handleDragStart: (e: React.MouseEvent | React.TouchEvent) => void;
    onContentHeightChange: (height: number) => void;

    // Color Adjustments
    // Adjustments Colors
    onTempDecreaseMax: () => void;
    onTempDecrease: () => void;
    onTempIncrease: () => void;
    onTempIncreaseMax: () => void;
    onTintDecreaseMax: () => void;
    onTintDecrease: () => void;
    onTintIncrease: () => void;
    onTintIncreaseMax: () => void;
    onVibranceDecreaseMax: () => void;
    onVibranceDecrease: () => void;
    onVibranceIncrease: () => void;
    onVibranceIncreaseMax: () => void;
    onSaturationDecreaseMax: () => void;
    onSaturationDecrease: () => void;
    onSaturationIncrease: () => void;
    onSaturationIncreaseMax: () => void;

    // Adjustments Light
    onExposureDecreaseMax: () => void;
    onExposureDecrease: () => void;
    onExposureIncrease: () => void;
    onExposureIncreaseMax: () => void;
    onContrastDecreaseMax: () => void;
    onContrastDecrease: () => void;
    onContrastIncrease: () => void;
    onContrastIncreaseMax: () => void;
    onHighlightsDecreaseMax: () => void;
    onHighlightsDecrease: () => void;
    onHighlightsIncrease: () => void;
    onHighlightsIncreaseMax: () => void;
    onShadowsDecreaseMax: () => void;
    onShadowsDecrease: () => void;
    onShadowsIncrease: () => void;
    onShadowsIncreaseMax: () => void;
    onWhitesDecreaseMax: () => void;
    onWhitesDecrease: () => void;
    onWhitesIncrease: () => void;
    onWhitesIncreaseMax: () => void;
    onBlacksDecreaseMax: () => void;
    onBlacksDecrease: () => void;
    onBlacksIncrease: () => void;
    onBlacksIncreaseMax: () => void;

    // Adjustments Details
    onClarityDecreaseMax: () => void;
    onClarityDecrease: () => void;
    onClarityIncrease: () => void;
    onClarityIncreaseMax: () => void;
    onSharpnessDecreaseMax: () => void;
    onSharpnessDecrease: () => void;
    onSharpnessIncrease: () => void;
    onSharpnessIncreaseMax: () => void;

    // Preset Mobile (For now)
    selectedPresetBulk: string;
    onSelectPresetBulk: (event: SelectChangeEvent<string>) => void;
    onPresetMenuClickBulk: (event: React.MouseEvent<HTMLElement>, presetId: string) => void;
    onOpenPresetModalBulk: () => void;
}

// Data structure for the sub-navigation tabs
const subTabs: { [key: string]: { value: string; label: string, inactiveIcon?: string, activeIcon?: string }[] } = {
    colorAdjustment: [
        { value: "color", label: "Color", inactiveIcon: "/v1/svg/white-balance-inactive-mobile.svg", activeIcon: "/v1/svg/white-balance-active-mobile.svg" },
        { value: "light", label: "Light", inactiveIcon: "/v1/svg/light-inactive-mobile.svg", activeIcon: "/v1/svg/light-active-mobile.svg" },
        // { value: "details", label: "Details", inactiveIcon: "/v1/svg/details-inactive-mobile.svg", activeIcon: "/v1/svg/details-active-mobile.svg"},
    ],
    aspectRatio: [
        { value: "portrait", label: "Portrait" },
        { value: "square", label: "Square" },
        { value: "wide", label: "Wide" },
    ],
    preset: [
        { value: "Preset", label: "Preset", inactiveIcon: "/v1/svg/preset-inactive-mobile.svg", activeIcon: "/v1/svg/preset-active-mobile.svg" },
    ],
};

export default function HImageEditorBulkMobile(props: Props) {
    const typography = useHonchoTypography();
    const colors = useColors();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        props.setActivePanel(newValue);
    };

    const currentSubTabs = subTabs[props.activePanel];


    return (
        <Paper 
            elevation={0}
            sx={{ 
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                zIndex: 1300,
                backgroundColor: 'transparent',
            }}
        >
            <Stack direction="column">
                {props.activeSubPanel && (
                    <Paper
                        ref={props.panelRef}
                        elevation={3}
                        className="draggable-panel MuiPaper-transition"
                        sx={{
                            height: `${props.panelHeight}px`,
                            maxHeight: '60vh',
                            backgroundColor: 'rgba(40, 40, 40, 0.85)',
                            overflow: 'hidden',
                            borderRadius: "0px",
                            '&.MuiPaper-transition': {
                                transition: 'height 0.5s ease-in-out',
                            },
                        }}
                    >
                        <Box
                            onMouseDown={props.handleDragStart}
                            onTouchStart={props.handleDragStart}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                pt: '5px',
                                pb: '12px',
                                cursor: 'ns-resize',
                                touchAction: 'none',
                            }}
                        >
                            <Box sx={{ width: 40, height: 5, borderRadius: '2.5px', backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                        </Box>
                        <Box
                            ref={props.contentRef} 
                            sx={{
                                paddingX: "8px",
                                paddingBottom: 3,
                                height: 'calc(100% - 30px)',
                                overflowY: 'auto',
                                scrollbarWidth: 'none',
                                '&::-webkit-scrollbar': { display: 'none' },
                            }}
                        >
                            {props.activePanel === 'colorAdjustment' && <HBulkColorAdjustmentMobile {...props} />}
                            {props.activePanel === 'preset' && <HBulkPresetMobile {...props} />}
                        </Box>
                    </Paper>
                )}
                {currentSubTabs && (
                    <Paper 
                        sx={{
                            backgroundColor: colors.onBackground,
                            paddingTop: "10px",
                            pb: "0px",
                            mb: "0px",
                            px: "44px",
                            borderRadius: "0px",
                        }} 
                        elevation={3}
                    >
                        <BottomNavigation showLabels sx={{ backgroundColor: colors.onBackground, gap: '10px' }}>
                            {currentSubTabs.map((tab) => {
                                const isActive = props.activeSubPanel === tab.value;
                                const iconSrc = isActive ? tab.activeIcon : tab.inactiveIcon;
                                return (
                                    <BottomNavigationAction
                                        key={tab.value}
                                        label={tab.label}
                                        value={tab.value}
                                        onClick={() => props.setActiveSubPanel(isActive ? '' : tab.value)}
                                        icon={iconSrc && <CardMedia component="img" image={iconSrc} sx={{ width: "20px", height: "20px", mb: "5px" }} />}
                                        sx={{
                                            color: isActive ? colors.surface : colors.onSurfaceVariant1,
                                            minWidth: 'auto',
                                            p: 0,
                                            '& .MuiBottomNavigationAction-label': {
                                                ...typography.labelSmall,
                                                color: isActive ? colors.surface : colors.onSurfaceVariant1,
                                            }
                                        }}
                                    />
                                );
                            })}
                        </BottomNavigation>
                    </Paper>
                )}
                <Paper sx={{ backgroundColor: colors.onBackground, borderRadius: "0px", pb: "0px", mb: "0px" }} elevation={3}>
                    <Stack direction="row" justifyContent="center" alignItems="center" sx={{ pt: "0px", mb: "0px", mr: "0px", ml: "0px" }}>
                        <BottomNavigation value={props.activePanel} onChange={handleChange} sx={{ backgroundColor: colors.onBackground }}>
                            <BottomNavigationAction
                                value="colorAdjustment"
                                sx={{ px: '12px', py: '0px', minWidth: 'auto' }}
                                icon={<CardMedia component="img" image={props.activePanel === 'colorAdjustment' ? "/v1/svg/color-adjustment-active-mobile.svg" : "/v1/svg/color-adjustment-inactive-mobile.svg"} sx={{ width: "20px", height: "20px" }} />}
                            />
                            {/* <BottomNavigationAction
                                value="aspectRatio"
                                sx={{ px: '12px', py: '0px', minWidth: 'auto' }}
                                icon={<CardMedia component="img" image={props.activePanel === 'aspectRatio' ? "/v1/svg/aspect-ratio-inactive-mobile.svg" : "/v1/svg/aspect-ratio-inactive-mobile.svg"} sx={{ width: "20px", height: "20px" }} />}
                            /> */}
                            <BottomNavigationAction
                                value="preset"
                                sx={{ px: '12px', py: '0px', minWidth: 'auto' }}
                                icon={<CardMedia component="img" image={props.activePanel === 'preset' ? "/v1/svg/preset-and-watermark-active-mobile.svg" : "/v1/svg/preset-and-watermark-inactive-mobile.svg"} sx={{ width: "20px", height: "20px" }} />}
                            />
                        </BottomNavigation>
                    </Stack>
                </Paper>

            </Stack>
        </Paper>
    );
}