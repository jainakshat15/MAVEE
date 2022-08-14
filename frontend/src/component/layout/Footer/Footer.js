import {
  Instagram,
  MailOutline,
  Phone,
  Room,
} from '@mui/icons-material';
import styled from "styled-components";
import { mobile } from "../../responsive";
import background from '../../../images/footerBackground.jpg'
import './Footer.css'
import maveeLogo from '../../../images/maveeLogo.png'
import { Link } from 'react-router-dom';

const Container = styled.div`
 
  border-top: 2px solid teal;
  background-image: url(${background});
  width: 100vw;
  height: 30vh;
  position: relative;
`;
const Layer = styled.div`
  background-color: rgba(248, 247, 216, 0.9);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  color: black;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
`;

const Logo = styled.h1`
  width: 6vmax;
  height: 3vmax;
`;
const Desc = styled.p`
  margin: 20px 0px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 20px;
  color: black;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    

`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
`;

// const Payment = styled.img`
//     width: 50%;
// `;

const Footer = () => {
  return (
    <Container>
      <Layer>
      <Left>

      <Logo><img className="maveeLogo" src={maveeLogo} alt="" /></Logo>
        <Desc>
          PREMIUM QUALITY IS OUR TOP PRIORITY
        </Desc>
        <SocialContainer>
        <a className="linkNavbar" href="https://www.instagram.com/mavee.i/">
          <SocialIcon color="E4405F">
          
          <Instagram />
          
          </SocialIcon>
          </a>
          
        </SocialContainer>
      </Left>
      <Center>
        <Title>DISCOVER</Title>
        <List>
          
          <ListItem><Link className="linkNavbar" to={`/`}>Home</Link></ListItem>
          <ListItem><Link className="linkNavbar" to={`/cart`}>Cart</Link></ListItem>
          <ListItem><Link className="linkNavbar" to={`/products?cat=men`}>Man Fashion</Link></ListItem>
          <ListItem><Link className="linkNavbar" to={`/products?cat=women`}>Woman Fashion</Link></ListItem>
          <ListItem><Link className="linkNavbar" to={`/account`}>My Account</Link></ListItem>
          <ListItem><Link className="linkNavbar" to={`/contact`}>Contact Us</Link></ListItem>

          
        </List>
      </Center>
      <Right>
        <Title>GET IN TOUCH</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> Sanganer, Jaipur, Raj. 302029
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/>+917976562808
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> mavee@gmail.com
        </ContactItem>
        
      </Right>
      </Layer>
    </Container>
  );
};

export default Footer;
