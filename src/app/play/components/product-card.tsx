import Loading from "@/app/loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import { Product } from "@/lib/types";
import { Suspense } from "react";

const ProductCard = ({
  product,
  imageUrl,
}: {
  product: Product;
  imageUrl: string;
}) => {
  const { product_name, brands } = product;
  return (
    <div className="flex flex-col">
      <div className="text-center text-2xl font-playwrite font-bold p-5 text-primary">
        How much sugar is in...
      </div>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-3xl m-0 mb-1">
            {product_name}
          </CardTitle>
          {/* <CardDescription>
            {brands ? `Produced by: ${brands}` : ""}
          </CardDescription> */}
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
        <CardFooter className="flex flex-col text-tertiary font-light text-sm">
          {brands ? `Produced by: ${brands}` : ""}
        </CardFooter>
      </Card>
    </div>
  );
};
export default ProductCard;
