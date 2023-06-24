import React, { useState } from "react";
import Box from "@mui/material/Box";
import "../Styles/Signup.css";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserName from "../Components/UserName";
import Password from "../Components/Password";
import SimpleTextField from "../Components/SimpleTextField";
import DropDowns from "../Components/DropDowns";
import Btn from "../Components/Btn";

const Signup = ({type}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [moble, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");  

  const navigate = useNavigate();

  const validateFields = () => { 
    let validation = true;
    if (username === "" && validation === true) {
      validation = false;
      setErrorMsg("Please enter the username");
    } else if (password === "" && validation) {
      validation = false;
      setErrorMsg("Please enter the Password");
    } else if (password !== repassword && validation) {
      validation = false;
      setErrorMsg("Password didnot match");
    } else if (moble === "" && validation) {
      validation = false;
      setErrorMsg("Please enter mobile number");
    } else if (email === "" && validation) {
      validation = false;
      setErrorMsg("Please enter email address");
    } else if (type === "" && validation) {
      validation = false;
      setErrorMsg("Please select user type");
    } else {
      setErrorMsg("");
    }
    return validation;
  };
  const handleRegister = () => {
    if (validateFields()) {
      // console.log("All validation pass");
      const inputData = {
        username: username,
        password: password,
        phoneNumber: moble,
        email: email,
        userType: type.value,
      };
      // console.log("Post Data: ", inputData)
      axios
        .post("http://localhost:4000/signup", inputData)
        .then(function (response) {
          console.log(response);
          setSuccessMsg(response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })
        .catch(function (error) {
          const { code, message } = error.response.data;
          setErrorMsg(`${code} : ${message}`);
        });
    }
  };
  return (
    <Box className="main">
      <Box
        className="sigin"
        sx={{
          width: { xs: "80%", md: "40%" },
          height: { xs: "80%", md: "80%" },
          top: { xs: "10%", md: "15%" },
          right: { xs: "10%", md: "30%" },
        }}
      >
        <h3 className="heading">SignUp</h3>
        {(errorMsg || successMsg) && (
          <Box
            id="msg"
            sx={{
              width: { md: "92%" },
              height: { md: "10%" },
            }}
          >
            {errorMsg === "" ? null : (
              <Alert severity="error">{errorMsg}</Alert>
            )}
            {successMsg === "" ? null : (
              <Alert severity="info">{successMsg}</Alert>
            )}
          </Box>
        )}
        <UserName
          value= {username}
          onchange= {(e) => setUsername(e.target.value)}
          name=  'UserName'
          sx={{
            m: "5px",
            width: { xs: "90%", md: "45%" },
          }}
        />
        
        <Password
          value = {password}
          name = 'Password'
          onchange ={(e) => setPassword(e.target.value)}
          sx={{
            m: "5px",
            width: { xs: "90%", md: "45%" },
          }}

        />
        <Password
          value = {repassword}
          name = 'Re-Password'
          onchange ={(e) => setRepassword(e.target.value)}
          sx={{
            m: "5px",
            width: { xs: "90%", md: "45%" },
          }}
        />
        <SimpleTextField
          name="Mobile Number"
          type= 'text'
          value={moble}
          onchange={(e) => {setMobile(e.target.value)}}
          sx={{m: "5px", width: { xs: "90%", md: "45%" }}}
        />
        <SimpleTextField
          name="Email"
          type= 'text'
          value={email}
          onchange={(e) => {setEmail(e.target.value)}}
          sx={{width: { xs: "90%", md: "92%" }}}
        />
        <FormControl sx={{width: { xs: "90%", md: "92%" }}}>
          <DropDowns
            name="User Type"
          />
        </FormControl>
        <Btn
          name='Register'
          sx={{width: { xs: "70%", md: "45%" },height: { md: "10%" }}}
          variant="contained"
          onclick={handleRegister}
        />
      </Box>
    </Box>
  );
};

export default Signup;
