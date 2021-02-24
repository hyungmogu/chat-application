import React, { Component } from 'react';
import styled from 'styled-components';


const colorOrange = "#FFA341";

function ChatBox(props) {
    const texts = props.texts.split("\n").map(textline => <p>{textline}</p>);
    const username = localStorage.getItem("USERNAME");
    const Div = styled.div`
        display: flex;
        justify-content: ${props.postedBy.username === username ? "flex-end" : "initial"};
    `;

    const Section = styled.section`
        margin: 0;
        background-color: ${colorOrange};
        padding: 1em;
        border-radius: 1.5em;
        max-width: 12em;
        font-size: 0.8em;
        white-space: pre-wrap;
    `;

    const Header = styled.header`
        font-size: 0.7em;
        padding: 0.5em 1em;
    `;

    return (
        <Div>
            <article>
                <Header>
                    <span>{props.postedBy.username}</span>
                </Header>
                <Section>
                    {texts}
                </Section>
            </article>
        </Div>
    );
}


function ChatBoxList(props) {
    return props.chats.map(chat => <ChatBox key={chat.id} {...chat}/>)
}

export class ChatBoxSection extends Component {
    constructor(props) {
        super(props);
        this.scrollToBottomRef = React.createRef();
    }

    scrollToBottom = () => {
        this.scrollToBottomRef.current.scrollIntoView({ behavior: 'auto' })
    }

    componentDidMount () {
        this.scrollToBottom()
    }

    componentDidUpdate () {
        this.scrollToBottom()
    }

    render() {
        const Section = styled.section`
            flex-grow: 1;
            overflow-y: scroll;
            padding: 1em;
        `;

        return (
            <Section ref={this.sectionRef}>
                <ChatBoxList chats={this.props.chats}/>
                <div ref={this.scrollToBottomRef}/>
            </Section>
        );
    }
}