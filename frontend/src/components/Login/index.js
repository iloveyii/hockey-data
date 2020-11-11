import React from "react";
import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/styles";
import IconTextField from "../IconTextField";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { ObjectID } from "bson";
import ColoredLinearProgress from "../LineProgress";

import models from "../../store";

import "./style.css";
import { CenterFocusStrong } from "@material-ui/icons";

const styles = (theme) => ({
  root: {
    // marginTop: theme.spacing(1),
    textAlign: "center",
    "& .MuiCardMedia-root": {
      margin: theme.spacing(2),
    },
  },
  outer: {
    display: "flex",
    flexDirection: "column",
    border: "none",
  },
  details: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    textAlign: "center",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  icon: {
    display: "flex",
    alignSelf: "center",
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: models.logins.form,
      form_errors: {},
      start_login: false,
    };
  }

  onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { form } = this.state;
    this.setState({ form: { ...form, [name]: value } });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { createAction } = this.props;
    const { email, password } = this.state.form;
    const id = new ObjectID().toString();
    this.setState({ form: { id, email, password }, start_login: true });

    console.log({ id, email, password });
    setTimeout(() => {
      createAction({ id, email, password });
    }, 1200);
  };

  componentDidMount() {
    this.setState({ form: { email: "admin@admin.com", password: "admin" } }); // @todo - remove
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { actions } = nextProps;
    console.log("componentWillReceiveProps", actions);
    const { id } = this.state.form;
    this.setState({ start_login: false });

    if (this.authenticated(id, actions) === true) {
      this.props.history.push("/dashboard");
    }
    /*
    if (this.authenticated(nextProps)) {
      this.props.history.push("/receipt");
    } else {
      const errors = {
        type: "alert-danger",
        header: "Fel",
        errors: logins.form,
      };
      this.setState({ errors });
    } */
  }

  authenticated = (id, actions) => {
    if (
      id &&
      actions[id] &&
      actions[id].res &&
      actions[id].res.status === true
    ) {
      console.log(JSON.stringify(actions[id].res));
      return true;
    } else {
      console.log("no action for id " + id);
      return false;
    }
  };

  onKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleLogin(e);
    }
  };

  render() {
    const { classes } = this.props;
    const imageUrl = "/images/lock.png";
    const title = "Login";
    const subtitle = "Sign up";
    const { form, start_login } = this.state;
    const { email, password } = form;

    return (
      <>
        {start_login && <ColoredLinearProgress />}
        <div className="top">
          <div className="login-container">
            <div className="login-header">
              <img src={imageUrl} style={{ height: "80px" }} />
            </div>
            <div className="login-content">
              <Paper className={classes.root}>
                <Card
                  className={classes.outer}
                  variant="outlined"
                  raised={true}
                >
                  <CardContent className={classes.details}>
                    <Typography
                      color="primary"
                      style={{ flex: 1 }}
                      component="h4"
                      variant="h4"
                    >
                      {title}
                    </Typography>

                    <form>
                      <IconTextField
                        type="text"
                        Icon={EmailOutlinedIcon}
                        name="email"
                        label="Email"
                        value={email}
                        onChange={this.onChange}
                      />
                      <IconTextField
                        type="password"
                        Icon={LockOutlinedIcon}
                        name="password"
                        label="Password"
                        value={password}
                        onKeyDown={this.onKeyDown}
                        onChange={this.onChange}
                      />
                      <Button
                        style={{
                          marginTop: "1em",
                          width: "80%",
                          marginTop: "30px",
                        }}
                        margin="normal"
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        onClick={this.handleLogin}
                        disabled={start_login}
                      >
                        Login
                      </Button>
                    </form>
                  </CardContent>
                  <CardActionArea>
                    <div className="card-footer">
                      <div className="section">
                        <LockOutlinedIcon
                          className={classes.icon}
                          fontSize="large"
                        />
                        <strong>Register</strong>
                        <p style={{ margin: 0 }}>Not a member yet ?</p>
                      </div>
                      <div className="section">
                        <HomeWorkOutlinedIcon
                          className={classes.icon}
                          fontSize="large"
                        />
                        <strong>Return to Home page</strong>
                        <p style={{ margin: 0 }}>Go back to home page.</p>
                      </div>
                    </div>
                  </CardActionArea>
                </Card>
              </Paper>
            </div>
          </div>
        </div>
        <div className="bottom"></div>
      </>
    );
  }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = (state) => ({
  form: state.logins.form,
  actions: state.logins.actions,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  createAction: models.logins.actions.create,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapActionsToProps)(Login))
);
