import React, { useContext, useEffect, useState } from 'react'
import RecipeContext from '../Context/RecipeContext'
import InternalServerError from './InternalServerError';
import { Button } from '@nextui-org/react';
import './admin.css'
import RecipeItem from './RecipeItem';
import { useNavigate } from 'react-router-dom';
export default function Admin() {
  const [adminactivepage, setadminactivepage]=useState(1)
  let Navigate = useNavigate();
  const context = useContext(RecipeContext)
  const {AdminAllUser, AdminGetAllUser,  AdminGetAllRecipe, AdminAllRecipe,  GetAllcontactMessages,
    AllContactMessages,   AdminAllRecipeByDate,  AdminGetAllRecipeByDate, AdminAllUserByDate, AdminGetAllUserByDate}=context
  useEffect(()=>{

  },[])
  var totalMessagetodisplay=5;
  var messagecounter =0;
  var totalratings=0;
  return (<>

<section className="min-vh-100" style={{backgroundColor: "#eee"}}>
            <div className="container py-5">
       
       <nav class="nav profile-nav-borders ">
      <span class={`nav-link cursor-pointer ${adminactivepage ==0 ?"active ":""}  ms-0`} onClick={()=>{ setadminactivepage(0)}}  >Statics</span>
      <span class={`nav-link cursor-pointer ${adminactivepage ==1?"active":""} `}  onClick={()=>{ AdminGetAllUser(); setadminactivepage(1)}}>Users</span>
      <span class={`nav-link cursor-pointer ${adminactivepage ==2?"active":""} `}  onClick={()=>{ AdminGetAllUserByDate(); setadminactivepage(2)}}>User Activities</span>
      <span class={`nav-link cursor-pointer ${adminactivepage ==3?"active":""} `} onClick={()=>{ AdminGetAllRecipe(); setadminactivepage(3)}}>Recipes</span>
      <span class={`nav-link cursor-pointer ${adminactivepage ==4?"active":""} `} onClick={()=>{ AdminGetAllRecipeByDate(); setadminactivepage(4)}}>Recipes Activities</span>
      <span class={`nav-link cursor-pointer ${adminactivepage ==5?"active":""} `} onClick={()=>{GetAllcontactMessages();  setadminactivepage(5)}}>Messages</span>
 {/* <Link class={`nav-link ${location.pathname==='/Profile_LikedRecipe'?"active":""} `} to="/Profile_LikedRecipe">LikedRecipes</Link>
 <Link class={`nav-link ${location.pathname==='/AddRecipe'?"active":""} `} to="/AddRecipe">Add Recipe</Link>   */}
  </nav><hr class="mt-0 mb-2"/>
 

 

   {/* {AdminAllUser==500 ?<InternalServerError></InternalServerError>:  */}
   {  adminactivepage ==1 && <section class="" style={{backgroundColor: "#f4f5f7"}}>
  <div class="container py-5 h-100">
    <div class="row  align-items-center h-100">
      {AdminAllUser?.AllUser && AdminAllUser?.AllUser?.map((element)=>{
  return <div class=" col-md-6 mb-4 ">
  <div class="card mb-3" style={{borderRadius: ".5rem"}}>
    <div class="row g-0">
      <div class="col-md-4 gradient-custom text-center text-white"
        style={{borderTopLeftRadius: ".5rem", borderBottomLeftaRdius: ".5rem"}}>
        <img src={element.Profile_Image}
          alt="Avatar" class="img-fluid my-5 box_decrease_size_animationforlogin" style={{width: "80px"}} />
        <h5>{element.first_name} {element.last_name}</h5>
        <p>{element.username}</p>
        <i class="far fa-edit mb-5"></i>
      </div>
      <div class="col-md-8">
        <div class="card-body p-4">
          <h6>Information</h6>
          <hr class="mt-0 mb-4"/>
          <div class="row pt-1">
            <div class="col-6 mb-3">
              <h6>Email</h6>
              <p class="text-muted">{element.email}</p>
            </div>
            <div class="col-6 mb-3">
              <h6>Phone</h6>
              <p class="text-muted">{element.phone_number}</p>
            </div>
          </div>
          <h6>Statics</h6>
          <hr class="mt-0 mb-4"/>
          <div class="row py-1 mb-2">
          <div class="progress  px-0">
                    <div class=" progress-bar bg-success progress-bar-striped active " style={{width:`${element.Total_Comments}%`}} >{ element.Total_Comments >10 ?element.Total_Comments+"-Comments":""}</div>
                    <div class="progress-value"> { element.Total_Comments <10 ?element.Total_Comments+"-Comments":""}</div>
                </div>   <div class="progress  px-0 mt-1">
                    <div class=" progress-bar bg-primary progress-bar-striped active " style={{width:`${element.Total_Recipes}%`}}>{ element.Total_Recipes >10 ?element.Total_Recipes+"-Recipes":""}</div>
                    <div class="progress-value"> { element.Total_Recipes <10 ?element.Total_Recipes+"-Recieps":""}</div>
                </div> 

          </div>
          
          <div class="d-flex justify-content-start">
         
            <a href={element.facebook}><i class="fab fa-facebook-f  text-primary fa-lg me-3"></i></a>
            <a href={element.twitter}><i class="fab fa-twitter  text-primary fa-lg me-3"></i></a>
            <a href={element.web}><i className="fas fa-globe fa-lg text-warning me-3"></i></a>
            <a href={element.git}> <i className=" fab fa-github text-dark fa-lg me-3"></i></a>
        
           
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      })}
    
    </div>
  </div>
</section>}
{ adminactivepage == 2 &&<div className="card card-header-actions mb-4 ">
<div className="card-header">
    Latest Users
    
</div>

        <div className="card-body px-0">
       { AdminAllUserByDate?.AllUser && AdminAllUserByDate?.AllUser?.map((element)=>{

           return <><div className="d-flex align-items-center justify-content-between px-4" key={element._id}>
                <div className="d-flex align-items-center">
                <img src={element.Profile_Image}
              className="img-fluid shadow-1-strong rounded border border-success latest_recipe_image Profile_activity_latest_image " alt="Latest Recipe Image" />
                    <div className="ms-4">
                        <div className="small">{element.first_name} {element.last_name}</div>
                        <div className="text-xs text-muted">{(new Date(element.date).toLocaleString())}</div>
                    </div>
                </div>
                <div className="ms-4 small row">
                    <div className="mt-2 col-md-6"> <Button
                    //  onPress={()=>{deleterecipe(element._id)}} 
                     color="error" auto ghost>
                 <i class="fa-sharp fa-solid fa-trash"></i>
                  </Button></div>
                    <div className='col-md-6 mt-2'><Button color="primary" auto ghost onPress={()=>{Navigate("/Edit",{state:{EditingRecipeId:element._id}})}}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Button></div>
                </div>
            </div>
            <hr/></>
          
       })}
          
           
          
        </div>
    </div>}
{ adminactivepage ==3 && <div className="container min-vh-100">

<div className="row my-3">

 <h1 className="text-center my-4 fw-bold text-dark" style={{opacity:"0",
  animation:"drop .4s linear forwards 1s"}}>
      All Recipe 
          </h1>

    
 
       {AdminAllRecipe?.AllRecipe && AdminAllRecipe?.AllRecipe?.map((element)=>{
      //setting recipe for recipitm
      var reciperating=0;
      element.Comments.map((ele)=>{
    
      reciperating =reciperating+ ele.rating;
     })
     element.Comments.length!=0?(totalratings=reciperating/element.Comments.length):totalratings=0;
     reciperating=0;
    
      //setting recipe for recipitm
        return <div className="col-md-3 mt-4 profilerecipe box_decrease_size_animation_for_recipeitem" key={element._id}>
                    <RecipeItem
                      id={element._id}
                      rating={totalratings}
                        title={element.label}
                        topLeftColor={"dark"}
                        headingColor={"dark"}
                      ImageUrl={element.image}
                      user={element.user}
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
       
 
     
   
       </div>
   
     
      
       
</div>}
{ adminactivepage ==4 &&<div className="card card-header-actions mb-4 ">
<div className="card-header">
    Latest Recipes
    
</div>

        <div className="card-body px-0">
       { AdminAllRecipeByDate?.AllRecipe && AdminAllRecipeByDate?.AllRecipe?.map((element)=>{

           return <><div className="d-flex align-items-center justify-content-between px-4" key={element._id}>
                <div className="d-flex align-items-center">
                <img src={element.image}
              className="img-fluid shadow-1-strong rounded latest_recipe_image Profile_activity_latest_image " alt="Latest Recipe Image" />
                    <div className="ms-4">
                        <div className="small">{element.label}</div>
                        <div className="text-xs text-muted">{(new Date(element.date).toLocaleString())}</div>
                    </div>
                </div>
                <div className="ms-4 small row">
                    <div className="mt-2 col-md-6"> <Button
                    //  onPress={()=>{deleterecipe(element._id)}} 
                     color="error" auto ghost>
                 <i class="fa-sharp fa-solid fa-trash"></i>
                  </Button></div>
                    <div className='col-md-6 mt-2'><Button color="primary" auto ghost onPress={()=>{Navigate("/Edit",{state:{EditingRecipeId:element._id}})}}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Button></div>
                </div>
            </div>
            <hr/></>
          
       })}
          
           
          
        </div>
    </div>}
  {adminactivepage ==5 && <div class="container">
<div class="row">

	<div class="chat_container">
		<div class="job-box">
			<div class="job-box-filter">
				<div class="row">
					<div class="col-md-6 col-sm-6">
					<label onClick={totalMessagetodisplay =document?.getElementById("messageshowbox")?.value }>Show 
					<select name="datatable_length" onClick={(e)=>{totalMessagetodisplay = 10}} id="messageshowbox"  class="form-control input-sm">
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
					<option value="20">20</option>
					</select>
					show </label>
					</div>
					<div class="col-md-6 col-sm-6">
						<div class="filter-search-box text-right">
							<label>Search:<input type="search" class="form-control input-sm" placeholder=""/></label>
						</div>
					</div>
				</div>
			</div>
			<div class="inbox-message">
				<ul>
          {AllContactMessages?.AllMessages && AllContactMessages?.AllMessages?.map((element)=>{
        messagecounter++;
            if(messagecounter<= totalMessagetodisplay){

         
           return <li key={element._id}>
					
							<div class="message-avatar">
								<img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/>
							</div>
							<div class="message-body">
								<div class="message-body-heading">
									<h5>{element.Name}<span class="unread">{element.Email}</span></h5>

									<span>{(new Date(element.Date).toLocaleString())}</span>
								</div>
                
                <div className="d-flex justify-content-between">
                <div>  <span> <h6>{element.Subject}</h6></span>
								<p>{element.Message}</p></div>
              <div className="ms-4 small row">
                    <div className="mt-2 col-md-6"> <Button
                    //  onPress={()=>{deleterecipe(element._id)}} 
                     color="error" auto ghost>
                 <i class="fa-sharp fa-solid fa-trash"></i>
                  </Button></div>
                    <div className='col-md-6 mt-2'><Button color="primary" auto ghost onPress={()=>{Navigate("/Edit",{state:{EditingRecipeId:element._id}})}}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Button></div>
                </div>
                </div>
							</div>
             
					
					</li>   }
          })}
					
				</ul>
			</div>
		</div>
	</div>
</div>

</div>}


{/* } */}
     

    

  

</div>
  </section>
</>
  )
}
