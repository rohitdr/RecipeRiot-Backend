import React, { useContext, useEffect, useState } from 'react'
import './Individiual_recipe.css'
import { Link, useLocation,useNavigate } from 'react-router-dom';
import RecipeContext from '../Context/RecipeContext';
import InternalServerError from "./InternalServerError";
import { Modal, Image, Text } from "@nextui-org/react";
import AnimatedPage from './AnimatedPage';
export default function Individual_Recipe() {
  const context = useContext(RecipeContext)
  const {state} = useLocation();
 const location = useLocation();
  const {RecipeItemid}=state
let Navigate=useNavigate();
const [pageno , setpageno]=useState(0)
 
const {
  CurrentRecipeItem,
  CurrentRecipeItemid,
  setProgress,
  getUser,
  userData,
  setLoading,RecipeBYId
} = context;

  useEffect(()=>{
    getUser();
    RecipeBYId(RecipeItemid)
    },[RecipeItemid,CurrentRecipeItem?.recipe?.Comments])


  //comments functons 
  const [visible, setVisible] = useState(false);
  const [visiblerepeted, setvisiblerepeted] = useState(false);
  const [star, setstar] = useState(0);



 

  const Comment = async (comment, rating) => {
    try{
    setProgress(30);
    console.log(CurrentRecipeItemid);
    const response = await fetch(
      "http://localhost:5000/api/recipe/commentreicpe",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": sessionStorage.getItem("auth-token"),
          'auth-token':sessionStorage.getItem("auth-token")?sessionStorage.getItem("auth-token"):localStorage.getItem("auth-token")
        },
        body: JSON.stringify({
          id: RecipeItemid,
          comment: {
           user:userData?.user?._id,
            username: userData?.user?.username,
            Profileimage: userData?.user?.Profile_Image,
            comment: comment,
            rating: star,
          },
        }),
      }
    );
    setProgress(50);
    let result = await response.json();
    if (response.status == 404) {
      setProgress(100);
      setvisiblerepeted(true);
      setTimeout(() => {
        setvisiblerepeted(false);
      }, 4000);
    } else {
      setProgress(100);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 4000);
    }
  }
  catch(error){
    setProgress(100)
    setLoading(false)
    console.log(error.message)
  }
  };

  const submitcomment = () => {
    let comment = document.getElementById("validationTextareaforcomment").value;
    let rating = star;
    Comment(comment, rating);
  };
  return (
    <><AnimatedPage>
 { userData == 500 || CurrentRecipeItem==500? <InternalServerError></InternalServerError>: <div className='min-vh-100'>
    {CurrentRecipeItem.recipe && CurrentRecipeItem.recipe.map((element)=>{
       //sending rating to recipeitem
       var reciperating=0;
       var totalratings=0;
       var postiverating=0;
       var negativerating=0;
       var neutralrating=0;
       var totalComments=element.Comments.length;
       element.Comments.map((ele)=>{
     if(ele.rating>3){
      postiverating++
     }
     if(ele.rating==3){
      neutralrating++
     }
     if(ele.rating<3){
      negativerating++
     }
       reciperating =reciperating+ ele.rating;
      })
      element.Comments.length!=0?(totalratings=reciperating/element.Comments.length):totalratings=0;
      reciperating=0;

       //sending rating to recipeitem
    return <div style={{backgroundColor:" #edf1f5"}} key={element._id}>
     <div className="container pt-4" id="product-section" >
<div className="row">
<div className="col-md-6">
<img
src={element.image}
alt="Kodak Brownie Flash B Camera"
className="image-responsive box_decrease_size_animation"
height="400px"
width="100%"
/>
</div>
<div className="col-md-6">
<div className="col-md-12 ">
<h1 >{element.label}</h1>
</div>
<div className="row">
<div className="col-md-12">
<span className="label label-primary">Uploaded On </span>
<span className="monospaced">{(new Date(element.date).toLocaleString())}</span>
</div> </div><div className="row">
<div className="col-md-12 " >
<p className="description">
Uploaded By Rohit
</p>

</div> 
</div>
<div className="row">
<div className="col-md-3">

 <i className={`fa-${totalratings>0?"solid":"regular"} text-danger fa-star`} ></i>
 <i className={`fa-${totalratings>1?"solid":"regular"} text-danger fa-star`} ></i>
 <i className={`fa-${totalratings>2?"solid":"regular"} text-danger fa-star`} ></i>
 <i className={`fa-${totalratings>3?"solid":"regular"} text-danger fa-star`} ></i>
 <i className={`fa-${totalratings>4?"solid":"regular"} text-danger fa-star`} ></i>
 <span className="label label-success">  {element.Comments.length}+</span>
 
</div>
<div className="col-md-3">
<span className="monospaced"><i className="fa-solid text-danger mx-2 fa-heart"></i>{element.Likes}</span>
</div>
<div className="col-md-3">
<span className="monospaced">Write a Review</span>
</div>

</div>
<div className="col-md-12">
<p className="description">
{element.dietLabels.map((element)=>{ return <span className="badge  bg-dark mx-2" style={{color:"white"}} key={element}>{element}</span>})}

</p>
</div> 
<div className="col-md-12">
<p className="description">
{element.cautions.map((element)=>{ return <span className="badge mx-2 " style={{backgroundColor:"red"}} key={element}>{element}</span>})}
</p>
</div> 
<div className="col-md-12">
<p className="description">
{element.healthLabels.map((element)=>{ return <span className="badge mx-2  bg-info" key={element}>{element}</span>})}
</p>
</div> 
<div className="col-md-12">
<p className="description">
{element.cuisineType.map((element)=>{ return <span className="badge bg-success" key={element}>{element}</span>})} {element.mealType.map((element)=>{ return <span className="badge bg-primary" key={element}>{element}</span>})} {element.dishType.map((element)=>{ return <span className="badge bg-warning" key={element}>{element}</span>})}
</p>
</div> 














 

</div>

<div className="row">
<section >
          <div className="container pt-5">
<nav className="nav profile-nav-borders ">
  <a className={`nav-link   ${pageno==0?"active":""}  `} onClick={()=>{setpageno(0)}} >Description</a>
  <a className={`nav-link ${pageno==1?"active":""} `}  onClick={()=>{setpageno(1)}}>Comments& Ratings</a>

  <a className={`nav-link ${pageno==2?"active":""} `} onClick={()=>{setpageno(2)}}>Ingredients</a>
<a className={`nav-link ${pageno==3?"active":""} `}  onClick={()=>{setpageno(3)}}>Nutrients</a>
  
</nav>

<hr className="mt-0 mb-2"/> 
{/* recipe description */}
 { pageno ==0 &&<div className=''>
      

   {  CurrentRecipeItem?.recipe && CurrentRecipeItem?.recipe.map((element)=>{
    return <div style={{backgroundColor:" #edf1f5"}} className="pb-4" key={element._id}>
           <div className="container pt-4 " id="product-section" >
           <div className="row">
              <div className="col-md-6">
              <div className="accordion box_decrease_size_animation" id="accordionExample">
           
           <div className="accordion-item">
             <h2 className="accordion-header" id="headingOne">
               <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
               DietLabels
               </button>
             </h2>
             <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
               <div className="accordion-body">
                 <strong>{element.dietLabels.map((element)=>{ return <span className="badge  bg-dark mx-2" key={element} style={{color:"white"}}>{element}</span>})}
</strong> 
               </div>
             </div>
           </div>
           <div className="accordion-item">
             <h2 className="accordion-header" id="headingTwo">
               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
               healthLabels
               </button>
             </h2>
             <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
               <div className="accordion-body">
                 <strong>{element.healthLabels.map((element)=>{ return <span className="badge mx-2  bg-info" key={element} >{element}</span>})}
</strong> 
               </div>
             </div>
           </div>
          
           
           <div className="accordion-item">
             <h2 className="accordion-header" id="headingthired">
               <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsethird" aria-expanded="true" aria-controls="collapsethird">
             Cuisine Type
               </button>
             </h2>
             <div id="collapsethird" className="accordion-collapse collapse show" aria-labelledby="headingthird" data-bs-parent="#accordionExample">
               <div className="accordion-body">
                 <strong>{element.cuisineType.map((element)=>{ return <span className="badge bg-success" key={element} >{element}</span>})} 
</strong> 
               </div>
             </div>
           </div>
           <div className="accordion-item">
             <h2 className="accordion-header" id="headingfour">
               <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
          Cautions
               </button>
             </h2>
             <div id="collapsefour" className="accordion-collapse collapse" aria-labelledby="headingfour" data-bs-parent="#accordionExample">
               <div className="accordion-body">
                 <strong>{element.cautions.map((element)=>{ return <span className="badge mx-2 " style={{backgroundColor:"red"}} key={element} >{element}</span>})}
</strong> 
               </div>
            
           </div>
           
         </div>
           
         </div>
              </div>
            
            
         <div className="col-md-6">
         <ul className="list-group box_decrease_size_animation">
         <li className="list-group-item d-flex justify-content-between align-items-start">
    <div className="ms-2 me-auto">
      <div className="fw-bold mb-0">Instructions</div>

    </div>
  
  </li>
              {element?.instruction?.map((element)=>{ return   <li className="list-group-item d-flex justify-content-between align-items-center mb-0" key={element} >{element}</li>})}
              </ul>
              </div>    



            </div>
 


           </div>
          </div>  })} 
    </div>}
{/* recipe description */}

  {/* recipe comments */}
  { pageno == 1 && <div>
      <div style={{ backgroundColor: " #edf1f5" }} className="pb-4">
        <div className="container pt-4 " id="product-section">
          <div className="container ">
            <div className="row">
              <div className="col-lg-12">
                <div className="card border border-primary ">
                  <div className="row">
                    <div className="col-sm-12 col-lg-4">
                      <div className="card-body">
                        <h4 className="card-title">Reviews</h4>
                        <h5 className="card-subtitleratingview">
                          Overview of Review
                        </h5>
                        <h2 className="font-medium mt-5 mb-0">{totalComments}</h2>
                        <span className="text-muted">
                          This month we got 346 New Reviews
                        </span>
                        <div className="image-box mt-4 mb-4">
                          <a
                            href="#"
                            className="mr-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title=""
                            data-original-title="Simmons"
                          >
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              className="rounded-circle"
                              width="45"
                              alt="user"
                            />
                          </a>
                          <a
                            href="#"
                            className="mr-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title=""
                            data-original-title="Fitz"
                          >
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar2.png"
                              className="rounded-circle"
                              width="45"
                              alt="user"
                            />
                          </a>
                          <a
                            href="#"
                            className="mr-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title=""
                            data-original-title="Phil"
                          >
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar3.png"
                              className="rounded-circle"
                              width="45"
                              alt="user"
                            />
                          </a>
                          <a
                            href="#"
                            className="mr-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title=""
                            data-original-title="Melinda"
                          >
                            <img
                              src="https://bootdey.com/img/Content/avatar/avatar4.png"
                              className="rounded-circle"
                              width="45"
                              alt="user"
                            />
                          </a>
                        </div>
                        <a
                      
                          className="btn btn-lg btn-info waves-effect waves-light"
                        >
                          Checkout All Reviews
                        </a>
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-8 border-left">
                      <div className="card-body">
                        <ul className="list-style-none">
                          <li className="mt-4">
                            <div className="d-flex align-items-center">
                              <i className="fa fa-smile-o display-5ratingview text-muted  me-2"></i>
                              <div className="ml-2">
                                <h5 className="mb-0">Positive Reviews</h5>
                                <span className="text-muted">{postiverating} Reviews</span>
                              </div>
                            </div>
                            <div className="progressratingview">
                              <div
                                className="progress-barratingview bg-success"
                                role="progressbar"
                                style={{ width: `${(postiverating/totalComments)*100}%` }}
                                aria-valuenow={`${(postiverating/totalComments)*100}%`}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </li>
                          <li className="mt-5">
                            <div className="d-flex align-items-center">
                              <i className="fa fa-frown-o display-5ratingview text-muted  me-2"></i>
                              <div className="ml-2">
                                <h5 className="mb-0">Negative Reviews</h5>
                                <span className="text-muted">{negativerating} Reviews</span>
                              </div>
                            </div>
                            <div className="progressratingview">
                              <div
                                className="progress-barratingview bg-danger"
                                role="progressbar"
                                style={{ width: `${(negativerating/totalComments)*100}%` }}
                                aria-valuenow={`${(negativerating/totalComments)*100}%`}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </li>
                          <li className="mt-5 mb-5">
                            <div className="d-flex align-items-center">
                              <i className="fa fa-meh-o display-5ratingview text-muted me-2"></i>
                              <div className="ml-2">
                                <h5 className="mb-0">Neutral Reviews</h5>
                                <span className="text-muted">{neutralrating} Reviews</span>
                              </div>
                            </div>
                            <div className="progressratingview">
                              <div
                                className="progress-barratingview bg-info"
                                role="progressbar"
                                style={{ width: `${(neutralrating/totalComments)*100}%` }}
                                aria-valuenow={`${(neutralrating/totalComments)*100}%`}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>

          {/* // Reviews */}

          <div className="bg-white rounded shadow-sm p-4 my-4 restaurant-detailed-ratings-and-reviews border border-primary ">
            <a  className="btn btn-outline-primary btn-sm float-right">
              Top Rated
            </a>
            <h5 className="mb-1">All Ratings and Reviews</h5>
            <div className="reviews-members pt-4 pb-4 ">
            {CurrentRecipeItem.recipe && CurrentRecipeItem.recipe.map((element)=>{
               return element.Comments.map((ele)=>{
                return <><div className="media row" key={ele._id}>
                <div className="col-md-1">
                  <a href="#">
                    <img
                      alt="Generic placeholder image pb-1"
                      src={ele.Profileimage?ele.Profileimage:"http://bootdey.com/img/Content/avatar/avatar6.png"}
                      className="mr-3 rounded-pill"
                    />
                  </a>
                </div>
                <div className="col-md-11">
                  <div className="media-body">
                    <div className="reviews-members-header">
                      <h6 className="">
                        <p className="text-black mb-0 ">{ele.username}</p>
                      </h6>
                      <p className="text-gray mx-2">{new Date(ele.date).toLocaleString()}</p>
                    </div>
                    <div className="reviews-members-body">
                    <span className="star-rating">
                <i
                  className={`fa-${
                    ele.rating > 0 ? "solid" : "regular"
                  } text-danger fa-star`}
                  
                ></i>
                <i
                  className={`fa-${
                    ele.rating > 1 ? "solid" : "regular"
                  } text-danger fa-star`}
                  
                ></i>
                <i
                  className={`fa-${
                    ele.rating > 2 ? "solid" : "regular"
                  } text-danger fa-star`}
                  
                ></i>
                <i
                  className={`fa-${
                    ele.rating > 3 ? "solid" : "regular"
                  } text-danger fa-star`}
                
                ></i>
                <i
                  className={`fa-${
                    ele.rating > 4 ? "solid" : "regular"
                  } text-danger fa-star`}
                 
                ></i>
              </span>
                      <p>
                     {ele.comment}
                      </p>
                    </div>
                  </div>
                </div><hr/>
              </div>  </>
                })
               })}
             
            </div>
         
            {/* <a className="text-center w-100 d-block mt-4 font-weight-bold" href="#">
              See All Reviews
            </a> */}
          </div>

          {/* leave a comment */}
          <div className="bg-white border border-primary rounded shadow-sm p-4  rating-review-select-page">
            <h5 className="mb-4">Leave Comment</h5>
            <p className="mb-2">Rate the Place</p>
            <div className="mb-4">
              <span className="star-rating">
                <i
                  className={`fa-${
                    star > 0 ? "solid" : "regular"
                  } text-danger fa-star`}
                  onClick={() => {
                    setstar(1);
                  }}
                ></i>
                <i
                  className={`fa-${
                    star > 1 ? "solid" : "regular"
                  } text-danger fa-star`}
                  onClick={() => {
                    setstar(2);
                  }}
                ></i>
                <i
                  className={`fa-${
                    star > 2 ? "solid" : "regular"
                  } text-danger fa-star`}
                  onClick={() => {
                    setstar(3);
                  }}
                ></i>
                <i
                  className={`fa-${
                    star > 3 ? "solid" : "regular"
                  } text-danger fa-star`}
                  onClick={() => {
                    setstar(4);
                  }}
                ></i>
                <i
                  className={`fa-${
                    star > 4 ? "solid" : "regular"
                  } text-danger fa-star`}
                  onClick={() => {
                    setstar(5);
                  }}
                ></i>
              </span>
            </div>

            <form className="was-validated">
              <div className="mb-3">
                <label for="validationTextarea" className="form-label">
                  Enter Your Comment
                </label>
                <textarea
                  className="form-control"
                  id="validationTextareaforcomment"
                  placeholder="Please enter Your Comment"
                  required
                ></textarea>
                <div className="invalid-feedback">Please enter a Comment.</div>
              </div>
              <div className="form-group py-2">
                <button
                  className="btn btn-primary btn-sm"
                  type="button"
                  onClick={submitcomment}
                >
                  {" "}
                  Submit Comment{" "}
                </button>
              </div>
            </form>
          </div>
        </div>{" "}
      </div>

      {/* //modal for confirmation of successful comment */}
      <Modal noPadding open={visible} blur>
        <Modal.Header
          css={{ position: "absolute", zIndex: "$1", top: 5, right: 8 }}
        ></Modal.Header>
        <Modal.Body>
          <Image
            showSkeleton
            src="https://media.tenor.com/bXwaPdcTgc8AAAAC/jethalal-funny-dance-tarak-mehta-ka-ooltah-chashmah.gif"
            width={400}
            height={490}
          />
        </Modal.Body>
      </Modal>
      {/* modal for repeted commments */}
      <Modal noPadding open={visiblerepeted} blur>
        <Modal.Header
          css={{ position: "absolute", zIndex: "$1", top: 5, right: 8 }}
        ></Modal.Header>
        <Modal.Body>
          <Image
            showSkeleton
            src="https://media.tenor.com/doK11QWgHskAAAAC/yeh-mauka-baar-baar-nahi-milega-mauka.gif"
            width={400}
            height={490}
          />
        </Modal.Body>
      </Modal>
    </div>}
   {/* recipe comments */}
   {/* {reicpe Ingredients} */}
   {pageno ==2 &&   <div style={{backgroundColor:" #edf1f5"}}>
      <div className="container pt-4 " id="product-section" >
    <div className="row">
 

        {  CurrentRecipeItem.recipe && CurrentRecipeItem?.recipe.map((element)=>{
      return element.ingredients.map((ele)=>{
          return  <div className="col-md-6 pb-4" key={element._id} >
           <div className="card mb-3 box_decrease_size_animation " style={{maxWidth: "540px"}}>
     <div className="row g-0">
       <div className="col-md-4">
         <img src={ele.image} className="img-fluid rounded-start" alt="..."/>
       </div>
       <div className="col-md-8">
         <div className="card-body">
           <h5 className="card-title">{ele.text}</h5>
           <p className="card-text"><small className="text-muted">{Math.ceil(ele.weight)}g</small></p>
         </div>
       </div>
     </div>
   </div>
        
          
          
       </div>     
        })
   })} 
  
    </div>
    </div></div>}
   {/* {reicpe Ingredients} */}
   {/* reicpe Nutrients */}
   {pageno ==3 &&  <div style={{backgroundColor:" #edf1f5"}} className="pb-4">
    <div className="container pt-4 " id="product-section" >
         <section className="intro">
  <div className=" h-100" >
    <div className="mask d-flex align-items-center h-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card shadow-2-strong box_decrease_size_animation" style={{backgroundColor: "#f5f7fa"}} >
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-borderless mb-0">
                    <thead>
                      <tr>
                        <th scope="col">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault" />
                          </div>
                        </th>
                        <th scope="col">Nutrients</th>
                        <th scope="col">Quantity</th>
                       
                        
                      </tr>
                    </thead>
                    <tbody>

                    {  CurrentRecipeItem?.recipe && CurrentRecipeItem?.recipe.map((element)=>{
                   
                        return <><tr key={element._id}>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.ENERC_KCAL.label}</td>
                        <td>{Math.ceil(element.totalNutrients.ENERC_KCAL.quantity)} {element.totalNutrients.ENERC_KCAL.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.FAT.label}</td>
                        <td>{Math.ceil(element.totalNutrients.FAT.quantity)} {element.totalNutrients.FAT.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.FASAT.label}</td>
                        <td>{Math.ceil(element.totalNutrients.FASAT.quantity)} {element.totalNutrients.FASAT.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.CHOCDF.label}</td>
                        <td>{Math.ceil(element.totalNutrients.CHOCDF.quantity)} {element.totalNutrients.CHOCDF.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.SUGAR.label}</td>
                        <td>{Math.ceil(element.totalNutrients.SUGAR.quantity)} {element.totalNutrients.SUGAR.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.PROCNT.label}</td>
                        <td>{Math.ceil(element.totalNutrients.PROCNT.quantity)} {element.totalNutrients.PROCNT.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.CHOLE.label}</td>
                        <td>{Math.ceil(element.totalNutrients.CHOLE.quantity)} {element.totalNutrients.CHOLE.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.CA.label}</td>
                        <td>{Math.ceil(element.totalNutrients.CA.quantity)} {element.totalNutrients.CA.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.FE.label}</td>
                        <td>{Math.ceil(element.totalNutrients.FE.quantity)} {element.totalNutrients.FE.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.VITA_RAE.label}</td>
                        <td>{Math.ceil(element.totalNutrients.VITA_RAE.quantity)} {element.totalNutrients.VITA_RAE.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.THIA.label}</td>
                        <td>{Math.ceil(element.totalNutrients.THIA.quantity)} {element.totalNutrients.THIA.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.RIBF.label}</td>
                        <td>{Math.ceil(element.totalNutrients.RIBF.quantity)} {element.totalNutrients.RIBF.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.NIA.label}</td>
                        <td>{Math.ceil(element.totalNutrients.NIA.quantity)} {element.totalNutrients.NIA.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.VITB6A.label}</td>
                        <td>{Math.ceil(element.totalNutrients.VITB6A.quantity)} {element.totalNutrients.VITB6A.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.FOLAC.label}</td>
                        <td>{Math.ceil(element.totalNutrients.FOLAC.quantity)} {element.totalNutrients.FOLAC.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.VITB12.label}</td>
                        <td>{Math.ceil(element.totalNutrients.VITB12.quantity)} {element.totalNutrients.VITB12.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.VITD.label}</td>
                        <td>{Math.ceil(element.totalNutrients.VITD.quantity)} {element.totalNutrients.VITD.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.TOCPHA.label}</td>
                        <td>{Math.ceil(element.totalNutrients.TOCPHA.quantity)} {element.totalNutrients.TOCPHA.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox"  id="flexCheckDefault1" />
                          </div>
                        </th>
                       
                        <td>{element.totalNutrients.WATER.label}</td>
                        <td>{Math.ceil(element.totalNutrients.WATER.quantity)} {element.totalNutrients.WATER.unit}</td>
                        <td>
                          <button type="button" className="btn btn-danger btn-sm px-3">
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                      </>
                     
                     
                  
                    }
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>   </div>}
    {/* reicpe Nutrients */}
</div> 


</section>
</div>




</div>
</div>

</div>
    }) }


    </div>}</AnimatedPage>
    </>
  )
}
