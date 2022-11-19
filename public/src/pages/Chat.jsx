import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import Logo from "../assets/logo.svg";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
function Chat() {
  const socket = useRef();

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    fetchData();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      {/* <div className="brandd">
        <img src={Logo} alt="logo" />
        <h3>NetCon</h3>
        <MenuIcon className="w-5 flex"/>
      </div> */}
      {isLoaded && currentChat === undefined ? (
        <Welcome currentUser={currentUser} />
      ) : (
        <ChatContainer
          currentChat={currentChat}
          currentUser={currentUser}
          socket={socket}
        />
      )}

      <Contacts
        contacts={contacts}
        currentUser={currentUser}
        changeChat={handleChatChange}
      />
    </Container>
  );
}

const Container = styled.div`
  /* background-color: #131324; */

  /* .brandd {
    padding-top: .1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 6rem;
    }
    h3 {
      
      margin-top: 1.4rem;
      color: #0583f8;
      font-size: 2.5rem;
      text-transform: uppercase;
    }
  }
   */
  height: 100vh;
  width: 100vw;
  background-color: #638916;
  display: grid;
  grid-template-columns: 75% 25%;
  @media screen and (min-width: 720px) {
    grid-template-columns: 80% 20%;
  }
`;

export default Chat;
