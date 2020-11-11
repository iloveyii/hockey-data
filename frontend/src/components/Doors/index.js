import React from 'react';
import PageHeader from "../PageHeader";
import { Container, Paper } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';


import Button from "../Button";
import Popup from "../Popup";
import Form from "./Form";
import DoorsList from "./DoorsList";
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

class Doors extends React.Component {

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
            title="DOORS"
            subtitle="Description about doors"
            imageUrl="/images/doors.jpg"
          />
          <Button onClick={this.onAdd} />

          <DoorsList />

          <Popup title="Add Door" open={this.state.openPopup} setOpen={(status)=>this.setState({openPopup: status})}>
            <Form/>
          </Popup>
        </Container>
        </div>
    )
  }
}

export default withStyles(styles)(Doors);
