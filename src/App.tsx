import { Route, Routes } from "react-router-dom";
import { Categories } from "./recipes/Categories";
import Recipe from "./recipes/Recipe";
import RecipeForm from "./recipes/RecipeForm";
import Login from "./security/Login";
import Logout from "./security/Logout";
import Layout from "./Layout";
import Home from "./Home";
import "./App.css";
import Contact from "./recipes/Contact";
import RecipesLayout from "./recipes/RecipesLayout";
import RequireAuth from "./security/RequireAuth";
import AddCategory from "./recipes/AddCategory";

export default function App() {
  //const auth = useAuth();
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<h2>Not Found</h2>} />
        <Route path="/" element={<Home />} />
        <Route path="/categories/" element={<Categories />} />
        <Route path="/add-category" 
          element={<RequireAuth roles={["ADMIN"]}>
            <AddCategory />
            </RequireAuth>} />
        <Route path="/recipes" element ={<RecipesLayout/>}>
          <Route path=":id" element={<Recipe />} />
        </Route>
        <Route path="/add-recipe" 
          element={
          <RequireAuth roles={["USER", "ADMIN"]}>
            <RecipeForm />
          </RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Layout>
  );
}
