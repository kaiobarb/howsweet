"use server";
import { Product } from "@types";

// Base URL for API v2 search
const baseUrl = `https://world.openfoodfacts.org/api/v2`;

const fetchOptions = {
  method: "GET",
  next: { revalidate: 3600 },
  //   revalidate: 25600,
  headers: {
    "User-Agent": "HowSweetApp - Web - Version 1.0",
  },
};

export async function fetchRandomProduct(): Promise<Product | null> {
  const fields = "code,product_name,nutriments,brands,images,serving_size";
  const country = "united-states"; // Filtering by country
  const pageSize = 20; // Number of results per page
  const page = Math.floor(Math.random() * 8000) + 1;

  // Constructing the query URL
  const randomProductQuery = `${baseUrl}/search?fields=${fields}&countries_tags_en=${country}&page_size=${pageSize}&page=${page}&tagtype_0=ingredients&tag_contains_0=contains&tag_0=sugar&json=true`;

  try {
    const response = await fetch(randomProductQuery, fetchOptions);

    if (!response.ok) throw new Error("Network response was not ok.");

    const data = await response.json();
    // filter out products without images and no sugar
    data.products = data.products.filter((product: Product) => {
      return (
        !!product.images &&
        !!product.images.front_en &&
        !!product.nutriments &&
        parseFloat(product.nutriments.sugars) > 0
      );
    });
    // ensure we have at least one product
    if (data.products.length === 0) {
      // retry if no products found
      console.log("No products found, retrying...");
      return fetchRandomProduct();
    }
    const randomIndex = Math.floor(Math.random() * data.products.length);
    const randomProduct = data.products[randomIndex];
    // console.log(randomProduct);

    return randomProduct;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  // if not found or other error, return empty response
  return null;
}

export const fetchProduct = async (barcode: string) => {
  const productQuery = `${baseUrl}/product/${barcode}`;
  try {
    const response = await fetch(productQuery, fetchOptions);
    console.log("CACHE STATUS: ", response.headers.get("x-cache-status"));

    const data = await response.json();

    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
  return {};
};
