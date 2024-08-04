export const runtime = "edge";

import React from "react";
// import Image from "next/image";
import { constructFrontImageUrl, guessScore } from "@/lib/utils";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Loading from "../loading";
import { GameState, Product } from "@/lib/types";
import { fetchProduct } from "../actions";

import GuessForm from "@/components/guess-form";
import Submissions from "./components/submissions";
import ProductCard from "./components/product-card";

export default async function Play({
  searchParams,
}: {
  searchParams?: GameState;
}) {
  let currentGuess: Product | null = null;
  let imageUrl = "";
  console.log("searchParams: ", searchParams);

  if (Object.entries(searchParams || {}).length === 0) {
    currentGuess = await fetchProduct();
  }

  if (!currentGuess?.images || !currentGuess.images.front_en) {
    console.log("No front image found, using fallback");
    imageUrl = "/placeholder.webp";
  } else {
    imageUrl = constructFrontImageUrl(
      currentGuess.code,
      currentGuess.images.front_en.rev
    );
    // console.log("current guess", currentGuess);
  }

  const submitGuess = async (
    // prevState: { attempts: string[] },
    formData: FormData
  ) => {
    "use server";
    // const attempts = prevState.attempts;
    // const guess = formData.get("guess") as unknown as number;
    // if (guess && currentGuess) {
    //   const delta = parseFloat(currentGuess.nutriments.sugars) - guess;
    //   console.log(
    //     "You guessed:",
    //     guess,
    //     "g. The actual sugar content is",
    //     currentGuess.nutriments.sugars,
    //     "g. You were off by",
    //     delta,
    //     "g."
    //   );
    //   const score = await guessScore(delta);
    //   console.log("Your score is:", score);
    //   // return { attempts: [...attempts, `${guess.toString()},${score}`] };
    // }
    return { attempts: [] };
  };

  return (
    <div className="container flex flex-col m-auto justify-center bg-gradient">
      <div className="flex justify-center gap-4 border-primary border-5">
        {currentGuess && (
          <ProductCard product={currentGuess} imageUrl={imageUrl} />
        )}
        <Submissions className="">
          <GuessForm
            onSubmit={submitGuess}
            className="flex flex-col items-center justify-center"
          />
        </Submissions>
      </div>
    </div>
  );
}
