import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import RecipeContext from "../Context/RecipeContext";
import AnimatedPage from "./AnimatedPage";
import InternalServerError from "./InternalServerError";
import RecipeItem from "./RecipeItem";
import { motion } from "framer-motion";
export default function CuisineType() {
  /**
   * It takes a string, makes it lowercase, then capitalizes the first letter and returns the string.
   * @param message - The message you want to capitalize.
   * @returns the first letter of the string in uppercase and the rest of the string in lowercase.
   */
  const firstCapital = (message) => {
    let lower = message.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  var totalratings = 0;
/* Destructuring the context and the state. */
  const context = useContext(RecipeContext);
  const { cuisine, cuisinedata } = context;
  const { state } = useLocation();
  const { type } = state;
 /* Calling the cuisine function with the type parameter. */
  useEffect(() => {
    document.title=`RecipeRiot-${firstCapital(type)}  Recipes`
    cuisine(type);
  }, [type]);
  return (
    <>
      <AnimatedPage>
        {cuisinedata == 500 ? (
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
                    Cuisine Type  Recipes
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
                        src="Other/cuisinetype.jpg"
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
                      The recipe category of cuisine refers to the style of
                       cooking and food preparation associated with a particular culture or region
                      </p>
                      <ul>
                        <li>
                          <i className="fa-solid fa-square-check mt-2"></i>At
                          It is a collection of recipes that represent the unique flavors,
                           ingredients, and cooking techniques of a specific cuisine.{" "}
                        </li>
                        <li>
                          <i className="fa-solid fa-square-check"></i>Recipes in the cuisine category are often 
                          influenced by the cultural, historical, and geographical factors of a region.
                        </li>
                        <li>
                          <i className="fa-solid fa-square-check"></i>The cuisine category 
                          of recipes also reflects the social and culinary traditions of a culture
                        </li>
                      </ul>
                      <p>
                      Overall, the cuisine category of recipes is a celebration of the unique flavors and culinary traditions of different cultures and regions. It allows us to explore and appreciate 
                      the diverse range of cuisines that exist around the world, and to learn about the history and culture behind the food we eat.
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

              {cuisinedata.recipe &&
                cuisinedata.recipe.map((element) => {
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
        </>
        )}
      </AnimatedPage>
    </>
  );
}
