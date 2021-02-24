import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const colorGrey = "#EEEEEE";
const colorOrange = "#FFA341";
const colorWhite = "#FFFFFF";
const mobileNavigationHeight = "3.30em";

export function UserList(props) {
    const username = localStorage.getItem("USERNAME");
    const userList = props.users.map(user => <User key={user.id} {...user} isOwner={username === user.username}/>);
    const Ul = styled.ul`
        list-style: none;
        padding: 0;
        margin: 0;
        height: calc(100vh - ${mobileNavigationHeight});
        width: 15em;
        box-shadow: 2px 0px ${colorGrey};
    `;
    return (
        <Ul>
            {userList}
        </Ul>
    );
}

function User(props) {
    const Div = styled.div`
        color: ${colorWhite};
        background-color: ${colorOrange};
        padding: 0.8em;
        display: inline-block;
        border-radius: 50%;
        margin-right: 1em;

        div {
            width: 1.25em;
            height: 1.25em;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `;

    const Span = styled.span`
        font-size: 0.8em;
    `;

    const Li = styled.li`
        display: flex;
        align-items: center;
        padding: 0.5em 1em;
    `;

    return (
        <Li>
            <Div>
                <div>
                    <FontAwesomeIcon icon={faUser}/>
                </div>
            </Div>
            <Span>{props.username} {props.isOwner ? "(Me)" : ""}</Span>
        </Li>
    );
}
