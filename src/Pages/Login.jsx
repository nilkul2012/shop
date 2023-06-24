import React, {useState} from "react";
import Box from "@mui/material/Box";
import "../Styles/Login.css";
// import InputAdornment from "@mui/material/InputAdornment";
// import FormControl from "@mui/material/FormControl";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import InputLabel from "@mui/material/InputLabel";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { setToSessionStorage } from "../utilities/utilities";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import {getFromSessionStorage} from '../utilities/utilities'
import Password from "../Components/Password";
import UserName from "../Components/UserName";

const Login = () => {
  const navigate = useNavigate()
  const [userid, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const userDetails = getFromSessionStorage('userDetails')
  const userToken = JSON.parse(userDetails)?.token
  const { isExpired } = useJwt(userToken);

  
  const callLogin = () => {
    axios.post('http://localhost:4000/login',{
      username: userid,
      password: password
    }).then(response => {
      setToSessionStorage('userDetails', JSON.stringify(response.data))
      // console.log(response)
      navigate('/home')
    })
    .catch(error => {
      console.log(error)
    })
  }
  const loginAction = () => {
    (userid !== '' && password !== '') ? callLogin() : setError('Please enter user name & password')
  }

  if(!isExpired) navigate('/home')

  
  return (
    <Box className="main">
      <Box className="login"
        sx={{
          width:{xs:'75%',sm:'75%',md:'25%'},
          height:{xs:'80%',sm:'80%',md:'fit-content'},
          top:{xs:'10%',sm:'10%',md:'20%'},
          right:{xs:'10%',sm:'10%',md:'30%'}
        }}
      
      >
        <h3 className="heading">Login</h3>
        <UserName
          sx={{width:'98%',mt:'15px'}}
          value = {userid}
          onchange = {(e)=>setUserId(e.target.value)}
          name='UserName'
        />
        <Password
          value = {password}
          name = 'Password'
          onchange ={(e) => setPassword(e.target.value)}
          sx={{width:'98%', mt: "15px" }}
        />
        <Button 
          className="btn" 
          onClick={loginAction}
          sx={{ mt: "30px" }} 
          variant="contained"
        >
          Login
        </Button>
        <div className="links">
          <Link to = '#'>ForgetPassword</Link>
          <Link to = "/signup">SignUp</Link>
        </div>
        {error === '' ? null : 
          <Alert severity="error">{error}</Alert>
        }
      </Box>
    </Box>
  );
};
export default Login;
