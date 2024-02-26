import React from 'react'
import './styles.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios';


const API_URL = "http://localhost:5005/parcipe"

function My_Recipes() {

    const {_id} = useParams();
    
    const [myRecipes, setMyRecipes] = useState();

    useEffect(()=>{
        axios
        .get(`${API_URL}/user/recipes/${_id}`)
        .then((response)=>{
            setMyRecipes(response.data)
            console.log(myRecipes)
        })
        .catch((error)=>console.log(`Failed to load My recipes: ${error}`))
    }, [])


  return (
    <div>
    <div id="my_recipes_main">
        <div id="my_recipes_page_title">
            <div> 
                <h4>My Recipes</h4>
            </div>
        </div>

        <div id="my_recipes_sort_by">
            <div>
                <p>Sort By:</p>
            </div>
            <div>
                <p>Name</p>
            </div>
            <div>
                <p>Difficulty</p>
            </div>
            <div>
                <p>Time</p>
            </div>
            <div>
                <p>Cuisine</p>
            </div>
        </div>

        <div id="my_recipes_sides">
            {myRecipes > 0 && (
                <div id="my_recipes_left">
                    {myRecipes.map((recipe, index) => (
                        <div id="my_recipes_recipe_left" key={index}>
                            <div id="my_recipes_name">
                                <p>{recipe.name}</p>
                            </div>
                            <div id="my_recipes_image">
                                <p>{recipe.image}</p>
                            </div>
                            <div id="my_recipes_tags">
                                <p>{recipe.tags}</p>
                            </div>
                            {/* Recipe SETTINGS + INSTRUCTIONS */}
                            <div id="my_recipes_recipe_right">
                                <div id="my_recipes_recipe_settings">
                                    <div>
                                        <p>Time: {recipe.time}</p>
                                    </div>
                                    <div>
                                        <p>Difficulty: {recipe.difficulty}</p>
                                    </div>
                                    <div>
                                        <p>Cuisine: {recipe.cuisine}</p>
                                    </div>
                                    <div>
                                        <p>Language: {recipe.language}</p>
                                    </div>
                                </div>
                                <div id="my_recipes_recipe_instructions">
                                    <p>Instructions: {recipe.instructions}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        <div>
            <div>
                {myRecipes ? myRecipes.map((titles, index) => (
                    <div key={index}>
                        <p>{titles.title}</p>
                    </div>
                )) : <p>No Recipes created</p>}
            </div>
        </div>
    </div>
    </div>
  )
}

export default My_Recipes