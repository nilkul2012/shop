import { Box } from '@mui/material'
import React from 'react'
import ClientDetail from './ClientDetail'

const ClientList = ({clients}) => {
  return (
    <Box sx={{width:'25%', height:'85vh',boxShadow:'0px 1px 6px #42428a'}}>
       {clients.map((client) => {
        // console.log(client.clientName)
        return(
        <Box
            sx={{width:'100%', height:'5vh',boxShadow:'-20px 0px 2px #93939e', p:'5px'}}
        >
            
            <h3 style={{marginLeft:'20px',cursor:'pointer'}}>
                {client.clientName}
            </h3>
        </Box>)
       })}
    </Box>
  )
}

export default ClientList