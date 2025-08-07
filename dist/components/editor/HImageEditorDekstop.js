import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Stack, IconButton, CardMedia, Paper, Slide } from "@mui/material";
import useHonchoTypography from "../../themes/honchoTheme";
import useColors from '../../themes/colors';
export default function HImageEditorDesktop(props) {
    const typography = useHonchoTypography();
    const colors = useColors();
    const isZoomMenuOpen = Boolean(props.anchorElZoom);
    return (_jsx(_Fragment, { children: _jsx(Slide, { direction: "left", in: props.isPanelOpen, mountOnEnter: true, unmountOnExit: true, children: _jsx(Stack, { sx: {}, children: _jsx(Paper, { elevation: 3, sx: {
                        position: 'inherit',
                        right: '40px',
                        top: '55px',
                        width: '320px',
                        height: 'calc(100vh - 70px)',
                        // pb: '10px',
                        zIndex: 1200,
                        backgroundColor: '#000000',
                        overflow: 'hidden',
                        // pl: "20px"
                    }, children: _jsxs(Stack, { direction: "row", sx: { height: '100%', pl: "10px", }, children: [_jsxs(Stack, { direction: "column", sx: { width: 'calc(100% - 60px)', height: '95%' }, children: [_jsx(Stack, { sx: { flexGrow: 1, overflowY: 'auto', px: 2, msOverflowStyle: 'none', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }, children: props.children }), _jsx(Stack, { sx: {
                                            flexShrink: 0,
                                            p: '0px 25px',
                                        }, children: props.footer })] }), _jsxs(Stack, { justifyContent: "flex-start", spacing: "15px", sx: {
                                    width: '10px',
                                    flexShrink: 0,
                                    pt: 1,
                                    pl: "10px",
                                }, children: [_jsx(IconButton, { onClick: () => props.setActivePanel('colorAdjustment'), children: _jsx(CardMedia, { component: "img", image: props.activePanel === 'colorAdjustment' ? "/v1/svg/color-adjustment-active.svg" : "/v1/svg/color-adjustment-inactive.svg", sx: { width: "20px", height: "20px" } }) }), _jsx(IconButton, { onClick: () => props.setActivePanel('preset'), children: _jsx(CardMedia, { component: "img", image: props.activePanel === 'preset' ? "/v1/svg/watermark-editor-active.svg" : "/v1/svg/watermark-editor-inactive.svg", sx: { width: "20px", height: "20px" } }) })] })] }) }) }) }) }));
}
