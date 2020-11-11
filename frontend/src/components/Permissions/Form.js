import React from "react";
import { TextField, Typography, Button, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import ButtonIcon from "../ButtonIcon";

import models from "../../store";

const styles = (theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: models.permissions.form,
      form_errors: {},
    };
  }

  setForm = (props) => {
    const { form } = props;
    if (Object.keys(form).length !== 0) {
      this.setState({ form });
    }
  };
  componentWillReceiveProps(nextProps, context) {
    this.setForm(nextProps);
    console.log("componentWillReceiveProps");
  }

  componentDidMount() {
    this.setForm(this.props);
    console.log("componentDidMount");
  }

  onCreate = (e) => {
    e.preventDefault();
    const model = models.permissions;
    const { form } = this.state;

    if (model && model.validate(form)) {
      console.log("Update or create ", form, model.form);
      if (form.id) {
        console.log("UPDATE");
        this.props.updateAction({ ...model.form });
      } else {
        console.log("CREATE");
        this.props.createAction({ ...model.form });
      }
      this.setState({ form: model.resetForm(), form_errors: {} });
      console.log("User created;", model.form);
    } else {
      this.setState({ form_errors: model.form_errors });
    }
  };

  onDelete = (e) => {
    const { form } = this.state;
    this.props.deleteAction({ ...form });
  };

  onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { form } = this.state;
    this.setState({ form: { ...form, [name]: value } });
  };

  display_error = (errors) => {
    if (!errors) return null;
    return errors.join(", ");
  };

  render() {
    const { classes } = this.props;
    const { form } = this.state;

    return (
      <form autoComplete="off" noValidate className={classes.form}>
        <TextField
          margin="normal"
          label="Name"
          variant="outlined"
          name="name"
          helperText={this.display_error(this.state.form_errors.name)}
          error={this.state.form_errors.name ? true : false}
          onChange={this.onChange}
          value={form.name}
        />
        <TextField
          margin="normal"
          label="Email"
          variant="outlined"
          name="email"
          helperText={this.display_error(this.state.form_errors.email)}
          error={this.state.form_errors.email ? true : false}
          onChange={this.onChange}
          value={form.email}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Building"
          variant="outlined"
          name="building"
          helperText={this.display_error(this.state.form_errors.building)}
          error={this.state.form_errors.building ? true : false}
          onChange={this.onChange}
          value={form.building}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Room"
          variant="outlined"
          name="room_number"
          helperText={this.display_error(this.state.form_errors.room_number)}
          error={this.state.form_errors.room_number ? true : false}
          onChange={this.onChange}
          value={form.room_number}
          fullWidth
        />

        <TextField
          margin="normal"
          label="Status"
          variant="outlined"
          name="status"
          helperText={this.display_error(this.state.form_errors.status)}
          error={this.state.form_errors.status ? true : false}
          onChange={this.onChange}
          value={form.status}
        />
        <Button
          style={{ marginTop: "1em" }}
          margin="normal"
          size="large"
          variant="contained"
          color="primary"
          onClick={this.onCreate}
        >
          Save
        </Button>
        {form.id && (
          <Button
            style={{ marginTop: "1em" }}
            margin="normal"
            size="large"
            variant="contained"
            color="secondary"
            onClick={this.onDelete}
          >
            Delete
          </Button>
        )}
      </form>
    );
  }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = (state) => ({
  form: state.permissions.form,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  createAction: models.permissions.actions.create,
  readAction: models.permissions.actions.read,
  updateAction: models.permissions.actions.update,
  deleteAction: models.permissions.actions.delete,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapActionsToProps)(Form))
);
