import { ObjectId } from "mongodb";

export interface BaseProduct {
  _id?: ObjectId;
  name: string;
  slug: string;
  description?: string;
  category: "fertilizers" | "shoes" | "tvs" | "clothes";
  brand?: string;
  image: string; // URL
  price: number;
  rating: number; // 0 to 5
  attributes: Record<string, string | number | boolean>;
  searchable_text: string;
  facets: string[];
  createdAt?: Date;
}

 export interface FertilizerProduct extends BaseProduct {
  category: "fertilizers";
  attributes: {
    type: "organic" | "chemical" | "bio" | string;
    location: string;
    npk: string; // e.g., "12:32:16"
    use_case: string; 
  };
}

export interface ShoeProduct extends BaseProduct {
  category: "shoes";
  attributes: {
    size: number; // e.g., 8, 9, 10
    color: string; // e.g., "red"
    material: string; // e.g., "leather", "canvas"
    brand: string; // duplicate brand OK
    gender: "men" | "women" | "unisex" | string;
  };
}

export interface TVProduct extends BaseProduct {
  category: "tvs";
  attributes: {
    screen_size: number; // e.g., 55
    resolution: string; // e.g., "4K", "1080p"
    technology: string; // e.g., "OLED", "LED"
    smart_tv: boolean; // true/false
    brand: string;
  };
}

export interface ClothingProduct extends BaseProduct {
  category: "clothes";
  attributes: {
    gender: "men" | "women" | "unisex";
    size: "S" | "M" | "L" | "XL" | "XXL";
    color: string;
    fabric: string; // e.g., "cotton", "polyester"
    brand: string;
  };
}
