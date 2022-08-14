import React, { useEffect, useState } from 'react'
import './searchBar.css'
import { useHistory } from 'react-router-dom';
import {Close} from '@mui/icons-material'
import axios from 'axios';
import Card from '../../Home/Card';

const SearchBar = ({ currentSearchState, searchActive}) => {
    const [keyword, setKeyword] = useState("");
    const [products,setProducts] = useState([]);
    let link = `/api/v1/products?keyword=${keyword}`;

    const getSearchProducts = async() =>{
      if(!keyword)return;
      try{
        const { data } = await axios.get(link);
        setProducts(data?.products.slice(0,4));
        }catch(err){
          console.log(err);
        }
    }
    useEffect(() =>{
      getSearchProducts();
    },[keyword,link])


    let history = useHistory();
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            history?.push(`/products/${keyword}`);
        } else{
            history?.push("/products");
        }
    }
  return (
    <div className={currentSearchState ? 'searchContainer' :'searchContainer  notActive'}>
      <div onClick={searchActive} className='closeIcon'>
        <Close style={{fontSize: '1.5vmax'}}/>
      </div>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
          <input type="text"
            placeholder='Search a Product...'
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input type="submit" value="Search" />
      </form>
      {keyword && <div className='searchProductsContainer'>
          
          {products.length ?
              
                products.map(product =>(
                  <div className='searchProductCard'>
                    <Card product={product} key={product._id}/>
                    </div>
                ))
              
           :
            (<h3 className='noProductText'>No Products Found</h3>)}
      </div>}
    </div>
    
  )
}

export default SearchBar