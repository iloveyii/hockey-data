import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Paper, Button } from "@material-ui/core";
import OfflinePinOutlinedIcon from "@material-ui/icons/OfflinePinOutlined";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import Popup from "../Popup";
import Form from "./Form";
import Status from "./Status";

import ConfirmDialog from "../ConfirmDialog";
import models from "../../store";

const styles = (theme) => ({
  table: {
    minWidth: 650,
    // marginTop: theme.spacing(3)
  },
});

class DeploysList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup: false,
      openConfirmDialog: false,
      openDeployDialog: false,
      currentUser: null,
      deploy: false,
    };
  }

  onDelete = (row) => {
    console.log("Deleting ", row);
    this.setState({ currentUser: row, openConfirmDialog: true });
  };

  onDeploy = (row) => {
    console.log("Status Deploy started ", row);
    this.setState({ deploy: row, openDeployDialog: true });
  };

  componentWillReceiveProps(nextProps, context) {
    console.log("componentWillReceiveProps", nextProps);
  }

  render() {
    const { classes, deploys } = this.props;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <label>Name</label>
              </TableCell>
              <TableCell align="right">
                <label>Type</label>
              </TableCell>
              <TableCell align="right">
                <label>Github</label>
              </TableCell>
              <TableCell align="right">
                <label>Shell</label>
              </TableCell>
              <TableCell align="right">
                <label>X</label>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deploys.map((row, i) => (
              <TableRow style={{ cursor: "pointer" }} key={i}>
                <TableCell
                  onClick={() => {
                    this.props.editAction(row);
                    this.setState({ openPopup: true });
                  }}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell
                  onClick={() => {
                    this.props.editAction(row);
                    this.setState({ openPopup: true });
                  }}
                  align="right"
                >
                  {row.type}
                </TableCell>
                <TableCell
                  onClick={() => {
                    this.props.editAction(row);
                    this.setState({ openPopup: true });
                  }}
                  align="right"
                >
                  {row.github_url}
                </TableCell>

                <TableCell
                  onClick={() => {
                    this.props.editAction(row);
                    this.setState({ openPopup: true });
                  }}
                  align="right"
                >
                  {row.shell}
                </TableCell>

                <TableCell
                  align="right"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <Button
                    style={{ float: "left", padding: 3, marginRight: 5 }}
                    margin="normal"
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={(e) => {
                      this.onDeploy(row);
                    }}
                  >
                    <SystemUpdateAltIcon />
                  </Button>
                  <Button
                    style={{ float: "right", padding: 3 }}
                    margin="normal"
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      this.onDelete(row);
                    }}
                  >
                    <CancelPresentationOutlinedIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ConfirmDialog
          open={this.state.openConfirmDialog}
          setOpen={(status) => this.setState({ openConfirmDialog: status })}
          onDelete={() => this.props.deleteAction(this.state.currentUser)}
        />

        <Popup
          title="Add Deploy"
          open={this.state.openPopup}
          setOpen={(status) => this.setState({ openPopup: status })}
        >
          <Form />
        </Popup>

        <Popup
          title="Deployment start"
          open={this.state.openDeployDialog}
          setOpen={(status) => this.setState({ openDeployDialog: status })}
        >
          <Status deploy={this.state.deploy} />
        </Popup>
      </TableContainer>
    );
  }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = (state) => ({
  deploys: state.deploys.list || [],
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  editAction: models.deploys.actions.edit,
  deleteAction: models.deploys.actions.delete,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapActionsToProps)(DeploysList))
);
