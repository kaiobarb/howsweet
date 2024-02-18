"use server";
import { Product } from "@/lib/types";

export async function fetchGuess(): Promise<Product | null> {
  console.log("GET request made to /api/guess");
  const fields = "code,product_name,nutriments,brands,images";
  const country = "united-states"; // Filtering by country
  const pageSize = 20; // Number of results per page
  const page = Math.floor(Math.random() * 8000) + 1;

  // Base URL for API v2 search
  const baseUrl = `https://world.openfoodfacts.org/api/v2/search`;

  // Constructing the query URL
  const queryUrl = `${baseUrl}?fields=${fields}&countries_tags_en=${country}&page_size=${pageSize}&page=${page}&tagtype_0=ingredients&tag_contains_0=contains&tag_0=sugar&json=true`;

  try {
    const response = await fetch(queryUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Specify a User-Agent to avoid being blocked by OFF
        "User-Agent": "HowSweetApp - Web - Version 1.0",
      },
    });

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
      return fetchGuess();
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
