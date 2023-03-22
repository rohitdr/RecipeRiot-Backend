import React, { useState } from "react";

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

  //api to get recipe who has a particular mealtype
  const diettype = async (type) => {
    try {
      setProgress(30);
      const response = await fetch(
        `http://localhost:5000/api/recipe/allRecipeswithdietLabels/${type}`,
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
        `http://localhost:5000/api/recipe/allRecipeswithdishtype/${type}`,
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
            ? "http://localhost:5000/api/recipe/allRecipeswithmealtypelunchdinner"
            : `http://localhost:5000/api/recipe/allRecipeswithmealtype/${type}`
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
        `http://localhost:5000/api/recipe/allRecipeswithhealthlabels/${type}`,
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
        `http://localhost:5000/api/recipe/allRecipeswithcuisinetype/${type}`,
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
        "http://localhost:5000/api/auth/getUserbyid",
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
        `http://localhost:5000/api/recipe/recipebyid/${id}`,
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
        "http://localhost:5000/api/recipe/allLikedRecipe",
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
        const response = await fetch("http://localhost:5000/api/auth/getUser", {
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
      const response = await fetch("http://localhost:5000/api/recipe/unlike", {
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

      const response = await fetch("http://localhost:5000/api/recipe/like", {
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
      }, 2000)
    );
  };
  //api for recipe search
  const NameRecipe = async (recipename) => {
    try {
      setnamereicpeloading(true);

      const response = await fetch(
        `http://localhost:5000/api/recipe/allRecipeswith${recipename}`,
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
        "http://localhost:5000/api/recipe/LatestRecipes",
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
        "http://localhost:5000/api/recipe/LatestRecipesbyid",
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
        "http://localhost:5000/api/recipe/allRecipes",
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
  const deleteRecipe = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/recipe/deleteRecipe/${id}`,
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

      const json = await response.json();
      const newRecipe = recipe.filter((element) => {
        return element._id !== id;
      });

      setRecipe(newRecipe);
      allRecipe();
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
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
}
