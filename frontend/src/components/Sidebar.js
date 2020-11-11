import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: '#115293'
    }
});

export default function Sidebar() {
    const classes = useStyles();
    return (
        <div className={classes.sidebar}>Sidebar</div>
    )
}
