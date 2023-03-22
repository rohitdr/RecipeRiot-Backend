import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import RecipeContext from '../Context/RecipeContext';
import { useNavigate } from "react-router-dom";
import InternalServerError from './InternalServerError';
import AnimatedPage from './AnimatedPage';
export default function Profile_Security() {
    const context = useContext(RecipeContext)
const {showAlert,setProgress}= context
let Navigate = useNavigate();
const [servererror,setservererror]=useState(0)
    const [passwords, setPasswords]= useState({oldpassword:"",newpassword1:"",newpassword2:""})
    const onSubmit=(e)=>{
 e.preventDefault();
    }
    const changepassword=async()=>{

        if(passwords.newpassword1 === passwords.newpassword2){
            showAlert("Both the passwords must be same","danger")
            
        }
       else{
        try{
        setProgress(10)
   
        const response = await fetch(`http://localhost:5000/api/auth/changePassword`, {
          method: 'POST',
     
          headers: {
            'Content-Type': 'application/json',
            // 'auth-token':sessionStorage.getItem("auth-token")
            'auth-token':sessionStorage.getItem("auth-token")?sessionStorage.getItem("auth-token"):localStorage.getItem("auth-token")
    
           
          },
          body: JSON.stringify({oldpassword:passwords.oldpassword, password:passwords.newpassword1})
         
      
        });
     setProgress(50)
        let loginresult= await response.json();
     
      
        if(response.status !== 400){
          setProgress(70)
          
       
          
         
          setProgress(100)
    
           
            showAlert("Your Password has been successfully changed","success")
       Navigate("/login")
         
        }
    
      
        if(response.status=== 400){
          
          showAlert(loginresult.error,"danger")
          setProgress(100)
        }
    }
    catch(error){
        setservererror(500)
        setProgress(100)
        console.log(error.message)
    }
    }
    }
    const change=(e)=>{
       setPasswords({...passwords,[e.target.name]:e.target.value})
    }
  return (<><AnimatedPage>
   { servererror == 500 ? <InternalServerError></InternalServerError>: <div>
      <div className="container-xl px-4 mt-4">

       
          <div className="row">
            <div className="col-lg-8">
             
                <div className="card mb-4 box_decrease_size_animation">
                    <div className="card-header">Change Password</div>
                    <div className="card-body">
                        <form onSubmit={onsubmit}>
                           
                            <div className="mb-3">
                                <label className="small mb-1" for="oldpassword">Current Password</label>
                                <input className="form-control" id="oldpassword" type="password" name='oldpassword' placeholder="Enter current password" onChange={change}/>
                            </div>
                          
                            <div className="mb-3">
                                <label className="small mb-1" for="newpassword1">New Password</label>
                                <input className="form-control" id="newpassword1" type="password" name = "newpassword1" placeholder="Enter new password" onChange={change}/>
                            </div>
                           
                            <div className="mb-3">
                                <label className="small mb-1" for="newPassword">Confirm Password</label>
                                <input className="form-control" id="newPassword2" type="password" name="newpassword2" placeholder="Confirm new password" onChange={change}/>
                            </div>
                            <button className="btn btn-primary" type="button" onClick={changepassword}>Save</button>
                        </form>
                    </div>
                </div>

                <div className="card mb-4 box_decrease_size_animation">
                    <div className="card-header">Security Preferences</div>
                    <div className="card-body">
                       
                        <h5 className="mb-1">Account Privacy</h5>
                        <p className="small text-muted">By setting your account to private, your profile information and posts will not be visible to users outside of your user groups.</p>
                        <form>
                            <div className="form-check">
                                <input className="form-check-input" id="radioPrivacy1" type="radio" name="radioPrivacy" checked=""/>
                                <label className="form-check-label" for="radioPrivacy1">Public (posts are available to all users)</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" id="radioPrivacy2" type="radio" name="radioPrivacy"/>
                                <label className="form-check-label" for="radioPrivacy2">Private (posts are available to only users in your groups)</label>
                            </div>
                        </form>
                        <hr className="my-4"/>
                      
                        <h5 className="mb-1">Data Sharing</h5>
                        <p className="small text-muted">Sharing usage data can help us to improve our products and better serve our users as they navigation through our application. When you agree to share usage data with us, crash reports and usage analytics will be automatically sent to our development team for investigation.</p>
                        <form>
                            <div className="form-check">
                                <input className="form-check-input" id="radioUsage1" type="radio" name="radioUsage" checked=""/>
                                <label className="form-check-label" for="radioUsage1">Yes, share data and crash reports with app developers</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" id="radioUsage2" type="radio" name="radioUsage"/>
                                <label className="form-check-label" for="radioUsage2">No, limit my data sharing with app developers</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
               
                <div className="card mb-4 box_decrease_size_animation">
                    <div className="card-header">Two-Factor Authentication</div>
                    <div className="card-body">
                        <p>Add another level of security to your account by enabling two-factor authentication. We will send you a text message to verify your login attempts on unrecognized devices and browsers.</p>
                        <form>
                            <div className="form-check">
                                <input className="form-check-input" id="twoFactorOn" type="radio" name="twoFactor" checked=""/>
                                <label className="form-check-label" for="twoFactorOn">On</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" id="twoFactorOff" type="radio" name="twoFactor"/>
                                <label className="form-check-label" for="twoFactorOff">Off</label>
                            </div>
                            <div className="mt-3">
                                <label className="small mb-1" for="twoFactorSMS">SMS Number</label>
                                <input className="form-control" id="twoFactorSMS" type="tel" placeholder="Enter a phone number" value="555-123-4567"/>
                            </div>
                        </form>
                    </div>
                </div>
             
                <div className="card mb-4  Moving_in_z_axis_animation_profile_card box_decrease_size_animation">
                    <div className="card-header">Delete Account</div>
                    <div className="card-body">
                        <p>Deleting your account is a permanent action and cannot be undone. If you are sure you want to delete your account, select the button below.</p>
                        <button className="btn btn-danger-soft text-danger" type="button">I understand, delete my account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>}</AnimatedPage>
    </>
  )
}
