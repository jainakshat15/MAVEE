import React, { useState } from "react";
import "./contact.css";
import Header from "../Header/Header";
import { FaceOutlined, MailOutline, PhoneAndroidOutlined } from "@mui/icons-material";
import { useAlert } from "react-alert";
import emailjs from '@emailjs/browser';


const Contact = () => {
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const alert = useAlert();

    const templateId = 'template_iy0dlk2';
    const emailjsUserId = 'user_pGAMO5C6Yzx5UXGGLN0JX';

    const needHelpSubmit = (e) =>{
      e.preventDefault();
      // const obj = {
      //   name: name,
      //   email: email,
      //   number: number,
      //   text: text
      // }


      setLoading(true);
      try {
          emailjs.send('gmail', templateId, {
              email: email,
              name: name,
              number:number,
              message: text
          }, emailjsUserId)
              .then((result) => {
                  alert.success('Thanks for your message.')
                  setLoading(false);
                  setName('');
                  setEmail('');
                  setNumber('');
                  setText('');
            
              }, (error) => {
                  console.log(error.text);
                  setLoading(false);
                  alert.error('Something went wrong')
              });

      } catch (err) {
          console.log(err);
          setLoading(false);
          alert.error('Something went wrong')

      }

    
     
     
    }
  return (
    <>
    <Header/>
    <div className="contactContainer">
      <div className="contactLeft">
          <h3 className="contactHeading">ABOUT US</h3>
          <div className="orderDetailsContainerBox contactDetailsBox">
            <div>
              <p>Phone No.:</p>
              <span>+917976562808</span>
            </div>
            <div>
              <p>Email:</p>
              <span>mavee@gmail.com</span>
            </div>
            
          </div>
      </div>
      <div  className="contactRight">
          <h3 className="contactHeading">NEED HELP?</h3>
          
          <form className="updateProfileForm" onSubmit={needHelpSubmit}>
                            <div className='updateProfileName'>
                                <FaceOutlined />
                                <input type="text" 
                                    placeholder='Name'
                                    required
                                    value={name}
                                    onChange={(e) =>setName(e.target.value)}
                                   
                                />
                            </div>
                            <div className='updateProfileEmail'>
                                <MailOutline />
                                <input type="email" 
                                    placeholder='Email'
                                    required
                                    value={email}
                                    onChange={(e) =>setEmail(e.target.value)}
                                    
                                />
                            </div>
                            <div className='updateProfileEmail'>
                                <PhoneAndroidOutlined />
                                <input type="text" 
                                    placeholder='Phone Number'
                                    value={number}
                                    onChange={(e) =>setNumber(e.target.value)}
                                />
                            </div>
                            <div className='updateProfileEmail'>
                                <textarea
                                    placeholder='How can we help you ?'
                                    required
                                    value={text}
                                    onChange={(e) =>setText(e.target.value)}
                                    
                                />
                            </div>
                            
                            <input type="submit" disabled={loading} value={loading ? 'Please Wait' : 'Send'} className='updateProfileBtn'/>
                           
                          </form>
      </div>
    </div>
    </>
  );
};

export default Contact;