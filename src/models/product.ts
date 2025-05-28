/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, model, models } from "mongoose";

export enum GenderType {
  MEN = "Men",
  WOMEN = "Women",
  UNISEX = "Unisex",
}

export enum SizeType {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
}

export enum ShoeBrand {
  NIKE = "Nike",
  ADIDAS = "Adidas",
  PUMA = "Puma",
  REEBOK = "Reebok",
}

export enum TVBrand {
  SAMSUNG = "Samsung",
  LG = "LG",
  SONY = "Sony",
  MI = "Mi",
}

export enum FertilizerType {
  ORGANIC = "Organic",
  INORGANIC = "Inorganic",
}

// You can import this in frontend/backend safely
export interface BaseProduct {
  title: string;
  slug: string;
  description?: string;
  price: number;
  rating?: number;
  image?: string;
  searchable_text?: string;
  category: mongoose.Types.ObjectId | string;
  facets?: string[];
  attributes?: Record<string, any>;
  createdAt?: Date;
}

const ProductSchema = new Schema<BaseProduct>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    price: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 5 },
    image: String,
    searchable_text: String,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    facets: [{ type: String }],

    attributes: {
      type: Map,
      of: Schema.Types.Mixed,
      default: {},
    },

    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

export const ProductModel =
  models.Product || model<BaseProduct>("Product", ProductSchema);
