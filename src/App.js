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

  const handleDeleteUser = (userId, idx) => {
    async function delUser() {
      await axios
        .delete(`${BASE_API_URL}/products/${userId}`)
        .then((res) => {
          console.log(userId);
          console.log(idx);
          let arr = users;
          if (idx !== -1) {
            arr.splice(idx, 1);
          }
          setUsers([...arr]);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }

    delUser();
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
            {users.map((d, idx) => (
              <ListItemUser
                key={d.id}
                image={d.image}
                primaryText={`${d.title} || Rating: ${d.rating.rate}`}
                secondaryText={`Description: ${d.description}`}
                onDelete={() => handleDeleteUser(d.id, idx)}
              />
            ))}
            {newUsers.map((d) => (
              <ListItemUser
                key={d.id}
                image={d.image}
                primaryText={d.title}
                secondaryText={`Description: ${d.description}`}
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
