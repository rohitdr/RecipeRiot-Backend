import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeContext from "../Context/RecipeContext";
import InternalServerError from "./InternalServerError";
import {Modal,Image,Text,Input,Button,} from "@nextui-org/react";
import "./login.css";
import AnimatedPage from "./AnimatedPage";

export default function Login() {
/* Creating a variable called Navigate that is using the useNavigate hook. */
  let Navigate = useNavigate();
 /* Setting the state of the component. */
  const [visiblemodal, setvisiblemodal] = useState(false);
  const [forgetdetail, setforgetdetail] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const [visibleforgetmodal, setvisibleforgetmodal] = useState(false);
  const context = useContext(RecipeContext);
  const [servererror, setservererror] = useState(0);
  const { login, showAlert, setProgress ,logoutUser} = context;

 /**
  * It checks if the user is already logged in, if not, it sends a POST request to the server with the
  * user's email and password, and if the server responds with a 200 status code, it stores the
  * auth-token in either localStorage or sessionStorage, depending on whether the user checked the
  * "remember me" checkbox, and then redirects the user to the home page.
  */
  const loginclick = async () => {
    try {
      if (
        sessionStorage.getItem("auth-token") ||
        localStorage.getItem("auth-token")
      ) {
        Navigate("/Home");
        showAlert("You are Already logged in.", "warning");
      } else {
        setProgress(10);

        const response = await fetch(
          `${process.env.REACT_APP_Fetch_Api_Start}/auth/login`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: logindetail.email,
              password: logindetail.password,
            }),
          }
        );
        setProgress(50);
        let loginresult = await response.json();

        if (response.status == 200) {
          setProgress(70);
          //if remember me is checked than store auth-token in localstorage else in session storage
          if (document.querySelector(".rememberme").checked) {
            
            localStorage.setItem("auth-token", loginresult.auth_token);
            localStorage.setItem("success", loginresult.succcess);
            setInterval(() => {
              logoutUser()
              localStorage.removeItem("auth-token")
              localStorage.removeItem("success")
              Navigate("/login")
            }, 3600000);
          
          } else {
            sessionStorage.setItem("auth-token", loginresult.auth_token);
            sessionStorage.setItem("success", loginresult.succcess);
          }

          setProgress(100);

          Navigate("/Home");
          showAlert("Your had successfully logged in", "success");
        } else if (response.status == 404) {
          setProgress(100);
          setvisiblemodal(true);
          showAlert(loginresult.error, "danger");
          setTimeout(() => {
            setvisiblemodal(false);
          }, 2000);
        } else {
          setProgress(100);
          setservererror(500);
          showAlert(loginresult.error, "danger");
        }
      }
    } catch (e) {
      setProgress(100);
      setservererror(500);
      console.log(e.message);
    }
  };


  useEffect(()=>{
    document.title=`RecipeRiot-Login`
  },[])
 /**
  * It takes an event object as an argument, and then it sets the state of the forgetdetail object to
  * the value of the event object.
  * @param e - the event object
  */
  const forgetinputchange = (e) => {
    setforgetdetail({ ...forgetdetail, [e.target.name]: e.target.value });
  };
  //api function for forget password
/**
 * It takes the user's email, username, and password, and sends it to the server. 
 * 
 * If the server returns a 200 status code, it shows a success alert. 
 * 
 * If the server returns a 404 status code, it shows a danger alert. 
 * 
 * If the server returns any other status code, it shows a server error alert.
 */
  const forgetpassapi = async () => {
    try {
      setProgress(30);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/auth/forgetPassword`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgetdetail.email,
            username: forgetdetail.username,
            password: forgetdetail.password,
          }),
        }
      );
      setProgress(50);
      let result = await response.json();
      setProgress(70);
      if (response.status == 200) {
        setProgress(100);
        setvisibleforgetmodal(false);
        showAlert(result.succcess, "success");
        setvisibleforgetmodal(false);
      } else if (response.status == 404) {
        setProgress(100);
        setvisibleforgetmodal(false);
        showAlert(result.error, "danger");
      } else {
        setProgress(100);
        setservererror(500);
      }
    } catch (e) {
      setProgress(100);
      setservererror(500);
      console.log(e.message);
    }
  };
  // function to change password
/**
 * When the user clicks the button, call the function forgetpassapi()
 */
  const changeforgetpassword = () => {
    forgetpassapi();
  };

/**
 * The function prevents the default action of the form from being executed.
 * @param e - the event object
 */
  const onsubmit = (e) => {
    e.preventDefault();
  };
  const [logindetail, setlogindetail] = useState({ email: "", password: "" });

 /**
  * It takes an event object as an argument, and then it sets the state of the logindetail object to
  * the value of the event object.
  * @param e - the event object
  */
  const loginchange = (e) => {
    setlogindetail({ ...logindetail, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AnimatedPage>
        {servererror == 500 ? (
          <InternalServerError></InternalServerError>
        ) : (
          <div>
            <section className="background-radial-gradient overflow-hidden">
              <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-5">
                  <div
                    className="col-lg-6 mb-5 mb-lg-0"
                    style={{ zIndex: "10" }}
                  >
                    <h1
                      className="my-5 display-5 fw-bold ls-tight"
                      style={{ color: "hsl(218, 81%, 95%)" }}
                    >
                      The best offer <br />
                      <span style={{ color: "hsl(218, 81%, 75%)" }}>
                        for your business
                      </span>
                    </h1>
                    <p
                      className="mb-4 opacity-70"
                      style={{ color: "hsl(218, 81%, 85%)" }}
                    >
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Temporibus, expedita iusto veniam atque, magni tempora
                      mollitia dolorum consequatur nulla, neque debitis eos
                      reprehenderit quasi ab ipsum nisi dolorem modi. Quos?
                    </p>
                  </div>

                  <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                    <div
                      id="radius-shape-1"
                      className="position-absolute rounded-circle shadow-5-strong"
                    ></div>
                    <div
                      id="radius-shape-2"
                      className="position-absolute shadow-5-strong"
                    ></div>

                    <div className="card  bg-glass box_decrease_size_animation">
                      <div className="card-body px-4 py-5 px-md-5 logincardbody">
                        <div className="card-header card-header-primary loginformheader text-center box_decrease_size_animationforlogin  ">
                          <h4 className="card-title ">Login</h4>
                          <div className="social-linelogin  ">
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link"
                            >
                              <i className="fa fs-5 fa-facebook-square"></i>
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link"
                            >
                              <i className="fa  fs-5 fa-twitter"></i>
                            </a>
                            <a
                              href="#pablo"
                              className="btn btn-just-icon btn-link"
                            >
                              <i className="fa fs-5 fa-google-plus"></i>
                            </a>
                          </div>{" "}
                        </div>
                        <form
                          className="loginform box_decrease_size_animationforloginform"
                          onSubmit={onsubmit}
                        >
                          <div className="form-floating mb-3 mt-3  ">
                            <input
                              type="email"
                              className="form-control loginform-control rounded-3"
                              id="email"
                              name="email"
                              placeholder="name@example.com"
                              value={logindetail.email}
                              onChange={loginchange}
                            />
                            <label for="loginemail">Email address</label>
                          </div>
                          <div className="form-floating mb-3 ">
                            <input
                              type="password"
                              className="form-control loginform-control rounded-3"
                              id="password"
                              name="password"
                              autocomplete="off"
                              placeholder="Password"
                              value={logindetail.password}
                              onChange={loginchange}
                            />
                            <label for="loginPassword">Password</label>
                          </div>
                          {/* not a member */}
                          <div
                            className="row mb-4 "
                            style={{ fontSize: "15px" }}
                          >
                            <div className="col d-flex justify-content-start">
                              <div className="form-check">
                                <input
                                  className="form-check-input rememberme"
                                  type="checkbox"
                                  id="rememberme"
                                />
                                <label
                                  className="form-check-label px10fontless360 mx-0 px-0 "
                                  for="rememberme"
                                >
                                  {" "}
                                  Remember me{" "}
                                </label>
                              </div>
                            </div>

                            <div className="col">
                              <a
                              className="px10fontless360"
                                onClick={() => {
                                  setvisibleforgetmodal(true);
                                }}
                              >
                                Forgot password?
                              </a>
                            </div>
                          </div>
                          <button
                            className="w-100 mb-2 box_decrease_size_animation  login_login"
                            type="submit"
                            onClick={loginclick}
                            disabled={
                              logindetail.email.length < 5 ||
                              logindetail.password.length < 8
                            }
                          >
                            Login
                          </button>
                          <hr className="my-4" />
                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2 px10fontless360">Don't have an account?</p>
                            <button
                              type="button"
                              className="btn btn-outline-success px10fontless360"
                              onClick={() => {
                                Navigate("/signUp");
                              }}
                            >
                              Create new
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* //login modal */}
            {/* <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text b id="modal-title" size={18}>
            Verfiy OTP
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row justify="space-between">
            <Text blockquote b size={14}>
              We have send an OTP on *****{logindetail.email.substring(7)} email to verify you 4728{" "}
            </Text>
          </Row>
          <Input.Password
            clearable
            color="warning"
            initialValue="123"
            type="password"
            label="One Time Password"
            placeholder=""
            name='otp'
            id ="otp"
            required
            minlenght="4"
            
          />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={VerifyOtp}>
            Verify OTP
          </Button>
        </Modal.Footer>
      </Modal> */}

            {/* modal for wrong credentials */}
            <Modal noPadding open={visiblemodal} blur>
              <Modal.Header
                css={{ position: "absolute", zIndex: "$1", top: 5, right: 8 }}
              ></Modal.Header>
              <Modal.Body>
                <Image
                  showSkeleton
                  src="https://media.tenor.com/96H5g9JcobEAAAAd/jethalal-angry-tarak-mehta-ka-ooltah-chashmah.gif"
                  width={400}
                  height={490}
                />
              </Modal.Body>
            </Modal>

            {/* modal for forget password */}
            <Modal
              closeButton
              aria-labelledby="modal-title"
              open={visibleforgetmodal}
              onClose={() => {
                setvisibleforgetmodal(false);
              }}
            >
              <Modal.Header>
                <Text id="modal-title" size={18}>
                  Welcome to{" "}
                  <Text b size={18}>
                    RecipeRiot
                  </Text>
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Input
                  contentLeft={<i className="fa-solid fa-envelope"></i>}
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  name="email"
                  id="email"
                  size="lg"
                  placeholder="Email"
                  onChange={forgetinputchange}
                />
                <Input
                  contentLeft={<i className="fa-solid fa-user"></i>}
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={forgetinputchange}
                />
                <Input
                  clearable
                  bordered
                  contentLeft={<i className="fa-solid fa-lock"></i>}
                  fullWidth
                  color="primary"
                  size="lg"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={forgetinputchange}
                />
                <Input
                  contentLeft={<i className="fa-solid fa-lock"></i>}
                  clearable
                  bordered
                  fullWidth
                  type="password"
                  color="primary"
                  size="lg"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  onChange={forgetinputchange}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  auto
                  flat
                  color="error"
                  onPress={() => {
                    setvisibleforgetmodal(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  auto
                  onPress={changeforgetpassword}
                  disabled={
                    forgetdetail.email.length < 5 ||
                    forgetdetail.username.length < 8 ||
                    forgetdetail.password.length < 8 ||
                    forgetdetail.confirm_password.length < 8 ||
                    forgetdetail.password !== forgetdetail.confirm_password
                  }
                >
                  Change Password
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </AnimatedPage>
    </>
  );
}
