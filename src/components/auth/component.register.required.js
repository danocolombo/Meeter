import React, {Fragment} from "react";

import "./component.register.css";
import SignupRequired from "./signup.required";
const RegisterRequiredInfo = ({ name, email, password, password2, children, onChange, ...otherProps }) => (
  <Fragment>
      <SignupRequired name={name}/>
    <div className="registered-req-first-name-wrapper">
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => onChange(e)}
        className="registered-req-first-name"
      />
    </div>
    <div>
        <p>TEST</p>
    </div>
    <div className="form-group">
      <input
        type="email"
        placeholder="Email Address"
        name="email"
        value={email}
        onChange={(e) => onChange(e)}
      />
      <small className="form-text">
        This site uses Gravatar so if you want a profile image, use a Gravatar
        email
      </small>
    </div>
    <div className="form-group">
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => onChange(e)}
      />
    </div>
    <div className="form-group">
      <input
        type="password"
        placeholder="Confirm Password"
        name="password2"
        value={password2}
        onChange={(e) => onChange(e)}
      />
    </div>
    
  </Fragment>
);

export default RegisterRequiredInfo;
