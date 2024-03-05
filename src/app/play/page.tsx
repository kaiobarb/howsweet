export const runtime = "edge";

import React, { Suspense } from "react";
import Image from "next/image";
import { constructFrontImageUrl, guessScore } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "../loading";
import { Product } from "@/lib/types";
import { fetchGuess } from "../actions";

import GuessForm from "@/components/guess-form";
import NutritionLabel from "./components/nutrition-label";

export default async function Play() {
  let currentGuess: Product | null = null;
  let imageUrl = "";
  const attempts: string[] = [];

  if (currentGuess === null) {
    currentGuess = await fetchGuess();

    if (!currentGuess?.images || !currentGuess.images.front_en) {
      console.log("No front image found, using fallback");
      imageUrl = "/placeholder.webp";
    } else {
      imageUrl = constructFrontImageUrl(
        currentGuess.code,
        currentGuess.images.front_en.rev
      );
      console.log("current guess", currentGuess);
    }
  }

  const submitGuess = async (
    prevState: { attempts: string[] },
    formData: FormData
  ) => {
    "use server";
    const attempts = prevState.attempts;
    const guess = formData.get("guess") as unknown as number;
    if (!guess || !currentGuess) return "";
    const delta = parseFloat(currentGuess.nutriments.sugars) - guess;
    console.log(
      "You guessed:",
      guess,
      "g. The actual sugar content is",
      currentGuess.nutriments.sugars,
      "g. You were off by",
      delta,
      "g."
    );
    const score = await guessScore(delta);
    console.log("Your score is:", score);
    return { attempts: [...attempts, `${guess.toString()},${score}`] };
  };

  return (
    <div className="container flex flex-col m-auto justify-center">
      <div className="flex justify-center">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>{currentGuess?.product_name}</CardTitle>
            <CardDescription>
              {currentGuess?.brands
                ? `Produced by: ${currentGuess?.brands}`
                : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Suspense fallback={<Loading />}>
              <Image
                alt="Item"
                className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center rounded-lg"
                height="400"
                src={imageUrl || "/placeholder.webp"}
                width="400"
              />
            </Suspense>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="w-full"></div>
          </CardFooter>
        </Card>
        {currentGuess && (
          <NutritionLabel
            product={currentGuess}
            className="border border-black m-5 float-left w-[400px] p-2 rounded-lg"
          />
        )}
      </div>
      <GuessForm
        onSubmit={submitGuess}
        className="flex flex-col items-center justify-center"
      ></GuessForm>
    </div>
  );
}
