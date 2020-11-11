import React from 'react';
import PageHeader from "../PageHeader";
import { Container, Paper } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';


import Button from "../Button";
import Popup from "../Popup";
import Form from "./Form";
import PermissionsList from "./PermissionsList";
import Dashboard from '../../Pages/Dashboard';
import {Header} from "../../Layouts";

const drawerWidth = 240;

const styles = theme => ({
  main: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
});

class Permissions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openPopup : false
    }
  }

  onAdd = (e) => {
    e.preventDefault();
    this.setState({openPopup:true});
  }

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.main}>
        <Header />
        <Container maxWidth="md">
          <PageHeader
            title="PERMISSIONS"
            subtitle="Description about permissions"
            imageUrl="/images/permissions.png"
          />
          <Button onClick={this.onAdd} />

          <PermissionsList />

          <Popup title="Add Permissions" open={this.state.openPopup} setOpen={(status)=>this.setState({openPopup: status})}>
            <Form/>
          </Popup>
        </Container>
        </div>
    )
  }
}

export default withStyles(styles)(Permissions);
