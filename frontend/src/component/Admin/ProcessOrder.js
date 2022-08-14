import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import SideBar from './Sidebar'
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from '../../actions/orderAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import { AccountTree } from '@mui/icons-material'
import { Button } from '@mui/material'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import './processOrder.css'

const ProcessOrder = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails)
  const { error: updateError, isUpdated } = useSelector((state) => state.order)

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set('status', status)
    myForm.set('shippingDetails', shippingDetails)


    dispatch(updateOrder(match.params.id, myForm))
  }

  const dispatch = useDispatch()
  const alert = useAlert()

  const [status, setStatus] = useState('')
  const [shippingDetails, setShippingDetails] = useState(order?.shippingDetails ? order?.shippingDetails: '' )


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (updateError) {
      alert.error(updateError)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.success('Order Updated Successfully')
      dispatch({ type: UPDATE_ORDER_RESET })
      setStatus('');
    }

    dispatch(getOrderDetails(match.params.id))
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError])

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === 'Delivered' ? 'block' : 'grid',
              }}
            >
              <div>
                <div className="confirmshippingArea">
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

                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === 'succeeded'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === 'succeeded'
                          ? 'PAID'
                          : 'NOT PAID '}
                          {order.paymentInfo &&
                order.paymentInfo.status === "Cash On Delivery"
                  && "- Cash On Delivery"
                  } 
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === 'Delivered'
                            ? 'greenColor'
                            : 'redColor'
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                        
                      </p>
                      
                    </div>

                    {order?.shippingDetails && <div>
            <p>Details: </p><span>{order.shippingDetails}</span>
            </div>}
            
                    <div>

            <p>Order Date: </p><span>{order && new Date(order.createdAt).toDateString()}</span>
            </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Order Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{' '}
                          {item.size? <span style={{marginRight: '10px'}}><b>Size: {item.size}</b></span>: <></>}
                          <span>
                            {item.quantity} X ₹{item.price} ={' '}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === 'Delivered' ? 'none' : 'block',
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTree />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose option</option>
                      {order.orderStatus === 'Processing' && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === 'Shipped' && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>
                  {status === 'Shipped' && <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Typography>Add Shipping Details</Typography>
                        <textarea className='shippingDetailsInput' placeholder='shipping details' onChange={(e) => setShippingDetails(e.target.value)}/>
                  </div>}

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === '' ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default ProcessOrder
