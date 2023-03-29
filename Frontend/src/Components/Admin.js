import React, { useContext, useEffect, useState } from 'react'
import RecipeContext from '../Context/RecipeContext'
import InternalServerError from './InternalServerError';
import { Button,Modal,Navbar } from '@nextui-org/react';
import './admin.css'
import RecipeItem from './RecipeItem';
import { useLocation, useNavigate } from 'react-router-dom';

import { Collapse, Text,Avatar} from "@nextui-org/react";
export default function Admin() {
  const [userdeleteconfirmation,setuserdeleteconfirmation]=useState(false)
  const [deleteaccountid,setdeleteaccountid]=useState("")

  let Navigate = useNavigate();
  const {state}=useLocation();
 
  const {adminActivePageNumber} = state
  const [adminactivepage, setadminactivepage]=useState(adminActivePageNumber)
  const context = useContext(RecipeContext)
  const {AdminAllUser, AdminGetAllUser,  AdminGetAllRecipe, AdminAllRecipe,  GetAllcontactMessages,
    AllContactMessages,getUser,   AdminAllRecipeByDate,   deleteaccountAdmin,
    deleteAccountAdmin,  AdminGetAllRecipeByDate, AdminAllUserByDate, AdminGetAllUserByDate,deletemessage}=context
  useEffect(()=>{
if(!adminActivePageNumber){
  Navigate("/Home")
}
else{
  setadminactivepage(adminActivePageNumber)
}
if(adminActivePageNumber==1 ){
AdminGetAllUser()
}
if(adminActivePageNumber==2 ){
  AdminGetAllUserByDate()
  }
  if(adminActivePageNumber==3 ){
    AdminGetAllRecipe()
    }
    if(adminActivePageNumber==4 ){
     AdminAllRecipeByDate();
      }
      if(adminActivePageNumber==5 ){
        GetAllcontactMessages()
        }
        
  
  },[adminActivePageNumber])

  var totalratings=0;
  return (<>

<section className="min-vh-100" >
<nav className="nav nav-pills flex-column flex-sm-row mt-3  hideinlessthan768 my-3 ">
      <span className={`flex-sm-fill text-sm-center nav-link   cursor-pointer ${adminactivepage ==0 ?"active ":""} `} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:0}})}} >Statics</span>
      <span className={`flex-sm-fill text-sm-center nav-link  cursor-pointer ${adminactivepage ==1?"active":""} `}  onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:1}}); AdminGetAllUser();}}> All Users</span>
      <span className={`flex-sm-fill text-sm-center nav-link  cursor-pointer ${adminactivepage ==2?"active":""} `}  onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:2}}); AdminGetAllUserByDate();}}>User Activities</span>
      <span className={`flex-sm-fill text-sm-center nav-link  cursor-pointer ${adminactivepage ==3?"active":""} `} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:3}}); AdminGetAllRecipe();}}> All Recipes</span>
      <span className={`flex-sm-fill text-sm-center nav-link  cursor-pointer ${adminactivepage ==4?"active":""} `} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:4}}); AdminGetAllRecipeByDate();}}>Recipes Activities</span>
      <span className={`flex-sm-fill text-sm-center nav-link  cursor-pointer ${adminactivepage ==5?"active":""} `} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:5}}); GetAllcontactMessages();}}>Messages</span>
      <span className={`flex-sm-fill text-sm-center nav-link  cursor-pointer ${adminactivepage ==6?"active":""} `} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:6}}); AdminGetAllUser();}}>Add User</span>
  </nav>
<hr className='hideinlessthan768 '/>
{/* ui navbar */}



<Navbar shouldHideOnScroll isBordered   className='hideinmorethan768 '   >

       <Navbar.Brand></Navbar.Brand>
        
        
       
        <Navbar.Collapse>
        <Navbar.CollapseItem key="statical Information">
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:0}})}}>
       Statical Information
           </div>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem key="statical Information">
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:1}}); AdminGetAllUser();}}>
    All Users
           </div>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem key="statical Information">
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:2}}); AdminGetAllUserByDate();}}>
       User Activities
           </div>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem key="statical Information">
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:3}}); AdminGetAllRecipe();}}>
      All Recipes
           </div>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem key="statical Information">
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:4}}); AdminGetAllRecipeByDate();}}>
      Recipe Activities
           </div>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem key="statical Information">
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:5}}); GetAllcontactMessages();}}>
      Messages
           </div>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem key="statical Information">
           <div className="" style={{cursor:"pointer"}} onClick={()=>{Navigate("/Admin",{state:{adminActivePageNumber:6}}); AdminGetAllUser();}}>
      Add User
           </div>
            </Navbar.CollapseItem>
      </Navbar.Collapse>
  
      <Navbar.Toggle aria-label="toggle navigation"  css={{
  
   
  jc: "flex-end",

}} />
      </Navbar>





            <div className="container py-3">

  
 

 
{adminactivepage ==0 &&   <><div class="container-fluid">


<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
  
</div>


<div class="row">

  
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2 ">
            <div class="card-body ">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Earnings (Monthly)</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

  
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Earnings (Annual)</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-info shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                        </div>
                        <div class="row no-gutters align-items-center">
                            <div class="col-auto">
                                <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                            </div>
                            <div class="col">
                                <div class="progress progress-sm mr-2">
                                    <div class="progress-bar bg-info" role="progressbar"
                                        style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0"
                                        aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

   
    <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            Pending Requests</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                    </div>
                    <div class="col-auto">
                        <i class="fas fa-comments fa-2x text-gray-300"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>






<div class="row">


    <div class="col-lg-6 mb-4">

       
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Projects</h6>
            </div>
            <div class="card-body">
                <h4 class="small font-weight-bold">Server Migration <span
                        class="float-right">20%</span></h4>
                <div class="progress mb-4">
                    <div class="progress-bar bg-danger" role="progressbar" style={{width: "20%"}}
                        aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 class="small font-weight-bold">Sales Tracking <span
                        class="float-right">40%</span></h4>
                <div class="progress mb-4">
                    <div class="progress-bar bg-warning" role="progressbar" style={{width: "40%"}}
                        aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 class="small font-weight-bold">Customer Database <span
                        class="float-right">60%</span></h4>
                <div class="progress mb-4">
                    <div class="progress-bar" role="progressbar" style={{width: "60%"}}
                        aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 class="small font-weight-bold">Payout Details <span
                        class="float-right">80%</span></h4>
                <div class="progress mb-4">
                    <div class="progress-bar bg-info" role="progressbar" style={{width: "80%"}}
                        aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <h4 class="small font-weight-bold">Account Setup <span
                        class="float-right">Complete!</span></h4>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style={{width: "100%"}}
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>

       
   

    </div>

    <div class="col-lg-6 mb-4">

      
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Illustrations</h6>
            </div>
            <div class="card-body">
                <div class="text-center">
                    <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem;"}}
                        src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?w=2000" alt="..."/>
                </div>
                <p>Add some quality, svg illustrations to your project courtesy of unDraw, a
                    constantly updated collection of beautiful svg images that you can use
                    completely free and without attribution!</p>
             
            </div>
        </div>

   
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Development Approach</h6>
            </div>
            <div class="card-body">
                <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                    CSS bloat and poor page performance. Custom CSS classes are used to create
                    custom components and custom utility classes.</p>
                <p class="mb-0">Before working with this theme, you should become familiar with the
                    Bootstrap framework, especially the utility classes.</p>
            </div>
        </div>

    </div>
</div>

</div> </>
}
 
   {  adminactivepage ==1 && <section className="">
  <div className="container py-5 h-100">
    <div className="row  align-items-center h-100">
      {AdminAllUser?.AllUser && AdminAllUser?.AllUser?.map((element)=>{
  return <div className=" col-md-6 mb-4 " key={element._id}>
  <div className="card mb-3 latestrecipelibox" style={{borderRadius: ".5rem"}}>
    <div className="row g-0">
      <div className="col-md-4 gradient-custom text-center text-white"
        style={{borderTopLeftRadius: ".5rem", borderBottomLeftaRdius: ".5rem"}}>
        <img src={element.Profile_Image}
          alt="Avatar" className="img-fluid my-5 box_decrease_size_animationforlogin border border-danger" style={{width: "80px"}} />
        <h5>{element.first_name} {element.last_name}</h5>
        <p>{element.username}</p>
       
      </div>
      <div className="col-md-8">
        <div className="card-body p-4 latestrecipelibox ">
          <h6>Information</h6>
          <hr className="mt-0 mb-4"/>
          <div className="row pt-1">
            <div className="col-6 mb-3">
              <h6>Email</h6>
              <p className="text-muted">{element.email}</p>
            </div>
            <div className="col-6 mb-3">
              <h6>Phone</h6>
              <p className="text-muted">{element.phone_number}</p>
            </div>
          </div>
          <h6>Statics</h6>
          <hr className="mt-0 mb-4"/>
          <div className="row py-1 mb-2">
          <div className="progress  px-0">
                    <div className=" progress-bar bg-success progress-bar-striped active " style={{width:`${element.Total_Comments}%`}} >{ element.Total_Comments >10 ?element.Total_Comments+"-Comments":""}</div>
                    <div className="progress-value"> { element.Total_Comments <10 ?element.Total_Comments+"-Comments":""}</div>
                </div>   <div className="progress  px-0 mt-1">
                    <div className=" progress-bar bg-primary progress-bar-striped active " style={{width:`${element.Total_Recipes}%`}}>{ element.Total_Recipes >10 ?element.Total_Recipes+"-Recipes":""}</div>
                    <div className="progress-value"> { element.Total_Recipes <10 ?element.Total_Recipes+"-Recieps":""}</div>
                </div> 

          </div>
          
          <div className="d-flex justify-content-start">
         
            <a href={element.facebook}><i className="fab fa-facebook-f  text-primary fa-lg me-3"></i></a>
            <a href={element.twitter}><i className="fab fa-twitter  text-primary fa-lg me-3"></i></a>
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
{ adminactivepage == 2 &&<div className="card border border-primary card-header-actions mb-4 ">
<div className="card-header">
    Latest Users
    
</div>

        <div className="card-body px-0 min-vh-100">
       { AdminAllUserByDate?.AllUser && AdminAllUserByDate?.AllUser?.map((element)=>{

           return <><div className="d-flex align-items-center justify-content-between px-4 p-4 my-2 latestrecipelibox " key={element._id}>
                <div className="d-flex align-items-center ">
                  <div>
                <img src={element.Profile_Image}
              className="img-fluid shadow-1-strong rounded border border-success latest_recipe_image Profile_activity_latest_image  " alt="Latest Recipe Image" />
                 
                 </div>   <div className="ms-4">
                        <div className="small">{element.first_name} {element.last_name}</div>
                        {element.OnLine? <span class="badge rounded-pill bg-success">Online</span>:""}
                        {!element.OnLine? <span class="badge rounded-pill bg-secondary">Offline</span>:""}
                        <div className="text-xs text-muted">{(new Date(element.date).toLocaleString())}</div>
                    </div>
                   
                </div>
                <div className="ms-4 small row">
                    <div className="mt-2 col-md-6"> <Button
                 
                 onPress={()=>{setdeleteaccountid(element._id); setuserdeleteconfirmation(true)}}
                     color="error" auto ghost>
                 <i className="fa-sharp fa-solid fa-trash"></i>
                  </Button></div>
                    <div className='col-md-6 mt-2'><Button color="primary" auto ghost onPress={()=>{Navigate("/Edit",{state:{EditingRecipeId:element._id}})}}>
                    <i className="fa-solid fa-pen-to-square"></i>
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
{ adminactivepage ==4 &&<div className="card border border-success card-header-actions mb-4 ">
<div className="card-header">
    Latest Recipes
    
</div>

        <div className="card-body px-0 min-vh-100">
       { AdminAllRecipeByDate?.AllRecipe && AdminAllRecipeByDate?.AllRecipe?.map((element)=>{

           return <><div className="d-flex align-items-center  justify-content-between p-4 my-2 latestrecipelibox" key={element._id}>
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
                 <i className="fa-sharp fa-solid fa-trash" ></i>
                  </Button></div>
                    <div className='col-md-6 mt-2'><Button color="primary" auto ghost onPress={()=>{Navigate("/Edit",{state:{EditingRecipeId:element._id}})}}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button></div>
                </div>
            </div>
           </>
          
       })}
          
           
          
        </div>
    </div>}
  {adminactivepage ==5 && <div className="container">
<div className="row d-flex justify-content-center">
<div className="col-md-8">
	<div className="chat_container">
		<div className="job-box">
			<div className="job-box-filter">
				<div className="row">
					<div className="col-md-6 col-sm-6">
          <Text
        h1
        size={20}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
        Let's Have a Look At Your Messages
      </Text>
     
					</div>
					
				</div>
			</div>
			<div className="inbox-message">
      <Collapse.Group shadow splitted >
          {AllContactMessages?.AllMessages && AllContactMessages?.AllMessages?.map((element)=>{
   

         
           return   <Collapse
           key={element._id}
           arrowIcon={ <i class="fa-sharp fa-solid text-danger fa-trash" onClick={()=>{deletemessage(element._id); GetAllcontactMessages();}}></i>}
           title={<Text h4>{element.Name}</Text>}
           subtitle={<div className='d-none d-md-block'>{element.Email}</div> }
          
           contentLeft={
             <Avatar
               size="lg"
               src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
               color="secondary"
               bordered
               squared
             />
           }
         >
           <Text h5 
             weight="bold">
          {element.Subject}
     
           </Text>
           <Text h6
             weight="bold" className='hideinsmall'>
          {element.Email}
     
           </Text>
           <Text>
      
      {element.Message}
           </Text>
           <Text >
         {new Date(element.Date).toDateString()}
     
           </Text>
         </Collapse>  }
          )}
					
				
       
        
        </Collapse.Group>
        
			</div>
		</div>
	</div>
</div>
</div>
</div>}


{/* } */}
     

    

  

</div>
  </section>
{/* user delete confirmation modal */}
<Modal
        closeButton
        aria-labelledby="modal-title"
        open={userdeleteconfirmation}
   onClose={()=>{setuserdeleteconfirmation(false)}}
      >
        <Modal.Header>
        <Text b size={14}>Are you sure you wanna delete this Account ?</Text>
        </Modal.Header>
        <Modal.Body>
          
     
          
             
         
            <Text size={14}>All the Recipe and Contents Related with this account is also deleted</Text>
         
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="success" onPress={()=>{setuserdeleteconfirmation(false)}}>
           Leave It
          </Button>
          <Button auto color="error" onPress={()=>{setuserdeleteconfirmation(false);deleteAccountAdmin(deleteaccountid)}} >
        Delete
          </Button>
        </Modal.Footer>
      </Modal>
</>
  )
}
