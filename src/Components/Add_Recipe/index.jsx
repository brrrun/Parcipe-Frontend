import React, { useEffect, useContext } from 'react'
import './styles.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import MyDropzone from './dropzone';
import { AuthContext } from '../../Context/auth.context';

const API_URL = "https://parcipe-backend.onrender.com"
//const API_URL = "http://localhost:5005/parcipe"

function Add_Recipe() { 

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const author = authContext.user.username;
    const authorId = authContext.user._id;

    const [newRecipe, setNewRecipe] = useState({ 
        title: "",
        tags: [],
        time: {
            hours: 0,
            minutes: 0,
        },
        servings: 0,
        difficulty: "",
        ingredients: [], 
        language: "",
        cuisine: "",
        image: [],
        instructions: "",
        user: `${author}`,
    });
    
    const [addIngredient, setAddIngredient] = useState({
        name: "",
        amount: 0,
        unit: "",
    });

    const [errorMsg, setErrorMsg] = useState(null);

    const updateErrorMsg = (newErrorMsg) => {
        setErrorMsg(newErrorMsg)
    };

            // Converts images to Uint8 and adds them to the newRecipe State
    const updateNewRecipe = (newImageRecipe) => {
        newImageRecipe.forEach(file => {
            const reader = new FileReader();
    
            reader.onload = function () {
                // Convert the file to Uint8Array
                const uint8Array = new Uint8Array(reader.result);
                console.log("uint8Array:", uint8Array);
    
                // Update the state to append the new image
                setNewRecipe((prevNewRecipe) => ({
                    ...prevNewRecipe,
                    image: [...prevNewRecipe.image, uint8Array]
                }));
            };
            reader.readAsArrayBuffer(file);
        });
    };
    
    const uint8ArrayToBase64 = (uint8Array) => {
        const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        return btoa(binaryString);
    };

        // Handles the creation of the recipe
    const handleCreatedRecipe = (e) =>{
        e.preventDefault();

        if(!newRecipe.title || !newRecipe.difficulty || !newRecipe.servings){
            setErrorMsg("Mandatory information is missing. Please update before publishing.") 
        } else if (newRecipe.time.hours === 0 && newRecipe.time.minutes === 0){
            setErrorMsg("Recipe must take some time to prepare")
        } else if(newRecipe.ingredients.length < 2){
            setErrorMsg("Please add at least two ingredients")
        } else if (newRecipe.instructions.length < 40){
            setErrorMsg("Instructions must be at least 40 characters long")
        } else {
        
            const imagesBase64 = newRecipe.image.map(uintArray => uint8ArrayToBase64(uintArray));
        
            const recipeWithBase64 = {
                ...newRecipe,
                image: imagesBase64,
                creator: authorId
            };
    axios
        .post(`${API_URL}/new`, recipeWithBase64)
        .then(()=>{
            console.log(`Recipe successfully created`)
            navigate("/")
        })
        .catch((error)=>{
            console.log(`ERROR: ${error}`)})
    }};


  return (
    <div id="add_recipe_main">
    <div id="add_recipe_container">

    

        {/*<div    // Page TITLE
            id="add_recipe_page_title">
                                <div> 
                                    { // TEST YOUR BUTTON HERE ---------------------------------------------- REPLACE BY TITLE HERE
                                    newRecipe.time.hours ?  
                                        <p>{newRecipe.time.hours}</p>
                                        : <p>Write down your recipe</p>
                                    }
                                </div>
                                </div>*/}

        <div    // PUBLISH & DRAFT Buttons
            id="add_recipe_publish">
            <div>
                <button
                    onClick={handleCreatedRecipe}>
                    Publish
                </button>
            </div>
            <div>
                <button>
                    Draft
                </button>
            </div>
            <div>
            <p>{errorMsg}</p>
            </div>
        </div>
        
        <div id="add_recipe_sides_main">

        <div                // --- LEFT SIDE
            id="add_recipe_left">

            <div            // Recipe TITLE
                id="add_recipe_title">
                <div>
                    <p>Title:<span class="mandatory">*</span></p>
                </div>
                <div>
                    <input 
                        type="text"
                        onChange={(e)=>{
                            setNewRecipe((prevNewRecipe)=>({
                                ...prevNewRecipe,
                                title: e.target.value
                            }))
                        }} />
                </div>
            </div>    

            <div            // Recipe TAGS
                id="add_recipe_tags">
                <div>
                    <p>Tags:</p>
                </div>
                <div>
                    <input 
                        type="text" 
                        onKeyDown={
                            (e)=>{ if (e.key === "Enter" && e.target.value.length > 0 && newRecipe.tags.length <= 2) {
                                    const newTag = e.target.value;
                                    setNewRecipe((prevNewRecipe) => ({ ...prevNewRecipe, tags: [...prevNewRecipe.tags, newTag] }));
                                    e.target.value = "";
                                    }
                                else if (newRecipe.tags.length > 2){
                                    setErrorMsg("You can only add up to 3 tags")
                                    }
                                }
                            } 
                        placeholder={newRecipe.tags.length === 0 ? "Add a tag" : newRecipe.tags.length <= 2 ? "Add another?" : ""}/>
                </div>
                <div>
                    {newRecipe.tags.length > 0 ? (
                    <div id="add_recipe_tags_each">
                        {newRecipe.tags.map((tag, index) => (
                            <div key={index}>
                                <p>{tag}</p>
                            </div>
                        ))}
                    </div>
                        ) : (
                    ""
                )}
                </div>
            </div>         

            <div            // Recipe TIME, SERVINGS & DIFFICULTY
                id="add_recipe_time_servings_difficulty">

                <div           // Recipe TIME
                    id="add_recipe_time">
                    <div id="add_recipe_time_p1">
                        <p>Time:<span class="mandatory">*</span></p>
                    </div>
                    <div>
                        <input 
                            type="number"
                            min="0"
                            max="99"
                            required
                            onChange={(e)=>{
                                setNewRecipe((prevNewRecipe)=>({
                                    ...prevNewRecipe,
                                    time: {
                                        ...prevNewRecipe.time,
                                        hours: e.target.value
                                    }
                                }))
                            }} />
                    </div>
                    <div id="add_recipe_time_p2">
                        <p>h</p>
                    </div>
                    <div>
                        <input 
                            type="number"
                            min="0"
                            max="59"
                            required
                            onChange={(e)=>{
                                setNewRecipe((prevNewRecipe)=>({
                                    ...prevNewRecipe,
                                    time: {
                                        ...prevNewRecipe.time,
                                        minutes: e.target.value
                                    }
                                }))
                            }} />
                    </div>
                    <div id="add_recipe_time_p3">
                        <p>min</p>
                    </div>
                </div>

                <div            // Recipe SERVINGS
                    id="add_recipe_servings">
                    <div>
                        <p>Servings:<span class="mandatory">*</span></p>
                    </div>
                    <div>
                        <input 
                            type="number"
                            min="0"
                            max="99"
                            required
                            onChange={(e)=>{
                                setNewRecipe((prevNewRecipe)=>({
                                    ...prevNewRecipe,
                                    servings: e.target.value
                                }))
                            }} />
                    </div>
                </div>

                <div            // Recipe DIFFICULTY
                    id="add_recipe_difficulty">
                    <div>
                        <p>Difficulty:<span class="mandatory">*</span></p>
                    </div>
                    <div>
                        <select
                        required 
                        onChange={(e)=>{
                            setNewRecipe((prevNewRecipe)=>({
                                ...prevNewRecipe,
                                difficulty: e.target.value
                            }))
                        }}>
                            <option disabled selected value="">Select</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                </div>
            </div>

            <div            // INGREDIENTS
                id="add_recipe_ingredients">
                <div
                    id="add_recipe_ingredients_title"> 
                    <p>Ingredients<span class="mandatory">*</span></p>
                </div>

                <div id="add_recipe_ingredients_options">
                    <div id="add_recipe_ingredients_p1">
                        <p>Name:</p>
                    </div>
                    <div>
                        <input      /* Ingredient'S NAME */
                            id="add_recipe_ingredients_inp1"
                            type="text"  
                            onChange={(e)=>{
                                setAddIngredient((prevaddIngredient)=>({
                                    ...prevaddIngredient,
                                    name: e.target.value
                                }))
                            }}/>
                    </div>
                    
                    <div id="add_recipe_ingredients_p2">
                        <p>Amount:</p>
                    </div>
                    <div>
                        <input      /* Ingredient'S AMOUNT */
                            id="add_recipe_ingredients_inp2"
                            type="number"  
                            min="0"
                            onChange={(e)=>{
                                setAddIngredient((prevAddIngredient)=>({
                                    ...prevAddIngredient,
                                    amount: e.target.value
                                }))
                            }}/>
                    </div>
                    
                    <div id="add_recipe_ingredients_p3">
                        <p>Units</p>
                    </div>
                    <div>
                        <select         /* Ingredient'S UNIT */
                            type="text"  
                            onChange={(e)=>{
                                setAddIngredient((prevAddIngredient)=>({
                                    ...prevAddIngredient,
                                    unit: e.target.value
                                }))
                            }}> 
                                <option disabled selected defaultValue="">Select Unit</option>
                                <option value="ml"> ml </option>
                                <option value="L"> L </option>
                                <option value="g"> grams </option>
                                <option value="kg"> Kgs </option>
                                <option value="tsp"> stp </option>
                                <option value="tbsp"> tbsp </option>
                                <option value="cup"> cups </option>
                                <option value="piece"> pieces </option>
                                <option value="slice"> slices </option>
                            </select>
                    </div>
                    
                    <div>
                        <button /* Saves the user's whole ingredient input Object on the Recipe State,
                                if the values for each key meet the requirements */
                        onClick={()=>{  
                            if(addIngredient.name !== "" && addIngredient.amount > 0 && addIngredient.unit !== ""){
                                setNewRecipe((prevNewRecipe) =>({
                                    ...prevNewRecipe,
                                    ingredients: [
                                        ...prevNewRecipe.ingredients,
                                        {
                                            name: addIngredient.name,
                                            amount: addIngredient.amount,
                                            unit: addIngredient.unit }],
                                }))
                                console.log("INGREDIENT ADDED")
                                } else {
                                    console.log("Ingredients input error")
                                }
                        }}>Add</button>
                    </div>
                </div>

                <div            // INGREDIENTS RENDERING
                id="add_recipe_ingredients_rendering">
                    {newRecipe.ingredients ?  
                    newRecipe.ingredients.map((ingredient, index)=>(
                        <div key={index}>
                            <p>{ingredient.name}: {ingredient.amount}{ingredient.unit}</p>
                        </div>
                    ))
                    : <p>Add your first ingredient</p>
                    }
                </div>
            </div>
            </div>

            <div            // ---- RIGHT SIDE
                id="add_recipe_right">
                <div id="add_recipe_options">
                    <div id="add_recipe_options_left">

                        <div    // IMAGE
                            id="add_recipe_image">
                                <MyDropzone updateErrorMsg={updateErrorMsg} updateNewRecipe={updateNewRecipe}></MyDropzone>
                        </div>

                        <div    // LANGUAGE
                            id="add_recipe_language">
                            <div>
                                <p>Language:</p>
                            </div>
                            <div>
                                <select
                                    onChange={(e)=>{
                                        setNewRecipe((prevNewRecipe)=>({
                                            ...prevNewRecipe,
                                            language: e.target.value
                                        }))
                                    }}>
                                        <option disabled selected value="">Select</option>
                                        <option>english</option>
                                        <option>portuguese</option>
                                        <option>other</option>
                                </select>
                            </div>
                        </div>

                        <div    // CUISINE
                            id="add_recipe_cuisine">
                            <div>
                                <p>Cuisine:</p>
                            </div>
                            <div>
                                <select
                                onChange={(e)=>{
                                    setNewRecipe((prevNewRecipe)=>({
                                        ...prevNewRecipe,
                                        cuisine: e.target.value
                                    }))
                                }}>
                                    <option disabled selected value="">Select</option>
                                    <option>portuguese</option>
                                    <option>spanish</option>
                                    <option>italian</option>
                                    <option>french</option>
                                    <option>unspecified</option>
                                    <option>other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div    // IMAGES PREVIEW 
                    id="add_recipe_options_right">
                        <div
                        id="add_recipe_preview"> 
                        {newRecipe.image && newRecipe.image.length > 0 ? (
                            newRecipe.image.map((uint8Array, index) => {
                                // Convert Uint8Array to Base64-encoded data URL
                                const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
                                const base64String = btoa(binaryString);
                                const imageUrl = `data:image/jpeg;base64,${base64String}`;

                                return (
                                    <div key={index} id="all_recipes_img">
                                        <img
                                            src={imageUrl}
                                            alt={`recipe-image-${index}`}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <p>No images added</p>
                        )}




                        </div>
                    </div>
                </div>

                <div                // INSTRUCTIONS
                    id="add_recipe_instructions">
                        <div>
                            <p>Instructions:<span class="mandatory">*</span></p>
                        </div>
                        <div>
                            <textarea   
                            placeholder="your yummi recipe here..."
                            onChange={(e)=>{
                                setNewRecipe((prevNewRecipe)=>({
                                    ...prevNewRecipe,
                                    instructions: e.target.value
                                }))
                            }}></textarea>
                        </div>
                </div>

            </div>
        </div>
    </div>
    </div>
  )
}

export default Add_Recipe