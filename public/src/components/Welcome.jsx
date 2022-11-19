import React from 'react'
import styled from 'styled-components'
import Robot from "../assets/robot.gif"
import Logout from "./Logout";
export default function Welcome({currentUser}) {
  return (
    <Container>
    <div className='logout'>
      <Logout />
    </div>
        
        <div className='logout-less'>
        <img src={Robot} alt="Robot" />
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please select a chat to Start Messaging</h3>
        </div>
    </Container>
  )
}


const Container = styled.div`
.logout{
  margin: 20px;
}
.logout-less{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
img {
    height: 20rem;
}
span {
    color: #4e00ff;
}
}

`
