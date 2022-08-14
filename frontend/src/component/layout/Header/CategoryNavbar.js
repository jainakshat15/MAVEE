import React from 'react'
import './categoryNavbar.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';



const CategoryNavbar = () => {
  let history = useHistory();
  const womenUrl = '/products?cat=women'
  const menUrl = '/products?cat=men'
  const bagsUrl = '/products?cat=bags'
  const kidsUrl = '/products?cat=kids'
  return (
    <div className="navbar">
        <div className="dropdown">
      <button onClick={() => history.push(womenUrl)} className="dropbtn">Women <KeyboardArrowDownIcon className='dropIcon'/>
        <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        <Link to={womenUrl+`&subcat=traditional+wear`}>Traditional Wear</Link> 
        <Link to={womenUrl+`&subcat=kurta`}>Kurta</Link>
        <Link to={womenUrl+`&subcat=kurta+sets`}>Kurta Sets</Link>
        <Link to={womenUrl+`&subcat=lehenga+sets`}>Lehenga Sets</Link>
        <Link to={womenUrl+`&subcat=western+wear`}>Western Wear</Link>
        <Link to={womenUrl+`&subcat=top`}>Top</Link>
        <Link to={womenUrl+`&subcat=bottom+wear`}>Bottom Wear</Link>
        <Link to={womenUrl+`&subcat=shirts`}>Shirts</Link>
        <Link to={womenUrl+`&subcat=co+ords`}>Co Ords</Link>
      </div>
    </div>

    <div className="dropdown">
      <button onClick={() => history.push(menUrl)} className="dropbtn">Men <KeyboardArrowDownIcon className='dropIcon'/>
        <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
        <Link to={menUrl+`&subcat=traditional+wear`}>Traditional Wear</Link> 
        <Link to={menUrl+`&subcat=kurta`}>Kurta</Link>
        <Link to={menUrl+`&subcat=western+wear`}>Western Wear</Link>
        <Link to={menUrl+`&subcat=shirts`}>Shirts</Link>
        <Link to={menUrl+`&subcat=co+ords`}>Co Ords</Link>
        <Link to={menUrl+`&subcat=bottom+wear`}>Bottom Wear</Link>
      </div>
    </div>
    
    <div onClick={() => history.push(bagsUrl)} className="dropdown">
      <button className="dropbtn">Bags
        <i className="fa fa-caret-down"></i>
      </button>
    </div>

    <div onClick={() => history.push(kidsUrl)} className="dropdown">
      <button className="dropbtn">Kids
        <i className="fa fa-caret-down"></i>
      </button>
      
    </div>


  </div>
  )
}

export default CategoryNavbar