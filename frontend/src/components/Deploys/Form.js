import React from "react";
import {
  TextField,
  TextareaAutosize,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

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
      form: models.deploys.form,
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
    const model = models.deploys;
    const { form } = this.state;

    if (model && model.validate(form)) {
      console.log("Update or create ");
      if (form.id) {
        console.log("UPDATE");
        this.props.updateAction({ ...model.form });
      } else {
        console.log("CREATE");
        this.props.createAction({ ...model.form });
      }
      this.setState({ form: model.resetForm(), form_errors: {} });
      console.log("Door created;", model.form);
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
          helperText={this.display_error(this.state.form_errors.building)}
          error={this.state.form_errors.building ? true : false}
          onChange={this.onChange}
          value={form.name}
        />
        <TextField
          margin="normal"
          label="Type"
          variant="outlined"
          name="type"
          onChange={this.onChange}
          value={form.type}
          fullWidth
        />
        <TextField
          margin="normal"
          label="Github"
          variant="outlined"
          name="github_url"
          onChange={this.onChange}
          value={form.github_url}
        />
        <TextareaAutosize
          margin="normal"
          label="Shell"
          placeholder="Shell"
          rowsMax={15}
          rowsMin={10}
          variant="outlined"
          name="shell"
          onChange={this.onChange}
          value={form.shell}
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
 * @param statdeploys **/
const mapStateToProps = (state) => ({
  form: state.deploys.form,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  createAction: models.deploys.actions.create,
  readAction: models.deploys.actions.read,
  updateAction: models.deploys.actions.update,
  deleteAction: models.deploys.actions.delete,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapActionsToProps)(Form))
);
