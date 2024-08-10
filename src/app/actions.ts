"use server";
import { Attempt, Product } from "@types";
import { calculateFeedback, fetchProduct } from "@utils";

export const submitGuess = async (
  state: {
    attempts: Attempt[];
  },
  formData: FormData
) => {
  const guess = formData.get("value") as unknown as number;
  const barcode = formData.get("productBarcode") as unknown as string;
  console.log("submitting guess: ", guess);
  if (guess) {
    const product: Product = await fetchProduct(barcode);

    if (!product.nutriments) throw new Error("No sugar");

    const sugars = parseFloat(product.nutriments.sugars);

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
