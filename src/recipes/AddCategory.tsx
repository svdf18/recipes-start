//@ts-nocheck
import { useRef } from "react";
import { addCategory } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const category = useRef("");
  const navigate = useNavigate();

  async function submitNewCategory() {
    const name = category.current?.value;
    try {
      await addCategory(name);
      alert("Category added successfully");
      navigate("/categories");
      category.current.value = "";
    } catch (error) {
      console.log("Present the error to the user  ");
    }
  }

  return (
    <div>
      <h2>Add Category</h2>
      <p>Enter the name of the new category.</p>
      <input type="text" id="name" ref={category} />
      <button onClick={submitNewCategory}>Add Category</button>
    </div>
  );

}