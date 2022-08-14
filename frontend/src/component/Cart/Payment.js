import React, { Fragment, useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Typography } from '@mui/material'
import { useAlert } from 'react-alert'
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements} from "@stripe/react-stripe-js"
import { createOrder, clearErrors} from "../../actions/orderAction"

import axios from "axios"
import "./payment.css"

import { Event, CreditCard, VpnKey } from '@mui/icons-material'
import Header from '../layout/Header/Header'
import { removeItemsFromCart } from '../../actions/cartAction'


const Payment = ({history}) => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const payBtn = useRef(null);
    const dispatch = useDispatch();
    const alert  = useAlert();
    const stripe = useStripe();
    const elements = useElements();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice*100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const deleteCartItems = (id) =>{
        dispatch(removeItemsFromCart(id));
    }

    const submitHandler = async(e) =>{
        e.preventDefault();
        payBtn.current.disabled = true;
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };

            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,config
            );

            const client_secret = data.client_secret;

            if(!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }

                }
            });

            if(result.error){
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            }else{
                if(result.paymentIntent.status === "succeeded"){


                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    cartItems.forEach((i) => {
                        deleteCartItems(i.product);
                    })

                    dispatch(createOrder(order));

                    history.push("/success");
                }else{
                    alert.error("There's some issue while processing payment");
                }
            }

        }catch(error){
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }



    }

    const codPayment = () => {
        order.paymentInfo = {
            id: 'Payment - COD',
            status: 'Cash On Delivery',
        };

        cartItems.forEach((i) => {
            deleteCartItems(i.product);
        })

        dispatch(createOrder(order));

        history.push("/success");
    }


    useEffect(() =>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
    },[dispatch, error, alert])
  return (
    <Fragment>
        <MetaData title="Payment" />
        <Header />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
            <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                <Typography>Card Info</Typography>
                <div>
                    <CreditCard/>
                    <CardNumberElement className='paymentInput' />
                </div>
                <div>
                    <Event/>
                    <CardExpiryElement className='paymentInput' />
                </div>
                <div>
                    <VpnKey/>
                    <CardCvcElement className='paymentInput' />
                </div>

                <input type="submit" value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn} className="paymentFormBtn" />
            </form>
            <div>
            <Typography>OR</Typography>
            </div>
            <div className='codContianer'>
            <Typography>Cash On Delivery</Typography>
            <button className='codButton' onClick={codPayment}>Proceed</button>
            </div>
        </div>
    </Fragment>
  )
}

export default Payment