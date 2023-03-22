import React from "react";
import { useState } from "react";
// import First from "./Signuppages/First";
// import Second from "./Signuppages/Second";
// import Third from "./Signuppages/Third";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import RecipeContext from "../Context/RecipeContext";
import { Input, useInput, Button, Radio, Textarea } from "@nextui-org/react";
import e from "cors";
import InternalServerError from "./InternalServerError";
import AnimatedPage from "./AnimatedPage";

export default function SignUp() {
  const { value, reset, bindings } = useInput("");
  const [signupdetail, setsignupdetails] = useState({
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    username: "",
    first_name: "",
    last_name: "",
   
    web:"",
    git:"",
    facebook:"",
twitter:""
  });
  
  const context = useContext(RecipeContext);
  const { signuppage, setsignuppage,setProgress, showAlert } = context;
  const [usernamecolor, setusernamecolor] = useState("success");

  const [helpertextusername, sethelpertextusername] = useState("");
  const [hlepercolorusername, sethelpercolorusername] = useState("error");

  const [usernamecontentright, setusernamecontentright] = useState();
  const [phone_number_helper_text,setphone_number_helper_text]= useState("")
  const [phone_numbercolor,setphone_numbercolor]=useState("success")
  const [phone_numberhelpercolor,setphone_numberhelpercolor]=useState("error")
  const [phone_numbercontentright,setphone_numbercontentright]=useState()
  const [passwordcolor,setpasswordcolor]=useState("warning")
  const [passwordhelpertext,setpasswordhelpertext]=useState("")
  const [passwordhelpercolor,setpasswordhelpercolor]=useState("error")
  const [confirm_passwordcolor,setconfirm_passwordcolor]=useState("warning")
  const [confirm_passwordhelpercolor, setconfirm_passwordhelpercolor]=useState("error")
  const [confirm_passwordhelpercolortext, setconfirm_passwordhelpercolortext] = useState("")
  const [first_namecolor,setfirst_namecolor]=useState("secondary")
  const [first_namehelpercolor,setfirst_namehelpercolor]=useState("error")
  const [first_namehelpertext,setfirst_namehelpertext]=useState("")
  const [last_namecolor,setlast_namecolor]=useState("secondary")
  const [last_namehelpercolor,setlast_namehelpercolor]=useState("error")
  const [last_namehelpertext,setlast_namehelpertext]=useState("")
  const [servererror,setservererror]=useState(0)
  ///for validation of email
  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };
  const helper = React.useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    ///for validation of email
    const isValid = validateEmail(value);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);

  ///for validation of username
  const checkusername = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/checkUsername",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: document.getElementById("username").value,
          }),
        }
      );

      let result = await response.json();
      if (!result) {
      
        setusernamecolor("error");
        sethelpercolorusername("error");
        sethelpertextusername("Username is not avialable");

        setusernamecontentright(
          <i className="fa-solid text-danger fa-circle-exclamation"></i>
        );
      }
      if (result) {
        setusernamecolor("success");

        sethelpercolorusername("success");
        sethelpertextusername("username is avialable");
        setusernamecontentright(
          <i className="fa-solid text-success fa-circle-check"></i>
        );
      }
    } catch (e) {
      setservererror(500)
      console.log(e.message);
    }
  };

  //onload to store data for prev button

  //// onchanger effect on usrename
  const onchangeusername = (e) => {
    setsignupdetails({ ...signupdetail, username: e.target.value });

    if (signupdetail.username.length < 8) {
      setusernamecolor("error");
      sethelpertextusername("username must be of 8 digits");
    } else {
      sethelpertextusername("");
      checkusername(signupdetail.username);
    }
  };

  const onchange = (e) => {
    setsignupdetails({ ...signupdetail, [e.target.name]: e.target.value });
    //validation for number
    if(signupdetail.phone_number.length !== 10){
      setphone_number_helper_text("Phone Number should be of 10 digits")
      setphone_numberhelpercolor("error")
      setphone_numbercolor("error")
      setphone_numbercontentright( <i className="fa-solid text-danger fa-circle-exclamation"></i>)
      

    }
    else{
      setphone_number_helper_text("")
      setphone_numberhelpercolor("success")
      setphone_numbercolor("success")
      setphone_numbercontentright(<i className="fa-solid text-success fa-circle-check"></i>)
    }
    // validation for password
    if(signupdetail.password.length<8)
    {
     setpasswordhelpertext("Password should of 8 words")
     setpasswordhelpercolor("error")
     setpasswordcolor('error')
     
    }
    else{
setpasswordcolor("warning")
setpasswordhelpercolor("success")
setpasswordhelpertext("This Looks Nice ")
    }
    //validation for confirm password
    if(signupdetail.password !== signupdetail.confirm_password)
    {
     setconfirm_passwordcolor("error")
     setconfirm_passwordhelpercolor("error")
     setconfirm_passwordhelpercolortext("Password and Confirm password must be same")
     
    }
    else{
setconfirm_passwordcolor("warning")
setconfirm_passwordhelpercolor("success")
setconfirm_passwordhelpercolortext("")
    }
    //validation for first name
    if(signupdetail.first_name.length<3){
setfirst_namecolor("error")
setfirst_namehelpercolor("error")
setfirst_namehelpertext("First Name should of more than 3 words")
    }
    else{
setfirst_namecolor("secondary")
setfirst_namehelpercolor("success")
setfirst_namehelpertext("")
    }
    //validation for last name
    if(signupdetail.last_name.length<3){
setlast_namecolor("error")
setlast_namehelpercolor("error")
setlast_namehelpertext("Last name should be of more than 3 words")
    }
    else{
   setlast_namecolor("secondary")
   setlast_namehelpercolor("success")
   setlast_namehelpertext("")
    }
  };

  /// validation for next page button of first page
  const next = () => {
    setsignupdetails({ ...signupdetail, email: bindings.value });
    console.log(signupdetail);

    if (signupdetail.first_name.length < 3) {
      showAlert("OOPs!, First Name must have 3 words", "danger");
    } else if (signupdetail.last_name.length < 3) {
      showAlert("OOPs!, Last Name must have 3 words", "danger");
    } else if (signupdetail.phone_number.length != 10) {
      showAlert("OOPs!, Phone Number Must be of 10 digits", "danger");
    } else if (signupdetail.password.length < 8) {
      showAlert("OOPs!, Password must have 8 digits", "danger");
    } else if (signupdetail.password != signupdetail.confirm_password) {
      showAlert("OOPs!, Password and Confirm password must be same", "danger");
    } else {
      console.log(signupdetail);
      document
        .getElementById("signup_first_component")
        .setAttribute("className", "disapear_component");
      setTimeout(() => {
        setsignuppage(1);
      }, 350);
    }
  };

  //second



  //for third page
const changethird=(e)=>{
  setsignupdetails({...signupdetail,[e.target.name]:e.target.value})
}
//onclick prev button of third page
  const third_prev = () => {
    document
      .getElementById("thirdpage")
      .setAttribute("className", "disapear_component");
    setTimeout(() => {
      setsignuppage(1);
    }, 350);
 
  };
  //sign up api call
  let Navigate = useNavigate();
  const signupapi = async() => {
    try{
    setProgress(10)
      
       const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
         method: 'POST',
         mode: "cors",
         headers: {
           'Content-Type': 'application/json',
          
   
          
         },
         body: JSON.stringify(signupdetail)
        
     
       });
    setProgress(50)
       let signupresult= await response.json();
    
     
       if(response.status !== 400){
         setProgress(70)
       
      
         
        
         setProgress(100)
   
           Navigate("/login")
           showAlert("Your had successfully Signed Up","success")
      
        
       
   
       }
       if(response.status=== 400){
         setProgress(100)
         showAlert(signupresult.error,"danger")
       }
      
     
      }
      catch(error){
        setProgress(100)
        setservererror(500)
        console.log(error.message)
      }
     };
  //onclick of skip button of third Page
  const signup=()=>{
 signupapi();
 setTimeout(() => {
  setsignuppage(0);
}, 2000);
  }

  return (<><AnimatedPage>
    { servererror == 500 ? <InternalServerError></InternalServerError> :<div>
      {signuppage == 0 && (
        <section className="background-radial-gradient overflow-hidden">
          <div
            className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 appear_component"
            id="signup_first_component"
          >
            <div className="row gx-lg-5 align-items-center mb-5">
              <div className="col-lg-5 mb-5 mb-lg-0 position-relative">
                <div className="card singupcard border-success align-items-center box_decrease_size_animation">
                  <div className="card-header singupcardheder b d-flex justify-content-center box_decrease_size_animationforlogin">
                    <h5 className="fw-bold pt-4 text-white"><span className="sign_s">S</span><span className="sign_i">i</span><span className="sign_g">g</span><span className="sign_n">n</span> <span className="sign_u">U</span><span className="sign_p">p</span></h5>
                  </div>
                  <div className="card-body box_decrease_size_animationforlogin ">
                    <form>
                      <div className="row px-2 mt-3 box_decrease_size_animationemailsignup   mb-1">
                        <Input
                          {...bindings}
                      
                          shadow={false}
                          onClearClick={reset}
                          required
                          color={helper.color}
                          helperColor={helper.color}
                          helperText={helper.text}
                          bordered
                          className="bg-white  "
                      
                          type="email"
                          label="Your Email"
                          placeholder="Enter Your Email"
                        />
                      </div>
                      <div className="d-flex justify-content-between pt-2 ">
                        <div className="px-3 box_decrease_size_animationforlogin mb-1">
                          <Input
                            className="bg-white"
                            size="md"
                            bordered
                            rounded
                        
                           helperColor={first_namehelpercolor}
                           helperText={first_namehelpertext}
                           color={first_namecolor}
                            name="first_name"
                            id="first_name"
                            value={signupdetail.first_name}
                            onChange={onchange}
                            placeholder="Enter Your First name"
                            label="First Name"
                          />
                        </div>
                        <div className="box_decrease_size_animationforlogin mb-1">
                          <Input
                            size="md"
                            bordered
                            className="bg-white"
                            rounded
                            helperColor={last_namehelpercolor}
                            helperText={last_namehelpertext}
                            color={last_namecolor}
                            value={signupdetail.last_name}
                            name="last_name"
                            id="last_name"
                            onChange={onchange}
                          
                            placeholder="Enter Your Last Name"
                            label="Last name"
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between pt-2">
                        <div className="px-3 box_decrease_size_animationforlogin mb-1">
                          <Input
                            className="bg-white"
                            size="md"
                            bordered
                            rounded
                            value={signupdetail.username}
                            contentRight={usernamecontentright}
                            onChange={onchangeusername}
                            helperColor={hlepercolorusername}
                            helperText={helpertextusername}
                            color={usernamecolor}
                            name="username"
                            id="username"
                            placeholder="Enter Your Username"
                            label="Username"
                          />
                        </div>
                        <div className="box_decrease_size_animationforlogin mb-1">
                          <Input
                            className="bg-white"
                           
                            bordered
                            rounded
                            helperColor={phone_numberhelpercolor}
                            helperText={phone_number_helper_text}
                            onChange={onchange}
                            name="phone_number"
                            contentRight={phone_numbercontentright}
                            value={signupdetail.phone_number}
                            id="phone_number"
                            // color="success"
                            color={phone_numbercolor}
                            type="Phone number"
                            label="Phone Number"
                            placeholder="Enter Your Phone Number"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between pt-2">
                        <div className="px-3 box_decrease_size_animationforlogin mb-1">
                          <Input.Password
                            className="bg-white"
                      
                            bordered
                            rounded
                            onChange={onchange}
                            // color="warning"
                            color={passwordcolor}
                            
                            name="password"
                            id="password"
                            helperColor={passwordhelpercolor}
                            helperText={passwordhelpertext}
                            value={signupdetail.password}
                            type="password"
                            label="Password"
                            placeholder="Enter Your Password"
                          />
                        </div>
                        <div className="box_decrease_size_animationforlogin mb-1">
                          <Input.Password
                            className="bg-white"
                           
                            bordered
                            rounded
                            helperColor={confirm_passwordhelpercolor}
                            helperText={confirm_passwordhelpercolortext}
                            color={confirm_passwordcolor}

                            onChange={onchange}
                            name="confirm_password"
                            id="confirm_password"
                            value={signupdetail.confirm_password}
                            
                            type="password"
                            label="Confirm Password"
                            placeholder="confirm Password"
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mt-3 pt-2 mb-4">
                        <Button
                          color="secondary"
                          auto
                          ghost
                          className="box_decrease_size_animationforlogin"
                          onPress={next}
                        >
                          Next
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: 10}}>
       <h1 className="my-5 display-5 fw-bold ls-tight" style={{color: "hsl(218, 81%, 95%)"}}>
         Be The First<br />
         <span style={{color: "hsl(218, 81%, 75%)"}}>Don't Miss this Oportunity</span>
       </h1>
       <p className="mb-4 opacity-70" style={{color: "hsl(218, 81%, 85%)"}}>
       Sign up know to be the first to Know about
        special and Intersting Recipes.
       </p>
     </div>
            </div>
          </div>
        </section>
      )}
     
      {signuppage == 1 && (
        <section className="background-radial-gradient overflow-hidden">
          <div
            className="container px-4 py-5 px-md-5 text-center text-lg-start my-5 appear_component"
            id="thirdpage"
          >
            <div className="d-flex justify-content-end gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: 10}}>
       <h1 className="my-5 display-5 fw-bold ls-tight" style={{color: "hsl(218, 81%, 95%)"}}>
         How to Cook  <br />
         <span style={{color: "hsl(218, 81%, 75%)"}}> Any thing you want  </span>
       </h1>
       <p className="mb-4 opacity-70" style={{color: "hsl(218, 81%, 85%)"}}>
        Would You like to Explore the foodie in you.
       </p>
     </div>
              <div className="col-lg-5 mb-5 mb-lg-0 position-relative">
                <div className="card singupcard border-success align-items-center box_decrease_size_animation pb-3">
                  <div className="card-header singupcardheder b d-flex justify-content-center box_decrease_size_animationforlogin">
                    <h5 className="fw-bold pt-4 text-white">
                      {" "}
                      Socail Networks
                    </h5>
                  </div>

                  <div className="card-body box_decrease_size_animationforlogin ">
                    <form>
                      <div className="d-flex justify-content-between pt-2 ">
                        <Input
                          className="box_decrease_size_animationforlogin bg-white"
                          bordered
                          onChange={changethird}
                          rounded
                          value={signupdetail.web}
                          color="secondary"
                          labelLeft="https://"
                          label="Website Name"
                          name="web"
                          id="web"
                          placeholder="Your Website Name"
                          labelRight=".com"
                          contentRight={
                            <i className="fas fa-globe fa-lg text-warning"></i>
                          }
                        />
                      </div>
                      <div className="d-flex justify-content-between pt-2 ">
                        <Input
                          className="box_decrease_size_animationforlogin bg-white"
                          bordered
                          onChange={changethird}
                          rounded
                          color="primary"
                          value={signupdetail.git}
                          labelLeft="https://"
                          label="Github Reposatary"
                          labelRight=".git"
                          id="git"
                          name="git"
                          contentRight={
                            <i className=" pe-2 fab fa-github fa-lg"></i>
                          }
                        />
                      </div>
                      <div className="d-flex justify-content-between pt-2 ">
                        <Input
                          className="box_decrease_size_animationforlogin bg-white "
                          bordered
                          onChange={changethird}
                          rounded
                          value={signupdetail.facebook}
                          color="secondary"
                          labelLeft="https://"
                          label="Facebook"
                          name="facebook"
                          id="facebook"
                          labelRight=".facebook"
                          contentRight={
                            <i
                              className="fab fa-facebook-f fa-lg"
                              style={{ color: "#3b5998" }}
                            ></i>
                          }
                        />
                      </div>

                      <div className="d-flex justify-content-between pt-2 ">
                        <Input
                          className="box_decrease_size_animationforlogin bg-white "
                          bordered
                          onChange={changethird}
                          rounded
                          value={signupdetail.twitter}
                          contentRightStyling={false}
                          color="primary"
                          name="twitter"
                          id="twitter"
                          labelLeft="https://"
                          label="Twitter"
                          labelRight=".twitter"
                          contentRight={
                            <i
                              className="fab fa-twitter fa-lg"
                              style={{ color: "#55acee" }}
                            ></i>
                          }
                        />
                      </div>

                      <div className="d-flex justify-content-around mt-3 pt-2 mb-4">
                        <Button
                          color="success"
                          auto
                          onPress={third_prev}
                          className="box_decrease_size_animationforlogin fw-bold"
                        >
                          Prev
                        </Button>
                        <Button
                          color="success"
                          auto
                          onPress={signup}
                          className="box_decrease_size_animationforlogin fw-bold"
                        >
                          Skip
                        </Button>
                        <Button
                          color="primary"
                          auto
                          onPress={signup}
                          className="box_decrease_size_animationforlogin fw-bold"
                        >
                          Sign Up
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>}</AnimatedPage>
    </>
  );
}
