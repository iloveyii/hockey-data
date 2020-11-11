import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import Popup from './Popup';
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from 'notistack';
import red from '@material-ui/core/colors/red';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    titleIcon: {
        color: red[500],
        '& .MuiSvgIcon-root': {
            fontSize: '8rem'
        }
    },
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
    top:{
      flex: 1,
      textAlign: 'center'
    },
    middle: {
      flex: 1,
      textAlign: 'center'
    },
    bottom: {
      flex: 1,
      textAlign: 'center',
      marginBottom: theme.spacing(2)
    }
}));

export default function ConfirmDialog(props) {
    const { open, setOpen, onDelete } = props;
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();

    return (

        <Popup open={open} setOpen={setOpen}>
            <div className={classes.container}>
              <div className={classes.top}>
                <IconButton className={classes.titleIcon}>
                    <HelpOutlineIcon />
                </IconButton>
              </div>

              <div className={classes.middle}>
                <Typography variant='h4'>Are you sure ?</Typography>
                <Typography variant='subtitle1'>You will not be able to undo it !</Typography>
              </div>

                <div className={classes.bottom}>
                  <Button
                      style={{ marginTop: "1em" }}
                      margin="normal"
                      size="large"
                      variant="contained"
                      color="secondary"
                      onClick={(e)=>{onDelete(e); setOpen(false);}}
                  >
                      Yes
                  </Button>

                  <Button
                      style={{ marginTop: "1em", marginLeft: "2em" }}
                      margin="normal"
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={() => setOpen(false)}
                  >
                      No
                  </Button>
              </div>
            </div>
        </Popup>
    );
}
