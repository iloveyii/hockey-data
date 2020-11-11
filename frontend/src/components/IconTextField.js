import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "80%",
    marginTop: theme.spacing(5),
  },
  inputAdornment: {
    marginRight: "8px",
  },
}));

export default function IconTextField({
  name,
  value,
  label,
  onChange,
  Icon,
  type,
  ...rest
}) {
  const classes = useStyles();

  return (
    <FormControl className={clsx(classes.textField)} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        {...rest}
        startAdornment={
          <InputAdornment position="end" className={classes.inputAdornment}>
            <Icon aria-label="add to list" edge="end"></Icon>
          </InputAdornment>
        }
        labelWidth={70}
      />
    </FormControl>
  );
}
