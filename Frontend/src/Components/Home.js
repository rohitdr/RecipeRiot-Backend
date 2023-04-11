import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import RecipeContext from "../Context/RecipeContext";
import Loader from "./Loader";
import InternalServerError from "./InternalServerError";
import RecipeItem from "./RecipeItem";
import AnimatedPage from "./AnimatedPage";
import { AnimatePresence, motion } from "framer-motion";
export default function Home() {
  /* Setting the state of the component. */

  const [contactmessage, setcontactmessage] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  });

  const [cuisineactive, setcuisineactive] = useState(0);
  const [newlyarriveddivstate, setnewlyarriveddivstate] = useState(0);

  var totalratings = 0;

  var fourth = 0;
  var cuisinenumber = 0;
  /* Destructuring the context object and assigning it to the variables. */
  const context = useContext(RecipeContext);
  const {

    LatesRecipe,
    Latest_recipe,
  
    cuisine,
    cuisinedata,
    cuisineloading,
    ContactusSubmitApi,
    contactsendmessage,
    latestrecipeloading,
  } = context;

  /* Calling the function cuisine and LatesRecipe when the component mounts. */
  useEffect(() => {
    document.title = `RecipeRiot-Home`;
    cuisine("indian");
    LatesRecipe();
  }, []);

  //onchange for contact us form
  /**
   * It takes an event object as an argument, and then it sets the state of the contactmessage object to
   * the current state of the contactmessage object, but with the value of the event target's name
   * property set to the value of the event target's value property.
   * @param e - the event object
   */
  const contactuschange = (e) => {
    setcontactmessage({ ...contactmessage, [e.target.name]: e.target.value });
  };
  //on submit contactus
  /**
   * When the user clicks the submit button, the contactusSubmitApi function is called with the
   * contactmessage as an argument.
   */
  const contactussubmitBUTTON = () => {
    ContactusSubmitApi(contactmessage);
  };

  return (
    <AnimatedPage>
      <>
        {cuisinedata == 500 ||
        contactsendmessage == 500 ||
        Latest_recipe == 500 ? (
          <InternalServerError></InternalServerError>
        ) : (
          <div>
            <section id="hero" className="d-flex align-items-center mb-4">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1">
                    <motion.div
                      initial={{ opacity: 0, y: 200 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <h1>Discover Delicious Recipes from Around the World!</h1>
                      <h2>
                    This is a user-friendly platform that offers a wide selection of recipes from around the world, with easy search  options to help users find the perfect meal
                      </h2>
                      <div className="d-flex justify-content-center justify-content-lg-start">
                        <a href="#about" className="btn-get-started scrollto">
                          Get Started
                        </a>
                        <a
                          href="#portfolio"
                          className="glightbox btn-watch-video"
                        >
                          <motion.div
                            whileHover={{ rotate: [0, 360, 720, 1080, 1440] }}
                            transition={{ duration: 3 }}
                          >
                            <i className="fa-regular pt-3 fa-circle-play"></i>
                          </motion.div>
                          <span>Watch Recipes</span>
                        </a>
                      </div>
                    </motion.div>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 hero-img animated  ">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <img
                        src="Other/homepagetoprecipeiage.jpg"
                        className="img-fluid homepagetoprecipe box_decrease_size_animationforlogin  "
                        alt=""
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* Other */}
            <section id="featured-services" className="featured-services">
              <div className="container">
                <div className="row gy-4">
                  <div className="col-xl-3 col-md-6 d-flex  ">
                    <motion.div
                      initial={{ opacity: 0, x: 300 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 1 }}
                    >
                      <div className="service-item position-relative box_decrease_size_animationforservices bg-white ">
                        <div className="icon">
                          <i className="fa-solid fa-bolt"></i>
                        </div>
                        <h4>
                          <a className="stretched-link">Recipe collections</a>
                        </h4>
                        <p className="fs-6">
                          {" "}
                          A way for users to save their favorite recipes and
                          create their own recipe collections.
                        </p>
                      </div>{" "}
                    </motion.div>
                  </div>

                  <div className="col-xl-3 col-md-6 d-flex ">
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 1 }}
                    >
                      <div className="service-item position-relative box_decrease_size_animationforservices bg-white ">
                        <div className="icon">
                          <i className="fa-solid fa-tower-broadcast"></i>
                        </div>
                        <h4>
                          <a className="stretched-link">Search Anything</a>
                        </h4>
                        <p className="fs-6">
                          We have a search bar where user can enter keywords to
                          find recipes.
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="col-xl-3 col-md-6 d-flex ">
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 1 }}
                    >
                      <div className="service-item position-relative box_decrease_size_animationforservices ">
                        <div className="icon">
                          {" "}
                          <i className="fa-sharp fa-solid fa-disease"></i>
                        </div>
                        <h4>
                          <a className="stretched-link">User account</a>
                        </h4>
                        <p className="fs-6">
                          This allow users to create an account where they can
                          save their favorite recipes, create a shopping list,
                          and receive personalized recommendations.
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="col-xl-3 col-md-6 d-flex ">
                    <motion.div
                      initial={{ opacity: 0, x: -300 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 1 }}
                    >
                      <div className="service-item position-relative box_decrease_size_animationforservices ">
                        <div className="icon">
                          <i className="fa-solid fa-box"></i>
                        </div>
                        <h4>
                          <a className="stretched-link ">
                            User-generated content
                          </a>
                        </h4>
                        <p className="fs-6">
                          A section that allows users to submit their own
                          recipes, which can be reviewed and added to the site
                          if they meet certain criteria.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
            {/* next
             */}
            <section id="services" className="services ">
              <div className="container">
                <div className="section-header text-center ">
                  <h2 className="fw-bold fs-1 text-primary">Our Aspects</h2>
                  <p>
                    Users can search for specific recipes by name, ingredient,
                    cuisine, cooking time, or dietary requirements.
                  </p>
                </div>

                <div className="row gy-5">
                  <div className="col-xl-4 col-md-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2 }}
                    >
                      <div className="service-item">
                        <div className="img">
                          <img
                            src="Other/ouraspects1.jpg"
                            className="img-fluid service_item_image"
                            alt=""
                          />
                        </div>
                        <div className="details position-relative  box_decrease_size_animationforlogin">
                          <div className="icon">
                            {/* <i className="bi bi-activity"></i> */}
                            <motion.div
                              whileHover={{
                                rotate: [0, 360, 720, 1080, 1440],
                                scale: 1.5,
                              }}
                              transition={{ duration: 3 }}
                            >
                              <i className="fa-solid fa-bolt"></i>
                            </motion.div>
                          </div>
                          <a href="#" className="stretched-link">
                            <h3>Countless Recipes</h3>
                          </a>
                          <p>
                            We have a large database of recipes that users can
                            browse and filter by various criteria
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div
                    className="col-xl-4 col-md-6 zoom-in"
                    data-aos-delay="300"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2 }}
                    >
                      <div className="service-item">
                        <div className="img">
                          <img
                            src="Other/ouraspects2.jpg"
                            className="img-fluid service_item_image"
                            alt=""
                          />
                        </div>
                        <div className="details position-relative  box_decrease_size_animationforlogin">
                          <div className="icon">
                            {/* <i className="bi bi-broadcast"></i> */}
                            <motion.div
                              whileHover={{
                                rotate: [0, 360, 720, 1080, 1440],
                                scale: 1.5,
                              }}
                              transition={{ duration: 3 }}
                            >
                              <i className="fa-solid fa-tower-broadcast"></i>
                            </motion.div>
                          </div>
                          <a href="#" className="stretched-link">
                            <h3>Share Recipe </h3>
                          </a>
                          <p>
                            {" "}
                            Users can share their own recipes on the website and
                            rate, review, or comment on other users' recipes
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div
                    className="col-xl-4 col-md-6"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2 }}
                    >
                      <div className="service-item">
                        <div className="img">
                          <img
                            src="Other/ouraspects3.webp"
                            className="img-fluid service_item_image"
                            alt=""
                          />
                        </div>
                        <div className="details position-relative  box_decrease_size_animationforlogin">
                          <div className="icon">
                            {/* <i className="bi bi-easel"></i> */}
                            <motion.div
                              whileHover={{
                                rotate: [0, 360, 720, 1080, 1440],
                                scale: 1.5,
                              }}
                              transition={{ duration: 3 }}
                            >
                              <i className="fa-sharp fa-solid fa-disease"></i>
                            </motion.div>
                          </div>
                          <a href="#" className="stretched-link">
                            <h3>Nutritional information</h3>
                          </a>
                          <p>
                            We provides nutritional information for each recipe,
                            including calories, fat, protein, and carbohydrate
                            content
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div
                    className="col-xl-4 col-md-6"
                    data-aos="zoom-in"
                    data-aos-delay="500"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2 }}
                    >
                      <div className="service-item">
                        <div className="img">
                          <img
                            src="Other/ouraspects4.jpg"
                            className="img-fluid service_item_image"
                            alt=""
                          />
                        </div>
                        <div className="details position-relative  box_decrease_size_animationforlogin">
                          <div className="icon">
                            {/* <i className="bi bi-bounding-box-circles"></i> */}
                            <motion.div
                              whileHover={{
                                rotate: [0, 360, 720, 1080, 1440],
                                scale: 1.5,
                              }}
                              transition={{ duration: 3 }}
                            >
                              <i className="fa-solid fa-box"></i>
                            </motion.div>
                          </div>
                          <a href="#" className="stretched-link">
                            <h3>Share and Rate</h3>
                          </a>
                          <p>
                            Users can create and share their recipes.We also
                            allows users to rate and review recipes posted by
                            other users
                          </p>
                          <a href="#" className="stretched-link"></a>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div
                    className="col-xl-4 col-md-6"
                    data-aos="zoom-in"
                    data-aos-delay="600"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2 }}
                    >
                      <div className="service-item">
                        <div className="img">
                          <img
                            src="Other/ouraspects5.jpg"
                            className="img-fluid service_item_image"
                            alt=""
                          />
                        </div>
                        <div className="details position-relative  box_decrease_size_animationforlogin">
                          <div className="icon">
                            {/* <i className="bi bi-calendar4-week"></i> */}
                            <motion.div
                              whileHover={{
                                rotate: [0, 360, 720, 1080, 1440],
                                scale: 1.5,
                              }}
                              transition={{ duration: 3 }}
                            >
                              <i className="fa-solid fa-calendar-minus"></i>
                            </motion.div>
                          </div>
                          <a href="#" className="stretched-link">
                            <h3>Create and upload</h3>
                          </a>
                          <p>
                            Uers can upload their own recipes and delete them if
                            needed.
                          </p>
                          <a href="#" className="stretched-link"></a>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div
                    className="col-xl-4 col-md-6"
                    
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2 }}
                    >
                      <div className="service-item">
                        <div className="img">
                          <img
                            src="Other/ouraspects6.jpg"
                            className="img-fluid service_item_image"
                            alt=""
                          />
                        </div>
                        <div className="details position-relative  box_decrease_size_animationforlogin">
                          <div className="icon">
                            {/* <i className="bi bi-chat-square-text"></i> */}
                            <motion.div
                              whileHover={{
                                rotate: [0, 360, 720, 1080, 1440],
                                scale: 1.5,
                              }}
                              transition={{ duration: 3 }}
                            >
                              <i className="fa-solid fa-comments"></i>
                            </motion.div>
                          </div>
                          <a href="#" className="stretched-link">
                            <h3>Recipe Search</h3>
                          </a>
                          <p>
                            Users can search for specific recipes by name,
                            ingredient, cuisine, cooking time, or dietary
                            requirements.
                          </p>
                          <a href="#" className="stretched-link"></a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="about"
              className="about"
              style={{ backgroundColor: "#f7fbfe" }}
            >
              <div className="container">
                <div className="row ">
                  <h3 className="text-primary fs-1 fw-bold text-center">
                    About us
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
                        src="Other/aboutus.jpg"
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
                        Our recipes are carefully curated by our team of
                        experienced chefs and food enthusiasts, and we strive to
                        bring you only the best and most reliable recipes that
                        are guaranteed to impress your family and friends.
                      </p>
                      <ul>
                        <li>
                          <i className="fa-solid fa-square-check mt-2"></i>At
                          RecipeRiot, we believe that cooking should be easy,
                          fun, and accessible to everyone.{" "}
                        </li>
                        <li>
                          <i className="fa-solid fa-square-check"></i> Whether
                          you're a beginner or an experienced home cook, our
                          website is designed to help you find the perfect
                          recipe for any occasion.
                        </li>
                        <li>
                          <i className="fa-solid fa-square-check"></i>But we're
                          not just about recipes. We're also committed to
                          providing our users with the latest food trends,
                          cooking tips, and kitchen hacks to help you take your
                          cooking skills to the next level.
                        </li>
                      </ul>
                      <p>
                        At RecipeRiot, we're dedicated to making cooking and
                        food exploration accessible and fun for everyone.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- End About Section --> */}

            {/* <!-- ======= Pricing Section ======= --> */}
            <section id="pricing" className="pricing section-bg ">
              <div className="container">
                <div
                  className="section-title text-center mt-4"
                  data-aos="fade-up"
                >
                  <h2 className="text-primary fs-2">Newly Arrived</h2>
                  <p>
                    Magnam dolores commodi suscipit. Necessitatibus eius
                    consequatur ex aliquid fuga eum quidem. Sit sint consectetur
                    velit. Quisquam quos quisquam cupiditate. Et nemo qui
                    impedit suscipit alias ea. Quia fugiat sit in iste officiis
                    commodi quidem hic quas.
                  </p>
                </div>

                <div className="row">
                  {latestrecipeloading && <Loader></Loader>}
                  { !latestrecipeloading && Latest_recipe.recipe &&
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
                              userData={element.userData}
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
            {/* <!-- End Pricing Section --> */}

            <section id="portfolio" className="portfolio">
              <div className="container">
                <div className="section-title text-center">
                  <h2 className="fw-bold text-primary">Our Collections</h2>
                  <p>
                    Sit sint consectetur velit quisquam cupiditate impedit
                    suscipit
                  </p>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <ul id="portfolio-flters">
                      <li
                        data-filter="*"
                        className={`${
                          cuisineactive == 0 ? "filter-active" : ""
                        } fw-bold`}
                        onClick={() => {
                          cuisine("indian");
                          setcuisineactive(0);
                        }}
                      >
                        All
                      </li>
                      <li
                        id="cuisine_indian"
                        className={`${
                          cuisineactive == 1 ? "filter-active" : ""
                        } fw-bold`}
                        onClick={() => {
                          cuisine("american");
                          setcuisineactive(1);
                        }}
                      >
                        American
                      </li>
                      <li
                        className={`${
                          cuisineactive == 2 ? "filter-active" : ""
                        } fw-bold`}
                        onClick={() => {
                          cuisine("indian");
                          setcuisineactive(2);
                        }}
                      >
                        Indian
                      </li>
                      <li
                        className={`${
                          cuisineactive == 3 ? "filter-active" : ""
                        } fw-bold`}
                        onClick={() => {
                          cuisine("chinese");
                          setcuisineactive(3);
                        }}
                      >
                        Chinese
                      </li>
                      <li
                        className={`${
                          cuisineactive == 4 ? "filter-active" : ""
                        } fw-bold`}
                        onClick={() => {
                          cuisine("british");
                          setcuisineactive(4);
                        }}
                      >
                        British
                      </li>
                      <li
                        className={`${
                          cuisineactive == 5 ? "filter-active" : ""
                        } fw-bold`}
                        onClick={() => {
                          cuisine("italian");
                          setcuisineactive(5);
                        }}
                      >
                        Italian
                      </li>
                      <li
                        className={`${
                          cuisineactive == 6 ? "filter-active" : ""
                        } fw-bold`}
                        onClick={() => {
                          cuisine("japanese");
                          setcuisineactive(6);
                        }}
                      >
                        Japanese
                      </li>
                      <li
                        className={`${
                          cuisineactive == 7 ? "filter-active" : ""
                        } fw-bold`}
                        onClick={() => {
                          cuisine("mexican");
                          setcuisineactive(7);
                        }}
                      >
                        Mexican
                      </li>
                      <li
                        className={`${
                          cuisineactive == 8 ? "filter-active" : ""
                        } fw-bold`}
                        onClick={() => {
                          cuisine("french");
                          setcuisineactive(8);
                        }}
                      >
                        French
                      </li>
                    </ul>
                  </div>
                </div>
                {/* indian recipes
                 */}

                {cuisineloading && <Loader></Loader>}

                <div className="row" key={cuisineactive}>
                  {!cuisineloading && cuisinedata.recipe &&
                    cuisinedata.recipe.map((element) => {
                      cuisinenumber++;
                      //setting recipe for recipitm
                      var reciperating = 0;

                      element.Comments.map((ele) => {
                        reciperating = reciperating + ele.rating;
                      });
                      element.Comments.length != 0
                        ? (totalratings =
                            reciperating / element.Comments.length)
                        : (totalratings = 0);
                      reciperating = 0;
                      //setting recipe for recipitm
                      if (cuisinenumber < 13) {
                        return (
                          <div
                            className="col-md-3 mt-4 profilerecipe "
                            key={element._id}
                          >
                            <RecipeItem
                              id={element._id}
                              userData={element.userData}
                              title={element.label}
                              topLeftColor={"dark"}
                              headingColor={"dark"}
                              rating={totalratings}
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
            {/* <!-- End Portfolio Section --> */}

            {/* <!-- ======= Contact Section ======= --> */}
            <section
              id="contact"
              className="contact section-bg mt-4"
              style={{ backgroundColor: "#f7fbfe" }}
            >
              <div className="container">
                <div className="section-title text-center fw-bold pt-3">
                  <h2>Contact</h2>
                  <p>
                    Magnam dolores commodi suscipit eius consequatur ex aliquid
                    fuga
                  </p>
                </div>

                <div className="row mt-5 justify-content-center">
                  <div className="col-lg-10">
                    <div className="info-wrap">
                      <div className="row">
                        <div className="col-lg-4 info">
                          {/* <i className="bi bi-geo-alt"></i> */}
                          <i className="fa-sharp fa-solid fa-location-dot"></i>
                          <h4>Location:</h4>
                          <p>
                            A108 Adam Street
                            <br />
                            New York, NY 535022
                          </p>
                        </div>

                        <div className="col-lg-4 info mt-4 mt-lg-0">
                          {/* <i className="bi bi-envelope"></i> */}
                          <i className="fa-sharp fa-solid fa-envelope"></i>
                          <h4>Email:</h4>
                          <p>
                            info@example.com
                            <br />
                            contact@example.com
                          </p>
                        </div>

                        <div className="col-lg-4 info mt-4 mt-lg-0">
                          <i className="fa-solid fa-phone"></i>
                          <h4>Call:</h4>
                          <p>
                            +1 5589 55488 51
                            <br />
                            +1 5589 22475 14
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-5 justify-content-center">
                  <div className="col-lg-10">
                    <form
                      action=""
                      method="post"
                      role="form"
                      className="php-email-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <input
                            type="text"
                            name="Name"
                            id="Name"
                            className="form-control"
                            placeholder="Your Name"
                            required
                            onChange={contactuschange}
                          />
                        </div>
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                          <input
                            type="email"
                            className="form-control"
                            name="Email"
                            id="Email"
                            placeholder="Your Email"
                            required
                            onChange={contactuschange}
                          />
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <input
                          type="text"
                          className="form-control"
                          name="Subject"
                          id="Subject"
                          placeholder="Subject"
                          required
                          onChange={contactuschange}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <textarea
                          className="form-control"
                          name="Message"
                          id="Message"
                          rows="5"
                          placeholder="Message"
                          required
                          onChange={contactuschange}
                        ></textarea>
                      </div>

                      <div className="text-center">
                        <button type="submit" onClick={contactussubmitBUTTON}>
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- End Contact Section --> */}
          </div>
        )}
      </>
    </AnimatedPage>
  );
}
