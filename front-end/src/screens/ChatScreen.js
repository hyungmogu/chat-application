import styled from 'styled-components';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { ChatInput } from '../components/ChatInput';
import { ChatBoxSection } from '../components/ChatBox';
import { MobileNavigation } from '../components/Navigation';
import { UserList } from '../components/Users';

const mobileNavigationHeight = "3.30em";

const Div = styled.div`
    display: flex;
`;

const Section = styled.section`
    height: calc(100vh - ${mobileNavigationHeight});
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const ChatInputSection = styled.section`
    display: flex;
    padding: 1em;
`;

const QUERY = gql`
  query {
    users {
      id,
      username
    },
    chats {
      id,
      postedBy {
        username
      },
      texts
    }
  }
`;

const NEW_CHAT_SUBSCRIPTION = gql`
  subscription {
    newChat {
      id
      texts
      postedBy {
        id
        username
      }
    }
  }
`;

function ChatScreen() {
    const { data, subscribeToMore } = useQuery(QUERY);
    const chats = data && data.chats ? data.chats : [];
    const users = data && data.users ? data.users : [];

    subscribeToMore({
      document: NEW_CHAT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newChat = subscriptionData.data.newChat;
        console.log(prev);
        const exists = prev.chats.find(
          ({ id }) => id === newChat.id
        );
        if (exists) return prev;

        return Object.assign({}, prev, {
          chats: [...prev.chats, newChat],
          users: prev.users
        });
      }
    });

    return (
      <>
        <MobileNavigation/>
        <Div>
            <UserList users={users}/>
            <Section>
            <ChatBoxSection chats={chats}/>
            <ChatInputSection>
                <ChatInput/>
            </ChatInputSection>
            </Section>
        </Div>
      </>
    );
  }

  export default ChatScreen;
