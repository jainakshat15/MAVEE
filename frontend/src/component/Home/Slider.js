import { ArrowLeftOutlined, ArrowRightOutlined  } from "@mui/icons-material";
import {  useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {

    const sliderItems = [
        {
          id: 1,
          img: "https://cdns.faridagupta.com/media/catalog/product/3/7/37_10.jpg",
          title: "WOMEN FASHION",
          desc: "DON'T COMPROMISE ON STYLE! BEST QUALITY PRODUCTS ONLY FOR YOU",
          bg: "e8e2e2",
          link: '/products?cat=women'
        },
        {
          id: 2,
          img: "https://cdns.faridagupta.com/media/catalog/product/full_image/1/_/1_162_160.jpg",
          title: "MEN'S FASHION",
          desc: "CHECKOUT OUT OUR LATEST ARRIVALS IN MEN'S FASHION",
          bg: "dbd8d1",
          link: '/products?cat=men'
        },
        {
          id: 3,
          img: "https://cdns.faridagupta.com/media/catalog/product/full_image/0/2/02_219.jpg",
          title: "LOVE FOR BAGS",
          desc: "DON'T MISS OUT THESE LOVELY BAGS IN OUR COLLECTION",
          bg: "dce4d9",
          link: '/products?cat=bags'
        },
      ];
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };


    // setTimeout(() => {
    //   handleClick("right")
    // }, 5000);
  

  
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link className="linkNavbar" to={item.link}>
              <Button>SHOW NOW</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" className="btnRight" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;