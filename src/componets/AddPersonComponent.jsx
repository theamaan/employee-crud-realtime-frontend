import React, { Component } from "react";

import axios from "axios";
import "./AddPerson.css";
import { useParams } from "react-router-dom";
export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}
class AddPersonComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      firstName: "",
      lastName: "",
      email: "",
    };
    this.firstNameChangedHandler = this.firstNameChangedHandler.bind(this);
    this.lastNameChangedHandler = this.lastNameChangedHandler.bind(this);
    this.emailChangedHandler = this.emailChangedHandler.bind(this);
    this.saveOrUpdateClickHandler = this.saveOrUpdateClickHandler.bind(this);
    this.cancelClickHandler = this.cancelClickHandler.bind(this);
  }
  firstNameChangedHandler = (e) => {
    this.setState({ firstName: e.target.value });
  };
  lastNameChangedHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };
  emailChangedHandler = (e) => {
    this.setState({ email: e.target.value });
  };
  saveOrUpdateClickHandler = (e) => {
    if (this.state.id == -1) {
      e.preventDefault();

      let person = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      };

      console.log("Person -> ", JSON.stringify(person));
      axios.post("http://localhost:8080/api/persons", person).then((res) => {
        this.props.navigate("/persons");
      });
    } else {
      e.preventDefault();

      let person = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      };

      console.log("Person -> ", JSON.stringify(person));
      axios
        .put("http://localhost:8080/api/persons" + "/" + this.state.id, person)
        .then((res) => {
          this.props.navigate("/persons");
        });
    }
  };

  cancelClickHandler = () => {
    this.props.navigate("/");
  };
  getHeading() {
    // Check if the state's 'id' is equal to -1
    if (this.state.id == -1) {
      // If 'id' is -1, display the heading "Add Person"
      return <h3 className="text-center">Add Person</h3>;
    } else {
      // If 'id' is not -1, display the heading "Update Person"
      return <h3 className="text-center">Update Person</h3>;
    }
  }

  componentDidMount() {
    if (this.state.id == -1) {
      return;
    } else {
      axios
        .get("http://localhost:8080/api/persons" + "/" + this.state.id)
        .then((res) => {
          let person = res.data;
          this.setState({
            firstName: person.firstName,
            lastName: person.lastName,
            email: person.email,
          });
        });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {this.getHeading()}
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> First Name: </label>
                  <input
                    placeholder="eg., Amaan"
                    name="firstName"
                    className="form-control"
                    value={this.state.firstName}
                    onChange={this.firstNameChangedHandler}
                  ></input>
                </div>
                <div className="form-group">
                  <label> Last Name: </label>
                  <input
                    placeholder="eg., Ullah"
                    name="lastName"
                    className="form-control"
                    value={this.state.lastName}
                    onChange={this.lastNameChangedHandler}
                  ></input>
                </div>
                <div className="form-group">
                  <label> Email: </label>
                  <input
                    style={{ marginBottom: "20px" }}
                    placeholder="eg., theamaan13@gmail.com"
                    name="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.emailChangedHandler}
                  ></input>
                </div>
                <button
                  className="btn btn-success"
                  onClick={this.saveOrUpdateClickHandler}
                >
                  Save
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-danger"
                  onClick={this.cancelClickHandler}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddPersonComponent.propTypes = {};

export default withRouter(AddPersonComponent);
