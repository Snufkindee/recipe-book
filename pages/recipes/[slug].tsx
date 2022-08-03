import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { ReactNode } from "react";
import { IRecipe } from "../../types/Recipe";
import { getPath, getRecipe } from "../../utils/api";

export const getStaticPaths: GetStaticPaths = async () => {
  return getPath();
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  return getRecipe({ slug });
};

const options = {
  renderText: (text: string): ReactNode => {
    return text
      .split("\n")
      .reduce(
        (children: string, textSegment: string, index: number): string => {
          return [
            ...children,
            index > 0 && <br key={index} />,
            textSegment,
          ] as ReactNode as string;
        }
      );
  },
};

const RecipeDetails = ({ recipe }: { recipe: IRecipe }) => {
  const {
    featuredImage,
    title,
    cookingTime,
    description,
    ingredients,
    method,
  } = recipe.fields;

  const { data: session, status } = useSession({ required: true });

  if (status === "authenticated" && session?.user?.email) {
    return (
      <div className="px-8 flex w-full flex-col items-center justify-center text-start">
        <div className="lg:max-w-3xl">
          <Image
            src={`https:${featuredImage.fields.file.url}`}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
            loading="lazy"
          />
          <span className="hidden m-0 bg-white lg:inline-block py-14 px-28 md:p-8 relative -top-20 -left-10 -rotate-1 shadow-lg">
            {documentToReactComponents(description, options)}
          </span>
        </div>
        <div className="flex md:w-1/2 flex-col self-start md:self-center">
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
