import React from "react";
import shortid from "shortid";
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";

import models from '../../store';

export default function UserService() {
  const create = form => {
    form.id = shortid.generate();
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      users = {
        list: [{ ...form }]
      };
    } else {
      if (users.list) {
        users.list.push({ ...form });
      } else {
        users.list = [{ ...form }];
      }
    }

    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const readAll = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    return (users && users.list) || [];
  };

  const update = form => {
    const users = JSON.parse(localStorage.getItem("users"));
    const list = readAll();
    const index = list.findIndex(u => u.id === form.id);
    if (index !== -1) {
      list[index] = form;
    }
    users.list = list;
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const deleted = form => {
    const users = JSON.parse(localStorage.getItem("users"));
    const list = readAll();
    users.list  = list.filter(u => u.id !== form.id);
    localStorage.setItem("users", JSON.stringify(users));
  };

  return {
    create,
    update,
    deleted,
    readAll
  };
}
