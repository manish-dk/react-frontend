import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
// import "./LoginPage.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    var emailstr = document.getElementById("email").value;
    var passstr = document.getElementById("password").value;

    const url = "http://localhost:8090/api/login";

    var user = JSON.stringify({
      email: emailstr,
      password: passstr
    });

    console.log(user);

    try {
      let xhttp = new XMLHttpRequest();
      xhttp.open("POST", url);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhttp.setRequestHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS, HEAD"
      );
      xhttp.responseType = "text";
      xhttp.send(user);
      xhttp.onload = () => {
        console.log(xhttp.responseText);
      };
      alert("Logged in");
    } catch (e) {
      alert(e.message);
    }
  };
  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default Home;
