import React, { Fragment, useEffect } from 'react';

import "./Home.css"

import MetaData from '../layout/MetaData';
import {clearErrors, getFeaturedProduct} from "../../actions/productAction";
import {useSelector, useDispatch} from "react-redux"
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import Card from './Card';

import CategoryItem from './CategoryItem';
import Slider from './Slider';

import Header from '../layout/Header/Header';
import headingUp from '../../images/headingDesignUp.png';
import headingDown from '../../images/headingDesignDown.png';
import OurTeamCard from './OurTeamCard';

const Home = () => {
    const alert = useAlert()
    const dispatch = useDispatch();
    const {loading, error, products} = useSelector(state =>state.featuredProducts)

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getFeaturedProduct())
    },[dispatch, error, alert]);

    

     const categories = [
        {
          id: 1,
          img: "https://cdn.shopify.com/s/files/1/0420/7073/7058/products/Snitch_May22_10683_1800x1800.jpg?v=1655192863",
          title: "MEN'S COLLECTION",
          link: '/products?cat=men'
        },
        {
          id: 2,
          img: "https://res.cloudinary.com/jainakshat/image/upload/v1674718428/products/womencategoryimage_vrn7fw.webp",
          title: "WOMEN WEAR",
          link: '/products?cat=women'
        },
        {
          id: 3,
          img: "https://cdns.faridagupta.com/media/catalog/product/full_image/0/1/01_203.jpg",
          title: "BAGS",
          link: '/products?cat=bags'
        },
      ];
      const ourTeam = [
        {
          id: 1,
          img: "https://cdn.faridagupta.com/media/media-content/163101856213.01.jpg",
          title: "BLOCK MAKING",
        },
        {
          id: 2,
          img: "https://cdn.faridagupta.com/media/media-content/163101857023.02.jpg",
          title: "BLOCK PRINTING",
        },
        {
          id: 3,
          img: "https://cdn.faridagupta.com/media/media-content/16310185782.03.jpg",
          title: "HAND EMBRIODERY",
        },
      ];

  return (
      <Fragment>
          {loading ? <Loader/> : <Fragment>
      <MetaData title='Mavee' />
      <Header/>
      <Slider />
      {/* <div className='headingWithDesignContainer'>
      <img className='headingImage' src={headingDown} alt="" />
        
        <h2 className='homeHeading'>Categories</h2>
        <img className='headingImage' src={headingUp} alt="" />
      </div> */}
      
        <div className="categoryContainer">
          
        {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
        </div>
      
        <div className='headingWithDesignContainer'>
      <img className='headingImage' src={headingDown} alt="" />
        
      <h2 className='homeHeading'>Top Picks</h2>

        <img className='headingImage' src={headingUp} alt="" />
      </div>

      <div className="container" id='container'>
          {products && products.map(product =>(
            //   <ProductCard product={product} key={product._id} />
              <Card product={product} key={product._id}/>
          ))}

      </div>

      <div className='headingWithDesignContainer'>
      <img className='headingImage' src={headingDown} alt="" />
        
      <h2 className='homeHeading'>Our Team</h2>

        <img className='headingImage' src={headingUp} alt="" />
      </div>

      <div className="categoryContainer">
          
        {ourTeam.map((item) => (
        <OurTeamCard item={item} key={item.id} />
      ))}
        </div>
  </Fragment>}
      </Fragment>
  );
};

export default Home;
