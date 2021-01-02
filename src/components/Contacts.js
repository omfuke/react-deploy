import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../context";

class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {(val) => {
          const { contacts } = val;
          return contacts.map((contact) => (
            <Contact
              key={contact.id}
              id={contact.id}
              name={contact.name}
              email={contact.email}
            />
          ));
        }}
      </Consumer>
    );
  }
}
export default Contacts;
