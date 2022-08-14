import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css"
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination"
import Slider from "@mui/material/Slider"
import { Typography} from '@mui/material';
import {useAlert} from "react-alert"
import MetaData from "../layout/MetaData"
import Header from '../layout/Header/Header'


const Products = ({match,location}) => {
    const query = new URLSearchParams(location.search);
    const queryCat = query.get('cat')
    const subcat = query.get('subcat')

    
    
    const dispatch = useDispatch();
    const alert = useAlert();
    let {products,loading, error, productsCount, resultPerPage, filteredProductsCount} = useSelector(state => state.products)
    const keyword = match.params.keyword;
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 125000]);
    const [category, setCategory] = useState(queryCat? queryCat: "");
    const [subCategory, setSubCategory] = useState(subcat? subcat :"");
    const [sort, setSort] = useState('latest');
    

    const [rating, setRating] = useState(0);


    const setCurrentPageNo = (e) =>{
        setCurrentPage(e);
    }

    const priceHandler = (event, newPrice) =>{
        setPrice(newPrice);
    }

    useEffect(() => {
        setCategory(queryCat)
        setSubCategory(subcat);
    },[queryCat,subcat])


   
    useEffect(() =>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword,currentPage,price, category,subCategory, rating,sort));
    },[dispatch,keyword,currentPage, price, category, rating, alert, error, subCategory,sort])

    // useEffect(() => {
    //     if(sort === 'latest'){
    //        products.sort((a,b) => (new Date(b.createdAt) - new Date(a.createdAt)))
    //     }else if(sort === 'pricelh'){
    //        products.sort((a,b) => (a.price - b.price))
    //     }else if(sort === 'pricehl'){
    //        products.sort((a,b) => (b.price - a.price))
    //     }else if(sort === 'ratinglh'){
    //         products.sort((a,b) => (a.ratings - b.ratings))
    //     }else if(sort === 'ratinghl'){
    //         products.sort((a,b) => (b.ratings - a.ratings))
    //     }
    // },[sort])

    
    let count = filteredProductsCount;

  return <Fragment>
      
    
        <MetaData title="PRODUCTS-MAVEE"/>
        <Header />
        <div className='productsPageContainer'>
        <div className="filterBox">
            <Typography>Price</Typography>
            <Slider 
                value={price}
               
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={125000}
                size='small'
                color='secondary'
                onChangeCommitted={priceHandler}
            />
             <Typography>Ratings Above</Typography>
                <Slider
                value={rating}
                onChange={(e,newRating) =>{
                    setRating(newRating);
                }}
                valueLabelDisplay="auto"
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                size='small'
                color='secondary'

                />
                 <Typography>Sort</Typography>
                 <select value={sort} onChange={(e) => setSort(e.target.value)} className='selectSortOption'>
                    <option value="latest">Latest</option>
                
                    <option value='pricelh'>
                        Price - Low to High 
                    </option>
                    <option value='pricehl'>
                        Price - High to low 
                    </option>
                    <option value='ratinglh'>
                        Rating - Low to High 
                    </option>
                    <option value='ratinghl'>
                        Rating - High to Low 
                    </option>
        
              </select>

            {/* <Typography>Categories</Typography>
            <ul className="categoryBox">
                {categories.map((category) =>(
                    <li
                    className='category-link'
                    key={category}
                    onClick={() => setCategory(category)}
                    >{category}</li>
                    ))}
            </ul> */}
            
               
            </div>
            
        {loading ? <Loader /> : 
        <div className="products">
            {products?.length ?
                products?.map((product) =>(
                    <ProductCard key={product._id} product={product} />
                ))
                : <div className='noProductsContianer'><h3>No Products Found</h3></div>
            }
        </div>}
        </div>
            


        {resultPerPage < count && (
            <div className='paginationBox'>
            <Pagination 
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
            />
        </div>
        )}
    
  </Fragment>;
};

export default Products;
