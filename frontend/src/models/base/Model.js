import { call, put } from "redux-saga/effects";
import axios from "axios";
import { ObjectID } from "bson";
import { apiServer } from "../../common/constants";

class Model {
  // Constructor - Name, forceUpdate
  constructor(name) {
    this.name = name;
    this.forceUpdate = () => null;
    this.server = apiServer + "/api/v1/" + name;
    this.debug = true;
  }

  forceUpdate = () => null;

  log(msg) {
    if (this.debug) console.log(msg);
  }

  // CRUD constants
  get types() {
    return {
      create: this.name + ".create",
      create_success: this.name + ".create.success",
      create_fail: this.name + ".create.fail",

      read: this.name + ".read",
      read_success: this.name + ".read.success",
      read_fail: this.name + ".read.fail",

      edit: this.name + ".edit",
      edit_reset: this.name + ".edit_reset",
      edit_success: this.name + ".edit.success",
      edit_fail: this.name + ".edit.fail",

      update: this.name + ".update",
      update_success: this.name + ".update.success",
      update_fail: this.name + ".update.fail",

      delete: this.name + ".delete",
      delete_success: this.name + ".delete.success",
      delete_fail: this.name + ".delete.fail",
    };
  }

  // ACTIONS
  get actions() {
    return {
      create: (form) => {
        const id = form.id ? form.id : (form.id = new ObjectID().toString());
        return {
          type: this.types.create,
          payload: {
            id,
            type: this.types.create,
            form,
            list: [],
            method: "POST",
          },
        };
      },
      create_success: (action, response) => ({
        type: this.types.create_success,
        payload: {
          id: action.payload.id,
          type: action.payload.type,
          status:
            response.success === true || response.success === false
              ? response.success
              : true,
          form: response.data,
          list: response.data,
          errors: [],
        },
      }),
      create_fail: (action, error) => ({
        type: this.types.create_fail,
        payload: {
          id: action.payload.id,
          type: action.payload.type,
          status: "fail",
          form: action.payload.form,
          list: [],
          errors: [{ type: "error", msg: error }],
        },
      }),

      //{id, type, form, list, method} - REQUEST
      read: (form) => ({
        type: this.types.read,
        payload: {
          id: new ObjectID().toString(),
          type: this.types.read,
          form,
          list: [],
          method: "GET",
        },
      }),
      // {id, type, status, form, list, errors} - RESPONSE
      read_success: (action, response) => ({
        type: this.types.read_success,
        payload: {
          id: action.payload.id,
          type: action.payload.type,
          status: response.success,
          form: response.data,
          list: response.data,
          errors: [],
        },
      }),
      // {id, status, form, list, errors}
      read_fail: (action, error) => ({
        type: this.types.read_fail,
        payload: {
          id: action.payload.id,
          type: action.payload.type,
          status: "fail",
          form: action.payload.form,
          list: [],
          errors: [{ type: "error", msg: error }],
        },
      }),

      edit: (form) => {
        const id = form.id;
        return {
          type: this.types.edit,
          payload: { id, type: this.types.edit, form, method: "EDIT" },
        };
      },
      edit_reset: (form) => ({
        type: this.types.edit_reset,
        payload: {
          id: new ObjectID().toString(),
          type: this.types.edit_reset,
          form,
          method: "EDIT_RESET",
        },
      }),
      update: (form) => {
        const id = form.id;
        return {
          type: this.types.update,
          payload: {
            id,
            type: this.types.update,
            form,
            list: [],
            method: "PUT",
          },
        };
      },
      update_success: (action, response) => ({
        type: this.types.update_success,
        payload: {
          id: action.payload.id,
          type: action.payload.type,
          status: response.success,
          form: response.data[0],
          list: response.data,
          errors: [],
        },
      }),
      update_fail: (action, error) => ({
        type: this.types.update_fail,
        payload: {
          id: action.payload.id,
          type: action.payload.type,
          status: "fail",
          form: action.payload.form,
          list: [],
          errors: [{ type: "error", msg: error }],
        },
      }),

      delete: (form) => ({
        type: this.types.delete,
        payload: {
          id: new ObjectID().toString(),
          type: this.types.delete,
          form,
          list: [],
          method: "DELETE",
        },
      }),
      delete_success: (action, response) => ({
        type: this.types.delete_success,
        payload: {
          id: action.payload.id,
          type: action.payload.type,
          status: response.success,
          form: response.data,
          list: response.data,
          errors: [],
        },
      }),
      delete_fail: (action, error) => ({
        type: this.types.delete_fail,
        payload: {
          id: action.payload.id,
          type: action.payload.type,
          status: "fail",
          form: action.payload.form,
          list: [],
          errors: [{ type: "error", msg: error }],
        },
      }),
    };
  }

  // REDUCERS
  get reducers() {
    const initState = {
      form: {},
      list: [],
      actions: {
        id1: {
          req: { id: 1, type: "user.read", form: {}, list: [], method: "get" },
          res: { id: 1, status: "success", form: {}, list: [], errors: [] },
        },
      },
    };

    let newState = {};

    const reducer = (state = initState, action = {}) => {
      switch (action.type) {
        // ----------------------------------
        // Dealing with actions.req
        // ----------------------------------
        case this.types.read:
          // this.log("Inside Reducer read action is :  ");
          // this.log(action);
          var { id, type, form, list, method } = action.payload;
          // Place action in state's actions
          newState = { ...state };
          newState.actions[id] = {
            req: action.payload,
          };
          return newState;

        // ----------------------------------
        // Dealing with form - only
        // ----------------------------------
        case this.types.edit: // Place payload form of what is editing for global access in components
          var { form } = action.payload;
          // Place action in state's form
          newState = { ...state, form };
          return newState;

        case this.types.edit_reset: // Place payload form of what is editing for global access in components
          var { form } = action.payload;
          // Place action in state's form
          newState = { ...state, form: this.resetForm() };
          return newState;

        // ----------------------------------
        // Dealing with list and actions.req
        // ----------------------------------
        case this.types.update: // Place action in state's actions - AND update list instantly
          var { id, type, form, list, method } = action.payload;
          // Place action in state's actions
          newState = { ...state };
          const index = newState.list.findIndex((item) => item.id === form.id);
          if (index !== -1) {
            // console.log("UPDATE index: ", index, form, newState.list);
            newState.list[index] = form;
          } else {
            // console.log("UPDATE : ", form, newState.list);
          }
          newState.actions[id] = {
            req: action.payload,
          };
          return newState;

        case this.types.create: // Place action in state's actions
          var { id, type, form, list, method } = action.payload;
          // Place action in state's actions
          newState = { ...state };
          newState.list.push({ ...form });
          newState.actions[id] = {
            req: action.payload,
          };
          return newState;

        case this.types.delete: // Place action in state's actions.req - make instant delete
          var { id, type, form, list, method } = action.payload;
          newState = { ...state };
          newState.list = newState.list.filter((item) => item.id !== form.id);
          newState.actions[id] = {
            req: action.payload,
          };
          return newState;

        // ----------------------------------
        // Dealing with list and  actions.res
        // ----------------------------------
        case this.types.read_success:
          // console.log("READ/CREATE SUCCESS HERE - Dealing with list ", action);
          var { id, type, status, form, list, errors } = action.payload;
          if (status === true) {
            // Put data in list
            // action has id then it is single read else readAll
            if (action.payload.form.id) {
              // single read
              newState = { ...state, form };
            } else {
              newState = { ...state, list }; // fill list  from new data
            }
            if (newState.actions[id]) {
              newState.actions[id]["res"] = action.payload;
            }
          } else {
            // Place res in action's res success === fail is on server side and not http error
            // console.log("ID not exist in actions");
            newState = { ...state }; // there was an error (server side) therefore don't touch list and form
            if (newState.actions[id]) {
              newState.actions[id]["res"] = action.payload;
            }
          }

          return newState;

        // ----------------------------------
        // Dealing with form and actions.res
        // ----------------------------------
        case this.types.create_success: // Clear form  - Put res in state
        case this.types.update_success: // Clear form - Put res in state
        case this.types.delete_success: //  Put res in state
          // console.log("DELETE SUCCESS HERE - Dealing with form ", action);
          var { id, type, status, form, list, errors } = action.payload;
          console.log("MODEL", action);
          if (status === true) {
            // Put data in list
            newState = { ...state, form: this.form }; // fill both list and form from new data/clear
            if (newState.actions[id]) {
              // Hack for logs
              if (this.name.includes("log")) {
                newState.logs = action.payload.form.logs
                  ? action.payload.form.logs
                  : action.payload.form;
              }
              newState.actions[id]["res"] = action.payload;
              if (newState.actions[id]["res"]["errors"].length === 0) {
                newState.actions[id]["res"]["errors"] = this.messages(
                  action.type
                );
              }
            }
          } else {
            // Place res in action's res success === fail is on server side and not http error
            newState = { ...state }; // there was an error (server side) therefore don't touch list and form
            if (newState.actions[id]) {
              action.payload.errors = [
                {
                  type: "error",
                  msg: action.payload.form[0]
                    ? action.payload.form[0]
                    : action.payload.form,
                },
              ];
              newState.actions[id]["res"] = action.payload;
              newState.list.push({ ...newState.form });
            }
          }

          return newState;

        // ----------------------------------
        // Dealing with failted actions.res
        // ----------------------------------
        case this.types.update_fail: // handle http exceptions
        case this.types.delete_fail: // handle http exceptions
        case this.types.create_fail: // handle http exceptions
        case this.types.read_fail: // handle http exceptions
          // console.log("READ FAIL in redu", action);
          var { id, type, status, form, list, errors } = action.payload;
          // Place res in action's res success === fail is on server side and not http error
          newState = { ...state };
          if (newState.actions[id]) {
            newState.actions[id]["res"] = action.payload;
          } else {
            // console.log("Action with id not found", action);
          }
          return newState;

        default:
          // this.log("Inside default reducer of class " + this.name);
          return state;
      }
    };

    return reducer;
  }

  // SAGAS
  get sagas() {
    const $this = this; // new Model('show');

    const create = function* (action) {
      // console.log("Action in saga", action.payload);
      try {
        const response = yield call($this.api.create, action.payload);
        // console.log("CREATE ", response);
        if (response && typeof response === "object") {
          console.log("CREATE if", response);
          yield put($this.actions.create_success(action, response));
          // yield put($this.actions.read());
        } else {
          // console.log("CREATE fail", response);
          yield put($this.actions.create_fail(action, response));
        }
      } catch (err) {
        // console.log("CREATE err", err);
        yield put($this.actions.create_fail(action, err.message));
      }
    };

    const read = function* (action) {
      try {
        const response = yield call($this.api.read, action.payload);
        if (response && typeof response === "object") {
          // console.log("READ saga data received ", response);
          yield put($this.actions.read_success(action, response));
        } else {
          yield put($this.actions.read_fail(action, response));
        }
      } catch (err) {
        // console.log("ERROR read : ", err.message);
        yield put($this.actions.read_fail(action, err.message));
      }
    };

    const update = function* (action) {
      try {
        const response = yield call($this.api.update, action.payload);
        if (response && typeof response === "object") {
          // console.log("UPDATE response ", action, response);
          yield put($this.actions.update_success(action, response));
        } else {
          yield put($this.actions.update_fail(action, response));
        }
      } catch (err) {
        // console.log(err);
        yield put($this.actions.update_fail(action, err.message));
      }
    };

    const deleted = function* (action) {
      try {
        // IF reset
        // console.log("deleted saga ", action);
        const response = yield call($this.api.delete, action.payload);
        if (response && typeof response === "object") {
          yield put($this.actions.delete_success(action, response));
        } else {
          yield put($this.actions.delete_fail(action, response));
        }
      } catch (err) {
        yield put($this.actions.delete_fail(action, err.message));
      }
    };

    return {
      create,
      read,
      update,
      deleted,
    };
  }

  // API
  get api() {
    return {
      read: (payload) => {
        // console.log("API read", payload);
        let suffix = payload.form.id ? `/${payload.form.id}` : "";
        suffix = payload.form.suffix ? payload.form.suffix : suffix;
        return axios
          .get(this.server + suffix)
          .then((res) => res.data)
          .catch((error) => {
            // console.dir(error);
            throw new Error(error);
          });
      },
      create: (payload) => {
        const config = {
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            payload.action && payload.action(percentCompleted);
          },
        };
        // console.log("API create", payload);
        return axios
          .post(this.server, payload.form, config)
          .then((res) => res.data)
          .catch((error) => {
            // console.dir(error);
            throw new Error(error);
          });
      },
      delete: (payload) =>
        axios
          .delete(this.server + "/" + payload.form.id)
          .then((res) => res.data)
          .catch((error) => {
            // console.dir(error);
            throw new Error(error);
          }),
      update: (payload) => {
        return axios
          .put(this.server + "/" + payload.form.id, payload.form)
          .then((res) => {
            // console.log("Update response: ", res);
            return res.data;
          })
          .catch((error) => {
            // console.dir(error);
            throw new Error(error);
          });
      },
    };
  }
}

export default Model;
