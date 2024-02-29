import React from 'react'
import './styles.css'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../../Context/auth.context';

const API_URL = "http://localhost:5005/parcipe"

function My_Recipe_Edit() {

    const authContext = useContext(AuthContext);
    const userId = authContext.user._id;
    const {_id} = useParams();
    const navigate = useNavigate()
    
    const [recipe, setRecipe] = useState();
    const [myRecipes, setMyRecipes] = useState([]);
    const [editedRecipe, setEditedRecipe] = useState();
    

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
                setEditedRecipe(recipe)
                setMyRecipes(myOtherRecipes)
            })
        })
        .catch((error)=>console.log(`Failed to load My recipes: ${error}`))
    }, [])

    const editRecipe = ()=>{
        console.log(editedRecipe._id)
        const isConfirmed = window.confirm("Save changes?")
        if (isConfirmed){
            axios
            .put(`${API_URL}/edit/recipe/${_id}`, editedRecipe)
            .then(()=>{
                console.log(`${editedRecipe.title} edited!`)
                console.log(editedRecipe._id)
                navigate(`/my/recipes/${editedRecipe._id}`)
            })
        }
    }

    const deleteRecipe = ()=>{window.confirm("Can't delete recipe while in edit mode")}

    const deleteImg = (imageIndex) => {
        const isConfirmed = window.confirm("Delete this image?")
        if (isConfirmed){
            const updatedImages = [...editedRecipe.image];
            updatedImages.splice(imageIndex, 1);
            setEditedRecipe({...editedRecipe, image: updatedImages})
        }
    }
    

  return (
    <div>
    <div id="my_recipes_main">  
        <div id="my_recipes_page_title">    
            <div> 
                <h4>Edit my Recipe</h4>
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
            <div id="my_recipes_left">  {/* RECIPE LEFT */}
                {editedRecipe && 
                <div id="my_recipes_recipe_left" >  {/* RECIPE NAME + IMAGE(S) + TAG(S) */}
                    <div id="my_recipes_name">  {/* RECIPE NAME */}
                        <input type="text" required placeholder={recipe.title} onChange={(e)=>{setEditedRecipe({...editedRecipe, title: e.target.value})}}/>
                    </div>
                    {editedRecipe.image && editedRecipe.image.length > 0 ? (  /* IMAGE(S) */
                        <div id="my_recipes_image">
                        {editedRecipe.image.map((imageObj, imageIndex) => {
                            const imageDataURL = `data:image/jpeg;base64,${imageObj}`;
                            return (
                            <div key={imageIndex} style={{ position: 'relative', display: 'inline-block' }}>
                                <img src={imageDataURL} alt="Your image" style={{ width: '100%', height: 'auto' }} />
                                <button style={{ position: 'absolute', top: '1%', right: '1%', padding: '0 0.5vw', maxWidth: '2vw', maxHeight: '3vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1vw', fontWeight: 'bold', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '0%', margin: '0'}} onClick={() => deleteImg(imageIndex)}>X</button>
                            </div>
                              
                                    );
                                })}
                            </div>
                        ) : (
                            <p>No images</p>
                    )}
                    
                    <div id="my_recipes_tags">  {/* TAG */}
                        <p>{recipe.tags}</p>
                    </div>
                </div>
                }
                
                    {/* Recipe SETTINGS + INSTRUCTIONS */}
                <div id="my_recipes_recipe_right">
                {recipe &&
                <div id="my_recipes_recipe_settings">  {/* SETTINGS */}
                    <div id="my_recipes_recipe_time">  {/* TIME */}
                        <p>Time: </p>
                        <input min="0" max="99" required type="number" placeholder={recipe.time.hours} onChange={(e)=>{setEditedRecipe({...editedRecipe, time: {hours: e.target.value}})}}/>
                        <p>:</p>
                        <input min="0" max="99" required type="number" placeholder={recipe.time.minutes} onChange={(e)=>{setEditedRecipe({...editedRecipe, time: {minutes: e.target.value}})}}/>
                    </div>
                    <div id="my_recipes_recipe_difficulty">  {/* DIFFICULTY */}
                        <div>
                            <p>Difficulty:</p>
                        </div>
                        <div>
                            <select required onChange={(e)=>{setEditedRecipe({...editedRecipe, difficulty: e.target.value})}}>
                                <option disabled selected value="">{recipe.difficulty}</option>
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                    </div>
                    <div id="my_recipes_recipe_servings">  {/* SERVINGS */}
                        <div>
                            <p>Servings: </p>
                        </div>
                        <div>
                            <input min="0" max="99" type="number" placeholder={recipe.servings} onChange={(e)=>{setEditedRecipe({...editedRecipe, servings: e.target.value})}}/>
                        </div>
                    </div>
                    <div id="my_recipes_recipe_cuisine">  {/* CUISINE */}
                        <div>
                            <p>Cuisine:</p>
                        </div>
                        <div>
                        <select onChange={(e)=>{setEditedRecipe({...editedRecipe, language: e.target.value})}}>
                            <option disabled selected value="">{recipe.language? `${recipe.language}` : "select" }</option>
                            <option>portuguese</option>
                            <option>spanish</option>
                            <option>italian</option>
                            <option>french</option>
                            <option>unspecified</option>
                            <option>other</option>
                        </select>
                        </div>
                    </div>
                    <div id="my_recipes_recipe_language">  {/* LANGUAGE */}
                        <div>
                            <p>Language: {recipe.language}</p>
                        </div>
                        <div>
                        <select onChange={(e)=>{setEditedRecipe({...editedRecipe, language: e.target.value})}}>
                                <option disabled selected value="">{recipe.language? `${recipe.language}` : "select" }</option>
                                <option>english</option>
                                <option>portuguese</option>
                                <option>other</option>
                            </select>
                        </div>
                    </div>
                </div>
                }
                {recipe &&
                <div id="my_recipes_recipe_instructions">  {/* INSTRUCTIONS */}
                    <input type="text" value={`${recipe.instructions}`} onChange={(e)=>{setEditedRecipe({...editedRecipe, instructions: e.target.value})}} />
                </div>
                }
            </div>
        </div>
            <div id="my_recipes_right">  {/* OTHER RECIPES */}
                {myRecipes ? (<>
                    {myRecipes.map((recipe, index) => (
                    <div key={index}>
                        <p>{recipe.title}</p>
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

export default My_Recipe_Edit