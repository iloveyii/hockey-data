import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';



export default function SimpleSnackbar(props) {
    const { status } = props;
    const { enqueueSnackbar } = useSnackbar();
    let msg = false;
    // variant could be success, error, warning, info, or default
    switch (status) {
        case 'create.success':
            msg = 'Created successfully';
            enqueueSnackbar(msg, {variant: 'success'});
            break;
        case 'delete.success':
            msg = 'Deleted successfully';
            enqueueSnackbar(msg, {variant: 'error'});
            break;
        case 'update.success':
            msg = 'Updated successfully';
            enqueueSnackbar(msg, {variant: 'warning'});
            break;
    }

    return null;
}
