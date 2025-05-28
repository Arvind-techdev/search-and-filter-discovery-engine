import { CategoryModel } from "@/models/category";
import { ProductModel } from "@/models/product";

export const extractUnique = async (
  field: string,
  categoryIds: string[] | string | null = null
): Promise<string[]> => {
  let filter: any = {};
  if (categoryIds) {
    if (Array.isArray(categoryIds)) {
      filter.category = { $in: categoryIds };
    } else {
      filter.category = categoryIds;
    }
  }

  const allProductsInCategories = await ProductModel.find(filter).lean();

  const uniqueValues = [
    ...new Set(
      allProductsInCategories
        .map((r) => r?.attributes?.[field])
        .filter((v) => v !== undefined && v !== null && v !== "")
    ),
  ];

  return uniqueValues;
};
