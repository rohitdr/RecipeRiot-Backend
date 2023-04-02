import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RecipeContext from "../Context/RecipeContext";
import AnimatedPage from "./AnimatedPage";
import InternalServerError from "./InternalServerError";
import RecipeItem from "./RecipeItem";
import { motion } from "framer-motion";

export default function Dishtype() {
 /**
  * It takes a string, makes it lowercase, then capitalizes the first letter and returns the new
  * string.
  * @param message - The message that you want to capitalize.
  * @returns The first letter of the string is being capitalized and the rest of the string is being
  * returned in lowercase.
  */
  const firstCapital = (message) => {
    let lower = message.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
/* Destructuring the state and context. */
  const { state } = useLocation();
  const context = useContext(RecipeContext);
  const { dishtype, dishdata } = context;
  const { type } = state;
 /* Calling the function `dishtype` with the argument `type` whenever the `type` changes. */
  useEffect(() => {
    document.title=`RecipeRiot-${firstCapital(type)}  Recipes`
    dishtype(type);
  }, [type]);
  var totalratings = 0;
  return (
    <AnimatedPage>
      <>
        {dishdata == 500 ? (
          <InternalServerError></InternalServerError>
        ) : (<>
          <section
              id="about"
              className="about mt-3 mb-0 pt-3"
              style={{ backgroundColor: "#f7fbfe" }}
            >
              <div className="container">
                <div className="row ">
                  <h3 className="text-primary fs-1 fw-bold text-center">
                   Dish Type  Recipes
                  </h3>
                  <div
                    className="col-lg-6 order-1 order-lg-2 py-4"
                    id="about_img"
                    data-aos="fade-left"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <img
                        src="Other/dishtype.webp"
                        className="img-fluid  box_decrease_size_animationforlogin"
                        alt=""
                      />
                    </motion.div>
                  </div>

                  <div
                    className="col-lg-6 py-4 pt-lg-0 order-2 order-lg-1 content "
                    id="about_content"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <p className="fst-italic">
                      The recipe category of dish type
                       refers to the classification of recipes based on the type of dish they represent. 
                      </p>
                      <ul>
                        <li>
                          <i className="fa-solid fa-square-check mt-2"></i>This category of recipes includes recipes for a variety
                           of dishes, such as appetizers, soups, salads, entrees, desserts, and more.{" "}
                        </li>
                        <li>
                          <i className="fa-solid fa-square-check"></i>Recipes in the dish type category are designed to provide inspiration for different courses 
                          of a meal, or to serve as the main dish for a particular occasion or event. 
                        </li>
                        <li>
                          <i className="fa-solid fa-square-check"></i>Recipes in the dish type category often 
                          have specific preparation and cooking methods that are unique to that type of dish. 
                        </li>
                      </ul>
                      <p>
                      Overall, the dish type category of recipes is a reflection of the diverse types of dishes that exist within culinary traditions, 
                      and serves as a resource for individuals seeking to create delicious and nutritious meals for any occasion.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
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

              {dishdata.recipe &&
                dishdata.recipe.map((element) => {
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
                      className="col-md-3 mt-4 profilerecipe "
                      key={element._id}
                    >
                      <RecipeItem
                        rating={totalratings}
                        userData={element.userData}
                        id={element._id}
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
        </>
        )}
      </>
    </AnimatedPage>
  );
}
