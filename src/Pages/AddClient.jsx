import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import ModalComponent from "../Components/Model";
import { getToken } from "../utilities/utilities";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [gstnum, setGstnum] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addClientAction = () => {
    const clientData = {
      clientName: clientName,
      client_TIN: gstnum,
      phoneNumber: contact,
      email: email,
      address: address,
    };

    axios
      .post("http://localhost:4000/clients", clientData, {
        headers: {
          authorization: `token ${getToken()}`,
        },
      })
      .then((res) => {
        console.log(res.response);
      })
      .catch((err) => {
        console.log(err.response.data)
        setTitle(err.response.data.code);
        setContent(err.response.data.message);
        setOpen(true);
      });
  };
  return (
    <div>
      <ModalComponent
        open={open}
        title={title}
        content={content}
        handleClose={() => setOpen(false)}
      ></ModalComponent>
      <h1>Client Details</h1>
      <h3>
        Client Name :
        <input
          placeholder="Client Name"
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </h3>
      <h3>
        Gst No :
        <input
          placeholder="Gst No."
          type="text"
          value={gstnum}
          onChange={(e) => setGstnum(e.target.value)}
        />
      </h3>
      <h3>
        Contact Number :
        <input
          placeholder="Gst No."
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </h3>
      <h3>
        Email :
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </h3>
      <h3>
        Address :
        <input
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </h3>
      <Button onClick={() => addClientAction()}>Add Client</Button>
    </div>
  );
};

export default AddClient;
