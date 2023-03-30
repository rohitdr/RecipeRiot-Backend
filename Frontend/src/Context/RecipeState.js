
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import RecipeContext from "./RecipeContext";
export default function RecipeState(props) {
  
  const [LikedRecipe, setLikedRecipe] = useState([]);

  const [recipe, setRecipe] = useState({});
  const [Latest_recipe, setLatest_Recipe] = useState({});
  const [Latest_recipebyid, setLatest_Recipebyid] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [Ingrediant_statepage] = useState([]);
  const [name_to_search, setName_to_search] = useState("");
  const [searchRecipe, setsearchedRecipe] = useState({});
  const [alert, setAlert] = useState(null);
  const [CurrentRecipeItem, setCurrentRecipeItem] = useState({});
  const [CurrentRecipeItemid, setCurrentRecipeItemid] = useState("");
  const [progress, setProgress] = useState(0);
  const [progressheight, setProgressHeight] = useState(2);
  const [signuppage, setsignuppage] = useState(0);
  const [userbyid, setuserbyid] = useState({});
  const [cuisinedata, setcuisinedata] = useState({});
  const [cuisineloading, setcuisineloading] = useState(false);
  const [healthdata, sethealthdata] = useState({});
  const [healthloading, sethealthloading] = useState(false);
  const [mealdata, setmealdata] = useState({});
  const [dishdata, setdishdata] = useState({});
  const [dietdata, setdietdata] = useState({});
  const [namerecipeloading, setnamereicpeloading] = useState(false);
  const [AdminAllUser,setAdminAllUser]=useState({})
  const [AdminAllUserByDate,setAdminAllUserByDate]=useState({})
const [AdminAllRecipe,setAdminAllRecipe]=useState({})
const [AdminAllRecipeByDate,setAdminAllRecipeByDate]=useState({})
const [AllContactMessages, setAllContactMessages]=useState({})
const [contactsendmessage,setcontactsendmessage]=useState({})
const [deletemessageresult,setdeletemessageresult]=useState({})
const [deleteaccount ,setdeleteaccount]=useState({})
const [deleteaccountAdmin,setdeleteaccountAdmin]=useState({})
const [staticalData,setstaticalData]=useState({})

let Navigate = useNavigate();
//api for deleting account by admin
const Admingetallstaticaldata=async()=>{
  try {
    setProgress(30);
    const response = await fetch(
      `${process.env.REACT_APP_Fetch_Api_Start}/auth/staticalData`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token")
            ? sessionStorage.getItem("auth-token")
            : localStorage.getItem("auth-token")

        
        }
      
      

      }
    );
    setProgress(60);
    let result = await response.json();
    if(response.status==404){
      setProgress(100)
      setLoading(false)
      showAlert(result.error,"danger")
    }
     else if(response.status==200) {
    
      setProgress(70);
     
 setstaticalData(result)
      setProgress(100);
    }
    else {
      setProgress(100);
      setLoading(false);
      setstaticalData(500)
    
    }
  } catch (error) {
    setProgress(100);
    setstaticalData(500)
    setLoading(false);
    console.log(error.message);
  }
}
//api for deleting account by admin
const deleteAccountAdmin=async(id)=>{
  try {
    setProgress(30);
    const response = await fetch(
      `${process.env.REACT_APP_Fetch_Api_Start}/auth/AdminDeleteAccount`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token")
            ? sessionStorage.getItem("auth-token")
            : localStorage.getItem("auth-token")

        
        },
        body: JSON.stringify({id:id})
      

      }
    );
    setProgress(60);
    let result = await response.json();
   if( response.status==404){
    setProgress(100);
    setLoading(false);
   showAlert(result.error,"danger")
   }
     else if(response.status == 200) {
    
      setProgress(70);
      AdminGetAllUserByDate();
    showAlert(result,"success")
      setProgress(100);
    }
    else {
      setProgress(100);
      setLoading(false);
      setdeleteaccountAdmin(500)
    
    }
  } catch (error) {
    setProgress(100);
    setdeleteaccountAdmin(500)
    setLoading(false);
    console.log(error.message);
  }
}
//api for deleting account by user its own
const deleteAccount=async(id)=>{
  try {
    setProgress(30);
    const response = await fetch(
      `${process.env.REACT_APP_Fetch_Api_Start}/auth/deleteAccount`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token")
            ? sessionStorage.getItem("auth-token")
            : localStorage.getItem("auth-token")

        
        },
        body: JSON.stringify({id:id})
      

      }
    );
    setProgress(60);
    let result = await response.json();
    if(response.status==404){
      setLoading(false);
      showAlert(result.error,"danger")
      setProgress(100);
    }
     else if(response.status==200) {
    
      setProgress(70);
    
      localStorage.removeItem("auth-token")
      sessionStorage.removeItem("auth-token")
      Navigate("/login")
    showAlert(result,"success")
      setProgress(100);
    }
    else {
      setProgress(100);
      setLoading(false);
      setdeleteaccount(500)
    
    }
  } catch (error) {
    setProgress(100);
    setdeleteaccount(500)
    setLoading(false);
    console.log(error.message);
  }
}
//api for logout
const logoutUser=async()=>{
  try {
    setProgress(30);
    const response = await fetch(
      `${process.env.REACT_APP_Fetch_Api_Start}/auth/logout`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token")
            ? sessionStorage.getItem("auth-token")
            : localStorage.getItem("auth-token")
        
        }
    

      }
    );
    setProgress(60);
    let result = await response.json();
    if(response.status==404){
      setProgress(100);
      showAlert(result.error,"danger")
      setLoading(false);
    }
   else if(response.status==200) {

      setProgress(70);
      Navigate("/login")

    showAlert("You Are Successfully Logged Out ","success")
      setProgress(100);
    }
    else {
      setProgress(100);
      showAlert("Their is Problem in our Server, Try again","danger")
      setLoading(false);
    
    } 
  } catch (error) {
    setProgress(100);
    showAlert("Their is Problem in our Server, Try again","danger")
    setLoading(false);
    console.log(error.message);
  }
}
//api for deleting the message 
const deletemessage=async(id)=>{
  try {
    setProgress(30);
    const response = await fetch(
      `${process.env.REACT_APP_Fetch_Api_Start}/contact/delete/${id}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token")
            ? sessionStorage.getItem("auth-token")
            : localStorage.getItem("auth-token")
        
        }
    

      }
    );
    setProgress(60);
    let result = await response.json();
    if(response.status==404){
setProgress(100)
showAlert(result.error,"danger")
setLoading(false);
    }
     else if(response.status==200) {
    
      setProgress(70);
    GetAllcontactMessages()
    showAlert("This Message is Successfully Deleted","success")
      setProgress(100);
    }
    else {
      setProgress(100);
      setLoading(false);
      setdeletemessageresult(500)
    }
  } catch (error) {
    setProgress(100);
    setdeletemessageresult(500)
    setLoading(false);
    console.log(error.message);
  }
}
//api for contact us form
const ContactusSubmitApi = async (message) => {
  try {
    setProgress(30);
    const response = await fetch(
      `${process.env.REACT_APP_Fetch_Api_Start}/contact/Message`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        
        },
        body: JSON.stringify(message),

      }
    );
    setProgress(60);
    let result = await response.json();
    if(response.status==404){
      setProgress(100);
      setLoading(false);
      showAlert(result.error,"danger")
    }
     else if(response.status==200) {
      
      setProgress(70);
    showAlert("We Will contact You Soon","success")
      setProgress(100);
    }
    else {
      setProgress(100);
      setLoading(false);
      setcontactsendmessage(500)
    }
  } catch (error) {
    setProgress(100);
    setcontactsendmessage(500)
    setLoading(false);
    console.log(error.message);
  }
};
//api to get all Messages for admin
const GetAllcontactMessages = async () => {
  try {
    setProgress(30);
    const response = await fetch(
      `${process.env.REACT_APP_Fetch_Api_Start}/Contact/GetAllMessages`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        
        },
      }
    );
    setProgress(60);
    let result = await response.json();
    if(response.status==404){
      setAllContactMessages(false)
      setProgress(100);
    }
  else if(response.status==200) {
    
      setProgress(70);
      setAllContactMessages(result)
      setProgress(100);
    }
    else {
      setProgress(100);
      setLoading(false);
     setAllContactMessages(500)
    } 
  } catch (error) {
    setProgress(100);
    setAllContactMessages(500)
    setLoading(false);
    console.log(error.message);
  }
};
 //api to get all user details for admin
 const AdminGetAllUserByDate = async () => {
  try {
    setProgress(30);
    const response = await fetch(
      `${process.env.REACT_APP_Fetch_Api_Start}/auth/AdminGetAllUserByDate`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token")
            ? sessionStorage.getItem("auth-token")
            : localStorage.getItem("auth-token"),
        },
      }
    );
    setProgress(60);
    if (response.status == 500) {
      setProgress(100);
      setLoading(false);
      setAdminAllUserByDate(500)
    } else {
      let result = await response.json();
      setProgress(70);
   setAdminAllUserByDate(result)
      setProgress(100);
    }
  } catch (error) {
    setProgress(100);
  setAdminAllUserByDate(500)
    setLoading(false);
    console.log(error.message);
  }
};
//api to get all Recipes for admin
const AdminGetAllRecipeByDate = async () => {
  try {
    setProgress(30);
    const response = await fetch(
      `${process.env.REACT_APP_Fetch_Api_Start}/Recipe/AdminGetAllRecipesByDate`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token")
            ? sessionStorage.getItem("auth-token")
            : localStorage.getItem("auth-token"),
        },
      }
    );
    setProgress(60);
    if (response.status == 500) {
      setProgress(100);
      setLoading(false);
     setAdminAllRecipeByDate(500)
    } else {
      let result = await response.json();
      setProgress(70);
      setAdminAllRecipeByDate(result)
      setProgress(100);
    }
  } catch (error) {
    setProgress(100);
    setAdminAllRecipeByDate(500)
    setLoading(false);
    console.log(error.message);
  }
};
//api to get all Recipes for admin
const AdminGetAllRecipe = async () => {
  try {
    setProgress(30);
    const response = await fetch(
      `${process.env.REACT_APP_Fetch_Api_Start}/Recipe/AdminGetAllRecipes`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": sessionStorage.getItem("auth-token")
            ? sessionStorage.getItem("auth-token")
            : localStorage.getItem("auth-token"),
        },
      }
    );
    setProgress(60);
    if (response.status == 500) {
      setProgress(100);
      setLoading(false);
     setAdminAllRecipe(500)
    } else {
      let result = await response.json();
      setProgress(70);
      setAdminAllRecipe(result)
      setProgress(100);
    }
  } catch (error) {
    setProgress(100);
    setAdminAllRecipe(500)
    setLoading(false);
    console.log(error.message);
  }
};
  //api to get all user details for admin
  const AdminGetAllUser = async () => {
    try {
      setProgress(30);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/auth/AdminGetAllUser`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("auth-token")
              ? sessionStorage.getItem("auth-token")
              : localStorage.getItem("auth-token"),
          },
        }
      );
      setProgress(60);
      if (response.status == 500) {
        setProgress(100);
        setLoading(false);
        setAdminAllUser(500)
      } else {
        let result = await response.json();
        setProgress(70);
     setAdminAllUser(result)
        setProgress(100);
      }
    } catch (error) {
      setProgress(100);
    setAdminAllUser(500)
      setLoading(false);
      console.log(error.message);
    }
  };
  //api to get recipe who has a particular mealtype
  const diettype = async (type) => {
    try {
      setProgress(30);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/allRecipeswithdietLabels/${type}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProgress(60);
      if (response.status == 500) {
        setProgress(100);
        setLoading(false);
        setdietdata(500);
      } else {
        let result = await response.json();
        setProgress(70);
        setdietdata(result);
        setProgress(100);
      }
    } catch (error) {
      setProgress(100);
      setdietdata(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api to get recipe who has a particular mealtype
  const dishtype = async (type) => {
    try {
      setProgress(30);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/allRecipeswithdishtype/${type}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProgress(50);
      let result = await response.json();
      setProgress(70);
      setdishdata(result);
      setProgress(100);
    } catch (error) {
      setProgress(100);
      setLoading(false);
      setdishdata(500);
      console.log(error.message);
    }
  };
  //api to get recipe who has a particular mealtype
  const mealtype = async (type) => {
    try {
      setProgress(30);
      const response = await fetch(
        `${
          type == "lunch/dinner"
            ? `${process.env.REACT_APP_Fetch_Api_Start}/recipe/allRecipeswithmealtypelunchdinner`
            : `${process.env.REACT_APP_Fetch_Api_Start}/recipe/allRecipeswithmealtype/${type}`
        }`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProgress(50);
      let result = await response.json();
      setProgress(70);
      setmealdata(result);
      setProgress(100);
    } catch (error) {
      setProgress(100);
      setLoading(false);
      setmealdata(500);
      console.log(error.message);
    }
  };
  //api to get recipe who has a particular healthlabel
  const health = async (type) => {
    try {
      sethealthloading(true);
      setProgress(30);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/allRecipeswithhealthlabels/${type}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProgress(50);
      let result = await response.json();
      setProgress(70);
      sethealthdata(result);
      setProgress(100);
      sethealthloading(false);
    } catch (error) {
      setProgress(100);
      setLoading(false);
      sethealthdata(500);
      console.log(error.message);
    }
  };
  //api to get recipe according to cuisine type
  const cuisine = async (type) => {
    try {
      setProgress(30);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/allRecipeswithcuisinetype/${type}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 404) {
        showAlert(response.error, "danger");
        setProgress(100);
      } else {
        setProgress(50);
        let result = await response.json();
        setProgress(70);
        setcuisinedata(result);
        setProgress(100);
      }
    } catch (error) {
      setProgress(100);
      setLoading(false);
      setcuisinedata(500);
      console.log(error.message);
    }
  };
  ////api to get user detail by giving id
  const getUserbyid = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/auth/getUserbyid`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      );

      let userDetail = await response.json();
      setuserbyid(userDetail);
      setLoading(false);
    } catch (error) {
      setProgress(100);
      setLoading(false);
      setuserbyid(500);
      console.log(error.message);
    }
  };

  ///api to search recipe by id
  const RecipeBYId = async (id) => {
    try {
      setLoading(true);
      setProgress(30);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/recipebyid/${id}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("auth-token")
              ? sessionStorage.getItem("auth-token")
              : localStorage.getItem("auth-token"),
          },
        }
      );
      setProgress(60);
      let current = await response.json();

      setCurrentRecipeItem(current);
      setProgress(100);
    } catch (error) {
      setProgress(100);
      setLoading(false);
      setCurrentRecipeItem(500);
      console.log(error.message);
    }
  };
  const AllLikedRecipe = async () => {
    try {
      setProgress(30);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/allLikedRecipe`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            // 'auth-token':sessionStorage.getItem("auth-token")
            "auth-token": sessionStorage.getItem("auth-token")
              ? sessionStorage.getItem("auth-token")
              : localStorage.getItem("auth-token"),
          },
        }
      );
      setProgress(50);
      if (response.status == 404) {
        setLikedRecipe(false);
        setLoading(false);
        setProgress(100);
      } else {
        let Liked = await response.json();
        setLikedRecipe(Liked);
        setLoading(false);
        setProgress(100);
      }
    } catch (e) {
      setProgress(100);
      setLoading(false);
      setLikedRecipe(500);
      console.log(e.message);
    }
  };

  //api to get user details
  const getUser = async () => {
    try {
      if (
        sessionStorage.getItem("auth-token") ||
        localStorage.getItem("auth-token")
      ) {
        const response = await fetch(`${process.env.REACT_APP_Fetch_Api_Start}/auth/getUser`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            // 'auth-token':sessionStorage.getItem("auth-token")
            "auth-token": sessionStorage.getItem("auth-token")
              ? sessionStorage.getItem("auth-token")
              : localStorage.getItem("auth-token"),
          },
        });

        let userDetail = await response.json();

        setUserData(userDetail);
      }
    } catch (e) {
      setProgress(100);
      setLoading(false);
      setUserData(500);
      console.log(e.message);
    }
  };

  //api to unlike a recipe
  const UnLikeRecipe = async (recipeid) => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_Fetch_Api_Start}/recipe/unlike`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          // 'auth-token':sessionStorage.getItem("auth-token")
          "auth-token": sessionStorage.getItem("auth-token")
            ? sessionStorage.getItem("auth-token")
            : localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          id: recipeid,
        }),
      });

      setLoading(false);
    } catch (error) {
      setProgress(100);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api to like a recipe
  const LikeRecipe = async (recipeid) => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.REACT_APP_Fetch_Api_Start}/recipe/like`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          // 'auth-token':sessionStorage.getItem("auth-token")
          "auth-token": sessionStorage.getItem("auth-token")
            ? sessionStorage.getItem("auth-token")
            : localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          id: recipeid,
        }),
      });

      setLoading(false);
    } catch (error) {
      setProgress(100);
      setLoading(false);
      console.log(error.message);
    }
  };
  //to show alert on top
  const showAlert = (msg, type) => {
    setAlert(
      {
        message: msg,
        type: type,
      },
      setTimeout(() => {
        setAlert(null);
      }, 3000)
    );
  };
  //api for recipe search
  const NameRecipe = async (recipename) => {
    try {
      setnamereicpeloading(true);

      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/allRecipeswith${recipename}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            // 'auth-token':sessionStorage.getItem("auth-token")
            "auth-token": sessionStorage.getItem("auth-token")
              ? sessionStorage.getItem("auth-token")
              : localStorage.getItem("auth-token"),
          },
        }
      );

      if (response.status !== 404) {
        let Name_recipe = await response.json();
        setnamereicpeloading(false);

        setsearchedRecipe(Name_recipe);
      } else {
        setsearchedRecipe(false);
        setnamereicpeloading(false);
      }
    } catch (error) {
      setsearchedRecipe(500);
      setProgress(100);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api for latest recipes
  const LatesRecipe = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/LatestRecipes`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let Latest_recipe = await response.json();

      setLatest_Recipe(Latest_recipe);

      setLoading(false);
    } catch (error) {
      setLatest_Recipe(500);
      setProgress(100);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api for latest recipe of a parrticular user
  const LatestRecipebyid = async () => {
    try {
      setProgress(30);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/LatestRecipesbyid`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            // 'auth-token':sessionStorage.getItem("auth-token")
            "auth-token": sessionStorage.getItem("auth-token")
              ? sessionStorage.getItem("auth-token")
              : localStorage.getItem("auth-token"),
          },
        }
      );
      setProgress(50);

      if (response.status == 404) {
        setProgress(100);
        setLatest_Recipebyid(false);
        setLoading(false);
      } else {
        setProgress(100);
        let Latest_recipebyid = await response.json();

        setLatest_Recipebyid(Latest_recipebyid);

        setLoading(false);
      }
    } catch (error) {
      setProgress(100);
      setLoading(false);
      setLatest_Recipebyid(500);
      console.log(error.message);
    }
  };
  // api for all recipes related to a user
  const allRecipe = async () => {
    try {
      setProgress(30);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/allRecipes`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            // 'auth-token':sessionStorage.getItem("auth-token")
            "auth-token": sessionStorage.getItem("auth-token")
              ? sessionStorage.getItem("auth-token")
              : localStorage.getItem("auth-token"),
          },
        }
      );

      setProgress(60);

      if (response.status == 404) {
        setProgress(100);
        setRecipe(false);
        setLoading(false);
      } else if (response.status == 500) {
        setProgress(100);
        setRecipe(500);
        setLoading(false);
      } else {
        setProgress(100);
        let allrecipe = await response.json();
        setRecipe(allrecipe);

        setLoading(false);
      }
    } catch (e) {
      setProgress(100);
      setLoading(false);
      setRecipe(500);
      console.log(e.message);
    }
  };
  // api for delete a recipe
  const deleteRecipe = async (id,file) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/deleteRecipe/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            // 'auth-token':sessionStorage.getItem("auth-token")
            "auth-token": sessionStorage.getItem("auth-token")
              ? sessionStorage.getItem("auth-token")
              : localStorage.getItem("auth-token"),
          },
        }
      );
      showAlert("Recipe is Successfully deleted. It will be updated Soon","success")
if(file=="Admindelete"){  AdminGetAllRecipeByDate()}
      const json = await response.json();
      const newRecipe = recipe.filter((element) => {
        return element._id !== id;
      });
      setRecipe(newRecipe);
      allRecipe()
      setLoading(false);
    } catch (error) {
      setRecipe(500);
      setProgress(100);
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <RecipeContext.Provider
      value={{
        namerecipeloading,
        diettype,
        dietdata,
        dishdata,
        dishtype,
        mealtype,
        mealdata,
        health,
        healthdata,
        cuisineloading,
        cuisinedata,
        cuisine,
        getUserbyid,
        userbyid,
        LatestRecipebyid,
        Latest_recipebyid,
        signuppage,
        setsignuppage,
        showAlert,
        setProgressHeight,
        progressheight,
        progress,
        setProgress,
        RecipeBYId,
        CurrentRecipeItemid,
        setCurrentRecipeItemid,
        CurrentRecipeItem,
        setCurrentRecipeItem,
        AllLikedRecipe,
        LikedRecipe,
        setLikedRecipe,
        LikeRecipe,
        UnLikeRecipe,
        userData,
        getUser,
        recipe,
        alert,
        setAlert,
        allRecipe,
        deleteRecipe,
        setLoading,
        loading,
        Ingrediant_statepage,
        LatesRecipe,
        Latest_recipe,
        NameRecipe,
        name_to_search,
        setName_to_search,
        searchRecipe,
        setsearchedRecipe,
        AdminAllUser,
        AdminGetAllUser,
        AdminGetAllRecipe,
        AdminAllRecipe,
        AdminAllRecipeByDate,
        AdminGetAllRecipeByDate,
        AdminAllUserByDate,
        AdminGetAllUserByDate,
        GetAllcontactMessages,
        AllContactMessages,
        contactsendmessage,
        ContactusSubmitApi,
        deletemessage,
        logoutUser,
        deleteAccount,
        deleteaccount,
     deleteaccountAdmin,
        deleteAccountAdmin,
        Admingetallstaticaldata,
        staticalData

      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
}
