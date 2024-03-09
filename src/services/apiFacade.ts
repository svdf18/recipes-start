// import { Categories } from "../recipes/Categories";
import { API_URL } from "../settings";
import  { makeOptions,handleHttpErrors } from "./fetchUtils";

const CATEGORIES_URL = API_URL + "/categories";
const RECIPE_URL = API_URL + "/recipes";
const INFO_URL = API_URL + "/info";
const CACHE_TIME = 1000 * 60 * 1; // 1 minutes  

interface Recipe {
  id: number | null;
  name: string;
  category: string;
  instructions: string;
  thumb: string;
  youTube: string;
  ingredients: string;
  source: string;
}

interface Info {
  reference: string;
  created: string;
  info: string;
}

const categories = {
  categoriesList: [] as Array<string>,
  lastUpdated: 0
};

// let categories: Array<string> = [];
let recipes: Array<Recipe> = [];
let info: Info|null = null;

async function getCategories(): Promise<Array<string>> {
  if (categories.lastUpdated + CACHE_TIME > Date.now()) return [... categories.categoriesList];
  const res = await fetch(CATEGORIES_URL).then(handleHttpErrors);
  categories.categoriesList = [...res];
  categories.lastUpdated = Date.now();
  return categories.categoriesList;
}

async function addCategory(newCategory: string) {
  const options = makeOptions("POST", null, true);
  const res = await fetch(CATEGORIES_URL + "/" + newCategory, options).then(handleHttpErrors);

  // Update the cached categories list
  categories.categoriesList = [...res];
  categories.lastUpdated = Date.now();
}

async function getRecipes(category: string | null): Promise<Array<Recipe>> {
  //if (recipes.length > 0) return [...recipes];
  console.log("category", category);
  const queryParams = category ? "?category=" + category : "";
  return fetch(RECIPE_URL + queryParams).then(handleHttpErrors);
}
async function getRecipe(id: number): Promise<Recipe> {
  //if (recipes.length > 0) return [...recipes];
  return fetch(RECIPE_URL + "/" + id).then(handleHttpErrors);
}
async function addRecipe(newRecipe: Recipe): Promise<Recipe> {
  const method = newRecipe.id ? "PUT" : "POST";
  const options = makeOptions(method, newRecipe, true);
  const URL = newRecipe.id ? `${RECIPE_URL}/${newRecipe.id}` : RECIPE_URL;
  return fetch(URL, options).then(handleHttpErrors);
}
async function deleteRecipe(id: number): Promise<Recipe> {
  const options = makeOptions("DELETE", null, true);
  return fetch(`${RECIPE_URL}/${id}`, options).then(handleHttpErrors);
}

async function getInfo(): Promise<Info> {
  if (info){
    return info
  } 
  info = await fetch(INFO_URL).then(handleHttpErrors) as Info;
  return info;
} 
  

export type { Recipe, Info };
// eslint-disable-next-line react-refresh/only-export-components
export { getCategories, addCategory, getRecipes, getRecipe, addRecipe, deleteRecipe, getInfo };
