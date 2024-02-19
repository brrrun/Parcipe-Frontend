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
        .get(`${API_URL}/recipe/${_id}`) // ERROR: THIS IS SPECIFIC RECIPE ID, NOT BY USER ID
        .then((response)=>{
            setMyRecipes(response.data)
        .catch((error)=>console.log(`Failed to load My recipes: ${error}`))
        })
    }, [])

  return (
    <div>
        <div
        id="my_recipes_main">

        <div    // Page TITLE
        id="my_recipes_page_title">
            <div> 
                <h4>My Recipies</h4>
            </div>
        </div>

        <div    // SORT BY
        id="my_recipes_sort_by">
            <div>
                <p>Sort By:</p>
            </div>
            <div>
                <p>Name</p>
            </div>
            <div>
                <p>Dificulty</p>
            </div>
            <div>
                <p>Time</p>
            </div>
            <div>
                <p>Cuisine</p>
            </div>
        </div>

        <div
        id="my_recipes_sides">

            <div    // LEFT Side - Recipes Rendering
            id="my_recipes_left">

                <div    // Recipe NAME + IMAGE
                id="my_recipes_recipe_left">

                    <div
                    id="my_recipes_name">
                        <p>Name</p>
                    </div>

                    <div
                    id="my_recipes_image">
                        <p>Image</p>
                    </div>

                    <div
                    id="my_recipes_tags">
                        <p>Tags</p>
                    </div>
                </div>

            <div    // Recipe SETTINGS + INSTRUCTIONS
            id="my_recipes_recipe_right">

                <div
                id="my_recipes_recipe_settings">
                    <div>
                        <p>Time</p>
                    </div>
                    <div>
                        <p>Dificulty</p>
                    </div>
                    <div>
                        <p>Cuisine</p>
                    </div>
                    <div>
                        <p>Language</p>
                    </div>
                </div>

                <div
                id="my_recipes_recipe_instructions">
                    <p>Instructions</p>
                </div>

            </div>
                

            </div>

            <div    // RIGHT Side - Recipes LIST
            >    
                <div>
                {myRecipes ?
                myRecipes.map((titles, index)=>(
                    <div key={index}>
                        <p>{titles.title}</p>
                    </div>
                )) : <p>No Recipes created</p>}
                </div>
            </div>

        </div>

        </div>
    </div>
  )
}

export default My_Recipes