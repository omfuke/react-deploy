import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { branding } = this.props;
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {branding}
          </Link>
        </div>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/contact/add" className="nav-link">
                <i className="fas fa-plus"></i>
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="fas fa-home">
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
