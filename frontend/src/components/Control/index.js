import React from "react";
import PageHeader from "../PageHeader";
import { Container, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import Button from "../Button";
import Popup from "../Popup";
import PermissionsList from "./PermissionsList";
import { Header } from "../../Layouts";

const drawerWidth = 240;

const styles = (theme) => ({
  main: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
});

class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup: false,
    };
  }

  onAdd = (e) => {
    e.preventDefault();
    this.setState({ openPopup: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Header />
        <Container maxWidth="md">
          <PageHeader
            title="REMOTE CONTROL"
            subtitle="Remote control for your smart home"
            imageUrl="/images/remote-control.jpg"
          />
          <Button onClick={this.onAdd} />

          <PermissionsList />
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Control);
