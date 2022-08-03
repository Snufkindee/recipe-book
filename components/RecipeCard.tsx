import Image from "next/image";
import Link from "next/link";
import { IRecipe } from "../types/Recipe";

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const { title, slug, cookingTime, thumbnail } = recipe.fields;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
      <Link href={"/recipes/" + slug}>
        <div>
          <Image
            src={`https:${thumbnail.fields.file.url}`}
            width={thumbnail.fields.file.details.image.width}
            height={thumbnail.fields.file.details.image.height}
          />
          <div className="px-6 py-4 cursor-pointer">
            <div className="font-bold text-xl mb-2 cursor-pointer">{title}</div>
            <p className="text-gray-700 text-base cursor-pointer">
              {cookingTime}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
