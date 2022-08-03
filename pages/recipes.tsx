import { getSession, useSession } from "next-auth/react";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search";
import { IRecipe } from "../schema/Recipe";
import { getRecipes } from "../utils/api";

export const getStaticProps = () => {
  return getRecipes();
};

const Recipes = ({ recipes }: { recipes: IRecipe[] }) => {
  const { status } = useSession({ required: true });

  if (status === "authenticated") {
    return (
      <div className="flex justify-center flex-col">
        <Search />
        <div className="flex gap-8 flex-wrap p-10 justify-center self-start justify-items-start">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.sys.id} recipe={recipe} />
          ))}
        </div>
      </div>
    );
  }
};

export default Recipes;
