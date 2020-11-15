import Model from "./Model";
import Validator from "../../common/Validator";

class ActiveRecord extends Model {
  _mode = "create";
  _uploadProgress = 0;
  _form = {};
  _form_errors = {};

  constructor(name) {
    super(name);
    this.debug = true;
    this.setUploadProgress = this.setUploadProgress.bind(this);
  }

  get __class() {
    return "ActiveRecord";
  }

  set form(form) {
    this._form = {};
    for (let key in form) {
      // ?
      this._form[key] = form[key];
    }
    return this;
  }

  get form() {
    return this._form;
  }

  setUploadProgress(value) {
    this._uploadProgress = value;
    if (value > 95) this.resetForm();
    this._forceUpdate();
  }

  get uploadProgress() {
    return this._uploadProgress;
  }

  /**
   * Avoid problem of bound to unbound controls on form
   */
  resetForm() {
    Object.keys(this._form).forEach((key) => {
      this._form[key] = "";
    });
    this._uploadProgress = 0;
    return this._form;
  }

  submitForm(createAction, updateAction) {
    const formData = new FormData();
    Object.keys(this.form).map((key) => {
      formData.append(key, this.form[key]);
    });

    this.hasId
      ? updateAction({ formData, action: this.setUploadProgress })
      : createAction({
          formData,
          action: this.setUploadProgress,
        });
  }

  get hasId() {
    if (this.form["id"] && this.form["id"].length > 0) return true;
    if (this.form["_id"] && this.form["_id"].length > 0) return true;
    return false;
  }

  errors = (actions) => {
    const errors = [];
    // console.log(Object.keys(actions));
    Object.keys(actions).map((id) => {
      if (actions[id].res && actions[id].res.errors.length > 0) {
        // console.log('Err in RESP', actions[id].res);
        if (!actions[id].res.shown || actions[id].res.shown === false) {
          errors.push(actions[id].res);
        }
        actions[id].res.shown = true;
      }
    });
    return errors;
  };

  get form_errors() {
    return this._form_errors;
  }

  messages(type) {
    switch (type) {
      case this.types.create_success:
        return [{ type: "success", msg: "Created successfully" }];
      case this.types.read_success:
        return [{ type: "info", msg: "Read successfully" }];
      case this.types.update_success:
        return [{ type: "warning", msg: "Updated successfully" }];
      case this.types.delete_success:
        return [{ type: "error", msg: "Deleted successfully" }];
      default:
        return [{ type: "success", msg: "Success" }];
    }
  }

  validate = (form) => {
    this.form = form;
    const rules = this.rules();
    const validator = new Validator(form, rules);
    const valid = validator.check();
    this._form_errors = validator.errors;
    return valid;
  };
}

export default ActiveRecord;
