import "./App.css";
import Sidebar from "./Components/Sidebar.js";
import Searchbar from "./Components/Searchbar";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import RecipeCategory from "./Components/RecipeCategory";
import { useState } from "react";
import Individual_Recipe from "./Components/Individual_Recipe";
import Login from "./Components/Login";
import LoadingBar from "react-top-loading-bar";
import RecipeState from "./Context/RecipeState";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import AddRecipe from "./Components/AddRecipe";
import SearchResult from "./Components/SearchResult";
import { useContext } from "react";
import RecipeContext from "./Context/RecipeContext";
import Alert from "./Components/Alert";
import Profile_Top from "./Components/Profile_Top";
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
import InternalServerError from "./Components/InternalServerError";
import EditRecipe from "./Components/EditRecipe";
import BlankRecipeItemAddRecipe from "./Components/BlankRecipeItemAddRecipe";
import { AnimatePresence } from "framer-motion";

function App() {
  const context = useContext(RecipeContext)
  const {alert,progress,setProgress,progressheight} = context
 
  const Recipe_category = [
    {
      path: "/Dinner",
      key: "Dinner",
      heading: "Dinner Recipes",
      category: "mealType=Dinner",
    },
    {
      path: "/Breakfast",
      key: "Breakfast",
      heading: "Breakfast Recipes",
      category: "mealType=Breakfast",
    },
    {
      path: "/Lunch",
      key: "Lunch",
      heading: "Lunch Recipes",
      category: "mealType=Lunch",
    },
    {
      path: "/Snack",
      key: "Snack",
      heading: "Snack Recipes",
      category: "mealType=Snack",
    },
    {
      path: "/Teatime",
      key: "Teatime",
      heading: "Teatime Recipes",
      category: "mealType=Teatime",
    },
    {
      path: "/Cereals",
      key: "Cereals",
      heading: "Cereals Recipes",
      category: "dishType=Cereals",
    },
    {
      path: "/Bread",
      key: "Bread",
      heading: "Bread Recipes",
      category: "dishType=Bread",
    },
    {
      path: "/Condiments And Sauces",
      key: "Condiments And Sauces",
      heading: "Condiments And Sauces Recipes",
      category: "dishType=Condiments%20and%20sauces",
    },
    {
      path: "/Drinks",
      key: "Drinks",
      heading: "Drinks Recipes",
      category: "dishType=Drinks",
    },
    {
      path: "/Desserts",
      key: "Desserts",
      heading: "Desserts Recipes",
      category: "dishType=Desserts",
    },
    {
      path: "/Preserve",
      key: "Preserve",
      heading: "Preserve Recipes",
      category: "dishType=Preserve",
    },
    {
      path: "/Preps",
      key: "Preps",
      heading: "Preps Recipes",
      category: "dishType=Preps",
    },
    {
      path: "/Pancake",
      key: "Pancake",
      heading: "Pancake Recipes",
      category: "dishType=Pancake",
    },
    {
      path: "/MainCourse",
      key: "MainCourse",
      heading: "MainCourse Recipes",
      category: "dishType=Main%20course",
    },

    {
      path: "/Starter",
      key: "Starter",
      heading: "Starter Recipes",
      category: "dishType=Starter",
    },
    {
      path: "/Soup",
      key: "Soup",
      heading: "Soup Recipes",
      category: "dishType=Soup",
    },
    {
      path: "/Sandwiches",
      key: "Sandwiches",
      heading: "Sandwiches Recipes",
      category: "dishType=Sandwiches",
    },
    {
      path: "/Salad",
      key: "Salad",
      heading: "Salad Recipes",
      category: "dishType=Salad",
    },

    {
      path: "/Sweets",
      key: "Sweat",
      heading: "Sweets Recipes",
      category: "dishType=Sweets",
    },

    {
      path: "/lowCarb",
      key: "lowCarb",
      heading: "lowCarb Recipes",
      category: "diet=low-carb",
    },
    {
      path: "/highProtein",
      key: "highProtein",
      heading: "high-protein Recipes",
      category: "diet=high-protein",
    },
    {
      path: "/highFiber",
      key: "highFiber",
      heading: "high-fiber Recipes",
      category: "diet=high-fiber",
    },
    {
      path: "/balanced",
      key: "balanced",
      heading: "balanced Recipes",
      category: "diet=balanced",
    },

    {
      path: "/eggFree",
      key: "eggFree",
      heading: "Egg-free Recipes",
      category: "health=egg-free",
    },
    {
      path: "/alcoholFree",
      key: "alcoholFree",
      heading: "alcohol-free Recipes",
      category: "health=alcohol-free",
    },
    {
      path: "/lowSodium",
      key: "lowSodium",
      heading: "lowSodium Recipes",
      category: "diet=low-sodium",
    },
    {
      path: "/lowFat",
      key: "lowFat",
      heading: "lowFat Recipes",
      category: "diet=low-fat",
    },

    {
      path: "/noOilAdded",
      key: "noOilAdded",
      heading: "No-Oil Recipes",
      category: "health=no-oil-added",
    },

    {
      path: "/mustardFree",
      key: "mustardFree",
      heading: "mustardFree Recipes",
      category: "health=mustard-free",
    },
    {
      path: "/lowSugar",
      key: "lowSugar",
      heading: "low-sugar Recipes",
      category: "health=lowSugar",
    },
    {
      path: "/lowFatAbs",
      key: "lowFatFbs",
      heading: "low-fat-abs Recipes",
      category: "health=low-fat-abs",
    },
    {
      path: "/kidneyFriendly",
      key: "kidneyFriendly",
      heading: "kidney-friendly Recipes",
      category: "health=kidney-friendly",
    },
    {
      path: "/glutenFree",
      key: "glutenFree",
      heading: "gluten-free Recipes",
      category: "health=gluten-free",
    },

    {
      path: "/American",
      key: "American",
      heading: "American Recipes",
      category: "cuisineType=American",
    },
    {
      path: "/wheatFree",
      key: "wheatFree",
      heading: "wheatFree Recipes",
      category: "health=wheat-free",
    },
    {
      path: "/vegetarian",
      key: "vegetarian",
      heading: "vegetarian Recipes",
      category: "health=vegetarian",
    },
    {
      path: "/vegan",
      key: "vegan",
      heading: "vegan Recipes",
      category: "health=vegan",
    },

    {
      path: "redFeatFree",
      key: "redFeatFree",
      heading: "red-meat-free Recipes",
      category: "health=red-meat-free",
    },
    {
      path: "/Italian",
      key: "Italian",
      heading: "Italian Recipes",
      category: "cuisineType=Italian",
    },
    {
      path: "/Indian",
      key: "Indian",
      heading: "Indian Recipes",
      category: "cuisineType=Indian",
    },
    {
      path: "/French",
      key: "French",
      heading: "French  Recipes",
      category: "cuisineType=French",
    },
    {
      path: "/Chinese",
      key: "Chinese",
      heading: "Chinese Recipes",
      category: "cuisineType=Chinese",
    },
    {
      path: "/British",
      key: "British",
      heading: "British Recipes",
      category: "cuisineType=British",
    },
    {
      path: "/SouthAmerican",
      key: "SouthAmerican",
      heading: "South-American Recipes",
      category: "cuisineType=South%20American",
    },
    {
      path: "/Mexican",
      key: "Mexican",
      heading: "Mexican Recipes",
      category: "cuisineType=Mexican",
    },
    {
      path: "/Japanese",
      key: "Japanese",
      heading: "Japanese Recipes",
      category: "cuisineType=Japanese",
    },
  ];
 

  const [mode, setMode] = useState("light mode");
  const [button_label, setButton_label] = useState("Dark mode");
  const [textColor, setTextColor] = useState("dark");
  const [textColor_button, setTextColor_button] = useState("dark");
  const [color, setColor] = useState("dark");
  const [topLeftColor, settopLeftColor] = useState("white");
  const [headingColor, setheadingColor] = useState("dark");

  const Mode_handler = () => {
    if (mode === "light mode") {
      setMode("dark mode");
      setButton_label("Light Mode");
      document.body.style.backgroundColor = "grey";
      document.getElementById("Searchbar").style.backgroundColor = "#36454F";
      setTextColor("white");
      document.getElementById("offcanvas").style.backgroundColor = "#36454F";
      setTextColor_button("black");
      setColor("white");
      settopLeftColor("#B8B8B8");
      settopLeftColor("	#202020");
      setheadingColor("white");
    }
    if (mode === "dark mode") {
      setMode("light mode");
      setButton_label("Dark Mode");

      document.body.style.backgroundColor = "#5F9EA0";
      document.getElementById("Searchbar").style.backgroundColor = "#89CFF0";
      document.getElementById("offcanvas").style.backgroundColor = "#89CFF0";
      setTextColor_button("white");
      setTextColor("black");
      setColor("dark");
      settopLeftColor("white");
      setheadingColor("dark");
    }
  };
  let location=useLocation();
  return (
    <>
      <LoadingBar
        color='blue'
        progress={progress}
        height={progressheight}
        onLoaderFinished={() => setProgress(0)}
      />
   
        <Sidebar color={textColor} crossColor={color}></Sidebar>
        {/* <div className="container-fluid">
          <div className="row">
            <div className="col min-vh-120"> */}
        <Searchbar
          onClick={Mode_handler}
          size="large"
          label={button_label}
          type={color}
          textcolor={textColor_button}
        ></Searchbar>
<Alert alert={alert}></Alert>
<AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
          <Route exact path="/login" element={<Login></Login>} />

          <Route
            exact
            path="/home"
            element={
              
              <Home></Home>
             
         
           
            }
          />
          
          <Route
            exact
            path="/AddRecipe"
            element={
              <section style={{backgroundColor: "#eee"}}>
            <div className="container py-5">
              <Profile_Top></Profile_Top>
 <AddRecipe></AddRecipe>
  </div>

</section>
            }
          />
           <Route
            exact
            path="/signUp"
            element={
          <SignUp></SignUp>
            }
          />
          <Route
            exact
            path="/Edit"
            element={
    <EditRecipe></EditRecipe>
            }
          />
          {Recipe_category.map((element) => {
            return (
              <Route
              key={element.key}
                exact
                path={`${element.path}`}
                element={
                  <RecipeCategory
                    textColor={textColor}
                    topLeftColor={topLeftColor}
                    setProgress={setProgress}
                    headingColor={headingColor}
                    type={color}
                    textcolor={textColor_button}
                    key={`${element.key}`}
                    heading={`${element.heading}`}
                    category={element.category}
                  ></RecipeCategory>
                }
              />
            );
          })}
           <Route
                exact
                path='/Profile'
                element={
                  <section style={{backgroundColor: "#eee"}}>
                <div className="container py-5">
                  <Profile_Top></Profile_Top>
      <Profile_Profile></Profile_Profile>
      </div>
 
 </section>
                }

              />
              <Route
                exact
                path='/Add_Recipe'
                element={
      <AddRecipe></AddRecipe>
                }
              />
               <Route
                exact
                path='/health'
                element={
<Health></Health>
                }
              />
               <Route
                exact
                path='/mealtype'
                element={
<Meal></Meal>
                }
              />
               <Route
                exact
                path='/diettype'
                element={
<Diettype></Diettype>
                }
              />
               <Route
                exact
                path='/dishtype'
                element={
<Dishtype></Dishtype>
                }
              />
              <Route
                exact
                path='/cuisineType'
                element={
      <CuisineType></CuisineType>
                }
              />
                <Route
                exact
                path='/'
                element={
      <Home></Home>
                }
              />
              <Route
                exact
                path='/SearchResult'
                element={
     <SearchResult></SearchResult>
                }
              />
              <Route
                exact
                path='/RecipeItself'
                element={
   <Individual_Recipe></Individual_Recipe>
                }
              />
              <Route
                exact
                path='/Profile_Profile'
                element={ <section style={{backgroundColor: "#eee"}}>
                <div className="container py-5">
                  <Profile_Top></Profile_Top>
      <Profile_Profile></Profile_Profile>
      </div>
 
 </section>
                }
              />
               <Route
                exact
                path='/Profile_Security'
                element={ <section style={{backgroundColor: "#eee"}}>
                <div className="container py-5">
                  <Profile_Top></Profile_Top>
      <Profile_Security></Profile_Security>
      </div>
 
 </section>
                }
              />
              <Route
                exact
                path='/Profile_Recipe'
                element={ <section style={{backgroundColor: "#eee"}}>
                <div className="container py-5">
                  <Profile_Top></Profile_Top>
      <Profile></Profile>
      </div>
 
 </section>
                }
              />
               <Route
                exact
                path='/Profile_LikedRecipe'
                element={ <section style={{backgroundColor: "#eee"}}>
                <div className="container py-5">
                  <Profile_Top></Profile_Top>
      <Profile_LikedRecipe></Profile_LikedRecipe>
      </div>
 
 </section>
                }
              />
              <Route
                exact
                path='/Profile_Activity'
                element={ <section style={{backgroundColor: "#eee"}}>
                <div className="container py-5">
                  <Profile_Top></Profile_Top>
      <Profile_Activity></Profile_Activity>
      </div>
 
 </section>
                }
              />
              
               <Route
                exact
                path='/Individual_description'
                element={<>
                 
                  <Individual_Recipe></Individual_Recipe>

              
                </>
                
                }
              />
              
          {/* <Route
            exact
            path="/Dinner"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Dinner"
                heading="Dinner Recipes"
                category={"mealType=Dinner"}
              ></RecipeCategory>
            }
          /> */}
          {/* <Route
            exact
            path="/Breakfast"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Breakfast"
                heading="Breakfast Recipes"
                category={"mealType=Breakfast"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Lunch"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Lunch"
                heading="Lunch Recipes"
                category={"mealType=Lunch"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Snack"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Snack"
                heading="Snack Recipes"
                category={"mealType=Snack"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Teatime"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Snack"
                Key="Teatime"
                heading="Teatime Recipes"
                category={"mealType=Teatime"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Bread"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Bread"
                heading="Bread Recipes"
                category={"dishType=Bread"}
              ></RecipeCategory>
            }
          />

          <Route
            path="/Cereals"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Cereals"
                heading="Cereals Recipes"
                category={"dishType=Cereals"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Condiments And Sauces"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Condiments And Sauces"
                heading="Condiments And Sauces Recipes"
                category={"dishType=Condiments%20and%20sauces"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Desserts"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Desserts"
                heading="Desserts Recipes"
                category={"dishType=Desserts"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Drinks"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Drinks"
                heading="Drinks Recipes"
                category={"dishType=Drinks"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/MainCourse"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="MainCourse"
                heading="MainCourse Recipes"
                category={"dishType=Main%20course"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Pancake"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Pancake"
                heading="Pancake Recipes"
                category={"dishType=Pancake"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Preps"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Preps"
                heading="Preps Recipes"
                category={"dishType=Preps"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Preserve"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Preserve"
                heading="Preserve Recipes"
                category={"dishType=Preserve"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Salad"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Salad"
                heading="Salad Recipes"
                category={"dishType=Salad"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Sandwiches"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Sandwiches"
                heading="Sandwiches Recipes"
                category={"dishType=Sandwiches"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Soup"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Soup"
                heading="Preserve Recipes"
                category={"dishType=Soup"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Starter"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Starter"
                heading="Starter Recipes"
                category={"dishType=Starter"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Sweets"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Preserve"
                heading="Sweets Recipes"
                category={"dishType=Sweets"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/balanced"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="balanced"
                heading="balanced Recipes"
                category={"diet=balanced"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/highFiber"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="highFiber"
                heading="high-fiber Recipes"
                category={"diet=high-fiber"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/highProtein"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="highProtein"
                heading="high-protein Recipes"
                category={"diet=high-protein"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/lowCarb"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="lowCarb"
                heading="lowCarb Recipes"
                category={"diet=low-carb"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/lowFat"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="lowFat"
                heading="lowFat Recipes"
                category={"diet=low-fat"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/lowSodium"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="lowSodium"
                heading="lowSodium Recipes"
                category={"diet=low-sodium"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/alcoholFree"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="alcoholFree"
                heading="alcohol-free Recipes"
                category={"health=alcohol-free"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/eggFree"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="eggFree"
                heading="Egg-free Recipes"
                category={"health=egg-free"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/glutenFree"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="glutenFree"
                heading="gluten-free Recipes"
                category={"health=gluten-free"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/kidneyFriendly"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="kidneyFriendly"
                heading="kidney-friendly Recipes"
                category={"health=kidney-friendly"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/lowFatAbs"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="lowFatFbs"
                heading="low-fat-abs Recipes"
                category={"health=low-fat-abs"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/lowSugar"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="lowSugar"
                heading="low-sugar Recipes"
                category={"health=lowSugar"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/mustardFree"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="mustardFree"
                heading="mustardFree Recipes"
                category={"health=mustard-free"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/noOilAdded"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="noOilAdded"
                heading="mustardFree Recipes"
                category={"health=no-oil-added"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/redFeatFree"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="redFeatFree"
                heading="red-meat-free Recipes"
                category={"health=red-meat-free"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/vegan"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="vegan"
                heading="vegan Recipes"
                category={"health=vegan"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/vegetarian"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="vegetarian"
                heading="vegetarian Recipes"
                category={"health=vegetarian"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/wheatFree"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="wheatFree"
                heading="wheatFree Recipes"
                category={"health=wheat-free"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/American"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="American"
                heading="American Recipes"
                category={"cuisineType=American"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/British"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="British"
                heading="British Recipes"
                category={"cuisineType=British"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Chinese"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Chinese"
                heading="Chinese Recipes"
                category={"cuisineType=Chinese"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/French"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="French"
                heading="French Recipes"
                category={"cuisineType=French"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Indian"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Indian"
                heading="Indian Recipes"
                category={"cuisineType=Indian"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Italian"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Italian"
                heading="Italian Recipes"
                category={"cuisineType=Italian"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Japanese"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Japanese"
                heading="Japanese Recipes"
                category={"cuisineType=Japanese"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/Mexican"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="Mexican"
                heading="Mexican Recipes"
                category={"cuisineType=Mexican"}
              ></RecipeCategory>
            }
          />
          <Route
            path="/SouthAmerican"
            element={
              <RecipeCategory
                textColor={textColor}
                topLeftColor={topLeftColor}
                setProgress={setProgress}
                headingColor={headingColor}
                type={color}
                textcolor={textColor_button}
                key="SouthAmerican"
                heading="South-American Recipes"
                category={"cuisineType=South%20American"}
              ></RecipeCategory>
            }
          /> */}
        </Routes>
        </AnimatePresence>
        {/* </div>
          </div>
        </div> */}
        <Footer></Footer>
      

      {/* <Individual_Recipe></Individual_Recipe> */}
    </>
  );

}

export default App;
