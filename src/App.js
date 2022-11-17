import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IconButton, List, Paper, Typography } from "@mui/material";
import ListItemProduct from "./components/ListItemProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddCircle } from "@mui/icons-material";

const BASE_API_URL = `https://fakestoreapi.com`;

function App() {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
 
  useEffect(() => {
    async function getProducts() {
      await axios
        .get(`${BASE_API_URL}/products`, {
          params: {
            
          }
        })
        .then((res) => {
          const responseData = res.data;
          setProducts(responseData);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }

    getProducts();
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteProduct = (userId, idx) => {
    async function delProduct() {
      await axios
        .delete(`${BASE_API_URL}/products/${userId}`)
        .then((res) => {
          console.log(userId);
          console.log(idx);
          let arr = users;
          if (idx !== -1) {
            arr.splice(idx, 1);
          }
          setProducts([...arr]);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }

    delProduct();
  };

  return (
    <div className="App">
      <div className="list-container">
        <div className="list-title-wrapper">
          <Typography variant="h4">List Products</Typography>
          <IconButton onClick={openDialog}>
            <AddCircle />
          </IconButton>
        </div>
        
        <Paper elevation={2} style={{ maxHeight: "auto", overflow: "auto" }}>
          <List>
            {products.map((d, idx) => (
              <ListItemProduct
                key={d.id}
                image={d.image}
                primaryText={`${d.title} || Rating: ${d.rating.rate}`}
                secondaryText={`Description: ${d.description}`}
                onDelete={() => handleDeleteProduct(d.id, idx)}
              />
            ))}
          </List>
          
        </Paper>

      </div>

      {/* AddItem */}
      
    </div>
  );
}

export default App;
