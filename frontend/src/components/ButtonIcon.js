import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

const useStyles = makeStyles((theme) => ({
    textField: {
      width: '25ch',
    },
  }));

export default function ButtonIcon({name, value, label, onChange}) {
  const classes = useStyles();

  return (
    <FormControl className={clsx(classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
          <OutlinedInput
            type='text'
            value={value}
            name={name}
            onChange={onChange}
            endAdornment={
              <InputAdornment position="end">
                <LibraryAddIcon
                  aria-label="add to list"
                  edge="end"
                >
                </LibraryAddIcon>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
  );
}
