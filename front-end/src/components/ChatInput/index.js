import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const colorGrey = "#EEEEEE";

const Div = styled.div`
    background-color: ${colorGrey};
    padding: 1em;
    border-radius: 5em;
    display:flex;
    flex-grow: 1;
`;

const Textarea = styled.textarea`
    border: none;
    resize: none;
    width: 100%;
    background-color: ${colorGrey};
    text-decoration: none;
    padding: 1em;
    overflow-y: scroll;

    &:focus {
        outline: none;
    }
`;

function ChatTextArea(props) {
    return (
        <Div>
            <Textarea value={props.value} onChange={props.onChange}/>
        </Div>
    );
}

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

function SubmitButton(props) {
    return (
        <Button onClick={props.onClick} disabled={props.disabled}>
            <FontAwesomeIcon icon={faPaperPlane}/>
        </Button>
    );
}

const POST_MUTATION = gql`
    mutation PostMutation(
        $texts: String!
    ) {
        post(texts: $texts) {
            id
            postedBy {
            id,
                username
            }
            texts
        }
    }
`;

export function ChatInput(props) {
    const [texts, setText] = useState("");

    const isValid = (texts) => {
        if (!texts || texts.trim() === "") {
            return false;
        }

        return true;
    }

    const [post] = useMutation(POST_MUTATION, {
        variables: {
          texts: texts,
        },
        onCompleted: (_) => {
            setText("");
        },
        onError(e) {
            alert("Error occured");
        }
    });

    return (
        <>
            <ChatTextArea value={texts} onChange={ e => setText(e.target.value)}/>
            <SubmitButton onClick={post} disabled={!isValid(texts)}/>
        </>
    );
}
