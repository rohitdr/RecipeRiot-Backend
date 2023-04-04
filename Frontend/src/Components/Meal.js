import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import RecipeContext from "../Context/RecipeContext";
import AnimatedPage from "./AnimatedPage";
import InternalServerError from "./InternalServerError";
import RecipeItem from "./RecipeItem";
import { motion } from "framer-motion";
import Loader from "./Loader";

export default function Meal() {
  /**
   * It takes a string, makes it lowercase, then capitalizes the first letter and returns the string.
   * @param message - The message you want to capitalize.
   * @returns the first letter of the string in uppercase and the rest of the string in lowercase.
   */
  const firstCapital = (message) => {
    let lower = message.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  /* A hook that is used to get the state of the current location. */
  const { state } = useLocation();
  var animationdelay = 0;
  const context = useContext(RecipeContext);
  const { mealtype, mealdata,mealloading } = context;
  const { type, on } = state;
  /* A hook that is used to perform side effects in a functional component. */
  useEffect(() => {
    document.title = `RecipeRiot-${firstCapital(type)}  Recipes`;
    mealtype(type);
  }, [type]);
  return (
    <>
      <AnimatedPage>
        {mealdata == 500 ? (
          <InternalServerError></InternalServerError>
        ) : (
          <>
            <section
              id="about"
              className="about mt-3 mb-0 pt-3"
              style={{ backgroundColor: "#f7fbfe" }}
            >
              <div className="container">
                <div className="row ">
                  <h3 className="text-primary fs-1 fw-bold text-center">
                    Meal Type Recipes
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
                        The recipe category of meal type refers to the
                        classification of recipes based on the type of meal they
                        are intended for.
                      </p>
                      <ul>
                        <li>
                          <i className="fa-solid fa-square-check mt-2"></i>This
                          category of recipes includes recipes for breakfast,
                          lunch, dinner, and snacks.{" "}
                        </li>
                        <li>
                          <i className="fa-solid fa-square-check"></i>Recipes in
                          the meal type category are designed to provide
                          inspiration for meals that suit specific times of day
                          or dietary needs.
                        </li>
                        <li>
                          <i className="fa-solid fa-square-check"></i>Recipes in
                          the meal type category often have specific nutritional
                          requirements or considerations, depending on the time
                          of day or activity level.
                        </li>
                        <li>
                        <i className="fa-solid fa-square-check"></i>The meal type category of recipes allows individuals to select and prepare dishes that suit their specific meal needs and dietary preferences.
                        </li>
                      </ul>
                      <p>
                        Overall, the meal type category of recipes is a
                        reflection of the diverse meal needs and preferences of
                        individuals, and serves as a resource for individuals
                        seeking to create delicious and nutritious meals for any
                        time of day.
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
{mealloading && <Loader/>}
                {mealdata.recipe &&
                  mealdata.recipe.map((element) => {
                    if (animationdelay >= 2) {
                      animationdelay = 0;
                    }
                    animationdelay += 0.5;
                    return (
                      <div
                        className="col-md-3 mt-4 profilerecipe box_decrease_size_animation_for_recipeitem"
                        key={element._id}
                      >
                        <RecipeItem
                          userData={element.userData}
                          id={element._id}
                          delay={animationdelay}
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
