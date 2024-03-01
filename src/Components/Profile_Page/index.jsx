import React, {useContext} from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/auth.context';

const API_URL = "http://localhost:5005/parcipe"


function Profile() {

const navigate = useNavigate();

const { _id } = useParams();
const [profile, setProfile] = useState();

useEffect(() => { 
    axios
    .get(`${API_URL}/profile/${_id}`)
    .then((response) => {
        setProfile(response.data)
        return response;
    })
    .catch((error) => console.log(error))
}, [])


  return (
    <div id="profile_root">
        <div 
        id="profile_left">
            <div id="profile_properties">
                <div>
                    <p>Username: {profile && profile.username}</p>
                </div>
                <div>
                    <p>Email: {profile && profile.email}</p>
                </div>
                <div>
                    <p>Created {profile && profile.createdRecipes.length} recipes!</p>
                </div>
            </div>
            <div id="profile_shopping">
                <div>
                    <h5>Shopping List:</h5>
                </div>
                {profile? (
                <div>
                    {profile.shoppingList.map((item, index)=>{
                        return (
                        <div id="profile_shopping_each">
                            <div key={index}>
                                <p>{item.name} :</p>
                            </div>
                            <div>
                                <p>{item.amount}</p>
                            </div>
                            <div>
                                <p>{item.unit}</p>
                            </div>
                        </div>
                        ) 
                    })} 
                </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>

        <div id="profile_right">
            {profile? (
            <div id="profile_my_recipes">
                {profile.createdRecipes.map((recipe, index)=>{
                    return (
                        <div key={index} id="profile_my_recipes_each">
                            <Link to={`/my/recipes/${recipe._id}`}><p>{recipe.title}</p></Link>
                        </div>
                    ) 
                })} 
            </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    </div>
  )
}

export default Profile