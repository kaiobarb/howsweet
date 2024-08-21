"use server";
import { Attempt, Product } from "@types";
import { calculateFeedback, fetchProduct } from "@utils";
import { revalidatePath } from "next/cache";

const attempts: Attempt[] = [];
let product: Product | undefined;
let answer: number = 0;

export const getAttempts = async () => {
  return attempts;
};

export const getCurrentProductFromServer = async () => {
  return product;
};

export const getAnswer = async (barcode: string) => {
  const product = await fetchProduct(barcode);
  if (!product) return;

  if (!product.nutriments) throw new Error("No sugar");

  const sugars = parseFloat(
    product.nutriments.sugars_serving || product.nutriments.sugars
  );

  return sugars;
};

export const resetAttempts = async () => {
  attempts.length = 0;
};

export const submitGuess = async (formData: FormData) => {
  const guess = formData.get("value") as unknown as number;
  const barcode = formData.get("barcode") as unknown as string;
  if (guess) {
    const sugars = await getAnswer(barcode);
    if (!sugars) return;
    answer = sugars;

    attempts.push({
      value: guess,
      feedback: calculateFeedback(sugars - guess, sugars * 0.05),
    } as Attempt);

    revalidatePath("/play");
  }
};
