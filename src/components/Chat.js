import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { db } from "../firebase";
import Message from "./Message";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";
// import { behavior } from "@testing-library/user-event/dist/cjs/event/behavior/registry.js";

function Chat() {
  const roomId = useSelector(selectRoomId);
  const chatRef = useRef(null);
  const roomDocRef = roomId && doc(db, "rooms", roomId);
  const messagesCollectionRef =
    roomId && collection(db, "rooms", roomId, "messages");
  const orderedMessagesQuery =
    messagesCollectionRef &&
    query(messagesCollectionRef, orderBy("timestamp", "asc"));

  const [roomDetails] = useDocument(roomDocRef);
  const [roomMessages, loading] = useCollection(orderedMessagesQuery);
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);
  return (
    <ChatContainer>
      <>
        <Header>
          <HeaderLeft>
            <h4>
              <strong>#{roomDetails?.data().name}</strong>
            </h4>
            <StarBorderOutlinedIcon />
          </HeaderLeft>

          <HeaderRight>
            <p>
              <InfoOutlinedIcon /> Details
            </p>
          </HeaderRight>
        </Header>
        <ChatMessages>
          {roomMessages?.docs.map((doc) => {
            const { message, timestamp, user, userImage } = doc.data();
            return (
              <Message
                key={doc.id}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            );
          })}
          <ChatBottom ref={chatRef} />
        </ChatMessages>
        <ChatInput
          chatRef={chatRef}
          channelName={roomDetails?.data().name}
          channelId={roomId}
        />
      </>
    </ChatContainer>
  );
}

export default Chat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const ChatMessages = styled.div``;
const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 10px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;
