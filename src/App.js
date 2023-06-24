import Login from './Pages/Login';
// import Forget from './Pages/Forget';
import Home from './Pages/Home';
import './Styles/App.css'
import {Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup';
import AddClient from './Pages/AddClient';
import Authentication from './Components/Authentication';
// import Signup from './Pages/try';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path='/login' element = {<Login/>}/>
        <Route path='/home' element = {<Authentication><Home/></Authentication>}/>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='/addclient' element = {<AddClient/>}/> 
    </Routes>
    </>
  );
}

// function Auth(props) {
//   return props.children
// }

export default App;
