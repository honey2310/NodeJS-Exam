import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import React from 'react'

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeList from "./pages/RecipeList";
import AddRecipe from "./pages/AddRecipe";
// import MyRecipes from "./pages/MyRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import EditRecipe from "./pages/EditRecipe";
import RecipeExplorer from "./pages/ReceipePage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<RecipeExplorer />} />
          <Route path="/receipe" element={<RecipeList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/add-receipe" element={<AddRecipe />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            {/* <Route path="/my-recipes" element={<MyRecipes />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;