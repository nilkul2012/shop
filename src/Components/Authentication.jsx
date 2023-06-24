
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import {getFromSessionStorage} from '../utilities/utilities'


const Authentication = (props) => {
    const navigate = useNavigate()
    const userDetails = getFromSessionStorage('userDetails')
    const userToken = JSON.parse(userDetails)?.token
    const { isExpired } = useJwt(userToken);
    return isExpired ? navigate('/login') : props.children
}

export default Authentication