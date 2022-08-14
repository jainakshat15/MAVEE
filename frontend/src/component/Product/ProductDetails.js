import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartAction'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
  Modal
} from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'
import Header from '../layout/Header/Header'
import { Close } from '@mui/icons-material'

const ProductDetails = ({ match }) => {
  const alert = useAlert()
  const dispatch = useDispatch()


  const { product, loading, error } = useSelector(
    (state) => state.productDetails,
  )

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [modalImage,setModalImage] = useState(null);

  const sizes = [
    {id:1, size: 'XS'},
    {id:2, size: 'S'},
    {id:3, size: 'M'},
    {id:4, size: 'L'},
    {id:5, size: 'XL'},
    {id:6, size: 'XXL'},
    {id:7, size: 'XXXL'},
  ]
  const kidsSizes = [
    {id:1, size: '2-3'},
    {id:2, size: '3-4'},
    {id:3, size: '4-6'},
    {id:4, size: '6-8'},
    {id:5, size: '8-10'},
    {id:6, size: '10-12'},
    {id:7, size: '12-14'},
  ]

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (reviewError) {
        alert.error(reviewError);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Review Submitted Successfully");
        dispatch({ type: NEW_REVIEW_RESET });
      }


    dispatch(getProductDetails(match.params.id))
  }, [dispatch, match.params.id, error, alert, reviewError, success])

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5
  }

  const increaseQuantity = () => {
    if (product.stock <= quantity) return
    const qty = quantity + 1
    setQuantity(qty)
  }

  const decreaseQuantity = () => {
    if (1 >= quantity) return
    const qty = quantity - 1
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    if(!selectedSize && (product.category !== 'bags')){
      alert.error('Please select a Size');
      return
    }
    dispatch(addItemsToCart(match.params.id, quantity,product.category === 'kids' ? selectedSize+' years' : selectedSize))
    alert.success('Item Added To Cart')
  }


  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const openModal = (url) =>{
    setShowModal(true);
    setModalImage(url);
  }


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                >
                  <div className='carouselContainerNew'>
                  <img className='modalImage' src={modalImage} alt="" />
                  <div className='closeContainer' onClick={() => setShowModal(false)}>
                    <Close />
                  </div>
                  
              </div>
                </Modal>
          <MetaData title="PRODUCT" />
          <Header/>
          <div className="ProductDetails">
            
            <div >
              <Carousel navButtonsAlwaysVisible={true} className="carousel">
                {product.images &&
                  product.images.map((item, i) => (
                    <img 
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                      onClick={() => openModal(item.url)}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>

                {(product.category !== 'bags' && product.category !== 'kids') && <div className="detailsBlock-3-0">
                    <h3 className='sizeHeading'>SIZE</h3>
                    <div className='allSizesContainer'>
                    {sizes.map((s) =>(
                      <div className={selectedSize === s.size ?'sizeContainer selectedSize' :'sizeContainer'} onClick={() => setSelectedSize(s.size)} key={s.id}>
                        <h4>{s.size}</h4>
                      </div>
                    ))}
                    </div>

                </div>}
                {(product.category === 'kids') && <div className="detailsBlock-3-0">
                    <h3 className='sizeHeading'>SIZE</h3><span>{`(in years)`}</span>
                    <div className='allSizesContainer'>
                    {kidsSizes.map((s) =>(
                      <div className={selectedSize === s.size ?'sizeContainer selectedSize' :'sizeContainer'} onClick={() => setSelectedSize(s.size)} key={s.id}>
                        <h4>{s.size}</h4>
                      </div>
                    ))}
                    </div>


                </div>}
                {product?.sizeChart?.url ?
                      <h3 className='sizeChartBtn' onClick={() => openModal(product?.sizeChart?.url)}>Size Chart</h3>
                     :<></>}

                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:{' '}
                  <b className={product.stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.stock < 1 ? 'OutOfStock' : 'InStock'}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description <p>{product.description}</p>
              </div>
              <button className="submitReview" onClick={submitReviewToggle}>Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard review={review} key={review._id} />
                ))}
            </div>
          ) : (
            <p style={{marginBottom: '10vh'}} className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default ProductDetails
