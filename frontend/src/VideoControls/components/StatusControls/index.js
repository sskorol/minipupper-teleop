import {observer} from "mobx-react";
import {useStore} from "../../../store";
import {Grid, Tooltip} from "@mui/material";
import CellWifiIcon from '@mui/icons-material/CellWifi';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import React from "react";
import {red, green} from "@mui/material/colors";

const StatusControls = observer(() => {
    const {isWSConnected, isWebRtcConnected} = useStore();
    const colorIntensity = 500;

    const color = (condition) => {
        return { color: condition ? green[colorIntensity] : red[colorIntensity], paddingLeft: '5px' }
    }

    const label = (condition, prefix) => {
        return condition ? `${prefix} Connected` : `${prefix} Disconnected`
    }

    return (
        <Grid item>
            <Tooltip title={label(isWSConnected, 'ROS')} placement="top">
                <CellWifiIcon sx={color(isWSConnected)} />
            </Tooltip>
            <Tooltip title={label(isWebRtcConnected, 'WebRTC')} placement="top">
                <VideoCameraBackIcon sx={color(isWebRtcConnected)}/>
            </Tooltip>
        </Grid>
    );
});

export default StatusControls;
