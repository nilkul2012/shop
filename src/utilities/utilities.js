// import React from 'react'
// import { useJwt } from "react-jwt";

export const setToSessionStorage = (key, value) =>{
    sessionStorage.setItem(key,value)
}

export const getFromSessionStorage = (key) => {
    return sessionStorage.getItem(key)
}

export const clearUserDetails = () => {
    sessionStorage.removeItem('userDetails')
}
export const getToken = () => {
    const userDetails = getFromSessionStorage('userDetails')
    const userToken = JSON.parse(userDetails)?.token
    return userToken
}

export const validateInput = (value) => {
    let validated = true;
    if(value === ''){
        validated = false
    }
    return validated
}

export const validateNumber = (value) => {
    let validated = true
    if(value === '' || isNaN(parseInt(value))){
        validated = false
    }
    return validated
}

export const validateEmail = (value) => {
    let validated = true
    if(value.indexOf('@gmail.com') === -1){
        validated = false
    }
    return validated
}

// export const handleRegister = () => {
//     if (validateInput && validateNumber &&validateEmail ) {
//       // console.log("All validation pass");
//       const inputData = {
//         username: username,
//         password: password,
//         phoneNumber: moble,
//         email: email,
//         userType: type.value,
//       };
//       // console.log("Post Data: ", inputData)
//       axios
//         .post("http://localhost:4000/signup", inputData)
//         .then(function (response) {
//           console.log(response);
//           setSuccessMsg(response.data.message);
//           setTimeout(() => {
//             navigate("/login");
//           }, 2000);
//         })
//         .catch(function (error) {
//           const { code, message } = error.response.data;
//           setErrorMsg(`${code} : ${message}`);
//         });
//     }
//   };