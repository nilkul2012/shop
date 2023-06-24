import React, { useState } from "react";
import Box from "@mui/material/Box";
import "../Styles/Signup.css";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const dropdownValues = [
    { name: "Admin", value: "ADMIN" },
    { name: "User", value: "USER" },
    { name: "Guest", value: "GUEST" },
  ];

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  const handleChange = (data) => {
    setType(data);
  };

  const validateFills = () => {
    let valadation = true;
    if (username === "" && valadation) {
      setErrorMsg("Please enter user name.");
      valadation = false;
    } else if (password === "" && valadation) {
      setErrorMsg("Please enter password.");
      valadation = false;
    } else if (password !== repassword && valadation) {
      setErrorMsg("Password didn't match.");
      valadation = false;
    } else if (mobile === "" && valadation) {
      setErrorMsg("Please enter Mobile No.");
      valadation = false;
    } else if (mobile.toString().length < 10 || mobile.toString().length > 10) {
      setErrorMsg("Please check mobile no!");
      valadation = false;
    } else if (email === "" && valadation) {
      setErrorMsg("Please enter Email.");
      valadation = false;
    } else if (type === "" && valadation) {
      setErrorMsg("Please select type!");
      valadation = false;
    } else {
      setErrorMsg("");
    }
    return valadation;
  };

  const handleClick = () => {
    if (validateFills()) {
      const inputData = {
        username: username,
        password: password,
        phoneNumber: mobile,
        email: email,
        userType: type.value,
      };
      axios
        .post("http://localhost:4000/signup", inputData)
        .then(function (response) {
          setSuccessMsg(response.data.message);
          setTimeout(() => {
            navigate("/Login");
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
        <TextField
          sx={{
            m: "5px",
            width: { xs: "90%", md: "45%" },
          }}
          id="outlined-basic"
          label="UserName"
          variant="outlined"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <FormControl
          className="field2"
          sx={{
            m: "5px",
            width: { xs: "90%", md: "45%" },
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl
          className="field2"
          sx={{
            m: "5px",
            width: { xs: "90%", md: "45%" },
            height: { md: "8%" },
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Re-Password
          </InputLabel>
          <OutlinedInput
            error={!(repassword === password)}
            value={repassword}
            onChange={(e) => {
              setRepassword(e.target.value);
            }}
            id="outlined-adornment-password"
            type={showPassword2 ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword2}
                  edge="end"
                >
                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Re-Password"
          />
        </FormControl>
        <TextField
          id="outlined-number"
          label="Mobile Number"
          type="number"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
          sx={{
            m: "5px",
            width: { xs: "90%", md: "45%" },
          }}
        />
        <TextField
          id="outlined-email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          sx={{
            width: { xs: "90%", md: "92%" },
          }}
        />
        <FormControl
          sx={{
            width: { xs: "90%", md: "92%" },
          }}
        >
          <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="User Type"
            value={type.name}
          >
            {dropdownValues.map((data, i) => (
              <MenuItem
                onClick={() => handleChange(data)}
                value={data.value}
                key={i}
              >
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          className="reg-btn"
          sx={{
            width: { xs: "70%", md: "45%" },
            height: { md: "10%" },
          }}
          variant="contained"
          onClick={handleClick}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
