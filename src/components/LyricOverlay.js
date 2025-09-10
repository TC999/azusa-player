import React, { forwardRef, useState, useEffect, memo } from "react";
import { Lyric } from './Lyric';
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Slide from '@mui/material/Slide';
import { useTheme } from '../popup/ThemeContext';
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const LyricOverlay = memo(function ({ showLyric, currentTime, audioName, audioId, audioCover, artist = "" }) {
    const [open, setOpen] = useState(true);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        setOpen(!open)
    }, [showLyric])

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div >
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                hideBackdrop
                TransitionComponent={Transition}
                PaperProps={{            
                    style: {
                        backgroundImage: 'url(' + audioCover + ')',
                        backgroundSize: 'cover',
                        boxShadow: 'none',
                        // 在深色模式下增加亮度滤镜，使背景图片更清晰
                        filter: isDarkMode ? 'brightness(0.7)' : 'none',
                    },
                }}
            >
                <div id="blur-glass" style={{display:'flex',flexDirection: 'column',overflow: 'hidden'}}>
                    <IconButton
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        style={{borderRadius:'0'}}
                    >
                        <KeyboardArrowDownIcon />
                    </IconButton>
                    <Lyric currentTime={currentTime} audioName={audioName} audioId={audioId} audioCover={audioCover} artist={artist} />
                </div>
            </Dialog>
        </div>
    );
})