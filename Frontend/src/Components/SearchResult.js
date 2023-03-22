
import React, { useContext, useEffect } from "react";
import RecipeContext from "../Context/RecipeContext";

import RecipeItem from "./RecipeItem";
import Loader from "./Loader";
import { useNavigate,useLocation } from "react-router-dom";
export default function SearchResult() {
  const context = useContext(RecipeContext)
  const {searchRecipe,NameRecipe,name_to_search,loading} = context
  const {state}=useLocation();
  
  const searchrecipename=state.search_result_reicpe;
 let Navigate=useNavigate();
useEffect(()=>{
  if(!searchrecipename){
    Navigate('/Home')
  }
  NameRecipe(`/${searchrecipename}`); 
},[searchrecipename])


  return (
    <div>
<div className="container">

<div className="row my-3">

<h1 className="text-center my-4 fw-bold text-dark" style={{opacity:"0",
  animation:"drop .4s linear forwards 1s"}}>
       SEARCH RESULT
          </h1>
    {loading && <Loader></Loader>}
     
 
       {searchRecipe.recipe && searchRecipe.recipe.map((element)=>{
    
        return <div className="col-md-3 mt-4 " key={element._id}>
                    <RecipeItem
                      id={element._id}
                        title={element.label}
                        topLeftColor={"dark"}
                     headingColor={"dark"}
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
                      // vitamin_k={element.totalNutrients.VITK1.quantity}
                    ></RecipeItem>
                  
                  </div>
       
     
       }
       )
       }
       
 
     
   
       </div>
   
     
      
       
</div>
    </div>
  )
}
