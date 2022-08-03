import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search";
import { AuthStatusTypes } from "../types/Auth";
import { IRecipe } from "../types/Recipe";
import { getRecipes } from "../utils/api";

export const getStaticProps: GetStaticProps = async () => {
  return getRecipes();
};

const Recipes = ({ recipes }: { recipes: IRecipe[] }) => {
  const { status } = useSession({ required: true });
  const [recipeList, setRecipeList] = useState<IRecipe[]>(recipes);

  const onSearchChange = (searchArg: string) => {
    setRecipeList(
      recipes.filter((recipe: IRecipe) =>
        recipe.fields.title.toLowerCase().includes(searchArg.toLowerCase())
      )
    );
  };

  if (status === AuthStatusTypes.AUTHENTICATED) {
    return (
      <div className="flex justify-center flex-col">
        <Search onChange={onSearchChange} />
        <div className="flex self-center gap-8 flex-wrap p-10 justify-center justify-items-start">
          {recipeList?.map((recipe: IRecipe) => (
            <RecipeCard key={recipe.sys.id} recipe={recipe} />
          ))}
        </div>
      </div>
    );
  }
};

export default Recipes;
