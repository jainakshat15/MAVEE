  import { SearchOutlined, ShoppingCartOutlined} from "@mui/icons-material"
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemsToCart } from "../../actions/cartAction";

  
  const Card = ({ product }) => {
    const alert = useAlert()

    const dispatch = useDispatch()
    const addToCartHandler = () => {
      if(product.category !== 'bags'){
        alert.error('Please select a Size');
        return
      }
      dispatch(addItemsToCart(product._id, 1))
      alert.success('Item Added To Cart')
    }

    return (
      <Link className="containerNew" to={`/product/${product._id}`}>
      
        <img className="productImage" src={product.images[0].url}  alt="" />
        <div className="info">
          <div className="icon" onClick={addToCartHandler}>
            <ShoppingCartOutlined />
            </div>
            <div className="icon">
            <SearchOutlined />
            </div>

        </div>
        </Link>
    );
  };
  
  export default Card;