import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { getHost } from "./utils/env";
import { Col, Form, Row, Stack } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        // todo: Implement API protection.
        // user
        //   .getIdToken(true)
        //   .then((token) => {
        //     fetch(`${getHost()}tokens`, {
        //       method: "PUT",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({
        //         email: user.email,
        //         token,
        //       }),
        //     }).then(() => navigate("/", { state: { token } }));
        //   })
        //   .catch((error) => console.error(error));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        // todo: Display invalid credentials.
      });
  };

  return (
    <div>
      <h2>JointGoals Admin</h2>
      <form>
        <DivMarginBottom>
          <LabelMarginRight htmlFor="email-address">
            Email address
          </LabelMarginRight>
          <input
            style={{ background: "white", color: "black" }}
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DivMarginBottom>
        <DivMarginBottom>
          <LabelMarginRight htmlFor="password">Password</LabelMarginRight>
          <input
            style={{ background: "white", color: "black" }}
            id="password"
            name="password"
            type="password"
            autoComplete="on"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DivMarginBottom>
        <div>
          <button onClick={onLogin}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

const DivMargin = styled.div`
  margin: 10px;
`;
const DivMarginBottom = styled.div`
  margin-bottom: 10px;
`;
const LabelMarginRight = styled.label`
  margin-right: 5px;
`;
