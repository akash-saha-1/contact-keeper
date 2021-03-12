import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./../../context/auth/authContext";
import AlertContext from "./../../context/alert/alertContext";
import Spinner from "./../layout/spinner";

const ResetPassword = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const {
    resetPassword,
    error,
    clearErrors,
    isAuthenticated,
    loading,
  } = authContext;
  const { email, password, password2 } = user;
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "Inavlid EmailId") {
      setAlert(error, "danger", 5000);
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "" || password2 === "") {
      setAlert("Please fill in all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      resetPassword({
        email,
        password,
      });
    }
    //console.log(user);
  };
  return (
    <div className="form-container">
      <h1>
        Reset <span className="text-primary">Password</span>
      </h1>
      {loading === "load" ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="5"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="5"
            />
          </div>
          <input
            type="submit"
            value="Reset Password"
            className="btn btn-primary btn-block"
          />
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
