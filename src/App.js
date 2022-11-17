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
import AddProductsDialog from "./components/AddProductDialog";

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

  const handleDeleteProduct = (productId, idx) => {
    async function delProduct() {
      await axios
        .delete(`${BASE_API_URL}/products/${productId}`)
        .then((res) => {
          console.log(productId);
          console.log(idx);
          let arr = products;
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
            {newProducts.map((d) => (
              <ListItemProduct
                key={d.id}
                image={d.image}
                primaryText={d.title}
                secondaryText={`Description: ${d.description}`}
              />
            ))}
          </List>
          
        </Paper>

      </div>

      {isDialogOpen && (
        <AddProductsDialog
          open={isDialogOpen}
          onClose={closeDialog}
          product={newProducts}
          setProduct={setNewProducts}
        />
      )}
      
    </div>
  );
}

export default App;
