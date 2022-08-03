import { ContentfulCollection, createClient, Entry } from "contentful";
import { IRecipe } from "../schema/Recipe";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const getRecipes = async (contentType: string = "recipe") => {
  const res = await client.getEntries({ content_type: contentType });

  return {
    props: {
      recipes: res.items,
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

export const getRecipe = async (params, contentType: string = "recipe") => {
  const { items } = await client.getEntries({
    content_type: contentType,
    "fields.slug": params.slug,
  });

  return {
    props: { recipe: items[0] },
  };
};
