import { createClient } from "contentful";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search";
import { IRecipe, RecipeSearchFields } from "../schema/Recipe";
import { getRecipes } from "../utils/api";

export const getStaticProps = () => {
  return getRecipes();
};

const Recipes = ({ recipes }: { recipes: IRecipe[] }) => {
  const { status } = useSession({ required: true });
  const [recipess, setRecipess] = useState(recipes);

  const setRecipes = (e) => {
    setRecipess(
      recipes.filter((recipe) =>
        recipe.fields.title.toLowerCase().includes(e.toLowerCase())
      )
    );
  };

  if (status === "authenticated") {
    return (
      <div className="flex justify-center flex-col">
        <Search onChange={setRecipes} />
        <div className="flex self-center gap-8 flex-wrap p-10 justify-center justify-items-start">
          {recipess?.map((recipe) => (
            <RecipeCard key={recipe.sys.id} recipe={recipe} />
          ))}
        </div>
      </div>
    );
  }
};

export default Recipes;
