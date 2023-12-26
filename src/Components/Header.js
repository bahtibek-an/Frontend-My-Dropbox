import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { selectPhoto } from "../Slices/user/userSlice";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setBoolean } from "../Slices/Bool/boolSlice";

import { database } from '../firebase/firebase';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Header() {
  const photo = useSelector(selectPhoto);
  const dispatch = useDispatch();

  const history = useNavigate()
  const handleClick = () =>{
      signOut(database).then(val=>{
          console.log(val,"val")
          history('/')
      })
  }
  
  return (
    <Container>
      <Wrapper>
        <Link to="/">
          <Logo>
            <img src="/img/drpbx.png" alt="" />
            <span>Dropbox</span>
          </Logo>
        </Link>
        <RightContainer>
          <RightSection>
          <NewChannel onClick={() => dispatch(setBoolean({ modelBools: true }))}>
            <span onClick={() => dispatch(setBoolean({ modelBools: true }))}>
              Upload
            </span>
          </NewChannel>

          <LogOut>
            <button className="Btn" onClick={handleClick}>
              <div className="sign">
                <svg viewBox="0 0 512 512">
                  <path
                    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                  </path>
                </svg>
              </div>
              <div className="text">Logout</div>
            </button>
          </LogOut>
          <Link to="/profile">
            <Avatar src={photo} />
          </Link>
          </RightSection>
        </RightContainer>
      </Wrapper>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #ffffff;
  padding: 2px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
  }

  span {
    font-family: "Product Sans", Arial, sans-serif;
    color: #5f6368;
    font-size: 22px;
    padding-left: 8px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: #5f6368;
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 200ms ease-out;
    :hover {
      background-color: rgba(0, 0, 0, 0.09);
    }
  }

  .app {
    margin-right: 15px;
  }
`;

const NewChannel = styled.div`
  width: 118px;
  height: 48px;
  background-color: white;
  border-radius: 24px;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 01);
  transition: all 200ms ease-out;
  margin-right: 30px;

  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    &::before {
      content: url("./img/upload.png");
      height: 36px;
      padding-right: 10px;
    }
  }
`;

const LogOut = styled.div`
  .Btn {
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: .3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background-color: #0084ff;
  }

  /* plus sign */
  .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: white;
  }
  /* text */
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: .3s;
  }
  /* hover effect on button width */
  .Btn:hover {
    width: 150px;
    border-radius: 40px;
    transition-duration: .3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: .2s;
    padding-left: 20px;
  }
  /* hover effect button's text */
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: .2s;
    padding-right: 10px;
  }
  /* button click effect*/
  .Btn:active {
    transform: translate(2px ,2px);
  }
`;