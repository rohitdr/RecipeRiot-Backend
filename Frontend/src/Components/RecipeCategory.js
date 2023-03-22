import RecipeItem from "./RecipeItem";
import React, { Component, useEffect, useState } from "react";
import Loader from "./Loader";

import InfiniteScroll from "react-infinite-scroll-component";

export default function Recipe_Category(props)  {
  
  var number=0;
  const [article, setArticle]=useState([])
  const[loading, setLoading] = useState(true)
  const[nextPage, setNextPage]= useState("")
  const [count , setCount]=useState(0)
  var animation_number=1.1
   const fetchMoreData = async () => {
    setLoading(true)
    let url = nextPage;
   
    
    let data = await fetch(url);
    let parse_data = await data.json();
   
    setArticle(article.concat(parse_data.hits))
    setNextPage(parse_data._links.next.href)
    setLoading(false)
    setCount(parse_data.count)

  };
  
  
  const initailizing=async()=>{
    props.setProgress(10)
    let url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=8717089a&app_key=35658ee1215cbd7922d388170b7509f0&${props.category}`;
 
    props.setProgress(30)
    let data = await fetch(url);
    props.setProgress(50)
    let parse_data = await data.json();
    props.setProgress(70)
   
    setArticle(parse_data.hits)
    setLoading(false)
    setNextPage(parse_data._links.next.href)
    props.setProgress(100)
  }
  useEffect( () => {
   initailizing();
   // eslint-disable-next-line
  },[])

    return (
      <>
            
          <h1 className={`text-center my-4 fw-bold text-dark`} style={{opacity:"0",
  animation:"drop .4s linear forwards 1s"}}>
            Top - {props.heading}
          </h1>
       
          {loading && <Loader></Loader>}
          <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length !== count}
          loader={<Loader/>}
          >
            
            <div className="container" >
         
          <div className="row " >
            {
              article.map((element) => {
              
                animation_number+=0.5
                if(animation_number>=11.6){
                  animation_number=0.5
                }
                return (
                  <div className="col-md-3 mt-4"  style={{opacity:"0",
                  animation:`drop .4s linear forwards ${animation_number}s`} } key={element.recipe.uri}>
                    <RecipeItem
                    id={element.recipe.uri}
                     topLeftColor={props.topLeftColor}
                     headingColor={props.headingColor}
                      title={element.recipe.label}
                      ImagesUrl={element.recipe.images.SMALL.url}
                      url={element.recipe.shareAs}
                      health_labels={element.recipe.healthLabels}
                      Ingridiants={element.recipe.ingredientLines
                        .toString()
                        .replace(",", " and ")
                        }
                      caleroies={Math.ceil(element.recipe.calories)}
                      fat={
                        element.recipe.totalNutrients.FAT.quantity
                          ? Math.ceil(
                              element.recipe.totalNutrients.FAT.quantity
                            )
                          : " "
                      }
                     
                      caution={element.recipe.cautions}
                      time={element.recipe.totalTime}
                      source={element.recipe.source}
                      sugar={element.recipe.totalNutrients.SUGAR.quantity}
                      water={element.recipe.totalNutrients.WATER.quantity}
                      chole={element.recipe.totalNutrients.CHOLE.quantity}
                      vitamin_a={
                        element.recipe.totalNutrients.VITA_RAE.quantity
                      }
                      vitamin_c={element.recipe.totalNutrients.VITC.quantity}
                      vitamin_b6={element.recipe.totalNutrients.VITB6A.quantity}
                      vitamin_d={element.recipe.totalNutrients.VITD.quantity}
                      vitamin_e={element.recipe.totalNutrients.TOCPHA.quantity}
                      // vitamin_k={element.recipe.totalNutrients.VITK1.quantity}
                    ></RecipeItem>
                  
                  </div>
                );
          
              }) 
            
              }
          </div>
          </div>
          </InfiniteScroll>
         
          
      </>
    );
   
  }

