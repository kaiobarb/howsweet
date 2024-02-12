import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";

function constructFrontImageUrl(
  barcode: string,
  rev = 1,
  fallback = false,
  resolution = "400"
) {
  const basePath = "https://images.openfoodfacts.org/images/products/";
  let folderPath =
    barcode.length > 8
      ? `${barcode.substring(0, 3)}/${barcode.substring(
          3,
          6
        )}/${barcode.substring(6, 9)}/${barcode.substring(9)}`
      : barcode;

  if (fallback) {
    return `${basePath}${folderPath}/1.jpg`;
  }
  // Assuming 'front_en' as the default key for English front images
  const imageKey = "front_en";
  // Revision numbers can change; you may need to fetch this dynamically or use a placeholder if not available.

  const filename = `${imageKey}.${rev}.${resolution}.jpg`;

  return `${basePath}${folderPath}/${filename}`;
}

export async function Page() {
  let sugars = 0;
  let productName = "";
  let brands = "";
  let imageUrl = "";

  let randomBevs = await fetch(
    "https://world.openfoodfacts.org/api/v2/search?fields=code,product_name,nutriments,brands,images",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { products } = await randomBevs.json();
  const randomIndex = Math.floor(Math.random() * products.length);
  const randomProduct = products[randomIndex];
  // console.log("Random Product's images:", randomProduct.images);

  if (!randomProduct.images || !randomProduct.images.front_en) {
    console.log("No front image found, using fallback");
    imageUrl = constructFrontImageUrl(randomProduct.code, 1, true);
  } else {
    imageUrl = constructFrontImageUrl(
      randomProduct.code,
      randomProduct.images.front_en.rev
    );
    console.log("Image URL:", imageUrl);
  }

  // Access product details here
  sugars = randomProduct.nutriments.sugars;
  productName = randomProduct.product_name;
  brands = randomProduct.brands;

  return (
    <div className="container flex flex-col items-center gap-4 px-4 text-center md:gap-10">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
          How sweet is {productName}?
        </h2>
        <p className="text-sm tracking-wide">Produced by {brands}</p>
      </div>
      <div className="justify-center gap-4">
        <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
          <Image
            alt="Item"
            className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center"
            height="400"
            src={imageUrl || "/placeholder.webp"}
            width="400"
          />
        </div>
      </div>
      <p className="text-sm tracking-wide leading-loose">
        Enter your guess in grams of sugar
      </p>
      <form className="flex flex-col gap-4 md:flex-row md:items-center md:gap-2 lg:gap-4">
        <Input
          className="max-w-xs md:mr-2 lg:mr-4"
          min="0"
          placeholder="Enter your guess in grams"
          type="number"
        />
        <Button type="submit">Guess</Button>
      </form>
      <div className="space-y-2">
        <h3 className="font-bold tracking-tighter">Feedback</h3>
        <p className="text-sm">
          You guessed: 50g. The actual sugar content is {sugars}g. You were off
          by 20g.
        </p>
      </div>
    </div>
  );
}

export default Page;
