import { GenderType, SizeType, FertilizerType } from "@/models/product";
import { Types } from "mongoose";

export function buildSearchQuery(query: string | null, filters: any, categories: string[]) {
  const queryObj: any = {};

  if (query) {
    queryObj.$text = { $search: query };
  }

  if (categories.length) {
    const validCategoryIds = categories.filter((id) => Types.ObjectId.isValid(id));
    if (validCategoryIds.length) {
      queryObj.category = { $in: validCategoryIds.map((id) => new Types.ObjectId(id)) };
    }
  }

  // Handle special types
  // if (filters.gender) {
  //   const validGenders = Object.values(GenderType);
  //   const genders = Array.isArray(filters.gender) ? filters.gender : [filters.gender];
  //   const filteredGenders = genders.filter((g: GenderType) => validGenders.includes(g));
  //   if (filteredGenders.length) {
  //     queryObj.gender = { $in: filteredGenders };
  //   }
  // }

  // if (filters.size) {
  //   const validSizes = Object.values(SizeType);
  //   const sizes = Array.isArray(filters.size) ? filters.size : [filters.size];
  //   const filteredSizes = sizes.filter((s: SizeType) => validSizes.includes(s));
  //   if (filteredSizes.length) {
  //     queryObj.size = { $in: filteredSizes };
  //   }
  // }

  // if (filters.location) {
  //   const validNpks = Object.values(FertilizerType);
  //   const locations = Array.isArray(filters.location) ? filters.location : [filters.location];
  //   const locationsss = locations.filter((n: FertilizerType) => validNpks.includes(n));
  //   if (locationsss.length) {
  //     queryObj['attributes.npk'] = { $in: filteredNpks };
  //   }
  // }

  // Handle attributes nested under `attributes`
  const attributeFields = [
    "brand",
    "location",
    "color",
    "type",
    "useCase",
    "material",
    "screen_size",
    "resolution",
    "technology",
    "packaging",
    "gender",
    "npk",
    "size",
    "grade",
    "brand",
  ];

  attributeFields.forEach((field) => {
    const value = filters[field] || filters[`${field}s`]; // e.g., brand or brands
    if (value) {
      const valuesArray = Array.isArray(value) ? value : [value];
      if (valuesArray.length) {
        queryObj[`attributes.${field}`] = { $in: valuesArray };
      }
    }
  });

  // Price range filter
  if (Array.isArray(filters.price) && filters.price.length === 2) {
    const [min, max] = filters.price;
    queryObj.price = { $gte: min, $lte: max };
  }

  console.log("queryObj", queryObj);
  return queryObj;
}
