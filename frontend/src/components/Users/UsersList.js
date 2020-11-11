import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Paper, Button} from "@material-ui/core";
import OfflinePinOutlinedIcon from '@material-ui/icons/OfflinePinOutlined';
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined';
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";
import { withStyles } from '@material-ui/styles';


import Popup from "../Popup";
import Form from "./Form";

import ConfirmDialog from '../ConfirmDialog';
import models from '../../store';


const styles = theme => ({
  table: {
    minWidth: 650,
    // marginTop: theme.spacing(3)
  }
});

class  UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup : false,
      openConfirmDialog: false,
      currentUser: null
    }
  }


  onDelete = (row) => {
    console.log('Deleting ', row);
    this.setState({currentUser: row, openConfirmDialog:true});
  }

  componentWillReceiveProps(nextProps, context) {
    console.log('componentWillReceiveProps', nextProps)
  }

  render() {
    const {classes, users} = this.props;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><label>Name</label></TableCell>
              <TableCell align="right"><label>Email</label></TableCell>
              <TableCell align="right"><label>Address</label></TableCell>
              <TableCell align="right"><label>X</label></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.map((row, i) =>
              <TableRow
                style={{ cursor: "pointer" }}
                key={i}
              >
                <TableCell onClick={()=> {this.props.editAction(row); this.setState({openPopup:true});} } component="th" scope="row">{row.name}</TableCell>
                <TableCell onClick={()=>{this.props.editAction(row); this.setState({openPopup:true});} } align="right">{row.email}</TableCell>
                <TableCell onClick={()=>{this.props.editAction(row); this.setState({openPopup:true});} } align="right">{row.address}</TableCell>

                <TableCell align="right">
                  <Button
                    style={{ float: "right", padding: 3 }}
                    margin="normal"
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={(e) => { this.onDelete(row) } }
                  >
                    <CancelPresentationOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <ConfirmDialog open={this.state.openConfirmDialog} setOpen={status=>this.setState({openConfirmDialog:status})} onDelete={() =>this.props.deleteAction(this.state.currentUser)} />

        <Popup title="Update user" open={this.state.openPopup} setOpen={status => this.setState({openPopup:status})}>
          <Form />
        </Popup>

      </TableContainer>

      )
    }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = state => ({
    users: state.users.list || [],
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  editAction: models.users.actions.edit,
  deleteAction: models.users.actions.delete
};

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapActionsToProps)(UsersList)));
