import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Home.css'
import { clearUserDetails, getToken } from '../utilities/utilities'
import axios from 'axios'
import ModalComponent from '../Components/Model'
import { Button } from '@mui/material'
import AddClient from './AddClient'
import ClientList from '../Components/ClientList'

const Home = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [clients, setClient] = useState([])
  
  
  const Logout = () => {
    clearUserDetails()
    navigate('/login')
  }
  useEffect(()=>{
    axios.get('http://localhost:4000/clients',{
      headers: {
        'authorization': `token ${getToken()}`
      }
    })
    .then((res)=> {
      setClient(res.data.clients)
      console.log(clients)
    })
    .catch((err) => {
      console.log(err?.response?.data)
      if(err?.response?.data){
        setTitle(err.response.data.code)
        setContent(err.response.data.message)
        setOpen(true)
      } else {
        setTitle(err.code)
        setContent(
          <>
            <AddClient/>
          </>
        )
        setOpen(true)
      }
    })
  },[])

  return (
    <div className='home-wrapper'>
      
      <ModalComponent open={open} title={title} content={content} handleClose={()=> setOpen(false)} ></ModalComponent>
      <div className='client-wrapper'>
      <ClientList
        clients= {clients}
      />
          {/* <tr>
            <th>Client Name</th>
            <th>Client GST Number</th>
          </tr>
        {clients.map((client, index) =>
          <>
          <tr key ={index}>
            <th>{client.clientName}</th>
            <th>{client.client_TIN}</th>
          </tr>
          </>
        )} */}
        <Button
          onClick={() => navigate('/addclient')}
        >ADD Client</Button>
      </div>
      <button onClick={Logout} >Logout</button>
    </div>
  )
}

export default Home