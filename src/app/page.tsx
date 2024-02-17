import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { Suspense } from "react";
import Image from "next/image";
import { constructFrontImageUrl } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "./loading";
import { Product } from "@/lib/types";
import { fetchGuess } from "./actions";

export default async function Page() {
  let currentGuess: Product | null = null;
  let imageUrl = "";
  if (currentGuess === null) {
    currentGuess = await fetchGuess();
    if (!currentGuess?.images || !currentGuess.images.front_en) {
      console.log("No front image found, using fallback");
      imageUrl = constructFrontImageUrl(currentGuess?.code as string, 1, true);
    } else {
      imageUrl = constructFrontImageUrl(
        currentGuess.code,
        currentGuess.images.front_en.rev
      );
      console.log("Image URL:", imageUrl);
    }
  }

  // let product: any = {
  //   product_name: "",
  //   brands: "",
  //   imageUrl: "",
  //   sugars: 0,
  // };

  // // there are about 19562 pages of products (with 20 items per page)
  // const randomPageNumber = Math.floor(Math.random() * 19000) + 1;
  await fetchGuess();
  return (
    <div className="container flex flex-col items-center gap-4 px-4 text-center ">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
          How sweet is...
        </h2>
      </div>
      <div className="justify-center gap-4">
        <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
          <Card>
            <CardHeader>
              <CardTitle>{currentGuess?.product_name}</CardTitle>
              <CardDescription>
                Produced by: {currentGuess?.brands}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Loading />}>
                <Image
                  alt="Item"
                  className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center"
                  height="400"
                  src={imageUrl || "/placeholder.webp"}
                  width="400"
                />
              </Suspense>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="w-full">⬆️⬇️</div>
              <form className="flex flex-col gap-4 md:flex-row md:items-center md:gap-2 lg:gap-4 w-full">
                <Input
                  className="max-w-xs md:mr-2 lg:mr-4"
                  min="0"
                  placeholder="Enter your guess in grams"
                  type="number"
                />
                <Button type="submit">Guess</Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
      <p className="text-sm tracking-wide leading-loose">
        Enter your guess in grams of sugar
      </p>

      <div className="space-y-2">
        <h3 className="font-bold tracking-tighter">Feedback</h3>
        <p className="text-sm">
          You guessed: 50g. The actual sugar content is {currentGuess?.sugars}g.
          You were off by 20g.
        </p>
      </div>
    </div>
  );
}
