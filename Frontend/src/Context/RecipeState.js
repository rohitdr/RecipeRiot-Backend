import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import RecipeContext from "./RecipeContext";
export default function RecipeState(props) {
  /* Setting the state of the component. */
  const [LikedRecipe, setLikedRecipe] = useState([]);
const [latestrecipeloading,setlatestrecipeloading]=useState(false)
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
  const [AdminAllUser, setAdminAllUser] = useState({});
  const [AdminAllUserByDate, setAdminAllUserByDate] = useState({});
  const [AdminAllRecipe, setAdminAllRecipe] = useState({});
  const [AdminAllRecipeByDate, setAdminAllRecipeByDate] = useState({});
  const [AllContactMessages, setAllContactMessages] = useState({});
  const [contactsendmessage, setcontactsendmessage] = useState({});
  const [deletemessageresult, setdeletemessageresult] = useState({});
  const [deleteaccount, setdeleteaccount] = useState({});
  const [deleteaccountAdmin, setdeleteaccountAdmin] = useState({});
  const [staticalData, setstaticalData] = useState({});

  /* Creating a variable called Navigate and assigning it the useNavigate hook. */
  let Navigate = useNavigate();
  //api for deleting account by admin
  /**
   * It fetches data from the server and sets the data to the state.
   */
  const Admingetallstaticaldata = async () => {
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
              : localStorage.getItem("auth-token"),
          },
        }
      );
      setProgress(60);
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        setLoading(false);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);

        setstaticalData(result);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setstaticalData(500);
      }
    } catch (error) {
      setProgress(100);
      setstaticalData(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api for deleting account by admin
  /**
   * It deletes an account from the database.
   * @param id - id of the user to be deleted
   */
  const deleteAccountAdmin = async (id) => {
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
              : localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ id: id }),
        }
      );
      setProgress(60);
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        setLoading(false);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);
        AdminGetAllUserByDate();
        showAlert(result, "success");
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setdeleteaccountAdmin(500);
      }
    } catch (error) {
      setProgress(100);
      setdeleteaccountAdmin(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api for deleting account by user its own
  /**
   * It deletes the user's account from the database.
   * @param id - the id of the user
   */
  const deleteAccount = async (id) => {
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
              : localStorage.getItem("auth-token"),
          },
          body: JSON.stringify({ id: id }),
        }
      );
      setProgress(60);
      let result = await response.json();
      if (response.status == 404) {
        setLoading(false);
        showAlert(result.error, "danger");
        setProgress(100);
      } else if (response.status == 200) {
        setProgress(70);

        localStorage.removeItem("auth-token");
        sessionStorage.removeItem("auth-token");
        Navigate("/login");
        showAlert(result, "success");
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setdeleteaccount(500);
      }
    } catch (error) {
      setProgress(100);
      setdeleteaccount(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api for logout
  /**
   * It's a function that sends a POST request to the server, and then logs the user out.
   */
  const logoutUser = async () => {
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
              : localStorage.getItem("auth-token"),
          },
        }
      );
      setProgress(60);
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
        setLoading(false);
      } else if (response.status == 200) {
        setProgress(70);
        Navigate("/login");

        showAlert("You Are Successfully Logged Out ", "success");
        setProgress(100);
      } else {
        setProgress(100);
        showAlert("Their is Problem in our Server, Try again", "danger");
        setLoading(false);
      }
    } catch (error) {
      setProgress(100);
      showAlert("Their is Problem in our Server, Try again", "danger");
      setLoading(false);
      console.log(error.message);
    }
  };
  //api for deleting the message
  /**
   * It deletes a message from the database.
   * </code>
   * @param id - the id of the message to be deleted
   */
  const deletemessage = async (id) => {
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
              : localStorage.getItem("auth-token"),
          },
        }
      );
      setProgress(60);
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
        setLoading(false);
      } else if (response.status == 200) {
        setProgress(70);
        GetAllcontactMessages();
        showAlert("This Message is Successfully Deleted", "success");
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setdeletemessageresult(500);
      }
    } catch (error) {
      setProgress(100);
      setdeletemessageresult(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api for contact us form
  /**
   * It sends a POST request to the server with the message object, and if the response is 200, it sets
   * the progress to 70, and if the response is 404, it sets the progress to 100.
   * @param message - {
   */
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
      if (response.status == 404) {
        setProgress(100);
        setLoading(false);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);
        showAlert("We Will contact You Soon", "success");
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setcontactsendmessage(500);
      }
    } catch (error) {
      setProgress(100);
      setcontactsendmessage(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api to get all Messages for admin
  /**
   * It fetches all the messages from the database and sets the state of the messages to the result
   */
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
      if (response.status == 404) {
        setAllContactMessages(false);
        setProgress(100);
      } else if (response.status == 200) {
        setProgress(70);
        setAllContactMessages(result);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setAllContactMessages(500);
      }
    } catch (error) {
      setProgress(100);
      setAllContactMessages(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api to get all user details for admin
  /**
   * It fetches data from the server and sets the data to the state.
   */
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
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);
        setAdminAllUserByDate(result);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setAdminAllUserByDate(500);
      }
    } catch (error) {
      setProgress(100);
      setAdminAllUserByDate(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api to get all Recipes for admin
  /**
   * It fetches all recipes from the database and displays them in a table.
   * </code>
   */
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
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);
        setAdminAllRecipeByDate(result);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setAdminAllRecipeByDate(500);
      }
    } catch (error) {
      setProgress(100);
      setAdminAllRecipeByDate(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api to get all Recipes for admin
  /**
   * It fetches all the recipes from the database and sets the state of the recipes to the fetched
   * recipes.
   * </code>
   */
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
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);
        setAdminAllRecipe(result);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setAdminAllRecipe(500);
      }
    } catch (error) {
      setProgress(100);
      setAdminAllRecipe(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api to get all user details for admin
  /**
   * It fetches data from the server and sets the data to the state.
   */
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
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);
        setAdminAllUser(result);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setAdminAllUser(500);
      }
    } catch (error) {
      setProgress(100);
      setAdminAllUser(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api to get recipe who has a particular mealtype
  /**
   * It fetches data from an API and sets the data to a state.
   * @param type - the type of diet you want to search for
   */
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
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);
        setdietdata(result);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setdietdata(500);
      }
    } catch (error) {
      setProgress(100);
      setdietdata(500);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api to get recipe who has a particular mealtype
  /**
   * It fetches data from an API and sets the data to a state.
   * @param type - The type of dish you want to search for.
   */
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
      if (response.status == 404) {
        setProgress(100);

        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);
        setdishdata(result);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setdishdata(500);
      }
    } catch (error) {
      setProgress(100);
      setLoading(false);
      setdishdata(500);
      console.log(error.message);
    }
  };
  //api to get recipe who has a particular mealtype
  /**
   * It fetches data from an API and sets the data to a state.
   * @param type - the type of meal you want to fetch
   */
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
      setProgress(60);
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);
        setmealdata(result);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setmealdata(500);
      }
    } catch (error) {
      setProgress(100);
      setLoading(false);
      setmealdata(500);
      console.log(error.message);
    }
  };
  //api to get recipe who has a particular healthlabel
  /**
   * It fetches data from an API and sets the data to a state.
   * </code>
   * @param type - the type of health label
   */
  const health = async (type) => {
    try {
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
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);
        sethealthdata(result);
        setProgress(100);
      } else {
        setProgress(100);

        sethealthdata(500);
      }
    } catch (error) {
      setProgress(100);

      sethealthdata(500);
      console.log(error.message);
    }
  };
  //api to get recipe according to cuisine type
  /**
   * It fetches data from an API and sets the data to a state.
   * @param type - The type of cuisine you want to search for.
   */
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
      setProgress(50);
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setProgress(70);
        setcuisinedata(result);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setcuisinedata(500);
      }
    } catch (error) {
      setProgress(100);
      setLoading(false);
      setcuisinedata(500);
      console.log(error.message);
    }
  };
  ////api to get user detail by giving id
  /**
   * I'm trying to fetch data from the server and if the response is 200, I'm setting the state to the
   * response data, else I'm setting the state to 500.
   * @param id - id,
   */
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
      if (response.status == 200) {
        setuserbyid(userDetail);
        setLoading(false);
      } else {
       
        setLoading(false);
        setuserbyid(500);
      }
    } catch (error) {
     
      setLoading(false);
      setuserbyid(500);
      console.log(error.message);
    }
  };

  ///api to search recipe by id
  /**
   * It fetches a recipe by id from the server and sets the state of the recipe item to the fetched
   * recipe.
   * </code>
   * @param id - the id of the recipe
   */
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
      if (response.status == 404) {
        setProgress(100);
        showAlert(current.error, "danger");
      } else if (response.status == 200) {
        setCurrentRecipeItem(current);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setCurrentRecipeItem(500);
      }
    } catch (error) {
      setProgress(100);
      setLoading(false);
      setCurrentRecipeItem(500);
      console.log(error.message);
    }
  };

  /**
   * It fetches all the liked recipes from the database and sets the state of the component.
   */
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
      let Liked = await response.json();
      if (response.status == 404) {
        setLikedRecipe(false);
        setLoading(false);
        setProgress(100);
      } else if (response.status == 200) {
        setLikedRecipe(Liked);
        setLoading(false);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setLikedRecipe(500);
      }
    } catch (e) {
      setProgress(100);
      setLoading(false);
      setLikedRecipe(500);
      console.log(e.message);
    }
  };

  //api to get user details
  /**
   * It fetches the user data from the server and sets the user data in the state.
   */
  const getUser = async () => {
    try {
      if (
        sessionStorage.getItem("auth-token") ||
        localStorage.getItem("auth-token")
      ) {
        const response = await fetch(
          `${process.env.REACT_APP_Fetch_Api_Start}/auth/getUser`,
          {
            method: "POST",
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
        let userDetail = await response.json();
        if (response.status == 200) {
         
       
          setLoading(false);
          setUserData(userDetail);
        } else {
        
          setLoading(false);
          setUserData(500);
        }
      }
    } catch (e) {
   
      setLoading(false);
      setUserData(500);
      console.log(e.message);
    }
  };

  //api to unlike a recipe
  /**
   * It sends a POST request to the server with the recipe id and the user's auth-token
   * @param recipeid - The id of the recipe to be liked
   */
  const UnLikeRecipe = async (recipeid) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/unlike`,
        {
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
        }
      );
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setLoading(false);
        setProgress(100);
      } else {
        setLoading(false);
        setProgress(100);
        showAlert("Their is Problem in out server", "danger");
      }
    } catch (error) {
      setProgress(100);
      setLoading(false);
      showAlert("Their is Problem in out server", "danger");
      console.log(error.message);
    }
  };
  //api to like a recipe
  /**
   * It sends a POST request to the server with the recipe id and the user's auth-token
   * @param recipeid - the id of the recipe that the user wants to like
   */
  const LikeRecipe = async (recipeid) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_Fetch_Api_Start}/recipe/like`,
        {
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
        }
      );
      let result = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(result.error, "danger");
      } else if (response.status == 200) {
        setLoading(false);
        setProgress(100);
      } else {
        setLoading(false);
        setProgress(100);
        showAlert("Their is Problem in out server", "danger");
      }
    } catch (error) {
      setProgress(100);
      setLoading(false);
      showAlert("Their is Problem in out server", "danger");
      console.log(error.message);
    }
  };
  //to show alert on top
  /**
   * The showAlert function takes a message and a type as arguments, sets the alert state to an object
   * with the message and type, and then sets a timeout to clear the alert state after 3 seconds.
   * @param msg - The message you want to display
   * @param type - 'success' or 'danger'
   */
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
      setProgress(30)

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
      setProgress(60)
      let Name_recipe = await response.json();
      if (response.status == 404) {
        setProgress(100);

        setsearchedRecipe(false);
        setnamereicpeloading(false);
      }
       else if (response.status == 200) {
      
        setnamereicpeloading(false);

        setsearchedRecipe(Name_recipe);
        setProgress(100);
      } 
      else {
        setsearchedRecipe(500);
        setProgress(100);
        setLoading(false);
      }
    } catch (error) {
      setsearchedRecipe(500);
      setProgress(100);
      setLoading(false);
      console.log(error.message);
    }
  };
  //api for latest recipes
  /**
   * I'm trying to fetch data from the server and if the response is 200, I want to set the state to the
   * data I got from the server. If the response is 404, I want to set the state to 404. If the response
   * is 500, I want to set the state to 500.
   */
  const LatesRecipe = async () => {
    try {
    setProgress(30)
    setlatestrecipeloading(true)
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
      setProgress(50)
      let Latest_recipe = await response.json();
      if (response.status == 404) {
        setlatestrecipeloading(false)
        setProgress(100)
   
      } else if (response.status == 200) {
      
    
        setLatest_Recipe(Latest_recipe);
       
        setlatestrecipeloading(false)
        setProgress(100)
      } else {
        setLatest_Recipe(500);
        setProgress(100);
    
        setlatestrecipeloading(false)
      }
    } catch (error) {
      setLatest_Recipe(500);
      setProgress(100);
     
      setlatestrecipeloading(false)
      console.log(error.message);
    }
  };
  //api for latest recipe of a parrticular user
  /**
   * It fetches data from the server and sets the data to the state.
   */
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
      } else if (response.status == 200) {
       
        let Latest_recipebyid = await response.json();

        setLatest_Recipebyid(Latest_recipebyid);

        setLoading(false);
        setProgress(100);
      } else {
        setProgress(100);
        setLoading(false);
        setLatest_Recipebyid(500);
      }
    } catch (error) {
      setProgress(100);
      setLoading(false);
      setLatest_Recipebyid(500);
      console.log(error.message);
    }
  };
  // api for all recipes related to a user
  /**
   * It fetches all the recipes from the database and sets the state of the recipe to the fetched data.
   * </code>
   */
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
      } else if (response.status == 200) {
       
        let allrecipe = await response.json();
        setRecipe(allrecipe);

        setLoading(false);
        setProgress(100);
      } else {
        setProgress(100);
        setRecipe(500);
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
 /**
  * It deletes a recipe from the database and updates the recipe list
  * @param id - the id of the recipe to be deleted
  * @param file - "Admindelete"
  */
  const deleteRecipe = async (id, file) => {
    try {
      setProgress(30);
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

      setProgress(60);
      const json = await response.json();
      if (response.status == 404) {
        setProgress(100);
        showAlert(json.error, "danger");
      } else if (response.status == 200) {
       
        showAlert(
          "Recipe is Successfully deleted. It will be updated Soon",
          "success"
        );
        if (file == "Admindelete") {
          AdminGetAllRecipeByDate();
        }

        const newRecipe = recipe.filter((element) => {
          return element._id !== id;
        });
        setRecipe(newRecipe);
        allRecipe();
        setLoading(false);
        setProgress(100);
      } else {
        setRecipe(500);
        setProgress(100);
        setLoading(false);
      }
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
        latestrecipeloading,
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
        deletemessageresult,
        logoutUser,
        deleteAccount,
        deleteaccount,
        deleteaccountAdmin,
        deleteAccountAdmin,
        Admingetallstaticaldata,
        staticalData,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
}
