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
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import WhatshotOutlinedIcon from "@material-ui/icons/WhatshotOutlined";
import TvOutlinedIcon from "@material-ui/icons/TvOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import Popup from "../Popup";

import ConfirmDialog from "../ConfirmDialog";
import models from "../../store";

const styles = (theme) => ({
  table: {
    minWidth: 650,
    // marginTop: theme.spacing(3)
  },
});

const colorOn = "#eeff41";
const colorOff = "#f50";
const devices = {
  door: false,
  stove: false,
  television: false,
  light: false,
};

class PermissionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openPopup: false,
      openConfirmDialog: false,
      currentUser: null,
      devices: {
        door: 1,
        stove: 0,
        television: 0,
        light: 1,
      },
      permissions: [],
    };
  }

  openDevice = (row, device) => {
    console.log("opening Door ", row);
    const { updateAction } = this.props;
    const { permissions } = this.state;
    permissions.map((permission) => {
      if (permission.id === row.id) {
        console.log("COMPARE", permission.id, row.id, permission.id === row.id);
        permission.devices[device] = !permission.devices[device];
      }
    });
    this.setState({ permissions });

    updateAction({
      id: row.id,
      building: row.building,
      room_number: row.room_number,
      device: device,
      status: "1",
      command: row.devices[device] === true ? "open" : "close",
    });
  };

  componentWillReceiveProps(nextProps, context) {
    console.log("componentWillReceiveProps", nextProps);
    this.setPermissions(nextProps);
  }

  componentDidMount() {
    this.setPermissions(this.props);
  }

  setPermissions(props) {
    let permissions = this.getPermissions(props.actions);
    permissions = permissions.map((permission) => {
      permission.devices = { ...devices };
      return permission;
    });
    this.setState({ permissions });
  }

  getPermissions = (actions) => {
    for (let id in actions) {
      console.log("Permissions id ", id);
      if (
        actions[id].res &&
        actions[id].res.status === true &&
        actions[id].res.type === "logins.create"
      ) {
        console.log("Permissions id", actions[id].res.form[0].permissions);
        return actions[id].res.form[0].permissions;
      } else {
        console.log("Permissions id not permissins");
      }
    }

    return [];
  };

  render() {
    const { classes, actions } = this.props;
    // const permissions = this.getPermissions(actions);
    const { devices, permissions } = this.state;
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <label>Building</label>
              </TableCell>
              <TableCell align="right">
                <label>Room</label>
              </TableCell>
              <TableCell align="right">
                <label>Status</label>
              </TableCell>
              <TableCell align="right">
                <label>X</label>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((row, i) => (
              <TableRow style={{ cursor: "pointer" }} key={i}>
                <TableCell
                  onClick={() => {
                    this.props.editAction(row);
                    this.setState({ openPopup: true });
                  }}
                  component="th"
                  scope="row"
                >
                  {row.building}
                </TableCell>
                <TableCell
                  onClick={() => {
                    this.props.editAction(row);
                    this.setState({ openPopup: true });
                  }}
                  align="right"
                >
                  {row.room_number}
                </TableCell>
                <TableCell
                  onClick={() => {
                    this.props.editAction(row);
                    this.setState({ openPopup: true });
                  }}
                  align="right"
                >
                  {row.status}
                </TableCell>

                <TableCell align="right">
                  <Button
                    style={{ margin: "0 5px" }}
                    margin="normal"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      this.openDevice(row, "door");
                    }}
                  >
                    <MeetingRoomOutlinedIcon
                      style={{
                        color: row.devices.door === false ? colorOff : colorOn,
                      }}
                    />
                  </Button>

                  <Button
                    style={{ margin: "0 5px" }}
                    margin="normal"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      this.openDevice(row, "stove");
                    }}
                  >
                    <WhatshotOutlinedIcon
                      style={{
                        color: row.devices.stove === false ? colorOff : colorOn,
                      }}
                    />
                  </Button>

                  <Button
                    style={{ margin: "0 5px" }}
                    margin="normal"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      this.openDevice(row, "television");
                    }}
                  >
                    <TvOutlinedIcon
                      style={{
                        color:
                          row.devices.television === false ? colorOff : colorOn,
                      }}
                    />
                  </Button>

                  <Button
                    style={{ margin: "0 5px" }}
                    margin="normal"
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      this.openDevice(row, "light");
                    }}
                  >
                    <EmojiObjectsOutlinedIcon
                      style={{
                        color: row.devices.light === false ? colorOff : colorOn,
                      }}
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = (state) => ({
  actions: state.logins.actions || [],
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  updateAction: models.gatekeepers.actions.update,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapActionsToProps)(PermissionsList))
);
