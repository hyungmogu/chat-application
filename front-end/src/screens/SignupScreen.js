import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const colorYellow = "#FFE24F";
const colorBrown = "#9A4D31";
const colorOrange = "#FFA341";
const colorWhite = "#FFFFFF";

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: ${colorOrange};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  color: ${colorWhite};
  width: 15em;
  display: flex;
  flex-direction: column;
`;

const H1 = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    display: block;
  }

  & > * {
    margin-bottom: 0.5em;
  }

  & > input:last-of-type {
    margin-bottom: 1.5em;
  }

  & > *:last-child {
    margin: 0;
  }
`;

const Input = styled.input`
  padding: 1em;
  border: none;
  background-color: white;
  border-radius: 5em;
  text-align: center;

  &:placeholder {
      text-align: center;
  }
`;

const ButtonPrimary = styled.button`
  padding: 1em;
  border: none;
  border-radius: 5em;
  text-align: center;
  cursor: pointer;
  background-color: ${colorBrown};
  color: ${colorWhite};
  font-size: 0.8em;

  &:disabled,
  &[disabled]{
    opacity: 0.6;
  }
`;

const ButtonSecondary = styled(NavLink)`
  padding: 1em;
  border: none;
  border-radius: 5em;
  text-align: center;
  cursor: pointer;
  background-color: ${colorYellow};
  font-size: 0.8em;
  text-decoration: none;
  color: black;
`;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $username: String!
    $password: String!
  ) {
    signup(
      username: $username
      password: $password
    ) {
      token
      user {
        username
      }
    }
  }
`;

function SignupScreen(props) {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      username: username,
      password: password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem("AUTH_TOKEN", signup.token);
      localStorage.setItem("USERNAME", signup.user.username);
      history.push('/chat');
    }
  });

  const isValid = (username, password, password2) => {
    if (!username || !password || !password2) {
      return false;
    }

    if (username.trim() === "") {
      return false;
    }

    if (password.trim() === "") {
      return false;
    }

    if (password2.trim() === "") {
      return false;
    }

    if (password.value !== password2.value) {
      return false;
    }

    return true;
  }

  const submit = (e) => {
    e.preventDefault();
    signup();
  }

  return (
    <Section>
      <Div>
        <H1>Chat Application</H1>
        <Form>
            <Input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
            <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <Input type="password" placeholder="Password Confirm" value={password2} onChange={e => setPassword2(e.target.value)}/>
            <ButtonPrimary type="submit" onClick={submit} disabled={!isValid(username, password, password2)}>
              Signup
            </ButtonPrimary>
            <ButtonSecondary to="/">
              Back
            </ButtonSecondary>
        </Form>
      </Div>
    </Section>
  );
}

export default SignupScreen;
