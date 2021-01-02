import axios from "axios";
import React, { Component } from "react";
import { Consumer } from "../context";
import { Link } from "react-router-dom";

class Contact extends Component {
  state = {
    showInfo: false,
  };

  onClickShow = (e) => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  deleteHandler = (id, dispatch) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => dispatch({ type: "DELETE", payload: id }));
  };

  render() {
    const { id, name, email } = this.props;
    const { showInfo } = this.state;
    return (
      <Consumer>
        {(value) => {
          const dispatch = value.dispatch;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i
                  onClick={this.onClickShow.bind(this)}
                  className="fas fa-sort-down"
                ></i>
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem",
                    }}
                  />
                </Link>
                <i
                  onClick={this.deleteHandler.bind(this, id, dispatch)}
                  style={{ float: "right", color: "red" }}
                  className="fas fa-trash-alt"
                ></i>
              </h4>
              {showInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">{email}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contact;
