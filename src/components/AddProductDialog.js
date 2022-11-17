import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const BASE_API_URL = `https://fakestoreapi.com`;

function AddProductsDialog({ open, onClose, product, setProduct }) {
  const [title, setName] = useState("");
  const [description, setNick] = useState("");

  const handleSubmit = () => {
    axios
      .post(`${BASE_API_URL}/products`, {
        title: title,
        description: description
      })
      .then((res) => {
        setProduct([...product, res.data]);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add user</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          padding: "8px 20px"
        }}
      >
        <TextField
          name="title"
          label="Title"
          value={title}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          name="description"
          label="Description"
          value={description}
          onChange={(event) => setNick(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductsDialog;
