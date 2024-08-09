export const runtime = "edge";

import React from "react";
import { constructFrontImageUrl } from "@/lib/utils";
import { Product } from "@/lib/types";
import { fetchProduct, fetchRandomProduct } from "../actions";

import GuessForm from "@/components/guess-form";
import Submissions from "./components/submissions";
import ProductCard from "./components/product-card";
import { GameState, GameStateController } from "./game-state-controller";

export default async function Play({
  searchParams,
}: {
  searchParams?: GameState;
}) {
  let currentGuess: Product | null = null;
  let imageUrl = "";
  console.log("searchParams: ", searchParams);

  if (!searchParams?.item) {
    currentGuess = await fetchRandomProduct();
  } else {
    currentGuess = await fetchProduct(searchParams.item);
  }

  if (!currentGuess?.images || !currentGuess.images.front_en) {
    console.log("No front image found, using fallback");
    imageUrl = "/placeholder.webp";
  } else {
    imageUrl = constructFrontImageUrl(
      currentGuess.code,
      currentGuess.images.front_en.rev
    );
  }
  console.log(currentGuess?.code);

  return (
    <div className="container flex flex-col m-auto justify-center bg-gradient">
      <div className="flex justify-center gap-4 border-primary border-5">
        <GameStateController item={searchParams?.item || currentGuess?.code} />
        {currentGuess && (
          <ProductCard product={currentGuess} imageUrl={imageUrl} />
        )}
        <Submissions className="">
          <>
            <div className="flex flex-row justify-between w-full border-collapse p-1">
              <div className="font-bold">Serving Size</div>
              <div>{currentGuess?.serving_size || null}</div>
            </div>

            <GuessForm
              // onSubmit={submitGuess}
              productBarcode={currentGuess?.code || ""}
              className="flex flex-col items-center justify-center"
            />
          </>
        </Submissions>
      </div>
    </div>
  );
}
