import axios from "axios";
import React, { Component } from "react";
import { Consumer } from "../context";

import "./addContact.css";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(formErrors).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

export default class EditContact extends Component {
  state = {
    name: "",
    email: "",
    formErrors: {
      name: "",
      email: "",
    },
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;

    this.setState({ name: contact.name, email: contact.email });
  }

  changeHandler = (e) => {
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email } = this.state;
    const { id } = this.props.match.params;

    const updateContact = { name, email };

    if (formValid(this.state)) {
      console.log(`--SUBMITING--
      name: ${this.state.name}
      email:${this.state.email}`);
    } else {
      console.log("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updateContact
    );
    const contact = res.data;

    dispatch({ type: "UPDATE_CONTACT", payload: contact });

    this.setState({ ...this.state, name: "", email: "" });

    this.props.history.push("/");
  };
  render() {
    const { name, email, formErrors } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form noValidate onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      noValidate
                      type="text"
                      name="name"
                      className={
                        formErrors.name.length > 0
                          ? "form-control form-control-lg error"
                          : "form-control form-control-lg"
                      }
                      placeholder="Enter Name..."
                      value={name}
                      onChange={this.changeHandler.bind(this)}
                    ></input>
                    {formErrors.name.length > 0 && (
                      <span className="errorMessage">{formErrors.name}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      noValidate
                      type="email"
                      name="email"
                      className={
                        formErrors.email.length > 0
                          ? "form-control form-control-lg error"
                          : "form-control form-control-lg"
                      }
                      placeholder="Enter Email..."
                      value={email}
                      onChange={this.changeHandler.bind(this)}
                    ></input>
                    {formErrors.email.length > 0 && (
                      <span className="errorMessage">{formErrors.email}</span>
                    )}

                    <input
                      type="submit"
                      value="Update Contact"
                      className="btn btn-light btn-block"
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
