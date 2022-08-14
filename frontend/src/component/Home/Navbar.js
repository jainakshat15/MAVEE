import { Badge } from "@mui/material";
import { Instagram, PersonOutlined, Search, ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import maveeLogo from '../../images/maveeLogo.png'

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
  background-color: white;
  
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
//   ${mobile({ display: "none" })}
// `;

// const SearchContainer = styled.div`
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
// `;

// const Input = styled.input`
//   border: none;
//   outline: none;
//   ${mobile({ width: "50px" })}
// `;

const Center = styled.div`
  flex: 1;
 display: flex;
 align-items: center;
 justify-content: center;
`;

const Logo = styled.h1`
  width: 6vmax;
  height: 3vmax;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({ searchActive}) => {
  const {cartItems} = useSelector((state) => state.cart) 
  const { isAuthenticated } = useSelector((state) => state.user)
  return (
    <Container >
      <Wrapper>
        <Left>
          <a className="linkNavbar" href="https://www.instagram.com/mavee.i/">
          <Instagram />
          </a>
           
           

        </Left>
        <Center>
        <Link className="linkNavbar" to={`/`}>
          <Logo><img className="maveeLogo" src={maveeLogo} alt="" /></Logo>
          </Link>
        </Center>
        <Right>
          <div style={{cursor: 'pointer'}} onClick={searchActive}>
          <Search />
          </div>
        
          {!isAuthenticated ? <MenuItem>
          <Link className="linkNavbar" to={`/login`}>
            SIGN IN
            </Link>
            </MenuItem>: 
            <MenuItem>
            <Link className="linkNavbar" to={`/account`}>
              <PersonOutlined/>
              </Link>
            </MenuItem> }
          
          <MenuItem >
          <Link className="linkNavbar" to={`/cart`}>
            <Badge badgeContent={cartItems.length} color="primary">
              <ShoppingCartOutlined />
            </Badge>
            </Link>
          </MenuItem>
          
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;