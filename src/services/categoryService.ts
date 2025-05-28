import { CategoryModel } from "@/models/category";
import { Types } from "mongoose"; // ensure you can validate ObjectId

export async function resolveCategory(input: string): Promise<any | null> {
  console.log('input',input)
  const category = await CategoryModel.findById(input).lean();

  console.log("Resolved category:", category);
  return category;
}
