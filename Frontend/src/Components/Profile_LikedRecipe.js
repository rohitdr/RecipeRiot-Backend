import React, { useContext, useEffect } from 'react'
import RecipeContext from "../Context/RecipeContext";
import BlankRecipeItem from './BlankRecipeItem';
import Loader from './Loader';
import RecipeItem from './RecipeItem';
import { useNavigate } from "react-router-dom";
import NoResult from "./NoResult";
import InternalServerError from './InternalServerError';
import AnimatedPage from './AnimatedPage';
export default function Profile_LikedRecipe() {

    const context = useContext(RecipeContext)
    const {LikedRecipe,AllLikedRecipe,loading} = context
    let Navigate = useNavigate(); 
   useEffect(()=>{
    if(!sessionStorage.getItem("auth-token")&& !localStorage.getItem("auth-token")){
      Navigate("/login")
          }
          else{
            AllLikedRecipe()
          }
    
    
     
},[])
var totalratings=0;

  return (
    <><AnimatedPage>
    { LikedRecipe == 500 ? <InternalServerError></InternalServerError> :<div className='min-vh-100'>
      <div className="container ">

      {!LikedRecipe ?  <NoResult img="https://media.tenor.com/unvXyxtdn3oAAAAC/no-result.gif" heading="No Result found" paragraph="Whoops.... You had not uploaded any Recipe yet"></NoResult> :<div className="row my-3">

 <h1 className="text-center my-4 fw-bold text-dark" style={{opacity:"0",
  animation:"drop .4s linear forwards 1s"}}>
          Your Liked Recipes
          </h1>
    {loading && <Loader></Loader> && <BlankRecipeItem></BlankRecipeItem>}
       
 
      { LikedRecipe && LikedRecipe.map((element)=>{
       //setting recipe for recipitm
       var reciperating=0;
       element.Comments.map((ele)=>{
     
       reciperating =reciperating+ ele.rating;
      })
      element.Comments.length!=0?(totalratings=reciperating/element.Comments.length):totalratings=0;
      reciperating=0;
       //setting recipe for recipitm
        return <div className="col-md-3 mt-4 box_decrease_size_animation_for_recipeitem " key={element._id}>
                    <RecipeItem
                      id={element._id}
                      rating={totalratings}
                        title={element.label}
                        topLeftColor={"dark"}
                        headingColor={"dark"}
                        user={element.user}
                      ImageUrl={element.image}
                      date={element.date}
                      health_labels={element.healthLabels
                      }
                      Ingridiants={element.ingredientLines
                        .toString()
                        .replace(",", " and ")
                        .substring(0, 60)}
                      caleroies={Math.ceil(element.calories)}
                      fat={
                        element.totalNutrients.FAT.quantity
                          ? Math.ceil(
                              element.totalNutrients.FAT.quantity
                            )
                          : " "
                      }
                      caution={element.cautions}
                      time={element.totalTime}
                      source={element.source}
                      sugar={element.totalNutrients.SUGAR.quantity}
                      water={element.totalNutrients.WATER.quantity}
                      chole={element.totalNutrients.CHOLE.quantity}
                      vitamin_a={
                        element.totalNutrients.VITA_RAE.quantity
                      }
                      vitamin_c={element.totalNutrients.VITC.quantity}
                      vitamin_b6={element.totalNutrients.VITB6A.quantity}
                      vitamin_d={element.totalNutrients.VITD.quantity}
                      vitamin_e={element.totalNutrients.TOCPHA.quantity}
                    
                    ></RecipeItem>
                  
                  </div>
       
     
       }
       )
       }
       
 
     
   
       </div>}
    
  
     
      
       
</div>

    </div>}</AnimatedPage>
    </>
  )
}
