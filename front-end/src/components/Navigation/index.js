import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';

const colorOrange = "#FFA341";
const colorWhite = "#FFFFFF";

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout {
      id
      username
      loggedIn
    }
  }
`;

function LogoutButton() {
    const history = useHistory();

    const [logout] = useMutation(LOGOUT_MUTATION, {
        onCompleted: ( _ ) => {
            localStorage.clear();
            history.push("/");
        }
    });

    const Button = styled.button`
        border: none;
        background-color: ${colorWhite};
        font-size: 0.8em;
        text-decoration: none;
        color: ${colorOrange};
        padding: 0.5em 1em;
        margin: 0.5em;
        cursor: pointer;
        border-radius: 5em;

        &:disabled {
            opacity: 0.8;
        }
    `;

    return (
        <Button onClick={logout}>
            Logout
        </Button>
    );
}

export function MobileNavigation(props) {
    const Button = styled.button`
        background-color: transparent;
        border: none;
        padding: 0.5em;
        cursor: pointer;
        visibility: initial;

        @media only screen and (min-width: 850px) {
            visibility: hidden;
        }
    `;

    const Nav = styled.nav`
        padding: 0.39em 0.75em;
        background-color: ${colorOrange};
        display: flex;
        align-items: center;
        justify-content: space-between;
    `;

    const Div = styled.div`
        background-color: white;
        width: 1.75em;
        height: 0.12em;
        margin-bottom: 0.4em;

        &:last-child {
            margin: 0;
        }
    `;

    return (
        <Nav>
            <Button onClick={props.onClick}>
                <Div></Div>
                <Div></Div>
                <Div></Div>
            </Button>
            <LogoutButton/>
        </Nav>
    );
}
