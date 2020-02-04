import React, { Component } from "react";
import "./App.css";
import User from "./user/User";
import Posts from "./posts/Posts";
import Count from "./count/Count";
import Chatroom from "./chat/Chatroom";
import Chatform from "./chat/Chatform";
import { Route, Link } from "react-router-dom";
import Request from "./lib/Request";
import {
  Button,
  Jumbotron,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";

class App extends Component {
  state = {
    name: "Janat",
    isOpen: false
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    // const { name } = this.state;
    return (
      <div>
        <div>
          <Navbar style={{ backgroundColor: "#0a090c" }} dark expand="md">
            <NavbarBrand style={{ color: "#fcd328" }} href="/home">
              Home
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink style={{ color: "#fcd328" }} href="/users">
                    Users
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ color: "#fcd328" }} href="/posts">
                    Posts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ color: "#fcd328" }} href="/count">
                    Count
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ color: "#fcd328" }} href="/chat">
                    Chat
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <Route
          path="/home"
          component={() => (
            <div>
              <p>
                <font style={{fontSize: 100}}>My First React Application!</font>
              </p>
            </div>
          )}
        />
        <Route
          path="/users"
          component={() => (
            <Request url="https://jsonplaceholder.typicode.com/users">
              {data => <User data={data} />}
            </Request>
          )}
        />
        <Route
          path="/posts"
          component={() => (
            <Request url="https://jsonplaceholder.typicode.com/posts">
              {data => <Posts data={data} />}
            </Request>
          )}
        />
        <Route path="/count" component={Count} />
        <Route path="/chat" component={Chatform} />
        <Route path="/chatroom" component={Chatroom} />
      </div>
    );
  }
}
export default App;
