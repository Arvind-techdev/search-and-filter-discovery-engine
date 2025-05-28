import { connectDB } from "@/lib/db";
import { ProductModel } from "@/models/product";
import { CategoryModel } from "@/models/category"; // ✅ FIXED: Import missing

async function seed() {
  await connectDB();
  await ProductModel.deleteMany({});
  await CategoryModel.deleteMany({});

  const fertilizerLocations = ["Thrissur", "Kochi", "Kottayam", "Palakkad", "Alappuzha"];
  const shoeLocations = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad"];
  const tvLocations = ["Chennai", "Pune", "Jaipur", "Lucknow", "Nagpur"];
  const clothingLocations = ["Kolkata", "Bhopal", "Indore", "Patna", "Guwahati"];

  const categories = await CategoryModel.insertMany([
    { name: "Fertilizers", slug: "fertilizers" },
    { name: "Shoes", slug: "shoes" },
    { name: "Television", slug: "tvs" },
    { name: "Clothes", slug: "clothes" },
  ]);

  const fertilizers = Array.from({ length: 15 }).map((_, i) => ({
    title: `NPK Fertilizer ${i + 1}`,
    slug: `npk-fertilizer-${i + 1}`,
    description: `Top quality organic fertilizer #${i + 1}`,
    price: 400 + i * 15,
    rating: +(Math.random() * 5).toFixed(1),
    image: `https://images.unsplash.com/photo-1587049352841-4a52890c4e2f?auto=format&fit=crop&w=600&q=80&sig=${i}`,
    category: categories[0]._id,
    searchable_text: `npk fertilizer ${i + 1} ${fertilizerLocations[i % fertilizerLocations.length]}`,
    facets: [
      ["Organic", "Inorganic"][i % 2],
      ["20:20:20", "10:26:26", "28:28:0"][i % 3],
      fertilizerLocations[i % fertilizerLocations.length],
    ],
    attributes: {
      type: ["Organic", "Inorganic"][i % 2],
      npkRatio: ["20:20:20", "10:26:26", "28:28:0"][i % 3],
      location: fertilizerLocations[i % fertilizerLocations.length],
      price: 400 + i * 15,
    },
    createdAt: new Date(Date.now() - i * 10000000),
  }));

  const shoes = Array.from({ length: 15 }).map((_, i) => ({
    title: `Running Shoe ${i + 1}`,
    slug: `running-shoe-${i + 1}`,
    description: `Lightweight sports shoe #${i + 1}`,
    price: 1200 + i * 80,
    rating: +(Math.random() * 5).toFixed(1),
    image: `https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=600&q=80&sig=${i}`,
    category: categories[1]._id,
    searchable_text: `running shoe ${i + 1} ${shoeLocations[i % shoeLocations.length]}`,
    facets: [
      ["Nike", "Adidas", "Puma", "Reebok"][i % 4],
      ["Red", "Blue", "Black", "White"][i % 4],
      shoeLocations[i % shoeLocations.length],
    ],
    attributes: {
      size: 6 + (i % 6),
      color: ["Red", "Blue", "Black", "White"][i % 4],
      brand: ["Nike", "Adidas", "Puma", "Reebok"][i % 4],
      location: shoeLocations[i % shoeLocations.length],
    },
    createdAt: new Date(Date.now() - i * 5000000),
  }));

  const tvs = Array.from({ length: 10 }).map((_, i) => ({
    title: `Smart TV ${i + 1}`,
    slug: `smart-tv-${i + 1}`,
    description: `Full HD Smart Television #${i + 1}`,
    price: 15000 + i * 1000,
    rating: +(Math.random() * 5).toFixed(1),
    image: `https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80&sig=${i}`,
    category: categories[2]._id,
    searchable_text: `smart tv ${i + 1} ${tvLocations[i % tvLocations.length]}`,
    facets: [
      ["Samsung", "LG", "Sony", "Mi"][i % 4],
      ["32inch", "43inch", "50inch"][i % 3],
      tvLocations[i % tvLocations.length],
    ],
    attributes: {
      brand: ["Samsung", "LG", "Sony", "Mi"][i % 4],
      size: ["32inch", "43inch", "50inch"][i % 3],
      location: tvLocations[i % tvLocations.length],
    },
    createdAt: new Date(Date.now() - i * 7000000),
  }));

  const clothes = Array.from({ length: 12 }).map((_, i) => ({
    title: `T-Shirt ${i + 1}`,
    slug: `tshirt-${i + 1}`,
    description: `Premium cotton T-shirt #${i + 1}`,
    price: 499 + i * 30,
    rating: +(Math.random() * 5).toFixed(1),
    image: `https://images.unsplash.com/photo-1618354691249-48b0d0f8688f?auto=format&fit=crop&w=600&q=80&sig=${i}`,
    category: categories[3]._id,
    searchable_text: `tshirt ${i + 1} ${clothingLocations[i % clothingLocations.length]}`,
    facets: [
      ["Men", "Women", "Unisex"][i % 3],
      ["S", "M", "L", "XL"][i % 4],
      clothingLocations[i % clothingLocations.length],
    ],
    attributes: {
      gender: ["Men", "Women", "Unisex"][i % 3],
      size: ["S", "M", "L", "XL"][i % 4],
      location: clothingLocations[i % clothingLocations.length],
    },
    createdAt: new Date(Date.now() - i * 6000000),
  }));

  await ProductModel.insertMany([...fertilizers, ...shoes, ...tvs, ...clothes]);
  console.log("✅ Seed complete with 52 products and 4 categories");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed", err);
  process.exit(1);
});
