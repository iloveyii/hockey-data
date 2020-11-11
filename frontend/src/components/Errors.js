import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function Errors(props) {
    const errors = [
      {type: 'danger', msg: 'Error 1'},
      {type: 'info', msg: 'Error 2'},
      {type: 'warning', msg: 'Error 3'},
      {type: 'success', msg: 'Error 4'},
    ];

    let [snack, setSnack] = React.useState({ open: true, msg: errors[0].msg });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={snack.open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snack.msg}
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            UNDO
            </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}
