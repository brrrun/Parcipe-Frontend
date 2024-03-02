import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/auth.context';
import './styles.css';

function Navbar() {

    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext.isLoggedIn;
    const { _id } = authContext.user || {};

    const logout = () => {
        authContext.logOut();
      }


  return (
    <div id="navbar">

        <div class="navbar_links">
            <Link to="/"> Homepage </Link>
        </div>

        {isAuthenticated? ( <>
            
            <div class="navbar_links"> 
                <Link to="/new"> Add Recipe </Link>
            </div>
            <div class="navbar_links">
                <Link to={`/my/recipes/${_id}`}> My Recipes </Link>
            </div>
            <div class="navbar_links">
                <Link to="/view/recipe/:_id"> ONE </Link>
            </div>
            <div class="navbar_links">
                <Link to="/my/recipe/edit/:_id">EDIT</Link>
            </div>
            <div class="navbar_links">
                <Link to={`/profile/${_id}`}> Profile </Link>
            </div>
            <div class="navbar_links">
            <   Link onClick={logout} to="/">Logout</Link>
            </div>

        </>) : (<>

            <div class="navbar_links">
                <Link to="/login">Login</Link>
            </div>
            <div class="navbar_links">
                <Link to="/sign/up">Sign_Up</Link>
            </div>

        </>)}
    </div>
  )
}

export default Navbar