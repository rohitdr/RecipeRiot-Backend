import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Profile_Top() {
    let location = useLocation();

  React.useEffect(() => {
   
  }, [location]);
  return (
    <div>
       
         <nav class="nav profile-nav-borders ">
        <Link class={`nav-link ${location.pathname==='/Profile_Profile'?"active":""}  ms-0`} to="/Profile_Profile" >Profile</Link>
        <Link class={`nav-link ${location.pathname==='/Profile_Activity'?"active":""} `} to="/Profile_Activity" >Activity</Link>
        <Link class={`nav-link ${location.pathname==='/Profile_Security'?"active":""} `} to="/Profile_Security" >Security</Link>
        <Link class={`nav-link ${location.pathname==='/Profile_Recipe'?"active":""} `} to="/Profile_Recipe">Recipes</Link>
   <Link class={`nav-link ${location.pathname==='/Profile_LikedRecipe'?"active":""} `} to="/Profile_LikedRecipe">LikedRecipes</Link>
   <Link class={`nav-link ${location.pathname==='/AddRecipe'?"active":""} `} to="/AddRecipe">Add Recipe</Link>  
    </nav><hr class="mt-0 mb-2"/>
    </div>
  )
}
