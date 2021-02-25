import styled from 'styled-components';
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ChatInput } from '../components/ChatInput';
import { ChatBoxSection } from '../components/ChatBox';
import { MobileNavigation } from '../components/Navigation';
import { UserList, UserListMobile } from '../components/Users';

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
    participants {
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

const NEW_PARTICIPANT_SUBSCRIPTION = gql`
  subscription {
    newParticipant {
      id
      username
    }
  }
`;

const REMOVE_PARTICIPANT_SUBSCRIPTION = gql`
  subscription {
    removeParticipant {
      id
      username
    }
  }
`;

function ChatScreen() {
    const [toggled, setToggled] = useState(false);
    let chats;
    let participants;

    const { data, subscribeToMore } = useQuery(QUERY);
    chats = data && data.chats ? data.chats : [];
    participants = data && data.participants ? data.participants : [];

    subscribeToMore({
      document: NEW_CHAT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newChat = subscriptionData.data.newChat;
        const exists = prev.chats.find(
          ({ id }) => id === newChat.id
        );
        if (exists) return prev;

        return Object.assign({}, prev, {
          chats: [...prev.chats, newChat]
        });
      }
    });

    subscribeToMore({
      document: NEW_PARTICIPANT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newParticipant = subscriptionData.data.newParticipant;
        const exists = prev.participants.find(
          ({ id }) => id === newParticipant.id
        );
        if (exists) return prev;

        return Object.assign({}, prev, {
          participants: [...prev.participants, newParticipant]
        });
      }
    });

    subscribeToMore({
      document: REMOVE_PARTICIPANT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        let res = [];

        const exitedParticipant = subscriptionData.data.removeParticipant;
        const exists = prev.participants.find(
          ({ id }) => id === exitedParticipant.id
        );

        if (!exists) return prev;

        for (let participant of prev.participants) {
          if (participant.id === exitedParticipant.id) {
            continue;
          }
          res.push(participant);
        }

        return Object.assign({}, prev, {
          participants: res
        });
      }
    });


    return (
      <>
        <MobileNavigation onClick={_ => setToggled(!toggled)}/>
        <Div>
            <UserList users={participants}/>
            <UserListMobile users={participants} toggled={toggled}/>
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
