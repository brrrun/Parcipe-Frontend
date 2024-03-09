import React from 'react'
import "./styles.css"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

//const API_URL = "https://parcipe-backend.adaptable.app/parcipe"
const API_URL = "http://localhost:5005/parcipe"

function One_Recipe() {

    const {_id} = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState();
    const [allRecipes, setAllRecipes] = useState();


    useEffect(() => {
    /*axios
        .get(`${API_URL}/recipe/${_id}`)
        .then((response) => {
            setRecipe(response.data)
            console.log(`Recipe "${_id}" found!`)
        })
        .catch((error) => console.log(error));*/



// --------- ADICIONAR IMAGEM PARA LOADING TIME AQUI 
        if (!recipe){
            console.log("Loading...")
        }
    axios
        .get(`${API_URL}/recipes`)
        .then((response) => {
            const otherRecipes = [];
            const recipes = response.data
                // Fetches and saves recipe with URL _id within a State
                // And saves all other recipes within another State
                recipes.map((recipe, index)=>{
                if(recipe._id === _id){
                    setRecipe(recipe)
                    console.log("recipe:", recipe)
                } else {
                    otherRecipes.push(recipe)
                }
            })
            setAllRecipes(otherRecipes);
        })
        .catch((error) => console.log(error));

}, [_id]);

    /*useEffect(()=> {
        axios
        .get(`${API_URL}/recipes`)
        .then((response) => {
            setAllRecipes(response.data);
            console.log("All Recipes found!");
        })
        .catch((error) => console.log(error));
}, []);*/
 

  return (
    <div
    id="one_main">

        <div    // ---- LEFT Side (Ingredients, Image, Side, Instructions)
        id="one_left">
            
            <div    // TITLE
            id="one_title">
                <h2>{recipe? recipe.title : "Loading..."}</h2>
            </div>

        <div
        id="one_box">

            <div    // IMAGE + SETTINGS
            id="one_box_left">

                <div id="one_top_images_container">
                    {recipe && recipe.image.length > 0 ? (
                        <div    // IMAGE
                        class="one_top_images">
                        {recipe.image.map((imageObj, index)=>{
                            
                            const imageDataURL = `data:image/jpeg;base64,${imageObj}`;
                            return (
                                <div key={index}>   
                                    <img src={imageDataURL} alt="Your image"/>
                                </div>
                            );
                            })}
                        </div>
                    ) : ( 
                        <div class="one_top_images">
                            <img src="../../../../public/images/01 recipe default.jpg"/> 
                        </div>
                    )}
                </div>

                <div    // CUISINE +TAGS + LANGUAGE
                    id="one_top_side">

                        <div    // CUISINE 
                        id="one_cuisine"> 
                            <p>Cuisine: 
                                {recipe && recipe.cuisine && recipe.cuisine.length > 0
                                    ? recipe.cuisine
                                    : "not specified"}
                                </p> 
                        </div> 
                        <div    // TAGS
                        id="one_tags">
                            <p>Tags: 
                                {recipe && recipe.tags && recipe.tags.length > 0 
                                ? recipe.tags.map((tag, index)=>(
                                    <div key={index}>
                                        {tag}
                                    </div>
                                ))
                                : "not specified"}</p>
                        </div>
                        <div    // LANGUAGE
                        id="one_language">
                            <p>Language: 
                                {recipe && recipe.language && recipe.language.length >0
                                ? recipe.language 
                                : "not specified"}</p>
                        </div>
                    </div>
            </div>

            <div    // INGREDIENTS + INSTRUCTIONS   
            id="one_box_right">
                <div
                    id="one_recipe">
    
                    <div    // INGREDIENTS
                    id="one_recipe_top">
                        <div>
                            <h5>Ingredients</h5>
                        </div>
                        <div>
                        {recipe?
                        recipe.ingredients.map((ingredient, index)=>(
                            <div key={index}>
                                <div>
                                    <p>{`${ingredient.name}: ${ingredient.amount}${ingredient.unit}`}</p>
                                </div>
                            </div>
                        ))  
                        : "Loading..." 
                        }
                        </div>
                    </div>
            
                    <div    // INSTRUCTIONS
                    id="one_recipe_bottom">
                        <div>
                            <h5>Ingredients</h5>
                        </div>
                        {recipe && recipe.instructions && recipe.instructions.length >0
                        ? recipe.instructions
                        : "Loading..."}
                    </div>

                </div>
            </div>

            
    </div>
    
</div>

        <div        // ---- RIGHT Side (Recipes List)
        id="one_right">
            <div>
                <h4>Other Recipes</h4>
            </div>
            <div>
            {allRecipes ?
                <div id="one_recipes_list_container">

                    {allRecipes.map((recipe, index) => (
                        <div key={index} id="one_right_each">

                            <div    // TITLE
                            id="one_recipes_titles">
                                <Link to={`/view/recipe/${recipe._id}`}><h6>{recipe.title}</h6></Link>
                            </div>
                            
                            <div    // DIFFICULTY + TIME
                            id="one_recipes_settings">
                                <div    // DIFFICULTY
                                >
                                    <p>{recipe.difficulty}</p>
                                </div>
                                <div    // TIME
                                >
                                    <p>{recipe.time.hours}:{recipe.time.minutes}min</p>
                                </div>
                            </div>

                            <div    // IMAGE(s)
                            id="one_recipes_images">
                                {recipe.image && recipe.image.length > 0 ? (
                                    <div id="one_recipes_container_1">
                                    {recipe.image.map((imageObj, index) => {
                                        const imageDataURL = `data:image/jpeg;base64,${imageObj}`;
                                        return (
                                            <div key={index}>
                                                <img src={imageDataURL} alt="Your image" />
                                            </div>
                                        );
                                    })} </div>
                                ) : (
                                    <div id="one_recipes_container_2">
                                        <img src="../../../../public/images/01 recipe default.jpg" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                : null
            }
            </div> 
        </div>
    </div>
  )
}

export default One_Recipe