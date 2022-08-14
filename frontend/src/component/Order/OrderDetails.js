import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import Header from "../layout/Header/Header";

const OrderDetails = ({match}) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);


  return  <Fragment>
  {loading ? (
    <Loader />
  ) : (
    <Fragment>
      <MetaData title="Order Details" />
      <div className="orderDetailsPage">
        <Header/>
        <div className="orderDetailsContainer">
          <Typography component="h1">
            Order #{order && order._id}
          </Typography>
          
          <Typography>Order Status</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p
                className={
                  order.orderStatus && order.orderStatus === "Delivered"
                    ? "greenColor"
                    : "redColor"
                }
              >
                {order.orderStatus && order.orderStatus.toUpperCase()}
              </p>

            </div>
            {order?.shippingDetails && <div>
            <p>Details: </p><span>{order.shippingDetails}</span>
            </div>}
            <div>
            <p>Order Date: </p><span>{order && new Date(order.createdAt).toDateString()}</span>
            </div>
          </div>  
          <Typography>Shipping Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{order.user && order.user.name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>
                {order.shippingInfo && order.shippingInfo.phoneNo}
              </span>
            </div>
            <div>
              <p>Address:</p>
              <span>
                {order.shippingInfo &&
                  `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
              </span>
            </div>
          </div>
          <Typography>Payment Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p
                className={
                  order.paymentInfo &&
                  order.paymentInfo.status === "succeeded"
                    ? "greenColor"
                    : "redColor"
                }
              >
                {order.paymentInfo &&
                order.paymentInfo.status === "succeeded"
                  ? "PAID"
                  : "NOT PAID "}
                  
                  {order.paymentInfo &&
                order.paymentInfo.status === "Cash On Delivery"
                  && "- Cash On Delivery"
                  } 
              </p>
            </div>

            <div>
              <p>Amount:</p>
              <span>{order.totalPrice && `₹ ${order.totalPrice} /-`}</span>
            </div>
          </div>

          
        </div>

        <div className="orderDetailsCartItems">
          <Typography>Order Items:</Typography>
          <div className="orderDetailsCartItemsContainer">
            {order.orderItems &&
              order.orderItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product}`}>
                    {item.name}
                  </Link>{" "}
                  {item.size? <span style={{marginRight: '1vmax'}}><b>Size: {item.size}</b></span>: <></>}
                  <span>
                    {item.quantity} X ₹{item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="orderDetailsContainer">
        <Typography>Returns and Cancellation</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Call Us:</p>
              <span>+917976562808</span>
            </div>
            <div>
              <p>Write Us:</p>
              <span>mavee@gmail.com</span>
            </div>
            <div>
              <Link className="linkNavbar" to='/contact'><p style={{cursor: 'pointer'}}>Need a call back?</p></Link>
              
            </div>
          </div>
          </div>
      </div>
    </Fragment>
  )}
</Fragment>
}

export default OrderDetails