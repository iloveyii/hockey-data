import React, { useState, useEffect } from "react";
import UserService from "./UserService";
import { useSnackbar } from 'notistack';


function UseForm(props) {
  const { defaultValues } = props;
  const [values, setValues] = useState(defaultValues);
  const userService = UserService();
  const { enqueueSnackbar } = useSnackbar();

  const onChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    const form = values;
    if (form.id) {
      if (userService.update(form)) {
        setValues({ ...defaultValues });
        enqueueSnackbar('Updated successfully', {variant: 'warning'});
      }
    } else {
      if (userService.create(form)) {
        setValues({ ...defaultValues });
        enqueueSnackbar('Created successfully', {variant: 'success'});
      }
    }
  };

  const onDelete = e => {
    e.preventDefault();
    userService.deleted(values);
    setValues({ ...defaultValues });
    enqueueSnackbar('Deleted successfully', {variant: 'error'});
  };

  return {
    values,
    setValues,
    onChange,
    onSubmit,
    onDelete
  };
}

export default UseForm;
