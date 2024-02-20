import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './Components/Navbar'
import Homepage from './Components/Homepage'
import Add_Recipe from './Components/Add_Recipe'
import My_Recipes from './Components/My_Recipes'
import One_Recipe from './Components/One_Recipe'
import Login from './Components/Authentication/Login'
import Sign_Up from './Components/Authentication/Sign_Up'
import Profile from './Components/Profile_Page';

function App() {

  return (
  <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/new" element={<Add_Recipe/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sign/up" element={<Sign_Up/>}/>
      <Route path="/my/recipes/:_id" element={<My_Recipes/>}/>
      <Route path="/view/recipe/:_id" element={<One_Recipe/>} />
      <Route path="/profile/:_id" element={<Profile/>}/>
    </Routes>
  </div>
  )
}

export default App
