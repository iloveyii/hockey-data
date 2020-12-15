import React from "react";
import PageHeader from "../PageHeader";
import { Container, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import Button from "../Button";
import Popup from "../Popup";
import Form from "./Form";
import DeploysList from "./DeploysList";
import Dashboard from "../../Pages/Dashboard";
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

class Deploys extends React.Component {
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
            title="Deployment"
            subtitle="Description about deployment"
            imageUrl="/images/deploy.png"
          />
          <Button onClick={this.onAdd} />

          <DeploysList />

          <Popup
            title="Add Deployment"
            open={this.state.openPopup}
            setOpen={(status) => this.setState({ openPopup: status })}
          >
            <Form />
          </Popup>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Deploys);
