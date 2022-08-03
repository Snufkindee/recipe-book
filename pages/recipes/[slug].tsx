import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IRecipe } from "../../schema/Recipe";
import { getPath, getRecipe } from "../../utils/api";

export const getStaticPaths = async () => {
  return getPath();
};

export const getStaticProps = async ({ params }) => {
  return getRecipe(params);
};

const options = {
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

const RecipeDetails = ({ recipe }: { recipe: IRecipe }) => {
  const { featuredImage, title, cookingTime, ingredients, method } =
    recipe.fields;

  const { data: session, status } = useSession({ required: true });

  if (status === "authenticated" && session.user.email) {
    return (
      <div className="px-8 flex w-full flex-col items-center justify-center text-start">
        <div className="lg:w-1/2">
          <Image
            src={`https:${featuredImage.fields.file.url}`}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
          />
        </div>
        <div className="flex w-1/2 flex-col">
          <div className="w-full my-2">
            <h2 className="text-xl font-bold">{title}</h2>
            <p>Valmistusaika: {cookingTime}</p>
          </div>
          <div className="w-full my-2 rich-text">
            {documentToReactComponents(ingredients, options)}
          </div>
          <div className="w-full my-2 rich-text">
            {documentToReactComponents(method, options)}
          </div>
        </div>
      </div>
    );
  }
};

export default RecipeDetails;
