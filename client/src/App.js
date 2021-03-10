import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import ContactState from "./context/contact/contactState";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/alertState";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Alerts from "./components/layout/alerts";
import setAuthToken from "./utils/authToken";
import PrivateRoute from "./components/routing/privateRouting";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <ContactState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route path="/about" exact component={About} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/login" exact component={Login} />
                  <PrivateRoute path="/" exact component={Home} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ContactState>
      </AlertState>
    </AuthState>
  );
};

export default App;
