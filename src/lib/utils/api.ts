import { Product } from "@types";

// Base URL for API v2 search
const baseUrl = `https://world.openfoodfacts.org/api/v2`;

const fetchOptions = {
  method: "GET",
  headers: {
    "User-Agent": "HowSweetApp - Web - Version 1.0",
  },
};

const generateRandomProductQuery = () => {
  const fields = "code,product_name,nutriments,brands,images,serving_size";
  const country = "united-states"; // Filtering by country
  const pageSize = 20; // Number of results per page
  const page = Math.floor(Math.random() * 8000) + 1;

  // Constructing the query URL
  const randomProductQuery = `${baseUrl}/search?fields=${fields}&countries_tags_en=${country}&page_size=${pageSize}&page=${page}&tagtype_0=ingredients&tag_contains_0=contains&tag_0=sugar&json=true`;
  return randomProductQuery;
};

export async function fetchRandomProduct(): Promise<Product | undefined> {
  // Constructing the query URL
  const randomProductQuery = generateRandomProductQuery();

  try {
    const response = await fetch(randomProductQuery, fetchOptions);

    if (!response.ok) throw new Error("Network response was not ok.");

    const data: { products: Product[] } = await response.json();
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
      console.log("No products found, retrying...");
      fetchRandomProduct();
    }
    const randomIndex = Math.floor(Math.random() * data.products.length);
    const randomProduct = data.products[randomIndex];

    return randomProduct;
  } catch (error) {
    console.error("Error fetching products: ", error);
  }
}

export const fetchProduct = async (barcode?: string) => {
  if (barcode) {
    const productQuery = `${baseUrl}/product/${barcode}`;
    try {
      const response = await fetch(productQuery, fetchOptions);

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();

      return data.product as Product;
    } catch (error) {
      console.error("Error fetching product:", error);
      return undefined;
    }
  }
};
