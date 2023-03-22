import React from "react";
import { useLocation } from 'react-router-dom';
import './sidebar.css'
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { Sidebar as mysidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
export default function Sidebar(props) {
  let location = useLocation();

  React.useEffect(() => {
   
  }, [location]);

  return (
    <>
  
      <div
        className="offcanvas offcanvas-start  border border-dark "
        tabIndex="-1"
        id="offcanvas"
        bs-offcanvas-padding-x= "0rem"
        data-bs-keyboard="false"
        data-bs-backdrop="false"
        style={{ backgroundColor: "#96C2DB" }}
      >
        <div className="offcanvas-header ">
          <h6 className={`offcanvas-title d-none d-sm-block text-white fw-bold`} id="offcanvas">
            Menu
          </h6>
          <button
            type="button"
            className={`btn-close btn-close-${props.crossColor} text-reset`}
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            
          ></button>
        </div>
       
        <div className="offcanvas-body">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu"
          >
            <li className={`nav-item li  ${location.pathname ==="/home"?"home":""}`}>
              <Link to="/home" className={`nav-link text-truncate text-white fw-bold`}>
                <i className=" fa-sharp fa-solid fa-house"></i>
                <span className="mode">Ho</span>
                <span className="">me</span>
              </Link>
            </li>
            <li className ={` li ${location.pathname ==="/dashboard"?"dashboard":""}`}>
              <a
                href="#submenu1"
                data-bs-toggle="collapse"
                className="nav-link text-truncate text-white fw-bold"
                 
              >
                <i className="fa-solid fa-table-columns" ></i>
                <span className="">Dashboard</span>{" "}
              </a>
            </li>
            <li className ={`li ${location.pathname ==="/order"?"order":""}`}>
              <Link to="/Profile" className="nav-link text-truncate text-white fw-bold">
                <i className="fs-5 bi-table"></i>
                <span className="">Profile</span>
              </Link>
            </li>
           

            <li className ={`li ${location.pathname ==="/login"?"login":""}`}>
              <a href="/login" className="nav-link text-truncate text-white fw-bold">
                <i className="fs-5 bi-grid"></i>
                <span className="">Login</span>
              </a>
            </li>
            <li className ={` li ${location.pathname ==="/customers"?"customers":""}`}>
              <a href="/RecipeItself" className="nav-link text-truncate text-white fw-bold">
                <i className="fs-5 bi-people"></i>
                <span className="">Customers</span>{" "}
              </a>
             
            </li>
            </ul>
            <hr className="hr" />
            <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu">
            <li className ="category-heading li">
              <div className={`nav-link text-truncate text-white fw-bold`}>
              <i className=" fs-5 fa-solid fa-list text-white p-1"></i>
            <span className="ms-1   ">Meal-Type</span>{" "}
              </div>
            </li>
            <li className ={` li ${location.pathname ==="/Dinner"?"home":""}`}>
              <Link to="/Dinner" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-utensils p-1 text-dark"></i>
                <span className="ms-1">Dinner</span>{" "}
              </Link>
            </li>
            <li  className ={` li ${location.pathname ==="/Breakfast"?"dashboard":""}`}>
              <Link to="/Breakfast" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-utensils p-1 text-dark"></i>
                <span className="ms-1">Breakfast</span>{" "}
              </Link>
            </li>
            <li className ={`li ${location.pathname ==="/Lunch"?"order":""}`}>
              <Link to="/Lunch" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-utensils p-1 text-dark"></i>
                <span className="ms-1">Lunch</span>{" "}
              </Link>
            </li>
            <li className ={` li ${location.pathname ==="/Snack"?"login":""}`}>
              <Link to="/Snack" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-utensils p-1 text-dark"></i>
                <span className="ms-1">Snacks</span>{" "}
              </Link>
            </li>
            <li className={` li ${location.pathname ==="/Teatime"?"customers":""}`}>
              <Link to="/Teatime" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-utensils p-1 text-dark"></i>
                <span className="ms-1">Teatime</span>{" "}
              </Link>
            </li>
            {/* heading */}
            </ul>
            <hr className="hr" />
            <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu">
            <li className ="category-heading li">
              <div className={`nav-link text-truncate text-white fw-bold`}>
              <i className=" fs-5 fa-solid fa-list  text-white p-1"></i>
            <span className="ms-1 ">Dish-Type</span>{" "}
              </div>
            </li>
            <li  className ={` li ${location.pathname ==="/Bread"?"home":""}`}>
              <Link to="/Bread" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Bread</span>{" "}
              </Link>
            </li>


            <li  className ={`li ${location.pathname ==="/Cereals"?"dashboard":""}`}>
              <a href="/Cereals" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Cereals</span>{" "}
              </a>
            </li>
            <li className ={`${location.pathname ==="/Condiments And Sauces"?"order":""}`}>
              <Link to="/Condiments And Sauces" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Condiments And Sauces</span>{" "}
              </Link>
            </li>
            <li className ={`li ${location.pathname ==="/Desserts"?"login":""}`}>
              <Link to="/Desserts" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Desserts</span>{" "}
              </Link>
            </li>
            <li className ={`li ${location.pathname ==="/Drinks"?"customers":""}`}>
              <Link to="/Drinks" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Drinks</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/MainCourse"?"home":""}`}>
              <Link to="/MainCourse" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">MainCourse</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/Pancake"?"dashboard":""}`}>
              <Link to="/Pancake" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Pancake</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/preps"?"order":""}`}>
              <Link to="/Preps" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Preps</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/salad"?"login":""}`}>
              <Link to="/Salad" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Salad</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/Sandwiches"?"customers":""}`}>
              <Link to="/Sandwiches" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Sandwiches</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/Soup"?"home":""}`}>
              <Link to="/Soup" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Soup</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/Starter"?"dashboard":""}`}>
              <Link to="/Starter" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Starter</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/Sweets"?"order":""}`}>
              <Link to="/Sweets" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-sharp fa-solid fa-bowl-food text-dark p-1"></i>
                <span className="ms-1">Sweets</span>{" "}
              </Link>
            </li>
            </ul>
            <hr className="hr" />
            <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu">
            <li className ="category-heading li">
              <div className={`nav-link text-truncate text-white  fw-bold`}>
              <i className=" fs-5 fa-solid fa-list text-white p-1"></i>
            <span className="ms-1 ">Deit-Type</span>{" "}
              </div>
            </li>
            <li  className ={`li ${location.pathname ==="/balanced"?"home":""}`}>
              <Link to="/balanced" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-bacon text-dark p-1"></i>
                <span className="ms-1">balanced</span>{" "}
              </Link>
            </li>
            <li  className ={`li ${location.pathname ==="/highFiber"?"dashboard":""}`}>
              <Link to="/highFiber" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-bacon text-dark p-1"></i>
                <span className="ms-1">HighFiber</span>{" "}
              </Link>
            </li>
            <li className ={`li ${location.pathname ==="/highProtein"?"order":""}`}>
              <Link to="/highProtein" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-bacon text-dark p-1"></i>
                <span className="ms-1">high-protein</span>{" "}
              </Link>
            </li>
            {/* <li className ="login"{`${location.pathname ==="/highProtein"?"order":""}`}>
              <Link to="/highProtein" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-bacon text-dark p-1"></i>
                <span className="ms-1">highProtein</span>{" "}
              </Link>
            </li> */}
            <li className={`li ${location.pathname ==="/lowCarb"?"customers":""}`}>
              <Link to="/lowCarb" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-bacon text-dark p-1"></i>
                <span className="ms-1">lowCarb</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/lowFat"?"home":""}`}>
              <Link to="/lowFat" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-bacon text-dark p-1"></i>
                <span className="ms-1">low-fat</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/Preserve"?"dashboard":""}`}>
              <Link to="/Preserve" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-bacon text-dark p-1"></i>
                <span className="ms-1">Preserve</span>{" "}
              </Link>
            </li>
            
            </ul>
            <hr className="hr "/>
            <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu">
               <li  className ="category-heading li">
              <div className={`nav-link text-truncate text-white fw-bold`}>
              <i className=" fs-5 fa-solid fa-list text-white p-1"></i>
            <span className="ms-1 mode">Health</span>{" "}
              </div>
            </li>
              <li className={` li ${location.pathname ==="/alcoholFree"?"home":""}`}>
              <Link to="/alcoholFree" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-wheat-awn-circle-exclamation text-dark p-1"></i>
                <span className="ms-1">alcohol-Free</span>{" "}
              </Link>
            </li>
            <li  className ={`li ${location.pathname ==="/eggFree"?"dashboard":""}`}>
              <Link to="/eggFree" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-wheat-awn-circle-exclamation text-dark p-1"></i>
                <span className="ms-1">Egg-free</span>{" "}
              </Link>
            </li>
            <li className ={`li ${location.pathname ==="/glutenFree"?"order":""}`}>
              <Link to="/glutenFree" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-wheat-awn-circle-exclamation text-dark p-1"></i>
                <span className="ms-1">gluten-free</span>{" "}
              </Link>
            </li>
            <li className ={`li ${location.pathname ==="/kidneyFriendly"?"login":""}`}>
              <Link to="/kidneyFriendly" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-wheat-awn-circle-exclamation text-dark p-1"></i>
                <span className="ms-1">kidney-Friendly</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/lowFatAbs"?"customers":""}`}>
              <Link to="/lowFatAbs" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-wheat-awn-circle-exclamation text-dark p-1"></i>
                <span className="ms-1">low-fat-abs</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/lowSugar"?"home":""}`}>
              <Link to="/lowSugar" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-wheat-awn-circle-exclamation text-dark p-1"></i>
                <span className="ms-1">low-sugar</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/mustardFree"?"dashboard":""}`}>
              <Link to="/mustardFree" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-wheat-awn-circle-exclamation text-dark p-1"></i>
                <span className="ms-1">Mustard-free</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/noOilAdded"?"order":""}`}>
              <Link to="/noOilAdded" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-wheat-awn-circle-exclamation text-dark p-1"></i>
                <span className="ms-1">No-oil-added</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/redMeatFree"?"login":""}`}>
              <Link to="/redMeatFree" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-wheat-awn-circle-exclamation text-dark p-1"></i>
                <span className="ms-1">red-meat-free</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/vegan"?"customers":""}`}>
              <Link to="/vegan" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-wheat-awn-circle-exclamation text-dark p-1"></i>
                <span className="ms-1">vegan</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/vegetarian"?"home":""}`}>
              <Link to="/vegetarian" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-wheat-awn-circle-exclamation text-dark p-1"></i>
                <span className="ms-1">vegetarian</span>{" "}
              </Link>
            </li>
             
            </ul>
            <hr className="hr "/>
            
            <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu">
               <li className ="category-heading li">
              <div className={`nav-link text-truncate text-white fw-bold`}>
              <i className=" fs-5 fa-solid fa-list text-white p-1"></i>
            <span className="ms-1 ">Cuisine Type</span>{" "}
              </div>
            </li>
            <li  className ={`li ${location.pathname ==="/American"?"home":""}`}>
              <Link to="/American" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-flag text-dark p-1"></i>
                <span className="ms-1">American</span>{" "}
              </Link>
            </li>
            <li  className ={`li ${location.pathname ==="/British"?"dashboard":""}`}>
              <Link to="/British" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-flag text-dark p-1"></i>
                <span className="ms-1">British</span>{" "}
              </Link>
            </li>
            <li className ={`li ${location.pathname ==="/Chinese"?"order":""}`}>
              <Link to="/Chinese" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-flag text-dark p-1"></i>
                <span className="ms-1">Chinese</span>{" "}
              </Link>
            </li>
            <li className ={`li ${location.pathname ==="/French"?"login":""}`}>
              <Link to="/French" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-flag text-dark p-1"></i>
                <span className="ms-1">French</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/Indian"?"Customers":""}`}>
              <Link to="/Indian" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-flag text-dark p-1"></i>
                <span className="ms-1">Indian</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/Japanese"?"home":""}`}>
              <Link to="/Japanese" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-flag text-dark p-1"></i>
                <span className="ms-1">Japanese</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/Italian"?"dashboard":""}`}>
              <Link to="/Italian" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-flag text-dark p-1"></i>
                <span className="ms-1">Italian</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/Mexican"?"order":""}`}>
              <Link to="/Mexican" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-flag text-dark p-1"></i>
                <span className="ms-1">Mexican</span>{" "}
              </Link>
            </li>
            <li className={`li ${location.pathname ==="/SouthAmerican"?"login":""}`}>
              <Link to="/SouthAmerican" className="nav-link text-truncate text-white fw-bold">
              <i className="fa-solid fa-flag text-dark p-1"></i>
                <span className="ms-1 ">South-American</span>{" "}
              </Link>
            </li>
          
          
            {/* <mysidebar>
  <Menu>
    <SubMenu label="Charts">
      <MenuItem> Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu>
    <MenuItem> Documentation </MenuItem>
    <MenuItem> Calendar </MenuItem>
  </Menu>
</mysidebar> */}


          </ul>
         
        </div></div>
 
    </>
  );
}
