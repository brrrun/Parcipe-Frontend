import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./styles.css"

//const API_URL = "https://parcipe-backend.adaptable.app/parcipe"
const API_URL = "https://localhost:5005/parcipe"

function Homepage() {

  const [allRecipes, setAllRecipes] = useState(); 
  const navigate = useNavigate()

  useEffect(()=>{
      axios
      .get(`${API_URL}/recipes`)
      .then((response) =>{
          setAllRecipes(response.data)
      })
      .catch((error)=>console.log(error))
  }, [])

    

  return (
    <div id="all_recipes_main">
    <div    // GRID
    id="all_recipes_grid">
           
                {allRecipes && allRecipes.length > 0 ? ( 
                allRecipes.map((recipe, recipeIndex) => (

                <div
                id="all_recipes_each"
                key={recipeIndex}>
                    
                    <div    // Title
                    id="all_recipes_title">
                        <Link to={`/view/recipe/${recipe._id}`}><h3>{recipe.title}</h3></Link>
                    </div>

                    <div    // Difficulty + Time
                    id="all_recipes_settings">

                        <div
                        id="all_recipes_difficulty">
                            <h6>Difficulty:</h6>
                            <p> {recipe.difficulty}</p>
                        </div>

                        <div
                        id="all_recipes_time">
                            <h6>Time:</h6> 
                            {recipe.time.hours > 0 && 
                                <p> {recipe.time.hours}h</p>
                            }
                            {recipe.time.minutes > 0 &&
                                <p>{recipe.time.minutes}min</p>
                            }
                        </div>
                    </div>
                    

                    <div    // Images
                    id="all_recipes_img">
                        {recipe.image && recipe.image.length > 0 ? (
                            <div id="all_recipes_container">
                                {recipe.image.map((imageObj, imageIndex) => {
                                    const imageDataURL = `data:image/jpeg;base64,${imageObj}`;
                                    return (
                                        <div key={imageIndex}>   
                                            <img src={imageDataURL} alt="Your image" />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <img src="../../../../public/images/01 recipe default.jpg" />
                        )}
                        </div>

                    </div>
            ))
        ) : (
            <p>No recipes yet</p>
        )}
            
    </div>  
    </div>
  )
}

export default Homepage