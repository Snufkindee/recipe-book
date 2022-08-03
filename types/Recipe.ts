interface RecipeSys {
  createdAt: string;
  id: string;
  type: string;
  updatedAt: string;
}

interface Metadata {
  tags: string[];
}

interface Image {
  fields: {
    file: {
      url: string;
      details: {
        image: {
          width: string | number;
          height: string | number;
        };
      };
    };
  };
}

export interface IRecipe {
  fields: IRecipeFields;
  metadata: Metadata;
  sys: RecipeSys;
  slug: string;
}

export interface IRecipeFields {
  cookingTime: string;
  description: any;
  ingredients: any;
  slug: string;
  title: string;
  thumbnail: Image;
  featuredImage: Image;
  method: any;
}

export enum RecipeSearchFields {
  TITLE = "title",
}
