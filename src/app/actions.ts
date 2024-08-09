"use server";
import { Attempt, Product } from "@/lib/types";
import { revalidatePath } from "next/cache";

// Base URL for API v2 search
const baseUrl = `https://world.openfoodfacts.org/api/v2`;

const fetchOptions = {
  method: "GET",
  headers: {
    "User-Agent": "HowSweetApp - Web - Version 1.0",
  },
};

export async function fetchRandomProduct(): Promise<Product | null> {
  const fields = "code,product_name,nutriments,brands,images,serving_size";
  const country = "united-states"; // Filtering by country
  const pageSize = 20; // Number of results per page
  const page = Math.floor(Math.random() * 8000) + 1;
  // const page = 10;

  // Constructing the query URL
  const randomProductQuery = `${baseUrl}/search?fields=${fields}&countries_tags_en=${country}&page_size=${pageSize}&page=${page}&tagtype_0=ingredients&tag_contains_0=contains&tag_0=sugar&json=true`;

  try {
    const response = await fetch(randomProductQuery, fetchOptions);
    // console.log(response.headers);

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

    const data = await response.json();

    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
  return {};
};

const calculateFeedback = (delta: number, moe: number) => {
  if (Math.abs(delta) < moe) {
    return "Right on!";
  } else if (delta > 0) {
    return "Your guess was low";
  } else if (delta < 0) {
    return "You guessed too high";
  } else if (delta > 15) {
    return "You guessed too HIGH";
  } else if (delta < -15) {
    ("You guessed too LOW");
  }
};

export const submitGuess = async (
  state: {
    attempts: Attempt[];
  },
  formData: FormData
) => {
  // const attempts = prevState.attempts;
  const guess = formData.get("value") as unknown as number;
  const barcode = formData.get("productBarcode") as unknown as string;
  console.log("barcode: ", barcode);
  console.log("submitting guess: ", guess);
  if (guess) {
    const product: Product = await fetchProduct(barcode);

    if (!product.nutriments) throw new Error("No sugar");

    const sugars = parseFloat(product.nutriments.sugars);

    revalidatePath("/play");
    return {
      attempts: [
        ...state.attempts,
        {
          value: guess,
          feedback: calculateFeedback(sugars - guess, 1),
        } as Attempt,
      ],
    };
  }
  return { attempts: [] };
};
