import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  makeStyles,
  Slide,
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';


const useStyle = makeStyles(theme => ({
  paper: {
    padding: "40px",
    [theme.breakpoints.down("sm")]: {
      width: `100%`,
      margin: 0
    },
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup(props) {
  const { open, setOpen, title } = props;
  const classes = useStyle();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      className={classes.paper}
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="xs"
      aria-labelledby="responsive-dialog-title"
      TransitionComponent={Transition}
      open={open}
    >
      {
        title 
        && 
        <DialogTitle>
        {title }
        <Button
          style={{ float: "right" }}
          margin="normal"
          size="small"
          variant="contained"
          color="primary"
          onClick={() => setOpen(false)}
        >
          X
        </Button>
      </DialogTitle>
      }
      
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}
