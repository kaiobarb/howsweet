import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import { Product } from "@/lib/types";
import {
  constructFrontImageUrl,
  fetchProduct,
  fetchRandomProduct,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";

const ProductCard = async ({ barcode }: { barcode: string }) => {
  let product: Product | undefined;
  let imageUrl = "";
  const maxRetries = 5;
  let retryCount = 0;
  let randomProduct;

  if (!barcode) {
    while (retryCount < maxRetries) {
      randomProduct = await fetchRandomProduct();
      if (randomProduct) break;
      retryCount++;
      console.log(`Retrying fetchRandomProduct... Attempt ${retryCount}`);
    }

    if (!randomProduct) {
      console.error(
        "Failed to fetch a random product after multiple attempts."
      );
      redirect("/");
    }

    redirect(`/play?item=${randomProduct.code}`);
  }
  product = await fetchProduct(barcode);
  if (!product) {
    return;
  }
  const { product_name, brands, images } = product;
  if (!images || !images.front_en) {
    console.log("No front image found, using fallback");
    imageUrl = "/placeholder.webp";
  } else {
    imageUrl = constructFrontImageUrl(
      product.code,
      product.images.front_en.rev
    );
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-3xl m-0 mb-1">
          {product_name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Image
          alt="Item"
          className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center rounded-lg"
          height="400"
          src={imageUrl || "/placeholder.webp"}
          width="400"
        />
      </CardContent>
      <CardFooter className="flex flex-col text-tertiary font-light text-sm">
        {brands && (
          <>
            Produced by: <Badge>{brands}</Badge>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
