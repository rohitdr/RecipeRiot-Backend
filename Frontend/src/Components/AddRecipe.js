import React, { useState } from "react";
import "./Addreicpe.css";
import { Input,Button,Modal,Text,Textarea } from "@nextui-org/react";
import { useContext } from "react";
import { motion } from "framer-motion";
import RecipeContext from "../Context/RecipeContext";
import AnimatedPage from "./AnimatedPage";
export default function AddRecipe() {
  const [pageno, setpageno] = useState(0);
  const context=useContext(RecipeContext)
  const {showAlert}=context
  const [totalingrediants,settotalingrediants]=useState("secondary")
  const [Ingrediantsmodalstate,settotalingrediantsmodalstate]=useState(false)
  const [totalingrediantsnumber,settotalingrediantsnumber]=useState(0)
  const [filesize,setfilesize]=useState(0)
  const [image,setimage]=useState("")

    //converting image to base64
    const toBase64=(file)=>
    new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>resolve(reader.result);
      reader.onerror=(error)=>reject(error);
    });


    //image preview
const imagepreview=async (e)=>{
  const imagefile = e.target.files[0];

  setfilesize(e.target.files[0].size)
 
    const imageurl = URL.createObjectURL(imagefile)
    const previewing = document.querySelector("#reicpe_image")
    previewing.src=imageurl
    
     let base64= await toBase64(imagefile)
     setRecipe({...recipe,image:base64})
    setimage(base64)
 

  
  }
//initail reicpe state
  const [recipe, setRecipe]=useState({
    label:"",
    image:"",
    
    source: "",
    url: "",
    
    dietLabels: [],
    instruction:[],
    healthLabels: [],
    cautions: [],
    ingredientLines: [],
    ingredients:[],
   calories: 0,
    totalWeight:0,
    totalTime: 0,
    cuisineType: [
    ],
    mealType: [
   
    ],
    dishType: [
  
    ],
    totalNutrients: {
    ENERC_KCAL: {
    label: "Energy",
    quantity: 0,
    unit: "kcal"
    },
    FAT: {
    label: "Fat",
    quantity: 0,
    unit: "g"
    },
    CHOCDF: {
    label: "Carbs",
    quantity: 0,
    unit: "g"
    },
  
    FIBTG: {
    label: "Fiber",
    quantity:0,
    unit: "g"
    },
    SUGAR: {
    label: "Sugars",
    quantity: 0,
    unit: "g"
    },
   
    PROCNT: {
    label: "Protein",
    quantity: 0,
    unit: "g"
    },
    CHOLE: {
    label: "Cholesterol",
    quantity: 0,
    unit: "mg"
    },
   
    CA: {
    label: "Calcium",
    quantity: 0,
    unit: "mg"
    },
   
   
    FE: {
    label: "Iron",
    quantity: 0,
    unit: "mg"
    },
   
    
    VITA_RAE: {
    label: "Vitamin A",
    quantity: 0,
    unit: "µg"
    },
    VITC: {
    label: "Vitamin C",
    quantity:0,
    unit: "mg"
    },
    THIA: {
    label: "Thiamin (B1)",
    quantity: 0,
    unit: "mg"
    },
    RIBF: {
    label: "Riboflavin (B2)",
    quantity: 0,
    unit: "mg"
    },
    NIA: {
    label: "Niacin (B3)",
    quantity: 0,
    unit: "mg"
    },
    VITB6A: {
    label: "Vitamin B6",
    quantity: 0,
    unit: "mg"
    },
    
   
   
    VITB12: {
    label: "Vitamin B12",
    quantity: 0,
    unit: "µg"
    },
    VITD: {
    label: "Vitamin D",
    quantity: 0,
    unit: "µg"
    },
    TOCPHA: {
    label: "Vitamin E",
    quantity: 0,
    unit: "mg"
    },
    VITK1: {
    label: "Vitamin K",
    quantity: 0,
    unit: "µg"
    },
   
    WATER: {
    label: "Water",
    quantity: 0,
    unit: "g"
    }}
  }
    )
    // intialization of ingrediants variables
    var first_ingede_text,second_ingede_text,third_ingede_text,fourth_ingede_text,fifth_ingede_text,sixth_ingede_text,seventh_ingede_text,eight_ingede_text,nineth_ingede_text,tenth_ingede_text=null
    var first_ingede_weight,second_ingede_weight,third_ingede_weight,fourth_ingede_weight,fifth_ingede_weight,sixth_ingede_weight,seventh_ingede_weight,eight_ingede_weight,nineth_ingede_weight,tenth_ingede_weight=null
    var first_ingede_image,second_ingede_image,third_ingede_image,fourth_ingede_image,fifth_ingede_image,sixth_ingede_image,seventh_ingede_image,eight_ingede_image,nineth_ingede_image,tenth_ingede_image=null

    const getselectedElement=(name)=>{
      var options = document.getElementById(`${name}`).selectedOptions;
      var Values = Array.from(options).map(({ value }) => value);
      return Values;
    }
    const onchangelabel=(e)=>{
      setRecipe({...recipe, label : e.target.value})
    
   }
 
  const onchange=(e)=>{
    setRecipe({...recipe, [e.target.name] : e.target.value})
  
  }
 
  const onchangearray=(e)=>{
 let Values=getselectedElement(e.target.name)
    setRecipe({...recipe, [e.target.name] : Values})

  }


 //ingrediants first page, nextpage button
 const ingredientsfirstpage=async()=>{

  if(first_ingede_text && first_ingede_weight){
    recipe.ingredientLines.push(first_ingede_text)
    if(first_ingede_image){
      first_ingede_image=await toBase64(first_ingede_image)
    }
    recipe.ingredients.push({text:first_ingede_text,weight:first_ingede_weight,image:first_ingede_image})
  }
  if(second_ingede_text && second_ingede_weight ){
    recipe.ingredientLines.push(second_ingede_text)
    if(second_ingede_image){
      second_ingede_image=await toBase64(second_ingede_image)
    }
    recipe.ingredients.push({text:second_ingede_text,weight:second_ingede_weight,image:second_ingede_image})
  }
  
  setpageno(4)
}
 //ingrediants second page, nextpage button
 const ingredientssecondpage=async()=>{
  if(third_ingede_text && third_ingede_weight){
    recipe.ingredientLines.push(third_ingede_text)
    if(third_ingede_image){
      third_ingede_image=await toBase64(third_ingede_image)
    }
    recipe.ingredients.push({text:third_ingede_text,weight:third_ingede_weight,image:third_ingede_image})
  }
  if(fourth_ingede_text && fourth_ingede_weight ){
    recipe.ingredientLines.push(fourth_ingede_text)
    if(fourth_ingede_image){
      fourth_ingede_image=await toBase64(fourth_ingede_image)
    }
    recipe.ingredients.push({text:fourth_ingede_text,weight:fourth_ingede_weight,image:fourth_ingede_image})
  }
  
  setpageno(5)
}
 //ingrediants third page, nextpage button
 const ingredientsthirdpage=async()=>{
  if(fifth_ingede_text && fifth_ingede_weight){
    recipe.ingredientLines.push(fifth_ingede_text)
    if(fifth_ingede_image){
      fifth_ingede_image=await toBase64(fifth_ingede_image)
    }
    recipe.ingredients.push({text:fifth_ingede_text,weight:fifth_ingede_weight,image:fifth_ingede_image})
  }
  if(sixth_ingede_text && sixth_ingede_weight ){
    recipe.ingredientLines.push(sixth_ingede_text)
    if(sixth_ingede_image){
      sixth_ingede_image=await toBase64(sixth_ingede_image)
    }
    recipe.ingredients.push({text:sixth_ingede_text,weight:sixth_ingede_weight,image:sixth_ingede_image})
  }
  
  setpageno(6)
}
 //ingrediants fourth page, nextpage button
 const ingredientsfouthpage=async()=>{
  if(seventh_ingede_text && seventh_ingede_weight){
    recipe.ingredientLines.push(seventh_ingede_text)
    if(seventh_ingede_image){
      seventh_ingede_image=await toBase64(seventh_ingede_image)
    }
    recipe.ingredients.push({text:seventh_ingede_text,weight:seventh_ingede_weight,image:seventh_ingede_image})
  }
  if(eight_ingede_text && eight_ingede_weight ){
    recipe.ingredientLines.push(eight_ingede_text)
    if(eight_ingede_image){
      eight_ingede_image=await toBase64(eight_ingede_image)
    }
    recipe.ingredients.push({text:eight_ingede_text,weight:eight_ingede_weight,image:eight_ingede_image})
  }
  
  setpageno(7)
} //ingrediants fifth page, nextpage button
const ingredientsfifthpage=async()=>{
 if(nineth_ingede_text && nineth_ingede_weight){
  recipe.ingredientLines.push(nineth_ingede_text)
  if(nineth_ingede_image){
    nineth_ingede_image=await toBase64(nineth_ingede_image)
  }
   recipe.ingredients.push({text:nineth_ingede_text,weight:nineth_ingede_weight,image:nineth_ingede_image})
 }
 if(tenth_ingede_text && tenth_ingede_weight ){
  recipe.ingredientLines.push(tenth_ingede_text)
  if(tenth_ingede_image){
    tenth_ingede_image=await toBase64(tenth_ingede_image)
  }
   recipe.ingredients.push({text:tenth_ingede_text,weight:tenth_ingede_weight,image:tenth_ingede_image})
 }
 
 setpageno(8)
}

//function for first page
const firstpage=()=>{
  if(filesize>100000){
    showAlert("The image size should be less than 100kb","danger")
    
  }
  else{
    setpageno(1)
  }
}
 
//const api to add recipe
const Addapi=async()=>{
 
      
  
     
     const response = await fetch(`http://localhost:5000/api/recipe/addRecipe`, {
         method: 'POST',
         mode: "cors",
         headers: {
           'Content-Type': 'application/json',
          
           'auth-token':sessionStorage.getItem("auth-token")?sessionStorage.getItem("auth-token"):localStorage.getItem("auth-token")

          
         },
         body: JSON.stringify(recipe)
       
     
       });
       if(response.status != 404){
        showAlert("success","success")
       }
      
      
     

}
  //final page
  const insertRecipe=()=>{
 
    if(document.getElementById('instructionrecipe')){
      recipe.instruction=document.getElementById('instructionrecipe').value.split(".")
    }

Addapi();

  // console.log(recipe)
  }
  return (
    <><AnimatedPage>
      <section className="intro py-5">
        <div className="bg-image h-100">
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 col-lg-9 col-xl-8">
                  <div className="card border-info" style={{ borderRadius: "1rem" }}>
                    <div className="row g-0">
                      <div className="col-md-4 d-none d-md-block">
                        <img
                          src="Other/addRecipe_leftsideimage.jpg"
                          alt="login form"
                          className="img-fluid"
                          style={{
                            borderTopLeftRadius: "1rem",
                            borderBottomLeftRadius: "1rem",
                          }}
                        />
                      </div>
                      <div className="col-md-8 d-flex  align-items-center">
                        {/* page 1 */}
                        {pageno == 0 && 
                          <div className="card-body  py-2 px-4 p-md-5">
                           <motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}> 
                               <h4 className="fw-bold mb-2" style={{color: "#92aad0"}}>Enter the details</h4>
                            <form action="">
                     
                              <div className="mb-2 d-flex justify-content-center">
                                <img
                                className="box_decrease_size_animationforlogin"
                                id="reicpe_image"
                                  src={recipe.image?recipe.image:"Other/addRecipe_recipe_default.gif"}
                                  alt="example placeholder"
                                
                                  style={{width: "100%",height:"250px"}}
                                />
                              </div>
                              <div className="d-flex justify-content-center">
                                {/* <div className="btn btn-primary btn-rounded">
                                  <label
                                    className="form-label text-white m-1"
                                    for="customFile1"
                                  >
                                    Choose file
                                  </label>
                                  <input
                                    type="file"
                                    className="form-control d-none"
                                    onChange={onchangeimage}
                                
                                  
                                  />
                                </div> */}
                                     <label for="profileimage" className='profileimagelabel'>
                                       Select Image
                          <input id="profileimage" type="file" accept="image/*" onChange={imagepreview}/>
                                   </label>
              
                              </div>
                              <div className="d-flex my-4 justify-content-start">
                              <Input 
                              width="80%"
          underlined 
          id="label"
          name="label"
          value={recipe.label}
          labelPlaceholder="Enter the title of the recipe" 
          color="secondary" 
          onChange={onchangelabel}
        />
                              </div>
                            </form>
                            <div className="mt-2 d-flex justify-content-end">
                            <Button color="success" disabled={recipe.label.length<3 || recipe.image.length<100} auto ghost onPress={firstpage}>
         Next
        </Button>
                            </div></motion.div>
                          </div>
                         }
                        {/* page 1 */}
                        {/* page 2 */}
                      
                        {  pageno==1 &&  <motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}>
                          <div className="card-body  py-5 px-4 p-md-5">
                             <div className="card-header">
                          <h4 className="fw-bold" style={{color: "#92aad0"}}>Enter the additional infromation</h4></div>
                       <form action="">
                <div className="row my-4">
                  <div className="col">
                <Input
               
              bordered
                label="Enter the Source of reicpe"
                color="secondary"
          type="Text" 
          value={recipe.source}
          id="source"  name="source"
          onChange={onchange}
        /></div>
               
                <div className="col">
                <Input 
              bordered
              color="secondary"
              value={recipe.totalTime}
                 label="Enter the total time "
                 id="totalTime"
                 name="totalTime"   
                 onChange={onchange} 
          type="number" 
        />
                </div> </div>
                <div className="row my-4">
                <div className="col">
                <Input 
                 bordered
                 value={recipe.calories}
                 label="Enter the Calories in Kcal"
                 color="primary"
          type="phone number" 
          name="calories"  
          id="calories" 
          onChange={onchange}
        />
                </div>
                <div className="col">
                <Input 
        bordered
        color="primary"
        value={recipe.totalWeight}
          label="Enter the total Weight "
          type=" phone number" 
          name="totalWeight" 
           id="totalWeight" 
           onChange={onchange}
        />
                </div>   </div>
                <div className="row my-4">
                  <div className="col">

                 
               <Input 
        bordered
        color="secondary"
        value={recipe.url}
         label="Enter the url of the Source"
         id="url" 
         name="url" 
         onChange={onchange} 
         type="url" 
         labelLeft="https://"
         labelRight=".com"
       /> </div>
        <div className="col">

                 
<Input 
bordered
color="secondary"
value={recipe.cautions}
label="Enter the Cautions of the recipe"
type="text"
name="cautions"
id="cautions"
onChange={onchange}
/> </div>
                </div>
               
                        
                       </form>
                       <div className="mt-2 d-flex justify-content-end">
                       <Button color="warning" className="me-2" auto ghost onPress={()=>{setpageno(0)}}>
 Prev
   </Button>
                       <Button color="success" disabled={recipe.source.length<3 || recipe.calories.length<1 || recipe.cautions.length<3 || recipe.totalTime.length<1 || recipe.totalWeight.length<1 ||recipe.url.length<5} auto ghost onPress={()=>{setpageno(2)}}>
    Next
   </Button>

                       </div>
                     </div></motion.div>
                        }
                        {/* page 2 */}
                        {/* page 3 */}
                      
                        {  pageno==2 &&
                          <div className="card-body  px-4 p-md-5">
                            <motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}>
                            <div className="card-header">
                          <h4 className="fw-bold " style={{color: "#92aad0"}}>Choose the labels
                          </h4></div>
                       <form action="">
                        <div className="row">
                          <div className="col">
                          <label className="form-label text-dark fw-bold">
                  Choose the Diet Labels
                </label>
                <select multiple="multiple" className="form-select" id="dietLabels" name="dietLabels" size="3"  onChange={onchangearray} >


              

      <option value="balanced"> balanced  </option>


      <option value="high-fiber"> high-fiber  </option>


      <option value="high-protein"> high-protein  </option>


      <option value="low-carb"> low-carb  </option>


      <option value="low-fat"> low-fat  </option>


      <option value="low-sodium"> low-sodium  </option>


  </select>
                          </div>
                          <div className="col">
                          <label className="form-label text-dark fw-bold">
                  Choose the Health Labels
                </label>
                <select multiple="multiple" className="form-select" name="healthLabels" id="healthLabels" size="3" onChange={onchangearray} >
                  <option value="alcohol-cocktail"> alcohol-cocktail </option>

                  <option value="alcohol-free"> alcohol-free </option>

                  <option value="celery-free"> celery-free </option>

                  <option value="crustacean-free"> crustacean-free </option>

                  <option value="dairy-free"> dairy-free </option>

                  <option value="DASH"> DASH </option>

                  <option value="egg-free"> egg-free </option>

                  <option value="fish-free"> fish-free </option>

                  <option value="fodmap-free"> fodmap-free </option>

                  <option value="gluten-free"> gluten-free </option>

                  <option value="immuno-supportive"> immuno-supportive </option>

                  <option value="keto-friendly"> keto-friendly </option>

                  <option value="kidney-friendly"> kidney-friendly </option>

                  <option value="kosher"> kosher </option>

                  <option value="low-fat-abs"> low-fat-abs </option>

                  <option value="low-potassium"> low-potassium </option>

                  <option value="low-sugar"> low-sugar </option>

                  <option value="lupine-free"> lupine-free </option>

                  <option value="Mediterranean"> Mediterranean </option>

                  <option value="mollusk-free"> mollusk-free </option>

                  <option value="mustard-free"> mustard-free </option>

                  <option value="no-oil-added"> no-oil-added </option>

                  <option value="paleo"> paleo </option>

                  <option value="peanut-free"> peanut-free </option>

                  <option value="pescatarian"> pescatarian </option>

                  <option value="pork-free"> pork-free </option>

                  <option value="red-meat-free"> red-meat-free </option>

                  <option value="sesame-free"> sesame-free </option>

                  <option value="shellfish-free"> shellfish-free </option>

                  <option value="soy-free"> soy-free </option>

                  <option value="sugar-conscious"> sugar-conscious </option>

                  <option value="sulfite-free"> sulfite-free </option>

                  <option value="tree-nut-free"> tree-nut-free </option>

                  <option value="vegan"> vegan </option>

                  <option value="vegetarian"> vegetarian </option>

                  <option value="wheat-free"> wheat-free </option>
                </select>
                          </div>
                        </div>
                      <div className="row">
                        <div className="col">
                        <label className="form-label text-dark fw-bold">
                  Choose the cuisine Type
                </label>
                <select
                size="3" 
                  multiple="multiple"
                  className="form-select"
                  name="cuisineType"
                  id="cuisineType"
                  onChange={onchangearray}
                >
                  <option value="American"> American </option>

                  <option value="Asian"> Asian </option>

                  <option value="British"> British </option>

                  <option value="Caribbean"> Caribbean </option>

                  <option value="Central Europe"> Central Europe </option>

                  <option value="Chinese"> Chinese </option>

                  <option value="Eastern Europe"> Eastern Europe </option>

                  <option value="French"> French </option>

                  <option value="Indian"> Indian </option>

                  <option value="Italian"> Italian </option>

                  <option value="Japanese"> Japanese </option>

                  <option value="Kosher"> Kosher </option>

                  <option value="Mediterranean"> Mediterranean </option>

                  <option value="Mexican"> Mexican </option>

                  <option value="Middle Eastern"> Middle Eastern </option>

                  <option value="Nordic"> Nordic </option>

                  <option value="South American"> South American </option>

                  <option value="South East Asian"> South East Asian </option>
                </select>
                        </div>
                        <div className="col">
                        <label className="form-label text-dark fw-bold">
                  Choose the Meal Type
                </label>
                <select multiple="multiple" className="form-select" name="mealType" id="mealType" size="3" onChange={onchangearray}  >
                  <option value="Breakfast"> Breakfast </option>

                  <option value="Dinner"> Dinner </option>

                  <option value="Lunch"> Lunch </option>

                  <option value="Snack"> Snack </option>

                  <option value="Teatime"> Teatime </option>
                </select>
                          </div>
                      </div>
           
<div className="row">
  <div className="col">
  <label className="form-label text-dark fw-bold">
                  Choose the Dish Type
                </label>
                <select multiple="multiple" className="form-select" name="dishType" id="dishType" size="3" onChange={onchangearray} >
                  <option value="Biscuits and cookies">
                    {" "}
                    Biscuits and cookies{" "}
                  </option>

                  <option value="Bread"> Bread </option>

                  <option value="Cereals"> Cereals </option>

                  <option value="Condiments and sauces">
                    {" "}
                    Condiments and sauces{" "}
                  </option>

                  <option value="Desserts"> Desserts </option>

                  <option value="Drinks"> Drinks </option>

                  <option value="Main course"> Main course </option>

                  <option value="Pancake"> Pancake </option>

                  <option value="Preps"> Preps </option>

                  <option value="Preserve"> Preserve </option>

                  <option value="Salad"> Salad </option>

                  <option value="Sandwiches"> Sandwiches </option>

                  <option value="Side dish"> Side dish </option>

                  <option value="Soup"> Soup </option>

                  <option value="Starter"> Starter </option>

                  <option value="Sweets"> Sweets </option>
                </select>
  </div>

</div>
               
          
              
               
               
                        
                       </form>
                       <div className="mt-2 d-flex justify-content-end">
                       <Button color="warning" className="me-2" auto ghost onPress={()=>{setpageno(1)}}>
 Prev
   </Button>
                       <Button color="success"
                       disabled={recipe.healthLabels.length<1 || recipe.dietLabels.length<1 || recipe.dishType.length<1 || recipe.cuisineType.length <1 || recipe.mealType.length <1}
                        auto ghost onPress={()=>{ 
                         setpageno(3)} }>
                      
                        
                        
    Next
   </Button>
                       </div>
                       </motion.div> </div>
                        }
                        {/* page 3 */}
                        {/* page 4 */}
                        {  pageno==3 &&<motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}>
                          <div className="card-body py-5 px-4 p-md-5">
                            
                          <h4 className="fw-bold mb-4" style={{color: "#92aad0"}}>Enter First and Second ingrediants</h4>
                       <form action="">
                 
                <div className="row my-2">
                  <div className="col">
                <Input
            
              bordered
                label="Enter the ingredients details"
                color="secondary"
                id="first_ingede_text"
              name="first_ingede_text"

          type="Text" 
          onChange={(e)=>{if(e.target.value.length >0){ first_ingede_text=e.target.value }}}
        />
        </div>
               
              <div className="col">
           
                <Input
            onChange={(e)=>{if(e.target.value.length >0){second_ingede_text=e.target.value}}}
              bordered
                label="Enter the ingredients details"
                color="secondary"
                id="second_ingede_text"
              name="second_ingede_text"
          type="Text" 
        />
                </div> </div>
                <div className="row my-2">
                  <div className="col">
                  <Input 
              bordered
              id="first_ingede_weight"
              name="first_ingede_weight"
              color="secondary"
              
                 label="Enter the weight of ingredient "
         
          type="number" 
          onChange={(e)=>{if(e.target.value.length >0){first_ingede_weight=e.target.value}}}
        />
            
        </div>
               
              <div className="col">
                <Input 
              bordered
              id="second_ingede_weight"
              name="second_ingede_weight"
              color="secondary"
                 label="Enter the weight of ingredient"
                 onChange={(e)=>{if(e.target.value.length >0){second_ingede_weight=e.target.value}}}
        />
                </div> </div>
                <div className="row my-2">
                  <div className="col">
                  <div className="mb-3">
  <label for="formFile" className="form-label">Choose the image</label>
  <input className="form-control" type="file" id="formFile"   onChange={(e)=>{if(e.target.value.length){first_ingede_image=e.target.files[0]} else(first_ingede_image=null)}}/>
</div>
        </div>
               
              <div className="col">
              <div className="mb-3">
  <label for="formFile" className="form-label">Choose the image</label>
  <input className="form-control" type="file" id="formFile" onChange={(e)=>{if(e.target.value.length){second_ingede_image=e.target.files[0]} else(second_ingede_image=null)}}/>
</div>
                </div> </div>
                        
                       </form>
                       <div className="mt-2 d-flex justify-content-end">
                       <Button color="warning" className="me-2" auto ghost onPress={()=>{setpageno(2)}}>
 Prev
   </Button>
                       <Button color="success"
                     
                       auto ghost onPress={ingredientsfirstpage}>
    Next
   </Button>
                       </div>
                     </div></motion.div>
                        }
                        {/* page 4 */}
                         {/* page 5 */}
                         {  pageno==4 &&<motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}>
                          <div className="card-body py-5 px-4 p-md-5">
                            
                          <h4 className="fw-bold mb-4" style={{color: "#92aad0"}}>Enter Third and Fourth Ingredient</h4>
                       <form action="">
                 
                       <div className="row my-2">
                  <div className="col">
                <Input
            onChange={(e)=>{if(e.target.value.length >0){third_ingede_text=e.target.value}}}
              bordered
                label="Enter the ingredients details"
                color="secondary"
          type="Text" 
        />
        </div>
               
              <div className="col">
           
                <Input
             onChange={(e)=>{if(e.target.value.length >0){fourth_ingede_text=e.target.value}}}
              bordered
                label="Enter the ingredients details"
                color="secondary"
          type="Text" 
        />
                </div> </div>
                <div className="row my-2">
                  <div className="col">
                  <Input 
              bordered
              onChange={(e)=>{if(e.target.value.length >0){third_ingede_weight=e.target.value}}}
              color="secondary"
                 label="Enter the weight of ingredient "
         
          type="number" 
        />
            
        </div>
               
              <div className="col">
                <Input 
              bordered
              onChange={(e)=>{if(e.target.value.length >0){fourth_ingede_weight=e.target.value}}}
              color="secondary"
                 label="Enter the weight of ingredient "
         
          type="number" 
        />
                </div> </div>
                <div className="row my-2">
                  <div className="col">
                  <div className="mb-3">
  <label for="formFile" className="form-label">Choose the image</label>
  <input className="form-control" type="file" id="formFile"  onChange={(e)=>{if(e.target.value.length ){third_ingede_image=e.target.files[0]} else(third_ingede_image=null)}} />
</div>
        </div>
               
              <div className="col">
              <div className="mb-3">
  <label for="formFile" className="form-label">Choose the image</label>
  <input className="form-control" type="file" id="formFile"  onChange={(e)=>{if(e.target.value.length ){fourth_ingede_image=e.target.files[0]} else(fourth_ingede_image=null)}} />
</div>
                </div> </div>
                        
                       </form>
                       <div className="mt-2 d-flex justify-content-end">
                       <Button color="warning" className="me-2" auto ghost onPress={()=>{setpageno(3)}}>
 Prev
   </Button>
                       <Button color="success" auto ghost onPress={ingredientssecondpage}>
    Next
   </Button>
                       </div>
                     </div></motion.div>
                        }
                        {/* page 5 */}
                         {/* page 6 */}
                         {  pageno==5 &&<motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}>
                          <div className="card-body py-5 px-4 p-md-5">
                            
                          <h4 className="fw-bold mb-4" style={{color: "#92aad0"}}>Enter the Fifth and Sixth Ingredient</h4>
                       <form action="">
                 
                       <div className="row my-2">
                  <div className="col">
                <Input
             onChange={(e)=>{if(e.target.value.length >0){fifth_ingede_text=e.target.value}}}
              bordered
                label="Enter the ingredients details"
                color="secondary"
          type="Text" 
        />
        </div>
               
              <div className="col">
           
                <Input
               onChange={(e)=>{if(e.target.value.length >0){sixth_ingede_text=e.target.value}}}
              bordered
                label="Enter the ingredients details"
                color="secondary"
          type="Text" 
        />
                </div> </div>
                <div className="row my-2">
                  <div className="col">
                  <Input 
              bordered
              onChange={(e)=>{if(e.target.value.length >0){fifth_ingede_weight=e.target.value}}}
              color="secondary"
                 label="Enter the weight of ingredient "
         
          type="number" 
        />
            
        </div>
               
              <div className="col">
                <Input 
              bordered
              onChange={(e)=>{if(e.target.value.length >0){sixth_ingede_weight=e.target.value}}}
              color="secondary"
                 label="Enter the weight of ingredient "
         
          type="number" 
        />
                </div> </div>
                <div className="row my-2">
                  <div className="col">
                  <div className="mb-3">
  <label for="formFile" className="form-label">Choose the image</label>
  <input className="form-control" type="file" id="formFile"  onChange={(e)=>{if(e.target.value.length ){fifth_ingede_image=e.target.files[0]} else(fifth_ingede_image=null)}}/>
</div>
        </div>
               
              <div className="col">
              <div className="mb-3">
  <label for="formFile" className="form-label">Choose the image</label>
  <input className="form-control" type="file" id="formFile" onChange={(e)=>{if(e.target.value.length ){sixth_ingede_image=e.target.files[0]} else(sixth_ingede_image=null)}}/>
</div>
                </div> </div>
                        
                       </form>
                       <div className="mt-2 d-flex justify-content-end">
                       <Button color="warning" className="me-2" auto ghost onPress={()=>{setpageno(4)}}>
 Prev
   </Button>
                       <Button color="success" auto ghost onPress={ingredientsthirdpage}>
    Next
   </Button>
                       </div>
                     </div></motion.div>
                        }
                        {/* page 6 */}
                         {/* page 7 */}
                         {  pageno==6 &&<motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}>
                          <div className="card-body py-5 px-4 p-md-5">
                            
                          <h4 className="fw-bold mb-4" style={{color: "#92aad0"}}>Enter seventh and Eight Ingredient</h4>
                       <form action="">
                 
                       <div className="row my-2">
                  <div className="col">
                <Input
             onChange={(e)=>{if(e.target.value.length >0){seventh_ingede_text=e.target.value}}}
              bordered
                label="Enter the ingredients details"
                color="secondary"
          type="Text" 
        />
        </div>
               
              <div className="col">
           
                <Input
                  onChange={(e)=>{if(e.target.value.length >0){eight_ingede_text=e.target.value}}}
              bordered
                label="Enter the ingredients details"
                color="secondary"
          type="Text" 
        />
                </div> </div>
                <div className="row my-2">
                  <div className="col">
                  <Input 
              bordered
              onChange={(e)=>{if(e.target.value.length >0){seventh_ingede_weight=e.target.value}}}
              color="secondary"
                 label="Enter the weight of ingredient "
         
          type="number" 
        />
            
        </div>
               
              <div className="col">
                <Input 
              bordered
              onChange={(e)=>{if(e.target.value.length >0){eight_ingede_weight=e.target.value}}}
              color="secondary"
                 label="Enter the weight of ingredient "
         
          type="number" 
        />
                </div> </div>
                <div className="row my-2">
                  <div className="col">
                  <div className="mb-3">
  <label for="formFile" className="form-label">Choose the image</label>
  <input className="form-control" type="file" id="formFile" onChange={(e)=>{if(e.target.value.length ){seventh_ingede_image=e.target.files[0]} else(seventh_ingede_image=null)}}/>
</div>
        </div>
               
              <div className="col">
              <div className="mb-3">
  <label for="formFile" className="form-label">Choose the image</label>
  <input className="form-control" type="file" id="formFile" onChange={(e)=>{if(e.target.value.length ){eight_ingede_image=e.target.files[0]} else(eight_ingede_image=null)}}/>
</div>
                </div> </div>
                        
                       </form>
                       <div className="mt-2 d-flex justify-content-end">
                       <Button color="warning" className="me-2" auto ghost onPress={()=>{setpageno(5)}}>
 Prev
   </Button>
                       <Button color="success" auto ghost onPress={ingredientsfouthpage}>
    Next
   </Button>
                       </div>
                     </div></motion.div>
                        }
                        {/* page 7 */}
                         {/* page 8 */}
                         {  pageno==7 &&<motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}>
                          <div className="card-body py-5 px-4 p-md-5">
                            
                          <h4 className="fw-bold mb-4" style={{color: "#92aad0"}}>Enter Ninth and Tenth Ingredient</h4>
                       <form action="">
                 
                       <div className="row my-2">
                  <div className="col">
                <Input
               onChange={(e)=>{if(e.target.value.length >0){nineth_ingede_text=e.target.value}}}
              bordered
                label="Enter the ingredients details"
                color="secondary"
          type="Text" 
        />
        </div>
               
              <div className="col">
           
                <Input
               onChange={(e)=>{if(e.target.value.length >0){tenth_ingede_text=e.target.value}}}
              bordered
                label="Enter the ingredients details"
                color="secondary"
          type="Text" 
        />
                </div> </div>
                <div className="row my-2">
                  <div className="col">
                  <Input 
              bordered
              onChange={(e)=>{if(e.target.value.length >0){nineth_ingede_weight=e.target.value}}}
              color="secondary"
                 label="Enter the weight of ingredient "
         
          type="number" 
        />
            
        </div>
               
              <div className="col">
                <Input 
              bordered
              onChange={(e)=>{if(e.target.value.length >0){tenth_ingede_weight=e.target.value}}}
              color="secondary"
                 label="Enter the weight of ingredient "
         
          type="number" 
        />
                </div> </div>
                <div className="row my-2">
                  <div className="col">
                  <div className="mb-3">
  <label for="formFile" className="form-label">Choose the image</label>
  <input className="form-control" type="file" id="formFile" onChange={(e)=>{if(e.target.value.length){nineth_ingede_image=e.target.files[0]} else(nineth_ingede_image=null)}}/>
</div>
        </div>
               
              <div className="col">
              <div className="mb-3">
  <label for="formFile" className="form-label">Choose the image</label>
  <input className="form-control" type="file" id="formFile" onChange={(e)=>{if(e.target.value.length){tenth_ingede_image=e.target.files[0]} else(tenth_ingede_image=null)}}/>
</div>
                </div> </div>
                        
                       </form>
                       <div className="mt-2 d-flex justify-content-end">
                       <Button color="warning" className="me-2" auto ghost onPress={()=>{setpageno(6)}}>
 Prev
   </Button>
                       <Button color="success" auto ghost onPress={ingredientsfifthpage}>
    Next
   </Button>
                       </div>
                     </div></motion.div>
                        }
                        {/* page 8 */}
                        {/* page 9 */}
                        {  pageno==8 &&<motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}>
                          <div className="card-body  px-4 p-md-5">
                            
                          <h4 className="fw-bold " style={{color: "#92aad0"}}>Enter the Nurients</h4>
                       <form action="">
                        
                       <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nutrient</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">units</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Energy</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="ENERC_KCAL"
                          name="ENERC_KCAL"
                            className="form-control"
                            placeholder="Enter Quantity"
                            required
                            onChange={(e)=>{
                            
                            recipe.totalNutrients.ENERC_KCAL.quantity= e.target.value
                           
                           
                            }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                            
                              recipe.totalNutrients.ENERC_KCAL.unit= e.target.value
                             
                             
                              }}
                          />

                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">2</th>
                      <td>Fat</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="FAT"
                            name="FAT"
                            className="form-control"
                            placeholder="Enter Quantity"
                               required
                            onChange={(e)=>{
                              recipe.totalNutrients.FAT.quantity= e.target.value
                            
                             
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.FAT.unit= e.target.value
                            
                             
                             }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Carbs</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="CHOCDF"
                            name="CHOCDF"
                            className="form-control"
                            placeholder="Enter Quantity"
                               required
                            onChange={(e)=>{
                              recipe.totalNutrients.CHOCDF.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.CHOCDF.unit= e.target.value
                            
                            
                             }}
                            
                          />

                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">4</th>
                      <td>Fiber</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="FIBTG"
                            name="FIBTG"
                            className="form-control"
                            placeholder="Enter Quantity"
                               required
                            onChange={(e)=>{
                              recipe.totalNutrients.FIBTG.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.FIBTG.unit= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">5</th>
                      <td>Sugars</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="SUGAR"
                            name="SUGAR"
                            className="form-control"
                            placeholder="Enter Quantity"
                               required
                            onChange={(e)=>{
                              recipe.totalNutrients.SUGAR.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.SUGAR.unit= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Protein</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="PROCNT"
                            name="PROCNT"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                             recipe.totalNutrients.PROCNT.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.PROCNT.unit= e.target.value
                             
                             
                              }}
                          />

                        </div>
                      </td>
                    </tr>
                   
                 
                   
                  
                  </tbody>
                </table>
                        
                       </form>
                       <div className="mt-2 d-flex justify-content-end">
                       <Button color="warning" className="me-2" auto ghost onPress={()=>{setpageno(7)}}>
 Prev
   </Button>
                       <Button color="success" auto ghost onPress={()=>{setpageno(9)}}>
    Next
   </Button>
                       </div>
                     </div> </motion.div>}
                        {/* page 9 */}
                          {/* page 10 */}
                          {  pageno==9 &&<motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}>
                          <div className="card-body px-4 p-md-5">
                            
                          
                       <form action="">
                        
                       <table className="table">
                 
                  <tbody>
                  <tr>
                      <th scope="row">7</th>
                      <td>Cholesterol</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                          
                           
                            // id="CHOLE"
                            id="CHOLE"
                            name="CHOLE"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                             recipe.totalNutrients.CHOLE.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.CHOLE.unit= e.target.value
                             
                             
                              }}
                          />

                        </div>
                      </td>
                    </tr>
                  <tr>
                      <th scope="row">8</th>
                      <td>Calcium</td>
                      <td>
                        <div className="form-outline">
                          <input
                          type="number"
                           id="CA"
                           name="CA"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                              // CA_value= e.target.value
                              recipe.totalNutrients.CA.quantity= e.target.value
                            
                             }}
                           
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              // CA_value= e.target.value
                              recipe.totalNutrients.CA.unit= e.target.value
                            
                             }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>Iron</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="FE"
                            name="FE"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                              recipe.totalNutrients.FE.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.FE.unit= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">10</th>
                      <td>Vitamin A</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="VITA_RAE"
                            name="VITA_RAE"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                             recipe.totalNutrients.VITA_RAE.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.VITA_RAE.unit= e.target.value
                             
                             
                              }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">11</th>
                      <td>Vitamin C</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="VITC"
                            name="VITC"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                              recipe.totalNutrients.VITC.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.VITC.unit= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">12</th>
                      <td>Thiamin B1</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="THIA"
                            name="THIA"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                              recipe.totalNutrients.THIA.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.THIA.unit= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">13</th>
                      <td>Riboflavin B2</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="RIBF"
                            name="RIBF"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                              recipe.totalNutrients.RIBF.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.RIBF.unit= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                    </tr>
                    
                   
                  
                  </tbody>
                </table>
                        
                       </form>
                       <div className="mt-2 d-flex justify-content-end">
                       <Button color="warning" className="me-2" auto ghost onPress={()=>{setpageno(8)}}>
 Prev
   </Button>
                       <Button color="success" auto ghost onPress={()=>{setpageno(10)}}>
    Next
   </Button>
                       </div>
                     </div></motion.div>
                     }
                            {/* page 10 */}
                              {/* page 11 */}
                              {  pageno==10 &&<motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}>
                          <div className="card-body  px-4 p-md-5">
                            
                        
                       <form action="">
                        
                       <table className="table">
                 
                  <tbody>
                   
                  <tr>
                      <th scope="row">14</th>
                      <td>Niacin B3</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="NIA"
                            name="NIA"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                             recipe.totalNutrients.NIA.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">15</th>
                      <td>Vitamin B6</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="VITB6A"
                            name="VITB6A"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                             recipe.totalNutrients.VITB6A.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.NIA.unit= e.target.value
                             
                             
                              }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">16</th>
                      <td> Vitamin B12</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="VITB12"
                            name="VITB12"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                              recipe.totalNutrients.VITB12.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.VITB12.unit= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">17</th>
                      <td>Vitamin D</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            iid="VITD"
                            name="VITD"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                             recipe.totalNutrients.VITD.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.VITD.unit= e.target.value
                             
                             
                              }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">18</th>
                      <td>Vitamin E</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="TOCPHA"
                            name="TOCPHA"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                              recipe.totalNutrients.TOCPHA.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.TOCPHA.unit= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">19</th>
                      <td>Vitamin K</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="VITK1"
                            name="VITK1"
                            className="form-control"
                            placeholder="Enter Quantity"
                            onChange={(e)=>{
                             recipe.totalNutrients.VITK1.quantity= e.target.value
                            
                            
                             }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.VITK1.unit= e.target.value
                             
                             
                              }}
                          />

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">20</th>
                      <td>Water</td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="number"
                            id="WATER"
                            name="WATER"
                            className="form-control"
                        placeholder="Enter Quantity"
                        onChange={(e)=>{
                        recipe.totalNutrients.WATER.quantity= e.target.value
                        
                        
                         }}
                          />

                        </div>
                      </td>
                      <td>
                        <div className="form-outline">
                          <input
                            type="text"
                            id="typeNumber"
                            className="form-control"
                            placeholder="Enter the units"
                            onChange={(e)=>{
                              recipe.totalNutrients.WATER.unit= e.target.value
                              
                              
                               }}
                          />

                        </div>
                      </td>
                    </tr>
                  
                  </tbody>
                </table>
                        
                       </form>
                       <div className="mt-2 d-flex justify-content-end">
                       <Button color="warning" className="me-2" auto ghost onPress={()=>{setpageno(9)}}>
 Prev
   </Button>
                       <Button color="success" auto ghost  onPress={()=>{setpageno(11)}} >
    Next
   </Button>
                       </div>
                     </div></motion.div>
                     }
                                {/* page 11 */}
                                {/* page 12 */}
                                {  pageno==11 &&
                          <div className="card-body  py-5 px-4 p-md-5">
                            <motion.div  initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}>
                             <div className="card-header">
                          <h4 className="fw-bold " style={{color: "#92aad0"}}>Enter the Instructions</h4></div>
                       <form action="">
                       <Textarea bordered color="primary" name="instruction" id="instructionrecipe" placeholder="Sepreate next line by using the .(Full Stop)" className="mt-2" width="100%" minRows="10" maxRows="15"
                       label="Enter Your Instructions"
                       />
               
                        
                       </form>
                       <div className="mt-2 d-flex justify-content-end">
                       <Button color="warning" className="me-2" auto ghost onPress={()=>{setpageno(10)}}>
 Prev
   </Button>
                       <Button color="success" auto ghost  onPress={insertRecipe}>
    Next
   </Button>

                       </div></motion.div>
                     </div>
                        }
                                  {/* page 12 */}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section></AnimatedPage>


    
    </>
  );
}
