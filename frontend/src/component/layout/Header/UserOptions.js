import React, { Fragment, useState } from 'react';
import "./Header.css"
import {Dashboard, Person, ExitToApp, ListAlt, ShoppingCart} from "@mui/icons-material"
import {SpeedDial, SpeedDialAction} from "@mui/material"
import {useHistory} from "react-router-dom"
import { useAlert } from 'react-alert';
import {logout} from "../../../actions/userAction"
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop } from '@mui/material';

const UserOptions = ({user}) => {
    const {cartItems} = useSelector((state) => state.cart)
    const [open, setOpen] = useState(false);
    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()

    const options = [
        {icon: <ListAlt/>, name:"Orders", func: orders},
        {icon: <Person/>, name:"Profile", func: account},
        {icon: <ShoppingCart style={{color: cartItems.length > 0 ? "teal":"unset"}}/>, name:`Cart(${cartItems.length})`, func: cart},
        {icon: <ExitToApp/>, name:"Logout", func: logoutUser},

    ]

    if(user.role === "admin"){
        options.unshift({icon: <Dashboard/>, name:"Dashboard", func: dashboard})
    }

    function dashboard() {
        history.push("/admin/dashboard");
    }

    function orders() {
        history.push("/orders");
    }

    function account() {
        history.push("/account");
    }
    function cart() {
        history.push("/cart");
    }

    function logoutUser(){
        dispatch(logout());
        alert.success("Logged out Successfully")
    }
  return <Fragment>
      <Backdrop open={open} style={{zIndex: "10"}}/>
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction='down'
        className="speedDial"
        style={{zIndex:"11"}}
        icon={<img className='speedDialIcon' src={user.avatar.url ? user.avatar.url :"/Profile.png"} alt='Profile' />}
      >
          {options.map((item) =>(
              <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} 
              tooltipOpen={window.innerWidth<600 ? true: false} />
          ))}
          
      </SpeedDial>
  </Fragment>;
};

export default UserOptions;
