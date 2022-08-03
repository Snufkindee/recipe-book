import { createClient } from "contentful";
import { IRecipe, RecipeSearchFields } from "../types/Recipe";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

interface SearchArgs {
  query: RecipeSearchFields;
  value: string;
}

export const getRecipes = async (
  contentType: string = "recipe",
  { params }: { params?: SearchArgs } = {
    params: { query: RecipeSearchFields.TITLE, value: "" },
  }
) => {
  const { items } = await client.getEntries({
    content_type: contentType,
    [`fields.${params?.query}[match]`]: params?.value,
  });

  return {
    props: {
      recipes: items,
    },
  };
};

export const getPath = async (contentType: string = "recipe") => {
  const res = await client.getEntries<IRecipe>({ content_type: contentType });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getRecipe = async (
  params: { slug: string },
  contentType: string = "recipe"
) => {
  const { items } = await client.getEntries({
    content_type: contentType,
    "fields.slug": params.slug,
  });

  return {
    props: { recipe: items[0] },
  };
};
