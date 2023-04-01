import React, { useContext, useEffect } from "react";
import RecipeContext from "../Context/RecipeContext";
import { motion } from "framer-motion";
import RecipeItem from "./RecipeItem";
import Loader from "./Loader";
import { useNavigate, useLocation } from "react-router-dom";
import InternalServerError from "./InternalServerError";
export default function SearchResult() {
/* This is a react hook that is used to perform side effects in function components. */
  const context = useContext(RecipeContext);
  const { searchRecipe, NameRecipe, name_to_search, loading , LatesRecipe,Latest_recipe,} = context;
  const { state } = useLocation();

  const searchrecipename = state.search_result_reicpe;
/* This is a react hook that is used to perform side effects in function components. */
  let Navigate = useNavigate();
 /* This is a react hook that is used to perform side effects in function components. */
  useEffect(() => {
    document.title=`RecipeRiot-Searched Recipe`
    if (!searchrecipename) {
      Navigate("/Home");
    }
    else{

      NameRecipe(`/${searchrecipename}`);
      LatesRecipe()
    }
  }, [searchrecipename]);
  var totalratings = 0;

  var fourth = 0;

  return (
    <div>
    {searchRecipe==500?<InternalServerError></InternalServerError>:  <div className="container">
        <div className="row my-3">
          <h1
            className="text-center my-4 fw-bold text-dark"
            style={{ opacity: "0", animation: "drop .4s linear forwards 1s" }}
          >
            SEARCH RESULT
          </h1>
          {loading && <Loader></Loader>}

          {searchRecipe.recipe &&
            searchRecipe.recipe.map((element) => {
              return (
                <div className="col-md-3 mt-4 " key={element._id}>
                  <RecipeItem
                    id={element._id}
                    title={element.label}
                    topLeftColor={"dark"}
                    headingColor={"dark"}
                    ImageUrl={element.image}
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
                    // vitamin_k={element.totalNutrients.VITK1.quantity}
                  ></RecipeItem>
                </div>
              );
            })}
        </div>
      </div>}

      <section
              id="about"
              className="about mt-3 mb-0 pt-3"
              style={{ backgroundColor: "#f7fbfe" }}
            >
              <div className="container">
                <div className="row ">
                  <h3 className="text-primary fs-1 fw-bold text-center">
                 Relavent Recipes
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
                        src="Other/mealtype.jpg"
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
                      Recipes typically include a list of ingredients,
                       measurements, and step-by-step instructions on how to prepare and cook the dish.
                      </p>
                      <ul>
                        <li>
                          <i className="fa-solid fa-square-check mt-2"></i>In addition to the basic recipe instructions, 
                          some recipes may also include tips, variations, or suggestions for serving the dish. {" "}
                        </li>
                        <li>
                          <i className="fa-solid fa-square-check"></i>Recipes can be found in 
                          cookbooks, magazines, online recipe websites, or shared through family and friends.
                        </li>
                        <li>
                          <i className="fa-solid fa-square-check"></i>Recipes are written in a
                           standardized format to ensure that the dish can be replicated with consistent results. 
                        </li>
                        <li>
                        <i className="fa-solid fa-square-check"></i>They 
                        typically begin with a list of ingredients, followed by the preparation and cooking instructions.
                        </li>
                      </ul>
                      <p>
                      Overall, a recipe is a detailed set of instructions
                       that helps people prepare and cook a specific dish, whether it's a simple dessert or a complex meal.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>



      
      <section id="pricing" className="pricing section-bg ">
              <div className="container">
                

                <div className="row">
                  {Latest_recipe.recipe &&
                    Latest_recipe.recipe.map((element) => {
                      fourth++;

                      //sending rating to recipeitem
                      var reciperating = 0;
                      element.Comments.map((ele) => {
                        reciperating = reciperating + ele.rating;
                      });
                      element.Comments.length != 0
                        ? (totalratings =
                            reciperating / element.Comments.length)
                        : (totalratings = 0);
                      reciperating = 0;

                      //sending rating to recipeitem
                      if (fourth < 13) {
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
                              vitamin_b6={
                                element.totalNutrients.VITB6A.quantity
                              }
                              vitamin_d={element.totalNutrients.VITD.quantity}
                              vitamin_e={element.totalNutrients.TOCPHA.quantity}
                            ></RecipeItem>
                          </div>
                        );
                      }
                    })}
                </div>
              </div>
            </section>
    </div>
  );
}
