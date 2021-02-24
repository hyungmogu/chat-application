import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const colorOrange = "#FFA341";

const Button = styled.button`
    border: none;
    background-color: white;
    font-size: 1.5em;
    text-decoration: none;
    color: ${colorOrange};
    padding: 0.5em;
    margin: 0.5em;
    cursor: pointer;

    &:disabled {
        opacity: 0.8;
    }
`;

export function SubmitButton(props) {
    return (
        <Button onClick={props.onClick} disabled={props.disabled}>
            <FontAwesomeIcon icon={faPaperPlane}/>
        </Button>
    );
}
