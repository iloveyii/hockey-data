import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core";

import { apiServer } from "../common/constants";
import Users from "../components/Users";
import Login from "../components/Login";
import Doors from "../components/Doors";
import Control from "../components/Control";
import Permissions from "../components/Permissions";
import Settings from "../components/Settings";
import Charts from "../components/Charts";
import Deploys from "../components/Deploys";
import Ni from "../components/Ni";
import models from "../store";

const socket = io(apiServer, {
  transports: ["websocket", "polling"],
});
window.socket = socket;
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  main: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  loginMargin: {
    marginLeft: -1 * drawerWidth,
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { users, logins, doors, permissions, deploys } = props;
  // console.log("props", Object.keys(props));
  const usersResponses = models.users.errors(users.actions);
  const loginsResponses = models.logins.errors(logins.actions);
  const doorsResponses = models.doors.errors(doors.actions);
  const permissionsResponses = models.permissions.errors(permissions.actions);
  const deploysResponses = models.deploys.errors(deploys.actions);

  useEffect(() => {
    // usersResponses.map(res =>   enqueueSnackbar(JSON.stringify(res.errors[0].msg) + ' - ' + res.type , {variant: res.errors[0].type}) );
    usersResponses.map((res) => {
      const msg =
        typeof res.errors[0].msg === "string"
          ? res.errors[0].msg
          : JSON.stringify(res.errors[0].msg);
      enqueueSnackbar(msg, { variant: res.errors[0].type });
    });
  }, [usersResponses]);

  useEffect(() => {
    loginsResponses.map((res) => {
      const msg =
        typeof res.errors[0].msg === "string"
          ? res.errors[0].msg
          : JSON.stringify(res.errors[0].msg);
      enqueueSnackbar(msg, { variant: res.errors[0].type });
    });
  }, [loginsResponses]);

  useEffect(() => {
    doorsResponses.map((res) => {
      const msg =
        typeof res.errors[0].msg === "string"
          ? res.errors[0].msg
          : JSON.stringify(res.errors[0].msg);
      enqueueSnackbar(msg, { variant: res.errors[0].type });
    });
  }, [doorsResponses]);

  useEffect(() => {
    deploysResponses.map((res) => {
      const msg =
        typeof res.errors[0].msg === "string"
          ? res.errors[0].msg
          : JSON.stringify(res.errors[0].msg);
      enqueueSnackbar(msg, { variant: res.errors[0].type });
    });
  }, [deploysResponses]);

  useEffect(() => {
    permissionsResponses.map((res) => {
      const msg =
        typeof res.errors[0].msg === "string"
          ? res.errors[0].msg
          : JSON.stringify(res.errors[0].msg);
      enqueueSnackbar(msg, { variant: res.errors[0].type });
    });
  }, [permissionsResponses]);

  // Call method when ws send an update
  useEffect(() => {
    socket.on("update", (data) => {
      // console.log("Update", data);

      if (data.url && data.url.includes("/api/v1/users")) {
        // console.log("Update USERS  ");
        props.usersReadAction({});
      }

      if (data.url && data.url.includes("/api/v1/doors")) {
        // console.log("Update DOORS  ");
        props.doorsReadAction({});
      }

      if (data.url && data.url.includes("/api/v1/deploys")) {
        // console.log("Update Deploys  ");
        props.deploysReadAction({});
      }

      if (data.url && data.url.includes("/api/v1/permissions")) {
        // console.log("Update PERMISSIONS  ");
        props.permissionsReadAction({});
      }
    });
  }, []);

  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route exact path={`/`} component={Login} />
        <Route exact path={`/dashboard`} component={Charts} />
        <Route exact path={`/users`} component={Users} />
        <Route exact path={`/doors`} component={Doors} />
        <Route exact path={`/permissions`} component={Permissions} />
        <Route exact path={`/deploys`} component={Deploys} />
        <Route exact path={`/control`} component={Control} />
        <Route exact path={`/settings`} component={Settings} />
        <Route component={Ni} />
      </Switch>
    </BrowserRouter>
  );
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = (state) => ({
  users: state.users,
  logins: state.logins,
  doors: state.doors,
  deploys: state.deploys,
  permissions: state.permissions,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  usersReadAction: models.users.actions.read,
  doorsReadAction: models.doors.actions.read,
  deploysReadAction: models.deploys.actions.read,
  permissionsReadAction: models.permissions.actions.read,
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
