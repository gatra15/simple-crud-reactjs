import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { AddCircle } from "@mui/icons-material";

const BASE_API_URL = `https://fakestoreapi.com`;

function App() {
  // UseState Get Product
  // UseState Add Product
  const [isDialogOpen, setIsDialogOpen] = useState(false);
 
  // Get Product

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // Delete Hanlder

  return (
    <div className="App">
      <div className="list-container">
        <div className="list-title-wrapper">
          <Typography variant="h4">List Products</Typography>
          <IconButton onClick={openDialog}>
            <AddCircle />
          </IconButton>
        </div>
        
        {/* List Item */}

      </div>

      {/* AddItem */}
      
    </div>
  );
}

export default App;
