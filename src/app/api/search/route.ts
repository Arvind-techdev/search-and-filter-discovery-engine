import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ProductModel } from "@/models/product";
import { BaseProduct } from "@/types/product";
import { buildSearchQuery } from "@/services/searchService";
import { resolveCategory } from "@/services/categoryService";
import { extractUnique } from "@/services/filterService";
import { CategoryModel } from "@/models/category";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "";
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
  const limit = parseInt(req.nextUrl.searchParams.get("limit") || "60", 10);
  const skip = (page - 1) * limit;

  const categoryParam = req.nextUrl.searchParams.get("categoryId");
  const filtersParam = req.nextUrl.searchParams.get("filters");
  console.log('filtersParam',filtersParam)
  let filters: Record<string, any> = {};
  let categoryId: string | null = null;

  console.log('categoryParam',categoryParam)

  if (filtersParam) {
    try {
      filters = JSON.parse(filtersParam);
    } catch {
      return NextResponse.json(
        { error: "Invalid filters JSON" },
        { status: 400 }
      );
    }
  }

  if (categoryParam) {
    const categoryDoc = await resolveCategory(categoryParam);
    if (categoryDoc?._id) {
      categoryId = categoryDoc._id.toString();
    }
  }

  await connectDB();

  const queryObj = await buildSearchQuery(
    query,
    filters,
    categoryId ? [categoryId] : []
  );
  const [rawResults, totalCount] = await Promise.all([
    ProductModel.find(queryObj).skip(skip).limit(limit).lean<BaseProduct[]>(),
    ProductModel.countDocuments(queryObj),
  ]);

  const seenIds = new Set();
  // Enrich products with category data
// 1. Get unique category IDs from rawResults
const categoryIds = [
  ...new Set(rawResults
    .map(p => p.category)
    .filter(id => !!id)
    .map(id => id.toString()))
];

// 2. Generate filters for UI based on categoryIds
const filtersForUI = {
  brands: await extractUnique("brand", categoryIds),
  locations: await extractUnique("location", categoryIds),
  colors: await extractUnique("color", categoryIds),
  sizes: await extractUnique("size", categoryIds),
  types: await extractUnique("type", categoryIds),
  categories: await (async () => {
    const categories = await CategoryModel.find({}, { name: 1 }).lean();
    return categories.map(cat => ({
      _id: cat._id.toString(),
      name: cat.name,
    }));
  })(),
  npks: await extractUnique("npk", categoryIds),
  use_cases: await extractUnique("useCase", categoryIds),
  materials: await extractUnique("material", categoryIds),
  genders: await extractUnique("gender", categoryIds),
  screen_sizes: await extractUnique("screen_size", categoryIds),
  resolutions: await extractUnique("resolution", categoryIds),
  technologies: await extractUnique("technology", categoryIds),
  packaging: await extractUnique("packaging", categoryIds),
};

// 3. Remove duplicates & enrich products
const results = await Promise.all(
  rawResults
    .filter(doc => {
      const idStr = doc._id?.toString();
      if (!idStr) return false;
      if (seenIds.has(idStr)) return false;
      seenIds.add(idStr);
      return true;
    })
    .map(async product => {
      let categoryData = null;
      if (product.category) {
        categoryData = await CategoryModel.findById(product.category).lean();
      }
      return { ...product, categoryData };
    })
);

// Then return your response with filters and results
return NextResponse.json({
  filters: filtersForUI,
  results,
  totalCount,
  page,
  limit,
});

}
