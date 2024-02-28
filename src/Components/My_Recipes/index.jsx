import React from 'react'
import './styles.css'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../../Context/auth.context';

const API_URL = "http://localhost:5005/parcipe"

function My_Recipes() {

    const authContext = useContext(AuthContext);
    const userId = authContext.user._id;
    const {_id} = useParams();
    const navigate = useNavigate()
    
    const [recipe, setRecipe] = useState();
    const [myRecipes, setMyRecipes] = useState([]);
    

    useEffect(()=>{
        axios
        .get(`${API_URL}/recipe/${_id}`)
        .then((response)=>{
            setRecipe(response.data)
            console.log("response.data:",response.data)
        })
        .catch((error)=>console.log(`Failed to load My recipes: ${error}`))
    }, [])

 
    useEffect(()=>{
        axios
        .get(`${API_URL}/user/recipes/${userId}`)
        .then((response)=>{
            const recipe = response.data;
            const myOtherRecipes = [];
            recipe.forEach((recipe)=>{
                if(recipe._id !== _id){
                    myOtherRecipes.push(recipe)
                }
                else if (recipe._id === _id){
                    setRecipe(recipe)
                }
                setMyRecipes(myOtherRecipes)
            })
        })
        .catch((error)=>console.log(`Failed to load My recipes: ${error}`))
    }, [_id])

    const editRecipe = ()=>{
        navigate(`/my/recipe/edit/${_id}`)
    }

    const deleteRecipe = ()=>{
        const isConfirmed = window.confirm("Delete this recipe?");
        if (isConfirmed){
            axios
                .delete(`${API_URL}/delete/recipe/${_id}`)
                .then(()=>{
                    console.log("Recipe deleted!")
                    if (myRecipes.length > 0) {
                        navigate(`/my/recipes/${myRecipes[0]._id}` || `/my/recipes/${myRecipes[1]._id}`);
                    } else {
                        navigate(`/profile/${userId}`);
                    }
                    
                })
                .catch((error)=>console.log(error))}
        else {console.log("Deletion canceled")}
    }


  return (
    <div>
    <div id="my_recipes_main">
        <div id="my_recipes_page_title">
            <div> 
                <h4>My Recipes</h4>
            </div>
        </div>

        <div id="my_recipes_options">
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
            <div id="my_recipes_edit_delete">
                <div id="my_recipes_edit">
                    <button type="button" onClick={editRecipe}>EDIT</button>
                </div>
                <div id="my_recipes_delete">
                    <button type="button" onClick={deleteRecipe}>DELETE</button>
                </div>
            </div>
        </div>

        <div id="my_recipes_sides">
            <div id="my_recipes_left">
                {recipe && 
                <div id="my_recipes_recipe_left" >
                    <div id="my_recipes_name">
                        <p>{recipe.title}</p>
                    </div>
                    {recipe.image && recipe.image.length > 0 ? (
                        <div id="my_recipes_image">
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
                    
                    <div id="my_recipes_tags">
                        <p>{recipe.tags}</p>
                    </div>
                </div>
                }
                
                    {/* Recipe SETTINGS + INSTRUCTIONS */}
                <div id="my_recipes_recipe_right">
                {recipe &&
                <div id="my_recipes_recipe_settings">
                    <div>
                        <p>Time: {recipe.time.hours}:{recipe.time.minutes}</p>
                    </div>
                    <div>
                        <p>Difficulty: {recipe.difficulty}</p>
                    </div>
                    <div>
                        <p>Servings: {recipe.servings}</p>
                    </div>
                    <div>
                        <p>Cuisine: {recipe.cuisine}</p>
                    </div>
                    <div>
                        <p>Language: {recipe.language}</p>
                    </div>
                </div>
                }
                {recipe &&
                <div id="my_recipes_recipe_instructions"> 
                    <p>{recipe.instructions}</p>
                </div>
                }
            </div>
        </div>
            <div id="my_recipes_right">
                {myRecipes ? (<>
                    {myRecipes.map((recipe, index) => (
                    <div key={index}>
                        <Link to={`/my/recipes/${recipe._id}`}><p>{recipe.title}</p></Link>
                    </div>
                ))}
                </>) : (<>
                <p>Loading...</p></>)}
            </div>
        </div>
    </div>
    </div>
  )
}

export default My_Recipes