import React, { useState } from 'react';
import styled from 'styled-components';

const colorOrange = "#FFA341";

export function MobileNavigation() {
    const [toggled, setToggled] = useState(false);
    const Button = styled.button`
        background-color: transparent;
        border: none;
        padding: 0.5em;
        cursor: pointer;
    `;

    const Nav = styled.nav`
        padding: 0.75em;
        background-color: ${colorOrange};
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
            <Button onClick={_ => setToggled(!toggled)}>
                <Div></Div>
                <Div></Div>
                <Div></Div>
            </Button>
        </Nav>
    );
}
