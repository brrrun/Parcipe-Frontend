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
    <div>
        <h1>Profile</h1>

        <div 
        id="profile_data">
            {profile? (
                <div>
                    <div>
                        <p>{profile.username}</p>
                    </div>
                    <div>
                        <p>{profile.email}</p>
                    </div>
                    <div>
                        {profile.createdRecipes.map((recipe, index)=>{
                            return (
                                <div key={index}>
                                    <Link><p>{recipe.title}</p></Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    </div>
  )
}

export default Profile