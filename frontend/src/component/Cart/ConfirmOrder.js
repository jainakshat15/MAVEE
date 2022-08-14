import { CheckCircle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { clearErrors, myOrders } from '../../actions/orderAction';
import Header from '../layout/Header/Header';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import "./ConfirmOrder.css"

const ConfirmOrder = ({history}) => {
    const dispatch = useDispatch();
    const [couponApplied,setCouponApplied] = useState(false);
    const [coupon,setCoupon] = useState('');
    const [totalPrice,setTotalPrice] = useState(0);


    const { shippingInfo, cartItems} = useSelector((state) => state.cart);
    const { error, orders} = useSelector((state) => state.myOrders);

    const {user} = useSelector((state) => state.user);    
    const alert  = useAlert();
    const subtotal = cartItems.reduce(
        (acc,item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = 0;

    useEffect(() => {
        setTotalPrice(subtotal + tax) ;
    },[subtotal,tax])
    

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`; 

    const proceedToPayment = () =>{
        const data = {
            subtotal,
            tax,
            shippingCharges,
            totalPrice,
        };
        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        history.push("/process/payment");
    }


    const applyCoupon = () => {
        if(coupon.toUpperCase() === 'MAVEE10'){
            if(!orders.length){
                setTotalPrice(Math.floor((totalPrice*90)/100));
                setCouponApplied(true);
            }else{
                alert.error('Coupon Code is only applicable on first order.')
            }
        }else{
            alert.error('Coupon Code not applicable.')
        }
    }
    const removeCoupon = () => {
        
        setTotalPrice(subtotal+tax);
        setCouponApplied(false);
        
    }


    useEffect(() =>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    },[dispatch,alert,error])
  return (
    <Fragment>
        <MetaData title="Confirm Order" />
        <Header />
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
            <div>
                <div className="confirmshippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className='confirmshippingAreaBox'>
                        <div>
                            <p>Name:</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>{address}</span>
                        </div>
                    </div>
                </div>
                <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                        {
                            cartItems && cartItems.map((item) =>(
                                <div className='cartItemRow' key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                    {item.size? <span><b>Size: {item.size}</b></span>: <></>}
                                    <span>
                                        {item.quantity} X ₹{item.price} =
                                        <b> ₹{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>{`Subtotal (Inclusive of all taxes):`}</p>

                            <span>₹{subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>₹100</span>
                        </div>
                        <div>
                            <p>Shipping Discount:</p>
                            <span> - ₹100</span>
                        </div>
                       {!couponApplied ? <div>
                            <p>Have Coupon ?</p>
                            <input className='couponInput' type="text" onChange={(e) => setCoupon(e.target.value)} value={coupon}/>
                            <button className='couponBtn' onClick={applyCoupon}>Apply</button>
                        </div>
                        :
                        <div>
                            <p>MAVEE10 <CheckCircle fontSize='2vmax' htmlColor='teal'/></p>
                            <span style={{cursor: 'pointer', color: 'red'}} onClick={removeCoupon}>Remove</span>
                        </div>}
                        
                    </div>
                    <div className="orderSummaryTotal">
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>₹{totalPrice}</span>
                    </div>
                    <button onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default ConfirmOrder