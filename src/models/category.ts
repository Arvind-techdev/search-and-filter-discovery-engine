import { Schema, model, models } from "mongoose";

export enum CategoryType {
  FERTILIZERS = "fertilizers",
  SHOES = "shoes",
  TVS = "tvs",
  CLOTHES = "clothes",
}

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      enum: Object.values(CategoryType),
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel =
  models.Category || model("Category", CategorySchema);
