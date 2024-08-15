"use server";
import { Attempt, Product } from "@types";
import { calculateFeedback, fetchProduct } from "@utils";
import { revalidatePath } from "next/cache";

const attempts: Attempt[] = [];
let answer: number = 0;

export const getAttempts = async () => {
  return attempts;
};

export const getAnswer = async (barcode: string) => {
  const product: Product = await fetchProduct(barcode);

  if (!product.nutriments) throw new Error("No sugar");

  const sugars = parseFloat(
    product.nutriments.sugars_serving || product.nutriments.sugars
  );
  console.log("sugars:::: ", sugars);

  return sugars;
};

export const resetAttempts = async () => {
  attempts.length = 0;
};

export const submitGuess = async (
  state: {
    attempts: Attempt[];
  },
  formData: FormData
) => {
  const guess = formData.get("value") as unknown as number;
  const barcode = formData.get("productBarcode") as unknown as string;
  if (guess) {
    const sugars = await getAnswer(barcode);
    answer = sugars;

    attempts.push({
      value: guess,
      feedback: calculateFeedback(sugars - guess, sugars * 0.05),
    } as Attempt);

    revalidatePath("/play");

    return {
      attempts: [
        ...state.attempts,
        {
          value: guess,
          feedback: calculateFeedback(sugars - guess, sugars * 0.05),
        } as Attempt,
      ],
    };
  }
  return { attempts: [] };
};
