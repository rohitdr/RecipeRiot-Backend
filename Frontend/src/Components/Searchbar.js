import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './searchbar.css'
import { motion } from "framer-motion";
import RecipeContext from "../Context/RecipeContext";
import { useState } from "react";
import { Navbar, Text, Avatar, Dropdown,Input,Collapse, Modal,Button } from "@nextui-org/react";

import Loader from "./Loader";
export default function Searchbar(props) {
  const context = useContext(RecipeContext)
  const [searchmodal,setsearchmodal]=useState(false)
  const {recipe,NameRecipe, setName_to_search,name_to_search,searchRecipe,getUser,userData,namerecipeloading,setProgress} = context
let Navigate = useNavigate();
useEffect(()=>{
getUser()

},[localStorage.getItem('auth-token'),sessionStorage.getItem('auth-token')])


const logout=()=>{
 
  localStorage.removeItem("auth-token")
  sessionStorage.removeItem("auth-token")
Navigate("/login")
}
var searchentered

const collapsemealItems = [

 { path:"/mealtype",name:"Dinner",type:"lunch/dinner"},
 { path:"/mealtype",name:"BreakFast",type:"breakfast"},
 { path:"/mealtype",name:"Lunch",type:"lunch/dinner"},
 { path:"/mealtype",name:"Snack",type:"snack"},
 { path:"/mealtype",name:"TeaTime",type:"teatime"},
];
const collapsedishItems = [
 { path:"/dishtype",name:"Bread",type:"bread"},
 { path:"/dishtype",name:"Cereals",type:"cereals"},
 { path:"/dishtype",name:"Condiments and Sauces",type:"condiments and sauces"},
 { path:"/dishtype",name:"Desserts",type:"desserts"},
 { path:"/dishtype",name:"Drinks",type:"drinks"},
 { path:"/dishtype",name:"Main Course",type:"main course"},
 { path:"/dishtype",name:"Pancake",type:"pancake"},
 { path:"/dishtype",name:"Preps",type:"preps"},
 { path:"/dishtype",name:"Salad",type:"salad"},
 { path:"/dishtype",name:"Sandwiches",type:"sandwiches"},
 { path:"/dishtype",name:"Soup",type:"soup"},
 { path:"/dishtype",name:"Starter",type:"starter"}

];
const collapsedietItems = [
 { path:"/diettype",name:"Balanced",type:"Balanced"},
 { path:"/diettype",name:"High-Fiber",type:"High-Fiber"},
 { path:"/diettype",name:"High-Protein",type:"High-Protein"},
 { path:"/diettype",name:"Low-Carb",type:"Low-Carb"},
 { path:"/diettype",name:"Low-Fat",type:"Low-Fat"},
 { path:"/diettype",name:"Low-Sodium",type:"Low-Sodium"}
];
const collapsehealthItems = [
 { path:"/health",name:"Alcohol-Free",type:"Alcohol-Free"},
 { path:"/health",name:"Egg-Free",type:"Egg-Free"},
{ path:"/health",name:"Gluten-Free",type:"Gluten-Free"},
 { path:"/health",name:"Kidney-Friendly",type:"Kidney-Friendly"},
 { path:"/health",name:"Low-Fat-Abs",type:"Low-Fat-Abs"},
 { path:"/health",name:"Low-sugar",type:"Low-sugar"},
 { path:"/health",name:"Mustard-Free",type:"Mustard-Free"},
 { path:"/health",name:"No-Oil-Added",type:"No-Oil-Added"},
 { path:"/health",name:"Red-Meat-Free",type:"Red-Meat-Free"},
 { path:"/health",name:"Vegan",type:"Vegan"},
 { path:"/health",name:"Vegetarian",type:"Vegetarian"}
];
const collapsecuisineItems = [
 { path:"/cuisineType",name:"Indian",type:"indian"},
 { path:"/cuisineType",name:"American",type:"american"},
 { path:"/cuisineType",name:"British",type:"british"},
 { path:"/cuisineType",name:"Chinese",type:"chinese"},
 { path:"/cuisineType",name:"Japnese",type:"japnese"},
 { path:"/cuisineType",name:"Mexican",type:"mexican"},
 { path:"/cuisineType",name:"French",type:"french"}
];






 


  return (
 
    <>

<Navbar isBordered variant="sticky" >
        <Navbar.Brand css={{ mr: "$4" }}>
      
        <Navbar.Toggle aria-label="toggle navigation" showIn="md"/>
   
      <p className="navbar-brand d-none d-sm-block">
      {/* <motion.div animate={{x:[]}} transition={{duration:5}} > */}
      <img src="Reciperiotlogo.png" alt="Logo" width="75" height="90" className="d-inline-block align-text-top logoofwebsite"/>
      {/* </motion.div> */}
    </p>
          <Text  color="inherit" css={{ mr: "$11" }} hideIn="xs">
          <span className="navbar-brand "><span  className="name text-dark  fw-bold"> 
  
          <span className="R">R</span>
          <span className="e">e</span>
          <span className="c">c</span>
          <span className="i">i</span>
          <span className="p">p</span>
          <span className="e2">e</span>
          <span className="R2">R</span>
          <span className="i2">i</span>
          <span className="o">o</span>
          <span className="t">t</span>
          </span></span>
    
   
          </Text>
           </Navbar.Brand>
          


           <Navbar.Content
        
     
        
          variant="underline-rounded"
        

       
         

        >
             
      
          <Navbar.Link  hideIn="md" onClick={()=>{  Navigate("/home")}}> <p className="navbarhome"> HOME</p> </Navbar.Link>
          <Dropdown isBordered >
            <Navbar.Item  hideIn="md" >
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                }}
               iconRight={<i className="fa-sharp fa-solid fa-chevron-down"></i>}
                ripple={false}
              >
             <p className="fs-6 "> MEALTYPE</p>
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
              color="warning"
              aria-label="ACME features"
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
              <Dropdown.Item
        
             css={
              {
                color:"#dc3545"
              }
             }
                key="autoscaling"
                showFullDescription
                description="Looking to impress your dinner guests with a mouthwatering meal? Look no further than this delectable dinner recipe!"
              icon={<i className="fa-solid  fa-utensils fs-4 px-2" style={{color:"#dc3545"}}></i>}
              command={<i className="fa-solid fa-arrow-right fs-4 px-2 text-primary" ></i>}
           
           
              >
                <div onClick={()=>{Navigate("/mealtype",{state:{type:"lunch/dinner",on:true}})}}>
              Dinner</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="usage_metrics"
                showFullDescription
                css={
              {
                color:"purple"
              }
             }
                description="Whether you're looking to fuel up for a busy day ahead or simply indulge in a decadent morning treat, this breakfast recipe is sure to please."
               icon={<i className="fa-solid fa-bowl-food fs-4 px-2" style={{color:"purple"}}></i>}
              ><div onClick={()=>{Navigate("/mealtype",{state:{type:"breakfast",on:false}})}}>
             BreakFast</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="production_ready"
                showFullDescription
                css={{color:"$blue700"}}
                description="Don't settle for a boring sandwich or a lackluster salad for your midday meal! This lunch recipe will take your taste buds on a journey with every bite"
              icon={<i className="fa-sharp fa-solid fa-cloud-meatball fs-4 px-2 text-info"></i>}
              >
                <div onClick={()=>{Navigate("/mealtype",{state:{type:"lunch/dinner",on:true}})}}>
            Lunch</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="99_uptime"
                showFullDescription
                textColor="success"
                description="When the midday munchies strike or you're in need of a little pick-me-up, these snack recipes will have you covered!"
               icon={<i className="fa-solid fa-wheat-awn fs-4 px-2 text-success"></i>}
              >
                <div onClick={()=>{Navigate("/mealtype",{state:{type:"snack",on:false}})}}>
                Snacks</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="supreme_support"
                showFullDescription
                textColor="primary"
                description=" These teatime treats are the perfect way to unwind and relax with loved ones, or to indulge in a little self-care and me-time."
               icon={<i className="fa-solid fa-mug-saucer fs-4 px-2 text-primary"></i>}
              >
                <div onClick={()=>{Navigate("/mealtype",{state:{type:"teatime",on:false}})}}>
            TeaTime</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown isBordered  >
            <Navbar.Item  hideIn="md">
              <Dropdown.Button
               light
               auto
         
               iconRight={<i className="fa-sharp fa-solid fa-chevron-down"></i>}
         
         
                css={{
                  px: 4,
                  dflex: "center",
                  svg: { pe: "none" },
                  
                }}
               
               
              >
               <p className="fs-6"> DISHTYPE</p>
              </Dropdown.Button>
            </Navbar.Item >
            <Dropdown.Menu
           color="warning"
              aria-label="ACME features"
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
              <Dropdown.Item
                key="autoscaling"
                textColor="success"
                showFullDescription
                description="Bake your way to happiness with this delicious homemade bread recipe."
              icon={<i className="fa-solid fa-bread-slice text-success fs-4"></i>}
              >
                <div onClick={()=>{Navigate("/dishtype",{state:{type:"bread"}})}}>
               Bread</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="usage_metrics"
                textColor="error"
                showFullDescription
                description="Start your day off right with this delicious and nutritious homemade cereal recipe."
               icon={<i className="fa-solid fa-bowl-food text-danger fs-4"></i>}
              >
                 <div onClick={()=>{Navigate("/dishtype",{state:{type:"cereals"}})}}>
               Cereals</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="production_ready"
                textColor="primary"
                showFullDescription
                description="Transform any dish into a gourmet masterpiece with these delicious homemade condiments and sauces"
              icon={<i className="fa-sharp fa-solid fa-sink text-primay fs-4"></i>}
              > <div onClick={()=>{Navigate("/dishtype",{state:{type:"condiments and sauces"}})}}>
             Condiments And Sauces</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="99_uptime"
                css={{color:"Purple"}}
                showFullDescription
                description="Indulge your sweet tooth with this heavenly homemade dessert recipe."
               icon={<i className="fa-solid fa-ice-cream fs-4" style={{color:"purple"}}></i>}
              > <div onClick={()=>{Navigate("/dishtype",{state:{type:"desserts"}})}}>
               Desserts</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="supreme_support"
                css={{color:"Violet"}}
                showFullDescription
                description="Sip on paradise with this refreshing and delicious homemade drink recipe"
               icon={<i className="fa-solid fa-wine-glass-empty fs-4" style={{color:"Violet"}}></i>}
              > <div onClick={()=>{Navigate("/dishtype",{state:{type:"drinks"}})}}>
                Drinks</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="MainCourse"
                css={{color:"indigo"}}
                showFullDescription
                description="Impress your dinner guests with this mouth-watering homemade main course recipe."
               icon={<i className="fa-brands fa-discourse fs-4" style={{color:"indigo"}}></i>}
              > <div onClick={()=>{Navigate("/dishtype",{state:{type:"main course"}})}}>
               MainCourse</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="Pancake"
                css={{color:"chocolate"}}
                showFullDescription
                description="From classNameic flavors to creative twists, this pancake recipe is sure to please any palate."
               icon={<i className="fa-solid fa-bacon fs-4" style={{color:"chocolate"}}></i>}
              
              > <div onClick={()=>{Navigate("/dishtype",{state:{type:"pancake"}})}}>
               Pancake</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="Preps"
                css={{color:"brown"}}
                showFullDescription
                description="Make mealtime a breeze with this easy and time-saving homemade prep recipe."
               icon={<i className="fa-solid fa-mortar-pestle fs-4" style={{color:"brown"}}></i>}
              > <div onClick={()=>{Navigate("/dishtype",{state:{type:"preps"}})}}>
               Preps</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="Salad"
                css={{color:"$blue700"}}
                showFullDescription
                description="Elevate your salad game with this delicious and healthy homemade salad recipe."
               icon={<i className="fa-sharp fa-solid fa-lemon text-info fs-4" ></i>}
              > <div onClick={()=>{Navigate("/dishtype",{state:{type:"salad"}})}}>
                Salad</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="Sandwiches"
                css={{color:"Purple"}}
                showFullDescription
                description="Upgrade your lunch game with this easy and delicious homemade sandwich recipe."
               icon={<i className="fa-solid fa-hotdog fs-4" style={{color:"purple"}}></i>}
              > <div onClick={()=>{Navigate("/dishtype",{state:{type:"sandwiches"}})}}>
               Sandwiches</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="Soup"
                css={{color:"darksalmon"}}
                showFullDescription
                description="Warm your soul and delight your taste buds with this homemade soup recipe"
               icon={<i className="fa-solid fa-pump-soap fs-4" style={{color:"darksalmon"}}></i>}
              > <div onClick={()=>{Navigate("/dishtype",{state:{type:"soup"}})}}>
              Soup</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="Starter"
                css={{color:"rebeccapurple"}}
                showFullDescription
                description="Kick off your meal in style with this easy and flavorful homemade starter recipe"
               icon={<i className="fa-solid fa-hourglass-start fs-4" style={{color:"rebeccapurple"}}></i>}
              > <div onClick={()=>{Navigate("/dishtype",{state:{type:"starter"}})}}>
              Starter</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown isBordered>
            <Navbar.Item  hideIn="md">
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                }}
                iconRight={<i className="fa-sharp fa-solid fa-chevron-down"></i>}
                ripple={false}
              >
                <p className="fs-6">DEIT TYPE</p>
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
            color="warning"
              aria-label="ACME features"
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
              <Dropdown.Item
                key="autoscaling"
                showFullDescription
                textColor="primary"
                description="Achieve a healthy and balanced lifestyle with this delicious and nutritious homemade recipe."
              icon={<i className="fa-solid fa-scale-balanced text-primary fs-4"></i>}
              > <div onClick={()=>{Navigate("/diettype",{state:{type:"Balanced"}})}}>
               Balanced</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="usage_metrics"
                textColor="success"
                showFullDescription
                description="Fuel your body with the fiber it needs to thrive with this delicious and wholesome homemade recipe"
               icon={<i className="fa-solid fa-tower-observation text-success fs-4"></i>}
              ><div onClick={()=>{Navigate("/diettype",{state:{type:"High-Fiber"}})}}>
               highFiber</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="production_ready"
                showFullDescription
                textColor="erro"
                description="Power up your day with this delicious and protein-packed homemade recipe."
              icon={<i className="fa-solid fa-dna text-danger fs-4"></i>}
              ><div onClick={()=>{Navigate("/diettype",{state:{type:"High-Protein"}})}}>
                High-Protein</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="99_uptime"
                showFullDescription
               css={{color:"purple"}}
                description="Enjoy delicious and satisfying meals while maintaining a low-carb lifestyle with this easy and flavorful recipe."
               icon={<i className="fa-solid fa-bowl-food fs-4" style={{color:"purple"}}></i>}
              ><div onClick={()=>{Navigate("/diettype",{state:{type:"Low-Carb"}})}}>
                Low-Carb</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="supreme_support"
                showFullDescription
                css={{color:"Brown"}}
                description="Discover the delicious world of low-fat cooking with this easy and flavorful homemade recipe."
               icon={<i className="fa-solid fa-fan fs-4" style={{color:"brown"}}></i>}
              ><div onClick={()=>{Navigate("/diettype",{state:{type:"Low-Fat"}})}}>
               Low-Fat</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="Preserve"
                showFullDescription
                css={{color:"$blue700"}}
                description="Capture the flavors of the season with this delicious and easy homemade preserve recipe."
               icon={<i className="fa-solid fa-prescription-bottle text-info fs-4"></i>}
              ><div onClick={()=>{Navigate("/diettype",{state:{type:"Low-Sodium"}})}}>
             Low-Sodium</div>
              </Dropdown.Item>
             
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown isBordered>
            <Navbar.Item  hideIn="md">
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                }}
                iconRight={<i className="fa-sharp fa-solid fa-chevron-down"></i>}
                ripple={false}
              >
             <p className="fs-6"> HEALTH</p>
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
            iconRight={<i className="fa-sharp fa-solid fa-chevron-down"></i>}
              color="warning"
              aria-label="ACME features"
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
              <Dropdown.Item
                key="autoscaling"
                textColor="success"
                icon={<i className="fa-solid fa-champagne-glasses text-success"></i>}
                showFullDescription
                description="Experience the vibrant and delicious flavors of our alcohol-free recipe, without any of the after-effects"
              
              >
                  <div onClick={()=>{Navigate("/health",{state:{type:"Alcohol-Free"}})}}>
               Alcohol-Free</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="usage_metrics"
                textColor="error"
                showFullDescription
                icon={<i className="fa-solid fs-4 fa-egg text-danger"></i>}
                description="Indulge in the rich and satisfying taste of our egg-free recipe, perfect for those with dietary restrictions"
               
              >
                <div onClick={()=>{Navigate("/health",{state:{type:"Egg-Free"}})}}>
                Egg-Free</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="production_ready"
                textColor="primary"
                showFullDescription
                icon={<i className="fa-solid text-primary fs-4 fa-wheat-awn-circle-exclamation"></i>}
                description="Enjoy the delectable flavors of our gluten-free recipe, without compromising on taste or texture."
              
              >
                <div onClick={()=>{Navigate("/health",{state:{type:"Gluten-Free"}})}}>
                Gluten-Free</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="99_uptime"
               css={{color:"brown"}}
                showFullDescription
                icon={<i className="fa-solid fs-4 fa-solar-panel" style={{color:"brown"}}></i>}
                description="Savor the goodness of our kidney-friendly recipe, thoughtfully crafted to nourish your body while tantalizing your taste buds."
               
              >
                <div onClick={()=>{Navigate("/health",{state:{type:"Kidney-Friendly"}})}}>
                Kidney-Friendly</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="supreme_support"
                css={{color:"purple"}}
                showFullDescription
                icon={<i className="fa-solid fs-4 fa-fan" style={{color:"purple"}}></i>}
                description="Indulge guilt-free in our low-fat-abs recipe, designed to satisfy your cravings while promoting a healthier lifestyle."
               
              >
                <div onClick={()=>{Navigate("/health",{state:{type:"Low-Fat-Abs"}})}}>
               Low-Fat-Abs</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="Low-Sugar"
                css={{color:"$blue700"}}
                showFullDescription
                icon={<i className="fa-solid fs-4 fa-cubes-stacked text-info"></i>}
                description="Experience the sweetness of our low-sugar recipe, bursting with delicious flavors without the added sugar rush."
               
              >
                <div onClick={()=>{Navigate("/health",{state:{type:"Low-sugar"}})}}>
              Low-Sugar</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="Mustard-Free"
                css={{color:"orange"}}
                showFullDescription
                icon={<i className="fa-brands fs-4 fa-mastodon" style={{color:"orange"}}></i>}
                description="Enjoy the full flavor of our mustard-free recipe, perfect for those with allergies or simply looking for a refreshing change"
               
              >
                <div onClick={()=>{Navigate("/health",{state:{type:"Mustard-Free"}})}}>
              Mustard-Free</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="No-OIl-added"
                css={{color:"#b71c1c"}}
                icon={<i className="fa-solid fs-4 fa-bottle-droplet" style={{color:"#b71c1c"}}></i>}
                showFullDescription
                description="Taste the goodness of our no-oil-added recipe, carefully crafted to give you a healthy and flavorful meal without the excess oil."
               
              >
                <div onClick={()=>{Navigate("/health",{state:{type:"No-Oil-Added"}})}}>
               No-Oil-Added</div>
              </Dropdown.Item>
              <Dropdown.Item
                 css={{color:"darkred"}}
                key="Red-Meat-Free"
                icon={<i className="fa-solid fs-4 fa-drumstick-bite" style={{color:"darkred"}}></i>}
                showFullDescription
                description="Satisfy your cravings with our delicious red-meat-free recipe, bursting with flavor and wholesome ingredients for a satisfying meal."
               
              >
                <div onClick={()=>{Navigate("/health",{state:{type:"Red-Meat-Free"}})}}>
            Red-Meat-Free</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="Vegan"
                css={{color:"darkgreen"}}
               icon={<i className="fa-solid fs-4 fa-carrot" style={{color:"darkgreen"}}></i>}
                showFullDescription
                description="Experience the vibrant and delicious flavors of our vegan recipe, crafted with care to nourish your body and delight your taste buds."
               
              >
                <div onClick={()=>{Navigate("/health",{state:{type:"Vegan"}})}}>
               Vegan</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="Vegetarian"
                css={{color:"blueviolet"}}
                showFullDescription
                icon={<i className="fa-solid fs-4 fa-plant-wilt" style={{color:"blueviolet"}}></i>}
                description="Indulge in the goodness of our vegetarian recipe, packed with wholesome ingredients and bursting with flavor to satisfy your cravings."
               
              >
                <div onClick={()=>{Navigate("/health",{state:{type:"Vegetarian"}})}}>
            Vegetarian</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown isBordered>
            <Navbar.Item  hideIn="md">
              <Dropdown.Button
                auto
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                }}
                iconRight={<i className="fa-sharp fa-solid fa-chevron-down"></i>}
                ripple={false}
              >
             <p className="fs-6">CUISINETYPE</p>
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
              color="warning"
              isVirtualized={true}
              aria-label="ACME features"
              css={{
                $$dropdownMenuWidth: "340px",
                $$dropdownItemHeight: "70px",
                "& .nextui-dropdown-item": {
                  py: "$4",
                  // dropdown item left icon
                  svg: {
                    color: "$secondary",
                    mr: "$4",
                  },
                  // dropdown item title
                  "& .nextui-dropdown-item-content": {
                    w: "100%",
                    fontWeight: "$semibold",
                  },
                },
              }}
            >
             
             <Dropdown.Item
              
                key="autoscaling"
                showFullDescription
              textColor="success"
                description="Explore the exotic flavors of India with a tantalizing array of spices and herbs"
              icon={<i className="fa-solid fa-indian-rupee-sign  fs-4 px-2"></i>}
              
              >
             
              <div onClick={()=>{Navigate("/cuisineType",{state:{type:"indian"}})}}>
             Indian</div>
              </Dropdown.Item> 
              <Dropdown.Item
                key="usage_metrics"
                textColor="error"
                showFullDescription
                description="Indulge in the bold and comforting flavors of America, where classNameic dishes are reinvented with a modern twist"
               icon={<i className="fa-solid fa-dollar-sign fs-4 px-2 text-danger"></i>}
              >
                <div onClick={()=>{Navigate("/cuisineType",{state:{type:"american"}})}}>
               American</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="production_ready"
                showFullDescription
                textColor="primary"
                description="Experience the warmth and comfort of British cuisine, where hearty dishes are served with a side of tradition."
              icon={<i className="fa-solid fa-sterling-sign fs-4 px-2 text-primary"></i>}
              >
                <div onClick={()=>{Navigate("/cuisineType",{state:{type:"british"}})}}>
              British</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="99_uptime"
                showFullDescription
                css={{
                  color:"#17a2b8"
                }}
                description="Take your taste buds on a journey to the Far East with the exquisite flavors of Chinese cuisine."
               icon={<i className="fa-brands fa-yandex fs-4 px-2 text-info"></i>}
              >
                <div onClick={()=>{Navigate("/cuisineType",{state:{type:"chinese"}})}}>
             Chinese</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="supreme_support"
                showFullDescription
                css={{
                  color:"purple"
                }}
                description="Experience the irresistible flavors of Italy with this authentic recipe that will transport your taste buds to the heart of Tuscany."
               icon={<i className="fa-solid fa-euro-sign fs-4 px-2" style={{color:"purple"}}></i>}
              >
                <div onClick={()=>{Navigate("/cuisineType",{state:{type:"italian"}})}}>
               Italian</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="japnese"
                showFullDescription
                css={{
                  color:"brown"
                }}
                description="Indulge in the artful simplicity of Japanese cuisine with this mouthwatering recipe , bringing the essence of Japan to your plate"
               icon={<i className="fa-solid fa-yen-sign fs-4 px-2" style={{color:"brown"}}></i>}
              >
                <div onClick={()=>{Navigate("/cuisineType",{state:{type:"japnese"}})}}>
           Japnese</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="maxian"
                showFullDescription
                css={{
                  color:"#00695c"
                }}
                description="Spice up your taste buds with the vibrant and bold flavors of Mexico in this authentic recipe"
               icon={<i className="fa-solid fa-peso-sign fs-4 px-2" style={{color:"#00695c"}}></i>}
              >
                <div onClick={()=>{Navigate("/cuisineType",{state:{type:"mexican"}})}}>
             Mexican</div>
              </Dropdown.Item>
              <Dropdown.Item
                key="french"
                showFullDescription
                css={{
                  color:"#212121"
                }}
                description="Experience the indulgent flavors of France with this exquisite recipe that pays homage to the country's culinary mastery"
               icon={<i className="fa-solid fa-euro-sign fs-4 px-2" style={{color:"#212121"}}></i>}
              >
                <div onClick={()=>{Navigate("/cuisineType",{state:{type:"french"}})}}>
              French</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      
       
       













        
           <form className="d-flex text-white ">
        <input className="form-control me-2 text-white  rounded-3" id="searchbar-searchbox" type="search" placeholder="Search"   onClick={()=>{setsearchmodal(true)}} onChange={(e)=>{
          searchentered=e.target.value
          setName_to_search(searchentered)
      
        }}  />
        
      
      </form>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="primary"
                  size="md"
                  src={(sessionStorage.getItem('auth-token') || localStorage.getItem("auth-token")?(userData?.user?.Profile_Image):"https://i.pravatar.cc/150?u=a042581f4e29026024d")}
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            {sessionStorage.getItem("auth-token") || localStorage.getItem("auth-token")?
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                 {userData?.user?.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
             
              <div onClick={()=>{Navigate("/Profile_Profile")}}>
              <p className=" pt-3 text-dark searchbardropdown w-100">Profile</p></div>
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">
              <div onClick={()=>{Navigate("/Profile_Activity")}}>
              <p className=" pt-3 text-dark searchbardropdown w-100">Activity</p></div>
              </Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
             
                 <div onClick={()=>{Navigate("/Profile_Security")}}>
              <p className=" pt-3 text-dark searchbardropdown w-100">Security</p></div>
              </Dropdown.Item>
              <Dropdown.Item key="system">
              <div onClick={()=>{Navigate("/Profile_Recipe")}}>
              <p className=" pt-3 text-dark searchbardropdown w-100">My Recipes</p></div>
              </Dropdown.Item>
              <Dropdown.Item key="configurations">
               
                <div onClick={()=>{Navigate("/Profile_LikedRecipe")}}>
              <p className=" pt-3 text-dark searchbardropdown w-100">Favourite Recipes</p></div>
                </Dropdown.Item>
            
              <Dropdown.Item key="logout" withDivider color="error">
               <span onClick={logout}>Log Out</span> 
              </Dropdown.Item>
            </Dropdown.Menu>: <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              
              <Dropdown.Item key="settings" >
                <div onClick={()=>{Navigate("/login")}}>
              <p className="px-4 pt-3 text-dark searchbardropdown w-100"> Login</p></div>
             
              </Dropdown.Item>
              
              <Dropdown.Item key="analytics" >
              <div onClick={()=>{Navigate("/signUp")}}>
              <p className="px-4 pt-2 text-dark searchbardropdown w-100"> Sign Up</p></div>
              </Dropdown.Item>
             
       
              
            </Dropdown.Menu>}
            
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>

          {/* //for home */}
          
  
         
            
           <Collapse.Group   divider={false}>
           <Collapse  title="Home"  style={{cursor:"pointer"}} onClick={()=>{Navigate(`/home`)}}  >
           <Navbar.CollapseItem key="home">
           <div className="">
         Home
           </div></Navbar.CollapseItem>
     
          </Collapse>
          <Collapse  title="Meal Type" >
          {collapsemealItems.map((item) => (
          <Navbar.CollapseItem key={item.name}>
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate(item.path,{state:{type:item.type}})}}>
           {item.name}
           </div>
            
       
          </Navbar.CollapseItem>
        ))}
          </Collapse>
          <Collapse title="Dish Type" >
          {collapsedishItems.map((item) => (
          <Navbar.CollapseItem key={item.name}>
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate(item.path,{state:{type:item.type}})}}>
           {item.name}
           </div>
            
       
          </Navbar.CollapseItem>
        ))}
          </Collapse>
          <Collapse title="Diet Type">
          {collapsedietItems.map((item) => (
          <Navbar.CollapseItem key={item.name}>
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate(item.path,{state:{type:item.type}})}}>
           {item.name}
           </div>
            
       
          </Navbar.CollapseItem>
        ))}
          </Collapse>
          <Collapse title="Health">
          {collapsehealthItems.map((item) => (
          <Navbar.CollapseItem key={item.name}>
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate(item.path,{state:{type:item.type}})}}>
           {item.name}
           </div>
            
       
          </Navbar.CollapseItem>
        ))}
          </Collapse>
          <Collapse title="Cuisine Type">
            {collapsecuisineItems.map((item) => (
          <Navbar.CollapseItem key={item.name}>
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate(item.path,{state:{type:item.type}})}}>
           {item.name}
           </div>
            
       
          </Navbar.CollapseItem>
        ))}
          </Collapse>
        </Collapse.Group>
         

       
      </Navbar.Collapse>
      </Navbar>
     


{/* new modal for searching the recipe*/}

<Modal
        closeButton
        aria-labelledby="modal-title"
        // open={visible}
        open={searchmodal}
       scroll
       width="600px"
        onClose={()=>{setsearchmodal(false)}}
      >
        <Modal.Header>
          <Text b id="modal-title" size={18}>
         Enter Some Keywords 
            
          </Text>
        </Modal.Header>
        <Modal.Body className="searchmodal">
        <div className="input-group input-group-lg transformingup mb-3">

  <input type="text" className="form-control modalsearch fw-bold" id="button-addon1x" placeholder="Enter the Recipe Name" aria-label="Example text with button addon" onChange={(e)=>{NameRecipe(`/${e.target.value}`)}} aria-describedby="button-addon1"/> 
  <button className="btn btn-outline-secondary bg-white" type="button" id="button-addon1y" onClick={(e)=>{NameRecipe(`/${document.getElementById('button-addon1x')?.value}`)}}><i className="fa-solid fs-4 fa-magnifying-glass"></i></button>
</div>
<div>
{namerecipeloading && <Loader></Loader>}
{!searchRecipe?<div className="card box_decrease_size_animation_for_recipeitem">
            <div className="card-body py-5 px-md-5 ">
             <img src="https://media.tenor.com/unvXyxtdn3oAAAAC/no-result.gif" alt="result not found" className=''/>
            </div>
          </div>:<ul   className="searchlistbox" id="docsearch-list"> <div className="listcombo">
 

{!namerecipeloading && searchRecipe.recipe && searchRecipe.recipe.map((element)=>{
   
 
    return <>
    <div  onClick={()=>{ setsearchmodal(false); Navigate('/SearchResult',{state:{search_result_reicpe:element.label.substring(0,20)}});      }} className="DocSearch-Hitslink  transformingup"><li className="DocSearch-Hits  fw-bold"> <i className="fa-solid me-2 fa-bars"></i>{element.label}</li></div>

    </>}
   )
   }
   
   </div></ul>}</div>
         
        </Modal.Body>
        
      </Modal>
    </>



  );
}
