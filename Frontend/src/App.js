import "./App.css";
import Sidebar from "./Components/Sidebar.js";
import Searchbar from "./Components/Searchbar";

import { Routes, Route, useLocation } from "react-router-dom";

import { useState } from "react";
import Individual_Recipe from "./Components/Individual_Recipe";
import Login from "./Components/Login";
import LoadingBar from "react-top-loading-bar";

import Profile from "./Components/Profile";
import Home from "./Components/Home";
import AddRecipe from "./Components/AddRecipe";
import SearchResult from "./Components/SearchResult";
import { useContext } from "react";
import RecipeContext from "./Context/RecipeContext";

import Profile_Profile from "./Components/Profile_Profile";
import Profile_Security from "./Components/Profile_Security";
import Profile_LikedRecipe from "./Components/Profile_LikedRecipe";
import Profile_Activity from "./Components/Profile_Activity";

import SignUp from "./Components/SignUp";
import CuisineType from "./Components/CuisineType";
import Health from "./Components/Health";
import Meal from "./Components/Meal";
import Dishtype from "./Components/Dishtype";
import Diettype from "./Components/Diettype";
import Footer from "./Components/Footer";

import EditRecipe from "./Components/EditRecipe";

import Admin from "./Components/Admin";
import { AnimatePresence } from "framer-motion";
import EditUserAdmin from "./Components/EditUserAdmin";
import Alert from "./Components/Alert";

function App() {
  const context = useContext(RecipeContext);
  const { alert, progress, setProgress, progressheight } = context;

  const [mode, setMode] = useState("light mode");
  const [button_label, setButton_label] = useState("Dark mode");
  const [textColor, setTextColor] = useState("dark");
  const [textColor_button, setTextColor_button] = useState("dark");
  const [color, setColor] = useState("dark");
  const [topLeftColor, settopLeftColor] = useState("white");
  const [headingColor, setheadingColor] = useState("dark");

  let location = useLocation();
  return (
    <>
      <LoadingBar
        color="blue"
        progress={progress}
        height={progressheight}
        onLoaderFinished={() => setProgress(0)}
      />

      <Sidebar color={textColor} crossColor={color}></Sidebar>

      <Searchbar
      
      
      ></Searchbar>

      <Alert alert={alert}></Alert>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route exact path="/login" element={<Login></Login>} />

          <Route exact path="/home" element={<Home></Home>} />
          <Route
            exact
            path="/Edituser"
            element={<EditUserAdmin></EditUserAdmin>}
          />
          <Route exact path="/Admin" element={<Admin></Admin>} />

          <Route
            exact
            path="/AddRecipe"
            element={
              <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                  <AddRecipe></AddRecipe>
                </div>
              </section>
            }
          />
          <Route exact path="/signUp" element={<SignUp></SignUp>} />
          <Route exact path="/Edit" element={<EditRecipe></EditRecipe>} />

          <Route
            exact
            path="/Profile"
            element={
              <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                  <Profile_Profile></Profile_Profile>
                </div>
              </section>
            }
          />
          <Route exact path="/Add_Recipe" element={<AddRecipe></AddRecipe>} />
          <Route exact path="/health" element={<Health></Health>} />
          <Route exact path="/mealtype" element={<Meal></Meal>} />
          <Route exact path="/diettype" element={<Diettype></Diettype>} />
          <Route exact path="/dishtype" element={<Dishtype></Dishtype>} />
          <Route
            exact
            path="/cuisineType"
            element={<CuisineType></CuisineType>}
          />
          <Route exact path="/" element={<Home></Home>} />
          <Route
            exact
            path="/SearchResult"
            element={<SearchResult></SearchResult>}
          />
          <Route
            exact
            path="/RecipeItself"
            element={<Individual_Recipe></Individual_Recipe>}
          />
          <Route
            exact
            path="/Profile_Profile"
            element={
              <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                  <Profile_Profile></Profile_Profile>
                </div>
              </section>
            }
          />
          <Route
            exact
            path="/Profile_Security"
            element={
              <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                  <Profile_Security></Profile_Security>
                </div>
              </section>
            }
          />
          <Route
            exact
            path="/Profile_Recipe"
            element={
              <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                  <Profile></Profile>
                </div>
              </section>
            }
          />
          <Route
            exact
            path="/Profile_LikedRecipe"
            element={
              <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                  <Profile_LikedRecipe></Profile_LikedRecipe>
                </div>
              </section>
            }
          />
          <Route
            exact
            path="/Profile_Activity"
            element={
              <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">
                  <Profile_Activity></Profile_Activity>
                </div>
              </section>
            }
          />

          <Route
            exact
            path="/Individual_description"
            element={
              <>
                <Individual_Recipe></Individual_Recipe>
              </>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer></Footer>
    </>
  );
}

export default App;
