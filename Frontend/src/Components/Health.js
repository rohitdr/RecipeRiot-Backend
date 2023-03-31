import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RecipeContext from "../Context/RecipeContext";
import AnimatedPage from "./AnimatedPage";
import InternalServerError from "./InternalServerError";
import RecipeItem from "./RecipeItem";

export default function Health() {
  /**
   * It takes a string, makes it lowercase, then capitalizes the first letter and returns the string.
   * @param message - The message that you want to capitalize.
   * @returns The first letter of the string is being capitalized and the rest of the string is being
   * returned in lowercase.
   */
  const firstCapital = (message) => {
    let lower = message.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  /* Destructuring the state from the useLocation hook and the health and healthdata from the
  RecipeContext. */
  const { state } = useLocation();
  const context = useContext(RecipeContext);
  const { health, healthdata } = context;
  const { type } = state;
  /* Calling the health function from the RecipeContext. */
  useEffect(() => {
    health(type);
  }, [type]);
  var totalratings = 0;
  return (
    <>
      <AnimatedPage>
        {healthdata == 500 ? (
          <InternalServerError></InternalServerError>
        ) : (
          <div className="container min-vh-100">
            <div className="row my-3">
              <h1
                className="text-center my-4 fw-bold text-dark"
                style={{
                  opacity: "0",
                  animation: "drop .4s linear forwards 1s",
                }}
              >
                {firstCapital(type)} Recipes
              </h1>

              {healthdata.recipe &&
                healthdata.recipe.map((element) => {
                  //setting recipe for recipitm
                  var reciperating = 0;
                  element.Comments.map((ele) => {
                    reciperating = reciperating + ele.rating;
                  });
                  element.Comments.length != 0
                    ? (totalratings = reciperating / element.Comments.length)
                    : (totalratings = 0);
                  reciperating = 0;
                  //setting recipe for recipitm
                  return (
                    <div
                      className="col-md-3 mt-4 profilerecipe box_decrease_size_animation_for_recipeitem"
                      key={element._id}
                    >
                      <RecipeItem
                        id={element._id}
                        rating={totalratings}
                        title={element.label}
                        topLeftColor={"dark"}
                        headingColor={"dark"}
                        ImageUrl={element.image}
                        user={element.user}
                        date={element.date}
                        health_labels={element.healthLabels}
                        Ingridiants={element.ingredientLines
                          .toString()
                          .replace(",", " and ")
                          .substring(0, 60)}
                        caleroies={Math.ceil(element.calories)}
                        fat={
                          element.totalNutrients.FAT.quantity
                            ? Math.ceil(element.totalNutrients.FAT.quantity)
                            : " "
                        }
                        caution={element.cautions}
                        time={element.totalTime}
                        source={element.source}
                        sugar={element.totalNutrients.SUGAR.quantity}
                        water={element.totalNutrients.WATER.quantity}
                        chole={element.totalNutrients.CHOLE.quantity}
                        vitamin_a={element.totalNutrients.VITA_RAE.quantity}
                        vitamin_c={element.totalNutrients.VITC.quantity}
                        vitamin_b6={element.totalNutrients.VITB6A.quantity}
                        vitamin_d={element.totalNutrients.VITD.quantity}
                        vitamin_e={element.totalNutrients.TOCPHA.quantity}
                      ></RecipeItem>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </AnimatedPage>
    </>
  );
}
